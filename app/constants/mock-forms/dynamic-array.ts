import type { FormBlock } from '~/components/modular-forms/types'

export const dynamicArrayFormConfig: FormBlock = {
  blockId: 'dynamic-socials-form',
  title: 'Biodata & Sosial Media',
  fields: [
    {
      id: 'username',
      type: 'text',
      label: 'Username',
      placeholder: 'john doe',
      ui: { gridSpan: 12 },
    },
    {
      id: 'socials',
      type: 'array',
      label: 'Daftar Akun Sosial Media',
      buttonLabel: 'Tambah Sosmed',
      ui: { gridSpan: 12 },
      // Struktur fields yang akan di-clone di tiap baris baru
      itemFields: [
        {
          id: 'platform',
          type: 'select',
          label: 'Platform',
          options: [
            { label: 'GitHub', value: 'github' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'X / Twitter', value: 'twitter' },
          ],
        },
        {
          id: 'url',
          type: 'text',
          label: 'Link Profile / URL',
          placeholder: 'https://...',
        },
      ],
    },
  ],
}
