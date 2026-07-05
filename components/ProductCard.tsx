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
      className={`group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 border ${
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
            <p className="text-2xl font-bold text-[#A0826D]">${product.price}</p>
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
}
