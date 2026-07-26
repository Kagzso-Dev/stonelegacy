'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Upload, Trash2, Plus, X, Image as ImageIcon, Video,
  Loader2, Play, ImagePlus, Layers, ExternalLink, Save, CheckCircle2,
} from 'lucide-react';

const API = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/api$/, '');

const SERVICES = [
  { slug: 'home',              label: 'Home Page',         visitPath: '/'                          },
  { slug: 'house-name-boards', label: 'House Name Boards', visitPath: '/services/house-name-boards' },
  { slug: 'school-memorials',  label: 'School Memorials',  visitPath: '/services/school-memorials'  },
  { slug: 'donor-walkways',    label: 'Donor Walkways',    visitPath: '/services/donor-walkways'    },
  { slug: 'campus-signage',    label: 'Campus Signage',    visitPath: '/services/campus-signage'    },
];

interface MediaItem {
  id: number; service: string; type: 'image' | 'video';
  title: string; mediaUrl: string; thumbnail: string; description?: string;
}

interface ServiceHero {
  heroImageUrl?: string; cardImageUrl?: string;
}

interface StagedFiles {
  heroImage?: File; heroPreview?: string;
  cardImage?: File; cardPreview?: string;
}

type Tab = 'hero' | 'gallery';

/* ─── Hero upload slot (preview only, no auto-upload) ─── */
function HeroUploadSlot({
  label, currentUrl, preview, onFileChosen,
}: {
  label: string; currentUrl: string; preview: string;
  onFileChosen: (f: File, preview: string) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);

  const handleChange = (f: File) => {
    const reader = new FileReader();
    reader.onload = e => onFileChosen(f, e.target?.result as string);
    reader.readAsDataURL(f);
  };

  const displayUrl = preview || currentUrl;

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</p>
      <label className="relative block cursor-pointer group rounded-2xl overflow-hidden border-2 border-dashed border-gray-200 hover:border-orange-300 transition-all"
        style={{ height: 160 }}>
        {displayUrl ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={displayUrl} alt={label} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="flex flex-col items-center gap-1 text-white">
                <Upload className="w-5 h-5" />
                <span className="text-xs font-medium">Replace</span>
              </div>
            </div>
            {preview && (
              <div className="absolute top-2 left-2 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                Unsaved
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-400 group-hover:text-gray-600 transition-colors">
            <ImagePlus className="w-7 h-7" />
            <span className="text-xs">Upload image</span>
          </div>
        )}
        <input ref={ref} type="file" accept="image/*" className="hidden"
          onChange={e => { const f = e.target.files?.[0]; if (f) handleChange(f); }} />
      </label>
    </div>
  );
}

/* ─── Main page ─── */
export default function ServiceMediaPage() {
  const [tab, setTab]               = useState<Tab>('hero');
  const [activeService, setActiveService] = useState(SERVICES[0].slug);
  const [items, setItems]           = useState<MediaItem[]>([]);
  const [heroMap, setHeroMap]       = useState<Record<string, ServiceHero>>({});
  const [staged, setStaged]         = useState<Record<string, StagedFiles>>({});
  const [saving, setSaving]         = useState<Record<string, boolean>>({});
  const [saved, setSaved]           = useState<Record<string, boolean>>({});
  const [loading, setLoading]       = useState(true);
  const [showModal, setShowModal]   = useState(false);
  const [modalSaving, setModalSaving] = useState(false);
  const [form, setForm]             = useState({ title: '', type: 'image' as 'image' | 'video', description: '' });
  const [file, setFile]             = useState<File | null>(null);
  const [preview, setPreview]       = useState('');
  const fileRef                     = useRef<HTMLInputElement>(null);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

  const loadGallery = async (service: string) => {
    setLoading(true);
    try {
      const r = await fetch(`${API}/api/service-media?service=${service}`);
      const d = await r.json();
      if (Array.isArray(d)) setItems(d);
    } finally { setLoading(false); }
  };

  const loadHeroes = async () => {
    try {
      const r = await fetch(`${API}/api/service-settings`);
      const d = await r.json();
      if (Array.isArray(d)) {
        const map: Record<string, ServiceHero> = {};
        d.forEach((row: any) => { map[row.service] = row; });
        setHeroMap(map);
      }
    } catch {}
  };

  useEffect(() => { loadHeroes(); }, []);
  useEffect(() => { if (tab === 'gallery') loadGallery(activeService); }, [activeService, tab]);

  const stageFile = (slug: string, field: 'heroImage' | 'cardImage', f: File, prev: string) => {
    const previewKey = field === 'heroImage' ? 'heroPreview' : 'cardPreview';
    setStaged(m => ({
      ...m,
      [slug]: {
        ...m[slug],
        [field]: f,
        [previewKey]: prev,
      },
    }));
    setSaved(m => ({ ...m, [slug]: false }));
  };

  const saveHero = async (slug: string) => {
    const s = staged[slug];
    if (!s?.heroImage && !s?.cardImage) return;
    setSaving(m => ({ ...m, [slug]: true }));
    try {
      const fd = new FormData();
      if (s.heroImage) fd.append('heroImage', s.heroImage);
      if (s.cardImage) fd.append('cardImage', s.cardImage);
      const r = await fetch(`${API}/api/service-settings/${slug}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      const d = await r.json();
      setHeroMap(m => ({
        ...m,
        [slug]: {
          heroImageUrl: d.heroImageUrl || m[slug]?.heroImageUrl,
          cardImageUrl: d.cardImageUrl || m[slug]?.cardImageUrl,
        },
      }));
      setStaged(m => ({ ...m, [slug]: {} }));
      setSaved(m => ({ ...m, [slug]: true }));
      setTimeout(() => setSaved(m => ({ ...m, [slug]: false })), 2500);
    } finally { setSaving(m => ({ ...m, [slug]: false })); }
  };

  const handleFile = (f: File) => {
    setFile(f);
    const isVid = f.type.startsWith('video/');
    setForm(p => ({ ...p, type: isVid ? 'video' : 'image' }));
    if (!isVid) {
      const reader = new FileReader();
      reader.onload = e => setPreview(e.target?.result as string);
      reader.readAsDataURL(f);
    } else { setPreview(''); }
  };

  const openModal = () => {
    setForm({ title: '', type: 'image', description: '' });
    setFile(null); setPreview(''); setShowModal(true);
  };

  const addItem = async () => {
    if (!form.title || !file) return;
    setModalSaving(true);
    try {
      const fd = new FormData();
      fd.append('service', activeService);
      fd.append('type',    form.type);
      fd.append('title',   form.title);
      fd.append('description', form.description);
      fd.append('media', file);
      const r = await fetch(`${API}/api/service-media`, {
        method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: fd,
      });
      const created = await r.json();
      if (created.id) setItems(prev => [created, ...prev]);
      setShowModal(false);
    } finally { setModalSaving(false); }
  };

  const remove = async (id: number) => {
    await fetch(`${API}/api/service-media/${id}`, {
      method: 'DELETE', headers: { Authorization: `Bearer ${token}` },
    });
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const serviceLabel = SERVICES.find(s => s.slug === activeService)?.label ?? '';

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-5 sm:space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 font-[var(--font-playfair)]">Service Media</h1>
          <p className="text-gray-500 text-sm mt-0.5 hidden sm:block">Hero images &amp; gallery for each service page</p>
        </motion.div>
        {tab === 'gallery' && (
          <button onClick={openModal}
            className="gold-gradient text-white px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-2 shadow-md shrink-0">
            <Plus className="w-4 h-4" /> Add Media
          </button>
        )}
      </div>

      {/* Main tabs */}
      <div className="flex gap-2 border-b border-gray-200 pb-0">
        {[
          { key: 'hero',    label: 'Hero Images',   icon: ImagePlus },
          { key: 'gallery', label: 'Page Gallery',  icon: Layers    },
        ].map(t => (
          <button key={t.key} onClick={() => setTab(t.key as Tab)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-t-xl border-b-2 transition-all ${
              tab === t.key
                ? 'border-orange-500 text-orange-600 bg-orange-50/50'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}>
            <t.icon className="w-4 h-4" />{t.label}
          </button>
        ))}
      </div>

      {/* ── TAB: Hero Images ── */}
      {tab === 'hero' && (
        <div className="space-y-6">
          <p className="text-sm text-gray-500">
            Upload a <strong>hero background</strong> and <strong>card image</strong> for each service page.
            Choose your images, then click <strong>Save Changes</strong> to apply them to the live site.
          </p>
          <div className="grid gap-6">
            {SERVICES.map(s => {
              const hero    = heroMap[s.slug] || {};
              const st      = staged[s.slug]  || {};
              const hasNew  = !!(st.heroImage || st.cardImage);
              const isSaving = saving[s.slug];
              const wasSaved = saved[s.slug];

              return (
                <motion.div key={s.slug}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
                >
                  {/* Section header */}
                  <div className="flex items-center gap-3 px-5 py-4 bg-orange-50 border-b border-orange-100">
                    <div className="w-7 h-7 rounded-lg gold-gradient flex items-center justify-center">
                      <ImagePlus className="w-3.5 h-3.5 text-white" />
                    </div>
                    <h3 className="font-bold text-orange-800 text-sm">{s.label}</h3>
                    <Link href={s.visitPath} target="_blank"
                      className="ml-auto flex items-center gap-1.5 text-xs font-semibold text-orange-600 bg-orange-100 hover:bg-orange-200 border border-orange-200 px-3 py-1 rounded-full transition-colors">
                      <ExternalLink className="w-3 h-3" /> Visit Page
                    </Link>
                  </div>

                  {/* Upload slots */}
                  <div className="p-5 grid sm:grid-cols-2 gap-5">
                    <HeroUploadSlot
                      label={s.slug === 'home' ? 'Hero Background (full-width)' : 'Hero Background (full-width)'}
                      currentUrl={hero.heroImageUrl || ''}
                      preview={st.heroPreview || ''}
                      onFileChosen={(f, prev) => stageFile(s.slug, 'heroImage', f, prev)}
                    />
                    <HeroUploadSlot
                      label={s.slug === 'home' ? 'Showcase Card (right panel)' : 'Card Image (right panel)'}
                      currentUrl={hero.cardImageUrl || ''}
                      preview={st.cardPreview || ''}
                      onFileChosen={(f, prev) => stageFile(s.slug, 'cardImage', f, prev)}
                    />
                  </div>

                  {/* Save button row */}
                  <div className="px-5 pb-5 flex items-center justify-between">
                    <p className="text-xs text-gray-400">
                      {hasNew ? 'You have unsaved changes — click Save to apply.' : 'Select images above to update this page.'}
                    </p>
                    <button
                      onClick={() => saveHero(s.slug)}
                      disabled={!hasNew || isSaving}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm
                        ${wasSaved
                          ? 'bg-green-500 text-white'
                          : hasNew
                            ? 'gold-gradient text-white hover:opacity-90'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                    >
                      {isSaving ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</>
                      ) : wasSaved ? (
                        <><CheckCircle2 className="w-4 h-4" /> Saved!</>
                      ) : (
                        <><Save className="w-4 h-4" /> Save Changes</>
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── TAB: Gallery ── */}
      {tab === 'gallery' && (
        <>
          <div className="flex flex-wrap gap-2">
            {SERVICES.map(s => (
              <button key={s.slug} onClick={() => setActiveService(s.slug)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeService === s.slug
                    ? 'gold-gradient text-white shadow-sm'
                    : 'glass border border-black/[0.08] text-gray-500 hover:text-gray-900'
                }`}>
                {s.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                onClick={openModal}
                className="glass rounded-2xl border-2 border-dashed border-gray-200 h-52 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-all group"
              >
                <Upload className="w-8 h-8 text-gray-400 group-hover:text-gray-600 transition-colors mb-2" />
                <p className="text-gray-500 group-hover:text-gray-700 text-sm">Add Image / Video</p>
              </motion.div>

              {items.map((item, i) => (
                <motion.div key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="glass rounded-2xl overflow-hidden border border-gray-200 group"
                >
                  <div className="h-40 relative bg-gray-100 flex items-center justify-center">
                    {item.type === 'video' ? (
                      <>
                        {item.thumbnail
                          // eslint-disable-next-line @next/next/no-img-element
                          ? <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                          : <Video className="w-10 h-10 text-gray-300" />}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center">
                            <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                          </div>
                        </div>
                      </>
                    ) : item.mediaUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.mediaUrl} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-gray-300" />
                    )}
                    <button onClick={() => remove(item.id)}
                      className="absolute top-2 right-2 w-7 h-7 bg-white rounded-lg flex items-center justify-center text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all shadow">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <span className={`absolute bottom-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      item.type === 'video' ? 'bg-purple-500 text-white' : 'bg-orange-500 text-white'
                    }`}>{item.type}</span>
                  </div>
                  <div className="p-3">
                    <p className="text-gray-900 text-sm font-semibold truncate">{item.title}</p>
                    {item.description && <p className="text-gray-400 text-xs mt-0.5 truncate">{item.description}</p>}
                  </div>
                </motion.div>
              ))}

              {items.length === 0 && (
                <div className="col-span-full text-center py-16 text-gray-400">
                  <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="font-medium">No media for {serviceLabel} yet</p>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Add Media Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              onClick={e => e.stopPropagation()}
              className="bg-white w-full sm:max-w-sm rounded-t-3xl sm:rounded-2xl p-6 sm:p-7 border border-gray-200 shadow-xl"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-gray-900 font-bold font-[var(--font-playfair)]">Add to {serviceLabel}</h3>
                <button onClick={() => setShowModal(false)}><X className="w-5 h-5 text-gray-500" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-600 text-sm mb-1.5">Image or Video *</label>
                  <label className="flex flex-col items-center gap-2 bg-gray-50 rounded-xl p-4 border-2 border-dashed border-gray-300 cursor-pointer hover:border-gray-400 transition-all">
                    {preview
                      // eslint-disable-next-line @next/next/no-img-element
                      ? <img src={preview} alt="preview" className="w-full h-32 object-cover rounded-lg" />
                      : file
                        ? <div className="flex flex-col items-center gap-1"><Video className="w-8 h-8 text-purple-400" /><span className="text-gray-600 text-sm truncate max-w-[180px]">{file.name}</span></div>
                        : <><Upload className="w-6 h-6 text-gray-400" /><span className="text-gray-500 text-sm">Image (JPG/PNG) or Video (MP4)</span></>
                    }
                    <input ref={fileRef} type="file" accept="image/*,video/*" className="hidden"
                      onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
                  </label>
                </div>
                <div>
                  <label className="block text-gray-600 text-sm mb-1.5">Title *</label>
                  <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                    className="input-dark" placeholder="e.g. Completed donor walkway" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 text-sm">Type:</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full uppercase ${
                    form.type === 'video' ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700'
                  }`}>{form.type}</span>
                </div>
                <div>
                  <label className="block text-gray-600 text-sm mb-1.5">Caption (optional)</label>
                  <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                    className="input-dark resize-none" rows={2} placeholder="Short description" />
                </div>
                <button onClick={addItem} disabled={!form.title || !file || modalSaving}
                  className="w-full gold-gradient text-white py-3 rounded-xl font-semibold disabled:opacity-50 flex items-center justify-center gap-2">
                  {modalSaving ? <><Loader2 className="w-4 h-4 animate-spin" /> Uploading…</> : 'Upload & Save'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
