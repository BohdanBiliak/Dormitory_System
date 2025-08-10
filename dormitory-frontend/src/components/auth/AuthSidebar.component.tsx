import IconSvg from '@/components/auth/files/icon.svg'

interface AuthSidebarProps {
  activeItem?: 'signin' | 'signup' | 'reset'
}

export function AuthSidebar({ activeItem = 'signin' }: AuthSidebarProps) {
  const menuItems = [
    {
      key: 'dormitories',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
      label: 'Dormitories Information'
    },
    {
      key: 'announcements',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
        </svg>
      ),
      label: 'Announcements'
    },
    {
      key: 'rooms',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
      ),
      label: 'Available rooms'
    },
    {
      key: 'signin',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      ),
      label: 'Sign in'
    }
  ]

  return (
    <div className=" text-white  p-8 flex flex-col" style={{ backgroundColor: '#013366' }}>
      {/* Logo and Title */}
      <div className="flex items-center space-x-3 mb-12">
        <div className="w-12 h-12 bg-opacity-20 rounded flex items-center justify-center">
          <img
            src="/icon.svg"
            alt="Dormitory Logo"
            className="w-25 h-25 filter brightness-0 invert"
          />
        </div>
        <h1 className="text-xl font-bold">Dormitory System</h1>
      </div>

      {/* Navigation Menu */}
      <nav className="space-y-4 flex-1">
        {menuItems.map((item) => (
          <div
            key={item.key}
            className={`flex items-center space-x-3 ${activeItem === item.key || (activeItem === 'signup' && item.key === 'signin') || (activeItem === 'reset' && item.key === 'signin')
                ? 'text-white font-semibold border-b border-white pb-2'
                : 'text-blue-200'
              }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </nav>

      {/* Language Toggle */}
      <div className="flex space-x-2 mt-8">
        <button className="px-3 py-1 bg-white text-blue-900 rounded text-sm font-medium">
          Pol
        </button>
        <button className="px-3 py-1 text-white border border-white rounded text-sm">
          Eng
        </button>
      </div>
    </div>
  )
}