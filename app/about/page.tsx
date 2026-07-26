'use client';

import { motion } from 'framer-motion';
import { Diamond, Target, Eye, Heart, Award, Users, MapPin } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingButtons from '@/components/ui/FloatingButtons';

const values = [
  { icon: Award, title: 'Excellence', description: 'Every stone we engrave reflects our commitment to perfection and lasting quality.' },
  { icon: Heart, title: 'Legacy', description: 'We believe every name, story, and memory deserves to be preserved for generations.' },
  { icon: Users, title: 'Community', description: 'We proudly serve schools, institutions, and families across Tamil Nadu and beyond.' },
];

const team = [
  { name: 'A. Krishnaswamy', role: 'Founder & Master Craftsman', exp: '20+ yrs' },
  { name: 'R. Santhosh', role: 'Head of CNC Operations', exp: '12+ yrs' },
  { name: 'P. Meenakshi', role: 'Design Consultant', exp: '8+ yrs' },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F9F9F9]">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 relative granite-bg">
        <div className="absolute inset-0 stone-grid opacity-30" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 font-[var(--font-playfair)] mb-6 leading-tight">
                Preserving Memories<br />
                <span className="gold-text">in Stone</span>
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Founded in 2009, StoneLegacy Engravers was born from a passion for granite craftsmanship and a belief that the finest tributes are carved in stone.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Our mission is to preserve memories and legacies through premium granite craftsmanship and modern engraving technology — creating pieces that outlast generations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="glass-gold rounded-3xl p-10 border border-[rgba(107,114,128,0.2)] text-center">
                <Diamond className="w-16 h-16 text-[#6B7280] mx-auto mb-6" />
                <p className="text-3xl font-bold text-gray-900 font-[var(--font-playfair)] mb-2">15+ Years</p>
                <p className="text-[#6B7280] mb-6">of granite mastery</p>
                <div className="grid grid-cols-2 gap-6">
                  {[['500+', 'Engravings'], ['50+', 'Institutions'], ['100%', 'Satisfaction'], ['4', 'Techniques']].map(([v, l]) => (
                    <div key={l} className="text-center">
                      <p className="text-2xl font-bold gold-text">{v}</p>
                      <p className="text-gray-600 text-xs mt-0.5">{l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-[#F0F0F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Eye,
                label: 'Our Vision',
                text: "To be India's most trusted name in granite engraving — where every stone we create stands as a timeless tribute to the people and institutions it honours.",
              },
              {
                icon: Target,
                label: 'Our Mission',
                text: "To preserve memories and legacies through premium granite craftsmanship and modern engraving technology, delivering excellence with every piece.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass rounded-2xl p-8 border border-gray-200"
              >
                <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center mb-5">
                  <item.icon className="w-6 h-6 text-gray-900" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 font-[var(--font-playfair)]">{item.label}</h3>
                <p className="text-gray-600 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[#F9F9F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-[var(--font-playfair)]">
              What Drives <span className="gold-text">Us</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-8 border border-gray-200 text-center card-hover"
              >
                <div className="w-14 h-14 rounded-2xl gold-gradient flex items-center justify-center mx-auto mb-5">
                  <v.icon className="w-7 h-7 text-gray-900" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 font-[var(--font-playfair)]">{v.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-[#F0F0F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-[var(--font-playfair)]">
              Meet Our <span className="gold-text">Craftsmen</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-8 border border-gray-200 text-center card-hover"
              >
                <div className="w-16 h-16 rounded-full gold-gradient flex items-center justify-center mx-auto mb-4">
                  <span className="text-gray-900 font-bold text-2xl font-[var(--font-playfair)]">
                    {member.name[0]}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-[#6B7280] text-sm mb-2">{member.role}</p>
                <p className="text-gray-500 text-xs">{member.exp} experience</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-20 bg-[#F9F9F9]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-gold rounded-2xl p-10 border border-[rgba(107,114,128,0.2)]"
          >
            <MapPin className="w-10 h-10 text-[#6B7280] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3 font-[var(--font-playfair)]">Visit Our Workshop</h3>
            <p className="text-gray-600 mb-2">123 Granite Avenue, Ambattur Industrial Estate</p>
            <p className="text-gray-600 mb-6">Chennai, Tamil Nadu — 600 058</p>
            <p className="text-[#6B7280] text-sm">Open Mon–Sat · 9 AM – 6 PM</p>
          </motion.div>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </main>
  );
}
