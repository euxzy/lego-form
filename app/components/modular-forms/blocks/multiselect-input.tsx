import type React from 'react'
import { useEffect } from 'react'
import { useFormStore } from '~/contexts/form'
import type { FieldConfig } from '../types'

interface MultiSelectInputProps {
  config: Extract<FieldConfig, { type: 'multiselect' }>
  disabled?: boolean
}

export const MultiSelectInput: React.FC<MultiSelectInputProps> = ({ config, disabled }) => {
  const { id, label, options, defaultValue = [] } = config

  const value = useFormStore((state) => (state.values[id] as string[]) ?? [])
  const error = useFormStore((state) => state.errors[id])
  const setValue = useFormStore((state) => state.setValue)
  const registerField = useFormStore((state) => state.registerField)

  useEffect(() => {
    registerField(id, defaultValue)
  }, [id, defaultValue, registerField])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map((o) => o.value)
    setValue(id, selectedOptions)
  }

  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <select
        multiple
        value={value}
        disabled={disabled}
        onChange={handleChange}
        className="border border-gray-300 p-2 rounded-lg bg-white h-28 focus:outline-none focus:ring-2 focus:ring-blue-200"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="p-1">
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
}
