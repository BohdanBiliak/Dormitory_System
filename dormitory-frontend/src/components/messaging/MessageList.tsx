'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Message } from '@/types/messaging.types';
import { format, isToday, isYesterday, isSameDay } from 'date-fns';
import { Reply } from 'lucide-react';

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
  onReply?: (message: Message) => void;
  onMarkAsRead?: (messageId: string) => void;
  searchQuery?: string;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  currentUserId,
  onReply,
  onMarkAsRead,
  searchQuery = '',
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (onMarkAsRead) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const messageId = entry.target.getAttribute('data-message-id');
              if (messageId) {
                onMarkAsRead(messageId);
              }
            }
          });
        },
        { threshold: 0.5 }
      );
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [onMarkAsRead]);

  const formatMessageTime = (date: Date) => {
    const messageDate = new Date(date);
    
    if (isToday(messageDate)) {
      return format(messageDate, 'HH:mm');
    } else if (isYesterday(messageDate)) {
      return `Yesterday ${format(messageDate, 'HH:mm')}`;
    } else {
      return format(messageDate, 'MMM dd, HH:mm');
    }
  };

  const shouldShowDateDivider = (currentMessage: Message, previousMessage: Message | null) => {
    if (!previousMessage) return true;
    
    const currentDate = new Date(currentMessage.createdAt);
    const previousDate = new Date(previousMessage.createdAt);
    
    return !isSameDay(currentDate, previousDate);
  };

  const formatDateDivider = (date: Date) => {
    const messageDate = new Date(date);
    
    if (isToday(messageDate)) {
      return 'Today';
    } else if (isYesterday(messageDate)) {
      return 'Yesterday';
    } else {
      return format(messageDate, 'MMMM dd, yyyy');
    }
  };

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) {
      return text;
    }

    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <>
        {parts.map((part, i) => 
          part.toLowerCase() === highlight.toLowerCase() ? (
            <mark key={i} className="bg-yellow-200 text-gray-900 rounded px-1">
              {part}
            </mark>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message, index) => {
        const previousMessage = index > 0 ? messages[index - 1] : null;
        const isOwnMessage = message.senderId === currentUserId;
        const showDateDivider = shouldShowDateDivider(message, previousMessage);

        return (
          <React.Fragment key={message.id}>
            {showDateDivider && (
              <div className="flex justify-center my-4">
                <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">
                  {formatDateDivider(message.createdAt)}
                </span>
              </div>
            )}
            
            <div
              className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
              data-message-id={message.id}
              ref={(el) => {
                if (el && observerRef.current && !isOwnMessage) {
                  observerRef.current.observe(el);
                }
              }}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  isOwnMessage
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-900'
                }`}
              >
                {/* Reply to message */}
                {message.replyTo && (
                  <div className={`mb-2 pb-2 border-l-2 pl-2 text-sm opacity-75 ${
                    isOwnMessage ? 'border-blue-300' : 'border-gray-400'
                  }`}>
                    <div className="font-medium">{message.replyTo.sender.displayName}</div>
                    <div className="truncate">{message.replyTo.content}</div>
                  </div>
                )}

                {/* Sender name (for group chats and non-own messages) */}
                {!isOwnMessage && (
                  <div className="text-xs font-medium mb-1 text-gray-600">
                    {message.sender.displayName}
                  </div>
                )}

                {/* Message content */}
                <div className="break-words">
                  {message.messageType === 'text' && (
                    searchQuery ? highlightText(message.content, searchQuery) : message.content
                  )}
                  
                  {message.messageType === 'image' && (
                    <div>
                      <img
                        src={message.attachmentUrl}
                        alt={message.attachmentName}
                        className="max-w-full h-auto rounded"
                      />
                      {message.content && (
                        <div className="mt-2">
                          {searchQuery ? highlightText(message.content, searchQuery) : message.content}
                        </div>
                      )}
                    </div>
                  )}
                  
                  {message.messageType === 'file' && (
                    <div>
                      <a
                        href={message.attachmentUrl}
                        download={message.attachmentName}
                        className={`inline-flex items-center space-x-2 ${
                          isOwnMessage ? 'text-blue-100 hover:text-white' : 'text-blue-600 hover:text-blue-800'
                        }`}
                      >
                        <span>File</span>
                        <span>{message.attachmentName}</span>
                      </a>
                      {message.content && (
                        <div className="mt-2">
                          {searchQuery ? highlightText(message.content, searchQuery) : message.content}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Message time and actions */}
                <div className={`flex items-center justify-between mt-1 text-xs ${
                  isOwnMessage ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  <span>{formatMessageTime(message.createdAt)}</span>
                  
                  {onReply && (
                    <button
                      onClick={() => onReply(message)}
                      className={`ml-2 p-1 rounded hover:bg-opacity-20 hover:bg-gray-500 ${
                        isOwnMessage ? 'text-blue-100' : 'text-gray-500'
                      }`}
                    >
                      <Reply size={12} />
                    </button>
                  )}
                </div>

                {/* Edited indicator */}
                {message.isEdited && (
                  <div className={`text-xs mt-1 ${
                    isOwnMessage ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    (edited)
                  </div>
                )}
              </div>
            </div>
          </React.Fragment>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};