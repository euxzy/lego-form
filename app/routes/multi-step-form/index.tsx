import { useState } from 'react'
import { compileZodSchema } from '~/components/modular-forms/compiler'
import { FormFieldRenderer } from '~/components/modular-forms/registry'
import type { FormBlock } from '~/components/modular-forms/types'
import { getGridSpanClass } from '~/components/modular-forms/utils'
import { FormStateDebugger } from '~/components/shared/form-state-debugger'
import { multiStepFormConfig } from '~/constants/mock-forms/multi-step'
import { FormProvider, useFormStoreApi } from '~/contexts/form'
import { cn } from '~/lib/cn'

export default function MultiStepFormPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const activeBlock = multiStepFormConfig[currentStep]
  const isLastStep = currentStep === multiStepFormConfig.length - 1

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Professional Onboarding Wizard</h2>
        <p className="text-sm text-gray-500">Demo integrasi: Multi-step, Conditional Logic, Dynamic Arrays, & Grid.</p>
      </div>

      {/* Progress Stepper */}
      <nav className="flex items-center justify-between max-w-2xl mb-8">
        {multiStepFormConfig.map((block, idx) => (
          <div key={block.blockId} className="flex flex-col items-center flex-1 relative">
            <div
              className={cn(
                'z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all',
                idx <= currentStep
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-white border-gray-300 text-gray-400',
              )}
            >
              {idx + 1}
            </div>
            <span
              className={cn(
                'text-[10px] mt-2 font-bold uppercase tracking-wider',
                idx <= currentStep ? 'text-blue-600' : 'text-gray-400',
              )}
            >
              Step {idx + 1}
            </span>
            {idx !== multiStepFormConfig.length - 1 && (
              <div
                className={cn(
                  'absolute top-4 left-1/2 w-full h-0.5 z-0',
                  idx < currentStep ? 'bg-blue-600' : 'bg-gray-200',
                )}
              />
            )}
          </div>
        ))}
      </nav>

      <FormProvider>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Wizard Card */}
          <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm min-h-125 flex flex-col">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900">{activeBlock.title}</h3>
              <div className="h-1 w-12 bg-blue-600 mt-2 rounded-full" />
            </div>

            {/* 
                PENTING: Kita tidak meng-unmount FormProvider, 
                hanya mengganti isi fields di dalam form.
            */}
            <form
              className="grid grid-cols-1 md:grid-cols-12 gap-5 flex-1 content-start"
              onSubmit={(e) => e.preventDefault()}
            >
              {activeBlock.fields.map((field) => (
                <div key={field.id} className={getGridSpanClass(field.ui?.gridSpan)}>
                  <FormFieldRenderer config={field} />
                </div>
              ))}
            </form>

            {/* Navigation Bar */}
            <div className="flex justify-between items-center pt-8 border-t border-gray-100 mt-8">
              <button
                type="button"
                disabled={currentStep === 0}
                onClick={() => setCurrentStep((p) => p - 1)}
                className="px-6 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-900 disabled:opacity-30 transition-all"
              >
                ← Sebelumnya
              </button>

              <WizardActionHandler
                activeBlock={activeBlock}
                isLastStep={isLastStep}
                onSuccess={() => setCurrentStep((p) => p + 1)}
              />
            </div>
          </div>

          {/* Persistent State Monitor (Muncul semua data aktif & nonaktif) */}
          <div className="lg:col-span-5">
            <FormStateDebugger />
          </div>
        </div>
      </FormProvider>
    </div>
  )
}

/**
 * Logic validasi dipisahkan agar halaman utama tetap bersih
 */
function WizardActionHandler({
  activeBlock,
  isLastStep,
  onSuccess,
}: {
  activeBlock: FormBlock
  isLastStep: boolean
  onSuccess: () => void
}) {
  const storeApi = useFormStoreApi()

  const handleValidateStep = () => {
    const values = storeApi.getState().values
    storeApi.getState().clearErrors()

    // Validasi hanya untuk field yang ada di langkah ini saja
    const schema = compileZodSchema(activeBlock, values)
    const result = schema.safeParse(values)

    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0] as string] = issue.message
      })
      storeApi.getState().setErrors(fieldErrors)
    } else {
      if (isLastStep) {
        alert(`🎉 Wizard Selesai!\nData Akhir:\n${JSON.stringify(values, null, 2)}`)
      } else {
        onSuccess()
      }
    }
  }

  return (
    <button
      type="button"
      onClick={handleValidateStep}
      className={cn(
        'px-8 py-2.5 rounded-xl text-sm font-bold shadow-lg transition-all transform active:scale-95',
        isLastStep
          ? 'bg-green-600 hover:bg-green-700 text-white shadow-green-200'
          : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200',
      )}
    >
      {isLastStep ? 'Kirim Data' : 'Lanjut →'}
    </button>
  )
}
