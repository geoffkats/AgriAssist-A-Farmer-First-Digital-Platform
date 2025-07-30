'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useAuth } from './auth-context';

type ProStatusContextType = {
  isPro: boolean;
  upgradeToPro: () => void;
};

const ProStatusContext = createContext<ProStatusContextType | undefined>(undefined);

export const ProStatusProvider = ({ children }: { children: ReactNode }) => {
  const [isPro, setIsPro] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // Admins are always "Pro".
    // Or if a user has upgraded, they are pro.
    if (user?.role === 'admin' || isPro) {
      // do nothing, they are pro
    } else if(user?.isPro) {
      setIsPro(true);
    }
  }, [user, isPro]);


  const upgradeToPro = () => {
    setIsPro(true);
    // In a real app, you'd also update the user record in the database.
  };

  const isProAccess = user?.role === 'admin' || isPro;

  return (
    <ProStatusContext.Provider value={{ isPro: isProAccess, upgradeToPro }}>
      {children}
    </ProStatusContext.Provider>
  );
};

export const useProStatus = () => {
  const context = useContext(ProStatusContext);
  if (context === undefined) {
    throw new Error('useProStatus must be used within a ProStatusProvider');
  }
  return context;
};
