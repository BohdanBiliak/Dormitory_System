'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { authApi } from '@/app/lib/auth.api'
import { toast } from 'sonner'

export function NewPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (!token) {
      toast.error('Invalid reset link')
      router.push('/auth/reset-password')
    }
  }, [token, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm() || !token) return

    setIsLoading(true)
    try {
      await authApi.setNewPassword(token, formData.password)
      
      setIsSuccess(true)
      toast.success('Password reset successfully!')
      
      setTimeout(() => {
        router.push('/auth/login')
      }, 2000)
    } catch (error: any) {
      console.error('Reset password error:', error)
      toast.error(error.response?.data?.message || 'Failed to reset password')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="w-full max-w-md mx-auto my-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">Password Reset Successfully</h2>
          <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg px-2">
            Your password has been changed. You can now sign in with your new password.
          </p>
          <p className="text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8 px-2">
            Redirecting you to sign in...
          </p>
          <Link
            href="/auth/login"
            className="inline-block bg-blue-900 text-white py-2.5 sm:py-3 lg:py-4 px-4 sm:px-6 lg:px-8 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 text-sm sm:text-base font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Sign In Now
          </Link>
        </div>
      </div>
    )
  }

  if (!token) {
    return null
  }

  return (
    <div className="w-full max-w-md mx-auto my-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-6 sm:mb-8">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
          <svg className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Create New Password</h2>
        <p className="text-gray-600 mt-2 text-sm sm:text-base lg:text-lg">
          Enter your new password below
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="bg-gray-50 p-4 sm:p-6 rounded-lg border">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Set New Password
          </h3>
          
          <div className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
                New Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                disabled={isLoading}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 transition-colors text-sm sm:text-base ${
                  errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                }`}
                placeholder="Enter new password"
                autoFocus
              />
              {errors.password && (
                <p className="text-red-500 text-xs sm:text-sm mt-1 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.password}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                disabled={isLoading}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 transition-colors text-sm sm:text-base ${
                  errors.confirmPassword ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                }`}
                placeholder="Confirm new password"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs sm:text-sm mt-1 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-900 text-white py-2.5 sm:py-3 lg:py-4 px-4 sm:px-6 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm sm:text-base font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
          >
            {isLoading && (
              <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div>
            )}
            <span>{isLoading ? 'Updating Password...' : 'Update Password'}</span>
          </button>

          <div className="text-center pt-2">
            <Link 
              href="/auth/login" 
              className="text-sm sm:text-base text-blue-600 hover:text-blue-500 font-medium transition-colors underline hover:no-underline"
            >
              ← Back to Sign In
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}