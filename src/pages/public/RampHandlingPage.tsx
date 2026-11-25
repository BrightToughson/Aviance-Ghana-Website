import React from 'react';
import {
  Plane,
  ShieldCheck,
  Phone,
  Mail,
  ArrowRight,
  Clock,
  Gauge,
  Activity,
  CheckCircle2,
  Zap,
  Droplets,
  Truck,
  Wrench,
  Radio,
  Sparkles
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

// Authentic Aviance Ramp Operations Photography
import RAMP_OFFICIAL_IMG from '../../assets/aviance_images/services/ramp_official.jpg'; // Official Aviance Ramp Operations
import RAMP_HERO_IMG from '../../assets/aviance_images/1791968160594.jpg'; // Heavy SCHOPF F300 tractor at B787
import RAMP_CARGO_IMG from '../../assets/aviance_images/image_show/1759758700331.jpg'; // Ramp container loading onto dolly
import RAMP_TRACTOR_IMG from '../../assets/aviance_images/services/flight_ops.jpg'; // Airside tug mobility
import RAMP_SERVICE_IMG from '../../assets/aviance_images/services/ramp_handling.jpg'; // Full apron operations

interface RampHandlingPageProps {
  onNavigate: (path: string) => void;
  onOpenCargoModal?: () => void;
}

export const RampHandlingPage: React.FC<RampHandlingPageProps> = ({ onNavigate }) => {
  const { isLight } = useTheme();

  const capabilities = [
    {
      title: 'Aircraft Pushback & Precision Towing',
      desc: 'Heavy-duty SCHOPF F300, Douglas, and Charlatte electric pushback tractors capable of safely maneuvering narrow-body and wide-body airliners (B737, A320, B787, B777, A330, A350).',
      icon: Plane,
      badge: 'Wide-body Capable'
    },
    {
      title: 'Ground Power & Air Start (GPU / ASU / ACU)',
      desc: 'Mobile 400Hz 90kVA/140kVA solid-state GPU units, high-pressure Air Start Units (ASU) for jet turbine ignition, and pre-conditioned air (PCA) cooling carts.',
      icon: Zap,
      badge: '400Hz / High Pressure'
    },
    {
      title: 'Potable Water & Lavatory Servicing',
      desc: 'Dedicated sanitary ground servicing vehicles equipped with microbial-filtered potable water tanks and leak-proof vacuum lavatory evacuation systems complying with IATA AHM 970.',
      icon: Droplets,
      badge: 'Sanitary Certified'
    },
    {
      title: 'Baggage & Cargo Apron Transfer',
      desc: 'Rapid apron transfer using heavy container dollies, enclosed bulk baggage carts, belt loaders, and motorized baggage tugs ensuring strict baggage reconciliation (BRS) compliance.',
      icon: Truck,
      badge: 'BRS Integrated'
    },
    {
      title: 'Marshalling, Intercom & Chocking',
      desc: 'Standardized IATA hand marshalling, precision nose-wheel chocking, protective engine inlet covers, safety perimeter cone layout, and continuous VHF headset flight-deck intercom.',
      icon: Radio,
      badge: '2-Way Flight Deck Comm'
    },
    {
      title: 'Cabin Turnaround & Waste Management',
      desc: 'Fast-turnaround interior aircraft cleaning, seat pocket replenishment, biohazard safety sanitization, and bonded apron waste disposal conforming to Ghana EPA regulations.',
      icon: Sparkles,
      badge: 'EPA & GCAA Compliant'
    }
  ];

  const turnaroundMilestones = [
    { time: 'T - 60 Min', title: 'Stand Preparation & FOD Sweep', desc: 'Ground crew verifies stand clearance, GPU and chocks positioned, Foreign Object Debris sweep completed.' },
    { time: 'T - 45 Min', title: 'Aircraft On Blocks & Deboarding', desc: 'Aircraft marshalled to stop line, chocks inserted, safety cones positioned, GPU connected, passenger steps docked.' },
    { time: 'T - 30 Min', title: 'Unloading & Ground Servicing', desc: 'Baggage and cargo holds offloaded, potable water replenished, lavatory waste evacuated, cabin cleaning in progress.' },
    { time: 'T - 15 Min', title: 'Loading & Final Reconciliation', desc: 'Outbound baggage and cargo loaded per electronic loadsheet, hold nets secured, fueling complete.' },
    { time: 'T - 0 Min', title: 'Pushback & Engine Start', desc: 'Cabin doors armed, towbarless tractor hitched, flight deck clearance received, pushback and engine start.' },
  ];

  return (
    <div className={`min-h-screen pb-24 transition-colors ${isLight ? 'bg-white text-slate-800' : 'bg-[#0B1528] text-slate-100'}`}>
      
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
            <span className="text-[#204696] font-semibold">Ramp Handling</span>
          </div>
        </div>
      </div>

      {/* Hero Header — Aviance Blue Grid Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#11244C] via-[#1A3670] to-[#204696] text-white py-14 sm:py-20 lg:py-24">
        {/* Subtle aeronautical blueprint grid */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-bold tracking-[-0.028em] text-white leading-[1.14]">
            Ramp Handling &amp; Turnaround Operations
          </h1>

          <p className="text-base sm:text-lg text-blue-100/90 font-normal leading-relaxed max-w-3xl">
            Aviance Ghana executes clockwork aircraft turnarounds under strict IATA ISAGO standards. From heavy SCHOPF F300 towbarless pushback tractors and 400Hz ground power to rapid baggage transfers and sanitary servicing, our airside professionals keep your flight schedule on time.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('/contact')}
              className="px-6 py-3 rounded-xl bg-[#009EE0] hover:bg-[#008bc5] text-white text-xs sm:text-sm font-bold shadow-lg shadow-[#009EE0]/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Request Ramp Handling Agreement</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="tel:+233559680879"
              className="px-5 py-3 border border-white/20 bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-semibold rounded-xl backdrop-blur-md transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#72BF44]" />
              <span>24/7 OCC (+233 (0) 559 68 0879)</span>
            </a>
            <button
              onClick={() => onNavigate('/gse-fleet-maintenance')}
              className="px-5 py-3 border border-white/20 bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-semibold rounded-xl backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Wrench className="w-4 h-4 text-[#58C1EB]" />
              <span>Explore GSE Fleet</span>
            </button>
          </div>
        </div>
      </section>

      {/* Operational Key Metrics Strip */}
      <div className={`border-b py-6 ${isLight ? 'bg-slate-50/80 border-slate-200' : 'bg-[#0E1A33] border-slate-800'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#204696] dark:text-[#58C1EB]">15,000+</div>
              <div className="text-xs uppercase font-bold tracking-wider text-slate-500">Annual Aircraft Turnarounds</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#009EE0]">100%</div>
              <div className="text-xs uppercase font-bold tracking-wider text-slate-500">ISAGO Audit Conformity</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#72BF44]">&lt; 35 Min</div>
              <div className="text-xs uppercase font-bold tracking-wider text-slate-500">Fast Turnaround Capable</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-500">24/7/365</div>
              <div className="text-xs uppercase font-bold tracking-wider text-slate-500">Ramp Watch & Dispatch</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 space-y-20 sm:space-y-28">

        {/* Official Scope & Key Services — Open 2-Column Layout */}
        <section className="py-6 sm:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left Column: Scope & Key Services */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div>
                <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  Ramp Handling
                </h2>
                <div className={`mt-4 space-y-3 text-sm sm:text-base leading-relaxed ${
                  isLight ? 'text-slate-700' : 'text-slate-200'
                }`}>
                  <p>
                    Aviance Ghana delivers safe, efficient and coordinated ramp handling services to support on-time aircraft turnarounds.
                  </p>
                  <p>
                    Our trained teams and ground support equipment provide reliable operational support in line with airline procedures and applicable safety standards.
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
                    'Aircraft loading and unloading.',
                    'Baggage handling.',
                    'Aircraft marshalling and turnaround coordination.',
                    'Ground support equipment services.',
                    'Aircraft cleaning and cabin servicing.',
                    'Toilet and water services.',
                    'Cargo and mail handling.'
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
                <a href="mailto:info@avianceghana.com" className="inline-flex items-center gap-2 text-[#204696] dark:text-[#58C1EB] hover:underline">
                  <Mail className="w-4 h-4 text-[#009EE0]" />
                  <span className="underline">info@avianceghana.com</span>
                </a>
              </div>
            </div>

            {/* Right Column: Authentic Page Image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 dark:border-slate-800 group">
                <img
                  src={RAMP_OFFICIAL_IMG}
                  alt="Aviance Ghana Ramp Handling"
                  className="w-full h-auto max-h-[520px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 6 Core Capabilities */}
        <section className="space-y-8">
          <div className="max-w-3xl space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full bg-[#204696]" />
              <span className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`}>
                Airside Turnaround Solutions
              </span>
            </div>
            <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Full Spectrum Ground Support & Ramp Operations
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              Operating under strict IATA Airport Handling Manual (AHM) guidelines, our certified apron teams coordinate all ground movements with precision and safety.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((c, i) => {
              const Icon = c.icon;
              return (
                <div
                  key={i}
                  className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                    isLight
                      ? 'bg-white border-slate-200/90 hover:border-blue-300 shadow-sm'
                      : 'bg-[#11244C]/40 border-slate-800 hover:border-blue-500/40 shadow-none'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[#204696] dark:text-[#58C1EB]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {c.badge}
                    </span>
                  </div>
                  <h3 className={`text-lg font-bold mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {c.title}
                  </h3>
                  <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    {c.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Visual Showcase: Real Ramp Operations */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 border-slate-200 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-4 rounded-full bg-[#72BF44]" />
                <span className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-[#3B7A1C]' : 'text-[#72BF44]'}`}>
                  Authentic Apron Photography
                </span>
              </div>
              <h2 className={`text-2xl sm:text-3xl font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Heavy Equipment & Turnaround in Action
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 relative aspect-[4/3]">
              <img
                src={RAMP_HERO_IMG}
                alt="SCHOPF F300 Pushback at B787"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5 flex flex-col justify-end">
                <p className="text-white font-bold text-base">Heavy Pushback Tractor (SCHOPF F300)</p>
                <p className="text-xs text-slate-300">Safely positioning long-haul wide-body aircraft at Kotoka Terminal 3.</p>
              </div>
            </div>

            <div className="group overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 relative aspect-[4/3]">
              <img
                src={RAMP_CARGO_IMG}
                alt="Ramp Container Loading onto Dolly"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5 flex flex-col justify-end">
                <p className="text-white font-bold text-base">Precision Cargo & ULD Handling</p>
                <p className="text-xs text-slate-300">Tug TR-52 staging containerized cargo dollies for lower-deck loading.</p>
              </div>
            </div>

            <div className="group overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 relative aspect-[4/3]">
              <img
                src={RAMP_TRACTOR_IMG}
                alt="Airside Mobility & Towing"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5 flex flex-col justify-end">
                <p className="text-white font-bold text-base">Airside Fleet Mobility & Marshalling</p>
                <p className="text-xs text-slate-300">Continuous ramp supervision across active taxiways and aprons.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Safety & ISAGO Commitment Banner */}
        <div className={`p-8 sm:p-10 rounded-3xl border flex flex-col md:flex-row items-center justify-between gap-6 ${
          isLight
            ? 'bg-gradient-to-r from-blue-50 via-white to-slate-50 border-blue-200'
            : 'bg-gradient-to-r from-[#11244C] to-[#0A162B] border-blue-900/60'
        }`}>
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#204696] dark:text-[#58C1EB]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#204696] dark:text-[#58C1EB]">Global Safety Standards</span>
            </div>
            <h3 className={`text-xl sm:text-2xl font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              IATA ISAGO Ground Operations Registry Conformity
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              Aviance Ghana is registered under the IATA Safety Audit for Ground Operations (ISAGO) covering Organisation and Management (ORM), Aircraft Handling and Loading (HDL), and Aircraft Ground Movement (AGM).
            </p>
          </div>
          <button
            onClick={() => onNavigate('/certifications')}
            className="px-6 py-3 rounded-xl bg-[#204696] hover:bg-[#153170] text-white text-xs font-bold whitespace-nowrap shadow-md transition-all cursor-pointer"
          >
            View ISAGO Certificate
          </button>
        </div>
      </div>
    </div>
  );
};
