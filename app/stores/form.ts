import { createStore } from 'zustand/vanilla'

export interface FormStoreState {
  values: Record<string, unknown>
  errors: Record<string, string>
  registerField: (id: string, initialValue: unknown) => void
  unregisterField: (id: string) => void
  setValue: (id: string, value: unknown) => void
  setErrors: (errors: Record<string, string>) => void
  clearErrors: () => void
}

export type FormStore = ReturnType<typeof createFormStore>

export const createFormStore = () => {
  return createStore<FormStoreState>((set) => ({
    values: {},
    errors: {},

    registerField: (id, initialValue) =>
      set((state) => ({
        values: { ...state.values, [id]: state.values[id] ?? initialValue },
      })),

    unregisterField: (id) =>
      set((state) => {
        const newValues = { ...state.values }
        delete newValues[id]
        const newErrors = { ...state.errors }
        delete newErrors[id]
        return { values: newValues, errors: newErrors }
      }),

    setValue: (id, value) =>
      set((state) => ({
        values: { ...state.values, [id]: value },
      })),

    setErrors: (errors) => set({ errors }),

    clearErrors: () => set({ errors: {} }),
  }))
}
