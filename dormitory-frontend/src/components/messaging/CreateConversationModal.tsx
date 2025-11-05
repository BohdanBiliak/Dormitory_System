'use client';

import React, { useState } from 'react';
import { CreateConversationData } from '@/types/messaging.types';
import { X, Search, Users, User } from 'lucide-react';

interface CreateConversationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateConversation: (data: CreateConversationData) => void;
}

interface UserOption {
  id: string;
  displayName: string;
  email: string;
  picture?: string;
  role?: string;
}

export const CreateConversationModal: React.FC<CreateConversationModalProps> = ({
  isOpen,
  onClose,
  onCreateConversation,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<UserOption[]>([]);
  const [conversationTitle, setConversationTitle] = useState('');
  const [isGroup, setIsGroup] = useState(false);
  const [availableUsers, setAvailableUsers] = useState<UserOption[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [usersError, setUsersError] = useState<string | null>(null);

  React.useEffect(() => {
    if (isOpen) {
      fetchUsers();
    } else {
      setSearchTerm('');
      setSelectedUsers([]);
      setConversationTitle('');
      setIsGroup(false);
      setAvailableUsers([]);
      setUsersError(null);
    }
  }, [isOpen]);

  const fetchUsers = async () => {
    setIsLoadingUsers(true);
    setUsersError(null);
    
    try {
      const { api } = await import('@/app/lib/api.api');
      
      const response = await api.get('/users', {
        params: {
          page: 1,
          limit: 100, 
        },
      });
      
      // Extract users from paginated response
      const users = response.data.users || response.data.data || response.data;
      setAvailableUsers(Array.isArray(users) ? users : []);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to load users. Please try again.';
      setUsersError(errorMessage);
      console.error('Error fetching users:', error);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  if (!isOpen) return null;

  const filteredUsers = availableUsers.filter((user: UserOption) =>
    user.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserToggle = (user: UserOption) => {
    setSelectedUsers(prev => {
      const isSelected = prev.some(u => u.id === user.id);
      if (isSelected) {
        return prev.filter(u => u.id !== user.id);
      } else {
        return [...prev, user];
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedUsers.length === 0) return;

    const data: CreateConversationData = {
      participantIds: selectedUsers.map(u => u.id),
      isGroup: isGroup || selectedUsers.length > 1,
      title: conversationTitle || undefined,
    };

    onCreateConversation(data);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            New Conversation
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
          {/* Content */}
          <div className="flex-1 p-6 space-y-4 overflow-y-auto">
            {/* Conversation Title (for groups) */}
            {(isGroup || selectedUsers.length > 1) && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Group Name (Optional)
                </label>
                <input
                  type="text"
                  value={conversationTitle}
                  onChange={(e) => setConversationTitle(e.target.value)}
                  placeholder="Enter group name"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {/* Group Chat Toggle */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                Group Conversation
              </label>
              <button
                type="button"
                onClick={() => setIsGroup(!isGroup)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isGroup ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isGroup ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* User Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add Participants
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search users..."
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Selected Users */}
            {selectedUsers.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Selected ({selectedUsers.length})
                </label>
                <div className="flex flex-wrap gap-2">
                  {selectedUsers.map(user => (
                    <span
                      key={user.id}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                    >
                      {user.displayName}
                      <button
                        type="button"
                        onClick={() => handleUserToggle(user)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* User List */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Available Users
              </label>
              <div className="border border-gray-200 rounded-lg max-h-48 overflow-y-auto">
                {isLoadingUsers ? (
                  <div className="p-4 text-center text-gray-500">
                    Loading users...
                  </div>
                ) : usersError ? (
                  <div className="p-4 text-center">
                    <div className="text-red-500 text-sm mb-2">{usersError}</div>
                    <button
                      type="button"
                      onClick={fetchUsers}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Try again
                    </button>
                  </div>
                ) : filteredUsers.length > 0 ? (
                  filteredUsers.map((user: UserOption) => {
                    const isSelected = selectedUsers.some(u => u.id === user.id);
                    return (
                      <button
                        key={user.id}
                        type="button"
                        onClick={() => handleUserToggle(user)}
                        className={`w-full flex items-center p-3 hover:bg-gray-50 ${
                          isSelected ? 'bg-blue-50 border-blue-200' : ''
                        }`}
                      >
                        <div className="flex-shrink-0 mr-3">
                          {user.picture ? (
                            <img
                              src={user.picture}
                              alt={user.displayName}
                              className="w-8 h-8 rounded-full"
                            />
                          ) : (
                            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                              <User size={16} className="text-gray-600" />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1 text-left">
                          <div className="font-medium text-gray-900">
                            {user.displayName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                          {user.role && (
                            <div className="text-xs text-gray-400">
                              {user.role}
                            </div>
                          )}
                        </div>

                        {isSelected && (
                          <div className="text-blue-600">
                            ✓
                          </div>
                        )}
                      </button>
                    );
                  })
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    {searchTerm ? 'No users found matching your search' : 'No users available'}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={selectedUsers.length === 0}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Conversation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};