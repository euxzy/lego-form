import { z } from 'zod'
import type { FormBlock } from './types'

export const compileZodSchema = (config: FormBlock) => {
  const shape: Record<string, z.ZodTypeAny> = {}

  config.fields.forEach((field) => {
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

    shape[field.id] = schema
  })

  return z.object(shape)
}
