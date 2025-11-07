'use client'

import {useGetNotification, useNotifications} from "@/hooks/notifications.hook";
import {Notification, NotificationGetRequest, NotificationType} from "@/types/notifications.types";
import {useEffect, useState} from "react";
import {notificationsApi} from "@/app/lib/notifications.api";

export function AdminNotifications() {
    const {markAsRead} = useNotifications();

    const[notificationsFilters, setNotificationsFilters] = useState<NotificationGetRequest>({
        type: null,
        isArchived: 'false',
        startDate: '',
        endDate: '',
        priority: ''
    });
    const[notificationsList, setNotificationsList] = useState<Notification[]>([]);

    const {data: notifications, isLoading: loadingNotifications, error: notificationsError} = useGetNotification(
        notificationsFilters
    )

    useEffect(() => {
        if(notifications) {
            setNotificationsList(notifications);
        }
    }, [notifications]);

    if (loadingNotifications) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md mx-4 border border-slate-200">
                    <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
                        <span className="ml-4 text-slate-700 font-medium text-lg">Loading notifications...</span>
                    </div>
                </div>
            </div>
        )
    }

    return(
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 shadow-sm animate-in slide-in-from-top-4 duration-500">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="text-center animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
                        <h1 className="text-3xl font-bold text-slate-900 flex items-center justify-center">
                            <svg className="w-8 h-8 mr-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5l-5-5h5m0 0V3" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v7a4 4 0 108 0V4" />
                            </svg>
                            Notifications
                        </h1>
                        <p className="text-slate-600 mt-1">Manage and track system notifications</p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white border-b border-slate-200 shadow-sm animate-in slide-in-from-top-4 duration-500 delay-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <h2 className="text-lg font-semibold text-slate-900 mb-4">Filters</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Type Filter */}
                        <div className="space-y-2 delay-200">
                            <label className="block text-sm font-medium text-slate-700">
                                Notification Type
                            </label>
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
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm  hover:shadow-md"
                            >
                                <option value="">All Types</option>
                                {Object.values(NotificationType).map((type) => (
                                    <option value={type} key={type}>{type.replace(/_/g, " ")}</option>
                                ))}
                            </select>
                        </div>

                        {/* Read Status Filter */}
                        <div className="space-y-2 delay-250">
                            <label className="block text-sm font-medium text-slate-700">
                                Read Status
                            </label>
                            <select
                                name="isRead"
                                value={notificationsFilters.isArchived.toString()}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>)=>setNotificationsFilters(prevState => {
                                    if(!prevState) return prevState;
                                    return {
                                        ...prevState,
                                        isArchived: e.target.value as 'true' | 'false'
                                    }
                                })}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm  hover:shadow-md"
                            >
                                <option value={`false`}>Unread</option>
                                <option value={`true`}>Read</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Notifications List */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {notificationsError ? (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center animate-in fade-in-0 zoom-in-50 duration-500">
                        <div className="text-red-600 mb-2">
                            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-red-900 mb-2">Error Loading Notifications</h3>
                        <p className="text-red-700">Unable to load notification data. Please try again later.</p>
                    </div>
                ) : notificationsList && notificationsList.length > 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
                        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
                            <h2 className="text-lg font-semibold text-slate-900">
                                Notifications ({notificationsList.length})
                            </h2>
                        </div>
                        
                        <div className="divide-y divide-slate-200">
                            {notificationsList.map((notification, index) => (
                                <div 
                                    key={notification.id || index}
                                    className={`px-6 py-4 hover:bg-slate-50  ${
                                        !notification.isRead ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                                    }`}
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <div className="flex items-start space-x-4">
                                        {/* Read/Unread Indicator */}
                                        <div className="flex-shrink-0 pt-1">
                                            {!notification.isRead ? (
                                                <button
                                                    onClick={() => markAsRead(notification.id)}
                                                    className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 "
                                                    title="Mark as read"
                                                >
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </button>
                                            ) : (
                                                <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                                                    <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>

                                        {/* Notification Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <h3 className={`text-base font-semibold truncate ${
                                                        !notification.isRead ? 'text-slate-900' : 'text-slate-700'
                                                    }`}>
                                                        {notification.title}
                                                    </h3>
                                                    <p className={`text-sm mt-1 ${
                                                        !notification.isRead ? 'text-slate-700' : 'text-slate-500'
                                                    }`}>
                                                        {notification.message}
                                                    </p>
                                                    {notification.readAt && (
                                                        <p className="text-xs text-slate-400 mt-2">
                                                            Read: {new Date(notification.readAt).toLocaleString()}
                                                        </p>
                                                    )}
                                                </div>
                                                
                                                {/* Priority Badge */}
                                                {notification.priority && (
                                                    <div className="flex-shrink-0 ml-4">
                                                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                                                            notification.priority === 'URGENT' 
                                                                ? 'bg-red-100 text-red-800' 
                                                                : notification.priority === 'HIGH'
                                                                ? 'bg-orange-100 text-orange-800'
                                                                : notification.priority === 'NORMAL'
                                                                ? 'bg-yellow-100 text-yellow-800'
                                                                : 'bg-green-100 text-green-800'
                                                        }`}>
                                                            {notification.priority}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            
                                            {/* Notification Type */}
                                            {notification.type && (
                                                <div className="mt-2">
                                                    <span className="inline-flex px-2 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded">
                                                        {notification.type.replace(/_/g, ' ')}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center animate-in fade-in-0 zoom-in-50 duration-500">
                        <svg className="mx-auto h-16 w-16 text-slate-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-5 5v-5zM15 17V3a2 2 0 00-2-2H5a2 2 0 00-2 2v14l8-4 4 4z" />
                        </svg>
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">No Notifications Found</h3>
                        <p className="text-slate-600">There are no notifications matching your current filters.</p>
                    </div>
                )}
            </div>
        </div>
    )
}