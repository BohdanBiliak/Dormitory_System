'use client'

import React, { useState } from 'react'
import { Confirmation } from "@/types/confirmations.types"
import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react"

interface AccommodationConfirmationModalProps {
    confirmation: Confirmation
    onClose: () => void
    onApprove: (id: string) => void
    onReject: ({id, reason}:{id:string, reason: string}) => void
   // onInformAboutTime: (id: string) => void
}

export function AccommodationConfirmationModal({
                                                   confirmation,
                                                   onClose,
                                                   onApprove,
                                                   onReject,
                                                   //onInformAboutTime
                                               }: AccommodationConfirmationModalProps) {
    const [accommodationTime, setAccommodationTime] = useState<string>("")
    const [showRejectionMenu, setShowRejectionMenu] = useState<boolean>(false)
    const [rejectionReason, setRejectionReason] = useState<string>("")

    const handleConfirm = () => {
        onApprove(confirmation.id)
    }

    const openRejectionMenu = () => {
        setShowRejectionMenu(true)
    }

    const handleReject = () => {
        onReject({id:confirmation.id, reason:rejectionReason})
        closeRejectionMenu()
    }

    const closeRejectionMenu = () => {
        setShowRejectionMenu(false)
        setRejectionReason("")
    }

    // const handleInformAboutTime = () => {
    //     onInformAboutTime(confirmation.id)
    // }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })
    }

    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            month: 'short',
            day: 'numeric'
        })
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-200 rounded-lg shadow-2xl max-w-3xl w-full overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-3 bg-gray-300 border-b border-gray-400">
                    <h2 className="text-lg font-semibold text-black">
                        Accommodation
                    </h2>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-black">
                            From: {confirmation.requester.displayName} {confirmation.requester.secondName}
                        </span>
                        <span className="text-sm text-black">
                            {formatDateTime(confirmation.createdAt)}
                        </span>
                        <button
                            onClick={onClose}
                            className="text-black hover:text-gray-600 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* User Information Box */}
                    <div className="bg-white rounded p-6 space-y-2">
                        <div className="space-y-1">
                            <p className="text-black font-mono">
                                First name: {confirmation.requester.displayName}
                            </p>
                            <p className="text-black font-mono">
                                Middle name: &lt;none&gt;
                            </p>
                            <p className="text-black font-mono">
                                Last name: {confirmation.requester.secondName || '<none>'}
                            </p>
                            <p className="text-black font-mono">
                                Email: {confirmation.requester.email}
                            </p>
                        </div>
                    </div>

                    {/* Action Buttons on Right */}
                    <div className="flex justify-end space-x-4">
                        <button className="px-6 py-2 bg-blue-800 text-white rounded hover:bg-blue-900 transition-colors flex items-center space-x-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            <span>To room page</span>
                        </button>
                        <button className="px-6 py-2 bg-gray-400 text-black rounded hover:bg-gray-500 transition-colors flex items-center space-x-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span>Create a linked conversation</span>
                        </button>
                        <button className="px-6 py-2 bg-gray-400 text-black rounded hover:bg-gray-500 transition-colors flex items-center space-x-2">
                            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                            </svg>
                            <span>User Payments</span>
                        </button>
                    </div>

                    {/* Accommodation Details */}
                    <div className="space-y-3">
                        <p className="text-black font-mono">
                            Room for accommodation: {confirmation.roomId}
                        </p>
                        {(confirmation.from && confirmation.to) && (
                            <p className="text-black font-mono">
                                Reservation dates: {formatDate(confirmation.from)} - {formatDate(confirmation.to)}
                            </p>
                        )}
                        <p className="text-black font-mono">
                            Suggested accommodation time: {confirmation.metadata?.suggestedTime || 'Not specified'}
                        </p>
                    </div>

                    {/* Time Input */}
                    <div className="space-y-2">
                        <label className="text-black font-mono block">
                            Set a time for accommodation:
                        </label>
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                value={accommodationTime}
                                onChange={(e) => setAccommodationTime(e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter accommodation time..."
                            />
                            <button className="p-2 bg-gray-300 hover:bg-gray-400 rounded transition-colors">
                                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer - Action Buttons */}
                {confirmation.status === 'PENDING' && (
                    <div className="flex justify-end space-x-3 px-6 py-4 bg-gray-200">
                        <button
                            onClick={openRejectionMenu}
                            className="px-8 py-2 bg-red-700 text-white rounded hover:bg-red-800 transition-colors font-medium"
                        >
                            Reject
                        </button>
                        {/*<button*/}
                        {/*    onClick={handleInformAboutTime}*/}
                        {/*    className="px-8 py-2 bg-gray-400 text-black rounded hover:bg-gray-500 transition-colors font-medium"*/}
                        {/*>*/}
                        {/*    Inform about suggested time*/}
                        {/*</button>*/}
                        <button
                            onClick={handleConfirm}
                            className="px-8 py-2 bg-blue-800 text-white rounded hover:bg-blue-900 transition-colors font-medium"
                        >
                            Confirm
                        </button>
                    </div>
                )}

                {/* Show resolved status */}
                {confirmation.status !== 'PENDING' && (
                    <div className="px-6 py-4 bg-gray-200 text-center">
                        <div className={`inline-flex items-center px-6 py-2 rounded text-base font-semibold ${
                            confirmation.status === 'APPROVED' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                            This confirmation has been {confirmation.status.toLowerCase()}
                            {confirmation.resolvedAt && ` on ${formatDateTime(confirmation.resolvedAt)}`}
                        </div>
                    </div>
                )}
            </div>

            {/* Rejection Dialog */}
            <Dialog onClose={closeRejectionMenu} open={showRejectionMenu} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel className="w-full max-w-lg bg-white rounded-2xl shadow-2xl animate-in zoom-in-95 fade-in-0 duration-300 slide-in-from-bottom-4">
                        <div className="px-6 py-4 bg-red-50 border-b border-red-200">
                            <DialogTitle className="text-lg font-semibold text-red-900">
                                Rejection reason
                            </DialogTitle>
                            <Description className="text-red-700 text-sm mt-1">
                                Provide rejection reason for {confirmation.requester.displayName} {confirmation.requester.secondName}
                            </Description>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="animate-in fade-in-0 slide-in-from-left-2 duration-300 delay-150">
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Reason for rejection
                                </label>
                                <input
                                    name="rejectionReason"
                                    type="text"
                                    value={rejectionReason}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setRejectionReason(event.target.value)}}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 hover:shadow-sm"
                                    placeholder="Enter reason for rejection..."
                                />
                            </div>
                        </div>

                        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex space-x-3 delay-250">
                            <button
                                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 hover:scale-105 hover:shadow-lg"
                                onClick={handleReject}
                            >
                                Confirm rejection
                            </button>
                            <button
                                className="flex-1 bg-slate-200 text-slate-700 py-2 px-4 rounded-lg font-medium hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 hover:scale-105"
                                onClick={closeRejectionMenu}
                            >
                                Cancel
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </div>
    )
}