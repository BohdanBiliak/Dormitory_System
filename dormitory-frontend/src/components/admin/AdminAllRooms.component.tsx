'use client'

import { useState, useEffect } from "react";
import { Calendar, Users, Filter, X, Plus, ChevronUp, ChevronDown, Search, Building, MapPin, Menu } from "lucide-react";
import Link from "next/link";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import {Dormitory, DormitoryFloor} from "@/types/dormitories.types";
import {useGetActiveDormitories, useGetDormitoryById} from "@/hooks/dormitories.hook";
import {useGetAvailableRoom, useGetRoom, useGetRooms, useUpdateRoom} from "@/hooks/rooms.hook";
import {AvailableRoomsRequest, Room, RoomResident} from "@/types/rooms.types";
import { CalendarOfAvailability2WVerComponent } from "@/components/ui/CalendarOfAvailability2WVer.component";
import EvictionFlowDialogsComponent from "@/components/dialogs/admin/EvictionFlowDialogs.component";

interface Filters {
    dateFrom: string;
    dateTo: string;
    residents: 'either' | 'empty' | 'occupied';
    groupSize: number;
}

export default function AllRoomsPage() {

    // Dormitories, floors and rooms
    const [dormitoriesList, setDormitoriesList] = useState<Dormitory[]>([]);
    const [currentDormitory, setCurrentDormitory] = useState<Dormitory | null>(null);
    const [currentFloor, setCurrentFloor] = useState<DormitoryFloor|null>(null);
    const [selectedRoomId, setSelectedRoomId] = useState<string>('');
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

    const { data: dormitories, isLoading: loadingDormitories, error: dormitoriesError } = useGetActiveDormitories();
    const {data: room, isLoading: loadingRoom, error: roomError} = useGetRoom(selectedRoomId);


    useEffect(() => {
        if (dormitories && dormitories?.data) {
            setDormitoriesList(dormitories.data)
        }
    }, [dormitories]);

    useEffect(() => {
        if (dormitoriesList.length > 0) {
            setCurrentDormitory(dormitoriesList[0])
        }
    }, [dormitoriesList]);

    useEffect(() => {
        if (currentDormitory && currentDormitory.floors.length > 0) {
            setCurrentFloor(currentDormitory.floors[0])
        }
    }, [currentDormitory]);

    useEffect(() => {
        if (currentFloor && currentFloor.rooms && currentFloor.rooms.length > 0) {
            setSelectedRoomId(currentFloor.rooms[0].id)
        }
    }, [currentFloor]);

    useEffect(() => {
        if(room){
            setSelectedRoom(room);
        }
    }, [room]);


    const [filters, setFilters] = useState<Filters>({
        dateFrom: '',
        dateTo: '',
        residents: 'either',
        groupSize: 1
    });

    //available rooms
    const [availableRoomsIds, setAvailableRoomsIds] = useState<string[]>([])
    const [availableRoomsRequest, setAvailableRoomRequest] = useState<AvailableRoomsRequest>({ from: '', to: '' })

    useEffect(() => {
        if (filters.dateFrom !== '' && filters.dateTo !== '') {
            const request: AvailableRoomsRequest = { to: filters.dateTo, from: filters.dateFrom }
            setAvailableRoomRequest(request)
        }
    }, [filters.dateFrom, filters.dateTo]);

    const { data: availableRooms, isLoading: loadingAvailableRooms, error: availableRoomsError } = useGetAvailableRoom(availableRoomsRequest)

    useEffect(() => {
        if (availableRooms && availableRooms.length > 0) {
            const ids = availableRooms.map(room => room.id)
            setAvailableRoomsIds(ids)
            console.log("Available rooms:", availableRooms)
        }
    }, [availableRooms]);

    const [showFilters, setShowFilters] = useState(true);
    const [showMobileRoomDetails, setShowMobileRoomDetails] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');


    const getRoomColor = (room: Room) => {
        const hasResidents = room.residents.length > 0;
        const isAvailable = room.residents.length < room.capacity;

        if (!meetsSearchRequirements(room)) return 'bg-gray-400'
        if (!hasResidents) return 'bg-green-500'; // Available
        if (hasResidents && isAvailable) return 'bg-blue-500'; // Partially occupied
        if (room.residents.length >= room.capacity || !availableRoomsIds.includes(room.id)) return 'bg-red-500'; // Full
        return 'bg-gray-400'; // Maintenance or other
    };


    const meetsSearchRequirements = (room: Room) => {
        const availableSpace = room.residents ? room.capacity - room.residents.length : room.capacity;
        const roommatesRequirement = filters.residents === "either" ? true : filters.residents === "occupied" ? room.residents.length > 0 : room.residents.length < 1;

        return availableRoomsIds.includes(room.id) && filters.groupSize<=availableSpace && roommatesRequirement;
    };

    const handleFilterChange = (key: keyof Filters, value: any) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const clearFilter = (key: keyof Filters) => {
        setFilters(prev => ({
            ...prev,
            [key]: key === 'residents' ? 'either' : ''
        }));
    };

    const getNext14Days = () => {
        const days = [];
        const today = new Date();
        for (let i = 0; i < 14; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            days.push({
                date: date.toISOString().split('T')[0],
                dayName: date.toLocaleDateString('en', { weekday: 'short' }),
                dayNumber: date.getDate(),
                month: date.toLocaleDateString('en', { month: '2-digit' }),
            });
        }
        return days;
    };

    const next14Days = getNext14Days();

    const handleDormitoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;

        if (value === "") {
            setCurrentDormitory(null);
        } else {
            const foundDorm = dormitoriesList.find((dorm) => dorm.id === value);
            if (foundDorm) {
                setCurrentDormitory(foundDorm)
            } else {
                setCurrentDormitory(null)
            }
            console.log("Dormitory: ", currentDormitory?.name)
        }
    }

    const handleFloorChange = (floor: DormitoryFloor) => {
        setCurrentFloor(floor)
    }

    const handleRoomSelect = (roomId: string) => {
        setSelectedRoomId(roomId);
        setShowMobileRoomDetails(true);
    };

    //eviction

    const [showEvictionConfirmation, setShowEvictionConfirmation] = useState(false);
    const [userToEvict, setUserToEvict] = useState<RoomResident>({
        id: ``,
        displayName: ``,
        secondName: ``,
        email: ``,
    });

    const closeEvictionConfirmation = () => {
        setUserToEvict({
            id: '',
            displayName: '',
            secondName: '',
            email: '',
        })
        setShowEvictionConfirmation(false);
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 shadow-sm animate-in slide-in-from-top-4 duration-500">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="animate-in fade-in-0 slide-in-from-left-4 duration-500">
                            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 flex items-center">
                                <Building className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 text-blue-600 flex-shrink-0" />
                                <span className="truncate">Available Rooms</span>
                            </h1>
                            <p className="text-slate-600 mt-1 text-sm sm:text-base">Manage and view all dormitory rooms</p>
                        </div>
                        <div className="flex items-center space-x-3 animate-in fade-in-0 slide-in-from-right-4 duration-500 w-full sm:w-auto">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex-1 sm:flex-none inline-flex items-center justify-center px-3 sm:px-4 py-2 bg-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-all duration-200 hover:scale-105 active:scale-95"
                            >
                                <Filter className="w-4 h-4 mr-2" />
                                <span className="hidden sm:inline">{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
                                <span className="sm:hidden">Filters</span>
                                {showFilters ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters Section */}
            {showFilters && (
                <div className="bg-white border-b border-slate-200 shadow-sm animate-in slide-in-from-top-2 duration-300">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="space-y-4">
                            <span className="text-sm font-medium text-slate-700">Filters:</span>

                            {/* Mobile: Stack filters vertically */}
                            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
                                {/* Date Range */}
                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 bg-slate-100 rounded-lg p-3 sm:px-3 sm:py-2 animate-in fade-in-0 slide-in-from-left-2 duration-300">
                                    <div className="flex items-center space-x-2">
                                        <Calendar className="w-4 h-4 text-slate-500 flex-shrink-0" />
                                        <span className="text-sm text-slate-700">Date:</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="date"
                                            value={filters.dateFrom}
                                            onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                                            className="text-sm border-none bg-white rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 sm:flex-none"
                                        />
                                        <span className="text-slate-500">-</span>
                                        <input
                                            type="date"
                                            value={filters.dateTo}
                                            min={filters.dateFrom}
                                            onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                                            className="text-sm border-none bg-white rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 sm:flex-none"
                                        />
                                        <button
                                            onClick={() => {
                                                clearFilter('dateFrom');
                                                clearFilter('dateTo');
                                            }}
                                            className="text-slate-500 hover:text-slate-700 transition-colors p-1"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Roommates Filter */}
                                <div className="flex items-center justify-between sm:justify-start space-x-2 bg-slate-100 rounded-lg px-3 py-2 animate-in fade-in-0 slide-in-from-left-2 duration-300 delay-75">
                                    <div className="flex items-center space-x-2">
                                        <Users className="w-4 h-4 text-slate-500" />
                                        <span className="text-sm text-slate-700">Empty room:</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <select
                                            value={filters.residents}
                                            onChange={(e) => handleFilterChange('residents', e.target.value)}
                                            className="text-sm border-none bg-white rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="empty">Yes</option>
                                            <option value="occupied">No</option>
                                            <option value="either">Doesn't matter</option>
                                        </select>
                                        <button
                                            onClick={() => clearFilter('residents')}
                                            className="text-slate-500 hover:text-slate-700 transition-colors p-1"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Group Booking */}
                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 bg-slate-100 rounded-lg p-3 sm:px-3 sm:py-2 animate-in fade-in-0 slide-in-from-left-2 duration-300 delay-225">
                                    <span className="text-sm text-slate-700">Book a room for group:</span>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="number"
                                            value={filters.groupSize}
                                            min={1}
                                            onChange={(e) => handleFilterChange('groupSize', parseInt(e.target.value))}
                                            className="w-16 text-sm text-center border-none bg-white rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <span className="text-sm text-slate-700">people</span>
                                        <button
                                            onClick={() => clearFilter('groupSize')}
                                            className="text-slate-500 hover:text-slate-700 transition-colors p-1"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">

                    {/* Left Column - Dormitory and Floor Selection */}
                    <div className="lg:col-span-3 space-y-3 lg:space-y-4">

                        {/* Dormitory Selection */}
                        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
                            <div className="px-3 sm:px-4 py-2 sm:py-3 bg-slate-50 border-b border-slate-200">
                                <h2 className="text-sm sm:text-base font-semibold text-slate-900 flex items-center">
                                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600 flex-shrink-0" />
                                    <span className="truncate">Dormitory:
                                        <select name="currentDormitory" id="dormitory-select" onChange={handleDormitoryChange} className="ml-2 text-sm border rounded px-2 py-1">
                                            {dormitoriesList ? (
                                                dormitoriesList.map((dormitory) => (
                                                    <option key={dormitory.id} value={dormitory.id}>{dormitory.name}</option>
                                                ))
                                            ) : (
                                                <option value={""}>No dormitories available</option>
                                            )}
                                        </select>
                                    </span>
                                </h2>
                            </div>
                            <div className="p-3 sm:p-4">
                                <div className="space-y-2">
                                    <span className="text-sm font-medium text-slate-700">Floor:</span>
                                    <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2">
                                        {currentDormitory && currentDormitory.floors &&  currentDormitory.floors.length > 0 ? (
                                            currentDormitory.floors.map((floor, index) => (
                                                <button
                                                    key={index}
                                                    onClick={()=>handleFloorChange(floor)}
                                                    className={`px-2 py-1 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 ${currentFloor === floor
                                                            ? 'bg-blue-600 text-white shadow-md'
                                                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                                        }`}
                                                >
                                                    {floor.floorNumber}
                                                </button>
                                            ))
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Rooms Grid */}
                        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-100">
                            <div className="px-3 sm:px-4 py-2 sm:py-3 bg-slate-50 border-b border-slate-200">
                                <h2 className="text-sm sm:text-base font-semibold text-slate-900">
                                    Rooms:
                                </h2>
                            </div>
                            <div className="p-3 sm:p-4">
                                {/* Compact Grid */}
                                <div className="grid grid-cols-5 sm:grid-cols-8 gap-2 sm:gap-3">
                                    {currentFloor && currentFloor.rooms && currentFloor.rooms.length>0 && currentFloor.rooms.map((room, index) => (
                                        <div key={room.id} className="flex flex-col items-center space-y-1">
                                            <div
                                                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-white text-xs font-medium cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95 hover:shadow-md animate-in zoom-in-50 duration-300`}
                                                style={{ animationDelay: `${index * 20}ms` }}
                                                onClick={() => handleRoomSelect(room.id)}
                                            >
                                                <div className={`w-full h-full rounded-lg flex items-center justify-center ${getRoomColor(room)}`}>
                                                    {room.number.slice(-2)}
                                                </div>
                                            </div>
                                            <span className="text-xs text-slate-600 text-center">{room.number}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Legend */}
                                <div className="mt-3 sm:mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 text-xs sm:text-sm animate-in fade-in-0 slide-in-from-bottom-2 duration-300 delay-300">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 bg-green-500 rounded flex-shrink-0"></div>
                                        <span className="text-slate-700">Available</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 bg-blue-500 rounded flex-shrink-0"></div>
                                        <span className="text-slate-700">Partially occupied</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 bg-red-500 rounded flex-shrink-0"></div>
                                        <span className="text-slate-700">Fully occupied</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Room Details (Desktop) */}
                    <div className="hidden lg:block lg:col-span-1 animate-in fade-in-0 slide-in-from-right-4 duration-500 delay-200">
                        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden sticky top-8">
                            {selectedRoom ? (
                                <>
                                    <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
                                        <div className="space-y-2">
                                            <h3 className="text-sm font-semibold text-slate-900">
                                                Room {selectedRoom.number}:
                                            </h3>
                                            {meetsSearchRequirements(selectedRoom) ? (
                                                <span className="inline-block text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                                                    Room meets the search requirements
                                                </span>
                                            ) : (
                                                <span className="inline-block text-xs text-red-600 bg-red-100 px-2 py-1 rounded-full">
                                                    Room doesn't meet the search requirements
                                                </span>
                                            )}
                                            <Link
                                                href={`/admin/rooms/${selectedRoom.id}`}
                                                className="inline-flex items-center mt-2 px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-md hover:bg-blue-700 transition-colors"
                                            >
                                                To room page →
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Availability Calendar */}
                                    <CalendarOfAvailability2WVerComponent statuses={selectedRoom.statuses} showLegend={false} />

                                    {/* Residents */}
                                    <div className="px-4 py-3">
                                        <h4 className="text-sm font-medium text-slate-900 mb-2">
                                            Residents, {selectedRoom.residents ? selectedRoom.residents.length : 0}/{selectedRoom.capacity}:
                                        </h4>
                                        <div className="space-y-2">
                                            {selectedRoom.residents && selectedRoom.residents.map((resident, index) => (
                                                <div
                                                    key={resident.id}
                                                    className="bg-slate-100 rounded-lg p-2 animate-in fade-in-0 slide-in-from-left-2 duration-300"
                                                    style={{ animationDelay: `${index * 100}ms` }}
                                                >
                                                    <div className="space-y-1">
                                                        <div>
                                                            <div className="font-medium text-slate-900 text-xs">
                                                                {resident.displayName} {resident.secondName}
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center space-x-1">
                                                                <span className="text-xs">Payments</span>
                                                            </div>
                                                            <button name={`eviction${index}`} className="px-3 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors" onClick={()=>{setUserToEvict(resident); setShowEvictionConfirmation(true)}}>
                                                                Evict
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            {Array.from({ length: selectedRoom.capacity - (selectedRoom.residents ? selectedRoom.residents.length : 0) }, (_, i) => (
                                                <div key={`empty-${i}`} className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg p-2 text-center text-slate-500 text-xs animate-in fade-in-0 zoom-in-95 duration-300">
                                                    Available for accommodation
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <EvictionFlowDialogsComponent userToEvict={userToEvict} showEvictionConfirmation={showEvictionConfirmation} closeEvictionConfirmation={closeEvictionConfirmation} roomInfo={selectedRoom}/>
                                </>
                            ) : (
                                <div className="px-4 py-8 text-center animate-in fade-in-0 zoom-in-50 duration-500">
                                    <Building className="mx-auto h-10 w-10 text-slate-300 animate-pulse" />
                                    <p className="mt-2 text-slate-500 text-sm">Select a room to view details</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Room Details Modal */}
            <Dialog open={showMobileRoomDetails} onClose={() => setShowMobileRoomDetails(false)} className="lg:hidden relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300" />
                <div className="fixed inset-0 flex items-end justify-center p-4">
                    <DialogPanel className="w-full max-w-lg bg-white rounded-t-2xl shadow-2xl animate-in slide-in-from-bottom-4 duration-300 max-h-[90vh] overflow-hidden">
                        {selectedRoom && (
                            <>
                                <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-2 flex-1">
                                            <h3 className="text-lg font-semibold text-slate-900">
                                                Room {selectedRoom.number}
                                            </h3>
                                            {meetsSearchRequirements(selectedRoom) && (
                                                <span className="inline-block text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                                                    Meets search requirements
                                                </span>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => setShowMobileRoomDetails(false)}
                                            className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
                                        >
                                            <X className="w-5 h-5 text-slate-500" />
                                        </button>
                                    </div>
                                    <Link
                                        href={`/admin/rooms/${selectedRoom.id}`}
                                        className="inline-flex items-center mt-3 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors w-full justify-center"
                                    >
                                        To room page →
                                    </Link>
                                </div>

                                <div className="overflow-y-auto max-h-[70vh]">
                                    {/* Availability Calendar */}
                                    <div className="px-6 py-4 border-b border-slate-200">
                                        <h4 className="text-sm font-medium text-slate-900 mb-3">
                                            Availability during next 2 weeks:
                                        </h4>
                                        <div className="grid grid-cols-7 gap-1 text-xs">
                                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                                                <div key={day} className="text-center font-medium text-slate-600 py-1">
                                                    {day}
                                                </div>
                                            ))}
                                            {next14Days.map((day, index) => (
                                                <div
                                                    key={day.date}
                                                    className={`text-center py-2 rounded text-xs font-medium transition-all duration-200 hover:scale-110 cursor-pointer animate-in zoom-in-50 duration-300`}
                                                    style={{ animationDelay: `${index * 30}ms` }}
                                                >
                                                    <div className={`w-full py-1 rounded ${index < 4 ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'
                                                        }`}>
                                                        <div>{day.dayNumber}.{day.month}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Residents */}
                                    <div className="px-6 py-4">
                                        <h4 className="text-sm font-medium text-slate-900 mb-3">
                                            Residents, {selectedRoom.residents ? selectedRoom.residents.length : 0}/{selectedRoom.capacity}:
                                        </h4>
                                        <div className="space-y-3">
                                            {selectedRoom.residents && selectedRoom.residents.map((resident, index) => (
                                                <div
                                                    key={resident.id}
                                                    className="bg-slate-100 rounded-lg p-4 animate-in fade-in-0 slide-in-from-left-2 duration-300"
                                                    style={{ animationDelay: `${index * 100}ms` }}
                                                >
                                                    <div className="space-y-3">
                                                        <div>
                                                            <div className="font-medium text-slate-900">
                                                                {resident.displayName} {resident.secondName}
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center space-x-2">
                                                                <span className="text-sm">Payments</span>
                                                            </div>
                                                            <div onClick={(e)=>e.stopPropagation()}>
                                                            <button name={`eviction${index}`} className="px-3 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors" onClick={()=>{setUserToEvict(resident); setShowEvictionConfirmation(true)}}>
                                                                Evict
                                                            </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            {Array.from({ length: selectedRoom.capacity - (selectedRoom.residents ? selectedRoom.residents.length : 0) }, (_, i) => (
                                                <div key={`empty-${i}`} className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg p-4 text-center text-slate-500 animate-in fade-in-0 zoom-in-95 duration-300">
                                                    Available for accommodation
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </DialogPanel>
                </div>
            </Dialog>
        </div>
    );
}