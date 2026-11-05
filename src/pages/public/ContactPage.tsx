import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  Building2,
  Send,
  Navigation,
  ExternalLink,
  Users,
  Copy,
  Check,
  ChevronRight,
  ShieldCheck,
  Briefcase
} from 'lucide-react';
import { dataService } from '../../services/dataService';
import { analyticsService } from '../../services/analyticsService';
import { Enquiry } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const { isLight } = useTheme();
  const { t } = useLanguage();

  const [copiedCode, setCopiedCode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    category: 'General' as Enquiry['category'],
    subject: '',
    message: '',
  });

  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCopyDigitalAddress = () => {
    navigator.clipboard.writeText('GL-116-0409');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const created = dataService.submitEnquiry({
        category: formData.category,
        senderName: formData.name,
        email: formData.email,
        phone: formData.phone,
        organization: formData.organization,
        subject: formData.subject,
        message: formData.message,
        priority: 'Medium',
      });

      analyticsService.trackEvent('enquiry_submit', '/contact', {
        category: formData.category,
        ref: created.referenceNo,
      });

      setIsSubmitting(false);
      setSubmittedRef(created.referenceNo);
    }, 400);
  };

  const departmentalContacts = [
    {
      id: 'occ',
      department: 'OCC - Flight Operations',
      manager: 'Emma Tandoh',
      phone: '+233 (0) 559 68 0879',
      phoneRaw: '+233559680879',
      email: 'occmgr@avianceghana.com',
      badge: '24/7 Flight Dispatch',
      description: 'Aircraft handling requests, flight schedules, turnaround control and apron communications.'
    },
    {
      id: 'cargo',
      department: 'Cargo Services',
      manager: 'Robert Amenyah',
      phone: '+233 (0) 540 81 6024',
      phoneRaw: '+233540816024',
      email: 'robertamenyah@avianceghana.com',
      badge: 'Import & Export Hub',
      description: 'Air cargo processing, freight storage, cold room reservations, customs facilitation and tracking.'
    },
    {
      id: 'lounge',
      department: 'Lounge Services',
      manager: 'Pearl Darkwah',
      phone: '+233 (0) 557 75 8345',
      phoneRaw: '+233557758345',
      email: 'loungemanager@avianceghana.com',
      badge: 'Terminal 3 Departure',
      description: 'Adinkra VIP lounge access, corporate airline partner lounge reservations and walk-in guest enquiries.'
    },
    {
      id: 'baggage',
      department: 'Baggage Services',
      manager: 'Belinda Adade',
      phone: '+233 (0) 544 33 4022',
      phoneRaw: '+233544334022',
      email: 'belindaadade@avianceghana.com',
      badge: 'Lost & Found / WorldTracer',
      description: 'Delayed baggage enquiries, Property Irregularity Reports (PIR), tracing and passenger delivery coordination.'
    },
    {
      id: 'domestic',
      department: 'Domestic (Accra / Kumasi / Tamale)',
      manager: 'Derrick Nakuja',
      phone: '+233 (0) 531 00 8587',
      phoneRaw: '+233531008587',
      email: 'derricknakuja@avianceghana.com',
      badge: 'Multi-Airport Stations',
      description: 'Regional scheduled flights, domestic passenger assistance and ramp coordination across Accra, Kumasi and Tamale.'
    }
  ];

  return (
    <div className={`min-h-screen transition-colors ${isLight ? 'bg-slate-50 text-slate-800' : 'bg-[#08101E] text-slate-100'}`}>
      
      {/* Breadcrumb Bar */}
      <div className={`border-b transition-colors ${isLight ? 'bg-white border-slate-200' : 'bg-[#0C1933] border-slate-800'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-slate-500">
            <button
              onClick={() => onNavigate('/')}
              className="hover:text-[#204696] font-medium transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-[#204696] font-semibold">Contact</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-[#204696] border border-blue-200">
              <span className="w-1.5 h-1.5 rounded-full bg-[#204696] animate-pulse" />
              Kotoka International Airport (ACC)
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#11244C] via-[#1A3670] to-[#204696] text-white py-14 sm:py-20 lg:py-24">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold text-blue-100">
            <Building2 className="w-4 h-4 text-[#009EE0]" />
            <span>Aviance Ghana Limited &bull; Contact Directory</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
            CONTACT US
          </h1>

          <p className="text-base sm:text-xl text-blue-100/95 font-light leading-relaxed max-w-3xl">
            Get in touch with Aviance Ghana for enquiries about our aviation services, cargo operations, lounges, VIP services, training or delayed baggage.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24 pb-24 sm:pb-32 space-y-16 sm:space-y-24 lg:space-y-32">
        
        {/* SECTION 1: HEAD OFFICE & INTERACTIVE MAP VIEW */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left Column: Head Office Card */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className={`p-8 rounded-3xl border shadow-xl flex-1 flex flex-col justify-between transition-all ${
              isLight
                ? 'bg-white border-slate-200/90 shadow-slate-200/60'
                : 'bg-[#0C1933] border-[#204696]/40 shadow-2xl'
            }`}>
              <div className="space-y-6">
                
                {/* Header */}
                <div className="border-b border-slate-100 dark:border-slate-800 pb-5">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-[#204696] mb-2">
                    <Building2 className="w-3.5 h-3.5" /> Corporate Headquarters
                  </div>
                  <h2 className="text-2xl font-extrabold text-[#11244C] dark:text-white">
                    Head Office
                  </h2>
                  <p className="text-sm font-bold text-[#204696] mt-0.5">
                    Aviance Ghana Limited
                  </p>
                </div>

                {/* Address */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#204696] shrink-0 mt-0.5" />
                    <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      <p>Private Mail Bag</p>
                      <p>Accra International Airport</p>
                      <p className="font-semibold text-slate-900 dark:text-white">Accra, Ghana.</p>
                    </div>
                  </div>

                  {/* Ghana Digital Address Pill */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
                    <div>
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Ghana Digital Address
                      </span>
                      <span className="font-mono text-sm font-bold text-[#204696] dark:text-[#009EE0]">
                        GL-116-0409
                      </span>
                    </div>
                    <button
                      onClick={handleCopyDigitalAddress}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 hover:bg-slate-100 transition-colors flex items-center gap-1.5 cursor-pointer"
                      title="Copy Digital Address"
                    >
                      {copiedCode ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-emerald-600 text-[11px]">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                          <span className="text-[11px]">Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Telephone & Email */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-[#204696] shrink-0" />
                    <a
                      href="tel:+233593818076"
                      className="font-bold text-slate-800 dark:text-slate-200 hover:text-[#204696] transition-colors"
                    >
                      +233 (0) 59 381 8076
                    </a>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-[#204696] shrink-0" />
                    <a
                      href="mailto:info@avianceghana.com"
                      className="font-bold text-[#204696] dark:text-[#009EE0] hover:underline"
                    >
                      info@avianceghana.com
                    </a>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                    <Clock className="w-4 h-4 text-[#72BF44] shrink-0" />
                    <span>Office hours: Monday to Friday, 8:00 a.m. - 5:00 p.m.</span>
                  </div>
                </div>

              </div>

              {/* Management Team Directory Link */}
              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => onNavigate('/management')}
                  className="w-full py-3 px-4 rounded-xl bg-blue-50 dark:bg-slate-800/80 hover:bg-[#204696] text-[#204696] hover:text-white dark:text-blue-300 dark:hover:text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-between group cursor-pointer border border-blue-100 dark:border-blue-900/40"
                >
                  <span className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Directory of the Management Team
                  </span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          </div>

          {/* Right Column: Interactive Map View */}
          <div className="lg:col-span-7 flex flex-col">
            <div className={`p-4 sm:p-5 rounded-3xl border shadow-xl flex-1 flex flex-col transition-all ${
              isLight
                ? 'bg-white border-slate-200/90 shadow-slate-200/60'
                : 'bg-[#0C1933] border-[#204696]/40 shadow-2xl'
            }`}>
              
              {/* Map Bar */}
              <div className="flex items-center justify-between pb-3 px-1 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-bold text-slate-800 dark:text-white">
                    Airport Bypass Rd, Accra, Ghana
                  </span>
                  <span className="text-slate-400 hidden sm:inline">&bull; Kotoka International</span>
                </div>
                
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=5.59829146036185,-0.1744891351782267"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#204696] hover:bg-[#153170] text-white font-bold text-xs transition-colors shadow-sm"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  Directions
                </a>
              </div>

              {/* Map Container */}
              <div className="relative flex-1 min-h-[340px] sm:min-h-[420px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900">
                <iframe
                  title="Aviance Ghana Limited Head Office Map"
                  src="https://maps.google.com/maps?q=5.59829146036185,-0.1744891351782267&amp;hl=en&amp;z=17&amp;output=embed"
                  className="w-full h-full border-0 absolute inset-0"
                  loading="lazy"
                  allowFullScreen
                />

                {/* Custom Overlay Pin Card matching the original screenshot popup */}
                <div className="absolute top-4 left-4 z-10 p-3.5 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-700 shadow-xl max-w-[270px] text-xs">
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-extrabold text-slate-900 dark:text-white text-xs">
                        Aviance Ghana Limited
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        Airport Bypass Rd, Accra, Ghana
                      </p>
                      <p className="font-mono text-[10px] text-[#204696] dark:text-[#009EE0] mt-0.5">
                        5.598291, -0.174489
                      </p>
                      <a
                        href="https://www.google.com/maps/dir/?api=1&destination=5.59829146036185,-0.1744891351782267"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-[#009EE0] hover:underline mt-1.5"
                      >
                        Directions <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Bottom External Link */}
                <div className="absolute bottom-2 right-2 z-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-sm">
                  <a
                    href="https://www.google.com/maps?q=5.59829146036185,-0.1744891351782267"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#204696] font-bold flex items-center gap-1"
                  >
                    Open in Google Maps &rarr;
                  </a>
                </div>

              </div>

            </div>
          </div>

        </section>

        {/* SECTION 2: DEPARTMENTAL CONTACTS (MATCHING OFFICIAL SITE) */}
        <section className="space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#009EE0] uppercase tracking-wider mb-1">
                <Briefcase className="w-4 h-4" /> Operational Leadership
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#11244C] dark:text-white">
                Departmental Contacts
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md">
              Direct operational contact lines for airline station managers, cargo handlers, and passenger service coordinators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departmentalContacts.map((dept) => (
              <div
                key={dept.id}
                className={`p-6 rounded-2xl border shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between ${
                  isLight
                    ? 'bg-white border-slate-200/90 hover:border-[#204696]/40'
                    : 'bg-[#0C1933] border-[#204696]/30 hover:border-[#009EE0]/60'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#204696] dark:bg-blue-900/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                      {dept.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#11244C] dark:text-white">
                      {dept.department}
                    </h3>
                    <p className="text-sm font-semibold text-[#009EE0] mt-0.5">
                      {dept.manager}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                      {dept.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-xs">
                    <Phone className="w-3.5 h-3.5 text-[#204696] dark:text-[#009EE0] shrink-0" />
                    <a
                      href={`tel:${dept.phoneRaw}`}
                      className="font-bold text-slate-700 dark:text-slate-300 hover:text-[#204696] dark:hover:text-[#009EE0] transition-colors"
                    >
                      {dept.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <Mail className="w-3.5 h-3.5 text-[#204696] dark:text-[#009EE0] shrink-0" />
                    <a
                      href={`mailto:${dept.email}`}
                      className="font-medium text-[#204696] dark:text-[#009EE0] hover:underline truncate"
                    >
                      {dept.email}
                    </a>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: ONLINE ENQUIRY FORM */}
        <section className={`rounded-3xl p-8 sm:p-12 border shadow-xl transition-all ${
          isLight
            ? 'bg-white border-slate-200/90 shadow-slate-200/60'
            : 'bg-[#0C1933] border-[#204696]/30 shadow-2xl'
        }`}>
          <div className="max-w-3xl mx-auto space-y-6">
            
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#204696] text-xs font-bold uppercase tracking-wider">
                <Send className="w-3.5 h-3.5" /> Electronic Dispatch Desk
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#11244C] dark:text-white">
                Submit an Online Enquiry
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
                Direct routing to station managers, cargo customer care, and flight operations dispatchers.
              </p>
            </div>

            {submittedRef ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Enquiry Transmitted Successfully
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-md mx-auto">
                    Your request has been logged. Tracking Reference: <span className="font-mono font-bold text-[#204696]">{submittedRef}</span>
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => setSubmittedRef(null)}
                    className="px-6 py-2.5 bg-[#204696] hover:bg-[#153170] text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Mensah"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-[#204696] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-[#204696] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+233..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-[#204696] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Department / Service Area
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as Enquiry['category'] })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-[#204696] focus:outline-none"
                    >
                      <option value="General">General Enquiries (info@avianceghana.com)</option>
                      <option value="Cargo">Cargo Services (robertamenyah@avianceghana.com)</option>
                      <option value="Operations">OCC - Flight Operations (occmgr@avianceghana.com)</option>
                      <option value="Lounge">Lounge Services (loungemanager@avianceghana.com)</option>
                      <option value="Baggage">Baggage / Find My Bag (belindaadade@avianceghana.com)</option>
                      <option value="VIP">VIP & Charter Services</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Brief summary of your inquiry..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-[#204696] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Message Details *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details about your operational requirement, schedule, or request..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-[#204696] focus:outline-none resize-none"
                  />
                </div>

                <div className="pt-3 flex items-center justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 rounded-xl bg-[#204696] hover:bg-[#153170] text-white font-bold text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    {isSubmitting ? 'Transmitting...' : 'Send Enquiry'}
                  </button>
                </div>
              </form>
            )}

          </div>
        </section>

      </div>

    </div>
  );
};

export default ContactPage;
