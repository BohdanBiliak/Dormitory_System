export interface Announcement{
    id: string;
    title: string;
    content: string;
    authorId: string;
    isHidden: boolean;
    postedAt: string;
    expiresAt: string;
    attachments?: Attachment[];
    recipients?: Recipient[];
}

export interface Attachment {
    id: string;
    announcementId: string;
    url: string;
    fileName: string;
}

export interface Recipient {
    id: string;
    announcementId: string;
    userId?: string;
    roomId?: string;
    floorId?: string;
    forEveryone?: boolean;
}

export interface AnnouncementCreateRequest {
    title: string;
    content: string;
    expiresAt: string;
    attachmentUrls: string[];
    forEveryone: boolean;
    userIds: string[];
    roomIds: string[];
    floorNumbers: number[];
}

export interface AnnouncementUpdateRequest {
    title?: string;
    content?: string;
    expiresAt?: string;
    attachmentUrls?: string[];
    forEveryone?: boolean;
    userIds?: string[];
    roomIds?: string[];
    floorNumbers?: number[];
}

export interface AddressesTypes {
    type: 'Regular' | 'Room' | 'Floor';
}