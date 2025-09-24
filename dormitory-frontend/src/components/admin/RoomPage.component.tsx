'use client'

import {useGetRoom, useUpdateRoom} from "@/hooks/rooms.hook";
import {useEffect, useState} from "react";
import {RoomStatus, UpdateRoomData} from "@/types/rooms.types";
import {CalendarOfAvailabilityComponent} from "@/components/ui/CalendarOfAvailability.component";
import {ChevronLeft, ChevronRight} from "lucide-react";
import Link from "next/link";
import {Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle} from "@headlessui/react";

interface RoomPageProps {
    roomId: string
}

export function RoomPage({roomId}: RoomPageProps) {
    const {updateRoom} = useUpdateRoom();

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
    }

    const handleFieldChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;

        setRoomInfo(prevState => {
            if(!prevState) return prevState;
            return {...prevState, [name]: value}
        })
    }

    {/*Rooms CRUD Logic*/}

    const handleRoomUpdate = (event:React.MouseEvent<HTMLButtonElement>) => {
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

    const handleCancelRoomUpdate = (event:React.MouseEvent<HTMLButtonElement>) => {
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

    const handleEvictResidents = (event:React.MouseEvent<HTMLButtonElement>) => {
        const {name, value} = event.currentTarget;

        roomInfo.residents.map((resident, index) => {
            if(index.toString() === value){
                setUserToEvict(resident)
                setShowEvictionConfirmation(true)
            }
        })

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

    if(isLoading){
        return (
            <div className=" w-full flex items-center justify-center bg-gray-50">
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-md mx-4">
                    <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <span className="ml-3 text-gray-700 font-medium">Loading room data...</span>
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
                        <p className="text-gray-700 font-medium">Error loading room page. Please try again.</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 lg:p-8 border-blue-800 border">
            {/*Header*/}
            <div className="text-center text-3xl font-semibold">
                Room Info
            </div>

            {/*Body*/}
            <div className="flex flex-col w-full">

                {/*Info*/}
                <div className="flex flex-row w-full">

                    {/*form+statuses*/}
                    <div className="flex flex-col">
                            <div className="flex flex-row my-0.5">
                                <label className="pr-2">Room:</label>
                                <input
                                    type="text"
                                    value={roomInfo.name}
                                    disabled={!isEditing.name}
                                    onChange={handleFieldChange}
                                    name="name"
                                    className={`border ${isEditing.name ? 'border-red-500' : ''}`}
                                />
                                <button name="name" onClick={handleEditField}>
                                    <img src='/edit.svg' alt="edit room name?" className="w-6 h-6"/>
                                </button>
                            </div>
                            <div className="flex flex-row my-0.5">
                                <label className="pr-2">Number of residents: {roomInfo.residents.length} /</label>
                                <input
                                    type="number"
                                    value={roomInfo.capacity}
                                    disabled={!isEditing.capacity}
                                    onChange={handleFieldChange}
                                    name="capacity"
                                    className={`border ${isEditing.capacity ? 'border-red-500' : ''}`}
                                />
                                <button name="capacity" onClick={handleEditField}>
                                    <img src='/edit.svg' alt="edit room capacity?" className="w-6 h-6"/>
                                </button>
                            </div>
                            <div className="flex flex-row my-0.5">
                                <ul className='bg-gray-300 border-black border py-1'>
                                    {roomInfo.residents.map((resident,index) => (
                                        <li key={index} className={`px-3 py-0.5 my-0.5 border-black border m-0.5 rounded flex flex-row space-x-5`}>
                                            <Link href={`/admin/users/${resident.id}`}>{resident.displayName} {resident.secondName}</Link>
                                            <button className={`bg-red-600 px-2 underline border-black border rounded`} value={index.toString()} onClick={handleEvictResidents}>Evict</button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex flex-row w-full my-0.5">
                                <label className="pr-2">Price per day:</label>
                                <input
                                    type="number"
                                    value={roomInfo.pricePerDay}
                                    disabled={!isEditing.pricePerDay}
                                    onChange={handleFieldChange}
                                    name="pricePerDay"
                                    className={`border ${isEditing.pricePerDay ? 'border-red-500' : ''}`}
                                />
                                <button name="pricePerDay" onClick={handleEditField}>
                                    <img src='/edit.svg' alt="edit room price per day?" className="w-6 h-6"/>
                                </button>
                            </div>
                            <div className="flex flex-row w-full my-0.5">
                                <label className="pr-2">Price per month:</label>
                                <input
                                    type="number"
                                    value={roomInfo.pricePerMonth}
                                    disabled={!isEditing.pricePerMonth}
                                    onChange={handleFieldChange}
                                    name="pricePerMonth"
                                    className={`border ${isEditing.pricePerMonth ? 'border-red-500' : ''}`}
                                />
                                <button name="pricePerMonth" onClick={handleEditField}>
                                    <img src='/edit.svg' alt="edit room price per month?" className="w-6 h-6"/>
                                </button>
                            </div>
                            <CalendarOfAvailabilityComponent statuses={roomInfo.statuses}/>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex flex-col">
                            {roomInfo.photos.length > 0 ? (
                                <div>
                                    <div className="flex flex-row w-full">
                                        <label className="block mb-1">Photos:</label>
                                        <button name="name" >
                                            <img src='/edit.svg' alt="edit room photos?" className="w-6 h-6"/>
                                        </button>
                                    </div>
                                    <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
                                        <img
                                            src={roomInfo.photos[currentIndex]}
                                            alt={`Photo ${currentIndex + 1}`}
                                            className="w-full h-full object-cover"
                                        />

                                        {/* Navigation arrows */}
                                        {roomInfo.photos.length > 1 && (
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
                                            {currentIndex + 1} / {roomInfo.photos.length}
                                        </div>
                                    </div>

                                    {/* Dots indicator */}
                                    {roomInfo.photos.length > 1 && (
                                        <div className="flex justify-center mt-4 gap-2">
                                            {roomInfo.photos.map((_, index) => (
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
                        <div className="flex flex-col w-full">
                            <div className="flex flex-row">
                                <label className="pr-2">Room equipment:</label>
                                <button name="roomEquipment" onClick={handleEditField}>
                                    <img src='/edit.svg' alt="edit room equipment?" className="w-6 h-6"/>
                                </button>
                            </div>
                            <ul className={`bg-gray-500 p-1`}>
                                {roomInfo.roomEquipment && roomInfo.roomEquipment.length > 0 ? (
                                    roomInfo.roomEquipment.map((roomEquipment, index) => (
                                        <li key={index} className={`my-0.5 p-1`}>
                                            <input
                                                type="text"
                                                name={`eq-${index}`}
                                                onChange={handleEquipmentChange}
                                                value={roomInfo.roomEquipment[index]}
                                                disabled={!isEditing.roomEquipment}
                                            />
                                        </li>
                                        ))
                                ):(<li className={`py-3`}> </li>)}
                            </ul>
                        </div>
                    </div>
                </div>
                <button onClick={handleRoomUpdate} className="bg-blue-800 text-white drop-shadow max-w-fit py-1 px-2 my-1">Update Info</button>
                <button onClick={handleCancelRoomUpdate} className="bg-gray-300 text-black drop-shadow max-w-fit py-1 px-2 my-1">Cancel</button>
            </div>

            {/*Eviction Confirmation*/}
            <Dialog onClose={closeEvictionConfirmation} open={showEvictionConfirmation} className={`relative z-50`}>
                <DialogBackdrop className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel className="w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden">
                        {/*Dialog Header*/}
                        <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-white/20 rounded-lg">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                    </div>
                                    <div>
                                        <DialogTitle className="text-xl font-semibold text-white">
                                            Evict Resident?
                                        </DialogTitle>
                                        <Description className="text-blue-100 text-sm mt-1">
                                            Clicking 'yes' will proceed to eviction menu
                                        </Description>
                                    </div>
                                </div>
                                <button
                                    onClick={closeEvictionConfirmation}
                                    className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                                >
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/*Dialog Body*/}
                        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
                            <div className={`text-2xl font-semibold w-full text-center`}>
                                {`Do you want to evict ${userToEvict.displayName} ${userToEvict.secondName} from room ${roomInfo.name}?`}
                            </div>
                            <div className="flex flex-row space-x-2 w-full justify-end -mx-10 my-4">
                                <button className={`bg-red-600 border-black border py-1 px-10 font-bold `} onClick={openEvictionMenu}>Yes</button>
                                <button className={`bg-gray-300 border-blue-600 border-2 py-1 px-10 text-blue-900 font-bold`} onClick={closeEvictionConfirmation}>No</button>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>

            {/*Eviction Menu*/}
            <Dialog onClose={closeEvictionMenu} open={showEvictionMenu} className={`relative z-25`}>
                <DialogBackdrop className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel className="w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden">
                        {/*Dialog Content*/}
                        <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-white/20 rounded-lg">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                    </div>
                                    <div>
                                        <DialogTitle className="text-xl font-semibold text-white">
                                            Eviction Menu
                                        </DialogTitle>
                                        <Description className="text-blue-100 text-sm mt-1">
                                            Clicking 'evict' will evict the resident
                                        </Description>
                                    </div>
                                </div>
                                <button
                                    onClick={closeEvictionMenu}
                                    className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                                >
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/*Dialog Body*/}
                        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
                            <div className={`font-semibold my-1 mx-4`}>
                                {`State a reason for eviction ${userToEvict.displayName} ${userToEvict.secondName} from room ${roomInfo.name}:`}
                            </div>
                            <input
                                name='message'
                                type="text"
                                value={evictionInformation.message}
                                onChange={handleEvictionInputChange}
                                className={`mx-3 py-1 px-1 bg-gray-300 border-black border`}
                            />
                            <div className={`font-semibold my-1 mx-4`}>
                                {`State eviction date:`}
                            </div>
                            <input
                                name='date'
                                type='date'
                                value={evictionInformation.date}
                                onChange={handleEvictionInputChange}
                                className={`mx-3 py-1 px-1 bg-gray-300 border-black border`}
                            />
                            <div className="flex flex-row space-x-2 w-full justify-end -mx-10 my-4">
                                <button className={`bg-red-600 border-black border py-1 px-10 font-bold `} /*onClick={handleEvict}*/>Evict</button>
                                <button className={`bg-gray-300 border-blue-600 border-2 py-1 px-10 text-blue-900 font-bold`} onClick={closeEvictionMenu}>Cancel</button>
                            </div>
                        </div>

                    </DialogPanel>
                </div>
            </Dialog>

        </div>
    )

}