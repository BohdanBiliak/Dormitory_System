'use client'

import React, {useEffect, useState} from 'react'

import {ManagerCreationData} from "@/types/managers.types";
import {useGetActiveDormitories} from "@/hooks/dormitories.hook";
import {Dormitory} from "@/types/dormitories.types";
import {useManagers} from "@/hooks/managers.hook";

export interface ManagerCreationProps {
    open: boolean,
    onClose: () => void,
}

export function ManagerCreationDialog({open, onClose}:ManagerCreationProps) {
    const {data: dormitories, isLoading: loadingDormitories, error: dormitoriesError} = useGetActiveDormitories()
    const {createManager} = useManagers()

    const [dormitoriesList, setDormitoriesList] = useState<Dormitory[]>([])

    useEffect(() => {
        if(dormitories && dormitories.data){
            setDormitoriesList(dormitories.data)
        }
    }, [dormitories]);

    const [newManager, setNewManager] = useState<ManagerCreationData>({
        email: '',
        name: '',
        middleName: '',
        secondName: '',
        password: '',
        repeatPassword: '',
        dormitoryId: ''
    })
    const [showRejectionMenu, setShowRejectionMenu] = useState<boolean>(false)
    const [rejectionReason, setRejectionReason] = useState<string>("")

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        if(name==="name" || name=="middleName" || name==="secondName" || name==="password" || name==="repeatPassword" || name==='email'){
            setNewManager(prevState => {
                if(!prevState) return prevState;
                return {
                    ...prevState,
                    [name]: value
                }
            })
        }
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = e.target;

        if(name=='dormitoryId'){
            setNewManager(prevState => {
                if(!prevState) return prevState;
                return {
                    ...prevState,
                    dormitoryId: value
                }
            })
        }
    }

    const handleCreateManager = () => {
        createManager(newManager)
        onClose()
    }

    const handleCancel = () => {
        setNewManager({
            email: '',
            name: '',
            middleName: '',
            secondName: '',
            password: '',
            repeatPassword: '',
            dormitoryId: ''
        })
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-200 rounded-lg shadow-2xl max-w-3xl w-full overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-3 bg-gray-300 border-b border-gray-400">
                    <h2 className="text-lg font-semibold text-black">
                        New Manager
                    </h2>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={onClose}
                            className="text-black hover:text-gray-600 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                    <h3>Manager Info</h3>

                    <div className={`flex flex-row`}>
                        <div>Name:</div>
                        <input
                            name={'name'}
                            type="text"
                            value={newManager.name}
                            onChange={handleInputChange}
                            placeholder={'Input manager\'s name'}
                        />
                    </div>

                    <div className={`flex flex-row`}>
                        <div>Middle name:</div>
                        <input
                            name={'middleName'}
                            type="text"
                            value={newManager.middleName}
                            onChange={handleInputChange}
                            placeholder={'Input manager\'s name'}
                        />
                    </div>

                    <div className={`flex flex-row`}>
                        <div>Last name:</div>
                        <input
                            name={'secondName'}
                            type="text"
                            value={newManager.secondName}
                            onChange={handleInputChange}
                            placeholder={'Input manager\'s last name'}
                        />
                    </div>

                    <div className={`flex flex-row`}>
                        <div>Email:</div>
                        <input
                            name={'email'}
                            type="email"
                            value={newManager.email}
                            onChange={handleInputChange}
                            placeholder={'Input manager\'s email'}
                        />
                    </div>

                    <div className={`flex flex-row`}>
                        <div>Password:</div>
                        <div>
                            <input
                                name={'password'}
                                type={showPassword ? 'text' : 'password'}
                                value={newManager.password}
                                onChange={handleInputChange}
                                placeholder={'Input manager\'s password'}
                            />
                            <button
                                type="button"
                                className="absolute z-10 top-2 right-2 p-1 hover:bg-gray-100 rounded transition-colors password-visibility-toggle"
                                onClick={()=>setShowPassword(!showPassword)}
                            >
                                <img
                                    src={showPassword ? '/eye.svg' : '/eye-slash.svg'}
                                    alt={showPassword ? 'Hide password' : 'Show password'}
                                    className="h-6 w-6"
                                />
                            </button>
                        </div>
                    </div>

                    <div className={`flex flex-row`}>
                        <div>Confirm passwords:</div>
                        <div>
                            <input
                                name={'repeatPassword'}
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={newManager.repeatPassword}
                                onChange={handleInputChange}
                                placeholder={'Confirm manager\'s password'}
                            />
                            <button
                                type="button"
                                className="absolute z-10 top-2 right-2 p-1 hover:bg-gray-100 rounded transition-colors password-visibility-toggle"
                                onClick={()=>setShowConfirmPassword(!showConfirmPassword)}
                            >
                                <img
                                    src={showConfirmPassword ? '/eye.svg' : '/eye-slash.svg'}
                                    alt={showConfirmPassword ? 'Hide password' : 'Show password'}
                                    className="h-6 w-6"
                                />
                            </button>
                        </div>
                    </div>

                    <div className={`flex flex-row`}>
                        <div>Dormitory:</div>
                        <select
                            name={'dormitoryId'}
                            value={newManager?.dormitoryId || ''}
                            onChange={handleSelectChange}
                        >
                            <option value="">Select a dormitory</option>
                            {dormitoriesList.map((dormitory) => (
                                <option value={dormitory.id} key={dormitory.id}>{dormitory.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Footer - Action Buttons */}
                <div className={`flex flex-row`}>
                    <button
                        onClick={handleCancel}
                        className={`bg-gray-200 border-black border px-3 py-1`}
                    >
                        Cancel
                    </button>

                    <button
                        className={`bg-blue-600 text-white border-blue-800 border px-3 py-1s`}
                        onClick={handleCreateManager}
                    >
                        Create manager
                    </button>
                </div>
            </div>


        </div>
    )
}