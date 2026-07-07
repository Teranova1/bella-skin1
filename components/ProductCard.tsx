import { Product } from '@/lib/types';
import { ShoppingBag } from 'lucide-react';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
  onView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onView, onAddToCart }: ProductCardProps) {
  const isOutOfStock = !product.inStock;

  return (
    <article
      role="button"
      tabIndex={0}
      className={`group cursor-pointer bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border flex flex-col h-full ${
        isOutOfStock ? 'border-[#D9C7B8] opacity-80' : 'border-[#E8D4C4]'
      }`}
      onClick={() => onView(product)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onView(product);
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
}
