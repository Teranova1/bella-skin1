'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart } from 'lucide-react';
import { CART_EVENT, getCartCount } from '@/lib/cart-storage';

interface HeaderProps {
  onAdminClick: () => void;
  onCartClick: () => void;
  cartCount?: number;
}

export default function Header({ onAdminClick, onCartClick, cartCount = 0 }: HeaderProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const isMountedRef = useRef(true);
  // Self-managed badge — reads from localStorage, reacts to custom event
  const [localCartCount, setLocalCartCount] = useState(0);

  useEffect(() => {
    const sync = () => setLocalCartCount(getCartCount());
    sync(); // initialise
    window.addEventListener(CART_EVENT, sync);
    window.addEventListener('storage', sync); // cross-tab
    return () => {
      window.removeEventListener(CART_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  // Prefer the locally-tracked localStorage count; fall back to prop for SSR
  const displayCount = localCartCount > 0 ? localCartCount : cartCount;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-3 md:py-4">
        <div className="flex items-center justify-between gap-3 md:gap-6">
          {/* Logo */}
          <Link href="/" aria-label="Bella Skincare home" className="flex items-center flex-shrink-0">
            <img
              src="/logo.png"
              alt="Bella Skincare"
              width={200}
              height={80}
              className="h-12 sm:h-16 md:h-20 w-auto object-contain hover:opacity-80 transition-opacity"
            />
          </Link>

          {/* Search Bar — desktop */}
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

          {/* Right Section */}
          <div className="flex items-center gap-1 sm:gap-3 flex-shrink-0">

            {/* My Account */}
            <button
              onClick={() => router.push('/login')}
              className="flex items-center gap-2 px-2 sm:px-3 py-2 text-[#3D3D3D] hover:text-[#C87137] transition-colors rounded-lg hover:bg-[#F9F5F0] group"
              aria-label="My Account"
            >
              {/* Outline user icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7 flex-shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              <div className="hidden sm:flex flex-col items-start leading-tight">
                <span className="text-xs font-semibold text-[#3D3D3D] group-hover:text-[#C87137] transition-colors">My Account</span>
                <span className="text-[11px] text-[#7A6B5D] group-hover:text-[#C87137] transition-colors">Log In</span>
              </div>
            </button>

            {/* Divider */}
            <div className="hidden sm:block h-8 w-px bg-[#E8D4C4]" />

            {/* Cart */}
            <button
              onClick={onCartClick}
              className="relative flex items-center gap-2 px-2 sm:px-3 py-2 text-[#3D3D3D] hover:text-[#C87137] transition-colors rounded-lg hover:bg-[#F9F5F0] group"
              aria-label={`Shopping cart with ${displayCount} items`}
            >
              <span className="relative">
                <ShoppingCart className="w-7 h-7 flex-shrink-0" strokeWidth={1.5} />
                {/* Badge – visible on all breakpoints */}
                {displayCount > 0 && (
                  <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 text-[10px] font-bold bg-[#C87137] text-white rounded-full flex items-center justify-center leading-none animate-bounce-once">
                    {displayCount > 99 ? '99+' : displayCount}
                  </span>
                )}
              </span>
              <span className="hidden sm:block text-sm font-medium text-[#3D3D3D] group-hover:text-[#C87137] transition-colors whitespace-nowrap">
                Cart ({displayCount})
              </span>
            </button>

          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-3 md:hidden">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 min-w-0 px-4 py-2.5 border border-[#D9C7B8] rounded-lg bg-[#F9F5F0] focus:outline-none focus:ring-2 focus:ring-[#C87137] text-sm"
            />
            <button className="px-4 py-2.5 bg-[#C87137] text-white font-semibold rounded-lg hover:bg-[#B85F2F] transition-colors text-sm flex-shrink-0">
              Search
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
