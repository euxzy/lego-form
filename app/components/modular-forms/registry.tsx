import type React from 'react'
import { CheckboxInput } from './blocks/checkbox-input'
import { MultiSelectInput } from './blocks/multiselect-input'
import { NumberInput } from './blocks/number-input'
import { RadioInput } from './blocks/radio-input'
import { SelectInput } from './blocks/select-input'
import { TextInput } from './blocks/text-input'
import { TextareaInput } from './blocks/textarea-input'
import type { FieldConfig } from './types'

export const FormComponentRegistry = {
  text: TextInput,
  number: NumberInput,
  select: SelectInput,
  multiselect: MultiSelectInput,
  checkbox: CheckboxInput,
  textarea: TextareaInput,
  radio: RadioInput,
} as const

interface FormFieldRendererProps {
  config: FieldConfig
}

export const FormFieldRenderer: React.FC<FormFieldRendererProps> = ({ config }) => {
  const Component = FormComponentRegistry[config.type] as React.ComponentType<{ config: FieldConfig }>

  if (!Component) {
    return <div className="text-red-500">Component type "{config.type}" not found.</div>
  }

  return <Component config={config} />
}
