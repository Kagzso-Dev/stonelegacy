'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, ChevronLeft, ChevronRight } from 'lucide-react';

const API = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/api$/, '');

interface MediaItem {
  id: number; type: 'image' | 'video';
  title: string; mediaUrl: string; thumbnail: string; description?: string;
}

interface Props { service: string; }

export default function ServiceMediaGallery({ service }: Props) {
  const [items, setItems]     = useState<MediaItem[]>([]);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    fetch(`${API}/api/service-media?service=${service}`)
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setItems(d); })
      .catch(() => {});
  }, [service]);

  if (items.length === 0) return null;

  const current = lightbox !== null ? items[lightbox] : null;
  const prev = () => setLightbox(i => i !== null ? (i - 1 + items.length) % items.length : null);
  const next = () => setLightbox(i => i !== null ? (i + 1) % items.length : null);

  return (
    <>
      <section className="py-20 bg-[#F9F9F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-[var(--font-playfair)]">
              Our <span className="gold-text">Work</span>
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm sm:text-base">
              Browse photos and videos of completed projects
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setLightbox(i)}
                className="relative rounded-2xl overflow-hidden cursor-pointer group aspect-square bg-gray-100"
              >
                {/* Thumbnail */}
                {item.type === 'video' ? (
                  item.thumbnail
                    // eslint-disable-next-line @next/next/no-img-element
                    ? <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    : <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                        <Play className="w-10 h-10 text-white/60" />
                      </div>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.mediaUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  {item.type === 'video' && (
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                      <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                    </div>
                  )}
                </div>

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-xs font-semibold truncate">{item.title}</p>
                </div>

                {/* Video badge */}
                {item.type === 'video' && (
                  <span className="absolute top-2 left-2 text-[9px] font-bold bg-purple-500 text-white px-1.5 py-0.5 rounded-full uppercase">
                    video
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            {/* Close */}
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Prev */}
            {items.length > 1 && (
              <button onClick={e => { e.stopPropagation(); prev(); }}
                className="absolute left-3 sm:left-6 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            {/* Media */}
            <motion.div
              key={lightbox}
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={e => e.stopPropagation()}
              className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center gap-4"
            >
              {current.type === 'video' ? (
                <video
                  src={current.mediaUrl}
                  controls autoPlay
                  className="max-h-[75vh] w-full rounded-2xl object-contain"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={current.mediaUrl}
                  alt={current.title}
                  className="max-h-[75vh] w-auto max-w-full rounded-2xl object-contain"
                />
              )}
              <div className="text-center">
                <p className="text-white font-semibold">{current.title}</p>
                {current.description && <p className="text-white/60 text-sm mt-1">{current.description}</p>}
                <p className="text-white/40 text-xs mt-2">{(lightbox ?? 0) + 1} / {items.length}</p>
              </div>
            </motion.div>

            {/* Next */}
            {items.length > 1 && (
              <button onClick={e => { e.stopPropagation(); next(); }}
                className="absolute right-3 sm:right-6 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
