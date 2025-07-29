import { Payment, PaymentStatus, Prisma } from "../../../../__generated__";

export interface IPaymentRepository{
    create(data: Prisma.PaymentCreateInput): Promise<Payment>;
    findById(id: string): Promise<Payment | null>;
    findByUserId(userId: string, limit?: number, offset?: number): Promise<Payment[]>;
    update(id: string, data: Prisma.PaymentUpdateInput): Promise<Payment>;
    delete(id: string): Promise<void>;

    findPendingPayments(dormitoryId?: string): Promise<Payment[]>;
    findAwaitingConfirmation(dormitoryId?: string): Promise<Payment[]>;
    findOverduePayments(): Promise<Payment[]>;
    findPaymentsByDateRange(startDate: Date, endDate: Date): Promise<Payment[]>;
    findRecurringPaymentsDue(): Promise<Payment[]>;

    updatePaymentProof(id: string, proofUrl: string, filename: string): Promise<Payment>;
    confirmPayment(id: string, confirmedBy: string, managerNotes?: string): Promise<Payment>;
    rejectPayment(id: string, rejectedBy: string, rejectionReason: string): Promise<Payment>;

    getPaymentStats(userId?: string, dormitoryId?: string): Promise<{
       total: number;
       paid: number;
       pending: number;
       overdue: number;
     }>;
};