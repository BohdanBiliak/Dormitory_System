'use client'

import React, { useEffect, useState } from 'react'

import { ManagerCreationData } from "@/types/managers.types";
import { useGetActiveDormitories } from "@/hooks/dormitories.hook";
import { Dormitory } from "@/types/dormitories.types";
import { useManagers } from "@/hooks/managers.hook";

export interface ManagerCreationProps {
    open: boolean,
    onClose: () => void,
}

export function ManagerCreationDialog({ open, onClose }: ManagerCreationProps) {
    const { data: dormitories, isLoading: loadingDormitories, error: dormitoriesError } = useGetActiveDormitories()
    const { createManager } = useManagers()

    const [dormitoriesList, setDormitoriesList] = useState<Dormitory[]>([])

    useEffect(() => {
        if (dormitories && dormitories.data) {
            setDormitoriesList(dormitories.data)
        }
    }, [dormitories]);

    const [newManager, setNewManager] = useState<ManagerCreationData>({
        email: '',
        name: '',
        middleName: '',
        lastName: '',
        password: '',
        repeatPassword: '',
        dormitoryId: ''
    })
    const [showRejectionMenu, setShowRejectionMenu] = useState<boolean>(false)
    const [rejectionReason, setRejectionReason] = useState<string>("")

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === "name" || name == "middleName" || name === "lastName" || name === "password" || name === "repeatPassword" || name === 'email') {
            setNewManager(prevState => {
                if (!prevState) return prevState;
                return {
                    ...prevState,
                    [name]: value
                }
            })
        }
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name == 'dormitoryId') {
            setNewManager(prevState => {
                if (!prevState) return prevState;
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
            lastName: '',
            password: '',
            repeatPassword: '',
            dormitoryId: ''
        })
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full overflow-hidden flex flex-col">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 bg-gray-100 border-b border-gray-300">
                    <h2 className="text-xl font-semibold text-gray-800">New Manager</h2>

                    <button
                        onClick={onClose}
                        className="text-gray-700 hover:text-gray-500 transition"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                    <h3 className="text-lg font-medium text-gray-800">Manager Info</h3>

                    {/* Form fields */}
                    <div className="flex flex-col gap-4">

                        {/* Name */}
                        <div className="flex flex-col">
                            <label className="text-gray-700 mb-1">Name</label>
                            <input
                                name="name"
                                type="text"
                                value={newManager.name}
                                onChange={handleInputChange}
                                placeholder="Enter name"
                                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                            />
                        </div>

                        {/* Middle name */}
                        <div className="flex flex-col">
                            <label className="text-gray-700 mb-1">Middle name</label>
                            <input
                                name="middleName"
                                type="text"
                                value={newManager.middleName}
                                onChange={handleInputChange}
                                placeholder="Enter middle name"
                                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                            />
                        </div>

                        {/* Last name */}
                        <div className="flex flex-col">
                            <label className="text-gray-700 mb-1">Last name</label>
                            <input
                                name="lastName"
                                type="text"
                                value={newManager.lastName}
                                onChange={handleInputChange}
                                placeholder="Enter last name"
                                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                            />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col">
                            <label className="text-gray-700 mb-1">Email</label>
                            <input
                                name="email"
                                type="email"
                                value={newManager.email}
                                onChange={handleInputChange}
                                placeholder="Enter email"
                                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                            />
                        </div>

                        {/* Password */}
                        <div className="flex flex-col relative">
                            <label className="text-gray-700 mb-1">Password</label>
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={newManager.password}
                                onChange={handleInputChange}
                                placeholder="Enter password"
                                className="border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:ring-2 focus:ring-blue-400 outline-none"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-9 p-1 rounded hover:bg-gray-100"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <img
                                    src={showPassword ? "/eye.svg" : "/eye-slash.svg"}
                                    className="h-5 w-5"
                                />
                            </button>
                        </div>

                        {/* Confirm password */}
                        <div className="flex flex-col relative">
                            <label className="text-gray-700 mb-1">Confirm password</label>
                            <input
                                name="repeatPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                value={newManager.repeatPassword}
                                onChange={handleInputChange}
                                placeholder="Confirm password"
                                className="border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:ring-2 focus:ring-blue-400 outline-none"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-9 p-1 rounded hover:bg-gray-100"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                <img
                                    src={showConfirmPassword ? "/eye.svg" : "/eye-slash.svg"}
                                    className="h-5 w-5"
                                />
                            </button>
                        </div>

                        {/* Dormitory */}
                        <div className="flex flex-col">
                            <label className="text-gray-700 mb-1">Dormitory</label>
                            <select
                                name="dormitoryId"
                                value={newManager?.dormitoryId || ""}
                                onChange={handleSelectChange}
                                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                            >
                                <option value="">Select a dormitory</option>
                                {dormitoriesList.map(d => (
                                    <option key={d.id} value={d.id}>{d.name}</option>
                                ))}
                            </select>
                        </div>

                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 px-6 py-4 bg-gray-100 border-t border-gray-300">
                    <button
                        onClick={handleCancel}
                        className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 border border-gray-400 hover:bg-gray-300 transition shadow-sm"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleCreateManager}
                        className="px-4 py-2 rounded-lg bg-blue-600 text-white border border-blue-700 hover:bg-blue-700 active:bg-blue-800 transition shadow-md"
                    >
                        Create Manager
                    </button>
                </div>

            </div>
        </div>
    );

}