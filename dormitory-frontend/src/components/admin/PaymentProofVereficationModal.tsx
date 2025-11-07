'use client'

import React, { useState } from 'react'
import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react"

interface PaymentProofModalProps {
    confirmation: any
    onClose: () => void
    onApprove: (id: string) => void
    onReject: ({ id, reason }: { id: string, reason: string }) => void
}

export function PaymentProofModal({
                                      confirmation,
                                      onClose,
                                      onApprove,
                                      onReject
                                  }: PaymentProofModalProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [showRejectionMenu, setShowRejectionMenu] = useState<boolean>(false)
    const [rejectionReason, setRejectionReason] = useState<string>("")

    const handleApprove = () => {
        onApprove(confirmation.id)
    }

    const openRejectionMenu = () => {
        setShowRejectionMenu(true)
    }

    const handleReject = () => {
        onReject({ id: confirmation.id, reason: rejectionReason })
    }

    const closeRejectionMenu = () => {
        setShowRejectionMenu(false)
        setRejectionReason("")
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

    const formatCurrency = (amount: number, currency: string) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(amount)
    }

    const openImageModal = (imageUrl: string) => {
        setSelectedImage(imageUrl)
    }

    const closeImageModal = () => {
        setSelectedImage(null)
    }

    const getPaymentTypeLabel = (type: string) => {
        const types: Record<string, string> = {
            'MONTHLY_RENT': 'Monthly Rent',
            'LATE_FEE': 'Late Fee',
            'SECURITY_DEPOSIT': 'Security Deposit',
            'UTILITIES': 'Utilities',
            'DAMAGE_FEE': 'Damage Fee',
            'OTHER': 'Other'
        }
        return types[type] || type
    }

    const getPaymentMethodLabel = (method: string) => {
        const methods: Record<string, string> = {
            'BANK_TRANSFER': 'Bank Transfer',
            'CASH': 'Cash',
            'CARD': 'Card',
            'ONLINE': 'Online Payment',
            'OTHER': 'Other'
        }
        return methods[method] || method
    }

    return (
        <>
            {/* Main Modal */}
            <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden flex flex-col">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-6 border-b border-gray-200 bg-green-50">
                        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                            <div className="p-3 bg-green-600 rounded-xl shadow-lg">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Payment Proof Verification
                                </h2>
                                <p className="text-gray-600 mt-1">Review payment proof document</p>
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
                            {/* Payment Proof Image */}
                            <div className="space-y-6">
                                <div className="flex items-center space-x-3">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <h3 className="text-xl font-bold text-gray-900">Payment Proof Document</h3>
                                </div>

                                {/* Payment Proof */}
                                {confirmation.metadata?.proofUrl && (
                                    <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6 hover:border-green-300 transition-all">
                                        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                            <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            Proof of Payment
                                        </h4>
                                        <div
                                            className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg"
                                            onClick={() => openImageModal(confirmation.metadata.proofUrl)}
                                        >
                                            <img
                                                src={confirmation.metadata.proofUrl}
                                                alt="Payment Proof"
                                                className="w-full h-auto rounded-lg border border-gray-300 group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20  flex items-center justify-center">
                                                <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="mt-4 text-sm text-gray-600">
                                            <p><span className="font-semibold">Uploaded:</span> {formatDate(confirmation.metadata.uploadedAt)}</p>
                                        </div>
                                    </div>
                                )}

                                {/* No document available */}
                                {!confirmation.metadata?.proofUrl && (
                                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
                                        <svg className="mx-auto h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <h3 className="text-lg font-semibold text-gray-700 mb-2">No Document Uploaded</h3>
                                        <p className="text-gray-500">The payment proof hasn't been uploaded yet.</p>
                                    </div>
                                )}
                            </div>

                            {/* Payment Information */}
                            <div className="space-y-6">
                                {/* Student Information */}
                                <div>
                                    <div className="flex items-center space-x-3 mb-4">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <h3 className="text-xl font-bold text-gray-900">Student Information</h3>
                                    </div>

                                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                                        <div className="flex items-center space-x-4 mb-4">
                                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                                                {confirmation.requester.picture ? (
                                                    <img
                                                        src={confirmation.requester.picture}
                                                        alt="Student"
                                                        className="w-full h-full rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                )}
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-bold text-gray-900">{confirmation.requester.displayName} {confirmation.requester.secondName}</h4>
                                                <p className="text-gray-600 text-sm">{confirmation.requester.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Details */}
                                <div>
                                    <div className="flex items-center space-x-3 mb-4">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        <h3 className="text-xl font-bold text-gray-900">Payment Details</h3>
                                    </div>

                                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
                                        {/* Amount - Large and prominent */}
                                        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                                            <label className="block text-sm font-semibold text-green-700 uppercase tracking-wide mb-1">
                                                Amount
                                            </label>
                                            <p className="text-3xl font-bold text-green-900">
                                                {formatCurrency(confirmation.payment?.amount || confirmation.metadata?.amount || 0, confirmation.payment?.currency || 'PLN')}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                                                    Payment Type
                                                </label>
                                                <p className="text-base text-gray-900 font-medium">
                                                    {getPaymentTypeLabel(confirmation.payment?.paymentType || confirmation.metadata?.paymentType || 'N/A')}
                                                </p>
                                            </div>

                                            <div className="space-y-1">
                                                <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                                                    Payment Method
                                                </label>
                                                <p className="text-base text-gray-900 font-medium">
                                                    {getPaymentMethodLabel(confirmation.payment?.paymentMethod || 'N/A')}
                                                </p>
                                            </div>

                                            <div className="space-y-1">
                                                <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                                                    Due Date
                                                </label>
                                                <p className="text-base text-gray-900 font-medium">
                                                    {confirmation.payment?.dueDate ? formatDate(confirmation.payment.dueDate) : 'N/A'}
                                                </p>
                                            </div>

                                            <div className="space-y-1">
                                                <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                                                    Status
                                                </label>
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${
                                                    confirmation.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                                        confirmation.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                                                            'bg-red-100 text-red-800'
                                                }`}>
                                                    <div className={`w-2 h-2 rounded-full mr-2 ${
                                                        confirmation.status === 'PENDING' ? 'bg-yellow-500' : 
                                                            confirmation.status === 'APPROVED' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                                    {confirmation.status.toLowerCase()}
                                                </span>
                                            </div>
                                        </div>

                                        {confirmation.payment?.description && (
                                            <div className="space-y-1 pt-2 border-t border-gray-200">
                                                <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                                                    Description
                                                </label>
                                                <p className="text-base text-gray-900">
                                                    {confirmation.payment.description}
                                                </p>
                                            </div>
                                        )}

                                        {confirmation.rejectionReason && (
                                            <div className="space-y-1 pt-2 border-t border-red-200 bg-red-50 -mx-6 -mb-6 px-6 py-4 rounded-b-xl">
                                                <label className="block text-sm font-semibold text-red-700 uppercase tracking-wide">
                                                    Rejection Reason
                                                </label>
                                                <p className="text-base text-red-900 font-medium">
                                                    {confirmation.rejectionReason}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer - Only show action buttons if status is PENDING */}
                    {confirmation.status === 'PENDING' && (
                        <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 p-6 border-t border-gray-200 bg-gray-50">
                            <button
                                onClick={openRejectionMenu}
                                className="w-full sm:w-auto px-8 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Reject Payment
                            </button>
                            <button
                                onClick={handleApprove}
                                className="w-full sm:w-auto px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Approve Payment
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
                                This payment has been {confirmation.status.toLowerCase()}
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

            {/* Rejection dialog */}
            <Dialog onClose={closeRejectionMenu} open={showRejectionMenu} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/60 backdrop-blur-sm " />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel className="w-full max-w-lg bg-white rounded-2xl shadow-2xl animate-in zoom-in-95 fade-in-0 duration-300 slide-in-from-bottom-4">
                        <div className="px-6 py-4 bg-red-50 border-b border-red-200">
                            <DialogTitle className="text-lg font-semibold text-red-900">
                                Rejection reason
                            </DialogTitle>
                            <Description className="text-red-700 text-sm mt-1">
                                Provide rejection reason for {confirmation.requester.displayName} {confirmation.requester.secondName}'s payment
                            </Description>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="animate-in fade-in-0 slide-in-from-left-2 duration-300 delay-150">
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Reason for rejection
                                </label>
                                <textarea
                                    name="description"
                                    value={rejectionReason}
                                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => { setRejectionReason(event.target.value) }}
                                    rows={4}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500  hover:shadow-sm resize-none"
                                    placeholder="Enter reason for rejection..."
                                />
                            </div>
                        </div>

                        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex space-x-3 delay-250">
                            <button
                                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2  hover:scale-105 hover:shadow-lg"
                                onClick={handleReject}
                            >
                                Confirm rejection
                            </button>
                            <button
                                className="flex-1 bg-slate-200 text-slate-700 py-2 px-4 rounded-lg font-medium hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2  hover:scale-105"
                                onClick={closeRejectionMenu}
                            >
                                Cancel
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}