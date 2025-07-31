
'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useAuth } from './auth-context';

type ProStatusContextType = {
  isPro: boolean;
  aiCredits: number;
  upgradeToPro: () => void;
  consumeCredit: () => void;
  addCredits: (amount: number) => void;
};

const ProStatusContext = createContext<ProStatusContextType | undefined>(undefined);

export const ProStatusProvider = ({ children }: { children: ReactNode }) => {
  const [isPro, setIsPro] = useState(false);
  const { user, updateUser } = useAuth();
  const [aiCredits, setAiCredits] = useState(user?.aiCredits || 0);

  useEffect(() => {
    if (user) {
        setIsPro(user.isPro);
        setAiCredits(user.aiCredits);
    }
  }, [user]);

  const upgradeToPro = () => {
    if (user) {
        const updatedUser = { ...user, isPro: true, aiCredits: 200 };
        updateUser(updatedUser);
        setIsPro(true);
        setAiCredits(200);
    }
  };

  const consumeCredit = () => {
    if (user && aiCredits > 0) {
        const newCredits = aiCredits - 1;
        setAiCredits(newCredits);
        const updatedUser = { ...user, aiCredits: newCredits };
        updateUser(updatedUser);
    }
  };

  const addCredits = (amount: number) => {
     if (user) {
        const newCredits = aiCredits + amount;
        setAiCredits(newCredits);
        const updatedUser = { ...user, aiCredits: newCredits };
        updateUser(updatedUser);
    }
  }

  const isProAccess = user?.role === 'admin' || isPro;

  return (
    <ProStatusContext.Provider value={{ isPro: isProAccess, aiCredits, upgradeToPro, consumeCredit, addCredits }}>
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
