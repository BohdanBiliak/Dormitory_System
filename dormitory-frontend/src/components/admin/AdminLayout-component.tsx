'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth.hook'
import { useRouter } from 'next/navigation'

interface AdminLayoutProps {
  children: React.ReactNode
  activeItem?: string
}

export function AdminLayout({ children, activeItem }: AdminLayoutProps) {
  const { user, logout, isLoggingOut } = useAuth()
  const router = useRouter()
  const [openMenu, setOpenMenu] = useState<string>()

  const toggleMenu = (menuKey: string) => {
    setOpenMenu(prev =>
      prev===menuKey ? '' : menuKey
    )
  }

  const handleLogout = () => {
    logout()
  }

  const menuItems = [
    {
      key: 'profile',
      icon: '/user.svg',
      label: 'My profile',
      href: '/admin/profile'
    },
    {
      key: 'dormitories',
      icon: '/workplace.svg',
      label: 'Dormitories',
      submenu: [
        { label: 'All Dormitories', href: '/admin/dormitories' },
        { label: 'Add Dormitory', href: '/admin/dormitories/create' },
        { label: 'Manage Rooms', href: '/admin/rooms' }
      ]
    },
    {
      key: 'communication',
      icon: '/comments.svg',
      label: 'Communication',
      submenu: [
        { label: 'Announcements', href: '/admin/announcements' },
        { label: 'Messages', href: '/admin/messages' },
        { label: 'Confirmations', href: '/admin/confirmations' },
        { label: 'Notifications', href: '/admin/notifications' }
      ]
    },
    {
      key: 'users',
      icon: '/users.svg',
      label: 'Users',
      submenu: [
        { label: 'All Users', href: '/admin/users' },
        { label: 'Managers', href: '/admin/managers' },
        { label: 'Students', href: '/admin/students' }
      ]
    },
    {
      key: 'payments',
      icon: '/cash.svg',
      label: 'Payments',
      submenu: [
        { label: 'All Payments', href: '/admin/payments' },
        { label: 'Pending', href: '/admin/payments/pending' },
        { label: 'Overdue', href: '/admin/payments/overdue' }
      ]
    }
  ]

  return (
    <div className="bg-blue-300 flex min-h-screen">
      {/* Sidebar */}
      <div className="w-1/3 max-w-sm text-white flex flex-col" style={{ backgroundColor: '#013366' }}>
        {/* Header */}
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="mr-10">
              <img
                src="/icon.svg"
                alt="Dormitory Logo"
                className="w-24 h-24 filter brightness-0 invert"
              />
            </div>
            {user && (
                <div>
                  <p className="text-3xl">{user.displayName}</p>
                  <p className="text-blue-200 text-3/2xl mt-1">{user.role}</p>
                </div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-4 flex-1 max-h-fit">
          {menuItems.map((item) => (
            <div key={item.key} className="mb-2">
              {item.submenu ? (
                <>
                  <button
                    onClick={() => toggleMenu(item.key)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded text-left hover:bg-blue-800 transition-colors ${
                      openMenu === item.key ? 'bg-blue-800' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <img src={item.icon} alt={item.label} className="w-10 h-10 filter brightness-0 invert"/>
                      <span>{item.label}</span>
                    </div>

                    <img src='/chevron-up.png' className={`w-8 h-8 transform transition-transform ${
                      openMenu === item.key? 'rotate-180':''}`}
                    />
                  </button>
                  
                  {openMenu === item.key && (
                    <div className="ml-6 mt-1 space-y-1">
                      {item.submenu.map((subItem, index) => (
                        <Link
                          key={index}
                          href={subItem.href}
                          className="block px-3 py-2 text-sm text-blue-200 hover:text-white hover:bg-blue-800 rounded transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href || '#'}
                  className={`flex items-center space-x-3 px-3 py-2 rounded hover:bg-blue-800 transition-colors ${
                    activeItem === item.key ? 'bg-blue-800 font-semibold' : ''
                  }`}
                >
                  <img src={item.icon} alt={item.label} className="w-10 h-10 filter brightness-0 invert"/>
                  <span>{item.label}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center space-x-3 px-3 py-2 hover:text-red-100 hover:bg-red-900 rounded transition-colors w-full disabled:opacity-50"
          >
            <img src="/sign-out.svg" alt="Sign Out" className="w-10 h-10 filter brightness-0 invert"/>
            <span>{isLoggingOut ? 'Logging out...' : 'Log out'}</span>
          </button>
        </div>

        {/* Language Toggle */}
        <div className="p-4 mb-4 min-w-full flex flex-row justify-center">
          <button className="px-3 py-1 bg-white text-blue-900 text-sm font-medium">
            Pol
          </button>
          <button className="px-3 py-1 text-white border border-white text-sm">
            Eng
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white">
        {children}
      </div>
    </div>
  )
}