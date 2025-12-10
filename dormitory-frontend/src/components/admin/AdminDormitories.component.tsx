'use client'

import {useDormitories, useGetActiveDormitories, useGetDeactivatedDormitories} from "@/hooks/dormitories.hook";
import {useEffect, useState} from "react";
import {Dormitory, DormitoryPostData, RoomGenerationShema} from "@/types/dormitories.types";
import {ChevronLeft, ChevronRight} from "lucide-react";
import CreateDormitoryDialogComponent from "@/components/dialogs/admin/CreateDormitoryDialog.component";
import {DormitoryListTutorial} from "@/app/tutorials/dormitory/dormitory-list";
import {useCurrentUserProfile} from "@/hooks/user.hook";
import {ManagePriceCategoriesDialog} from "@/components/dialogs/admin/ManagePriceCategoriesDialog.component";
import {ManageRoomTemplatesDialog} from "@/components/dialogs/admin/ManageRoomTemplatesDialog.component";
import {ManageRoomStatusTypesDialog} from "@/components/dialogs/admin/ManageRoomStatusTypesDialog.component";
import { useLanguage } from "@/providers/language.provider";

export function AdminDormitoriesList(){
    const {t} = useLanguage();
    const{createDormitory, deactivateDormitory, updateDormitory, activateDormitory} = useDormitories();
    const {data: currentUser, isLoading: loadingCurrentUser, error: currentUserError} = useCurrentUserProfile()

    const {data: activeDorms, isLoading: isLoadingActiveDormitories, error: activeDormsError, refetch:refetchActiveDormitories}=useGetActiveDormitories();
    const {data: deactivatedDorms, isLoading: isLoadingDeactivatedDormitories, error: deactivatedDormsError, refetch: refetchDeactivatedDormitories}=useGetDeactivatedDormitories();

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
    const[priceCategoriesModalOpen, setPriceCategoriesModalOpen] = useState<boolean>(false);
    const[roomTemplatesModalOpen, setRoomTemplatesModalOpen] = useState<boolean>(false);
    const[roomStatusTypesModalOpen, setRoomStatusTypesModalOpen] = useState<boolean>(false);

    useEffect(() => {
        setActiveDormitories(activeDorms?.data);
        setDeactivatedDormitories(deactivatedDorms?.data);

        setChosenDormitory((prevState)=>{
            if(prevState){
                const foundInActive = activeDorms?.data?.find(dorm => dorm.id === prevState.id);
                if(foundInActive) {
                    return foundInActive;
                }
                const foundInDeactivated = deactivatedDorms?.data?.find(dorm => dorm.id === prevState.id);
                if(foundInDeactivated) {
                    return foundInDeactivated;
                }
                
                return prevState;
            }else{
                if(activeDorms?.data && activeDorms.data.length > 0){
                    return activeDorms.data[0];
                }
                if(deactivatedDorms?.data && deactivatedDorms.data.length > 0){
                    return deactivatedDorms.data[0];
                }
                return undefined;
            }
        })
        if(chosenDormitory){
            setTemporaryStatus(chosenDormitory?.status)
        }
    }, [activeDorms, deactivatedDorms]);

    useEffect(() => {
        if (!isEditing && !dormitoryFormVisible) {
            refetchActiveDormitories()
            refetchDeactivatedDormitories()
        }
    }, [isEditing, dormitoryFormVisible]);

    useEffect(() => {
        if (chosenDormitory) {
            console.log("Chosen Dormitory:", chosenDormitory);
            console.log("Statistics:", chosenDormitory.statistics);
        }
    }, [chosenDormitory]);

    // Helper function to extract statistics from dormitory object
    // Handles both nested statistics object and flat properties
    const getStatistics = (dorm: Dormitory | undefined) => {
        if (!dorm) return { totalFloors: 0, totalRooms: 0, occupiedRooms: 0, availableRooms: 0, totalResidents: 0, occupancyRate: 0 };
        
        // Check if statistics is a nested object
        if (dorm.statistics) {
            return dorm.statistics;
        }
        
        // Otherwise, extract from flat properties (for backward compatibility)
        return {
            totalFloors: (dorm as any).floorCount || dorm.floors?.length || 0,
            totalRooms: (dorm as any).roomCount || 0,
            occupiedRooms: (dorm as any).occupiedRooms || 0,
            availableRooms: (dorm as any).availableRooms || 0,
            totalResidents: (dorm as any).totalResidents || 0,
            occupancyRate: (dorm as any).occupancyRate || 0,
        };
    };

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

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        setCurrentIndex(0);
    }, [chosenDormitory]);

    const goToPrevious = () => {
        setCurrentIndex(prev => (prev === 0 && chosenDormitory?.photos && chosenDormitory.photos? chosenDormitory.photos.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex(prev => (chosenDormitory?.photos && prev === chosenDormitory.photos.length - 1? 0 : prev + 1));
    };

    if (isLoadingActiveDormitories || isLoadingDeactivatedDormitories) {
        return (
            <div className=" w-full flex items-center justify-center bg-gray-50">
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-md mx-4">
                    <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <span className="ml-3 text-gray-700 font-medium">{t('admin.dormitories.loadingDormitories')}</span>
                    </div>
                </div>
            </div>
        )
    }

    const handleNewDormPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value, files} = e.target;
        const photos = files ? Array.from(files) : []

        if(name === "photos"){
        }
    }


    if (activeDormsError || deactivatedDormsError) {
        return (
            <div className=" w-full flex items-center justify-center bg-gray-50">
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
        <DormitoryListTutorial>
            <div className=" w-full bg-gray-50">
                {/* Header */}
                <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10 dormitory-management-header">
                    <div className="px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 sm:p-3 bg-blue-600 rounded-xl shadow-lg">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <div>
                                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                                        {t('admin.dormitories.title')}
                                </h1>
                                <p className="text-gray-600 text-xs sm:text-sm mt-1">
                                    Manage and configure dormitory facilities
                                </p>
                            </div>
                        </div>
                            {(currentUser && currentUser.role === 'SuperAdmin') && (
                                <button
                                    className="px-3 py-2 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base create-dormitory-header-button"
                                    onClick={handleOpenDormitoryCreationForm}
                                >
                                    <span className="text-lg">+</span>
                                    <span className="hidden sm:inline">{t('admin.dormitories.createNew')}</span>
                                    <span className="sm:hidden">{t('admin.create')}</span>
                                </button>
                            )}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="p-4 sm:p-6 lg:p-8">
                <div className="w-full px-6">
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                        
                        {/* Dormitory Selection */}
                        <div className="xl:col-span-1 dormitory-selection-panel">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-fit max-h-[calc(100vh-200px)]">
                                <div className="bg-blue-600 px-4 sm:px-6 py-3 sm:py-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2 sm:space-x-3">
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M10.5 3L12 2l1.5 1H21l-1 6H4l-1-6h7.5z" />
                                            </svg>
                                            <h2 className="text-sm sm:text-lg font-semibold text-white">Select Dormitory</h2>
                                        </div>
                                        <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">
                                            {((activeDormitories?.length || 0) + (deactivatedDormitories?.length || 0))}
                                        </span>
                                    </div>
                                </div>

                                <div className="overflow-y-auto max-h-[calc(100vh-280px)]">
                                    <div className="p-4 sm:p-6 space-y-4">
                                        {/* Active Dormitories */}
                                        {activeDormitories && Array.isArray(activeDormitories) && activeDormitories.length > 0 && (
                                            <div className="space-y-3 active-dormitories-section">
                                                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">{t('admin.dormitories.activeDormitories')}</h3>
                                                <div className="space-y-2">
                                                    {activeDormitories.map((dormitory, index) => (
                                                        <button
                                                            key={dormitory.id || index}
                                                            onClick={() => {setChosenDormitory(dormitory); setTemporaryStatus(dormitory.status)}}
                                                            className={`w-full text-left p-3 sm:p-4 rounded-lg border-2  ${
                                                                (chosenDormitory && chosenDormitory.id) === dormitory.id
                                                                    ? 'border-blue-500 bg-blue-50 text-blue-900 shadow-md'
                                                                    : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-blue-300 hover:bg-blue-25'
                                                            }`}
                                                        >
                                                            <div className="flex items-center justify-between">
                                                                <div className="min-w-0 flex-1">
                                                                    <h3 className="font-medium text-sm sm:text-base truncate">{dormitory.name}</h3>
                                                                    <p className="text-xs opacity-75 mt-1 truncate">
                                                                        ID: {dormitory.id}
                                                                    </p>
                                                                </div>
                                                                <div className="flex items-center space-x-2 ml-2">
                                                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1"></div>
                                                                        {t('admin.dormitories.active')}
                                                                    </span>
                                                                    <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                                                                        (chosenDormitory && chosenDormitory.id) === dormitory.id
                                                                            ? 'bg-blue-500'
                                                                            : 'bg-gray-300'
                                                                    }`}></div>
                                                                </div>
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Deactivated Dormitories */}
                                        {deactivatedDormitories && Array.isArray(deactivatedDormitories) && deactivatedDormitories.length > 0 && (
                                            <div className="space-y-3">
                                                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">{t('admin.dormitories.deactivatedDormitories')}</h3>
                                                <div className="space-y-2">
                                                    {deactivatedDormitories.map((dormitory, index) => (
                                                        <button
                                                            key={dormitory.id || index}
                                                            onClick={() => {setChosenDormitory(dormitory); setTemporaryStatus(dormitory.status)}}
                                                            className={`w-full text-left p-3 sm:p-4 rounded-lg border-2  ${
                                                                (chosenDormitory && chosenDormitory.id) === dormitory.id
                                                                    ? 'border-blue-500 bg-blue-50 text-blue-900 shadow-md'
                                                                    : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-blue-300 hover:bg-blue-25'
                                                            }`}
                                                        >
                                                            <div className="flex items-center justify-between">
                                                                <div className="min-w-0 flex-1">
                                                                    <h3 className="font-medium text-sm sm:text-base truncate">{dormitory.name}</h3>
                                                                    <p className="text-xs opacity-75 mt-1 truncate">
                                                                        ID: {dormitory.id}
                                                                    </p>
                                                                </div>
                                                                <div className="flex items-center space-x-2 ml-2">
                                                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                                                                        <div className="w-1.5 h-1.5 bg-red-600 rounded-full mr-1"></div>
                                                                        {t('admin.dormitories.inactive')}
                                                                    </span>
                                                                    <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                                                                        (chosenDormitory && chosenDormitory.id) === dormitory.id
                                                                            ? 'bg-blue-500'
                                                                            : 'bg-gray-300'
                                                                    }`}></div>
                                                                </div>
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* No Dormitories */}
                                        {(!activeDormitories || activeDormitories.length === 0) && 
                                         (!deactivatedDormitories || deactivatedDormitories.length === 0) && (
                                            <div className="text-center py-8">
                                                <div className="text-gray-400 mb-4">
                                                    <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                    </svg>
                                                </div>
                                                <h3 className="text-lg font-medium text-gray-900 mb-2">{t('admin.dormitories.noDormitories')}</h3>
                                                <p className="text-gray-600 text-sm mb-4">
                                                    {t('admin.dormitories.noDormitoriesMessage')}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Dormitory Details */}
                        <div className="xl:col-span-2 dormitory-details-panel">
                            {chosenDormitory ? (
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                    <div className="bg-green-600 px-4 sm:px-6 py-3 sm:py-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2 sm:space-x-3">
                                                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <h2 className="text-lg sm:text-xl font-semibold text-white">{t('admin.dormitories.details.title')}</h2>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4 sm:p-6">
                                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                                            {/* Basic Information */}
                                            <div className="space-y-4 lg:col-span-2 dormitory-basic-info">
                                                <h3 className="text-base sm:text-lg font-semibold text-gray-900 border-b pb-2">
                                                    {t('admin.dormitories.details.basicInfo')}
                                                </h3>
                                                <div className="space-y-3 sm:space-y-4">
                                                    <div>
                                                        <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">{t('admin.dormitories.details.name')}</label>
                                                        <input
                                                            className={`w-full px-3 py-2 text-sm sm:text-base font-semibold border rounded-lg transition-colors ${
                                                                isEditing 
                                                                    ? 'border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500' 
                                                                    : 'border-transparent bg-gray-50 text-gray-900'
                                                            }`}
                                                            type="text"
                                                            disabled={!isEditing}
                                                            value={chosenDormitory.name}
                                                            name="name"
                                                            onChange={handleChosenDormInputChange}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">{t('admin.dormitories.details.address')}</label>
                                                        <input
                                                            className={`w-full px-3 py-2 text-sm sm:text-base font-semibold border rounded-lg transition-colors ${
                                                                isEditing 
                                                                    ? 'border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500' 
                                                                    : 'border-transparent bg-gray-50 text-gray-900'
                                                            }`}
                                                            type="text"
                                                            disabled={!isEditing}
                                                            value={chosenDormitory.address}
                                                            name="address"
                                                            onChange={handleChosenDormInputChange}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">{t('admin.dormitories.details.phone')}</label>
                                                        <input
                                                            className={`w-full px-3 py-2 text-sm sm:text-base font-semibold border rounded-lg transition-colors ${
                                                                isEditing 
                                                                    ? 'border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500' 
                                                                    : 'border-transparent bg-gray-50 text-gray-900'
                                                            }`}
                                                            type="text"
                                                            disabled={!isEditing}
                                                            value={chosenDormitory.groundFloorPhoneNumber}
                                                            name="groundFloorPhoneNumber"
                                                            onChange={handleChosenDormInputChange}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">{t('common.status')}</label>
                                                        {chosenDormitory.status==="Active" ? (
                                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                                                                Active
                                                            </span>
                                                        ):(
                                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                                                                <div className="w-2 h-2 bg-red-600 rounded-full mr-2"></div>
                                                                Deactivated
                                                            </span>
                                                        )}
                                                    </div>
                                                    {chosenDormitory.photos.length > 0 ? (
                                                        <div className="dormitory-photos">
                                                            <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">Photos</label>
                                                            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
                                                                <img
                                                                    src={chosenDormitory.photos[currentIndex]}
                                                                    alt={`Photo ${currentIndex + 1}`}
                                                                    className="w-full h-full object-cover"
                                                                />

                                                                {/* Navigation arrows */}
                                                                {chosenDormitory.photos.length > 1 && (
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
                                                                    {currentIndex + 1} / {chosenDormitory.photos.length}
                                                                </div>
                                                            </div>

                                                            {/* Dots indicator */}
                                                            {chosenDormitory.photos.length > 1 && (
                                                                <div className="flex justify-center mt-4 gap-2">
                                                                    {chosenDormitory.photos.map((_, index) => (
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
                                            </div>

                                            {/* Statistics */}
                                            <div className="space-y-4 dormitory-statistics">
                                                <h3 className="text-base sm:text-lg font-semibold text-gray-900 border-b pb-2">
                                                    {t('admin.dormitories.details.statistics')}
                                                </h3>
                                                <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
                                                    <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                                    
                                                        <div className="text-xl sm:text-2xl font-bold text-blue-900">{getStatistics(chosenDormitory).totalRooms}</div>
                                                        <div className="text-xs sm:text-sm text-blue-600">{t('admin.dormitories.details.rooms')}</div>
                                                    </div>
                                                    <div className="bg-yellow-50 p-3 sm:p-4 rounded-lg">
                                                        <div className="text-xl sm:text-2xl font-bold text-yellow-900">{getStatistics(chosenDormitory).availableRooms}</div>
                                                        <div className="text-xs sm:text-sm text-yellow-600">{t('admin.dormitories.details.available')}</div>
                                                    </div>
                                                    <div className="bg-purple-50 p-3 sm:p-4 rounded-lg">
                                                        <div className="text-xl sm:text-2xl font-bold text-purple-900">{getStatistics(chosenDormitory).totalResidents}</div>
                                                        <div className="text-xs sm:text-sm text-purple-600">{t('admin.dormitories.details.residents')}</div>
                                                    </div>
                                                    <div className="bg-indigo-50 p-3 sm:p-4 rounded-lg">
                                                        <div className="text-xl sm:text-2xl font-bold text-indigo-900">{getStatistics(chosenDormitory).totalFloors}</div>
                                                        <div className="text-xs sm:text-sm text-indigo-600">{t('admin.dormitories.details.floors')}</div>
                                                    </div>
                                                        <div className="bg-indigo-50 p-3 sm:p-4 rounded-lg">
                                                        <div className="text-xl sm:text-2xl font-bold text-indigo-900">{getStatistics(chosenDormitory).occupiedRooms}</div>
                                                        <div className="text-xs sm:text-sm text-indigo-600">{t('admin.dormitories.details.occupied')}</div>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>

                                        {/* Management Buttons */}
                                        <div className="mt-6 pt-4 border-t border-gray-200">
                                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
                                                {t('admin.dormitories.management.title')}
                                            </h3>
                                            <div className="grid grid-cols-1 gap-2">
                                                <button
                                                    onClick={() => setPriceCategoriesModalOpen(true)}
                                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 text-sm"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span>{t('admin.dormitories.management.priceCategories')}</span>
                                                </button>
                                                <button
                                                    onClick={() => setRoomTemplatesModalOpen(true)}
                                                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2 text-sm"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                    </svg>
                                                    <span>{t('admin.dormitories.management.roomTemplates')}</span>
                                                </button>
                                                <button
                                                    onClick={() => setRoomStatusTypesModalOpen(true)}
                                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 text-sm"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span>{t('admin.dormitories.management.roomStatus')}</span>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        {(currentUser && currentUser.role==='SuperAdmin') && (
                                            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200 dormitory-actions">
                                                <div className="flex flex-wrap gap-2 sm:gap-3">
                                                    {!isEditing ? (
                                                        <button className="px-3 py-2 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 text-sm" onClick={handleBeginEditing}>
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                            </svg>
                                                            <span>{t('admin.dormitories.actions.editDetails')}</span>
                                                        </button>
                                                    ):(
                                                        <button className="px-3 py-2 sm:px-4 sm:py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors flex items-center space-x-2 text-sm" onClick={handleSaveEditingChanges}>
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                            <span>{t('admin.dormitories.actions.saveChanges')}</span>
                                                        </button>
                                                    )}
                                                    {isEditing ? (
                                                        <button className="px-3 py-2 sm:px-4 sm:py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2 text-sm" onClick={handleCancelEditing}>
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                            <span>{t('admin.dormitories.actions.cancel')}</span>
                                                        </button>
                                                    ):(
                                                        <button className="px-3 py-2 sm:px-4 sm:py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 text-sm">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V9a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                            </svg>
                                                            <span>{t('admin.dormitories.actions.viewRooms')}</span>
                                                        </button>
                                                    )}
                                                    {isEditing && temporaryStatus=="Active" ? (
                                                        <button className="px-3 py-2 sm:px-4 sm:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2 text-sm" onClick={handleDeactivate}>
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                            <span>{t('admin.dormitories.actions.deactivate')}</span>
                                                        </button>
                                                    ):(
                                                        (isEditing && temporaryStatus=="Deactivated" ? (
                                                            <button className="px-3 py-2 sm:px-4 sm:py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 text-sm" onClick={handleActivate}>
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                </svg>
                                                                <span>{t('admin.dormitories.actions.activate')}</span>
                                                            </button>
                                                        ):(<></>))
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 sm:p-12 text-center">
                                    <div className="text-gray-400 mb-4">
                                        <svg className="mx-auto h-12 w-12 sm:h-16 sm:w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('admin.dormitories.noSelection.title')}</h3>
                                    <p className="text-gray-600">
                                        {t('admin.dormitories.noSelection.message')}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Dialogs */}
                {(currentUser && currentUser.role==='SuperAdmin') && (
                    <>
                        <CreateDormitoryDialogComponent open={dormitoryFormVisible} onClose={handleCloseDormitoryCreationForm}/>
                        <ManagePriceCategoriesDialog open={priceCategoriesModalOpen} onClose={() => setPriceCategoriesModalOpen(false)} />
                        <ManageRoomTemplatesDialog open={roomTemplatesModalOpen} onClose={() => setRoomTemplatesModalOpen(false)} />
                        <ManageRoomStatusTypesDialog open={roomStatusTypesModalOpen} onClose={() => setRoomStatusTypesModalOpen(false)} />
                    </>
                )}
        </div>
        </DormitoryListTutorial>
    )
}