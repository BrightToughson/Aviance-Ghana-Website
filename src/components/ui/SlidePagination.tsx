import React from 'react';
import { useSwipeGesture } from '../../hooks/useSwipeGesture';

export interface SlidePaginationProps {
  current: number;
  total: number;
  onChange: (index: number) => void;
  className?: string;
  labels?: string[];
  variant?: 'light' | 'dark' | 'glass';
  size?: 'sm' | 'md';
}

/**
 * SlidePagination
 * Modern, executive numbered slide indicator capsule.
 * Replaces generic dot rows with a sleek aviation-grade segmented progress pill
 * showing the current index (e.g. 01), interactive segmented bars, and total count (e.g. / 08).
 */
export const SlidePagination: React.FC<SlidePaginationProps> = ({
  current,
  total,
  onChange,
  className = '',
  labels,
  variant = 'light',
  size = 'md'
}) => {
  if (total <= 1) return null;

  const { handlers } = useSwipeGesture({
    onSwipeLeft: () => onChange((current + 1) % total),
    onSwipeRight: () => onChange((current === 0 ? total - 1 : current - 1)),
    threshold: 20,
    enableMouseDrag: true,
  });

  const currentFormatted = String(current + 1).padStart(2, '0');
  const totalFormatted = String(total).padStart(2, '0');

  // Variant styling presets
  const variantStyles = {
    light: {
      container: 'bg-white/95 border-slate-200/90 text-slate-800 shadow-2xs',
      activeNumber: 'text-[#204696]',
      totalNumber: 'text-slate-400',
      activeBar: 'bg-gradient-to-r from-[#204696] to-[#009EE0] shadow-xs',
      inactiveBar: 'bg-slate-200 hover:bg-slate-300'
    },
    dark: {
      container: 'bg-slate-900/80 border-slate-700/80 text-white shadow-2xs backdrop-blur-sm',
      activeNumber: 'text-[#009EE0]',
      totalNumber: 'text-slate-400',
      activeBar: 'bg-gradient-to-r from-[#009EE0] to-[#72BF44] shadow-xs',
      inactiveBar: 'bg-slate-700 hover:bg-slate-600'
    },
    glass: {
      container: 'bg-white/20 border-white/30 text-white shadow-sm backdrop-blur-md',
      activeNumber: 'text-white font-bold',
      totalNumber: 'text-white/60',
      activeBar: 'bg-white shadow-xs',
      inactiveBar: 'bg-white/30 hover:bg-white/50'
    }
  }[variant];

  const sizeStyles = size === 'sm' ? {
    container: 'px-3 py-1 gap-2.5 text-[11px]',
    activeBar: 'w-6 h-1',
    inactiveBar: 'w-2 h-1',
    hitTarget: 'h-5'
  } : {
    container: 'px-4 py-1.5 gap-3 text-xs',
    activeBar: 'w-7 sm:w-8 h-1.5',
    inactiveBar: 'w-2.5 sm:w-3 h-1.5',
    hitTarget: 'h-6'
  };

  return (
    <div
      role="tablist"
      aria-label="Slide pagination"
      {...handlers}
      className={`inline-flex items-center rounded-full border transition-all duration-300 select-none cursor-grab active:cursor-grabbing ${variantStyles.container} ${sizeStyles.container} ${className}`}
    >
      {/* Current Slide Number (01) */}
      <span
        className={`font-numbers text-xs sm:text-[13px] font-bold tracking-tight tabular-nums select-none ${variantStyles.activeNumber}`}
        aria-hidden="true"
      >
        {currentFormatted}
      </span>

      {/* Interactive Segmented Progress Bars */}
      <div className="flex items-center gap-1.5">
        {Array.from({ length: total }).map((_, idx) => {
          const isActive = idx === current;
          const label = labels?.[idx] ? `Slide ${idx + 1}: ${labels[idx]}` : `Slide ${idx + 1}`;
          return (
            <button
              key={idx}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={label}
              onClick={() => onChange(idx)}
              className={`group relative flex items-center px-0.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#204696] rounded-full ${sizeStyles.hitTarget}`}
            >
              <span
                className={`rounded-full transition-all duration-300 ease-out ${
                  isActive
                    ? `${sizeStyles.activeBar} ${variantStyles.activeBar}`
                    : `${sizeStyles.inactiveBar} ${variantStyles.inactiveBar} group-hover:scale-105`
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Total Slides Count (/ 08) */}
      <div className="flex items-center gap-1 font-numbers text-xs font-medium tabular-nums select-none">
        <span className="text-slate-300 dark:text-slate-600 font-light" aria-hidden="true">
          /
        </span>
        <span className={`tracking-tight ${variantStyles.totalNumber}`} aria-hidden="true">
          {totalFormatted}
        </span>
      </div>
    </div>
  );
};

export default SlidePagination;
