import {User} from "@/types/auth.types";

export enum PaymentType {
    'MONTHLY_RENT'='MONTHLY_RENT','SECURITY_DEPOSIT'='SECURITY_DEPOSIT', ///AND???
}

export enum Currencies {
    'USD' = 'USD','PLN'='PLN'
}

export interface Payment{
    id: string;
    amount: number;
    status: string; //enum
    type: PaymentType;
    description: string;
    dueDate: string;
    user: User
}

export interface PaymentPostData {
    userId: string;
    amount: number;
    currency: Currencies; //enum?
    type: PaymentType
    description: string;
    dueDate: string;
    roomAssignmentId?: string;
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