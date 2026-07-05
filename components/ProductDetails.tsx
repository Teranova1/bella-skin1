import { Product } from '@/lib/types';
import { Check, ShoppingCart, Star } from 'lucide-react';
import Image from 'next/image';

interface ProductDetailsProps {
  product: Product;
  onBuyNow: () => void;
  onAddToCart: (product: Product) => void;
  onBack: () => void;
}

export default function ProductDetails({ product, onBuyNow, onAddToCart, onBack }: ProductDetailsProps) {
  const isOutOfStock = !product.inStock;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-12">
        <button
          onClick={onBack}
          className="text-[#7A6B5D] hover:text-[#3D3D3D] mb-8 font-medium"
        >
          ← Back to Products
        </button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="flex items-center justify-center bg-white rounded-2xl p-8">
            <div className="relative w-full aspect-square">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover rounded-xl"
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col justify-start">
            <div className="mb-6">
              <p className="text-sm text-[#C87137] font-semibold uppercase tracking-widest mb-2">
                {product.category}
              </p>
              <h1 className="text-4xl font-bold text-[#3D3D3D] mb-4">{product.name}</h1>
              <div className="flex items-center gap-2 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-sm text-[#7A6B5D] ml-2">(124 reviews)</span>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-[#7A6B5D] text-lg leading-relaxed mb-6">
                {product.description}
              </p>
              <div className="flex items-center gap-3 mb-4">
                <p className="text-5xl font-bold text-[#3D3D3D]">${product.price}</p>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest ${
                    isOutOfStock ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                  }`}
                >
                  {isOutOfStock ? 'Out of Stock' : 'In Stock'}
                </span>
              </div>
              <p className="text-sm text-[#7A6B5D] mb-8">Free shipping on orders over $50</p>
            </div>

            {/* Benefits */}
            {product.benefits && (
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-[#3D3D3D] uppercase tracking-widest mb-4">
                  Key Benefits
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-[#C87137] flex-shrink-0" />
                      <span className="text-sm text-[#3D3D3D]">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Button */}
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              <button
                onClick={onBuyNow}
                disabled={isOutOfStock}
                className="w-full bg-[#C87137] text-white py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isOutOfStock ? 'Out of Stock' : 'Buy Now'}
              </button>
              <button
                onClick={() => onAddToCart(product)}
                disabled={isOutOfStock}
                className="w-full bg-white border border-[#C87137] text-[#C87137] py-4 rounded-lg font-semibold text-lg hover:bg-[#F9F5F0] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-5 h-5" />
                {isOutOfStock ? 'Unavailable' : 'Add to Cart'}
              </button>
            </div>

            {/* Product Info */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-[#E8D4C4]">
              <div>
                <p className="text-xs text-[#7A6B5D] uppercase tracking-widest font-semibold mb-2">
                  Size
                </p>
                <p className="text-[#3D3D3D] font-medium">50ml</p>
              </div>
              <div>
                <p className="text-xs text-[#7A6B5D] uppercase tracking-widest font-semibold mb-2">
                  Formula
                </p>
                <p className="text-[#3D3D3D] font-medium">Lightweight</p>
              </div>
              <div>
                <p className="text-xs text-[#7A6B5D] uppercase tracking-widest font-semibold mb-2">
                  Type
                </p>
                <p className="text-[#3D3D3D] font-medium">Natural</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
