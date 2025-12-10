'use client'

import Link from "next/link";
import React, {useEffect, useState} from "react";
import { Announcement, AnnouncementCreateRequest} from "@/types/announcements.types";
import {useGetAnnouncementDetails, useMutateAnnouncement} from "@/hooks/announcements.hook";
import {Dialog} from "@headlessui/react";
import {useGetRooms} from "@/hooks/rooms.hook";
import {useGetActiveDormitories} from "@/hooks/dormitories.hook";
import {Room} from "@/types/rooms.types";
import { FileText, Download, Calendar, Users, Building, DoorOpen } from "lucide-react";
import { useLanguage } from "@/providers/language.provider";

export interface AdminAnnouncementProps {
    id: string
}

export default function AdminAnnouncement({id}:AdminAnnouncementProps){
    const { t } = useLanguage();
    const [attachedFiles, setAttachedFiles] = useState<File[]>([])
    const [addresses, setAddresses] = useState<{id: string, label: string}[]>([])
    const [addingAddresses, setAddingAddresses] = useState<boolean>(false)

    const [announcementDetails, setAnnouncementDetails] = useState<Announcement>({
        id: '',
        title: '',
        content: '',
        authorId: '',
        isHidden: false,
        postedAt: '',
        expiresAt: '',
        attachments: [],
        recipients: []
    })

    const {data: announcement, isLoading, error, refetch} = useGetAnnouncementDetails(id)

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target

        if(name !== "attachmentUrls"){
            setAnnouncementDetails(prev =>({...prev, [name]:value}))
        }

    }

    const handleCheckboxChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, checked} = e.target

        if(name === "forEveryone"){
            setAnnouncementDetails(prev =>({...prev, [name]: checked}))
        }
    }

    const handleCancelAddAddresses = () => {
        setAddingAddresses(false)
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    const handleDownloadAttachment = (url: string, filename: string) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    useEffect(() => {
        if(announcement){
            setAnnouncementDetails(announcement)
        }
    }, [announcement]);



    return (
        <div className=" w-full bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="px-4 py-6 md:px-6 md:py-8">
                    <div className="flex items-center space-x-3">
                        <div className="p-3 bg-blue-600 rounded-xl shadow-lg">
                            <Link href={`/admin/announcements`}>
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 18l-6-6 6-6" />
                                </svg>
                            </Link>
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                                {t('announcements.details.announcementTitle')}
                            </h1>
                            <p>
                                {t('announcements.details.backToList')}
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
                                        <h2 className="text-xl font-semibold text-white">{t('announcements.details.announcementContent')}</h2>
                                    </div>
                                </div>

                                {/* Form Content */}
                                <div className="p-6 space-y-6">
                                    {/* Title Input */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            {t('announcements.new.announcementTitle')}
                                        </label>
                                        <input
                                            type="text"
                                            value={announcementDetails.title}
                                            name="title"
                                            disabled={true}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-lg"
                                        />
                                    </div>

                                    {/* Description Textarea */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            {t('announcements.details.description')}
                                        </label>
                                        <textarea
                                            value={announcementDetails.content}
                                            name="content"
                                            disabled={ true}
                                            rows={12}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                                        />
                                        <p className="text-sm text-gray-500">
                                            {t('announcements.details.charactersCount', { count: announcementDetails.content.length })}
                                        </p>
                                    </div>

                                    {/* Attached Files Section */}
                                    <div className="space-y-4">
                                        <label className="block text-sm font-medium text-gray-700">
                                            {t('announcements.details.attachedFiles')}
                                        </label>
                                        {announcementDetails.attachments && announcementDetails.attachments.length > 0 ? (
                                            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                                                {announcementDetails.attachments.map((file, index) => (
                                                    <div key={index} className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                                                        <div className="flex items-center space-x-3 flex-1 min-w-0">
                                                            <FileText className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                                            <div className="min-w-0 flex-1">
                                                                <p className="text-sm font-medium text-gray-900 truncate">{file.fileName}</p>
                                                                <p className="text-xs text-gray-500">{t('announcements.details.attachments')}</p>
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={() => handleDownloadAttachment(file.url, file.fileName)}
                                                            className="ml-3 p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex-shrink-0"
                                                            title={t('announcements.details.downloadFile')}
                                                        >
                                                            <Download className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-500 text-sm">
                                                {t('announcements.details.noFilesAttached')}
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
                                    <div className="flex items-center space-x-3">
                                        <Users className="w-5 h-5 text-white" />
                                        <h3 className="text-lg font-semibold text-white">{t('announcements.details.recipients')}</h3>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="space-y-3">
                                        {announcementDetails.recipients && announcementDetails.recipients.length > 0 ? (
                                            announcementDetails.recipients.map((recipient, index) => (
                                                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                                                    {recipient.forEveryone ? (
                                                        <>
                                                            <Users className="w-5 h-5 text-green-600" />
                                                            <span className="text-sm font-medium text-gray-900">{t('announcements.details.everyone')}</span>
                                                        </>
                                                    ) : recipient.userId ? (
                                                        <>
                                                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                            </svg>
                                                            <span className="text-sm font-medium text-gray-900">{t('announcements.details.userId', { id: recipient.userId })}</span>
                                                        </>
                                                    ) : recipient.roomId ? (
                                                        <>
                                                            <DoorOpen className="w-5 h-5 text-purple-600" />
                                                            <span className="text-sm font-medium text-gray-900">{t('announcements.details.roomId', { id: recipient.roomId })}</span>
                                                        </>
                                                    ) : recipient.floorId ? (
                                                        <>
                                                            <Building className="w-5 h-5 text-orange-600" />
                                                            <span className="text-sm font-medium text-gray-900">{t('announcements.details.floorId', { id: recipient.floorId })}</span>
                                                        </>
                                                    ) : recipient.dormitoryId ? (
                                                        <>
                                                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                            </svg>
                                                            <span className="text-sm font-medium text-gray-900">{t('announcements.details.dormitoryId', { id: recipient.dormitoryId })}</span>
                                                        </>
                                                    ) : null}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-4 text-gray-500 text-sm">
                                                {t('announcements.details.noRecipients')}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Dates Section */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                <div className="bg-blue-600 px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                        <Calendar className="w-5 h-5 text-white" />
                                        <h3 className="text-lg font-semibold text-white">{t('announcements.details.importantDates')}</h3>
                                    </div>
                                </div>

                                <div className="p-6 space-y-4">
                                    <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                        <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <div>
                                            <p className="text-xs font-medium text-blue-900 uppercase tracking-wide">{t('announcements.details.postedAt')}</p>
                                            <p className="text-sm text-blue-800 mt-1">
                                                {announcementDetails.postedAt ? formatDate(announcementDetails.postedAt) : t('announcements.details.notAvailable')}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                                        <svg className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                        <div>
                                            <p className="text-xs font-medium text-orange-900 uppercase tracking-wide">{t('announcements.details.expiresAt')}</p>
                                            <p className="text-sm text-orange-800 mt-1">
                                                {announcementDetails.expiresAt ? formatDate(announcementDetails.expiresAt) : t('announcements.details.noExpiration')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Dialog onClose={handleCancelAddAddresses} open={addingAddresses}>

            </Dialog>
        </div>
    )
}