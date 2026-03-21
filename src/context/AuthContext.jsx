import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { readStorage, writeStorage } from '@/utils/storage.js';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [username, setUsername] = useState(() => readStorage('auth.username', ''));

  useEffect(() => {
    writeStorage('auth.username', username);
  }, [username]);

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(username),
      username,
      login: (name) => setUsername(name.trim()),
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