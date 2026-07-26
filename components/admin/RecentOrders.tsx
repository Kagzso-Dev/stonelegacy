'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ShoppingCart } from 'lucide-react';

const API = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/api$/, '');

const statusClass: Record<string, string> = {
  Pending:    'status-pending',
  Processing: 'status-processing',
  Completed:  'status-completed',
  Delivered:  'status-delivered',
};

interface Order { id: number; orderNumber: string; customerName: string; productType: string; status: string; totalAmount: string; createdAt: string; }

export default function RecentOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`${API}/api/orders?limit=5`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((d) => { if (d.orders) setOrders(d.orders); });
  }, []);

  return (
    <div className="glass rounded-2xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-black/[0.07] flex items-center justify-between">
        <h3 className="text-gray-900 font-bold">Recent Orders</h3>
        <Link href="/admin/orders" className="text-gray-500 text-sm flex items-center gap-1 hover:gap-2 transition-all">
          View all <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-14 text-gray-400">
          <ShoppingCart className="w-10 h-10 mb-3 opacity-25" />
          <p className="text-gray-500 font-medium">No orders yet</p>
          <p className="text-sm mt-1">New orders will appear here</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Date</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td className="text-gray-500 font-medium">{o.orderNumber}</td>
                  <td className="text-gray-900">{o.customerName}</td>
                  <td className="text-gray-600 text-sm">{o.productType}</td>
                  <td className="text-gray-500 text-sm">{new Date(o.createdAt).toLocaleDateString('en-IN')}</td>
                  <td>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusClass[o.status] || 'status-pending'}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="text-gray-900 font-semibold">
                    {Number(o.totalAmount) ? `₹${Number(o.totalAmount).toLocaleString('en-IN')}` : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
