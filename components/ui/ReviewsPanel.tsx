'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ThumbsUp, MapPin } from 'lucide-react';

const overallRating = 4.8;
const totalReviews = 124;

const ratingBreakdown = [
  { stars: 5, count: 98 },
  { stars: 4, count: 17 },
  { stars: 3, count: 6 },
  { stars: 2, count: 2 },
  { stars: 1, count: 1 },
];

const reviews = [
  {
    id: 1,
    name: 'Ramesh Kumar',
    initials: 'RK',
    location: 'Pammal, Chennai',
    rating: 5,
    date: '12 Jun 2025',
    service: 'School Memorial Stone',
    text: 'Excellent work! The memorial stone for our school was engraved perfectly. The CNC detailing was precise and the granite quality was outstanding. Delivery was on time. Highly recommended!',
    helpful: 14,
    color: 'bg-blue-500',
  },
  {
    id: 2,
    name: 'Priya Suresh',
    initials: 'PS',
    location: 'Tambaram, Chennai',
    rating: 5,
    date: '3 May 2025',
    service: 'House Name Board',
    text: 'Got our house name board done. The laser engraving is very sharp and clean. The black granite with white lettering looks premium. Staff was helpful in choosing the right design.',
    helpful: 9,
    color: 'bg-green-500',
  },
  {
    id: 3,
    name: 'Anand Raj',
    initials: 'AR',
    location: 'Chrompet, Chennai',
    rating: 5,
    date: '18 Apr 2025',
    service: 'Donor Walkway Plaques',
    text: 'We ordered 50+ donor plaques for our institution walkway. Each one was done with great consistency and quality. The sandblasting finish looks very elegant. Price was also very reasonable.',
    helpful: 21,
    color: 'bg-purple-500',
  },
  {
    id: 4,
    name: 'Meena Krishnan',
    initials: 'MK',
    location: 'Pallavaram, Chennai',
    rating: 4,
    date: '2 Apr 2025',
    service: 'Memorial Stone',
    text: 'Good quality engraving work for a memorial stone. Slight delay in delivery but the final product was worth it. The photo etching came out very clear and detailed.',
    helpful: 6,
    color: 'bg-orange-500',
  },
  {
    id: 5,
    name: 'Sundar Vel',
    initials: 'SV',
    location: 'Guduvanchery, Chennai',
    rating: 5,
    date: '15 Mar 2025',
    service: 'Custom Granite Sign',
    text: 'Very professional team. They understood our requirement perfectly and delivered a beautiful granite sign for our office entrance. The quality of granite and engraving is top class.',
    helpful: 11,
    color: 'bg-red-500',
  },
  {
    id: 6,
    name: 'Lakshmi Devi',
    initials: 'LD',
    location: 'Vandalur, Chennai',
    rating: 5,
    date: '28 Feb 2025',
    service: 'House Name Board',
    text: 'Amazing work! The name board is exactly as we wanted. Clean engraving, good granite, and great finishing. Many neighbours have asked about it. Will definitely order again.',
    helpful: 8,
    color: 'bg-teal-500',
  },
];

function StarRow({ rating, filled = false }: { rating: number; filled?: boolean }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i <= rating ? 'text-amber-400' : 'text-gray-300'}`}
          fill={i <= rating ? 'currentColor' : 'none'}
        />
      ))}
    </div>
  );
}

interface ReviewsPanelProps {
  open: boolean;
  onClose: () => void;
}

export default function ReviewsPanel({ open, onClose }: ReviewsPanelProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 h-full z-[70] w-full max-w-lg bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white sticky top-0 z-10">
              <div>
                <h2 className="text-lg font-bold text-gray-900 font-[var(--font-playfair)]">
                  Customer Reviews
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">Stone Legacy Engravers · Chennai</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto">
              {/* Overall rating card */}
              <div className="mx-4 mt-4 rounded-2xl border border-gray-100 bg-gray-50 p-5">
                <div className="flex items-center gap-6">
                  {/* Big rating number */}
                  <div className="text-center shrink-0">
                    <div className="text-5xl font-bold text-gray-900 leading-none">
                      {overallRating}
                    </div>
                    <div className="flex items-center justify-center gap-0.5 mt-1.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-amber-400"
                          fill="currentColor"
                        />
                      ))}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{totalReviews} Reviews</div>
                  </div>

                  {/* Breakdown bars */}
                  <div className="flex-1 flex flex-col gap-1.5">
                    {ratingBreakdown.map(({ stars, count }) => {
                      const pct = Math.round((count / totalReviews) * 100);
                      return (
                        <div key={stars} className="flex items-center gap-2">
                          <span className="text-xs text-gray-500 w-4 text-right">{stars}</span>
                          <Star className="w-3 h-3 text-amber-400 shrink-0" fill="currentColor" />
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-amber-400 rounded-full"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-400 w-6">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200">
                  <span className="inline-flex items-center gap-1.5 text-xs bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full font-medium">
                    ✓ Trusted Seller
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full font-medium">
                    ✓ Verified Business
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-full font-medium">
                    ⭐ Top Rated 2025
                  </span>
                </div>
              </div>

              {/* Review count label */}
              <div className="px-5 mt-5 mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-700">
                  All Reviews <span className="text-gray-400 font-normal">({totalReviews})</span>
                </h3>
                <span className="text-xs text-gray-400">Most Recent</span>
              </div>

              {/* Review cards */}
              <div className="px-4 pb-8 flex flex-col gap-3">
                {reviews.map((review, i) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm"
                  >
                    {/* Top row */}
                    <div className="flex items-start gap-3">
                      {/* Avatar */}
                      <div
                        className={`w-10 h-10 rounded-full ${review.color} flex items-center justify-center text-white text-sm font-bold shrink-0`}
                      >
                        {review.initials}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-semibold text-gray-900 text-sm truncate">
                            {review.name}
                          </span>
                          <span className="text-xs text-gray-400 shrink-0">{review.date}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <StarRow rating={review.rating} />
                          <span className="text-xs text-gray-400 flex items-center gap-0.5">
                            <MapPin className="w-3 h-3" />
                            {review.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Service tag */}
                    <div className="mt-2.5">
                      <span className="inline-block text-xs bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full">
                        {review.service}
                      </span>
                    </div>

                    {/* Review text */}
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">{review.text}</p>

                    {/* Helpful */}
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-400">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{review.helpful} found this helpful</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer CTA */}
            <div className="px-4 py-4 border-t border-gray-100 bg-white">
              <a
                href="/order"
                className="block w-full text-center gold-gradient py-3 rounded-full text-sm font-semibold text-gray-900 gold-glow"
              >
                Get a Free Quote
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
