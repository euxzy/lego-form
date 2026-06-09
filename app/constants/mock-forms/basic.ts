import type { FormBlock } from '~/components/modular-forms/types'

export const basicFormConfig: FormBlock = {
  blockId: 'basic-user-registration',
  title: 'Registrasi Pengguna Dasar',
  fields: [
    {
      id: 'username',
      type: 'text',
      label: 'Username',
      placeholder: 'Masukkan username Anda',
      defaultValue: '',
    },
    {
      id: 'age',
      type: 'number',
      label: 'Umur',
      placeholder: 'Masukkan umur Anda',
      defaultValue: 17,
    },
    {
      id: 'role',
      type: 'select',
      label: 'Role Pekerjaan',
      defaultValue: '',
      options: [
        { label: 'Frontend Engineer', value: 'frontend' },
        { label: 'Backend Engineer', value: 'backend' },
        { label: 'DevOps Engineer', value: 'devops' },
      ],
    },
    {
      id: 'newsletter',
      type: 'checkbox',
      label: 'Berlangganan Newsletter',
      description: 'Kami akan mengirimkan update artikel teknologi setiap minggu.',
      defaultValue: true,
    },
  ],
}
