import React from 'react';
import {
  Cpu,
  Server,
  Wifi,
  ShieldCheck,
  Phone,
  PhoneCall,
  Mail,
  ArrowRight,
  Database,
  Radio,
  Lock,
  Layers,
  Network,
  Terminal,
  Activity
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

// Authentic Aviance Tech Photography
import TECH_HERO_IMG from '../../assets/aviance_images/image_show/ee4669f3-9945-4b97-a86e-d28b9860138a.png'; // Headset turnaround intercom & OCC dispatch
import DISPATCH_IMG from '../../assets/aviance_images/services/flight_ops.jpg'; // Central flight operations
import TERMINAL_DCS_IMG from '../../assets/aviance_images/services/passenger_services.jpg'; // Terminal check-in DCS systems

interface AviationItPageProps {
  onNavigate: (path: string) => void;
  onOpenCargoModal?: () => void;
}

export const AviationItPage: React.FC<AviationItPageProps> = ({ onNavigate }) => {
  const { isLight } = useTheme();

  const itPillars = [
    {
      title: 'CUTE / CUSS & DCS Host Connectivity',
      desc: 'Seamless CUTE/CUPPS terminal integration at Kotoka Terminal 3, connecting SITA, Amadeus Altéa, Sabre, Navitaire, and proprietary airline hosts.',
      icon: Terminal,
      badge: 'Multi-Host DCS'
    },
    {
      title: 'Mobile Baggage Reconciliation (BRS - IATA 753)',
      desc: 'Airside ruggedized mobile handheld scanners ensuring 100% positive passenger-bag reconciliation and real-time hold loading verification.',
      icon: Layers,
      badge: 'IATA 753 Compliant'
    },
    {
      title: 'WorldTracer Global Tracking Network',
      desc: 'Direct interface with SITA WorldTracer for rapid tracing of delayed baggage, electronic On-Hand Baggage (OHD) creation, and rush routing.',
      icon: Network,
      badge: 'SITA WorldTracer'
    },
    {
      title: 'Electronic Cargo & Customs Link (e-AWB & ICUMS)',
      desc: 'Automated electronic air waybill (e-AWB) data interchange linking Aviance Cargo Village directly with Ghana’s Integrated Customs Management System (ICUMS).',
      icon: Database,
      badge: 'e-AWB & ICUMS'
    },
    {
      title: 'Encrypted Airside VHF Communications',
      desc: 'Dedicated digital multi-channel radio network and headset turnaround communication systems keeping ramp, OCC, and gate supervisors synchronized.',
      icon: Radio,
      badge: 'Airside Radio Network'
    },
    {
      title: 'Cybersecurity, Redundancy & UPS Failover',
      desc: 'Enterprise firewall architectures, zero-trust protocols, redundant fiber backbones, and uninterruptible power supply (UPS) guaranteeing 99.99% uptime.',
      icon: Lock,
      badge: '99.99% Uptime SLA'
    }
  ];

  const systemsMatrix = [
    { system: 'Departure Control Systems (DCS)', partners: 'Amadeus Altéa, SITA AirportConnect, Sabre, Navitaire', scope: 'Passenger check-in, electronic bag-tagging, electronic manifest reconciliation.' },
    { system: 'Baggage Management (BRS & Tracing)', partners: 'SITA BagManager, WorldTracer Global, Quantum BRS', scope: 'IATA Res 753 baggage tracking, ramp hold sortation, PIR handling.' },
    { system: 'Cargo Freight Management', partners: 'Aviance CargoNet, Ghana ICUMS Customs Gateway', scope: 'e-AWB electronic manifest, warehouse storage indexing, bonded customs clearance.' },
    { system: 'Flight Watch & Operations Dispatch', partners: 'SITA Teletype, AFTN / AMHS, Type B Messaging', scope: 'MVT movement messages, LDM load distribution messages, NOTAM delivery.' }
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
            <span className="text-[#204696] font-semibold">Aviation IT &amp; Systems</span>
          </div>
        </div>
      </div>

      {/* Hero Header in Signature Aviance Blue Grid */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#11244C] via-[#1A3670] to-[#204696] text-white py-14 sm:py-20 lg:py-24">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-bold tracking-[-0.028em] text-white leading-[1.14]">
            Mission-Critical Aviation IT, DCS &amp; Airport Digital Infrastructure
          </h1>

          <p className="text-base sm:text-lg text-blue-100/90 font-normal leading-relaxed max-w-3xl">
            Aviance Ghana deploys resilient, mission-critical digital systems powering front-of-house airline departure control, airside wireless baggage reconciliation (BRS), automated cargo tracking, and high-security operations communications across Ghana's airport network.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('/contact')}
              className="px-6 py-3 rounded-xl bg-white hover:bg-blue-50 text-[#11244C] text-xs sm:text-sm font-bold shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Inquire DCS Connectivity &amp; Systems</span>
              <ArrowRight className="w-4 h-4 text-[#204696]" />
            </button>
            <a
              href="tel:+233593816076"
              className="px-5 py-3 border border-white/20 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold rounded-xl backdrop-blur-md transition-all flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-[#58C1EB]" />
              <span>IT Helpdesk (+233 (0) 59 381 6076)</span>
            </a>
            <button
              onClick={() => onNavigate('/partner-portal')}
              className="px-5 py-3 border border-white/20 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold rounded-xl backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Server className="w-4 h-4 text-[#72BF44]" />
              <span>Airline Systems Portal</span>
            </button>
          </div>
        </div>
      </section>
              <span>Airline Partner Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Operational Key Metrics Strip */}
      <div className={`border-b py-6 ${isLight ? 'bg-slate-50/80 border-slate-200' : 'bg-[#0E1A33] border-slate-800'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#204696] dark:text-[#58C1EB]">99.99%</div>
              <div className="text-xs uppercase font-bold tracking-wider text-slate-500">Infrastructure Uptime SLA</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#009EE0]">40+ Hosts</div>
              <div className="text-xs uppercase font-bold tracking-wider text-slate-500">Airline DCS Integrations</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#72BF44]">IATA 753</div>
              <div className="text-xs uppercase font-bold tracking-wider text-slate-500">100% Barcode Baggage Matching</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-500">24/7/365</div>
              <div className="text-xs uppercase font-bold tracking-wider text-slate-500">Airside Systems Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 space-y-20 sm:space-y-28">

        {/* 6 Core Capabilities */}
        <section className="space-y-8">
          <div className="max-w-3xl space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full bg-[#204696]" />
              <span className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`}>
                Aviation IT Solutions
              </span>
            </div>
            <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Seamless System Integration Across Every Flight Phase
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              Our dedicated in-house systems engineers configure, monitor, and maintain high-speed connectivity to global aviation telecommunications networks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {itPillars.map((c, i) => {
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

        {/* Global Aviation Systems Architecture */}
        <section className={`p-8 sm:p-12 rounded-3xl border ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#11244C]/30 border-slate-800'
        }`}>
          <div className="max-w-3xl space-y-3 mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#009EE0]">Global Connectivity</span>
            <h2 className={`text-2xl sm:text-3xl font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Supported Airline DCS &amp; Operations Systems
            </h2>
            <p className={`text-sm ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              Direct compatibility with major international aviation IT platforms and telecommunications backbones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {systemsMatrix.map((sm, i) => (
              <div
                key={i}
                className={`p-6 rounded-2xl border ${
                  isLight ? 'bg-white border-slate-200 shadow-2xs' : 'bg-[#0E1B38] border-slate-800'
                } space-y-2`}
              >
                <div className="text-xs font-mono font-bold text-[#204696] dark:text-[#58C1EB] uppercase">
                  {sm.system}
                </div>
                <h4 className={`font-bold text-base ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {sm.partners}
                </h4>
                <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  {sm.scope}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact & IT Directorate CTA */}
        <section className={`p-8 sm:p-12 rounded-3xl border text-center space-y-6 ${
          isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0E1A33] border-slate-800'
        }`}>
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className={`text-2xl sm:text-3xl font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Aviation IT Integration &amp; Support Inquiries
            </h2>
            <p className={`text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              For airline station IT onboarding, CUTE link configuration, and BRS scanner pairing, contact our Systems &amp; Technology Directorate.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('/contact')}
              className="px-6 py-3.5 rounded-xl bg-[#204696] hover:bg-[#153170] text-white text-xs sm:text-sm font-bold shadow-lg shadow-blue-900/20 transition-all cursor-pointer"
            >
              Contact IT Directorate
            </button>
            <button
              onClick={() => onNavigate('/partner-portal')}
              className={`px-6 py-3.5 rounded-xl border text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                isLight ? 'border-slate-300 hover:bg-slate-100 text-slate-800' : 'border-slate-700 hover:bg-slate-800 text-slate-200'
              }`}
            >
              Access Partner Portal
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};
