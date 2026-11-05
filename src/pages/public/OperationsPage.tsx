import React from 'react';

import { Plane, ShieldCheck, MapPin, Clock, ArrowRight, Wrench, CheckCircle2, Radio, Headphones } from 'lucide-react';

import { GhanaMap } from '../../components/public/GhanaMap';

import { TurnaroundTimeline } from '../../components/public/TurnaroundTimeline';

import { LocationItem } from '../../types';

import { ScrollReveal } from '../../components/ui/ScrollReveal';



// Authentic Aviance Airside Turnaround & OCC Imagery

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

  return (

    <div className="pb-24 sm:pb-32 space-y-16 sm:space-y-24 lg:space-y-32">

      {/* Header in Official Aviance Blue */}

      <div className="py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-[#11244C] via-[#0C1933] to-[#08101E] border-b border-[#204696]/30 text-center relative overflow-hidden">

        {/* Subtle Ambient Backing Glow */}

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-36 bg-[#204696]/20 blur-3xl pointer-events-none rounded-full" />

        <div className="absolute inset-0 opacity-20 pointer-events-none">

          <img

            src={OCC_HEADSET_IMG}

            alt="Aviance Turnaround Coordinator on airside intercom"

            className="w-full h-full object-cover object-center"

          />

        </div>



        <ScrollReveal animation="fade-up">

          <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-3">

            <div className="flex items-center justify-center gap-2.5">

              <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-[#204696] via-[#009EE0] to-[#72BF44]" />

              <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#58C1EB]">

                Nationwide Ground Handling Network <span className="text-[#009EE0]">·</span> <span className="text-[#72BF44]">ACC · KMS · TML</span>

              </h2>

            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">

              Operational Footprint & Turnaround Engineering

            </h1>

            <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">

              Delivering 24/7 ground operations across Ghana's core commercial hubs: Kotoka International Airport Accra (Terminal 3 & Cargo Village), Prempeh I International Kumasi, and Tamale International.

            </p>

          </div>

        </ScrollReveal>

      </div>



      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24 lg:space-y-32">

        {/* Interactive Map */}

        <ScrollReveal animation="fade-up">

          <GhanaMap locations={locations} />

        </ScrollReveal>



        {/* Turnaround Choreography */}

        <ScrollReveal animation="fade-up">

          <TurnaroundTimeline />

        </ScrollReveal>



        {/* Real Field Operations Showcase */}

        <div className="space-y-6">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">

            <div>

              <div className="flex items-center gap-2 mb-1">

                <span className="w-1.5 h-4 rounded-full bg-gradient-to-b from-[#204696] via-[#009EE0] to-[#72BF44]" />

                <span className="text-xs font-extrabold uppercase tracking-wider text-[#58C1EB]">

                  Airside Visual Telemetry

                </span>

              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white">

                Live Ramp Turnaround & Flight Dispatch Operations

              </h2>

            </div>

            <span className="text-xs font-mono font-semibold text-[#58C1EB] bg-[#204696]/30 px-3 py-1 rounded-full border border-[#58C1EB]/30 self-start sm:self-auto">

              ISAGO Safety Standard Compliant

            </span>

          </div>



          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* 1. Turnaround Intercom */}
            <ScrollReveal animation="fade-up" delay={0}>
              <div className="group rounded-2xl border border-[#204696]/30 bg-[#0C1933]/90 overflow-hidden shadow-lg flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-[#58C1EB]/50 h-full">
                <div className="relative aspect-[16/11] overflow-hidden bg-slate-950">
                  <img
                    src={OCC_HEADSET_IMG}
                    alt="Turnaround Coordinator with headset intercom"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-3 left-3 bg-[#204696]/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-[#58C1EB]/30">
                    Cockpit Intercom
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-[#58C1EB] transition-colors">
                      Flight Crew Headset Dispatch
                    </h3>
                    <p className="text-xs mt-1.5 leading-relaxed text-slate-400">
                      Certified turnaround coordinator plugged into aircraft nose gear intercom managing pushback clearance and engine starts.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* 2. Pushback Tractor */}
            <ScrollReveal animation="fade-up" delay={80}>
              <div className="group rounded-2xl border border-[#204696]/30 bg-[#0C1933]/90 overflow-hidden shadow-lg flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-[#58C1EB]/50 h-full">
                <div className="relative aspect-[16/11] overflow-hidden bg-slate-950">
                  <img
                    src={RAMP_PUSHBACK_IMG}
                    alt="SCHOPF F300 heavy pushback tractor"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-3 left-3 bg-[#204696]/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-[#58C1EB]/30">
                    SCHOPF F300
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-[#58C1EB] transition-colors">
                      Heavy Wide-Body Pushback
                    </h3>
                    <p className="text-xs mt-1.5 leading-relaxed text-slate-400">
                      High-tonnage towbarless tractor executing precision pushbacks on Boeing 787, 777, and Airbus A350 passenger flights.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* 3. Ramp Tug Driver */}
            <ScrollReveal animation="fade-up" delay={160}>
              <div className="group rounded-2xl border border-[#204696]/30 bg-[#0C1933]/90 overflow-hidden shadow-lg flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-[#58C1EB]/50 h-full">
                <div className="relative aspect-[16/11] overflow-hidden bg-slate-950">
                  <img
                    src={FLIGHT_OPS_IMG}
                    alt="Airside TLD tug tractor driver"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-3 left-3 bg-[#204696]/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-[#58C1EB]/30">
                    Apron Logistics
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-[#58C1EB] transition-colors">
                      Airside Fleet Maneuvering
                    </h3>
                    <p className="text-xs mt-1.5 leading-relaxed text-slate-400">
                      Precision equipment driving within dedicated apron safety lanes, delivering baggage trains and GSE under strict safety rules.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* 4. Container Loading */}
            <ScrollReveal animation="fade-up" delay={240}>
              <div className="group rounded-2xl border border-[#204696]/30 bg-[#0C1933]/90 overflow-hidden shadow-lg flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-[#58C1EB]/50 h-full">
                <div className="relative aspect-[16/11] overflow-hidden bg-slate-950">
                  <img
                    src={RAMP_LOADING_IMG}
                    alt="Loading cargo container onto ramp dolly"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-3 left-3 bg-[#204696]/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-[#58C1EB]/30">
                    Turnaround Loading
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-[#58C1EB] transition-colors">
                      ULD Cargo & Hold Transfers
                    </h3>
                    <p className="text-xs mt-1.5 leading-relaxed text-slate-400">
                      Aviance ramp teams loading containerized freight and passenger baggage into lower-deck holds within target turnaround slots.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Ground Support Fleet Specs */}
        <ScrollReveal animation="fade-up">
          <div className="bg-[#0C1933]/95 border border-[#204696]/35 rounded-2xl p-8 space-y-6 shadow-xl shadow-[#204696]/10 hover:shadow-2xl hover:border-[#204696]/60 transition-all duration-300">


          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">

            <div>

              <div className="flex items-center gap-2.5 mb-1.5">

                <span className="w-1.5 h-4 rounded-full bg-gradient-to-b from-[#204696] via-[#009EE0] to-[#72BF44]" />

                <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#58C1EB]">

                  GSE Fleet & Heavy Assets

                </h3>

              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white">

                Airside Equipment Readiness

              </h2>

            </div>

            <button

              onClick={() => onNavigate('/gse-fleet-maintenance')}

              className="text-xs font-semibold text-[#58C1EB] hover:text-[#58C1EB] flex items-center gap-1"

            >

              <span>GSE Workshop Engineering</span>

              <ArrowRight className="w-3.5 h-3.5" />

            </button>

          </div>



          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-slate-300">

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">

              <span className="font-bold text-[#58C1EB] text-sm block">Pushback Tractors</span>

              <p className="text-slate-400">Heavy wide-body towbarless and conventional diesel tractors capable of B777-300ER and A350-900 pushbacks.</p>

            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">

              <span className="font-bold text-[#58C1EB] text-sm block">Ground Power Units (GPU)</span>

              <p className="text-slate-400">Continuous 400Hz 90kVA & 180kVA mobile units supplying avionics and cabin power during gate staging.</p>

            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">

              <span className="font-bold text-[#58C1EB] text-sm block">Container High Loaders</span>

              <p className="text-slate-400">Main-deck and lower-deck pallet transporters for Boeing 747F/777F freighters and passenger wide-body belly holds.</p>

            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">

              <span className="font-bold text-[#58C1EB] text-sm block">PRM Ambulift Vehicles</span>

              <p className="text-slate-400">Specialized scissor-lift cabins providing comfortable, safe airside boarding for Persons with Reduced Mobility.</p>

          </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </div>
);
};
