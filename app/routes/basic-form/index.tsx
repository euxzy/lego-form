import { FormFieldRenderer } from '~/components/modular-forms/registry'
import { basicFormConfig } from '~/constants/mock-forms/basic'
import { FormProvider, useFormStore } from '~/contexts/form'

export default function BasicFormPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Basic Form Example</h2>
        <p className="text-sm text-gray-500">
          Mendemonstrasikan render otomatis dari JSON Schema dan isolasi re-render.
        </p>
      </div>

      <FormProvider>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Main Form UI */}
          <div className="md:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">{basicFormConfig.title}</h3>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              {basicFormConfig.fields.map((field) => (
                <FormFieldRenderer key={field.id} config={field} />
              ))}
            </form>
          </div>

          {/* Real-time State Debugger */}
          <div className="bg-gray-900 text-green-400 p-4 rounded-xl font-mono text-xs shadow-inner h-full min-h-62.5">
            <h4 className="text-gray-400 font-bold border-b border-gray-700 pb-2 mb-2">🟢 ZUSTAND STATE MONITOR</h4>
            <FormStateDebugger />
          </div>
        </div>
      </FormProvider>
    </div>
  )
}

function FormStateDebugger() {
  const values = useFormStore((state) => state.values)
  return <pre className="whitespace-pre-wrap word-break-all">{JSON.stringify(values, null, 2)}</pre>
}
