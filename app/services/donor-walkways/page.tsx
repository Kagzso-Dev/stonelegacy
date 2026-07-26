'use client';

import { motion } from 'framer-motion';
import { Users, CheckCircle2, ArrowRight, Footprints, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingButtons from '@/components/ui/FloatingButtons';
import ServiceMediaGallery from '@/components/sections/ServiceMediaGallery';
import { useServiceHero } from '@/lib/use-service-hero';

const features = [
  { title: 'Donor & Alumni Names', description: "Each stone permanently engraved with the individual's name, year, and dedication message." },
  { title: 'Batch & Quantity Orders', description: 'Uniform sizing and consistent engraving across 10 to 1,000+ stones for full walkways.' },
  { title: 'Logo & Crest Integration', description: 'Institution crest or campaign logo added to each stone for cohesive branding.' },
  { title: 'Flush-Mount Ready', description: 'Stones are calibrated to standard paver thickness for seamless ground-level installation.' },
];

const layouts = [
  { title: 'Single Paver Stone', size: '12 Ã— 12 in', desc: 'Name, year, and short dedication. Ideal for individual donor recognition.', price: 'From â‚¹2,200' },
  { title: 'Double-Wide Stone', size: '12 Ã— 24 in', desc: 'Family name, multi-year donation, or couple recognition with logo.', price: 'From â‚¹3,800' },
  { title: 'Anchor Stone', size: '24 Ã— 24 in', desc: 'Lead-donor or founding-patron highlight stone at the walkway entrance.', price: 'From â‚¹7,500' },
  { title: 'Full Walkway Kit', size: 'Custom', desc: 'End-to-end design, bulk engraving, and site-coordinated delivery.', price: 'On request' },
];

const steps = [
  { n: '01', title: 'Donor list & layout plan', body: 'Provide your donor names and preferred walkway layout. We create a scaled floor plan at no charge.' },
  { n: '02', title: 'Proof per stone', body: 'Each stone gets an individual proof. Batch review available for large projects.' },
  { n: '03', title: 'Bulk engraving', body: 'All stones engraved to identical depth and finish. QC-checked before dispatch.' },
  { n: '04', title: 'Phased delivery', body: 'Delivered in phases to match your construction schedule. Replacement stones available any time.' },
];

export default function DonorWalkwaysPage() {
  const { heroImageUrl, cardImageUrl } = useServiceHero('donor-walkways');
  return (
    <main className="min-h-screen bg-[#F9F9F9]">
      <Navbar />

      {/* Hero */}
      <section
        className="pt-32 pb-20 relative overflow-hidden"
        style={{
          backgroundImage: `url(${heroImageUrl || '/images/donor-walkways.jpg'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#451a03',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-amber-950/80 via-stone-900/70 to-black/80" />
        <div className="absolute inset-0 stone-grid opacity-10" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
                <Users className="w-4 h-4 text-orange-400" />
                <span className="text-sm font-medium text-orange-300">Donor Walkways</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-[var(--font-playfair)] mb-6 leading-tight">
                Every Step Tells<br /><span className="gold-text">a Story</span>
              </h1>
              <p className="text-gray-200 text-lg leading-relaxed mb-8">
                Honour donors, alumni, and benefactors with engraved granite paver stones â€” a living tribute walked upon and remembered for generations.
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
                <img src={cardImageUrl || '/images/donor-walkways-card.jpg'} alt="Donor walkway" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-orange-400" />
                    <span className="text-xs text-orange-300 font-semibold tracking-widest uppercase">Donor Walkways</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[['1,000+', 'Stones Laid'], ['Bulk', 'Pricing Available'], ['Flush', 'Mount Ready'], ['15+', 'Yrs Experience']].map(([v, l]) => (
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

      {/* Stone Layouts */}
      <section className="py-20 bg-[#F9F9F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-[var(--font-playfair)]">
              Stone <span className="gold-text">Options</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {layouts.map((l, i) => (
              <motion.div key={l.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 border border-gray-200 card-hover flex flex-col">
                <Footprints className="w-6 h-6 text-orange-500 mb-3" />
                <p className="text-xs text-[#6B7280] mb-1">{l.size}</p>
                <h3 className="font-bold text-gray-900 mb-2">{l.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-1">{l.desc}</p>
                <p className="gold-text font-semibold mt-4 text-sm">{l.price}</p>
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
            <Users className="w-12 h-12 text-[#6B7280] mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 font-[var(--font-playfair)] mb-4">
              Planning a <span className="gold-text">Donor Walkway?</span>
            </h2>
            <p className="text-gray-600 mb-8">Share your donor list and walkway dimensions â€” we'll send a free layout plan and bulk pricing within 48 hours.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 gold-gradient px-8 py-4 rounded-full text-base font-semibold text-white shadow-[0_2px_14px_color-mix(in_oklab,var(--color-orange-500)_35%,transparent)] hover:shadow-[0_4px_22px_color-mix(in_oklab,var(--color-orange-500)_50%,transparent)] transition-all">
              <Sparkles className="w-4 h-4" /> Start the Project
            </Link>
          </motion.div>
        </div>
      </section>

      <ServiceMediaGallery service="donor-walkways" />

      <Footer />
      <FloatingButtons />
    </main>
  );
}
