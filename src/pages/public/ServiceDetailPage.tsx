import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
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
  imagePosition?: string;
  secondary?: Array<{ img: string; title: string; desc: string; imagePosition?: string }>;
}

const getServiceVisuals = (slug: string): ServiceVisuals => {
  switch (slug) {
    case 'passenger-services':
      return {
        primary: PASSENGER_IMG,
        primaryCaption: 'Kotoka Terminal 3 DCS Check-In Counters & Frontline Passenger Handling',
        imagePosition: 'object-top',
        secondary: [
          {
            img: PASSENGER_TEAM_IMG,
            title: 'Frontline Customer Service Team',
            desc: 'Dedicated passenger liaison, boarding gate supervisors, and PRM mobility care.',
            imagePosition: 'object-top'
          },
          {
            img: PASSENGER_CREW_IMG,
            title: 'Flight Crew & Partner Facilitation',
            desc: 'Close turnaround collaboration with international airline flight captains and crews.',
            imagePosition: 'object-top'
          }
        ]
      };
    case 'ramp-handling':
      return {
        primary: RAMP_IMG,
        primaryCaption: 'Heavy Apron Turnaround: SCHOPF F300 Towbarless Pushback Tractor at Boeing 787',
        imagePosition: 'object-[center_35%]',
        secondary: [
          {
            img: RAMP_CARGO_IMG,
            title: 'Precision Aircraft Cargo & Baggage Loading',
            desc: 'Aviance Tug TR-52 staging containerized cargo dollies for lower-deck loading.',
            imagePosition: 'object-center'
          },
          {
            img: RAMP_TRACTOR_IMG,
            title: 'Airside Fleet Mobility & Marshalling',
            desc: 'Strict IATA ISAGO compliance across ramp corridors and airside maneuvering areas.',
            imagePosition: 'object-[center_30%]'
          }
        ]
      };
    case 'vip-charter':
      return {
        primary: VIP_IMG,
        primaryCaption: 'Executive Charter Aircraft Ground Handling & Diplomatic Flight Protocol',
        imagePosition: 'object-top',
        secondary: [
          {
            img: VIP_LOUNGE_IMG,
            title: 'Executive Apron Escort & Lounge Hospitality',
            desc: 'Fast-track customs, immigration coordination, and private tarmac passenger transfers.',
            imagePosition: 'object-center'
          }
        ]
      };
    case 'gse-fleet-maintenance':
      return {
        primary: GSE_IMG,
        primaryCaption: 'Certified GSE Heavy Maintenance Engineering Workshop & Equipment Overhauls',
        imagePosition: 'object-[center_35%]',
        secondary: [
          {
            img: RAMP_IMG,
            title: 'Modern Eco-Friendly GSE Fleet',
            desc: '$1M+ investment in high-efficiency pushback tractors, GPUs, and belt loaders.',
            imagePosition: 'object-[center_35%]'
          },
          {
            img: RAMP_TRACTOR_IMG,
            title: '24/7 Mobile Airside Breakdown Response',
            desc: 'Immediate ramp-side troubleshooting and preventive hydraulic/electrical inspections.',
            imagePosition: 'object-[center_30%]'
          }
        ]
      };
    case 'cargo':
      return {
        primary: CARGO_IMG,
        primaryCaption: 'Aviance Cold Room Storage & EU RA3 Certified Screening Infrastructure',
        imagePosition: 'object-[center_20%]',
        secondary: [
          {
            img: CARGO_WH_IMG,
            title: 'Air Cargo Warehouse Pallet Inspection',
            desc: 'Temperature-controlled perishables handling and customs bonded warehouse staging.',
            imagePosition: 'object-[center_25%]'
          }
        ]
      };
    case 'baggage':
      return {
        primary: BAGGAGE_IMG,
        primaryCaption: 'Kotoka Terminal 3 Baggage Makeup Hall & WorldTracer Reconciliation Desk',
        imagePosition: 'object-center'
      };
    case 'operations':
      return {
        primary: OCC_IMG,
        primaryCaption: '24/7 Operations Control Centre & Turnaround Intercom Coordination',
        imagePosition: 'object-center'
      };
    case 'training':
      return {
        primary: TRAINING_IMG,
        primaryCaption: 'Aviance Ghana Certified Aviation Training Academy Classroom',
        imagePosition: 'object-top'
      };
    default:
      return {
        primary: RAMP_IMG,
        primaryCaption: 'Aviance Ghana ISAGO Certified Ground Operations',
        imagePosition: 'object-[center_35%]'
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
    <div className={`min-h-screen pb-24 sm:pb-32 transition-colors ${isLight ? 'bg-white text-slate-800' : 'bg-[#0B1528] text-slate-100'}`}>
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
            <span className="text-[#204696] font-semibold">{getLocalizedTitle(service)}</span>
          </div>
        </div>
      </div>

      {/* Hero Header in Signature Aviance Blue Grid */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#11244C] via-[#1A3670] to-[#204696] text-white py-14 sm:py-20 lg:py-24">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <button
            onClick={() => onNavigate('/services')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-200 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Services</span>
          </button>

          <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-bold tracking-[-0.028em] text-white leading-[1.14]">
            {getLocalizedTitle(service)}
          </h1>

          <p className="text-base sm:text-lg text-blue-100/90 font-normal leading-relaxed max-w-3xl">
            {getLocalizedDesc(service)}
          </p>

          <div className="pt-2 flex flex-wrap gap-2">
            {service.locations.map((loc) => (
              <span key={loc} className="px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 border border-white/20 bg-white/10 text-white backdrop-blur-md">
                <MapPin className="w-3.5 h-3.5 text-[#58C1EB]" /> {loc}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Main Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left 2 Cols: Detailed Scope & Features */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Primary Visual Showcase Card */}
            <div className="overflow-hidden rounded-2xl relative transition-all shadow-lg border border-slate-200/90 dark:border-slate-800">
              <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/10] max-h-[540px] w-full overflow-hidden bg-slate-950">
                <img
                  src={visuals.primary}
                  alt={visuals.primaryCaption}
                  className={`w-full h-full object-cover ${visuals.imagePosition || 'object-center'} hover:scale-105 transition-transform duration-700`}
                />
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
                          className={`w-full h-full object-cover ${sec.imagePosition || 'object-center'} group-hover:scale-105 transition-transform duration-500`}
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
            <div className={`p-6 space-y-6 sticky top-28 border-t-2 border-[#204696] ${
              isLight
                ? 'bg-slate-50/80 border-slate-200'
                : 'bg-[#0A162C]/60'
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
                  isLight ? 'bg-white border-slate-200' : 'bg-[#071120] border-[#204696]/25'
                }`}>
                  <div className={`flex items-center gap-1.5 font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    <Clock className={`w-3.5 h-3.5 ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`} /> Operational Availability
                  </div>
                  <div className={`font-semibold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>{service.operatingHours}</div>
                </div>

                <div className={`p-3 rounded-lg border space-y-1 ${
                  isLight ? 'bg-white border-slate-200' : 'bg-slate-950 border-slate-800/80'
                }`}>
                  <div className={`flex items-center gap-1.5 font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    <Phone className={`w-3.5 h-3.5 ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`} /> Operations Desk Phone
                  </div>
                  <div className={`font-semibold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>{service.contactPhone}</div>
                </div>

                <div className={`p-3 rounded-lg border space-y-1 ${
                  isLight ? 'bg-white border-slate-200' : 'bg-slate-950 border-slate-800/80'
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
              <div className="pt-2 space-y-2.5">
                {service.slug === 'cargo' ? (
                  <button
                    onClick={onOpenCargoModal}
                    className="w-full btn-primary text-xs !py-3 shadow-md shadow-[#204696]/20"
                  >
                    {t('common.quoteCargo', 'Request Air Cargo Handling Quote')}
                  </button>
                ) : service.slug === 'baggage' ? (
                  <button
                    onClick={() => onNavigate('/find-my-bag')}
                    className="w-full btn-primary text-xs !py-3 shadow-md shadow-[#204696]/20"
                  >
                    {t('nav.findMyBag', 'Open Find My Bag Portal')}
                  </button>
                ) : (
                  <button
                    onClick={() => onNavigate('/contact')}
                    className="w-full btn-primary text-xs !py-3 shadow-md shadow-[#204696]/20"
                  >
                    {t('nav.contact', 'Contact Operations Department')}
                  </button>
                )}

                <button
                  onClick={() => onNavigate('/contact')}
                  className="w-full btn-link justify-center text-xs py-2 group cursor-pointer"
                >
                  <span className="link-label">{t('footer.headOffice', 'General Head Office Enquiry')}</span>
                  <ArrowRight className="w-4 h-4 text-[#72BF44] group-hover:translate-x-1.5 transition-transform duration-300" />
                </button>
              </div>
            </div>

            {/* Related Services */}
            {fallbackRelated.length > 0 && (
              <div className="space-y-3 pt-6 border-t border-slate-200 dark:border-slate-800">
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
