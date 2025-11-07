'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/app/lib/api.api';
import { Conversation, Message, CreateConversationData } from '@/types/messaging.types';

// API functions
const messagingAPI = {
  getConversations: async (): Promise<Conversation[]> => {
    const response = await api.get('/messaging/conversations');
    return response.data;
  },

  getConversationMessages: async (
    conversationId: string,
    page: number = 1,
    limit: number = 50
  ): Promise<{ messages: Message[]; hasMore: boolean }> => {
    const response = await api.get(
      `/messaging/conversations/${conversationId}/messages`,
      { params: { page, limit } }
    );
    return response.data;
  },

  createConversation: async (data: CreateConversationData): Promise<Conversation> => {
    const response = await api.post('/messaging/conversations', data);
    return response.data;
  },

  sendMessage: async (conversationId: string, data: any): Promise<Message> => {
    const response = await api.post(
      `/messaging/conversations/${conversationId}/messages`,
      data
    );
    return response.data;
  },

  markMessageAsRead: async (messageId: string): Promise<void> => {
    await api.post(`/messaging/messages/${messageId}/read`);
  },

  markConversationAsRead: async (conversationId: string): Promise<void> => {
    await api.post(`/messaging/conversations/${conversationId}/read`);
  },

  getUnreadCount: async (conversationId: string): Promise<{ unreadCount: number }> => {
    const response = await api.get(
      `/messaging/conversations/${conversationId}/unread-count`
    );
    return response.data;
  },

  getOrCreateDirectConversation: async (otherUserId: string): Promise<Conversation> => {
    const response = await api.get(
      `/messaging/conversations/direct/${otherUserId}`
    );
    return response.data;
  },

  deleteConversation: async (conversationId: string): Promise<void> => {
    await api.delete(`/messaging/conversations/${conversationId}`);
  },

  searchMessages: async (
    conversationId: string,
    query: string,
    page: number = 1,
    limit: number = 20
  ): Promise<{ messages: Message[]; hasMore: boolean; total: number }> => {
    const response = await api.get(
      `/messaging/conversations/${conversationId}/search`,
      { params: { query, page, limit } }
    );
    return response.data;
  },
};

// Query hooks
export const useGetConversations = () => {
  return useQuery({
    queryKey: ['conversations'],
    queryFn: messagingAPI.getConversations,
    staleTime: 30 * 1000, // 30 seconds
  });
};

export const useGetConversationMessages = (conversationId: string, page: number = 1) => {
  return useQuery({
    queryKey: ['conversation-messages', conversationId, page],
    queryFn: () => messagingAPI.getConversationMessages(conversationId, page),
    enabled: !!conversationId,
    staleTime: 30 * 1000,
  });
};

export const useGetUnreadCount = (conversationId: string) => {
  return useQuery({
    queryKey: ['unread-count', conversationId],
    queryFn: () => messagingAPI.getUnreadCount(conversationId),
    enabled: !!conversationId,
    staleTime: 10 * 1000, // 10 seconds
  });
};

// Mutation hooks
export const useCreateConversation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateConversationData) => {
      // console.log('HTTP API: Creating conversation', data);
      try {
        const result = await messagingAPI.createConversation(data);
        // console.log('HTTP API: Conversation created successfully', result);
        return result;
      } catch (error) {
        console.error('HTTP API: Failed to create conversation', error);
        throw error;
      }
    },
    onSuccess: (newConversation) => {
      // console.log('Updating query cache with new conversation', newConversation.id);
      queryClient.setQueryData(['conversations'], (old: Conversation[] | undefined) => {
        if (!old) return [newConversation];
        const exists = old.some(conv => conv.id === newConversation.id);
        if (exists) return old;
        return [newConversation, ...old];
      });
    },
    onError: (error: any) => {
      console.error('Mutation error:', error);
    },
  });
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ conversationId, data }: { conversationId: string; data: any }) =>
      messagingAPI.sendMessage(conversationId, data),
    onSuccess: (newMessage) => {
      queryClient.setQueryData(
        ['conversation-messages', newMessage.conversationId, 1],
        (old: { messages: Message[]; hasMore: boolean } | undefined) => {
          if (!old) return { messages: [newMessage], hasMore: false };
          return {
            ...old,
            messages: [...old.messages, newMessage],
          };
        }
      );

      queryClient.setQueryData(['conversations'], (old: Conversation[] | undefined) => {
        if (!old) return old;
        return old.map(conv =>
          conv.id === newMessage.conversationId
            ? { ...conv, lastMessage: newMessage, updatedAt: new Date() }
            : conv
        );
      });
    },
  });
};

export const useMarkConversationAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: messagingAPI.markConversationAsRead,
    onSuccess: (_, conversationId) => {
      queryClient.setQueryData(['unread-count', conversationId], { unreadCount: 0 });
      
      queryClient.setQueryData(['conversations'], (old: Conversation[] | undefined) => {
        if (!old) return old;
        return old.map(conv =>
          conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv
        );
      });
    },
  });
};

export const useGetOrCreateDirectConversation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: messagingAPI.getOrCreateDirectConversation,
    onSuccess: (conversation) => {
      // Update conversations list if it's a new conversation
      queryClient.setQueryData(['conversations'], (old: Conversation[] | undefined) => {
        if (!old) return [conversation];
        const exists = old.some(conv => conv.id === conversation.id);
        if (exists) return old;
        return [conversation, ...old];
      });
    },
  });
};

export const useDeleteConversation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: messagingAPI.deleteConversation,
    onSuccess: (_, conversationId) => {
      queryClient.setQueryData(['conversations'], (old: Conversation[] | undefined) => {
        if (!old) return old;
        return old.filter(conv => conv.id !== conversationId);
      });
      
      queryClient.invalidateQueries({ queryKey: ['conversation-messages', conversationId] });
      queryClient.invalidateQueries({ queryKey: ['unread-count', conversationId] });
    },
  });
};

export const useSearchMessages = (conversationId: string, query: string) => {
  return useQuery({
    queryKey: ['search-messages', conversationId, query],
    queryFn: () => messagingAPI.searchMessages(conversationId, query),
    enabled: !!conversationId && !!query && query.trim().length > 0,
    staleTime: 60 * 1000, // 1 minute
  });
};