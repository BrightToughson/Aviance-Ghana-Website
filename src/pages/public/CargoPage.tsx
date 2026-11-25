import React from 'react';
import {
  PackageCheck,
  ShieldCheck,
  Thermometer,
  ArrowRight,
  Phone,
  Mail,
  Scale
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

// Authentic Aviance Cargo Village Photography
import CARGO_OFFICIAL_IMG from '../../assets/aviance_images/services/cargo_official.jpg'; // Official Aviance Cargo Facility & Cold Chain
import CARGO_SERVICES_IMG from '../../assets/aviance_images/services/cargo_services.jpg'; // Cold room & screening facility
import CARGO_WAREHOUSE_IMG from '../../assets/aviance_images/services/passenger_services.jpg'; // Warehouse pallet rack carton inspection
import CARGO_VILLAGE_IMG from '../../assets/aviance_images/1780574568846.jpg'; // Cargo village exterior & apron forklift fleet
import CARGO_RAMP_IMG from '../../assets/aviance_images/image_show/1759758700331.jpg'; // Ramp container loading onto dolly

interface CargoPageProps {
  onNavigate: (path: string) => void;
  onOpenCargoModal: () => void;
}

export const CargoPage: React.FC<CargoPageProps> = ({ onNavigate, onOpenCargoModal }) => {
  const { isLight } = useTheme();
  const { t } = useLanguage();

  return (
    <div className={`min-h-screen pb-24 sm:pb-32 transition-colors ${isLight ? 'bg-white text-slate-800' : 'bg-[#0B1528] text-slate-100'}`}>
      {/* Breadcrumb Bar */}
      <div className={`border-b transition-colors ${isLight ? 'bg-white border-slate-200/80' : 'bg-[#08101E] border-slate-800'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-slate-500">
            <button
              onClick={() => onNavigate('/')}
              className="hover:text-[#204696] font-medium transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <button
              onClick={() => onNavigate('/services')}
              className="hover:text-[#204696] font-medium transition-colors cursor-pointer"
            >
              Services
            </button>
            <span>/</span>
            <span className="text-[#204696] font-semibold">Cargo Services</span>
          </div>
        </div>
      </div>

      {/* Hero Header — Aviance Blue Grid Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#11244C] via-[#1A3670] to-[#204696] text-white py-14 sm:py-20 lg:py-24">
        {/* Subtle aeronautical blueprint grid */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-bold tracking-[-0.028em] text-white leading-[1.14]">
            {t('pages.cargo.title', 'Air Cargo Logistics & Cold Chain Infrastructure')}
          </h1>

          <p className="text-base sm:text-lg text-blue-100/90 font-normal leading-relaxed max-w-3xl">
            {t('pages.cargo.desc', 'Ghana’s premier EU RA3-certified air freight handling terminal. Providing continuous cold-chain perishable vaults, pharmaceutical Good Distribution Practice (GDP) handling, dangerous goods staging, and direct customs integration.')}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href="tel:+233593816076"
              className="px-5 py-3 border border-white/20 bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-semibold rounded-xl backdrop-blur-md transition-all flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#72BF44]" />
              <span>{t('pages.cargo.hotline', 'Cargo Operations Desk (+233 (0) 59 381 6076)')}</span>
            </a>
            <button
              onClick={onOpenCargoModal}
              className="px-6 py-3 rounded-xl bg-[#009EE0] hover:bg-[#008bc5] text-white text-xs sm:text-sm font-bold shadow-lg shadow-[#009EE0]/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Submit Cargo Rate Inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Main Specs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 space-y-16 sm:space-y-24 lg:space-y-32">
        
        {/* Official Scope & Key Services — Open 2-Column Layout */}
        <section className="py-6 sm:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left Column: Scope & Key Services */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div>
                <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  Cargo Services
                </h2>
                <div className={`mt-4 space-y-3 text-sm sm:text-base leading-relaxed ${
                  isLight ? 'text-slate-700' : 'text-slate-200'
                }`}>
                  <p>
                    Aviance Ghana provides secure and efficient import and export cargo handling services supported by experienced teams, established procedures and modern cargo systems.
                  </p>
                  <p>
                    With a current market share of approximately <strong className={isLight ? 'text-slate-900 font-bold' : 'text-white font-bold'}>60% in 2025</strong>, our cargo operations support airline customers, freight partners and authorised clearing agents while maintaining a strong focus on safety, security, accuracy and service delivery.
                  </p>
                </div>
              </div>

              <div>
                <h3 className={`text-base sm:text-lg font-bold mb-3 ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  Key services
                </h3>
                <ul className={`space-y-2.5 text-sm sm:text-base ${
                  isLight ? 'text-slate-700' : 'text-slate-200'
                }`}>
                  {[
                    'Import and export cargo handling.',
                    'Cargo acceptance and documentation support.',
                    'Warehouse handling and storage.',
                    'Special cargo handling, subject to applicable requirements.',
                    'Cargo messaging and tracking support.',
                    'Coordination with airlines and authorised clearing agents.'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-slate-400 dark:text-slate-500 font-bold select-none">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-6 text-xs sm:text-sm font-semibold">
                <a href="tel:+233593816076" className="inline-flex items-center gap-2 text-[#204696] dark:text-[#58C1EB] hover:underline">
                  <Phone className="w-4 h-4 text-[#72BF44]" />
                  <span>CONTACT: +233 (0) 59 381 60 76</span>
                </a>
                <a href="mailto:robertamenyah@avianceghana.com" className="inline-flex items-center gap-2 text-[#204696] dark:text-[#58C1EB] hover:underline">
                  <Mail className="w-4 h-4 text-[#009EE0]" />
                  <span className="underline">robertamenyah@avianceghana.com</span>
                </a>
              </div>
            </div>

            {/* Right Column: Authentic Page Image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 dark:border-slate-800 group">
                <img
                  src={CARGO_OFFICIAL_IMG}
                  alt="Aviance Ghana Cargo Services"
                  className="w-full h-auto max-h-[520px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Cargo Facilities & Operations Photo Showcase */}
        <section className="space-y-6">
          <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 ${
            isLight ? 'border-slate-200' : 'border-slate-800'
          }`}>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-4 rounded-full bg-gradient-to-b from-[#204696] via-[#009EE0] to-[#72BF44]" />
                <span className={`text-[11px] sm:text-xs font-bold uppercase tracking-[0.12em] ${
                  isLight ? 'text-[#204696]' : 'text-[#58C1EB]'
                }`}>
                  Authentic Facility Showcase
                </span>
              </div>
              <h2 className={`text-2xl sm:text-3xl font-bold tracking-[-0.025em] leading-snug ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Aviance Cargo Hub Infrastructure & Ramp Handling
              </h2>
            </div>
            <span className="text-xs font-mono font-semibold text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 self-start sm:self-auto">
              RA3 Validated Facility
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* 1. Cold Room */}
            <div className="group flex flex-col space-y-3">
              <div className="relative aspect-[16/11] overflow-hidden rounded-xl bg-slate-950">
                <img
                  src={CARGO_SERVICES_IMG}
                  alt="Aviance Cold Room and Screening Hall"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="space-y-1">
                <div>
                  <h3 className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    Cold Storage & Screening Hub
                  </h3>
                  <p className={`text-xs mt-1.5 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    Temperature-controlled pharmaceutical vaults, fresh fruits, vegetables, and specialized perishable cargo staging.
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Warehouse Inspection */}
            <div className="group flex flex-col space-y-3">
              <div className="relative aspect-[16/11] overflow-hidden rounded-xl bg-slate-950">
                <img
                  src={CARGO_WAREHOUSE_IMG}
                  alt="Warehouse pallet intake and carton screening"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="space-y-1">
                <div>
                  <h3 className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    Bonded Warehouse Staging
                  </h3>
                  <p className={`text-xs mt-1.5 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    Physical cargo examination, customs clearance seal verification, and high-density racking under 24/7 CCTV surveillance.
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Cargo Village Apron */}
            <div className="group flex flex-col space-y-3">
              <div className="relative aspect-[16/11] overflow-hidden rounded-xl bg-slate-950">
                <img
                  src={CARGO_VILLAGE_IMG}
                  alt="Aviance Cargo Village air cargo loading and forklifts"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="space-y-1">
                <div>
                  <h3 className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    Heavy Forklift Fleet Staging
                  </h3>
                  <p className={`text-xs mt-1.5 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    Direct airside access tarmac ramps, heavy-duty forklift fleet handling outsized freight, machinery, and project shipments.
                  </p>
                </div>
              </div>
            </div>

            {/* 4. Ramp ULD Loading */}
            <div className="group flex flex-col space-y-3">
              <div className="relative aspect-[16/11] overflow-hidden rounded-xl bg-slate-950">
                <img
                  src={CARGO_RAMP_IMG}
                  alt="Aviance Tug TR-52 loading cargo container onto dolly"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="space-y-1">
                <div>
                  <h3 className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    Airside ULD Ramp Delivery
                  </h3>
                  <p className={`text-xs mt-1.5 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    Aviance tug tractors pulling containerized ULD dollies directly to aircraft belly and main-deck cargo loaders on time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${
              isLight
                ? 'bg-blue-50 text-[#204696] border-blue-200'
                : 'bg-[#58C1EB]/10 text-[#58C1EB] border-[#58C1EB]/25'
            }`}>
              <Thermometer className="w-5 h-5" />
            </div>
            <h3 className={`text-lg font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {t('pages.cargo.coldChainTitle', 'Cold Chain & Perishables')}
            </h3>
            <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              {t('pages.cargo.coldChainDesc', '450m³ dual-redundant cold storage maintaining +2°C to +8°C for pharmaceuticals, fresh fruits, vegetables, and -20°C deep freeze for sea produce and specialized cargo.')}
            </p>
          </div>

          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${
              isLight
                ? 'bg-blue-50 text-[#204696] border-blue-200'
                : 'bg-[#58C1EB]/10 text-[#58C1EB] border-[#58C1EB]/25'
            }`}>
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className={`text-lg font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {t('pages.cargo.ra3Title', 'EU RA3 Security Screening')}
            </h3>
            <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              {t('pages.cargo.ra3Desc', 'Regulated Agent Third Country (RA3) accredited security infrastructure. High-penetration dual-view X-ray inspection, explosive trace detection, and bonded physical escort.')}
            </p>
          </div>

          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${
              isLight
                ? 'bg-blue-50 text-[#204696] border-blue-200'
                : 'bg-[#58C1EB]/10 text-[#58C1EB] border-[#58C1EB]/25'
            }`}>
              <Scale className="w-5 h-5" />
            </div>
            <h3 className={`text-lg font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {t('pages.cargo.dgTitle', 'ULD Build-up & Breakdown')}
            </h3>
            <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              {t('pages.cargo.dgDesc', 'Specialized roller-bed staging areas for wide-body freighter pallets (PMC, PAG, AMF, AKE). Precision calibrated digital weigh bridges and tie-down net securing under IATA AHM.')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
