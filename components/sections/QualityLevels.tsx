'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { qualityLevels } from '@/lib/data';

export default function QualityLevels() {
  return (
    <section id="quality" className="py-24 bg-[#F9F9F9] relative">
      <div className="absolute inset-0 stone-grid opacity-20" />
      <div
        className="absolute inset-0 opacity-30"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, color-mix(in oklab, var(--color-orange-500) 7%, transparent) 0%, transparent 60%)' }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold text-gray-900 font-[var(--font-playfair)] mb-4"
          >
            Choose Your <span className="gold-text">Quality Level</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            Three tiers of craftsmanship, each delivering exceptional results tailored to your budget and expectations.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {qualityLevels.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className={`rounded-2xl p-8 border flex flex-col relative ${
                tier.highlight
                  ? 'glass-gold border-[color-mix(in_oklab,var(--color-orange-500)_30%,transparent)] shadow-[0_0_40px_color-mix(in_oklab,var(--color-orange-500)_12%,transparent)]'
                  : 'glass border-gray-200'
              } card-hover`}
            >
              {tier.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 gold-gradient text-gray-900 text-xs font-bold px-4 py-1 rounded-full">
                    <Star className="w-3 h-3" fill="currentColor" /> Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-1 font-[var(--font-playfair)]">
                  {tier.name}
                </h3>
                <p className="text-[var(--color-orange-500)] text-lg font-semibold">{tier.price}</p>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">{tier.description}</p>

              <ul className="space-y-3 mb-8">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-[var(--color-orange-500)] shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href="/order"
                className={`inline-flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  tier.highlight
                    ? 'bg-blue-600/90 backdrop-blur-sm border border-blue-500/40 text-white shadow-[0_4px_20px_rgba(37,99,235,0.35)] hover:bg-blue-700 hover:shadow-[0_6px_28px_rgba(37,99,235,0.45)]'
                    : 'bg-white/60 backdrop-blur-sm border border-blue-200/70 text-blue-700 shadow-sm hover:bg-blue-50/80 hover:border-blue-300 hover:shadow-[0_4px_16px_rgba(37,99,235,0.15)]'
                }`}
              >
                Order {tier.name} <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
