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
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" aria-label="Bella Skincare home" className="flex items-center flex-shrink-0">
            <img
              src="/logo.png"
              alt="Bella Skincare"
              width={200}
              height={80}
              className="h-20 w-auto object-contain hover:opacity-80 transition-opacity"
            />
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl hidden md:block">
            <div className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 px-4 py-2.5 border border-[#D9C7B8] rounded-lg bg-[#F9F5F0] focus:outline-none focus:ring-2 focus:ring-[#C87137] text-sm"
              />
              <button className="px-6 py-2.5 bg-[#C87137] text-white font-semibold rounded-lg hover:bg-[#B85F2F] transition-colors text-sm">
                Search
              </button>
            </div>
          </div>

          {/* Right Section - Cart & Admin */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <button
              onClick={onCartClick}
              className="flex items-center gap-2 px-3 py-2 text-[#3D3D3D] hover:text-[#C87137] transition-colors rounded-lg hover:bg-[#F9F5F0]"
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="text-xs font-bold bg-[#C87137] text-white rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Admin Button */}
            <button
              onClick={onAdminClick}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#C87137] hover:bg-[#B85F2F] rounded-lg transition-colors"
            >
              Admin
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
