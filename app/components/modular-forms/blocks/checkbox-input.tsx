import type React from 'react'
import { useEffect } from 'react'
import { useFormStore } from '~/contexts/form'
import type { FieldConfig } from '../types'

interface CheckboxInputProps {
  config: Extract<FieldConfig, { type: 'checkbox' }>
  disabled?: boolean
}

export const CheckboxInput: React.FC<CheckboxInputProps> = ({ config, disabled }) => {
  const { id, label, description, defaultValue = false } = config

  const value = useFormStore((state) => (state.values[id] as boolean) ?? false)
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
      <div className="flex items-start gap-3 p-1">
        <input
          type="checkbox"
          id={id}
          checked={value}
          onChange={(e) => setValue(id, e.target.checked)}
          className="h-4 w-4 mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          disabled={disabled}
        />
        <div className="flex flex-col">
          <label htmlFor={id} className="text-sm font-medium text-gray-700 cursor-pointer select-none">
            {label}
          </label>
          {description && <p className="text-xs text-gray-500">{description}</p>}
        </div>
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
}
