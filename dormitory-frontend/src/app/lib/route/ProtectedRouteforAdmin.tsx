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

  const publicRoutes = ['/auth/login', '/auth/register', '/auth/password-recovery']
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : ''

  // Redirect logic
  useEffect(() => {
    if (!isLoading) {
      if (!user && !publicRoutes.includes(currentPath)) {
        router.push('/auth/login')
      }

      if (requiredRole && user && !requiredRole.includes(user.role)) {
        router.push('/unauthorized')
      }
    }
  }, [user, isLoading, router, requiredRole, currentPath])

  // Покажемо спінер лише поки завантажується user
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-900"></div>
      </div>
    )
  }

  // Якщо сторінка публічна — рендеримо навіть без user
  if (!user && publicRoutes.includes(currentPath)) {
    return <>{children}</>
  }

  // Якщо user є, але не має потрібної ролі — нічого не показуємо
  if (user && requiredRole && !requiredRole.includes(user.role)) {
    return null
  }

  // Якщо user є і все ок — рендеримо
  if (user) {
    return <>{children}</>
  }

  // Для всіх інших випадків (неавторизовані непублічні сторінки) — спочатку нічого не рендеримо
  return null
}
