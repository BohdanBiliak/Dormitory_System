'use client';

import React from 'react';
import { Conversation } from '@/types/messaging.types';
import { format, isToday, isYesterday } from 'date-fns';
import { Users, User } from 'lucide-react';

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversationId?: string;
  onSelectConversation: (conversation: Conversation) => void;
  currentUserId: string;
}

export const ConversationList: React.FC<ConversationListProps> = React.memo(({
  conversations,
  selectedConversationId,
  onSelectConversation,
  currentUserId,
}) => {
  const formatLastMessageTime = (date: Date) => {
    const messageDate = new Date(date);
    
    if (isToday(messageDate)) {
      return format(messageDate, 'HH:mm');
    } else if (isYesterday(messageDate)) {
      return 'Yesterday';
    } else {
      return format(messageDate, 'MMM dd');
    }
  };

  const getConversationTitle = (conversation: Conversation) => {
    if (conversation.title) {
      return conversation.title;
    }

    if (conversation.isGroup) {
      return `Group (${conversation.participants.length})`;
    }

    const otherParticipant = conversation.participants.find(
      p => p.userId !== currentUserId
    );
    
    return otherParticipant?.user.displayName || 'Unknown User';
  };

  const getConversationAvatar = (conversation: Conversation) => {
    if (conversation.isGroup) {
      return (
        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
          <Users className="w-6 h-6 text-white" />
        </div>
      );
    }

    const otherParticipant = conversation.participants.find(
      p => p.userId !== currentUserId
    );

    if (otherParticipant?.user.picture) {
      return (
        <img
          src={otherParticipant.user.picture}
          alt={otherParticipant.user.displayName}
          className="w-12 h-12 rounded-full object-cover"
        />
      );
    }

    return (
      <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center">
        <User className="w-6 h-6 text-white" />
      </div>
    );
  };

  const getLastMessagePreview = (conversation: Conversation) => {
    if (!conversation.lastMessage) {
      return 'No messages yet';
    }

    const { lastMessage } = conversation;
    let preview = '';

    if (lastMessage.senderId === currentUserId) {
      preview = 'You: ';
    } else if (conversation.isGroup) {
      preview = `${lastMessage.sender.displayName}: `;
    }

    switch (lastMessage.messageType) {
      case 'image':
        preview += 'Image';
        break;
      case 'file':
        preview += `${lastMessage.attachmentName}`;
        break;
      default:
        preview += lastMessage.content;
    }

    return preview;
  };

  if (conversations.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="text-center text-gray-500">
          <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>No conversations yet</p>
          <p className="text-sm">Start a new conversation to begin messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
      {conversations.map((conversation) => (
        <div
          key={conversation.id}
          onClick={() => onSelectConversation(conversation)}
          className={`flex items-center p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors ${
            selectedConversationId === conversation.id ? 'bg-blue-50 border-blue-200' : ''
          }`}
        >
          <div className="flex-shrink-0 mr-3 relative">
            {getConversationAvatar(conversation)}
            
            {conversation.unreadCount && conversation.unreadCount > 0 && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                {conversation.unreadCount > 99 ? '99+' : conversation.unreadCount}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className={`font-medium truncate ${
                conversation.unreadCount && conversation.unreadCount > 0
                  ? 'text-gray-900'
                  : 'text-gray-700'
              }`}>
                {getConversationTitle(conversation)}
              </h3>
              
              {conversation.lastMessage && (
                <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                  {formatLastMessageTime(conversation.lastMessage.createdAt)}
                </span>
              )}
            </div>

            <p className={`text-sm truncate ${
              conversation.unreadCount && conversation.unreadCount > 0
                ? 'text-gray-700 font-medium'
                : 'text-gray-500'
            }`}>
              {getLastMessagePreview(conversation)}
            </p>

            {conversation.isGroup && (
              <div className="flex items-center mt-1">
                <Users className="w-3 h-3 text-gray-400 mr-1" />
                <p className="text-xs text-gray-400">
                  {conversation.participants.length} {conversation.participants.length === 1 ? 'participant' : 'participants'}
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
});

ConversationList.displayName = 'ConversationList';