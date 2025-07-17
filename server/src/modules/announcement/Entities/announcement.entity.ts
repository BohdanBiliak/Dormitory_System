export class AnnouncementEntity {
    id: string;
    title: string;
    content: string;
    postedAt: Date;
    expiresAt: Date;
    isHidden: boolean;
    attachments: AttachmentEntity[];
    recipients: AnnouncementRecipientEntity[];
}

export class AttachmentEntity {
    id: string;
    url: string;
    filename: string;
}

export class AnnouncementRecipientEntity {
    id: string;
    userId?: string;
    roomId?: string;
    floor?: number;
    forEveryone: boolean;
}
