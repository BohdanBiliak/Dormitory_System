'use client';

import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Message, Conversation, UserOnlineStatus, SendMessageData, CreateConversationData } from '@/types/messaging.types';

interface UseSocketReturn {
  socket: Socket | null;
  isConnected: boolean;
  sendMessage: (data: SendMessageData) => void;
  createConversation: (data: CreateConversationData) => void;
  joinConversation: (conversationId: string) => void;
  leaveConversation: (conversationId: string) => void;
  markMessageAsRead: (messageId: string) => void;
  markConversationAsRead: (conversationId: string) => void;
  startTyping: (conversationId: string) => void;
  stopTyping: (conversationId: string) => void;
}

interface SocketEvents {
  onNewMessage?: (message: Message) => void;
  onNewConversation?: (conversation: Conversation) => void;
  onMessageSent?: (data: { messageId: string }) => void;
  onMessageRead?: (data: { messageId: string }) => void;
  onConversationMarkedRead?: (data: { conversationId: string }) => void;
  onUserTyping?: (data: { userId: string; conversationId: string; isTyping: boolean }) => void;
  onUserOnlineStatus?: (status: UserOnlineStatus) => void;
  onError?: (error: { message: string }) => void;
  onNotification?: (notification: any) => void;
}

export const useSocket = (events?: SocketEvents): UseSocketReturn => {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const eventsRef = useRef(events);

  // Update events ref when events change without reconnecting
  useEffect(() => {
    eventsRef.current = events;
  }, [events]);

  useEffect(() => {
    // Create socket connection with session-based auth
    const socketURL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:4000';
    const socket = io(`${socketURL}/messaging`, {
      withCredentials: true, // Important: Send cookies with the request
      autoConnect: true,
      transports: ['polling', 'websocket'], // Try polling first, then upgrade to websocket
      timeout: 10000, // 10 second timeout
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000, // Wait 2 seconds before reconnecting
      reconnectionDelayMax: 10000,
      randomizationFactor: 0.5, // Randomize reconnection to avoid thundering herd
    });

    socketRef.current = socket;
    
    // Connection events
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('connected', (data) => {
      // Successfully authenticated
    });

    socket.on('disconnect', (reason) => {
      setIsConnected(false);
      
      // Only log unexpected disconnections
      if (reason !== 'io client disconnect' && reason !== 'io server disconnect') {
        console.warn('Disconnected from messaging server:', reason);
      }
    });

    socket.on('connect_error', (error) => {
      setIsConnected(false);
      
      // Handle authentication errors silently - user may not be logged in
      if (error.message.includes('NO_SESSION') || error.message.includes('INVALID_SESSION')) {
        socket.disconnect();
        return;
      }
      
      // Only log non-auth connection errors
      console.error('Connection error:', error.message);
    });

    socket.on('error', (error) => {
      // Handle authentication errors
      if (error.code === 'NO_SESSION' || error.code === 'INVALID_SESSION') {
        socket.disconnect();
        socket.close();
        if (eventsRef.current?.onError) {
          eventsRef.current.onError(error);
        }
        return;
      }
      
      // Handle rate limiting
      if (error.code === 'RATE_LIMIT_EXCEEDED') {
        console.warn('Connection rate limit exceeded. Please wait before reconnecting.');
        socket.disconnect();
        socket.close();
        if (eventsRef.current?.onError) {
          eventsRef.current.onError(error);
        }
        return;
      }
      
      // Handle conversation creation errors
      if (error.code === 'CONVERSATION_CREATE_FAILED') {
        console.error('Failed to create conversation:', error.message);
        if (eventsRef.current?.onError) {
          eventsRef.current.onError(error);
        }
        return;
      }
      
      // Log other errors
      console.error('Socket error:', error);
      if (eventsRef.current?.onError) {
        eventsRef.current.onError(error);
      }
    });

    // Conversation events
    socket.on('conversation_created', (conversation: Conversation) => {
      if (eventsRef.current?.onNewConversation) {
        eventsRef.current.onNewConversation(conversation);
      }
    });

    // Message events - use refs to avoid reconnecting on event changes
    socket.on('new_message', (message: Message) => {
      if (eventsRef.current?.onNewMessage) {
        eventsRef.current.onNewMessage(message);
      }
    });

    socket.on('new_conversation', (conversation: Conversation) => {
      if (eventsRef.current?.onNewConversation) {
        eventsRef.current.onNewConversation(conversation);
      }
    });

    socket.on('message_sent', (data: { messageId: string }) => {
      if (eventsRef.current?.onMessageSent) {
        eventsRef.current.onMessageSent(data);
      }
    });

    socket.on('message_read', (data: { messageId: string }) => {
      if (eventsRef.current?.onMessageRead) {
        eventsRef.current.onMessageRead(data);
      }
    });

    socket.on('conversation_marked_read', (data: { conversationId: string }) => {
      if (eventsRef.current?.onConversationMarkedRead) {
        eventsRef.current.onConversationMarkedRead(data);
      }
    });

    socket.on('user_typing', (data: { userId: string; conversationId: string; isTyping: boolean }) => {
      if (eventsRef.current?.onUserTyping) {
        eventsRef.current.onUserTyping(data);
      }
    });

    socket.on('user_online_status', (status: UserOnlineStatus) => {
      if (eventsRef.current?.onUserOnlineStatus) {
        eventsRef.current.onUserOnlineStatus(status);
      }
    });

    socket.on('notification', (notification: any) => {
      if (eventsRef.current?.onNotification) {
        eventsRef.current.onNotification(notification);
      }
    });

    // Conversation join/leave confirmations
    socket.on('joined_conversation', (data: { conversationId: string }) => {
      // Joined conversation successfully
    });

    socket.on('left_conversation', (data: { conversationId: string }) => {
      // Left conversation successfully
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        setIsConnected(false);
      }
    };
  }, []); // Empty dependency array - connect once and cleanup on unmount

  const sendMessage = (data: SendMessageData) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('send_message', data);
    }
  };

  const createConversation = (data: CreateConversationData) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('create_conversation', data);
    }
  };

  const joinConversation = (conversationId: string) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('join_conversation', { conversationId });
    }
  };

  const leaveConversation = (conversationId: string) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('leave_conversation', { conversationId });
    }
  };

  const markMessageAsRead = (messageId: string) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('mark_message_read', { messageId });
    }
  };

  const markConversationAsRead = (conversationId: string) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('mark_conversation_read', { conversationId });
    }
  };

  const startTyping = (conversationId: string) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('typing_start', { conversationId });
    }
  };

  const stopTyping = (conversationId: string) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('typing_stop', { conversationId });
    }
  };

  return {
    socket: socketRef.current,
    isConnected,
    sendMessage,
    createConversation,
    joinConversation,
    leaveConversation,
    markMessageAsRead,
    markConversationAsRead,
    startTyping,
    stopTyping,
  };
};