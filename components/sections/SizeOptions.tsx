'use client';

import { motion } from 'framer-motion';
import { Ruler, Star } from 'lucide-react';
import { sizeOptions } from '@/lib/data';

export default function SizeOptions() {
  return (
    <section id="sizes" className="py-24 bg-[#F0F0F0] relative">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 font-[var(--font-playfair)] mb-5">
              Pick the <span className="gold-text">Perfect Size</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Whether you need a compact house name board or a large school entrance marker, we have the right dimensions — and we can accommodate any custom size.
            </p>
            <div className="glass-gold rounded-2xl p-6 border border-[color-mix(in_oklab,var(--color-orange-500)_20%,transparent)]">
              <div className="flex items-start gap-3">
                <Ruler className="w-5 h-5 text-[var(--color-orange-500)] mt-0.5 shrink-0" />
                <div>
                  <p className="text-gray-900 font-semibold mb-1">Custom Dimensions Available</p>
                  <p className="text-gray-600 text-sm">
                    Don't see the size you need? We cut and engrave granite to any specification. Contact us with your exact requirements.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right table */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="glass rounded-2xl border border-gray-200 overflow-hidden">
              <div className="bg-[color-mix(in_oklab,var(--color-orange-500)_6%,transparent)] px-6 py-4 border-b border-black/[0.07] flex items-center justify-between">
                <span className="text-sm font-semibold text-[var(--color-orange-500)] uppercase tracking-wider">Size</span>
                <span className="text-sm font-semibold text-[var(--color-orange-500)] uppercase tracking-wider">Usage</span>
              </div>
              {sizeOptions.map((option, i) => (
                <div
                  key={option.size}
                  className={`px-6 py-4 flex items-center justify-between border-b border-white/[0.04] last:border-0 transition-colors hover:bg-white/[0.02] ${option.popular ? 'bg-[color-mix(in_oklab,var(--color-orange-500)_4%,transparent)]' : ''}`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-gray-900 font-medium">{option.size}</span>
                    {option.popular && (
                      <span className="inline-flex items-center gap-1 text-[10px] bg-[color-mix(in_oklab,var(--color-orange-500)_12%,transparent)] text-[var(--color-orange-600)] px-2 py-0.5 rounded-full border border-[color-mix(in_oklab,var(--color-orange-500)_25%,transparent)]">
                        <Star className="w-2.5 h-2.5" fill="currentColor" /> Popular
                      </span>
                    )}
                  </div>
                  <span className="text-gray-600 text-sm">{option.usage}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
