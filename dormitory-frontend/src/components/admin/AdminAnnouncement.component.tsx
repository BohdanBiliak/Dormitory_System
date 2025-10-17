'use client'

import Link from "next/link";
import React, {useEffect, useState} from "react";
import { Announcement, AnnouncementCreateRequest} from "@/types/announcements.types";
import {useGetAnnouncementDetails, useMutateAnnouncement} from "@/hooks/announcements.hook";
import {Dialog} from "@headlessui/react";
import {useGetRooms} from "@/hooks/rooms.hook";
import {useGetActiveDormitories} from "@/hooks/dormitories.hook";
import {Room} from "@/types/rooms.types";

export interface AdminAnnouncementProps {
    id: string
}

export default function AdminAnnouncement({id}:AdminAnnouncementProps){
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

        // if(name === "expiresAt"){
        //     setNewAnnouncement(prev =>({...prev, expiresAt: new Date(value).toISOString()}))
        // }else
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

    useEffect(() => {
        if(announcement){
            setAnnouncementDetails(announcement)
        }
    }, [announcement]);



    return (
        <div className=" w-full bg-gradient-to-br from-gray-50 to-gray-100">
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
                                Announcement
                            </h1>
                            <p>
                                Click on the arrow to go back
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="p-4 md:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

                        {/* Main Announcement Form */}
                        <div className="xl:col-span-3">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                {/* Form Header */}
                                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                                        </svg>
                                        <h2 className="text-xl font-semibold text-white">Announcement Content</h2>
                                    </div>
                                </div>

                                {/* Form Content */}
                                <div className="p-6 space-y-6">
                                    {/* Title Input */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Announcement Title
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
                                            Description
                                        </label>
                                        <textarea
                                            value={announcementDetails.content}
                                            name="content"
                                            disabled={ true}
                                            rows={12}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                                        />
                                        <p className="text-sm text-gray-500">
                                            {announcementDetails.content.length} characters
                                        </p>
                                    </div>

                                    {/* Attached Files Section */}
                                    <div className="space-y-4">
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
                                <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
                                    <label className="flex items-center space-x-3">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        <h3 className="text-lg font-semibold text-white">Recipients</h3>
                                    </label>
                                    <label className="flex items-center space-x-3">
                                        <h4 className="text-sm text-white">
                                            General announcement:
                                        </h4>
                                        <input
                                            type="checkbox"
                                            name="forEveryone"
                                            onChange={handleCheckboxChange}
                                            className={`sr-only`}
                                        />
                                        <div className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                                            announcementDetails.isHidden ? 'bg-blue-600' : 'bg-gray-300'
                                        }`}>
                                            <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                                                announcementDetails.isHidden ? 'translate-x-5' : 'translate-x-0'
                                            }`}/>
                                        </div>
                                    </label>
                                </div>

                                <div className="p-6">
                                    <div className="space-y-4">
                                        {addresses.map((address, index) => (
                                            <div key={index} className="flex items-center space-x-2">
                                                <div className="flex items-center space-x-2">
                                                    <label>address</label>
                                                </div>
                                            </div>
                                        ))}

                                        <button
                                            className="w-full flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-green-400 hover:text-green-600 transition-colors"
                                        >
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                            Add Recipient
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Settings Section */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <h3 className="text-lg font-semibold text-white">Settings</h3>
                                    </div>
                                </div>

                                <div className="p-6 space-y-4">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Expiration Date
                                        </label>
                                        <input
                                            name="expiresAt"
                                            type="date"
                                            disabled={true}
                                            value={announcementDetails.expiresAt}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                                        />
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