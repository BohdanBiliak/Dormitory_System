'use client';

import React, { useState } from 'react';
import { Bell, BellOff, X } from 'lucide-react';
import { usePushNotificationContext } from '@/providers/push-notification.provider';
import { useLanguage } from '@/providers/language.provider';

export const NotificationPermissionBanner: React.FC = () => {
  const { permission, isSupported, requestPermission } = usePushNotificationContext();
  const { t } = useLanguage();
  const [isDismissed, setIsDismissed] = useState(false);

  if (!isSupported || permission === 'granted' || permission === 'denied' || isDismissed) {
    return null;
  }

  return (
    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4 rounded-lg shadow-sm">
      <div className="flex items-start">
        <Bell className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-semibold text-blue-900">{t('notifications.enable')}</h3>
          <p className="text-sm text-blue-800 mt-1">
            {t('notifications.subtitle')}
          </p>
          <div className="mt-3 flex space-x-3">
            <button
              onClick={requestPermission}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              {t('notifications.enableButton')}
            </button>
            <button
              onClick={() => setIsDismissed(true)}
              className="px-4 py-2 bg-white text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-50 transition-colors border border-blue-200"
            >
              {t('notifications.maybeLater')}
            </button>
          </div>
        </div>
        <button
          onClick={() => setIsDismissed(true)}
          className="ml-3 flex-shrink-0 text-blue-400 hover:text-blue-600 transition-colors"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export const NotificationSettingsButton: React.FC = () => {
  const { permission, isSupported, requestPermission, isEnabled } = usePushNotificationContext();
  const { t } = useLanguage();

  if (!isSupported) {
    return null;
  }

  return (
    <button
      onClick={requestPermission}
      disabled={permission === 'denied'}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
        isEnabled
          ? 'bg-green-50 text-green-700 hover:bg-green-100'
          : permission === 'denied'
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
          : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
      }`}
      title={
        permission === 'denied'
          ? t('notifications.blockedMessage')
          : isEnabled
          ? t('notifications.enabled')
          : t('notifications.enableButton')
      }
    >
      {isEnabled ? <Bell size={18} /> : <BellOff size={18} />}
      <span className="text-sm font-medium">
        {permission === 'denied'
          ? t('notifications.blocked')
          : isEnabled
          ? t('notifications.on')
          : t('notifications.enableButton')}
      </span>
    </button>
  );
};
