
'use client'

import {useDormitories, useGetActiveDormitories, useGetDeactivatedDormitories} from "@/hooks/dormitories.hook";
import {useEffect, useState} from "react";
import {DormitoryRequest} from "@/app/lib/dorms.api";
import {Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle} from "@headlessui/react";
import {Dormitory, RoomGenerationShema} from "@/types/dormitories.types";

export function AdminDormitoriesList(){
    const{createDormitory, deactivateDormitory, updateDormitory, activateDormitory} = useDormitories();

    const {data: activeDorms, isLoading: isLoadingActiveDormitories, error: activeDormsError, refetch:refetchActiveDormitories}=useGetActiveDormitories();
    const {data: deactivatedDorms, isLoading: isLoadingDeactivatedDormitories, error: deactivatedDormsError, refetch: refetchDeactivatedDormitories}=useGetDeactivatedDormitories();

    const [newDormitory, setNewDormitory] = useState<DormitoryRequest>({
        name: '',
        address: '',
        groundFloorPhoneNumber: '',
        roomGeneration: {numberOfFloors:3,roomsPerFloor:4,pricePerDay:30,pricePerMonth:600},
    });

    const [roomGeneration, setRoomGeneration] = useState<RoomGenerationShema>({
        numberOfFloors: 1,
        roomsPerFloor: 4,
        pricePerDay: 50,
        pricePerMonth: 700,
    });

    const[activeDormitories, setActiveDormitories] = useState<Dormitory[]|undefined>(undefined)
    const[deactivatedDormitories, setDeactivatedDormitories] = useState<Dormitory[]|undefined>(undefined)
    const[chosenDormitory, setChosenDormitory] = useState<Dormitory|undefined>(() => {
            if(!activeDorms){
                if(!deactivatedDorms){
                    return;
                }else{
                    if(deactivatedDorms.data && deactivatedDorms.data.length !== 0){
                        return deactivatedDorms.data.at(0)
                    }
                }
            }else{
                if(activeDorms.data && activeDorms.data.length !== 0){
                    return activeDorms.data.at(0)
                }
            }

            return;
        }
    );
    const[dormitoryFormVisible, setDormitoryFormVisible] = useState<boolean>(false);
    const[isEditing, setIsEditing] = useState<boolean>(false);
    const[temporaryStatus, setTemporaryStatus] = useState<'Active'|'Deactivated'>('Active');

    useEffect(() => {
        setActiveDormitories(activeDorms?.data);
        setDeactivatedDormitories(deactivatedDorms?.data);

        setChosenDormitory((prevState)=>{
            if(prevState){
                if(activeDormitories && Array.isArray(activeDormitories) && activeDormitories.length !== 0){
                    activeDormitories?.forEach((dorm, index)=>{
                        if(dorm.id === prevState.id){return dorm}
                    })}
                if(deactivatedDormitories && Array.isArray(deactivatedDormitories) && deactivatedDormitories.length !== 0) {
                    deactivatedDormitories?.forEach((dorm, index) => {
                        if (dorm.id === prevState.id) {
                            return dorm
                        }
                    })
                }
            }else{
                if(!activeDorms){
                    if(!deactivatedDorms){
                        return;
                    }else{
                        if(deactivatedDorms.data && deactivatedDorms.data.length !== 0){
                            return deactivatedDorms.data.at(0)
                        }
                    }
                }else{
                    if(activeDorms.data && activeDorms.data.length !== 0){
                        return activeDorms.data.at(0)
                    }
                }

                return;
            }
        })
        if(chosenDormitory){
            setTemporaryStatus(chosenDormitory?.status)
        }
    }, [activeDorms, deactivatedDorms]);

    useEffect(() => {
        if (!isEditing) {
            refetchActiveDormitories()
            refetchDeactivatedDormitories()
        }
    }, [isEditing]);

    const handleDeactivate = () => {
        if(chosenDormitory){
            deactivateDormitory({id:chosenDormitory.id});
            setTemporaryStatus('Deactivated');
        }
    };

    const handleActivate = () => {
        if(chosenDormitory){
            activateDormitory({id:chosenDormitory.id});
            setTemporaryStatus('Active')
        }
    };

    const handleOpenDormitoryCreationForm = () => {
        setDormitoryFormVisible(true);
    };

    const handleCloseDormitoryCreationForm = () => {
        setDormitoryFormVisible(false);
    };

    const handleCreateDormitory = () => {

        setNewDormitory(prev=>({
            ...prev,
            roomGeneration: roomGeneration
        }));
        console.log('Creating dormitory: ',newDormitory);
        createDormitory({newDormitory})

    }

    const handleNewDormInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;


        if(name=="name" || name=="address" || name=="groundFloorPhoneNumber") {
            setNewDormitory(prev => ({
                ...prev,
                [name]: value
            }))
        }else{
            setRoomGeneration(prev => ({
                ...prev,
                [name]: value
            }))
        }
    }

    const handleChosenDormInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setChosenDormitory(prev=>{
            if(!prev) return prev;
            return {
                ...prev,
                [name]: value
            };
        })

    }

    const handleBeginEditing = () => {
        setIsEditing(true);
    }

    const handleSaveEditingChanges = () => {
        updateDormitory({updatedInformation: {name: chosenDormitory?.name || '', address: chosenDormitory?.address || '', groundFloorPhoneNumber: chosenDormitory?.groundFloorPhoneNumber || ''}, id: chosenDormitory?.id || ''})
        console.log("Updating dormitory: ", chosenDormitory?.name)
        setIsEditing(false);
    }

    const handleCancelEditing = () => {
        setIsEditing(false);
    }

    if (isLoadingActiveDormitories || isLoadingDeactivatedDormitories) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-md mx-4">
                    <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <span className="ml-3 text-gray-700 font-medium">Loading dormitories...</span>
                    </div>
                </div>
            </div>
        )
    }

    if (activeDormsError || deactivatedDormsError) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-md mx-4">
                    <div className="text-center">
                        <div className="text-red-500 mb-3">
                            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <p className="text-gray-700 font-medium">Error loading dormitories. Please try again.</p>
                    </div>
                </div>
            </div>
        )
    }

    return(
        <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="px-4 py-6 md:px-6 md:py-8 flex flex-row">
                    <div className="flex items-center space-x-3">
                        <div className="p-3 bg-blue-600 rounded-xl shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                                Dormitories Management
                            </h1>
                            <p className="text-gray-600 text-sm md:text-base mt-1">
                                Manage and configure dormitory facilities
                            </p>
                        </div>
                    </div>
                    <div className="justify-self-end ml-auto">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex flex-row items-baseline space-x-2" onClick={handleOpenDormitoryCreationForm}>
                            <span >+</span>
                            <span> Create new dormitory</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="p-4 md:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        {/* Dormitory Selection */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M10.5 3L12 2l1.5 1H21l-1 6H4l-1-6h7.5z" />
                                            </svg>
                                            <h2 className="text-lg font-semibold text-white">Select Dormitory</h2>
                                        </div>
                                        <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">
                                            {activeDormitories?.length || 0}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col overflow-scroll max-h-">
                                    {activeDormitories && Array.isArray(activeDormitories) && activeDormitories.length > 0 ? (
                                        <div className="space-y-3">
                                            <div>
                                                <h3>Active dormitories:</h3>
                                            </div>
                                            {activeDormitories.map((dormitory, index) => (
                                                <button
                                                    key={dormitory.id || index}
                                                    onClick={() => {setChosenDormitory(dormitory); if(chosenDormitory){setTemporaryStatus(chosenDormitory?.status)}}}
                                                    className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                                                        (chosenDormitory && chosenDormitory.id) === dormitory.id
                                                            ? 'border-blue-500 bg-blue-50 text-blue-900 shadow-md'
                                                            : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-blue-300 hover:bg-blue-25'
                                                    }`}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <h3 className="font-medium text-lg">{dormitory.name}</h3>
                                                            <p className="text-sm opacity-75 mt-1">
                                                                ID: {dormitory.id}
                                                            </p>
                                                        </div>
                                                        <div className={`w-3 h-3 rounded-full ${
                                                            (chosenDormitory && chosenDormitory.id) === dormitory.id
                                                                ? 'bg-blue-500'
                                                                : 'bg-gray-300'
                                                        }`}></div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <div className="text-gray-400 mb-4">
                                                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                </svg>
                                            </div>
                                            <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Dormitories</h3>
                                            <p className="text-gray-600 text-sm mb-4">
                                                There are currently no active dormitories available.
                                            </p>
                                        </div>
                                    )}
                                    {deactivatedDormitories && Array.isArray(deactivatedDormitories) && deactivatedDormitories.length > 0 ? (
                                        <div  className="space-y-3 pt-3">
                                            <div>
                                                <h3>Deactivated dormitories:</h3>
                                            </div>
                                            {deactivatedDormitories.map((dormitory, index) => (
                                                <button
                                                    key={dormitory.id || index}
                                                    onClick={() => setChosenDormitory(dormitory)}
                                                    className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                                                        (chosenDormitory && chosenDormitory.id) === dormitory.id
                                                            ? 'border-blue-500 bg-blue-50 text-blue-900 shadow-md'
                                                            : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-blue-300 hover:bg-blue-25'
                                                    }`}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <h3 className="font-medium text-lg">{dormitory.name}</h3>
                                                            <p className="text-sm opacity-75 mt-1">
                                                                ID: {dormitory.id}
                                                            </p>
                                                        </div>
                                                        <div className={`w-3 h-3 rounded-full ${
                                                            (chosenDormitory && chosenDormitory.id) === dormitory.id
                                                                ? 'bg-blue-500'
                                                                : 'bg-gray-300'
                                                        }`}></div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    ):(
                                        <></>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Dormitory Details */}
                        <div className="lg:col-span-2">
                            {chosenDormitory ? (
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                    <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <h2 className="text-xl font-semibold text-white">Dormitory Details</h2>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            {/* Basic Information */}
                                            <div className="space-y-4 col-span-2">
                                                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                                                    Basic Information
                                                </h3>
                                                <div className="space-y-3">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-500">Name</label>
                                                        <input
                                                            className="text-gray-900 font-semibold"
                                                            type="text"
                                                            disabled={!isEditing}
                                                            value={chosenDormitory.name}
                                                            name="name"
                                                            onChange={handleChosenDormInputChange}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-500">Address</label>
                                                        <input
                                                            className="text-gray-900 font-semibold"
                                                            type="text"
                                                            disabled={!isEditing}
                                                            value={chosenDormitory.address}
                                                            name="address"
                                                            onChange={handleChosenDormInputChange}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-500">Ground floor number</label>
                                                        <input
                                                            className="text-gray-900 font-semibold"
                                                            type="text"
                                                            disabled={!isEditing}
                                                            value={chosenDormitory.groundFloorPhoneNumber}
                                                            name="groundFloorPhoneNumber"
                                                            onChange={handleChosenDormInputChange}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-500">Status</label>
                                                        {chosenDormitory.status==="Active" ? (
                                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                                                                Active
                                                            </span>
                                                        ):(
                                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                                                                <div className="w-2 h-2 bg-red-600 rounded-full mr-2"></div>
                                                                Deactivated
                                                            </span>
                                                        )
                                                        }
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Statistics */}
                                            <div className="space-y-4">
                                                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                                                    Statistics
                                                </h3>
                                                <div className="grid grid-cols-1 gap-4">
                                                    <div className="bg-blue-50 p-4 rounded-lg">
                                                        <div className="text-2xl font-bold text-blue-900">0</div>
                                                        <div className="text-sm text-blue-600">Total Rooms</div>
                                                    </div>
                                                    <div className="bg-green-50 p-4 rounded-lg">
                                                        <div className="text-2xl font-bold text-green-900">0</div>
                                                        <div className="text-sm text-green-600">Occupied</div>
                                                    </div>
                                                    <div className="bg-yellow-50 p-4 rounded-lg">
                                                        <div className="text-2xl font-bold text-yellow-900">0</div>
                                                        <div className="text-sm text-yellow-600">Available</div>
                                                    </div>
                                                    <div className="bg-purple-50 p-4 rounded-lg">
                                                        <div className="text-2xl font-bold text-purple-900">0</div>
                                                        <div className="text-sm text-purple-600">Residents</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="mt-8 pt-6 border-t border-gray-200">
                                            <div className="flex flex-wrap gap-3">
                                                {!isEditing ? (
                                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2" onClick={handleBeginEditing}>
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                        <span>Edit Details</span>
                                                    </button>
                                                ):(
                                                    <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors flex items-center space-x-2" onClick={handleSaveEditingChanges}>
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                        <span>Save Changes</span>
                                                    </button>
                                                )}
                                                {isEditing ? (
                                                    <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2" onClick={handleCancelEditing}>
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                        <span>Cancel</span>
                                                    </button>
                                                ):(
                                                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V9a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                        </svg>
                                                        <span>View Rooms</span>
                                                    </button>
                                                )}
                                                {isEditing && temporaryStatus=="Active" ? (
                                                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2" onClick={handleDeactivate}>
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                        <span>Deactivate</span>
                                                    </button>
                                                ):(
                                                    (isEditing && temporaryStatus=="Deactivated" ? (
                                                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2" onClick={handleActivate}>
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 16l9-9 9 9m-9-9v14" />
                                                            </svg>
                                                            <span>Activate</span>
                                                        </button>
                                                    ):(<></>))
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                                    <div className="text-gray-400 mb-4">
                                        <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Dormitory Selected</h3>
                                    <p className="text-gray-600">
                                        Select a dormitory from the list to view its details and manage settings.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Dialog open={dormitoryFormVisible} onClose={()=>handleCloseDormitoryCreationForm()} className={`relative z-50`}>
                <DialogBackdrop className={`fixed inset-0 bg-black/30`}/>
                <div className="fixed inset-0 flex items-center justify-center p-4 w-screen">
                    <DialogPanel className={`bg-gray-200`}>
                        <DialogTitle title="New Dormitory" className={`bg-gray-600`}/>
                        <Description className={`bg-gray-400 text-3xl font-bold px-4 py-1`}>New Dormitory</Description>
                        <form className={`flex flex-col items-left p-4 font-semibold text-2xl`}
                              onSubmit={(e)=>{e.preventDefault(); handleCreateDormitory()}}>
                            <div className={`flex flex-row w-full space-x-4 py-1`}>
                                <label>Dormitory name:</label>
                                <input
                                    className='grow'
                                    type="text"
                                    name="name"
                                    placeholder="Enter new dormitory name"
                                    value={newDormitory.name}
                                    disabled={!dormitoryFormVisible}
                                    onChange={handleNewDormInputChange}
                                />
                            </div>
                            <div className={`flex flex-row w-full space-x-4 py-1`}>
                                <label>Dormitory address:</label>
                                <input
                                    className="grow"
                                    type="text"
                                    name="address"
                                    placeholder="Enter address"
                                    value={newDormitory.address}
                                    disabled={!dormitoryFormVisible}
                                    onChange={handleNewDormInputChange}
                                />
                            </div>
                            <div className={`flex flex-row w-full space-x-4 py-1`}>
                                <label>Dormitory ground floor number:</label>
                                <input
                                    className="grow"
                                    type="text"
                                    name="groundFloorPhoneNumber"
                                    placeholder="Enter ground floor number"
                                    value={newDormitory.groundFloorPhoneNumber}
                                    disabled={!dormitoryFormVisible}
                                    onChange={handleNewDormInputChange}
                                />
                            </div>
                            <div className={`border-black border flex flex-col`}>
                                <div className="flex flex-row w-full space-x-4 py-1">
                                    <label>Number of floors:</label>
                                    <input
                                        className="grow"
                                        type="number"
                                        name="numberOfFloors"
                                        value={roomGeneration.numberOfFloors}
                                        disabled={!dormitoryFormVisible}
                                        onChange={handleNewDormInputChange}
                                    />
                                </div>
                                <div className="flex flex-row w-full space-x-4 py-1">
                                    <label>Number of rooms per floor:</label>
                                    <input
                                        className="grow"
                                        type="number"
                                        name="roomsPerFloor"
                                        value={roomGeneration.roomsPerFloor}
                                        disabled={!dormitoryFormVisible}
                                        onChange={handleNewDormInputChange}
                                    />
                                </div>
                                <div className="flex flex-row w-full space-x-4 py-1">
                                    <label>Price per day:</label>
                                    <input
                                        className="grow"
                                        type="number"
                                        name="pricePerDay"
                                        value={roomGeneration.pricePerDay}
                                        disabled={!dormitoryFormVisible}
                                        onChange={handleNewDormInputChange}
                                    />
                                </div>
                                <div className="flex flex-row w-full space-x-4 py-1">
                                    <label>Price per month:</label>
                                    <input
                                        className="grow"
                                        type="number"
                                        name="pricePerMonth"
                                        value={roomGeneration.pricePerMonth}
                                        disabled={!dormitoryFormVisible}
                                        onChange={handleNewDormInputChange}
                                    />
                                </div>
                            </div>

                            <button type="submit">Create</button>
                            <button onClick={handleCloseDormitoryCreationForm}>Cancel</button>
                        </form>
                    </DialogPanel>
                </div>
            </Dialog>
        </div>
    )
}