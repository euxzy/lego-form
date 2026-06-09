import type React from 'react'
import { useFormStore } from '~/contexts/form'
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
  const Component = FormComponentRegistry[config.type] as React.ComponentType<{
    config: FieldConfig
    disabled?: boolean
  }>

  const showTargetValue = useFormStore((state) =>
    config.conditions?.show ? state.values[config.conditions.show.targetFieldId] : null,
  )
  const enableTargetValue = useFormStore((state) =>
    config.conditions?.enable ? state.values[config.conditions.enable.targetFieldId] : null,
  )

  if (!Component) {
    return <div className="text-red-500">Component type "{config.type}" not found.</div>
  }

  if (config.conditions?.show) {
    const { operator, value: expectedValue } = config.conditions.show
    let shouldShow = true

    if (operator === 'equals') shouldShow = showTargetValue === expectedValue
    if (operator === 'notEquals') shouldShow = showTargetValue !== expectedValue
    if (operator === 'truthy') shouldShow = !!showTargetValue

    if (!shouldShow) return null
  }

  let isDisabled = false
  if (config.conditions?.enable) {
    const { operator, value: expectedValue } = config.conditions.enable
    let shouldEnable = true

    if (operator === 'equals') shouldEnable = enableTargetValue === expectedValue
    if (operator === 'notEquals') shouldEnable = enableTargetValue !== expectedValue
    if (operator === 'truthy') shouldEnable = !!enableTargetValue

    isDisabled = !shouldEnable
  }

  return <Component config={config} disabled={isDisabled} />
}
