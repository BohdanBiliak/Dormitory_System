'use client'

import {useDormitories} from "@/hooks/dormitories.hook";
import {useEffect, useState} from "react";

export function AdminDormitoriesList(){

    const{getAllDormitories, getActiveDormitories, getDeactivatedDormitories, getDormitory, createDormitory, deactivateDormitory, updateDormitory} = useDormitories();

    const {data: dormitories, isLoading, error}=getAllDormitories();

    const [chosenDormitory, setChosenDormitory] = useState(() => {
            if(!dormitories){
                return;
            }else{
                if(dormitories.data.length !== 0){
                    return dormitories.data.at(0)
                }else{
                    /*if(dormitories.deactivated.length !== 0){
                        return dormitories.deactivated.at(0)
                    }else*/ return
                }
            }
        }
    );

    const activeDormitories = dormitories?.data;
    console.log(typeof dormitories?.data);
    console.log(dormitories?.data);

    useEffect(() => {
        if(!dormitories){
            setChosenDormitory(undefined)
        }
        if(dormitories?.data.length !==0){
            setChosenDormitory(dormitories?.data.at(0))
        }else{
            /*if(dormitories.deactivated.length !==0){
                setChosenDormitory(dormitories?.deactivated.at(0))
            }else*/ setChosenDormitory(undefined)
        }
    }, [dormitories]);

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

    return(
        <div className="bg-white w-full h-full grid grid-cols-5 gap-8">
            <div className="flex flex-col">
                <div className="text-2xl font-semibold">Choose a dormitory:</div>
                <div className="flex flex-col">
                    {activeDormitories && Array.isArray(activeDormitories) && activeDormitories.length >0 ?(
                        activeDormitories.map((dormitory, index) => (
                            <button onClick={()=>setChosenDormitory(dormitory)} key={index} className={`drop-shadow ${(chosenDormitory && chosenDormitory.id) === dormitory.id ? 'bg-blue-600 text-white' : 'bg-gray-300 text-black border-black border'}`}>
                                <label>{dormitory.name}</label>
                            </button>
                        ))
                    ):(
                        <div className="border-black bg-gray-300 border text-red-800 my-5 p-2 font-semibold">
                            No active dormitories
                        </div>
                    )}
                </div>
            </div>
        </div>
    )

}