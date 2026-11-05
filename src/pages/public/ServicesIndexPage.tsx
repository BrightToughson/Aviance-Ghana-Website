import React from 'react';
import {
  Users,
  Plane,
  Armchair,
  Shield,
  PackageCheck,
  Luggage,
  Cpu,
  Wrench,
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  Clock,
  MapPin,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  FileCheck2
} from 'lucide-react';
import { Service } from '../../types';
import { ScrollReveal } from '../../components/ui/ScrollReveal';

// Authentic Official Aviance Images
import PASSENGER_IMG from '../../assets/aviance_images/services/vip_charter.jpg'; // Frontline DCS check-in agent at Kotoka T3
import RAMP_IMG from '../../assets/aviance_images/1791968160594.jpg'; // SCHOPF F300 pushback tractor at B787 nose
import LOUNGE_IMG from '../../assets/aviance_images/services/lounge_services.jpg'; // Adinkra Executive Lounge
import VIP_IMG from '../../assets/aviance_images/1788350257403.jpg'; // Charter aircraft, pilots & ground team on tarmac
import CARGO_IMG from '../../assets/aviance_images/services/cargo_services.jpg'; // Cold room & screening facility
import BAGGAGE_IMG from '../../assets/aviance_images/services/find_my_bag.jpg'; // Baggage makeup hall sortation
import FLIGHT_OPS_IMG from '../../assets/aviance_images/image_show/ee4669f3-9945-4b97-a86e-d28b9860138a.png'; // Headset turnaround intercom coordinator
import GSE_IMG from '../../assets/aviance_images/services/gse_maintenance.jpg'; // GSE workshop engineering
import TRAINING_IMG from '../../assets/aviance_images/image_show/1740561240681.jpg'; // Aviance Training Room & class

interface ServicesIndexPageProps {
  services: Service[];
  onNavigate: (path: string) => void;
  onOpenCargoModal: () => void;
  onOpenVipModal?: () => void;
}

export const ServicesIndexPage: React.FC<ServicesIndexPageProps> = ({
  services: _services,
  onNavigate,
  onOpenCargoModal,
  onOpenVipModal: _onOpenVipModal,
}) => {
  // Primary 8 Official Capabilities Matching Authentic Aviance Ghana Layout
  const officialServices = [
    {
      id: 'passenger',
      title: 'Passenger Services',
      subtitle: 'Professional support throughout the passenger journey, from check-in to boarding and arrival.',
      category: 'Passenger & Terminal',
      badge: 'IATA ISAGO Accredited',
      terminalBadge: 'Kotoka Terminal 3',
      image: PASSENGER_IMG,
      path: '/passenger-services',
      highlights: [
        'DCS Check-in & Electronic Boarding',
        'PRM Dedicated Mobility Assistance',
        'Boarding Gate Management & Reconciliation'
      ],
      quickActionText: 'Flight Handling Info',
      onQuickAction: () => onNavigate('/passenger-services')
    },
    {
      id: 'ramp',
      title: 'Ramp Handling',
      subtitle: 'Safe and efficient aircraft turnaround, baggage, equipment and ramp support services.',
      category: 'Ramp & Apron',
      badge: 'Safe Turnaround',
      terminalBadge: 'Airside Apron 24/7',
      image: RAMP_IMG,
      path: '/ramp-handling',
      highlights: [
        'Towbarless Pushback & Aircraft Towing',
        'GPU, Air Start & Potable Water Servicing',
        'Precision Baggage Loading & Ramp Transfer'
      ],
      quickActionText: 'Ramp Capabilities',
      onQuickAction: () => onNavigate('/ramp-handling')
    },
    {
      id: 'lounge',
      title: 'Lounge Services',
      subtitle: 'Comfortable lounge experiences for premium, eligible and walk-in passengers.',
      category: 'Hospitality & VIP',
      badge: 'Premium Hospitality',
      terminalBadge: 'Departures Level 2',
      image: LOUNGE_IMG,
      path: '/lounge',
      highlights: [
        'Adinkra Executive Lounge (Terminal 3)',
        'The U Lounge ($25 Walk-in Access)',
        'Complimentary Buffet, Bar & High-Speed Wi-Fi'
      ],
      quickActionText: 'Explore Lounges',
      onQuickAction: () => onNavigate('/lounge')
    },
    {
      id: 'vip',
      title: 'VIP and Charter Services',
      subtitle: 'Aviance Ghana specializes in delivering customized passenger assistance, aircraft handling, and comprehensive ground support services tailored for private and charter flight operations.',
      category: 'Hospitality & VIP',
      badge: 'Diplomatic & Private Aviation',
      terminalBadge: 'VIP Apron Escort',
      image: VIP_IMG,
      path: '/vip-charter',
      highlights: [
        'Personalized Apron Escort & Fast-Track Customs',
        'Business Jet Handling & Diplomatic Protocol',
        'Dedicated Crew Facilitation & Private Lounges'
      ],
      quickActionText: 'View VIP Services',
      onQuickAction: () => onNavigate('/vip-charter')
    },
    {
      id: 'cargo',
      title: 'Cargo Services',
      subtitle: 'Secure import and export cargo handling supported by experienced teams and modern systems.',
      category: 'Cargo Logistics',
      badge: 'EU RA3 Certified',
      terminalBadge: 'Cold Room Screening Hub',
      image: CARGO_IMG,
      path: '/cargo',
      highlights: [
        '60% National Cargo Market Share',
        'Dedicated Temperature-Controlled Cold Room',
        'IATA Dangerous Goods (DGR) & Live Animals'
      ],
      quickActionText: 'Quote Cargo Rates',
      onQuickAction: onOpenCargoModal
    },
    {
      id: 'baggage',
      title: 'Find My Bag',
      subtitle: 'A direct support channel for passengers following up on delayed or missing baggage.',
      category: 'Passenger Care',
      badge: 'WorldTracer Tracking',
      terminalBadge: 'ACC Arrivals Helpdesk',
      image: BAGGAGE_IMG,
      path: '/find-my-bag',
      highlights: [
        'Direct WorldTracer Baggage System Access',
        '24/7 Missing Baggage PIR Tracking',
        'Dedicated Baggage Helpdesk at Kotoka Arrivals'
      ],
      quickActionText: 'Track Your Baggage',
      onQuickAction: () => onNavigate('/find-my-bag')
    },
    {
      id: 'flight-ops',
      title: 'OCC - Flight Operations',
      subtitle: '24/7 centralized flight dispatch, apron turnaround coordination, slot management, and real-time load control.',
      category: 'Technical & Flight Ops',
      badge: '24/7 Operations Control',
      terminalBadge: 'Central Dispatch Centre',
      image: FLIGHT_OPS_IMG,
      path: '/operations',
      highlights: [
        'Computerized Flight Planning & Load Sheets',
        'Real-time VHF Apron Operations Coordination',
        'Overflight Clearances & Slot Management'
      ],
      quickActionText: 'Contact 24/7 OCC',
      onQuickAction: () => onNavigate('/contact#occ')
    },
    {
      id: 'training',
      title: 'Training',
      subtitle: 'Aviance Ghana provides practical aviation training designed to strengthen safety, operational performance and service delivery.',
      category: 'Aviation Training',
      badge: 'Certified Training',
      terminalBadge: 'Training Centre',
      image: TRAINING_IMG,
      path: '/training',
      highlights: [
        'SMS, Human Factors, Ramp Safety & Customer Service',
        'Passenger Handling, Turnaround, Driving & Cargo',
        'Training Room Hire: Large (25), Standard (12), Small (8)'
      ],
      quickActionText: 'View Training Details',
      onQuickAction: () => onNavigate('/training')
    },
    {
      id: 'gse',
      title: 'GSE & Fleet Maintenance',
      subtitle: 'Specialized maintenance and preventive care keeping ground support equipment safe and operational under IATA AHM standards.',
      category: 'Technical & Flight Ops',
      badge: '$1M+ Eco Fleet',
      terminalBadge: 'Airside Workshop 24/7',
      image: GSE_IMG,
      path: '/gse-fleet-maintenance',
      highlights: [
        '$1M+ eco-friendly electric GSE investment',
        '24/7 on-call certified equipment technicians',
        'Preventive overhaul for motorized & non-motorized GSE'
      ],
      quickActionText: 'Explore GSE Capabilities',
      onQuickAction: () => onNavigate('/gse-fleet-maintenance')
    }
  ];


  return (
    <div className="bg-white text-slate-800 min-h-screen">
      
      {/* Hero Header on Pure White Canvas */}
      <section className="py-12 sm:py-16 lg:py-20 border-b border-slate-200/80 bg-gradient-to-b from-blue-50/40 via-white to-white">
        <ScrollReveal animation="fade-up">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-[#204696] via-[#009EE0] to-[#72BF44]" />
                <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#204696]">
                  Ghana's Premier Ground Handling Agent <span className="text-[#009EE0]">·</span> <span className="text-[#3B7A1C]">Est. 1994</span>
                </h2>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Aviation Ground Handling Services
              </h1>

              <p className="text-base sm:text-lg leading-relaxed text-slate-600 font-normal">
                Operating across Kotoka International Airport (<strong className="text-slate-800 font-semibold">ACC</strong>), Prempeh I International Kumasi (<strong className="text-slate-800 font-semibold">KMS</strong>), and Tamale International (<strong className="text-slate-800 font-semibold">TML</strong>), Aviance Ghana delivers certified turnaround safety, world-class cargo handling, and executive passenger hospitality.
              </p>

              {/* Quick Accreditation Badges */}
              <div className="pt-2 flex flex-wrap items-center gap-2.5 text-xs text-slate-700">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#72BF44]/15 border border-[#72BF44]/40 shadow-xs font-bold text-[#3B7A1C]">
                  <ShieldCheck className="w-4 h-4 text-[#72BF44] shrink-0" />
                  IATA ISAGO Accredited
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-xs font-semibold text-slate-800">
                  <FileCheck2 className="w-4 h-4 text-[#204696] shrink-0" />
                  EU RA3 Certified
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-xs font-semibold text-slate-800">
                  <MapPin className="w-4 h-4 text-[#204696] shrink-0" />
                  ACC · KMS · TML Stations
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-xs font-semibold text-slate-800">
                  <Clock className="w-4 h-4 text-[#204696] shrink-0" />
                  24/7 Operations Control
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>


      {/* Authentic Checkerboard Services Layout (Alternating Image & Content Tiles) */}
      <section className="py-12 sm:py-16 lg:py-20 pb-20 sm:pb-28 lg:pb-36 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Pair 1: Passenger Services (Image Left, Card Right) + Ramp Handling (Image Left, Card Right) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-stretch mb-8 sm:mb-12 lg:mb-16">
            
            {/* 1. Passenger Services - Photo */}
            <div
              onClick={() => onNavigate('/passenger-services')}
              className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 min-h-[300px] lg:min-h-[360px] shadow-xs cursor-pointer hover:shadow-md transition-all"
            >
              <img
                src={PASSENGER_IMG}
                alt="Passenger Services - Check-in Counter"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              <div className="absolute top-3.5 left-3.5">
                <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm text-[11px] font-bold text-slate-800 shadow-xs border border-white/60">
                  Terminal 3 Check-In
                </span>
              </div>
              <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                <span className="text-xs font-semibold text-blue-200 uppercase tracking-wider block">
                  Passenger Handling
                </span>
                <span className="text-sm font-bold">Kotoka International Airport</span>
              </div>
            </div>

            {/* 2. Passenger Services - Card */}
            <div
              onClick={() => onNavigate('/passenger-services')}
              className="rounded-2xl border border-slate-200 p-6 sm:p-7 flex flex-col justify-between bg-white shadow-xs hover:shadow-md hover:border-[#204696]/40 transition-all group cursor-pointer"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#204696] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                    Passenger Journey
                  </span>
                  <Users className="w-4 h-4 text-slate-400 group-hover:text-[#204696] transition-colors" />
                </div>

                <h2 className="text-2xl font-bold text-[#204696] group-hover:text-blue-800 transition-colors">
                  Passenger Services
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Professional support throughout the passenger journey, from check-in to boarding and arrival.
                </p>

                {/* Bullets */}
                <ul className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#72BF44] shrink-0" />
                    <span>DCS automated check-in & boarding</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#72BF44] shrink-0" />
                    <span>PRM special mobility escort</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#72BF44] shrink-0" />
                    <span>Gate reconciliation & transfer care</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('/passenger-services');
                  }}
                  className="px-4 py-2 rounded-xl border border-[#204696] text-[#204696] hover:bg-[#204696] hover:text-white transition-all text-xs font-bold flex items-center gap-1.5 group/btn cursor-pointer"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
                <span className="text-[11px] font-mono text-slate-400">ACC · KMS · TML</span>
              </div>
            </div>

            {/* 3. Ramp Handling - Photo */}
            <div
              onClick={() => onNavigate('/ramp-handling')}
              className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 min-h-[300px] lg:min-h-[360px] shadow-xs cursor-pointer hover:shadow-md transition-all"
            >
              <img
                src={RAMP_IMG}
                alt="Ramp Handling - Apron Operations"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              <div className="absolute top-3.5 left-3.5">
                <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm text-[11px] font-bold text-slate-800 shadow-xs border border-white/60">
                  Airside Apron 24/7
                </span>
              </div>
              <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                <span className="text-xs font-semibold text-blue-200 uppercase tracking-wider block">
                  Apron Turnaround
                </span>
                <span className="text-sm font-bold">Boeing 787 Pushback</span>
              </div>
            </div>

            {/* 4. Ramp Handling - Card */}
            <div
              onClick={() => onNavigate('/ramp-handling')}
              className="rounded-2xl border border-slate-200 p-6 sm:p-7 flex flex-col justify-between bg-white shadow-xs hover:shadow-md hover:border-[#72BF44]/60 transition-all group cursor-pointer"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#3B7A1C] bg-[#72BF44]/15 px-2.5 py-0.5 rounded-full border border-[#72BF44]/30">
                    Apron Operations · ISAGO Safe
                  </span>
                  <Plane className="w-4 h-4 text-slate-400 group-hover:text-[#204696] transition-colors" />
                </div>

                <h2 className="text-2xl font-bold text-[#204696] group-hover:text-blue-800 transition-colors">
                  Ramp Handling
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Safe and efficient aircraft turnaround, baggage, equipment and ramp support services.
                </p>

                {/* Bullets */}
                <ul className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#72BF44] shrink-0" />
                    <span>Towbarless pushback & towing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#72BF44] shrink-0" />
                    <span>Ground Power Units (GPU) & Air Start</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#72BF44] shrink-0" />
                    <span>Potable water & lavatory servicing</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('/ramp-handling');
                  }}
                  className="px-4 py-2 rounded-xl border border-[#204696] text-[#204696] hover:bg-[#204696] hover:text-white transition-all text-xs font-bold flex items-center gap-1.5 group/btn cursor-pointer"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
                <span className="text-[11px] font-mono text-slate-400">ISAGO Certified</span>
              </div>
            </div>

          </div>

          {/* Pair 2: Lounge Services (Card Left, Image Right) + VIP & Charter (Card Left, Image Right) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-stretch mb-8 sm:mb-12 lg:mb-16">
            
            {/* 5. Lounge Services - Card (Left) */}
            <div
              onClick={() => onNavigate('/lounge')}
              className="rounded-2xl border border-slate-200 p-6 sm:p-7 flex flex-col justify-between bg-white shadow-xs hover:shadow-md hover:border-[#204696]/40 transition-all group cursor-pointer"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#204696] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                    Hospitality
                  </span>
                  <Armchair className="w-4 h-4 text-slate-400 group-hover:text-[#204696] transition-colors" />
                </div>

                <h2 className="text-2xl font-bold text-[#204696] group-hover:text-blue-800 transition-colors">
                  Lounge Services
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Comfortable lounge experiences for premium, eligible and walk-in passengers.
                </p>

                {/* Bullets */}
                <ul className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#72BF44] shrink-0" />
                    <span>Adinkra Executive Lounge (Terminal 3)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#72BF44] shrink-0" />
                    <span>The U Lounge ($25 walk-in access)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#72BF44] shrink-0" />
                    <span>Hot buffet, premium bar & high-speed Wi-Fi</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('/lounge');
                  }}
                  className="px-4 py-2 rounded-xl border border-[#204696] text-[#204696] hover:bg-[#204696] hover:text-white transition-all text-xs font-bold flex items-center gap-1.5 group/btn cursor-pointer"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
                <span className="text-[11px] font-mono text-slate-400">Terminal 3 & 2</span>
              </div>
            </div>

            {/* 6. Lounge Services - Photo (Right) */}
            <div
              onClick={() => onNavigate('/lounge')}
              className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 min-h-[300px] lg:min-h-[360px] shadow-xs cursor-pointer hover:shadow-md transition-all"
            >
              <img
                src={LOUNGE_IMG}
                alt="Adinkra Executive Lounge Interior"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              <div className="absolute top-3.5 left-3.5">
                <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm text-[11px] font-bold text-slate-800 shadow-xs border border-white/60">
                  Adinkra & The U Lounge
                </span>
              </div>
              <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                <span className="text-xs font-semibold text-blue-200 uppercase tracking-wider block">
                  Executive Hospitality
                </span>
                <span className="text-sm font-bold">Kotoka Terminal 3 Departures</span>
              </div>
            </div>

            {/* 7. VIP and Charter Services - Card (Left) */}
            <div
              onClick={() => onNavigate('/vip-charter')}
              className="rounded-2xl border border-slate-200 p-6 sm:p-7 flex flex-col justify-between bg-white shadow-xs hover:shadow-md hover:border-[#204696]/40 transition-all group cursor-pointer"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#204696] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                    VIP & Charter
                  </span>
                  <Shield className="w-4 h-4 text-slate-400 group-hover:text-[#204696] transition-colors" />
                </div>

                <h2 className="text-2xl font-bold text-[#204696] group-hover:text-blue-800 transition-colors">
                  VIP and Charter Services
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Aviance Ghana specializes in delivering customized passenger assistance, aircraft handling, and comprehensive ground support services tailored for private and charter flight operations.
                </p>

                {/* Bullets */}
                <ul className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#72BF44] shrink-0" />
                    <span>Personalized apron meet & greet</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#72BF44] shrink-0" />
                    <span>Private jet handling & diplomatic protocol</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#72BF44] shrink-0" />
                    <span>Discrete customs & baggage fast-tracking</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('/vip-charter');
                  }}
                  className="px-4 py-2 rounded-xl border border-[#204696] text-[#204696] hover:bg-[#204696] hover:text-white transition-all text-xs font-bold flex items-center gap-1.5 group/btn cursor-pointer"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
                <span className="text-[11px] font-mono text-slate-400">VIP Protocol</span>
              </div>
            </div>

            {/* 8. VIP and Charter Services - Photo (Right) */}
            <div
              onClick={() => onNavigate('/vip-charter')}
              className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 min-h-[300px] lg:min-h-[360px] shadow-xs cursor-pointer hover:shadow-md transition-all"
            >
              <img
                src={VIP_IMG}
                alt="VIP and Charter Services Team"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              <div className="absolute top-3.5 left-3.5">
                <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm text-[11px] font-bold text-slate-800 shadow-xs border border-white/60">
                  Dedicated VIP Escort
                </span>
              </div>
              <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                <span className="text-xs font-semibold text-blue-200 uppercase tracking-wider block">
                  Private Aviation
                </span>
                <span className="text-sm font-bold">Apron Protocol Handling</span>
              </div>
            </div>

          </div>

          {/* Pair 3: Cargo Services (Image Left, Card Right) + Find My Bag (Image Left, Card Right) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-stretch mb-8 sm:mb-12 lg:mb-16">
            
            {/* 9. Cargo Services - Photo */}
            <div
              onClick={() => onNavigate('/cargo')}
              className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 min-h-[300px] lg:min-h-[360px] shadow-xs cursor-pointer hover:shadow-md transition-all"
            >
              <img
                src={CARGO_IMG}
                alt="Aviance Cargo Cold Room Facility"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              <div className="absolute top-3.5 left-3.5">
                <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm text-[11px] font-bold text-slate-800 shadow-xs border border-white/60">
                  EU RA3 Bonded Hub
                </span>
              </div>
              <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                <span className="text-xs font-semibold text-blue-200 uppercase tracking-wider block">
                  Cold Room & Warehouse
                </span>
                <span className="text-sm font-bold">Kotoka Cargo Village</span>
              </div>
            </div>

            {/* 10. Cargo Services - Card */}
            <div
              onClick={() => onNavigate('/cargo')}
              className="rounded-2xl border border-slate-200 p-6 sm:p-7 flex flex-col justify-between bg-white shadow-xs hover:shadow-md hover:border-[#204696]/40 transition-all group cursor-pointer"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#204696] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                    Cargo Logistics
                  </span>
                  <PackageCheck className="w-4 h-4 text-slate-400 group-hover:text-[#204696] transition-colors" />
                </div>

                <h2 className="text-2xl font-bold text-[#204696] group-hover:text-blue-800 transition-colors">
                  Cargo Services
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Secure import and export cargo handling supported by experienced teams and modern systems.
                </p>

                {/* Bullets */}
                <ul className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#72BF44] shrink-0" />
                    <span>60% national air cargo market share</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#72BF44] shrink-0" />
                    <span>EU RA3 certified bonded warehouse</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#72BF44] shrink-0" />
                    <span>Temperature-controlled pharma cold-chain</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('/cargo');
                  }}
                  className="px-4 py-2 rounded-xl border border-[#204696] text-[#204696] hover:bg-[#204696] hover:text-white transition-all text-xs font-bold flex items-center gap-1.5 group/btn cursor-pointer"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenCargoModal();
                  }}
                  className="text-xs font-semibold text-[#204696] hover:underline cursor-pointer"
                >
                  Request Quote
                </button>
              </div>
            </div>

            {/* 11. Find My Bag - Photo */}
            <div
              onClick={() => onNavigate('/find-my-bag')}
              className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 min-h-[300px] lg:min-h-[360px] shadow-xs cursor-pointer hover:shadow-md transition-all"
            >
              <img
                src={BAGGAGE_IMG}
                alt="Find My Bag - Baggage Handling"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              <div className="absolute top-3.5 left-3.5">
                <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm text-[11px] font-bold text-slate-800 shadow-xs border border-white/60">
                  WorldTracer System
                </span>
              </div>
              <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                <span className="text-xs font-semibold text-blue-200 uppercase tracking-wider block">
                  Passenger Baggage Care
                </span>
                <span className="text-sm font-bold">Kotoka Arrivals Baggage Desk</span>
              </div>
            </div>

            {/* 12. Find My Bag - Card */}
            <div
              onClick={() => onNavigate('/find-my-bag')}
              className="rounded-2xl border border-slate-200 p-6 sm:p-7 flex flex-col justify-between bg-white shadow-xs hover:shadow-md hover:border-[#204696]/40 transition-all group cursor-pointer"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#204696] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                    Baggage Care
                  </span>
                  <Luggage className="w-4 h-4 text-slate-400 group-hover:text-[#204696] transition-colors" />
                </div>

                <h2 className="text-2xl font-bold text-[#204696] group-hover:text-blue-800 transition-colors">
                  Find My Bag
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  A direct support channel for passengers following up on delayed or missing baggage.
                </p>

                {/* Bullets */}
                <ul className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#72BF44] shrink-0" />
                    <span>Direct WorldTracer system lookup</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#72BF44] shrink-0" />
                    <span>Real-time PIR status tracking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#72BF44] shrink-0" />
                    <span>Dedicated baggage claims counter at ACC</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('/find-my-bag');
                  }}
                  className="px-4 py-2 rounded-xl border border-[#204696] text-[#204696] hover:bg-[#204696] hover:text-white transition-all text-xs font-bold flex items-center gap-1.5 group/btn cursor-pointer"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('/find-my-bag');
                  }}
                  className="text-xs font-semibold text-[#204696] hover:underline cursor-pointer"
                >
                  Track Bag
                </button>
              </div>
            </div>

          </div>

          {/* Pair 4: OCC - Flight Operations & GSE / Training Academy */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-stretch mb-8 sm:mb-12 lg:mb-16">
            
            {/* 13. OCC - Flight Operations - Card (Left) */}
            <div
              onClick={() => onNavigate('/operations')}
              className="rounded-2xl border border-slate-200 p-6 sm:p-7 flex flex-col justify-between bg-white shadow-xs hover:shadow-md hover:border-[#204696]/40 transition-all group cursor-pointer"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#204696] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                    Flight Operations
                  </span>
                  <Cpu className="w-4 h-4 text-slate-400 group-hover:text-[#204696] transition-colors" />
                </div>

                <h2 className="text-2xl font-bold text-[#204696] group-hover:text-blue-800 transition-colors">
                  OCC - Flight Operations
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  24/7 centralized flight dispatch, apron turnaround coordination, slot management, and real-time load control.
                </p>

                {/* Bullets */}
                <ul className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#72BF44] shrink-0" />
                    <span>24/7 central dispatch & airline operations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#72BF44] shrink-0" />
                    <span>Computerized load sheet & trim calculation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#72BF44] shrink-0" />
                    <span>Apron VHF communication & flight monitoring</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('/operations');
                  }}
                  className="px-4 py-2 rounded-xl border border-[#204696] text-[#204696] hover:bg-[#204696] hover:text-white transition-all text-xs font-bold flex items-center gap-1.5 group/btn cursor-pointer"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
                <a
                  href="tel:+233593816076"
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs font-semibold text-[#204696] hover:underline"
                >
                  OCC Dispatch
                </a>
              </div>
            </div>

            {/* 14. OCC - Flight Operations - Photo (Right) */}
            <div
              onClick={() => onNavigate('/operations')}
              className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 min-h-[300px] lg:min-h-[360px] shadow-xs cursor-pointer hover:shadow-md transition-all"
            >
              <img
                src={FLIGHT_OPS_IMG}
                alt="Operations Control Centre OCC"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              <div className="absolute top-3.5 left-3.5">
                <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm text-[11px] font-bold text-slate-800 shadow-xs border border-white/60">
                  24/7 Operations Control
                </span>
              </div>
              <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                <span className="text-xs font-semibold text-blue-200 uppercase tracking-wider block">
                  Flight Coordination
                </span>
                <span className="text-sm font-bold">Real-Time Apron Dispatch</span>
              </div>
            </div>

            {/* 15. GSE & Fleet Maintenance - Card */}
            <div
              onClick={() => onNavigate('/gse-fleet-maintenance')}
              className="rounded-2xl border border-slate-200 p-6 sm:p-7 flex flex-col justify-between bg-white shadow-xs hover:shadow-md hover:border-[#72BF44]/60 transition-all group cursor-pointer"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#3B7A1C] bg-[#72BF44]/15 px-2.5 py-0.5 rounded-full border border-[#72BF44]/30">
                    $1M+ Eco Fleet · Engineering
                  </span>
                  <Wrench className="w-4 h-4 text-slate-400 group-hover:text-[#204696] transition-colors" />
                </div>

                <h2 className="text-2xl font-bold text-[#204696] group-hover:text-blue-800 transition-colors">
                  GSE & Fleet Maintenance
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Specialized maintenance and preventive care keeping ground support equipment safe and operational under IATA AHM standards.
                </p>

                {/* Bullets */}
                <ul className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#72BF44] shrink-0" />
                    <span>$1M+ eco-friendly electric GSE investment</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#72BF44] shrink-0" />
                    <span>24/7 on-call certified equipment technicians</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#72BF44] shrink-0" />
                    <span>Preventive overhaul for motorized & non-motorized GSE</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('/gse-fleet-maintenance');
                  }}
                  className="px-4 py-2 rounded-xl border border-[#204696] text-[#204696] hover:bg-[#204696] hover:text-white transition-all text-xs font-bold flex items-center gap-1.5 group/btn cursor-pointer"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
                <span className="text-[11px] font-mono text-slate-400">Airside Engineering</span>
              </div>
            </div>

            {/* 16. GSE & Fleet Maintenance - Photo (Right) */}
            <div
              onClick={() => onNavigate('/gse-fleet-maintenance')}
              className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 min-h-[300px] lg:min-h-[360px] shadow-xs cursor-pointer hover:shadow-md transition-all"
            >
              <img
                src={GSE_IMG}
                alt="GSE Engineering & Fleet Maintenance Workshop"
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              <div className="absolute top-3.5 left-3.5">
                <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm text-[11px] font-bold text-slate-800 shadow-xs border border-white/60">
                  GSE Maintenance Workshop
                </span>
              </div>
              <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                <span className="text-xs font-semibold text-[#72BF44] uppercase tracking-wider block">
                  Fleet Overhaul & Engineering
                </span>
                <span className="text-sm font-bold">$1M+ Eco Fleet Support</span>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
