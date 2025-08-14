"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (user: string, pass: string) => Promise<boolean>;
  logout: () => void;
  signup: (user: string, pass: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if a session is stored in the browser
    const authStatus = localStorage.getItem('agri-sahayak-auth');
    if (authStatus) {
      setIsAuthenticated(true);
    }
  }, []);

  const signup = async (username: string, pass: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password: pass }),
      });

      if (!response.ok) {
        const data = await response.json();
        alert(`Signup failed: ${data.message}`);
        return false;
      }
      return true;
    } catch (error) {
      console.error('Signup fetch error:', error);
      alert('An error occurred during signup.');
      return false;
    }
  };

  const login = async (username: string, pass: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password: pass }),
      });

      if (response.ok) {
        // Store session state in the browser to stay logged in
        localStorage.setItem('agri-sahayak-auth', username); 
        setIsAuthenticated(true);
        return true;
      } else {
        const data = await response.json();
        alert(`Login failed: ${data.message}`);
        return false;
      }
    } catch (error) {
      console.error('Login fetch error:', error);
      alert('An error occurred during login.');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('agri-sahayak-auth');
    setIsAuthenticated(false);
  };

  const contextValue: AuthContextType = {
    isAuthenticated,
    login,
    logout,
    signup
  };

  return (
    // UPDATE the prop to use the new constant name
    <AuthContext.Provider value={contextValue}>
    {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}