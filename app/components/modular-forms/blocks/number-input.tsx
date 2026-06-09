import type React from 'react'
import { useEffect } from 'react'
import { useFormStore } from '~/contexts/form'
import type { FieldConfig } from '../types'

interface NumberInputProps {
  config: Extract<FieldConfig, { type: 'number' }>
  disabled?: boolean
}

export const NumberInput: React.FC<NumberInputProps> = ({ config, disabled }) => {
  const { id, label, placeholder, defaultValue = 0 } = config

  const value = useFormStore((state) => (state.values[id] as number | string) ?? '')
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
      <input
        type="number"
        value={value}
        disabled={disabled}
        onChange={(e) => {
          const val = e.target.value === '' ? '' : Number(e.target.value)
          setValue(id, val)
        }}
        placeholder={placeholder}
        className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
}
