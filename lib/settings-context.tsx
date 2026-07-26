'use client';

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';

const API = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/api$/, '');

export interface SiteSettings {
  companyName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  facebook: string;
  instagram: string;
  youtube: string;
  website: string;
  logoUrl: string;
  accentColor: string;
  floatingButtonsEnabled: boolean | number;
}

interface SettingsContextValue {
  settings: SiteSettings | null;
  refresh: () => void;
}

const SettingsContext = createContext<SettingsContextValue>({ settings: null, refresh: () => {} });

const HEX_RE = /^#[0-9a-fA-F]{3,8}$/;

function applyAccentColor(color: string | undefined) {
  if (!color || !HEX_RE.test(color)) return;
  document.documentElement.style.setProperty('--color-orange-500', color);
  localStorage.setItem('site-accent-color', color);
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  const load = useCallback(() => {
    fetch(`${API}/api/settings`)
      .then((r) => r.json())
      .then((d) => { setSettings(d); applyAccentColor(d?.accentColor); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    applyAccentColor(localStorage.getItem('site-accent-color') || undefined);
    load();
  }, [load]);

  return (
    <SettingsContext.Provider value={{ settings, refresh: load }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
