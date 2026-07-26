'use client';

import { motion } from 'framer-motion';
import { Home, CheckCircle2, ArrowRight, Palette, Ruler, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingButtons from '@/components/ui/FloatingButtons';
import ServiceMediaGallery from '@/components/sections/ServiceMediaGallery';
import { useServiceHero } from '@/lib/use-service-hero';

const features = [
  { title: 'Family Name & House Number', description: 'Crisp, deep-cut lettering that stays legible for decades.' },
  { title: 'Decorative Borders & Motifs', description: 'Traditional kolam patterns, floral borders, or modern geometric frames.' },
  { title: 'Multiple Granite Colours', description: 'Absolute Black, Grey, Red, or Serpentine granite to match your home.' },
  { title: 'All Three Engraving Methods', description: 'CNC, Laser, or Sandblasting — we recommend the best for your design.' },
];

const sizes = [
  { label: '12 × 6 in', note: 'Apartment / flat', price: 'From ₹1,500' },
  { label: '18 × 9 in', note: 'Independent house', price: 'From ₹2,800', popular: true },
  { label: '24 × 12 in', note: 'Villa / bungalow', price: 'From ₹4,500' },
  { label: 'Custom', note: 'Any dimension', price: 'On request' },
];

const steps = [
  { n: '01', title: 'Share your design', body: 'Send us your name, house number, and any reference images via WhatsApp or the quote form.' },
  { n: '02', title: 'Proof approval', body: 'We send a digital proof within 24 hours. No work begins until you approve.' },
  { n: '03', title: 'Stone selection', body: 'Choose your granite colour and engraving method — we guide you to the best option.' },
  { n: '04', title: 'Delivery & fitting', body: 'Completed in 3–5 days. Chennai-wide delivery and optional on-site installation.' },
];

export default function HouseNameBoardsPage() {
  const { heroImageUrl, cardImageUrl } = useServiceHero('house-name-boards');

  return (
    <main className="min-h-screen bg-[#F9F9F9]">
      <Navbar />

      {/* Hero */}
      <section
        className="pt-32 pb-20 relative overflow-hidden"
        style={{
          backgroundImage: `url(${heroImageUrl || '/images/house-name-boards.jpg'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#1c0a00',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-orange-950/80 via-red-950/60 to-black/80" />
        <div className="absolute inset-0 stone-grid opacity-10" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
                <Home className="w-4 h-4 text-orange-400" />
                <span className="text-sm font-medium text-orange-300">House Name Boards</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-[var(--font-playfair)] mb-6 leading-tight">
                Your Home's First<br /><span className="gold-text">Impression</span>
              </h1>
              <p className="text-gray-200 text-lg leading-relaxed mb-8">
                A hand-crafted granite name board that tells your story — engraved once, lasting forever. Custom lettering, decorative borders, and premium finishes for every home.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/order" className="inline-flex items-center gap-2 gold-gradient px-6 py-3 rounded-full text-sm font-semibold text-white shadow-[0_2px_14px_color-mix(in_oklab,var(--color-orange-500)_35%,transparent)] hover:shadow-[0_4px_22px_color-mix(in_oklab,var(--color-orange-500)_50%,transparent)] transition-all">
                  <Sparkles className="w-4 h-4" /> Get a Free Quote
                </Link>
                <Link href="/gallery" className="inline-flex items-center gap-2 bg-white/10 border border-white/30 px-6 py-3 rounded-full text-sm font-semibold text-white hover:bg-white/20 transition-all">
                  View Gallery <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
              <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl" style={{ height: 380 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={cardImageUrl || '/images/house-name-boards-card.jpg'} alt="House name board" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  <div className="flex items-center gap-2">
                    <Home className="w-5 h-5 text-orange-400" />
                    <span className="text-xs text-orange-300 font-semibold tracking-widest uppercase">House Name Boards</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[['500+', 'Boards Delivered'], ['3–5', 'Day Turnaround'], ['100%', 'Custom Design'], ['4', 'Granite Colours']].map(([v, l]) => (
                      <div key={l} className="bg-black/40 backdrop-blur-sm rounded-lg p-2 text-center border border-white/10">
                        <p className="text-sm font-bold gold-text">{v}</p>
                        <p className="text-gray-300 text-[9px] mt-0.5">{l}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-[#F0F0F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-[var(--font-playfair)]">
              What's <span className="gold-text">Included</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 border border-gray-200 card-hover">
                <CheckCircle2 className="w-6 h-6 text-orange-500 mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sizes */}
      <section className="py-20 bg-[#F9F9F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-[var(--font-playfair)]">
              Standard <span className="gold-text">Sizes</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sizes.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`rounded-2xl p-6 border text-center card-hover ${s.popular ? 'glass-gold border-[color-mix(in_oklab,var(--color-orange-500)_30%,transparent)]' : 'glass border-gray-200'}`}>
                {s.popular && <div className="inline-block bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">Most Popular</div>}
                <Ruler className="w-6 h-6 text-[#6B7280] mx-auto mb-3" />
                <p className="text-xl font-bold text-gray-900 font-[var(--font-playfair)]">{s.label}</p>
                <p className="text-gray-500 text-sm mb-3">{s.note}</p>
                <p className="gold-text font-semibold">{s.price}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-[#F0F0F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-[var(--font-playfair)]">
              How It <span className="gold-text">Works</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <motion.div key={s.n} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 border border-gray-200">
                <p className="text-4xl font-bold gold-text font-[var(--font-playfair)] mb-4">{s.n}</p>
                <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#F9F9F9]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="glass-gold rounded-3xl p-12 border border-[color-mix(in_oklab,var(--color-orange-500)_20%,transparent)]">
            <Palette className="w-12 h-12 text-[#6B7280] mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 font-[var(--font-playfair)] mb-4">
              Ready to Order Your <span className="gold-text">Name Board?</span>
            </h2>
            <p className="text-gray-600 mb-8">Share your details and we'll send a free digital proof within 24 hours — no obligation.</p>
            <Link href="/order" className="inline-flex items-center gap-2 gold-gradient px-8 py-4 rounded-full text-base font-semibold text-white shadow-[0_2px_14px_color-mix(in_oklab,var(--color-orange-500)_35%,transparent)] hover:shadow-[0_4px_22px_color-mix(in_oklab,var(--color-orange-500)_50%,transparent)] transition-all">
              <Sparkles className="w-4 h-4" /> Start Your Order
            </Link>
          </motion.div>
        </div>
      </section>

      <ServiceMediaGallery service="house-name-boards" />

      <Footer />
      <FloatingButtons />
    </main>
  );
}
