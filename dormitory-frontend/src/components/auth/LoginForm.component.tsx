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
  const [showPassword, setShowPassword] = useState(false)

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
      await Promise.all([login({ email, password })])
    } catch (error) {
      // Error is handled by the hook
    }
  }

  const hanldeChangePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="w-full max-w-md mx-auto my-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome Back</h2>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Don't have an account?{' '}
          <Link href="/auth/register" className="text-blue-600 hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </div>

      {verified === 'true' && (
        <div className="mb-6 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-md">
          <p className="text-sm text-green-800 text-center">
            ✅ Your email has been verified! You can now sign in.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            placeholder="Email"
            required
          />
        </div>

        <div className='relative'>
          <input
            type= {showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="relative z-0 w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            placeholder="Password"
            required
          />
          <span className="absolute z-10 top-2 right-2" onClick={hanldeChangePasswordVisibility} >
            <img src={showPassword ? '/eye.svg' : '/eye-slash.svg'} alt={showPassword ? 'show password' : 'hide password'} className='h-8 w-8 right-0'/>
          </span>
        </div>

        <div className="text-right">
          <Link href="/auth/reset-password" className="text-sm text-blue-600 hover:underline">
            Forgot your password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoggingIn}
          className="w-full bg-blue-900 text-white py-2.5 sm:py-3 px-4 rounded-md hover:bg-blue-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm sm:text-base"
        >
          {isLoggingIn && (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          )}
          <span>{isLoggingIn ? 'Signing in...' : 'Login'}</span>
        </button>
      </form>
    </div>
  )
}