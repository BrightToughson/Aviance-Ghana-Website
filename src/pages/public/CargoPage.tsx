import React from 'react';
import {
  PackageCheck,
  ShieldCheck,
  Thermometer,
  ArrowRight,
  Phone,
  Scale
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

// Authentic Aviance Cargo Village Photography
import CARGO_SERVICES_IMG from '../../assets/aviance_images/services/cargo_services.jpg'; // Cold room & screening facility
import CARGO_WAREHOUSE_IMG from '../../assets/aviance_images/services/passenger_services.jpg'; // Warehouse pallet rack carton inspection
import CARGO_VILLAGE_IMG from '../../assets/aviance_images/1780574568846.jpg'; // Cargo village exterior & apron forklift fleet
import CARGO_RAMP_IMG from '../../assets/aviance_images/image_show/1759758700331.jpg'; // Ramp container loading onto dolly

interface CargoPageProps {
  onNavigate: (path: string) => void;
  onOpenCargoModal: () => void;
}

export const CargoPage: React.FC<CargoPageProps> = ({ onNavigate: _onNavigate, onOpenCargoModal }) => {
  const { isLight } = useTheme();
  const { t } = useLanguage();

  return (
    <div className="pb-24 sm:pb-32 space-y-16 sm:space-y-24 lg:space-y-32">
      {/* Hero in Official Aviance Blue */}
      <div className={`relative py-14 sm:py-20 lg:py-24 border-b overflow-hidden transition-colors ${
        isLight
          ? 'bg-gradient-to-b from-blue-50 via-slate-50 to-white border-slate-200'
          : 'bg-gradient-to-b from-[#11244C] via-[#0C1933] to-[#08101E] border-[#204696]/30'
      }`}>
        {/* Subtle Ambient Backing Glow */}
        <div className={`absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
          isLight ? 'bg-[#204696]/5' : 'bg-[#204696]/20'
        }`} />
        <div className="absolute inset-0 opacity-20">
          <img
            src={CARGO_VILLAGE_IMG}
            alt="Aviance Cargo Village air cargo loading"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-[#204696] via-[#009EE0] to-[#72BF44]" />
            <h2 className={`text-xs sm:text-sm font-extrabold uppercase tracking-widest ${
              isLight ? 'text-[#204696]' : 'text-[#58C1EB]'
            }`}>
              Aviance Cargo Village <span className="text-[#009EE0]">·</span> <span className={isLight ? 'text-[#3B7A1C]' : 'text-[#72BF44]'}>Kotoka International Airport</span>
            </h2>
          </div>

          <h1 className={`text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            {t('pages.cargo.title', 'Air Cargo Logistics & Cold Chain Infrastructure')}
          </h1>

          <p className={`text-base max-w-2xl leading-relaxed ${
            isLight ? 'text-slate-600' : 'text-slate-300'
          }`}>
            {t('pages.cargo.desc', 'Ghana’s premier EU RA3-certified air freight handling terminal. Providing continuous cold-chain perishable vaults, pharmaceutical Good Distribution Practice (GDP) handling, dangerous goods staging, and direct customs integration.')}
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <a
              href="tel:+233593816076"
              className={`px-5 py-3 border text-xs font-semibold rounded-xl transition-colors flex items-center gap-2 ${
                isLight
                  ? 'bg-white border-slate-200 text-slate-800 hover:bg-slate-100 shadow-2xs'
                  : 'bg-slate-950 border-slate-700/80 hover:bg-slate-800 text-slate-200'
              }`}
            >
              <Phone className={`w-3.5 h-3.5 ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`} />
              <span>{t('pages.cargo.hotline', 'Cargo Operations Desk (+233 (0) 59 381 6076)')}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Specs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24 lg:space-y-32">
        
        {/* Cargo Facilities & Operations Photo Showcase */}
        <section className="space-y-6">
          <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 ${
            isLight ? 'border-slate-200' : 'border-slate-800'
          }`}>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-4 rounded-full bg-gradient-to-b from-[#204696] via-[#009EE0] to-[#72BF44]" />
                <span className={`text-xs font-extrabold uppercase tracking-wider ${
                  isLight ? 'text-[#204696]' : 'text-[#58C1EB]'
                }`}>
                  Authentic Facility Showcase
                </span>
              </div>
              <h2 className={`text-xl sm:text-2xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Aviance Cargo Hub Infrastructure & Ramp Handling
              </h2>
            </div>
            <span className="text-xs font-mono font-semibold text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 self-start sm:self-auto">
              RA3 Validated Facility
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* 1. Cold Room */}
            <div className={`group rounded-2xl border overflow-hidden shadow-lg flex flex-col transition-all duration-300 hover:-translate-y-1 ${
              isLight ? 'bg-white border-slate-200/90 shadow-slate-200/50' : 'bg-[#0C1933]/90 border-[#204696]/30'
            }`}>
              <div className="relative aspect-[16/11] overflow-hidden bg-slate-950">
                <img
                  src={CARGO_SERVICES_IMG}
                  alt="Aviance Cold Room and Screening Hall"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#204696]/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-[#58C1EB]/30">
                  +2°C to +8°C Cold Chain
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
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
            <div className={`group rounded-2xl border overflow-hidden shadow-lg flex flex-col transition-all duration-300 hover:-translate-y-1 ${
              isLight ? 'bg-white border-slate-200/90 shadow-slate-200/50' : 'bg-[#0C1933]/90 border-[#204696]/30'
            }`}>
              <div className="relative aspect-[16/11] overflow-hidden bg-slate-950">
                <img
                  src={CARGO_WAREHOUSE_IMG}
                  alt="Warehouse pallet intake and carton screening"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#204696]/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-[#58C1EB]/30">
                  Pallet Inspection
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
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
            <div className={`group rounded-2xl border overflow-hidden shadow-lg flex flex-col transition-all duration-300 hover:-translate-y-1 ${
              isLight ? 'bg-white border-slate-200/90 shadow-slate-200/50' : 'bg-[#0C1933]/90 border-[#204696]/30'
            }`}>
              <div className="relative aspect-[16/11] overflow-hidden bg-slate-950">
                <img
                  src={CARGO_VILLAGE_IMG}
                  alt="Aviance Cargo Village air cargo loading and forklifts"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#204696]/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-[#58C1EB]/30">
                  Cargo Village
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
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
            <div className={`group rounded-2xl border overflow-hidden shadow-lg flex flex-col transition-all duration-300 hover:-translate-y-1 ${
              isLight ? 'bg-white border-slate-200/90 shadow-slate-200/50' : 'bg-[#0C1933]/90 border-[#204696]/30'
            }`}>
              <div className="relative aspect-[16/11] overflow-hidden bg-slate-950">
                <img
                  src={CARGO_RAMP_IMG}
                  alt="Aviance Tug TR-52 loading cargo container onto dolly"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#204696]/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-[#58C1EB]/30">
                  Airside Turnaround
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
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
          <div className={`border rounded-2xl p-6 space-y-3 shadow-lg transition-all ${
            isLight
              ? 'bg-white border-slate-200/90 shadow-slate-200/60'
              : 'bg-[#0C1933]/90 border-[#204696]/30 shadow-[#204696]/5'
          }`}>
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

          <div className={`border rounded-2xl p-6 space-y-3 shadow-lg transition-all ${
            isLight
              ? 'bg-white border-slate-200/90 shadow-slate-200/60'
              : 'bg-[#0C1933]/90 border-[#204696]/30 shadow-[#204696]/5'
          }`}>
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

          <div className={`border rounded-2xl p-6 space-y-3 shadow-lg transition-all ${
            isLight
              ? 'bg-white border-slate-200/90 shadow-slate-200/60'
              : 'bg-[#0C1933]/90 border-[#204696]/30 shadow-[#204696]/5'
          }`}>
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

        {/* Operational Flow & ICUMS Integration */}
        <div className={`border rounded-2xl p-8 space-y-6 shadow-xl transition-all ${
          isLight
            ? 'bg-white border-slate-200/90 shadow-slate-200/60'
            : 'bg-[#0C1933]/95 border-[#204696]/35 shadow-[#204696]/10'
        }`}>
          <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 ${
            isLight ? 'border-slate-200' : 'border-slate-800'
          }`}>
            <div>
              <div className={`text-xs font-semibold uppercase tracking-wider ${
                isLight ? 'text-[#0284C7]' : 'text-[#58C1EB]'
              }`}>
                Logistics Architecture
              </div>
              <h2 className={`text-xl sm:text-2xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Cargo Village Operational Workflow
              </h2>
            </div>
            <span className={`text-xs font-mono font-semibold ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>
              ICUMS Integrated (Ghana Revenue Authority)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className={`p-4 rounded-xl border space-y-1.5 ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
            }`}>
              <span className={`font-mono font-bold ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`}>STAGE 01</span>
              <div className={`text-sm font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>Cargo Intake & Verification</div>
              <p className={isLight ? 'text-slate-600' : 'text-slate-400'}>Air Waybill validation, dimension checks, dangerous goods checklist verification, and physical receipt.</p>
            </div>

            <div className={`p-4 rounded-xl border space-y-1.5 ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
            }`}>
              <span className={`font-mono font-bold ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`}>STAGE 02</span>
              <div className={`text-sm font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>Security Screening & Staging</div>
              <p className={isLight ? 'text-slate-600' : 'text-slate-400'}>Dual-view cargo X-ray screening, EU RA3 verification stamp, and transfer to ambient or cold vault storage.</p>
            </div>

            <div className={`p-4 rounded-xl border space-y-1.5 ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
            }`}>
              <span className={`font-mono font-bold ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`}>STAGE 03</span>
              <div className={`text-sm font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>Pallet ULD Assembly</div>
              <p className={isLight ? 'text-slate-600' : 'text-slate-400'}>Pallet contour shaping, netting, weigh bridge recording, and e-manifest transmission to aircraft loadmaster.</p>
            </div>

            <div className={`p-4 rounded-xl border space-y-1.5 ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
            }`}>
              <span className={`font-mono font-bold ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`}>STAGE 04</span>
              <div className={`text-sm font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>Tarmac Transfer & Loading</div>
              <p className={isLight ? 'text-slate-600' : 'text-slate-400'}>Tug tractor transport to aircraft stand, main-deck or lower-deck high loader transfer, hold locks engaged.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
