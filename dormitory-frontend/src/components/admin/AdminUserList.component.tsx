'use client'

import {User} from "../../types/auth.types";
import {useEffect, useState} from "react";
import MultipleSelectDropdown from "@/components/ui/MultipleSelectDropdown.component";
import Link from "next/link";
import {useQuery} from "@tanstack/react-query";
import {userListApi} from "@/app/lib/userList.api";
import {UserListRequest} from "@/types/users.types";
import {useUserListQuery} from "@/hooks/userList.hook";


export function AdminUserList(){

    const roomFloors = ["1","2","3","4","5","6","7","8","9"];


    const [error, setError] = useState<Error|null>();
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState<User[]>([]);
    const [sortBy, setSortBy] = useState<'Name'|'Id'|'Room'>('Name');
    const [roleFilter, setRoleFilter] = useState<'All'|'Regular'|'SignedInUser'>('All');
    const [selectedRoomFloors, setSelectedRoomFloors] = useState<string[]>(roomFloors);
    const [selectedPaymentsStatuses, setSelectedPaymentsStatuses] = useState<'Paid'|'Awaiting'|'All'|'Overdue'>('All');
    const [pagesCount, setPagesCount] = useState(1);
    const [page, setPage] = useState(1);
    const limit = 10;


    const { data: userList, isLoading } = useUserListQuery({
        page,
        limit,
        role: roleFilter,
        paymentStatus: selectedPaymentsStatuses,
        roomFlor: selectedRoomFloors,
        sortBy
    })

    useEffect(() => {
        setUsers(userList?.data || []);
        setPagesCount(userList?.pageCount || 1);
        setLoading(isLoading)
    }, [userList]);

    if (loading) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-md mx-4">
                    <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <span className="ml-3 text-gray-700 font-medium">Loading user list...</span>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-md mx-4">
                    <div className="text-center">
                        <div className="text-red-500 mb-3">
                            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <p className="text-gray-700 font-medium">Error loading user list. Please try again.</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen w-full bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm">
                <div className="px-4 py-6 md:px-6 md:py-8 border-b border-gray-200">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-center">
                        User Management
                    </h1>
                    <p className="text-gray-600 text-center mt-2">
                        Manage dormitory residents and their information
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="px-4 py-3 md:px-6 md:py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                </div>
                <div className="px-4 py-4 md:px-6 md:py-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Sort By */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Sort by
                            </label>
                            <select 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as 'Name'|'Id'|'Room')}
                            >
                                <option value='Name'>Name</option>
                                <option value='Id'>ID</option>
                                <option value='Room'>Room</option>
                            </select>
                        </div>

                        {/* Role Filter */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                User Type
                            </label>
                            <select 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
                                value={roleFilter}
                                onChange={(e) => setRoleFilter(e.target.value as 'All'|'SignedInUser' | 'Regular')}
                            >
                                <option value='All'>All Users</option>
                                <option value='SignedInUser'>Non-residents</option>
                                <option value='Regular'>Regular</option>
                            </select>
                        </div>

                        {/* Room Floor */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Room Floor
                            </label>
                            <div className="w-full">
                                <MultipleSelectDropdown 
                                    dropdownHeader="Select floors" 
                                    formFieldName="floor" 
                                    options={roomFloors} 
                                    onChange={(roomFloors) => {
                                        setSelectedRoomFloors(roomFloors);
                                        console.log(selectedRoomFloors);
                                    }} 
                                />
                            </div>
                        </div>

                        {/* Payment Status */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Payment Status
                            </label>
                            <select 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
                                value={selectedPaymentsStatuses}
                                onChange={(e) => setSelectedPaymentsStatuses(e.target.value as 'Paid'|'Awaiting'|'All'|'Overdue')}
                            >
                                <option value='All'>All Statuses</option>
                                <option value='Paid'>Paid</option>
                                <option value='Awaiting'>Awaiting</option>
                                <option value='Overdue'>Overdue</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* User List */}
            <div className="bg-white flex-1">
                <div className="px-4 py-3 md:px-6 md:py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Users ({users.length} found)
                    </h2>
                </div>
                
                {users.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="text-gray-400 mb-4">
                            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <p className="text-gray-500 text-lg">No users found</p>
                        <p className="text-gray-400 text-sm mt-1">Try adjusting your filters</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-200">
                        {users.map((user, index) => (
                            <Link key={user.id} href={`/admin/users/${user.id}`}>
                                <div className="px-4 py-4 md:px-6 hover:bg-gray-50 transition-colors duration-150 cursor-pointer">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center space-x-4">
                                                <div className="flex-shrink-0">
                                                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                        <span className="text-sm font-medium text-blue-800">
                                                            {user.displayName?.charAt(0).toUpperCase() || 'U'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 truncate">
                                                        {user.displayName} {user.secondName}
                                                    </p>
                                                    <p className="text-sm text-gray-500 truncate">
                                                        {user.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-2 sm:mt-0 sm:ml-4 flex-shrink-0">
                                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                <span>ID: {user.id}</span>
                                                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* Pagination */}
            {pagesCount > 1 && (
                <div className="bg-white border-t border-gray-200">
                    <div className="px-4 py-4 md:px-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div className="text-sm text-gray-700 mb-4 sm:mb-0">
                                Page {page} of {pagesCount}
                            </div>
                            <div className="flex flex-wrap justify-center sm:justify-end gap-1">
                                <button
                                    onClick={() => setPage(Math.max(1, page - 1))}
                                    disabled={page === 1}
                                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Previous
                                </button>
                                
                                {Array.from({ length: Math.min(pagesCount, 5) }, (_, i) => {
                                    let pageNum;
                                    if (pagesCount <= 5) {
                                        pageNum = i + 1;
                                    } else if (page <= 3) {
                                        pageNum = i + 1;
                                    } else if (page >= pagesCount - 2) {
                                        pageNum = pagesCount - 4 + i;
                                    } else {
                                        pageNum = page - 2 + i;
                                    }
                                    
                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => setPage(pageNum)}
                                            className={`px-3 py-2 text-sm font-medium border transition-colors ${
                                                page === pageNum
                                                    ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                            }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                                
                                <button
                                    onClick={() => setPage(Math.min(pagesCount, page + 1))}
                                    disabled={page === pagesCount}
                                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}