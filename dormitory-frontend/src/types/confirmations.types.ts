export interface Confirmation {
    id: string
    userId: string
    type: 'IDENTITY_VERIFICATION' | 'ACCOMMODATION' | 'ROOM_CHANGE' | 'ROOM_VACATION'
    status: 'PENDING' | 'APPROVED' | 'REJECTED'
    photo?: string
    frontIdUrl?: string
    backIdUrl?: string
    createdAt: string
    updatedAt?: string
    resolvedAt?: string
    requester: {
        id: string
        displayName: string
        email: string
        picture?: string
        secondName?: string
    }
}

export interface ConfirmationsResponse {
    data: Confirmation[]
    total: number
    page: number
    pageCount: number
}