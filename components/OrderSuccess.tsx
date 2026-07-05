import { CheckCircle2, Package, Truck } from 'lucide-react';

interface OrderSuccessProps {
  onContinue: () => void;
}

export default function OrderSuccess({ onContinue }: OrderSuccessProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-[#E8D4C4] text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <CheckCircle2 className="w-24 h-24 text-green-500 animate-bounce" />
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-[#3D3D3D] mb-3">Order Confirmed!</h1>
          <p className="text-[#7A6B5D] mb-8">
            Thank you for your purchase. Your order has been successfully placed.
          </p>

          {/* Order Details */}
          <div className="bg-[#F9F5F0] rounded-lg p-6 mb-8 text-left">
            <div className="space-y-4">
              <div>
                <p className="text-xs text-[#7A6B5D] uppercase tracking-widest font-semibold">
                  Order Number
                </p>
                <p className="text-lg font-bold text-[#3D3D3D]">#BEL-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
              </div>
              <div className="flex items-start gap-3 pt-4 border-t border-[#E8D4C4]">
                <Package className="w-5 h-5 text-[#C87137] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-[#3D3D3D]">Processing Your Order</p>
                  <p className="text-xs text-[#7A6B5D] mt-1">
                    We&apos;re preparing your items for shipment.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-[#C87137] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-[#3D3D3D]">Estimated Delivery</p>
                  <p className="text-xs text-[#7A6B5D] mt-1">
                    3-5 business days
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Info Text */}
          <p className="text-sm text-[#7A6B5D] mb-8">
            A confirmation email has been sent to your email address with order details and tracking information.
          </p>

          {/* CTA Button */}
          <button
            onClick={onContinue}
            className="w-full bg-[#C87137] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
