import { z } from 'zod'

export const baseFieldConfigSchema = z.object({
  id: z.string(),
  label: z.string(),
  placeholder: z.string().optional(),
  description: z.string().optional(),
  ui: z
    .object({
      gridSpan: z
        .union([
          z.literal(1),
          z.literal(2),
          z.literal(3),
          z.literal(4),
          z.literal(5),
          z.literal(6),
          z.literal(7),
          z.literal(8),
          z.literal(9),
          z.literal(10),
          z.literal(11),
          z.literal(12),
        ])
        .optional(),
    })
    .optional(),
  validation: z
    .object({
      required: z.boolean().optional(),
      requiredMessage: z.string().optional(),
      min: z.number().optional(),
      minMessage: z.string().optional(),
      max: z.number().optional(),
      maxMessage: z.string().optional(),
      pattern: z.string().optional(),
      patternMessage: z.string().optional(),
    })
    .optional(),
  conditions: z
    .object({
      show: z
        .object({
          targetFieldId: z.string(),
          operator: z.enum(['equals', 'notEquals', 'truthy']),
          value: z.any(),
        })
        .optional(),
      enable: z
        .object({
          targetFieldId: z.string(),
          operator: z.enum(['equals', 'notEquals', 'truthy']),
          value: z.any(),
        })
        .optional(),
    })
    .optional(),
})

export const textFieldConfigSchema = baseFieldConfigSchema.extend({
  type: z.literal('text'),
  defaultValue: z.string().optional(),
})

export const numberFieldConfigSchema = baseFieldConfigSchema.extend({
  type: z.literal('number'),
  defaultValue: z.number().optional(),
})

export const selectFieldConfigSchema = baseFieldConfigSchema.extend({
  type: z.literal('select'),
  defaultValue: z.string().optional(),
  options: z.array(z.object({ label: z.string(), value: z.string() })),
})

export const multiSelectFieldConfigSchema = baseFieldConfigSchema.extend({
  type: z.literal('multiselect'),
  defaultValue: z.array(z.string()).optional(),
  options: z.array(z.object({ label: z.string(), value: z.string() })),
})

export const checkboxFieldConfigSchema = baseFieldConfigSchema.extend({
  type: z.literal('checkbox'),
  defaultValue: z.boolean().optional(),
})

export const textareaFieldConfigSchema = baseFieldConfigSchema.extend({
  type: z.literal('textarea'),
  defaultValue: z.string().optional(),
  rows: z.number().optional(),
})

export const radioFieldConfigSchema = baseFieldConfigSchema.extend({
  type: z.literal('radio'),
  defaultValue: z.string().optional(),
  options: z.array(z.object({ label: z.string(), value: z.string() })),
})

export const arrayFieldConfigSchema = baseFieldConfigSchema.extend({
  type: z.literal('array'),
  buttonLabel: z.string().optional(),
  // Blueprint field yang ada di dalam setiap baris array
  itemFields: z.array(z.lazy(() => fieldConfigSchema)),
})

export const fieldConfigSchema: z.ZodType<FieldConfig> = z.lazy(() =>
  z.discriminatedUnion('type', [
    textFieldConfigSchema,
    numberFieldConfigSchema,
    selectFieldConfigSchema,
    multiSelectFieldConfigSchema,
    checkboxFieldConfigSchema,
    textareaFieldConfigSchema,
    radioFieldConfigSchema,
    arrayFieldConfigSchema,
  ]),
)

export type FieldConditions = {
  show?: {
    targetFieldId: string
    operator: 'equals' | 'notEquals' | 'truthy'
    value: unknown
  }
  enable?: {
    targetFieldId: string
    operator: 'equals' | 'notEquals' | 'truthy'
    value: unknown
  }
}

export type FieldConfig =
  | z.infer<typeof textFieldConfigSchema>
  | z.infer<typeof numberFieldConfigSchema>
  | z.infer<typeof selectFieldConfigSchema>
  | z.infer<typeof multiSelectFieldConfigSchema>
  | z.infer<typeof checkboxFieldConfigSchema>
  | z.infer<typeof textareaFieldConfigSchema>
  | z.infer<typeof radioFieldConfigSchema>
  | {
      id: string
      label: string
      type: 'array'
      placeholder?: string
      description?: string
      ui?: { gridSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 }
      validation?: {
        required?: boolean
        requiredMessage?: string
        min?: number
        minMessage?: string
        max?: number
        maxMessage?: string
        pattern?: string
        patternMessage?: string
      }
      buttonLabel?: string
      itemFields: FieldConfig[]
      conditions?: FieldConditions
    }

export const formBlockSchema = z.object({
  blockId: z.string(),
  title: z.string().optional(),
  fields: z.array(fieldConfigSchema),
})

export type FormBlock = z.infer<typeof formBlockSchema>
