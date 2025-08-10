'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/auth.hook'
import { useAdminProfile } from '@/hooks/admin-hook-file'

export function AdminProfileForm() {
  const { user } = useAuth()
  const { updateProfile, uploadAvatar, isUpdatingProfile, isUploadingAvatar } = useAdminProfile()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    displayName: '',    // Match database field
    secondName: '',     // Match database field
    email: '',
    photo: null as File | null
  })

  useEffect(() => {
    if (user) {
      setProfileData({
        displayName: user.displayName || '',
        secondName: user.secondName || '',
        email: user.email || '',
        photo: null
      })
    }
  }, [user])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target
    if (files && name === 'photo') {
      setProfileData(prev => ({ ...prev, photo: files[0] }))
    } else {
      setProfileData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSave = async () => {
    try {
      // Update profile data with correct field names
      if (profileData.displayName || profileData.secondName || profileData.email) {
        await updateProfile({
          displayName: profileData.displayName,
          secondName: profileData.secondName,
          email: profileData.email,
        })
      }

      // Then upload avatar if provided
      if (profileData.photo) {
        await uploadAvatar({
          file: profileData.photo,
          userLastName: profileData.secondName
        })
      }

      setIsEditing(false)
      // Reset photo selection
      setProfileData(prev => ({ ...prev, photo: null }))
    } catch (error) {
      console.error('Save error:', error)
      // Error is already handled by the hooks
    }
  }

  const handleCancel = () => {
    // Reset form data
    if (user) {
      setProfileData({
        displayName: user.displayName || '',
        secondName: user.secondName || '',
        email: user.email || '',
        photo: null
      })
    }
    setIsEditing(false)
  }

  const isLoading = isUpdatingProfile || isUploadingAvatar

  return (
    <div className="max-w-6xl mx-auto bg-white border border-gray-300 rounded-lg">
      {/* Header */}
      <div className="bg-gray-100 px-6 py-4 border-b border-gray-300">
        <h2 className="text-lg font-semibold text-gray-900">Your Profile</h2>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Form Fields */}
          <div className="md:col-span-2 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Display Name: <span className="text-blue-600">✏️</span>
                </label>
                <input
                  type="text"
                  name="displayName"
                  value={profileData.displayName}
                  onChange={handleInputChange}
                  disabled={!isEditing || isLoading}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Photo: <span className="text-blue-600">✏️</span>
                </label>
                <input
                  type="file"
                  name="photo"
                  onChange={handleInputChange}
                  disabled={!isEditing || isLoading}
                  accept="image/*"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 text-sm"
                />
                {profileData.photo && (
                  <p className="text-xs text-gray-600 mt-1">
                    Selected: {profileData.photo.name}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Second Name: <span className="text-blue-600">✏️</span>
              </label>
              <input
                type="text"
                name="secondName"
                value={profileData.secondName}
                onChange={handleInputChange}
                disabled={!isEditing || isLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email: <span className="text-blue-600">✏️</span>
              </label>
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
                disabled={!isEditing || isLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </div>

            <div className="pt-4">
              <p className="text-sm font-medium text-gray-700">
                Role: {user?.role || 'Admin'}
              </p>
            </div>
          </div>

          {/* Profile Photo */}
          <div className="md:col-span-1">
            <div className="border border-gray-300 rounded-md p-4 text-center">
              <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-4">
                {user?.picture ? (
                  <img
                    src={user.picture}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-4xl">👤</span>
                )}
              </div>
              <p className="text-sm text-gray-600">Profile Photo</p>
              {isUploadingAvatar && (
                <p className="text-xs text-blue-600 mt-1">Uploading...</p>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                disabled={isLoading}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
              >
                {isLoading && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                )}
                <span>
                  {isLoading ? 'Saving...' : 'Confirm changes'}
                </span>
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  )
}