'use client'

import {useEffect, useState} from "react"
import {useUserList, useUserProfile} from "@/hooks/userList.hook";
import Link from "next/link";

interface UserProfileFormProps {
    userId:string;
}

export function UserProfileForm({userId}:UserProfileFormProps){
    const {activateUser, dectivateUser: deactivateUser, activatingUser, deactivatingUser} = useUserList();

    const [profileData, setProfileData] = useState({
        displayName: '',
        lastName: '',
        email: '',
        photo: '',
        role: 'user'
    })

    const {data: userProfileData, isLoading, error} = useUserProfile(userId);

    useEffect(() => {
        if(userProfileData){
            setProfileData({
                displayName: userProfileData.displayName,
                lastName: userProfileData.secondName,
                email: userProfileData.email,
                role: userProfileData.role,
                photo: userProfileData.picture,
            })
        }
    }, [userProfileData]);

    const handleUserDeactivation = () => {
        console.log("Deactivating user ", profileData)
        deactivateUser({id:userId});
    }

    const handleUserActivation = () => {
        console.log("Activating user ", profileData)
        activateUser({id:userId});
    }

    if(isLoading){
        return (
            <div className=" w-full flex items-center justify-center bg-gray-50">
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-md mx-4">
                    <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <span className="ml-3 text-gray-700 font-medium">Loading user profile...</span>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="w-full flex items-center justify-center bg-gray-50">
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-md mx-4">
                    <div className="text-center">
                        <div className="text-red-500 mb-3">
                            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <p className="text-gray-700 font-medium">Error loading user profile. Please try again.</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 lg:p-8">
            <div className="max-w-5xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center space-x-3 mb-2">
                        <div className="p-2 bg-blue-600 rounded-lg">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                                User Profile
                            </h1>
                            <p className="text-gray-600 text-sm md:text-base">
                                View and manage user account information
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {/* Card Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 md:px-8 md:py-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-lg md:text-xl font-semibold text-white">
                                        {profileData.displayName} {profileData.lastName}
                                    </h2>
                                    <p className="text-blue-100 text-sm">
                                        User ID: {userId}
                                    </p>
                                </div>
                            </div>
                            
                            {/* Status Badge */}
                            <div className="mt-3 sm:mt-0">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                    userProfileData?.isActive 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-red-100 text-red-800'
                                }`}>
                                    <div className={`w-2 h-2 rounded-full mr-2 ${
                                        userProfileData?.isActive ? 'bg-green-400' : 'bg-red-400'
                                    }`}></div>
                                    {userProfileData?.isActive ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 md:p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            
                            {/* Profile Photo Section */}
                            <div className="lg:col-span-1 order-first lg:order-last">
                                <div className="bg-gray-50 rounded-xl p-6 text-center border-2 border-dashed border-gray-200">
                                    <div className="w-24 h-24 md:w-32 md:h-32 mx-auto bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mb-4 overflow-hidden shadow-inner">
                                        {userProfileData?.picture ? (
                                            <img
                                                src={profileData.photo}
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <svg className="w-12 h-12 md:w-16 md:h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        )}
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Profile Photo</h3>
                                    <p className="text-sm text-gray-600">
                                        User avatar image
                                    </p>
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
                                        <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                name="displayName"
                                                value={profileData.displayName}
                                                disabled={true}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                name="secondName"
                                                value={profileData.lastName}
                                                disabled={true}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                name="email"
                                                value={profileData.email}
                                                disabled={true}
                                                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
                                            />
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Account Information */}
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-2 pb-2 border-b border-gray-200">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                        <h3 className="text-lg font-semibold text-gray-900">Account Information</h3>
                                    </div>

                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">User Role</p>
                                                    <p className="text-sm text-gray-600">Account permission level</p>
                                                </div>
                                            </div>
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {profileData.role.charAt(0).toUpperCase() + profileData.role.slice(1)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions Section */}
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <div className="flex items-center space-x-2 mb-4">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                </svg>
                                <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <Link href="#" className="group">
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 hover:bg-blue-100 transition-colors">
                                        <div className="flex items-center space-x-3">
                                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            </svg>
                                            <div>
                                                <h4 className="font-medium text-blue-900">Messages</h4>
                                                <p className="text-sm text-blue-600">View conversations</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                <Link href="#" className="group">
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 hover:bg-green-100 transition-colors">
                                        <div className="flex items-center space-x-3">
                                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                            </svg>
                                            <div>
                                                <h4 className="font-medium text-green-900">Payments</h4>
                                                <p className="text-sm text-green-600">Payment history</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                <Link href="#" className="group">
                                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 hover:bg-purple-100 transition-colors">
                                        <div className="flex items-center space-x-3">
                                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                            <div>
                                                <h4 className="font-medium text-purple-900">Room</h4>
                                                <p className="text-sm text-purple-600">Room details</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            {/* Account Control Buttons */}
                            <div className="flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-4">
                                {userProfileData?.isActive ? (
                                    <button 
                                        onClick={handleUserDeactivation}
                                        className="w-full sm:w-auto px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors flex items-center justify-center space-x-2"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                                        </svg>
                                        <span>Deactivate Profile</span>
                                    </button>
                                ) : (
                                    <button 
                                        onClick={handleUserActivation}
                                        className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors flex items-center justify-center space-x-2"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>Activate Profile</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};