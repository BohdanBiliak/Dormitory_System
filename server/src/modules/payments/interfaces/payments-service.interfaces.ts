import { Payment } from "@prisma/client";
import {
  CreatePaymentDto,
  PaymentFilterDto,
  UploadPaymentProofDto,
  ConfirmPaymentDto,
  RejectPaymentDto,
  CreateBulkPaymentDto,
} from "../dto/index";

// Service Interface
export interface IPaymentService {
  // Payment CRUD
  createPayment(data: CreatePaymentDto): Promise<Payment>;
  getPaymentById(id: string): Promise<Payment | null>;
  getPaymentsByUserId(
    userId: string,
    limit?: number,
    offset?: number,
  ): Promise<Payment[]>;
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

  createBulkPayments(data: CreateBulkPaymentDto): Promise<{
    payments: Payment[];
    errors?: Array<{ userId: string; error: string }>;
  }>;
  processRecurringPayments(): Promise<void>;
  createRecurringPayment(paymentId: string, frequency: string): Promise<void>;
}
