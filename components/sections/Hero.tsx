'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown, Diamond } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';
import { useServiceHero } from '@/lib/use-service-hero';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { heroImageUrl, cardImageUrl } = useServiceHero('home');
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      {/* Background layers — dark granite with ken-burns */}
      <motion.div className="absolute inset-0 ken-burns" style={{ y: bgY, opacity: bgOpacity }}>
        {heroImageUrl ? (
          <img src={heroImageUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 granite-hero-bg" />
        )}
        <div className="absolute inset-0 granite-vein-overlay opacity-60" />
        <div className="absolute inset-0 hero-grid" />
      </motion.div>

      {/* Ambient colour orbs — warm orange only */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-[-10%] right-[-8%] w-[55vw] h-[55vw] rounded-full hero-orb-1"
          style={{ background: 'radial-gradient(circle, color-mix(in oklab, var(--color-orange-500) 11%, transparent) 0%, transparent 65%)' }}
        />
        <div
          className="absolute bottom-[-8%] left-[-5%] w-[48vw] h-[48vw] rounded-full hero-orb-2"
          style={{ background: 'radial-gradient(circle, color-mix(in oklab, var(--color-orange-600) 9%, transparent) 0%, transparent 60%)' }}
        />
        <div
          className="absolute top-[40%] left-[30%] w-[28vw] h-[28vw] rounded-full hero-orb-3"
          style={{ background: 'radial-gradient(circle, rgba(251,146,60,0.06) 0%, transparent 55%)' }}
        />
      </div>

      {/* Light sweep */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]">
        <div className="light-sweep absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.7) 100%)' }}
      />

      {/* Bottom fade to site bg */}
      <div className="absolute bottom-0 left-0 right-0 h-48 z-[4] pointer-events-none bg-gradient-to-t from-[#F9F9F9] to-transparent" />

      {/* Main content */}
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[108px] pb-20"
        style={{ y: contentY }}
      >
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center min-h-[calc(100vh-128px)]">

          {/* Left — copy */}
          <div className="flex flex-col items-start text-left">

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl sm:text-6xl lg:text-[3.5rem] xl:text-[4.25rem] font-bold text-white mb-5 leading-[1.08] tracking-tight font-[var(--font-playfair)]"
            >
              Custom Granite
              <br />
              <span className="gold-text">Engraving</span>
              <br />
              &amp; Memorials
            </motion.h1>

            {/* Orange rule */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.38 }}
              className="w-16 h-[2px] mb-6 origin-left rounded-full"
              style={{ background: 'linear-gradient(90deg, var(--color-orange-500), var(--color-orange-600), transparent)' }}
            />

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.44, ease: [0.22, 1, 0.36, 1] }}
              className="text-base sm:text-lg text-gray-300/90 max-w-lg mb-8 leading-relaxed"
            >
              Timeless granite signs, school memorials, donor walkways, house name boards,
              and custom stone engravings — crafted with CNC, Sandblasting &amp; Laser Technology.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-start gap-4"
            >
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/order"
                  className="group inline-flex items-center gap-2.5 gold-gradient px-8 py-4 rounded-full font-semibold text-white text-base gold-glow"
                >
                  Get a Free Quote
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/gallery"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-semibold text-white text-base border border-white/15 hover:border-orange-400/40 hover:bg-orange-500/[0.07] backdrop-blur-sm transition-all duration-300"
                >
                  <Diamond className="w-4 h-4 text-[var(--color-orange-400)]" />
                  View Designs
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Right — stone showcase */}
          <div className="hidden lg:flex items-center justify-center">
            <StoneShowcase photoUrl={cardImageUrl || '/images/hero-showcase.jpg'} />
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-52 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
      >
        <span className="text-[10px] text-gray-500 tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function StoneShowcase({ photoUrl }: { photoUrl: string }) {
  return (
    <div className="relative w-[400px] h-[480px]">
      {/* Glow behind card */}
      <div
        className="absolute inset-0 rounded-3xl blur-3xl opacity-30"
        style={{ background: 'radial-gradient(circle, color-mix(in oklab, var(--color-orange-500) 50%, transparent) 0%, rgba(99,102,241,0.15) 55%, transparent 75%)' }}
      />

      {/* Main photo card */}
      <motion.div
        initial={{ opacity: 0, y: 32, rotateY: -6 }}
        animate={{ opacity: 1, y: 0, rotateY: 0 }}
        transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 rounded-2xl overflow-hidden border border-white/[0.12] shadow-2xl"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photoUrl}
          alt="Stone engraving craftsmanship"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark gradient overlay — heavier at bottom for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />

        <div className="relative z-10 p-8 h-full flex flex-col justify-between">
          {/* Top badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <div className="w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_8px_color-mix(in_oklab,var(--color-orange-500)_80%,transparent)]" />
            <span className="text-[11px] text-orange-300/90 tracking-widest uppercase font-semibold">
              StoneLegacy Crafts
            </span>
          </motion.div>

          {/* Bottom section */}
          <div>
            {/* Brand text over photo */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="font-[var(--font-playfair)] mb-5"
            >
              <div className="text-3xl font-bold text-white leading-tight drop-shadow-lg">Precision</div>
              <div className="text-3xl font-bold gold-text leading-tight drop-shadow-lg">Engraved</div>
              <div className="text-xs text-gray-400 tracking-[0.22em] uppercase mt-1.5">in Granite · Since 2009</div>
            </motion.div>

            {/* Tags */}
            <div className="flex gap-2 flex-wrap">
              {['CNC', 'Sandblasted', 'Laser Cut'].map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.35 + i * 0.1 }}
                  className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-orange-500/30 bg-orange-500/15 text-orange-300 backdrop-blur-sm"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating order card — bottom left */}
      <motion.div
        initial={{ opacity: 0, x: -20, y: 12 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.8, delay: 1.3 }}
        className="float-delay absolute -bottom-6 -left-10 w-44 rounded-xl p-3.5 border border-green-500/20 backdrop-blur-md shadow-xl"
        style={{ background: 'rgba(8,14,10,0.9)' }}
      >
        <div className="flex items-center gap-1.5 mb-1">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.8)]" />
          <span className="text-[10px] font-bold text-green-400">Just Delivered</span>
        </div>
        <div className="text-[11px] text-gray-200 font-medium">House Name Board</div>
        <div className="text-[9px] text-gray-500 mt-0.5">Black Galaxy Granite</div>
      </motion.div>

      {/* Corner decoration */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute top-1/2 -right-14 -translate-y-1/2 w-8 h-8 rounded-full border border-orange-500/30 flex items-center justify-center"
        style={{ background: 'color-mix(in oklab, var(--color-orange-500) 8%, transparent)' }}
      >
        <Diamond className="w-3.5 h-3.5 text-orange-400" />
      </motion.div>
    </div>
  );
}
