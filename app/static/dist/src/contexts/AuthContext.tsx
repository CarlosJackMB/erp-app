import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, pin: string) => Promise<User>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = async (email: string, pin: string): Promise<User> => {
    // Simulate authentication
    if (pin === '1234') {
      const user: User = {
        id: '1',
        name: 'John Doe',
        email: email,
        role: 'admin'
      };
      setCurrentUser(user);
      return user;
    }
    throw new Error('Invalid PIN');
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};