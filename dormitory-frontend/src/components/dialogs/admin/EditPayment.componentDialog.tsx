'use client'

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, Description } from "@headlessui/react";
import { Payment, PaymentType, PaymentMethod } from "@/types/payments.types";
import { useState, useEffect } from "react";
import { HandCoins, X } from "lucide-react";
import { api } from "@/app/lib/api.api";
import { toast } from "sonner";

interface EditPaymentDialogProps {
    open: boolean;
    onClose: () => void;
    payment: Payment | null;
}

export default function EditPaymentDialog({ open, onClose, payment }: EditPaymentDialogProps) {
    const [editedPayment, setEditedPayment] = useState({
        amount: 0,
        description: '',
        dueDate: '',
        paymentMethod: PaymentMethod.BANK_TRANSFER
    });

    useEffect(() => {
        if (payment) {
            setEditedPayment({
                amount: payment.amount,
                description: payment.description,
                dueDate: payment.dueDate ? new Date(payment.dueDate).toISOString().split('T')[0] : '',
                paymentMethod: payment.paymentMethod || PaymentMethod.BANK_TRANSFER
            });
        }
    }, [payment]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditedPayment(prev => ({
            ...prev,
            [name]: name === 'amount' ? parseFloat(value) : value
        }));
    };

    const handleSubmit = async () => {
        if (!payment) return;

        try {
            await api.put(`/payments/${payment.id}`, editedPayment);
            toast.success('Payment updated successfully');
            onClose();
            window.location.reload();
        } catch (error: any) {
            toast.error('Failed to update payment', {
                description: error.response?.data?.message || error.message
            });
        }
    };

    const handleCancel = () => {
        onClose();
    };

    if (!payment) return null;

    return (
        <Dialog onClose={onClose} open={open} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 bg-black/60 backdrop-blur-sm " />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl animate-in zoom-in-95 fade-in-0 duration-300 slide-in-from-bottom-4 max-h-[90vh] overflow-hidden flex flex-col">
                    {/* Header */}
                    <div className="px-6 py-4 bg-yellow-600 border-b border-yellow-200 flex-shrink-0">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3 min-w-0 flex-1">
                                <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-full backdrop-blur-sm flex-shrink-0">
                                    <HandCoins className="w-5 h-5 text-white" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <DialogTitle className="text-lg font-semibold text-white truncate">
                                        Edit Payment
                                    </DialogTitle>
                                    <Description className="text-yellow-100 text-sm mt-1">
                                        Update payment details for {payment.user.displayName} {payment.user.secondName}
                                    </Description>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-100 text-white flex-shrink-0 ml-2"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6">
                        <div className="space-y-6">
                            {/* Amount */}
                            <div className="animate-in fade-in-0 slide-in-from-left-2 duration-300 delay-100">
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Amount ($)
                                </label>
                                <input
                                    type="number"
                                    name="amount"
                                    value={editedPayment.amount}
                                    onChange={handleInputChange}
                                    step="0.01"
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500  hover:shadow-sm"
                                    placeholder="Enter amount"
                                />
                            </div>

                            {/* Description */}
                            <div className="animate-in fade-in-0 slide-in-from-left-2 duration-300 delay-150">
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={editedPayment.description}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500  hover:shadow-sm resize-none"
                                    placeholder="Enter description"
                                />
                            </div>

                            {/* Due Date */}
                            <div className="animate-in fade-in-0 slide-in-from-left-2 duration-300 delay-200">
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Due Date
                                </label>
                                <input
                                    type="date"
                                    name="dueDate"
                                    value={editedPayment.dueDate}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500  hover:shadow-sm"
                                />
                            </div>

                            {/* Payment Method */}
                            <div className="animate-in fade-in-0 slide-in-from-left-2 duration-300 delay-250">
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Payment Method
                                </label>
                                <select
                                    name="paymentMethod"
                                    value={editedPayment.paymentMethod}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500  hover:shadow-sm bg-white"
                                >
                                    <option value={PaymentMethod.BANK_TRANSFER}>Bank Transfer</option>
                                    <option value={PaymentMethod.CASH_TO_MANAGER}>Cash to Manager</option>
                                    <option value={PaymentMethod.STRIPE_CARD}>Stripe Card</option>
                                    <option value={PaymentMethod.OTHER}>Other</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-end px-6 py-4 bg-slate-50 border-t border-slate-200 delay-300 flex-shrink-0">
                        <button
                            onClick={handleCancel}
                            className="px-6 py-3 bg-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2  hover:scale-105 transform"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="px-6 py-3 bg-yellow-600 text-white text-sm font-medium rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2  hover:scale-105 transform hover:shadow-lg"
                        >
                            Save Changes
                        </button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}
