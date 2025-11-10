export interface Confirmation {
    id: string
    userId: string
    type: 'IDENTITY_VERIFICATION' | 'ACCOMMODATION' | 'ROOM_CHANGE' | 'ROOM_VACATION' | 'PAYMENT_PROOF'
    status: 'PENDING' | 'APPROVED' | 'REJECTED'
    photo?: string
    frontIdUrl?: string
    backIdUrl?: string
    createdAt: string
    updatedAt?: string
    resolvedAt?: string
    paymentId?: string
    roomId?: string
    from?: string
    to?: string
    metadata?: {
        suggestedTime?: string
        alternativeRooms?: boolean
    }
    requester: {
        id: string
        displayName: string
        email: string
        picture?: string
        secondName?: string
        isVerified?: boolean,
    }
}

export interface ConfirmationsResponse {
    data: Confirmation[]
    total: number
    page: number
    pageCount: number
}

export interface BookingConfirmationApproval {
    alternativeRoomId?: string,
    suggestedTime?: string,
    reason?: string,
}