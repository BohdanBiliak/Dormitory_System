'use client'

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
      day: 'numeric'
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Identity Verification
          </h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              From: {confirmation.requester.displayName}
            </span>
            <span className="text-sm text-gray-500">
              {formatDate(confirmation.createdAt)}
            </span>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Student ID Images */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Student ID Document</h3>
              
              {/* Front ID */}
              {confirmation.frontIdUrl && (
                <div className="border border-gray-300 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Front Side</h4>
                  <img
                    src={confirmation.frontIdUrl}
                    alt="Student ID Front"
                    className="w-full h-auto rounded border"
                  />
                </div>
              )}
              
              {/* Back ID */}
              {confirmation.backIdUrl && (
                <div className="border border-gray-300 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Back Side</h4>
                  <img
                    src={confirmation.backIdUrl}
                    alt="Student ID Back"
                    className="w-full h-auto rounded border"
                  />
                </div>
              )}
              
              {/* No documents available */}
              {!confirmation.frontIdUrl && !confirmation.backIdUrl && (
                <div className="border border-gray-300 rounded-lg p-4 text-center text-gray-500">
                  <p>No ID documents uploaded</p>
                </div>
              )}
            </div>

            {/* Student Information */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Student Information</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    First name:
                  </label>
                  <p className="text-sm text-gray-900">{confirmation.requester.displayName}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Second name:
                  </label>
                  <p className="text-sm text-gray-900">
                    {confirmation.requester.secondName || '<none>'}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email:
                  </label>
                  <p className="text-sm text-gray-900">{confirmation.requester.email}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Photo:
                  </label>
                  <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center border">
                    {confirmation.requester.picture ? (
                      <img
                        src={confirmation.requester.picture}
                        alt="Student"
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-3xl">👤</span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Status:
                  </label>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    confirmation.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                    confirmation.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {confirmation.status.toLowerCase()}
                  </span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Request Date:
                  </label>
                  <p className="text-sm text-gray-900">{formatDate(confirmation.createdAt)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Only show action buttons if status is PENDING */}
        {confirmation.status === 'PENDING' && (
          <div className="flex justify-end space-x-4 p-6 border-t border-gray-200">
            <button
              onClick={handleReject}
              className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Reject
            </button>
            <button
              onClick={handleApprove}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Confirm
            </button>
          </div>
        )}

        {/* Show resolved status */}
        {confirmation.status !== 'PENDING' && (
          <div className="p-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              This confirmation has been {confirmation.status.toLowerCase()}
              {confirmation.resolvedAt && ` on ${formatDate(confirmation.resolvedAt)}`}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}