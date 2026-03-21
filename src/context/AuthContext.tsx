import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { readStorage, writeStorage } from '@/utils/storage';

interface AuthContextValue {
  isAuthenticated: boolean;
  username: string;
  login: (name: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState(() => readStorage<string>('auth.username', ''));

  useEffect(() => {
    writeStorage('auth.username', username);
  }, [username]);

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated: Boolean(username),
      username,
      login: (name: string) => setUsername(name.trim()),
      logout: () => setUsername('')
    }),
    [username]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}