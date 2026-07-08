'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, MapPin, Phone, Mail } from 'lucide-react';

const quickLinks = [
  { label: 'Deliveries', href: '#' },
  { label: 'Return Policy', href: '#' },
  { label: 'Store Locator', href: '#' },
  { label: 'Loyalty Program', href: '#' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Contact Us', href: '#' },
];

const companyLinks = [
  { label: 'About Us', href: '#' },
  { label: 'Careers', href: '#' },
  { label: 'Press', href: '#' },
  { label: 'Blog', href: '#' },
];

function AccordionSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10 md:border-none">
      {/* Mobile: clickable header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 md:hidden"
        aria-expanded={open}
      >
        <span className="text-xs font-bold uppercase tracking-widest text-[#C87137]">{title}</span>
        {open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>

      {/* Desktop: always visible heading */}
      <h4 className="hidden md:block text-xs font-bold uppercase tracking-widest text-[#C87137] mb-4">{title}</h4>

      {/* Content: collapsible on mobile, always shown on desktop */}
      <div className={`overflow-hidden transition-all duration-300 md:overflow-visible md:max-h-none ${open ? 'max-h-96 pb-4' : 'max-h-0'}`}>
        {children}
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-14">

        {/* ── Top grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 md:gap-8">

          {/* Brand */}
          <div className="mb-6 md:mb-0 lg:col-span-1">
            <div className="flex items-center mb-4">
              <img
                src="/footer-logo.png"
                alt="Bella Skincare"
                className="h-16 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Buy Original &amp; Premium Beauty Products from Bella. Trusted quality and authentic skincare solutions.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 mt-5">
              {/* Instagram */}
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-gray-400 hover:border-[#C87137] hover:text-[#C87137] transition-all duration-200">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>
              </a>
              {/* Facebook */}
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-gray-400 hover:border-[#C87137] hover:text-[#C87137] transition-all duration-200">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              {/* X / Twitter */}
              <a href="#" aria-label="X" className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-gray-400 hover:border-[#C87137] hover:text-[#C87137] transition-all duration-200">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <AccordionSection title="Quick Links">
              <ul className="space-y-2.5 text-sm">
                {quickLinks.map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} className="text-gray-400 hover:text-[#C87137] transition-colors">{label}</a>
                  </li>
                ))}
              </ul>
            </AccordionSection>
          </div>

          {/* Company */}
          <div className="lg:col-span-1">
            <AccordionSection title="Company">
              <ul className="space-y-2.5 text-sm">
                {companyLinks.map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} className="text-gray-400 hover:text-[#C87137] transition-colors">{label}</a>
                  </li>
                ))}
              </ul>
            </AccordionSection>
          </div>

          {/* Contact */}
          <div className="lg:col-span-1">
            <AccordionSection title="Contact Us">
              <div className="space-y-3 text-sm">
                <div className="flex gap-3">
                  <MapPin className="w-4 h-4 text-[#C87137] flex-shrink-0 mt-0.5" />
                  <p className="text-gray-400 leading-snug">No: 77/1A Pepiliyana Mawatha,<br />Nugegoda 10250</p>
                </div>
                <div className="flex gap-3">
                  <Phone className="w-4 h-4 text-[#C87137] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-400">0112 81 81 91</p>
                    <p className="text-gray-400">076 626 8658</p>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <Mail className="w-4 h-4 text-[#C87137] flex-shrink-0" />
                  <a href="mailto:sales@bella.lk" className="text-[#C87137] hover:underline">sales@bella.lk</a>
                </div>
              </div>
            </AccordionSection>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© 2025 Bella Skincare. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#C87137] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#C87137] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#C87137] transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
