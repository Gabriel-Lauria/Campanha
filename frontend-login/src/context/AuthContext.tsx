// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface AuthUser {
  id: number;
  usuarioNome: string;
  role: string;
  token?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  setUser: (user: AuthUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const setUser = (user: AuthUser) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUserState(user);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUserState(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
