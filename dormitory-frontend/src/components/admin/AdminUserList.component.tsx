'use client'

import {User} from "../../types/auth.types";
import {useState} from "react";
import MultipleSelectDropdown from "@/components/ui/MultipleSelectDropdown.component";
import {useUserList} from "@/hooks/admin-hook-file";
import Link from "next/link";

export function AdminUserList(){
    const [sortBy, setSortBy] = useState<'Name'|'Id'|'Room'>('Name');
    const [roleFilter, setRoleFilter] = useState<'All'|'Regular'|'SignedInUser'>('All');
    const [selectedRoomFloors, setSelectedRoomFloors] = useState(['']);
    const [selectedPaymentsStatuses, setSelectedPaymentsStatuses] = useState<'Paid'|'Awaiting'|'All'|'Overdue'>('All');
    const roomFloors = ["1","2","3","4","5","6","7","8","9"];
    const paymentsStatuses = ["Paid","Awaiting","Overdue"];
    const [page, setPage] = useState(1);
    const limit = 10;

    const {getUserList} = useUserList();

    const {data: userList, isLoading, error} = getUserList({
        role: roleFilter,
        paymentStatus: selectedPaymentsStatuses,
        page:page,
        limit:limit
    });

    if (isLoading) {
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

    const users = userList?.data || []
    const totalPages = userList?.pageCount || 1

    return (
        <div className="mx-auto min-w-full bg-white border-2 border-blue-300 flex flex-col align-top ">
            {/*Header*/}
            <div className="w-full border-4 p-2 border-blue-800 drop-shadow">
                <h1 className="text-center text-4xl font-extrabold">Profiles</h1>
            </div>

            {/*Filters*/}
            <div className="w-full h-fit p-4 bg-gray-400 flex flex-row flex-wrap ">
                <div className="flex border-black border-2 p-1 rounded-md bg-gray-300 ml-4 divide-black divide-x-2">
                    <div className="mx-2 text-2xl font-normal">Sort by:</div>
                    <select className="px-2 text-2xl font-normal bg-gray-300 text-center"
                        value={sortBy}
                        onChange={(a)=>setSortBy(a.target.value as 'Name'|'Id'|'Room')}
                    >
                        <option value='Name'>Name</option>
                        <option value='Id'>Id</option>
                        <option value='Room'>Room</option>
                    </select>
                </div>
                <div className="flex border-black border-2 p-1 rounded-md bg-gray-300 ml-4 divide-black divide-x-2">
                    <div className="mx-2 text-2xl font-normal">Show:</div>
                    <select className="px-2 text-2xl font-normal bg-gray-300 text-center"
                            value={roleFilter}
                            onChange={(a)=>setRoleFilter(a.target.value as 'All'|'SignedInUser' | 'Regular')}
                    >
                        <option value='All'>All</option>
                        <option value='SignedInUser'>Non-residents</option>
                        <option value='Regular'>Residents</option>
                    </select>
                </div>
                <div className="flex border-black border-2 p-1 rounded-md bg-gray-300 ml-4 divide-black divide-x-2">
                    <div className="mx-2 text-2xl font-normal">Room floor:</div>
                    <div className="px-2 text-2xl font-normal">
                        <MultipleSelectDropdown dropdownHeader="+" formFieldName="floor" options={roomFloors} onChange={(roomFloors)=>{
                            setSelectedRoomFloors(roomFloors);
                            console.log(selectedRoomFloors);
                        }} />
                    </div>
                </div>
                <div className="flex border-black border-2 p-1 rounded-md bg-gray-300 ml-4 divide-black divide-x-2">
                    <div className="mx-2 text-2xl font-normal">Payment status:</div>
                    <div className="px-2 text-2xl font-normal">
                        <select className="px-2 text-2xl font-normal bg-gray-300 text-center"
                                value={selectedPaymentsStatuses}
                                onChange={(a)=>setSelectedPaymentsStatuses(a.target.value as 'Paid'|'Awaiting'|'All'|'Overdue')}
                        >
                            <option value='All'>All</option>
                            <option value='Paid'>Paid</option>
                            <option value='Awaiting'>Awaiting</option>
                            <option value='Overdue'>Overdue</option>
                        </select>
                    </div>
                </div>
            </div>

            {/*User table*/}
            <div className="overflow-x-auto flex flex-col flex-nowrap grow bg-white">
                {users.map((user, index) => (
                    <div key={user.id}>
                        <Link href={`/admin/users/${user.id}`}>
                            <div className="border-black border-2 rounded bg-gray-300 p-1.5 mx-2 my-1">
                                {user.displayName+" "+user.secondName+" "+user.email}
                            </div>
                        </Link>
                    </div>

                ))}
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200 flex grow-0 justify-center">
                <div className="flex space-x-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                        <button
                            key={pageNum}
                            onClick={() => setPage(pageNum)}
                            className={`px-3 py-1 border rounded text-sm transition-colors ${
                                page === pageNum
                                    ? 'bg-blue-600 text-white border-blue-600'
                                    : 'border-gray-300 hover:bg-gray-50'
                            }`}
                        >
                            {pageNum}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}