import {UserRole} from "@/types/auth.types";


export interface UserListRequest {
    role?: UserRole,
    paymentStatus?: 'Paid' | 'Awaiting' |'Overdue'|'All',
    roomFlor?: string[],
    sortBy?: 'Name'|'Id'|'Room',
    page: number,
    limit: number
}

export interface UserListResponse {
    data?: User[]
    total: number,
    page: number,
    pageCount: number,
}

export interface UpdateProfileRequest {
    displayName?: string  // Changed to match DTO
    secondName?: string   // Changed to match DTO
    email?: string
    picture?: string      // Changed to match DTO
}

export interface User {
    id: string
    displayName: string
    secondName?: string
    email: string
    picture?: string
    role: string
}
