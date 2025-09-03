'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'

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
      
      // Fixed: Use POST method and send token in body (not GET)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/auth/email-confirmation`, {
        method: 'POST', // Changed from GET to POST
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          token: verificationToken // Send token in request body
        })
      })

      console.log('📧 Verification response:', response.status)

      if (response.ok) {
        const data = await response.json()
        console.log('✅ Verification successful:', data)
        
        setIsSuccess(true)
        toast.success('Email verified successfully!')

        // Redirect to admin profile after success
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
    // Implement resend functionality if needed
    toast.info('Please contact support to resend verification email')
  }

  if (isVerifying) {
    return (
      <div className="w-full max-w-md mx-auto my-auto">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifying Email</h2>
          <p className="text-gray-600">
            Please wait while we verify your email address...
          </p>
        </div>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className="w-full max-w-md mx-auto my-auto">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Email Verified!</h2>
          <p className="text-gray-600 mb-6">
            Your email has been successfully verified. You can now access your account.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Redirecting you to your profile...
          </p>
          <Link
            href="/admin/profile"
            className="inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Go to Profile
          </Link>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full max-w-md mx-auto my-auto">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification Failed</h2>
          <p className="text-red-600 mb-6">
            {error}
          </p>
          <div className="space-y-4">
            <button
              onClick={handleResendVerification}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Request New Verification Email
            </button>
            <Link
              href="/auth/login"
              className="block text-center text-blue-600 hover:text-blue-500 font-medium"
            >
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return null
}