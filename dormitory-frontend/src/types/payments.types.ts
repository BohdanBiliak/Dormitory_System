import {User} from "@/types/auth.types";

export enum PaymentType {
    'MONTHLY_RENT'='MONTHLY_RENT',
    'DAILY_RENT'='DAILY_RENT',
    'SECURITY_DEPOSIT'='SECURITY_DEPOSIT',
    'UTILITIES'='UTILITIES',
    'MAINTENANCE_FEE'='MAINTENANCE_FEE',
    'LATE_FEE'='LATE_FEE',
    'CLEANING_FEE'='CLEANING_FEE',
    'OTHER'='OTHER'
}

export enum Currencies {
    'USD' = 'USD','PLN'='PLN'
}

export enum PaymentMethod {
    "STRIPE_CARD"= "STRIPE_CARD", "CASH_TO_MANAGER"="CASH_TO_MANAGER", "BANK_TRANSFER"="BANK_TRANSFER", "OTHER"="OTHER"
}

export enum PaymentStatus {
    PENDING = 'PENDING',
    PAID = 'PAID',
    AWAITING_CONFIRMATION = 'AWAITING_CONFIRMATION',
    REJECTED = 'REJECTED',
    OVERDUE = 'OVERDUE',
    CANCELLED = 'CANCELLED',
    REFUNDED = 'REFUNDED',
    FAILED = 'FAILED'
}

export interface Payment{
    id: string;
    userId?: string;
    amount: number;
    currency?: string;
    status: PaymentStatus;
    paymentType: PaymentType;
    paymentMethod?: PaymentMethod;
    description: string;
    dueDate: string;
    createdAt?: string;
    paidAt?: string;
    paymentProofUrl?: string;
    paymentProofFilename?: string;
    rejectionReason?: string;
    managerNotes?: string;
    paymentItems?: Array<{
        id: string;
        itemType: string;
        description: string;
        amount: number;
        period?: string;
    }>;
    user: {
        displayName: string;
        secondName: string;
        email: string;
        room: string|null;
    }
}

export interface PaymentPostData {
    userId: string;
    amount: number;
    paymentType: PaymentType
    description: string;
    dueDate: string;
    roomAssignmentId?: string;
    paymentMethod: PaymentMethod;
}

export interface PaymentsFilters {
    userId?: string;
    dormitoryId?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
    limit: number;
    offset: number;
}

// Bulk Payment Types
export interface BulkPaymentUser {
    userId: string;
    customAmount?: number;
    roomId?: string;
}

export interface CreateBulkPaymentDto {
    users: BulkPaymentUser[];
    baseAmount?: number;
    paymentType: PaymentType;
    paymentMethod: PaymentMethod;
    dueDate: string;
    description?: string;
    priceCategoryId?: string;
    roomIds?: string[];
    dormitoryId?: string;
    useRoomPricing?: boolean;
    periodInDays?: number;
}

export interface BulkPaymentResponse {
    payments: Payment[];
    errors?: Array<{ userId: string; error: string }>;
}