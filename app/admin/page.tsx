'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminPanel from '@/components/AdminPanel';
import { defaultProducts, loadProducts, saveProducts } from '@/lib/catalog';
import { Product } from '@/lib/types';

export default function AdminPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [catalogReady, setCatalogReady] = useState(false);

  useEffect(() => {
    setProducts(loadProducts());
    setCatalogReady(true);
  }, []);

  useEffect(() => {
    if (catalogReady) {
      saveProducts(products);
    }
  }, [products, catalogReady]);

  const handleAddProduct = (newProduct: Omit<Product, 'id'>) => {
    const product: Product = {
      ...newProduct,
      id: String(Date.now()),
    };

    setProducts((currentProducts) => {
      const updatedProducts = [...currentProducts, product];
      saveProducts(updatedProducts);
      return updatedProducts;
    });
  };

  const handleToggleStock = (productId: string) => {
    setProducts((currentProducts) => {
      const updatedProducts = currentProducts.map((product) =>
        product.id === productId ? { ...product, inStock: !product.inStock } : product,
      );

      saveProducts(updatedProducts);
      return updatedProducts;
    });
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((currentProducts) => {
      const updatedProducts = currentProducts.filter((product) => product.id !== productId);
      saveProducts(updatedProducts);
      return updatedProducts;
    });
  };

  return (
    <AdminPanel
      products={products}
      onAddProduct={handleAddProduct}
      onToggleStock={handleToggleStock}
      onDeleteProduct={handleDeleteProduct}
      onExit={() => router.push('/')}
    />
  );
}