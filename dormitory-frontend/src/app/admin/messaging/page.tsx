'use client';

import React, { useState } from 'react';
import { MessagingInterface } from '@/components/messaging/MessagingInterface';
import { CreateConversationModal } from '@/components/messaging/CreateConversationModal';
import { CreateConversationData } from '@/types/messaging.types';
import { useCreateConversation } from '@/hooks/messaging-api.hook';
import { useGetAdminProfile } from '@/hooks/profile.hook';
import { Plus, Users, Loader2 } from 'lucide-react';
import { useLanguage } from '@/providers/language.provider';

export default function AdminMessagingPage() {
  const {t} = useLanguage();
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  const { data: profile, isLoading: isLoadingProfile, error: profileError } = useGetAdminProfile();
  
  const createConversationMutation = useCreateConversation();

  const handleCreateConversation = async (data: CreateConversationData) => {
    // console.log('Admin page: Creating conversation:', data);
    
    try {
      const newConversation = await createConversationMutation.mutateAsync(data);
      // console.log('Admin page: Conversation created successfully:', newConversation);
      setShowCreateModal(false);
    } catch (error) {
      console.error('Admin page: Failed to create conversation:', error);
    }
  };

  // Show loading state while fetching profile
  if (isLoadingProfile) {
    return (
      <div className="h-screen bg-slate-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 max-w-md mx-4 border border-slate-200">
          <div className="flex items-center justify-center">
            <div className="rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
            <span className="ml-4 text-slate-700 font-medium text-lg">{t('messaging.adminPage.loadingProfile')}</span>
          </div>
        </div>
      </div>
    );
  }

  // Show error state if profile failed to load
  if (profileError || !profile) {
    return (
      <div className="h-screen bg-slate-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 max-w-md mx-4 border border-slate-200">
          <div className="text-center">
            <p className="text-red-600 mb-4 font-medium">{t('messaging.adminPage.failedToLoad')}</p>
            <button 
              onClick={() => window.location.href = '/auth/login'}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              {t('messaging.adminPage.goToLogin')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentUserId = profile.id;

  return (
    <div className="h-screen bg-slate-50">
      {/* Messaging Interface - Integrated with layout */}
      <MessagingInterface
        currentUserId={currentUserId}
      />

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