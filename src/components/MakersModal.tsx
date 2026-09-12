import React from 'react';
import { X, ArrowRight, Award, Compass, Sparkles } from 'lucide-react';
import { DISCIPLINED_CRAFT_PRODUCTS } from '../data/mockData';
import { Product } from '../types';

interface MakersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const MakersModal: React.FC<MakersModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  const residencyProducts = DISCIPLINED_CRAFT_PRODUCTS.slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" id="makers-editorial-modal">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200 max-h-[85vh] flex flex-col">
        
        {/* Header Banner */}
        <div className="relative bg-neutral-950 text-white p-8 sm:p-10 shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-blue-400 uppercase font-bold">
              RESIDENCY VOL. 07 • ARCHIVAL FELLOWSHIP
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              The Artisan Residency Series: Preserving Tactile Memory
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 font-editorial italic">
              "Every curve tells a story of patience, raw geological elements, and inherited human technique."
            </p>
          </div>
        </div>

        {/* Scrollable Editorial Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6 text-neutral-800 text-xs sm:text-sm leading-relaxed">
          
          {/* Fellows Bio */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center bg-neutral-50 p-5 rounded-2xl border border-neutral-200/80">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop"
              alt="Kenji &amp; Elena Sato"
              className="w-full aspect-square object-cover rounded-xl border border-neutral-200"
              referrerPolicy="no-referrer"
            />
            <div className="sm:col-span-2 space-y-2">
              <h3 className="text-base font-extrabold text-neutral-900">
                Kenji &amp; Elena Sato
              </h3>
              <p className="text-xs text-neutral-500 font-medium">
                Kyoto &amp; Milan • Founding Fellows, Atelier Kōbō Residency
              </p>
              <p className="text-xs text-neutral-600 leading-normal pt-1">
                Combining 3rd-generation Seto ceramic firing methodologies with Milanese structural tailoring, the duo spends 6 months per year working in remote craft enclaves, producing strictly limited seasonal batches.
              </p>
            </div>
          </div>

          {/* Environmental Commitments */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-neutral-100/70 border border-neutral-200/60">
              <Compass className="w-4 h-4 text-blue-600 mb-1.5" />
              <h4 className="text-xs font-bold text-neutral-900">Hyper-Local Sourcing</h4>
              <p className="text-[11px] text-neutral-600 mt-0.5">
                Clays and untreated wools harvested within 50 miles of each respective studio.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-neutral-100/70 border border-neutral-200/60">
              <Award className="w-4 h-4 text-blue-600 mb-1.5" />
              <h4 className="text-xs font-bold text-neutral-900">Zero-Waste Kilns</h4>
              <p className="text-[11px] text-neutral-600 mt-0.5">
                100% solar and scrap-timber firing with recycled water systems.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-neutral-100/70 border border-neutral-200/60">
              <Sparkles className="w-4 h-4 text-blue-600 mb-1.5" />
              <h4 className="text-xs font-bold text-neutral-900">Archival Registry</h4>
              <p className="text-[11px] text-neutral-600 mt-0.5">
                Each piece stamped with edition sequence and physical provenance certificates.
              </p>
            </div>
          </div>

          {/* Featured Residency Pieces */}
          <div className="pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
              Residency Works Available in Current Edition
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {residencyProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    onSelectProduct(p);
                    onClose();
                  }}
                  className="flex items-center gap-3 p-3 rounded-xl border border-neutral-200 hover:border-neutral-400 transition-colors cursor-pointer group bg-white"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-14 h-16 object-cover rounded-lg bg-neutral-100 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-neutral-400 font-semibold uppercase">{p.brand}</p>
                    <h5 className="text-xs font-bold text-neutral-900 truncate group-hover:text-blue-600">
                      {p.name}
                    </h5>
                    <p className="text-xs font-mono font-bold text-neutral-900 mt-0.5">${p.price}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-black shrink-0" />
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
