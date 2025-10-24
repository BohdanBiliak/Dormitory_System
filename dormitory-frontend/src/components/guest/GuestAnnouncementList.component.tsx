'use client'

import React, { useEffect, useState } from "react";
import { Announcement } from "@/types/announcements.types";
import { useGetPublicAnnouncements } from "@/hooks/announcements.hook";

export function GuestAnnouncementList() {
    const [page, setPage] = useState(1);
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
    
    // Filter states
    const [showExpired, setShowExpired] = useState(false);
    const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');
    
    const limit = 10;

    const { data: announcementsList, isLoading, error } = useGetPublicAnnouncements({
        showHidden: false, // Guests shouldn't see hidden announcements
        showExpired: showExpired,
        page: page,
        limit: limit
    });

    const totalPages = announcementsList?.pagination?.totalPages || 1;

    useEffect(() => {
        let sortedAnnouncements = announcementsList?.data || [];
        
        // Sort announcements based on user preference
        if (sortBy === 'newest') {
            sortedAnnouncements = [...sortedAnnouncements].sort((a, b) => 
                new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
            );
        } else {
            sortedAnnouncements = [...sortedAnnouncements].sort((a, b) => 
                new Date(a.postedAt).getTime() - new Date(b.postedAt).getTime()
            );
        }
        
        setAnnouncements(sortedAnnouncements);
    }, [announcementsList, sortBy]);

    const handleAnnouncementClick = (announcement: Announcement) => {
        setSelectedAnnouncement(announcement);
    };

    const closeModal = () => {
        setSelectedAnnouncement(null);
    };

    const handleShowExpiredChange = () => {
        setShowExpired(!showExpired);
        setPage(1); // Reset to first page when filter changes
    };

    const handleSortChange = (newSort: 'newest' | 'oldest') => {
        setSortBy(newSort);
    };

    // Helper function to handle attachment downloads
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

    if (isLoading) {
        return (
            <div className=" w-full flex items-center justify-center bg-gray-50">
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-md mx-4">
                    <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <span className="ml-3 text-gray-700 font-medium">Loading announcements...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className=" w-full flex items-center justify-center bg-gray-50">
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
        );
    }

    return (
        <div className="w-4/5 bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header Section */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="px-4 py-6 ">
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
                                Stay updated with the latest dormitory news and notifications
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters Section */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="px-4 py-4 md:px-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <h3 className="text-lg font-semibold text-gray-900">Filters & Sorting</h3>
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                            {/* Show Expired Toggle */}
                            <label className="inline-flex items-center cursor-pointer group">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        checked={showExpired}
                                        onChange={handleShowExpiredChange}
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
                                    Show Expired Announcements
                                </span>
                            </label>

                            {/* Sort Options */}
                            <div className="flex items-center space-x-3">
                                <span className="text-sm font-medium text-gray-700">Sort by:</span>
                                <div className="flex rounded-lg border border-gray-300 bg-white">
                                    <button
                                        onClick={() => handleSortChange('newest')}
                                        className={`px-3 py-2 text-sm font-medium rounded-l-lg transition-colors ${
                                            sortBy === 'newest'
                                                ? 'bg-blue-600 text-white border-blue-600'
                                                : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                    >
                                        Newest First
                                    </button>
                                    <button
                                        onClick={() => handleSortChange('oldest')}
                                        className={`px-3 py-2 text-sm font-medium rounded-r-lg transition-colors border-l ${
                                            sortBy === 'oldest'
                                                ? 'bg-blue-600 text-white border-blue-600'
                                                : 'text-gray-700 hover:bg-gray-50 border-gray-300'
                                        }`}
                                    >
                                        Oldest First
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className=" bg-white">
                <div className="px-4 py-4 md:px-6 border-b border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Latest Announcements ({announcements.length} found)
                        </h2>
                        {showExpired && (
                            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                Including expired announcements
                            </span>
                        )}
                    </div>
                </div>

                {announcements.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="text-gray-400 mb-4">
                            <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No announcements available</h3>
                        <p className="text-gray-600 mb-4">
                            {showExpired 
                                ? "No announcements found with the current filters"
                                : "Try enabling 'Show Expired' to see more announcements"
                            }
                        </p>
                        {!showExpired && (
                            <button
                                onClick={() => setShowExpired(true)}
                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Show Expired Announcements
                            </button>
                        )}
                    </div>
                ) : (
                    <>
                        {/* Desktop Cards View */}
                        <div className="hidden md:block p-6">
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {announcements.map((announcement, index) => {
                                    const isExpired = new Date(announcement.expiresAt) < new Date();
                                    return (
                                        <div
                                            key={announcement.id || index}
                                            onClick={() => handleAnnouncementClick(announcement)}
                                            className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
                                        >
                                            <div className="p-6">
                                                <div className="flex items-start justify-between mb-3">
                                                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                                                        {announcement.title}
                                                    </h3>
                                                    <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full flex-shrink-0 ${
                                                        isExpired 
                                                            ? 'bg-red-100 text-red-800' 
                                                            : 'bg-green-100 text-green-800'
                                                    }`}>
                                                        {isExpired ? 'Expired' : 'Active'}
                                                    </span>
                                                </div>
                                                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                                                    {announcement.content}
                                                </p>
                                                <div className="flex items-center justify-between text-sm text-gray-500">
                                                    <span>Posted: {new Date(announcement.postedAt).toLocaleDateString()}</span>
                                                    <span>Expires: {new Date(announcement.expiresAt).toLocaleDateString()}</span>
                                                </div>
                                                {announcement.attachments && announcement.attachments.length > 0 && (
                                                    <div className="mt-3 flex items-center text-sm text-blue-600">
                                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                                        </svg>
                                                        {announcement.attachments.length} attachment(s)
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Mobile List View */}
                        <div className="md:hidden divide-y divide-gray-200">
                            {announcements.map((announcement, index) => {
                                const isExpired = new Date(announcement.expiresAt) < new Date();
                                return (
                                    <div 
                                        key={announcement.id || index}
                                        onClick={() => handleAnnouncementClick(announcement)}
                                        className="block px-4 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
                                    >
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
                                        <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                                            {announcement.content}
                                        </p>
                                        <div className="flex items-center justify-between text-sm text-gray-500">
                                            <span>Posted: {new Date(announcement.postedAt).toLocaleDateString()}</span>
                                            <span>Expires: {new Date(announcement.expiresAt).toLocaleDateString()}</span>
                                        </div>
                                        {announcement.attachments && announcement.attachments.length > 0 && (
                                            <div className="mt-2 flex items-center text-sm text-blue-600">
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                                </svg>
                                                {announcement.attachments.length} attachment(s)
                                            </div>
                                        )}
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
    );
}