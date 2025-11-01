export interface MessageData {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  messageType: string;
  attachmentUrl?: string;
  attachmentName?: string;
  isEdited: boolean;
  editedAt?: Date;
  isDeleted: boolean;
  deletedAt?: Date;
  replyToId?: string;
  createdAt: Date;
  updatedAt: Date;
  sender: {
    id: string;
    displayName: string;
    picture: string;
  };
  replyTo?: MessageData;
}

export interface ConversationData {
  id: string;
  title?: string;
  isGroup: boolean;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
  participants: {
    id: string;
    userId: string;
    joinedAt: Date;
    leftAt?: Date;
    isAdmin: boolean;
    lastReadAt?: Date;
    user: {
      id: string;
      displayName: string;
      picture: string;
      email: string;
    };
  }[];
  lastMessage?: MessageData;
  unreadCount?: number;
}

export interface UserOnlineStatus {
  userId: string;
  isOnline: boolean;
  lastSeen?: Date;
}