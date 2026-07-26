'use client';

import { motion } from 'framer-motion';
import { Home, Award, Users, BookOpen, Flower2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { services } from '@/lib/data';

const iconMap = { Home, Award, Users, BookOpen, Flower2 };

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

export default function Services() {
  return (
    <section id="services" className="py-24 bg-[#F9F9F9] relative">
      <div className="absolute inset-0 stone-grid opacity-30" />
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
            What We <span className="gold-text">Engrave</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            From intimate house name boards to large institutional memorials — we craft each piece with precision and care.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={service.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
                className="glass rounded-2xl p-7 border border-gray-200 card-hover group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center mb-5 group-hover:gold-glow transition-all">
                  <Icon className="w-6 h-6 text-gray-900" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 font-[var(--font-playfair)]">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">{service.description}</p>
                <Link
                  href="/order"
                  className="inline-flex items-center gap-1.5 text-[var(--color-orange-500)] text-sm font-medium hover:gap-3 transition-all"
                >
                  Order Now <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            );
          })}

          {/* CTA card */}
          <motion.div
            custom={services.length}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className="glass-gold rounded-2xl p-7 border border-[color-mix(in_oklab,var(--color-orange-500)_20%,transparent)] card-hover flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 font-[var(--font-playfair)]">
                Custom Project?
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Have a unique requirement? We specialise in bespoke granite projects of any shape, size, or complexity.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 gold-gradient px-5 py-2.5 rounded-full text-sm font-semibold text-gray-900 self-start"
            >
              Talk to Us <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
