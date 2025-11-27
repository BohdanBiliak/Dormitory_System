import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { BuildingIcon, HousePlus } from "lucide-react";
import { LanguageSelector } from "@/providers/language.provider";
import { User } from "@/types/auth.types";
import { Room, RoomReservationData } from "@/types/rooms.types";
import Link from "next/link";
import { useBookARoom } from "@/hooks/rooms.hook";


export interface BookingDialogProps {
    open: boolean;
    onClose: () => void;
    user: User;
    room: Room;
}

export default function BookingDialog({ open, onClose, user, room }: BookingDialogProps) {


    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1)

    const { requestAccommodation } = useBookARoom();

    const [reservation, setReservation] = useState<RoomReservationData>({
        roomId: '',
        from: '',
        to: '',
        suggestedTime: "",
        alternativeRooms: false,
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === "startDate") {
            setReservation(prevState => {
                if (!prevState) return prevState;
                return {
                    ...prevState,
                    from: value.toString()
                }
            })
        }

        if (name === "endDate") {
            setReservation(prevState => {
                if (!prevState) return prevState;
                return {
                    ...prevState,
                    to: value.toString()
                }
            })
        }

        if (name === "suggestedTime") {
            setReservation(prevState => {
                if (!prevState) return prevState;
                return {
                    ...prevState,
                    suggestedTime: value
                }
            })
        }

        if (name === "alternativeRooms") {
            setReservation(prevState => {
                if (!prevState) return prevState;
                return {
                    ...prevState,
                    alternativeRooms: !prevState.alternativeRooms
                }
            })
        }

    }

    useEffect(() => {
        setReservation(prevState => {
            if (!prevState) return prevState;
            return {
                ...prevState,
                roomId: room.id
            }
        })
    }, [room]);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
    }

    const handleRequestAccommodation = () => {
        requestAccommodation(reservation);
        onClose();
    }

    return (
        <Dialog onClose={onClose} open={open}>
            <DialogBackdrop className="fixed inset-0 bg-black/60 backdrop-blur-sm" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">

                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-4 bg-blue-700 text-white">
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-full">
                                <HousePlus />
                            </div>

                            <div>
                                <DialogTitle className="text-lg sm:text-xl font-semibold">Book a Room</DialogTitle>
                                <Description className="text-blue-100 text-sm">Fill in the reservation details</Description>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="hidden sm:block">
                                <LanguageSelector />
                            </div>

                            <button
                                onClick={onClose}
                                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/20 transition"
                            >
                                <svg className="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-gray-300">

                        {/* Form Section */}
                        <div className="flex-1 p-6 bg-gray-50">
                            <div className="space-y-6">

                                {/* Reservation Time */}
                                <div className="space-y-2">
                                    <div className="font-semibold text-gray-800">Time of reservation</div>

                                    <div className="space-y-3">
                                        <div className="flex flex-col">
                                            <label className="text-gray-600 mb-1">Date of start</label>
                                            <input
                                                type="date"
                                                name="startDate"
                                                min={tomorrow.toISOString().substring(0, 10)}
                                                value={reservation.from.toString()}
                                                onChange={handleInputChange}
                                                className="border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-400 outline-none"
                                            />
                                        </div>

                                        <div className="flex flex-col">
                                            <label className="text-gray-600 mb-1">Date of end</label>
                                            <input
                                                type="date"
                                                name="endDate"
                                                min={reservation.from.toString()}
                                                value={reservation.to.toString()}
                                                onChange={handleInputChange}
                                                className="border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-400 outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Price */}
                                {room.price && (
                                    <div className="text-gray-700 font-medium">
                                        Price per day: <span className="text-blue-700">${room.price.pricePerDay}</span> (per person)
                                    </div>
                                )}

                                {/* Suggested Time */}
                                <div className="flex flex-col">
                                    <label className="text-gray-600 mb-1">Suggested accommodation time</label>
                                    <input
                                        name="suggestedTime"
                                        type="text"
                                        value={reservation.suggestedTime}
                                        onChange={handleInputChange}
                                        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                                    />
                                </div>

                                {/* Alternative Rooms */}
                                <div className="flex items-center space-x-3">
                                    <input
                                        name="alternativeRooms"
                                        type="checkbox"
                                        checked={reservation.alternativeRooms}
                                        onChange={handleInputChange}
                                        className="h-5 w-5"
                                    />
                                    <span className="text-gray-700">Book any similar room in this dormitory</span>
                                </div>
                            </div>
                        </div>

                        {/* Navigation Buttons Section */}
                        <div className="w-full sm:w-56 p-6 bg-white flex flex-col space-y-4">
                            <div className="font-semibold text-gray-800">Room Actions:</div>

                            <Link
                                href={`/rooms/${room.id}`}
                                className="w-full text-center bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-blue-700 transition"
                            >
                                To Room Page
                            </Link>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end space-x-3 px-6 py-4 bg-gray-100 border-t border-gray-300">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 border border-gray-300 hover:bg-gray-300 transition"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleRequestAccommodation}
                            className="px-4 py-2 rounded-lg bg-blue-600 text-white border border-blue-700 hover:bg-blue-700 active:bg-blue-800 transition shadow-md"
                        >
                            Book
                        </button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>

    )
}