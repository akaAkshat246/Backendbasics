import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight, Check, Sparkles, Plus, X, ShoppingBag, Eye } from 'lucide-react';
import { HERO_HOTSPOTS } from '../data/mockData';
import { Hotspot, Product } from '../types';

interface HeroProps {
  onExploreClick: () => void;
  onReadStoryClick: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onReadStoryClick,
  onSelectProduct,
  onAddToCart,
}) => {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  // Look Nº 04 Hero Image: Copenhagen studio session with model in wool trench coat in architectural Japandi living space
  const heroImageUrl = 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop';

  return (
    <section id="hero-curation-section" className="relative pt-6 pb-14 md:pt-10 md:pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Editorial Content (approx 5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-indigo-50/90 text-indigo-800 border border-indigo-100/80 px-3.5 py-1.5 rounded-full w-fit">
              <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0"></span>
              <span className="text-[11px] font-bold tracking-wider uppercase font-sans">
                AUTUMN / WINTER 2025 CURATION
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-[-0.03em] text-neutral-900 leading-[1.08]">
              Timeless Objects for Conscious Living
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
              Explore our Autumn/Winter curation crafted by independent global artisans and sustainable ateliers. Designed for enduring utility and quiet spatial elegance.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <button
                id="hero-explore-collection-btn"
                onClick={onExploreClick}
                className="inline-flex items-center gap-2 bg-neutral-950 text-white hover:bg-neutral-800 px-6 py-3.5 rounded-full text-sm font-semibold tracking-wide transition-all shadow-sm hover:shadow-md cursor-pointer group"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                id="hero-read-story-btn"
                onClick={onReadStoryClick}
                className="inline-flex items-center gap-1.5 bg-neutral-100 hover:bg-neutral-200/80 text-neutral-800 px-6 py-3.5 rounded-full text-sm font-medium tracking-wide transition-colors cursor-pointer"
              >
                <span>Read the story</span>
                <ArrowUpRight className="w-4 h-4 text-neutral-500" />
              </button>
            </div>

            {/* Value Propositions */}
            <div className="pt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-neutral-600 font-medium">
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-blue-600" />
                <span>Ethically Sourced</span>
              </div>
              <span className="text-neutral-300">•</span>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-blue-600" />
                <span>Carbon Neutral Delivery</span>
              </div>
              <span className="text-neutral-300">•</span>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Limited Editions</span>
              </div>
            </div>
          </div>

          {/* Right Photographic Feature with Hotspots & Badges (approx 7 cols) */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-neutral-100 aspect-[4/3] sm:aspect-[16/11] group">
              <img
                src={heroImageUrl}
                alt="Autumn Winter 2025 Curation - Archival Studio Session Copenhagen"
                className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-[1.01]"
                referrerPolicy="no-referrer"
              />

              {/* Subtle architectural vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

              {/* Hotspot 1: Living space / Sectional sofa */}
              <div
                className="absolute z-20"
                style={{ top: '35%', left: '38%' }}
              >
                <button
                  id="hotspot-sofa-btn"
                  onClick={() => setActiveHotspot(activeHotspot?.id === 'spot-1' ? null : HERO_HOTSPOTS[0])}
                  className="relative w-8 h-8 rounded-full bg-white/90 backdrop-blur-md text-neutral-900 flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer group"
                  aria-label="View living space item"
                >
                  <span className="absolute -inset-1 rounded-full bg-white/40 animate-ping pointer-events-none" />
                  <Plus className="w-4 h-4 transition-transform group-hover:rotate-45" />
                </button>
              </div>

              {/* Hotspot 2: Trench Coat on model */}
              <div
                className="absolute z-20"
                style={{ top: '55%', left: '72%' }}
              >
                <button
                  id="hotspot-coat-btn"
                  onClick={() => setActiveHotspot(activeHotspot?.id === 'spot-2' ? null : HERO_HOTSPOTS[1])}
                  className="relative w-8 h-8 rounded-full bg-white/90 backdrop-blur-md text-neutral-900 flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer group"
                  aria-label="View outerwear piece"
                >
                  <span className="absolute -inset-1 rounded-full bg-white/40 animate-ping pointer-events-none" />
                  <Plus className="w-4 h-4 transition-transform group-hover:rotate-45" />
                </button>
              </div>

              {/* Active Hotspot Preview Popover */}
              {activeHotspot && (
                <div
                  className="absolute z-30 bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-2xl border border-neutral-200/80 w-64 animate-in fade-in zoom-in-95 duration-150"
                  style={{
                    top: activeHotspot.id === 'spot-1' ? '42%' : '48%',
                    left: activeHotspot.id === 'spot-1' ? '28%' : '50%',
                  }}
                >
                  <div className="flex items-start justify-between gap-2 pb-2 border-b border-neutral-150">
                    <div>
                      <p className="text-xs font-bold text-neutral-900">{activeHotspot.title}</p>
                      <p className="text-[11px] text-neutral-500">{activeHotspot.subtitle}</p>
                    </div>
                    <button
                      onClick={() => setActiveHotspot(null)}
                      className="text-neutral-400 hover:text-black p-0.5 rounded"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-sm font-extrabold text-neutral-900">
                      ${activeHotspot.price}
                    </span>
                    <button
                      onClick={() => {
                        onExploreClick();
                        setActiveHotspot(null);
                      }}
                      className="bg-neutral-900 hover:bg-black text-white text-xs font-semibold px-3 py-1.5 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3 h-3" />
                      <span>View</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Bottom Left Overlay Badge */}
              <div className="absolute bottom-4 left-4 z-10">
                <div className="bg-white/90 backdrop-blur-md text-neutral-800 text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase px-3.5 py-1.5 rounded-full shadow-sm border border-white/60">
                  LOOK Nº 04 • Archival Studio Session, Copenhagen
                </div>
              </div>

              {/* Bottom Right Handcrafted Batch Counter Card */}
              <div className="absolute bottom-4 right-4 z-10">
                <div className="bg-white/95 backdrop-blur-md text-neutral-900 text-xs px-4 py-2.5 rounded-xl shadow-lg border border-white/60 min-w-[140px]">
                  <div className="flex items-center justify-between gap-3 text-[11px] text-neutral-500 font-medium">
                    <span>Handcrafted batch</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                  </div>
                  <div className="flex items-baseline justify-between pt-0.5">
                    <span className="text-sm font-extrabold tracking-tight text-neutral-900 font-mono">
                      18/50
                    </span>
                    <span className="text-[10px] text-neutral-400 font-medium">Verified provenance</span>
                  </div>
                  <div className="w-full bg-neutral-200 h-1 rounded-full mt-1.5 overflow-hidden">
                    <div className="bg-neutral-900 h-full rounded-full w-[36%]" />
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
