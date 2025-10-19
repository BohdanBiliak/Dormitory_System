'use client'

import {useEffect, useState} from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth.hook'
import { RegisterFormTutorial } from '@/app/tutorials/auth/register'

export function RegisterForm() {
  const { register, isLoading } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    secondName: '',
    email: '',
    password: '',
    passwordRepeat: '',
    avatar: null as File | null,
    studentIdFront: null as File | null,
    studentIdBack: null as File | null,
  })

  const [validationErrors, setValidationErrors] = useState({
    name: '',
    secondName: '',
    email: '',
    password: '',
    passwordRepeat: '',
    studentIdFront: '',
  })

  useEffect(() => {
    setValid(validationErrors.name==='' && validationErrors.secondName==='' && validationErrors.email==='' && validationErrors.password==='' && validationErrors.passwordRepeat==='' && validationErrors.studentIdFront==='')
  },[validationErrors])

  const [valid, setValid] = useState<boolean>(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target
    
    if (files && files.length > 0) {
      setFormData(prev => ({ ...prev, [name]: files[0] }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }

    setValidationErrors(prevState => {
      if(!prevState)return prevState;
      return { ...prevState, [name]: '' }
    })

  }

  const handleValidate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    //first name validation
    if(name === 'name'){
      if(value.trim() === ''){
        setValidationErrors(prevState => {
          if(!prevState) return prevState;
          return {
            ...prevState,
            name: 'Field should not be empty'
          }
        })
      }else if(value.trim().length < 3){
        setValidationErrors(prevState => {
          if(!prevState) return prevState;
          return {
            ...prevState,
            name: 'Field should be at least 3 characters long',
          }
        })
      }else{
        setValidationErrors(prevState => {
          if(!prevState) return prevState;
          return {
            ...prevState,
            name: '',
          }
        })
      }
    }

    //second name validation
    if(name === 'secondName'){
      if(value.trim() === ''){
        setValidationErrors(prevState => {
          if(!prevState) return prevState;
          return {
            ...prevState,
            secondName: 'Field should not be empty'
          }
        })
      }else if(value.trim().length < 3){
        setValidationErrors(prevState => {
          if(!prevState) return prevState;
          return {
            ...prevState,
            secondName: 'Field should be at least 3 characters long',
          }
        })
      }else{
        setValidationErrors(prevState => {
          if(!prevState) return prevState;
          return {
            ...prevState,
            secondName: '',
          }
        })
      }
    }
    //email validation
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(name === 'email'){
      if(value.trim() === ''){
        setValidationErrors(prevState => {
          if(!prevState) return prevState;
          return {
            ...prevState,
            email: 'Field should not be empty'
          }
        })
      }else if(!email_pattern.test(value)){
        setValidationErrors(prevState => {
          if(!prevState) return prevState;
          return {
            ...prevState,
            email: 'Email is invalid',
          }
        })
      }else{
        setValidationErrors(prevState => {
          if(!prevState) return prevState;
          return {
            ...prevState,
            email: ''
          }
        })
      }
    }

    //password validation
    if(name === 'password'){
      if(value.trim() === ''){
        setValidationErrors(prevState => {
          if(!prevState) return prevState;
          return {
            ...prevState,
            password: 'Field should not be empty'
          }
        })
      }else if(value.trim().length < 6){
        setValidationErrors(prevState => {
          if(!prevState) return prevState;
          return{
            ...prevState,
            password: "Password should be at least 6 characters long",
          }
        })
      }else{
        setValidationErrors(prevState => {
          if(!prevState) return prevState;
          return {
            ...prevState,
            password: ''
          }
        })
      }
    }

    //password repeat validation
    if(name === 'passwordRepeat'){
      if(value.trim() === ''){
        setValidationErrors(prevState => {
          if(!prevState) return prevState;
          return {
            ...prevState,
            passwordRepeat: 'Field should not be empty'
          }
        })
      }else if(value.trim().length < 6){
        setValidationErrors(prevState => {
          if(!prevState) return prevState;
          return{
            ...prevState,
            passwordRepeat: "Password should be at least 6 characters long",
          }
        })
      }else if(value !==formData.password){
        setValidationErrors(prevState => {
          if(!prevState) return prevState;
          return {
            ...prevState,
            passwordRepeat: 'Passwords do not match',
          }
        })
      }else{
        setValidationErrors(prevState => {
          if(!prevState) return prevState;
          return {
            ...prevState,
            passwordRepeat: '',
          }
        })
      }
    }
  }

  const validateForm = () => {

    if (!formData.name.trim()) setValidationErrors(prevState=>{if(!prevState)return prevState; return {...prevState, name:'Name is required'}})
    if (!formData.secondName.trim()) setValidationErrors(prevState=>{if(!prevState)return prevState; return {...prevState, secondName:'Second name is required'}})
    if (!formData.email.trim()) setValidationErrors(prevState=>{if(!prevState)return prevState; return {...prevState, email:'Email is required'}})
    else if (!/\S+@\S+\.\S+/.test(formData.email)) setValidationErrors(prevState=>{if(!prevState)return prevState; return {...prevState, email:'Email is invalid'}})
    if (!formData.password) setValidationErrors(prevState=>{if(!prevState)return prevState; return {...prevState, password:'Password is required'}})
    else if (formData.password.length < 6) setValidationErrors(prevState=>{if(!prevState)return prevState; return {...prevState, password:'Password must be at least 6 symbols long'}})
    if (!formData.passwordRepeat) setValidationErrors(prevState=>{if(!prevState)return prevState; return {...prevState,passwordRepeat:'Please repeat your password'}})
    else if (formData.password !== formData.passwordRepeat) setValidationErrors(prevState=>{if(!prevState)return prevState; return {...prevState,passwordRepeat:'Passwords do not match'}})
    if (!formData.studentIdFront) setValidationErrors(prevState=>{if(!prevState)return prevState; return {...prevState,studentIdFront:'Student ID front image is required'}})
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    validateForm()
    if(!valid)return

    try {
      await register({
        ...formData,
        avatar: formData.avatar ?? undefined,
        studentIdFront: formData.studentIdFront ?? undefined,
        studentIdBack: formData.studentIdBack ?? undefined,
      })
    } catch (error) {
      console.error('Registration error:', error)
    }
  }

  //show/hide password
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const handleChangePasswordVisibility = (e: React.MouseEvent<HTMLButtonElement>)=>{
    setShowPassword(!showPassword)
  }
  const handleChangePasswordRepeatVisibility = (e: React.MouseEvent<HTMLButtonElement>)=>{
    setShowRepeatPassword(!showRepeatPassword)
  }

  return (
    <RegisterFormTutorial>
      <div className="w-full max-w-2xl mx-auto my-4 sm:my-6 lg:my-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8 register-form-header">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-600 mt-2 text-sm sm:text-base lg:text-lg">
            Join the dormitory system
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="bg-gray-50 p-4 sm:p-6 rounded-lg border personal-info-section">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Personal Information
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="first-name-input">
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onBlur={handleValidate}
                  disabled={isLoading}
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 transition-colors text-sm sm:text-base ${
                    validationErrors.name ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                  placeholder="Enter your first name"
                />
                {validationErrors.name && <p className="text-red-500 text-xs sm:text-sm mt-1 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {validationErrors.name}
                </p>}
              </div>

              <div className="last-name-input">
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="secondName"
                  value={formData.secondName}
                  onChange={handleInputChange}
                  onBlur={handleValidate}
                  disabled={isLoading}
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 transition-colors text-sm sm:text-base ${
                    validationErrors.secondName ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                  placeholder="Enter your last name"
                />
                {validationErrors.secondName && <p className="text-red-500 text-xs sm:text-sm mt-1 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {validationErrors.secondName}
                </p>}
              </div>
            </div>

            <div className="mt-4 sm:mt-6 email-input">
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleValidate}
                disabled={isLoading}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 transition-colors text-sm sm:text-base ${
                  validationErrors.email? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                }`}
                placeholder="Enter your email address"
              />
              {validationErrors.email && <p className="text-red-500 text-xs sm:text-sm mt-1 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {validationErrors.email}
              </p>}
            </div>
          </div>

          <div className="bg-gray-50 p-4 sm:p-6 rounded-lg border security-section">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Security
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="password-input">
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
                  Password *
                </label>
                <div className={`relative`}>
                  <input
                    type={showPassword ? 'text': "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    onBlur={handleValidate}
                    disabled={isLoading}
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 transition-colors text-sm sm:text-base ${
                      validationErrors.password ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                    }`}
                    placeholder="Enter password"
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
                        alt={showPassword ? 'Hide password' : 'Show password'}
                        className="h-6 w-6"
                    />
                  </button>
                </div>
              </div>

              <div className="password-confirm-input">
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
                  Confirm Password *
                </label>
                <div className={`relative`}>
                  <input
                    type={showRepeatPassword? "text" : "password"}
                    name="passwordRepeat"
                    value={formData.passwordRepeat}
                    onChange={handleInputChange}
                    onBlur={handleValidate}
                    disabled={isLoading}
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 transition-colors text-sm sm:text-base ${
                      validationErrors.passwordRepeat ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                    }`}
                    placeholder="Confirm password"
                  />
                  {validationErrors.passwordRepeat && <p className="text-red-500 text-xs sm:text-sm mt-1 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {validationErrors.passwordRepeat}
                  </p>}
                  <button
                      type="button"
                      className="absolute z-10 top-2 right-2 p-1 hover:bg-gray-100 rounded transition-colors password-visibility-toggle"
                      onClick={handleChangePasswordRepeatVisibility}
                  >
                    <img
                        src={showPassword ? '/eye.svg' : '/eye-slash.svg'}
                        alt={showPassword ? 'Hide password' : 'Show password'}
                        className="h-6 w-6"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 sm:p-6 rounded-lg border document-upload-section">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Document Upload
            </h3>
            
            <div className="space-y-4 sm:space-y-6">
              <div className="avatar-upload">
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                  Profile Avatar (Optional)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    name="avatar"
                    onChange={handleInputChange}
                    disabled={isLoading}
                    accept="image/*"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 text-sm sm:text-base file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors"
                  />
                </div>
                {formData.avatar && (
                  <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-xs sm:text-sm text-green-800 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Selected: {formData.avatar.name}
                    </p>
                  </div>
                )}
              </div>

              <div className="student-id-front-upload">
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                  Student ID (Front) *
                </label>
                <div className="relative">
                  <input
                    type="file"
                    name="studentIdFront"
                    onChange={handleInputChange}
                    disabled={isLoading}
                    accept="image/*"
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 text-sm sm:text-base file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors ${
                      validationErrors.studentIdFront ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                    }`}
                  />
                </div>
                {validationErrors.studentIdFront && <p className="text-red-500 text-xs sm:text-sm mt-1 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {validationErrors.studentIdFront}
                </p>}
                {formData.studentIdFront && (
                  <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-xs sm:text-sm text-green-800 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Selected: {formData.studentIdFront.name}
                    </p>
                  </div>
                )}
              </div>

              <div className="student-id-back-upload">
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                  Student ID (Back) (Optional)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    name="studentIdBack"
                    onChange={handleInputChange}
                    disabled={isLoading}
                    accept="image/*"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 text-sm sm:text-base file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors hover:border-gray-400"
                  />
                </div>
                {formData.studentIdBack && (
                  <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-xs sm:text-sm text-green-800 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Selected: {formData.studentIdBack.name}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="pt-4 submit-button">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-900 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm sm:text-base font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {isLoading && (
                <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div>
              )}
              <span>{isLoading ? 'Creating Account...' : 'Create Account'}</span>
            </button>
          </div>

          <div className="text-center pt-4 border-t border-gray-200 login-link">
            <p className="text-sm sm:text-base text-gray-600">
              Already have an account?{' '}
              <Link 
                href="/auth/login" 
                className="text-blue-600 hover:text-blue-500 font-medium transition-colors underline hover:no-underline"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </RegisterFormTutorial>
  )
}