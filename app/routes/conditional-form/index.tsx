import { FormFieldRenderer } from '~/components/modular-forms/registry'
import { getGridSpanClass } from '~/components/modular-forms/utils'
import { FormStateDebugger } from '~/components/shared/form-state-debugger'
import { conditionalFormConfig } from '~/constants/mock-forms/conditional'
import { FormProvider } from '~/contexts/form'

export default function ConditionalFormPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Reactive Conditional Fields</h2>
        <p className="text-sm text-gray-500">
          Mengontrol visibilitas (Show/Hide) dan interaktivitas (Enable/Disable) field berdasarkan nilai field lainnya.
        </p>
      </div>

      <FormProvider>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
          <div className="lg:col-span-3 bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">{conditionalFormConfig.title}</h3>

            <form className="grid grid-cols-1 md:grid-cols-12 gap-4" onSubmit={(e) => e.preventDefault()}>
              {conditionalFormConfig.fields.map((field) => (
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
