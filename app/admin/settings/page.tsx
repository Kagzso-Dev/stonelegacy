'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettings } from '@/lib/settings-context';
import { useAdminTheme } from '@/lib/admin-theme-context';
import {
  Save, Diamond, Upload, X, Loader2, CheckCircle2,
  Building2, Phone, MapPin, Share2, Globe, Link, Sun, Moon, Mail, KeyRound, Palette,
} from 'lucide-react';

const Instagram = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Facebook = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Youtube = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2.5 7.1c.3-1.5 1.5-2.6 3-2.9C8.9 3.8 12 3.8 12 3.8s3.1 0 6.5.4c1.5.3 2.7 1.4 3 2.9.4 1.4.4 4.9.4 4.9s0 3.5-.4 4.9c-.3 1.5-1.5 2.6-3 2.9-3.4.4-6.5.4-6.5.4s-3.1 0-6.5-.4c-1.5-.3-2.7-1.4-3-2.9-.4-1.4-.4-4.9-.4-4.9s0-3.5.4-4.9z"/>
    <path d="m10 15 5-3-5-3v6z"/>
  </svg>
);

const API = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/api$/, '');

interface Settings {
  companyName: string; tagline: string; phone: string; whatsapp: string;
  email: string; address: string; city: string; state: string; pincode: string;
  facebook: string; instagram: string; youtube: string; website: string; logoUrl: string;
  accentColor: string; floatingButtonsEnabled: boolean;
  smtpUser: string; smtpPass: string;
}

const defaults: Settings = {
  companyName: 'StoneLegacy Engravers', tagline: 'Preserving Memories in Stone for Generations',
  phone: '+91 98400 00000', whatsapp: '+91 98400 00000', email: 'info@stonelegacy.in',
  address: '', city: 'Chennai', state: 'Tamil Nadu', pincode: '600 058',
  facebook: '', instagram: '', youtube: '', website: 'www.stonelegacy.in', logoUrl: '',
  accentColor: '#F97316', floatingButtonsEnabled: true,
  smtpUser: '', smtpPass: '',
};

const HEX_RE = /^#[0-9a-fA-F]{6}$/;

const colorPresets = [
  '#F97316', '#DC2626', '#CA8A04', '#16A34A',
  '#0891B2', '#2563EB', '#7C3AED', '#DB2777',
];

function Field({ label, value, onChange, type = 'text', placeholder = '', icon: Icon }:
  { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; icon?: React.ElementType }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />}
        <input
          type={type} value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full bg-white border border-gray-200 rounded-xl py-2.5 text-sm text-gray-800 outline-none transition-all focus:border-orange-400 focus:ring-2 focus:ring-orange-100 ${Icon ? 'pl-10 pr-4' : 'px-4'}`}
        />
      </div>
    </div>
  );
}

function SectionCard({ icon: Icon, title, description, color, children }:
  { icon: React.ElementType; title: string; description: string; color: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      <div className={`flex items-center gap-3 px-6 py-4 border-b border-gray-100 ${color}`}>
        <div className="w-8 h-8 bg-white/60 rounded-lg flex items-center justify-center">
          <Icon className="w-4 h-4" />
        </div>
        <div>
          <h3 className="font-bold text-sm">{title}</h3>
          <p className="text-xs opacity-70">{description}</p>
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

export default function SettingsPage() {
  const { refresh: refreshContext } = useSettings();
  const { theme, toggle } = useAdminTheme();
  const [settings, setSettings] = useState<Settings>(defaults);
  const [logoFile, setLogoFile]     = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState('');
  const [saving, setSaving]         = useState(false);
  const [saved, setSaved]           = useState(false);
  const [error, setError]           = useState('');
  const [dirty, setDirty]           = useState(false);
  const [dragOver, setDragOver]     = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`${API}/api/settings`, { headers: token ? { Authorization: `Bearer ${token}` } : {} })
      .then((r) => r.json()).then((d) => {
        setSettings((p) => ({
          ...p,
          ...Object.fromEntries(Object.entries(d).map(([k, v]) => [k, v ?? ''])),
          floatingButtonsEnabled: d.floatingButtonsEnabled === undefined ? p.floatingButtonsEnabled : !!Number(d.floatingButtonsEnabled),
        }));
        if (d.logoUrl) setLogoPreview(d.logoUrl);
      }).catch(() => {});
  }, []);

  useEffect(() => {
    if (HEX_RE.test(settings.accentColor)) {
      document.documentElement.style.setProperty('--color-orange-500', settings.accentColor);
    }
  }, [settings.accentColor]);

  const set = (key: keyof Settings) => (value: string) => {
    setSettings((p) => ({ ...p, [key]: value }));
    setDirty(true); setSaved(false);
  };

  const toggleFloatingButtons = () => {
    setSettings((p) => ({ ...p, floatingButtonsEnabled: !p.floatingButtonsEnabled }));
    setDirty(true); setSaved(false);
  };

  const handleLogoFile = (file: File) => {
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
    setDirty(true); setSaved(false);
  };

  const clearLogo = () => {
    setLogoFile(null);
    setLogoPreview(settings.logoUrl);
    if (fileRef.current) fileRef.current.value = '';
    setDirty(true);
  };

  const handleSave = async () => {
    setSaving(true); setError('');
    try {
      const token = localStorage.getItem('token');
      const form  = new FormData();
      Object.entries(settings).forEach(([k, v]) => {
        if (k === 'logoUrl') return;
        form.append(k, k === 'floatingButtonsEnabled' ? (v ? '1' : '0') : (v as string));
      });
      if (logoFile) form.append('logo', logoFile);
      const res = await fetch(`${API}/api/settings`, {
        method: 'PUT', headers: { Authorization: `Bearer ${token}` }, body: form,
      });
      if (!res.ok) throw new Error((await res.json()).error || 'Save failed');
      const data = await res.json();
      setSettings((p) => ({ ...p, logoUrl: data.logoUrl }));
      setLogoFile(null);
      if (data.logoUrl) setLogoPreview(data.logoUrl);
      setSaved(true); setDirty(false);
      refreshContext();
      setTimeout(() => setSaved(false), 3000);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to save');
    } finally { setSaving(false); }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl space-y-5 sm:space-y-6">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 font-[var(--font-playfair)] truncate">Settings</h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-0.5 hidden sm:block">Manage your company profile and preferences</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {/* Theme toggle */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggle}
            aria-label="Toggle theme"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:border-orange-300 hover:bg-orange-50 transition-all"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-orange-400" /> : <Moon className="w-4 h-4" />}
          </motion.button>

          {/* Save */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleSave}
            disabled={saving || !dirty}
            className={`flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl font-semibold text-sm transition-all disabled:opacity-40 ${
              saved ? 'bg-green-500 text-white' : 'gold-gradient text-white shadow-md'
            }`}
            style={!saved && dirty ? { boxShadow: '0 4px 20px rgba(249,115,22,0.35)' } : {}}
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span className="hidden sm:inline">{saving ? 'Saving…' : saved ? 'Saved!' : 'Save Changes'}</span>
            <span className="sm:hidden">{saving ? '…' : saved ? '✓' : 'Save'}</span>
          </motion.button>
        </div>
      </motion.div>

      {error && (
        <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
          <X className="w-4 h-4 shrink-0" /> {error}
        </motion.div>
      )}

      {/* Logo */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }}>
        <SectionCard icon={Diamond} title="Company Logo" description="Appears on invoices and the website header" color="bg-orange-50 text-orange-700">
          <div className="flex items-start gap-6">
            {/* Preview box */}
            <div className="relative shrink-0">
              <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden">
                {logoPreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={logoPreview} alt="logo" className="w-full h-full object-contain" />
                ) : (
                  <div className="w-full h-full gold-gradient flex items-center justify-center">
                    <Diamond className="w-10 h-10 text-white" fill="currentColor" />
                  </div>
                )}
              </div>
              {logoFile && (
                <button onClick={clearLogo}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow transition-colors">
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Drop zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) handleLogoFile(f); }}
              onClick={() => fileRef.current?.click()}
              className={`flex-1 border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
                dragOver ? 'border-orange-400 bg-orange-50' : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50/30'
              }`}
            >
              <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-600">{logoFile ? logoFile.name : 'Drop image here or click to upload'}</p>
              <p className="text-xs text-gray-400 mt-1">PNG · JPG · SVG · max 5 MB</p>
              <input ref={fileRef} type="file" accept="image/*" className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleLogoFile(f); }} />
            </div>
          </div>
        </SectionCard>
      </motion.div>

      {/* Company Info */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <SectionCard icon={Building2} title="Company Information" description="Basic details shown to customers" color="bg-blue-50 text-blue-700">
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <Field label="Company Name" value={settings.companyName} onChange={set('companyName')} placeholder="Your company name" />
            </div>
            <div className="sm:col-span-2">
              <Field label="Tagline" value={settings.tagline} onChange={set('tagline')} placeholder="A short description" />
            </div>
            <Field label="Phone" value={settings.phone} onChange={set('phone')} type="tel" placeholder="+91 98400 00000" icon={Phone} />
            <Field label="WhatsApp" value={settings.whatsapp} onChange={set('whatsapp')} type="tel" placeholder="+91 98400 00000" icon={Phone} />
            <Field label="Email" value={settings.email} onChange={set('email')} type="email" placeholder="info@example.com" />
            <Field label="Website" value={settings.website} onChange={set('website')} placeholder="www.yoursite.com" icon={Globe} />
          </div>
        </SectionCard>
      </motion.div>

      {/* Brand Color */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.12 }}>
        <SectionCard icon={Palette} title="Brand Color" description="Changes the accent color used across buttons, links and highlights on the site" color="bg-amber-50 text-amber-700">
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              {colorPresets.map((c) => {
                const active = settings.accentColor.toLowerCase() === c.toLowerCase();
                const style: React.CSSProperties & { '--tw-ring-color'?: string } =
                  { backgroundColor: c, '--tw-ring-color': active ? c : 'transparent' };
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => set('accentColor')(c)}
                    aria-label={`Use ${c}`}
                    className="w-9 h-9 rounded-full ring-2 ring-offset-2 transition-transform hover:scale-110"
                    style={style}
                  />
                );
              })}

              <div className="w-px h-8 bg-gray-200 mx-1" />

              {/* Native color wheel */}
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-gray-200 shrink-0">
                <input
                  type="color"
                  value={HEX_RE.test(settings.accentColor) ? settings.accentColor : '#F97316'}
                  onChange={(e) => set('accentColor')(e.target.value)}
                  className="absolute -top-2 -left-2 w-14 h-14 cursor-pointer"
                  aria-label="Pick a custom color"
                />
              </div>
            </div>

            {/* Manual hex entry */}
            <div className="flex items-center gap-3 max-w-xs">
              <div className="w-10 h-10 rounded-xl border border-gray-200 shrink-0" style={{ backgroundColor: HEX_RE.test(settings.accentColor) ? settings.accentColor : '#F97316' }} />
              <div className="flex-1 space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Hex Code</label>
                <input
                  type="text"
                  value={settings.accentColor}
                  onChange={(e) => set('accentColor')(e.target.value)}
                  placeholder="#F97316"
                  maxLength={7}
                  className={`w-full bg-white border rounded-xl py-2.5 px-4 text-sm font-mono outline-none transition-all focus:ring-2 focus:ring-orange-100 ${
                    HEX_RE.test(settings.accentColor) ? 'border-gray-200 focus:border-orange-400 text-gray-800' : 'border-red-300 text-red-500'
                  }`}
                />
              </div>
            </div>
            {!HEX_RE.test(settings.accentColor) && (
              <p className="text-xs text-red-500">Enter a valid 6-digit hex code, e.g. #F97316</p>
            )}
          </div>
        </SectionCard>
      </motion.div>

      {/* Floating Contact Buttons */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.13 }}>
        <SectionCard icon={Phone} title="Floating Contact Buttons" description="The WhatsApp and Call buttons shown in the bottom-right corner of every page" color="bg-sky-50 text-sky-700">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-800">Show floating buttons</p>
              <p className="text-xs text-gray-400 mt-0.5">Turn off to hide the WhatsApp and Call bubbles site-wide</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={settings.floatingButtonsEnabled}
              onClick={toggleFloatingButtons}
              className={`relative shrink-0 w-12 h-7 rounded-full transition-colors duration-200 ${
                settings.floatingButtonsEnabled ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <motion.span
                layout
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="absolute top-1 w-5 h-5 rounded-full bg-white shadow"
                style={{ left: settings.floatingButtonsEnabled ? 24 : 4 }}
              />
            </button>
          </div>
        </SectionCard>
      </motion.div>

      {/* Address */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
        <SectionCard icon={MapPin} title="Address" description="Business location for orders and maps" color="bg-green-50 text-green-700">
          <div className="space-y-5">
            <Field label="Street Address" value={settings.address} onChange={set('address')} placeholder="Street / Area / Landmark" icon={MapPin} />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Field label="City"    value={settings.city}    onChange={set('city')}    placeholder="Chennai" />
              <Field label="State"   value={settings.state}   onChange={set('state')}   placeholder="Tamil Nadu" />
              <Field label="Pincode" value={settings.pincode} onChange={set('pincode')} placeholder="600 001" />
            </div>
          </div>
        </SectionCard>
      </motion.div>

      {/* Social Media */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <SectionCard icon={Share2} title="Social Media" description="Links shown in the website footer" color="bg-purple-50 text-purple-700">
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Facebook"  value={settings.facebook}  onChange={set('facebook')}  placeholder="https://facebook.com/…"  icon={Facebook}  />
            <Field label="Instagram" value={settings.instagram} onChange={set('instagram')} placeholder="https://instagram.com/…" icon={Instagram} />
            <Field label="YouTube"   value={settings.youtube}   onChange={set('youtube')}   placeholder="https://youtube.com/…"   icon={Youtube}   />
            <Field label="Website"   value={settings.website}   onChange={set('website')}   placeholder="www.yoursite.com"         icon={Link}      />
          </div>
        </SectionCard>
      </motion.div>

      {/* Email Notifications */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
        <SectionCard icon={Mail} title="Email Notifications" description="Send an email to yourself whenever a customer submits the Contact form" color="bg-orange-50 text-orange-700">
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Sender Gmail Address" value={settings.smtpUser} onChange={set('smtpUser')} type="email" placeholder="yourname@gmail.com" icon={Mail} />
            <Field label="Gmail App Password" value={settings.smtpPass} onChange={set('smtpPass')} type="password" placeholder="16-character app password" icon={KeyRound} />
          </div>
          <p className="text-xs text-gray-400 mt-4 leading-relaxed">
            This must be a <strong>Gmail App Password</strong>, not your normal Gmail password. Generate one at{' '}
            <a href="https://myaccount.google.com/apppasswords" target="_blank" rel="noopener noreferrer" className="text-orange-600 underline">
              myaccount.google.com/apppasswords
            </a>{' '}(requires 2-Step Verification on the Gmail account). Notification emails are sent to the <strong>Email</strong> address set above in Company Information.
          </p>
        </SectionCard>
      </motion.div>

      {/* Floating save toast */}
      <AnimatePresence>
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-gray-900 text-white text-sm font-medium px-5 py-3 rounded-full shadow-xl"
          >
            <CheckCircle2 className="w-4 h-4 text-green-400" /> Settings saved successfully
          </motion.div>
        )}
      </AnimatePresence>

      <div className="h-4" />
    </div>
  );
}
