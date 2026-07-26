'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingButtons from '@/components/ui/FloatingButtons';
import { useSettings } from '@/lib/settings-context';

const API = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/api$/, '');

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactForm>();
  const { settings } = useSettings();
  const phone    = settings?.phone    || '+91 98400 00000';
  const whatsapp = settings?.whatsapp || phone;
  const email    = settings?.email    || 'info@stonelegacy.in';
  const whatsappDigits = whatsapp.replace(/\D/g, '');

  const contactInfo = [
    { icon: Phone, label: 'Phone', value: phone, sub: 'Mon–Sat, 9 AM – 6 PM', href: `tel:${phone}` },
    { icon: MessageCircle, label: 'WhatsApp', value: whatsapp, sub: 'Quick response', href: `https://wa.me/${whatsappDigits}` },
    { icon: Mail, label: 'Email', value: email, sub: 'Reply within 24 hours', href: `mailto:${email}` },
    { icon: MapPin, label: 'Workshop', value: 'Ambattur, Chennai', sub: 'Tamil Nadu – 600 058', href: '#map' },
  ];

  const onSubmit = async (data: ContactForm) => {
    setSubmitError('');
    try {
      const r = await fetch(`${API}/api/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!r.ok) throw new Error('Failed to send message');
      setSubmitted(true);
    } catch {
      setSubmitError('Something went wrong. Please try again or contact us via phone/WhatsApp.');
    }
  };

  return (
    <main className="min-h-screen bg-[#F9F9F9]">
      <Navbar />

      <div className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold text-gray-900 font-[var(--font-playfair)] mb-4"
            >
              Let's Create <span className="gold-text">Something Timeless</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 text-lg max-w-xl mx-auto"
            >
              Have a question or ready to start your project? Reach out — we respond the same day.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-5 gap-10">
            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 space-y-4"
            >
              {contactInfo.map((info) => (
                <a
                  key={info.label}
                  href={info.href}
                  target={info.label === 'WhatsApp' ? '_blank' : undefined}
                  rel={info.label === 'WhatsApp' ? 'noopener noreferrer' : undefined}
                  className="flex items-start gap-4 glass rounded-2xl p-5 border border-gray-200 card-hover block"
                >
                  <div className="w-11 h-11 rounded-xl gold-gradient flex items-center justify-center shrink-0">
                    <info.icon className="w-5 h-5 text-gray-900" />
                  </div>
                  <div>
                    <p className="text-[#6B7280] text-xs font-medium uppercase tracking-wider mb-0.5">{info.label}</p>
                    <p className="text-gray-900 font-semibold">{info.value}</p>
                    <p className="text-gray-500 text-sm">{info.sub}</p>
                  </div>
                </a>
              ))}

              {/* Map placeholder */}
              <div
                id="map"
                className="glass rounded-2xl overflow-hidden border border-gray-200 h-48 flex items-center justify-center"
              >
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-[#6B7280] mx-auto mb-2" />
                  <p className="text-gray-600 text-sm">Ambattur Industrial Estate</p>
                  <p className="text-gray-500 text-xs">Chennai, Tamil Nadu</p>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-3"
            >
              <div className="glass rounded-2xl p-8 border border-gray-200">
                {submitted ? (
                  <div className="text-center py-12">
                    <CheckCircle2 className="w-16 h-16 text-[#6B7280] mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 font-[var(--font-playfair)]">Message Sent!</h3>
                    <p className="text-gray-600">We'll get back to you within 24 hours.</p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-6 gold-gradient text-gray-900 px-6 py-2.5 rounded-full font-semibold text-sm"
                    >
                      Send Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 font-[var(--font-playfair)]">Send Us a Message</h3>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-gray-600 text-sm mb-1.5">Full Name *</label>
                        <input
                          {...register('name', { required: 'Name is required' })}
                          placeholder="Your full name"
                          className="input-dark"
                        />
                        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label className="block text-gray-600 text-sm mb-1.5">Phone Number</label>
                        <input
                          {...register('phone')}
                          placeholder="+91 98765 43210"
                          className="input-dark"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-600 text-sm mb-1.5">Email Address *</label>
                      <input
                        {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
                        placeholder="you@example.com"
                        type="email"
                        className="input-dark"
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                      <label className="block text-gray-600 text-sm mb-1.5">Subject</label>
                      <input
                        {...register('subject')}
                        placeholder="What can we help you with?"
                        className="input-dark"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-600 text-sm mb-1.5">Message *</label>
                      <textarea
                        {...register('message', { required: 'Message is required' })}
                        placeholder="Tell us about your project or enquiry..."
                        rows={5}
                        className="input-dark resize-none"
                      />
                      {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
                    </div>

                    {submitError && <p className="text-red-400 text-sm">{submitError}</p>}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full gold-gradient text-gray-900 py-3.5 rounded-xl font-semibold text-base flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      {isSubmitting ? 'Sending...' : (
                        <><Send className="w-4 h-4" /> Send Message</>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
      <FloatingButtons />
    </main>
  );
}
