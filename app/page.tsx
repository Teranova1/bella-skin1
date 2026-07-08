'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import PromoCarousel from '@/components/PromoCarousel';
import ProductCarousel from '@/components/ProductCarousel';
import ProductDetails from '@/components/ProductDetails';
import Checkout from '@/components/Checkout';
import OrderSuccess from '@/components/OrderSuccess';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';

import { defaultProducts, loadProducts, saveProducts } from '@/lib/catalog';
import { loadCart, saveCart, CART_EVENT } from '@/lib/cart-storage';
import { CartItem, Product } from '@/lib/types';

type PageView = 'home' | 'productDetails' | 'checkout' | 'orderSuccess';

export default function Home() {
  const router = useRouter();
  const [view, setView] = useState<PageView>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [checkoutMode, setCheckoutMode] = useState<'single' | 'cart'>('single');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [catalogReady, setCatalogReady] = useState(false);

  useEffect(() => {
    const loaded = loadProducts();
    setProducts(loaded);
    setCatalogReady(true);

    // Rehydrate cart from localStorage (populated by /products page)
    setCartItems(loadCart());

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const productId = params.get('product');
      if (productId) {
        const found = loaded.find((p) => p.id === productId);
        if (found) {
          setSelectedProduct(found);
          setView('productDetails');
        }
      }
    }
  }, []);

  // Persist cart to localStorage and fire sync event on every change
  useEffect(() => {
    saveCart(cartItems);
  }, [cartItems]);

  useEffect(() => {
    if (catalogReady) {
      saveProducts(products);
    }
  }, [products, catalogReady]);

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setView('productDetails');
  };

  const handleAddToCart = (product: Product, quantity = 1) => {
    if (!product.inStock) {
      return;
    }

    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.product.id === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [...currentItems, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((currentItems) => currentItems.filter((item) => item.product.id !== productId));
  };

  const handleOpenCart = () => {
    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const handleCheckout = () => {
    if (!selectedProduct?.inStock) {
      return;
    }

    setCheckoutMode('single');
    setIsCartOpen(false);
    setView('checkout');
  };

  const handleCheckoutCart = () => {
    if (cartItems.length === 0) {
      return;
    }

    setCheckoutMode('cart');
    setIsCartOpen(false);
    setView('checkout');
  };

  const handleOrderSuccess = () => {
    setIsCartOpen(false);

    if (checkoutMode === 'cart') {
      setCartItems([]);
    }

    setView('orderSuccess');
  };

  const handleBackToHome = () => {
    setIsCartOpen(false);
    setView('home');
    setSelectedCategory('All');
    setShowAllProducts(false);
  };

  const handleAddProduct = (newProduct: Omit<Product, 'id'>) => {
    const product: Product = {
      ...newProduct,
      id: String(Date.now()),
      inStock: newProduct.inStock,
    };

    setProducts((currentProducts) => [...currentProducts, product]);
  };

  const handleViewAll = () => {
    setSelectedCategory('All');
    setShowAllProducts(true);
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  return (
    <main className="min-h-screen bg-[#F9F5F0] flex flex-col">
      <div className="flex-grow">
        <Header onAdminClick={() => router.push('/admin')} onCartClick={handleOpenCart} cartCount={cartCount} />
        <Navigation />
        {view === 'home' && (
          <>
            <PromoCarousel />
            <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8" id="featured-section">
              <ProductCarousel
                products={products}
                onViewProduct={handleViewProduct}
                onAddToCart={handleAddToCart}
              />
            </div>
          </>
        )}
        {view === 'productDetails' && selectedProduct && (
          <ProductDetails
            product={selectedProduct}
            onBuyNow={handleCheckout}
            onAddToCart={handleAddToCart}
            onBack={handleBackToHome}
          />
        )}
        {view === 'checkout' && (
          <Checkout
            product={checkoutMode === 'single' ? selectedProduct ?? undefined : undefined}
            cartItems={checkoutMode === 'cart' ? cartItems : undefined}
            onSuccess={handleOrderSuccess}
            onBack={handleBackToHome}
          />
        )}
        {view === 'orderSuccess' && <OrderSuccess onContinue={handleBackToHome} />}
        <CartDrawer
          isOpen={isCartOpen}
          items={cartItems}
          subtotal={cartSubtotal}
          onClose={handleCloseCart}
          onIncrement={(productId) => handleUpdateCartQuantity(productId, 1)}
          onDecrement={(productId) => handleUpdateCartQuantity(productId, -1)}
          onRemove={handleRemoveFromCart}
          onCheckout={handleCheckoutCart}
        />
      </div>
      <Footer />
    </main>
  );
}
