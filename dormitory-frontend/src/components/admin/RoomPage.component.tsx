'use client'

import {useGetRoom, useUpdateRoom} from "@/hooks/rooms.hook";
import React, {useEffect, useState} from "react";
import {CreateRoomStatusRequest, RoomStatus, UpdateRoomData} from "@/types/rooms.types";
import {CalendarOfAvailabilityComponent} from "@/components/ui/CalendarOfAvailability.component";
import {ChevronLeft, ChevronRight, Edit3, Users, DollarSign, Camera, Settings, AlertTriangle, X, Check} from "lucide-react";
import Link from "next/link";
import {Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle} from "@headlessui/react";

interface RoomPageProps {
    roomId: string
}

export function RoomPage({roomId}: RoomPageProps) {
    const {updateRoom, postRoomStatus, removeRoomStatus} = useUpdateRoom();

    {/*Initial values*/}

    const {data: room, isLoading, error} = useGetRoom(roomId)
    const [isEditing, setIsEditing] = useState<{
        name: boolean,
        capacity: boolean,
        residents: boolean,
        pricePerDay: boolean,
        pricePerMonth: boolean,
        statuses: boolean,
        photos: boolean,
        roomEquipment: boolean,
    }>({
        name: false,
        capacity: false,
        residents: false,
        pricePerDay: false,
        pricePerMonth: false,
        statuses: false,
        photos: false,
        roomEquipment: false,
    })

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

    {/*Fields update*/}

    const handleEditField = (event:React.MouseEvent<HTMLButtonElement>) => {
        const editingField = event.currentTarget.name;

        setIsEditing({
            name: false,
            capacity: false,
            residents: false,
            pricePerDay: false,
            pricePerMonth: false,
            statuses: false,
            photos: false,
            roomEquipment: false,
            [editingField]: true,
        })

        if(editingField==="statuses"){
            setShowStatusesDialog(true)
        }

        if(editingField==="photos"){
            setShowPhotosDialog(true)
        }
    }

    const handleFieldChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;

        setRoomInfo(prevState => {
            if(!prevState) return prevState;
            return {...prevState, [name]: value}
        })
    }

    {/*Rooms CRUD Logic*/}

    const handleRoomUpdate = () => {
        const dataToUpdate: UpdateRoomData = {
            number: roomInfo.name,
            capacity: roomInfo.capacity,
            roomEquipment: roomInfo.roomEquipment
        }

        if (room) {
            updateRoom({id: room?.id, data: dataToUpdate})
        }

        setIsEditing({
            name: false,
            capacity: false,
            residents: false,
            pricePerDay: false,
            pricePerMonth: false,
            statuses: false,
            photos: false,
            roomEquipment: false,
        })
    }

    const handleCancelRoomUpdate = () => {
        if(room){
            setRoomInfo({
                name: room?.number || "",
                capacity: room?.capacity || 0,
                residents: room?.residents || [],
                pricePerDay: room?.price.pricePerDay || 0,
                pricePerMonth: room?.price.pricePerMonth || 0,
                statuses: room?.statuses || [],
                photos: room?.photos || [],
                roomEquipment: room?.roomEquipment || [],
            })
        }

        setIsEditing({
            name: false,
            capacity: false,
            residents: false,
            pricePerDay: false,
            pricePerMonth: false,
            statuses: false,
            photos: false,
            roomEquipment: false,
        })
    }

    const handleEquipmentChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        const indexToUpdate = name.substring(name.lastIndexOf("-")+1);
        console.log(indexToUpdate)

        const newRoomEquipment: string[] = []

        roomInfo.roomEquipment.map((item, index) => {
            if(indexToUpdate === index.toString()){
                newRoomEquipment.push(value)

            }else{
                newRoomEquipment.push(item)
            }
        })

        setRoomInfo(
            prevState => {
                if(!prevState) return prevState;
                return {...prevState, roomEquipment: newRoomEquipment}
            }
        )
    }

    const handleEvictResidents = (event:React.MouseEvent<HTMLButtonElement>) => { //for eviction menu
        const {value} = event.currentTarget;

        roomInfo.residents.map((resident, index) => {
            if(index.toString() === value){
                setUserToEvict(resident)
                setShowEvictionConfirmation(true)
            }
        })

    }

    const handleEvict = (evnet: React.MouseEvent<HTMLButtonElement>) => {

    }


    {/*room update use effect*/}

    useEffect(() => {
        if(room){
            setRoomInfo({
                name: room?.number || "",
                capacity: room?.capacity || 0,
                residents: room?.residents || [],
                pricePerDay: room?.price.pricePerDay || 0,
                pricePerMonth: room?.price.pricePerMonth || 0,
                statuses: room?.statuses || [],
                //photos: room?.photos || [],
                photos: ["https://dormitoryfiles-bucket.s3.eu-north-1.amazonaws.com/dormitories/74713efb-5a5e-48f7-8f65-81e60d8f1fd6-Dr_dorm.jpg","https://dormitoryfiles-bucket.s3.eu-north-1.amazonaws.com/dormitories/74713efb-5a5e-48f7-8f65-81e60d8f1fd6-Dr_dorm.jpg"],
                roomEquipment: room?.roomEquipment || [],
            })
        }

        setCurrentIndex(0)

        setIsEditing({
            name: false,
            capacity: false,
            residents: false,
            pricePerDay: false,
            pricePerMonth: false,
            statuses: false,
            photos: false,
            roomEquipment: false,
        })

    },[room])

    {/*Photo logic*/}
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        setCurrentIndex(prev => (prev === 0 && roomInfo?.photos && roomInfo.photos? roomInfo.photos.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex(prev => (roomInfo?.photos && prev === roomInfo.photos.length - 1? 0 : prev + 1));
    };

    {/*Eviction confirmation(1st) dialog logic*/}

    const [showEvictionConfirmation, setShowEvictionConfirmation] = useState(false)
    const [userToEvict, setUserToEvict] = useState({
        id: '',
        displayName: '',
        secondName: '',
        email: '',
    })

    const closeEvictionConfirmation = () => {
        setShowEvictionConfirmation(false)
    }

    const openEvictionMenu = () => {
        setShowEvictionConfirmation(false)
        setShowEvictionMenu(true)
    }

    {/*Eviction menu(2nd) dialog logic*/}

    const [showEvictionMenu, setShowEvictionMenu] = useState(false)
    const [evictionInformation, setEvictionInformation] = useState({
        message: '',
        date: '',
    })

    const closeEvictionMenu = () => {
        setEvictionInformation({
            message: '',
            date: '',
        })
        setShowEvictionMenu(false)
    }

    const handleEvictionInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;

        setEvictionInformation(prev => {
            if(!prev) return prev;
            return{...prev, [name]:value}
        })
    }

    //Room statuses dialog
    const[dateStatuses, setDateStatuses] = useState<RoomStatus[]>([]);
    const[showStatusesDialog, setShowStatusesDialog] = useState(false)

    const closeStatusesDialog = () => {
        setShowStatusesDialog(false)
    }

    const handleDeleteStatus = (event:React.MouseEvent<HTMLButtonElement>) => {
        const {value} = event.currentTarget;

        if(room){
            removeRoomStatus({roomId: room.id, statusId: value})
        }
    }

    //Post room status
    const [newStatusData,setNewStatusData] = useState<CreateRoomStatusRequest>({
        dateOfStart: '',
        dateOfEnd: '',
        description: '',
    });

    const onNewStatusDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;

        if(name==='dateOfStart' || name==='dateOfEnd' || name==='description') {
            setNewStatusData(prevState => {
                if (!prevState) return prevState;
                return {...prevState, [name]: value}
            })
        }
    }

    const handlePostStatus = () => {
        if(room && newStatusData && newStatusData.dateOfStart !== '' && newStatusData.dateOfEnd !== '' && newStatusData.description !== '') {
          postRoomStatus({roomId: room.id, statusData: newStatusData})
        }
    }

    const handleClearNewStatus = () => {
        setNewStatusData({
            dateOfStart: '',
            dateOfEnd: '',
            description: ''
        })
    }

    //Photos Dialog
    const [showPhotosDialog, setShowPhotosDialog] = useState(false)

    const closePhotosDialog = () => {
        setShowPhotosDialog(false)
    }


    if(isLoading){
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
                <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md mx-4 border border-slate-200 animate-pulse">
                    <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
                        <span className="ml-4 text-slate-700 font-medium text-lg">Loading room data...</span>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
                <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md mx-4 border border-red-200 animate-in slide-in-from-bottom-4 duration-300">
                    <div className="text-center">
                        <div className="text-red-500 mb-4 animate-in zoom-in-50 duration-500 delay-150">
                            <AlertTriangle className="mx-auto h-16 w-16" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-800 mb-2 animate-in fade-in duration-300 delay-200">Error Loading Room</h3>
                        <p className="text-slate-600 animate-in fade-in duration-300 delay-300">Unable to load room data. Please try again later.</p>
                    </div>
                </div>
            </div>
        )
    }

    const hasChanges = Object.values(isEditing).some(editing => editing);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 shadow-sm animate-in slide-in-from-top-4 duration-500">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="animate-in fade-in-0 slide-in-from-left-4 duration-500">
                            <h1 className="text-3xl font-bold text-slate-900">Room {roomInfo.name}</h1>
                            <p className="text-slate-600 mt-1">Manage room details and residents</p>
                        </div>
                        <div className="flex items-center space-x-3 animate-in fade-in-0 slide-in-from-right-4 duration-500">
                            {hasChanges && (
                                <div className="flex items-center space-x-3 animate-in slide-in-from-right-2 fade-in-0 duration-300">
                                    <button 
                                        onClick={handleRoomUpdate}
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 hover:scale-105 active:scale-95 transform hover:shadow-lg"
                                    >
                                        <Check className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:rotate-12" />
                                        Save Changes
                                    </button>
                                    <button 
                                        onClick={handleCancelRoomUpdate}
                                        className="inline-flex items-center px-4 py-2 bg-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-all duration-200 hover:scale-105 active:scale-95 transform"
                                    >
                                        <X className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:rotate-90" />
                                        Cancel
                                    </button>
                                </div>
                            )}
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
                                    Basic Information
                                </h2>
                            </div>
                            <div className="p-6 space-y-6">
                                {/* Room Number */}
                                <div className="group animate-in fade-in-0 slide-in-from-left-2 duration-300 delay-100">
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="text-sm font-medium text-slate-700">Room Number</label>
                                        <button 
                                            name="name" 
                                            onClick={handleEditField}
                                            className="p-1 text-slate-400 hover:text-blue-600 transition-all duration-200 hover:scale-110 active:scale-95"
                                        >
                                            <Edit3 className="w-4 h-4 transition-transform duration-200 hover:rotate-12" />
                                        </button>
                                    </div>
                                    <input
                                        type="text"
                                        value={roomInfo.name}
                                        disabled={!isEditing.name}
                                        onChange={handleFieldChange}
                                        name="name"
                                        className={`w-full px-3 py-2 border rounded-lg text-sm font-medium transition-all duration-300 ${
                                            isEditing.name 
                                                ? 'border-blue-500 ring-2 ring-blue-100 bg-white animate-pulse' 
                                                : 'border-slate-200 bg-slate-50'
                                        } focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-sm`}
                                    />
                                </div>

                                {/* Capacity */}
                                <div className="group animate-in fade-in-0 slide-in-from-left-2 duration-300 delay-150">
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="text-sm font-medium text-slate-700">
                                            Room Capacity ({roomInfo.residents.length} / {roomInfo.capacity})
                                        </label>
                                        <button 
                                            name="capacity" 
                                            onClick={handleEditField}
                                            className="p-1 text-slate-400 hover:text-blue-600 transition-all duration-200 hover:scale-110 active:scale-95"
                                        >
                                            <Edit3 className="w-4 h-4 transition-transform duration-200 hover:rotate-12" />
                                        </button>
                                    </div>
                                    <input
                                        type="number"
                                        value={roomInfo.capacity}
                                        disabled={!isEditing.capacity}
                                        onChange={handleFieldChange}
                                        name="capacity"
                                        className={`w-full px-3 py-2 border rounded-lg text-sm font-medium transition-all duration-300 ${
                                            isEditing.capacity 
                                                ? 'border-blue-500 ring-2 ring-blue-100 bg-white animate-pulse' 
                                                : 'border-slate-200 bg-slate-50'
                                        } focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-sm`}
                                    />
                                </div>

                                {/* Pricing */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in-0 slide-in-from-bottom-2 duration-300 delay-200">
                                    <div className="group">
                                        <div className="flex items-center justify-between mb-2">
                                            <label className="text-sm font-medium text-slate-700">Price per Day</label>
                                            <button 
                                                name="pricePerDay" 
                                                onClick={handleEditField}
                                                className="p-1 text-slate-400 hover:text-blue-600 transition-all duration-200 hover:scale-110 active:scale-95"
                                            >
                                                <Edit3 className="w-4 h-4 transition-transform duration-200 hover:rotate-12" />
                                            </button>
                                        </div>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-2.5 w-4 h-4 text-slate-400 transition-colors duration-200 group-focus-within:text-blue-500" />
                                            <input
                                                type="number"
                                                value={roomInfo.pricePerDay}
                                                disabled={!isEditing.pricePerDay}
                                                onChange={handleFieldChange}
                                                name="pricePerDay"
                                                className={`w-full pl-10 pr-3 py-2 border rounded-lg text-sm font-medium transition-all duration-300 ${
                                                    isEditing.pricePerDay 
                                                        ? 'border-blue-500 ring-2 ring-blue-100 bg-white animate-pulse' 
                                                        : 'border-slate-200 bg-slate-50'
                                                } focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-sm`}
                                            />
                                        </div>
                                    </div>
                                    <div className="group">
                                        <div className="flex items-center justify-between mb-2">
                                            <label className="text-sm font-medium text-slate-700">Price per Month</label>
                                            <button 
                                                name="pricePerMonth" 
                                                onClick={handleEditField}
                                                className="p-1 text-slate-400 hover:text-blue-600 transition-all duration-200 hover:scale-110 active:scale-95"
                                            >
                                                <Edit3 className="w-4 h-4 transition-transform duration-200 hover:rotate-12" />
                                            </button>
                                        </div>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-2.5 w-4 h-4 text-slate-400 transition-colors duration-200 group-focus-within:text-blue-500" />
                                            <input
                                                type="number"
                                                value={roomInfo.pricePerMonth}
                                                disabled={!isEditing.pricePerMonth}
                                                onChange={handleFieldChange}
                                                name="pricePerMonth"
                                                className={`w-full pl-10 pr-3 py-2 border rounded-lg text-sm font-medium transition-all duration-300 ${
                                                    isEditing.pricePerMonth 
                                                        ? 'border-blue-500 ring-2 ring-blue-100 bg-white animate-pulse' 
                                                        : 'border-slate-200 bg-slate-50'
                                                } focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-sm`}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Current Residents Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-100 hover:shadow-md transition-all">
                            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
                                <h2 className="text-lg font-semibold text-slate-900 flex items-center">
                                    <Users className="w-5 h-5 mr-2 text-blue-600 animate-in spin-in-180 duration-700 delay-300" />
                                    Current Residents ({roomInfo.residents.length})
                                </h2>
                            </div>
                            <div className="p-6">
                                {roomInfo.residents.length > 0 ? (
                                    <div className="space-y-3">
                                        {roomInfo.residents.map((resident, index) => (
                                            <div key={index} 
                                                className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition-all hover:scale-[1.02] hover:shadow-sm animate-in fade-in-0 slide-in-from-left-2 duration-300"
                                                style={{ animationDelay: `${index * 50}ms` }}
                                            >
                                                <Link 
                                                    href={`/admin/users/${resident.id}`}
                                                    className="flex-1 hover:text-blue-600 transition-colors duration-200"
                                                >
                                                    <div className="font-medium text-slate-900 transition-colors duration-200">
                                                        {resident.displayName} {resident.secondName}
                                                    </div>
                                                    <div className="text-sm text-slate-500">{resident.email}</div>
                                                </Link>
                                                <button 
                                                    className="ml-4 px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md"
                                                    value={index.toString()} 
                                                    onClick={handleEvictResidents}
                                                >
                                                    Evict
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 animate-in fade-in-0 zoom-in-50 duration-500">
                                        <Users className="mx-auto h-12 w-12 text-slate-300 animate-pulse" />
                                        <p className="mt-2 text-slate-500">No residents currently assigned</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Room Equipment Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-200 hover:shadow-md transition-all">
                            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-semibold text-slate-900 flex items-center">
                                        <Settings className="w-5 h-5 mr-2 text-blue-600 animate-in spin-in-180 duration-700 delay-400" />
                                        Room Equipment
                                    </h2>
                                    <button 
                                        name="roomEquipment" 
                                        onClick={handleEditField}
                                        className="p-1 text-slate-400 hover:text-blue-600 transition-all duration-200 hover:scale-110 active:scale-95"
                                    >
                                        <Edit3 className="w-4 h-4 transition-transform duration-200 hover:rotate-12" />
                                    </button>
                                </div>
                            </div>
                            <div className="p-6">
                                {roomInfo.roomEquipment && roomInfo.roomEquipment.length > 0 ? (
                                    <div className="space-y-3">
                                        {roomInfo.roomEquipment.map((_, index) => (
                                            <div key={index} 
                                                className="relative animate-in fade-in-0 slide-in-from-left-2 duration-300"
                                                style={{ animationDelay: `${index * 50}ms` }}
                                            >
                                                <input
                                                    type="text"
                                                    name={`eq-${index}`}
                                                    onChange={handleEquipmentChange}
                                                    value={roomInfo.roomEquipment[index]}
                                                    disabled={!isEditing.roomEquipment}
                                                    className={`w-full px-3 py-2 border rounded-lg text-sm transition-all duration-300 hover:shadow-sm ${
                                                        isEditing.roomEquipment 
                                                            ? 'border-blue-500 ring-2 ring-blue-100 bg-white animate-pulse' 
                                                            : 'border-slate-200 bg-slate-50'
                                                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                                    placeholder={`Equipment item ${index + 1}`}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 animate-in fade-in-0 zoom-in-50 duration-500">
                                        <Settings className="mx-auto h-12 w-12 text-slate-300 animate-pulse" />
                                        <p className="mt-2 text-slate-500">No equipment listed</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Calendar Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-300 hover:shadow-md transition-all">
                            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex flex-row space-x-6">
                                <h2 className="text-lg font-semibold text-slate-900 animate-in fade-in-0 slide-in-from-left-2 duration-300 delay-500">Availability Calendar</h2>
                                <button
                                    name="statuses"
                                    onClick={handleEditField}
                                    className="p-1 text-slate-400 hover:text-blue-600 transition-all duration-200 hover:scale-110 active:scale-95"
                                >
                                    <Edit3 className="w-4 h-4 transition-transform duration-200 hover:rotate-12" />
                                </button>
                            </div>
                            <div className="p-6 animate-in fade-in-0 zoom-in-95 duration-500 delay-600">
                                <CalendarOfAvailabilityComponent statuses={roomInfo.statuses} showLegend={true}/>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Photos */}
                    <div className="lg:col-span-1 animate-in fade-in-0 slide-in-from-right-4 duration-500 delay-200">
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden sticky top-8 hover:shadow-md transition-all duration-300">
                            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-semibold text-slate-900 flex items-center">
                                        <Camera className="w-5 h-5 mr-2 text-blue-600 animate-in spin-in-180 duration-700 delay-500" />
                                        Photos
                                    </h2>
                                    <button 
                                        name="photos" 
                                        className="p-1 text-slate-400 hover:text-blue-600 transition-all duration-200 hover:scale-110 active:scale-95"
                                        onClick={handleEditField}
                                    >
                                        <Edit3 className="w-4 h-4 transition-transform duration-200 hover:rotate-12" />
                                    </button>
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
                                                className="w-full h-full object-cover transition-all duration-500 ease-out animate-in fade-in-0 zoom-in-95"
                                            />

                                            {/* Navigation arrows */}
                                            {roomInfo.photos.length > 1 && (
                                                <>
                                                    <button
                                                        onClick={goToPrevious}
                                                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95"
                                                    >
                                                        <ChevronLeft size={20} className="transition-transform duration-200 hover:-translate-x-0.5" />
                                                    </button>
                                                    <button
                                                        onClick={goToNext}
                                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95"
                                                    >
                                                        <ChevronRight size={20} className="transition-transform duration-200 hover:translate-x-0.5" />
                                                    </button>
                                                </>
                                            )}

                                            {/* Image counter */}
                                            <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium transition-all duration-200 opacity-0 group-hover:opacity-100">
                                                {currentIndex + 1} / {roomInfo.photos.length}
                                            </div>
                                        </div>

                                        {/* Dots indicator */}
                                        {roomInfo.photos.length > 1 && (
                                            <div className="flex justify-center gap-2 animate-in fade-in-0 slide-in-from-bottom-2 duration-300 delay-300">
                                                {roomInfo.photos.map((_, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => setCurrentIndex(index)}
                                                        className={`w-2 h-2 rounded-full transition-all duration-300 hover:scale-125 ${
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
                                        <Camera className="mx-auto h-12 w-12 text-slate-300 animate-pulse" />
                                        <p className="mt-2 text-slate-500">No photos available</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Eviction Confirmation Dialog */}
            <Dialog onClose={closeEvictionConfirmation} open={showEvictionConfirmation} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel className="w-full max-w-md bg-white rounded-2xl shadow-2xl animate-in zoom-in-95 fade-in-0 duration-300 slide-in-from-bottom-4">
                        <div className="p-6">
                            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full animate-in zoom-in-50 duration-300 delay-150">
                                <AlertTriangle className="w-6 h-6 text-red-600 animate-pulse" />
                            </div>
                            <DialogTitle className="text-lg font-semibold text-slate-900 text-center mb-2 animate-in fade-in-0 slide-in-from-bottom-2 duration-300 delay-200">
                                Confirm Eviction
                            </DialogTitle>
                            <Description className="text-slate-600 text-center mb-6 animate-in fade-in-0 slide-in-from-bottom-2 duration-300 delay-250">
                                Are you sure you want to evict <strong>{userToEvict.displayName} {userToEvict.secondName}</strong> from room <strong>{roomInfo.name}</strong>?
                            </Description>
                            <div className="flex space-x-3 animate-in fade-in-0 slide-in-from-bottom-2 duration-300 delay-300">
                                <button 
                                    className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg"
                                    onClick={openEvictionMenu}
                                >
                                    Yes, Continue
                                </button>
                                <button 
                                    className="flex-1 bg-slate-200 text-slate-700 py-2 px-4 rounded-lg font-medium hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-all duration-200 hover:scale-105 active:scale-95"
                                    onClick={closeEvictionConfirmation}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>

            {/* Eviction Menu Dialog */}
            <Dialog onClose={closeEvictionMenu} open={showEvictionMenu} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel className="w-full max-w-lg bg-white rounded-2xl shadow-2xl animate-in zoom-in-95 fade-in-0 duration-300 slide-in-from-bottom-4">
                        <div className="px-6 py-4 bg-red-50 border-b border-red-200 animate-in fade-in-0 slide-in-from-top-2 duration-300">
                            <DialogTitle className="text-lg font-semibold text-red-900">
                                Eviction Details
                            </DialogTitle>
                            <Description className="text-red-700 text-sm mt-1">
                                Provide eviction details for {userToEvict.displayName} {userToEvict.secondName}
                            </Description>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="animate-in fade-in-0 slide-in-from-left-2 duration-300 delay-150">
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Reason for eviction
                                </label>
                                <input
                                    name="message"
                                    type="text"
                                    value={evictionInformation.message}
                                    onChange={handleEvictionInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 hover:shadow-sm"
                                    placeholder="Enter reason for eviction..."
                                />
                            </div>

                            <div className="animate-in fade-in-0 slide-in-from-left-2 duration-300 delay-200">
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Eviction date
                                </label>
                                <input
                                    name="date"
                                    type="date"
                                    value={evictionInformation.date}
                                    onChange={handleEvictionInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 hover:shadow-sm"
                                />
                            </div>
                        </div>

                        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex space-x-3 animate-in fade-in-0 slide-in-from-bottom-2 duration-300 delay-250">
                            <button
                                className= "flex-1 bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg"
                                /*onClick={handleEvict}*/
                            >
                                Confirm Eviction
                            </button>
                            <button
                                className="flex-1 bg-slate-200 text-slate-700 py-2 px-4 rounded-lg font-medium hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-all duration-200 hover:scale-105 active:scale-95"
                                onClick={closeEvictionMenu}
                            >
                                Cancel
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>

            {/*Statuses dialog*/}
            <Dialog onClose={closeStatusesDialog} open={showStatusesDialog} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel className="w-full max-w-lg bg-white rounded-2xl shadow-2xl animate-in zoom-in-95 fade-in-0 duration-300 slide-in-from-bottom-4">
                        <div className="px-6 py-4 bg-red-50 border-b border-red-200 animate-in fade-in-0 slide-in-from-top-2 duration-300">
                            <DialogTitle className="text-lg font-semibold text-red-900">
                                Room Statuses
                            </DialogTitle>
                            <Description className="text-red-700 text-sm mt-1">
                                This menu allows to modify statuses of the room
                            </Description>
                        </div>

                        <div className={`flex flex-row space-x-6`}>
                            <CalendarOfAvailabilityComponent statuses={roomInfo.statuses} showLegend={false} setDateStatuses={setDateStatuses} />
                            <div className={`flex flex-col space-y-4 bg-gray-400`}>
                                <p>Number of residents: {roomInfo.residents.length}/{roomInfo.capacity}</p>
                                <p>???</p>
                                <div className={`flex flex-col`}>
                                    <p>Statuses:</p>
                                    {dateStatuses.length > 0 ? (
                                        <div className={`flex flex-col`}>
                                            {dateStatuses.map(status => (
                                                    <div key={status.id} className={`flex flex-row bg-gray-300`}>
                                                        <p>{new Date(status.dateOfStart).toLocaleDateString()} - {new Date(status.dateOfEnd).toLocaleDateString()}: {status.description}</p>
                                                        <button className={`bg-red-500 border-black border px-1`} value={status.id} onClick={handleDeleteStatus}>X</button>
                                                    </div>
                                                ))}
                                        </div>
                                    ):(<></>)}
                                </div>
                            </div>
                        </div>

                        <div className={`flex flex-col space-y-4 bg-gray-200`}>
                            <h2>New announcement details</h2>
                            <div className={`flex flex-row space-x-4`}>
                                <p>Description:</p>
                                <input
                                    type='text'
                                    name='description'
                                    value={newStatusData.description}
                                    onChange={onNewStatusDataChange}
                                />
                            </div>
                            <div className={`flex flex-row space-x-4`}>
                                <p>Date of start:</p>
                                <input
                                    type='date'
                                    name='dateOfStart'
                                    value={newStatusData.dateOfStart}
                                    onChange={onNewStatusDataChange}
                                />
                            </div>
                            <div className={`flex flex-row space-x-4`}>
                                <p>Date of end:</p>
                                <input
                                    type='date'
                                    name='dateOfEnd'
                                    min={newStatusData.dateOfStart}
                                    value={newStatusData.dateOfEnd}
                                    onChange={onNewStatusDataChange}
                                />
                            </div>
                            <div className={`flex flex-row space-x-4`}>
                                <button onClick={handleClearNewStatus}>Cancel</button>
                                <button onClick={handlePostStatus}>Create Status</button>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>

            {/*Edit photos dialog*/}
            <Dialog onClose={closePhotosDialog} open={showPhotosDialog} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel className="w-full max-w-lg bg-white rounded-2xl shadow-2xl animate-in zoom-in-95 fade-in-0 duration-300 slide-in-from-bottom-4">
                        <div className="px-6 py-4 bg-red-50 border-b border-red-200 animate-in fade-in-0 slide-in-from-top-2 duration-300">
                            <DialogTitle className="text-lg font-semibold text-red-900">
                                Room Photos
                            </DialogTitle>
                            <Description className="text-red-700 text-sm mt-1">
                                This menu allows to modify photos of the room
                            </Description>
                        </div>

                        <div className={`flex flex-row space-x-4`}>
                            <div className={`flex flex-col space-y-4 bg-gray-400`}>
                                <h2 className="text-lg font-semibold text-slate-900 flex items-center">
                                    <Camera className="w-5 h-5 mr-2 text-blue-600 animate-in spin-in-180 duration-700 delay-500" />
                                    Photos
                                </h2>
                                <div className="p-6">
                                    {roomInfo.photos.length > 0 ? (
                                        <div className="space-y-4">
                                            <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-100 group">
                                                <img
                                                    key={currentIndex}
                                                    src={roomInfo.photos[currentIndex]}
                                                    alt={`Room photo ${currentIndex + 1}`}
                                                    className="w-full h-full object-cover transition-all duration-500 ease-out animate-in fade-in-0 zoom-in-95"
                                                />

                                                {/* Navigation arrows */}
                                                {roomInfo.photos.length > 1 && (
                                                    <>
                                                        <button
                                                            onClick={goToPrevious}
                                                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95"
                                                        >
                                                            <ChevronLeft size={20} className="transition-transform duration-200 hover:-translate-x-0.5" />
                                                        </button>
                                                        <button
                                                            onClick={goToNext}
                                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95"
                                                        >
                                                            <ChevronRight size={20} className="transition-transform duration-200 hover:translate-x-0.5" />
                                                        </button>
                                                    </>
                                                )}

                                                {/* Image counter */}
                                                <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium transition-all duration-200 opacity-0 group-hover:opacity-100">
                                                    {currentIndex + 1} / {roomInfo.photos.length}
                                                </div>
                                            </div>

                                            {/* Dots indicator */}
                                            {roomInfo.photos.length > 1 && (
                                                <div className="flex justify-center gap-2 animate-in fade-in-0 slide-in-from-bottom-2 duration-300 delay-300">
                                                    {roomInfo.photos.map((_, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() => setCurrentIndex(index)}
                                                            className={`w-2 h-2 rounded-full transition-all duration-300 hover:scale-125 ${
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
                                            <Camera className="mx-auto h-12 w-12 text-slate-300 animate-pulse" />
                                            <p className="mt-2 text-slate-500">No photos available</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className={`flex flex-col`}>
                                {roomInfo.photos.map((photo, index) => (
                                    <button name={`photo`} value={index} key={`photo-${index}`} onClick={() => setCurrentIndex(index)}>
                                        <img src={photo} alt={`Room photo${index}`} className={`w-120 h-40`}/>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>

        </div>
    )
}