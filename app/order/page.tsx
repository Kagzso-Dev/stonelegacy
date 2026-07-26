'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Upload, CheckCircle2, Send, Info } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingButtons from '@/components/ui/FloatingButtons';

interface OrderForm {
  customerName: string;
  mobile: string;
  email: string;
  address: string;
  productType: string;
  graniteType: string;
  size: string;
  engravingMethod: string;
  message: string;
  quantity: number;
}

const productTypes = [
  'House Name Board', 'Family Sign', 'School Crest Signage',
  'Donor Walkway Stone', 'Memorial Plaque', 'Class Milestone Marker',
  'Campus Memorial', 'Custom Project',
];

const graniteTypes = ['Absolute Black Granite', 'Grey Granite', 'Serpentine Granite', 'Red Granite'];
const sizeOptions = ['12 × 6 inches', '18 × 9 inches', '24 × 12 inches', '36 × 18 inches', 'Custom Size'];
const engravingMethods = ['CNC Engraving', 'Sandblasting', 'Laser Etching', 'Hand Carving'];

export default function OrderPage() {
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState('');
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<OrderForm>();

  const onSubmit = async (data: OrderForm) => {
    await new Promise((r) => setTimeout(r, 1500));
    console.log('Order:', data);
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#F9F9F9]">
      <Navbar />
      <div className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold text-gray-900 font-[var(--font-playfair)] mb-4"
            >
              Order Your <span className="gold-text">Granite Engraving</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 text-lg max-w-lg mx-auto"
            >
              Fill in your requirements and we'll send a personalised quote within 24 hours.
            </motion.p>
          </div>

          {submitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="glass-gold rounded-2xl p-14 border border-[rgba(107,114,128,0.2)] text-center"
            >
              <CheckCircle2 className="w-20 h-20 text-[#6B7280] mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-3 font-[var(--font-playfair)]">Order Received!</h2>
              <p className="text-gray-600 text-lg mb-2">Thank you for choosing StoneLegacy Engravers.</p>
              <p className="text-gray-500 mb-8">Our team will review your order and send a detailed quote within 24 hours.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="gold-gradient text-gray-900 px-8 py-3 rounded-full font-semibold"
              >
                Place Another Order
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-2xl p-8 sm:p-10 border border-gray-200"
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
                {/* Customer Info */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 font-[var(--font-playfair)] flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full gold-gradient flex items-center justify-center text-gray-900 text-sm font-bold">1</span>
                    Customer Information
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-gray-600 text-sm mb-1.5">Full Name *</label>
                      <input
                        {...register('customerName', { required: 'Required' })}
                        placeholder="Your full name"
                        className="input-dark"
                      />
                      {errors.customerName && <p className="text-red-400 text-xs mt-1">{errors.customerName.message}</p>}
                    </div>
                    <div>
                      <label className="block text-gray-600 text-sm mb-1.5">Mobile Number *</label>
                      <input
                        {...register('mobile', { required: 'Required' })}
                        placeholder="+91 98765 43210"
                        className="input-dark"
                      />
                      {errors.mobile && <p className="text-red-400 text-xs mt-1">{errors.mobile.message}</p>}
                    </div>
                    <div>
                      <label className="block text-gray-600 text-sm mb-1.5">Email Address *</label>
                      <input
                        {...register('email', { required: 'Required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
                        placeholder="you@example.com"
                        type="email"
                        className="input-dark"
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                      <label className="block text-gray-600 text-sm mb-1.5">Delivery Address *</label>
                      <input
                        {...register('address', { required: 'Required' })}
                        placeholder="Full delivery address"
                        className="input-dark"
                      />
                      {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address.message}</p>}
                    </div>
                  </div>
                </div>

                <div className="border-t border-black/[0.07]" />

                {/* Product Details */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 font-[var(--font-playfair)] flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full gold-gradient flex items-center justify-center text-gray-900 text-sm font-bold">2</span>
                    Product Details
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-gray-600 text-sm mb-1.5">Product Type *</label>
                      <select {...register('productType', { required: 'Required' })} className="input-dark">
                        <option value="">Select product type</option>
                        {productTypes.map((p) => <option key={p}>{p}</option>)}
                      </select>
                      {errors.productType && <p className="text-red-400 text-xs mt-1">{errors.productType.message}</p>}
                    </div>
                    <div>
                      <label className="block text-gray-600 text-sm mb-1.5">Granite Type *</label>
                      <select {...register('graniteType', { required: 'Required' })} className="input-dark">
                        <option value="">Select granite type</option>
                        {graniteTypes.map((g) => <option key={g}>{g}</option>)}
                      </select>
                      {errors.graniteType && <p className="text-red-400 text-xs mt-1">{errors.graniteType.message}</p>}
                    </div>
                    <div>
                      <label className="block text-gray-600 text-sm mb-1.5">Size *</label>
                      <select {...register('size', { required: 'Required' })} className="input-dark">
                        <option value="">Select size</option>
                        {sizeOptions.map((s) => <option key={s}>{s}</option>)}
                      </select>
                      {errors.size && <p className="text-red-400 text-xs mt-1">{errors.size.message}</p>}
                    </div>
                    <div>
                      <label className="block text-gray-600 text-sm mb-1.5">Quantity *</label>
                      <input
                        {...register('quantity', { required: 'Required', min: { value: 1, message: 'Min 1' } })}
                        type="number"
                        min="1"
                        defaultValue="1"
                        className="input-dark"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-black/[0.07]" />

                {/* Engraving Method */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 font-[var(--font-playfair)] flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full gold-gradient flex items-center justify-center text-gray-900 text-sm font-bold">3</span>
                    Engraving Method
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {engravingMethods.map((method) => (
                      <label
                        key={method}
                        className="relative cursor-pointer"
                      >
                        <input
                          type="radio"
                          value={method}
                          {...register('engravingMethod', { required: 'Select a method' })}
                          className="sr-only peer"
                        />
                        <div className="glass rounded-xl p-4 border border-black/[0.08] text-center text-sm text-gray-600 peer-checked:border-[rgba(107,114,128,0.5)] peer-checked:bg-[rgba(107,114,128,0.08)] peer-checked:text-[#6B7280] transition-all">
                          {method}
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.engravingMethod && (
                    <p className="text-red-400 text-xs mt-2">{errors.engravingMethod.message}</p>
                  )}
                </div>

                <div className="border-t border-black/[0.07]" />

                {/* Design Upload & Notes */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 font-[var(--font-playfair)] flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full gold-gradient flex items-center justify-center text-gray-900 text-sm font-bold">4</span>
                    Design & Notes
                  </h3>

                  {/* File upload */}
                  <div className="mb-5">
                    <label className="block text-gray-600 text-sm mb-1.5">Upload Logo / Design (optional)</label>
                    <label className="flex items-center gap-3 glass rounded-xl p-4 border border-black/[0.08] cursor-pointer hover:border-[rgba(107,114,128,0.3)] transition-all">
                      <Upload className="w-5 h-5 text-[#6B7280] shrink-0" />
                      <span className="text-gray-600 text-sm">
                        {fileName || 'Click to upload PNG, JPG, SVG, or PDF'}
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        accept=".png,.jpg,.jpeg,.svg,.pdf"
                        onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
                      />
                    </label>
                  </div>

                  <div>
                    <label className="block text-gray-600 text-sm mb-1.5">Special Instructions / Message</label>
                    <textarea
                      {...register('message')}
                      placeholder="Text to be engraved, special design notes, preferred font style, or any other details..."
                      rows={4}
                      className="input-dark resize-none"
                    />
                  </div>
                </div>

                {/* Notice */}
                <div className="flex items-start gap-3 glass-gold rounded-xl p-4 border border-[rgba(107,114,128,0.15)]">
                  <Info className="w-5 h-5 text-[#6B7280] mt-0.5 shrink-0" />
                  <p className="text-gray-600 text-sm">
                    After submitting, our team will review your order and send a detailed quote to your email within 24 hours. No payment is required at this stage.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full gold-gradient text-gray-900 py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2.5 disabled:opacity-60 gold-glow transition-opacity"
                >
                  {isSubmitting ? 'Submitting...' : (
                    <><Send className="w-5 h-5" /> Submit Order Request</>
                  )}
                </button>
              </form>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
      <FloatingButtons />
    </main>
  );
}
