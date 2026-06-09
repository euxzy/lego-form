import type { FormBlock } from '~/components/modular-forms/types'

export const validationFormConfig: FormBlock = {
  blockId: 'validation-example-form',
  title: 'Form Registrasi (Dengan Validasi Zod)',
  fields: [
    {
      id: 'fullName',
      type: 'text',
      label: 'Nama Lengkap',
      placeholder: 'Masukkan nama sesuai KTP',
      validation: {
        required: true,
        requiredMessage: 'Nama lengkap tidak boleh kosong!',
      },
      ui: { gridSpan: 12 },
    },
    {
      id: 'experienceYear',
      type: 'number',
      label: 'Pengalaman Kerja (Tahun)',
      placeholder: 'Contoh: 3',
      defaultValue: 0,
      validation: {
        required: true,
        min: 1,
        minMessage: 'Minimal pengalaman kerja adalah 1 tahun',
        max: 20,
        maxMessage: 'Maksimal pengalaman kerja adalah 20 tahun',
      },
      ui: { gridSpan: 6 },
    },
    {
      id: 'phoneNumber',
      type: 'text',
      label: 'Nomor WhatsApp',
      placeholder: '08123xxxx',
      validation: {
        required: true,
        pattern: '^08[0-9]{9,11}$',
        patternMessage: 'Nomor WhatsApp harus berawalan 08 dan berisi 11-13 angka',
      },
      ui: { gridSpan: 6 },
    },
    {
      id: 'tos',
      type: 'checkbox',
      label: 'Saya menyetujui Syarat & Ketentuan',
      defaultValue: false,
      validation: {
        required: true,
        requiredMessage: 'Wajib menyetujui syarat & ketentuan',
      },
      ui: { gridSpan: 12 },
    },
  ],
}
