'use client';

import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
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
  useEditMessage,
  useDeleteMessage,
} from '@/hooks/messaging-api.hook';
import { MessageSquare, Plus, ArrowLeft, Settings, Search, Trash2, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { CreateConversationModal } from './CreateConversationModal';
import { useLanguage } from '@/providers/language.provider';

interface MessagingInterfaceProps {
  currentUserId: string;
}

export const MessagingInterface = memo<MessagingInterfaceProps>(({
  currentUserId,
}) => {
  const { t } = useLanguage();
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [replyToMessage, setReplyToMessage] = useState<Message | null>(null);
  const [showMobileConversationList, setShowMobileConversationList] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  // API hooks - only enabled when we have a current user
  const { data: conversations = [], refetch: refetchConversations, isError: conversationsError } = useGetConversations();
  const { data: messagesData, refetch: refetchMessages, isError: messagesError } = useGetConversationMessages(
    selectedConversation?.id || '',
    1,
    !!currentUserId && !!selectedConversation?.id // Only fetch when authenticated and conversation is selected
  );
  const sendMessageMutation = useSendMessage();
  const markAsReadMutation = useMarkConversationAsRead();
  const createConversationMutation = useCreateConversation();
  const deleteConversationMutation = useDeleteConversation();
  const editMessageMutation = useEditMessage();
  const deleteMessageMutation = useDeleteMessage();
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
      // Only add message if it's for the currently selected conversation
      if (message.conversationId === selectedConversation?.id) {
        setMessages(prev => {
          // Check if message already exists to prevent duplicates
          const exists = prev.some(m => m.id === message.id);
          if (!exists) {
            return [...prev, message];
          }
          return prev;
        });
      }
      // Refetch conversations list to update last message and unread counts
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

  useEffect(() => {
    if (messagesData?.messages && selectedConversation) {
      setMessages(messagesData.messages);
    } else if (!selectedConversation) {
      setMessages([]);
    }
  }, [messagesData, selectedConversation]);

  useEffect(() => {
    if (conversationsError || messagesError) {
      if (!isConnected) {
        setMessages([]);
        setSelectedConversation(null);
      }
    }
  }, [conversationsError, messagesError, isConnected]);

  useEffect(() => {
    if (selectedConversation && isConnected && currentUserId) {
      joinConversation(selectedConversation.id);
      markAsReadMutation.mutate(selectedConversation.id);
      socketMarkAsRead(selectedConversation.id);
      
      refetchMessages();

      return () => {
        leaveConversation(selectedConversation.id);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedConversation?.id, isConnected, currentUserId]);

  const handleSelectConversation = useCallback((conversation: Conversation) => {
    setSelectedConversation(conversation);
    setShowMobileConversationList(false);
    setReplyToMessage(null);
    setSearchQuery('');
    setShowSearch(false);
  }, []);

  const handleSendMessage = useCallback(async (content: string, attachments?: { url: string; name: string; type: string }) => {
    if (!selectedConversation || isSendingMessage) return;

    setIsSendingMessage(true);

    const messageData = {
      conversationId: selectedConversation.id,
      content,
      messageType: attachments ? (attachments.type.startsWith('image/') ? 'image' : 'file') : 'text',
      attachmentUrl: attachments?.url,
      attachmentName: attachments?.name,
      replyToId: replyToMessage?.id,
    };

    try {
      if (isConnected) {
        // Send via WebSocket - the server will broadcast back to us via 'new_message' event
        socketSendMessage(messageData);
      } else {
        // Fallback to HTTP API if not connected
        const newMessage = await sendMessageMutation.mutateAsync({
          conversationId: selectedConversation.id,
          data: {
            content,
            messageType: messageData.messageType,
            attachmentUrl: messageData.attachmentUrl,
            attachmentName: messageData.attachmentName,
            replyToId: messageData.replyToId,
          },
        });
        
        // Manually add message to the list if using HTTP API
        setMessages(prev => {
          const exists = prev.some(m => m.id === newMessage.id);
          if (!exists) {
            return [...prev, newMessage];
          }
          return prev;
        });
      }
      
      setReplyToMessage(null);
    } catch (error) {
      console.error('Failed to send message:', error);
      toast.error(t('messaging.interface.failedToSendMessage'));
    } finally {
      setIsSendingMessage(false);
    }
  }, [selectedConversation, replyToMessage, socketSendMessage, sendMessageMutation, isConnected, isSendingMessage]);

  const handleCreateConversation = async (data: CreateConversationData) => {
    try {
      if (isConnected) {
        socketCreateConversation(data);
      }
      
      await createConversationMutation.mutateAsync(data);
      
      setShowCreateModal(false);
      toast.success(t('messaging.interface.conversationCreatedSuccessfully'));
      refetchConversations();
      
    } catch (error) {
      toast.error(t('messaging.interface.failedToCreateConversation'));
    }
  };

  const handleDeleteConversation = async (conversationId: string) => {
    try {
      await deleteConversationMutation.mutateAsync(conversationId);
      toast.success(t('messaging.interface.conversationDeletedSuccessfully'));
      
      if (selectedConversation?.id === conversationId) {
        setSelectedConversation(null);
        setShowMobileConversationList(true);
      }
      
      refetchConversations();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete conversation');
    }
  };

  const handleEditMessage = async (updatedMessage: Message) => {
    try {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === updatedMessage.id ? updatedMessage : msg
        )
      );
      
      toast.success(t('messaging.interface.messageUpdated'));
      
      refetchConversations();
    } catch (error) {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === updatedMessage.id 
            ? messages.find(m => m.id === updatedMessage.id) || msg
            : msg
        )
      );
      toast.error(t('messaging.interface.failedToUpdateMessage'));
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    const messageToDelete = messages.find(m => m.id === messageId);
    
    try {
      setMessages(prev => prev.filter(msg => msg.id !== messageId));
      
      toast.success(t('messaging.interface.messageDeleted'));
      
      refetchConversations();
    } catch (error) {
      if (messageToDelete) {
        setMessages(prev => [...prev, messageToDelete].sort((a, b) => 
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        ));
      }
      toast.error(t('messaging.interface.failedToDeleteMessage'));
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
        ? `${t('messaging.interface.group')} (${selectedConversation.participants.length})`
        : selectedConversation.participants.find(p => p.userId !== currentUserId)?.user.displayName
      );

    const isOnline = selectedConversation.isGroup 
      ? selectedConversation.participants.some(p => onlineUsers.has(p.userId) && p.userId !== currentUserId)
      : selectedConversation.participants.some(p => onlineUsers.has(p.userId) && p.userId !== currentUserId);

    return (
      <div className="border-b px-6 py-6 border-gray-200 bg-white shadow-sm">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <button
                onClick={handleBackToConversations}
                className="lg:hidden text-gray-600 hover:text-gray-800 flex-shrink-0 p-2 hover:bg-gray-100 rounded-xl transition-all duration-200"
                title="Back to conversations"
              >
                <ArrowLeft size={20} />
              </button>
              
              <div className="flex-shrink-0">
                {selectedConversation.isGroup ? (
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-sm">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={selectedConversation.participants.find(p => p.userId !== currentUserId)?.user.picture || '/default-avatar.png'}
                      alt={title}
                      className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 shadow-sm"
                    />
                    {isOnline && (
                      <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm animate-pulse"></div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-gray-900 truncate text-lg">{title}</h3>
                {!selectedConversation.isGroup && (
                  <p className="text-sm text-gray-500 flex items-center">
                    <span className={`w-2 h-2 rounded-full mr-2 ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
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

            <div className="flex items-center space-x-1 flex-shrink-0">
              <button 
                onClick={handleSearchToggle}
                className={`text-gray-600 hover:text-gray-800 p-2 rounded-lg transition-colors hover:bg-gray-100 ${
                  showSearch ? 'bg-blue-100 text-blue-600' : ''
                }`}
                title="Search in conversation"
              >
                <Search size={18} />
              </button>
            </div>
          </div>

          {showSearch && (
            <div className="mt-3 relative animate-in slide-in-from-top duration-200">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search messages..."
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
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
                <div className="mt-1 text-xs text-gray-500 px-1">
                  Found {searchResults.total} message{searchResults.total !== 1 ? 's' : ''}
                </div>
              )}
            </div>
          )}

          {typingUsers.size > 0 && (
            <div className="mt-2 text-sm text-blue-600 flex items-center">
              <div className="flex space-x-1 mr-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
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
    <div className="h-full w-full flex bg-gray-50">
      <div className={`${
        showMobileConversationList ? 'flex' : 'hidden'
      } lg:flex w-full lg:w-80 xl:w-96 bg-white border-r border-gray-200 flex-col shadow-sm`}>
        <div className="border-b border-gray-200 p-4 bg-gradient-to-r from-blue-600 to-blue-700 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center">
              <MessageSquare className="w-6 h-6 mr-3" />
              Messages
            </h2>
            <button
              onClick={() => setShowCreateModal(true)}
              className="p-2.5 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl transition-all duration-200 hover:scale-105 shadow-sm"
              title="Start new conversation"
            >
              <Plus className="w-5 h-5 text-white" />
            </button>
          </div>
          
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-2 animate-pulse ${isConnected ? 'bg-green-400' : 'bg-red-400'}`} />
              <span className="text-xs text-blue-100 font-medium">
                {isConnected ? 'Connected' : 'Reconnecting...'}
              </span>
            </div>
            
            {conversations.length > 0 && (
              <span className="text-xs text-blue-200">
                {conversations.length} conversation{conversations.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          <ConversationList
            conversations={conversations}
            selectedConversationId={selectedConversation?.id}
            onSelectConversation={handleSelectConversation}
            onDeleteConversation={handleDeleteConversation}
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

            <div className="flex-1 bg-gray-50 relative overflow-hidden">
              <MessageList
                messages={searchQuery && searchResults ? searchResults.messages : messages}
                currentUserId={currentUserId}
                onReply={setReplyToMessage}
                onEditMessage={handleEditMessage}
                onDeleteMessage={handleDeleteMessage}
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
                disabled={!isConnected || isSendingMessage}
              />
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center text-gray-500 p-8">
              <div className="bg-blue-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-700">{t('messaging.interface.noConversationSelected')}</h3>
              <p className="text-gray-600 max-w-sm">
                {t('messaging.interface.chooseConversation')}
              </p>
            </div>
          </div>
        )}
      </div>



      <CreateConversationModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreateConversation={handleCreateConversation}
      />
    </div>
  );
});