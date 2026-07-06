'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { defaultProducts, loadProducts } from '@/lib/catalog';
import { Product } from '@/lib/types';
import { ChevronDown, Grid3x3, List, SlidersHorizontal } from 'lucide-react';

type ViewMode = 'grid' | 'list';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(defaultProducts);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState('date-new');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Filters
  const [priceRange, setPriceRange] = useState({ min: 0, max: 13950 });
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<'all' | 'inStock' | 'outOfStock'>('all');

  // Get unique brands from products
  const brands = Array.from(new Set(products.map(p => p.category))).sort();

  useEffect(() => {
    setProducts(loadProducts());
  }, []);

  useEffect(() => {
    let filtered = [...products];

    // Filter by price
    filtered = filtered.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);

    // Filter by brand (category)
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(p => selectedBrands.includes(p.category));
    }

    // Filter by availability
    if (selectedAvailability === 'inStock') {
      filtered = filtered.filter(p => p.inStock);
    } else if (selectedAvailability === 'outOfStock') {
      filtered = filtered.filter(p => !p.inStock);
    }

    // Sort
    if (sortBy === 'date-new') {
      filtered.sort((a, b) => (b.id?.localeCompare(a.id || '') || 0));
    } else if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }, [products, priceRange, selectedBrands, selectedAvailability, sortBy]);

  const handleViewProduct = (product: Product) => {
    window.location.href = `/`;
  };

  const handleAddToCart = (product: Product) => {
    // This will be handled by parent component
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  return (
    <main className="min-h-screen bg-[#F9F5F0] flex flex-col">
      <div className="flex-grow">
        <Header onAdminClick={() => {}} onCartClick={() => {}} cartCount={0} />
        <Navigation />

        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#3D3D3D] mb-4 md:mb-8">All Products</h1>

          {/* Mobile Filter Toggle */}
          <button
            type="button"
            onClick={() => setShowMobileFilters((prev) => !prev)}
            className="lg:hidden flex items-center gap-2 mb-4 px-4 py-2.5 bg-white border border-[#E8D4C4] rounded-lg text-sm font-semibold text-[#3D3D3D]"
            aria-expanded={showMobileFilters}
          >
            <SlidersHorizontal className="w-4 h-4" />
            {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8">
            {/* Sidebar Filters */}
            <aside className={`${showMobileFilters ? 'block' : 'hidden'} lg:block bg-white rounded-2xl p-6 h-fit lg:sticky lg:top-24 border border-[#E8D4C4]`}>
              <h2 className="text-lg font-bold text-[#3D3D3D] mb-6">Filter:</h2>

              {/* Availability */}
              <div className="mb-6 pb-6 border-b border-[#E8D4C4]">
                <h3 className="text-sm font-bold text-[#3D3D3D] mb-4 uppercase tracking-wider">Availability</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedAvailability === 'inStock'}
                      onChange={() => setSelectedAvailability(selectedAvailability === 'inStock' ? 'all' : 'inStock')}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm text-[#7A6B5D]">In Stock (120)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedAvailability === 'outOfStock'}
                      onChange={() => setSelectedAvailability(selectedAvailability === 'outOfStock' ? 'all' : 'outOfStock')}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm text-[#7A6B5D]">Out of Stock (22)</span>
                  </label>
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6 pb-6 border-b border-[#E8D4C4]">
                <h3 className="text-sm font-bold text-[#3D3D3D] mb-4 uppercase tracking-wider">Price</h3>
                <div className="space-y-3">
                  <div className="flex gap-2 items-center">
                    <input
                      type="number"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                      className="w-20 px-2 py-2 border border-[#E8D4C4] rounded-lg text-sm"
                      placeholder="Min"
                    />
                    <span className="text-[#7A6B5D]">to</span>
                    <input
                      type="number"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                      className="w-20 px-2 py-2 border border-[#E8D4C4] rounded-lg text-sm"
                      placeholder="Max"
                    />
                  </div>
                  <p className="text-xs text-[#A0826D]">The highest price is Rs 13,950.00</p>
                </div>
              </div>

              {/* Brand */}
              <div>
                <h3 className="text-sm font-bold text-[#3D3D3D] mb-4 uppercase tracking-wider">Brand</h3>
                <div className="space-y-3">
                  {brands.map(brand => (
                    <label key={brand} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="w-4 h-4 rounded"
                      />
                      <span className="text-sm text-[#7A6B5D]">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div>
              {/* Top Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-6 border-b border-[#E8D4C4]">
                <div className="flex gap-2 order-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-[#F9F5F0] text-[#C87137]'
                        : 'text-[#A0826D] hover:text-[#3D3D3D]'
                    }`}
                    title="Grid view"
                  >
                    <Grid3x3 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'list'
                        ? 'bg-[#F9F5F0] text-[#C87137]'
                        : 'text-[#A0826D] hover:text-[#3D3D3D]'
                    }`}
                    title="List view"
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>

                <div className="relative order-3 sm:order-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none px-4 py-2 pr-10 rounded-lg border border-[#E8D4C4] text-sm text-[#3D3D3D] bg-white cursor-pointer"
                  >
                    <option value="date-new">Date, new to old</option>
                    <option value="price-low">Price, low to high</option>
                    <option value="price-high">Price, high to low</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#A0826D]" />
                </div>

                <p className="text-sm text-[#7A6B5D] order-2 sm:order-3">{filteredProducts.length} products</p>
              </div>

              {/* Products Grid/List */}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onView={handleViewProduct}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredProducts.map(product => (
                    <div
                      key={product.id}
                      className="flex gap-4 bg-white rounded-xl p-4 border border-[#E8D4C4] hover:shadow-lg transition-all"
                    >
                      <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-[#F9F5F0]">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <p className="text-xs text-[#C87137] font-semibold uppercase tracking-widest mb-1">
                          {product.category}
                        </p>
                        <h3 className="text-lg font-semibold text-[#3D3D3D] mb-1">{product.name}</h3>
                        <p className="text-sm text-[#7A6B5D] mb-3">{product.description}</p>
                        <div className="flex items-end justify-between">
                          <p className="text-xl font-bold text-[#A0826D]">Rs {product.price.toLocaleString()}</p>
                          <button
                            className="px-4 py-2 bg-[#C87137] text-white rounded-lg hover:bg-[#B85F2F] transition-colors text-sm font-semibold"
                            onClick={() => handleAddToCart(product)}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-[#7A6B5D] text-lg">No products match your filters.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
