import type React from 'react'
import { useEffect } from 'react'
import { useFormStore } from '~/contexts/form'
import type { FieldConfig } from '../types'

interface SelectInputProps {
  config: Extract<FieldConfig, { type: 'select' }>
  disabled?: boolean
}

export const SelectInput: React.FC<SelectInputProps> = ({ config, disabled }) => {
  const { id, label, options, defaultValue = '' } = config

  const value = useFormStore((state) => (state.values[id] as string) ?? '')
  const error = useFormStore((state) => state.errors[id])
  const setValue = useFormStore((state) => state.setValue)
  const registerField = useFormStore((state) => state.registerField)
  const unregisterField = useFormStore((state) => state.unregisterField)

  useEffect(() => {
    registerField(id, defaultValue)
    return () => unregisterField(id)
  }, [id, defaultValue, registerField, unregisterField])

  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <select
        value={value}
        disabled={disabled}
        onChange={(e) => setValue(id, e.target.value)}
        className="border border-gray-300 p-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
      >
        <option value="" disabled>
          Pilih opsi...
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
}
