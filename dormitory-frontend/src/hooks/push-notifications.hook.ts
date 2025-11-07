// Push notifications hook removed - functionality disabled

export interface PushNotificationOptions {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  data?: any;
  requireInteraction?: boolean;
  silent?: boolean;
}

export interface UsePushNotificationsReturn {
  permission: NotificationPermission;
  isSupported: boolean;
  requestPermission: () => Promise<boolean>;
  showNotification: (options: PushNotificationOptions) => Promise<void>;
  isEnabled: boolean;
}

// Empty hook - always returns disabled state
export const usePushNotifications = (): UsePushNotificationsReturn => {
  return {
    permission: 'denied' as NotificationPermission,
    isSupported: false,
    requestPermission: async () => false,
    showNotification: async () => {},
    isEnabled: false,
  };
};

export default usePushNotifications;
