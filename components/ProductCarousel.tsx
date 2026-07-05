'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import { Product } from '@/lib/types';
import Image from 'next/image';

interface ProductCarouselProps {
  products: Product[];
  onViewProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductCarousel({ products, onViewProduct, onAddToCart }: ProductCarouselProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else if (window.innerWidth < 1280) {
        setItemsPerView(3);
      } else {
        setItemsPerView(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const displayedProducts = products.slice(0, 12);
  const maxIndex = Math.max(0, displayedProducts.length - itemsPerView);

  const goToPrevious = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

  const visibleProducts = displayedProducts.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-[#3D3D3D]">Featured Products</h2>
        
        {/* Navigation Buttons */}
        <div className="flex items-center gap-3">
          {currentIndex > 0 && (
            <button
              onClick={goToPrevious}
              className="p-2 rounded-full border-2 border-[#C87137] text-[#C87137] hover:bg-[#C87137] hover:text-white transition-all"
              aria-label="Previous products"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          {currentIndex < maxIndex && (
            <button
              onClick={goToNext}
              className="p-2 rounded-full border-2 border-[#C87137] text-[#C87137] hover:bg-[#C87137] hover:text-white transition-all"
              aria-label="Next products"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visibleProducts.map(product => {
          const isOutOfStock = !product.inStock;
          return (
            <article
              key={product.id}
              role="button"
              tabIndex={0}
              className={`group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 border ${
                isOutOfStock ? 'border-[#D9C7B8] opacity-80' : 'border-[#E8D4C4]'
              }`}
              onClick={() => onViewProduct(product)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onViewProduct(product);
                }
              }}
              aria-label={`View details for ${product.name}`}
            >
              <div className="relative h-56 bg-[#F9F5F0] overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {isOutOfStock && (
                  <div className="absolute inset-0 bg-white/55 backdrop-blur-[1px] flex items-center justify-center">
                    <span className="px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-semibold uppercase tracking-widest">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>

              <div className="p-5">
                <p className="text-xs text-[#C87137] font-semibold uppercase tracking-widest mb-2">
                  {product.category}
                </p>
                <h3 className="text-lg font-semibold text-[#3D3D3D] mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-sm text-[#7A6B5D] line-clamp-2 mb-4">
                  {product.description}
                </p>

                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-sm text-[#7A6B5D]">Price</p>
                    <p className="text-2xl font-bold text-[#A0826D]">Rs {product.price.toLocaleString()}</p>
                  </div>
                  <button
                    type="button"
                    disabled={isOutOfStock}
                    className="p-3 bg-[#C87137] text-white rounded-lg hover:bg-[#B85F2F] transition-all disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product);
                    }}
                    aria-label={isOutOfStock ? `${product.name} is out of stock` : `Add ${product.name} to cart`}
                  >
                    <ShoppingBag className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* View All Button */}
      <div className="flex justify-center mt-10">
        <button
          type="button"
          onClick={() => router.push('/products')}
          className="px-8 py-2 border-2 border-[#C87137] text-[#C87137] font-medium rounded-lg hover:bg-[#F9F5F0] transition-colors"
        >
          View all
        </button>
      </div>
    </section>
  );
}
