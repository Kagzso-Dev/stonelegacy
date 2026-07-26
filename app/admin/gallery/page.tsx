'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Trash2, Plus, X, Image as ImageIcon, Loader2, Pencil, AlertTriangle } from 'lucide-react';
import { galleryCategories } from '@/lib/data';

const API = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/api$/, '');

interface GalleryItem { id: number; title: string; category: string; imageUrl: string; description?: string; }

const cats = galleryCategories.slice(1);

export default function AdminGalleryPage() {
  const [items, setItems]           = useState<GalleryItem[]>([]);
  const [filter, setFilter]         = useState('All');
  const [showAdd, setShowAdd]       = useState(false);
  const [showEdit, setShowEdit]     = useState(false);
  const [editItem, setEditItem]     = useState<GalleryItem | null>(null);
  const [deleteItem, setDeleteItem] = useState<GalleryItem | null>(null);
  const [deleting, setDeleting]     = useState(false);
  const [saving, setSaving]         = useState(false);
  const [loading, setLoading]       = useState(true);
  const [form, setForm]             = useState({ title: '', category: cats[0], description: '' });
  const [editForm, setEditForm]     = useState({ title: '', category: cats[0], description: '' });
  const [file, setFile]             = useState<File | null>(null);
  const [preview, setPreview]       = useState('');
  const fileRef                     = useRef<HTMLInputElement>(null);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

  useEffect(() => {
    fetch(`${API}/api/gallery`)
      .then((r) => r.json())
      .then((d) => { if (Array.isArray(d)) setItems(d); })
      .finally(() => setLoading(false));
  }, []);

  const handleFile = (f: File) => {
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(f);
  };

  const openAdd = () => {
    setForm({ title: '', category: cats[0], description: '' });
    setFile(null); setPreview(''); setShowAdd(true);
  };

  const openEdit = (item: GalleryItem) => {
    setEditItem(item);
    setEditForm({ title: item.title, category: item.category, description: item.description || '' });
    setShowEdit(true);
  };

  const addItem = async () => {
    if (!form.title || !file) return;
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append('title', form.title);
      fd.append('category', form.category);
      fd.append('description', form.description);
      fd.append('image', file);
      const r = await fetch(`${API}/api/gallery`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      const created = await r.json();
      if (created.id) setItems((prev) => [created, ...prev]);
      setShowAdd(false);
    } finally { setSaving(false); }
  };

  const saveEdit = async () => {
    if (!editItem || !editForm.title) return;
    setSaving(true);
    try {
      const r = await fetch(`${API}/api/gallery/${editItem.id}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });
      const updated = await r.json();
      if (updated.id) {
        setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
      }
      setShowEdit(false);
    } finally { setSaving(false); }
  };

  const remove = async (id: number) => {
    await fetch(`${API}/api/gallery/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const confirmDelete = async () => {
    if (!deleteItem) return;
    setDeleting(true);
    try {
      await remove(deleteItem.id);
      setDeleteItem(null);
    } finally { setDeleting(false); }
  };

  const filtered = filter === 'All' ? items : items.filter((i) => i.category === filter);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-5 sm:space-y-6">
      <div className="flex items-center justify-between">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold text-gray-900 font-[var(--font-playfair)]">Gallery</h1>
          <p className="text-gray-500 text-sm mt-0.5">{items.length} images</p>
        </motion.div>
        <button onClick={openAdd}
          className="gold-gradient text-white px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Image
        </button>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        {['All', ...cats].map((cat) => (
          <button key={cat} onClick={() => setFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              filter === cat ? 'gold-gradient text-white' : 'glass border border-black/[0.08] text-gray-500 hover:text-gray-900'
            }`}>
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {/* Upload card */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            onClick={openAdd}
            className="glass rounded-2xl border-2 border-dashed border-gray-200 h-52 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-all group"
          >
            <Upload className="w-8 h-8 text-gray-400 group-hover:text-gray-600 transition-colors mb-2" />
            <p className="text-gray-500 group-hover:text-gray-700 text-sm transition-colors">Upload Image</p>
          </motion.div>

          {filtered.map((item, i) => (
            <motion.div key={item.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              className="glass rounded-2xl overflow-hidden border border-gray-200 group"
            >
              <div className="h-36 relative bg-gray-100 flex items-center justify-center">
                {item.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-8 h-8 text-gray-300" />
                )}
                {/* Action buttons — visible on hover */}
                <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-all">
                  <button onClick={() => openEdit(item)}
                    className="w-7 h-7 bg-white rounded-lg flex items-center justify-center text-gray-500 hover:text-orange-500 shadow transition-colors">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => setDeleteItem(item)}
                    className="w-7 h-7 bg-white rounded-lg flex items-center justify-center text-gray-500 hover:text-red-500 shadow transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-900 text-sm font-semibold mb-1 truncate">{item.title}</p>
                <span className="text-[11px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full border border-gray-200">
                  {item.category}
                </span>
              </div>
            </motion.div>
          ))}

          {filtered.length === 0 && items.length > 0 && (
            <div className="col-span-full text-center py-12 text-gray-400">No images in this category</div>
          )}
        </div>
      )}

      {items.length === 0 && !loading && (
        <div className="text-center py-16 text-gray-400">
          <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No images yet — click Add Image to upload your first photo</p>
        </div>
      )}

      {/* ── Add Modal ── */}
      <AnimatePresence>
        {showAdd && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowAdd(false)}
          >
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-7 border border-gray-200 w-full max-w-sm shadow-xl"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-gray-900 font-bold font-[var(--font-playfair)]">Add Gallery Image</h3>
                <button onClick={() => setShowAdd(false)}><X className="w-5 h-5 text-gray-500" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-600 text-sm mb-1.5">Image *</label>
                  <label className="flex flex-col items-center gap-2 bg-gray-50 rounded-xl p-4 border-2 border-dashed border-gray-300 cursor-pointer hover:border-gray-400 transition-all">
                    {preview ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={preview} alt="preview" className="w-full h-32 object-cover rounded-lg" />
                    ) : (
                      <><Upload className="w-6 h-6 text-gray-400" /><span className="text-gray-500 text-sm">Click to select image</span></>
                    )}
                    <input ref={fileRef} type="file" accept="image/*" className="hidden"
                      onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
                  </label>
                </div>
                <div>
                  <label className="block text-gray-600 text-sm mb-1.5">Title *</label>
                  <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="input-dark" placeholder="Image title" />
                </div>
                <div>
                  <label className="block text-gray-600 text-sm mb-1.5">Category</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input-dark">
                    {cats.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600 text-sm mb-1.5">Description</label>
                  <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="input-dark resize-none" rows={2} placeholder="Optional description" />
                </div>
                <button onClick={addItem} disabled={!form.title || !file || saving}
                  className="w-full gold-gradient text-white py-3 rounded-xl font-semibold disabled:opacity-50 flex items-center justify-center gap-2">
                  {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Uploading…</> : 'Add to Gallery'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Edit Modal ── */}
      <AnimatePresence>
        {showEdit && editItem && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowEdit(false)}
          >
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-7 border border-gray-200 w-full max-w-sm shadow-xl"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-gray-900 font-bold font-[var(--font-playfair)]">Edit Image</h3>
                <button onClick={() => setShowEdit(false)}><X className="w-5 h-5 text-gray-500" /></button>
              </div>

              {/* Current image preview */}
              {editItem.imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={editItem.imageUrl} alt={editItem.title}
                  className="w-full h-36 object-cover rounded-xl mb-4 border border-gray-200" />
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-600 text-sm mb-1.5">Title *</label>
                  <input value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    className="input-dark" placeholder="Image title" />
                </div>
                <div>
                  <label className="block text-gray-600 text-sm mb-1.5">Category</label>
                  <select value={editForm.category} onChange={(e) => setEditForm({ ...editForm, category: e.target.value })} className="input-dark">
                    {cats.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600 text-sm mb-1.5">Description</label>
                  <textarea value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    className="input-dark resize-none" rows={2} placeholder="Optional description" />
                </div>
                <button onClick={saveEdit} disabled={!editForm.title || saving}
                  className="w-full gold-gradient text-white py-3 rounded-xl font-semibold disabled:opacity-50 flex items-center justify-center gap-2">
                  {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</> : 'Save Changes'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Delete Confirm Modal ── */}
      <AnimatePresence>
        {deleteItem && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => !deleting && setDeleteItem(null)}
          >
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-7 border border-gray-200 w-full max-w-sm shadow-xl"
            >
              <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center mb-4">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="text-gray-900 font-bold font-[var(--font-playfair)] mb-1.5">Delete this image?</h3>
              <p className="text-gray-500 text-sm mb-6">
                “{deleteItem.title}” will be permanently removed from the gallery. This can&apos;t be undone.
              </p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteItem(null)} disabled={deleting}
                  className="flex-1 py-2.5 rounded-xl font-semibold text-sm border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition-colors">
                  Cancel
                </button>
                <button onClick={confirmDelete} disabled={deleting}
                  className="flex-1 py-2.5 rounded-xl font-semibold text-sm bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 flex items-center justify-center gap-2 transition-colors">
                  {deleting ? <><Loader2 className="w-4 h-4 animate-spin" /> Deleting…</> : 'Delete'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
