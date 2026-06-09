import type React from 'react'
import { useEffect } from 'react'
import { useFormStore } from '~/contexts/form'
import { cn } from '~/lib/cn'
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

  useEffect(() => {
    registerField(id, defaultValue)
  }, [id, defaultValue, registerField])

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
        className={cn(
          'border p-2 rounded-lg focus:outline-none focus:ring-2',
          error ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200',
          disabled && 'bg-gray-100 text-gray-400 cursor-not-allowed',
        )}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
}
