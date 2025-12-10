'use client'

import {useGetRoom, useUpdateRoom, useUploadRoomPhoto} from "@/hooks/rooms.hook";
import React, {useEffect, useRef, useState} from "react";
import {RoomStatus} from "@/types/rooms.types";
import {CalendarOfAvailabilityComponent} from "@/components/ui/CalendarOfAvailability.component";
import {ChevronLeft, ChevronRight, Edit3, Users, DollarSign, Camera, Settings, AlertTriangle, X, Check} from "lucide-react";
import {Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle} from "@headlessui/react";
import { useLanguage } from "@/providers/language.provider";

interface RoomPageProps {
    roomId: string
}

export function UserRoomPage({roomId}: RoomPageProps) {
    const { t } = useLanguage();
    {/*Initial values*/}
    const {data: room, isLoading, error} = useGetRoom(roomId)

    const [roomInfo, setRoomInfo] = useState<{
        name: string,
        capacity: number,
        residents: {
            id: string,
            displayName: string,
            secondName: string,
            email: string,
        }[],
        pricePerDay: number,
        pricePerMonth: number,
        statuses: RoomStatus[],
        photos: string[],
        roomEquipment: string[],
    }>({
        name: "",
        capacity: 0,
        residents: [],
        pricePerDay: 0,
        pricePerMonth: 0,
        statuses: [],
        photos: [],
        roomEquipment: []
    })

    {/*room update use effect*/}

    useEffect(() => {
        if(room){
            // Use price from price category if available, otherwise fall back to room price
            const pricePerDay = room?.priceCategory?.pricePerDay || room?.price?.pricePerDay || 0;
            const pricePerMonth = room?.priceCategory?.pricePerMonth || room?.price?.pricePerMonth || 0;

            setRoomInfo({
                name: room?.number || "",
                capacity: room?.capacity || 0,
                residents: room?.residents || [],
                pricePerDay: pricePerDay,
                pricePerMonth: pricePerMonth,
                statuses: room?.statuses || [],
                photos: room?.photos || [],
                roomEquipment: room?.roomEquipment || [],
            })
        }

        setCurrentIndex(0)
    },[room])

    {/*Photo logic*/}
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        setCurrentIndex(prev => (prev === 0 && roomInfo?.photos && roomInfo.photos? roomInfo.photos.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex(prev => (roomInfo?.photos && prev === roomInfo.photos.length - 1? 0 : prev + 1));
    };

    //Room statuses dialog
    const[dateStatuses, setDateStatuses] = useState<RoomStatus[]>([]);
    const[showStatusesDialog, setShowStatusesDialog] = useState(false)

    const closeStatusesDialog = () => {
        setShowStatusesDialog(false)
    }

    //Photos Dialog
    const [showPhotosDialog, setShowPhotosDialog] = useState(false)

    const closePhotosDialog = () => {
        setShowPhotosDialog(false)
    }


    if(isLoading){
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-slate-50">
                <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md mx-4 border border-slate-200">
                    <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
                        <span className="ml-4 text-slate-700 font-medium text-lg">{t('rooms.userRoomPage.loading')}</span>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-slate-50">
                <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md mx-4 border border-red-200 animate-in slide-in-from-bottom-4 duration-300">
                    <div className="text-center">
                        <div className="text-red-500 mb-4 animate-in zoom-in-50 duration-500 delay-150">
                            <AlertTriangle className="mx-auto h-16 w-16" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-800 mb-2 animate-in fade-in duration-300 delay-200">{t('rooms.userRoomPage.errorLoading')}</h3>
                        <p className="text-slate-600 animate-in fade-in duration-300 delay-300">{t('rooms.userRoomPage.errorMessage')}</p>
                    </div>
                </div>
            </div>
        )
    }


    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 shadow-sm animate-in slide-in-from-top-4 duration-500">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="animate-in fade-in-0 slide-in-from-left-4 duration-500">
                            <h1 className="text-3xl font-bold text-slate-900">{t('rooms.userRoomPage.title', { roomNumber: roomInfo.name })}</h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column - Room Details */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Basic Information Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in-0 slide-in-from-bottom-4 duration-500 hover:shadow-md transition-all">
                            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
                                <h2 className="text-lg font-semibold text-slate-900 flex items-center">
                                    <Settings className="w-5 h-5 mr-2 text-blue-600 animate-in spin-in-180 duration-700 delay-200" />
                                    {t('rooms.userRoomPage.basicInformation')}
                                </h2>
                            </div>
                            <div className="p-6 space-y-6">
                                {/* Room Number */}
                                <div className="group delay-100">
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="text-sm font-medium text-slate-700">{t('rooms.roomNumber')}</label>
                                    </div>
                                    <input
                                        type="text"
                                        value={roomInfo.name}
                                        disabled={true}
                                        name="name"
                                        className={`w-full px-3 py-2 border rounded-lg text-sm font-medium  border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    />
                                </div>

                                {/* Capacity */}
                                <div className="group delay-150">
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="text-sm font-medium text-slate-700">
                                            {t('rooms.userRoomPage.roomCapacity')}
                                        </label>
                                    </div>
                                    <input
                                        type="number"
                                        value={roomInfo.capacity}
                                        disabled={true}
                                        name="capacity"
                                        className={`w-full px-3 py-2 border rounded-lg text-sm font-medium  border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    />
                                </div>

                                {/* Pricing */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 delay-200">
                                    <div className="group">
                                        <div className="flex flex-col mb-2">
                                            <div className="flex items-center justify-between">
                                                <label className="text-sm font-medium text-slate-700">{t('rooms.pricePerDay')}</label>
                                            </div>
                                            {room?.priceCategory && (
                                                <span className="text-xs text-blue-600 mt-0.5">{t('rooms.userRoomPage.fromPriceCategory', { categoryName: room.priceCategory.name })}</span>
                                            )}
                                        </div>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-2.5 w-4 h-4 text-slate-400 transition-colors duration-200 group-focus-within:text-blue-500" />
                                            <input
                                                type="number"
                                                value={roomInfo.pricePerDay}
                                                disabled={true}
                                                name="pricePerDay"
                                                className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm font-medium  border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="group">
                                        <div className="flex flex-col mb-2">
                                            <div className="flex items-center justify-between">
                                                <label className="text-sm font-medium text-slate-700">{t('rooms.pricePerMonth')}</label>
                                            </div>
                                            {room?.priceCategory && (
                                                <span className="text-xs text-blue-600 mt-0.5">{t('rooms.userRoomPage.fromPriceCategory', { categoryName: room.priceCategory.name })}</span>
                                            )}
                                        </div>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-2.5 w-4 h-4 text-slate-400 transition-colors duration-200 group-focus-within:text-blue-500" />
                                            <input
                                                type="number"
                                                value={roomInfo.pricePerMonth}
                                                disabled={true}
                                                name="pricePerMonth"
                                                className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm font-medium  border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* Room Equipment Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-200 hover:shadow-md transition-all">
                            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-semibold text-slate-900 flex items-center">
                                        <Settings className="w-5 h-5 mr-2 text-blue-600 animate-in spin-in-180 duration-700 delay-400" />
                                        {t('rooms.userRoomPage.roomEquipment')}
                                    </h2>
                                </div>
                            </div>
                            <div className="p-6">
                                {roomInfo.roomEquipment && roomInfo.roomEquipment.length > 0 ? (
                                    <div className="space-y-3">
                                        {roomInfo.roomEquipment.map((_, index) => (
                                            <div key={index}
                                                 className="relative flex items-center gap-2"
                                                 style={{ animationDelay: `${index * 50}ms` }}
                                            >
                                                <input
                                                    type="text"
                                                    name={`eq-${index}`}
                                                    value={roomInfo.roomEquipment[index]}
                                                    disabled={true}
                                                    className={`flex-1 px-3 py-2 border rounded-lg text-sm  hover:shadow-sm ring-blue-100 bg-white focus:outline-none focus:ring-2`}
                                                    placeholder={t('rooms.userRoomPage.equipmentItem', { index: index + 1 })}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                ) : (

                                    <div className="text-center py-8 animate-in fade-in-0 zoom-in-50 duration-500">
                                        <Settings className="mx-auto h-12 w-12 text-slate-300" />
                                        <p className="mt-2 text-slate-500">{t('rooms.manage.noEquipment')}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Calendar Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-300 hover:shadow-md transition-all">
                            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex flex-row space-x-6">
                                <h2 className="text-lg font-semibold text-slate-900 delay-500">{t('rooms.userRoomPage.availabilityCalendar')}</h2>
                            </div>
                            <div className="p-6 animate-in fade-in-0 zoom-in-95 duration-500 delay-600">
                                <CalendarOfAvailabilityComponent statuses={roomInfo.statuses} showLegend={true}/>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Photos */}
                    <div className="lg:col-span-1 animate-in fade-in-0 slide-in-from-right-4 duration-500 delay-200">
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden sticky top-8 hover:shadow-md ">
                            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-semibold text-slate-900 flex items-center">
                                        <Camera className="w-5 h-5 mr-2 text-blue-600 animate-in spin-in-180 duration-700 delay-500" />
                                        {t('rooms.photos')}
                                    </h2>
                                </div>
                            </div>
                            <div className="p-6">
                                {roomInfo.photos.length > 0 ? (
                                    <div className="space-y-4">
                                        <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-100 group">
                                            <img
                                                key={currentIndex}
                                                src={roomInfo.photos[currentIndex]}
                                                alt={`Room photo ${currentIndex + 1}`}
                                                className="w-full h-full object-cover  ease-out animate-in fade-in-0 zoom-in-95"
                                            />

                                            {/* Navigation arrows */}
                                            {roomInfo.photos.length > 1 && (
                                                <>
                                                    <button
                                                        onClick={goToPrevious}
                                                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70  opacity-0 group-hover:opacity-100"
                                                    >
                                                        <ChevronLeft size={20} className="transition-transform duration-200 hover:-translate-x-0.5" />
                                                    </button>
                                                    <button
                                                        onClick={goToNext}
                                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70  opacity-0 group-hover:opacity-100"
                                                    >
                                                        <ChevronRight size={20} className="transition-transform duration-200 hover:translate-x-0.5" />
                                                    </button>
                                                </>
                                            )}

                                            {/* Image counter */}
                                            <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium  opacity-0 group-hover:opacity-100">
                                                {currentIndex + 1} / {roomInfo.photos.length}
                                            </div>
                                        </div>

                                        {/* Dots indicator */}
                                        {roomInfo.photos.length > 1 && (
                                            <div className="flex justify-center gap-2 delay-300">
                                                {roomInfo.photos.map((_, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => setCurrentIndex(index)}
                                                        className={`w-2 h-2 rounded-full  hover:scale-125 ${
                                                            index === currentIndex
                                                                ? 'bg-blue-600 scale-110'
                                                                : 'bg-slate-300 hover:bg-slate-400'
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-center py-12 animate-in fade-in-0 zoom-in-50 duration-500">
                                        <Camera className="mx-auto h-12 w-12 text-slate-300" />
                                        <p className="mt-2 text-slate-500">{t('rooms.manage.noPhotos')}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*Statuses dialog*/}
            <Dialog onClose={closeStatusesDialog} open={showStatusesDialog} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/60 backdrop-blur-sm " />
                <div className="fixed inset-0 flex items-center justify-center p-1 xs:p-2 sm:p-4">
                    <DialogPanel className="w-full h-full xs:h-[98vh] sm:h-auto sm:max-w-6xl bg-white xs:rounded-lg sm:rounded-2xl shadow-2xl animate-in zoom-in-95 fade-in-0 duration-300 slide-in-from-bottom-4 sm:max-h-[90vh] overflow-hidden flex flex-col">
                        {/* Header */}
                        <div className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 bg-emerald-600 border-b border-emerald-200 flex-shrink-0">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2 xs:space-x-3 min-w-0 flex-1">
                                    <div className="flex items-center justify-center w-8 h-8 xs:w-10 xs:h-10 bg-white/20 rounded-full backdrop-blur-sm flex-shrink-0">
                                        <svg className="w-4 h-4 xs:w-5 xs:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <DialogTitle className="text-sm xs:text-base sm:text-lg font-semibold text-white truncate">
                                            {t('rooms.userRoomPage.roomAvailabilityStatus')}
                                        </DialogTitle>
                                        <Description className="text-emerald-100 text-xs sm:text-sm mt-0.5 xs:mt-1 line-clamp-1">
                                            {t('rooms.userRoomPage.manageBookingStatuses')}
                                        </Description>
                                    </div>
                                </div>
                                <button
                                    onClick={closeStatusesDialog}
                                    className="flex items-center justify-center w-6 h-6 xs:w-8 xs:h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white flex-shrink-0 ml-2"
                                >
                                    <svg className="w-3 h-3 xs:w-4 xs:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto">
                            <div className="flex flex-col lg:flex-row h-full">
                                {/* Calendar and Info */}
                                <div className="flex-1 p-3 xs:p-4 sm:p-6 bg-slate-50">
                                    <div className="mb-4 xs:mb-6">
                                        <h2 className="text-sm xs:text-base sm:text-lg font-semibold text-slate-900 flex items-center mb-3 xs:mb-4">
                                            <svg className="w-4 h-4 xs:w-5 xs:h-5 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            {t('rooms.userRoomPage.availabilityCalendar')}
                                        </h2>

                                        {/* Room Info Cards */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4 mb-4 xs:mb-6">
                                            <div className="bg-white rounded-lg p-3 xs:p-4 shadow-sm border border-slate-200">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="text-xs xs:text-sm text-slate-600">{t('rooms.userRoomPage.currentOccupancy')}</p>
                                                        <p className="text-lg xs:text-xl sm:text-2xl font-bold text-slate-900">{roomInfo.residents.length}/{roomInfo.capacity}</p>
                                                    </div>
                                                    <div className="flex items-center justify-center w-10 h-10 xs:w-12 xs:h-12 bg-blue-100 rounded-full">
                                                        <svg className="w-5 h-5 xs:w-6 xs:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-2.239" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className="mt-2">
                                                    <div className="flex w-full bg-slate-200 rounded-full h-1.5 xs:h-2">
                                                        <div
                                                            className="bg-blue-600 h-1.5 xs:h-2 rounded-full "
                                                            style={{ width: `${(roomInfo.residents.length / roomInfo.capacity) * 100}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-white rounded-lg p-3 xs:p-4 shadow-sm border border-slate-200">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="text-xs xs:text-sm text-slate-600">{t('rooms.userRoomPage.activeStatuses')}</p>
                                                        <p className="text-lg xs:text-xl sm:text-2xl font-bold text-slate-900">{dateStatuses.length}</p>
                                                    </div>
                                                    <div className="flex items-center justify-center w-10 h-10 xs:w-12 xs:h-12 bg-emerald-100 rounded-full">
                                                        <svg className="w-5 h-5 xs:w-6 xs:h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Calendar Component */}
                                        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                                            <CalendarOfAvailabilityComponent
                                                statuses={roomInfo.statuses}
                                                showLegend={true}
                                                setDateStatuses={setDateStatuses}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Status Management Sidebar */}
                                <div className="w-full lg:w-96 bg-white border-t lg:border-t-0 lg:border-l border-slate-200 p-3 xs:p-4 sm:p-6">
                                    <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-slate-900 mb-4 xs:mb-6 flex items-center">
                                        <svg className="w-4 h-4 xs:w-5 xs:h-5 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                                        </svg>
                                        {t('rooms.userRoomPage.statusManagement')}
                                    </h3>

                                    {/* Current Statuses */}
                                    <div className="mb-4 xs:mb-6">
                                        <h4 className="text-xs xs:text-sm font-medium text-slate-700 mb-2 xs:mb-3">{t('rooms.userRoomPage.currentStatuses')}</h4>
                                        {dateStatuses.length > 0 ? (
                                            <div className="space-y-2 xs:space-y-3 max-h-48 xs:max-h-64 overflow-y-auto">
                                                {dateStatuses.map(status => (
                                                    <div key={status.id} className="bg-slate-50 rounded-lg p-2 xs:p-3 border border-slate-200">
                                                        <div className="flex items-start justify-between">
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-xs xs:text-sm font-medium text-slate-900 truncate">{status.description}</p>
                                                                <div className="text-xs text-slate-600 mt-1">
                                                                    <span>{new Date(status.dateOfStart).toLocaleDateString()}</span>
                                                                    <span className="mx-1">→</span>
                                                                    <span>{status.dateOfEnd ? new Date(status.dateOfEnd).toLocaleDateString() : t('rooms.userRoomPage.ongoing')}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-6 xs:py-8 text-slate-500">
                                                <svg className="w-6 h-6 xs:w-8 xs:h-8 mx-auto mb-2 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                </svg>
                                                <p className="text-xs xs:text-sm">{t('rooms.userRoomPage.noActiveStatuses')}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>

            {/*Edit photos dialog*/}
            <Dialog onClose={closePhotosDialog} open={showPhotosDialog} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-all duration-150" />
                <div className="fixed inset-0 flex items-center justify-center">
                    <DialogPanel className="w-full h-full max-w-none bg-white shadow-2xl transition-all duration-150 overflow-hidden flex flex-col">
                        {/* Header */}
                        <div className="px-4 sm:px-6 py-4 bg-blue-600 border-b border-blue-200 transition-all duration-100 flex-shrink-0">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3 min-w-0 flex-1">
                                    <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-full backdrop-blur-sm flex-shrink-0">
                                        <Camera className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <DialogTitle className="text-lg sm:text-xl font-semibold text-white truncate">
                                            {t('rooms.userRoomPage.roomPhotos')}
                                        </DialogTitle>
                                        <Description className="text-blue-100 text-sm mt-1 line-clamp-1">
                                            {t('rooms.userRoomPage.managePhotos')}
                                        </Description>
                                    </div>
                                </div>
                                <button
                                    onClick={closePhotosDialog}
                                    className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-100 text-white flex-shrink-0 ml-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto">
                            <div className="flex flex-col lg:flex-row h-full">
                                {/* Main Photo Display */}
                                <div className="flex-1 p-4 sm:p-6 bg-slate-50">
                                    <div className="h-full flex flex-col">
                                        <h2 className="text-base sm:text-lg font-semibold text-slate-900 flex items-center mb-4">
                                            <Camera className="w-5 h-5 mr-2 text-blue-600" />
                                            {t('rooms.userRoomPage.currentView')}
                                        </h2>

                                        {roomInfo.photos.length > 0 ? (
                                            <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full">
                                                <div className="relative rounded-lg overflow-hidden bg-slate-100 group shadow-lg" style={{ maxHeight: '400px', aspectRatio: '16/9' }}>
                                                    <img
                                                        key={currentIndex}
                                                        src={roomInfo.photos[currentIndex]}
                                                        alt={`Room photo ${currentIndex + 1}`}
                                                        className="w-full h-full object-contain  ease-out animate-in fade-in-0 zoom-in-95"
                                                    />

                                                    {/* Navigation arrows */}
                                                    {roomInfo.photos.length > 1 && (
                                                        <>
                                                            <button
                                                                onClick={goToPrevious}
                                                                className="absolute left-2 xs:left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 xs:p-3 rounded-full hover:bg-black/70 transition-all duration-100 opacity-0 group-hover:opacity-100"
                                                            >
                                                                <ChevronLeft className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" />
                                                            </button>
                                                            <button
                                                                onClick={goToNext}
                                                                className="absolute right-2 xs:right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 xs:p-3 rounded-full hover:bg-black/70 transition-all duration-100 opacity-0 group-hover:opacity-100"
                                                            >
                                                                <ChevronRight className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" />
                                                            </button>
                                                        </>
                                                    )}

                                                    {/* Image counter */}
                                                    <div className="absolute bottom-2 xs:bottom-4 right-2 xs:right-4 bg-black/70 text-white px-2 xs:px-3 py-1 rounded-full text-xs xs:text-sm font-medium  opacity-0 group-hover:opacity-100">
                                                        {currentIndex + 1} / {roomInfo.photos.length}
                                                    </div>
                                                </div>

                                                {/* Dots indicator */}
                                                {roomInfo.photos.length > 1 && (
                                                    <div className="flex justify-center gap-1.5 xs:gap-2 mt-3 xs:mt-4 delay-300">
                                                        {roomInfo.photos.map((_, index) => (
                                                            <button
                                                                key={index}
                                                                onClick={() => setCurrentIndex(index)}
                                                                className={`w-2 h-2 xs:w-3 xs:h-3 rounded-full  hover:scale-125 ${
                                                                    index === currentIndex
                                                                        ? 'bg-blue-600 scale-110'
                                                                        : 'bg-slate-300 hover:bg-slate-400'
                                                                }`}
                                                            />
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="flex-1 flex items-center justify-center text-center py-8 xs:py-12 animate-in fade-in-0 zoom-in-50 duration-500">
                                                <div>
                                                    <Camera className="mx-auto h-12 w-12 xs:h-16 xs:w-16 text-slate-300 mb-3 xs:mb-4" />
                                                    <h3 className="text-base xs:text-lg font-semibold text-slate-900 mb-2">{t('rooms.userRoomPage.noPhotosTitle')}</h3>
                                                    <p className="text-slate-500 text-sm xs:text-base">{t('rooms.userRoomPage.noPhotosMessage')}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Photo Gallery Sidebar */}
                                <div className="w-full lg:w-80 bg-white border-t lg:border-t-0 lg:border-l border-slate-200 p-4 sm:p-6">
                                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-4 flex items-center">
                                        <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                        {t('rooms.userRoomPage.photoGallery')}
                                    </h3>

                                    <div className="space-y-3 max-h-96 overflow-y-auto">
                                        {/* Existing Photos */}
                                        {roomInfo.photos.map((photo, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentIndex(index)}
                                                className={`w-full aspect-video rounded-lg overflow-hidden group border-2 transition-all duration-100 ${
                                                    index === currentIndex
                                                        ? 'border-blue-500 shadow-lg'
                                                        : 'border-slate-200 hover:border-blue-300'
                                                }`}
                                            >
                                                <img
                                                    src={photo}
                                                    alt={`Room photo ${index + 1}`}
                                                    className="w-full h-full object-cover transition-transform duration-100"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>

        </div>
    )
}