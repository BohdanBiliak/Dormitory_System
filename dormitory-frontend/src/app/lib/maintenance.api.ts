import { api } from './api.api';
import {
  MaintenanceReport,
  MaintenanceReportsResponse,
  CreateMaintenanceReportRequest,
  MaintenanceStatus,
  CreateConversationFromReportRequest,
} from '@/types/maintenance.types';

export const maintenanceApi = {
  async createReport(data: CreateMaintenanceReportRequest): Promise<MaintenanceReport> {
    const response = await api.post('/maintenance-reports', data);
    return response.data;
  },

  async getMyReports(params?: {
    page?: number;
    limit?: number;
    status?: MaintenanceStatus;
  }): Promise<MaintenanceReportsResponse> {
    const response = await api.get('/maintenance-reports/my', { params });
    return response.data;
  },

  async getAllReports(params?: {
    page?: number;
    limit?: number;
    status?: MaintenanceStatus;
  }): Promise<MaintenanceReportsResponse> {
    const response = await api.get('/maintenance-reports', { params });
    return response.data;
  },

  async getReportById(id: string): Promise<MaintenanceReport> {
    const response = await api.get(`/maintenance-reports/${id}`);
    return response.data;
  },

  async updateReportStatus(id: string, status: MaintenanceStatus): Promise<MaintenanceReport> {
    const response = await api.patch(`/maintenance-reports/${id}/status`, { status });
    return response.data;
  },

  async createConversationFromReport(
    id: string,
    data: CreateConversationFromReportRequest
  ): Promise<any> {
    const response = await api.post(`/maintenance-reports/${id}/conversation`, data);
    return response.data;
  },

  async uploadAttachments(files: File[]): Promise<{ urls: string[] }> {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });

    const response = await api.post('/maintenance-reports/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async getReportStats(): Promise<{
    total: number;
    pending: number;
    inProgress: number;
    resolved: number;
    urgent: number;
  }> {
    const response = await api.get('/maintenance-reports/stats');
    return response.data;
  },
};
