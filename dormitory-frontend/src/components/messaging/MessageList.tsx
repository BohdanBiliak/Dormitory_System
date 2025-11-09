'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Message } from '@/types/messaging.types';
import { format, isToday, isYesterday, isSameDay } from 'date-fns';
import { 
  Reply, 
  MoreHorizontal, 
  Edit3, 
  Trash2, 
  Copy, 
  Check, 
  CheckCheck,
  Clock,
  Save,
  X,
  AlertTriangle,
  ChevronDown
} from 'lucide-react';

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
  onReply?: (message: Message) => void;
  onMarkAsRead?: (messageId: string) => void;
  onEditMessage?: (message: Message) => void;
  onDeleteMessage?: (messageId: string) => void;

  searchQuery?: string;
}

export const MessageList: React.FC<MessageListProps> = React.memo(({
  messages,
  currentUserId,
  onReply,
  onMarkAsRead,
  onEditMessage,
  onDeleteMessage,
  searchQuery = '',
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [hoveredMessageId, setHoveredMessageId] = useState<string | null>(null);
  const [showActionsMenu, setShowActionsMenu] = useState<string | null>(null);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState<string>('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowScrollButton(!isNearBottom);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

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

  const getMessageStatus = (message: Message) => {
    if (message.senderId !== currentUserId) return null;
    
    const isDelivered = true;
    const isRead = false;
    
    if (isRead) {
      return <CheckCheck size={14} className="text-blue-300" />;
    } else if (isDelivered) {
      return <Check size={14} className="text-blue-300" />;
    } else {
      return <Clock size={14} className="text-blue-300" />;
    }
  };



  const copyMessageToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const handleEditStart = (message: Message) => {
    setEditingMessageId(message.id);
    setEditingContent(message.content);
    setShowActionsMenu(null);
  };

  const handleEditSave = (messageId: string) => {
    if (editingContent.trim() && onEditMessage) {
      const message = messages.find(m => m.id === messageId);
      if (message) {
        onEditMessage({ ...message, content: editingContent.trim() });
      }
    }
    setEditingMessageId(null);
    setEditingContent('');
  };

  const handleEditCancel = () => {
    setEditingMessageId(null);
    setEditingContent('');
  };

  const handleDeleteConfirm = (messageId: string) => {
    if (onDeleteMessage) {
      onDeleteMessage(messageId);
    }
    setShowDeleteConfirm(null);
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scroll-smooth"
        onScroll={handleScroll}
      >
      {messages.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-500 p-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Reply className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">No messages yet</h3>
            <p className="text-gray-500">Start the conversation by sending a message</p>
          </div>
        </div>
      ) : (
        messages.map((message, index) => {
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
              className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} group`}
              data-message-id={message.id}
              ref={(el) => {
                if (el && observerRef.current && !isOwnMessage) {
                  observerRef.current.observe(el);
                }
              }}
              onMouseEnter={() => editingMessageId === null && setHoveredMessageId(message.id)}
              onMouseLeave={() => {
                setHoveredMessageId(null);
                setShowActionsMenu(null);
              }}
            >
              <div className="relative">
                                {isOwnMessage && hoveredMessageId === message.id && editingMessageId !== message.id && (
                  <div className={`absolute -top-2 ${
                    isOwnMessage ? 'right-2' : 'left-2'
                  } bg-white rounded-lg shadow-lg border border-gray-200 p-1 flex items-center space-x-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity`}>
                    <button
                      onClick={() => onReply?.(message)}
                      className="p-1 hover:bg-gray-100 rounded text-gray-600 hover:text-gray-800"
                      title="Reply"
                    >
                      <Reply size={16} />
                    </button>
                    <button
                      onClick={() => setShowActionsMenu(showActionsMenu === message.id ? null : message.id)}
                      className="p-1 hover:bg-gray-100 rounded text-gray-600 hover:text-gray-800"
                      title="More options"
                    >
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                )}

                {showActionsMenu === message.id && (
                  <div className={`absolute top-8 ${
                    isOwnMessage ? 'right-2' : 'left-2'
                  } bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20 min-w-[140px]`}>
                    <button
                      onClick={() => {
                        copyMessageToClipboard(message.content);
                        setShowActionsMenu(null);
                      }}
                      className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Copy size={14} />
                      <span>Copy</span>
                    </button>
                    {isOwnMessage && (
                      <>
                        <button
                          onClick={() => handleEditStart(message)}
                          disabled={editingMessageId !== null}
                          className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Edit3 size={14} />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => {
                            setShowDeleteConfirm(message.id);
                            setShowActionsMenu(null);
                          }}
                          className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <Trash2 size={14} />
                          <span>Delete</span>
                        </button>
                      </>
                    )}
                  </div>
                )}

                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm transition-all duration-200 ${
                    editingMessageId === message.id 
                      ? 'ring-2 ring-blue-400 scale-105 transform' 
                      : ''
                  } ${
                    isOwnMessage
                      ? 'bg-blue-500 text-white rounded-br-md'
                      : 'bg-white text-gray-900 border border-gray-200 rounded-bl-md'
                  }`}
                >
                {message.replyTo && (
                  <div className={`mb-2 pb-2 border-l-2 pl-2 text-sm opacity-75 ${
                    isOwnMessage ? 'border-blue-300' : 'border-gray-400'
                  }`}>
                    <div className="font-medium">{message.replyTo.sender.displayName}</div>
                    <div className="truncate">{message.replyTo.content}</div>
                  </div>
                )}

                {!isOwnMessage && (
                  <div className="text-xs font-medium mb-1 text-gray-600">
                    {message.sender.displayName}
                  </div>
                )}

                <div className="break-words">
                  {editingMessageId === message.id ? (
                    <div className="space-y-2">
                      <textarea
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                        className={`w-full resize-none rounded-lg p-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          isOwnMessage 
                            ? 'bg-blue-400 text-white border-blue-300 placeholder-blue-200' 
                            : 'bg-white text-gray-900 border-gray-300'
                        }`}
                        rows={Math.min(Math.max(1, editingContent.split('\n').length), 4)}
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleEditSave(message.id);
                          }
                          if (e.key === 'Escape') {
                            handleEditCancel();
                          }
                        }}
                      />
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={handleEditCancel}
                          className={`p-1 rounded hover:bg-opacity-20 hover:bg-gray-500 ${
                            isOwnMessage ? 'text-blue-200 hover:text-white' : 'text-gray-500 hover:text-gray-700'
                          }`}
                          title="Cancel editing"
                        >
                          <X size={14} />
                        </button>
                        <button
                          onClick={() => handleEditSave(message.id)}
                          disabled={!editingContent.trim()}
                          className={`p-1 rounded hover:bg-opacity-20 hover:bg-gray-500 disabled:opacity-50 ${
                            isOwnMessage ? 'text-blue-200 hover:text-white' : 'text-gray-500 hover:text-gray-700'
                          }`}
                          title="Save changes"
                        >
                          <Save size={14} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
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
                    </>
                  )}
                </div>

                <div className={`flex items-center space-x-1 mt-1 text-xs ${
                  isOwnMessage ? 'text-blue-200' : 'text-gray-500'
                }`}>
                  <div className="flex items-center space-x-1">
                    <span>{formatMessageTime(message.createdAt)}</span>
                    {message.isEdited && <span className="opacity-75">(edited)</span>}
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    {getMessageStatus(message)}
                  </div>
                </div>


                </div>
              </div>
            </div>
          </React.Fragment>
        );
        })
      )}
      <div ref={messagesEndRef} />
      </div>

      {showScrollButton && (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-10 animate-bounce"
          title="Scroll to bottom"
        >
          <ChevronDown size={20} />
        </button>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 transform animate-in zoom-in-95 duration-200">
            <div className="flex items-center mb-4">
              <div className="bg-red-100 rounded-full p-3 mr-4">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Delete Message</h3>
            </div>
            
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this message? This action cannot be undone.
            </p>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteConfirm(showDeleteConfirm)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

MessageList.displayName = 'MessageList';