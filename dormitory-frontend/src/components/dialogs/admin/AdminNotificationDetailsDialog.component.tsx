import {Notification, NotificationPostData} from "@/types/notifications.types";
import {Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle} from "@headlessui/react";
import {BuildingIcon} from "lucide-react";
import React, {useEffect, useState} from "react";
import {LanguageSelector} from "@/providers/language.provider";
import {useUserListQuery} from "@/hooks/userList.hook";
import {User} from "@/types/auth.types";
import {useNotifications} from "@/hooks/notifications.hook";

export interface AdminNotificationDetailsDialogProps {
    show: boolean;
    onClose: () => void;
    notification: Notification | null;

}

export default function AdminNotificationDetailsDialogComponent({show, onClose, notification}:AdminNotificationDetailsDialogProps) {
    const {markAsRead, createNotification} = useNotifications()

    const[userList, setUserList] = useState<User[]>([]);
    const {data:users, isLoading: loadingUserList, error: userListError} = useUserListQuery();

    useEffect(() => {
        if(users && users.data){
            setUserList(users.data)
        }
    },[users])

    const [newNotification, setNewNotification] = useState<NotificationPostData>({
        title: '',
        message: '',
        targetUserIds: ''
    });

    const handleNewNotificationInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        if(name === 'title'){
            setNewNotification(prevState => {
                if(!prevState) return prevState;
                return {...prevState, title : value}
            })
        }

        if(name === 'message'){
            setNewNotification(prevState=>{
                if(!prevState) return prevState;
                return {...prevState, message : value}
            })
        }
    }

    const handleNewNotificationSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {value} = e.target;

        setNewNotification(prevState => {
            if(!prevState) return prevState;
            return {...prevState, targetUserIds: value}
        })
    }

    const handleCancelNotification = () => {
        setNewNotification({
            title: '',
            message: '',
            targetUserIds: ''
        });
        onClose();
    }

    const handleSaveNotification = () => {
        createNotification(newNotification);
        onClose();
    }

    const handleMarkAsRead = (e: React.MouseEvent<HTMLButtonElement>) => {
        const {name, value} = e.currentTarget;

        if(name === 'markAsRead'){
            markAsRead(value);
        }

    }

    return(
        <Dialog onClose={onClose} open={show}>
            <DialogBackdrop className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300"/>
            <div className="flex flex-col h-full min-h-0">
                <div className="fixed inset-0 flex items-center justify-center p-1 sm:p-4">
                    <DialogPanel className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 sm:px-6 py-4 sm:py-6 flex-shrink-0 create-dormitory-header">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full animate-in zoom-in-50 duration-300 delay-150">
                                    <BuildingIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                </div>
                                <div>
                                    <DialogTitle className="text-lg sm:text-xl font-semibold text-white animate-in fade-in-0 slide-in-from-bottom-2 duration-300 delay-200">
                                        {notification? (
                                            <>Notification</>
                                        ):(
                                            <>Create new notification</>
                                        )}
                                    </DialogTitle>
                                    <Description className="text-blue-100 text-sm mt-1 animate-in fade-in-0 slide-in-from-bottom-2 duration-300 delay-250">
                                        {notification? (
                                            <>Notification details</>
                                        ):(
                                            <>Here you can create new notification</>
                                        )}
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
                        <div className="flex-1 overflow-hidden flex flex-col min-h-0">
                            {notification?  (
                                <div className={`flex-1 overflow-hidden flex flex-col min-h-0`}>
                                    <div className="flex flex-row">
                                        <div>
                                            Title:
                                        </div>
                                        <input
                                            type={`text`}
                                            name={'title'}
                                            value={notification.title}
                                            disabled={true}
                                        />
                                    </div>
                                    <div className="flex flex-row">
                                        <div>
                                            Message:
                                        </div>
                                        <input
                                            type={`text`}
                                            name={'message'}
                                            value={notification.message}
                                            disabled={true}
                                        />
                                    </div>
                                    <button
                                        name={"markAsRead"}
                                        onClick={handleMarkAsRead}
                                        className={`px-2 bg-green-600 border-black border`}
                                    >
                                        Mark as Read
                                    </button>
                                </div>
                            ):(
                                <div className={`flex-1 overflow-hidden flex flex-col min-h-0`}>
                                    <div className="flex flex-row">
                                        <div>
                                            Title:
                                        </div>
                                        <input
                                            type={`text`}
                                            name={'title'}
                                            value={newNotification.title}
                                            onChange={handleNewNotificationInputChange}
                                        />
                                    </div>
                                    <div className="flex flex-row">
                                        <div>
                                            Message:
                                        </div>
                                        <input
                                            type={`text`}
                                            name={'message'}
                                            value={newNotification.message}
                                            onChange={handleNewNotificationInputChange}
                                        />
                                    </div>
                                    <div className="flex flex-row">
                                        <div>
                                            Addresses:
                                        </div>
                                        <select
                                            value={newNotification.targetUserIds}
                                            onChange={handleNewNotificationSelectChange}
                                        >
                                            <option value={""}>---</option>
                                            {userList.map((user) => (
                                                <option value={user.id} key={user.id}>{user.displayName+" "+user.secondName}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <button
                                         onClick={handleCancelNotification}
                                        >
                                            Close
                                        </button>
                                        <button
                                            onClick={handleSaveNotification}
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}