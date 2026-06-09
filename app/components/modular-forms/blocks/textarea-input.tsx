import type React from 'react'
import { useEffect } from 'react'
import { useFormStore } from '~/contexts/form'
import { cn } from '~/lib/cn'
import type { FieldConfig } from '../types'

interface TextareaInputProps {
  config: Extract<FieldConfig, { type: 'textarea' }>
  disabled?: boolean
}

export const TextareaInput: React.FC<TextareaInputProps> = ({ config, disabled }) => {
  const { id, label, placeholder, defaultValue = '', rows = 4 } = config

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
      <textarea
        id={id}
        rows={rows}
        value={value}
        disabled={disabled}
        onChange={(e) => setValue(id, e.target.value)}
        placeholder={placeholder}
        className={cn(
          'border p-2 rounded-lg focus:outline-none focus:ring-2 resize-y',
          error ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200',
          disabled && 'bg-gray-100 text-gray-400 cursor-not-allowed',
        )}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
}
