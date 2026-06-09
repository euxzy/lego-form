import type React from 'react'
import { createContext, useContext, useState } from 'react'
import { useStore } from 'zustand'
import { createFormStore, type FormStore, type FormStoreState } from '../stores/form'

// 1. Inisialisasi Context dengan tipe FormStore atau null
const FormContext = createContext<FormStore | null>(null)

interface FormProviderProps {
  children: React.ReactNode
}

// 2. Provider Component
export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  // Store di-init sekali di dalam local state komponen
  const [store] = useState(() => createFormStore())

  return <FormContext.Provider value={store}>{children}</FormContext.Provider>
}

// 3. Custom Hook untuk mengambil state secara atomik via Selector
export function useFormStore<T>(selector: (state: FormStoreState) => T): T {
  const store = useContext(FormContext)

  if (!store) {
    throw new Error('useFormStore harus digunakan di dalam komponen <FormProvider>')
  }

  // Solusi: Kita panggil useStore dengan mempassing store instance dari context
  return useStore(store, selector)
}

// 4. Custom Hook tambahan untuk mengambil langsung store API instance
export function useFormStoreApi(): FormStore {
  const store = useContext(FormContext)
  if (!store) {
    throw new Error('useFormStoreApi harus digunakan di dalam komponen <FormProvider>')
  }
  return store
}
