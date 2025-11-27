'use client'

import React, { useState, useEffect } from 'react'
import { BookingConfirmationApproval, Confirmation } from "@/types/confirmations.types"
import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react"
import { Room } from "@/types/rooms.types"
import { roomsApi } from "@/app/lib/rooms.api"

interface AccommodationConfirmationModalProps {
    confirmation: Confirmation
    onClose: () => void
    onApproveAccommodation: (id: string, data: BookingConfirmationApproval) => void
    onReject: ({ id, reason }: { id: string, reason: string }) => void
}

export function AccommodationConfirmationModal({
    confirmation,
    onClose,
    onApproveAccommodation,
    onReject
}: AccommodationConfirmationModalProps) {

    const [room, setRoom] = useState<Room | null>(null)
    const [showRejectionMenu, setShowRejectionMenu] = useState(false)
    const [rejectionReason, setRejectionReason] = useState("")
    const [approvalInfo, setApprovalInfo] = useState<BookingConfirmationApproval>({
        alternativeRoomId: undefined,
        suggestedTime: undefined,
        reason: undefined,
    })

    // Fetch room
    useEffect(() => {
        if (!confirmation.roomId) return
        roomsApi.getRoom(String(confirmation.roomId))
            .then(setRoom)
            .catch(err => console.error("Failed to load room", err))
    }, [confirmation.roomId])

    // Inputs
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setApprovalInfo(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleConfirm = () => onApproveAccommodation(confirmation.id, approvalInfo)
    const handleReject = () => {
        onReject({ id: confirmation.id, reason: rejectionReason })
        closeRejectionMenu()
    }

    const openRejectionMenu = () => setShowRejectionMenu(true)
    const closeRejectionMenu = () => {
        setShowRejectionMenu(false)
        setRejectionReason("")
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            day: "2-digit", month: "2-digit", year: "numeric"
        })
    }

    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleString("en-US", {
            hour: "2-digit", minute: "2-digit", month: "short", day: "numeric"
        })
    }

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.2)] max-w-3xl w-full overflow-hidden flex flex-col">

                {/* HEADER */}
                <div className="bg-gradient-to-r from-blue-700 to-blue-600 px-6 py-5 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-semibold tracking-wide">Accommodation Request</h2>
                            <p className="text-sm text-blue-100 mt-1">
                                From {confirmation.requester.displayName} {confirmation.requester.secondName} •
                                {" "}{formatDateTime(confirmation.createdAt)}
                            </p>
                        </div>

                        <button
                            onClick={onClose}
                            className="p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur transition"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* BODY */}
                <div className="p-6 space-y-8">

                    {/* Requester Info */}
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 shadow-sm">
                        <h3 className="text-gray-800 text-lg font-semibold mb-3">Requester Information</h3>

                        <div className="grid grid-cols-2 gap-y-2 text-sm">
                            <p><b>First name:</b> {confirmation.requester.displayName}</p>
                            <p><b>Middle name:</b> &lt;none&gt;</p>
                            <p><b>Last name:</b> {confirmation.requester.secondName || "<none>"}</p>
                            <p><b>Email:</b> {confirmation.requester.email}</p>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3">
                        <button className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-md flex items-center gap-2 transition">
                            To room page
                        </button>

                        <button className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 shadow flex items-center gap-2 transition">
                            Linked conversation
                        </button>

                        <button className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 shadow flex items-center gap-2 transition">
                            <svg className="w-5 h-5 text-green-500" fill="currentColor">
                                <path d="M9 16.17L4.83 12..." />
                            </svg>
                            User Payments
                        </button>
                    </div>

                    {/* Room Details */}
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 shadow-sm">
                        <h3 className="text-gray-800 text-lg font-semibold mb-3">Accommodation Details</h3>

                        <div className="space-y-1 text-sm">
                            <p><b>Room:</b> {room ? room.number : "Loading..."}</p>

                            {(confirmation.from && confirmation.to) && (
                                <p><b>Dates:</b> {formatDate(confirmation.from)} — {formatDate(confirmation.to)}</p>
                            )}

                            <p><b>Suggested time:</b> {confirmation.metadata?.suggestedTime || "Not specified"}</p>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="space-y-6">

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Set accommodation time</label>
                            <input
                                name="suggestedTime"
                                type="text"
                                value={approvalInfo.suggestedTime || ""}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition"
                                placeholder="When should the student arrive?"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Reason for time change (optional)
                            </label>
                            <input
                                name="reason"
                                type="text"
                                value={approvalInfo.reason || ""}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition"
                                placeholder="Explain why the time changed..."
                            />
                        </div>

                    </div>
                </div>

                {/* FOOTER */}
                {confirmation.status === "PENDING" ? (
                    <div className="px-6 py-4 bg-gray-100 border-t flex justify-end gap-3">

                        <button
                            onClick={openRejectionMenu}
                            className="px-8 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 shadow transition"
                        >
                            Reject
                        </button>

                        <button
                            onClick={handleConfirm}
                            className="px-8 py-2 rounded-lg bg-blue-700 text-white hover:bg-blue-800 shadow transition"
                        >
                            Confirm
                        </button>

                    </div>
                ) : (
                    <div className="px-6 py-4 bg-gray-100 text-center border-t">
                        <span className={`inline-flex items-center px-6 py-2 rounded-lg font-semibold ${confirmation.status === "APPROVED"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}>
                            This request is {confirmation.status.toLowerCase()}
                            {confirmation.resolvedAt && ` • ${formatDateTime(confirmation.resolvedAt)}`}
                        </span>
                    </div>
                )}

                {/* REJECTION MODAL */}
                <Dialog onClose={closeRejectionMenu} open={showRejectionMenu} className="relative z-50">
                    <DialogBackdrop className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <DialogPanel className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-0 overflow-hidden">

                            <div className="px-6 py-4 bg-red-50 border-b border-red-200">
                                <DialogTitle className="text-lg font-semibold text-red-900">
                                    Rejection Reason
                                </DialogTitle>
                                <Description className="text-red-700 text-sm mt-1">
                                    Provide the reason why you reject the request.
                                </Description>
                            </div>

                            <div className="p-6">
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Reason for rejection
                                </label>
                                <input
                                    name="rejectionReason"
                                    type="text"
                                    value={rejectionReason}
                                    onChange={(e) => setRejectionReason(e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500"
                                    placeholder="Enter the reason..."
                                />
                            </div>

                            <div className="px-6 py-4 bg-slate-50 border-t flex gap-3">
                                <button
                                    onClick={handleReject}
                                    className="flex-1 bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition"
                                >
                                    Confirm rejection
                                </button>

                                <button
                                    onClick={closeRejectionMenu}
                                    className="flex-1 bg-slate-200 text-slate-700 py-2 rounded-lg font-medium hover:bg-slate-300 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </Dialog>
            </div>
        </div>
    )
}
