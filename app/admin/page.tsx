'use client';

import { motion } from 'framer-motion';
import { Bell, Diamond } from 'lucide-react';
import DashboardStats from '@/components/admin/DashboardStats';
import RecentOrders from '@/components/admin/RecentOrders';
import AnalyticsCharts from '@/components/admin/AnalyticsCharts';

export default function AdminDashboardPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-3">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 font-[var(--font-playfair)]">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-0.5 hidden sm:block">Welcome back, Admin</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 sm:gap-3 shrink-0"
        >
          <button className="w-9 h-9 glass rounded-xl flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors border border-gray-200 relative">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#6B7280]" />
          </button>
          <div className="hidden sm:flex items-center gap-2 glass rounded-xl px-3 py-2 border border-gray-200">
            <div className="w-7 h-7 rounded-lg gold-gradient flex items-center justify-center">
              <Diamond className="w-3.5 h-3.5 text-gray-900" />
            </div>
            <span className="text-gray-900 text-sm font-medium">Admin</span>
          </div>
        </motion.div>
      </div>

      {/* Stats */}
      <DashboardStats />

      {/* Charts */}
      <AnalyticsCharts />

      {/* Recent Orders */}
      <RecentOrders />
    </div>
  );
}
