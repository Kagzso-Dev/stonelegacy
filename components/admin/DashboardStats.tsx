'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, DollarSign, Users, Clock } from 'lucide-react';

const API = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/api$/, '');

interface Stats { totalOrders: number; revenue: number; customers: number; pending: number; }

export default function DashboardStats() {
  const [stats, setStats] = useState<Stats>({ totalOrders: 0, revenue: 0, customers: 0, pending: 0 });

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`${API}/api/stats`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((d) => { if (!d.error) setStats(d); });
  }, []);

  const items = [
    { label: 'Total Orders',    value: String(stats.totalOrders),                                  icon: ShoppingCart, color: '#6B7280' },
    { label: 'Total Revenue',   value: `₹${stats.revenue.toLocaleString('en-IN')}`,                icon: DollarSign,   color: '#4ADE80' },
    { label: 'Total Customers', value: String(stats.customers),                                    icon: Users,        color: '#60A5FA' },
    { label: 'Pending Orders',  value: String(stats.pending),                                      icon: Clock,        color: '#FB923C' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {items.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="glass rounded-2xl p-6 border border-gray-200 card-hover"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${stat.color}20` }}>
              <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
          <p className="text-gray-500 text-sm">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
