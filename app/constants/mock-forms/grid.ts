import type { FormBlock } from '~/components/modular-forms/types'

export const gridFormConfig: FormBlock = {
  blockId: 'grid-profile-form',
  title: 'Pengaturan Profil (Grid Layout)',
  fields: [
    {
      id: 'firstName',
      type: 'text',
      label: 'Nama Depan',
      placeholder: 'John',
      ui: { gridSpan: 6 },
    },
    {
      id: 'lastName',
      type: 'text',
      label: 'Nama Belakang',
      placeholder: 'Doe',
      ui: { gridSpan: 6 },
    },
    {
      id: 'email',
      type: 'text',
      label: 'Alamat Email',
      placeholder: 'john.doe@example.com',
      ui: { gridSpan: 8 },
    },
    {
      id: 'age',
      type: 'number',
      label: 'Umur',
      defaultValue: 23,
      ui: { gridSpan: 4 },
    },
    {
      id: 'country',
      type: 'select',
      label: 'Negara',
      options: [
        { label: 'Indonesia', value: 'ID' },
        { label: 'Singapore', value: 'SG' },
      ],
      ui: { gridSpan: 12 },
    },
    {
      id: 'bio',
      type: 'text',
      label: 'Biografi Singkat',
      placeholder: 'Ceritakan tentang diri Anda...',
    },
  ],
}
