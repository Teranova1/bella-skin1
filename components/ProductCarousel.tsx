'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(2);
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
      <div className="flex items-center justify-between mb-4 sm:mb-6 md:mb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#3D3D3D]">Featured Products</h2>
        
        {/* Navigation Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {currentIndex > 0 && (
            <button
              onClick={goToPrevious}
              className="p-2 sm:p-2 rounded-full border-2 border-[#C87137] text-[#C87137] hover:bg-[#C87137] hover:text-white transition-all active:scale-90 min-h-[40px] min-w-[40px] flex items-center justify-center"
              aria-label="Previous products"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          )}
          {currentIndex < maxIndex && (
            <button
              onClick={goToNext}
              className="p-2 sm:p-2 rounded-full border-2 border-[#C87137] text-[#C87137] hover:bg-[#C87137] hover:text-white transition-all active:scale-90 min-h-[40px] min-w-[40px] flex items-center justify-center"
              aria-label="Next products"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid gap-3 sm:gap-4 lg:gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visibleProducts.map(product => {
          const isOutOfStock = !product.inStock;
          return (
            <article
              key={product.id}
              role="button"
              tabIndex={0}
              className={`group cursor-pointer bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border flex flex-col h-full ${
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
              {/* Product Image */}
              <div className="relative flex-shrink-0 bg-[#F9F5F0] overflow-hidden p-3 sm:p-6 aspect-square sm:aspect-auto sm:min-h-64">
                <div className="h-full flex items-center justify-center">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={300}
                    className="h-full w-auto object-contain group-hover:scale-105 transition-transform duration-300 max-h-[140px] sm:max-h-none"
                  />
                </div>
                {isOutOfStock && (
                  <div className="absolute inset-0 bg-white/55 backdrop-blur-[1px] flex items-center justify-center">
                    <span className="px-2 py-1 sm:px-3 rounded-full bg-slate-900 text-white text-[10px] sm:text-xs font-semibold uppercase tracking-widest">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="p-3 sm:p-5 flex flex-col flex-grow">
                <p className="text-[10px] sm:text-xs text-[#C87137] font-semibold uppercase tracking-widest mb-1 sm:mb-2">
                  {product.category}
                </p>
                <h3 className="text-xs sm:text-sm font-semibold text-[#3D3D3D] mb-1 line-clamp-2 sm:line-clamp-3">
                  {product.name}
                </h3>
                
                <div className="mt-auto">
                  <p className="text-sm sm:text-lg font-bold text-[#A0826D] mb-2 sm:mb-5">
                    Rs {product.price.toLocaleString()}
                  </p>

                  <button
                    type="button"
                    disabled={isOutOfStock}
                    className="w-full py-2.5 sm:py-3 bg-[#C87137] text-white font-semibold rounded-md hover:bg-[#B85F2F] transition-all disabled:cursor-not-allowed disabled:opacity-50 text-xs sm:text-sm min-h-[40px] sm:min-h-[44px] active:scale-[0.97]"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product);
                    }}
                    aria-label={isOutOfStock ? `${product.name} is out of stock` : `Add ${product.name} to cart`}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* View All Button */}
      <div className="flex justify-center mt-8 sm:mt-10">
        <button
          type="button"
          onClick={() => router.push('/products')}
          className="px-8 py-3 sm:py-2 border-2 border-[#C87137] text-[#C87137] font-medium rounded-lg hover:bg-[#F9F5F0] transition-colors min-h-[48px] sm:min-h-0 text-sm sm:text-base active:scale-[0.97]"
        >
          View all
        </button>
      </div>
    </section>
  );
}
