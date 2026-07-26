'use client';

import { motion } from 'framer-motion';
import { Settings2, Wind, Zap, PenTool, CheckCircle2 } from 'lucide-react';
import { engravingMethods } from '@/lib/data';

const iconMap = { Settings2, Wind, Zap, PenTool };

export default function EngravingMethods() {
  return (
    <section id="methods" className="py-24 bg-[#F0F0F0] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, color-mix(in oklab, var(--color-orange-500) 10%, transparent) 0%, transparent 60%)',
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold text-gray-900 font-[var(--font-playfair)] mb-4"
          >
            Crafted with <span className="gold-text">Precision</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            Four expert engraving techniques — each chosen to match your stone, design, and durability requirements.
          </motion.p>
        </div>

        {/* Method cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {engravingMethods.map((method, i) => {
            const Icon = iconMap[method.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={method.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="glass rounded-2xl p-8 border border-gray-200 card-hover group"
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl gold-gradient flex items-center justify-center shrink-0 shadow-lg">
                    <Icon className="w-7 h-7 text-gray-900" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 font-[var(--font-playfair)]">
                      {method.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{method.description}</p>
                    <ul className="space-y-2">
                      {method.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-[var(--color-orange-500)] shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
