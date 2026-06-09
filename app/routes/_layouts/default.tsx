import { Link, Outlet, useLocation } from 'react-router'

export default function DefaultLayout() {
  const location = useLocation()

  const navItems = [
    { name: 'Basic Form', path: '/basic-form' },
    { name: 'Modular & Pluggable Form', path: '/modular-form' },
    { name: 'Multi-Step Wizard', path: '/multi-step-form' },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-900">
      <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col gap-6">
        <div>
          <h1 className="text-xl font-bold text-blue-600 tracking-tight">Form Lego Event</h1>
          <p className="text-xs text-gray-500 mt-1">React Router v7 + Zustand + Zod</p>
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Area Konten Utama */}
      <main className="flex-1 p-10 max-w-4xl">
        <Outlet />
      </main>
    </div>
  )
}
