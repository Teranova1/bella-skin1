'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminPanel from '@/components/AdminPanel';
import { defaultProducts, loadProducts, saveProducts } from '@/lib/catalog';
import { loadAdminSession } from '@/lib/admin-storage';
import { Product } from '@/lib/types';

export default function AdminPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [catalogReady, setCatalogReady] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    // Guard: redirect to login if no active session
    const session = loadAdminSession();
    if (!session) {
      router.replace('/login');
      return;
    }
    setProducts(loadProducts());
    setCatalogReady(true);
    setAuthChecked(true);
  }, [router]);

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

  // Show nothing while checking auth (avoids flash)
  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#1F1F1F] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#C87137] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

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