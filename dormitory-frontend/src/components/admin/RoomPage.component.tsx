'use client'

import {useGetRoom, useUpdateRoom, useUploadRoomPhoto} from "@/hooks/rooms.hook";
import React, {useEffect, useRef, useState} from "react";
import {CreateRoomStatusRequest, EvictRequest, RoomResident, RoomStatus, UpdateRoomData} from "@/types/rooms.types";
import {CalendarOfAvailabilityComponent} from "@/components/ui/CalendarOfAvailability.component";
import {ChevronLeft, ChevronRight, Edit3, Users, DollarSign, Camera, Settings, AlertTriangle, X, Check} from "lucide-react";
import Link from "next/link";
import {Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle} from "@headlessui/react";
import EvictionFlowDialogsComponent from "@/components/dialogs/admin/EvictionFlowDialogs.component";

interface RoomPageProps {
    roomId: string
}

export function RoomPage({roomId}: RoomPageProps) {
    const {updateRoom, postRoomStatus, removeRoomStatus, evictUser, uploadRoomPhoto} = useUpdateRoom();
    const {data: urls, mutateAsync: uploadPhotos} = useUploadRoomPhoto()


    const inputRef = useRef<HTMLInputElement>(null); 


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

    const lastChangedIndexRef = useRef<number | null>(null);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

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

    const handleRoomUpdate = async() => {
        if(newPhotos.length>0){
            const {urls} = await uploadPhotos({urls:newPhotos})
            urls.forEach((photo) => {
                setRoomInfo(prevState => {
                    if(!prevState) return prevState;
                    return {
                        ...prevState,
                        photos: [...prevState.photos, photo]
                    }
                })
                // console.log("Adding new photo to room info:",photo);
            })
            setNewPhotos([])
        }

        // console.log("Room info before update: ", roomInfo)
        const dataToUpdate: UpdateRoomData = {
            number: roomInfo.name,
            capacity: roomInfo.capacity,
            roomEquipment: roomInfo.roomEquipment,
            photos: roomInfo.photos
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

    const handleEquipmentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        const indexToUpdate = parseInt(name.substring(name.lastIndexOf("-") + 1));

        const newRoomEquipment: string[] = [...roomInfo.roomEquipment];

        if (indexToUpdate < newRoomEquipment.length) {
            newRoomEquipment[indexToUpdate] = value;
        } else {
            newRoomEquipment.push(value);
            lastChangedIndexRef.current = indexToUpdate;
        }

        setRoomInfo(prevState => {
            if (!prevState) return prevState;
            return {...prevState, roomEquipment: newRoomEquipment}
        });
    }

    const handleDeleteEquipment = (index: number) => {
        const newRoomEquipment = roomInfo.roomEquipment.filter((_, i) => i !== index);
        setRoomInfo(prevState => {
            if (!prevState) return prevState;
            return {...prevState, roomEquipment: newRoomEquipment}
        });
    }

    useEffect(() => {
        if (lastChangedIndexRef.current !== null) {
            const targetInput = inputRefs.current[lastChangedIndexRef.current];
            if (targetInput) {
                targetInput.focus();
                lastChangedIndexRef.current = null;
            }
        }
    }, [roomInfo.roomEquipment.length]);

    const handleChoseResidentToEvict = (event:React.MouseEvent<HTMLButtonElement>) => { //for eviction menu
        const {value} = event.currentTarget;

        roomInfo.residents.map((resident, index) => {
            if(index.toString() === value){
                setUserToEvict(resident)
                setEvictionInformation(prevState => {
                    if(!prevState) return prevState
                    return {
                        ...prevState,
                        userId:resident.id
                    }
                })
                setShowEvictionConfirmation(true)
            }
        })

    }

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

    const [newPhotos, setNewPhotos] = useState<File[]>([])

    const addRoomImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name} = event.target

        if(inputRef.current && inputRef.current.files && inputRef.current.files.length>0 && name === "newImage"){
            const file = inputRef.current.files[0];
            setNewPhotos([...newPhotos, file]);
            // console.log("New photos changed")
        }

    }

    {/*Eviction confirmation(1st) dialog logic*/}

    const [showEvictionConfirmation, setShowEvictionConfirmation] = useState(false)
    const [userToEvict, setUserToEvict] = useState<RoomResident>({
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
    const [evictionInformation, setEvictionInformation] = useState<EvictRequest>({
        userId: '',
        description: '',
    })

    const closeEvictionMenu = () => {
        setEvictionInformation({
            userId: '',
            description: '',
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

    const handleEvictResident = (evet: React.MouseEvent<HTMLButtonElement>) => {
        evictUser({roomId: roomId,  body: evictionInformation})
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
        statusTypeId: '',
        dateOfStart: '',
        dateOfEnd: '',
        description: ''
        
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
            setShowStatusesDialog(false)
        }
    }

    const handleClearNewStatus = () => {
        setNewStatusData({
            statusTypeId: '',
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

    const handleDeleteRoomPhoto = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {name, value} = event.currentTarget;

        if(name !== ""){
            const indexToDelete = Number.parseInt(value)
            if(indexToDelete >= roomInfo.photos.length - newPhotos.length){
                setNewPhotos(newPhotos.splice(indexToDelete-roomInfo.photos.length+newPhotos.length, 1))

            }

            setRoomInfo(prevState => {
                if(!prevState) return prevState;
                return {
                    ...prevState,
                    photos: roomInfo.photos.splice(indexToDelete, 1)}
            })

            // console.log("Room info photos: ", roomInfo.photos)
            // console.log("New photos: ", newPhotos)
        }
    }


    if(isLoading){
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-slate-50">
                <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md mx-4 border border-slate-200">
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
            <div className="min-h-screen w-full flex items-center justify-center bg-slate-50">
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
        <div className="min-h-screen bg-slate-50">
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
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2  hover:scale-105 transform hover:shadow-lg"
                                    >
                                        <Check className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:rotate-12" />
                                        Save Changes
                                    </button>
                                    <button 
                                        onClick={handleCancelRoomUpdate}
                                        className="inline-flex items-center px-4 py-2 bg-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2  hover:scale-105 transform"
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
                                <div className="group delay-100">
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="text-sm font-medium text-slate-700">Room Number</label>
                                        <button 
                                            name="name" 
                                            onClick={handleEditField}
                                            className="p-1 text-slate-400 hover:text-blue-600 "
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
                                        className={`w-full px-3 py-2 border rounded-lg text-sm font-medium  ${
                                            isEditing.name 
                                                ? 'border-blue-500 ring-2 ring-blue-100 bg-white' 
                                                : 'border-slate-200 bg-slate-50'
                                        } focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-sm`}
                                    />
                                </div>

                                {/* Capacity */}
                                <div className="group delay-150">
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="text-sm font-medium text-slate-700">
                                            Room Capacity ({roomInfo.residents.length} / {roomInfo.capacity})
                                        </label>
                                        <button 
                                            name="capacity" 
                                            onClick={handleEditField}
                                            className="p-1 text-slate-400 hover:text-blue-600 "
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
                                        className={`w-full px-3 py-2 border rounded-lg text-sm font-medium  ${
                                            isEditing.capacity 
                                                ? 'border-blue-500 ring-2 ring-blue-100 bg-white' 
                                                : 'border-slate-200 bg-slate-50'
                                        } focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-sm`}
                                    />
                                </div>

                                {/* Pricing */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 delay-200">
                                    <div className="group">
                                        <div className="flex flex-col mb-2">
                                            <div className="flex items-center justify-between">
                                                <label className="text-sm font-medium text-slate-700">Price per Day</label>
                                            </div>
                                            {room?.priceCategory && (
                                                <span className="text-xs text-blue-600 mt-0.5">From price category: {room.priceCategory.name}</span>
                                            )}
                                        </div>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-2.5 w-4 h-4 text-slate-400 transition-colors duration-200 group-focus-within:text-blue-500" />
                                            <input
                                                type="number"
                                                value={roomInfo.pricePerDay}
                                                disabled={true}
                                                onChange={handleFieldChange}
                                                name="pricePerDay"
                                                className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm font-medium  border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="group">
                                        <div className="flex flex-col mb-2">
                                            <div className="flex items-center justify-between">
                                                <label className="text-sm font-medium text-slate-700">Price per Month</label>
                                            </div>
                                            {room?.priceCategory && (
                                                <span className="text-xs text-blue-600 mt-0.5">From price category: {room.priceCategory.name}</span>
                                            )}
                                        </div>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-2.5 w-4 h-4 text-slate-400 transition-colors duration-200 group-focus-within:text-blue-500" />
                                            <input
                                                type="number"
                                                value={roomInfo.pricePerMonth}
                                                disabled={true}
                                                onChange={handleFieldChange}
                                                name="pricePerMonth"
                                                className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm font-medium  border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-sm"
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
                                                className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition-all hover:scale-[1.02] hover:shadow-sm"
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
                                                    className="ml-4 px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2  hover:scale-105 hover:shadow-md"
                                                    value={index.toString()} 
                                                    onClick={handleChoseResidentToEvict}
                                                >
                                                    Evict
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 animate-in fade-in-0 zoom-in-50 duration-500">
                                        <Users className="mx-auto h-12 w-12 text-slate-300" />
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
                                        className="p-1 text-slate-400 hover:text-blue-600 "
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
                                                className="relative flex items-center gap-2"
                                                style={{ animationDelay: `${index * 50}ms` }}
                                            >
                                                <input
                                                    ref={(el) => {inputRefs.current[index] = el}}
                                                    type="text"
                                                    name={`eq-${index}`}
                                                    onChange={handleEquipmentChange}
                                                    value={roomInfo.roomEquipment[index]}
                                                    disabled={!isEditing.roomEquipment}
                                                    className={`flex-1 px-3 py-2 border rounded-lg text-sm  hover:shadow-sm ${
                                                        isEditing.roomEquipment
                                                            ? 'border-blue-500 ring-2 ring-blue-100 bg-white'
                                                            : 'border-slate-200 bg-slate-50'
                                                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                                    placeholder={`Equipment item ${index + 1}`}
                                                />
                                                {isEditing.roomEquipment && (
                                                    <button
                                                        onClick={() => handleDeleteEquipment(index)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg "
                                                        title="Delete equipment"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                        {isEditing.roomEquipment ? (
                                            <div key={roomInfo.roomEquipment.length}
                                                 className="relative"
                                                 style={{ animationDelay: `${roomInfo.roomEquipment.length * 50}ms` }}>
                                                <input
                                                    ref={(el) => {inputRefs.current[roomInfo.roomEquipment.length] = el}}
                                                    type="text"
                                                    name={`eq-${roomInfo.roomEquipment.length }`}
                                                    onChange={handleEquipmentChange}
                                                    value={""}
                                                    disabled={!isEditing.roomEquipment}
                                                    className="w-full px-3 py-2 border rounded-lg text-sm  hover:shadow-sm border-blue-500 ring-2 ring-blue-100 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder={`Equipment item ${roomInfo.roomEquipment.length  + 1}`}
                                                />
                                            </div>
                                        ):(<></>)}
                                    </div>
                                ) : (

                                    <div className="text-center py-8 animate-in fade-in-0 zoom-in-50 duration-500">
                                        <Settings className="mx-auto h-12 w-12 text-slate-300" />
                                        <p className="mt-2 text-slate-500">No equipment listed</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Calendar Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-300 hover:shadow-md transition-all">
                            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex flex-row space-x-6">
                                <h2 className="text-lg font-semibold text-slate-900 delay-500">Availability Calendar</h2>
                                <button
                                    name="statuses"
                                    onClick={handleEditField}
                                    className="p-1 text-slate-400 hover:text-blue-600 "
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
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden sticky top-8 hover:shadow-md ">
                            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-semibold text-slate-900 flex items-center">
                                        <Camera className="w-5 h-5 mr-2 text-blue-600 animate-in spin-in-180 duration-700 delay-500" />
                                        Photos
                                    </h2>
                                    <button 
                                        name="photos" 
                                        className="p-1 text-slate-400 hover:text-blue-600 "
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
                                        <p className="mt-2 text-slate-500">No photos available</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {room && <EvictionFlowDialogsComponent userToEvict={userToEvict} showEvictionConfirmation={showEvictionConfirmation} closeEvictionConfirmation={closeEvictionConfirmation} roomInfo={room} />}

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
                                            Room Availability Status
                                        </DialogTitle>
                                        <Description className="text-emerald-100 text-xs sm:text-sm mt-0.5 xs:mt-1 line-clamp-1">
                                            Manage room availability and booking statuses
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
                                            Availability Calendar
                                        </h2>
                                        
                                        {/* Room Info Cards */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4 mb-4 xs:mb-6">
                                            <div className="bg-white rounded-lg p-3 xs:p-4 shadow-sm border border-slate-200">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="text-xs xs:text-sm text-slate-600">Current Occupancy</p>
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
                                                        <p className="text-xs xs:text-sm text-slate-600">Active Statuses</p>
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
                                        Status Management
                                    </h3>
                                    
                                    {/* Current Statuses */}
                                    <div className="mb-4 xs:mb-6">
                                        <h4 className="text-xs xs:text-sm font-medium text-slate-700 mb-2 xs:mb-3">Current Statuses</h4>
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
                                                                    <span>{new Date().toLocaleDateString()}</span>
                                                                </div>
                                                            </div>
                                                            <button 
                                                                onClick={handleDeleteStatus}
                                                                value={status.id}
                                                                className="ml-2 flex items-center justify-center w-5 h-5 xs:w-6 xs:h-6 bg-red-100 hover:bg-red-200 text-red-600 rounded-full transition-colors duration-200"
                                                            >
                                                                <svg className="w-2.5 h-2.5 xs:w-3 xs:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-6 xs:py-8 text-slate-500">
                                                <svg className="w-6 h-6 xs:w-8 xs:h-8 mx-auto mb-2 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                </svg>
                                                <p className="text-xs xs:text-sm">No active statuses</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Create New Status Form */}
                                    <div className="bg-emerald-50 rounded-lg p-3 xs:p-4 border border-emerald-200">
                                        <h4 className="text-xs xs:text-sm font-medium text-emerald-900 mb-3 xs:mb-4 flex items-center">
                                            <svg className="w-3 h-3 xs:w-4 xs:h-4 mr-1.5 xs:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                            Create New Status
                                        </h4>
                                        
                                        <div className="space-y-3 xs:space-y-4">
                                            <div>
                                                <label className="block text-xs font-medium text-slate-700 mb-1">Description</label>
                                                <input
                                                    type="text"
                                                    name="description"
                                                    value={newStatusData.description}
                                                    onChange={onNewStatusDataChange}
                                                    placeholder="Enter status description"
                                                    className="w-full px-2 xs:px-3 py-1.5 xs:py-2 border border-slate-300 rounded-lg text-xs xs:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                                />
                                            </div>
                                            
                                            <div>
                                                <label className="block text-xs font-medium text-slate-700 mb-1">Start Date</label>
                                                <input
                                                    type="date"
                                                    name="dateOfStart"
                                                    value={newStatusData.dateOfStart}
                                                    onChange={onNewStatusDataChange}
                                                    className="w-full px-2 xs:px-3 py-1.5 xs:py-2 border border-slate-300 rounded-lg text-xs xs:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                                />
                                            </div>
                                            
                                            <div>
                                                <label className="block text-xs font-medium text-slate-700 mb-1">End Date</label>
                                                <input
                                                    type="date"
                                                    name="dateOfEnd"
                                                    min={newStatusData.dateOfStart}
                                                    value={newStatusData.dateOfEnd}
                                                    onChange={onNewStatusDataChange}
                                                    className="w-full px-2 xs:px-3 py-1.5 xs:py-2 border border-slate-300 rounded-lg text-xs xs:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                                />
                                            </div>
                                            
                                            <div className="flex space-x-2 pt-2">
                                                <button 
                                                    onClick={handleClearNewStatus}
                                                    className="flex-1 px-2 xs:px-3 py-1.5 xs:py-2 text-xs xs:text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors duration-200"
                                                >
                                                    Cancel
                                                </button>
                                                <button 
                                                    onClick={handlePostStatus}
                                                    className="flex-1 px-2 xs:px-3 py-1.5 xs:py-2 text-xs xs:text-sm font-medium text-white bg-emerald-600 border border-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors duration-200"
                                                >
                                                    Create
                                                </button>
                                            </div>
                                        </div>
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
                                            Room Photos
                                        </DialogTitle>
                                        <Description className="text-blue-100 text-sm mt-1 line-clamp-1">
                                            Manage and organize photos for this room
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
                                            Current View
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

                                                {/* Action Button */}
                                                <div className="mt-4 xs:mt-6 flex justify-center">
                                                    <button 
                                                        onClick={handleDeleteRoomPhoto}
                                                        value={currentIndex}
                                                        className="inline-flex items-center px-3 xs:px-4 py-2 bg-red-600 text-white text-xs xs:text-sm font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2  hover:scale-105"
                                                    >
                                                        <svg className="w-3 h-3 xs:w-4 xs:h-4 mr-1.5 xs:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                        Delete Photo
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex-1 flex items-center justify-center text-center py-8 xs:py-12 animate-in fade-in-0 zoom-in-50 duration-500">
                                                <div>
                                                    <Camera className="mx-auto h-12 w-12 xs:h-16 xs:w-16 text-slate-300 mb-3 xs:mb-4" />
                                                    <h3 className="text-base xs:text-lg font-semibold text-slate-900 mb-2">No Photos Available</h3>
                                                    <p className="text-slate-500 text-sm xs:text-base">Add your first photo to get started</p>
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
                                        Photo Gallery
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
                                        
                                        {/* New Photos Preview */}
                                        {newPhotos.map((photo, index) => (
                                            <div 
                                                key={`new-${index}`}
                                                className="w-full aspect-video rounded-lg overflow-hidden border-2 border-green-300 bg-green-50"
                                            >
                                                <img 
                                                    src={URL.createObjectURL(photo)} 
                                                    alt={`New photo ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ))}
                                        
                                        {/* Add New Photo Button */}
                                        <label className="w-full aspect-video rounded-lg border-2 border-dashed border-slate-300 hover:border-blue-400 bg-slate-50 hover:bg-blue-50 flex flex-col items-center justify-center cursor-pointer transition-all duration-100 group">
                                            <input
                                                type="file"
                                                ref={inputRef}
                                                name="newImage"
                                                className="hidden"
                                                onChange={addRoomImage}
                                                accept="image/*"
                                            />
                                            <svg className="w-8 h-8 text-slate-400 group-hover:text-blue-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                            <span className="text-sm font-medium text-slate-600 group-hover:text-blue-600">Add Photo</span>
                                        </label>
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