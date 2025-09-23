import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Edit3, Save, X } from 'lucide-react';
import {RoomStatus} from "@/types/rooms.types";

interface CalendarOfAvailabilityProps {
    statuses: RoomStatus[]
}

const CalendarOfAvailabilityComponent = ({statuses}:CalendarOfAvailabilityProps) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isEditMode, setIsEditMode] = useState(false);
    const [tempUnavailableRanges, setTempUnavailableRanges] = useState(statuses);
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
        return ${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')};
    };

    // Check if a date is unavailable based on date ranges
    const isDateUnavailable = (dateStr:string) => {
        const ranges = isEditMode ? tempUnavailableRanges : unavailableDateRanges;
        return ranges.some(range => {
            return dateStr >= range.dateOfStart && dateStr <= range.dateOfEnd;
        });
    };

    // Navigation functions
    const goToPreviousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    // Edit mode functions
    const handleEditToggle = () => {
        if (isEditMode) {
            setTempUnavailableRanges(unavailableDateRanges); // Reset to original
        }
        setIsEditMode(!isEditMode);
    };

    // const handleSave = () => {
    //     if (onDateRangesChange) {
    //         onDateRangesChange(tempUnavailableRanges);
    //     }
    //     setIsEditMode(false);
    // };

    // const handleDateClick = (dateStr) => {
    //     if (!isEditMode) return;
    //
    //     const isCurrentlyUnavailable = tempUnavailableRanges.some(range =>
    //         dateStr >= range.fromDate && dateStr <= range.endDate
    //     );
    //
    //     if (isCurrentlyUnavailable) {
    //         // Remove this date from ranges
    //         const newRanges = tempUnavailableRanges.filter(range =>
    //             !(dateStr >= range.fromDate && dateStr <= range.endDate)
    //         );
    //         setTempUnavailableRanges(newRanges);
    //     } else {
    //         // Add this date as a single-day range
    //         setTempUnavailableRanges([...tempUnavailableRanges, {
    //             fromDate: dateStr,
    //             endDate: dateStr
    //         }]);
    //     }
    // };

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

                <div className="flex items-center space-x-2">
                    {isEditMode ? (
                        <>
                            <button
                                //onClick={handleSave}
                                className="p-2 rounded-lg bg-green-100 hover:bg-green-200 text-green-700 transition-colors"
                            >
                                <Save className="w-4 h-4" />
                            </button>
                            <button
                                onClick={handleEditToggle}
                                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={handleEditToggle}
                            className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-700 transition-colors"
                        >
                            <Edit3 className="w-4 h-4" />
                        </button>
                    )}
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
                    const dateStr = formatDate(
                        currentDate.getFullYear(),
                        currentDate.getMonth() + 1,
                        day
                    );
                    const isUnavailable = isDateUnavailable(dateStr);

                    return (
                        <button
                            key={day}
                            //onClick={() => handleDateClick(dateStr)}
                            className={`h-10 flex items-center justify-center text-sm rounded-lg transition-all duration-200 ${
                                isUnavailable
                                ? 'bg-red-200 text-red-800 hover:bg-red-300'
                                : 'bg-green-200 text-green-800 hover:bg-green-300'
                            } ${
                                isEditMode
                                ? 'cursor-pointer transform hover:scale-105'
                                : 'cursor-default'
                            }`}
                            disabled={!isEditMode}
                        >
                            {day}
                        </button>
                    );
                })}

                {/* Next month days */}
                {nextMonthDays.map((day, index) => (
                    <div key={next-${index}} className="h-10 flex items-center justify-center">
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

            {isEditMode && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg text-center">
                    <p className="text-sm text-blue-700">
                        Edit mode: Click on dates to toggle availability
                    </p>
                </div>
            )}
        </div>
    );
};