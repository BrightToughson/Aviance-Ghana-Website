import React, { useState, useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import { PARTNERS_DATA, AuthenticPartner } from '../../data/partnersData';
import { useSwipeGesture } from '../../hooks/useSwipeGesture';

interface PartnerRadarWebProps {
  onNavigate: (path: string) => void;
}

type PartnerTab = 'all' | 'international' | 'regional' | 'cargo' | 'executive';

interface TabItem {
  id: PartnerTab;
  label: string;
}

const TABS: TabItem[] = [
  { id: 'all', label: 'All Partners (42)' },
  { id: 'international', label: 'International Commercial' },
  { id: 'regional', label: 'Regional & African' },
  { id: 'cargo', label: 'Cargo & Freighters' },
  { id: 'executive', label: 'VIP & Charter' },
];

// Curated International Carrier IDs for priority display
const INTERNATIONAL_IDS = ['ba', 'dl', 'ek', 'kl', 'qr', 'ua', 'tap', 'brussels', 'mea', 'egyptair'];
const REGIONAL_IDS = ['et', 'awa', 'rwandair', 'kenya-airways', 'asky', 'flynas', 'ibom'];

export const PartnerRadarWeb: React.FC<PartnerRadarWebProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<PartnerTab>('all');

  const tabKeys: PartnerTab[] = ['all', 'international', 'regional', 'cargo', 'executive'];
  const { handlers: radarSwipeHandlers } = useSwipeGesture({
    onSwipeLeft: () => {
      const currIdx = tabKeys.indexOf(activeTab);
      setActiveTab(tabKeys[(currIdx + 1) % tabKeys.length]);
    },
    onSwipeRight: () => {
      const currIdx = tabKeys.indexOf(activeTab);
      setActiveTab(tabKeys[(currIdx === 0 ? tabKeys.length - 1 : currIdx - 1)]);
    },
    threshold: 40,
    enableMouseDrag: true,
  });

  // Filter partners according to selected tab
  const filteredPartners = useMemo(() => {
    switch (activeTab) {
      case 'international':
        return PARTNERS_DATA.filter((p) => INTERNATIONAL_IDS.includes(p.id));
      case 'regional':
        return PARTNERS_DATA.filter((p) => REGIONAL_IDS.includes(p.id));
      case 'cargo':
        return PARTNERS_DATA.filter((p) => p.category === 'Cargo & Freighters');
      case 'executive':
        return PARTNERS_DATA.filter(
          (p) => p.category === 'Executive & Charter' || p.category === 'Government & Diplomatic'
        );
      case 'all':
      default:
        return PARTNERS_DATA;
    }
  }, [activeTab]);

  // Split into Track 1 and Track 2 for the dual-track rolling marquee
  const { track1, track2 } = useMemo(() => {
    const t1: AuthenticPartner[] = [];
    const t2: AuthenticPartner[] = [];

    filteredPartners.forEach((p, idx) => {
      if (idx % 2 === 0) {
        t1.push(p);
      } else {
        t2.push(p);
      }
    });

    // Ensure enough items so continuous scrolling never has empty gaps
    const ensureRepeat = (arr: AuthenticPartner[], minCount: number) => {
      if (arr.length === 0) return PARTNERS_DATA.slice(0, minCount);
      let res = [...arr];
      while (res.length < minCount) {
        res = [...res, ...arr];
      }
      return res;
    };

    return {
      track1: ensureRepeat(t1, 10),
      track2: ensureRepeat(t2.length > 0 ? t2 : t1, 10),
    };
  }, [filteredPartners]);

  return (
    <section className="relative w-full py-4 sm:py-6 select-none bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header: Clean, Human & Corporate (Directly on Page Canvas) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6 sm:mb-8 pb-5 border-b border-slate-200/80">
          <div className="space-y-2.5 max-w-2xl text-left">

            {/* Main Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 leading-[1.2]">
              Trusted Ground Handling Partner to Over 40 Global Airlines
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              From scheduled daily wide-body passenger services to international cold-chain cargo freighters, Aviance Ghana is the certified handling agent of choice across Accra, Kumasi, and Tamale.
            </p>
          </div>

          {/* Right: Quick Action to Customer Airlines Page */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('/customers')}
              className="btn-link group"
            >
              <span className="link-label">View All 42 Partners</span>
              <ArrowRight className="w-4 h-4 text-[#72BF44] group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Category Filter Tabs (Modern Executive Rounded-Full Pills) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 sm:mb-6 scrollbar-none">
          {TABS.map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-300 cursor-pointer hover:-translate-y-0.5 active:scale-95 ${
                  isSelected
                    ? 'bg-[#204696] text-white shadow-md shadow-[#204696]/20'
                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200/90 shadow-2xs'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ====================================================
            DUAL-TRACK SMOOTH ROLLING MARQUEE RIBBONS WITH GESTURES
            ==================================================== */}
        <div
          {...radarSwipeHandlers}
          className="relative w-full overflow-hidden my-2 sm:my-3 rounded-2xl group select-none cursor-grab active:cursor-grabbing"
        >
          
          {/* Left & Right Smooth Edge Fade Masks (Fade seamlessly to white page background) */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

          {/* TRACK 1: Rolling Smoothly to Left */}
          <div className="flex w-max space-x-4 sm:space-x-5 animate-marquee-left pause-hover py-1.5">
            {[...track1, ...track1].map((partner, index) => {
              return (
                <div
                  key={`track1-${partner.id}-${index}`}
                  onClick={() => onNavigate('/customers')}
                  className="w-[190px] sm:w-[220px] h-[92px] sm:h-[102px] bg-white rounded-2xl transition-all duration-300 p-3.5 flex flex-col items-center justify-center cursor-pointer select-none shrink-0 group/card border border-slate-200/90 hover:border-[#204696] hover:shadow-md hover:scale-[1.02]"
                >
                  {/* Airline Logo Display */}
                  <div className="h-9 sm:h-10 w-full flex items-center justify-center p-0.5">
                    <img
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      className="max-h-full max-w-full object-contain filter grayscale group-hover/card:grayscale-0 transition-all duration-300"
                      loading="lazy"
                    />
                  </div>
                  {/* Airline Name */}
                  <span className="text-[11px] sm:text-xs font-bold truncate max-w-full mt-1.5 text-slate-700 group-hover/card:text-[#204696] transition-colors">
                    {partner.name}
                  </span>
                </div>
              );
            })}
          </div>

          {/* TRACK 2: Rolling Smoothly to Right */}
          <div className="flex w-max space-x-4 sm:space-x-5 animate-marquee-right pause-hover py-1.5">
            {[...track2, ...track2].map((partner, index) => {
              return (
                <div
                  key={`track2-${partner.id}-${index}`}
                  onClick={() => onNavigate('/customers')}
                  className="w-[190px] sm:w-[220px] h-[92px] sm:h-[102px] bg-white rounded-2xl transition-all duration-300 p-3.5 flex flex-col items-center justify-center cursor-pointer select-none shrink-0 group/card border border-slate-200/90 hover:border-[#204696] hover:shadow-md hover:scale-[1.02]"
                >
                  {/* Airline Logo Display */}
                  <div className="h-9 sm:h-10 w-full flex items-center justify-center p-0.5">
                    <img
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      className="max-h-full max-w-full object-contain filter grayscale group-hover/card:grayscale-0 transition-all duration-300"
                      loading="lazy"
                    />
                  </div>
                  {/* Airline Name */}
                  <span className="text-[11px] sm:text-xs font-bold truncate max-w-full mt-1.5 text-slate-700 group-hover/card:text-[#204696] transition-colors">
                    {partner.name}
                  </span>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
