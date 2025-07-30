
'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { users } from '@/lib/users';

type User = {
    name: string;
    email: string;
    role: 'user' | 'admin';
    isPro: boolean;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for a logged-in user in session storage
    const storedUser = sessionStorage.getItem('agriassist-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const authenticatedUser = users.authenticateUser(email, password);
    if (authenticatedUser) {
      const userData = {
        name: authenticatedUser.name,
        email: authenticatedUser.email,
        role: authenticatedUser.role,
        isPro: authenticatedUser.isPro,
      };
      setUser(userData);
      sessionStorage.setItem('agriassist-user', JSON.stringify(userData));
      return userData;
    } else {
      throw new Error('Invalid email or password.');
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
        users.addUser(name, email, password);
    } catch (error) {
        throw error;
    }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('agriassist-user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
