'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MailOpen, Trash2, Search, Loader2 } from 'lucide-react';

const API = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/api$/, '');

interface Message {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  isRead: boolean | number;
  createdAt: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selected, setSelected] = useState<Message | null>(null);
  const [search, setSearch]     = useState('');
  const [loading, setLoading]   = useState(true);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

  useEffect(() => {
    fetch(`${API}/api/messages`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((d) => { if (Array.isArray(d)) setMessages(d); })
      .finally(() => setLoading(false));
  }, [token]);

  const markRead = async (id: number) => {
    await fetch(`${API}/api/messages/${id}/read`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
    });
    setMessages((prev) => prev.map((m) => m.id === id ? { ...m, isRead: true } : m));
  };

  const deleteMsg = async (id: number) => {
    await fetch(`${API}/api/messages/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const open = (msg: Message) => {
    if (!msg.isRead) markRead(msg.id);
    setSelected(msg);
  };

  const filtered = messages.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.subject.toLowerCase().includes(search.toLowerCase())
  );

  const unread = messages.filter((m) => !m.isRead).length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 h-[calc(100vh-4rem)] lg:h-screen flex flex-col">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 font-[var(--font-playfair)]">Messages</h1>
        <p className="text-gray-500 text-sm mt-0.5">{unread} unread Â· {messages.length} total</p>
      </motion.div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
        </div>
      ) : messages.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Mail className="w-14 h-14 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">No messages yet</p>
            <p className="text-gray-400 text-sm mt-1">Messages from the contact form will appear here</p>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex gap-5 min-h-0">
          {/* Message list */}
          <div className="w-full lg:w-96 shrink-0 flex flex-col gap-3">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Search messages..." className="input-dark pl-10" />
            </div>
            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {filtered.map((msg) => (
                <motion.div key={msg.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  onClick={() => open(msg)}
                  className={`glass rounded-xl p-4 border cursor-pointer transition-all ${
                    selected?.id === msg.id ? 'border-gray-400 bg-gray-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      {!msg.isRead && <span className="w-2 h-2 rounded-full bg-gray-500 shrink-0" />}
                      <span className={`text-sm font-semibold ${msg.isRead ? 'text-gray-700' : 'text-gray-900'}`}>{msg.name}</span>
                    </div>
                    <span className="text-gray-500 text-xs shrink-0">{new Date(msg.createdAt).toLocaleDateString('en-IN')}</span>
                  </div>
                  <p className={`text-sm mb-1 ${msg.isRead ? 'text-gray-500' : 'text-gray-700'}`}>{msg.subject}</p>
                  <p className="text-gray-500 text-xs truncate">{msg.message}</p>
                </motion.div>
              ))}
              {filtered.length === 0 && (
                <p className="text-center text-gray-400 text-sm py-8">No messages match your search</p>
              )}
            </div>
          </div>

          {/* Message detail */}
          <div className="flex-1 hidden lg:block">
            {selected ? (
              <motion.div key={selected.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="glass rounded-2xl p-8 border border-gray-200 h-full flex flex-col"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-1 font-[var(--font-playfair)]">{selected.subject}</h2>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span>From: <span className="text-gray-700">{selected.name}</span></span>
                      <span>Â·</span>
                      <a href={`mailto:${selected.email}`} className="text-gray-600 hover:underline">{selected.email}</a>
                      {selected.phone && <><span>Â·</span><span>{selected.phone}</span></>}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => markRead(selected.id)}
                      className="p-2 glass rounded-lg text-gray-600 hover:text-gray-900 transition-colors border border-gray-200" title="Mark read">
                      <MailOpen className="w-4 h-4" />
                    </button>
                    <button onClick={() => deleteMsg(selected.id)}
                      className="p-2 glass rounded-lg text-gray-600 hover:text-red-500 transition-colors border border-gray-200">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed flex-1">{selected.message}</p>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <a href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject)}`}
                    className="gold-gradient text-gray-900 px-5 py-2.5 rounded-xl font-semibold text-sm inline-block">
                    Reply via Email
                  </a>
                </div>
              </motion.div>
            ) : (
              <div className="glass rounded-2xl p-8 border border-gray-200 h-full flex items-center justify-center">
                <div className="text-center">
                  <Mail className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-400">Select a message to read</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
