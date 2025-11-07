'use client';

import React, { useState } from 'react';
import { MessagingInterface } from '@/components/messaging/MessagingInterface';
import { CreateConversationModal } from '@/components/messaging/CreateConversationModal';
import { CreateConversationData } from '@/types/messaging.types';
import { useCreateConversation } from '@/hooks/messaging-api.hook';
import { useCurrentUserProfile } from '@/hooks/user.hook';
import { Plus, Users, Loader2 } from 'lucide-react';

export default function UserMessagingPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { data: profile, isLoading: isLoadingProfile, error: profileError } = useCurrentUserProfile();
  
  const createConversationMutation = useCreateConversation();

  const handleCreateConversation = async (data: CreateConversationData) => {
    // console.log('User page: Creating conversation:', data);
    
    try {
      const newConversation = await createConversationMutation.mutateAsync(data);
      // console.log('User page: Conversation created successfully:', newConversation);
      setShowCreateModal(false);
    } catch (error) {
      console.error('User page: Failed to create conversation:', error);
    }
  };

  // Show loading state while fetching profile
  if (isLoadingProfile) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)] bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Show error state if profile failed to load
  if (profileError || !profile) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)] bg-gray-50">
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
    <div className="h-[calc(100vh-4rem)] bg-gray-50">
      {/* Messaging Interface - Integrated with layout */}
      <MessagingInterface
        currentUserId={currentUserId}
      />
    </div>
  );
}