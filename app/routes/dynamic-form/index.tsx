import type { MetaFunction } from 'react-router'
import { FormFieldRenderer } from '~/components/modular-forms/registry'
import { getGridSpanClass } from '~/components/modular-forms/utils'
import { FormStateDebugger } from '~/components/shared/form-state-debugger'
import { dynamicArrayFormConfig } from '~/constants/mock-forms/dynamic-array'
import { FormProvider } from '~/contexts/form'

export const meta: MetaFunction = () => {
  return [{ title: 'Dynamic Grid Layout' }]
}

export default function DynamicFormPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Dynamic Array Fields (Field Array)</h2>
        <p className="text-sm text-gray-500">
          Mengelola struktur data bersarang (Nested Object/Array) secara dinamis langsung dari deklarasi skema JSON.
        </p>
      </div>

      <FormProvider>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
          <div className="lg:col-span-3 bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">{dynamicArrayFormConfig.title}</h3>

            <form className="grid grid-cols-1 md:grid-cols-12 gap-4" onSubmit={(e) => e.preventDefault()}>
              {dynamicArrayFormConfig.fields.map((field) => (
                <div key={field.id} className={getGridSpanClass(field.ui?.gridSpan)}>
                  <FormFieldRenderer config={field} />
                </div>
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
