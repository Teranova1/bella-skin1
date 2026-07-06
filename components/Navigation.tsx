'use client';

import { useState, useRef } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';

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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const handleMouseEnter = (name: string) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setHoveredItem(name);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredItem(null);
    }, 100);
  };

  const toggleExpanded = (name: string) => {
    setExpandedItem((current) => (current === name ? null : name));
  };

  return (
    <nav className="w-full bg-white border-b border-[#E8D4C4]">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
        {/* Mobile toggle */}
        <div className="flex items-center justify-between py-3 lg:hidden">
          <span className="text-sm font-semibold uppercase tracking-widest text-[#3D3D3D]">
            Categories
          </span>
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="inline-flex items-center gap-2 rounded-lg border border-[#E8D4C4] px-3 py-2 text-sm font-medium text-[#3D3D3D] hover:text-[#C87137] transition-colors"
            aria-expanded={mobileOpen}
            aria-label="Toggle categories menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            Menu
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <div
              key={item.name}
              className="relative group"
              onMouseEnter={() => handleMouseEnter(item.name)}
              onMouseLeave={() => handleMouseLeave()}
            >
              <button
                className="py-4 flex items-center gap-2 text-[#3D3D3D] hover:text-[#C87137] font-medium text-sm transition-colors whitespace-nowrap"
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

        {/* Mobile navigation (accordion) */}
        {mobileOpen && (
          <div className="lg:hidden pb-4 flex flex-col divide-y divide-[#E8D4C4] border-t border-[#E8D4C4]">
            {navItems.map((item) => (
              <div key={item.name}>
                {item.subcategories ? (
                  <>
                    <button
                      type="button"
                      onClick={() => toggleExpanded(item.name)}
                      className="w-full flex items-center justify-between py-3 text-[#3D3D3D] hover:text-[#C87137] font-medium text-sm transition-colors"
                      aria-expanded={expandedItem === item.name}
                    >
                      {item.name}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          expandedItem === item.name ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {expandedItem === item.name && (
                      <div className="flex flex-col pb-2">
                        {item.subcategories.map((sub) => (
                          <a
                            key={sub}
                            href="#"
                            className="block py-2 pl-4 text-sm text-[#7A6B5D] hover:text-[#C87137] transition-colors"
                          >
                            {sub}
                          </a>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <a
                    href="#"
                    className="block py-3 text-[#3D3D3D] hover:text-[#C87137] font-medium text-sm transition-colors"
                  >
                    {item.name}
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
