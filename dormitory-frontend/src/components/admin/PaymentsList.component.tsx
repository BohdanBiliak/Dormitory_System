'use client'

import {useEffect, useState} from "react";
import {HandCoins, Search, Users, Eye, Check, X, Download, Edit, RefreshCcw} from "lucide-react";
import {useGetPayments} from "@/hooks/payment.hook";
import {Payment, PaymentStatus, PaymentMethod} from "@/types/payments.types";
import IntroducePaymentComponentDialog from "@/components/dialogs/admin/IntroducePayment.componentDialog";
import CreateBulkPaymentDialog from "@/components/dialogs/admin/CreateBulkPayment.componentDialog";
import {useUserProfile} from "@/hooks/userList.hook";
import { PaymentStatusBadge } from "@/components/ui/StatusBadge.component";
import { Button } from "@/components/ui/button";
import { paymentsApi } from "@/app/lib/payments.api";
import { toast } from "sonner";
import { api } from "@/app/lib/api.api";

export function PaymentsListPage(){

    const[payments, setPayments] = useState<Payment[]>([]);
    const[searchText, setSearchText] = useState('');
    const [page, setPage] = useState(1);
    const [searchStatus, setSearchStatus] = useState('');
    const limit = 10;

    const {data: paymentsList, isLoading: loadingPayments, error: paymentsError}  = useGetPayments({
        status: searchStatus,
        offset: (page-1)*limit,
        limit: limit,
    })

    useEffect(() => {
        console.log("HUH", searchStatus);
        if(paymentsList){
            setPayments(paymentsList);
        }
    }, [paymentsList]);

    //Introduce payment dialog
    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const [showBulkCreateDialog, setShowBulkCreateDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [editingPayment, setEditingPayment] = useState<Payment | null>(null);
    const [processingPaymentId, setProcessingPaymentId] = useState<string | null>(null);

    const handleApprovePayment = async (paymentId: string) => {
        try {
            setProcessingPaymentId(paymentId);
            await api.put(`/payments/${paymentId}/confirm`, {
                managerNotes: "Payment proof approved"
            });
            toast.success("Payment approved successfully");
            // Refresh the list
            window.location.reload();
        } catch (error: any) {
            toast.error("Failed to approve payment", {
                description: error.response?.data?.message || error.message
            });
        } finally {
            setProcessingPaymentId(null);
        }
    };

    const handleRejectPayment = async (paymentId: string) => {
        try {
            setProcessingPaymentId(paymentId);
            await api.put(`/payments/${paymentId}/reject`, {
                rejectionReason: "Payment proof rejected - please re-upload"
            });
            toast.success("Payment rejected successfully");
            // Refresh the list
            window.location.reload();
        } catch (error: any) {
            toast.error("Failed to reject payment", {
                description: error.response?.data?.message || error.message
            });
        } finally {
            setProcessingPaymentId(null);
        }
    };

    const handleRecreatePayment = async (payment: Payment) => {
        try {
            setProcessingPaymentId(payment.id);
            await paymentsApi.createPayment({
                userId: payment.userId || '',
                amount: payment.amount,
                paymentType: payment.paymentType,
                description: payment.description,
                dueDate: payment.dueDate,
                paymentMethod: payment.paymentMethod || PaymentMethod.BANK_TRANSFER,
            });
            toast.success("New payment created successfully");
            window.location.reload();
        } catch (error: any) {
            toast.error("Failed to recreate payment", {
                description: error.response?.data?.message || error.message
            });
        } finally {
            setProcessingPaymentId(null);
        }
    };

    const handleEditPayment = (payment: Payment) => {
        setEditingPayment(payment);
        setShowEditDialog(true);
    };

    const handleDownloadProof = async (paymentId: string) => {
        try {
            const blob = await paymentsApi.downloadPaymentProof(paymentId);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `payment-proof-${paymentId}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            toast.success('Payment proof downloaded');
        } catch (error) {
            toast.error('Failed to download payment proof');
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 w-full">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 shadow-sm animate-in slide-in-from-top-4 duration-500 w-full">
                <div className="w-full px-2 xs:px-4 sm:px-6 lg:px-8 py-3 xs:py-4 sm:py-6">
                    <div className="flex flex-col gap-3 xs:gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="animate-in fade-in-0 slide-in-from-left-4 duration-500">
                            <h1 className="text-xl xs:text-2xl sm:text-3xl font-bold text-slate-900 flex items-center">
                                <HandCoins className="w-5 h-5 xs:w-6 xs:h-6 sm:w-8 sm:h-8 mr-2 xs:mr-3 text-blue-600 animate-pulse" />
                                <span className="leading-tight">Payments Management</span>
                            </h1>
                            <p className="text-slate-600 mt-1 text-xs xs:text-sm sm:text-base">Manage and track all payment records</p>
                        </div>
                        <div className="animate-in fade-in-0 slide-in-from-right-4 duration-500 w-full lg:w-auto">
                            <div className="flex flex-col xs:flex-row gap-2">
                                <button 
                                    onClick={() => setShowBulkCreateDialog(true)}
                                    className="w-full lg:w-auto inline-flex items-center justify-center px-3 xs:px-4 sm:px-6 py-2.5 xs:py-3 bg-emerald-600 text-white text-xs xs:text-sm font-medium rounded-lg xs:rounded-xl hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 hover:scale-105 active:scale-95 transform hover:shadow-lg"
                                >
                                    <Users className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 mr-1.5 xs:mr-2 transition-transform duration-200 group-hover:rotate-12" />
                                    <span className="whitespace-nowrap text-xs xs:text-sm">Bulk Create</span>
                                </button>
                                <button 
                                    onClick={() => setShowCreateDialog(true)}
                                    className="w-full lg:w-auto inline-flex items-center justify-center px-3 xs:px-4 sm:px-6 py-2.5 xs:py-3 bg-blue-600 text-white text-xs xs:text-sm font-medium rounded-lg xs:rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 hover:scale-105 active:scale-95 transform hover:shadow-lg"
                                >
                                    <HandCoins className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 mr-1.5 xs:mr-2 transition-transform duration-200 group-hover:rotate-12" />
                                    <span className="whitespace-nowrap text-xs xs:text-sm">Create New Payment</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white border-b border-slate-200 shadow-sm animate-in slide-in-from-top-4 duration-500 delay-100 w-full">
                <div className="w-full px-2 xs:px-4 sm:px-6 lg:px-8 py-3 xs:py-4">
                    <div className="flex flex-col gap-3 xs:gap-4 md:flex-row md:items-center md:justify-between">
                        {/* Search */}
                        <div className="relative flex-1 w-full md:max-w-md">
                            <input
                                type="text"
                                placeholder="Search payments..."
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                className="w-full pl-8 xs:pl-10 pr-3 xs:pr-4 py-2 border border-slate-300 rounded-lg text-xs xs:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:shadow-sm"
                            />
                            <Search className="absolute left-2 xs:left-3 top-2.5 w-3 h-3 xs:w-4 xs:h-4 text-slate-400" />
                        </div>
                        
                        {/* Status Filter */}
                        <div className="flex flex-col gap-2 xs:gap-3 xs:flex-row xs:items-center">
                            <label className="text-xs xs:text-sm font-medium text-slate-700">Status:</label>
                            <select
                                value={searchStatus}
                                onChange={(e) => setSearchStatus(e.target.value)}
                                className="w-full xs:w-auto px-2 xs:px-3 py-2 border border-slate-300 rounded-lg text-xs xs:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:shadow-sm bg-white"
                            >
                                <option value="">All Statuses</option>
                                <option value="PAID">Paid</option>
                                <option value="UNPAID">Unpaid</option>
                                <option value="PENDING">Pending</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="w-full px-2 xs:px-4 sm:px-6 lg:px-8 py-4 xs:py-6 sm:py-8">
                {loadingPayments ? (
                    <div className="flex items-center justify-center py-8 xs:py-12">
                        <div className="animate-spin rounded-full h-6 w-6 xs:h-8 xs:w-8 sm:h-10 sm:w-10 border-4 border-blue-500 border-t-transparent"></div>
                        <span className="ml-3 xs:ml-4 text-slate-700 font-medium text-sm xs:text-base sm:text-lg">Loading payments...</span>
                    </div>
                ) : paymentsError ? (
                    <div className="bg-red-50 border border-red-200 rounded-lg xs:rounded-xl p-4 xs:p-6 text-center">
                        <div className="text-red-600 mb-2">
                            <HandCoins className="mx-auto h-8 w-8 xs:h-10 xs:w-10 sm:h-12 sm:w-12" />
                        </div>
                        <h3 className="text-base xs:text-lg font-semibold text-red-900 mb-2">Error Loading Payments</h3>
                        <p className="text-red-700 text-sm xs:text-base">Unable to load payment data. Please try again later.</p>
                    </div>
                ) : payments.length > 0 ? (
                    <div className="bg-white rounded-lg xs:rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
                        {/* Table Header - Hidden on mobile */}
                        <div className="hidden md:block bg-slate-50 px-3 xs:px-4 sm:px-6 py-3 xs:py-4 border-b border-slate-200">
                            <div className="grid grid-cols-5 gap-2 xs:gap-4 font-medium text-slate-700 text-sm xs:text-base">
                                <div>Status</div>
                                <div>Payer Name</div>
                                <div>Amount</div>
                                <div>Due Date</div>
                                <div className="text-right">Actions</div>
                            </div>
                        </div>
                        
                        {/* Table Body */}
                        <div className="divide-y divide-slate-200">
                            {payments.map((payment, index) => (
                                <div 
                                    key={payment.id || index}
                                    className="px-2 xs:px-4 sm:px-6 py-3 xs:py-4 hover:bg-slate-50 transition-colors duration-200 animate-in fade-in-0 slide-in-from-left-2 duration-300"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    {/* Desktop Layout */}
                                    <div className="hidden md:grid md:grid-cols-5 md:gap-2 lg:gap-4 md:items-center">
                                        {/* Status */}
                                        <div>
                                            <PaymentStatusBadge status={payment.status} size="sm" />
                                        </div>
                                        
                                        {/* Payer Name */}
                                        <div className="font-medium text-slate-900 text-sm lg:text-base">
                                            {payment.user.displayName} {payment.user.secondName}
                                        </div>
                                        
                                        {/* Amount */}
                                        <div className="font-semibold text-slate-900 text-sm lg:text-base">
                                            {`PLN ${payment.amount}` || 'N/A'}
                                        </div>
                                        
                                        {/* Due Date */}
                                        <div className="text-slate-600 text-sm lg:text-base">
                                            {payment.dueDate ? new Date(payment.dueDate).toLocaleDateString() : 'N/A'}
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-2 justify-end">
                                            {payment.status === PaymentStatus.AWAITING_CONFIRMATION && (
                                                <>
                                                    {payment.paymentProofUrl && (
                                                        <Button
                                                            variant="default"
                                                            size="sm"
                                                            onClick={() => handleDownloadProof(payment.id)}
                                                            disabled={processingPaymentId === payment.id}
                                                            className="!bg-blue-50 !text-blue-600 hover:!bg-blue-100 border border-blue-200"
                                                            title="Download proof"
                                                        >
                                                            <Download className="w-4 h-4" />
                                                        </Button>
                                                    )}
                                                    <Button
                                                        variant="default"
                                                        size="sm"
                                                        onClick={() => handleApprovePayment(payment.id)}
                                                        disabled={processingPaymentId === payment.id}
                                                        className="!bg-green-50 !text-green-600 hover:!bg-green-100 border border-green-200"
                                                        title="Approve payment"
                                                    >
                                                        <Check className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="default"
                                                        size="sm"
                                                        onClick={() => handleRejectPayment(payment.id)}
                                                        disabled={processingPaymentId === payment.id}
                                                        className="!bg-red-50 !text-red-600 hover:!bg-red-100 border border-red-200"
                                                        title="Reject payment"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </Button>
                                                </>
                                            )}
                                            {payment.status === PaymentStatus.REJECTED && (
                                                <Button
                                                    variant="default"
                                                    size="sm"
                                                    onClick={() => handleRecreatePayment(payment)}
                                                    disabled={processingPaymentId === payment.id}
                                                    className="!bg-purple-50 !text-purple-600 hover:!bg-purple-100 border border-purple-200"
                                                    title="Recreate payment"
                                                >
                                                    <RefreshCcw className="w-4 h-4" />
                                                </Button>
                                            )}
                                            {(payment.status === PaymentStatus.PENDING || payment.status === PaymentStatus.OVERDUE) && (
                                                <Button
                                                    variant="default"
                                                    size="sm"
                                                    onClick={() => handleEditPayment(payment)}
                                                    disabled={processingPaymentId === payment.id}
                                                    className="!bg-yellow-50 !text-yellow-600 hover:!bg-yellow-100 border border-yellow-200"
                                                    title="Edit payment"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Mobile Layout */}
                                    <div className="md:hidden space-y-2 xs:space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div className="font-medium text-slate-900 text-sm xs:text-base truncate flex-1 min-w-0 mr-2">
                                                {payment.user.displayName} {payment.user.secondName}
                                            </div>
                                            <PaymentStatusBadge status={payment.status} size="sm" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 xs:gap-4 text-xs xs:text-sm">
                                            <div>
                                                <span className="text-slate-500 block xs:inline">Amount: </span>
                                                <span className="font-semibold text-slate-900">{`PLN ${payment.amount}` || 'N/A'}</span>
                                            </div>
                                            <div>
                                                <span className="text-slate-500 block xs:inline">Due: </span>
                                                <span className="text-slate-600">
                                                    {payment.dueDate ? new Date(payment.dueDate).toLocaleDateString() : 'N/A'}
                                                </span>
                                            </div>
                                        </div>
                                        {/* Mobile Actions */}
                                        {(payment.status === PaymentStatus.AWAITING_CONFIRMATION || 
                                          payment.status === PaymentStatus.REJECTED || 
                                          payment.status === PaymentStatus.PENDING ||
                                          payment.status === PaymentStatus.OVERDUE) && (
                                            <div className="flex gap-2 pt-2 border-t border-slate-100">
                                                {payment.status === PaymentStatus.AWAITING_CONFIRMATION && (
                                                    <>
                                                        {payment.paymentProofUrl && (
                                                            <Button
                                                                variant="default"
                                                                size="sm"
                                                                onClick={() => handleDownloadProof(payment.id)}
                                                                disabled={processingPaymentId === payment.id}
                                                                className="!bg-blue-50 !text-blue-600 hover:!bg-blue-100 border border-blue-200 flex-1"
                                                            >
                                                                <Download className="w-4 h-4 mr-1" />
                                                                <span className="text-xs">Proof</span>
                                                            </Button>
                                                        )}
                                                        <Button
                                                            variant="default"
                                                            size="sm"
                                                            onClick={() => handleApprovePayment(payment.id)}
                                                            disabled={processingPaymentId === payment.id}
                                                            className="!bg-green-50 !text-green-600 hover:!bg-green-100 border border-green-200 flex-1"
                                                        >
                                                            <Check className="w-4 h-4 mr-1" />
                                                            <span className="text-xs">Approve</span>
                                                        </Button>
                                                        <Button
                                                            variant="default"
                                                            size="sm"
                                                            onClick={() => handleRejectPayment(payment.id)}
                                                            disabled={processingPaymentId === payment.id}
                                                            className="!bg-red-50 !text-red-600 hover:!bg-red-100 border border-red-200 flex-1"
                                                        >
                                                            <X className="w-4 h-4 mr-1" />
                                                            <span className="text-xs">Reject</span>
                                                        </Button>
                                                    </>
                                                )}
                                                {payment.status === PaymentStatus.REJECTED && (
                                                    <Button
                                                        variant="default"
                                                        size="sm"
                                                        onClick={() => handleRecreatePayment(payment)}
                                                        disabled={processingPaymentId === payment.id}
                                                        className="!bg-purple-50 !text-purple-600 hover:!bg-purple-100 border border-purple-200 w-full"
                                                    >
                                                        <RefreshCcw className="w-4 h-4 mr-1" />
                                                        <span className="text-xs">Recreate Payment</span>
                                                    </Button>
                                                )}
                                                {(payment.status === PaymentStatus.PENDING || payment.status === PaymentStatus.OVERDUE) && (
                                                    <Button
                                                        variant="default"
                                                        size="sm"
                                                        onClick={() => handleEditPayment(payment)}
                                                        disabled={processingPaymentId === payment.id}
                                                        className="!bg-yellow-50 !text-yellow-600 hover:!bg-yellow-100 border border-yellow-200 w-full"
                                                    >
                                                        <Edit className="w-4 h-4 mr-1" />
                                                        <span className="text-xs">Edit Payment</span>
                                                    </Button>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg xs:rounded-xl shadow-sm border border-slate-200 p-4 xs:p-6 sm:p-8 text-center animate-in fade-in-0 zoom-in-50 duration-500">
                        <HandCoins className="mx-auto h-10 w-10 xs:h-12 xs:w-12 sm:h-16 sm:w-16 text-slate-300 animate-pulse mb-3 xs:mb-4" />
                        <h3 className="text-base xs:text-lg sm:text-xl font-semibold text-slate-900 mb-2">No Payments Found</h3>
                        <p className="text-slate-600 mb-4 xs:mb-6 text-xs xs:text-sm sm:text-base">There are no payments matching your current filters.</p>
                        <button 
                            onClick={() => setShowCreateDialog(true)}
                            className="w-full xs:w-auto inline-flex items-center justify-center px-4 xs:px-6 py-2.5 xs:py-3 bg-blue-600 text-white text-xs xs:text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 hover:scale-105 active:scale-95 transform"
                        >
                            <HandCoins className="w-3 h-3 xs:w-4 xs:h-4 mr-1.5 xs:mr-2" />
                            Create First Payment
                        </button>
                    </div>
                )}
            </div>

            <IntroducePaymentComponentDialog open={showCreateDialog} onClose={() => setShowCreateDialog(false)} />
            <CreateBulkPaymentDialog open={showBulkCreateDialog} onClose={() => setShowBulkCreateDialog(false)} />
        </div>
    )
}