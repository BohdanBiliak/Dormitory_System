'use client'

import React, { useState, useEffect } from 'react';
import { RoomStatus } from "@/types/rooms.types";

interface CalendarOfAvailability2WVerProps {
    statuses: RoomStatus[],
    showLegend: boolean,
}

export function CalendarOfAvailability2WVerComponent({ statuses, showLegend }: CalendarOfAvailability2WVerProps) {
    const currentDate = new Date();
    const [chosenDate, setChosenDate] = useState(new Date());
    const [chosenDateStatuses, setChosenDateStatuses] = useState<RoomStatus[]>([]);
    const [unavailableDateRanges, setUnavailableDateRanges] = useState(statuses);

    const daysArray = Array.from(
        { length: 14 },
        (_, i) => currentDate.getDate() - currentDate.getDay() + i
    );

    const formatDate = (year: number, month: number, day: number) => {
        return new Date(year, month, day);
    };

    const isInRange = (date:Date, rangeStart:Date, rangeEnd:Date) => {
        return date>=rangeStart && date<=rangeEnd;
    }

    // Check if a date is unavailable based on date ranges
    const isDateUnavailable = (date:Date) => {

        return unavailableDateRanges.some(range => {
            const startDate = new Date(range.dateOfStart)
            const endDate = new Date(range.dateOfEnd)
            return isInRange(date, new Date(new Date(startDate).setDate(startDate.getDate() - 1)), new Date(new Date(endDate).setDate(endDate.getDate() - 1)));
        });
    };

    const statusReview = (event: React.MouseEvent<HTMLButtonElement>) => {
        const { name } = event.currentTarget;
        const date = new Date(name);
        setChosenDate(date);
        setChosenDateStatuses([]);
        unavailableDateRanges.forEach(range => {
            if (isInRange(date, new Date(range.dateOfStart), new Date(range.dateOfEnd))) {
                setChosenDateStatuses(prevState => [...prevState, range]);
            }
        });
    };

    useEffect(() => {
        setUnavailableDateRanges(statuses);
    }, [statuses]);

    return (
        <div className="bg-white rounded-md shadow-md p-4 max-w-sm mx-auto">
            {/* Days of week header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center text-xs font-medium text-gray-500">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
                {daysArray.map((day, index) => {
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
                            className={`h-8 w-full flex items-center justify-center text-xs rounded-md transition-all duration-200 ${
                                isUnavailable
                                    ? 'bg-red-200 text-red-800 hover:bg-red-300'
                                    : 'bg-green-200 text-green-800 hover:bg-green-300'
                            }`}
                        >
                            {`${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1).toString().padStart(2, "0")}`}
                        </button>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center space-x-4 mt-4 text-xs">
                <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-green-200 rounded"></div>
                    <span className="text-gray-600">Available</span>
                </div>
                <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-red-200 rounded"></div>
                    <span className="text-gray-600">Unavailable</span>
                </div>
            </div>

            {/* Status Details */}
            {showLegend && (
                <div className="mt-4 text-xs">
                    {chosenDateStatuses.length > 0 ? (
                        <div className="space-y-1">
                            {chosenDateStatuses.map((status, index) => (
                                <p key={index} className="text-gray-700">
                                    {`${new Date(status.dateOfStart).toLocaleDateString()} - ${new Date(status.dateOfEnd).toLocaleDateString()}: ${status.description}`}
                                </p>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">Available</p>
                    )}
                </div>
            )}
        </div>
    );
}