'use client';

import { motion } from 'framer-motion';
import { Shield, Clock, Truck, Headphones, Award, Wrench } from 'lucide-react';

const reasons = [
  { icon: Award, title: '15+ Years Experience', description: 'Over a decade of granite craftsmanship with hundreds of satisfied clients.' },
  { icon: Shield, title: 'Guaranteed Quality', description: 'Every piece is quality-checked before dispatch. 100% satisfaction guaranteed.' },
  { icon: Wrench, title: 'Advanced Technology', description: 'CNC machines, industrial laser etchers, and sandblasting rigs for perfect results.' },
  { icon: Clock, title: 'On-Time Delivery', description: 'We respect your deadlines. Express delivery options available.' },
  { icon: Truck, title: 'Pan-India Shipping', description: 'Safe, padded packaging ensuring your granite arrives intact anywhere in India.' },
  { icon: Headphones, title: 'Dedicated Support', description: 'WhatsApp, email, and phone support throughout the design and delivery process.' },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="py-24 bg-[#F0F0F0] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-25"
        style={{ background: 'radial-gradient(ellipse at 30% 50%, color-mix(in oklab, var(--color-orange-500) 8%, transparent) 0%, transparent 60%)' }}
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
            Built on <span className="gold-text">Trust &amp; Craft</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass rounded-2xl p-7 border border-gray-200 card-hover flex items-start gap-5"
            >
              <div className="w-11 h-11 rounded-xl gold-gradient flex items-center justify-center shrink-0">
                <r.icon className="w-5 h-5 text-gray-900" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{r.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{r.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
