'use client';

import React, { useState } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import {
  MaintenanceCategory,
  MaintenancePriority,
  CreateMaintenanceReportRequest,
} from '@/types/maintenance.types';
import { useCreateMaintenanceReport, useUploadMaintenanceAttachments } from '@/hooks/maintenance.hook';
import { X, AlertTriangle, Wrench, Upload, Loader2, Image as ImageIcon } from 'lucide-react';

interface CreateMaintenanceReportDialogProps {
  open: boolean;
  onClose: () => void;
  userRoomId?: string;
}

export const CreateMaintenanceReportDialog: React.FC<CreateMaintenanceReportDialogProps> = ({
  open,
  onClose,
  userRoomId,
}) => {
  const [formData, setFormData] = useState<CreateMaintenanceReportRequest>({
    category: MaintenanceCategory.OTHER,
    priority: MaintenancePriority.MEDIUM,
    title: '',
    description: '',
    location: '',
    roomId: userRoomId,
    attachments: [],
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

  const createMutation = useCreateMaintenanceReport();
  const uploadMutation = useUploadMaintenanceAttachments();

  const categoryOptions = [
    { value: MaintenanceCategory.PLUMBING, label: '🚰 Plumbing', icon: '💧' },
    { value: MaintenanceCategory.ELECTRICAL, label: '⚡ Electrical', icon: '💡' },
    { value: MaintenanceCategory.HEATING, label: '🔥 Heating/Cooling', icon: '🌡️' },
    { value: MaintenanceCategory.FURNITURE, label: '🪑 Furniture', icon: '🛋️' },
    { value: MaintenanceCategory.APPLIANCES, label: '📱 Appliances', icon: '🔌' },
    { value: MaintenanceCategory.WINDOWS_DOORS, label: '🚪 Windows/Doors', icon: '🪟' },
    { value: MaintenanceCategory.CLEANING, label: '🧹 Cleaning', icon: '🧼' },
    { value: MaintenanceCategory.INTERNET, label: '📡 Internet/Network', icon: '🌐' },
    { value: MaintenanceCategory.OTHER, label: '📦 Other', icon: '🔧' },
  ];

  const priorityOptions = [
    { value: MaintenancePriority.LOW, label: 'Low', color: 'bg-green-100 text-green-800 border-green-300' },
    { value: MaintenancePriority.MEDIUM, label: 'Medium', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
    { value: MaintenancePriority.HIGH, label: 'High', color: 'bg-orange-100 text-orange-800 border-orange-300' },
    { value: MaintenancePriority.URGENT, label: 'Urgent', color: 'bg-red-100 text-red-800 border-red-300' },
  ];

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setSelectedFiles(prev => [...prev, ...files]);

    try {
      const result = await uploadMutation.mutateAsync(files);
      setUploadedUrls(prev => [...prev, ...result.urls]);
      setFormData(prev => ({ ...prev, attachments: [...(prev.attachments || []), ...result.urls] }));
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setUploadedUrls(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments?.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim() || !formData.location.trim()) {
      return;
    }

    try {
      await createMutation.mutateAsync(formData);
      onClose();
      // Reset form
      setFormData({
        category: MaintenanceCategory.OTHER,
        priority: MaintenancePriority.MEDIUM,
        title: '',
        description: '',
        location: '',
        roomId: userRoomId,
        attachments: [],
      });
      setSelectedFiles([]);
      setUploadedUrls([]);
    } catch (error) {
      console.error('Failed to create report:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto">
        <DialogPanel className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl transform transition-all my-8">
          {/* Header */}
          <div className="bg-red-600 px-6 py-5 flex items-center justify-between rounded-t-2xl">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg backdrop-blur-sm">
                <Wrench className="w-6 h-6 text-white" />
              </div>
              <DialogTitle className="text-2xl font-bold text-white drop-shadow-lg">
                Report Maintenance Issue
              </DialogTitle>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Alert Info */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-semibold mb-1">Important Information</p>
                <p>An admin will be notified immediately and a conversation will be created to discuss the issue with you.</p>
              </div>
            </div>

            {/* Category Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Issue Category *
              </label>
              <div className="grid grid-cols-3 gap-3">
                {categoryOptions.map(option => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, category: option.value }))}
                    className={`p-4 rounded-xl border-2 transition-all text-center ${
                      formData.category === option.value
                        ? 'border-red-500 bg-red-50 shadow-md scale-105'
                        : 'border-gray-200 hover:border-red-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="text-2xl mb-1">{option.icon}</div>
                    <div className="text-xs font-medium text-gray-700">{option.label.split(' ')[1]}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Priority Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Priority Level *
              </label>
              <div className="grid grid-cols-4 gap-3">
                {priorityOptions.map(option => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, priority: option.value }))}
                    className={`py-3 px-4 rounded-xl border-2 font-semibold text-sm transition-all ${
                      formData.priority === option.value
                        ? `${option.color} shadow-md scale-105`
                        : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Issue Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Broken faucet in bathroom"
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Specific Location *
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="e.g., Room 204, Bathroom sink"
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Detailed Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the issue in detail..."
                required
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Attach Photos (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-red-400 transition-colors">
                <input
                  type="file"
                  id="file-upload"
                  multiple
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center cursor-pointer"
                >
                  <div className="p-3 bg-red-100 rounded-full mb-3">
                    {uploadMutation.isPending ? (
                      <Loader2 className="w-8 h-8 text-red-600" />
                    ) : (
                      <Upload className="w-8 h-8 text-red-600" />
                    )}
                  </div>
                  <p className="text-sm font-medium text-gray-700">
                    {uploadMutation.isPending ? 'Uploading...' : 'Click to upload photos'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                </label>
              </div>

              {/* Selected Files */}
              {selectedFiles.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                        <ImageIcon className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-xs text-gray-600 mt-1 truncate">{file.name}</p>
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(index)}
                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t-2 border-gray-100">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 text-gray-700 font-semibold bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={createMutation.isPending || uploadMutation.isPending}
                className="px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center space-x-2"
              >
                {createMutation.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Wrench className="w-5 h-5" />
                    <span>Submit Report</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
