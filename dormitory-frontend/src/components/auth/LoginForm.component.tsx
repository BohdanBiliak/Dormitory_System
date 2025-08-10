'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth.hook'
import { toast } from 'sonner'

export function LoginForm() {
  const searchParams = useSearchParams()
  const verified = searchParams.get('verified')
  const { login, isLoggingIn } = useAuth()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Show success message if user was redirected after verification
  useEffect(() => {
    if (verified === 'true') {
      toast.success('Email verified successfully! You can now sign in.')
    }
  }, [verified])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      toast.error('Please fill in all fields')
      return
    }

    try {
      await login({ email, password })
    } catch (error) {
      // Error is handled by the hook
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
        <p className="text-gray-600 mt-2">
          Don't have an account?{' '}
          <Link href="/auth/register" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>

      {verified === 'true' && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
          <p className="text-sm text-green-800 text-center">
            ✅ Your email has been verified! You can now sign in.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Email"
            required
          />
        </div>

        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Password"
            required
          />
        </div>

        <div className="text-right">
          <Link href="/auth/reset-password" className="text-sm text-blue-600 hover:underline">
            Forgot your password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoggingIn}
          className="w-full bg-blue-900 text-white py-3 px-4 rounded-md hover:bg-blue-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isLoggingIn && (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          )}
          <span>{isLoggingIn ? 'Signing in...' : 'Login'}</span>
        </button>
      </form>

      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
        <p className="text-sm text-blue-800 text-center">
          Haven't verified your email yet?{' '}
          <Link href="/auth/new-verification" className="text-blue-600 hover:text-blue-500 font-medium underline">
            Check your email
          </Link>
        </p>
      </div>
    </div>
  )
}