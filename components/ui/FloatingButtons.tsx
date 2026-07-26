'use client';

import { motion } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';
import { useSettings } from '@/lib/settings-context';

export default function FloatingButtons() {
  const { settings } = useSettings();
  const phone    = settings?.phone    || '+91 98400 00000';
  const whatsapp = settings?.whatsapp || phone;
  const whatsappDigits = whatsapp.replace(/\D/g, '');

  if (settings && !settings.floatingButtonsEnabled) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      {/* WhatsApp */}
      <motion.a
        href={`https://wa.me/${whatsappDigits}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-13 h-13 rounded-full flex items-center justify-center shadow-lg shadow-black/40"
        style={{ background: '#25D366', width: 52, height: 52 }}
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </motion.a>

      {/* Call */}
      <motion.a
        href={`tel:${phone}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.4, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="rounded-full flex items-center justify-center shadow-lg shadow-black/40"
        style={{ background: '#2563EB', width: 52, height: 52 }}
        title="Call Us"
      >
        <Phone className="w-5 h-5 text-white" />
      </motion.a>
    </div>
  );
}
