'use client'

import Link from "next/link";
import React, {useEffect, useState} from "react";
import {useGetPublicAnnouncements} from "@/hooks/announcements.hook";
import { Announcement } from "@/types/announcements.types";
import { useLanguage } from "@/providers/language.provider";

export function UserPublicAnnouncements(){
    const { t } = useLanguage()
    const [showExpired, setShowExpired] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const limit = 10
    const [announcements, setAnnouncements] = React.useState<Announcement[]>([]);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

    const {data: announcementsList, isLoading, error} = useGetPublicAnnouncements({
        showHidden: false,
        showExpired: showExpired,
        page:page,
        limit:limit
    })

    const handleAnnouncementClick = (announcement: Announcement) => {
        setSelectedAnnouncement(announcement);
    };

    const closeModal = () => {
        setSelectedAnnouncement(null);
    };

    const handleChangeShowExpired = (event: React.ChangeEvent<HTMLInputElement>) => {
        setShowExpired(!showExpired)
    }

    useEffect(() => {
        setAnnouncements(announcementsList?.data || [])
    }, [announcementsList]);

    const handleAttachmentClick = (attachment: any, event: React.MouseEvent) => {
        event.stopPropagation(); // Prevent modal from closing

        // Check if attachment has a proper URL
        if (typeof attachment === 'string') {
            // If attachment is just a string URL
            const link = document.createElement('a');
            link.href = attachment;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else if (attachment && attachment.url) {
            // If attachment is an object with url property
            const link = document.createElement('a');
            link.href = attachment.url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            if (attachment.fileName) {
                link.download = attachment.fileName;
            }
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            console.error('Invalid attachment format:', attachment);
            alert('Unable to open attachment. Invalid file format.');
        }
    };

    const totalPages = announcementsList?.pagination.totalPages || 1;


    return(
        <div className="min-h-screen w-full bg-gray-50">
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
                                    Public announcements are shared between all dormitories
                                </p>
                            </div>
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
                      There are no new announcements yet
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
                                                    href={`/admin/announcements/${announcement.id}`}
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
                                                    href={`/admin/announcements/${announcement.id}`}
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
                                const isExpired = new Date(announcement.expiresAt) < new Date();

                                return (
                                    <div
                                        key={announcement.id || index}
                                        onClick={() => handleAnnouncementClick(announcement)}
                                        className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl  cursor-pointer overflow-hidden border-2 ${
                                            isExpired ? 'border-gray-200 opacity-75' : 'border-blue-100 hover:border-blue-300'
                                        } hover:scale-105`}
                                        style={{
                                            transform: `rotate(${(index % 4 - 1.5) * 0.5}deg)`,
                                        }}
                                    >
                                        {/* Status Pin */}
                                        <div className="absolute top-4 right-4 z-10">
                                            {isExpired ? (
                                                <div className="bg-gray-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center">
                                                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                    </svg>
                                                    Expired
                                                </div>
                                            ) : (
                                                <div className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center">
                                                    <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                                                    Active
                                                </div>
                                            )}
                                        </div>

                                        {/* Decorative Corner Fold */}
                                        <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-blue-100 group-hover:border-t-blue-200 transition-colors"></div>

                                        {/* Content */}
                                        <div className="p-6">
                                            {/* Title */}
                                            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors pr-12">
                                                {announcement.title}
                                            </h3>

                                            {/* Content Preview */}
                                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                                {announcement.content}
                                            </p>

                                            {/* Attachments Badge */}
                                            {announcement.attachments && announcement.attachments.length > 0 && (
                                                <div className="flex items-center text-sm text-blue-600 bg-blue-50 px-3 py-2 rounded-lg mb-4 w-fit">
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                                    </svg>
                                                    <span className="font-medium">{announcement.attachments.length} file{announcement.attachments.length !== 1 ? 's' : ''}</span>
                                                </div>
                                            )}

                                            {/* Dates Footer */}
                                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                                <div className="flex items-center text-xs text-gray-500">
                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    {new Date(announcement.postedAt).toLocaleDateString()}
                                                </div>
                                                <div className={`flex items-center text-xs ${
                                                    isExpired ? 'text-red-600' : 'text-emerald-600'
                                                } font-medium`}>
                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    Until {new Date(announcement.expiresAt).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Hover Overlay */}
                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-transparent opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"></div>
                                    </div>
                                );
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

            {/* Modal for detailed view */}
            {selectedAnnouncement && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center  pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={closeModal}></div>
                        </div>

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="flex items-start justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900 flex-1">
                                        {selectedAnnouncement.title}
                                    </h3>
                                    <button
                                        onClick={closeModal}
                                        className="ml-4 text-gray-400 hover:text-gray-500"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="mb-4">
                                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                                        <span>Posted: {new Date(selectedAnnouncement.postedAt).toLocaleDateString()}</span>
                                        <span>Expires: {new Date(selectedAnnouncement.expiresAt).toLocaleDateString()}</span>
                                    </div>
                                    <div className="prose max-w-none">
                                        <p className="text-gray-700 whitespace-pre-wrap">
                                            {selectedAnnouncement.content}
                                        </p>
                                    </div>
                                </div>

                                {selectedAnnouncement.attachments && selectedAnnouncement.attachments.length > 0 && (
                                    <div className="border-t pt-4">
                                        <h4 className="text-sm font-medium text-gray-900 mb-2">Attachments</h4>
                                        <div className="space-y-2">
                                            {selectedAnnouncement.attachments.map((attachment, index) => (
                                                <div key={index} className="flex items-center space-x-2 text-sm">
                                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                                    </svg>
                                                    <button
                                                        onClick={(e) => handleAttachmentClick(attachment, e)}
                                                        className="text-blue-600 hover:text-blue-800 hover:underline text-left"
                                                    >
                                                        {typeof attachment === 'string'
                                                            ? `Attachment ${index + 1}`
                                                            : (attachment.fileName || `Attachment ${index + 1}`)
                                                        }
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    onClick={closeModal}
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}