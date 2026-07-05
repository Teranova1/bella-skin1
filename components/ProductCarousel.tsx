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
  const [itemsPerView, setItemsPerView] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(5);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const displayedProducts = products.slice(0, 10);
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
      <h2 className="text-2xl font-bold text-[#3D3D3D] mb-6">Featured Products</h2>

      <div className="relative">
        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mb-4">
          <div>
            {currentIndex > 0 && (
              <button
                onClick={goToPrevious}
                className="p-2 rounded-full border-2 border-[#C87137] text-[#C87137] hover:bg-[#C87137] hover:text-white transition-all"
                aria-label="Previous products"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
          </div>
          <div>
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
        <div className="flex flex-col gap-8 px-4 sm:px-0">
          {visibleProducts.map(product => {
            const isOutOfStock = !product.inStock;
            return (
              <article
                key={product.id}
                className={`group flex items-center gap-4 pb-6 border-b border-[#E8D4C4] last:border-b-0 ${
                  isOutOfStock ? 'opacity-70' : ''
                }`}
              >
                {/* Product Image */}
                <div className="flex-shrink-0 w-24 h-32 bg-[#F9F5F0] rounded-lg overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={150}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <p className="text-xs text-[#C87137] font-semibold uppercase tracking-widest mb-1">
                    {product.category}
                  </p>
                  <h3 className="text-sm font-semibold text-[#3D3D3D] mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-[#7A6B5D] mb-2 line-clamp-1">
                    {product.description}
                  </p>
                  <p className="text-lg font-bold text-[#A0826D]">
                    Rs {product.price.toLocaleString()}
                  </p>
                </div>

                {/* Add to Cart Button */}
                <button
                  type="button"
                  disabled={isOutOfStock}
                  className="flex-shrink-0 px-6 py-2 bg-[#C87137] text-white font-semibold rounded-md hover:bg-[#B85F2F] transition-all disabled:cursor-not-allowed disabled:opacity-50 text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(product);
                  }}
                  aria-label={isOutOfStock ? `${product.name} is out of stock` : `Add ${product.name} to cart`}
                >
                  Add To Cart
                </button>
              </article>
            );
          })}
        </div>
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
