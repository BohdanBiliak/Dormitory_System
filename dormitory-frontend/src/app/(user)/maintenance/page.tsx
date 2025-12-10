'use client';

import React, { useState } from 'react';
import { 
  Wrench, 
  Plus, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Filter,
  Calendar,
  MapPin,
  MessageSquare,
  Eye,
  Loader2
} from 'lucide-react';
import { ReportMaintenanceDialog } from '@/components/signedIn/ReportMaintenanceDialog.component';
import { 
  useGetMyMaintenanceReports, 
} from '@/hooks/maintenance.hook';
import { useCurrentUserProfile } from '@/hooks/user.hook';
import {
  MaintenanceStatus,
  MaintenanceCategory,
  MaintenancePriority,
  MaintenanceReport,
} from '@/types/maintenance.types';
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
  CANCELLED: AlertCircle,
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

export default function MaintenancePage() {
  const { t } = useLanguage();
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<MaintenanceStatus | undefined>();
  const [selectedReport, setSelectedReport] = useState<MaintenanceReport | null>(null);
  const [page, setPage] = useState(1);

  const { data: user } = useCurrentUserProfile();
  const { data: reportsData, isLoading } = useGetMyMaintenanceReports({
    page,
    limit: 10,
    status: selectedStatus,
  });

  const reports = reportsData?.data || [];
  const pagination = reportsData?.pagination;

  // Calculate stats from reports
  const stats = {
    total: reports.length,
    pending: reports.filter(r => r.status === 'PENDING').length,
    inProgress: reports.filter(r => r.status === 'IN_PROGRESS').length,
    resolved: reports.filter(r => r.status === 'RESOLVED').length,
    urgent: reports.filter(r => r.priority === 'URGENT').length,
  };

  return (
    <div className="h-screen bg-slate-50 overflow-y-auto">
      <div className="px-6 py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Wrench className="w-8 h-8 mr-3 text-orange-600" />
            {t('maintenance.title')}
          </h1>
          <p className="text-gray-600 mt-1">
            {t('maintenance.dashboard.subtitle')}
          </p>
        </div>
        
        <button
          onClick={() => setShowReportDialog(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors shadow-sm font-medium"
        >
          <Plus className="w-5 h-5" />
          <span>Report Issue</span>
        </button>
      </div>

      {/* Stats Cards */}
      {reports.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Reports</p>
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
      {isLoading ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      ) : reports.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <div className="bg-orange-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <Wrench className="w-10 h-10 text-orange-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('maintenance.dashboard.empty')}</h3>
          <p className="text-gray-600 mb-6">
            {t('maintenance.dashboard.emptySubtitle')}
          </p>
          <button
            onClick={() => setShowReportDialog(true)}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors shadow-sm font-medium"
          >
            <Plus className="w-5 h-5" />
            <span>{t('maintenance.reportMaintenance')}</span>
          </button>
        </div>
      ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Report
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reports.map((report) => {
                    const StatusIcon = STATUS_ICONS[report.status];
                    return (
                      <tr key={report.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium text-gray-900">{report.title}</div>
                            <div className="text-sm text-gray-500 flex items-center mt-1">
                              <MapPin className="w-3 h-3 mr-1" />
                              {report.location}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-900">
                            {CATEGORY_LABELS[report.category]}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`text-sm font-medium ${PRIORITY_COLORS[report.priority]}`}>
                            {report.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium border ${STATUS_COLORS[report.status]}`}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {report.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(report.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                          <button
                            onClick={() => setSelectedReport(report)}
                            className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-gray-700">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === pagination.totalPages}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Report Dialog */}
      <ReportMaintenanceDialog
        isOpen={showReportDialog}
        onClose={() => setShowReportDialog(false)}
        roomId={user?.roomId}
      />

      {/* Report Details Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-orange-600 text-white p-6 rounded-t-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">Report Details</h3>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-600">Title</label>
                <p className="text-lg font-semibold text-gray-900">{selectedReport.title}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Category</label>
                  <p className="text-gray-900">{CATEGORY_LABELS[selectedReport.category]}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Priority</label>
                  <p className={`font-semibold ${PRIORITY_COLORS[selectedReport.priority]}`}>
                    {selectedReport.priority}
                  </p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Location</label>
                <p className="text-gray-900">{selectedReport.location}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Description</label>
                <p className="text-gray-900 whitespace-pre-wrap">{selectedReport.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Status</label>
                  <span className={`inline-block px-3 py-1 rounded-lg text-sm font-medium border mt-1 ${STATUS_COLORS[selectedReport.status]}`}>
                    {selectedReport.status.replace('_', ' ')}
                  </span>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Reported On</label>
                  <p className="text-gray-900">{new Date(selectedReport.createdAt).toLocaleString()}</p>
                </div>
              </div>

              {selectedReport.attachments && selectedReport.attachments.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-gray-600 mb-2 block">Attachments</label>
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

              {selectedReport.conversationId && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    <span>You have an active conversation with an admin about this issue.</span>
                  </p>
                  <a
                    href="/messaging"
                    className="mt-2 inline-block text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Go to Messages →
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
