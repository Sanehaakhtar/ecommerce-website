"use client"
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from "react";

interface AuthUser {
  name: string;
  email?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const AUTH_STORAGE_KEY = "shopspace-auth-user";
const AUTH_COOKIE_KEY = "shopspace-auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser) as AuthUser);
        document.cookie = `${AUTH_COOKIE_KEY}=1; path=/; max-age=604800`;
      } catch {
        setUser(null);
      }
    }
  }, []);

  const login = useCallback((nextUser: AuthUser) => {
    setUser(nextUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser));
    document.cookie = `${AUTH_COOKIE_KEY}=1; path=/; max-age=604800`;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    document.cookie = `${AUTH_COOKIE_KEY}=; path=/; max-age=0`;
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      logout,
    }),
    [login, logout, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
