import React from 'react';
import {
  Crown,
  ShieldCheck,
  Phone,
  Mail,
  ArrowRight,
  Clock,
  Plane,
  Sparkles,
  MapPin,
  CheckCircle2,
  FileCheck2,
  Car,
  Utensils,
  Compass,
  Armchair
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

// Authentic Aviance VIP Photography
import VIP_OFFICIAL_IMG from '../../assets/aviance_images/services/vip_official.jpg'; // Official Aviance VIP Charter Aircraft & Team
import VIP_HERO_IMG from '../../assets/aviance_images/1788350257403.jpg'; // SolitAir charter aircraft with flight captains & ground crew
import VIP_CHARTER_SERVICE_IMG from '../../assets/aviance_images/services/vip_charter.jpg'; // Executive handling
import LOUNGE_SEATING_IMG from '../../assets/aviance_images/services/lounge_services.jpg'; // Adinkra lounge hospitality

interface VipCharterPageProps {
  onNavigate: (path: string) => void;
  onOpenCargoModal?: () => void;
}

export const VipCharterPage: React.FC<VipCharterPageProps> = ({ onNavigate }) => {
  const { isLight } = useTheme();

  const capabilities = [
    {
      title: 'Executive Aircraft Ramp Handling',
      desc: 'Bespoke turnaround handling for Gulfstream, Bombardier Global/Challenger, Dassault Falcon, Embraer, Cessna Citation, and Boeing Business Jets (BBJ).',
      icon: Plane,
      badge: 'All Jet Categories'
    },
    {
      title: 'VIP Apron Escort & Tarmac Transfers',
      desc: 'Chauffeured tarmac transfers directly between aircraft stand and Terminal 3 VIP / Presidential pavilions, minimizing exposure and transit time.',
      icon: Car,
      badge: 'Dedicated Vehicles'
    },
    {
      title: 'Fast-Track Customs & Diplomatic Protocol',
      desc: 'Seamless border facilitation with Ghana Immigration Service, Customs GRA, and Ministry of Foreign Affairs for state delegations, heads of state, and VIP dignitaries.',
      icon: ShieldCheck,
      badge: 'Expedited Clearance'
    },
    {
      title: 'Flight Crew Accommodation & Liaison',
      desc: 'Complete flight deck support: weather briefing packages, NOTAMs, GD filing, 5-star hotel transfers, and dedicated airside crew coordination.',
      icon: Compass,
      badge: '24/7 Crew Liaison'
    },
    {
      title: 'In-Flight Executive Catering Coordination',
      desc: 'Coordination with premier flight kitchens for bespoke in-flight culinary services, temperature-controlled staging, and cabin replenishment.',
      icon: Utensils,
      badge: 'Gourmet In-Flight'
    },
    {
      title: 'Overflight & Landing Permit Liaison',
      desc: '24/7 coordination with the Ghana Civil Aviation Authority (GCAA) for emergency diplomatic clearances, technical stops, and landing slot allocation.',
      icon: FileCheck2,
      badge: 'GCAA Authorized'
    }
  ];

  const jetCategories = [
    { name: 'Ultra Long Range & Large Cabin', models: 'Gulfstream G650/G700, Bombardier Global 7500, Falcon 8X', scope: 'Dedicated heavy towbars, high-flow GPU, custom baggage handling.' },
    { name: 'Midsize & Super-Midsize', models: 'Challenger 350, Citation Latitude, Hawker 900XP, Learjet', scope: 'Fast-turnaround fueling, lavatory/water, rapid passenger disembarkation.' },
    { name: 'Government, Diplomatic & State Missions', models: 'Airbus ACJ, Boeing BBJ, Military Transport (C-130, VIP C-17)', scope: 'Armed security perimeter liaison, protocol reception, diplomatic seal preservation.' }
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
            <span className="text-[#204696] font-semibold">VIP &amp; Charter Services</span>
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
            VIP, State &amp; Private Jet Aviation
          </h1>

          <p className="text-base sm:text-lg text-blue-100/90 font-normal leading-relaxed max-w-3xl">
            Aviance Ghana delivers discreet, world-class ground handling for heads of state, diplomatic delegations, business executives, and private jet operators. Operating round the clock across Kotoka International Airport (ACC), Prempeh I (KMS), and Tamale (TML).
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('/contact')}
              className="px-6 py-3 rounded-xl bg-[#009EE0] hover:bg-[#008bc5] text-white text-xs sm:text-sm font-bold shadow-lg shadow-[#009EE0]/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Submit Charter Handling Request</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="tel:+233593816076"
              className="px-5 py-3 border border-white/20 bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-semibold rounded-xl backdrop-blur-md transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#72BF44]" />
              <span>Charter Desk (+233 (0) 59 381 6076)</span>
            </a>
            <button
              onClick={() => onNavigate('/lounge')}
              className="px-5 py-3 border border-white/20 bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-semibold rounded-xl backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Armchair className="w-4 h-4 text-[#58C1EB]" />
              <span>Adinkra VIP Lounge</span>
            </button>
          </div>
        </div>
      </section>

      {/* Operational Key Metrics Strip */}
      <div className={`border-b py-6 ${isLight ? 'bg-slate-50/80 border-slate-200' : 'bg-[#0E1A33] border-slate-800'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#204696] dark:text-[#58C1EB]">1,200+</div>
              <div className="text-xs uppercase font-bold tracking-wider text-slate-500">Private &amp; State Flights Handled</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#009EE0]">&lt; 15 Min</div>
              <div className="text-xs uppercase font-bold tracking-wider text-slate-500">Fast-Track Border Formalities</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#72BF44]">100%</div>
              <div className="text-xs uppercase font-bold tracking-wider text-slate-500">Confidentiality &amp; Security</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-500">24/7/365</div>
              <div className="text-xs uppercase font-bold tracking-wider text-slate-500">Dedicated Charter Watch</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 space-y-20 sm:space-y-28">

        {/* Official Scope & Services — Open 2-Column Layout */}
        <section className="py-6 sm:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left Column: Scope & Key Services */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div>
                <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  VIP and Charter Services
                </h2>
                <div className={`mt-4 space-y-3 text-sm sm:text-base leading-relaxed ${
                  isLight ? 'text-slate-700' : 'text-slate-200'
                }`}>
                  <p>
                    Aviance Ghana provides personalised VIP passenger assistance, VIP aircraft handling and ground support for private and charter flights.
                  </p>
                  <p>
                    Our dedicated team works with clients, operators and flight representatives to deliver a smooth, discreet and efficiently coordinated airport experience.
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
                    'VIP meet and greet.',
                    'Passenger escort and assistance with airport formalities.',
                    'Pre-check-in and departure coordination.',
                    'VIP, private and charter aircraft ground handling.',
                    'Turnaround and operational coordination.',
                    'Ground transportation coordination.',
                    'Support tailored to individual passengers and flight operators.'
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
                <a href="mailto:charterops@avianceghana.com" className="inline-flex items-center gap-2 text-[#204696] dark:text-[#58C1EB] hover:underline">
                  <Mail className="w-4 h-4 text-[#009EE0]" />
                  <span className="underline">charterops@avianceghana.com</span>
                </a>
              </div>
            </div>

            {/* Right Column: Authentic Page Image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 dark:border-slate-800 group">
                <img
                  src={VIP_OFFICIAL_IMG}
                  alt="Aviance Ghana VIP and Charter Services"
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
                VIP Hospitality &amp; Handling
              </span>
            </div>
            <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Seamless Discretion, Punctuality &amp; Executive Care
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              From landing to take-off, our dedicated VIP protocol officers oversee every detail so passengers and crew experience effortless ground transit.
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

        {/* Visual Showcase: Real VIP Charter Operations */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 border-slate-200 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-4 rounded-full bg-[#72BF44]" />
                <span className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-[#3B7A1C]' : 'text-[#72BF44]'}`}>
                  Authentic VIP Operations
                </span>
              </div>
              <h2 className={`text-2xl sm:text-3xl font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Executive Aviation in Ghana
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 relative aspect-[16/10]">
              <img
                src={VIP_HERO_IMG}
                alt="SolitAir Charter Handling"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent p-6 flex flex-col justify-end">
                <p className="text-white font-bold text-lg">Executive Aircraft &amp; Flight Deck Coordination</p>
                <p className="text-xs text-slate-300">SolitAir charter turnaround with dedicated Aviance flight captains &amp; ramp team.</p>
              </div>
            </div>

            <div className="group overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 relative aspect-[16/10]">
              <img
                src={LOUNGE_SEATING_IMG}
                alt="Adinkra VIP Lounge Hospitality"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent p-6 flex flex-col justify-end">
                <p className="text-white font-bold text-lg">Adinkra Lounge Executive Hospitality</p>
                <p className="text-xs text-slate-300">Tranquil pre-flight relaxation, gourmet dining, private suites, and Wi-Fi.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
