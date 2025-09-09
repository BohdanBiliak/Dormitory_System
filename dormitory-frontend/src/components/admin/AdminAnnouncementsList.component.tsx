'use client'

import React, {useEffect, useState} from "react";
import Link from "next/link";
import {Announcement} from "@/types/announcements.types";
import {announcementsApi} from "@/app/lib/announcements.api";
import {useGetAnnouncements} from "@/hooks/announcements.hook";

export function AdminAnnouncementList(){
    const [showHidden, setShowHidden] = React.useState(false);
    const [showExpired, setShowExpired] = React.useState(false);
    const [page, setPage] = useState(1);
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const limit = 10;

    const handleChangeShowExpired = (): void =>setShowExpired(!showExpired);
    const handleChangeShowHidden = (): void => setShowHidden(!showHidden);

    const {data: announcementsList, isLoading, error} = useGetAnnouncements({
         showHidden:showHidden,
         showExpired:showExpired,
         page:page,
         limit:limit
    })

    console.log("showExpired ", showExpired);
    console.log("showHidden:", showHidden);
    console.log("announcements:", announcements);

    const totalPages = announcementsList?.pagination?.totalPages || 1

    useEffect(() => {
        setAnnouncements(announcementsList?.data || []);
    }, [announcementsList]);

    if (isLoading) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-md mx-4">
                    <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <span className="ml-3 text-gray-700 font-medium">Loading announcements...</span>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-md mx-4">
                    <div className="text-center">
                        <div className="text-red-500 mb-3">
                            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <p className="text-gray-700 font-medium">Error loading announcements. Please try again.</p>
                    </div>
                </div>
            </div>
        )
    }

    return(
        <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header Section */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="px-4 py-6 md:px-6 md:py-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        {/* Title Section */}
                        <div className="flex items-center space-x-3">
                            <div className="p-3 bg-blue-600 rounded-xl shadow-lg">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                                    Announcements
                                </h1>
                                <p className="text-gray-600 text-sm md:text-base mt-1">
                                    Manage dormitory announcements and notifications
                                </p>
                            </div>
                        </div>

                        {/* Action Button */}
                        <div className="flex-shrink-0">
                            <Link 
                                href="/admin/announcements/new-announcement"
                                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                New Announcement
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters Section */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="px-4 py-4 md:px-6 md:py-6">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                        <div className="flex flex-col sm:flex-row gap-4">
                            {/* Show Hidden Toggle */}
                            <label className="inline-flex items-center cursor-pointer group">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        checked={showHidden}
                                        onChange={handleChangeShowHidden}
                                        className="sr-only"
                                    />
                                    <div className={`w-11 h-6 rounded-full transition-colors duration-200 ${
                                        showHidden ? 'bg-blue-600' : 'bg-gray-300'
                                    }`}>
                                        <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                                            showHidden ? 'translate-x-5' : 'translate-x-0'
                                        }`}></div>
                                    </div>
                                </div>
                                <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-gray-900">
                                    Show Hidden
                                </span>
                            </label>

                            {/* Show Expired Toggle */}
                            <label className="inline-flex items-center cursor-pointer group">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        checked={showExpired}
                                        onChange={handleChangeShowExpired}
                                        className="sr-only"
                                    />
                                    <div className={`w-11 h-6 rounded-full transition-colors duration-200 ${
                                        showExpired ? 'bg-blue-600' : 'bg-gray-300'
                                    }`}>
                                        <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                                            showExpired ? 'translate-x-5' : 'translate-x-0'
                                        }`}></div>
                                    </div>
                                </div>
                                <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-gray-900">
                                    Show Expired
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 bg-white">
                <div className="px-4 py-4 md:px-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Announcements ({announcements.length} found)
                    </h2>
                </div>

                {announcements.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="text-gray-400 mb-4">
                            <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No announcements found</h3>
                        <p className="text-gray-600 mb-6">Get started by creating your first announcement</p>
                        <Link 
                            href="/admin/announcements/new-announcement"
                            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Create Announcement
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Desktop Table View */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Posted Date
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Title
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Expiration Date
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="relative px-6 py-3">
                                            <span className="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {announcements.map((announcement, index) => {
                                        const isExpired = new Date(announcement.expiresAt) < new Date()
                                        return (
                                            <tr key={announcement.id || index} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {new Date(announcement.postedAt).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <Link 
                                                        href={`/admin/announcement/${announcement.id}`}
                                                        className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
                                                    >
                                                        {announcement.title}
                                                    </Link>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {new Date(announcement.expiresAt).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                        isExpired 
                                                            ? 'bg-red-100 text-red-800' 
                                                            : 'bg-green-100 text-green-800'
                                                    }`}>
                                                        {isExpired ? 'Expired' : 'Active'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <Link 
                                                        href={`/admin/announcement/${announcement.id}`}
                                                        className="text-blue-600 hover:text-blue-800"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Card View */}
                        <div className="md:hidden divide-y divide-gray-200">
                            {announcements.map((announcement, index) => {
                                const isExpired = new Date(announcement.expiresAt) < new Date()
                                return (
                                    <Link 
                                        key={announcement.id || index}
                                        href={`/admin/announcement/${announcement.id}`}
                                        className="block"
                                    >
                                        <div className="px-4 py-4 hover:bg-gray-50 transition-colors">
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="text-sm font-medium text-gray-900 truncate flex-1">
                                                    {announcement.title}
                                                </h3>
                                                <span className={`ml-3 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                    isExpired 
                                                        ? 'bg-red-100 text-red-800' 
                                                        : 'bg-green-100 text-green-800'
                                                }`}>
                                                    {isExpired ? 'Expired' : 'Active'}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm text-gray-500">
                                                <span>Posted: {new Date(announcement.postedAt).toLocaleDateString()}</span>
                                                <span>Expires: {new Date(announcement.expiresAt).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="bg-white border-t border-gray-200">
                    <div className="px-4 py-4 md:px-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div className="text-sm text-gray-700 mb-4 sm:mb-0">
                                Page {page} of {totalPages}
                            </div>
                            <div className="flex flex-wrap justify-center sm:justify-end gap-1">
                                <button
                                    onClick={() => setPage(Math.max(1, page - 1))}
                                    disabled={page === 1}
                                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Previous
                                </button>
                                
                                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                                    let pageNum;
                                    if (totalPages <= 5) {
                                        pageNum = i + 1;
                                    } else if (page <= 3) {
                                        pageNum = i + 1;
                                    } else if (page >= totalPages - 2) {
                                        pageNum = totalPages - 4 + i;
                                    } else {
                                        pageNum = page - 2 + i;
                                    }
                                    
                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => setPage(pageNum)}
                                            className={`px-3 py-2 text-sm font-medium border transition-colors ${
                                                page === pageNum
                                                    ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                            }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                                
                                <button
                                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                                    disabled={page === totalPages}
                                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}