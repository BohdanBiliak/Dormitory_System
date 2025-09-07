'use client'

import { useAuth } from '@/hooks/auth.hook'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: string[]
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  const publicRoutes = [
    '/auth/login', 
    '/auth/register', 
    '/auth/password-recovery',
    '/dormitories',           // Add this
    '/announcements',         // Add this if you have public announcements
    '/'                       // Add home page if it should be public
  ]
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : ''

  // Check if current path starts with any public route (for dynamic routes like /dormitories/[id])
  const isPublicRoute = publicRoutes.some(route => 
    currentPath === route || currentPath.startsWith(route + '/')
  )

  // Redirect logic
  useEffect(() => {
    if (!isLoading) {
      if (!user && !isPublicRoute) {
        router.push('/auth/login')
      }

      if (requiredRole && user && !requiredRole.includes(user.role)) {
        router.push('/unauthorized')
      }
    }
  }, [user, isLoading, router, requiredRole, currentPath, isPublicRoute])

  // Show spinner only while user is loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-900"></div>
      </div>
    )
  }

  // If page is public — render even without user
  if (!user && isPublicRoute) {
    return <>{children}</>
  }

  // If user exists but doesn't have required role — show nothing
  if (user && requiredRole && !requiredRole.includes(user.role)) {
    return null
  }

  // If user exists and everything is ok — render
  if (user) {
    return <>{children}</>
  }

  // For all other cases (unauthorized non-public pages) — render nothing initially
  return null
}