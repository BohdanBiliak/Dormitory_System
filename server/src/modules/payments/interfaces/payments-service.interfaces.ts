import { Payment } from "../../../../__generated__";

// DTOs (Data Transfer Objects)
export interface CreatePaymentDto {
  userId: string;
  bookingId?: string;
  amount: number;
  paymentType: string;
  paymentMethod: string;
  dueDate: Date;
  description?: string;
  paymentItems?: CreatePaymentItemDto[];
}

export interface CreatePaymentItemDto {
  itemType: string;
  description: string;
  amount: number;
  period?: string;
}

export interface UploadPaymentProofDto {
  paymentId: string;
  userId: string;
  file: Express.Multer.File;
}

export interface ConfirmPaymentDto {
  paymentId: string;
  confirmedBy: string;
  managerNotes?: string;
}

export interface RejectPaymentDto {
  paymentId: string;
  rejectedBy: string;
  rejectionReason: string;
}

export interface PaymentFilterDto {
  userId?: string;
  dormitoryId?: string;
  status?: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
}

// Service Interface
export interface IPaymentService {
  // Payment CRUD
  createPayment(data: CreatePaymentDto): Promise<Payment>;
  getPaymentById(id: string): Promise<Payment | null>;
  getPaymentsByUserId(userId: string, limit?: number, offset?: number): Promise<Payment[]>;
  getPaymentsWithFilters(filters: PaymentFilterDto): Promise<Payment[]>;
  
  // Payment proof management
  uploadPaymentProof(data: UploadPaymentProofDto): Promise<Payment>;
  confirmPayment(data: ConfirmPaymentDto): Promise<Payment>;
  rejectPayment(data: RejectPaymentDto): Promise<Payment>;
  
  // Admin operations
  getPendingPayments(dormitoryId?: string): Promise<Payment[]>;
  getAwaitingConfirmation(dormitoryId?: string): Promise<Payment[]>;
  getOverduePayments(): Promise<Payment[]>;
  getPaymentStats(userId?: string, dormitoryId?: string): Promise<any>;
  
  // Recurring payments
  processRecurringPayments(): Promise<void>;
  createRecurringPayment(paymentId: string, frequency: string): Promise<void>;
}