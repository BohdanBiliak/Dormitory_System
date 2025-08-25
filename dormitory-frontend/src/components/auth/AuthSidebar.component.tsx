import IconSvg from '@/components/auth/files/icon.svg'

interface AuthSidebarProps {
  activeItem?: 'signin' | 'signup' | 'reset'
}

export function AuthSidebar({ activeItem = 'signin' }: AuthSidebarProps) {
  const menuItems = [
    {
      key: 'dormitories',
      icon: '/workplace.svg',
      label: 'Dormitories Information'
    },
    {
      key: 'announcements',
      icon: '/clipboard-check.svg',
      label: 'Announcements'
    },
    {
      key: 'rooms',
      icon: '/home.svg',
      label: 'Available rooms'
    },
    {
      key: 'signin',
      icon: '/user.svg',
      label: 'Sign in'
    }
  ]

  return (
    <div className="w-1/3 max-w-sm flex flex-col text-white" style={{ backgroundColor: '#013366' }}>
      {/* Logo and Title */}
      <div className="flex items-center space-x-3 mb-4 p-6">
        <div className="mr-10">
          <img
            src="/icon.svg"
            alt="Dormitory Logo"
            className="w-24 h-24 filter brightness-0 invert"
          />
        </div>
        <h1 className="text-xl font-bold">Dormitory System</h1>
      </div>

      {/* Navigation Menu */}
      <nav className="space-y-4 flex-1">
        {menuItems.map((item) => (
          <div key={item.key}
            className={`mb-2 text-left flex items-center space-x-3 mx-3 py-2 hover:bg-blue-800 ${activeItem === item.key || (activeItem === 'signup' && item.key === 'signin') || (activeItem === 'reset' && item.key === 'signin')
                ? 'text-white font-semibold border-b border-white pb-2'
                : 'text-blue-200'
              }`}
          >
            <img src={item.icon} alt={item.label} className="w-10 h-10 filter brightness-0 invert" />
            <span>{item.label}</span>
          </div>
        ))}
      </nav>

      {/* Language Toggle */}
      <div className="flex flex-row justify-center mb-20">
        <button className="px-3 py-1 bg-white text-blue-900 text-sm font-medium">
          Pol
        </button>
        <button className="px-3 py-1 text-white border border-white text-sm">
          Eng
        </button>
      </div>
    </div>
  )
}