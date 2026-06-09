import type React from 'react'
import { useFormStore } from '~/contexts/form'

export const FormStateDebugger: React.FC = () => {
  const values = useFormStore((state) => state.values)
  const errors = useFormStore((state) => state.errors)

  return (
    <div className="bg-gray-950 text-green-400 p-4 rounded-xl font-mono text-xs shadow-inner h-full min-h-75 border border-gray-800">
      <div className="flex items-center justify-between border-b border-gray-800 pb-2 mb-3">
        <span className="font-bold tracking-wider text-gray-400">ZUSTAND LIVE MONITOR</span>
      </div>

      <div className="space-y-4">
        <div>
          <span className="text-blue-400 font-semibold block mb-1">{'// Form Values'}</span>
          <pre className="whitespace-pre-wrap overflow-x-auto bg-gray-900/50 p-2 rounded border border-gray-900">
            {JSON.stringify(values, null, 2)}
          </pre>
        </div>

        <div>
          <span className="text-red-400 font-semibold block mb-1">{'// Validation Errors'}</span>
          <pre className="whitespace-pre-wrap overflow-x-auto bg-gray-900/50 p-2 rounded border border-gray-900 text-red-300">
            {JSON.stringify(errors, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}
