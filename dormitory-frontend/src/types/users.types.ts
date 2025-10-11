import {UserRole} from "@/types/auth.types";


export interface UserListRequest {
    role?: UserRole,
    paymentStatus?: 'Paid' | 'Awaiting' |'Overdue'|'All',
    roomFlor?: string[],
    sortBy?: 'Name'|'Id'|'Room',
    page: number,
    limit: number
}