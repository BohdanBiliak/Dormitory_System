'use client'

import { useState } from 'react'
import { IdentityVerificationModal } from './confirmationsModals/IdentityVerificationModal.component'
import { useConfirmations } from '@/hooks/confirmations.hook'
import {BookingConfirmationApproval, Confirmation} from '@/types/confirmations.types'
import {PaymentProofModal} from "@/components/admin/confirmationsModals/PaymentProofVereficationModal";
import {
  AccommodationConfirmationModal
} from "@/components/admin/confirmationsModals/AccomodationConfirmationModal.component";
import { useLanguage } from '@/providers/language.provider';

export function ConfirmationsTable() {
  const { t } = useLanguage();
  const [selectedConfirmation, setSelectedConfirmation] = useState<Confirmation | null>(null)
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest')
  const [typeFilter, setTypeFilter] = useState<string>('All')
  const [showResolved, setShowResolved] = useState(false)
  const [page, setPage] = useState(1)
  const limit = 10

  const { useFilteredConfirmations, approveConfirmation, rejectConfirmation, isApproving, isRejecting, approvingAccommodationConfirmation, approveAccommodationConfirmation } = useConfirmations()
  
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

  const handleReject = ({id, reason}:{id:string, reason: string}) => {
    rejectConfirmation({ id: id, reason: reason })
    setSelectedConfirmation(null)
  }

  const handleApproveAccommodation = (confirmationId: string, approvalInfo: BookingConfirmationApproval) => {
    approveAccommodationConfirmation({id: confirmationId, approvalData: approvalInfo})
  }

  const getDisplayType = (type: string) => {
    const typeKey = `confirmations.table.confirmationTypes.${type}` as const;
    return t(typeKey) || type;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-blue-50">
        <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md border border-blue-100">
          <div className="flex flex-col items-center justify-center">
            <div className="relative">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600"></div>
              <div className="absolute inset-0 rounded-full bg-blue-50 opacity-20"></div>
            </div>
            <span className="mt-4 text-gray-700 font-medium text-lg">{t('confirmations.table.loading')}</span>
            <p className="text-gray-500 text-sm mt-1">{t('confirmations.table.loadingSubtitle')}</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-red-50">
        <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md border border-red-100">
          <div className="text-center">
            <div className="text-red-500 mb-4">
              <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('confirmations.table.errorTitle')}</h3>
            <p className="text-gray-600 mb-4">{t('confirmations.table.errorMessage')}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              {t('confirmations.table.retry')}
            </button>
          </div>
        </div>
      </div>
    )
  }

  const confirmations = confirmationsData?.data || []
  const totalPages = confirmationsData?.pageCount || 1

  return (
    <div className="flex flex-col w-full h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200 flex-shrink-0">
        <div className="px-6 py-6">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="p-3 bg-blue-600 rounded-xl shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                {t('confirmations.table.title')}
              </h1>
              <p className="text-gray-600 text-base mt-1 leading-relaxed">
                {t('confirmations.table.subtitle')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white shadow-sm border-b border-gray-100 flex-shrink-0">
        <div className="px-6 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
              </svg>
              {t('confirmations.table.filters.filterByType')}
            </h3>
            
            <div className="flex flex-wrap gap-4">
              {/* Type Filter */}
              <div className="flex items-center space-x-2">
                <label className="text-sm font-semibold text-gray-700 whitespace-nowrap">{t('confirmations.table.filters.filterByType')}:</label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm font-medium shadow-sm transition-all"
                >
                  <option value="All">{t('confirmations.table.filters.all')}</option>
                  <option value="Identity Verification">{t('confirmations.table.confirmationTypes.IDENTITY_VERIFICATION')}</option>
                  <option value="Accommodation">{t('confirmations.table.confirmationTypes.ACCOMMODATION')}</option>
                  <option value="Room change">{t('confirmations.table.confirmationTypes.ROOM_CHANGE')}</option>
                  <option value="Room vacation">{t('confirmations.table.confirmationTypes.ROOM_VACATION')}</option>
                </select>
              </div>

              {/* Show Resolved Toggle */}
              <label className="inline-flex items-center cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={showResolved}
                    onChange={(e) => setShowResolved(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-12 h-6 rounded-full  shadow-inner ${
                    showResolved ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-gray-300'
                  }`}>
                    <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-lg transition-transform duration-300 ${
                      showResolved ? 'translate-x-6' : 'translate-x-0'
                    }`}></div>
                  </div>
                </div>
                <span className="ml-2 text-sm font-semibold text-gray-700">{t('confirmations.table.filters.showResolved')}</span>
              </label>

              {/* Sort Filter */}
              <div className="flex items-center space-x-2">
                <label className="text-sm font-semibold text-gray-700 whitespace-nowrap">{t('confirmations.table.filters.sortBy')}:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest')}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm font-medium shadow-sm transition-all"
                >
                  <option value="newest">{t('confirmations.table.filters.newest')}</option>
                  <option value="oldest">{t('confirmations.table.filters.oldest')}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section - Flexible to fill remaining space */}
      <div className="flex-1 p-6 overflow-auto min-h-0">
        <div className="flex flex-col h-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden relative">
          
          {/* Stats Bar */}
          <div className="bg-blue-700 px-6 py-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V9a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h2 className="text-lg font-bold text-white">Confirmation Requests</h2>
              </div>
              <span className="bg-white/20 text-white text-sm px-3 py-1 rounded-full font-semibold">
                {confirmations.length} {confirmations.length === 1 ? 'request' : 'requests'} found
              </span>
            </div>
          </div>

          {confirmations.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-center p-8">
              <div>
                <div className="text-gray-300 mb-4">
                  <svg className="mx-auto h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V9a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t('confirmations.table.emptyTitle')}</h3>
                <p className="text-gray-600 text-base max-w-md mx-auto leading-relaxed">
                  {t('confirmations.table.emptyMessage')}
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden lg:block flex-1 overflow-auto">
                <table className="w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0 z-10">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">#</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{t('confirmations.table.columns.user')}</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{t('confirmations.table.columns.type')}</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{t('confirmations.table.columns.status')}</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{t('confirmations.table.columns.submitted')}</th>
                      <th className="relative px-6 py-3"><span className="sr-only">{t('confirmations.table.columns.action')}</span></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {confirmations.map((confirmation, index) => (
                      <tr
                        key={confirmation.id}
                        className="hover:bg-blue-50 cursor-pointer  group"
                        onClick={() => handleConfirmationClick(confirmation)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                          {(page - 1) * limit + index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 shadow-sm">
                              {confirmation.requester.picture ? (
                                <img className="h-10 w-10 rounded-full object-cover border-2 border-white shadow-sm" src={confirmation.requester.picture} alt="" />
                              ) : (
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                              )}
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-gray-900">{confirmation.requester.displayName}</div>
                              <div className="text-sm text-gray-500">{confirmation.requester.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {getDisplayType(confirmation.type)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                            confirmation.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                            confirmation.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            <div className={`w-2 h-2 rounded-full mr-2 ${
                              confirmation.status === 'PENDING' ? 'bg-yellow-400' :
                              confirmation.status === 'APPROVED' ? 'bg-green-400' :
                              'bg-red-400'
                            }`}></div>
                            {confirmation.status.toLowerCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {formatDate(confirmation.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="lg:hidden flex-1 overflow-auto divide-y divide-gray-100">
                {confirmations.map((confirmation, index) => (
                  <div
                    key={confirmation.id}
                    className="p-4 hover:bg-blue-50 cursor-pointer  group"
                    onClick={() => handleConfirmationClick(confirmation)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center shadow-sm flex-shrink-0">
                          {confirmation.requester.picture ? (
                            <img className="h-12 w-12 rounded-full object-cover border-2 border-white shadow-sm" src={confirmation.requester.picture} alt="" />
                          ) : (
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-bold text-gray-900 truncate">{confirmation.requester.displayName}</h3>
                          <p className="text-sm text-gray-600 truncate">{confirmation.requester.email}</p>
                          <p className="text-sm text-gray-500 mt-1">{getDisplayType(confirmation.type)}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2 flex-shrink-0 ml-3">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold ${
                          confirmation.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                          confirmation.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {confirmation.status.toLowerCase()}
                        </span>
                        <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Request #{(page - 1) * limit + index + 1}</span>
                      <span>{formatDate(confirmation.createdAt)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-gray-50 border-t border-gray-200 flex-shrink-0">
              <div className="px-6 py-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                  <div className="text-sm text-gray-700 font-medium">
                    {t('confirmations.table.pagination.pageOf', { page: page.toString(), total: totalPages.toString() }).replace('{page}', page.toString()).replace('{total}', totalPages.toString())} ({confirmations.length} {confirmations.length === 1 ? 'result' : 'results'})
                  </div>
                  <div className="flex justify-center sm:justify-end items-center space-x-1">
                    <button
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1}
                      className="px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                      aria-label={t('confirmations.table.pagination.previous')}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
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
                          className={`px-3 py-2 text-sm font-semibold border transition-all shadow-sm ${
                            page === pageNum
                              ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
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
                      className="px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                      aria-label={t('confirmations.table.pagination.next')}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Loading Overlay */}
          {(isApproving || isRejecting) && (
            <div className="absolute inset-0 bg-white bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-20">
              <div className="flex flex-col items-center space-y-3">
                <div className="relative">
                  <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-200 border-t-blue-600"></div>
                  <div className="absolute inset-0 rounded-full bg-blue-50 opacity-20"></div>
                </div>
                <span className="text-gray-700 font-semibold text-base">Processing request...</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedConfirmation && selectedConfirmation.type === 'IDENTITY_VERIFICATION'
          && (
        <IdentityVerificationModal
          confirmation={selectedConfirmation}
          onClose={handleCloseModal}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}

      {selectedConfirmation && selectedConfirmation.type === 'PAYMENT_PROOF' && (
          <PaymentProofModal
            confirmation={selectedConfirmation}
            onClose={handleCloseModal}
            onApprove={handleApprove}
            onReject={handleReject}
          />
      )}

      {selectedConfirmation && selectedConfirmation.type === 'ACCOMMODATION'
          && (
              <AccommodationConfirmationModal
                  confirmation={selectedConfirmation}
                  onClose={handleCloseModal}
                  onApproveAccommodation={handleApproveAccommodation}
                  onReject={handleReject}
              />
          )}
    </div>
  )
}