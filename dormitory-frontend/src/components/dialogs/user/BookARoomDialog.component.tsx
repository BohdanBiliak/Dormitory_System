import {Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle} from "@headlessui/react";
import React, {useEffect, useState} from "react";
import {BuildingIcon, HousePlus} from "lucide-react";
import {LanguageSelector} from "@/providers/language.provider";
import {User} from "@/types/auth.types";
import {Room, RoomReservationData} from "@/types/rooms.types";
import Link from "next/link";
import {useBookARoom} from "@/hooks/rooms.hook";


export interface BookingDialogProps {
    open: boolean;
    onClose: () => void;
    user: User;
    room: Room;
}

export default function BookingDialog({open, onClose, user, room}: BookingDialogProps) {


    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1)

    const {requestAccommodation} = useBookARoom();

    const [reservation, setReservation] = useState<RoomReservationData>({
        roomId: '',
        from: '',
        to: '',
        suggestedTime: "",
        alternativeRooms: false,
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        if(name === "startDate") {
            setReservation(prevState => {
                if(!prevState) return prevState;
                return {
                    ...prevState,
                    from: value.toString()
                }
            })
        }

        if(name === "endDate") {
            setReservation(prevState => {
                if(!prevState) return prevState;
                return {
                    ...prevState,
                    to: value.toString()
                }
            })
        }

        if(name === "suggestedTime") {
            setReservation(prevState => {
                if(!prevState) return prevState;
                return {
                    ...prevState,
                    suggestedTime: value
                }
            })
        }

        if(name === "alternativeRooms"){
            setReservation(prevState => {
                if(!prevState) return prevState;
                return {
                    ...prevState,
                    alternativeRooms: !prevState.alternativeRooms
                }
            })
        }

    }

    useEffect(() => {
        setReservation(prevState => {
            if(!prevState) return prevState;
            return {
                ...prevState,
                roomId: room.id
            }
        })
    }, [room]);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = e.target;
    }

    const handleRequestAccommodation = () => {
        requestAccommodation(reservation);
        onClose();
    }

    return (
        <Dialog onClose={onClose} open={open}>
            <DialogBackdrop className="fixed inset-0 bg-black/60 backdrop-blur-sm "/>
            <div className="flex flex-col h-full min-h-0">
                <div className="fixed inset-0 flex items-center justify-center p-1 sm:p-4">
                    <DialogPanel className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
                        {/*Header*/}
                        <div className="">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full animate-in zoom-in-50 duration-300 delay-150">
                                    <HousePlus/>
                                </div>
                                <div>
                                    <DialogTitle className="text-lg sm:text-xl font-semibold text-white delay-200">

                                    </DialogTitle>
                                    <Description className="text-blue-100 text-sm mt-1 delay-250">

                                    </Description>
                                </div>

                                {/*Command buttons*/}
                                <div className="flex items-center space-x-3">

                                    <div className="hidden sm:block">
                                        <LanguageSelector />
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="flex items-center justify-center w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white touch-target"
                                        aria-label="Close dialog"
                                    >
                                        <svg className="w-5 h-5 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/*Body*/}
                        <div className={`flex`}>

                            {/*Form*/}
                            <div className={`flex flex-row bg-gray-300`}>
                                {/*Form inputs*/}
                                <div className={`flex flex-col mx-10 my-5`}>
                                    <div className={`flex flex-col border-black border`}>
                                        <div className={``}>Time of reservation:</div>
                                        <div className={`flex flex-col mx-10`}>
                                            <div className={`flex flex-row`}>
                                                <div>Date of start:</div>
                                                <input
                                                    type={'date'}
                                                    name={'startDate'}
                                                    min={tomorrow.toISOString().substring(0, tomorrow.toISOString().indexOf('T'))}
                                                    onChange={handleInputChange}
                                                    value={reservation.from.toString()}
                                                    className={`bg-gray-300`}
                                                />
                                            </div>
                                            <div className={`flex flex-row`}>
                                                <div>Date of end:</div>
                                                <input
                                                    type={'date'}
                                                    name={'endDate'}
                                                    min={reservation.from.toString()}
                                                    onChange={handleInputChange}
                                                    value={reservation.to.toString()}
                                                    className={`bg-gray-300`}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {room.price && (
                                        <div className={`flex flex-col`}>
                                            <div className={`flex flex-row`}>
                                                Price per day: ${room.price.pricePerDay} (per person)
                                            </div>
                                        </div>
                                    )}

                                    <div className={`flex flex-row`}>
                                        <div>Suggested accommodation time:</div>
                                        <input
                                            name={'suggestedTime'}
                                            type={'text'}
                                            value={reservation.suggestedTime}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className={`flex flex-row`}>
                                        <div>Book any similar room in thi dormitory:</div>
                                        <input
                                            name={`alternativeRooms`}
                                            type={`checkbox`}
                                            value={reservation.alternativeRooms.toString()}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                </div>
                                {/*Navigation buttons*/}
                                <div className={`flex flex-col my-5 mx-10 space-y-2`}>
                                    <div>
                                        Link conversation
                                    </div>
                                    <div>
                                        <Link className={`bg-blue-600 text-white px-3 py-1 rounded drop-shadow`} href={`/rooms/${room.id}`}>
                                            To room page
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/*Action buttons*/}
                            <div className={`flex flex-row`}>
                                <button onClick={onClose}>Cancel</button>
                                <button onClick={handleRequestAccommodation}>Book</button>
                            </div>

                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}