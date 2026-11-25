import React from 'react';
import { Phone, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { LocationItem } from '../../types';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { useTheme } from '../../context/ThemeContext';

// Authentic Aviance Airside Turnaround & OCC Imagery
import FLIGHT_OPS_OFFICIAL_IMG from '../../assets/aviance_images/services/flight_ops_official.jpg'; // Official Aviance OCC & Flight Dispatch
import OCC_HEADSET_IMG from '../../assets/aviance_images/image_show/ee4669f3-9945-4b97-a86e-d28b9860138a.png'; // Headset intercom coordinator
import RAMP_PUSHBACK_IMG from '../../assets/aviance_images/1791968160594.jpg'; // SCHOPF F300 pushback tractor at B787
import FLIGHT_OPS_IMG from '../../assets/aviance_images/services/flight_ops.jpg'; // TLD tractor driver airside
import RAMP_LOADING_IMG from '../../assets/aviance_images/image_show/1759758700331.jpg'; // Cargo ULD ramp loading

interface OperationsPageProps {
  locations: LocationItem[];
  onNavigate: (path: string) => void;
  onOpenCargoModal: () => void;
}

export const OperationsPage: React.FC<OperationsPageProps> = ({ locations, onNavigate, onOpenCargoModal: _onOpenCargoModal }) => {
  const { isLight } = useTheme();

  return (
    <div className={`min-h-screen pb-24 sm:pb-32 transition-colors ${
      isLight ? 'bg-white text-slate-800' : 'bg-[#0B1528] text-slate-100'
    }`}>
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
            <span className="text-[#204696] font-semibold">Flight Operations &amp; OCC</span>
          </div>
        </div>
      </div>

      {/* Hero Header — Aviance Blue Grid Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#11244C] via-[#1A3670] to-[#204696] text-white py-14 sm:py-20 lg:py-24 text-center">
        {/* Subtle aeronautical blueprint grid */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        <ScrollReveal animation="fade-up">
          <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-white tracking-[-0.028em] leading-[1.14]">
              Operational Footprint &amp; Turnaround Engineering
            </h1>

            <p className="text-base sm:text-lg text-blue-100/90 max-w-2xl mx-auto leading-relaxed font-normal">
              Delivering 24/7 ground operations across Ghana's core commercial hubs: Kotoka International Airport Accra (Terminal 3 &amp; Cargo Village), Prempeh I International Kumasi, and Tamale International.
            </p>
          </div>
        </ScrollReveal>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 space-y-16 sm:space-y-24 lg:space-y-32">

        {/* Official Scope & Key Services — Open 2-Column Layout */}
        <ScrollReveal animation="fade-up">
          <section className="py-6 sm:py-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              {/* Left Column: Scope & Key Services */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-4 rounded-full bg-gradient-to-b from-[#204696] via-[#009EE0] to-[#72BF44]" />
                    <span className={`text-xs font-extrabold uppercase tracking-widest ${
                      isLight ? 'text-[#204696]' : 'text-[#58C1EB]'
                    }`}>
                      Real-Time Airside Coordination
                    </span>
                  </div>
                  <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>
                    OCC - Flight Operations
                  </h2>
                  <p className={`mt-4 text-sm sm:text-base leading-relaxed ${
                    isLight ? 'text-slate-600' : 'text-slate-300'
                  }`}>
                    Aviance Ghana’s Operations Control Centre coordinates flight activities in real time, linking teams, resources, airline partners and airport stakeholders to support safe, efficient and on-time operations.
                  </p>
                </div>

                <div>
                  <h3 className={`text-base sm:text-lg font-bold mb-3 ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>
                    Key services
                  </h3>
                  <ul className="space-y-3 text-sm sm:text-base">
                    {[
                      'Operational reporting and performance monitoring.',
                      'Delay, disruption and incident coordination.',
                      'Communication with airline partners and operational teams.',
                      'Resource allocation, turnaround oversight as well as Weight and Balance functions.',
                      'Flight monitoring and operational coordination.'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-[#204696] dark:text-[#009EE0] shrink-0 mt-1" />
                        <span className={isLight ? 'text-slate-700' : 'text-slate-300'}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-6 text-xs sm:text-sm font-semibold">
                  <a
                    href="tel:+233593816076"
                    className={`inline-flex items-center gap-2 font-bold hover:underline transition-colors ${
                      isLight ? 'text-[#204696] hover:text-[#009EE0]' : 'text-[#58C1EB] hover:text-white'
                    }`}
                  >
                    <Phone className="w-4 h-4 text-[#72BF44]" />
                    <span>CONTACT: +233 (0) 59 381 60 76</span>
                  </a>
                  <a
                    href="mailto:occmgr@avianceghana.com"
                    className={`inline-flex items-center gap-2 font-bold hover:underline transition-colors ${
                      isLight ? 'text-[#204696] hover:text-[#009EE0]' : 'text-[#58C1EB] hover:text-white'
                    }`}
                  >
                    <Mail className="w-4 h-4 text-[#009EE0]" />
                    <span className="underline">occmgr@avianceghana.com</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Authentic Page Image */}
              <div className="lg:col-span-5">
                <div className={`relative rounded-2xl overflow-hidden shadow-xl border group ${
                  isLight ? 'border-slate-200/90' : 'border-slate-800'
                }`}>
                  <img
                    src={FLIGHT_OPS_OFFICIAL_IMG}
                    alt="Aviance Ghana OCC Flight Operations"
                    className="w-full h-auto max-h-[520px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Real Field Operations Showcase */}
        <div className="space-y-6">
          <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 ${
            isLight ? 'border-slate-200' : 'border-slate-800'
          }`}>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-4 rounded-full bg-gradient-to-b from-[#204696] via-[#009EE0] to-[#72BF44]" />
                <span className={`text-xs font-extrabold uppercase tracking-wider ${
                  isLight ? 'text-[#204696]' : 'text-[#58C1EB]'
                }`}>
                  Airside Visual Telemetry
                </span>
              </div>
              <h2 className={`text-xl sm:text-2xl font-bold ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                Live Ramp Turnaround &amp; Flight Dispatch Operations
              </h2>
            </div>

            <span className={`text-xs font-mono font-semibold px-3 py-1 rounded-full border self-start sm:self-auto ${
              isLight
                ? 'text-[#204696] bg-blue-50 border-blue-200/60'
                : 'text-[#58C1EB] bg-[#204696]/30 border-[#58C1EB]/30'
            }`}>
              ISAGO Safety Standard Compliant
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. Turnaround Intercom */}
            <ScrollReveal animation="fade-up" delay={0}>
              <div className="group flex flex-col space-y-3 h-full">
                <div className={`relative aspect-[16/11] overflow-hidden rounded-xl border ${
                  isLight ? 'bg-slate-100 border-slate-200/80 shadow-sm' : 'bg-slate-950 border-slate-800'
                }`}>
                  <img
                    src={OCC_HEADSET_IMG}
                    alt="Turnaround Coordinator with headset intercom"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className={`text-sm font-bold transition-colors ${
                    isLight
                      ? 'text-slate-900 group-hover:text-[#204696]'
                      : 'text-white group-hover:text-[#58C1EB]'
                  }`}>
                    Flight Crew Headset Dispatch
                  </h3>
                  <p className={`text-xs leading-relaxed ${
                    isLight ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                    Certified turnaround coordinator plugged into aircraft nose gear intercom managing pushback clearance and engine starts.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* 2. Pushback Tractor */}
            <ScrollReveal animation="fade-up" delay={80}>
              <div className="group flex flex-col space-y-3 h-full">
                <div className={`relative aspect-[16/11] overflow-hidden rounded-xl border ${
                  isLight ? 'bg-slate-100 border-slate-200/80 shadow-sm' : 'bg-slate-950 border-slate-800'
                }`}>
                  <img
                    src={RAMP_PUSHBACK_IMG}
                    alt="SCHOPF F300 heavy pushback tractor"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className={`text-sm font-bold transition-colors ${
                    isLight
                      ? 'text-slate-900 group-hover:text-[#204696]'
                      : 'text-white group-hover:text-[#58C1EB]'
                  }`}>
                    Heavy Wide-Body Pushback
                  </h3>
                  <p className={`text-xs leading-relaxed ${
                    isLight ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                    High-tonnage towbarless tractor executing precision pushbacks on Boeing 787, 777, and Airbus A350 passenger flights.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* 3. Ramp Tug Driver */}
            <ScrollReveal animation="fade-up" delay={160}>
              <div className="group flex flex-col space-y-3 h-full">
                <div className={`relative aspect-[16/11] overflow-hidden rounded-xl border ${
                  isLight ? 'bg-slate-100 border-slate-200/80 shadow-sm' : 'bg-slate-950 border-slate-800'
                }`}>
                  <img
                    src={FLIGHT_OPS_IMG}
                    alt="Airside TLD tug tractor driver"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className={`text-sm font-bold transition-colors ${
                    isLight
                      ? 'text-slate-900 group-hover:text-[#204696]'
                      : 'text-white group-hover:text-[#58C1EB]'
                  }`}>
                    Airside Fleet Maneuvering
                  </h3>
                  <p className={`text-xs leading-relaxed ${
                    isLight ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                    Precision equipment driving within dedicated apron safety lanes, delivering baggage trains and GSE under strict safety rules.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* 4. Container Loading */}
            <ScrollReveal animation="fade-up" delay={240}>
              <div className="group flex flex-col space-y-3 h-full">
                <div className={`relative aspect-[16/11] overflow-hidden rounded-xl border ${
                  isLight ? 'bg-slate-100 border-slate-200/80 shadow-sm' : 'bg-slate-950 border-slate-800'
                }`}>
                  <img
                    src={RAMP_LOADING_IMG}
                    alt="Loading cargo container onto ramp dolly"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className={`text-sm font-bold transition-colors ${
                    isLight
                      ? 'text-slate-900 group-hover:text-[#204696]'
                      : 'text-white group-hover:text-[#58C1EB]'
                  }`}>
                    ULD Cargo &amp; Hold Transfers
                  </h3>
                  <p className={`text-xs leading-relaxed ${
                    isLight ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                    Aviance ramp teams loading containerized freight and passenger baggage into lower-deck holds within target turnaround slots.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Ground Support Fleet Specs — Streamlined CTA Banner */}
        <ScrollReveal animation="fade-up">
          <div className={`pt-6 sm:pt-10 border-t ${
            isLight ? 'border-slate-200' : 'border-slate-800'
          }`}>
            <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-6 sm:p-8 rounded-2xl border transition-all ${
              isLight
                ? 'bg-gradient-to-r from-blue-50/60 via-slate-50 to-blue-50/30 border-slate-200/80 shadow-sm'
                : 'bg-gradient-to-r from-slate-900 via-[#0B1528] to-slate-900 border-slate-800 shadow-md'
            }`}>
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-1.5 h-4 rounded-full bg-gradient-to-b from-[#204696] via-[#009EE0] to-[#72BF44]" />
                  <h3 className={`text-xs sm:text-sm font-extrabold uppercase tracking-widest ${
                    isLight ? 'text-[#204696]' : 'text-[#58C1EB]'
                  }`}>
                    GSE Fleet &amp; Heavy Assets
                  </h3>
                </div>
                <h2 className={`text-xl sm:text-2xl font-bold tracking-tight ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  Airside Equipment Readiness
                </h2>
                <p className={`text-xs sm:text-sm max-w-2xl leading-relaxed ${
                  isLight ? 'text-slate-600' : 'text-slate-400'
                }`}>
                  Specialized ground fleet engineered for wide-body turnaround reliability, 400Hz avionics power, and strict IATA AHM 910/913 compliance.
                </p>
              </div>

              <button
                onClick={() => onNavigate('/gse-fleet-maintenance')}
                className={`self-start sm:self-auto px-5 py-3 rounded-xl border text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer group shadow-sm shrink-0 ${
                  isLight
                    ? 'bg-[#204696] hover:bg-[#1A3670] text-white border-[#204696] shadow-blue-500/10'
                    : 'bg-[#204696] hover:bg-[#1A3670] text-white border-[#58C1EB]/30'
                }`}
              >
                <span>GSE Workshop Engineering</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};
