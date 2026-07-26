'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const API = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/api$/, '');

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (pathname === '/admin/login') {
      if (!token) { setChecked(true); return; }
      // Already has token — verify and redirect to dashboard if valid
      fetch(`${API}/api/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
        .then((r) => { if (r.ok) router.replace('/admin'); else { localStorage.removeItem('token'); setChecked(true); } })
        .catch(() => { localStorage.removeItem('token'); setChecked(true); });
      return;
    }

    if (!token) { router.replace('/admin/login'); return; }
    fetch(`${API}/api/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => { if (!r.ok) throw new Error('unauthorized'); setChecked(true); })
      .catch(() => { localStorage.removeItem('token'); router.replace('/admin/login'); });
  }, [pathname, router]);

  if (!checked) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F9F9F9]">
        <div className="w-8 h-8 border-2 border-[#B8860B] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
