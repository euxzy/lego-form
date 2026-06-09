import { z } from 'zod'
import type { FieldConfig, FormBlock } from './types'

export const compileZodSchema = (config: FormBlock, values: Record<string, unknown> = {}) => {
  const shape: Record<string, z.ZodTypeAny> = {}

  const compileField = (field: FieldConfig, customId?: string) => {
    const fieldId = customId || field.id
    let schema: z.ZodTypeAny

    switch (field.type) {
      case 'number':
        schema = z.number({ error: 'Harus berupa angka' })
        if (field.validation?.min !== undefined) {
          schema = (schema as z.ZodNumber).min(
            field.validation.min,
            field.validation.minMessage || `Minimal ${field.validation.min}`,
          )
        }
        if (field.validation?.max !== undefined) {
          schema = (schema as z.ZodNumber).max(
            field.validation.max,
            field.validation.maxMessage || `Maksimal ${field.validation.max}`,
          )
        }
        break

      case 'checkbox':
        schema = z.boolean()
        if (field.validation?.required) {
          schema = z.literal(true, {
            error: () => ({ message: field.validation?.requiredMessage || 'Checkbox ini wajib dicentang' }),
          })
        }
        break

      case 'multiselect':
        schema = z.array(z.string())
        if (field.validation?.required) {
          schema = (schema as z.ZodArray<z.ZodString>).min(
            1,
            field.validation.requiredMessage || 'Pilih minimal satu opsi',
          )
        }
        break

      case 'array': {
        schema = z.any()

        const prefix = `${field.id}.`
        const indices = new Set<number>()

        Object.keys(values).forEach((key) => {
          if (key.startsWith(prefix)) {
            const idx = Number.parseInt(key.split('.')[1], 10)
            if (!Number.isNaN(idx)) indices.add(idx)
          }
        })

        // Register schema untuk setiap child field di setiap baris yang aktif
        indices.forEach((index) => {
          field.itemFields.forEach((subField) => {
            // Panggil rekursif dengan flat ID (e.g., socials.0.platform)
            compileField(subField, `${field.id}.${index}.${subField.id}`)
          })
        })
        break
      }

      case 'text':
      case 'textarea':
      case 'select':
      case 'radio':
      default:
        schema = z.string()
        if (field.validation?.required) {
          schema = (schema as z.ZodString).min(1, field.validation.requiredMessage || `${field.label} wajib diisi`)
        } else {
          schema = (schema as z.ZodString).optional().or(z.literal(''))
        }

        if (field.type === 'text' || field.type === 'textarea') {
          if (field.validation?.pattern) {
            const regex = new RegExp(field.validation.pattern)
            schema = (schema as z.ZodString).regex(regex, field.validation.patternMessage || 'Format tidak valid')
          }
        }
        break
    }

    shape[fieldId] = schema
  }

  config.fields.forEach((field) => {
    compileField(field)
  })

  return z.object(shape)
}
