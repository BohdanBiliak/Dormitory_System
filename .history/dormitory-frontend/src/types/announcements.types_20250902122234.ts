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
export interface AnnouncementFilters {
  showHidden?: boolean;
  showExpired?: boolean;
  page?: number;
  limit?: number;
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