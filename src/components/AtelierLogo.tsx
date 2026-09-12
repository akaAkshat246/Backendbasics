import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export const AtelierLogo: React.FC<LogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg tracking-tight font-extrabold',
    lg: 'text-2xl tracking-tight font-extrabold',
  };

  return (
    <div className={`inline-flex items-center gap-2.5 select-none cursor-pointer ${className}`} id="atelier-brand-logo">
      {/* Black rounded squircle with white triangle and blue dot inside */}
      <div
        className={`${iconSizes[size]} bg-black rounded-[9px] flex items-center justify-center p-1.5 shadow-sm transition-transform duration-200 hover:scale-[1.03] active:scale-95`}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* White rounded triangle */}
          <path
            d="M16 4.5L27 24.5C27.6 25.5 26.8 27 25.5 27H6.5C5.2 27 4.4 25.5 5 24.5L16 4.5Z"
            stroke="white"
            strokeWidth="3.2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          {/* Cobalt Blue Centered Dot */}
          <circle cx="16" cy="19.5" r="2.8" fill="#2563EB" />
        </svg>
      </div>

      {showText && (
        <span
          className={`${textSizes[size]} text-neutral-900 tracking-[0.04em] font-black uppercase font-sans`}
        >
          ATELIER
        </span>
      )}
    </div>
  );
};
