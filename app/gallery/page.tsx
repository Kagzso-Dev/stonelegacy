'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, X, ArrowLeft, ArrowRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingButtons from '@/components/ui/FloatingButtons';
import { galleryCategories } from '@/lib/data';

const galleryItems = [
  { id: 1, title: 'Elegant Family Name Board', category: 'House Name Boards', color: '#1a1a1a', desc: 'Absolute Black Granite · Laser Etching · 18×9 in' },
  { id: 2, title: 'School Entrance Crest', category: 'School Signage', color: '#2d3748', desc: 'Grey Granite · CNC Engraving · 36×18 in' },
  { id: 3, title: 'Alumni Memorial Plaque', category: 'Memorial Plaques', color: '#1a202c', desc: 'Absolute Black Granite · Hand Carving · 24×12 in' },
  { id: 4, title: 'Donor Recognition Stone', category: 'Donor Walkways', color: '#374151', desc: 'Grey Granite · Sandblasting · 18×9 in' },
  { id: 5, title: 'Villa Name Board', category: 'House Name Boards', color: '#111827', desc: 'Red Granite · Laser Etching · 12×6 in' },
  { id: 6, title: 'College Gateway Sign', category: 'School Signage', color: '#1f2937', desc: 'Serpentine Granite · CNC Engraving · 36×18 in' },
  { id: 7, title: 'Founder Memorial', category: 'Memorial Plaques', color: '#1a1a1a', desc: 'Absolute Black Granite · Laser Etching · 24×12 in' },
  { id: 8, title: 'Alumni Walk Stone', category: 'Donor Walkways', color: '#374151', desc: 'Grey Granite · Sandblasting · 12×6 in' },
  { id: 9, title: 'Black Granite Sample', category: 'Granite Samples', color: '#0a0a0a', desc: 'Absolute Black · Mirror Polish' },
  { id: 10, title: 'Red Granite Sample', category: 'Granite Samples', color: '#7F1D1D', desc: 'Jhansi Red · Flamed Finish' },
  { id: 11, title: 'Grey Granite Sample', category: 'Granite Samples', color: '#6B7280', desc: 'Kashmir White · Polished' },
  { id: 12, title: 'Serpentine Sample', category: 'Granite Samples', color: '#065F46', desc: 'Green Granite · Natural Finish' },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter((g) => g.category === activeCategory);

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const prevItem = () => setLightboxIndex((i) => (i !== null ? (i - 1 + filtered.length) % filtered.length : null));
  const nextItem = () => setLightboxIndex((i) => (i !== null ? (i + 1) % filtered.length : null));

  return (
    <main className="min-h-screen bg-[#F9F9F9]">
      <Navbar />
      <div className="pt-28 pb-24">
        {/* Hero */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-14">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold text-gray-900 font-[var(--font-playfair)] mb-4"
          >
            Design <span className="gold-text">Gallery</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-lg max-w-xl mx-auto"
          >
            Browse our portfolio of granite engravings — each stone a unique story.
          </motion.p>

          {/* Category filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mt-10"
          >
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'gold-gradient text-gray-900 shadow-lg'
                    : 'glass border border-black/[0.08] text-gray-500 hover:text-gray-900 hover:border-[rgba(107,114,128,0.3)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            <AnimatePresence>
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => openLightbox(i)}
                  className="glass rounded-2xl overflow-hidden border border-gray-200 card-hover cursor-pointer group"
                >
                  {/* Granite preview */}
                  <div
                    className="h-48 relative overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color}99)` }}
                  >
                    <div className="absolute inset-0 opacity-30" style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E")`,
                    }} />
                    {/* Engraving mockup */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                      <p className="text-gray-900/80 font-bold text-lg font-[var(--font-playfair)] drop-shadow-lg leading-tight">
                        {item.title.split(' ').slice(0, 3).join(' ')}
                      </p>
                      <p className="text-gray-900/40 text-xs mt-1 tracking-widest uppercase">
                        StoneLegacy
                      </p>
                    </div>
                    {/* Zoom overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                      <ZoomIn className="w-8 h-8 text-gray-900 opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100" />
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-900 font-semibold text-sm mb-1">{item.title}</p>
                    <p className="text-gray-500 text-xs">{item.desc}</p>
                    <span className="inline-block mt-2 text-[11px] bg-[rgba(107,114,128,0.1)] text-[#6B7280] px-2 py-0.5 rounded-full border border-[rgba(107,114,128,0.2)]">
                      {item.category}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-10 h-10 glass rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900"
            >
              <X className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prevItem(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 glass rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextItem(); }}
              className="absolute right-16 top-1/2 -translate-y-1/2 w-10 h-10 glass rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full rounded-2xl overflow-hidden glass-dark border border-white/[0.1]"
            >
              <div
                className="h-80 relative"
                style={{ background: `linear-gradient(135deg, ${filtered[lightboxIndex].color}, ${filtered[lightboxIndex].color}99)` }}
              >
                <div className="absolute inset-0 opacity-40" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E")`,
                }} />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <p className="text-gray-900 font-bold text-3xl font-[var(--font-playfair)] drop-shadow-lg mb-2">
                    {filtered[lightboxIndex].title}
                  </p>
                  <p className="text-gray-900/40 text-sm tracking-widest uppercase">StoneLegacy Engravers</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-900 font-bold text-xl mb-1 font-[var(--font-playfair)]">
                  {filtered[lightboxIndex].title}
                </p>
                <p className="text-gray-600 text-sm mb-3">{filtered[lightboxIndex].desc}</p>
                <span className="inline-block text-xs bg-[rgba(107,114,128,0.1)] text-[#6B7280] px-3 py-1 rounded-full border border-[rgba(107,114,128,0.2)]">
                  {filtered[lightboxIndex].category}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      <FloatingButtons />
    </main>
  );
}
