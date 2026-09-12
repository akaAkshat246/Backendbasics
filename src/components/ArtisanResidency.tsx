import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ArtisanResidencyProps {
  onMeetMakers: () => void;
}

export const ArtisanResidency: React.FC<ArtisanResidencyProps> = ({ onMeetMakers }) => {
  const workshopImage = 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=1200&auto=format&fit=crop';
  const authorAvatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop';

  return (
    <section id="artisan-residency-section" className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Large Dark Rounded Card */}
        <div className="bg-neutral-950 text-white rounded-3xl overflow-hidden shadow-2xl border border-neutral-900 grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Column: Narrative Content (approx 6 cols) */}
          <div className="lg:col-span-6 p-8 sm:p-12 lg:p-14 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2.5 text-xs text-neutral-400 font-mono tracking-wider">
                <span className="bg-neutral-800 text-neutral-200 px-2.5 py-1 rounded text-[11px] font-semibold">
                  RESIDENCY VOL. 07
                </span>
                <span>Kyoto / Milan</span>
              </div>

              {/* Title */}
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-white leading-[1.12]">
                The Artisan Residency Series: Preserving Tactile Memory
              </h2>

              {/* Editorial Quote */}
              <blockquote className="font-editorial italic text-neutral-300 text-lg sm:text-xl leading-relaxed border-l-2 border-neutral-800 pl-4 py-1">
                “When a craftsman honors the grain of raw wood or the unpredictability of clay in the kiln, an object transitions from mere merchandise into a generational relic.”
              </blockquote>
            </div>

            {/* Author Attribution & CTA */}
            <div className="space-y-6 pt-4 border-t border-neutral-900">
              <div className="flex items-center gap-3.5">
                <img
                  src={authorAvatar}
                  alt="Kenji &amp; Elena Sato"
                  className="w-11 h-11 rounded-full object-cover border border-neutral-700"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-sm font-bold text-white tracking-wide">
                    Kenji &amp; Elena Sato
                  </h4>
                  <p className="text-xs text-neutral-400">
                    Founding Fellows, Atelier Kōbō Residency
                  </p>
                </div>
              </div>

              <div>
                <button
                  id="meet-the-makers-btn"
                  onClick={onMeetMakers}
                  className="inline-flex items-center gap-2 bg-white text-neutral-950 hover:bg-neutral-100 px-6 py-3 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all shadow-md cursor-pointer group"
                >
                  <span>Meet the Makers</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Workshop Photography & Studio Footprint (approx 6 cols) */}
          <div className="lg:col-span-6 relative min-h-[360px] lg:min-h-full">
            <img
              src={workshopImage}
              alt="Artisan ceramic studio workshop in Kyoto"
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />

            {/* Gradient overlay for contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent pointer-events-none" />

            {/* Studio Footprint Badge */}
            <div className="absolute bottom-6 right-6 left-6 sm:left-auto sm:max-w-xs z-10">
              <div className="bg-neutral-900/90 backdrop-blur-md border border-neutral-700/60 rounded-xl p-3.5 text-xs text-neutral-300 shadow-xl">
                <div className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 font-bold mb-1">
                  STUDIO FOOTPRINT
                </div>
                <p className="text-neutral-200 text-xs leading-snug">
                  100% renewable solar-fired kilns &amp; zero wastewater disposal.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
