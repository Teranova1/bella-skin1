'use client';

import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section with Logo */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo.png"
                alt="Bella Skincare"
                width={60}
                height={40}
                className="h-14 w-auto object-contain"
              />
              <div>
                <h3 className="text-xl font-bold text-[#C87137]">Bella</h3>
                <p className="text-xs text-[#A0826D]">Premium Skincare</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Buy Original & Premium Beauty Products from Bella. Trusted quality and authentic skincare solutions.
            </p>
          </div>



          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#C87137] mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-[#C87137] transition-colors">
                  Deliveries
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#C87137] transition-colors">
                  Return Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#C87137] transition-colors">
                  Store Locator
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#C87137] transition-colors">
                  Loyalty Program
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#C87137] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#C87137] transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-1">
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#C87137] mb-4">Company</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-[#C87137] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#C87137] transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#C87137] transition-colors">
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#C87137] transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="lg:col-span-1">
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#C87137] mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-500 mb-1 text-xs">Address</p>
                <p className="text-gray-400">No: 77/1A Pepiliyana Mawatha, Nugegoda 10250</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1 text-xs">Phone</p>
                <p className="text-gray-400">0112 81 81 91 / 076 626 8658</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1 text-xs">Email</p>
                <p className="text-[#C87137] hover:underline cursor-pointer">sales@bella.lk</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-gray-800 mt-10 pt-6">
          <p className="text-center text-sm text-gray-500">
            Copyright © 2025 Bella Skincare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
