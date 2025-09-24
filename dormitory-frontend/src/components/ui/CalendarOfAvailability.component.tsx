'use client'

import React, {useState, useMemo, useEffect} from 'react';
import { ChevronLeft, ChevronRight, Edit3, Save, X } from 'lucide-react';
import {RoomStatus} from "@/types/rooms.types";

interface CalendarOfAvailabilityProps {
    statuses: RoomStatus[]
}

export function CalendarOfAvailabilityComponent ({statuses}:CalendarOfAvailabilityProps){
    const [currentDate, setCurrentDate] = useState(new Date());
    const [chosenDate, setChosenDate] = useState(new Date());
    const [statusTitle, setStatusTitle] = useState('');
    const [unavailableDateRanges, setUnavailableDateRanges] = useState(statuses);

    // Get the first day of the current month
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    // Get the day of week for the first day (0 = Sunday, 1 = Monday, etc.)
    const startingDayOfWeek = firstDayOfMonth.getDay();

    // Calculate days to show from previous month
    const daysInPrevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    const prevMonthDays = Array.from(
        { length: startingDayOfWeek },
        (_, i) => daysInPrevMonth - startingDayOfWeek + i + 1
    );

    // Days in current month
    const daysInCurrentMonth = lastDayOfMonth.getDate();
    const currentMonthDays = Array.from({ length: daysInCurrentMonth }, (_, i) => i + 1);

    // Days to show from next month
    const remainingCells = 42 - (prevMonthDays.length + currentMonthDays.length);
    const nextMonthDays = Array.from({ length: remainingCells }, (_, i) => i + 1);

    // Format date as YYYY-MM-DD
    const formatDate = (year:number, month:number, day:number) => {
        return new Date(year, month, day);
        //return {'${{year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}}'};
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

    // Navigation functions
    const goToPreviousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const statusReview = (event: React.MouseEvent<HTMLButtonElement>)=>{
        const {name} = event.currentTarget;
        const date = new Date(name);
        setChosenDate(date);
        setStatusTitle('Available')
        unavailableDateRanges.forEach(range => {
            if(isInRange(date, new Date(range.dateOfStart), new Date(range.dateOfEnd))){
                setStatusTitle(range.description)

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
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={goToPreviousMonth}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    <h2 className="text-xl font-semibold text-gray-800">
                        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </h2>

                    <button
                        onClick={goToNextMonth}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

            </div>

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
                {prevMonthDays.map((day, index) => (
                    <div key={`prev-${index}`} className="h-10 flex items-center justify-center">
                        <span className="text-gray-300 text-sm">{day}</span>
                    </div>
                ))}

                {/* Current month days */}
                {currentMonthDays.map(day => {
                    const date = formatDate(
                        currentDate.getFullYear(),
                        currentDate.getMonth() + 1,
                        day
                    );
                    const isUnavailable = isDateUnavailable(date);

                    return (
                        <button
                            key={day}
                            name = {date.toISOString()}
                            onClick={statusReview}
                            className={`h-10 flex items-center justify-center text-sm rounded-lg transition-all duration-200 ${
                                isUnavailable
                                ? 'bg-red-200 text-red-800 hover:bg-red-300 '
                                : `bg-green-200 text-green-800 hover:bg-green-300`
                            }`}

                        >
                            {day}
                        </button>
                    );
                })}

                {/* Next month days */}
                {nextMonthDays.map((day, index) => (
                    <div key={`next-${index}`} className="h-10 flex items-center justify-center">
                        <span className="text-gray-300 text-sm">{day}</span>
                    </div>
                ))}
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
            <div className="flex items-center justify-center space-x-6 mt-6 text-sm">
                {chosenDate && statusTitle !== '' ? (
                    <div>
                        <p>{chosenDate.getDate()} {monthNames[chosenDate.getMonth()-1]} {chosenDate.getFullYear()}: {statusTitle}</p>
                    </div>
                ):(
                    <></>
                )}
            </div>
        </div>
    );
};