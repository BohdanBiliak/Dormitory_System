'use client'

import { useState, useEffect, useCallback, useMemo, memo } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth.hook'
import { toast } from 'sonner'
import { LoginTutorial } from '@/app/tutorials/auth/login'
import { useLanguage } from '@/providers/language.provider'

export const LoginForm = memo(function LoginForm() {
  const searchParams = useSearchParams()
  const verified = useMemo(() => searchParams.get('verified'), [searchParams])
  const { login, isLoggingIn } = useAuth()
  const { t } = useLanguage()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [validationErrors, setValidationErrors] = useState({
    email: '',
    password: '',
  })

  useEffect(() => {
    if (verified === 'true') {
      toast.success(t('auth.login.emailVerified'))
    }
  }, [verified, t])

  const emailPattern = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/, [])

  const handleValidate = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    //email validation
    if (name === 'email') {
      if(value.trim() === ''){
        setValidationErrors(prevState => {
          if(!prevState) return prevState;
          return {
            ...prevState,
            email: t('auth.login.validation.emailRequired'),
          }
        })
      }else if(emailPattern.test(value)) {
        setValidationErrors(prevState => {
          if(!prevState) return prevState;
          return {
            ...prevState,
            email: ""
          }
        })
      }else{
        setValidationErrors(prevState => {
          if(!prevState) return prevState;
          return {
            ...prevState,
            email: t('auth.login.validation.emailInvalid'),
          }
        })
      }
    }

    if(name === 'password') {
      if(value === ''){
        setValidationErrors(prevState => {
          if(!prevState) return prevState;
          return {
            ...prevState,
            password: t('auth.login.validation.passwordRequired'),
          }
        })
      }else if(value.length < 6) {
        setValidationErrors(prevState => {
          if(!prevState) return prevState;
          return {
            ...prevState,
            password: t('auth.login.validation.passwordTooShort')
          }
        })
      }
    }

  }, [emailPattern, t])

  const validateBeforeSubmit = useCallback(() => {
    if(!email.trim()){setValidationErrors(prevState => {
      if(!prevState)return prevState;
      return{...prevState, email: t('auth.login.validation.emailRequiredSubmit')}})}
    if(!password.trim()){setValidationErrors(prevState => {
      if(!prevState)return prevState;
      return{...prevState, password: t('auth.login.validation.passwordRequiredSubmit')}})}
  }, [email, password, t])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    validateBeforeSubmit()

    if(email && password &&!validationErrors.email && !validationErrors.password){
      try {
        await Promise.all([login({ email, password })])
      } catch (error) {
        // Error is handled by the hook
      }
    }

  }, [email, password, validationErrors.email, validationErrors.password, validateBeforeSubmit, login])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if(name === 'email') {
      setEmail(value)
    }

    if(name === 'password') {
      setPassword(value)
    }

    setValidationErrors(prevState => {
      if(!prevState) return prevState;
      return {
        ...prevState,
        [name]: ''
      }
    })
  }, [])

  const handleChangePasswordVisibility = useCallback(() => {
    setShowPassword(!showPassword)
  }, [showPassword])

  return (
    <LoginTutorial>
      <div className="w-full max-w-md mx-auto my-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8 login-form-header">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{t('auth.login.title')}</h2>
          <p className="text-gray-600 mt-2 text-sm sm:text-base signup-link">
            {t('auth.login.subtitle')}{' '}
            <Link href="/auth/register" className="text-blue-600 hover:underline font-medium">
              {t('auth.login.signUp')}
            </Link>
          </p>
        </div>

        {verified === 'true' && (
          <div className="mb-6 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-md verification-success">
            <p className="text-sm text-green-800 text-center">
              {t('auth.login.emailVerified')}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="email-input">
            <input
              name="email"
              type="email"
              value={email}
              onChange={handleInputChange}
              onBlur={handleValidate}
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 transition-colors text-sm sm:text-base ${
                  validationErrors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
              }`}
              placeholder={t('auth.login.email')}
              required
            />
            {validationErrors.email && <p className="text-red-500 text-xs sm:text-sm mt-1 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {validationErrors.email}
            </p>}
          </div>

          <div className="relative password-input">
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handleInputChange}
              onBlur={handleValidate}
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 transition-colors text-sm sm:text-base ${
                  validationErrors.password ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
              }`}
              placeholder={t('auth.login.password')}
              required
            />
            {validationErrors.password && <p className="text-red-500 text-xs sm:text-sm mt-1 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {validationErrors.password}
            </p>}
            <button
              type="button"
              className="absolute z-10 top-2 right-2 p-1 hover:bg-gray-100 rounded transition-colors password-visibility-toggle"
              onClick={handleChangePasswordVisibility}
            >
              <img 
                src={showPassword ? '/eye.svg' : '/eye-slash.svg'} 
                alt={showPassword ? t('auth.login.hidePassword') : t('auth.login.showPassword')} 
                className="h-6 w-6"
              />
            </button>
          </div>

          <div className="text-right forgot-password-link">
            <Link href="/auth/reset-password" className="text-sm text-blue-600 hover:underline">
              {t('auth.login.forgotPassword')}
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full bg-blue-900 text-white py-2.5 sm:py-3 px-4 rounded-md hover:bg-blue-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm sm:text-base login-submit-button"
          >
            {isLoggingIn && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            )}
            <span>{isLoggingIn ? t('auth.login.signingIn') : t('auth.login.loginButton')}</span>
          </button>
        </form>
      </div>
    </LoginTutorial>
  )
})