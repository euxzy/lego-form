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

export const fieldConfigSchema = z.discriminatedUnion('type', [
  textFieldConfigSchema,
  numberFieldConfigSchema,
  selectFieldConfigSchema,
  multiSelectFieldConfigSchema,
  checkboxFieldConfigSchema,
  textareaFieldConfigSchema,
  radioFieldConfigSchema,
])

export type FieldConfig = z.infer<typeof fieldConfigSchema>

export const formBlockSchema = z.object({
  blockId: z.string(),
  title: z.string().optional(),
  fields: z.array(fieldConfigSchema),
})

export type FormBlock = z.infer<typeof formBlockSchema>
