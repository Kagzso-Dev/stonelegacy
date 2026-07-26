'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Eye, X, Loader2, ShoppingCart,
  Clock, RefreshCw, CheckCircle, Truck, IndianRupee,
  Phone, Mail, MapPin, MessageSquare, ChevronDown,
} from 'lucide-react';

const API = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/api$/, '');

interface Order {
  id: number; orderNumber: string; customerName: string; mobile: string;
  email: string; address: string; productType: string; graniteType: string;
  size: string; engravingMethod: string; message: string; quantity: number;
  status: string; paymentStatus: string; totalAmount: string; notes: string; createdAt: string;
}

const STATUS_CONFIG: Record<string, { label: string; dot: string; bg: string; text: string }> = {
  Pending:    { label: 'Pending',    dot: 'bg-amber-400',  bg: 'bg-amber-50',   text: 'text-amber-700' },
  Processing: { label: 'Processing', dot: 'bg-blue-400',   bg: 'bg-blue-50',    text: 'text-blue-700'  },
  Completed:  { label: 'Completed',  dot: 'bg-green-400',  bg: 'bg-green-50',   text: 'text-green-700' },
  Delivered:  { label: 'Delivered',  dot: 'bg-purple-400', bg: 'bg-purple-50',  text: 'text-purple-700'},
};
const PAYMENT_CONFIG: Record<string, { bg: string; text: string }> = {
  Paid:    { bg: 'bg-green-50',  text: 'text-green-700'  },
  Partial: { bg: 'bg-amber-50',  text: 'text-amber-700'  },
  Unpaid:  { bg: 'bg-red-50',    text: 'text-red-600'    },
};

const ORDER_STATUSES  = ['Pending', 'Processing', 'Completed', 'Delivered'];
const PAYMENT_STATUSES = ['Unpaid', 'Partial', 'Paid'];
const TABS = ['All', 'Pending', 'Processing', 'Completed', 'Delivered'];

function StatusBadge({ value, onChange, options, config }: {
  value: string; onChange: (v: string) => void;
  options: string[]; config: Record<string, { bg: string; text: string; dot?: string }>;
}) {
  const [open, setOpen] = useState(false);
  const c = config[value] || { bg: 'bg-gray-100', text: 'text-gray-600', dot: 'bg-gray-400' };
  return (
    <div className="relative inline-block">
      <button
        onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${c.bg} ${c.text} hover:opacity-80 transition-opacity`}
      >
        {'dot' in c && c.dot && <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />}
        {value}
        <ChevronDown className="w-3 h-3 opacity-60" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.12 }}
            className="absolute top-full mt-1 left-0 z-30 bg-white rounded-xl shadow-xl border border-gray-100 py-1 min-w-[120px]"
            onClick={(e) => e.stopPropagation()}
          >
            {options.map((opt) => {
              const oc = config[opt] || { bg: '', text: 'text-gray-700', dot: 'bg-gray-400' };
              return (
                <button key={opt} onClick={() => { onChange(opt); setOpen(false); }}
                  className={`w-full flex items-center gap-2 px-3 py-1.5 text-xs font-medium hover:bg-gray-50 transition-colors ${opt === value ? 'opacity-60' : ''} ${oc.text}`}
                >
                  {'dot' in oc && oc.dot && <span className={`w-1.5 h-1.5 rounded-full ${oc.dot}`} />}
                  {opt}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function OrdersPage() {
  const [orders, setOrders]           = useState<Order[]>([]);
  const [total, setTotal]             = useState(0);
  const [loading, setLoading]         = useState(true);
  const [search, setSearch]           = useState('');
  const [activeTab, setActiveTab]     = useState('All');
  const [selected, setSelected]       = useState<Order | null>(null);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

  const load = useCallback(async (status: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: '100' });
      if (status !== 'All') params.set('status', status);
      const r = await fetch(`${API}/api/orders?${params}`, { headers: { Authorization: `Bearer ${token}` } });
      const d = await r.json();
      if (d.orders) { setOrders(d.orders); setTotal(d.total); }
    } finally { setLoading(false); }
  }, [token]);

  useEffect(() => { load(activeTab); }, [load, activeTab]);

  const updateField = async (id: number, field: string, value: string) => {
    const r = await fetch(`${API}/api/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ [field]: value }),
    });
    const updated = await r.json();
    setOrders((prev) => prev.map((o) => o.id === id ? updated : o));
    if (selected?.id === id) setSelected(updated);
  };

  const filtered = orders.filter((o) =>
    o.customerName.toLowerCase().includes(search.toLowerCase()) ||
    o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
    o.mobile.includes(search)
  );

  const counts = {
    total:      orders.length,
    pending:    orders.filter((o) => o.status === 'Pending').length,
    processing: orders.filter((o) => o.status === 'Processing').length,
    done:       orders.filter((o) => o.status === 'Completed' || o.status === 'Delivered').length,
    revenue:    orders.reduce((s, o) => s + Number(o.totalAmount), 0),
  };

  const statCards = [
    { label: 'Total Orders',   value: String(total),                                    icon: ShoppingCart, color: 'text-gray-600',   bg: 'bg-gray-100'   },
    { label: 'Pending',        value: String(counts.pending),                           icon: Clock,        color: 'text-amber-600',  bg: 'bg-amber-50'   },
    { label: 'Processing',     value: String(counts.processing),                        icon: RefreshCw,    color: 'text-blue-600',   bg: 'bg-blue-50'    },
    { label: 'Revenue',        value: `â‚¹${counts.revenue.toLocaleString('en-IN')}`,     icon: IndianRupee,  color: 'text-green-600',  bg: 'bg-green-50'   },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-5 sm:space-y-6">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-[var(--font-playfair)]">Orders</h1>
          <p className="text-gray-500 text-sm mt-0.5">{total} total orders</p>
        </div>
      </motion.div>

      {/* Stat cards */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
        className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((s) => (
          <div key={s.label} className="glass rounded-2xl p-4 border border-gray-200 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center shrink-0`}>
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">{s.value}</p>
              <p className="text-gray-500 text-xs">{s.label}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Search + tab filters */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, order number or mobileâ€¦"
            className="input-dark pl-10" />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {TABS.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab
                  ? 'gold-gradient text-white shadow-sm'
                  : 'glass border border-black/[0.08] text-gray-500 hover:text-gray-900'
              }`}>
              {tab}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
        className="glass rounded-2xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 text-gray-300 animate-spin" />
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <ShoppingCart className="w-14 h-14 mb-4 opacity-20" />
            <p className="font-semibold text-gray-500">No orders yet</p>
            <p className="text-sm mt-1 text-gray-400">Orders submitted through the website will appear here</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {['Order', 'Customer', 'Product', 'Date', 'Status', 'Payment', 'Amount', ''].map((h) => (
                    <th key={h} className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-5 py-3.5 whitespace-nowrap bg-gray-50/60">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.length === 0 ? (
                  <tr><td colSpan={8} className="text-center py-12 text-gray-400">No orders match your search</td></tr>
                ) : filtered.map((order, i) => (
                  <motion.tr key={order.id}
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.02 }}
                    className="hover:bg-orange-50/30 transition-colors group cursor-pointer"
                    onClick={() => setSelected(order)}
                  >
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="font-mono text-xs font-semibold text-gray-400 bg-gray-100 px-2 py-1 rounded-lg">{order.orderNumber}</span>
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-semibold text-gray-900 whitespace-nowrap">{order.customerName}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{order.mobile}</p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-gray-700 whitespace-nowrap">{order.productType}</p>
                      <p className="text-gray-400 text-xs mt-0.5 whitespace-nowrap">{order.graniteType}</p>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-gray-500 text-xs">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: '2-digit' })}
                    </td>
                    <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                      <StatusBadge
                        value={order.status}
                        onChange={(v) => updateField(order.id, 'status', v)}
                        options={ORDER_STATUSES}
                        config={STATUS_CONFIG}
                      />
                    </td>
                    <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                      <StatusBadge
                        value={order.paymentStatus}
                        onChange={(v) => updateField(order.id, 'paymentStatus', v)}
                        options={PAYMENT_STATUSES}
                        config={PAYMENT_CONFIG}
                      />
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="font-bold text-gray-900">
                        {Number(order.totalAmount) ? `â‚¹${Number(order.totalAmount).toLocaleString('en-IN')}` : 'â€”'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={(e) => { e.stopPropagation(); setSelected(order); }}
                        className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-orange-100 hover:text-orange-600 flex items-center justify-center text-gray-400 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Order detail drawer */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100 sticky top-0 bg-white rounded-t-3xl sm:rounded-t-2xl">
                <div>
                  <span className="font-mono text-xs font-bold text-orange-500 bg-orange-50 px-2 py-1 rounded-lg">{selected.orderNumber}</span>
                  <p className="font-bold text-gray-900 text-lg mt-1.5 font-[var(--font-playfair)]">{selected.customerName}</p>
                </div>
                <button onClick={() => setSelected(null)} className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="px-6 py-5 space-y-6">

                {/* Status controls */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-400 font-medium mb-2 uppercase tracking-wide">Order Status</p>
                    <select value={selected.status} onChange={(e) => updateField(selected.id, 'status', e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-semibold text-gray-800 outline-none focus:border-orange-400">
                      {ORDER_STATUSES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-400 font-medium mb-2 uppercase tracking-wide">Payment</p>
                    <select value={selected.paymentStatus} onChange={(e) => updateField(selected.id, 'paymentStatus', e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-semibold text-gray-800 outline-none focus:border-orange-400">
                      {PAYMENT_STATUSES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                {/* Contact */}
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Contact</p>
                  <div className="space-y-2">
                    <a href={`tel:${selected.mobile}`} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-orange-50 transition-colors group">
                      <Phone className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors" />
                      <span className="text-gray-700 text-sm font-medium">{selected.mobile}</span>
                    </a>
                    <a href={`mailto:${selected.email}`} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-orange-50 transition-colors group">
                      <Mail className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors" />
                      <span className="text-gray-700 text-sm">{selected.email}</span>
                    </a>
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                      <span className="text-gray-700 text-sm">{selected.address}</span>
                    </div>
                  </div>
                </div>

                {/* Order details */}
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Order Details</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      ['Product',   selected.productType],
                      ['Granite',   selected.graniteType],
                      ['Size',      selected.size],
                      ['Engraving', selected.engravingMethod],
                      ['Qty',       String(selected.quantity)],
                      ['Amount',    Number(selected.totalAmount) ? `â‚¹${Number(selected.totalAmount).toLocaleString('en-IN')}` : 'â€”'],
                    ].map(([k, v]) => (
                      <div key={k} className="bg-gray-50 rounded-xl p-3">
                        <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide mb-1">{k}</p>
                        <p className="text-gray-800 text-sm font-medium">{v}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Message / Notes */}
                {(selected.message || selected.notes) && (
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Notes</p>
                    <div className="space-y-2">
                      {selected.message && (
                        <div className="flex items-start gap-3 p-3 rounded-xl bg-blue-50">
                          <MessageSquare className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                          <p className="text-gray-700 text-sm">{selected.message}</p>
                        </div>
                      )}
                      {selected.notes && (
                        <div className="p-3 rounded-xl bg-amber-50">
                          <p className="text-amber-800 text-sm">{selected.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <p className="text-center text-xs text-gray-400 pb-2">
                  Placed {new Date(selected.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
