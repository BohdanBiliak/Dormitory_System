export enum ReportType {
  USERS = "users",
  DORMITORIES = "dormitories",
  ROOMS = "rooms",
  BOOKINGS = "bookings",
  PAYMENTS = "payments",
  MAINTENANCE = "maintenance",
  ANNOUNCEMENTS = "announcements",
  CONFIRMATIONS = "confirmations",
}

export interface GenerateReportDto {
  reportType: ReportType;
  startDate?: string;
  endDate?: string;
  dormitoryId?: string;
  status?: string;
  role?: string;
  roomId?: string;
  fields?: string[];
}

export interface ReportTypeInfo {
  value: ReportType;
  label: string;
  description: string;
  availableFilters: string[];
}

export interface ReportTypesResponse {
  reportTypes: ReportTypeInfo[];
}
