'use client'

import React, { useState, useEffect } from 'react'
import {useMutateAnnouncement} from "@/hooks/announcements.hook";
import {AnnouncementCreateRequest} from "@/types/announcements.types";
import Link from "next/link";
import {useGetActiveDormitories} from "@/hooks/dormitories.hook";
import {useGetRooms} from "@/hooks/rooms.hook";
import AddressesDialogComponent, {AddresseeItem, AddresseeType } from "@/components/dialogs/admin/AddressesDialog.component";
import { useRouter } from 'next/navigation';
import { useLanguage } from "@/providers/language.provider";



export function AdminNewAnnouncement(){
    const { t } = useLanguage();
    const router = useRouter()
    const [attachedFiles, setAttachedFiles] = useState<File[]>([])
    const [addresses, setAddresses] = useState<{id: string, label: string, type: AddresseeType, addressee: AddresseeItem}[]>([])
    const [showAddressesDialog, setShowAddressesDialog] = useState<boolean>(false)
    const [minDate, setMinDate] = useState<string>('')

    const [preselectedAddresses, setPreselectedAddresses] = useState<string[]>([])

    const [newAnnouncement, setNewAnnouncement] = useState<AnnouncementCreateRequest>({
        title: '',
        content: '',
        expiresAt: '',
    })

    const {createAnnouncement, uploadAnnouncementAttachment, creatingAnnouncement} = useMutateAnnouncement()
    const {data: activeDormitories, isLoading: loadingDormitories, error: dormsErrors} = useGetActiveDormitories()

    // Set minimum date on client side only to prevent hydration mismatch
    useEffect(() => {
        setMinDate(new Date().toISOString().split('T')[0])
    }, [])

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setAttachedFiles(prev => [...prev, ...Array.from(event.target.files || [])])
        }
    }

    const removeFile = (index: number) => {
        setAttachedFiles(prev => prev.filter((_, i) => i !== index))
    }


    const removeAddresses = (index: number) => {
        const addressToRemove = addresses[index]
        const updatedAddresses = addresses.filter((_, i) => i !== index)
        setAddresses(updatedAddresses)
        
        // Update announcement recipients
        const userIds: string[] = []
        const roomIds: string[] = []
        const floorIds: string[] = []
        const dormitoryIds: string[] = []
        
        updatedAddresses.forEach((addr) => {
            if (addr.addressee.type === AddresseeType.Resident && addr.addressee.resident) {
                userIds.push(addr.addressee.resident.id)
            } else if (addr.addressee.type === AddresseeType.Room && addr.addressee.room) {
                roomIds.push(addr.addressee.room.id)
            } else if (addr.addressee.type === AddresseeType.Floor && addr.addressee.floor) {
                floorIds.push(addr.addressee.floor.id)
            } else if (addr.addressee.type === AddresseeType.Dormitory && addr.addressee.dormitory) {
                dormitoryIds.push(addr.addressee.dormitory.id)
            }
        })
        
        const updates: Partial<AnnouncementCreateRequest> = {};
        
        if (userIds.length > 0) updates.userIds = userIds;
        if (roomIds.length > 0) updates.roomIds = roomIds;
        if (floorIds.length > 0) updates.floorIds = floorIds;
        if (dormitoryIds.length > 0) updates.dormitoryIds = dormitoryIds;
        
        setNewAnnouncement(prev => ({
            ...prev,
            ...updates
        }))
    }

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        try{
            if(attachedFiles && attachedFiles.length !== 0){
                uploadAnnouncementAttachment(attachedFiles)
                attachedFiles.forEach((elem, i) => {
                    console.log('URL:', URL.createObjectURL(elem));
                    setNewAnnouncement(prev => ({...prev, attachmentUrls: [...(prev.attachmentUrls || []), URL.createObjectURL(elem)]}))
                    console.log('Announcement after file add:', newAnnouncement)
                })
            }
            
            // Prepare the announcement data, excluding empty arrays and false values for optional properties
            const announcementData: any = {
                title: newAnnouncement.title,
                content: newAnnouncement.content,
                expiresAt: newAnnouncement.expiresAt,
            };
            
            if (newAnnouncement.attachmentUrls && newAnnouncement.attachmentUrls.length > 0) {
                announcementData.attachmentUrls = newAnnouncement.attachmentUrls;
            }
            
            if (newAnnouncement.forEveryone) {
                announcementData.forEveryone = newAnnouncement.forEveryone;
            }
            
            if (newAnnouncement.userIds && newAnnouncement.userIds.length > 0) {
                announcementData.userIds = newAnnouncement.userIds;
            }
            
            if (newAnnouncement.roomIds && newAnnouncement.roomIds.length > 0) {
                announcementData.roomIds = newAnnouncement.roomIds;
            }
            
            if (newAnnouncement.floorIds && newAnnouncement.floorIds.length > 0) {
                announcementData.floorIds = newAnnouncement.floorIds;
            }
            
            if (newAnnouncement.dormitoryIds && newAnnouncement.dormitoryIds.length > 0) {
                announcementData.dormitoryIds = newAnnouncement.dormitoryIds;
            }
            
            createAnnouncement(announcementData, {
                onSuccess: () => {
                    router.push('/admin/announcements')
                }
            })
        }catch(e){
            // console.log(e)
        }
    }

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target

        if(name === "expiresAt"){
            const isoString = new Date(value + "T00:00:00Z").toISOString()
            setNewAnnouncement(prev => ({...prev, expiresAt: isoString}))
        } else if(name !== "attachmentUrls"){
            setNewAnnouncement(prev =>({...prev, [name]:value}))
        }
    }

    const handleCheckboxChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, checked} = e.target

        if(name === "forEveryone"){
            setNewAnnouncement(prev =>({...prev, [name]: checked}))
        }
    }

    const handleCloseAddressesDialog = () => {
        setShowAddressesDialog(false);
    }

    const handleOpenAddressesDialog = () => {
        const preselect = addresses.map((addressee) =>
            addressee.addressee.id
        )
        setPreselectedAddresses(preselect)
        setShowAddressesDialog(true);
    }

    const handleConfirmAddressesInDialog = (selected: AddresseeItem[]) => {
        const newAddressees:{id: string, label: string, type: AddresseeType, addressee: AddresseeItem}[] = []
        
        // Separate recipients by type
        const userIds: string[] = []
        const roomIds: string[] = []
        const floorIds: string[] = []
        const dormitoryIds: string[] = []
        
        selected.forEach((item,index) => {
            newAddressees.push({
                id: index.toString(),
                label: item.label,
                type: item.type,
                addressee: item
            })
            
            // Add to appropriate array based on type
            if (item.type === AddresseeType.Resident && item.resident) {
                userIds.push(item.resident.id)
            } else if (item.type === AddresseeType.Room && item.room) {
                roomIds.push(item.room.id)
            } else if (item.type === AddresseeType.Floor && item.floor) {
                floorIds.push(item.floor.id)
            } else if (item.type === AddresseeType.Dormitory && item.dormitory) {
                dormitoryIds.push(item.dormitory.id)
            }
        })
        
        // Update announcement with recipient IDs
        const updates: Partial<AnnouncementCreateRequest> = {};
        
        if (userIds.length > 0) updates.userIds = userIds;
        if (roomIds.length > 0) updates.roomIds = roomIds;
        if (floorIds.length > 0) updates.floorIds = floorIds;
        if (dormitoryIds.length > 0) updates.dormitoryIds = dormitoryIds;
        
        setNewAnnouncement(prev => ({
            ...prev,
            ...updates
        }))
        
        setAddresses(newAddressees)
        setShowAddressesDialog(false)
    }

    return(
        <div className="w-full bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="px-4 py-6 md:px-6 md:py-8">
                    <div className="flex items-center space-x-3">
                        <div className="p-3 bg-blue-600 rounded-xl shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                                {t('announcements.new.title')}
                            </h1>
                            <p className="text-gray-600 text-sm md:text-base mt-1">
                                {t('announcements.new.subtitle')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="p-4 md:p-6 lg:p-8">
                <div className="w-full px-6">
                    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                        
                        {/* Main Announcement Form */}
                        <div className="xl:col-span-3">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                {/* Form Header */}
                                <div className="bg-blue-600 px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                                        </svg>
                                        <h2 className="text-xl font-semibold text-white">{t('announcements.new.announcementContent')}</h2>
                                    </div>
                                </div>

                                {/* Form Content */}
                                <div className="p-6 space-y-6">
                                    {/* Title Input */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            {t('announcements.new.announcementTitleRequired')}
                                        </label>
                                        <input
                                            type="text"
                                            value={newAnnouncement.title}
                                            name="title"
                                            onChange={handleInputChange}
                                            placeholder={t('announcements.new.enterTitle')}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-lg"
                                        />
                                    </div>

                                    {/* Description Textarea */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            {t('announcements.new.descriptionRequired')}
                                        </label>
                                        <textarea
                                            value={newAnnouncement.content}
                                            name="content"
                                            onChange={handleInputChange}
                                            placeholder={t('announcements.new.writeContent')}
                                            rows={12}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                                        />
                                        <p className="text-sm text-gray-500">
                                            {t('announcements.new.charactersCount', { count: newAnnouncement.content.length })}
                                        </p>
                                    </div>

                                    {/* Attached Files Section */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <label className="block text-sm font-medium text-gray-700">
                                                {t('announcements.new.attachedFiles')}
                                            </label>
                                            <label className="cursor-pointer">
                                                <input
                                                    type="file"
                                                    multiple
                                                    onChange={handleFileUpload}
                                                    className="hidden"
                                                />
                                                <span className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                                    </svg>
                                                    {t('announcements.new.attachFiles')}
                                                </span>
                                            </label>
                                        </div>

                                        {attachedFiles.length > 0 && (
                                            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                                                {attachedFiles.map((file, index) => (
                                                    <div key={index} className="flex items-center justify-between bg-white p-3 rounded-lg border">
                                                        <div className="flex items-center space-x-3">
                                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                            </svg>
                                                            <div>
                                                                <p className="text-sm font-medium text-gray-900">{file.name}</p>
                                                                <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={() => removeFile(index)}
                                                            className="text-red-500 hover:text-red-700 transition-colors"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="xl:col-span-1 space-y-6">
                            {/* Recipients Section */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                <div className="bg-green-600 px-6 py-4">
                                    <label className="flex items-center space-x-3">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        <h3 className="text-lg font-semibold text-white">{t('announcements.new.recipients')}</h3>
                                    </label>
                                    <label className="flex items-center space-x-3">
                                        <h4 className="text-sm text-white">
                                            {t('announcements.new.generalAnnouncement')}
                                        </h4>
                                        <input
                                            type="checkbox"
                                            name="forEveryone"
                                            checked={newAnnouncement.forEveryone || false}
                                            onChange={handleCheckboxChange}
                                            className={`sr-only`}
                                        />
                                        <div className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                                            (newAnnouncement.forEveryone || false) ? 'bg-blue-600' : 'bg-gray-300'
                                        }`}>
                                            <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                                                (newAnnouncement.forEveryone || false) ? 'translate-x-5' : 'translate-x-0'
                                            }`}/>
                                        </div>
                                    </label>
                                </div>

                                <div className="p-6">
                                    <div className="space-y-4">
                                        {addresses.map((address, index) => (
                                            <div key={index} className="flex items-center space-x-2">
                                                <div className="flex items-center space-x-2">
                                                    {address.label}
                                                </div>
                                                <button
                                                    onClick={() => removeAddresses(index)}
                                                    className="text-red-500 hover:text-red-700 transition-colors"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ))}

                                        <button
                                            onClick={handleOpenAddressesDialog}
                                            className="w-full flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-green-400 hover:text-green-600 transition-colors"
                                        >
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                            {t('announcements.new.addRecipient')}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Settings Section */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                <div className="bg-purple-600 px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <h3 className="text-lg font-semibold text-white">{t('announcements.new.settings')}</h3>
                                    </div>
                                </div>

                                <div className="p-6 space-y-4">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            {t('announcements.new.expirationDateRequired')}
                                        </label>
                                        <input
                                            name="expiresAt"
                                            type="date"
                                            min={minDate}
                                            value={newAnnouncement.expiresAt ? new Date(newAnnouncement.expiresAt).toISOString().split('T')[0] : ''}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-4">
                            <Link className="w-full sm:w-auto px-6 py-3 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors" href={`/admin/announcements`}>
                                {t('announcements.new.cancel')}
                            </Link>
                            <button className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center space-x-2" onClick={handleSubmit}>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                                <span>{t('announcements.new.publishAnnouncement')}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
           <AddressesDialogComponent open={showAddressesDialog} onClose={handleCloseAddressesDialog} onConfirm={handleConfirmAddressesInDialog} preSelected={preselectedAddresses}/>
        </div>
    )
}