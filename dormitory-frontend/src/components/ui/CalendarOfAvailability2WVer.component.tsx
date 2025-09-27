'use client'

import React, {useState, useEffect} from 'react';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import {RoomStatus} from "@/types/rooms.types";
import {max, min} from "@floating-ui/utils";

interface CalendarOfAvailability2WVerProps {
    statuses: RoomStatus[],
    showLegend: boolean,
}

export function CalendarOfAvailability2WVerComponent ({statuses, showLegend}:CalendarOfAvailability2WVerProps) {
    const currentDate = new Date();
    const [chosenDate, setChosenDate] = useState(new Date());
    const [chosenDateStatuses, setChosenDateStatuses] = useState<RoomStatus[]>([]);
    const [unavailableDateRanges, setUnavailableDateRanges] = useState(statuses);

    const daysArray = Array.from(
        { length: 14 },
        (_,i)=>currentDate.getDate()-currentDate.getDay()+i
    )

    // Format date as YYYY-MM-DD
    const formatDate = (year:number, month:number, day:number) => {
        return new Date(year, month, day);
    };

    const isInRange = (date:Date, rangeStart:Date, rangeEnd:Date) => {
        return date>=rangeStart && date<=rangeEnd;
    }

    // Check if a date is unavailable based on date ranges
    const isDateUnavailable = (date:Date) => {
        return unavailableDateRanges.some(range => {
            return isInRange(date, new Date(range.dateOfStart), new Date(range.dateOfEnd));
        });
    };


    const statusReview = (event: React.MouseEvent<HTMLButtonElement>)=>{
        const {name} = event.currentTarget;
        const date = new Date(name);
        setChosenDate(date);
        setChosenDateStatuses([]);
        unavailableDateRanges.forEach(range => {
            if(isInRange(date, new Date(range.dateOfStart), new Date(range.dateOfEnd))){
                setChosenDateStatuses(prevState => [...prevState, range])
            }
        })
    }

    useEffect(() => {
        setUnavailableDateRanges(statuses);
        statuses.map((status, index)=>(
            console.log(`status ${index} use effect: ${status}`)
        ))
    },[statuses])

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">

            {/* Days of week header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
                {/* Previous month days */}
                {daysArray.map((day,index) => {
                    const date = formatDate(
                        currentDate.getFullYear(),
                        currentDate.getMonth(),
                        day
                    );
                    const isUnavailable = isDateUnavailable(date);

                    return (
                        <button
                            key={index}
                            name={date.toISOString()}
                            onClick={statusReview}
                            className={`h-10 flex items-center justify-center text-sm rounded-lg transition-all duration-200 ${
                                isUnavailable
                                    ? 'bg-red-200 text-red-800 hover:bg-red-300 '
                                    : `bg-green-200 text-green-800 hover:bg-green-300`
                            }`}

                        >
                            {`${date.getDate().toString().padStart(2,"0")}.${(date.getMonth()+1).toString().padStart(2,"0")}`}
                        </button>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center space-x-6 mt-6 text-sm">
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-200 rounded"></div>
                    <span className="text-gray-600">Available</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-red-200 rounded"></div>
                    <span className="text-gray-600">Unavailable</span>
                </div>
            </div>

            {/*Status*/}
            {showLegend ? (
                <div className="flex items-center justify-center space-x-6 mt-6 text-sm">
                    {chosenDate && chosenDateStatuses.length > 0 ? (
                        <div>
                            {chosenDateStatuses.map((status, index) => (
                                <p key={index}>{`${new Date(status.dateOfStart).toLocaleDateString()} - ${new Date(status.dateOfEnd).toLocaleDateString()}: ${status.description}`}</p>
                            ))}
                        </div>
                    ):(
                        <p>Available</p>
                    )}
                </div>
            ):(<></>)}
        </div>
    );
};