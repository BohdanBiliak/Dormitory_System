'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'
import { EmailVerificationTutorial } from '../../app/tutorials/auth/email-verification'

export function EmailVerificationForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  
  const [isVerifying, setIsVerifying] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (token) {
      handleVerification(token)
    } else {
      setError('No verification token provided')
    }
  }, [token])

  const handleVerification = async (verificationToken: string) => {
    setIsVerifying(true)
    setError('')

    try {
      console.log('🔍 Verifying email with token:', verificationToken)
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/auth/email-confirmation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          token: verificationToken
        })
      })

      console.log('📧 Verification response:', response.status)

      if (response.ok) {
        const data = await response.json()
        console.log('✅ Verification successful:', data)
        
        setIsSuccess(true)
        toast.success('Email verified successfully!')

        setTimeout(() => {
          router.push('/admin/profile')
        }, 2000)
      } else {
        const errorData = await response.json()
        console.error('❌ Verification failed:', errorData)
        
        setError(errorData.message || 'Verification failed')
        toast.error(errorData.message || 'Email verification failed')
      }
    } catch (error) {
      console.error('❌ Verification error:', error)
      setError('Failed to verify email. Please try again.')
      toast.error('Failed to verify email. Please try again.')
    } finally {
      setIsVerifying(false)
    }
  }

  const handleResendVerification = async () => {
    toast.info('Please contact support to resend verification email')
  }

  if (isVerifying) {
    return (
      <EmailVerificationTutorial>
        <div className="w-full max-w-md mx-auto my-auto px-4 sm:px-6 lg:px-8 verification-status">
          <div className="text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 verification-icon">
              <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 border-b-2 border-blue-600"></div>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">Verifying Email</h2>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg px-2">
              Please wait while we verify your email address...
            </p>
          </div>
        </div>
      </EmailVerificationTutorial>
    )
  }

  if (isSuccess) {
    return (
      <EmailVerificationTutorial>
        <div className="w-full max-w-md mx-auto my-auto px-4 sm:px-6 lg:px-8 verification-status">
          <div className="text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 verification-icon">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">Email Verified!</h2>
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg px-2">
              Your email has been successfully verified. You can now access your account.
            </p>
            <p className="text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8 px-2">
              Redirecting you to your profile...
            </p>
            <div className="verification-actions">
              <Link
                href="/admin/profile"
                className="inline-block bg-blue-900 text-white py-2.5 sm:py-3 lg:py-4 px-4 sm:px-6 lg:px-8 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 text-sm sm:text-base font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Go to Profile
              </Link>
            </div>
          </div>
        </div>
      </EmailVerificationTutorial>
    )
  }

  if (error) {
    return (
      <EmailVerificationTutorial>
        <div className="w-full max-w-md mx-auto my-auto px-4 sm:px-6 lg:px-8 verification-status">
          <div className="text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 verification-icon">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">Verification Failed</h2>
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-md verification-error-notice">
              <p className="text-red-600 text-sm sm:text-base px-2 flex items-center justify-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </p>
            </div>
            <div className="space-y-3 sm:space-y-4 verification-actions">
              <button
                onClick={handleResendVerification}
                className="w-full bg-blue-900 text-white py-2.5 sm:py-3 lg:py-4 px-4 sm:px-6 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 text-sm sm:text-base font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 resend-verification-button"
              >
                Request New Verification Email
              </button>
              <Link
                href="/auth/login"
                className="block text-center text-blue-600 hover:text-blue-500 font-medium transition-colors text-sm sm:text-base underline hover:no-underline back-to-signin-link"
              >
                Back to Sign In
              </Link>
            </div>
          </div>
        </div>
      </EmailVerificationTutorial>
    )
  }

  return null
}