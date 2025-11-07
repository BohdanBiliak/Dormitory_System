'use client';

import React, { ReactNode, createContext, useContext } from 'react';

interface PushNotificationProviderProps {
  children: ReactNode;
}

interface PushNotificationContextType {
  permission: string;
  isSupported: boolean;
  isEnabled: boolean;
  requestPermission: () => Promise<void>;
}

const PushNotificationContext = createContext<PushNotificationContextType>({
  permission: 'default',
  isSupported: false,
  isEnabled: false,
  requestPermission: async () => {},
});

export const usePushNotificationContext = () => {
  return useContext(PushNotificationContext);
};

// Empty provider - push notifications disabled
export const PushNotificationProvider: React.FC<PushNotificationProviderProps> = ({ children }) => {
  const value: PushNotificationContextType = {
    permission: 'default',
    isSupported: false,
    isEnabled: false,
    requestPermission: async () => {},
  };

  return (
    <PushNotificationContext.Provider value={value}>
      {children}
    </PushNotificationContext.Provider>
  );
};

