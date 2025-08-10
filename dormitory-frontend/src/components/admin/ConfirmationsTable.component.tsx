'use client'

import { useState } from 'react'
import { IdentityVerificationModal } from './IdentityVerificationModal.componet'
import { useConfirmations } from '@/hooks/confirmations.hook'
import type { Confirmation } from '@/app/lib/confirmations.api'

export function ConfirmationsTable() {
  const [selectedConfirmation, setSelectedConfirmation] = useState<Confirmation | null>(null)
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest')
  const [typeFilter, setTypeFilter] = useState<string>('All')
  const [showResolved, setShowResolved] = useState(false)
  const [page, setPage] = useState(1)
  const limit = 10

  // Get filtered confirmations from API
  const { useFilteredConfirmations, approveConfirmation, rejectConfirmation, isApproving, isRejecting } = useConfirmations()
  
  const { data: confirmationsData, isLoading, error } = useFilteredConfirmations({
    type: typeFilter,
    status: showResolved ? undefined : 'PENDING',
    page,
    limit
  })

  const handleConfirmationClick = (confirmation: Confirmation) => {
    setSelectedConfirmation(confirmation)
  }

  const handleCloseModal = () => {
    setSelectedConfirmation(null)
  }

  const handleApprove = (confirmationId: string) => {
    approveConfirmation(confirmationId)
    setSelectedConfirmation(null)
  }

  const handleReject = (confirmationId: string) => {
    rejectConfirmation({ id: confirmationId })
    setSelectedConfirmation(null)
  }

  // Map backend types to frontend display names
  const getDisplayType = (type: string) => {
    const typeMap: Record<string, string> = {
      'IDENTITY_VERIFICATION': 'Identity Verification',
      'ACCOMMODATION': 'Accommodation',
      'ROOM_CHANGE': 'Room change',
      'ROOM_VACATION': 'Room vacation'
    }
    return typeMap[type] || type
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (isLoading) {
    return (
      <div className="bg-white border border-gray-300 rounded-lg p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900"></div>
          <span className="ml-2">Loading confirmations...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white border border-gray-300 rounded-lg p-8">
        <div className="text-center text-red-600">
          <p>Error loading confirmations. Please try again.</p>
        </div>
      </div>
    )
  }

  const confirmations = confirmationsData?.data || []
  const totalPages = confirmationsData?.pageCount || 1

  return (
    <>
      <div className="bg-white border border-gray-300 rounded-lg">
        {/* Header */}
        <div className="bg-gray-100 px-6 py-4 border-b border-gray-300">
          <h2 className="text-lg font-semibold text-gray-900">Confirmations</h2>
        </div>

        {/* Filters */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Type:</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 text-sm"
              >
                <option value="All">All</option>
                <option value="Identity Verification">Identity Verification</option>
                <option value="Accommodation">Accommodation</option>
                <option value="Room change">Room change</option>
                <option value="Room vacation">Room vacation</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="showResolved"
                checked={showResolved}
                onChange={(e) => setShowResolved(e.target.checked)}
                className="rounded"
              />
              <label htmlFor="showResolved" className="text-sm text-gray-700">
                Show resolved:
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest')}
                className="border border-gray-300 rounded px-2 py-1 text-sm"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {confirmations.map((confirmation, index) => (
                <tr
                  key={confirmation.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleConfirmationClick(confirmation)}
                >
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {(page - 1) * limit + index + 1}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {confirmation.requester.displayName}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {getDisplayType(confirmation.type)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      confirmation.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                      confirmation.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {confirmation.status.toLowerCase()}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(confirmation.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-center">
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setPage(pageNum)}
                className={`px-3 py-1 border rounded text-sm transition-colors ${
                  page === pageNum
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                {pageNum}
              </button>
            ))}
          </div>
        </div>

        {/* Loading overlay */}
        {(isApproving || isRejecting) && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900"></div>
          </div>
        )}
      </div>

      {/* Identity Verification Modal */}
      {selectedConfirmation && (
        <IdentityVerificationModal
          confirmation={selectedConfirmation}
          onClose={handleCloseModal}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
    </>
  )
}