'use client'

import React, { useState } from 'react'
import {useMutateAnnouncement} from "@/hooks/announcements.hook";
import {AddressesTypes, AnnouncementCreateRequest} from "@/types/announcements.types";
import Link from "next/link";
import {toast} from "sonner";
import {Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle} from "@headlessui/react";
import {ChevronDown, ChevronUp, Plus, X} from "lucide-react";
import {useGetActiveDormitories} from "@/hooks/dormitories.hook";
import {useGetRooms} from "@/hooks/rooms.hook";

interface AddresseeItem {
    id: string;
    label: string;
    type: AddressesTypes
}

export function AdminNewAnnouncement(){
    const [attachedFiles, setAttachedFiles] = useState<File[]>([])
    const [addresses, setAddresses] = useState<{id: string, label: string, type: AddressesTypes}[]>([])
    const [showAddressesDialog, setShowAddressesDialog] = useState<boolean>(false)

    const [chosenAddresses, setChosenAddresses] = useState<{id: string, label: string, type: AddressesTypes}[]>([])
    const [expandedAddresses, setExpandedAddresses] = useState<{id: string, label: string, type: AddressesTypes}[]>([])

    const [newAnnouncement, setNewAnnouncement] = useState<AnnouncementCreateRequest>({
        title: '',
        content: '',
        expiresAt: '',
        attachmentUrls: [],
        forEveryone: false,
        floorNumbers: [],
        roomIds: [],
        userIds: []
    })

    const {createAnnouncement, uploadAnnouncementAttachment} = useMutateAnnouncement()
    const {data: activeDormitories, isLoading: loadingDormitories, error: dormsErrors} = useGetActiveDormitories()
    const {data: rooms, isLoading: loadingRooms, error: roomsErros} = useGetRooms()

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setAttachedFiles(prev => [...prev, ...Array.from(event.target.files || [])])
        }
    }

    const removeFile = (index: number) => {
        setAttachedFiles(prev => prev.filter((_, i) => i !== index))
    }

    const updateAddresses = (index: number, value: {id: string, label:string, type: AddressesTypes}) => {
        setAddresses(prev => prev.map((addr, i) => i === index ? value : addr))
    }

    const removeAddresses = (index: number) => {
        setAddresses(prev => prev.filter((_, i) => i !== index))
    }

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        try{
            if(attachedFiles && attachedFiles.length !== 0){
                uploadAnnouncementAttachment(attachedFiles)
                attachedFiles.forEach((elem, i) => {
                    setNewAnnouncement(prev => ({...prev, attachmentUrls: [...prev.attachmentUrls, URL.createObjectURL(elem)]}))
                })
            }
            createAnnouncement(newAnnouncement)
        }catch(e){
            console.log(e)
        }
    }

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target

            if(name !== "attachmentUrls"){
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

    const handleToggleAddresses = (expandAddresse:AddresseeItem) => {
        const searchResult = expandedAddresses.find((elem) => {elem.id === expandAddresse.id && elem.type === expandAddresse.type})
        if(searchResult){
            setExpandedAddresses(prev => prev.filter(addresse => addresse !== expandAddresse))
        }else{
            setExpandedAddresses(prev => [...prev,expandAddresse])
        }
    }

    const handleAddAddress = (address:AddresseeItem) => {
        if(!chosenAddresses.find((addr) => {addr.id ===address.id && addr.type === address.type})){
            setChosenAddresses(prev=>[...prev, address])
        }
    }

    const handleRemoveAddress = (address:AddresseeItem) => {
        if(chosenAddresses.find((addr) => {addr.id === address.id && addr.type === address.type})){
            setChosenAddresses(prev => prev.filter(addr => addr !== address))
        }
    }
    const AddresseeItem = ({
        item,
        level,
        isExpanded = false,

    }:{
        item:AddresseeItem,
        level:number,
        isExpanded:boolean,
    }) => {
        <div className={`flex items-center justify-between py-1 px-2 hover:bg-gray-50 ${
            level === 0 ? 'bg-gray-100 font-semibold' : ''
        } ${level === 1 ? 'bg-gray-50' : ''}`}>
            <div className="flex items-center gap-2">

            </div>
        </div>
    }

    return(
        <div className="w-full bg-gradient-to-br from-gray-50 to-gray-100">
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
                                Create New Announcement
                            </h1>
                            <p className="text-gray-600 text-sm md:text-base mt-1">
                                Compose and publish announcements for dormitory residents
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
                                            Announcement Title *
                                        </label>
                                        <input
                                            type="text"
                                            value={newAnnouncement.title}
                                            name="title"
                                            onChange={handleInputChange}
                                            placeholder="Enter announcement title..."
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-lg"
                                        />
                                    </div>

                                    {/* Description Textarea */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Description *
                                        </label>
                                        <textarea
                                            value={newAnnouncement.content}
                                            name="content"
                                            onChange={handleInputChange}
                                            placeholder="Write your announcement content here..."
                                            rows={12}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                                        />
                                        <p className="text-sm text-gray-500">
                                            {newAnnouncement.content.length} characters
                                        </p>
                                    </div>

                                    {/* Attached Files Section */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Attached Files
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
                                                    Attach Files
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
                                            checked={newAnnouncement.forEveryone}
                                            onChange={handleCheckboxChange}
                                            className={`sr-only`}
                                        />
                                        <div className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                                            newAnnouncement.forEveryone ? 'bg-blue-600' : 'bg-gray-300'
                                        }`}>
                                            <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                                                newAnnouncement.forEveryone ? 'translate-x-5' : 'translate-x-0'
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
                                            onClick={()=>setShowAddressesDialog(true)}
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
                                            Expiration Date *
                                        </label>
                                        <input
                                            name="expiresAt"
                                            type="date"
                                            //value={newAnnouncement.expiresAt}
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
                                Cancel
                            </Link>
                            <button className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center space-x-2" onClick={handleSubmit}>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                                <span>Publish Announcement</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Dialog onClose={handleCloseAddressesDialog} open={showAddressesDialog} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel className="w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden">

                        {/*header*/}
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-white/20 rounded-lg">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                    </div>
                                    <div>
                                        <DialogTitle className="text-xl font-semibold text-white">
                                            Create New Dormitory
                                        </DialogTitle>
                                        <Description className="text-blue-100 text-sm mt-1">
                                            Add a new dormitory to the system with room configuration
                                        </Description>
                                    </div>
                                </div>
                                <button
                                    onClick={handleCloseAddressesDialog}
                                    className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                                >
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">

                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </div>
    )
}