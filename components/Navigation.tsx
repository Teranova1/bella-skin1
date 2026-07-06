'use client';

import { useState, useRef } from 'react';
import { ChevronDown, Menu, X, Search } from 'lucide-react';

interface NavItem {
  name: string;
  subcategories?: string[];
}

const navItems: NavItem[] = [
  {
    name: 'Women',
    subcategories: ['Face Care', 'Body Care', 'Hair Care', 'Makeup'],
  },
  {
    name: 'Men',
    subcategories: ['Face Care', 'Body Care', 'Grooming'],
  },
  { name: 'K-Beauty' },
  {
    name: 'Makeup',
    subcategories: ['Foundation', 'Lipstick', 'Eye Makeup', 'Blush'],
  },
  { name: 'Sun Protection' },
  {
    name: 'Mother & Baby',
    subcategories: ['Mother Care', 'Baby Care'],
  },
  {
    name: 'Brands',
    subcategories: ['Brand A', 'Brand B', 'Brand C'],
  },
  {
    name: 'Deals & Gifts',
    subcategories: ['New Arrivals', 'Sale', 'Gift Sets'],
  },
  { name: 'Blogs' },
  { name: 'Outlets' },
];

export default function Navigation() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
  const [mobileSearch, setMobileSearch] = useState('');
  const hoverTimeoutRef = useRef<NodeJS.Timeout>();

  const handleMouseEnter = (name: string) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setHoveredItem(name);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredItem(null);
    }, 100);
  };

  const toggleMobileItem = (name: string) => {
    setExpandedMobileItem((prev) => (prev === name ? null : name));
  };

  return (
    <nav className="w-full bg-white border-b border-[#E8D4C4]">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
        {/* Mobile toggle bar */}
        <div className="flex items-center justify-between py-3 lg:hidden">
          <button
            type="button"
            onClick={() => setIsMobileOpen((prev) => !prev)}
            className="flex items-center gap-2 text-[#3D3D3D] font-medium text-sm"
            aria-expanded={isMobileOpen}
            aria-controls="mobile-menu"
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            <span>Menu</span>
          </button>
        </div>

        {/* Desktop menu */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8 overflow-x-auto">
          {navItems.map((item) => (
            <div
              key={item.name}
              className="relative group"
              onMouseEnter={() => handleMouseEnter(item.name)}
              onMouseLeave={() => handleMouseLeave()}
            >
              <button
                className="py-4 flex items-center gap-1.5 text-[#3D3D3D] hover:text-[#C87137] font-medium text-sm transition-colors whitespace-nowrap"
              >
                {item.name}
                {item.subcategories && (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              {/* Dropdown Menu */}
              {item.subcategories && hoveredItem === item.name && (
                <div className="absolute left-0 top-full pt-2 bg-white border border-[#E8D4C4] rounded-lg shadow-lg z-20 min-w-48">
                  {item.subcategories.map((sub) => (
                    <a
                      key={sub}
                      href="#"
                      className="block px-4 py-3 text-[#3D3D3D] hover:bg-[#F9F5F0] hover:text-[#C87137] first:rounded-t-lg last:rounded-b-lg transition-colors"
                    >
                      {sub}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile menu panel */}
        {isMobileOpen && (
          <div id="mobile-menu" className="lg:hidden pb-4">
            {/* Mobile search */}
            <div className="flex gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#A0826D]" />
                <input
                  type="text"
                  value={mobileSearch}
                  onChange={(e) => setMobileSearch(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-9 pr-4 py-2.5 border border-[#D9C7B8] rounded-lg bg-[#F9F5F0] focus:outline-none focus:ring-2 focus:ring-[#C87137] text-sm"
                />
              </div>
              <button className="px-4 py-2.5 bg-[#C87137] text-white font-semibold rounded-lg hover:bg-[#B85F2F] transition-colors text-sm">
                Search
              </button>
            </div>

            {/* Mobile nav list */}
            <ul className="divide-y divide-[#E8D4C4] border-t border-[#E8D4C4]">
              {navItems.map((item) => (
                <li key={item.name}>
                  {item.subcategories ? (
                    <>
                      <button
                        type="button"
                        onClick={() => toggleMobileItem(item.name)}
                        className="w-full flex items-center justify-between py-3 text-[#3D3D3D] font-medium text-sm"
                        aria-expanded={expandedMobileItem === item.name}
                      >
                        {item.name}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            expandedMobileItem === item.name ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {expandedMobileItem === item.name && (
                        <ul className="pb-2 pl-4">
                          {item.subcategories.map((sub) => (
                            <li key={sub}>
                              <a
                                href="#"
                                className="block py-2 text-sm text-[#7A6B5D] hover:text-[#C87137] transition-colors"
                              >
                                {sub}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <a
                      href="#"
                      className="block py-3 text-[#3D3D3D] font-medium text-sm hover:text-[#C87137] transition-colors"
                    >
                      {item.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
