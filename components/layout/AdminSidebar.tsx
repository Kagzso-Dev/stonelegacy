'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Diamond, LayoutDashboard, Package, Hammer, ShoppingCart,
  Image, MessageSquare, BarChart3, Settings, LogOut, Menu, X,
  Sun, Moon, Layers,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettings } from '@/lib/settings-context';
import { useAdminTheme } from '@/lib/admin-theme-context';

const menuItems = [
  { label: 'Dashboard',        href: '/admin',                  icon: LayoutDashboard },
  { label: 'Products',         href: '/admin/products',         icon: Package },
  { label: 'Engraving Methods',href: '/admin/engraving-methods',icon: Hammer },
  { label: 'Orders',           href: '/admin/orders',           icon: ShoppingCart },
  { label: 'Gallery',          href: '/admin/gallery',          icon: Image },
  { label: 'Service Media',    href: '/admin/service-media',    icon: Layers },
  { label: 'Messages',         href: '/admin/messages',         icon: MessageSquare },
  { label: 'Analytics',        href: '/admin/analytics',        icon: BarChart3 },
  { label: 'Settings',         href: '/admin/settings',         icon: Settings },
];

export default function AdminSidebar() {
  const pathname   = usePathname();
  const router     = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { settings } = useSettings();
  const logoUrl = settings?.logoUrl || '';
  const { theme, toggle } = useAdminTheme();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.replace('/admin/login');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-black/[0.07]">
        <div className="w-8 h-8 rounded-lg gold-gradient flex items-center justify-center overflow-hidden">
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoUrl} alt="logo" className="w-full h-full object-contain" />
          ) : (
            <Diamond className="w-4 h-4 text-gray-900" fill="currentColor" />
          )}
        </div>
        <div>
          <p className="font-bold text-gray-900 text-sm font-[var(--font-playfair)]">
            Stone<span className="gold-text">Legacy</span>
          </p>
          <p className="text-[9px] text-gray-500 uppercase tracking-widest">Admin Panel</p>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`sidebar-item ${active ? 'active' : ''}`}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Theme toggle + Logout */}
      <div className="p-3 border-t border-black/[0.07] space-y-1">
        <button
          onClick={toggle}
          className="sidebar-item w-full"
          aria-label="Toggle theme"
        >
          {theme === 'dark'
            ? <Sun  className="w-4 h-4 shrink-0 text-orange-400" />
            : <Moon className="w-4 h-4 shrink-0" />}
          <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
        <button onClick={handleLogout} className="sidebar-item w-full text-red-400 hover:text-red-300">
          <LogOut className="w-4 h-4 shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-60 shrink-0 bg-[#F0F0F0] border-r border-black/[0.07] h-screen sticky top-0">
        <SidebarContent />
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-14 admin-mobile-bar border-b border-black/[0.07] shadow-sm">
        <button
          onClick={() => setMobileOpen(true)}
          className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-600 hover:text-gray-900 hover:bg-black/[0.06] transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        <p className="font-bold text-sm font-[var(--font-playfair)]">
          Stone<span className="gold-text">Legacy</span>
        </p>
        <button
          onClick={toggle}
          className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-600 hover:text-gray-900 hover:bg-black/[0.06] transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-orange-400" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-0 z-50 w-64 h-full bg-[#F0F0F0] border-r border-black/[0.07]"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"
              >
                <X className="w-5 h-5" />
              </button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
