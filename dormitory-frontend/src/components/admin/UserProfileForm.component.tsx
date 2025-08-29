import {useEffect, useState} from "react"
import {useUserList} from "@/hooks/admin-hook-file";
import Link from "next/link";

interface UserProfileFormProps {
    userId:string;
}

export function UserProfileForm({userId}:UserProfileFormProps){

    const {getUserProfile, deactivateUser, activateUser} = useUserList();

    const [profileData, setProfileData] = useState({
        displayName: '',
        lastName: '',
        //studentId: '',
        email: '',
        photo: null as File | null,
        role: 'user'
    })


   const {data: userProfileData, isLoading, error} = getUserProfile(userId);


    useEffect(() => {
        if(userProfileData){
            setProfileData({
                displayName: userProfileData.displayName,
                lastName: userProfileData.secondName,
                email: userProfileData.email,
                role: userProfileData.role,
                photo: null as File | null,
            })
        }
    }, [userProfileData]);

    const handleUserDeactivation = () => {
        console.log("Deactivating user ", profileData)
        deactivateUser({id:userId});

    }

    const handleUserActivation = () => {
        console.log("Activating user ", profileData)
        activateUser({id:userId});
    }


    if(isLoading){
        return (
            <div className="bg-white border border-gray-300 rounded-lg p-8">
                <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900"></div>
                    <span className="ml-2">Loading user list...</span>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="bg-white border border-gray-300 rounded-lg p-8">
                <div className="text-center text-red-600">
                    <p>Error loading user list. Please try again.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto bg-white border border-gray-300 rounded-lg flex-1">
        {/* Header */}
        <div className="bg-gray-100 px-6 py-4 border-b border-gray-300">
            <h2 className="text-lg font-semibold text-gray-900">Student Profile</h2>
        </div>

        {/* Content */}
        <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Form Fields */}
                <div className="md:col-span-2 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                First Name: <span className="text-blue-600">✏️</span>
                            </label>
                            <input
                                type="text"
                                name="displayName"
                                value={profileData.displayName}
                                disabled={true}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Photo: <span className="text-blue-600">✏️</span>
                            </label>
                            <input
                                type="file"
                                name="photo"
                                disabled={true}
                                accept="image/*"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 text-sm"
                            />
                            {profileData.photo && (
                                <p className="text-xs text-gray-600 mt-1">
                                    Selected: {profileData.photo.name}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Second Name: <span className="text-blue-600">✏️</span>
                        </label>
                        <input
                            type="text"
                            name="secondName"
                            value={profileData.lastName}
                            disabled={true}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email: <span className="text-blue-600">✏️</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={profileData.email}
                            disabled={isLoading}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                        />
                    </div>

                    <div className="pt-4">
                        <p className="text-sm font-medium text-gray-700">
                            Role: {profileData.role}
                        </p>
                    </div>
                </div>


            {/*/!* Action Buttons *!/*/}
            {/*<div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">*/}
            {/*    {isEditing ? (*/}
            {/*        <>*/}
            {/*            <button*/}
            {/*                onClick={handleCancel}*/}
            {/*                disabled={isLoading}*/}
            {/*                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"*/}
            {/*            >*/}
            {/*                Cancel*/}
            {/*            </button>*/}
            {/*            <button*/}
            {/*                onClick={handleSave}*/}
            {/*                disabled={isLoading}*/}
            {/*                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center space-x-2"*/}
            {/*            >*/}
            {/*                {isLoading && (*/}
            {/*                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>*/}
            {/*                )}*/}
            {/*                <span>*/}
            {/*      {isLoading ? 'Saving...' : 'Confirm changes'}*/}
            {/*    </span>*/}
            {/*            </button>*/}
            {/*        </>*/}
            {/*    ) : (*/}
            {/*        <button*/}
            {/*            onClick={() => setIsEditing(true)}*/}
            {/*            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"*/}
            {/*        >*/}
            {/*            Edit Profile*/}
            {/*        </button>*/}
            {/*    )}*/}
            </div>

            {/*Links*/}
            <div className="flex flex-row flex-nowrap space-x-4">
                <label>Links:</label>
                <Link href="#">
                    <div className="border-black border rounded bg-gray-500 underline">Messages</div>
                </Link>
                <Link href="#">
                    <div className="border-black border rounded bg-gray-500 underline">Payments</div>
                </Link>
                <Link href="#">
                    <div className="border-black border rounded bg-gray-500 underline">Room page</div>
                </Link>
            </div>

            {/*Control buttons*/}
            <div className="flex flex-row flex-nowrap">
            {userProfileData?.isActive ? (
                <div>
                    <button className="bg-red-800 text-white" onClick={handleUserDeactivation}>Deactivate Profile</button>
                </div>
            ):(
                <div>
                    <button className="bg-green-800 text-black" onClick={handleUserActivation}>Activate Profile</button>
                </div>
            )}
            </div>

        </div>
    </div>
    )
};