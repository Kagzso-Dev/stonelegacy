'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { graniteTypes } from '@/lib/data';

export default function GraniteTypes() {
  return (
    <section id="granite" className="py-24 bg-[#F9F9F9] relative">
      <div className="absolute inset-0 stone-grid opacity-20" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold text-gray-900 font-[var(--font-playfair)] mb-4"
          >
            Choose Your <span className="gold-text">Granite</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            We source the finest Indian granite varieties, each selected for lasting beauty and engraving excellence.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {graniteTypes.map((granite, i) => (
            <motion.div
              key={granite.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass rounded-2xl overflow-hidden border border-gray-200 card-hover"
            >
              {/* Color swatch */}
              <div
                className="h-28 relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${granite.color}, ${granite.color}88)`,
                }}
              >
                <div className="absolute inset-0 opacity-30" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
                }} />
                <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full border-2 border-gray-300"
                  style={{ background: granite.color }} />
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2 font-[var(--font-playfair)]">
                  {granite.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{granite.description}</p>
                <ul className="space-y-1.5">
                  {granite.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-gray-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-orange-500)] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
