import type { MetaFunction } from 'react-router'
import { FormFieldRenderer } from '~/components/modular-forms/registry'
import { FormStateDebugger } from '~/components/shared/form-state-debugger'
import { basicFormConfig } from '~/constants/mock-forms/basic'
import { FormProvider } from '~/contexts/form'

export const meta: MetaFunction = () => {
  return [{ title: 'Basic Schema Form' }]
}

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
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
          <div className="md:col-span-3 bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">{basicFormConfig.title}</h3>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              {basicFormConfig.fields.map((field) => (
                <FormFieldRenderer key={field.id} config={field} />
              ))}
            </form>
          </div>

          <div className="lg:col-span-2">
            <FormStateDebugger />
          </div>
        </div>
      </FormProvider>
    </div>
  )
}
