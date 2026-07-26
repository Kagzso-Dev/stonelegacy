'use client';

import { motion } from 'framer-motion';
import DashboardStats from '@/components/admin/DashboardStats';
import AnalyticsCharts from '@/components/admin/AnalyticsCharts';

export default function AnalyticsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-gray-900 font-[var(--font-playfair)]">Analytics</h1>
        <p className="text-gray-500 text-sm mt-0.5">Performance overview</p>
      </motion.div>

      <DashboardStats />
      <AnalyticsCharts />
    </div>
  );
}
