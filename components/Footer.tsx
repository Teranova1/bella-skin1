'use client';

import { Heart, Music, Share2, PlayCircle, Users } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#2C3E50] text-white">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-[#C87137] mb-4">Bella</h3>
            <p className="text-sm text-gray-300 mb-6">
              Buy Original & Premium Beauty Products from Bella
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-[#C87137] transition-colors">
                <Heart className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-[#C87137] transition-colors">
                <Music className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-[#C87137] transition-colors">
                <Share2 className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-[#C87137] transition-colors">
                <PlayCircle className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-[#C87137] transition-colors">
                <Users className="w-5 h-5" />
              </a>
            </div>
          </div>



          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-bold mb-4">QUICK LINKS</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-[#C87137] transition-colors">
                  Deliveries
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#C87137] transition-colors">
                  Return Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#C87137] transition-colors">
                  Store Locator
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#C87137] transition-colors">
                  Loyalty Customer
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#C87137] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#C87137] transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#C87137] transition-colors">
                  About us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-bold mb-4">CONTACT US</h4>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-400 mb-1">Address</p>
                <p>No: 77/1A Pepiliyana Mawatha, Nugegoda 10250</p>
              </div>
              <div>
                <p className="text-gray-400 mb-1">Phone</p>
                <p>0112 81 81 91 / 076 626 8658</p>
              </div>
              <div>
                <p className="text-gray-400 mb-1">Email</p>
                <p className="text-[#C87137]">sales@bella.lk</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-gray-700 mt-10 pt-6">
          <p className="text-center text-sm text-gray-400">
            Copyright © 2025 Bella. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
