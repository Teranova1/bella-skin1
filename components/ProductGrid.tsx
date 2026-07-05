import { useRouter } from 'next/navigation';
import { Product } from '@/lib/types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  selectedCategory: string;
  onViewProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onViewAll?: () => void;
  showAllProducts?: boolean;
}

export default function ProductGrid({
  products,
  selectedCategory,
  onViewProduct,
  onAddToCart,
  onViewAll,
  showAllProducts = false,
}: ProductGridProps) {
  const router = useRouter();
  
  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const displayedProducts = showAllProducts ? filteredProducts : filteredProducts.slice(0, 5);
  const hasMoreProducts = !showAllProducts && filteredProducts.length > 5;

  return (
    <section>
      <h2 className="text-2xl font-bold text-[#3D3D3D] mb-6">Featured Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {displayedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onView={onViewProduct}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-[#7A6B5D] text-lg">No products found in this category.</p>
        </div>
      )}

      {hasMoreProducts && (
        <div className="flex justify-center mt-10">
          <button
            type="button"
            onClick={() => router.push('/products')}
            className="px-8 py-2 border-2 border-[#C87137] text-[#C87137] font-medium rounded-lg hover:bg-[#F9F5F0] transition-colors"
          >
            View all
          </button>
        </div>
      )}
    </section>
  );
}
