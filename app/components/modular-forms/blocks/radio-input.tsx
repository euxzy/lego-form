import type React from 'react'
import { useEffect } from 'react'
import { useFormStore } from '~/contexts/form'
import type { FieldConfig } from '../types'

interface RadioInputProps {
  config: Extract<FieldConfig, { type: 'radio' }>
}

export const RadioInput: React.FC<RadioInputProps> = ({ config }) => {
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
    <div className="flex flex-col gap-2 w-full">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <div className="flex flex-wrap gap-4 p-1">
        {options.map((opt) => {
          const optionId = `${id}-${opt.value}`
          return (
            <div key={opt.value} className="flex items-center gap-2">
              <input
                type="radio"
                id={optionId}
                name={id}
                value={opt.value}
                checked={value === opt.value}
                onChange={() => setValue(id, opt.value)}
                className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor={optionId} className="text-sm text-gray-600 select-none cursor-pointer">
                {opt.label}
              </label>
            </div>
          )
        })}
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
}
