import { FileText, GitFork, Layers, LayoutGrid, Rocket, ShieldCheck } from 'lucide-react'
import { Link, type MetaFunction } from 'react-router'
import { cn } from '~/lib/cn'

export const meta: MetaFunction = () => {
  return [
    { title: 'Scaling Complex Forms - Lego Form' },
    { name: 'description', content: 'Architecture solutions for dynamic, modular, and performant forms.' },
  ]
}

export default function HomePage() {
  const examples = [
    {
      title: '1. Basic Schema Form',
      description: 'Render UI Component dari structure JSON metadata.',
      path: '/basic-form',
      icon: FileText,
      iconColor: 'text-gray-600',
      color: 'border-gray-200 hover:border-gray-300 bg-white',
    },
    {
      title: '2. Dynamic Grid Layout Form',
      description: 'Mengontrol tata letak dengan grid (1-12 kolom) via properties di JSON.',
      path: '/grid-form',
      icon: LayoutGrid,
      iconColor: 'text-blue-600',
      color: 'border-blue-100 hover:border-blue-200 bg-blue-50/20',
    },
    {
      title: '3. Schema-Driven Validation',
      description: 'Pemisahan total (Separation of Concerns) antara validation Zod dengan UI Component.',
      path: '/validation-form',
      icon: ShieldCheck,
      iconColor: 'text-green-600',
      color: 'border-green-100 hover:border-green-200 bg-green-50/20',
    },
    {
      title: '4. Reactive Conditional Fields',
      description: 'Manajemen interdependensi antar field (Show/Hide & Enable/Disable) via Zustand Selector.',
      path: '/conditional-form',
      icon: GitFork,
      iconColor: 'text-purple-600',
      color: 'border-purple-100 hover:border-purple-200 bg-purple-50/20',
    },
    {
      title: '5. Dynamic Array Fields',
      description: 'Menambah, menghapus, dan mengedit data nested (Field Array) tanpa merusak performa ketikan.',
      path: '/dynamic-form',
      icon: Layers,
      iconColor: 'text-orange-600',
      color: 'border-orange-100 hover:border-orange-200 bg-orange-50/20',
    },
    {
      title: '6. Enterprise Multi-Step Wizard',
      description: 'Penggabungan seluruh fitur ke dalam workflow multi-step form.',
      path: '/multi-step-form',
      icon: Rocket,
      iconColor: 'text-indigo-600',
      color: 'border-indigo-150 hover:border-indigo-250 bg-gradient-to-br from-indigo-50/30 to-white',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-6 font-sans antialiased text-gray-900">
      <div className="max-w-4xl w-full space-y-8 text-center mb-6">
        <div>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 font-bold text-xs rounded-full uppercase tracking-widest">
            Lego Form
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mt-3 md:text-5xl">
            Scaling Complex Forms Architecture
          </h1>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto text-base">React Router v7 + Zustand + Zod</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left pt-4">
          {examples.map((item) => {
            const IconComponent = item.icon
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'p-6 rounded-2xl border shadow-sm transition-all transform hover:-translate-y-1 flex gap-4 group',
                  item.color,
                )}
              >
                <div className="bg-white w-12 h-12 flex items-center justify-center rounded-xl shadow-sm border border-gray-100 group-hover:scale-110 transition-transform shrink-0">
                  <IconComponent className={cn('size-6', item.iconColor)} />
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.description}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
