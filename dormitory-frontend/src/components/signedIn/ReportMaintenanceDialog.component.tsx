'use client';

import React, { useState } from 'react';
import { X, Upload, AlertCircle, Wrench, Loader2 } from 'lucide-react';
import {
  MaintenanceCategory,
  MaintenancePriority,
  CreateMaintenanceReportRequest,
} from '@/types/maintenance.types';
import { useCreateMaintenanceReport, useUploadMaintenanceAttachments } from '@/hooks/maintenance.hook';
import { useLanguage } from '@/providers/language.provider';

interface ReportMaintenanceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  roomId?: string;
}

const PRIORITY_COLORS: Record<MaintenancePriority, string> = {
  LOW: 'bg-gray-100 text-gray-700 border-gray-300',
  MEDIUM: 'bg-blue-100 text-blue-700 border-blue-300',
  HIGH: 'bg-orange-100 text-orange-700 border-orange-300',
  URGENT: 'bg-red-100 text-red-700 border-red-300',
};

export const ReportMaintenanceDialog: React.FC<ReportMaintenanceDialogProps> = ({
  isOpen,
  onClose,
  roomId,
}) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<CreateMaintenanceReportRequest>({
    category: MaintenanceCategory.OTHER,
    priority: MaintenancePriority.MEDIUM,
    title: '',
    description: '',
    location: '',
    roomId,
    attachments: [],
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(false);

  const createReportMutation = useCreateMaintenanceReport();
  const uploadAttachmentsMutation = useUploadMaintenanceAttachments();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      if (files.length + selectedFiles.length > 5) {
        alert(t('maintenance.messages.maxFiles'));
        return;
      }
      setSelectedFiles([...selectedFiles, ...files]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Upload attachments first if any
      let attachmentUrls: string[] = [];
      if (selectedFiles.length > 0) {
        setUploadProgress(true);
        const uploadResult = await uploadAttachmentsMutation.mutateAsync(selectedFiles);
        attachmentUrls = uploadResult.urls;
        setUploadProgress(false);
      }

      // Create the maintenance report
      await createReportMutation.mutateAsync({
        ...formData,
        attachments: attachmentUrls,
      });

      // Reset form and close
      setFormData({
        category: MaintenanceCategory.OTHER,
        priority: MaintenancePriority.MEDIUM,
        title: '',
        description: '',
        location: '',
        roomId,
        attachments: [],
      });
      setSelectedFiles([]);
      onClose();
    } catch (error) {
      console.error('Failed to create maintenance report:', error);
    }
  };

  if (!isOpen) return null;

  const isSubmitting = createReportMutation.isPending || uploadProgress;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-orange-600 text-white p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <Wrench className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{t('maintenance.reportMaintenance')}</h2>
                <p className="text-orange-100 text-sm mt-1">
                  {t('maintenance.dashboard.subtitle')}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              disabled={isSubmitting}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Alert */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">{t('maintenance.dashboard.subtitle')}</p>
              <p>{t('maintenance.messages.reportSubmitted')}</p>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('maintenance.fields.category')} <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as MaintenanceCategory })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
            >
              {Object.keys(MaintenanceCategory).map((value) => (
                <option key={value} value={value}>
                  {t(`maintenance.categories.${value}`)}
                </option>
              ))}
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('maintenance.fields.priority')} <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.keys(MaintenancePriority).map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setFormData({ ...formData, priority: value as MaintenancePriority })}
                  className={`px-4 py-3 rounded-lg border-2 font-medium transition-all ${
                    formData.priority === value
                      ? PRIORITY_COLORS[value as MaintenancePriority]
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {t(`maintenance.priorities.${value}`)}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('maintenance.fields.title')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder={t('maintenance.fields.titlePlaceholder')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
              minLength={5}
              maxLength={200}
            />
            <p className="text-xs text-gray-500 mt-1">{formData.title.length}/200 characters</p>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('maintenance.fields.location')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder={t('maintenance.fields.locationPlaceholder')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
              minLength={3}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('maintenance.fields.description')} <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder={t('maintenance.fields.descriptionPlaceholder')}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
              required
              minLength={10}
            />
            <p className="text-xs text-gray-500 mt-1">
              Minimum 10 characters. Be as specific as possible.
            </p>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('maintenance.fields.attachments')}
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-400 transition-colors">
              <input
                type="file"
                id="file-upload"
                multiple
                accept="image/*,.pdf,.doc,.docx"
                onChange={handleFileSelect}
                className="hidden"
                disabled={selectedFiles.length >= 5}
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <Upload className="w-10 h-10 text-gray-400 mb-2" />
                <p className="text-sm font-medium text-gray-700">
                  {t('maintenance.buttons.uploadFiles')}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {t('maintenance.fields.attachmentsHelp')}
                </p>
              </label>
            </div>

            {/* File List */}
            {selectedFiles.length > 0 && (
              <div className="mt-3 space-y-2">
                {selectedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg"
                  >
                    <span className="text-sm text-gray-700 truncate flex-1">
                      {file.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium disabled:opacity-50"
            >
              {t('maintenance.buttons.cancel')}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-lg flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5" />
                  <span>{t('maintenance.submitting')}</span>
                </>
              ) : (
                <>
                  <Wrench className="w-5 h-5" />
                  <span>{t('maintenance.buttons.submit')}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
