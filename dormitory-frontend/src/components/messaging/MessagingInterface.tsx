'use client';

import React, { useState, useEffect } from 'react';
import { Conversation, Message, CreateConversationData } from '@/types/messaging.types';
import { ConversationList } from './ConversationList';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { useSocket } from '@/hooks/messaging.hook';
import {
  useGetConversations,
  useGetConversationMessages,
  useSendMessage,
  useMarkConversationAsRead,
  useCreateConversation,
  useDeleteConversation,
  useSearchMessages,
} from '@/hooks/messaging-api.hook';
import { MessageSquare, Plus, ArrowLeft, Settings, Search, Trash2, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface MessagingInterfaceProps {
  currentUserId: string;
}

export const MessagingInterface: React.FC<MessagingInterfaceProps> = ({
  currentUserId,
}) => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [replyToMessage, setReplyToMessage] = useState<Message | null>(null);
  const [showMobileConversationList, setShowMobileConversationList] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // API hooks
  const { data: conversations = [], refetch: refetchConversations } = useGetConversations();
  const { data: messagesData, refetch: refetchMessages } = useGetConversationMessages(
    selectedConversation?.id || '',
    1
  );
  const sendMessageMutation = useSendMessage();
  const markAsReadMutation = useMarkConversationAsRead();
  const createConversationMutation = useCreateConversation();
  const deleteConversationMutation = useDeleteConversation();
  const { data: searchResults } = useSearchMessages(
    selectedConversation?.id || '',
    searchQuery
  );

  // Socket connection
  const {
    isConnected,
    sendMessage: socketSendMessage,
    createConversation: socketCreateConversation,
    joinConversation,
    leaveConversation,
    markConversationAsRead: socketMarkAsRead,
    startTyping,
    stopTyping,
  } = useSocket({
    onNewMessage: (message: Message) => {
      if (message.conversationId === selectedConversation?.id) {
        setMessages(prev => [...prev, message]);
      }
      // Refetch conversations to update last message
      refetchConversations();
    },
    onNewConversation: (conversation: Conversation) => {
      refetchConversations();
    },
    onUserOnlineStatus: (status: any) => {
      setOnlineUsers(prev => {
        const newSet = new Set(prev);
        if (status.isOnline) {
          newSet.add(status.userId);
        } else {
          newSet.delete(status.userId);
        }
        return newSet;
      });
    },
    onUserTyping: (data: any) => {
      if (data.conversationId === selectedConversation?.id) {
        setTypingUsers(prev => {
          const newSet = new Set(prev);
          if (data.isTyping && data.userId !== currentUserId) {
            newSet.add(data.userId);
          } else {
            newSet.delete(data.userId);
          }
          return newSet;
        });
      }
    },
  });

  // Update messages when conversation changes
  useEffect(() => {
    if (messagesData?.messages) {
      setMessages(messagesData.messages);
    }
  }, [messagesData]);

  // Join conversation when selected
  useEffect(() => {
    if (selectedConversation && isConnected) {
      joinConversation(selectedConversation.id);
      
      // Mark conversation as read
      markAsReadMutation.mutate(selectedConversation.id);
      socketMarkAsRead(selectedConversation.id);

      return () => {
        leaveConversation(selectedConversation.id);
      };
    }
  }, [selectedConversation?.id, isConnected]);

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setShowMobileConversationList(false);
    setReplyToMessage(null);
  };

  const handleSendMessage = (content: string, attachments?: { url: string; name: string; type: string }) => {
    if (!selectedConversation) return;

    const messageData = {
      conversationId: selectedConversation.id,
      content,
      messageType: attachments ? (attachments.type.startsWith('image/') ? 'image' : 'file') : 'text',
      attachmentUrl: attachments?.url,
      attachmentName: attachments?.name,
      replyToId: replyToMessage?.id,
    };

    // Send via Socket.IO for real-time delivery
    socketSendMessage(messageData);

    // Also send via REST API as backup
    sendMessageMutation.mutate({
      conversationId: selectedConversation.id,
      data: {
        content,
        messageType: messageData.messageType,
        attachmentUrl: messageData.attachmentUrl,
        attachmentName: messageData.attachmentName,
        replyToId: messageData.replyToId,
      },
    });

    setReplyToMessage(null);
  };

  const handleCreateConversation = async (data: CreateConversationData) => {
    console.log('Creating conversation:', data);
    
    try {
      if (isConnected) {
        console.log('Using socket to create conversation');
        socketCreateConversation(data);
      } else {
        console.log('Socket not connected, will use HTTP only');
      }
      
      console.log('Creating conversation via HTTP API');
      await createConversationMutation.mutateAsync(data);
      console.log('Conversation created successfully');
      
    } catch (error) {
      console.error('Failed to create conversation:', error);
    }
  };

  const handleDeleteConversation = async () => {
    if (!selectedConversation) return;

    try {
      await deleteConversationMutation.mutateAsync(selectedConversation.id);
      toast.success('Conversation deleted successfully');
      setSelectedConversation(null);
      setShowMobileConversationList(true);
      setShowDeleteConfirm(false);
    } catch (error: any) {
      console.error('Failed to delete conversation:', error);
      toast.error(error.response?.data?.message || 'Failed to delete conversation');
    }
  };

  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
    setSearchQuery('');
  };

  const handleBackToConversations = () => {
    setShowMobileConversationList(true);
    setSelectedConversation(null);
  };

  const getConversationHeader = () => {
    if (!selectedConversation) return null;

    const title = selectedConversation.title || 
      (selectedConversation.isGroup 
        ? `Group (${selectedConversation.participants.length})`
        : selectedConversation.participants.find(p => p.userId !== currentUserId)?.user.displayName
      );

    const isOnline = selectedConversation.isGroup 
      ? selectedConversation.participants.some(p => onlineUsers.has(p.userId) && p.userId !== currentUserId)
      : selectedConversation.participants.some(p => onlineUsers.has(p.userId) && p.userId !== currentUserId);

    return (
      <div className="border-b border-gray-200 bg-white">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <button
                onClick={handleBackToConversations}
                className="lg:hidden text-gray-600 hover:text-gray-800 flex-shrink-0"
              >
                <ArrowLeft size={20} />
              </button>
              
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-gray-900 truncate">{title}</h3>
                {!selectedConversation.isGroup && (
                  <p className="text-sm text-gray-500">
                    {isOnline ? 'Online' : 'Offline'}
                  </p>
                )}
                {selectedConversation.isGroup && (
                  <p className="text-sm text-gray-500">
                    {selectedConversation.participants.length} participants
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2 flex-shrink-0">
              <button 
                onClick={handleSearchToggle}
                className={`text-gray-600 hover:text-gray-800 p-2 rounded-lg transition-colors ${
                  showSearch ? 'bg-blue-100 text-blue-600' : ''
                }`}
                title="Search in conversation"
              >
                <Search size={18} />
              </button>
              <button 
                onClick={() => setShowDeleteConfirm(true)}
                className="text-gray-600 hover:text-red-600 p-2 rounded-lg transition-colors"
                title="Delete conversation"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {showSearch && (
            <div className="mt-3 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search messages..."
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              )}
              {searchResults && searchQuery && (
                <div className="mt-1 text-xs text-gray-500">
                  Found {searchResults.total} message{searchResults.total !== 1 ? 's' : ''}
                </div>
              )}
            </div>
          )}

          {/* Typing indicator */}
          {typingUsers.size > 0 && (
            <div className="mt-2 text-sm text-gray-500">
              {Array.from(typingUsers).map(userId => {
                const user = selectedConversation.participants.find(p => p.userId === userId);
                return user?.user.displayName;
              }).filter(Boolean).join(', ')} {typingUsers.size === 1 ? 'is' : 'are'} typing...
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen flex bg-gray-50">
      <div className={`${
        showMobileConversationList ? 'flex' : 'hidden'
      } lg:flex w-full lg:w-80 xl:w-96 bg-white border-r border-gray-200 flex-col shadow-sm`}>
        <div className="border-b border-gray-200 p-4 bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white flex items-center">
              <MessageSquare className="w-6 h-6 mr-2" />
              Messages
            </h2>
            <button
              onClick={() => {}}
              className="text-white hover:bg-blue-600 p-2 rounded-lg transition-colors"
              title="New conversation"
            >
              <Plus size={20} />
            </button>
          </div>
          
          <div className="mt-3 flex items-center">
            <div className={`w-2 h-2 rounded-full mr-2 ${isConnected ? 'bg-green-400' : 'bg-red-400'}`} />
            <span className="text-xs text-blue-100">
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          <ConversationList
            conversations={conversations}
            selectedConversationId={selectedConversation?.id}
            onSelectConversation={handleSelectConversation}
            currentUserId={currentUserId}
          />
        </div>
      </div>

      <div className={`${
        showMobileConversationList ? 'hidden' : 'flex'
      } lg:flex flex-1 flex-col bg-white`}>
        {selectedConversation ? (
          <>
            {getConversationHeader()}

            <div className="flex-1 overflow-hidden bg-gray-50">
              <MessageList
                messages={searchQuery && searchResults ? searchResults.messages : messages}
                currentUserId={currentUserId}
                onReply={setReplyToMessage}
                searchQuery={searchQuery}
              />
            </div>

            <div className="border-t border-gray-200 bg-white">
              <MessageInput
                onSendMessage={handleSendMessage}
                onStartTyping={() => selectedConversation && startTyping(selectedConversation.id)}
                onStopTyping={() => selectedConversation && stopTyping(selectedConversation.id)}
                replyTo={replyToMessage}
                onCancelReply={() => setReplyToMessage(null)}
                disabled={!isConnected}
              />
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="text-center text-gray-500 p-8">
              <div className="bg-blue-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-700">No conversation selected</h3>
              <p className="text-gray-600 max-w-sm">
                Choose a conversation from the sidebar to start messaging with your dormitory community
              </p>
            </div>
          </div>
        )}
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 transform transition-all">
            <div className="flex items-center mb-4">
              <div className="bg-red-100 rounded-full p-3 mr-4">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Delete Conversation</h3>
            </div>
            
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this conversation? This action cannot be undone and all messages will be permanently removed.
            </p>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConversation}
                disabled={deleteConversationMutation.isPending}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium shadow-sm"
              >
                {deleteConversationMutation.isPending ? (
                  <span className="flex items-center">
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Deleting...
                  </span>
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};