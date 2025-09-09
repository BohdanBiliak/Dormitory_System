'use client'

import { usePublicDormitoryDetails } from '@/hooks/public-dormitories.hook'
import Link from 'next/link'

export interface GuestDormitoryDetailsPageProps{
  id:string;
}

export function GuestDormitoryDetailsPage({ id }:GuestDormitoryDetailsPageProps) {
  const { data: dormitory, isLoading, error } = usePublicDormitoryDetails(id)

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center bg-gray-50">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md mx-4">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-700 font-medium">Loading dormitory details...</span>
          </div>
        </div>
      </div>
    )
  }

  if (error || !dormitory) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md mx-4">
          <div className="text-center">
            <div className="text-red-500 mb-3">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <p className="text-gray-700 font-medium">Dormitory not found</p>
            <Link href="/dormitories" className="text-blue-600 hover:text-blue-700 text-sm mt-2 inline-block">
              ← Back to dormitories list
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Link href="/dormitories" className="text-blue-600 hover:text-blue-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div className="p-2 bg-blue-600 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                {dormitory.name}
              </h1>
              <p className="text-gray-600 text-sm md:text-base">
                Dormitory Information
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-semibold text-white">
                    {dormitory.name}
                  </h2>
                  <p className="text-blue-100 text-sm">
                    ID: {dormitory.id}
                  </p>
                </div>
              </div>
              
              {/* Status Badge */}
              <div className="mt-3 sm:mt-0">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  dormitory.status === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    dormitory.status === 'Active' ? 'bg-green-400' : 'bg-red-400'
                  }`}></div>
                  {dormitory.status}
                </span>
              </div>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Basic Information */}
              <div className="lg:col-span-2 space-y-6">
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 pb-2 border-b border-gray-200">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-900">Dormitory Information</h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Name</label>
                      <div className="text-base font-semibold text-gray-900">{dormitory.name}</div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Address</label>
                      <div className="text-base text-gray-900">{dormitory.address}</div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Ground Floor Phone</label>
                      <div className="text-base text-gray-900">{dormitory.groundFloorPhoneNumber}</div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Status</label>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        dormitory.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        <div className={`w-2 h-2 rounded-full mr-2 ${
                          dormitory.status === 'Active' ? 'bg-green-400' : 'bg-red-400'
                        }`}></div>
                        {dormitory.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Statistics */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 pb-2 border-b border-gray-200">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-900">Availability</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-900">Available</div>
                    <div className="text-sm text-blue-600">Ready for occupancy</div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">For more information about room availability and booking, please contact the administration.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <h3 className="text-lg font-semibold text-blue-900">Contact Information</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-blue-800">
                    <span className="font-medium">Ground Floor Phone:</span> {dormitory.groundFloorPhoneNumber}
                  </p>
                  <p className="text-blue-700 text-sm">
                    Contact the ground floor reception for inquiries about room availability, applications, and general information.
                  </p>
                </div>
              </div>
            </div>

            {/* Application Notice */}
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-yellow-800 font-medium">
                  To apply for accommodation at this dormitory, please contact the administration office or call the ground floor reception.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}