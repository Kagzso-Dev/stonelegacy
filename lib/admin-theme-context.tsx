'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type AdminTheme = 'light' | 'dark';

interface AdminThemeCtx {
  theme: AdminTheme;
  toggle: () => void;
}

const AdminThemeContext = createContext<AdminThemeCtx>({ theme: 'light', toggle: () => {} });

export function AdminThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<AdminTheme>('light');

  useEffect(() => {
    const saved = localStorage.getItem('admin-theme') as AdminTheme | null;
    if (saved === 'dark' || saved === 'light') setTheme(saved);
  }, []);

  const toggle = () => {
    setTheme(t => {
      const next = t === 'light' ? 'dark' : 'light';
      localStorage.setItem('admin-theme', next);
      return next;
    });
  };

  return (
    <AdminThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </AdminThemeContext.Provider>
  );
}

export const useAdminTheme = () => useContext(AdminThemeContext);
