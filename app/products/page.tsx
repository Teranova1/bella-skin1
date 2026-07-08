'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import CartDrawer from '@/components/CartDrawer';
import { defaultProducts, loadProducts } from '@/lib/catalog';
import { addToCartStorage, loadCart, saveCart } from '@/lib/cart-storage';
import { CartItem, Product } from '@/lib/types';
import { CheckCircle2, ChevronDown, Grid3x3, List, SlidersHorizontal, X } from 'lucide-react';

type ViewMode = 'grid' | 'list';

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(defaultProducts);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState('date-new');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [addedToast, setAddedToast] = useState<string | null>(null);

  // Filters
  const [priceRange, setPriceRange] = useState({ min: 0, max: 13950 });
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<'all' | 'inStock' | 'outOfStock'>('all');

  // Get unique brands from products
  const brands = Array.from(new Set(products.map(p => p.category))).sort();

  useEffect(() => {
    setProducts(loadProducts());
    // Rehydrate cart from localStorage so badge + drawer stay correct
    setCartItems(loadCart());
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

  // Lock body scroll when mobile filters are open
  useEffect(() => {
    if (mobileFiltersOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileFiltersOpen]);

  const handleViewProduct = (product: Product) => {
    window.location.href = `/?product=${product.id}`;
  };

  const handleAddToCart = useCallback((product: Product) => {
    if (!product.inStock) return;
    const updated = addToCartStorage(product, 1);
    setCartItems(updated);
    setIsCartOpen(true);
    // Show a brief toast
    setAddedToast(product.name);
    setTimeout(() => setAddedToast(null), 2500);
  }, []);

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems(prev => {
      const updated = prev
        .map(i => i.product.id === productId ? { ...i, quantity: i.quantity + delta } : i)
        .filter(i => i.quantity > 0);
      saveCart(updated);
      return updated;
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems(prev => {
      const updated = prev.filter(i => i.product.id !== productId);
      saveCart(updated);
      return updated;
    });
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const clearAllFilters = () => {
    setPriceRange({ min: 0, max: 13950 });
    setSelectedBrands([]);
    setSelectedAvailability('all');
  };

  const activeFilterCount =
    (selectedAvailability !== 'all' ? 1 : 0) +
    selectedBrands.length +
    (priceRange.min > 0 || priceRange.max < 13950 ? 1 : 0);

  /* ─── Shared filter panel content ─── */
  const filterContent = (
    <>
      {/* Availability */}
      <div className="mb-6 pb-6 border-b border-[#E8D4C4]">
        <h3 className="text-sm font-bold text-[#3D3D3D] mb-4 uppercase tracking-wider">Availability</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer min-h-[44px]">
            <input
              type="checkbox"
              checked={selectedAvailability === 'inStock'}
              onChange={() => setSelectedAvailability(selectedAvailability === 'inStock' ? 'all' : 'inStock')}
              className="w-5 h-5 rounded accent-[#C87137]"
            />
            <span className="text-sm text-[#7A6B5D]">In Stock (120)</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer min-h-[44px]">
            <input
              type="checkbox"
              checked={selectedAvailability === 'outOfStock'}
              onChange={() => setSelectedAvailability(selectedAvailability === 'outOfStock' ? 'all' : 'outOfStock')}
              className="w-5 h-5 rounded accent-[#C87137]"
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
              className="w-full max-w-[100px] px-3 py-2.5 border border-[#E8D4C4] rounded-lg text-sm"
              placeholder="Min"
            />
            <span className="text-[#7A6B5D] flex-shrink-0">to</span>
            <input
              type="number"
              value={priceRange.max}
              onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
              className="w-full max-w-[100px] px-3 py-2.5 border border-[#E8D4C4] rounded-lg text-sm"
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
            <label key={brand} className="flex items-center gap-3 cursor-pointer min-h-[44px]">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                className="w-5 h-5 rounded accent-[#C87137]"
              />
              <span className="text-sm text-[#7A6B5D]">{brand}</span>
            </label>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <main className="min-h-screen bg-[#F9F5F0] flex flex-col overflow-x-hidden">
      <div className="flex-grow">
        <Header
          onAdminClick={() => router.push('/admin')}
          onCartClick={() => setIsCartOpen(true)}
          cartCount={cartItems.reduce((s, i) => s + i.quantity, 0)}
        />
        <Navigation />

        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
          {/* Page Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-[#3D3D3D] mb-4 md:mb-8">All Products</h1>

          {/* ── Mobile: Horizontal scrollable brand pills ── */}
          <div className="lg:hidden mb-4">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <button
                onClick={() => setSelectedBrands([])}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedBrands.length === 0
                    ? 'bg-[#C87137] text-white shadow-md'
                    : 'bg-white text-[#7A6B5D] border border-[#E8D4C4] hover:border-[#C87137]'
                }`}
              >
                All
              </button>
              {brands.map(brand => (
                <button
                  key={brand}
                  onClick={() => toggleBrand(brand)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedBrands.includes(brand)
                      ? 'bg-[#C87137] text-white shadow-md'
                      : 'bg-white text-[#7A6B5D] border border-[#E8D4C4] hover:border-[#C87137]'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col lg:grid lg:grid-cols-[280px_1fr] gap-6 lg:gap-8">
            {/* ── Desktop: Sidebar Filters ── */}
            <aside className="hidden lg:block bg-white rounded-2xl p-6 h-fit sticky top-24 border border-[#E8D4C4] shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-[#3D3D3D]">Filter:</h2>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs font-semibold text-[#C87137] hover:text-[#B85F2F] transition-colors"
                  >
                    Clear all
                  </button>
                )}
              </div>
              {filterContent}
            </aside>

            {/* ── Mobile: Filter Drawer Overlay ── */}
            {mobileFiltersOpen && (
              <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 lg:hidden"
                onClick={() => setMobileFiltersOpen(false)}
              />
            )}

            {/* ── Mobile: Filter Drawer Panel ── */}
            <div
              className={`fixed inset-y-0 left-0 z-50 w-[85vw] max-w-[360px] bg-white shadow-2xl transform transition-transform duration-300 ease-out lg:hidden overflow-y-auto ${
                mobileFiltersOpen ? 'translate-x-0' : '-translate-x-full'
              }`}
            >
              <div className="sticky top-0 bg-white z-10 px-5 py-4 border-b border-[#E8D4C4] flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#3D3D3D]">Filters</h2>
                <div className="flex items-center gap-3">
                  {activeFilterCount > 0 && (
                    <button
                      onClick={clearAllFilters}
                      className="text-xs font-semibold text-[#C87137] hover:text-[#B85F2F] transition-colors"
                    >
                      Clear all
                    </button>
                  )}
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="p-2 rounded-full hover:bg-[#F9F5F0] transition-colors"
                    aria-label="Close filters"
                  >
                    <X className="w-5 h-5 text-[#3D3D3D]" />
                  </button>
                </div>
              </div>
              <div className="px-5 py-6">
                {filterContent}
              </div>
              {/* Apply button sticks to bottom */}
              <div className="sticky bottom-0 bg-white border-t border-[#E8D4C4] p-4">
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-full py-3.5 bg-[#C87137] text-white font-semibold rounded-xl hover:bg-[#B85F2F] transition-colors text-sm"
                >
                  Show {filteredProducts.length} Products
                </button>
              </div>
            </div>

            {/* ── Main Content ── */}
            <div className="min-w-0">
              {/* Top Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-5 border-b border-[#E8D4C4]">
                <div className="flex items-center gap-2">
                  {/* Mobile filter toggle */}
                  <button
                    onClick={() => setMobileFiltersOpen(true)}
                    className="lg:hidden flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-[#E8D4C4] text-sm font-medium text-[#3D3D3D] hover:border-[#C87137] hover:text-[#C87137] transition-colors bg-white"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                    {activeFilterCount > 0 && (
                      <span className="ml-1 bg-[#C87137] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {activeFilterCount}
                      </span>
                    )}
                  </button>

                  {/* View mode toggles */}
                  <div className="hidden sm:flex bg-white rounded-xl border border-[#E8D4C4] overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2.5 transition-colors ${
                        viewMode === 'grid'
                          ? 'bg-[#C87137] text-white'
                          : 'text-[#A0826D] hover:text-[#3D3D3D] hover:bg-[#F9F5F0]'
                      }`}
                      title="Grid view"
                    >
                      <Grid3x3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2.5 transition-colors ${
                        viewMode === 'list'
                          ? 'bg-[#C87137] text-white'
                          : 'text-[#A0826D] hover:text-[#3D3D3D] hover:bg-[#F9F5F0]'
                      }`}
                      title="List view"
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <p className="text-sm text-[#7A6B5D] hidden sm:block">{filteredProducts.length} products</p>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none px-4 py-2.5 pr-10 rounded-xl border border-[#E8D4C4] text-sm text-[#3D3D3D] bg-white cursor-pointer min-h-[44px]"
                    >
                      <option value="date-new">Date, new to old</option>
                      <option value="price-low">Price, low to high</option>
                      <option value="price-high">Price, high to low</option>
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#A0826D]" />
                  </div>
                </div>
              </div>

              {/* Mobile product count */}
              <p className="text-sm text-[#7A6B5D] mb-4 sm:hidden">{filteredProducts.length} products</p>

              {/* Products Grid/List */}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
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
                <div className="space-y-3 sm:space-y-4">
                  {filteredProducts.map(product => (
                    <div
                      key={product.id}
                      className="flex gap-3 sm:gap-4 bg-white rounded-xl p-3 sm:p-4 border border-[#E8D4C4] hover:shadow-lg transition-all duration-200"
                    >
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden flex-shrink-0 bg-[#F9F5F0]">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow min-w-0">
                        <p className="text-xs text-[#C87137] font-semibold uppercase tracking-widest mb-1">
                          {product.category}
                        </p>
                        <h3 className="text-sm sm:text-lg font-semibold text-[#3D3D3D] mb-1 line-clamp-2">{product.name}</h3>
                        <p className="text-xs sm:text-sm text-[#7A6B5D] mb-2 sm:mb-3 line-clamp-2 hidden sm:block">{product.description}</p>
                        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
                          <p className="text-base sm:text-xl font-bold text-[#A0826D]">Rs {product.price.toLocaleString()}</p>
                          <button
                            className="px-4 py-2.5 bg-[#C87137] text-white rounded-lg hover:bg-[#B85F2F] transition-colors text-xs sm:text-sm font-semibold min-h-[44px] sm:min-h-0 w-full sm:w-auto"
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
                  <div className="mb-4">
                    <SlidersHorizontal className="w-12 h-12 text-[#E8D4C4] mx-auto" />
                  </div>
                  <p className="text-[#7A6B5D] text-lg mb-2">No products match your filters.</p>
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-[#C87137] font-semibold hover:text-[#B85F2F] transition-colors"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {/* ── Cart Drawer ── */}
      <CartDrawer
        isOpen={isCartOpen}
        items={cartItems}
        subtotal={cartItems.reduce((s, i) => s + i.product.price * i.quantity, 0)}
        onClose={() => setIsCartOpen(false)}
        onIncrement={(id) => handleUpdateQuantity(id, 1)}
        onDecrement={(id) => handleUpdateQuantity(id, -1)}
        onRemove={handleRemoveFromCart}
        onCheckout={() => { setIsCartOpen(false); router.push('/'); }}
      />

      {/* ── Add-to-cart toast ── */}
      {addedToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3 bg-[#3D3D3D] text-white px-5 py-3.5 rounded-2xl shadow-2xl animate-slideUp text-sm font-medium max-w-[90vw]">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span className="line-clamp-1"><span className="font-semibold">{addedToast}</span> added to cart!</span>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateX(-50%) translateY(1rem); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .animate-slideUp { animation: slideUp 0.25s ease-out forwards; }
      `}</style>
    </main>
  );
}
