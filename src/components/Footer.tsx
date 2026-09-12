import React, { useState } from 'react';
import { AtelierLogo } from './AtelierLogo';
import { ArrowRight, Check } from 'lucide-react';

interface FooterProps {
  onNavigateSection?: (sectionId: string) => void;
  onOpenHelp?: () => void;
  onOpenOrderStatus?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateSection,
  onOpenHelp,
  onOpenOrderStatus,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer id="atelier-main-footer" className="bg-[#F8F9FA] border-t border-neutral-200 pt-16 pb-12 text-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Multi-column Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-neutral-200/80">
          
          {/* Column 1: Brand & Contact Info (approx 4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <AtelierLogo size="md" />
            
            <p className="text-xs text-neutral-600 leading-relaxed pr-6 max-w-sm">
              An archival retail environment curating architectural living, contemporary utility apparel, and disciplined craftsmanship for discerning collectors.
            </p>

            <div className="space-y-1.5 text-xs text-neutral-600 pt-2">
              <p>
                <span className="font-semibold text-neutral-800">Private Concierge:</span>{' '}
                <a href="mailto:concierge@atelier-commerce.com" className="hover:text-blue-600 underline underline-offset-2">
                  concierge@atelier-commerce.com
                </a>
              </p>
              <p>
                <span className="font-semibold text-neutral-800">Direct Studio:</span> +1 (800) 412-8890
              </p>
              <p className="text-[11px] text-neutral-500">
                Mon – Fri, 09:00 – 18:00 EST
              </p>
            </div>

            {/* Environmental pill */}
            <div className="inline-flex items-center gap-2 bg-neutral-100 border border-neutral-200/70 px-3 py-1 rounded-full text-[11px] text-neutral-700 font-medium mt-3">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span>100% Carbon Neutral Shipping &amp; Ethical Sourcing</span>
            </div>
          </div>

          {/* Column 2: SHOP (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
              SHOP
            </h4>
            <ul className="space-y-2 text-xs text-neutral-600">
              <li>
                <button onClick={() => onNavigateSection?.('disciplined-craft-section')} className="hover:text-black transition-colors cursor-pointer">
                  New Arrivals
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection?.('best-sellers-section')} className="hover:text-black transition-colors cursor-pointer">
                  Best Sellers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection?.('curated-departments-section')} className="hover:text-black transition-colors cursor-pointer">
                  Apparel
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection?.('curated-departments-section')} className="hover:text-black transition-colors cursor-pointer">
                  Footwear
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection?.('curated-departments-section')} className="hover:text-black transition-colors cursor-pointer">
                  Objects
                </button>
              </li>
              <li>
                <button onClick={onOpenHelp} className="hover:text-black transition-colors cursor-pointer">
                  Gift Cards
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: CUSTOMER CARE (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
              CUSTOMER CARE
            </h4>
            <ul className="space-y-2 text-xs text-neutral-600">
              <li>
                <button
                  id="footer-order-tracking-btn"
                  onClick={onOpenOrderStatus || onOpenHelp}
                  className="hover:text-black transition-colors cursor-pointer"
                >
                  Order Tracking
                </button>
              </li>
              <li>
                <button onClick={onOpenHelp} className="hover:text-black transition-colors cursor-pointer">
                  Shipping &amp; Returns
                </button>
              </li>
              <li>
                <button onClick={onOpenHelp} className="hover:text-black transition-colors cursor-pointer">
                  Size Guide
                </button>
              </li>
              <li>
                <button onClick={onOpenHelp} className="hover:text-black transition-colors cursor-pointer">
                  FAQs
                </button>
              </li>
              <li>
                <button onClick={onOpenHelp} className="hover:text-black transition-colors cursor-pointer">
                  Contact Concierge
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: COMPANY (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
              COMPANY
            </h4>
            <ul className="space-y-2 text-xs text-neutral-600">
              <li>
                <button onClick={() => onNavigateSection?.('artisan-residency-section')} className="hover:text-black transition-colors cursor-pointer">
                  Our Philosophy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection?.('trust-guarantees-section')} className="hover:text-black transition-colors cursor-pointer">
                  Ethical Sourcing
                </button>
              </li>
              <li>
                <button onClick={onOpenHelp} className="hover:text-black transition-colors cursor-pointer">
                  Careers
                </button>
              </li>
              <li>
                <button onClick={onOpenHelp} className="hover:text-black transition-colors cursor-pointer">
                  Press
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection?.('artisan-residency-section')} className="hover:text-black transition-colors cursor-pointer">
                  Sustainability
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: CURATED DISPATCH Newsletter (approx 2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
              CURATED DISPATCH
            </h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Subscribe for 10% off your first curation and seasonal previews.
            </p>

            {subscribed ? (
              <div className="bg-emerald-50 text-emerald-800 p-2.5 rounded-lg text-xs font-medium flex items-center gap-1.5 border border-emerald-200">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Welcome to the Archive. Code dispatched to your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="w-full bg-white border border-neutral-200 px-3 py-2 text-xs rounded-md text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:border-neutral-900"
                />
                <button
                  type="submit"
                  className="w-full bg-neutral-950 hover:bg-black text-white text-xs font-semibold py-2 px-3 rounded-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Join Archive</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            {/* Encrypted Checkout tags */}
            <div className="pt-2">
              <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider block mb-1.5">
                Encrypted Checkout
              </span>
              <div className="flex flex-wrap gap-1">
                {['APPLE PAY', 'VISA', 'MASTERCARD', 'AMEX', 'PAYPAL'].map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-mono font-semibold bg-neutral-100 text-neutral-600 px-1.5 py-0.5 rounded border border-neutral-200/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© 2025 Atelier Commerce Inc. All archival editions reserved.</p>
          <div className="flex items-center gap-5">
            <button onClick={onOpenHelp} className="hover:text-neutral-800 transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <button onClick={onOpenHelp} className="hover:text-neutral-800 transition-colors cursor-pointer">
              Terms of Service
            </button>
            <button onClick={onOpenHelp} className="hover:text-neutral-800 transition-colors cursor-pointer">
              Cookie Preferences
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
