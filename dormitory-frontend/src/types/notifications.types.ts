export enum NotificationPriority {
    LOW = 'LOW',NORMAL='NORMAL',HIGH='HIGH',URGENT='URGENT'
}

export enum NotificationType {
    ROOM_BOOKING_REQUEST = 'ROOM_BOOKING_REQUEST', ROOM_BOOKING_APPROVED = 'ROOM_BOOKING_APPROVED',
    ROOM_BOOKING_REJECTED = 'ROOM_BOOKING_REJECTED', ROOM_ASSIGNMENT_UPDATED = 'ROOM_ASSIGNMENT_UPDATED',
    ROOM_AVAILABLE = 'ROOM_AVAILABLE',
}

export enum isReadValues {
    true = 'true', false = 'false',
}

export interface Notification {
    id: string;
    type: NotificationType;
    title: string;
    message: string;
    priority: NotificationPriority;
    fromUserId: string|null;
    toUserId: string;
    roomId: string|null;
    bookingId: string|null;
    paymentId: string|null;
    isRead: boolean;
    isArchived: boolean;
    readAt: string|null;
    archivedAt: string|null;
}

export interface NotificationGetRequest {
    type?: string | null;
    isRead: isReadValues;
    startDate: string;
    endDate: string;
    priority: string;
}

export interface NotificationPostData {
    title: string;
    message: string;
    targetUserIds: string;
}