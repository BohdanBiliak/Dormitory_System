import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { maintenanceApi } from '@/app/lib/maintenance.api';
import {
  CreateMaintenanceReportRequest,
  MaintenanceStatus,
  CreateConversationFromReportRequest,
} from '@/types/maintenance.types';
import { toast } from 'sonner';

export function useCreateMaintenanceReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMaintenanceReportRequest) => maintenanceApi.createReport(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenance-reports'] });
      toast.success('Maintenance report submitted successfully! An admin will contact you soon.');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to submit maintenance report');
    },
  });
}

export function useGetMyMaintenanceReports(params?: {
  page?: number;
  limit?: number;
  status?: MaintenanceStatus;
}) {
  return useQuery({
    queryKey: ['maintenance-reports', 'my', params],
    queryFn: () => maintenanceApi.getMyReports(params),
    staleTime: 30 * 1000,
  });
}

export function useGetAllMaintenanceReports(params?: {
  page?: number;
  limit?: number;
  status?: MaintenanceStatus;
}) {
  return useQuery({
    queryKey: ['maintenance-reports', 'all', params],
    queryFn: () => maintenanceApi.getAllReports(params),
    staleTime: 30 * 1000,
  });
}

export function useGetMaintenanceReport(id: string) {
  return useQuery({
    queryKey: ['maintenance-reports', id],
    queryFn: () => maintenanceApi.getReportById(id),
    enabled: !!id,
    staleTime: 30 * 1000,
  });
}

export function useUpdateMaintenanceStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: MaintenanceStatus }) =>
      maintenanceApi.updateReportStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenance-reports'] });
      toast.success('Status updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update status');
    },
  });
}

export function useCreateConversationFromReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateConversationFromReportRequest }) =>
      maintenanceApi.createConversationFromReport(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenance-reports'] });
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      toast.success('Conversation created successfully! You can now chat with the resident.');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create conversation');
    },
  });
}

export function useUploadMaintenanceAttachments() {
  return useMutation({
    mutationFn: (files: File[]) => maintenanceApi.uploadAttachments(files),
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to upload attachments');
    },
  });
}

export function useGetMaintenanceStats() {
  return useQuery({
    queryKey: ['maintenance-reports', 'stats'],
    queryFn: () => maintenanceApi.getReportStats(),
    staleTime: 60 * 1000,
  });
}
