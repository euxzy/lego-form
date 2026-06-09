import type { FormBlock } from '~/components/modular-forms/types'

export const multiStepFormConfig: FormBlock[] = [
  // STEP 1: BIODATA
  {
    blockId: 'step-biodata',
    title: 'Langkah 1: Biodata Diri',
    fields: [
      {
        id: 'fullName',
        type: 'text',
        label: 'Nama Lengkap',
        placeholder: 'Masukkan nama sesuai KTP',
        validation: { required: true },
        ui: { gridSpan: 12 },
      },
      {
        id: 'email',
        type: 'text',
        label: 'Email',
        placeholder: 'contoh@email.com',
        validation: { required: true, pattern: '^\\S+@\\S+\\.\\S+$', patternMessage: 'Format email salah' },
        ui: { gridSpan: 6 },
      },
      {
        id: 'gender',
        type: 'select',
        label: 'Jenis Kelamin',
        options: [
          { label: 'Laki-laki', value: 'L' },
          { label: 'Perempuan', value: 'P' },
        ],
        ui: { gridSpan: 6 },
      },
    ],
  },

  // STEP 2: PENDIDIKAN & PREFERENSI KERJA
  {
    blockId: 'step-education-work',
    title: 'Langkah 2: Pendidikan & Karir',
    fields: [
      {
        id: 'educationLevel',
        type: 'select',
        label: 'Pendidikan Terakhir',
        defaultValue: 'sma',
        options: [
          { label: 'SMA / Sederajat', value: 'sma' },
          { label: 'Diploma (D3)', value: 'd3' },
          { label: 'Sarjana (S1)', value: 's1' },
          { label: 'Magister (S2)', value: 's2' },
        ],
        ui: { gridSpan: 12 },
      },
      {
        id: 'major',
        type: 'text',
        label: 'Jurusan / Nama Gelar',
        placeholder: 'Teknik Informatika',
        // Muncul hanya jika pendidikan di atas SMA
        conditions: {
          show: { targetFieldId: 'educationLevel', operator: 'notEquals', value: 'sma' },
        },
        ui: { gridSpan: 12 },
      },
      {
        id: 'targetRole',
        type: 'select',
        label: 'Target Posisi / Role',
        defaultValue: '',
        options: [
          { label: 'Frontend Engineer', value: 'frontend' },
          { label: 'Backend Engineer', value: 'backend' },
          { label: 'Fullstack Developer', value: 'fullstack' },
        ],
        validation: { required: true, requiredMessage: 'Pilih satu role target' },
        ui: { gridSpan: 6 },
      },
      {
        id: 'yearsOfExperience',
        type: 'number',
        label: 'Pengalaman (Tahun)',
        defaultValue: 0,
        ui: { gridSpan: 6 },
      },
      {
        id: 'techStack',
        type: 'select',
        label: 'Tech Stack yang Dikuasai',
        options: [
          { label: 'JavaScript / TypeScript', value: 'js_ts' },
          { label: 'React / Next.js', value: 'react' },
          { label: 'Vue / Nuxt', value: 'vue' },
          { label: 'Astro', value: 'astro' },
          { label: 'Tailwind CSS', value: 'tailwind' },
        ],
        validation: { required: true, requiredMessage: 'Pilih minimal 1 tech stack' },
        ui: { gridSpan: 12 },
      },
      {
        id: 'isSeekingJob',
        type: 'checkbox',
        label: 'Aktif mencari lowongan kerja',
        defaultValue: false,
        ui: { gridSpan: 6 },
      },
      {
        id: 'expectedSalary',
        type: 'number',
        label: 'Ekspektasi Gaji',
        placeholder: '10000000',
        // Aktif hanya jika 'isSeekingJob' dicentang
        conditions: {
          enable: { targetFieldId: 'isSeekingJob', operator: 'truthy', value: null },
        },
        ui: { gridSpan: 6 },
      },
    ],
  },

  // STEP 3: ADDITIONAL INFORMATION
  {
    blockId: 'step-additional',
    title: 'Langkah 3: Informasi Tambahan',
    fields: [
      {
        id: 'portfolioUrl',
        type: 'text',
        label: 'URL Portofolio / Website',
        placeholder: 'https://myportfolio.com',
        ui: { gridSpan: 12 },
      },
      {
        id: 'socials',
        type: 'array',
        label: 'Sosial Media (GitHub / LinkedIn)',
        buttonLabel: 'Tambah Sosmed',
        ui: { gridSpan: 12 },
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
            id: 'handle',
            type: 'text',
            label: 'Username / Link',
            placeholder: '@username',
          },
        ],
      },
    ],
  },
]
