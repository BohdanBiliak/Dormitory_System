'use client'
import React, {useEffect, useState, useMemo, memo} from "react";
import {useCurrentUserProfile} from "@/hooks/user.hook";
import {User, UserRole} from "@/types/auth.types";
import {NotificationPermissionBanner, NotificationSettingsButton} from "@/components/ui/NotificationPermission.component";
import { useLanguage } from "@/providers/language.provider";


export const SignedInProfile = memo(function SignedInProfile(){
    const { t } = useLanguage();
    const defaultProfileData = useMemo(() => ({
        id: '',
        email: '',
        displayName: '',
        picture: '',
        role: UserRole.Regular,
        secondName: '',
        isVerified: false,
        isActive: true,
        isTwoFactorEnabled: false,
        createdAt: '',
        updatedAt: '',
    }), []);

    const [profileData, setProfileData] = useState<User>(defaultProfileData);

    const {data:user, isLoading, error, refetch} = useCurrentUserProfile()

    useEffect(()=>{
        if(user){
            setProfileData(user)
        }
    }, [user])


    return(<div className="w-full bg-gray-50 p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
            {/* Notification Permission Banner */}
            <NotificationPermissionBanner />
            
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
                            {t('profile.title')}
                        </h1>
                        <p className="text-gray-600 text-sm md:text-base">
                            {t('profile.viewCurrentInformation')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Card Header */}
                <div className="bg-blue-800 px-6 py-4 md:px-8 md:py-6">
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
                            </div>
                        </div>

                        {/* Status Badge */}
                        <div className="mt-3 sm:mt-0">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  {t('admin.users.active')}
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
                                        <div className="w-24 h-24 md:w-32 md:h-32 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4 overflow-hidden shadow-inner">
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
                                    </div>

                                    <h3 className="font-semibold text-gray-900 mb-1">{t('profile.profilePhoto')}</h3>
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
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="displayName"
                                                value={profileData?.displayName || ''}
                                                disabled={true}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
                                                placeholder={t('profile.enterDisplayName')}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            {t('profile.lastName')}
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="secondName"
                                                value={profileData?.secondName || ''}
                                                disabled={true}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
                                                placeholder={t('profile.enterLastName')}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        {t('profile.emailAddress')}
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            name="email"
                                            value={profileData?.email}
                                            disabled={true}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
                                            placeholder={t('profile.enterEmailAddress')}
                                        />
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
                                            {user?.role && user.role === UserRole.Regular ? (
                                                <div>
                                                    <p className="font-medium text-gray-900">{t('profile.roles.regular')}</p>
                                                    <p className="text-sm text-gray-600">{t('profile.roles.regularDescription')}</p>
                                                </div>
                                            ):(
                                                user?.role && user.role === UserRole.SignedInUser ? (
                                                    <div>
                                                        <p className="font-medium text-gray-900">{t('profile.roles.signedInUser')}</p>
                                                        <p className="text-sm text-gray-600">{t('profile.roles.signedInUserDescription')}</p>
                                                    </div>
                                                ):(
                                                    user?.role && user.role === UserRole.Resident ? (
                                                        <div>
                                                            <p className="font-medium text-gray-900">{t('profile.roles.resident')}</p>
                                                            <p className="text-sm text-gray-600">{t('profile.roles.residentDescription')}</p>
                                                        </div>
                                                    ):(
                                                        <></>
                                                    )
                                                )
                                            )}
                                        </div>
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            {user?.role || 'Admin'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Notification Settings */}
                            <div className="space-y-4">
                                <div className="flex items-center space-x-2 pb-2 border-b border-gray-200">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                    <h3 className="text-lg font-semibold text-gray-900">{t('profile.notifications.title')}</h3>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-gray-900 mb-1">{t('profile.notifications.browserNotifications')}</p>
                                            <p className="text-sm text-gray-600">
                                                {t('profile.notifications.browserNotificationsDescription')}
                                            </p>
                                        </div>
                                        <div className="ml-4">
                                            <NotificationSettingsButton />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
})