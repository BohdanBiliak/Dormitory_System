'use client'

import {useGetNotification, useNotifications} from "@/hooks/notifications.hook";
import {
    isReadValues,
    Notification,
    NotificationGetRequest,
    NotificationPriority,
    NotificationType
} from "@/types/notifications.types";
import {useEffect, useState} from "react";
import {notificationsApi} from "@/app/lib/notifications.api";
import AdminNotificationDetailsDialogComponent
    from "@/components/dialogs/admin/AdminNotificationDetailsDialog.component";

export function AdminNotifications() {
    const {markAsRead} = useNotifications();

    const[notificationsFilters, setNotificationsFilters] = useState<NotificationGetRequest>({
        type: null,
        isRead: isReadValues.false,
        startDate: '',
        endDate: '',
        priority: ''
    });
    const[notificationsList, setNotificationsList] = useState<Notification[]>([]);
    const[selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

    const {data: notifications, isLoading: loadingNotifications, error: notificationsError} = useGetNotification(
        notificationsFilters
    )

    useEffect(() => {
        if(notifications) {
            setNotificationsList(notifications);
        }
    }, [notifications]);

    const [showNotificationDialog, setShowNotificationDialog] = useState<boolean>(false);
    const handleCloseNotificationDialog = () => {
        setShowNotificationDialog(false);
    }

    const handleCreateNewNotification = () => {
        setSelectedNotification(null);
        setShowNotificationDialog(true);
    }

    const handleOpenNotificationDetails = (e: React.MouseEvent<HTMLButtonElement>) => {
        const {value} = e.currentTarget;

        const notification = notificationsList.find(item => item.id === value);
        if(notification) {
            setSelectedNotification(notification);
        }
        setShowNotificationDialog(true);
    }

    return(
        <div className="flex-col border border-gray-600 w-full">

            {/*Header*/}
            <div className={`py-2 w-full border border-blue-600 drop-shadow`}>
                <h1 className={`align-middle text-center`}>Notifications</h1>
            </div>

            {/*Filters*/}
            <div className={`bg-gray-400 w-full py-4 flex flex-row space-x-4`}>
                <div className={`flex flex-row border-black border`}>
                    <div className={`px-1`}>
                        Type:
                    </div>
                    <select
                        name="type"
                        value={notificationsFilters.type || ''}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>)=>setNotificationsFilters(prevState => {
                            if(!prevState) return prevState;
                            return {
                                ...prevState,
                                type : e.target.value === "" ? null : e.target.value as NotificationType
                            }
                        })}
                    >
                        <option value="">All</option>
                        {Object.values(NotificationType).map((type) => (
                            <option value={type} key={type}>{type.replace(/_/g, " ")}</option>
                        ))}
                    </select>
                </div>

                <div className={`flex flex-row border-black border`}>
                    <div className={`px-1`}>
                        Read:
                    </div>
                    <select
                        name="isRead"
                        value={notificationsFilters.isRead.toString()}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>)=>setNotificationsFilters(prevState => {
                            if(!prevState) return prevState;
                            return {
                                ...prevState,
                                isRead: e.target.value as isReadValues
                            }
                        })}
                    >
                        {Object.values(isReadValues).map((readValue) => (
                            <option value={readValue} key={readValue}>{readValue}</option>
                        ))}
                    </select>
                </div>

                <div className={`flex flex-row border-black border`}>
                    <div className={`px-1`}>
                        Priority:
                    </div>
                    <select
                        name="priority"
                        value={notificationsFilters.priority.toString()}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>)=>setNotificationsFilters(prevState => {
                            if(!prevState) return prevState;
                            return {
                                ...prevState,
                                priority: e.target.value as NotificationPriority
                            }
                        })}
                    >
                        {Object.values(NotificationPriority).map((priorityValue,index) => (
                            <option value={priorityValue} key={index}>{priorityValue}</option>
                        ))}
                    </select>
                </div>

                {/*<button*/}
                {/*    onClick={handleCreateNewNotification}*/}
                {/*    className={`px-2 bg-green-600 border-black border`}*/}
                {/*>*/}
                {/*    Create Notification*/}
                {/*</button>*/}

            </div>

            {/*Notifications*/}
            <div className={`w-full flex flex-col space-3-4 py-3`}>
                {notificationsList && notificationsList.length > 0 && (
                    notificationsList.map((notification,index) => (
                        <div key={index} className={`flex flex-row w-full items-stretch space-x-4 border-gray-500 border`}>
                            {!notification.isRead && (
                                <button
                                    onClick={() => markAsRead(notification.id)}
                                    className="flex items-center justify-center w-6 h-6 text-blue-600 hover:text-blue-800 font-bold"
                                    title="Mark as read"
                                >
                                    •
                                </button>
                            )}
                            <div className={`flex`}>
                                {notification.title}
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <div className="whitespace-nowrap hover:animate-pulse">
                                    {notification.message}
                                </div>
                            </div>
                            <div className={`flex`}>
                                {notification.priority}
                            </div>
                        </div>
                    ))
                )}
            </div>

            <AdminNotificationDetailsDialogComponent show={showNotificationDialog} onClose={handleCloseNotificationDialog} notification={selectedNotification}/>

        </div>
    )
}