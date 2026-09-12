import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Headphones } from 'lucide-react';

interface GuaranteesProps {
  onOpenConcierge?: () => void;
}

export const Guarantees: React.FC<GuaranteesProps> = ({ onOpenConcierge }) => {
  const perks = [
    {
      id: 'guarantee-shipping',
      icon: Truck,
      title: 'Free Express Shipping',
      description: 'Complimentary carbon-neutral dispatch across all orders over $150.',
    },
    {
      id: 'guarantee-returns',
      icon: RotateCcw,
      title: '30-Day Effortless Returns',
      description: 'Doorstep courier pickups and seamless exchanges guaranteed.',
    },
    {
      id: 'guarantee-materials',
      icon: ShieldCheck,
      title: '100% Certified Materials',
      description: 'GOTS organic, FSC certified timbers, and audited circular wools.',
    },
    {
      id: 'guarantee-concierge',
      icon: Headphones,
      title: 'Concierge Support',
      description: 'Direct access to our senior styling and archival curation team.',
      action: onOpenConcierge,
    },
  ];

  return (
    <section id="trust-guarantees-section" className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F8F9FB] rounded-2xl p-6 sm:p-8 border border-neutral-200/70 shadow-2xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {perks.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  id={item.id}
                  onClick={item.action}
                  className={`flex items-start gap-4 ${item.action ? 'cursor-pointer group' : ''}`}
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200/80 shadow-2xs flex items-center justify-center shrink-0 text-neutral-800 group-hover:text-blue-600 transition-colors">
                    <Icon className="w-5 h-5 stroke-[1.8]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-900 tracking-tight group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
