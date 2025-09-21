'use client'

import { useState } from 'react'
import type { Confirmation } from '@/app/lib/confirmations.api'

interface IdentityVerificationModalProps {
  confirmation: Confirmation
  onClose: () => void
  onApprove: (id: string) => void
  onReject: (id: string) => void
}

export function IdentityVerificationModal({
  confirmation,
  onClose,
  onApprove,
  onReject
}: IdentityVerificationModalProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const handleApprove = () => {
    onApprove(confirmation.id)
  }

  const handleReject = () => {
    onReject(confirmation.id)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const openImageModal = (imageUrl: string) => {
    setSelectedImage(imageUrl)
  }

  const closeImageModal = () => {
    setSelectedImage(null)
  }

  return (
    <>
      {/* Main Modal */}
      <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-blue-100">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <div className="p-3 bg-blue-600 rounded-xl shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Identity Verification
                </h2>
                <p className="text-gray-600 mt-1">Review student identification documents</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="text-sm text-gray-600">
                <span className="font-semibold">From:</span> {confirmation.requester.displayName}
              </div>
              <div className="text-sm text-gray-500">
                {formatDate(confirmation.createdAt)}
              </div>
              <button
                onClick={onClose}
                className="self-end sm:self-auto p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Student ID Images */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 4V4h10v2M7 8h10m-5 8l-3 3 3 3" />
                  </svg>
                  <h3 className="text-xl font-bold text-gray-900">Student ID Documents</h3>
                </div>
                
                {/* Front ID */}
                {confirmation.frontIdUrl && (
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-all">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Front Side
                    </h4>
                    <div 
                      className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg"
                      onClick={() => openImageModal(confirmation.frontIdUrl!)}
                    >
                      <img
                        src={confirmation.frontIdUrl}
                        alt="Student ID Front"
                        className="w-full h-auto rounded-lg border border-gray-300 group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                        <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Back ID */}
                {confirmation.backIdUrl && (
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-all">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Back Side
                    </h4>
                    <div 
                      className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg"
                      onClick={() => openImageModal(confirmation.backIdUrl!)}
                    >
                      <img
                        src={confirmation.backIdUrl}
                        alt="Student ID Back"
                        className="w-full h-auto rounded-lg border border-gray-300 group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                        <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* No documents available */}
                {!confirmation.frontIdUrl && !confirmation.backIdUrl && (
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
                    <svg className="mx-auto h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">No Documents Uploaded</h3>
                    <p className="text-gray-500">The student hasn't uploaded their ID documents yet.</p>
                  </div>
                )}
              </div>

              {/* Student Information */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <h3 className="text-xl font-bold text-gray-900">Student Information</h3>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <div className="space-y-6">
                    {/* Profile Photo */}
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                        {confirmation.requester.picture ? (
                          <img
                            src={confirmation.requester.picture}
                            alt="Student"
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">{confirmation.requester.displayName}</h4>
                        <p className="text-gray-600">{confirmation.requester.email}</p>
                      </div>
                    </div>

                    {/* Information Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                          First Name
                        </label>
                        <p className="text-lg text-gray-900 font-medium">{confirmation.requester.displayName}</p>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                          Last Name
                        </label>
                        <p className="text-lg text-gray-900 font-medium">
                          {confirmation.requester.secondName || <span className="text-gray-400 italic">Not provided</span>}
                        </p>
                      </div>

                      <div className="space-y-1 sm:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                          Email Address
                        </label>
                        <p className="text-lg text-gray-900 font-medium">{confirmation.requester.email}</p>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                          Status
                        </label>
                        <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold ${
                          confirmation.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                          confirmation.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          <div className={`w-2 h-2 rounded-full mr-2 ${
                            confirmation.status === 'PENDING' ? 'bg-yellow-500' :
                            confirmation.status === 'APPROVED' ? 'bg-green-500' :
                            'bg-red-500'
                          }`}></div>
                          {confirmation.status.toLowerCase()}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                          Request Date
                        </label>
                        <p className="text-lg text-gray-900 font-medium">{formatDate(confirmation.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer - Only show action buttons if status is PENDING */}
          {confirmation.status === 'PENDING' && (
            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={handleReject}
                className="w-full sm:w-auto px-8 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Reject Request
              </button>
              <button
                onClick={handleApprove}
                className="w-full sm:w-auto px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Approve Request
              </button>
            </div>
          )}

          {/* Show resolved status */}
          {confirmation.status !== 'PENDING' && (
            <div className="p-6 border-t border-gray-200 bg-gray-50 text-center">
              <div className={`inline-flex items-center px-6 py-3 rounded-xl text-lg font-semibold ${
                confirmation.status === 'APPROVED' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                <svg className={`w-6 h-6 mr-3 ${confirmation.status === 'APPROVED' ? 'text-green-600' : 'text-red-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {confirmation.status === 'APPROVED' ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  )}
                </svg>
                This confirmation has been {confirmation.status.toLowerCase()}
                {confirmation.resolvedAt && ` on ${formatDate(confirmation.resolvedAt)}`}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Image Zoom Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-60 p-4" onClick={closeImageModal}>
          <div className="relative max-w-7xl max-h-full">
            <img
              src={selectedImage}
              alt="Enlarged view"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 p-3 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}