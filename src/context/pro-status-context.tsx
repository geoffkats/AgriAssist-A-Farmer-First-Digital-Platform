'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

type ProStatusContextType = {
  isPro: boolean;
  upgradeToPro: () => void;
};

const ProStatusContext = createContext<ProStatusContextType | undefined>(undefined);

export const ProStatusProvider = ({ children }: { children: ReactNode }) => {
  const [isPro, setIsPro] = useState(false);

  const upgradeToPro = () => {
    setIsPro(true);
  };

  return (
    <ProStatusContext.Provider value={{ isPro, upgradeToPro }}>
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
