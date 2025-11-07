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

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center">
                <Wrench className="w-8 h-8 md:w-10 md:h-10 mr-3 text-orange-600" />
                My Maintenance Reports
              </h1>
              <p className="text-gray-600 mt-2">
                Report issues and track their resolution status
              </p>
            </div>
            
            <button
              onClick={() => setShowReportDialog(true)}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all shadow-lg font-medium"
            >
              <Plus className="w-5 h-5" />
              <span>Report Issue</span>
            </button>
          </div>
        </div>

        {/* Status Filter */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center space-x-4 overflow-x-auto pb-2">
            <Filter className="w-5 h-5 text-gray-500 flex-shrink-0" />
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSelectedStatus(undefined)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  !selectedStatus
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Reports
              </button>
              {Object.values(MaintenanceStatus).map((status) => {
                const Icon = STATUS_ICONS[status];
                return (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center space-x-2 ${
                      selectedStatus === status
                        ? STATUS_COLORS[status]
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{status.replace('_', ' ')}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Reports List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-orange-600" />
          </div>
        ) : reports.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="bg-orange-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Wrench className="w-10 h-10 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Reports Yet</h3>
            <p className="text-gray-600 mb-6">
              You haven't reported any maintenance issues. <br />
              Click the "Report Issue" button to submit your first report.
            </p>
            <button
              onClick={() => setShowReportDialog(true)}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all shadow-lg font-medium"
            >
              <Plus className="w-5 h-5" />
              <span>Report Your First Issue</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reports.map((report) => {
              const StatusIcon = STATUS_ICONS[report.status];
              return (
                <div
                  key={report.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow overflow-hidden"
                >
                  {/* Card Header */}
                  <div className="bg-orange-50 px-6 py-4 border-b border-gray-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-lg mb-1">
                          {report.title}
                        </h3>
                        <p className="text-sm text-gray-600 flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {report.location}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-lg text-xs font-medium border flex items-center space-x-1 ${STATUS_COLORS[report.status]}`}>
                        <StatusIcon className="w-4 h-4" />
                        <span>{report.status.replace('_', ' ')}</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="px-6 py-4 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium text-gray-900">
                        {CATEGORY_LABELS[report.category]}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Priority:</span>
                      <span className={`font-semibold ${PRIORITY_COLORS[report.priority]}`}>
                        {report.priority}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Reported:</span>
                      <span className="font-medium text-gray-900 flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(report.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {report.resolvedAt && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Resolved:</span>
                        <span className="font-medium text-green-600 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          {new Date(report.resolvedAt).toLocaleDateString()}
                        </span>
                      </div>
                    )}

                    <div className="pt-3 border-t border-gray-100">
                      <p className="text-sm text-gray-700 line-clamp-2">
                        {report.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {report.conversationId && (
                        <span className="text-xs text-green-600 flex items-center">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Chat Active
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => setSelectedReport(report)}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Details</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center space-x-2">
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
