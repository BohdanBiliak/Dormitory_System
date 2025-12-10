'use client';

import React, { useState } from 'react';
import {
  Wrench,
  AlertCircle,
  Clock,
  CheckCircle,
  XCircle,
  Filter,
  MessageSquare,
  Loader2,
  Eye,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  MaintenanceStatus,
  MaintenanceCategory,
  MaintenancePriority,
  MaintenanceReport,
} from '@/types/maintenance.types';
import {
  useGetAllMaintenanceReports,
  useUpdateMaintenanceStatus,
  useCreateConversationFromReport,
  useGetMaintenanceStats,
} from '@/hooks/maintenance.hook';
import { toast } from 'sonner';
import { useLanguage } from '@/providers/language.provider';

const STATUS_COLORS: Record<MaintenanceStatus, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  IN_PROGRESS: 'bg-blue-100 text-blue-800 border-blue-300',
  RESOLVED: 'bg-green-100 text-green-800 border-green-300',
  CANCELLED: 'bg-gray-100 text-gray-800 border-gray-300',
};

const STATUS_ICONS: Record<MaintenanceStatus, any> = {
  PENDING: AlertCircle,
  IN_PROGRESS: Clock,
  RESOLVED: CheckCircle,
  CANCELLED: XCircle,
};

const PRIORITY_COLORS: Record<MaintenancePriority, string> = {
  LOW: 'text-gray-600',
  MEDIUM: 'text-blue-600',
  HIGH: 'text-orange-600',
  URGENT: 'text-red-600',
};

const CATEGORY_LABELS: Record<MaintenanceCategory, string> = {
  PLUMBING: 'Plumbing',
  ELECTRICAL: 'Electrical',
  HEATING: 'Heating',
  FURNITURE: 'Furniture',
  APPLIANCES: 'Appliances',
  WINDOWS_DOORS: 'Windows & Doors',
  CLEANING: 'Cleaning',
  INTERNET: 'Internet',
  OTHER: 'Other',
};

export const AdminMaintenanceDashboard: React.FC = () => {
  const { t } = useLanguage();
  const [selectedStatus, setSelectedStatus] = useState<MaintenanceStatus | undefined>();
  const [page, setPage] = useState(1);
  const [selectedReport, setSelectedReport] = useState<MaintenanceReport | null>(null);
  const [showConversationDialog, setShowConversationDialog] = useState(false);
  const [initialMessage, setInitialMessage] = useState('');

  const { data: reportsData, isLoading } = useGetAllMaintenanceReports({
    page,
    limit: 10,
    status: selectedStatus,
  });

  const { data: stats } = useGetMaintenanceStats();
  const updateStatusMutation = useUpdateMaintenanceStatus();
  const createConversationMutation = useCreateConversationFromReport();

  const handleStatusChange = async (reportId: string, newStatus: MaintenanceStatus) => {
    try {
      await updateStatusMutation.mutateAsync({ id: reportId, status: newStatus });
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleCreateConversation = async () => {
    if (!selectedReport) return;

    try {
      await createConversationMutation.mutateAsync({
        id: selectedReport.id,
        data: { initialMessage: initialMessage || undefined },
      });
      setShowConversationDialog(false);
      setSelectedReport(null);
      setInitialMessage('');
    } catch (error) {
      console.error('Failed to create conversation:', error);
    }
  };

  const reports = reportsData?.data || [];
  const pagination = reportsData?.pagination;

  return (
    <div className=" px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Wrench className="w-8 h-8 mr-3 text-orange-600" />
            {t('maintenance.dashboard.title')}
          </h1>
          <p className="text-gray-600 mt-1">
            {t('maintenance.dashboard.subtitle')}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t('maintenance.dashboard.stats.total', 'Total Reports')}</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Wrench className="w-10 h-10 text-gray-400" />
            </div>
          </div>

          <div className="bg-yellow-50 rounded-lg shadow-sm border border-yellow-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-700">{t('maintenance.dashboard.stats.pending')}</p>
                <p className="text-2xl font-bold text-yellow-900">{stats.pending}</p>
              </div>
              <AlertCircle className="w-10 h-10 text-yellow-500" />
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg shadow-sm border border-blue-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700">{t('maintenance.dashboard.stats.inProgress')}</p>
                <p className="text-2xl font-bold text-blue-900">{stats.inProgress}</p>
              </div>
              <Clock className="w-10 h-10 text-blue-500" />
            </div>
          </div>

          <div className="bg-green-50 rounded-lg shadow-sm border border-green-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700">{t('maintenance.dashboard.stats.resolved')}</p>
                <p className="text-2xl font-bold text-green-900">{stats.resolved}</p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
          </div>

          <div className="bg-red-50 rounded-lg shadow-sm border border-red-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-700">{t('maintenance.priorities.URGENT')}</p>
                <p className="text-2xl font-bold text-red-900">{stats.urgent}</p>
              </div>
              <AlertCircle className="w-10 h-10 text-red-500" />
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center space-x-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <div className="flex-1 flex items-center space-x-2 overflow-x-auto">
            <button
              onClick={() => setSelectedStatus(undefined)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                !selectedStatus
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t('maintenance.dashboard.all')}
            </button>
            {Object.values(MaintenanceStatus).map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  selectedStatus === status
                    ? STATUS_COLORS[status]
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t(`maintenance.statuses.${status}`)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-orange-600" />
          </div>
        ) : reports.length === 0 ? (
          <div className="text-center py-12">
            <Wrench className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">{t('maintenance.dashboard.empty')}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('maintenance.details.reportDetails', 'Report')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('maintenance.details.category')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('maintenance.details.priority')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('maintenance.details.status')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('maintenance.details.reported', 'Reported By')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('maintenance.details.reported', 'Date')}
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('maintenance.details.actions')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {reports.map((report) => {
                  const StatusIcon = STATUS_ICONS[report.status];
                  return (
                    <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="max-w-xs">
                          <p className="font-medium text-gray-900 truncate">{report.title}</p>
                          <p className="text-sm text-gray-500 truncate">{report.location}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-700">
                          {t(`maintenance.categories.${report.category}`)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-sm font-medium ${PRIORITY_COLORS[report.priority]}`}>
                          {t(`maintenance.priorities.${report.priority}`)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={report.status}
                          onChange={(e) => handleStatusChange(report.id, e.target.value as MaintenanceStatus)}
                          className={`text-sm px-3 py-1 rounded-lg border font-medium ${STATUS_COLORS[report.status]}`}
                        >
                          {Object.values(MaintenanceStatus).map((status) => (
                            <option key={status} value={status}>
                              {t(`maintenance.statuses.${status}`)}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img
                            src={report.user.picture || '/default-avatar.png'}
                            alt={report.user.displayName}
                            className="w-8 h-8 rounded-full mr-2"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {report.user.displayName}
                            </p>
                            <p className="text-xs text-gray-500">{report.user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-700">
                          {new Date(report.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(report.createdAt).toLocaleTimeString()}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => setSelectedReport(report)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View details"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          {!report.conversationId && (
                            <button
                              onClick={() => {
                                setSelectedReport(report);
                                setShowConversationDialog(true);
                              }}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Create conversation"
                            >
                              <MessageSquare className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Page {pagination.page} of {pagination.totalPages} ({pagination.total} total reports)
            </p>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === pagination.totalPages}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Report Details Modal */}
      {selectedReport && !showConversationDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-orange-600 text-white p-6 rounded-t-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">{t('maintenance.details.reportDetails')}</h3>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">{t('maintenance.details.category')}</label>
                  <p className="text-lg font-semibold text-gray-900">
                    {t(`maintenance.categories.${selectedReport.category}`)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">{t('maintenance.details.priority')}</label>
                  <p className={`text-lg font-semibold ${PRIORITY_COLORS[selectedReport.priority]}`}>
                    {t(`maintenance.priorities.${selectedReport.priority}`)}
                  </p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">{t('maintenance.fields.title')}</label>
                <p className="text-lg font-semibold text-gray-900">{selectedReport.title}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">{t('maintenance.details.location')}</label>
                <p className="text-gray-900">{selectedReport.location}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">{t('maintenance.details.description')}</label>
                <p className="text-gray-900 whitespace-pre-wrap">{selectedReport.description}</p>
              </div>

              {selectedReport.attachments && selectedReport.attachments.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-gray-600 mb-2 block">{t('maintenance.details.attachments')}</label>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedReport.attachments.map((url, index) => (
                      <a
                        key={index}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block border border-gray-200 rounded-lg overflow-hidden hover:border-orange-500 transition-colors"
                      >
                        <img src={url} alt={`Attachment ${index + 1}`} className="w-full h-auto" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                  onClick={() => setSelectedReport(null)}
                  className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
                >
                  {t('common.close')}
                </button>
                {!selectedReport.conversationId && (
                  <button
                    onClick={() => setShowConversationDialog(true)}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-medium shadow-lg flex items-center space-x-2"
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span>{t('maintenance.details.createConversation')}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Conversation Dialog */}
      {showConversationDialog && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
            <div className="bg-green-600 text-white p-6 rounded-t-xl">
              <h3 className="text-2xl font-bold">{t('maintenance.details.createConversation')}</h3>
              <p className="text-green-100 text-sm mt-1">
                {t('messaging.createConversation.initialMessage')} {selectedReport.user.displayName}
              </p>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('messaging.createConversation.initialMessage')}
                </label>
                <textarea
                  value={initialMessage}
                  onChange={(e) => setInitialMessage(e.target.value)}
                  placeholder={t('messaging.createConversation.messagePlaceholder')}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  maxLength={1000}
                />
                <p className="text-xs text-gray-500 mt-1">{initialMessage.length}/1000 characters</p>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                  onClick={() => {
                    setShowConversationDialog(false);
                    setInitialMessage('');
                  }}
                  className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
                  disabled={createConversationMutation.isPending}
                >
                  {t('common.cancel')}
                </button>
                <button
                  onClick={handleCreateConversation}
                  disabled={createConversationMutation.isPending}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-lg flex items-center space-x-2"
                >
                  {createConversationMutation.isPending ? (
                    <>
                      <Loader2 className="w-5 h-5" />
                      <span>{t('common.loading')}</span>
                    </>
                  ) : (
                    <>
                      <MessageSquare className="w-5 h-5" />
                      <span>{t('messaging.createConversation.create')}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
