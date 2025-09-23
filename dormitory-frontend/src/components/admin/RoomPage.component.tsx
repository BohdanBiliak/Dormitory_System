'use client'

import {useGetRoom, useUpdateRoom} from "@/hooks/rooms.hook";
import {useEffect, useState} from "react";
import {RoomStatus, UpdateRoomData} from "@/types/rooms.types";

interface RoomPageProps {
    roomId: string
}

export function RoomPage({roomId}: RoomPageProps) {
    const {updateRoom} = useUpdateRoom();

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
        residents: string[],
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

    const handleRoomUpdate = (event:React.MouseEvent<HTMLButtonElement>) => {
        const dataToUpdate:UpdateRoomData = {
            number: roomInfo.name,
            capacity: roomInfo.capacity
        }

        if(room){
            updateRoom({id: room?.id, data: dataToUpdate})
        }
    }

    useEffect(() => {
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
    },[room])

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
                            <div className="flex flex-row">
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
                            <div className="flex flex-row">
                                <label className="pr-2">Number of residents:</label>
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
                            <div className="flex flex-row w-full">
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
                            <div className="flex flex-row w-full">
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
                            {/*<div className="flex flex-row w-full">*/}
                            {/*    <label className="pr-2">Room availability:</label>*/}
                            {/*    <button name="statuses" onClick={handleEditField}>*/}
                            {/*        <img src='/edit.svg' alt="edit room availability?" className="w-6 h-6"/>*/}
                            {/*    </button>*/}
                            {/*    <input*/}
                            {/*        type="number"*/}
                            {/*        value={roomInfo.capacity}*/}
                            {/*        disabled={!isEditing.capacity}*/}
                            {/*        onChange={handleFieldChange}*/}
                            {/*        name="capacity"*/}
                            {/*        className={`border ${isEditing ? 'border-red-500' : ''}`}*/}
                            {/*    />*/}

                            {/*</div>*/}
                    </div>
                </div>
                <button onClick={handleRoomUpdate}>Update Info</button>
            </div>

        </div>
    )

}