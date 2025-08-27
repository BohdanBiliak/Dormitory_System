'use client'

import {User} from "../../types/auth.types";
import {useState} from "react";
import MultipleSelectDropdown from "@/components/ui/MultipleSelectDropdown.component";
import {useUserList} from "@/hooks/admin-hook-file";

export function AdminUserList(){
    const [sortBy, setSortBy] = useState('name');
    const [roleFilter, setRoleFilter] = useState('');
    const [selectedRoomFloors, setSelectedRoomFloors] = useState(['']);
    const [selectedPaymentsStatuses, setSelectedPaymentsStatuses] = useState(['']);
    const roomFloors = ["1","2","3","4","5","6","7","8","9"];
    const paymentsStatuses = ["Paid","Awaiting","Overdue"];
    const {getUserList} = useUserList();
    const [userList, setUserList] = useState()

    // const loadUserList = async () => {
    //     try{
    //         setUserList(getUserList({}))
    //     }catch(e){
    //         console.log(e)
    //     }
    // }

    return (
        <div className="mx-auto min-w-full bg-white border-2 border-blue-300 flex-1 align-top ">
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
                        onChange={(a)=>setSortBy(a.target.value)}
                    >
                        <option value='name'>Name</option>
                        <option value='id'>Id</option>
                        <option value='room'>Room</option>
                    </select>
                </div>
                <div className="flex border-black border-2 p-1 rounded-md bg-gray-300 ml-4 divide-black divide-x-2">
                    <div className="mx-2 text-2xl font-normal">Show:</div>
                    <select className="px-2 text-2xl font-normal bg-gray-300 text-center"
                            value={roleFilter}
                            onChange={(a)=>setRoleFilter(a.target.value)}
                    >
                        <option value=''>All</option>
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
                        <MultipleSelectDropdown dropdownHeader="+" formFieldName="payments" options={paymentsStatuses} onChange={(statuses)=>{
                            setSelectedPaymentsStatuses(statuses);
                            console.log(selectedPaymentsStatuses);
                        }} />
                    </div>
                </div>
            </div>

            {/*User list*/}
            <div>

            </div>
        </div>
    )
}