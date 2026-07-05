'use client';

import { CartItem } from '@/lib/types';
import { ArrowRight, Minus, Plus, ShoppingCart, Trash2, X } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  subtotal: number;
  onClose: () => void;
  onIncrement: (productId: string) => void;
  onDecrement: (productId: string) => void;
  onRemove: (productId: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  items,
  subtotal,
  onClose,
  onIncrement,
  onDecrement,
  onRemove,
  onCheckout,
}: CartDrawerProps) {
  if (!isOpen) {
    return null;
  }

  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className="fixed inset-0 z-50" aria-hidden={!isOpen}>
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
        aria-label="Close cart overlay"
      />

      <aside
        className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl border-l border-[#E8D4C4] flex flex-col"
      >
        <div className="p-6 border-b border-[#E8D4C4] flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#7A6B5D] font-semibold">
              Your Bag
            </p>
            <h2 className="text-2xl font-bold text-[#3D3D3D]">Shopping Cart</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-[#7A6B5D] hover:bg-[#F9F5F0] hover:text-[#3D3D3D] transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center text-[#7A6B5D]">
              <ShoppingCart className="w-12 h-12 mb-4 text-[#C87137]" />
              <p className="text-lg font-semibold text-[#3D3D3D]">Your cart is empty.</p>
              <p className="mt-2 text-sm max-w-xs">
                Add a few products to start building your skincare routine.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="rounded-2xl border border-[#E8D4C4] p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-semibold text-[#3D3D3D] line-clamp-1">{item.product.name}</p>
                    <p className="text-sm text-[#7A6B5D] mt-1">${item.product.price.toFixed(2)} each</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemove(item.product.id)}
                    className="text-[#7A6B5D] hover:text-[#C87137] transition-colors"
                    aria-label={`Remove ${item.product.name}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-4 flex items-center justify-between gap-4">
                  <div className="inline-flex items-center rounded-lg border border-[#E8D4C4]">
                    <button
                      type="button"
                      onClick={() => onDecrement(item.product.id)}
                      className="p-2 text-[#3D3D3D] hover:bg-[#F9F5F0] transition-colors"
                      aria-label={`Decrease quantity of ${item.product.name}`}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 text-sm font-semibold text-[#3D3D3D]">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => onIncrement(item.product.id)}
                      className="p-2 text-[#3D3D3D] hover:bg-[#F9F5F0] transition-colors"
                      aria-label={`Increase quantity of ${item.product.name}`}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-lg font-bold text-[#3D3D3D]">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-[#E8D4C4] p-6 bg-[#F9F5F0] space-y-4">
          <div className="space-y-2 text-sm text-[#7A6B5D]">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span className="font-medium text-[#3D3D3D]">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Shipping</span>
              <span className="font-medium text-[#3D3D3D]">Free</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Tax (10%)</span>
              <span className="font-medium text-[#3D3D3D]">${tax.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between border-t border-[#E8D4C4] pt-3 text-base">
              <span className="font-semibold text-[#3D3D3D]">Total</span>
              <span className="font-bold text-[#3D3D3D]">${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onCheckout}
            disabled={items.length === 0}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#C87137] text-white py-4 rounded-lg font-semibold text-lg hover:bg-[#B85F2F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Checkout
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </aside>
    </div>
  );
}