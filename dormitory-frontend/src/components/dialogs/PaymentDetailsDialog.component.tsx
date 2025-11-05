'use client'

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { X, Calendar, CreditCard, Clock, CheckCircle, XCircle, AlertCircle, Download, FileText } from 'lucide-react';
import { Payment, PaymentStatus } from '@/types/payments.types';
import { paymentsApi } from '@/app/lib/payments.api';
import { toast } from 'sonner';

interface PaymentDetailsDialogProps {
  payment: Payment | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PaymentDetailsDialog({ payment, isOpen, onClose }: PaymentDetailsDialogProps) {
  if (!payment) return null;

  const handleDownloadProof = async () => {
    if (!payment.id) return;
    
    try {
      const blob = await paymentsApi.downloadPaymentProof(payment.id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = payment.paymentProofFilename || `payment-proof-${payment.id}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success('Payment proof downloaded successfully');
    } catch (error) {
      console.error('Error downloading payment proof:', error);
      toast.error('Failed to download payment proof');
    }
  };

  const getStatusColor = (status: PaymentStatus) => {
    switch (status) {
      case PaymentStatus.PAID:
        return 'bg-green-100 text-green-800';
      case PaymentStatus.PENDING:
        return 'bg-yellow-100 text-yellow-800';
      case PaymentStatus.AWAITING_CONFIRMATION:
        return 'bg-blue-100 text-blue-800';
      case PaymentStatus.REJECTED:
        return 'bg-red-100 text-red-800';
      case PaymentStatus.OVERDUE:
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: PaymentStatus) => {
    switch (status) {
      case PaymentStatus.PAID:
        return <CheckCircle className="w-5 h-5" />;
      case PaymentStatus.PENDING:
        return <Clock className="w-5 h-5" />;
      case PaymentStatus.AWAITING_CONFIRMATION:
        return <AlertCircle className="w-5 h-5" />;
      case PaymentStatus.REJECTED:
        return <XCircle className="w-5 h-5" />;
      case PaymentStatus.OVERDUE:
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const formatDate = (date: string | Date | null | undefined) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatAmount = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-2xl bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Payment Details
            </DialogTitle>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-4 space-y-6">
            {/* Status Badge */}
            <div className="flex items-center justify-between">
              <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${getStatusColor(payment.status)}`}>
                {getStatusIcon(payment.status)}
                <span className="font-medium capitalize">{payment.status.replace('_', ' ')}</span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  {formatAmount(payment.amount, payment.currency)}
                </div>
                <div className="text-sm text-gray-500">
                  {payment.paymentType.replace('_', ' ')}
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Payment Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Due Date</span>
                  </div>
                  <div className="text-gray-900 font-medium">
                    {formatDate(payment.dueDate)}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-gray-500">
                    <CreditCard className="w-4 h-4" />
                    <span className="text-sm">Payment Method</span>
                  </div>
                  <div className="text-gray-900 font-medium capitalize">
                    {payment.paymentMethod ? payment.paymentMethod.replace('_', ' ') : 'N/A'}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Created At</span>
                  </div>
                  <div className="text-gray-900 font-medium">
                    {formatDate(payment.createdAt)}
                  </div>
                </div>

                {payment.paidAt && (
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-gray-500">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">Paid At</span>
                    </div>
                    <div className="text-gray-900 font-medium">
                      {formatDate(payment.paidAt)}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            {payment.description && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Description</h3>
                <p className="text-gray-700 bg-gray-50 rounded-lg p-4">
                  {payment.description}
                </p>
              </div>
            )}

            {/* Payment Items */}
            {payment.paymentItems && payment.paymentItems.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Payment Items</h3>
                <div className="space-y-2">
                  {payment.paymentItems.map((item, index) => (
                    <div key={index} className="flex justify-between items-center bg-gray-50 rounded-lg p-4">
                      <div>
                        <div className="font-medium text-gray-900">{item.description}</div>
                        <div className="text-sm text-gray-500">{item.itemType.replace('_', ' ')}</div>
                      </div>
                      <div className="font-semibold text-gray-900">
                        {formatAmount(item.amount, payment.currency)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Payment Proof */}
            {payment.paymentProofUrl && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Payment Proof</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-6 h-6 text-blue-600" />
                      <div>
                        <div className="font-medium text-gray-900">
                          {payment.paymentProofFilename || 'Payment Proof'}
                        </div>
                        <div className="text-sm text-gray-500">
                          Uploaded proof document
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handleDownloadProof}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Rejection Reason */}
            {payment.status === PaymentStatus.REJECTED && payment.rejectionReason && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Rejection Reason</h3>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800">{payment.rejectionReason}</p>
                </div>
              </div>
            )}

            {/* Manager Notes */}
            {payment.managerNotes && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Manager Notes</h3>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-gray-700">{payment.managerNotes}</p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Close
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
