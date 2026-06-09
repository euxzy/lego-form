import { FormFieldRenderer } from '~/components/modular-forms/registry'
import { getGridSpanClass } from '~/components/modular-forms/utils'
import { FormStateDebugger } from '~/components/shared/form-state-debugger'
import { gridFormConfig } from '~/constants/mock-forms/grid'
import { FormProvider } from '~/contexts/form'

export default function GridFormPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Dynamic Grid Layout Form</h2>
        <p className="text-sm text-gray-500">
          Mengontrol tata letak grid form (1-12 kolom) langsung melalui konfigurasi JSON Schema.
        </p>
      </div>

      <FormProvider>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">{gridFormConfig.title}</h3>

            <form className="grid grid-cols-1 md:grid-cols-12 gap-4" onSubmit={(e) => e.preventDefault()}>
              {gridFormConfig.fields.map((field) => {
                const gridClass = getGridSpanClass(field.ui?.gridSpan)

                return (
                  <div key={field.id} className={gridClass}>
                    <FormFieldRenderer config={field} />
                  </div>
                )
              })}
            </form>
          </div>

          {/* State Monitor */}
          <div className="lg:col-span-1">
            <FormStateDebugger />
          </div>
        </div>
      </FormProvider>
    </div>
  )
}
