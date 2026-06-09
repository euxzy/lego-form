import type React from 'react'
import { useEffect } from 'react'
import { useFormStore } from '~/contexts/form'
import type { FieldConfig } from '../types'

interface TextInputProps {
  config: Extract<FieldConfig, { type: 'text' }>
}

export const TextInput: React.FC<TextInputProps> = ({ config }) => {
  const { id, label, placeholder, defaultValue = '' } = config

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
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(id, e.target.value)}
        placeholder={placeholder}
        className={`border p-2 rounded-lg focus:outline-none focus:ring-2 ${
          error ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
        }`}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
}
