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

  editMessage: async (messageId: string, content: string): Promise<Message> => {
    const response = await api.put(`/messaging/messages/${messageId}`, { content });
    return response.data;
  },

  deleteMessage: async (messageId: string): Promise<void> => {
    await api.delete(`/messaging/messages/${messageId}`);
  },
};

// Query hooks
export const useGetConversations = () => {
  return useQuery({
    queryKey: ['conversations'],
    queryFn: messagingAPI.getConversations,
    staleTime: 30 * 1000,
    retry: (failureCount, error: any) => {
      // Don't retry on 401 errors (unauthorized)
      if (error?.response?.status === 401) {
        return false;
      }
      return failureCount < 2;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
  });
};

export const useGetConversationMessages = (conversationId: string, page: number = 1, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['conversation-messages', conversationId, page],
    queryFn: () => messagingAPI.getConversationMessages(conversationId, page),
    enabled: enabled && !!conversationId,
    staleTime: 30 * 1000,
    retry: (failureCount, error: any) => {
      if (error?.response?.status === 401) {
        return false;
      }
      return failureCount < 2;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchInterval: false,
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
      try {
        const result = await messagingAPI.createConversation(data);
        return result;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (newConversation) => {
      queryClient.setQueryData(['conversations'], (old: Conversation[] | undefined) => {
        if (!old) return [newConversation];
        const exists = old.some(conv => conv.id === newConversation.id);
        if (exists) return old;
        return [newConversation, ...old];
      });
    },
  });
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ conversationId, data }: { conversationId: string; data: any }) => {
      return messagingAPI.sendMessage(conversationId, data);
    },
    onSuccess: (newMessage) => {
      queryClient.setQueryData(
        ['conversation-messages', newMessage.conversationId, 1],
        (old: { messages: Message[]; hasMore: boolean } | undefined) => {
          if (!old) return { messages: [newMessage], hasMore: false };
          
          const messageExists = old.messages.some(m => m.id === newMessage.id);
          if (messageExists) {
            return old;
          }
          
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
    retry: false, // Don't retry on auth errors
    onSuccess: (_, conversationId) => {
      queryClient.setQueryData(['unread-count', conversationId], { unreadCount: 0 });
      
      queryClient.setQueryData(['conversations'], (old: Conversation[] | undefined) => {
        if (!old) return old;
        return old.map(conv =>
          conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv
        );
      });
    },
    onError: (error: any) => {
      // Silently handle expected errors
      if (error?.response?.status === 401) {
        // User not authenticated
        return;
      }
      if (error?.code === 'ECONNABORTED' || error?.message === 'Request aborted') {
        // Request was aborted (user navigated away, etc.)
        return;
      }
      if (error?.code === 'ERR_CANCELED') {
        // Request was canceled
        return;
      }
      // Only log unexpected errors
      console.error('Failed to mark conversation as read:', error);
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
    staleTime: 60 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export const useEditMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ messageId, content }: { messageId: string; content: string }) => 
      messagingAPI.editMessage(messageId, content),
    onSuccess: (updatedMessage) => {
      queryClient.setQueryData(
        ['conversation-messages', updatedMessage.conversationId, 1],
        (old: { messages: Message[]; hasMore: boolean } | undefined) => {
          if (!old) return old;
          return {
            ...old,
            messages: old.messages.map(msg =>
              msg.id === updatedMessage.id ? updatedMessage : msg
            ),
          };
        }
      );
    },
  });
};

export const useDeleteMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: messagingAPI.deleteMessage,
    onSuccess: (_, messageId) => {
      queryClient.setQueryData(
        ['conversation-messages'],
        (old: { messages: Message[]; hasMore: boolean } | undefined) => {
          if (!old) return old;
          return {
            ...old,
            messages: old.messages.filter(msg => msg.id !== messageId),
          };
        }
      );
    },
  });
};