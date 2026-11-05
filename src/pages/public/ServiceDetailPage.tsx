import React from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Phone,
  Mail,
  Clock,
  MapPin,
  HelpCircle
} from 'lucide-react';
import { Service } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

// Authentic Aviance Ground Operations Imagery
import PASSENGER_IMG from '../../assets/aviance_images/services/vip_charter.jpg'; // Real DCS check-in agent at Kotoka T3
import PASSENGER_TEAM_IMG from '../../assets/aviance_images/careers_team.jpg'; // Real customer service frontline concourse team
import PASSENGER_CREW_IMG from '../../assets/aviance_images/1776164623557.jpg'; // Ethiopian Airlines celebration & flight crew

import RAMP_IMG from '../../assets/aviance_images/1791968160594.jpg'; // Heavy pushback tractor at B787 nose
import RAMP_CARGO_IMG from '../../assets/aviance_images/image_show/1759758700331.jpg'; // Ramp container loading onto dolly
import RAMP_TRACTOR_IMG from '../../assets/aviance_images/services/flight_ops.jpg'; // Airside tug mobility

import VIP_IMG from '../../assets/aviance_images/1788350257403.jpg'; // SolitAir charter aircraft with flight captains & ground crew
import VIP_LOUNGE_IMG from '../../assets/aviance_images/services/lounge_services.jpg'; // Executive Adinkra lounge

import GSE_IMG from '../../assets/aviance_images/services/gse_maintenance.jpg'; // Certified GSE workshop engineering
import CARGO_IMG from '../../assets/aviance_images/services/cargo_services.jpg'; // Cold room & screening facility
import CARGO_WH_IMG from '../../assets/aviance_images/services/passenger_services.jpg'; // Warehouse pallet rack inspection
import BAGGAGE_IMG from '../../assets/aviance_images/services/find_my_bag.jpg'; // Baggage makeup hall sortation
import OCC_IMG from '../../assets/aviance_images/image_show/ee4669f3-9945-4b97-a86e-d28b9860138a.png'; // Headset turnaround intercom
import TRAINING_IMG from '../../assets/aviance_images/image_show/1740561240681.jpg'; // Training room & instructors

interface ServiceVisuals {
  primary: string;
  primaryCaption: string;
  secondary?: Array<{ img: string; title: string; desc: string }>;
}

const getServiceVisuals = (slug: string): ServiceVisuals => {
  switch (slug) {
    case 'passenger-services':
      return {
        primary: PASSENGER_IMG,
        primaryCaption: 'Kotoka Terminal 3 DCS Check-In Counters & Frontline Passenger Handling',
        secondary: [
          {
            img: PASSENGER_TEAM_IMG,
            title: 'Frontline Customer Service Team',
            desc: 'Dedicated passenger liaison, boarding gate supervisors, and PRM mobility care.'
          },
          {
            img: PASSENGER_CREW_IMG,
            title: 'Flight Crew & Partner Facilitation',
            desc: 'Close turnaround collaboration with international airline flight captains and crews.'
          }
        ]
      };
    case 'ramp-handling':
      return {
        primary: RAMP_IMG,
        primaryCaption: 'Heavy Apron Turnaround: SCHOPF F300 Towbarless Pushback Tractor at Boeing 787',
        secondary: [
          {
            img: RAMP_CARGO_IMG,
            title: 'Precision Aircraft Cargo & Baggage Loading',
            desc: 'Aviance Tug TR-52 staging containerized cargo dollies for lower-deck loading.'
          },
          {
            img: RAMP_TRACTOR_IMG,
            title: 'Airside Fleet Mobility & Marshalling',
            desc: 'Strict IATA ISAGO compliance across ramp corridors and airside maneuvering areas.'
          }
        ]
      };
    case 'vip-charter':
      return {
        primary: VIP_IMG,
        primaryCaption: 'Executive Charter Aircraft Ground Handling & Diplomatic Flight Protocol',
        secondary: [
          {
            img: VIP_LOUNGE_IMG,
            title: 'Executive Apron Escort & Lounge Hospitality',
            desc: 'Fast-track customs, immigration coordination, and private tarmac passenger transfers.'
          }
        ]
      };
    case 'gse-fleet-maintenance':
      return {
        primary: GSE_IMG,
        primaryCaption: 'Certified GSE Heavy Maintenance Engineering Workshop & Equipment Overhauls',
        secondary: [
          {
            img: RAMP_IMG,
            title: 'Modern Eco-Friendly GSE Fleet',
            desc: '$1M+ investment in high-efficiency pushback tractors, GPUs, and belt loaders.'
          },
          {
            img: RAMP_TRACTOR_IMG,
            title: '24/7 Mobile Airside Breakdown Response',
            desc: 'Immediate ramp-side troubleshooting and preventive hydraulic/electrical inspections.'
          }
        ]
      };
    case 'cargo':
      return {
        primary: CARGO_IMG,
        primaryCaption: 'Aviance Cold Room Storage & EU RA3 Certified Screening Infrastructure',
        secondary: [
          {
            img: CARGO_WH_IMG,
            title: 'Air Cargo Warehouse Pallet Inspection',
            desc: 'Temperature-controlled perishables handling and customs bonded warehouse staging.'
          }
        ]
      };
    case 'baggage':
      return {
        primary: BAGGAGE_IMG,
        primaryCaption: 'Kotoka Terminal 3 Baggage Makeup Hall & WorldTracer Reconciliation Desk'
      };
    case 'operations':
      return {
        primary: OCC_IMG,
        primaryCaption: '24/7 Operations Control Centre & Turnaround Intercom Coordination'
      };
    case 'training':
      return {
        primary: TRAINING_IMG,
        primaryCaption: 'Aviance Ghana Certified Aviation Training Academy Classroom'
      };
    default:
      return {
        primary: RAMP_IMG,
        primaryCaption: 'Aviance Ghana ISAGO Certified Ground Operations'
      };
  }
};

interface ServiceDetailPageProps {
  service: Service;
  allServices: Service[];
  onNavigate: (path: string) => void;
  onOpenCargoModal: () => void;
  onOpenVipModal?: () => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  service,
  allServices,
  onNavigate,
  onOpenCargoModal,
  onOpenVipModal: _onOpenVipModal,
}) => {
  const { isLight } = useTheme();
  const { t } = useLanguage();

  const getLocalizedTitle = (s: Service) => {
    switch (s.slug) {
      case 'passenger-services': return t('services.passenger.title', s.title);
      case 'ramp-handling': return t('services.ramp.title', s.title);
      case 'cargo': return t('services.cargo.title', s.title);
      case 'vip-charter': return t('services.vip.title', s.title);
      case 'lounge': return t('services.lounge.title', s.title);
      case 'baggage': return t('services.baggage.title', s.title);
      case 'gse-fleet-maintenance': return t('services.gse.title', s.title);
      case 'training': return t('services.training.title', s.title);
      case 'security-flight-supervision': return t('services.security.title', s.title);
      default: return s.title;
    }
  };

  const getLocalizedDesc = (s: Service) => {
    switch (s.slug) {
      case 'passenger-services': return t('services.passenger.desc', s.shortDescription);
      case 'ramp-handling': return t('services.ramp.desc', s.shortDescription);
      case 'cargo': return t('services.cargo.desc', s.shortDescription);
      case 'vip-charter': return t('services.vip.desc', s.shortDescription);
      case 'lounge': return t('services.lounge.desc', s.shortDescription);
      case 'baggage': return t('services.baggage.desc', s.shortDescription);
      case 'gse-fleet-maintenance': return t('services.gse.desc', s.shortDescription);
      case 'training': return t('services.training.desc', s.shortDescription);
      case 'security-flight-supervision': return t('services.security.desc', s.shortDescription);
      default: return s.shortDescription;
    }
  };

  const relatedServices = allServices
    .filter((s) => s.id !== service.id && s.category === service.category)
    .slice(0, 2);

  const fallbackRelated = relatedServices.length > 0 ? relatedServices : allServices.filter((s) => s.id !== service.id).slice(0, 2);
  const visuals = getServiceVisuals(service.slug);

  return (
    <div className="pb-24 sm:pb-32 space-y-16 sm:space-y-24 lg:space-y-32">
      {/* Hero Header in Official Aviance Blue */}
      <div className={`relative py-14 sm:py-20 lg:py-24 border-b overflow-hidden transition-colors ${
        isLight
          ? 'bg-gradient-to-b from-blue-50 via-slate-50 to-white border-slate-200'
          : 'bg-gradient-to-b from-[#11244C] via-[#0C1933] to-[#08101E] border-[#204696]/30'
      }`}>
        <div className={`absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
          isLight ? 'bg-[#204696]/5' : 'bg-[#204696]/20'
        }`} />
        <div className="absolute inset-0 opacity-20">
          <img
            src={visuals.primary}
            alt={service.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <button
            onClick={() => onNavigate('/services')}
            className={`inline-flex items-center gap-1.5 text-xs font-semibold transition-colors ${
              isLight ? 'text-slate-600 hover:text-[#204696]' : 'text-slate-400 hover:text-[#58C1EB]'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Services</span>
          </button>

          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-[#204696] via-[#009EE0] to-[#72BF44]" />
            <h2 className={`text-xs sm:text-sm font-extrabold uppercase tracking-widest ${
              isLight ? 'text-[#204696]' : 'text-[#58C1EB]'
            }`}>
              {service.category} <span className="text-[#009EE0]">·</span> <span className={isLight ? 'text-[#3B7A1C]' : 'text-[#72BF44]'}>IATA ISAGO Compliant</span> <span className="text-[#009EE0]">·</span> <span className="text-slate-500 font-medium">{service.operatingHours}</span>
            </h2>
          </div>

          <h1 className={`text-3xl sm:text-5xl font-extrabold tracking-tight text-balance ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            {getLocalizedTitle(service)}
          </h1>

          <p className={`text-base max-w-3xl leading-relaxed ${
            isLight ? 'text-slate-600' : 'text-slate-300'
          }`}>
            {getLocalizedDesc(service)}
          </p>

          <div className="pt-4 flex flex-wrap gap-2">
            {service.locations.map((loc) => (
              <span key={loc} className={`px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 border ${
                isLight
                  ? 'bg-white border-slate-200 text-slate-800 shadow-2xs'
                  : 'bg-slate-950/80 border-slate-700/80 text-slate-200'
              }`}>
                <MapPin className={`w-3.5 h-3.5 ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`} /> {loc}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left 2 Cols: Detailed Scope & Features */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Primary Visual Showcase Card */}
            <div className={`overflow-hidden rounded-2xl border shadow-xl relative transition-all ${
              isLight ? 'bg-white border-slate-200/90 shadow-slate-200/60' : 'bg-[#0C1933] border-[#204696]/40 shadow-[#204696]/10'
            }`}>
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
                <img
                  src={visuals.primary}
                  alt={visuals.primaryCaption}
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
                <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#204696]/90 text-white backdrop-blur-md border border-[#58C1EB]/40 flex items-center gap-1.5 shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#72BF44] animate-pulse" />
                    Verified Aviance Operations
                  </span>
                  <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-black/60 text-slate-200 backdrop-blur-md border border-white/10 hidden sm:inline-flex">
                    Kotoka International Airport (ACC)
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-sm sm:text-base font-bold drop-shadow-md">
                    {visuals.primaryCaption}
                  </p>
                </div>
              </div>
            </div>

            <section className="space-y-4">
              <h2 className={`text-xl font-bold border-b pb-3 ${
                isLight ? 'text-slate-900 border-slate-200' : 'text-white border-slate-800'
              }`}>
                Operational Overview & Scope of Service
              </h2>
              <p className={`text-sm leading-relaxed whitespace-pre-line ${
                isLight ? 'text-slate-700' : 'text-slate-300'
              }`}>
                {service.fullDescription}
              </p>
            </section>

            {/* Secondary Operational Field Capabilities Gallery if available */}
            {visuals.secondary && visuals.secondary.length > 0 && (
              <section className="space-y-4">
                <div className={`flex items-center justify-between border-b pb-3 ${
                  isLight ? 'border-slate-200' : 'border-slate-800'
                }`}>
                  <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    Operational Field Capabilities & Visual Evidence
                  </h3>
                  <span className="text-xs font-mono text-[#009EE0] font-semibold">Active Fleet & Personnel</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {visuals.secondary.map((sec, idx) => (
                    <div
                      key={idx}
                      className={`group rounded-xl border overflow-hidden shadow-md flex flex-col ${
                        isLight ? 'bg-white border-slate-200 shadow-slate-200/50' : 'bg-[#0C1933]/90 border-[#204696]/30'
                      }`}
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                        <img
                          src={sec.img}
                          alt={sec.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                            {sec.title}
                          </h4>
                          <p className={`text-xs mt-1 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                            {sec.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certified Features & Capabilities */}
            <section className="space-y-4">
              <h2 className={`text-xl font-bold border-b pb-3 ${
                isLight ? 'text-slate-900 border-slate-200' : 'text-white border-slate-800'
              }`}>
                Certified Service Capabilities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 border rounded-xl flex items-start gap-3 shadow-md ${
                      isLight
                        ? 'bg-white border-slate-200 shadow-slate-200/50'
                        : 'bg-[#0C1933]/90 border-[#204696]/30 shadow-[#204696]/5'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#72BF44]" />
                    <span className={`text-xs font-medium leading-snug ${
                      isLight ? 'text-slate-800' : 'text-slate-200'
                    }`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQs if available */}
            {service.faqs && service.faqs.length > 0 && (
              <section className="space-y-4">
                <h2 className={`text-xl font-bold border-b pb-3 flex items-center gap-2 ${
                  isLight ? 'text-slate-900 border-slate-200' : 'text-white border-slate-800'
                }`}>
                  <HelpCircle className={`w-4 h-4 ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`} />
                  Frequently Asked Operational Questions
                </h2>
                <div className="space-y-3">
                  {service.faqs.map((faq, i) => (
                    <div key={i} className={`border rounded-xl p-4 space-y-2 shadow-md ${
                      isLight
                        ? 'bg-white border-slate-200 shadow-slate-200/50'
                        : 'bg-[#0C1933]/90 border-[#204696]/30 shadow-[#204696]/5'
                    }`}>
                      <h4 className={`text-sm font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        {faq.question}
                      </h4>
                      <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Col: Contact & Action Panel */}
          <div className="space-y-6">
            <div className={`border rounded-2xl p-6 space-y-6 sticky top-28 shadow-xl ${
              isLight
                ? 'bg-white border-slate-200/90 shadow-slate-200/60'
                : 'bg-[#0A162C]/95 border-[#204696]/40'
            }`}>
              <div>
                <div className={`text-xs font-semibold uppercase tracking-wider mb-1 ${
                  isLight ? 'text-[#0284C7]' : 'text-[#58C1EB]'
                }`}>
                  Service Dispatch & Liaison
                </div>
                <h3 className={`text-lg font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Operational Desk Contacts
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <div className={`p-3 rounded-lg border space-y-1 ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#071120] border-[#204696]/25'
                }`}>
                  <div className={`flex items-center gap-1.5 font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    <Clock className={`w-3.5 h-3.5 ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`} /> Operational Availability
                  </div>
                  <div className={`font-semibold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>{service.operatingHours}</div>
                </div>

                <div className={`p-3 rounded-lg border space-y-1 ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800/80'
                }`}>
                  <div className={`flex items-center gap-1.5 font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    <Phone className={`w-3.5 h-3.5 ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`} /> Operations Desk Phone
                  </div>
                  <div className={`font-semibold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>{service.contactPhone}</div>
                </div>

                <div className={`p-3 rounded-lg border space-y-1 ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800/80'
                }`}>
                  <div className={`flex items-center gap-1.5 font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    <Mail className={`w-3.5 h-3.5 ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`} /> Direct Liaison Email
                  </div>
                  <a href={`mailto:${service.contactEmail}`} className={`hover:underline font-semibold block truncate ${
                    isLight ? 'text-[#204696]' : 'text-[#58C1EB]'
                  }`}>
                    {service.contactEmail}
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2">
                {service.slug === 'cargo' ? (
                  <button
                    onClick={onOpenCargoModal}
                    className="w-full py-2.5 bg-[#204696] hover:bg-[#183878] text-white font-bold text-xs rounded-xl transition-colors shadow-sm text-center"
                  >
                    {t('common.quoteCargo', 'Request Air Cargo Handling Quote')}
                  </button>
                ) : service.slug === 'baggage' ? (
                  <button
                    onClick={() => onNavigate('/find-my-bag')}
                    className="w-full py-2.5 bg-[#204696] hover:bg-[#183878] text-white font-bold text-xs rounded-xl transition-colors shadow-sm text-center"
                  >
                    {t('nav.findMyBag', 'Open Find My Bag Portal')}
                  </button>
                ) : (
                  <button
                    onClick={() => onNavigate('/contact')}
                    className="w-full py-2.5 bg-[#204696] hover:bg-[#183878] text-white font-bold text-xs rounded-xl transition-colors shadow-sm text-center"
                  >
                    {t('nav.contact', 'Contact Operations Department')}
                  </button>
                )}

                <button
                  onClick={() => onNavigate('/contact')}
                  className={`w-full py-2.5 font-semibold text-xs rounded-xl transition-colors text-center border ${
                    isLight
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                  }`}
                >
                  {t('footer.headOffice', 'General Head Office Enquiry')}
                </button>
              </div>
            </div>

            {/* Related Services */}
            {fallbackRelated.length > 0 && (
              <div className={`border rounded-2xl p-6 space-y-3 shadow-xl ${
                isLight ? 'bg-white border-slate-200/90' : 'bg-[#0C1933]/90 border-[#204696]/30'
              }`}>
                <div className={`text-xs font-semibold uppercase tracking-wider ${
                  isLight ? 'text-slate-600' : 'text-slate-400'
                }`}>
                  Related Services
                </div>
                <div className="space-y-2">
                  {fallbackRelated.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => onNavigate(`/services/${r.slug}`)}
                      className={`w-full text-left p-3 rounded-lg transition-colors group border ${
                        isLight
                          ? 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                          : 'bg-[#071120] hover:bg-[#0E1C38] border-[#204696]/25'
                      }`}
                    >
                      <div className={`text-xs font-semibold ${
                        isLight ? 'text-slate-900 group-hover:text-[#204696]' : 'text-slate-200 group-hover:text-[#58C1EB]'
                      }`}>
                        {getLocalizedTitle(r)}
                      </div>
                      <div className={`text-[11px] line-clamp-1 mt-0.5 ${
                        isLight ? 'text-slate-500' : 'text-slate-500'
                      }`}>
                        {getLocalizedDesc(r)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
