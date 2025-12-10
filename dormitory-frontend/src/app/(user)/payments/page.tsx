'use client'

import { useState, useRef } from 'react';
import { useGetMyPayments, useGetMyPaymentStats, useUpdatePayments } from '@/hooks/payment.hook';
import { Download, Calendar, CreditCard, Clock, CheckCircle, XCircle, AlertCircle, Upload, Eye } from 'lucide-react';
import { Payment, PaymentStatus } from '@/types/payments.types';
import { paymentsApi } from '@/app/lib/payments.api';
import { toast } from 'sonner';
import { PaymentDetailsDialog } from '@/components/dialogs/PaymentDetailsDialog.component';
import { useLanguage } from '@/providers/language.provider';

export default function MyPaymentsPage() {
  const {t} = useLanguage();
  const [limit] = useState(20);
  const [offset] = useState(0);
  const [uploadingPaymentId, setUploadingPaymentId] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  
  const { data: payments, isLoading: loadingPayments, refetch } = useGetMyPayments(limit, offset);
  const { data: stats, isLoading: loadingStats } = useGetMyPaymentStats();
  const { uploadPaymentProof, uploadingProof } = useUpdatePayments();

  const handleFileSelect = (paymentId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      toast.error(t('payments.myPayments.upload.invalidFileType'));
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast.error(t('payments.myPayments.upload.fileTooLarge'));
      return;
    }

    setUploadingPaymentId(paymentId);
    uploadPaymentProof(
      { paymentId, file },
      {
        onSuccess: () => {
          setUploadingPaymentId(null);
          refetch();
        },
        onError: () => {
          setUploadingPaymentId(null);
        },
      }
    );
  };

  const handleDownloadProof = async (paymentId: string, filename?: string) => {
    try {
      const blob = await paymentsApi.downloadPaymentProof(paymentId);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename || `payment-proof-${paymentId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success(t('payments.details.downloadSuccess'));
    } catch (error) {
      console.error('Error downloading payment proof:', error);
      toast.error(t('payments.details.downloadError'));
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number, currency: string = 'PLN') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  return (
    <div className="w-full h-full overflow-auto">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{t('payments.myPayments.title')}</h1>
          <p className="text-slate-600">{t('payments.myPayments.subtitle')}</p>
        </div>

        {/* Statistics Cards */}
        {!loadingStats && stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">{t('payments.myPayments.stats.totalPayments')}</p>
                  <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
                </div>
                <CreditCard className="w-8 h-8 text-blue-600" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">{t('payments.myPayments.stats.paid')}</p>
                  <p className="text-2xl font-bold text-green-600">{stats.paid}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">{t('payments.myPayments.stats.pending')}</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">{t('payments.myPayments.stats.overdue')}</p>
                  <p className="text-2xl font-bold text-red-600">{stats.overdue}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
            </div>
          </div>
        )}

        {/* Payments List */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
          <div className="p-4 border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900">{t('payments.myPayments.history.title')}</h2>
          </div>

          {loadingPayments ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-slate-600">{t('payments.myPayments.history.loading')}</p>
            </div>
          ) : payments && payments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                      {t('payments.myPayments.table.paymentType')}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                      {t('payments.myPayments.table.amount')}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                      {t('payments.myPayments.table.dueDate')}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                      {t('payments.myPayments.table.status')}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                      {t('payments.myPayments.table.method')}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                      {t('payments.myPayments.table.actions')}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {payments.map((payment: Payment) => (
                    <tr 
                      key={payment.id} 
                      className="hover:bg-slate-50 transition-colors cursor-pointer"
                      onClick={() => {
                        setSelectedPayment(payment);
                        setShowDetailsDialog(true);
                      }}
                    >
                      <td className="px-4 py-4">
                        <div>
                          <p className="font-medium text-slate-900">
                            {payment.paymentType.replace(/_/g, ' ')}
                          </p>
                          {payment.description && (
                            <p className="text-sm text-slate-600 mt-1">{payment.description}</p>
                          )}
                          {payment.paymentProofUrl && (
                            <p className="text-xs text-blue-600 mt-1 flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              {t('payments.myPayments.table.proofUploaded')}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-semibold text-slate-900">
                          {formatCurrency(payment.amount, payment.currency)}
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-col">
                          <div className="flex items-center text-slate-600">
                            <Calendar className="w-4 h-4 mr-2" />
                            {formatDate(payment.dueDate)}
                          </div>
                          {payment.paidAt && (
                            <p className="text-xs text-green-600 mt-1">
                              {t('payments.myPayments.table.paid')}: {formatDate(payment.paidAt)}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            payment.status
                          )}`}
                        >
                          {getStatusIcon(payment.status)}
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-slate-600">
                          {payment.paymentMethod?.replace(/_/g, ' ') || 'N/A'}
                        </p>
                      </td>
                      <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => {
                              setSelectedPayment(payment);
                              setShowDetailsDialog(true);
                            }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-600 text-white rounded-md hover:bg-slate-700 transition-colors text-sm"
                          >
                            <Eye className="w-4 h-4" />
                            {t('payments.myPayments.buttons.viewDetails')}
                          </button>
                          {payment.paymentProofUrl ? (
                            <button
                              onClick={() =>
                                handleDownloadProof(payment.id, payment.paymentProofFilename || undefined)
                              }
                              className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                            >
                              <Download className="w-4 h-4" />
                              {t('payments.myPayments.buttons.download')}
                            </button>
                          ) : (
                            (payment.status === PaymentStatus.PENDING || payment.status === PaymentStatus.REJECTED) && (
                              <>
                                <input
                                  ref={(el) => {
                                    fileInputRefs.current[payment.id] = el;
                                  }}
                                  type="file"
                                  accept=".jpg,.jpeg,.png,.pdf"
                                  onChange={(e) => handleFileSelect(payment.id, e)}
                                  className="hidden"
                                  id={`file-upload-${payment.id}`}
                                />
                                <button
                                  onClick={() => fileInputRefs.current[payment.id]?.click()}
                                  disabled={uploadingPaymentId === payment.id}
                                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {uploadingPaymentId === payment.id ? (
                                    <>
                                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                      {t('payments.myPayments.buttons.uploading')}
                                    </>
                                  ) : (
                                    <>
                                      <Upload className="w-4 h-4" />
                                      {t('payments.myPayments.buttons.uploadProof')}
                                    </>
                                  )}
                                </button>
                              </>
                            )
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center">
              <CreditCard className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600 text-lg">{t('payments.myPayments.history.noPayments')}</p>
              <p className="text-slate-500 text-sm mt-2">
                {t('payments.myPayments.history.noPaymentsMessage')}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Payment Details Dialog */}
      <PaymentDetailsDialog
        payment={selectedPayment}
        isOpen={showDetailsDialog}
        onClose={() => {
          setShowDetailsDialog(false);
          setSelectedPayment(null);
        }}
      />
    </div>
  );
}
