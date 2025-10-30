import {User} from "@/types/auth.types";

export enum PaymentType {
    'MONTHLY_RENT'='MONTHLY_RENT','SECURITY_DEPOSIT'='SECURITY_DEPOSIT', ///AND???
}

export enum Currencies {
    'USD' = 'USD','PLN'='PLN'
}

export enum PaymentMethod {
    "STRIPE_CARD"= "STRIPE_CARD", "CASH_TO_MANAGER"="CASH_TO_MANAGER", "BANK_TRANSFER"="BANK_TRANSFER", "OTHER"="OTHER"
}

export interface Payment{
    id: string;
    amount: number;
    status: string; //enum
    paymentType: PaymentType;
    description: string;
    dueDate: string;
    user: User
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