'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth.hook'

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
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target
    
    if (files && files.length > 0) {
      setFormData(prev => ({ ...prev, [name]: files[0] }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

 const validateForm = () => {
  const newErrors: Record<string, string> = {}

  if (!formData.name.trim()) newErrors.name = 'Name is required'
  if (!formData.secondName.trim()) newErrors.secondName = 'Second name is required' // Make it required
  if (!formData.email.trim()) newErrors.email = 'Email is required'
  else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
  if (!formData.password) newErrors.password = 'Password is required'
  else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
  if (!formData.passwordRepeat) newErrors.passwordRepeat = 'Please repeat your password'
  else if (formData.password !== formData.passwordRepeat) newErrors.passwordRepeat = 'Passwords do not match'
  if (!formData.studentIdFront) newErrors.studentIdFront = 'Student ID front image is required'

  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    try {
      await register({
        ...formData,
        avatar: formData.avatar ?? undefined,
        studentIdFront: formData.studentIdFront ?? undefined,
        studentIdBack: formData.studentIdBack ?? undefined,
      })
      // Success message will be shown by the hook
    } catch (error) {
      // Error handling is done in the hook
      console.error('Registration error:', error)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto my-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
        <p className="text-gray-600 mt-2">
          Join the dormitory system
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              disabled={isLoading}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your first name"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name *
            </label>
            <input
              type="text"
              name="secondName"
              value={formData.secondName}
              onChange={handleInputChange}
              disabled={isLoading}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 ${
                errors.secondName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your last name"
            />
            {errors.secondName && <p className="text-red-500 text-xs mt-1">{errors.secondName}</p>}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            disabled={isLoading}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        {/* Password */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password *
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              disabled={isLoading}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter password"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Repeat Password *
            </label>
            <input
              type="password"
              name="passwordRepeat"
              value={formData.passwordRepeat}
              onChange={handleInputChange}
              disabled={isLoading}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 ${
                errors.passwordRepeat ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Repeat password"
            />
            {errors.passwordRepeat && <p className="text-red-500 text-xs mt-1">{errors.passwordRepeat}</p>}
          </div>
        </div>

        {/* File Uploads */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Avatar (Optional)
            </label>
            <input
              type="file"
              name="avatar"
              onChange={handleInputChange}
              disabled={isLoading}
              accept="image/*"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 text-sm"
            />
            {formData.avatar && (
              <p className="text-xs text-gray-600 mt-1">Selected: {formData.avatar.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Student ID (Front) *
            </label>
            <input
              type="file"
              name="studentIdFront"
              onChange={handleInputChange}
              disabled={isLoading}
              accept="image/*"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 text-sm ${
                errors.studentIdFront ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.studentIdFront && <p className="text-red-500 text-xs mt-1">{errors.studentIdFront}</p>}
            {formData.studentIdFront && (
              <p className="text-xs text-gray-600 mt-1">Selected: {formData.studentIdFront.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Student ID (Back) (Optional)
            </label>
            <input
              type="file"
              name="studentIdBack"
              onChange={handleInputChange}
              disabled={isLoading}
              accept="image/*"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 text-sm"
            />
            {formData.studentIdBack && (
              <p className="text-xs text-gray-600 mt-1">Selected: {formData.studentIdBack.name}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isLoading && (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          )}
          <span>{isLoading ? 'Creating Account...' : 'Create Account'}</span>
        </button>

        {/* Footer Links */}
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-blue-600 hover:text-blue-500 font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}