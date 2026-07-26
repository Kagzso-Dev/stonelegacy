'use client';

import type { SVGProps } from 'react';
import { Diamond, Phone, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useSettings } from '@/lib/settings-context';

const FacebookIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const YoutubeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2.5 7.1c.3-1.5 1.5-2.6 3-2.9C8.9 3.8 12 3.8 12 3.8s3.1 0 6.5.4c1.5.3 2.7 1.4 3 2.9.4 1.4.4 4.9.4 4.9s0 3.5-.4 4.9c-.3 1.5-1.5 2.6-3 2.9-3.4.4-6.5.4-6.5.4s-3.1 0-6.5-.4c-1.5-.3-2.7-1.4-3-2.9-.4-1.4-.4-4.9-.4-4.9s0-3.5.4-4.9z"/>
    <path d="m10 15 5-3-5-3v6z"/>
  </svg>
);

const footerLinks = {
  services: [
    { label: 'House Name Boards', href: '/#services' },
    { label: 'School Crest Signage', href: '/#services' },
    { label: 'Donor Walkways', href: '/#services' },
    { label: 'Memorial Plaques', href: '/#services' },
    { label: 'Campus Memorial Gardens', href: '/#services' },
  ],
  quick: [
    { label: 'Home', href: '/' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Get a Quote', href: '/order' },
  ],
};

export default function Footer() {
  const { settings } = useSettings();
  const logoUrl     = settings?.logoUrl   || '';
  const phone       = settings?.phone     || '+91 98400 00000';
  const whatsapp    = settings?.whatsapp  || '';
  const email       = settings?.email     || 'info@stonelegacy.in';
  const city        = settings?.city      || 'Chennai';
  const state       = settings?.state     || 'Tamil Nadu';
  const address     = settings?.address   || '';
  const tagline     = settings?.tagline   || 'Preserving Memories in Stone for Generations';
  const companyName = settings?.companyName || 'StoneLegacy Engravers';
  const facebook    = settings?.facebook  || '';
  const instagram   = settings?.instagram || '';
  const youtube     = settings?.youtube   || '';

  const locationLine = [address, city, state].filter(Boolean).join(', ');

  const socialLinks = [
    { href: facebook,  Icon: FacebookIcon  },
    { href: instagram, Icon: InstagramIcon },
    { href: youtube,   Icon: YoutubeIcon   },
  ].filter((s) => s.href);

  return (
    <footer className="bg-[#F5F5F5] border-t border-black/[0.07]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl gold-gradient flex items-center justify-center overflow-hidden">
                {logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={logoUrl} alt="logo" className="w-full h-full object-contain" />
                ) : (
                  <Diamond className="w-5 h-5 text-gray-900" fill="currentColor" />
                )}
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-bold text-lg text-gray-900 font-[var(--font-playfair)]">
                  Stone<span className="gold-text">Legacy</span>
                </span>
                <span className="text-[9px] text-gray-500 tracking-widest uppercase">Engravers</span>
              </div>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {tagline}
            </p>
            {socialLinks.length > 0 && (
              <div className="flex gap-3">
                {socialLinks.map(({ href, Icon }, i) => (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 glass rounded-lg flex items-center justify-center text-gray-600 hover:text-gray-900 hover:border-[rgba(107,114,128,0.3)] transition-all border border-black/[0.08]"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Services */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-5 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-5 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.quick.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-5 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#6B7280] mt-0.5 shrink-0" />
                <div>
                  <a href={`tel:${phone}`} className="text-gray-700 text-sm hover:text-orange-600 transition-colors">
                    {phone}
                  </a>
                  {whatsapp && (
                    <p className="text-gray-500 text-xs">WhatsApp Available</p>
                  )}
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#6B7280] mt-0.5 shrink-0" />
                <a href={`mailto:${email}`} className="text-gray-700 text-sm hover:text-orange-600 transition-colors">
                  {email}
                </a>
              </li>
              {locationLine && (
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#6B7280] mt-0.5 shrink-0" />
                  <p className="text-gray-700 text-sm">{locationLine}</p>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-black/[0.07] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} {companyName}. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs">{tagline}</p>
        </div>
      </div>
    </footer>
  );
}
