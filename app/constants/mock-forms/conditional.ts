import type { FormBlock } from '~/components/modular-forms/types'

export const conditionalFormConfig: FormBlock = {
  blockId: 'conditional-logic-form',
  title: 'Form Kuesioner Interaktif (Conditional)',
  fields: [
    {
      id: 'employmentStatus',
      type: 'radio',
      label: 'Status Pekerjaan Saat Ini',
      defaultValue: 'unemployed',
      options: [
        { label: 'Tidak Bekerja / Pelajar', value: 'unemployed' },
        { label: 'Bekerja Penuh Waktu', value: 'employed' },
      ],
      ui: { gridSpan: 12 },
    },
    {
      id: 'companyName',
      type: 'text',
      label: 'Nama Perusahaan Tempat Bekerja',
      placeholder: 'PT. Maju Mundur Sukses',
      // Hanya muncul kalau employmentStatus === 'employed'
      conditions: {
        show: {
          targetFieldId: 'employmentStatus',
          operator: 'equals',
          value: 'employed',
        },
      },
      ui: { gridSpan: 12 },
    },
    {
      id: 'hasTaxId',
      type: 'checkbox',
      label: 'Saya memiliki NPWP Aktif',
      defaultValue: false,
      ui: { gridSpan: 12 },
    },
    {
      id: 'taxNumber',
      type: 'text',
      label: 'Nomor NPWP',
      placeholder: '00.000.000.0-000.000',
      // Hanya aktif kalau hasTaxId bernilai true (truthy)
      conditions: {
        enable: {
          targetFieldId: 'hasTaxId',
          operator: 'truthy',
          value: null,
        },
      },
      ui: { gridSpan: 12 },
    },
  ],
}
