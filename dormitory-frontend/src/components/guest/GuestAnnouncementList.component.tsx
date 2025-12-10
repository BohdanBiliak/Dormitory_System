'use client'

import React, { useEffect, useState } from "react";
import { Announcement } from "@/types/announcements.types";
import { useGetUserAnnouncements } from "@/hooks/announcements.hook";
import { useLanguage } from "@/providers/language.provider";

export function GuestAnnouncementList() {
    const { t } = useLanguage();
    const [page, setPage] = useState(1);
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
    
    // Filter states
    const [showExpired, setShowExpired] = useState(false);
    const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');
    
    const limit = 10;

    const { data: announcementsList, isLoading, error } = useGetUserAnnouncements({
        showHidden: false, // Regular users shouldn't see hidden announcements
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
                        <span className="ml-3 text-gray-700 font-medium">{t('announcements.loading')}</span>
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
                        <p className="text-gray-700 font-medium">{t('announcements.error')}</p>
                    </div>
                </div>
            </div>
        );
    }

  return (
    <div className="w-full bg-white h-screen flex flex-col overflow-hidden">
      {/* Header Section with modern gradient */}
      <div className="bg-blue-600 shadow-xl flex-shrink-0">
        <div className="px-4 py-8 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
              </div>
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                  {t('announcements.guest.title')}
                </h1>
                <p className="text-blue-100 text-sm md:text-base mt-2 drop-shadow">
                  {t('announcements.guest.subtitle')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section with glass morphism */}
      <div className="sticky top-0 z-10 bg-white bg-opacity-90 backdrop-blur-md shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 md:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
              <h3 className="text-lg font-semibold text-gray-900">{t('announcements.filters.title')}</h3>
            </div>
            
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
                  <div className={`w-12 h-6 rounded-full  ${
                    showExpired ? 'bg-blue-600 shadow-lg' : 'bg-gray-300'
                  }`}>
                    <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
                      showExpired ? 'translate-x-6' : 'translate-x-0'
                    }`}></div>
                  </div>
                </div>
                <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                  {t('announcements.filters.showExpired')}
                </span>
              </label>

              {/* Sort Options with modern design */}
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-700">{t('announcements.filters.sortBy')}:</span>
                <div className="flex rounded-lg border border-gray-300 bg-white shadow-sm overflow-hidden">
                  <button
                    onClick={() => handleSortChange('newest')}
                    className={`px-4 py-2 text-sm font-medium  ${
                      sortBy === 'newest'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {t('announcements.filters.newest')}
                  </button>
                  <button
                    onClick={() => handleSortChange('oldest')}
                    className={`px-4 py-2 text-sm font-medium border-l  ${
                      sortBy === 'oldest'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-50 border-gray-300'
                    }`}
                  >
                    {t('announcements.filters.oldest')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section - Desk Simulation */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:px-8 flex-1 overflow-y-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              📌 Pinned Announcements
            </h2>
            {showExpired && (
              <span className="text-sm text-gray-500 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
                ⏰ Including expired
              </span>
            )}
          </div>
          <p className="text-gray-600 mt-2">
            {announcements.length} announcement{announcements.length !== 1 ? 's' : ''} on your desk
          </p>
        </div>                {announcements.length === 0 ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="text-center max-w-md">
                            <div className="bg-blue-100 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-6 shadow-xl">
                                <svg className="w-16 h-16 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">{t('announcements.guest.noAnnouncementsTitle')}</h3>
                            <p className="text-gray-600 mb-4">
                                {t('announcements.guest.noAnnouncementsMessage')}
                            </p>
                            {!showExpired && (
                                <button
                                    onClick={() => setShowExpired(true)}
                                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:shadow-lg "
                                >
                                    {t('announcements.filters.showExpired')}
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Desk View - Staggered Cards */}
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                <div className="max-w-7xl mx-auto bg-white bg-opacity-90 backdrop-blur-md shadow-lg rounded-xl border border-gray-200 my-6">
                    <div className="px-6 py-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="text-sm text-gray-700 font-medium">
                                {t('announcements.guest.pagination.page')} {page} {t('announcements.guest.pagination.of')} {totalPages}
                            </div>
                            <div className="flex flex-wrap justify-center sm:justify-end gap-2">
                                <button
                                    onClick={() => setPage(Math.max(1, page - 1))}
                                    disabled={page === 1}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                                >
                                    ← {t('announcements.guest.pagination.previous')}
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
                                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all shadow-sm ${
                                                page === pageNum
                                                    ? 'bg-blue-600 text-white shadow-lg scale-110'
                                                    : 'bg-white text-gray-700 border-2 border-gray-300 hover:bg-gray-50 hover:border-blue-400'
                                            }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                                
                                <button
                                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                                    disabled={page === totalPages}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                                >
                                    {t('announcements.guest.pagination.next')} →
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
                            <div className="bg-blue-600 px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-white flex-1">
                                    {selectedAnnouncement.title}
                                </h3>
                                <button
                                    onClick={closeModal}
                                    className="ml-4 text-white hover:text-blue-100 transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
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