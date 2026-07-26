'use client';

import { BarChart2 } from 'lucide-react';

export default function AnalyticsCharts() {
  return (
    <div className="glass rounded-2xl p-10 border border-gray-200 flex flex-col items-center justify-center text-gray-400">
      <BarChart2 className="w-12 h-12 mb-4 opacity-25" />
      <p className="text-gray-500 font-medium">No analytics data yet</p>
      <p className="text-sm mt-1">Charts will populate as orders come in</p>
    </div>
  );
}
