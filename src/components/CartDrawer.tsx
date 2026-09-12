import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Truck, Check } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  const [promoCode, setPromoCode] = useState('ATELIER25');
  const [promoApplied, setPromoApplied] = useState(true);

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const shippingThreshold = 150;
  const isFreeShipping = subtotal >= shippingThreshold;
  const progressPercent = Math.min(100, (subtotal / shippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 flex justify-end" id="atelier-cart-drawer">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-neutral-900 tracking-tight">
              Archival Bag
            </h3>
            <span className="text-xs bg-neutral-100 text-neutral-700 font-mono font-bold px-2 py-0.5 rounded-full">
              {items.reduce((sum, i) => sum + i.quantity, 0)}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-black rounded-lg hover:bg-neutral-100 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-neutral-50 px-5 py-3 border-b border-neutral-150">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-neutral-700 font-medium flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-blue-600" />
              {isFreeShipping ? (
                <span className="text-emerald-700 font-semibold">
                  Complimentary Express Shipping Unlocked
                </span>
              ) : (
                <span>
                  Add ${(shippingThreshold - subtotal).toFixed(2)} more for Free Express Shipping
                </span>
              )}
            </span>
            <span className="font-mono text-neutral-500 font-bold text-[11px]">
              {Math.round(progressPercent)}%
            </span>
          </div>
          <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-neutral-900 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <p className="text-neutral-500 text-sm">Your archival bag is currently empty.</p>
              <button
                onClick={onClose}
                className="text-xs font-semibold text-neutral-900 underline underline-offset-4 hover:text-blue-600 cursor-pointer"
              >
                Continue exploring curations
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-4 pb-4 border-b border-neutral-150 last:border-0"
              >
                {/* Product Image */}
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-24 object-cover rounded-lg bg-neutral-100 shrink-0 border border-neutral-200/60"
                  referrerPolicy="no-referrer"
                />

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-[11px] text-neutral-400 font-medium uppercase tracking-wider">
                          {item.product.brand}
                        </p>
                        <h4 className="text-xs font-bold text-neutral-900 line-clamp-1">
                          {item.product.name}
                        </h4>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-neutral-400 hover:text-red-500 transition-colors p-0.5"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-xs font-mono font-semibold text-neutral-900 mt-1">
                      ${item.product.price}
                    </p>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="inline-flex items-center border border-neutral-200 rounded-lg overflow-hidden bg-neutral-50">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 hover:bg-neutral-200 text-neutral-700 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 text-xs font-mono font-bold text-neutral-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 hover:bg-neutral-200 text-neutral-700 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-xs font-mono font-bold text-neutral-800">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout Summary */}
        {items.length > 0 && (
          <div className="p-5 border-t border-neutral-200 bg-neutral-50 space-y-3">
            {/* Promo Code box */}
            <div className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                placeholder="PROMO CODE"
                className="flex-1 bg-white border border-neutral-200 rounded-md px-3 py-1.5 text-xs font-mono uppercase focus:outline-hidden focus:border-neutral-900"
              />
              <button
                onClick={() => setPromoApplied(true)}
                className="bg-neutral-200 hover:bg-neutral-300 text-neutral-800 text-xs font-semibold px-3 py-1.5 rounded-md transition-colors cursor-pointer"
              >
                Apply
              </button>
            </div>

            {promoApplied && (
              <p className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                <Check className="w-3 h-3 text-emerald-600" />
                <span>Code ATELIER25 applied (Complimentary Express Shipping)</span>
              </p>
            )}

            {/* Calculations */}
            <div className="space-y-1.5 text-xs pt-1 border-t border-neutral-200">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal</span>
                <span className="font-mono">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Carbon Neutral Shipping</span>
                <span className="font-mono text-emerald-700 font-semibold">
                  {isFreeShipping ? 'FREE' : '$15.00'}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-neutral-900 pt-1.5 border-t border-neutral-200">
                <span>Estimated Total</span>
                <span className="font-mono">${subtotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              id="cart-checkout-action-btn"
              onClick={onCheckout}
              className="w-full bg-neutral-950 hover:bg-black text-white text-xs font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg cursor-pointer group"
            >
              <span>Proceed to Archival Checkout</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <div className="flex items-center justify-center gap-1 text-[11px] text-neutral-500 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
              <span>Encrypted Checkout &amp; 30-Day Guaranteed Returns</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
