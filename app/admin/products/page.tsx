'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, X, Save, Package, Loader2 } from 'lucide-react';
import Image from 'next/image';

const API = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/api$/, '');

interface Product {
  id: number;
  name: string;
  category: string;
  price?: number | string;
  description?: string;
  imageUrl?: string;
}

const categories = ['All', 'Granite Type', 'Size Option', 'Quality Level', 'Engraving Method'];
const apiCatMap: Record<string, string> = {
  'Granite Type': 'granite', 'Size Option': 'size',
  'Quality Level': 'quality', 'Engraving Method': 'engraving',
};
const displayCatMap: Record<string, string> = Object.fromEntries(
  Object.entries(apiCatMap).map(([k, v]) => [v, k])
);

const catColors: Record<string, string> = {
  granite: 'status-pending', size: 'status-processing',
  quality: 'status-completed', engraving: 'status-delivered',
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing]    = useState<Product | null>(null);
  const [saving, setSaving]      = useState(false);
  const [loading, setLoading]    = useState(true);
  const [form, setForm] = useState({ name: '', category: 'granite', price: '', description: '', imageUrl: '' });

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

  useEffect(() => {
    fetch(`${API}/api/products`)
      .then((r) => r.json())
      .then((d) => { if (Array.isArray(d)) setProducts(d); })
      .finally(() => setLoading(false));
  }, []);

  const openAdd = () => {
    setEditing(null);
    setForm({ name: '', category: 'granite', price: '', description: '', imageUrl: '' });
    setShowModal(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({
      name: p.name,
      category: String(p.category),
      price: p.price ? String(p.price) : '',
      description: p.description || '',
      imageUrl: p.imageUrl || '',
    });
    setShowModal(true);
  };

  const save = async () => {
    if (!form.name) return;
    setSaving(true);
    try {
      const body = { name: form.name, category: form.category, description: form.description, imageUrl: form.imageUrl, price: parseFloat(form.price) || 0, isActive: true };
      if (editing) {
        const r = await fetch(`${API}/api/products/${editing.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify(body),
        });
        const updated = await r.json();
        setProducts((prev) => prev.map((p) => p.id === editing.id ? updated : p));
      } else {
        const r = await fetch(`${API}/api/products`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify(body),
        });
        const created = await r.json();
        if (created.id) setProducts((prev) => [created, ...prev]);
      }
      setShowModal(false);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: number) => {
    await fetch(`${API}/api/products/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const filtered = category === 'All'
    ? products
    : products.filter((p) => p.category === apiCatMap[category]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-5 sm:space-y-6">
      <div className="flex items-center justify-between">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold text-gray-900 font-[var(--font-playfair)]">Products</h1>
          <p className="text-gray-500 text-sm mt-0.5">Manage granite types, sizes, and quality levels</p>
        </motion.div>
        <motion.button initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
          onClick={openAdd}
          className="gold-gradient text-gray-900 px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Product
        </motion.button>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              category === cat ? 'gold-gradient text-gray-900' : 'glass border border-black/[0.08] text-gray-500 hover:text-gray-900'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <Package className="w-12 h-12 mb-4 opacity-30" />
          <p className="font-medium text-gray-500">No products yet</p>
          <p className="text-sm mt-1">Click Add Product to create your first product</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((product, i) => (
            <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="glass rounded-2xl overflow-hidden border border-gray-200 card-hover"
            >
              {product.imageUrl ? (
                <div className="relative h-36 w-full">
                  <Image src={product.imageUrl} alt={product.name} fill className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 33vw" unoptimized />
                </div>
              ) : (
                <div className="h-36 w-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <Package className="w-8 h-8 text-gray-300" />
                </div>
              )}
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${catColors[product.category] || 'status-pending'}`}>
                    {displayCatMap[product.category] || product.category}
                  </span>
                  <div className="flex gap-1">
                    <button onClick={() => openEdit(product)} className="p-1.5 text-gray-500 hover:text-gray-900 transition-colors">
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => remove(product.id)} className="p-1.5 text-gray-500 hover:text-red-500 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <h3 className="text-gray-900 font-bold mb-1">{product.name}</h3>
                {product.price && Number(product.price) > 0 && (
                  <p className="text-gray-600 text-sm font-semibold mb-1">+â‚¹{Number(product.price).toLocaleString('en-IN')}</p>
                )}
                {product.description && (
                  <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{product.description}</p>
                )}
              </div>
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-400">No products in this category</div>
          )}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-7 border border-gray-200 w-full max-w-md shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-gray-900 font-bold text-lg font-[var(--font-playfair)]">
                  {editing ? 'Edit Product' : 'Add Product'}
                </h3>
                <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-900">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
                <div>
                  <label className="block text-gray-600 text-sm mb-1.5">Name *</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="input-dark" placeholder="Product name" />
                </div>
                <div>
                  <label className="block text-gray-600 text-sm mb-1.5">Category</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input-dark">
                    <option value="granite">Granite Type</option>
                    <option value="size">Size Option</option>
                    <option value="quality">Quality Level</option>
                    <option value="engraving">Engraving Method</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600 text-sm mb-1.5">Price Add-on (â‚¹, optional)</label>
                  <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="input-dark" placeholder="e.g. 800" type="number" min="0" />
                </div>
                <div>
                  <label className="block text-gray-600 text-sm mb-1.5">Image URL (optional)</label>
                  <input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                    className="input-dark" placeholder="https://..." />
                </div>
                <div>
                  <label className="block text-gray-600 text-sm mb-1.5">Description</label>
                  <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="input-dark resize-none" rows={3} placeholder="Short description" />
                </div>
                <button onClick={save} disabled={!form.name || saving}
                  className="w-full gold-gradient text-gray-900 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50">
                  {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> Save Product</>}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
