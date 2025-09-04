export interface UserListRequest {
    role?: 'Regular'|'All'|'SignedInUser',
    paymentStatus?: 'Paid' | 'Awaiting' |'Overdue'|'All',
    roomFlor?: string[],
    sortBy?: 'Name'|'Id'|'Room',
    page: number,
    limit: number
}