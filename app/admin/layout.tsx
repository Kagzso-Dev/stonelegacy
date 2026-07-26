import AuthGuard from '@/components/admin/AuthGuard';
import AdminLayoutContent from '@/components/admin/AdminLayoutContent';

export const metadata = {
  title: 'Admin Panel — StoneLegacy Engravers',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AuthGuard>
  );
}
