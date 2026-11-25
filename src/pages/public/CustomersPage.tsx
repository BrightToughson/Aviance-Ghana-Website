import React, { useState, useMemo } from 'react';
import {
  Plane,
  ArrowLeft,
  Building2,
  ArrowRight,
  ExternalLink,
  Sparkles
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

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  // Reusable Partner Card Render (Matching Image 2 Style)
  const renderPartnerCard = (airline: AuthenticPartner) => (
    <article
      key={airline.id}
      onClick={() => {
        if (airline.website) {
          window.open(airline.website, '_blank', 'noopener,noreferrer');
        }
      }}
      className="group relative h-[420px] sm:h-[460px] lg:h-[480px] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between text-left"
    >
      {/* Upper Hero Podium for Logo */}
      <div className="h-52 sm:h-56 w-full bg-gradient-to-b from-slate-100 via-white to-slate-50 relative flex items-center justify-center p-8 border-b border-slate-100 group-hover:bg-blue-50/20 transition-colors">
        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
          <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-bold text-slate-700 shadow-2xs border border-slate-200/80">
            {airline.category.replace(' & ', ' · ')}
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-[10px] font-bold text-emerald-700 border border-emerald-200/80">
            Official Partner
          </span>
        </div>

        {/* Crisp Authentic Airline Logo */}
        <img
          src={airline.logo}
          alt={`${airline.name} logo`}
          className="max-h-24 max-w-[80%] object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-xs"
          loading="lazy"
        />
      </div>

      {/* Lower Section — Swissport Dark Executive Gradient Scrim matching Image 2 */}
      <div className="bg-gradient-to-b from-[#0F2E53] to-[#0A192F] p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight group-hover:text-sky-300 transition-colors">
            {airline.name}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed font-normal">
            {airline.description}
          </p>
        </div>

        {/* Swissport Action Link with Green Underline */}
        <div className="pt-2 flex items-center gap-2 text-sm sm:text-base font-semibold text-white transition-all duration-300 opacity-90 group-hover:opacity-100 group-hover:translate-x-1">
          <span className="underline underline-offset-4 decoration-2 decoration-[#72BF44]">Visit Official Website</span>
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#72BF44] group-hover:translate-x-1.5 transition-transform" />
        </div>
      </div>
    </article>
  );

  return (
    <div className="pb-24 sm:pb-36 space-y-12 sm:space-y-16 bg-white">
      {/* Hero Header in Signature Aviance Blue Grid */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#11244C] via-[#1A3670] to-[#204696] text-white py-14 sm:py-20 lg:py-24">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <button
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-200 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </button>

          <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-bold tracking-[-0.028em] text-white leading-[1.14]">
            Partnerships That Keep Aviation Moving
          </h1>

          <p className="text-base sm:text-lg text-blue-100/90 font-normal leading-relaxed max-w-3xl">
            Aviance Ghana is proud to partner with leading international scheduled carriers, cargo freighters, executive flight support networks, and government defense airlift missions across Kotoka (ACC), Prempeh I Kumasi (KMS), and Tamale (TML).
          </p>

          {/* Quick Metrics Strip */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl text-left">
            <div className="p-3.5 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md">
              <span className="text-[11px] font-medium text-blue-200 block">Total Partners</span>
              <span className="text-xl font-extrabold text-white">42 Operators</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md">
              <span className="text-[11px] font-medium text-blue-200 block">Scheduled Passenger</span>
              <span className="text-xl font-extrabold text-[#58C1EB]">17 Airlines</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md">
              <span className="text-[11px] font-medium text-blue-200 block">Cargo Market Share</span>
              <span className="text-xl font-extrabold text-[#A3E635]">~60% National</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md">
              <span className="text-[11px] font-medium text-blue-200 block">Audited Standard</span>
              <span className="text-xl font-extrabold text-white">IATA ISAGO</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Controls Bar: Category Filter Pills + View Mode Toggle */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-200">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => handleSelectCategory(c.id)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-1.5 cursor-pointer hover:-translate-y-0.5 active:scale-95 ${
                  selectedCategory === c.id
                    ? 'bg-[#204696] text-white shadow-md shadow-[#204696]/20'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200/90 shadow-2xs'
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

          {/* Position Counter */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-mono font-semibold text-slate-500">
              Showing <strong className="text-slate-900 font-bold">{filteredPartners.length}</strong> of {PARTNERS_DATA.length}
            </span>
          </div>
        </div>

        {/* Partner Showcase Grid matching Image 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 text-left">
          {filteredPartners.map((airline) => (
            <div key={airline.id}>
              {renderPartnerCard(airline)}
            </div>
          ))}
        </div>

        {/* Empty Category Fallback */}
        {filteredPartners.length === 0 && (
          <div className="p-12 text-center text-slate-500 space-y-3">
            <Plane className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No matching partners found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              We couldn’t find any partners in this category. Try selecting another category or viewing all partners.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
              }}
              className="btn-primary !py-2.5 !px-5 text-xs"
            >
              View All Partners
            </button>
          </div>
        )}

        {/* Partnership Inquiry Callout with Signature Tri-Color Accent */}
        <div className="pt-16 sm:pt-24 border-t border-slate-200 text-center max-w-3xl mx-auto space-y-4">
          <Building2 className="w-8 h-8 mx-auto text-[#204696]" />
          
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Commence Flight Operations into Ghana
          </h3>
          
          <p className="text-sm sm:text-base max-w-xl mx-auto leading-relaxed text-slate-600 font-normal">
            Planning scheduled passenger, dedicated freighter, diplomatic, or ad-hoc charter flights to Accra, Kumasi, or Tamale? Aviance Ghana provides comprehensive Standard Ground Handling Agreement (SGHA) Annex B proposals tailored precisely to your flight schedule.
          </p>

          <div className="pt-3 flex flex-wrap items-center justify-center gap-6">
            <button
              onClick={() => onNavigate('/contact')}
              className="btn-primary group"
            >
              <span>Contact Commercial Aviation Team</span>
              <ArrowRight className="w-4 h-4 text-[#58C1EB] group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
            <button
              onClick={() => onNavigate('/services')}
              className="btn-link group"
            >
              <span className="link-label">Explore All 8 Core Ground Services</span>
              <ArrowRight className="w-4 h-4 text-[#72BF44] group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
