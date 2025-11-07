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

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [message]);

  return (
    <div className="bg-white p-3 sm:p-4">
      {/* Reply preview */}
      {replyTo && (
        <div className="mb-2 sm:mb-3 bg-blue-50 rounded-lg p-2 sm:p-3 border-l-4 border-blue-500">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="text-xs sm:text-sm font-medium text-blue-900">
                Replying to {replyTo.sender.displayName}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 truncate">
                {replyTo.content}
              </div>
            </div>
            <button
              onClick={onCancelReply}
              className="ml-2 text-gray-400 hover:text-gray-600 flex-shrink-0"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Attachment preview */}
      {attachments && (
        <div className="mb-2 sm:mb-3 bg-gray-50 rounded-lg p-2 sm:p-3 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 min-w-0 flex-1">
              <Paperclip size={16} className="text-gray-500 flex-shrink-0" />
              <span className="text-xs sm:text-sm text-gray-700 truncate">{attachments.name}</span>
            </div>
            <button
              onClick={removeAttachment}
              className="ml-2 text-gray-400 hover:text-gray-600 flex-shrink-0"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Input area */}
      <div className="flex items-end space-x-2">
        <div className="flex-1 relative">
          <textarea
            ref={inputRef}
            value={message}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="w-full resize-none border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent max-h-32 disabled:bg-gray-100 disabled:cursor-not-allowed transition-shadow"
          />
        </div>

        {/* File attachment button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
          title="Attach file"
        >
          <Paperclip size={18} className="sm:w-5 sm:h-5" />
        </button>

        {/* Send button */}
        <button
          onClick={handleSendMessage}
          disabled={disabled || (!message.trim() && !attachments)}
          className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md disabled:hover:shadow-sm flex-shrink-0"
          title="Send message"
        >
          <Send size={18} className="sm:w-5 sm:h-5" />
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