'use client'

import React, { useState, useEffect } from 'react'
import {useGetAdminProfile, useMutateAdminProfile} from '@/hooks/profile.hook'
import { useLanguage } from '@/providers/language.provider'

export function AdminProfileForm() {
  const { t } = useLanguage()
  const{updateProfile, isUpdatingProfile, uploadAvatar, uploadingAvatar} = useMutateAdminProfile()

  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState<{
    displayName: string,
    secondName: string,
    email: string,
    photo: string,
  }>({
    displayName: '',
    secondName: '',
    email: '',
    photo: ''
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const {data: user, isLoading, error} = useGetAdminProfile()

  useEffect(() => {
    if (user) {
      setProfileData({
        displayName: user?.displayName || '',
        secondName: user?.secondName || '',
        email: user?.email || '',
        photo: user?.picture || '',
      })
    }
  }, [user, isEditing])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target

    if(name === 'photo' && files && files[0]) {
      setSelectedFile(files[0])
      const previewUrl = URL.createObjectURL(files[0])

      setProfileData(prev=>({...prev, photo: previewUrl}))
      console.log('previewUrl', profileData.photo)
    }
    setProfileData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    try {
      if (selectedFile){
        const {url} = await uploadAvatar({file:selectedFile})
        if(url){
          setProfileData(prevState => ({...prevState, photo: url}))
        }
      }

      if (profileData.displayName || profileData.secondName || profileData.email || profileData.photo) {
        updateProfile({
          displayName: profileData.displayName,
          secondName: profileData.secondName,
          email: profileData.email,
          picture: profileData.photo,
        })
      }

      setSelectedFile(null)
      setIsEditing(false)
    } catch (error) {
      console.error('Save error:', error)
    }
  }

  const handleCancel = () => {
  // Clean up preview URL if it exists
  if (selectedFile && profileData.photo.startsWith('blob:')) {
    URL.revokeObjectURL(profileData.photo)
  }

  setProfileData({
    displayName: user?.displayName || '',
    secondName: user?.secondName || '',
    email: user?.email || '',
    photo: user?.picture || ''
  })
  setSelectedFile(null)
  setIsEditing(false)
}

  if(isLoading){
    return (
        <div className="w-full flex items-center justify-center bg-gray-50">
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-md mx-4">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-700 font-medium">{t('profile.loadingAdminProfile')}</span>
            </div>
          </div>
        </div>
    )
  }

  if(error){
    return (
        <div className="w-full flex items-center justify-center bg-gray-50">
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-md mx-4">
            <div className="text-center">
              <div className="text-red-500 mb-3">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <p className="text-gray-700 font-medium">{t('profile.errorLoadingProfile')}</p>
            </div>
          </div>
        </div>
    )
  }

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-blue-800 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                {t('profile.adminProfile')}
              </h1>
              <p className="text-gray-600 text-sm md:text-base">
                {t('profile.manageAccountSettings')}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-blue-800 to-blue-700 px-6 py-4 md:px-8 md:py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-semibold text-white">
                    {t('profile.personalInformation')}
                  </h2>
                  <p className="text-blue-100 text-sm">
                    {isEditing ? t('profile.editProfileDetails') : t('profile.viewCurrentInformation')}
                  </p>
                </div>
              </div>
              
              {/* Status Badge */}
              <div className="mt-3 sm:mt-0">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  {t('profile.activeAdmin')}
                </span>
              </div>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Profile Photo Section */}
              <div className="lg:col-span-1 order-first lg:order-last">
                <div className="sticky top-8">
                  <div className="bg-gray-50 rounded-xl p-6 text-center border-2 border-dashed border-gray-200 hover:border-blue-300 transition-colors">
                    <div className="relative inline-block">
                      <div className="w-24 h-24 md:w-32 md:h-32 mx-auto bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mb-4 overflow-hidden shadow-inner">
                        {user?.picture ? (
                          <img
                            src={user.picture}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <svg className="w-12 h-12 md:w-16 md:h-16 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        )}
                      </div>
                      {uploadingAvatar && (
                        <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                          <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                        </div>
                      )}
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 mb-1">{t('profile.profilePhoto')}</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {uploadingAvatar ? t('profile.uploading') : t('profile.jpgPngUpTo5MB')}
                    </p>
                    
                    {isEditing && (
                      <div className="space-y-3">
                        <label className="block">
                          <span className="sr-only">{t('profile.chooseProfilePhoto')}</span>
                          <input
                            type="file"
                            name="photo"
                            onChange={handleInputChange}
                            disabled={isLoading}
                            accept="image/*"
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
                          />
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Form Fields Section */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Personal Details */}
                <div className="space-y-6">
                                    <div className="flex items-center space-x-2 pb-2 border-b border-gray-200">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-900">{t('profile.personalDetails')}</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        {t('profile.displayName')}
                        {isEditing && <span className="text-blue-800 ml-1">*</span>}
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="displayName"
                          value={profileData.displayName}
                          onChange={handleInputChange}
                          disabled={!isEditing || isLoading}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
                          placeholder={t('profile.enterDisplayName')}
                        />
                        {isEditing && (
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <svg className="w-4 h-4 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        {t('profile.lastName')}
                        {isEditing && <span className="text-blue-800 ml-1">*</span>}
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="secondName"
                          value={profileData.secondName}
                          onChange={handleInputChange}
                          disabled={!isEditing || isLoading}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
                          placeholder={t('profile.enterLastName')}
                        />
                        {isEditing && (
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <svg className="w-4 h-4 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      {t('profile.emailAddress')}
                      {isEditing && <span className="text-blue-800 ml-1">*</span>}
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing || isLoading}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
                        placeholder={t('profile.enterEmailAddress')}
                      />
                      {/*<div className="absolute inset-y-0 left-0 flex items-center pl-3">*/}
                      {/*  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">*/}
                      {/*    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />*/}
                      {/*  </svg>*/}
                      {/*</div>*/}
                      {isEditing && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <svg className="w-4 h-4 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Account Information */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 pb-2 border-b border-gray-200">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-900">{t('profile.accountInformation')}</h3>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{t('profile.administratorRole')}</p>
                          <p className="text-sm text-gray-600">{t('profile.fullSystemAccess')}</p>
                        </div>
                      </div>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {user?.role || t('profile.admin')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-8 mt-8 border-t border-gray-200">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    disabled={isLoading}
                    className="w-full sm:w-auto px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {t('profile.cancelChanges')}
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="w-full sm:w-auto px-6 py-3 bg-blue-800 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isLoading && (
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    )}
                    <span>{isLoading ? t('profile.saving') : t('profile.saveChanges')}</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full sm:w-auto px-6 py-3 bg-blue-800 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span>{t('profile.editProfile')}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}