'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings2, Wind, Zap, PenTool, Pencil, ToggleLeft, ToggleRight, X, Plus, Trash2, Loader2 } from 'lucide-react';
import { engravingMethods } from '@/lib/data';

const iconMap = { Settings2, Wind, Zap, PenTool };

interface Method {
  id: string; name: string; description: string; features: string[]; icon: string; active: boolean;
}

interface EditForm {
  name: string; description: string; features: string[];
}

export default function EngravingMethodsPage() {
  const [methods, setMethods] = useState<Method[]>(
    engravingMethods.map((m) => ({ ...m, active: true }))
  );
  const [editTarget, setEditTarget] = useState<Method | null>(null);
  const [form, setForm]             = useState<EditForm>({ name: '', description: '', features: [] });
  const [saving, setSaving]         = useState(false);

  const toggle = (id: string) => {
    setMethods((prev) => prev.map((m) => m.id === id ? { ...m, active: !m.active } : m));
  };

  const openEdit = (method: Method) => {
    setEditTarget(method);
    setForm({ name: method.name, description: method.description, features: [...method.features] });
  };

  const closeEdit = () => { setEditTarget(null); };

  const setFeature = (i: number, val: string) => {
    setForm((f) => { const fs = [...f.features]; fs[i] = val; return { ...f, features: fs }; });
  };

  const addFeature = () => {
    setForm((f) => ({ ...f, features: [...f.features, ''] }));
  };

  const removeFeature = (i: number) => {
    setForm((f) => ({ ...f, features: f.features.filter((_, idx) => idx !== i) }));
  };

  const saveEdit = () => {
    if (!editTarget || !form.name) return;
    setSaving(true);
    setTimeout(() => {
      setMethods((prev) => prev.map((m) =>
        m.id === editTarget.id
          ? { ...m, name: form.name, description: form.description, features: form.features.filter(Boolean) }
          : m
      ));
      setSaving(false);
      closeEdit();
    }, 400);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-5 sm:space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-gray-900 font-[var(--font-playfair)]">Engraving Methods</h1>
        <p className="text-gray-500 text-sm mt-0.5">Enable or disable methods shown to customers</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-6">
        {methods.map((method, i) => {
          const Icon = iconMap[method.icon as keyof typeof iconMap];
          return (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`glass rounded-2xl p-7 border transition-all ${method.active ? 'border-[rgba(107,114,128,0.3)]' : 'border-gray-200 opacity-60'}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${method.active ? 'gold-gradient' : 'bg-gray-700'}`}>
                  <Icon className="w-6 h-6 text-gray-900" />
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(method)}
                    className="p-1.5 text-gray-500 hover:text-orange-500 transition-colors rounded-lg hover:bg-orange-50">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => toggle(method.id)} className="text-gray-600 hover:text-gray-900 transition-colors">
                    {method.active
                      ? <ToggleRight className="w-7 h-7 text-[#6B7280]" />
                      : <ToggleLeft className="w-7 h-7" />}
                  </button>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-[var(--font-playfair)]">{method.name}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{method.description}</p>
              <ul className="space-y-1.5">
                {method.features.map((f) => (
                  <li key={f} className="text-xs text-gray-500 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#6B7280]" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-black/[0.07]">
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${method.active ? 'status-completed' : 'status-processing'}`}>
                  {method.active ? 'Active' : 'Disabled'}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Edit Modal ── */}
      <AnimatePresence>
        {editTarget && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeEdit}
          >
            <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-7 border border-gray-200 w-full max-w-md shadow-xl"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-gray-900 font-bold font-[var(--font-playfair)]">Edit — {editTarget.name}</h3>
                <button onClick={closeEdit}><X className="w-5 h-5 text-gray-500" /></button>
              </div>

              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-gray-600 text-sm mb-1.5">Name</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="input-dark" placeholder="Method name" />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-gray-600 text-sm mb-1.5">Description</label>
                  <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="input-dark resize-none" rows={3} placeholder="Short description shown to customers" />
                </div>

                {/* Features */}
                <div>
                  <label className="block text-gray-600 text-sm mb-2">Features</label>
                  <div className="space-y-2">
                    {form.features.map((f, i) => (
                      <div key={i} className="flex gap-2">
                        <input value={f} onChange={(e) => setFeature(i, e.target.value)}
                          className="input-dark flex-1" placeholder={`Feature ${i + 1}`} />
                        <button onClick={() => removeFeature(i)}
                          className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors shrink-0">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                    <button onClick={addFeature}
                      className="flex items-center gap-1.5 text-sm text-orange-500 hover:text-orange-600 font-medium transition-colors">
                      <Plus className="w-4 h-4" /> Add feature
                    </button>
                  </div>
                </div>

                <button onClick={saveEdit} disabled={!form.name || saving}
                  className="w-full gold-gradient text-white py-3 rounded-xl font-semibold disabled:opacity-50 flex items-center justify-center gap-2 mt-2">
                  {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</> : 'Save Changes'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
