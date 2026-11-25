import React from 'react';
import {
  Wrench,
  ShieldCheck,
  Phone,
  Mail,
  ArrowRight,
  Clock,
  Zap,
  CheckCircle2,
  Cpu,
  Truck,
  Leaf,
  Settings,
  BatteryCharging,
  Gauge,
  Sparkles
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

// Authentic Aviance GSE Photography
import GSE_OFFICIAL_IMG from '../../assets/aviance_images/services/gse_official.jpg'; // Official Aviance GSE Workshop
import GSE_HERO_IMG from '../../assets/aviance_images/services/gse_maintenance.jpg'; // Certified GSE workshop engineering
import GSE_VILLAGE_IMG from '../../assets/aviance_images/1780574568846.jpg'; // Apron forklift & tug fleet
import RAMP_TRACTOR_IMG from '../../assets/aviance_images/services/flight_ops.jpg'; // Airside tug mobility

interface GseMaintenancePageProps {
  onNavigate: (path: string) => void;
  onOpenCargoModal?: () => void;
}

export const GseMaintenancePage: React.FC<GseMaintenancePageProps> = ({ onNavigate }) => {
  const { isLight } = useTheme();

  const capabilities = [
    {
      title: 'Electric & Eco-Friendly GSE (e-GSE)',
      desc: 'Over $1,000,000 invested in zero-emission Charlatte electric baggage tugs and lithium-ion chargers, drastically cutting apron emissions and fuel consumption.',
      icon: Leaf,
      badge: 'Zero Emission'
    },
    {
      title: 'Heavy Mechanical & Hydraulic Overhauls',
      desc: 'In-house heavy engineering bays for diesel engines, automatic transmissions, hydraulic actuators, steering geometry, and structural chassis reinforcement.',
      icon: Wrench,
      badge: 'Certified Technicians'
    },
    {
      title: '24/7 Mobile Airside Breakdown Unit',
      desc: 'Dedicated rapid-response service vans stationed airside, equipped with diagnostic computers, spare hydraulic hoses, and emergency jump-start units.',
      icon: Truck,
      badge: '<10 Min Response'
    },
    {
      title: 'Preventive Servicing (IATA AHM 910/913)',
      desc: 'Computerized operating hour tracking, fluid analysis, scheduled preventative maintenance intervals, and strict daily pre-operation checklists.',
      icon: Settings,
      badge: 'IATA AHM Standard'
    },
    {
      title: '400Hz GPU & Air Start Calibration',
      desc: 'Load-bank resistance testing, 400Hz solid-state frequency stabilization, and high-pressure Air Start Unit (ASU) pneumatic flow validation.',
      icon: Zap,
      badge: 'Load-Bank Tested'
    },
    {
      title: 'Equipment Telematics & Safety Systems',
      desc: 'Fleet telematics, speed limit governors, proximity impact sensors, and operator authentication ensuring total ramp safety and accountability.',
      icon: Gauge,
      badge: 'Telematics Monitored'
    }
  ];

  const fleetInventory = [
    { category: 'Aircraft Pushback Tractors', models: 'SCHOPF F300 Towbarless & Douglas Super-Tugs', capability: 'Wide-body B787, B777, A330, A350, narrow-body B737, A320.' },
    { category: 'Ground Power Units (GPU)', models: 'Houchin, Hobart & ITW GSE 90kVA / 140kVA', capability: '400Hz pure sine-wave aircraft power and 28V DC output.' },
    { category: 'Baggage & Cargo Tugs', models: 'Charlatte Electric & Toyota Industrial Tow Tugs', capability: 'High-torque towing for up to 6 container dollies simultaneously.' },
    { category: 'Belt & High-Loaders', models: 'Charlatte Electric Conveyors & Heavy Lower-Deck Loaders', capability: 'Main deck and lower lobe containerized ULD and bulk handling.' },
    { category: 'Sanitary Ground Servicing', models: 'Stainless-Steel Potable Water & Vacuum Toilet Trucks', capability: 'Microbial filtration valves and sealed vacuum evacuation.' },
    { category: 'Air Start & Air Conditioning', models: 'High-Output Diesel ASU & Mobile PCA Coolers', capability: '300 PPM pneumatic turbine cranking and cabin conditioning.' }
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
            <span className="text-[#204696] font-semibold">GSE &amp; Fleet Maintenance</span>
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
            Ground Support Equipment &amp; Fleet Maintenance
          </h1>

          <p className="text-base sm:text-lg text-blue-100/90 font-normal leading-relaxed max-w-3xl">
            Aviance Ghana operates the country’s largest certified airside Ground Support Equipment engineering base. With over $1,000,000 invested in modern electric machinery, our certified master technicians ensure 99.8% fleet availability and zero operational delays across Ghana&apos;s commercial airports.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('/contact')}
              className="px-6 py-3 rounded-xl bg-[#009EE0] hover:bg-[#008bc5] text-white text-xs sm:text-sm font-bold shadow-lg shadow-[#009EE0]/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Inquire Technical Workshop Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="tel:+233593816076"
              className="px-5 py-3 border border-white/20 bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-semibold rounded-xl backdrop-blur-md transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#72BF44]" />
              <span>Technical Desk (+233 (0) 59 381 6076)</span>
            </a>
            <button
              onClick={() => onNavigate('/ramp-handling')}
              className="px-5 py-3 border border-white/20 bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-semibold rounded-xl backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Truck className="w-4 h-4 text-[#58C1EB]" />
              <span>Ramp Turnaround Operations</span>
            </button>
          </div>
        </div>
      </section>

      {/* Operational Key Metrics Strip */}
      <div className={`border-b py-6 ${isLight ? 'bg-slate-50/80 border-slate-200' : 'bg-[#0E1A33] border-slate-800'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#72BF44]">$1,000,000+</div>
              <div className="text-xs uppercase font-bold tracking-wider text-slate-500">Electric Eco-GSE Investment</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#204696] dark:text-[#58C1EB]">150+ Units</div>
              <div className="text-xs uppercase font-bold tracking-wider text-slate-500">Motorized &amp; Non-Motorized Fleet</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#009EE0]">99.8%</div>
              <div className="text-xs uppercase font-bold tracking-wider text-slate-500">Equipment Operational Uptime</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-500">24/7/365</div>
              <div className="text-xs uppercase font-bold tracking-wider text-slate-500">Airside Mobile Repair Team</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 space-y-20 sm:space-y-28">

        {/* Official Scope & Inventory — Open 2-Column Layout */}
        <section className="py-6 sm:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left Column: Scope & Key Services */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div>
                <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  Ground Support Equipment and Fleet Maintenance
                </h2>
                <div className={`mt-4 space-y-3 text-sm sm:text-base leading-relaxed ${
                  isLight ? 'text-slate-700' : 'text-slate-200'
                }`}>
                  <p>
                    We provide a dedicated 24 hour, 7 days a week support for all the operations of Aviance.
                  </p>
                  <p>
                    Not just keeping the tractors, hiloaders, buses, dollies and steps maintained to ISAGO standard, but also keeping the air conditioning, toilets, offices and buildings in good condition to facilitate a clean and healthy environment for the workforce of the company.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    This department looks after the supplies of water, electricity, stationery, boarding passes, baggage tags, diesel fuel for the equipment, fire extinguishers, radio communications, personal protection equipment (PPE), uniforms etc.
                  </p>
                </div>
              </div>

              <div>
                <h3 className={`text-base sm:text-lg font-bold mb-3 ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  Fleet &amp; Equipment Scale (350+ Units)
                </h3>
                <ul className={`space-y-2.5 text-sm sm:text-base ${
                  isLight ? 'text-slate-700' : 'text-slate-200'
                }`}>
                  {[
                    '54-Ton Aircraft Pushback Tractors',
                    'High-capacity Lower & Main Deck Hi-loaders',
                    'Zero-Emission Electric Baggage Tugs',
                    'Container & Pallet Dollies Fleet',
                    'Potable Water & Sealed Toilet Servicing Trucks',
                    'Airside Mobile Emergency Repair Workshop'
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
                  src={GSE_OFFICIAL_IMG}
                  alt="Aviance Ghana Ground Support Equipment"
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
                Heavy Workshop Capabilities
              </span>
            </div>
            <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Complete In-House Fleet Lifecycle Engineering
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              Every piece of ground support machinery is maintained to international aviation standards, preventing aircraft on-ground delays and guaranteeing airside safety.
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

        {/* Visual Showcase: Real GSE Engineering Workshop */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 border-slate-200 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-4 rounded-full bg-[#72BF44]" />
                <span className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-[#3B7A1C]' : 'text-[#72BF44]'}`}>
                  Authentic Technical Operations
                </span>
              </div>
              <h2 className={`text-2xl sm:text-3xl font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                GSE Engineering Workshop &amp; Apron Fleet
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 relative aspect-[4/3]">
              <img
                src={GSE_HERO_IMG}
                alt="GSE Maintenance Engineering Workshop"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5 flex flex-col justify-end">
                <p className="text-white font-bold text-base">Heavy Engineering Workshop</p>
                <p className="text-xs text-slate-300">Certified mechanical &amp; hydraulic bays at Kotoka GSE base.</p>
              </div>
            </div>

            <div className="group overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 relative aspect-[4/3]">
              <img
                src={GSE_VILLAGE_IMG}
                alt="Electric Tugs and Apron Forklifts"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5 flex flex-col justify-end">
                <p className="text-white font-bold text-base">Electric &amp; Heavy Fleet Lineup</p>
                <p className="text-xs text-slate-300">Modern Charlatte electric tugs and heavy cargo handling fleet.</p>
              </div>
            </div>

            <div className="group overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 relative aspect-[4/3]">
              <img
                src={RAMP_TRACTOR_IMG}
                alt="Mobile Airside Dispatch"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5 flex flex-col justify-end">
                <p className="text-white font-bold text-base">Airside Mobile Fast Response</p>
                <p className="text-xs text-slate-300">24/7 on-call technician vans operating across active aprons.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
