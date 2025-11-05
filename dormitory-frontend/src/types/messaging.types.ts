export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  messageType: 'text' | 'image' | 'file';
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
  replyTo?: Message;
}

export interface ConversationParticipant {
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
}

export interface Conversation {
  id: string;
  title?: string;
  isGroup: boolean;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
  participants: ConversationParticipant[];
  lastMessage?: Message;
  unreadCount?: number;
}

export interface UserOnlineStatus {
  userId: string;
  isOnline: boolean;
  lastSeen?: Date;
}

export interface CreateConversationData {
  title?: string;
  isGroup?: boolean;
  participantIds: string[];
}

export interface SendMessageData {
  conversationId: string;
  content: string;
  messageType?: string;
  attachmentUrl?: string;
  attachmentName?: string;
  replyToId?: string;
}