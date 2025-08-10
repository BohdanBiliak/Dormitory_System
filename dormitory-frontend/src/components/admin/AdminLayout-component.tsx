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
  const [openMenus, setOpenMenus] = useState<string[]>([])

  const toggleMenu = (menuKey: string) => {
    setOpenMenus(prev => 
      prev.includes(menuKey) 
        ? prev.filter(key => key !== menuKey)
        : [...prev, menuKey]
    )
  }

  const handleLogout = () => {
    logout()
  }

  const menuItems = [
    {
      key: 'profile',
      icon: '👤',
      label: 'My profile',
      href: '/admin/profile'
    },
    {
      key: 'dormitories',
      icon: '🏢',
      label: 'Dormitories',
      submenu: [
        { label: 'All Dormitories', href: '/admin/dormitories' },
        { label: 'Add Dormitory', href: '/admin/dormitories/create' },
        { label: 'Manage Rooms', href: '/admin/rooms' }
      ]
    },
    {
      key: 'communication',
      icon: '📢',
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
      icon: '👥',
      label: 'Users',
      submenu: [
        { label: 'All Users', href: '/admin/users' },
        { label: 'Managers', href: '/admin/managers' },
        { label: 'Students', href: '/admin/students' }
      ]
    },
    {
      key: 'payments',
      icon: '💰',
      label: 'Payments',
      submenu: [
        { label: 'All Payments', href: '/admin/payments' },
        { label: 'Pending', href: '/admin/payments/pending' },
        { label: 'Overdue', href: '/admin/payments/overdue' }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-blue-300 flex">
      {/* Sidebar */}
      <div className="w-1/3 max-w-sm text-white flex flex-col" style={{ backgroundColor: '#013366' }}>
        {/* Header */}
        <div className="p-6 border-b border-blue-800">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded flex items-center justify-center">
              <img
                src="/icon.svg"
                alt="Dormitory Logo"
                className="w-8 h-8 filter brightness-0 invert"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold">Admin Panel</h1>
            </div>
          </div>
          
          {user && (
            <div className="text-sm">
              <p className="font-medium">{user.displayName}</p>
              <p className="text-blue-200 text-xs">{user.role}</p>
            </div>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4">
          {menuItems.map((item) => (
            <div key={item.key} className="mb-2">
              {item.submenu ? (
                <>
                  <button
                    onClick={() => toggleMenu(item.key)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded text-left hover:bg-blue-800 transition-colors ${
                      openMenus.includes(item.key) ? 'bg-blue-800' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                    <span className={`transform transition-transform ${
                      openMenus.includes(item.key) ? 'rotate-180' : ''
                    }`}>
                      ▼
                    </span>
                  </button>
                  
                  {openMenus.includes(item.key) && (
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
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-blue-800">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center space-x-3 px-3 py-2 text-red-300 hover:text-red-100 hover:bg-red-900 rounded transition-colors w-full disabled:opacity-50"
          >
            <span>🚪</span>
            <span>{isLoggingOut ? 'Logging out...' : 'Log out'}</span>
          </button>
        </div>

        {/* Language Toggle */}
        <div className="p-4 flex space-x-2">
          <button className="px-3 py-1 bg-white text-blue-900 rounded text-sm font-medium">
            Pol
          </button>
          <button className="px-3 py-1 text-white border border-white rounded text-sm">
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