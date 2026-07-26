'use client';

import { usePathname } from 'next/navigation';
import AdminSidebar from '@/components/layout/AdminSidebar';
import { AdminThemeProvider, useAdminTheme } from '@/lib/admin-theme-context';

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const { theme } = useAdminTheme();
  const pathname = usePathname();

  if (pathname === '/admin/login') return <>{children}</>;

  return (
    <div data-admin-theme={theme} className="flex min-h-screen bg-[#F9F9F9] admin-root">
      <AdminSidebar />
      <div className="flex-1 min-w-0 overflow-x-hidden">
        <div className="pt-16 lg:pt-0">{children}</div>
      </div>
    </div>
  );
}

export default function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <AdminThemeProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AdminThemeProvider>
  );
}
