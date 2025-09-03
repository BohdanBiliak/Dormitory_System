'use client'

import React, { useState, useEffect } from "react";
import { useAnnouncements } from "@/hooks/announcements.hook";
import Link from "next/link";
import { Announcement } from "@/types/announcements.types";

export function AdminAnnouncementList() {
  // State for filters and pagination
  const [filters, setFilters] = useState({
    showHidden: false,
    showExpired: false,
    page: 1,
    limit: 10
  });
  
  // Use the hook to fetch data
  const { getAnnouncements } = useAnnouncements();
  const { 
    data: announcementsList, 
    isLoading, 
    error, 
    isFetching 
  } = getAnnouncements(filters);
  
  // Log for debugging
  console.log("Filters:", filters);
  console.log("Response data:", announcementsList);
  
  // Safe access to data with fallbacks
  const announcements = announcementsList?.data || [];
  const pagination = announcementsList?.pagination || { totalPages: 1, currentPage: 1 };
  
  // Handle filter changes
  const handleFilterChange = (filterName: 'showHidden' | 'showExpired', value: boolean) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value,
      // Reset to page 1 when filters change
      page: 1
    }));
  };
  
  // Handle pagination
  const handlePageChange = (newPage: number) => {
    setFilters(prev => ({
      ...prev,
      page: newPage
    }));
  };
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="bg-white border border-gray-300 rounded-lg p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900"></div>
          <span className="ml-2">Loading announcements...</span>
        </div>
      </div>
    );
  }
  
  // Show error state
  if (error) {
    return (
      <div className="bg-white border border-gray-300 rounded-lg p-8">
        <div className="text-center text-red-600">
          <p className="font-bold">Error loading announcements</p>
          <p className="mt-2">{(error as Error).message || 'Something went wrong'}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="mx-auto w-full bg-white border-2 border-blue-300 flex flex-col align-top rounded-lg overflow-hidden">
      {/* Header with title and filters */}
      <div className="w-full p-4 border-b border-blue-200 bg-blue-50">
        <div className="text-xl font-bold mb-3">Announcements</div>
        <div className="flex flex-row justify-between items-center">
          <Link 
            className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" 
            href="/admin/announcements/new-announcement"
          >
            New Announcement
          </Link>
          <div className="flex flex-row space-x-4">
            <label className="flex items-center space-x-2 cursor-pointer"> 
              <input 
                type="checkbox" 
                checked={filters.showHidden}
                onChange={(e) => handleFilterChange('showHidden', e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-600" 
              />
              <span>Show Hidden</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer"> 
              <input 
                type="checkbox" 
                checked={filters.showExpired}
                onChange={(e) => handleFilterChange('showExpired', e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-600" 
              />
              <span>Show Expired</span>
            </label>
          </div>
        </div>
        
        {/* Loading indicator when refreshing with existing data */}
        {isFetching && (
          <div className="mt-2 text-sm text-blue-600 flex items-center">
            <div className="animate-spin h-4 w-4 border-b-2 border-blue-600 rounded-full mr-2"></div>
            Refreshing data...
          </div>
        )}
      </div>

      {/* Announcements list */}
      <div className="w-full grow p-4">
        {announcements.length > 0 ? (
          <table className="w-full table-fixed border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-1/6 p-2 text-left border border-gray-200">Posting Date</th>
                <th className="p-2 text-left border border-gray-200">Title</th>
                <th className="w-1/6 p-2 text-left border border-gray-200">Expiration Date</th>
              </tr>
            </thead>
            <tbody>
              {announcements.map((announcement, index) => (
                <tr key={announcement.id || index} className="hover:bg-gray-50">
                  <td className="p-3 border border-gray-200">
                    {new Date(announcement.postedAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 border border-gray-200">
                    <Link 
                      href={`/admin/announcement/${announcement.id}`} 
                      className="text-blue-600 hover:underline"
                    >
                      {announcement.title}
                    </Link>
                  </td>
                  <td className="p-3 border border-gray-200">
                    {announcement.expiresAt 
                      ? new Date(announcement.expiresAt).toLocaleDateString() 
                      : 'No expiration'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No announcements found. {filters.showHidden ? '' : 'Try enabling "Show Hidden" to see hidden announcements.'}
            {filters.showExpired ? '' : ' Try enabling "Show Expired" to see expired announcements.'}
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-200 flex justify-center">
          <div className="flex space-x-2">
            <button
              onClick={() => handlePageChange(Math.max(1, filters.page - 1))}
              disabled={filters.page === 1}
              className={`px-3 py-1 border rounded text-sm transition-colors ${
                filters.page === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              Previous
            </button>
            
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
              .filter(page => 
                page === 1 || 
                page === pagination.totalPages || 
                Math.abs(page - filters.page) <= 1
              )
              .reduce((items, page) => {
                if (items.length > 0 && items[items.length - 1] !== page - 1) {
                  items.push(-1); // Add ellipsis indicator
                }
                items.push(page);
                return items;
              }, [] as number[])
              .map((pageNum, idx) => 
                pageNum === -1 ? (
                  <span key={`ellipsis-${idx}`} className="px-3 py-1">...</span>
                ) : (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-1 border rounded text-sm transition-colors ${
                      filters.page === pageNum
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              )
            }
            
            <button
              onClick={() => handlePageChange(Math.min(pagination.totalPages, filters.page + 1))}
              disabled={filters.page === pagination.totalPages}
              className={`px-3 py-1 border rounded text-sm transition-colors ${
                filters.page === pagination.totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}