import React, { useState } from 'react';
import { X, Send, Check, MessageSquare, Phone, Clock, Truck, Shield, ArrowRight, Package } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenOrderStatus?: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose, onOpenOrderStatus }) => {
  const [activeTab, setActiveTab] = useState<'concierge' | 'shipping' | 'returns'>('concierge');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSent(true);
    setMessage('');
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="atelier-help-modal">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 border border-neutral-200 animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between p-5 border-b border-neutral-200">
          <div>
            <h3 className="text-base font-bold text-neutral-900">
              Atelier Private Concierge &amp; Care
            </h3>
            <p className="text-xs text-neutral-500">
              Direct assistance from our archival team in Copenhagen &amp; New York
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-black rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-neutral-200 bg-neutral-50 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('concierge')}
            className={`flex-1 py-3 text-center transition-colors cursor-pointer ${
              activeTab === 'concierge'
                ? 'bg-white text-neutral-900 border-b-2 border-neutral-900'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Direct Message
          </button>
          <button
            onClick={() => setActiveTab('shipping')}
            className={`flex-1 py-3 text-center transition-colors cursor-pointer ${
              activeTab === 'shipping'
                ? 'bg-white text-neutral-900 border-b-2 border-neutral-900'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Express Shipping
          </button>
          <button
            onClick={() => setActiveTab('returns')}
            className={`flex-1 py-3 text-center transition-colors cursor-pointer ${
              activeTab === 'returns'
                ? 'bg-white text-neutral-900 border-b-2 border-neutral-900'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Returns &amp; Provenance
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'concierge' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-xs bg-neutral-50 p-3.5 rounded-xl border border-neutral-200">
                <div className="flex items-center gap-2 text-neutral-700">
                  <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>+1 (800) 412-8890</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-700">
                  <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Mon-Fri 09:00-18:00 EST</span>
                </div>
              </div>

              {sent ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Your concierge inquiry has been logged. Senior curation specialist will respond within 2 hours.</span>
                </div>
              ) : (
                <form onSubmit={handleSend} className="space-y-3">
                  <label className="block text-xs font-semibold text-neutral-700">
                    How may our styling &amp; craft curators assist you today?
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Inquire about sizing, custom commissions, or edition provenance..."
                    required
                    className="w-full bg-white border border-neutral-200 rounded-xl p-3 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:border-neutral-900 resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full bg-neutral-900 hover:bg-black text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send to Private Concierge</span>
                  </button>
                </form>
              )}
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-4 text-xs text-neutral-600 leading-relaxed">
              <div className="flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <p>
                  <strong className="text-neutral-900">Complimentary Worldwide Express:</strong> Orders over $150 qualify automatically using code <strong className="text-neutral-900 font-mono">ATELIER25</strong> at checkout.
                </p>
              </div>
              <p>
                All dispatches are 100% carbon-offset through certified biochar and forestry reforestation partnerships. Delivery window: 2–4 business days within North America &amp; Europe, 3–6 business days worldwide.
              </p>

              {onOpenOrderStatus && (
                <div className="p-4 rounded-xl bg-neutral-900 text-white space-y-2.5 shadow-sm">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-blue-400" />
                    <span className="font-bold text-xs text-white">
                      Looking for an active dispatch?
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-300">
                    Track live shipping telemetry, customs status, and edition authenticity docket with your order number.
                  </p>
                  <button
                    id="help-modal-track-order-btn"
                    onClick={() => {
                      onClose();
                      onOpenOrderStatus();
                    }}
                    className="inline-flex items-center gap-1.5 bg-white text-neutral-900 font-bold px-3 py-1.5 rounded-lg text-xs hover:bg-neutral-100 transition-colors cursor-pointer"
                  >
                    <span>Track Order Status</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'returns' && (
            <div className="space-y-3 text-xs text-neutral-600 leading-relaxed">
              <div className="flex items-start gap-2.5">
                <Shield className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <p>
                  <strong className="text-neutral-900">30-Day Guaranteed Returns:</strong> If any handcrafted object or garment does not harmonize with your lifestyle, doorstep courier pickup will be arranged at zero cost.
                </p>
              </div>
              <p>
                Returned objects are inspected by our conservation team and re-entered into archival verification with provenance certificates intact.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
