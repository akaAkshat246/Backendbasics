import React, { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface AnnouncementBarProps {
  onOpenHelp: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onOpenHelp }) => {
  const [copied, setCopied] = useState(false);
  const [currency, setCurrency] = useState('USD ($)');
  const [currencyOpen, setCurrencyOpen] = useState(false);

  const copyPromo = () => {
    navigator.clipboard?.writeText('ATELIER25');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currencies = ['USD ($)', 'EUR (€)', 'GBP (£)', 'JPY (¥)', 'CAD ($)'];

  return (
    <div
      id="atelier-announcement-bar"
      className="bg-black text-white text-[11px] md:text-[12px] py-2 px-4 border-b border-neutral-800 tracking-wide select-none"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left edition marker */}
        <div className="hidden lg:flex items-center gap-2 text-neutral-400 font-medium">
          <span className="tracking-wider">ARCHIVAL COMMERCE</span>
          <span>•</span>
          <span className="text-neutral-300">EDITION Nº 24</span>
        </div>

        {/* Center promotional notice with click-to-copy promo code */}
        <div className="flex-1 text-center font-normal text-neutral-200 truncate px-2">
          <span>Complimentary worldwide express shipping on orders over $150 — Code: </span>
          <button
            id="copy-promo-code-btn"
            onClick={copyPromo}
            className="inline-flex items-center gap-1 font-bold text-white hover:text-blue-300 transition-colors cursor-pointer border-b border-white/40 pb-0.5 ml-1"
            title="Click to copy code"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-300">COPIED</span>
              </>
            ) : (
              <span>ATELIER25</span>
            )}
          </button>
        </div>

        {/* Right utility options */}
        <div className="flex items-center gap-4 text-neutral-300">
          <div className="relative">
            <button
              id="currency-selector-btn"
              onClick={() => setCurrencyOpen(!currencyOpen)}
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer font-medium"
            >
              <span>{currency}</span>
              <ChevronDown className="w-3 h-3 text-neutral-400" />
            </button>

            {currencyOpen && (
              <div className="absolute right-0 top-full mt-1 bg-neutral-900 border border-neutral-700 rounded-md shadow-xl py-1 z-50 min-w-[90px]">
                {currencies.map((curr) => (
                  <button
                    key={curr}
                    onClick={() => {
                      setCurrency(curr);
                      setCurrencyOpen(false);
                    }}
                    className={`block w-full text-left px-3 py-1.5 text-xs hover:bg-neutral-800 transition-colors ${
                      currency === curr ? 'text-blue-400 font-semibold' : 'text-neutral-300'
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            id="help-modal-trigger"
            onClick={onOpenHelp}
            className="hover:text-white transition-colors cursor-pointer font-medium"
          >
            Help
          </button>
        </div>
      </div>
    </div>
  );
};
