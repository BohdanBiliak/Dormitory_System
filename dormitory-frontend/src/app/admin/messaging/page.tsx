'use client';

import React, { useState } from 'react';
import { MessagingInterface } from '@/components/messaging/MessagingInterface';
import { CreateConversationModal } from '@/components/messaging/CreateConversationModal';
import { CreateConversationData } from '@/types/messaging.types';
import { useCreateConversation } from '@/hooks/messaging-api.hook';
import { useGetAdminProfile } from '@/hooks/profile.hook';
import { Plus, Users, Loader2 } from 'lucide-react';

export default function AdminMessagingPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  const { data: profile, isLoading: isLoadingProfile, error: profileError } = useGetAdminProfile();
  
  const createConversationMutation = useCreateConversation();

  const handleCreateConversation = async (data: CreateConversationData) => {
    console.log('Admin page: Creating conversation:', data);
    
    try {
      const newConversation = await createConversationMutation.mutateAsync(data);
      console.log('Admin page: Conversation created successfully:', newConversation);
      setShowCreateModal(false);
    } catch (error) {
      console.error('Admin page: Failed to create conversation:', error);
    }
  };

  // Show loading state while fetching profile
  if (isLoadingProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Show error state if profile failed to load
  if (profileError || !profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load profile. Please try logging in again.</p>
          <button 
            onClick={() => window.location.href = '/auth/login'}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const currentUserId = profile.id;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <Users className="w-8 h-8 mr-3 text-blue-600" />
                Academic Communications
              </h1>
              <p className="text-gray-600 mt-1">
                Communicate with dormitory residents and staff
              </p>
            </div>
            
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              <span>New Conversation</span>
            </button>
          </div>
        </div>
      </div>

      {/* Messaging Interface */}
      <div className="h-screen">
        <MessagingInterface
          currentUserId={currentUserId}
        />
      </div>

      {/* Create Conversation Modal */}
      {showCreateModal && (
        <CreateConversationModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onCreateConversation={handleCreateConversation}
        />
      )}
    </div>
  );
}