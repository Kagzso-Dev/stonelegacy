'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, Phone, ChevronDown,
  Layers, Image, Info, Mail, Sparkles, MapPin,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSettings } from '@/lib/settings-context';

const NAV = [
  {
    name: 'Services',
    href: '/#services',
    icon: Layers,
    children: [
      { name: 'House Name Boards', href: '/services/house-name-boards' },
      { name: 'School Memorials', href: '/services/school-memorials' },
      { name: 'Donor Walkways', href: '/services/donor-walkways' },
      { name: 'Campus Signage', href: '/services/campus-signage' },
    ],
  },
  { name: 'Home', href: '/', icon: Sparkles },
  { name: 'Gallery', href: '/gallery', icon: Image },
  { name: 'About', href: '/about', icon: Info },
  { name: 'Contact', href: '/contact', icon: Mail },
];

const ANNOUNCEMENTS = [
  '✦  Free site visit for orders above ₹5,000 — Call us today',
  '✦  CNC · Laser · Sandblasting — All three methods in-house',
  '✦  Chennai-wide delivery · Same-week completion available',
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const { settings } = useSettings();
  const logoUrl = settings?.logoUrl || '';
  const phone   = settings?.phone   || '+91 98400 00000';
  const city    = settings?.city    || 'Chennai';
  const state   = settings?.state   || 'Tamil Nadu';
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [announcementIdx, setAnnouncementIdx] = useState(0);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setAnnouncementIdx((i) => (i + 1) % ANNOUNCEMENTS.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
        setActiveDropdown(null);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  /* lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const isHome = pathname === '/';
  const isServicePage = pathname.startsWith('/services/');
  const useGlass = !scrolled && (isHome || isServicePage);
  const useDark = !useGlass;

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    const path = href.split('#')[0];
    if (!path || path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  const announcementH = announcementVisible ? 32 : 0;

  return (
    <>
      {/* ── Announcement strip ── */}
      <AnimatePresence>
        {announcementVisible && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 32, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-[60] overflow-hidden"
          >
            <div className="gold-gradient h-8 px-3 sm:px-6 flex items-center justify-between gap-3">
              <div className="flex-1 overflow-hidden text-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={announcementIdx}
                    initial={{ y: 8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -8, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-[10px] sm:text-[11px] font-medium text-white tracking-wide whitespace-nowrap overflow-hidden text-ellipsis"
                  >
                    {ANNOUNCEMENTS[announcementIdx]}
                  </motion.p>
                </AnimatePresence>
              </div>
              <button
                onClick={() => setAnnouncementVisible(false)}
                className="flex-shrink-0 text-white/70 hover:text-white transition-colors p-0.5"
                aria-label="Close"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main navbar ── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ top: announcementH, transition: 'top 0.3s ease' }}
        className={`fixed left-0 right-0 z-50 transition-all duration-400 ${
          useDark
            ? 'bg-white/95 backdrop-blur-xl border-b border-black/[0.07] shadow-sm py-3'
            : isServicePage
              ? 'bg-black/30 backdrop-blur-md border-b border-white/10 py-4'
              : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
          <div className="flex items-center justify-between gap-3">

            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0 group">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                {logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={logoUrl} alt="logo" className="w-full h-full object-contain" />
                ) : (
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                    <polygon points="10,2 18,7 18,13 10,18 2,13 2,7" fill="none" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                    <polygon points="10,2 18,7 10,10 2,7" fill="rgba(255,255,255,0.25)" stroke="white" strokeWidth="1" strokeLinejoin="round" />
                    <line x1="10" y1="10" x2="10" y2="18" stroke="white" strokeWidth="1.2" />
                    <line x1="2" y1="7" x2="10" y2="10" stroke="white" strokeWidth="1" />
                    <line x1="18" y1="7" x2="10" y2="10" stroke="white" strokeWidth="1" />
                  </svg>
                )}
              </div>
              <div className="leading-none">
                <p className={`font-bold text-[15px] sm:text-[17px] tracking-tight font-[var(--font-playfair)] transition-colors duration-300 ${useDark ? 'text-gray-900' : 'text-white'}`}>
                  Stone<span className="gold-text">Legacy</span>
                </p>
                <p className={`hidden sm:block text-[8px] tracking-[0.18em] uppercase mt-0.5 transition-colors duration-300 ${useDark ? 'text-gray-400' : 'text-white/50'}`}>
                  Granite Engravers
                </p>
              </div>
            </Link>

            {/* ── Desktop nav links ── */}
            <div ref={dropdownRef} className="hidden lg:flex items-center gap-0.5 xl:gap-1">
              {NAV.map((link) =>
                link.children ? (
                  <div key={link.name} className="relative">
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === link.name ? null : link.name)}
                      className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold tracking-wide transition-all duration-200 ${
                        isActive(link.href)
                          ? useDark ? 'text-orange-500' : 'text-orange-400'
                          : useDark ? 'text-gray-700 hover:text-orange-500' : 'text-white/80 hover:text-white'
                      }`}
                    >
                      {link.name}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === link.name ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {activeDropdown === link.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.97 }}
                          transition={{ duration: 0.16 }}
                          className="absolute top-full left-0 mt-2 w-52 bg-white border border-black/[0.07] rounded-xl shadow-xl shadow-black/[0.08] overflow-hidden z-50"
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              onClick={() => setActiveDropdown(null)}
                              className="flex items-center gap-2.5 px-4 py-3 text-sm text-gray-600 hover:text-orange-600 hover:bg-orange-50/70 transition-colors border-b border-black/[0.04] last:border-0"
                            >
                              <span className="w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                              {child.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative px-3 py-2 text-sm font-semibold tracking-wide transition-all duration-200 ${
                      isActive(link.href)
                        ? useDark ? 'text-orange-500' : 'text-orange-400'
                        : useDark ? 'text-gray-700 hover:text-orange-500' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {link.name}
                    {isActive(link.href) && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-orange-400"
                      />
                    )}
                  </Link>
                )
              )}
            </div>

            {/* ── Right actions ── */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Get Quote — desktop */}
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="hidden lg:block">
                <Link
                  href="/order"
                  className="inline-flex items-center gap-2 gold-gradient px-4 py-2 xl:px-5 xl:py-2.5 rounded-full text-sm font-semibold text-white shadow-[0_2px_14px_color-mix(in_oklab,var(--color-orange-500)_35%,transparent)] hover:shadow-[0_4px_22px_color-mix(in_oklab,var(--color-orange-500)_50%,transparent)] transition-all duration-300"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Get Quote
                </Link>
              </motion.div>

              {/* Hamburger — mobile/tablet */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`lg:hidden p-2 rounded-lg transition-colors ${
                  useDark
                    ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {menuOpen ? (
                    <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <X className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <Menu className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile full-screen drawer ── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden overflow-hidden border-t border-black/[0.06]"
            >
              <div className="bg-white/98 backdrop-blur-2xl px-4 pt-2 pb-6 flex flex-col">

                {/* Nav links */}
                <nav className="flex flex-col">
                  {NAV.map((link, i) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      {link.children ? (
                        <div>
                          <button
                            onClick={() => setActiveDropdown(activeDropdown === link.name ? null : link.name)}
                            className="w-full flex items-center justify-between py-3.5 border-b border-gray-100 text-gray-800 text-sm font-semibold"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center">
                                <link.icon className="w-3.5 h-3.5 text-orange-500" />
                              </div>
                              {link.name}
                            </div>
                            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${activeDropdown === link.name ? 'rotate-180' : ''}`} />
                          </button>
                          <AnimatePresence>
                            {activeDropdown === link.name && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="pl-10 flex flex-col bg-gray-50/60 rounded-xl my-1">
                                  {link.children.map((child) => (
                                    <Link
                                      key={child.name}
                                      href={child.href}
                                      onClick={() => setMenuOpen(false)}
                                      className="py-3 text-sm text-gray-600 hover:text-orange-600 border-b border-gray-100/80 last:border-0 transition-colors"
                                    >
                                      {child.name}
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={link.href}
                          onClick={() => setMenuOpen(false)}
                          className={`flex items-center gap-3 py-3.5 border-b border-gray-100 text-sm font-semibold transition-colors ${
                            isActive(link.href) ? 'text-orange-600' : 'text-gray-800 hover:text-orange-600'
                          }`}
                        >
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isActive(link.href) ? 'bg-orange-100' : 'bg-gray-100'}`}>
                            <link.icon className={`w-3.5 h-3.5 ${isActive(link.href) ? 'text-orange-500' : 'text-gray-500'}`} />
                          </div>
                          {link.name}
                          {isActive(link.href) && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-orange-500" />}
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </nav>

                {/* Bottom CTA area */}
                <div className="mt-5 flex flex-col gap-3">
                  <Link
                    href="/order"
                    onClick={() => setMenuOpen(false)}
                    className="w-full gold-gradient text-center py-3.5 rounded-2xl text-sm font-bold text-white shadow-[0_4px_20px_color-mix(in_oklab,var(--color-orange-500)_35%,transparent)] active:scale-[0.98] transition-transform"
                  >
                    Get a Free Quote
                  </Link>
                  <a
                    href={`tel:${phone}`}
                    className="w-full flex items-center justify-center gap-2.5 bg-green-50 border border-green-200 py-3 rounded-2xl text-sm font-semibold text-green-700 active:scale-[0.98] transition-transform"
                  >
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <Phone className="w-3.5 h-3.5 text-green-600" />
                    </div>
                    Call · {phone}
                  </a>
                  <p className="flex items-center justify-center gap-1.5 text-xs text-gray-400 mt-1">
                    <MapPin className="w-3 h-3" />
                    {city}{state ? `, ${state}` : ''}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
