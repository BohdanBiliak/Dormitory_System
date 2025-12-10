'use client'

import {usePublicDormitoryDetails} from '@/hooks/public-dormitories.hook'
import Link from 'next/link'
import {useState} from "react";
import {ChevronLeft, ChevronRight} from "lucide-react";
import {useCurrentUserProfile} from "@/hooks/user.hook";
import {UserRole} from "@/types/auth.types";
import { useLanguage } from "@/providers/language.provider";

export interface GuestDormitoryDetailsPageProps{
  id:string;
}

export function UsersDormitoryDetailsPageComponent({ id }:GuestDormitoryDetailsPageProps) {
  const { t } = useLanguage();
  const { data: dormitory, isLoading, error } = usePublicDormitoryDetails(id)
  const {data:user, isLoading: isLoadingUserData} = useCurrentUserProfile()

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex(prev => (prev === 0 && dormitory?.photos && dormitory.photos? dormitory.photos.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex(prev => (dormitory?.photos && prev === dormitory.photos.length - 1? 0 : prev + 1));
  };


  if (isLoading || isLoadingUserData) {
    return (
      <div className="w-full flex items-center justify-center bg-gray-50">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md mx-4">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-700 font-medium">{t('dormitoryDetails.loading')}</span>
          </div>
        </div>
      </div>
    )
  }

  if (error || !dormitory) {
    return (
      <div className=" w-full flex items-center justify-center bg-gray-50">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md mx-4">
          <div className="text-center">
            <div className="text-red-500 mb-3">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <p className="text-gray-700 font-medium">{t('dormitoryDetails.notFound')}</p>
            <Link href="/dormitories" className="text-blue-600 hover:text-blue-700 text-sm mt-2 inline-block">
              {t('dormitoryDetails.backToList')}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className=" w-full bg-gray-50 p-4 md:p-6 lg:p-8">
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
                {t('dormitoryDetails.dormitoryInfo')}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Card Header */}
          <div className="bg-blue-600 px-6 py-4 md:px-8 md:py-6">
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
                    <h3 className="text-lg font-semibold text-gray-900">{t('dormitoryDetails.dormitoryInfo')}</h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">{t('dormitoryDetails.fields.name')}</label>
                      <div className="text-base font-semibold text-gray-900">{dormitory.name}</div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">{t('dormitoryDetails.fields.address')}</label>
                      <div className="text-base text-gray-900">{dormitory.address}</div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">{t('dormitoryDetails.fields.groundFloorPhone')}</label>
                      <div className="text-base text-gray-900">{dormitory.groundFloorPhoneNumber}</div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">{t('dormitoryDetails.fields.status')}</label>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        dormitory.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        <div className={`w-2 h-2 rounded-full mr-2 ${
                          dormitory.status === 'Active' ? 'bg-green-400' : 'bg-red-400'
                        }`}></div>
                        {dormitory.status === 'Active' ? t('dormitoryDetails.statuses.active') : t('dormitoryDetails.statuses.inactive')}
                      </span>
                    </div>
                    {dormitory.photos.length > 0 ? (
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">{t('dormitoryDetails.fields.photos')}</label>
                          <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
                            <img
                                src={dormitory.photos[currentIndex]}
                                alt={`Photo ${currentIndex + 1}`}
                                className="w-full h-full object-cover"
                            />

                            {/* Navigation arrows */}
                            {dormitory.photos.length > 1 && (
                                <>
                                  <button
                                      onClick={goToPrevious}
                                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                                  >
                                    <ChevronLeft size={24} />
                                  </button>
                                  <button
                                      onClick={goToNext}
                                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                                  >
                                    <ChevronRight size={24} />
                                  </button>
                                </>
                            )}

                            {/* Image counter */}
                            <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                              {currentIndex + 1} / {dormitory.photos.length}
                            </div>
                          </div>

                          {/* Dots indicator */}
                          {dormitory.photos.length > 1 && (
                              <div className="flex justify-center mt-4 gap-2">
                                {dormitory.photos.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`w-3 h-3 rounded-full transition-colors ${
                                            index === currentIndex
                                                ? 'bg-blue-600'
                                                : 'bg-gray-300 hover:bg-gray-400'
                                        }`}
                                    />
                                ))}
                              </div>
                          )}
                        </div>
                    ) : (<></>)}
                  </div>
                </div>
              </div>

              {/* Statistics */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 pb-2 border-b border-gray-200">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-900">{t('dormitoryDetails.availability.title')}</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-900">{t('dormitoryDetails.availability.available')}</div>
                    <div className="text-sm text-blue-600">{t('dormitoryDetails.availability.readyForOccupancy')}</div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">{t('dormitoryDetails.availability.contactInfo')}</div>
                  </div>
                </div>

                {user && user?.role && user?.role === UserRole.SignedInUser? (
                    <div className="flex flex-col items-center space-y-2">
                      <button className="w-full sm:w-auto px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" >{t('dormitoryDetails.actions.writeToManager')}</button>
                      <button className="w-full sm:w-auto px-6 py-3 bg-blue-800 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2">{t('dormitoryDetails.actions.viewRooms')}</button>
                    </div>
                ):(
                    <></>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <h3 className="text-lg font-semibold text-blue-900">{t('dormitoryDetails.contact.title')}</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-blue-800">
                    <span className="font-medium">{t('dormitoryDetails.contact.groundFloorLabel')}</span> {dormitory.groundFloorPhoneNumber}
                  </p>
                  <p className="text-blue-700 text-sm">
                    {t('dormitoryDetails.contact.description')}
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
                  {t('dormitoryDetails.applicationNotice')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}