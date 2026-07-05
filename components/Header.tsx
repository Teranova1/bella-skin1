'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart } from 'lucide-react';

interface HeaderProps {
  onAdminClick: () => void;
  onCartClick: () => void;
  cartCount?: number;
}

export default function Header({ onAdminClick, onCartClick, cartCount = 0 }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const isMountedRef = useRef(true);

  return (
    <header className="bg-white border-b border-[#E8D4C4]">
      {/* Top Header */}
      <div className="sticky top-0 z-50 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" aria-label="Bella Skincare home" className="flex items-center gap-4 group">
                <img
                  src="/bella-logo.png"
                  alt="Bella Skincare"
                  width={220}
                  height={220}
                  className="block h-36 w-36 object-contain transition-transform group-hover:scale-105"
                />
              </Link>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search"
                  className="flex-1 px-4 py-2 border border-[#E8D4C4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0826D]"
                />
                <button className="px-6 py-2 bg-[#C87137] text-white font-medium rounded-lg hover:bg-[#B85F2F] transition-colors">
                  Search
                </button>
              </div>
            </div>

            {/* Right Section - Cart & Admin */}
            <div className="flex items-center gap-6">
              {/* Cart */}
              <button
                onClick={onCartClick}
                className="flex items-center gap-2 text-[#3D3D3D] hover:text-[#A0826D] transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                <div className="text-left text-sm">
                  <p className="font-medium">Cart</p>
                  <p className="text-xs text-[#7A6B5D]">({cartCount})</p>
                </div>
              </button>

              {/* Admin Button */}
              <button
                onClick={onAdminClick}
                className="px-3 py-1 text-xs text-white bg-[#C87137] hover:bg-[#B85F2F] rounded transition-colors"
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
