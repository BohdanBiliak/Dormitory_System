export enum MaintenancePriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

export enum MaintenanceStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  CANCELLED = 'CANCELLED',
}

export enum MaintenanceCategory {
  PLUMBING = 'PLUMBING',
  ELECTRICAL = 'ELECTRICAL',
  HEATING = 'HEATING',
  FURNITURE = 'FURNITURE',
  APPLIANCES = 'APPLIANCES',
  WINDOWS_DOORS = 'WINDOWS_DOORS',
  CLEANING = 'CLEANING',
  INTERNET = 'INTERNET',
  OTHER = 'OTHER',
}

export interface MaintenanceReport {
  id: string;
  userId: string;
  roomId?: string;
  category: MaintenanceCategory;
  priority: MaintenancePriority;
  status: MaintenanceStatus;
  title: string;
  description: string;
  location: string;
  attachments?: string[];
  conversationId?: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  user: {
    id: string;
    displayName: string;
    email: string;
    picture?: string;
  };
  room?: {
    id: string;
    number: string;
    floor?: number;
  };
}

export interface CreateMaintenanceReportRequest {
  category: MaintenanceCategory;
  priority: MaintenancePriority;
  title: string;
  description: string;
  location: string;
  roomId?: string;
  attachments?: string[];
}

export interface CreateConversationFromReportRequest {
  initialMessage?: string;
}

export interface MaintenanceReportsResponse {
  data: MaintenanceReport[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
