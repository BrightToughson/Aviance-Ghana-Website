import React from 'react';
import {
  ArrowRight,
  ShieldCheck,
  FileCheck2,
  MapPin,
  Clock
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
      onQuickAction: () => onNavigate('/cargo')
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
      
      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-slate-500">
            <button
              onClick={() => onNavigate('/')}
              className="hover:text-[#204696] font-medium transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-[#204696] font-semibold">Services</span>
          </div>
        </div>
      </div>

      {/* Hero Header in Signature Aviance Blue Grid */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#11244C] via-[#1A3670] to-[#204696] text-white py-14 sm:py-20 lg:py-24">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        <ScrollReveal animation="fade-up">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-bold tracking-[-0.028em] text-white leading-[1.14]">
              Aviation Ground Handling Services
            </h1>

            <p className="text-base sm:text-lg text-blue-100/90 font-normal leading-relaxed max-w-3xl">
              Operating across Kotoka International Airport (ACC), Prempeh I International Kumasi (KMS), and Tamale International (TML), Aviance Ghana delivers certified turnaround safety, world-class cargo handling, and executive passenger hospitality.
            </p>

            {/* Quick Accreditation Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5 text-xs text-white">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#72BF44]/20 border border-[#72BF44]/40 font-bold text-[#A3E635]">
                <ShieldCheck className="w-4 h-4 text-[#A3E635] shrink-0" />
                IATA ISAGO Accredited
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 font-semibold text-white backdrop-blur-md">
                <FileCheck2 className="w-4 h-4 text-[#58C1EB] shrink-0" />
                EU RA3 Certified
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 font-semibold text-white backdrop-blur-md">
                <MapPin className="w-4 h-4 text-[#58C1EB] shrink-0" />
                ACC · KMS · TML Stations
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 font-semibold text-white backdrop-blur-md">
                <Clock className="w-4 h-4 text-[#58C1EB] shrink-0" />
                24/7 Operations Control
              </span>
            </div>
          </div>
        </ScrollReveal>
      </section>


      {/* Services Showcase — Swissport-Inspired Full-Bleed Cards matching Image 2 */}
      <section className="py-12 sm:py-16 lg:py-20 pb-20 sm:pb-28 lg:pb-36 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 text-left">
            {officialServices.map((service, idx) => (
              <ScrollReveal key={service.id} animation="fade-up" delay={(idx % 3) * 100}>
                <div
                  onClick={() => {
                    if (service.onQuickAction) {
                      service.onQuickAction();
                    } else {
                      onNavigate(service.path);
                    }
                  }}
                  className="group relative h-[420px] sm:h-[460px] lg:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5"
                >
                  {/* Full-Bleed Background Image */}
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Swissport Subtle Bottom Dark Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 via-35% to-transparent group-hover:from-black/95 transition-colors duration-500" />

                  {/* Bottom Overlay Content — Swissport Style: Title + Subtitle + Hover "Learn more" */}
                  <div className="absolute bottom-7 left-7 right-7 sm:bottom-8 sm:left-8 sm:right-8 z-10 space-y-2">
                    <span className="text-xs font-bold text-[#58C1EB] uppercase tracking-wider block">
                      {service.category}
                    </span>

                    <h3 className="text-2xl sm:text-[26px] lg:text-[28px] font-bold text-white tracking-tight leading-snug drop-shadow-xs">
                      {service.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 font-normal leading-relaxed">
                      {service.subtitle}
                    </p>

                    {/* "Learn more" revealed on hover (Swissport style) */}
                    <div className="pt-2 flex items-center gap-2 text-sm sm:text-base font-semibold text-white transition-all duration-300 opacity-90 group-hover:opacity-100 group-hover:translate-x-1">
                      <span className="underline underline-offset-4 decoration-2 decoration-[#72BF44]">Learn more</span>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#72BF44] group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
