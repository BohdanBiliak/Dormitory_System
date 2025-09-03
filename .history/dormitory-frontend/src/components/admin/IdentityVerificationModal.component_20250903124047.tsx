'use client'

import type { Confirmation } from '@/app/lib/confirmations.api'
import { useState } from 'react'

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

  const getDisplayType = (type: string) => {
    const typeMap: Record<string, string> = {
      'IDENTITY_VERIFICATION': 'Identity Verification',
      'ACCOMMODATION': 'Accommodation Request',
      'ROOM_CHANGE': 'Room Change Request',
      'ROOM_VACATION': 'Room Vacation Request'
    }
    return typeMap[type] || type
  }

  return (
    <>
      {/* Modal Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
          
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 md:px-8 md:py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    {getDisplayType(confirmation.type)}
                  </h2>
                  <p className="text-blue-100 text-sm">
                    Request #{confirmation.id.slice(-8)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 mt-3 sm:mt-0">
                <div className="text-right hidden sm:block">
                  <p className="text-blue-100 text-sm">Submitted by</p>
                  <p className="text-white font-medium">{confirmation.requester.displayName}</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Modal Content */}
          <div className="max-h-[calc(90vh-200px)] overflow-y-auto">
            <div className="p-6 md:p-8">
              
              {/* Status Banner */}
              <div className={`mb-6 p-4 rounded-lg border-l-4 ${
                confirmation.status === 'PENDING' 
                  ? 'bg-yellow-50 border-yellow-400' 
                  : confirmation.status === 'APPROVED'
                  ? 'bg-green-50 border-green-400'
                  : 'bg-red-50 border-red-400'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${
                      confirmation.status === 'PENDING' ? 'bg-yellow-400' :
                      confirmation.status === 'APPROVED' ? 'bg-green-400' : 'bg-red-400'
                    }`}></div>
                    <div>
                      <p className={`font-medium ${
                        confirmation.status === 'PENDING' ? 'text-yellow-800' :
                        confirmation.status === 'APPROVED' ? 'text-green-800' : 'text-red-800'
                      }`}>
                        Status: {confirmation.status.toLowerCase()}
                      </p>
                      <p className={`text-sm ${
                        confirmation.status === 'PENDING' ? 'text-yellow-600' :
                        confirmation.status === 'APPROVED' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {confirmation.status === 'PENDING' 
                          ? 'Awaiting review' 
                          : `Resolved on ${confirmation.resolvedAt ? formatDate(confirmation.resolvedAt) : 'Unknown date'}`
                        }
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    Submitted: {formatDate(confirmation.createdAt)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                
                {/* Documents Section */}
                <div className="xl:col-span-2 space-y-6">
                  <div className="flex items-center space-x-2 pb-3 border-b border-gray-200">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-900">Identity Documents</h3>
                  </div>
                  
                  {(confirmation.frontIdUrl || confirmation.backIdUrl) ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Front ID */}
                      {confirmation.frontIdUrl && (
                        <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-sm font-medium text-gray-700">Front Side</h4>
                            <button
                              onClick={() => setSelectedImage(confirmation.frontIdUrl)}
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                              View Full Size
                            </button>
                          </div>
                          <div className="aspect-[3/2] bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                            <img
                              src={confirmation.frontIdUrl}
                              alt="Student ID Front"
                              className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform"
                              onClick={() => setSelectedImage(confirmation.frontIdUrl)}
                            />
                          </div>
                        </div>
                      )}
                      
                      {/* Back ID */}
                      {confirmation.backIdUrl && (
                        <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-sm font-medium text-gray-700">Back Side</h4>
                            <button
                              onClick={() => setSelectedImage(confirmation.backIdUrl)}
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                              View Full Size
                            </button>
                          </div>
                          <div className="aspect-[3/2] bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                            <img
                              src={confirmation.backIdUrl}
                              alt="Student ID Back"
                              className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform"
                              onClick={() => setSelectedImage(confirmation.backIdUrl)}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">No Documents</h3>
                      <p className="text-gray-600">No ID documents were uploaded with this request</p>
                    </div>
                  )}
                </div>

                {/* Student Information */}
                <div className="xl:col-span-1">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center space-x-2 pb-3 border-b border-gray-200 mb-6">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <h3 className="text-lg font-semibold text-gray-900">Student Information</h3>
                    </div>
                    
                    {/* Profile Photo */}
                    <div className="text-center mb-6">
                      <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center overflow-hidden shadow-lg border-4 border-white">
                        {confirmation.requester.picture ? (
                          <img
                            src={confirmation.requester.picture}
                            alt="Student Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        )}
                      </div>
                    </div>

                    {/* Student Details */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                          First Name
                        </label>
                        <p className="text-sm font-medium text-gray-900 bg-white px-3 py-2 rounded-lg border">
                          {confirmation.requester.displayName}
                        </p>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                          Last Name
                        </label>
                        <p className="text-sm font-medium text-gray-900 bg-white px-3 py-2 rounded-lg border">
                          {confirmation.requester.secondName || 'Not provided'}
                        </p>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                          Email Address
                        </label>
                        <p className="text-sm font-medium text-gray-900 bg-white px-3 py-2 rounded-lg border break-all">
                          {confirmation.requester.email}
                        </p>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                          User ID
                        </label>
                        <p className="text-sm font-medium text-gray-900 bg-white px-3 py-2 rounded-lg border font-mono">
                          {confirmation.requester.id}
                        </p>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                          Submission Date
                        </label>
                        <p className="text-sm font-medium text-gray-900 bg-white px-3 py-2 rounded-lg border">
                          {formatDate(confirmation.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          {confirmation.status === 'PENDING' ? (
            <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 md:px-8">
              <div className="flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={handleReject}
                  className="w-full sm:w-auto px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Reject Request</span>
                </button>
                <button
                  onClick={handleApprove}
                  className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Approve Request</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 md:px-8 text-center">
              <div className={`inline-flex items-center px-4 py-2 rounded-lg ${
                confirmation.status === 'APPROVED' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  confirmation.status === 'APPROVED' ? 'bg-green-400' : 'bg-red-400'
                }`}></div>
                <span className="font-medium">
                  This request has been {confirmation.status.toLowerCase()}
                  {confirmation.resolvedAt && ` on ${formatDate(confirmation.resolvedAt)}`}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Full Size Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-60 p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={selectedImage}
              alt="Full size document"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  )
}