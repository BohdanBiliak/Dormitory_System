'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth.hook'

export function PasswordResetForm() {
  const { resetPassword, isResettingPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      setError('Email is required')
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    try {
      console.log('Reset password for:', email)
      await resetPassword(email)
      setIsSubmitted(true)
      setError('')
    } catch (error) {
      console.error('Reset password error:', error)
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (error) setError('')
  }

  if (isSubmitted) {
    return (
      <div className="w-full max-w-md mx-auto my-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">Check Your Email</h2>
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-gray-600 text-sm sm:text-base">
              We've sent a password reset link to{' '}
              <span className="font-semibold text-blue-900 break-all">{email}</span>
            </p>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8 px-2">
            If you don't see the email, check your spam folder or{' '}
            <button
              onClick={() => {
                setIsSubmitted(false)
                setEmail('')
              }}
              className="text-blue-600 hover:text-blue-500 font-medium transition-colors underline hover:no-underline"
            >
              try again
            </button>
          </p>
          <Link
            href="/auth/login"
            className="inline-block bg-blue-900 text-white py-2.5 sm:py-3 lg:py-4 px-4 sm:px-6 lg:px-8 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 text-sm sm:text-base font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto my-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-6 sm:mb-8">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
          <svg className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Reset Password</h2>
        <p className="text-gray-600 mt-2 text-sm sm:text-base lg:text-lg">
          Enter your email and we'll send you a reset link
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="bg-gray-50 p-4 sm:p-6 rounded-lg border">
          <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2 flex items-center">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            disabled={isResettingPassword}
            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 transition-colors text-sm sm:text-base ${
              error ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
            }`}
            placeholder="Enter your email address"
            required
            autoFocus
          />
          {error && (
            <p className="text-red-500 text-xs sm:text-sm mt-2 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </p>
          )}
        </div>

        <div className="space-y-3 sm:space-y-4">
          <button
            type="submit"
            disabled={isResettingPassword}
            className="w-full bg-blue-900 text-white py-2.5 sm:py-3 lg:py-4 px-4 sm:px-6 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
          >
            {isResettingPassword && (
              <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div>
            )}
            <span>{isResettingPassword ? 'Sending...' : 'Send Reset Link'}</span>
          </button>

          <Link
            href="/auth/login"
            className="w-full bg-gray-100 text-gray-700 py-2.5 sm:py-3 lg:py-4 px-4 sm:px-6 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 font-medium text-center block text-sm sm:text-base shadow-md hover:shadow-lg"
          >
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  )
}