import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, ArrowRight, Lock } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
  onSuccess: (orderNumber: string) => void;
  onTrackOrder?: (orderNumber: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  total,
  onSuccess,
  onTrackOrder,
}) => {
  const [step, setStep] = useState<'details' | 'success'>('details');
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedOrder = `ATL-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedOrder);
    setStep('success');
    onSuccess(generatedOrder);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" id="atelier-checkout-modal">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-neutral-200 animate-in zoom-in-95 duration-150">
        <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-neutral-800" />
            <h3 className="text-base font-bold text-neutral-900">
              {step === 'details' ? 'Encrypted Archival Checkout' : 'Order Confirmation'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 text-neutral-400 hover:text-black rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'details' ? (
          <form onSubmit={handlePlaceOrder} className="p-6 space-y-4 text-xs">
            {/* Items summary */}
            <div className="bg-neutral-50 p-3.5 rounded-xl border border-neutral-200 space-y-2">
              <div className="flex justify-between font-semibold text-neutral-900">
                <span>Total Items ({items.reduce((s, i) => s + i.quantity, 0)})</span>
                <span className="font-mono text-sm">${total.toFixed(2)}</span>
              </div>
              <p className="text-[11px] text-emerald-700 font-medium">
                ✓ Complimentary Worldwide Carbon-Neutral Express Included
              </p>
            </div>

            {/* Shipping Address Inputs */}
            <div className="space-y-2">
              <span className="font-bold uppercase tracking-wider text-neutral-700 text-[10px]">
                Shipping Destination
              </span>
              <input
                type="text"
                placeholder="Full Name"
                defaultValue="Elena Chen"
                required
                className="w-full bg-neutral-50 border border-neutral-200 px-3 py-2 rounded-lg text-neutral-900 focus:outline-hidden focus:border-neutral-900"
              />
              <input
                type="text"
                placeholder="Street Address"
                defaultValue="428 Broome Street, Apt 4B"
                required
                className="w-full bg-neutral-50 border border-neutral-200 px-3 py-2 rounded-lg text-neutral-900 focus:outline-hidden focus:border-neutral-900"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="City"
                  defaultValue="New York"
                  required
                  className="w-full bg-neutral-50 border border-neutral-200 px-3 py-2 rounded-lg text-neutral-900 focus:outline-hidden focus:border-neutral-900"
                />
                <input
                  type="text"
                  placeholder="Postal Code"
                  defaultValue="10013"
                  required
                  className="w-full bg-neutral-50 border border-neutral-200 px-3 py-2 rounded-lg text-neutral-900 focus:outline-hidden focus:border-neutral-900"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-2 pt-2">
              <span className="font-bold uppercase tracking-wider text-neutral-700 text-[10px]">
                Payment Method
              </span>
              <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-5 bg-neutral-900 text-white text-[9px] font-mono font-bold flex items-center justify-center rounded">
                    VISA
                  </div>
                  <span className="font-mono text-neutral-700">•••• 8824</span>
                </div>
                <span className="text-[11px] text-neutral-500 font-medium">Exp 09/28</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-neutral-950 hover:bg-black text-white text-xs font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer mt-4"
            >
              <span>Authorize &amp; Complete Order • ${total.toFixed(2)}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <div className="p-8 text-center space-y-4">
            <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
            <div>
              <h4 className="text-lg font-extrabold text-neutral-900">
                Archival Order Registered
              </h4>
              <p className="text-xs text-neutral-500 mt-1 font-mono font-semibold">
                Reference: {orderNumber}
              </p>
            </div>
            <p className="text-xs text-neutral-600 max-w-sm mx-auto leading-relaxed">
              Your pieces have been allocated from our Copenhagen studio. A dispatch docket with continuous climate-neutral courier tracking has been sent to your email.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
              <button
                id="checkout-track-new-order-btn"
                onClick={() => {
                  onClose();
                  onTrackOrder?.(orderNumber);
                }}
                className="w-full sm:w-auto bg-neutral-950 hover:bg-black text-white text-xs font-bold py-2.5 px-6 rounded-xl transition-all shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Track Real-Time Dispatch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onClose}
                className="w-full sm:w-auto bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold py-2.5 px-5 rounded-xl transition-colors cursor-pointer"
              >
                Return to Atelier
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
