import { z } from 'zod'

export const baseFieldConfigSchema = z.object({
  id: z.string(),
  label: z.string(),
  placeholder: z.string().optional(),
  description: z.string().optional(),
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

export const fieldConfigSchema = z.discriminatedUnion('type', [
  textFieldConfigSchema,
  numberFieldConfigSchema,
  selectFieldConfigSchema,
  multiSelectFieldConfigSchema,
  checkboxFieldConfigSchema,
])

export type FieldConfig = z.infer<typeof fieldConfigSchema>

export const formBlockSchema = z.object({
  blockId: z.string(),
  title: z.string().optional(),
  fields: z.array(fieldConfigSchema),
})

export type FormBlock = z.infer<typeof formBlockSchema>
