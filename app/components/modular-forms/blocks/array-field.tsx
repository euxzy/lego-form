import type React from 'react'
import { useEffect, useState } from 'react'
import { useFormStore, useFormStoreApi } from '~/contexts/form'
import { FormFieldRenderer } from '../registry'
import type { FieldConfig } from '../types'

interface ArrayFieldProps {
  config: Extract<FieldConfig, { type: 'array' }>
}

export const ArrayField: React.FC<ArrayFieldProps> = ({ config }) => {
  const { id, label, itemFields, buttonLabel = 'Tambah Item' } = config

  const registerField = useFormStore((state) => state.registerField)
  const unregisterField = useFormStore((state) => state.unregisterField)
  const storeApi = useFormStoreApi()

  // State lokal untuk melacak ID unik per baris agar key React tetap stabil saat dihapus
  const [rowIds, setRowIds] = useState<string[]>([])

  useEffect(() => {
    registerField(id, [])

    const currentValues = storeApi.getState().values

    // Cari tahu berapa banyak baris yang sudah terisi berdasarkan pola dot notation (e.g., socials.0.platform)
    const filledIndices = new Set<number>()
    Object.keys(currentValues).forEach((key) => {
      if (key.startsWith(`${id}.`)) {
        const parts = key.split('.')
        const index = parseInt(parts[1], 10)
        if (!Number.isNaN(index)) {
          filledIndices.add(index)
        }
      }
    })

    // Jika ada data lama, restore rowIds menggunakan UUID baru sebanyak jumlah baris lama
    if (filledIndices.size > 0) {
      const restoredRowIds = Array.from({ length: filledIndices.size }).map(() => crypto.randomUUID())
      setRowIds(restoredRowIds)
    }
  }, [id, registerField, storeApi])

  const handleAddRow = () => {
    const newId = crypto.randomUUID()
    setRowIds((prev) => [...prev, newId])
  }

  const handleRemoveRow = (idToRemove: string, indexToRemove: number) => {
    setRowIds((prev) => prev.filter((rowId) => rowId !== idToRemove))

    // lakukan unregister field-field di dalam baris tersebut dari Zustand store
    itemFields.forEach((field) => {
      // Format id di zustand: namaArray.index.namaField (e.g., socials.0.url)
      unregisterField(`${id}.${indexToRemove}.${field.id}`)
    })
  }

  return (
    <div className="flex flex-col gap-4 w-full border border-gray-200 p-4 rounded-xl bg-gray-50/50">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-gray-800">{label}</label>
        <button
          type="button"
          onClick={handleAddRow}
          className="px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-medium rounded-lg hover:bg-blue-100 transition-colors"
        >
          + {buttonLabel}
        </button>
      </div>

      {rowIds.length === 0 && (
        <p className="text-xs text-gray-400 italic py-2 text-center">Belum ada data yang ditambahkan.</p>
      )}

      <div className="space-y-3">
        {rowIds.map((rowId, index) => (
          <div
            key={rowId}
            className="flex gap-4 items-end bg-white p-4 rounded-lg border border-gray-150 shadow-sm relative group"
          >
            {/* Render fields di dalam baris secara dinamis */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-3">
              {itemFields.map((field) => {
                // Modifikasi ID field child agar menyertakan indeks array
                const dynamicConfig = {
                  ...field,
                  id: `${id}.${index}.${field.id}`,
                }

                return (
                  <div key={field.id} className="md:col-span-6">
                    <FormFieldRenderer config={dynamicConfig} />
                  </div>
                )
              })}
            </div>

            <button
              type="button"
              onClick={() => handleRemoveRow(rowId, index)}
              className="px-2.5 py-2.5 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg transition-colors text-xs font-medium"
            >
              Hapus
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
