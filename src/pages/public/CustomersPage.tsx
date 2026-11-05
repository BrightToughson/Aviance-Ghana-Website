import React, { useState, useMemo } from 'react';
import {
  Plane,
  ArrowLeft,
  Building2,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { CustomerPartner } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { PARTNERS_DATA, AuthenticPartner } from '../../data/partnersData';

interface CustomersPageProps {
  customers?: CustomerPartner[];
  onNavigate: (path: string) => void;
}

export const CustomersPage: React.FC<CustomersPageProps> = ({ onNavigate }) => {
  const { isLight } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Partners', count: PARTNERS_DATA.length },
    { id: 'Commercial Airlines', label: 'Commercial Airlines', count: PARTNERS_DATA.filter((p) => p.category === 'Commercial Airlines').length },
    { id: 'Cargo & Freighters', label: 'Cargo & Freighters', count: PARTNERS_DATA.filter((p) => p.category === 'Cargo & Freighters').length },
    { id: 'Executive & Charter', label: 'Executive & Charter', count: PARTNERS_DATA.filter((p) => p.category === 'Executive & Charter').length },
    { id: 'Government & Diplomatic', label: 'Government & Diplomatic', count: PARTNERS_DATA.filter((p) => p.category === 'Government & Diplomatic').length }
  ];

  const filteredPartners = useMemo(() => {
    if (selectedCategory === 'all') return PARTNERS_DATA;
    return PARTNERS_DATA.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="pb-24 sm:pb-32 space-y-16 sm:space-y-24 bg-white">
      {/* Hero Header */}
      <div className="py-14 sm:py-20 lg:py-24 text-center border-b border-slate-200/90 relative overflow-hidden bg-gradient-to-b from-blue-50/40 via-white to-slate-50/60">
        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4">
          <button
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#204696] hover:text-[#009EE0] transition-colors mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </button>

          <div className="flex items-center justify-center gap-2.5">
            <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-[#204696] via-[#009EE0] to-[#72BF44]" />
            <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#204696]">
              Airline & Aviation Partners <span className="text-[#009EE0]">·</span> <span className="text-[#3B7A1C]">Official Directory</span>
            </h2>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Partnerships That Keep Aviation Moving
          </h1>

          <p className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed text-slate-600">
            Aviance Ghana is proud to partner with leading international scheduled carriers, cargo freighters, executive flight support networks, and government defense airlift missions across Kotoka (ACC), Prempeh I Kumasi (KMS), and Tamale (TML).
          </p>

          {/* Quick Metrics Strip */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-[11px] font-medium text-slate-500 block">Total Partners</span>
              <span className="text-xl font-extrabold text-[#204696]">42 Operators</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-[11px] font-medium text-slate-500 block">Scheduled Passenger</span>
              <span className="text-xl font-extrabold text-[#009EE0]">17 Airlines</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-[11px] font-medium text-slate-500 block">Cargo Market Share</span>
              <span className="text-xl font-extrabold text-[#72BF44]">~60% National</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-[11px] font-medium text-slate-500 block">Audited Standard</span>
              <span className="text-xl font-extrabold text-slate-900">IATA ISAGO</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Category Filter Controls */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  selectedCategory === c.id
                    ? 'bg-[#204696] text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span>{c.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    selectedCategory === c.id
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {c.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>
            Showing <strong className="text-slate-900 font-bold">{filteredPartners.length}</strong> of {PARTNERS_DATA.length} verified aviation partners
          </span>
        </div>

        {/* Airline & Customer Partners Grid with Large Logos & Simple Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPartners.map((airline) => (
            <div
              key={airline.id}
              className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:border-[#204696] hover:shadow-xl group relative overflow-hidden"
            >
              {/* Top Accent Stripe on hover */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#204696] via-[#009EE0] to-[#72BF44] opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Big, Clear Authentic Partner Logo - Fully Shown */}
                <div className="h-28 sm:h-32 w-full rounded-2xl bg-slate-50/70 border border-slate-200/70 p-3 sm:p-4 flex items-center justify-center mb-5 group-hover:bg-blue-50/30 group-hover:border-[#204696]/30 transition-all">
                  <img
                    src={airline.logo}
                    alt={`${airline.name} logo`}
                    className="max-h-full max-w-full w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-xs"
                    loading="lazy"
                  />
                </div>

                {/* Simple, Engaging Partner Content */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#204696] transition-colors">
                      {airline.name}
                    </h3>
                    <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/80 shrink-0">
                      {airline.category.replace(' & ', ' · ')}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                    {airline.description}
                  </p>
                </div>
              </div>

              {/* Simple Footer: Official Website */}
              {airline.website && (
                <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400 font-medium">Official Airline Partner</span>
                  <a
                    href={airline.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#204696] hover:text-[#009EE0] flex items-center gap-1 transition-colors"
                  >
                    <span>Visit Official Website</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty Category Fallback */}
        {filteredPartners.length === 0 && (
          <div className="p-12 text-center rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
            <Plane className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No matching partners found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              We couldn’t find any partners in this category. Try selecting another category or viewing all partners.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
              }}
              className="px-4 py-2 rounded-xl bg-[#204696] text-white text-xs font-bold shadow-xs cursor-pointer"
            >
              View All Partners
            </button>
          </div>
        )}

        {/* Partnership Inquiry Callout with Signature Tri-Color Accent */}
        <div className="p-8 sm:p-10 rounded-3xl border border-slate-200/90 bg-white text-center max-w-3xl mx-auto space-y-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#204696] via-[#009EE0] to-[#72BF44]" />

          <Building2 className="w-8 h-8 mx-auto text-[#204696]" />
          
          <h3 className="text-2xl font-extrabold text-slate-900">
            Commence Flight Operations into Ghana
          </h3>
          
          <p className="text-xs sm:text-sm max-w-xl mx-auto leading-relaxed text-slate-600">
            Planning scheduled passenger, dedicated freighter, diplomatic, or ad-hoc charter flights to Accra, Kumasi, or Tamale? Aviance Ghana provides comprehensive Standard Ground Handling Agreement (SGHA) Annex B proposals tailored precisely to your flight schedule.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('/contact')}
              className="px-6 py-3 rounded-xl bg-[#204696] hover:bg-[#153170] text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Contact Commercial Aviation Team</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('/services')}
              className="px-6 py-3 rounded-xl border border-slate-200 hover:border-[#204696] text-slate-700 hover:text-[#204696] font-bold text-xs bg-slate-50 hover:bg-white transition-all cursor-pointer"
            >
              <span>Explore All 8 Core Ground Services</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
