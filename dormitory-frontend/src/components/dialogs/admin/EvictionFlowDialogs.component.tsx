import {Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle} from "@headlessui/react";
import {AlertTriangle} from "lucide-react";
import React, {useEffect, useState} from "react";
import {User} from "@/types/auth.types";
import {EvictRequest, Room, RoomResident} from "@/types/rooms.types";
import {useUpdateRoom} from "@/hooks/rooms.hook";
import { useLanguage } from '@/providers/language.provider';

export interface EvictionFlowProps {
    userToEvict: RoomResident,
    showEvictionConfirmation: boolean;
    closeEvictionConfirmation: () => void;
    roomInfo: Room;
}

export default function EvictionFlowDialogsComponent({userToEvict, showEvictionConfirmation, closeEvictionConfirmation, roomInfo}: EvictionFlowProps) {
    const { t } = useLanguage();
    const {evictUser} = useUpdateRoom()

    const [showEvictionMenu, setShowEvictionMenu] = React.useState(false);
    const [evictionInformation, setEvictionInformation] = useState<EvictRequest>({
        userId: '',
        description: '',
    })

    useEffect(() => {
        setEvictionInformation(prevState => {
            if(!prevState) return prevState;
            return {
                ...prevState,
                userId: userToEvict.id
            }
        })
    }, [userToEvict]);

    const openEvictionMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setShowEvictionMenu(true);
    }

    const closeEvictionMenu = () => {
        setShowEvictionMenu(false);
    }

    const handleEvictionReasonInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;

        setEvictionInformation(prev => {
            if(!prev) return prev;
            return{...prev, description:value}
        })
    }

    const handleEvictResident = (evet: React.MouseEvent<HTMLButtonElement>) => {
        evictUser({roomId: roomInfo.id, body: evictionInformation})
        closeEvictionMenu()
        closeEvictionConfirmation()
    }

    return(
        <>
            {/* Eviction Confirmation Dialog */}
            <Dialog onClose={closeEvictionConfirmation} open={showEvictionConfirmation} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/60 backdrop-blur-sm " />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel className="w-full max-w-md bg-white rounded-2xl shadow-2xl animate-in zoom-in-95 fade-in-0 duration-300 slide-in-from-bottom-4">
                        <div className="p-6">
                            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full animate-in zoom-in-50 duration-300 delay-150">
                                <AlertTriangle className="w-6 h-6 text-red-600" />
                            </div>
                            <DialogTitle className="text-lg font-semibold text-slate-900 text-center mb-2 delay-200">
                                {t('rooms.eviction.confirmTitle')}
                            </DialogTitle>
                            <Description className="text-slate-600 text-center mb-6 delay-250">
                                {t('rooms.eviction.confirmMessage', { 
                                    userName: `${userToEvict.displayName} ${userToEvict.secondName}`,
                                    roomNumber: roomInfo.number 
                                })}
                            </Description>
                            <div className="flex space-x-3 delay-300">
                                <button
                                    className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2  hover:scale-105 hover:shadow-lg"
                                    onClick={openEvictionMenu}
                                >
                                    {t('rooms.eviction.yesContinue')}
                                </button>
                                <button
                                    className="flex-1 bg-slate-200 text-slate-700 py-2 px-4 rounded-lg font-medium hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2  hover:scale-105"
                                    onClick={closeEvictionConfirmation}
                                >
                                    {t('common.cancel')}
                                </button>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>

            {/* Eviction Menu Dialog */}
            <Dialog onClose={closeEvictionMenu} open={showEvictionMenu} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/60 backdrop-blur-sm " />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel className="w-full max-w-lg bg-white rounded-2xl shadow-2xl animate-in zoom-in-95 fade-in-0 duration-300 slide-in-from-bottom-4">
                        <div className="px-6 py-4 bg-red-50 border-b border-red-200">
                            <DialogTitle className="text-lg font-semibold text-red-900">
                                {t('rooms.eviction.detailsTitle')}
                            </DialogTitle>
                            <Description className="text-red-700 text-sm mt-1">
                                {t('rooms.eviction.detailsMessage', { 
                                    userName: `${userToEvict.displayName} ${userToEvict.secondName}` 
                                })}
                            </Description>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="animate-in fade-in-0 slide-in-from-left-2 duration-300 delay-150">
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    {t('rooms.eviction.reasonLabel')}
                                </label>
                                <input
                                    name="description"
                                    type="text"
                                    value={evictionInformation.description}
                                    onChange={handleEvictionReasonInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500  hover:shadow-sm"
                                    placeholder={t('rooms.eviction.reasonPlaceholder')}
                                />
                            </div>
                        </div>

                        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex space-x-3 delay-250">
                            <button
                                className= "flex-1 bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2  hover:scale-105 hover:shadow-lg"
                                onClick={handleEvictResident}
                            >
                                {t('rooms.eviction.confirmButton')}
                            </button>
                            <button
                                className="flex-1 bg-slate-200 text-slate-700 py-2 px-4 rounded-lg font-medium hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2  hover:scale-105"
                                onClick={closeEvictionMenu}
                            >
                                {t('common.cancel')}
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}