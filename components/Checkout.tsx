'use client';

import { useState } from 'react';
import { Product, type CartItem } from '@/lib/types';
import { Lock } from 'lucide-react';

interface CheckoutProps {
  product?: Product;
  cartItems?: CartItem[];
  onSuccess: () => void;
  onBack: () => void;
}

export default function Checkout({ product, cartItems = [], onSuccess, onBack }: CheckoutProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const [loading, setLoading] = useState(false);
  const lineItems = cartItems.length > 0 ? cartItems : product ? [{ product, quantity: 1 }] : [];
  const subtotal = lineItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const unavailableItems = lineItems.filter((item) => !item.product.inStock);

  if (lineItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#F9F5F0] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl bg-white rounded-2xl p-8 shadow-sm border border-[#E8D4C4] text-center">
          <h2 className="text-2xl font-bold text-[#3D3D3D] mb-3">Your checkout is empty</h2>
          <p className="text-[#7A6B5D] mb-6">
            Add a product to your cart or pick an item from the catalog to continue.
          </p>
          <button
            type="button"
            onClick={onBack}
            className="bg-[#C87137] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#B85F2F] transition-colors"
          >
            Return to Store
          </button>
        </div>
      </div>
    );
  }

  if (unavailableItems.length > 0) {
    return (
      <div className="min-h-screen bg-[#F9F5F0] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl bg-white rounded-2xl p-8 shadow-sm border border-[#E8D4C4] text-center">
          <h2 className="text-2xl font-bold text-[#3D3D3D] mb-3">One or more items are unavailable</h2>
          <p className="text-[#7A6B5D] mb-6">
            An item in your checkout was marked out of stock. Please return to the store and try again.
          </p>
          <button
            type="button"
            onClick={onBack}
            className="bg-[#C87137] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#B85F2F] transition-colors"
          >
            Return to Store
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate processing
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F9F5F0]">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-12">
        <button
          onClick={onBack}
          className="text-[#7A6B5D] hover:text-[#3D3D3D] mb-8 font-medium"
        >
          ← Back
        </button>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#E8D4C4]">
              <h2 className="text-2xl font-bold text-[#3D3D3D] mb-8">Checkout</h2>

              {/* Order Details */}
              <div className="mb-8 pb-8 border-b border-[#E8D4C4]">
                <h3 className="text-sm font-semibold text-[#3D3D3D] uppercase tracking-widest mb-4">
                  Order Summary
                </h3>
                <div className="space-y-3">
                  {lineItems.map((item) => (
                    <div
                      key={item.product.id}
                      className="bg-[#F9F5F0] rounded-lg p-4 flex items-center justify-between gap-4"
                    >
                      <div>
                        <p className="font-medium text-[#3D3D3D]">{item.product.name}</p>
                        <p className="text-sm text-[#7A6B5D] mt-1">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-lg font-bold text-[#3D3D3D]">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-[#7A6B5D]">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#7A6B5D]">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-[#7A6B5D] text-sm">
                    <span>Tax (10%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg text-[#3D3D3D] pt-2 border-t border-[#E8D4C4]">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Billing Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-[#3D3D3D] uppercase tracking-widest mb-4">
                    Billing Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#3D3D3D] mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-[#E8D4C4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0826D]"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#3D3D3D] mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-[#E8D4C4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0826D]"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#3D3D3D] mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-[#E8D4C4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0826D]"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#3D3D3D] mb-2">
                        Shipping Address
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        rows={3}
                        className="w-full px-4 py-3 border border-[#E8D4C4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0826D]"
                        placeholder="123 Main St, Apt 4B, New York, NY 10001"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Section */}
                <div>
                  <h3 className="text-sm font-semibold text-[#3D3D3D] uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Lock className="w-4 h-4" /> Payment Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#3D3D3D] mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-[#E8D4C4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0826D]"
                        placeholder="4532 1234 5678 9010"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#3D3D3D] mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          name="expiry"
                          value={formData.expiry}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-[#E8D4C4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0826D]"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#3D3D3D] mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-[#E8D4C4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0826D]"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#C87137] text-white py-4 rounded-lg font-semibold text-lg hover:bg-[#B85F2F] transition-all disabled:opacity-70"
                >
                  {loading ? 'Processing...' : 'Place Order'}
                </button>
              </form>
            </div>
          </div>

          {/* Order Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#E8D4C4] sticky top-24">
              <h3 className="text-lg font-bold text-[#3D3D3D] mb-6">Order Details</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-[#7A6B5D]">
                  <span>Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#7A6B5D]">
                  <span>Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="flex justify-between text-[#7A6B5D] text-sm">
                  <span>Tax (10%)</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="pt-4 border-t border-[#E8D4C4] flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
