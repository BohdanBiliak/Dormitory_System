'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Conversation } from '@/types/messaging.types';
import { format, isToday, isYesterday } from 'date-fns';
import { Users, User, CheckCheck, MoreVertical, Trash2, AlertTriangle } from 'lucide-react';

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversationId?: string;
  onSelectConversation: (conversation: Conversation) => void;
  onDeleteConversation?: (conversationId: string) => void;
  currentUserId: string;
}

export const ConversationList: React.FC<ConversationListProps> = React.memo(({
  conversations,
  selectedConversationId,
  onSelectConversation,
  onDeleteConversation,
  currentUserId,
}) => {
  const [showActionsMenu, setShowActionsMenu] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowActionsMenu(null);
      }
    };

    if (showActionsMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showActionsMenu]);
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

  const handleDeleteConversation = (conversationId: string) => {
    if (onDeleteConversation) {
      onDeleteConversation(conversationId);
      setShowDeleteConfirm(null);
      setShowActionsMenu(null);
    }
  };

  const handleActionsClick = (e: React.MouseEvent, conversationId: string) => {
    e.stopPropagation();
    setShowActionsMenu(showActionsMenu === conversationId ? null : conversationId);
  };

  const handleDeleteClick = (e: React.MouseEvent, conversationId: string) => {
    e.stopPropagation();
    setShowDeleteConfirm(conversationId);
    setShowActionsMenu(null);
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
    <>
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => onSelectConversation(conversation)}
            className={`flex items-center p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-all duration-200 hover:shadow-sm relative group ${
              selectedConversationId === conversation.id 
                ? 'bg-blue-50 border-blue-200 shadow-sm' 
                : 'hover:border-gray-200'
            }`}
          >
            <div className="flex-shrink-0 mr-3 relative">
              {getConversationAvatar(conversation)}
              
                          
            {!conversation.isGroup && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              )}
              
              {conversation.unreadCount && conversation.unreadCount > 0 && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center font-semibold shadow-sm animate-pulse">
                  {conversation.unreadCount > 99 ? '99+' : conversation.unreadCount}
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className={`font-semibold truncate ${
                  conversation.unreadCount && conversation.unreadCount > 0
                    ? 'text-gray-900'
                    : 'text-gray-700'
                }`}>
                  {getConversationTitle(conversation)}
                </h3>
                
                <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
                  {conversation.lastMessage && (
                    <span className={`text-xs ${
                      conversation.unreadCount && conversation.unreadCount > 0
                        ? 'text-gray-600 font-medium'
                        : 'text-gray-500'
                    }`}>
                      {formatLastMessageTime(conversation.lastMessage.createdAt)}
                    </span>
                  )}
                
                {conversation.lastMessage && conversation.lastMessage.senderId === currentUserId && (
                  <div className="text-gray-400">
                    <CheckCheck size={14} className="text-blue-500" />
                  </div>
                )}

                {onDeleteConversation && (
                    <div className="relative" ref={showActionsMenu === conversation.id ? menuRef : null}>
                      <button
                        onClick={(e) => handleActionsClick(e, conversation.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded-full hover:bg-gray-200 transition-all duration-200"
                        title="More actions"
                      >
                        <MoreVertical size={16} className="text-gray-500" />
                      </button>

                      {showActionsMenu === conversation.id && (
                        <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1 min-w-[120px]">
                          <button
                            onClick={(e) => handleDeleteClick(e, conversation.id)}
                            className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                          >
                            <Trash2 size={14} />
                            <span>Delete</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <p className={`text-sm truncate ${
                conversation.unreadCount && conversation.unreadCount > 0
                  ? 'text-gray-700 font-medium'
                  : 'text-gray-500'
              }`}>
                {getLastMessagePreview(conversation)}
              </p>

              {conversation.isGroup && conversation.participants.length > 0 && (
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

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 transform transition-all animate-in zoom-in-95 duration-200">
            <div className="flex items-center mb-4">
              <div className="bg-red-100 rounded-full p-3 mr-4">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Delete Conversation</h3>
            </div>
            
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this conversation? This action cannot be undone and all messages will be permanently removed.
            </p>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDeleteConfirm(null);
                  setShowActionsMenu(null);
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteConversation(showDeleteConfirm)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

ConversationList.displayName = 'ConversationList';