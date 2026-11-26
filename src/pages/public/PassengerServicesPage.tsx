import React from 'react';
import {
  Users,
  CheckCircle2,
  Phone,
  Mail,
  ShieldCheck,
  PlaneTakeoff,
  ArrowRight,
  HeartHandshake,
  Clock,
  Sparkles,
  MapPin,
  FileCheck2,
  Luggage,
  UserCheck
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

// Authentic Aviance Passenger Operations Photography
import PASSENGER_OFFICIAL_IMG from '../../assets/aviance_images/services/passenger_official.jpg';
import PASSENGER_IMG from '../../assets/aviance_images/services/passenger_services.jpg';
import PASSENGER_VIP_IMG from '../../assets/aviance_images/services/vip_charter.jpg';
import CAREERS_TEAM_IMG from '../../assets/aviance_images/careers_team.jpg';
import AIRLINE_CREW_IMG from '../../assets/aviance_images/1776164623557.jpg';

interface PassengerServicesPageProps {
  onNavigate: (path: string) => void;
  onOpenCargoModal?: () => void;
}

export const PassengerServicesPage: React.FC<PassengerServicesPageProps> = ({ onNavigate }) => {
  const { isLight } = useTheme();
  const { language } = useLanguage();
  const isFr = language === 'fr';

  const capabilities = [
    {
      title: isFr ? 'Enregistrement DCS & Étiquetage Électronique' : 'DCS Check-in & Electronic Tagging',
      desc: isFr
        ? 'Agents d\'accueil certifiés opérant sur les systèmes SITA, Amadeus Altéa, Sabre et Navitaire. Comptoirs prioritaires dédiés Première/Affaires et dépose rapide des bagages.'
        : 'Certified front-of-house agents operating SITA, Amadeus Altéa, Sabre, and Navitaire systems. Dedicated First/Business Class priority desks and rapid bag drop.',
      icon: UserCheck,
      badge: isFr ? 'Gestion DCS Certifiée' : 'Certified DCS Handling'
    },
    {
      title: isFr ? 'Gestion des Portes & Embarquement' : 'Gate Management & Boarding',
      desc: isFr
        ? 'Gestion rigoureuse des portes d\'embarquement, lecture automatisée des codes-barres, réconciliation des passagers en attente et conformité des bagages cabine sous horaires stricts.'
        : 'Precision boarding gate management, automated barcode scanning, standby reconciliation, and cabin baggage compliance under tight turnaround schedules.',
      icon: PlaneTakeoff,
      badge: isFr ? 'Norme ISAGO' : 'ISAGO Standardized'
    },
    {
      title: isFr ? 'Assistance Dédiée à la Mobilité PMR' : 'PRM Dedicated Mobility Assistance',
      desc: isFr
        ? 'Assistants spécialisés pour fauteuils roulants et chargeurs ambulift modernes assurant un transit fluide et respectueux pour les Personnes à Mobilité Réduite jusqu\'au siège de l\'aéronef.'
        : 'Specialized wheelchair assistants and modern ambulift high-loaders facilitating seamless, respectful transit for Persons with Reduced Mobility from check-in to aircraft seat.',
      icon: HeartHandshake,
      badge: isFr ? 'Prise en Charge PMR' : 'Dedicated PRM Care'
    },
    {
      title: isFr ? 'Mineurs Non Accompagnés (UMNR)' : 'Unaccompanied Minors (UMNR)',
      desc: isFr
        ? 'Escorte dédiée et garde continue pour jeunes voyageurs et passagers âgés, garantissant sécurité totale, confort et remise directe aux accompagnateurs autorisés.'
        : 'Continuous dedicated escort and guardian custody for young travellers and elderly passengers, ensuring complete safety, comfort, and direct handover.',
      icon: Users,
      badge: isFr ? 'Garde Complète' : 'Complete Custody'
    },
    {
      title: isFr ? 'Vérification des Documents & Visas' : 'Document & Visa Verification',
      desc: isFr
        ? 'Contrôle minutieux des documents de voyage et exigences de visa selon IATA Timatic et le Service d\'Immigration du Ghana, évitant toute pénalité aux transporteurs.'
        : 'Strict document, visa, and entry requirement verification against IATA Timatic and Ghana Immigration Service protocols, eliminating airline carrier penalties.',
      icon: FileCheck2,
      badge: isFr ? 'Conformité Timatic' : 'Timatic Compliance'
    },
    {
      title: isFr ? 'Facilitation Équipages & Partenaires' : 'Flight Crew & Partner Facilitation',
      desc: isFr
        ? 'Transport dédié des équipages vers le hall, dédouanement de déclaration générale, préparation des dossiers de vol et escorte de sécurité sur le tarmac.'
        : 'Dedicated flight crew concourse transport, general declaration customs dispatch, briefing pack coordination, and apron security escorts.',
      icon: ShieldCheck,
      badge: isFr ? 'Opérations 24/7' : '24/7 Operations'
    }
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
              {isFr ? 'Accueil' : 'Home'}
            </button>
            <span>/</span>
            <button
              onClick={() => onNavigate('/services')}
              className="hover:text-[#204696] font-medium transition-colors cursor-pointer"
            >
              Services
            </button>
            <span>/</span>
            <span className="text-[#204696] font-semibold">{isFr ? 'Services Passagers' : 'Passenger Services'}</span>
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
            {isFr ? 'Services Passagers & Opérations de Terminal' : 'Passenger Services & Terminal Operations'}
          </h1>

          <p className="text-base sm:text-lg text-blue-100/90 font-normal leading-relaxed max-w-3xl">
            {isFr
              ? 'Aviance Ghana assure des services d\'accueil passagers fluides et chaleureux pour plus de 40 compagnies aériennes mondiales. De l\'enregistrement DCS de haute précision à l\'assistance mobilité PMR et la coordination des équipages, nos équipes certifiées incarnent votre marque avec distinction.'
              : 'Aviance Ghana delivers seamless, hospitable front-of-house passenger operations for over 40 global airlines. From precision DCS check-in and boarding gate reconciliation to specialized PRM mobility care and flight crew liaison, our certified teams represent your brand with distinction.'}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('/contact')}
              className="px-6 py-3 rounded-xl bg-[#009EE0] hover:bg-[#008bc5] text-white text-xs sm:text-sm font-bold shadow-lg shadow-[#009EE0]/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>{isFr ? 'Demande de Partenariat d\'Assistance' : 'Partner Ground Handling Inquiry'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="tel:+233244342526"
              className="px-5 py-3 border border-white/20 bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-semibold rounded-xl backdrop-blur-md transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#72BF44]" />
              <span>{isFr ? 'Chef d\'Escale (+233 (0) 244 342 526)' : 'Duty Manager (+233 (0) 244 342 526)'}</span>
            </a>
            <button
              onClick={() => onNavigate('/find-my-bag')}
              className="px-5 py-3 border border-white/20 bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-semibold rounded-xl backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Luggage className="w-4 h-4 text-[#58C1EB]" />
              <span>{isFr ? 'Suivi Bagages' : 'Find My Bag Tracing'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Operational Key Metrics Strip */}
      <div className={`border-b py-6 ${isLight ? 'bg-slate-50/80 border-slate-200' : 'bg-[#0E1A33] border-slate-800'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#204696] dark:text-[#58C1EB]">1.5M+</div>
              <div className="text-xs uppercase font-bold tracking-wider text-slate-500">
                {isFr ? 'Passagers Annuels Traités' : 'Annual Passengers Handled'}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#009EE0]">40+</div>
              <div className="text-xs uppercase font-bold tracking-wider text-slate-500">
                {isFr ? 'Compagnies Partenaires' : 'Global Airline Partners'}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#72BF44]">99.2%</div>
              <div className="text-xs uppercase font-bold tracking-wider text-slate-500">
                {isFr ? 'Ponctualité à l\'Embarquement' : 'On-Time Boarding Dispatch'}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-500">100%</div>
              <div className="text-xs uppercase font-bold tracking-wider text-slate-500">
                {isFr ? 'Conformité Assistance PMR' : 'PRM Care Compliance'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 space-y-20 sm:space-y-28">

        {/* Official Scope & Key Services — Open 2-Column Layout matching official avianceghana.com */}
        <section className="py-6 sm:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left Column: Scope & Key Services */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div>
                <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  {isFr ? 'Services Passagers' : 'Passenger Services'}
                </h2>
                <div className={`mt-4 space-y-3 text-sm sm:text-base leading-relaxed ${
                  isLight ? 'text-slate-700' : 'text-slate-200'
                }`}>
                  <p>
                    {isFr
                      ? 'Aviance Ghana fournit des services professionnels d\'assistance aux passagers, conçus pour assurer un voyage sans encombre de l\'enregistrement à l\'embarquement et à l\'arrivée.'
                      : 'Aviance Ghana provides professional passenger handling services designed to support a smooth journey from check-in to boarding and arrival.'}
                  </p>
                  <p>
                    {isFr
                      ? 'Nos équipes qualifiées travaillent en étroite collaboration avec nos partenaires aériens pour offrir un service efficace, courtois et fiable tout en respectant l\'ensemble des exigences opérationnelles, de sûreté et de sécurité.'
                      : 'Our trained teams work closely with airline partners to deliver efficient, courteous and reliable service while meeting applicable operational, safety and security requirements.'}
                  </p>
                </div>
              </div>

              <div>
                <h3 className={`text-base sm:text-lg font-bold mb-3 ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  {isFr ? 'Services clés' : 'Key services'}
                </h3>
                <ul className={`space-y-2.5 text-sm sm:text-base ${
                  isLight ? 'text-slate-700' : 'text-slate-200'
                }`}>
                  {(isFr
                    ? [
                        'Assistance à l\'enregistrement et vérification des documents de voyage.',
                        'Services d\'embarquement et de gestion des portes.',
                        'Assistance aux arrivées et transferts de passagers.',
                        'Support et traitement des litiges bagages.',
                        'Assistance spéciale pour les passagers à mobilité réduite (PMR).',
                        'Prise en charge des passagers en cas d\'irrégularité de vol.'
                      ]
                    : [
                        'Check-in and travel-document support.',
                        'Boarding and gate services.',
                        'Arrival and transfer assistance.',
                        'Baggage service support.',
                        'Special assistance for passengers with reduced mobility.',
                        'Passenger disruption support.'
                      ]
                  ).map((item, idx) => (
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
                  src={PASSENGER_OFFICIAL_IMG}
                  alt="Aviance Ghana Passenger Services"
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
                {isFr ? 'Capacités Opérationnelles' : 'Front-of-House Capabilities'}
              </span>
            </div>
            <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {isFr ? 'Prise en Charge Terminal & Soin aux Passagers' : 'End-to-End Terminal Handling & Passenger Care'}
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              {isFr
                ? 'Chaque étape du parcours passager est assurée par des agents formés et certifiés IATA, formés aux systèmes DCS spécifiques des compagnies aériennes et aux protocoles internationaux de sécurité.'
                : 'Every flight touchpoint is staffed by IATA-certified customer service agents trained in passenger psychology, de-escalation, airline-specific DCS systems, and international safety protocols.'}
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

        {/* Visual Showcase: Real Kotoka Operations */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 border-slate-200 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-4 rounded-full bg-[#72BF44]" />
                <span className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-[#3B7A1C]' : 'text-[#72BF44]'}`}>
                  {isFr ? 'Opérations d\'Accueil Réelles' : 'Authentic Concourse Operations'}
                </span>
              </div>
              <h2 className={`text-2xl sm:text-3xl font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {isFr ? 'Opérations Côté Piste & Terminal en Action' : 'Airside & Terminal Operations in Action'}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 relative aspect-[4/3]">
              <img
                src={PASSENGER_IMG}
                alt="Kotoka Terminal 3 DCS Check-In"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5 flex flex-col justify-end">
                <p className="text-white font-bold text-base">
                  {isFr ? 'Comptoirs d\'Enregistrement DCS Terminal 3' : 'Terminal 3 DCS Check-In Counters'}
                </p>
                <p className="text-xs text-slate-300">
                  {isFr ? 'Traitement électronique rapide des bagages et enregistrement passagers.' : 'Fast-track electronic baggage induction and passenger processing.'}
                </p>
              </div>
            </div>

            <div className="group overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 relative aspect-[4/3]">
              <img
                src={CAREERS_TEAM_IMG}
                alt="Frontline Concourse Team"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5 flex flex-col justify-end">
                <p className="text-white font-bold text-base">
                  {isFr ? 'Équipe Service Client du Hall' : 'Customer Service Concourse Team'}
                </p>
                <p className="text-xs text-slate-300">
                  {isFr ? 'Prise en charge dédiée, superviseurs d\'embarquement & ambassadeurs PMR.' : 'Dedicated passenger care, boarding supervisors & PRM ambassadors.'}
                </p>
              </div>
            </div>

            <div className="group overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 relative aspect-[4/3]">
              <img
                src={AIRLINE_CREW_IMG}
                alt="Flight Captain & Crew Facilitation"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5 flex flex-col justify-end">
                <p className="text-white font-bold text-base">
                  {isFr ? 'Liaison avec les Équipages Partenaires' : 'Partner Airline Crew Liaison'}
                </p>
                <p className="text-xs text-slate-300">
                  {isFr ? 'Coordination étroite avec les équipages internationaux et chefs d\'escale.' : 'Close coordination with international flight crews and station managers.'}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
