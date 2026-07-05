'use client';

import { useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

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

  return (
    <nav className="w-full bg-white border-b border-[#E8D4C4]">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center gap-8">
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
      </div>
    </nav>
  );
}
