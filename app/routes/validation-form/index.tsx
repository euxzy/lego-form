import { compileZodSchema } from '~/components/modular-forms/compiler'
import { FormFieldRenderer } from '~/components/modular-forms/registry'
import { getGridSpanClass } from '~/components/modular-forms/utils'
import { FormStateDebugger } from '~/components/shared/form-state-debugger'
import { validationFormConfig } from '~/constants/mock-forms/validation'
import { FormProvider, useFormStoreApi } from '~/contexts/form'

export default function ValidationFormPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Schema-Driven Zod Validation</h2>
        <p className="text-sm text-gray-500">
          Validasi runtime dinamis yang dirakit menggunakan Zod secara otomatis dari JSON metadata.
        </p>
      </div>

      <FormProvider>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">{validationFormConfig.title}</h3>

            <form className="grid grid-cols-1 md:grid-cols-12 gap-4" onSubmit={(e) => e.preventDefault()}>
              {validationFormConfig.fields.map((field) => (
                <div key={field.id} className={getGridSpanClass(field.ui?.gridSpan)}>
                  <FormFieldRenderer config={field} />
                </div>
              ))}

              <div className="md:col-span-12 pt-4">
                <SubmitButtonSection />
              </div>
            </form>
          </div>

          <div className="lg:col-span-1">
            <FormStateDebugger />
          </div>
        </div>
      </FormProvider>
    </div>
  )
}

function SubmitButtonSection() {
  const storeApi = useFormStoreApi()

  const handleSubmit = () => {
    const currentValues = storeApi.getState().values
    storeApi.getState().clearErrors()

    // 1. Compile schema Zod secara dinamis dari file config
    const generatedZodSchema = compileZodSchema(validationFormConfig)

    // 2. Parsing data menggunakan safeParse zod
    const result = generatedZodSchema.safeParse(currentValues)

    if (!result.success) {
      // 3. Jika gagal, mapping error zod dan kirim ke store
      const formattedErrors: Record<string, string> = {}
      result.error.issues.forEach((issue) => {
        const fieldKey = issue.path[0] as string
        formattedErrors[fieldKey] = issue.message
      })

      storeApi.getState().setErrors(formattedErrors)
      // TODO: Tampilkan error ke user (e.g alert, toast, dialog)

      return
    }

    // TODO: Kirim data ke API
  }

  return (
    <button
      type="button"
      onClick={handleSubmit}
      className="w-full md:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg shadow-sm transition-colors"
    >
      Submit & Jalankan Validasi Zod
    </button>
  )
}
