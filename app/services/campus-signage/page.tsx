'use client';

import { motion } from 'framer-motion';
import { MapPin, CheckCircle2, ArrowRight, LayoutDashboard, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingButtons from '@/components/ui/FloatingButtons';
import ServiceMediaGallery from '@/components/sections/ServiceMediaGallery';
import { useServiceHero } from '@/lib/use-service-hero';

const features = [
  { title: 'Directional & Wayfinding Signs', description: 'Department names, block identifiers, and arrows in matching granite for a unified campus look.' },
  { title: 'Memorial Garden Plaques', description: 'Tribute plaques dedicated to educators, founders, and community pillars — mounted on garden walls or pedestals.' },
  { title: 'Entrance & Boundary Signage', description: 'Large polished granite entrance signs with institution name, logo, and established year.' },
  { title: 'Consistent Branding', description: 'All pieces matched in granite colour, font, and finish — presenting a cohesive institutional identity.' },
];

const products = [
  { title: 'Campus Entrance Sign', desc: 'Grand entrance stone with full institution name, logo, and year. Available in sizes up to 4 × 2 ft.' },
  { title: 'Directional Wayfinding', desc: 'Department and block identifier stones set into pathways or mounted on walls throughout campus.' },
  { title: 'Memorial Garden Plaque', desc: 'Tribute stones for educators and founders — mounted in garden settings with optional flower-holder cutout.' },
  { title: 'Auditorium / Hall Name Plaque', desc: 'Prestige wall-mounted name plaques for named halls, libraries, and seminar rooms.' },
];

const steps = [
  { n: '01', title: 'Campus walkthrough', body: 'We visit the campus to understand placement, sight-lines, and mounting requirements at no charge.' },
  { n: '02', title: 'Unified design system', body: 'Our team produces a cohesive sign-family with consistent typography, granite type, and finish.' },
  { n: '03', title: 'Phased production', body: 'Signage is produced in priority phases so construction and signage completion align perfectly.' },
  { n: '04', title: 'Professional installation', body: 'Mounted and sealed by our team. Anchor hardware and weatherproof silicone included.' },
];

export default function CampusSignagePage() {
  const { heroImageUrl, cardImageUrl } = useServiceHero('campus-signage');
  return (
    <main className="min-h-screen bg-[#F9F9F9]">
      <Navbar />

      {/* Hero */}
      <section
        className="pt-32 pb-20 relative overflow-hidden"
        style={{
          backgroundImage: `url(${heroImageUrl || '/images/campus-signage.jpg'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#052e16',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/80 via-teal-950/60 to-black/80" />
        <div className="absolute inset-0 stone-grid opacity-10" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
                <MapPin className="w-4 h-4 text-orange-400" />
                <span className="text-sm font-medium text-orange-300">Campus Signage</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-[var(--font-playfair)] mb-6 leading-tight">
                Define Your Campus<br /><span className="gold-text">in Stone</span>
              </h1>
              <p className="text-gray-200 text-lg leading-relaxed mb-8">
                From entrance gates to memorial gardens, we design and engrave a complete granite signage system that gives your campus a timeless, unified identity.
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
                <img src={cardImageUrl || '/images/campus-signage-card.jpg'} alt="Campus signage" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-orange-400" />
                    <span className="text-xs text-orange-300 font-semibold tracking-widest uppercase">Campus Signage</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[['50+', 'Campuses Served'], ['Full', 'Site Visits'], ['Unified', 'Design System'], ['15+', 'Yrs Experience']].map(([v, l]) => (
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
              What We <span className="gold-text">Provide</span>
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

      {/* Products */}
      <section className="py-20 bg-[#F9F9F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-[var(--font-playfair)]">
              Popular <span className="gold-text">Sign Types</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {products.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-7 border border-gray-200 card-hover flex gap-4">
                <LayoutDashboard className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">{p.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>
                </div>
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
              Our <span className="gold-text">Process</span>
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
            <MapPin className="w-12 h-12 text-[#6B7280] mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 font-[var(--font-playfair)] mb-4">
              Ready to Transform Your <span className="gold-text">Campus?</span>
            </h2>
            <p className="text-gray-600 mb-8">We offer free site visits for campus signage projects. Get in touch and we'll plan the full signage system together.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 gold-gradient px-8 py-4 rounded-full text-base font-semibold text-white shadow-[0_2px_14px_color-mix(in_oklab,var(--color-orange-500)_35%,transparent)] hover:shadow-[0_4px_22px_color-mix(in_oklab,var(--color-orange-500)_50%,transparent)] transition-all">
              <Sparkles className="w-4 h-4" /> Book a Site Visit
            </Link>
          </motion.div>
        </div>
      </section>

      <ServiceMediaGallery service="campus-signage" />

      <Footer />
      <FloatingButtons />
    </main>
  );
}
