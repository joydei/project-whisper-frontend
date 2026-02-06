import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';

export interface User {
  name: string;
  username: string;
  avatar: string;
  verified: boolean;
  email: string;
  phone: string;
  location: string;
  bio: string;
  joinDate: string;
}

interface UserContextType {
  currentUser: User;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const currentUser: User = {
    name: 'Joy Dei',
    username: 'joy_dei',
    avatar: 'JD',
    verified: false,
    email: 'joy.dei@example.com',
    phone: '+233 24 123 4567',
    location: 'Accra, Ghana',
    bio: 'Community advocate passionate about civic engagement and local development.',
    joinDate: 'January 2026'
  };

  return (
    <UserContext.Provider value={{ currentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
