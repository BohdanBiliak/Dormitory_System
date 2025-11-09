'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, X } from 'lucide-react';
import { Message } from '@/types/messaging.types';

interface MessageInputProps {
  onSendMessage: (content: string, attachments?: { url: string; name: string; type: string }) => void;
  onStartTyping?: () => void;
  onStopTyping?: () => void;
  replyTo?: Message | null;
  onCancelReply?: () => void;
  disabled?: boolean;
  placeholder?: string;
}

export const MessageInput: React.FC<MessageInputProps> = React.memo(({
  onSendMessage,
  onStartTyping,
  onStopTyping,
  replyTo,
  onCancelReply,
  disabled = false,
  placeholder = 'Type a message...',
}) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [attachments, setAttachments] = useState<{ url: string; name: string; type: string } | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setMessage(value);

    // Handle typing indicators
    if (value.trim() && !isTyping) {
      setIsTyping(true);
      onStartTyping?.();
    }

    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set timeout to stop typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      onStopTyping?.();
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage && !attachments) return;

    onSendMessage(trimmedMessage, attachments || undefined);
    setMessage('');
    setAttachments(null);
    
    if (isTyping) {
      setIsTyping(false);
      onStopTyping?.();
    }

    // Clear typing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Focus back to input
    inputRef.current?.focus();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // For demo purposes, we'll create a mock URL
    // In a real app, you'd upload the file to your server/storage
    const mockUrl = URL.createObjectURL(file);
    
    setAttachments({
      url: mockUrl,
      name: file.name,
      type: file.type,
    });

    // Clear the input
    e.target.value = '';
  };

  const removeAttachment = () => {
    setAttachments(null);
  };

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  // Auto-resize textarea with maximum height
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      const scrollHeight = inputRef.current.scrollHeight;
      const maxHeight = 128; // 8rem = 128px
      
      if (scrollHeight <= maxHeight) {
        inputRef.current.style.height = `${scrollHeight}px`;
      } else {
        inputRef.current.style.height = `${maxHeight}px`;
      }
    }
  }, [message]);

  return (
    <div className="bg-white p-3 sm:p-4 border-t border-gray-100">
      {/* Reply preview */}
      {replyTo && (
        <div className="mb-3 sm:mb-4 bg-gradient-to-r from-blue-50 to-blue-25 rounded-xl p-3 sm:p-4 border-l-4 border-blue-500 shadow-sm animate-in slide-in-from-bottom duration-200">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="text-xs sm:text-sm font-semibold text-blue-900 mb-1">
                Replying to {replyTo.sender.displayName}
              </div>
              <div className="text-xs sm:text-sm text-gray-700 truncate bg-white bg-opacity-50 rounded px-2 py-1">
                {replyTo.content}
              </div>
            </div>
            <button
              onClick={onCancelReply}
              className="ml-3 text-gray-400 hover:text-gray-600 flex-shrink-0 p-1 hover:bg-white hover:bg-opacity-50 rounded-full transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Attachment preview */}
      {attachments && (
        <div className="mb-3 sm:mb-4 bg-gradient-to-r from-gray-50 to-gray-25 rounded-xl p-3 sm:p-4 border border-gray-200 shadow-sm animate-in slide-in-from-bottom duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Paperclip size={16} className="text-blue-600 flex-shrink-0" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-sm font-medium text-gray-800 truncate block">{attachments.name}</span>
                <span className="text-xs text-gray-500">Ready to send</span>
              </div>
            </div>
            <button
              onClick={removeAttachment}
              className="ml-3 text-gray-400 hover:text-gray-600 flex-shrink-0 p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Input area */}
      <div className="flex items-end space-x-3">
        <div className="flex-1 relative">
          <textarea
            ref={inputRef}
            value={message}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="w-full resize-none border border-gray-300 rounded-2xl px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 max-h-32 overflow-y-auto disabled:bg-gray-100 disabled:cursor-not-allowed transition-all duration-200 shadow-sm focus:shadow-md bg-gray-50 focus:bg-white scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
          />
        </div>

        {/* File attachment button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
          className="p-3 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 hover:scale-105"
          title="Attach file"
        >
          <Paperclip size={20} />
        </button>

        {/* Send button */}
        <button
          onClick={handleSendMessage}
          disabled={disabled || (!message.trim() && !attachments)}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-2xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl disabled:hover:shadow-lg flex-shrink-0 hover:scale-105 disabled:hover:scale-100"
          title="Send message"
        >
          <Send size={20} />
        </button>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileSelect}
          accept="image/*,.pdf,.doc,.docx,.txt"
        />
      </div>
      
      {/* Disabled message */}
      {disabled && (
        <div className="mt-2 text-xs text-gray-500 text-center">
          Connecting to server...
        </div>
      )}
    </div>
  );
});

MessageInput.displayName = 'MessageInput';