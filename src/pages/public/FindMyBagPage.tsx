import React, { useState } from 'react';
import { Luggage, Phone, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { BaggageTracker } from '../../components/public/BaggageTracker';
import { dataService } from '../../services/dataService';
import { analyticsService } from '../../services/analyticsService';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

// Authentic Aviance Baggage Makeup Hall & Airside Operations
import BAGGAGE_IMG from '../../assets/aviance_images/services/find_my_bag.jpg'; // Baggage makeup hall sortation
import RAMP_LOADING_IMG from '../../assets/aviance_images/image_show/1759758700331.jpg'; // Ramp hold loading

interface FindMyBagPageProps {
  onNavigate: (path: string) => void;
}

export const FindMyBagPage: React.FC<FindMyBagPageProps> = ({ onNavigate }) => {
  const { isLight } = useTheme();
  const { t } = useLanguage();

  const [_enquiryOpen, _setEnquiryOpen] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    baggageTag: '',
    flightNumber: '',
    airline: '',
    description: '',
  });
  const [enquirySuccessRef, setEnquirySuccessRef] = useState<string | null>(null);

  const handleSubmitClaim = (e: React.FormEvent) => {
    e.preventDefault();
    const created = dataService.submitEnquiry({
      category: 'Baggage',
      senderName: enquiryForm.name,
      email: enquiryForm.email || 'guest@avianceghana.com',
      phone: enquiryForm.phone,
      subject: `Baggage Claim File: Tag ${enquiryForm.baggageTag || 'N/A'} (Flight ${enquiryForm.flightNumber})`,
      message: `
Airline: ${enquiryForm.airline}
Flight Number: ${enquiryForm.flightNumber}
Baggage Tag Stub: ${enquiryForm.baggageTag}

Physical Description:
${enquiryForm.description}
      `.trim(),
      priority: 'Urgent',
    });

    analyticsService.trackEvent('enquiry_submit', '/find-my-bag', {
      type: 'baggage_claim',
      ref: created.referenceNo,
    });

    setEnquirySuccessRef(created.referenceNo);
  };

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
            <span className="text-[#204696] font-semibold">Find My Bag</span>
          </div>
        </div>
      </div>

      {/* Hero Header — Aviance Blue Grid Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#11244C] via-[#1A3670] to-[#204696] text-white py-14 sm:py-20 lg:py-24 text-center">
        {/* Subtle aeronautical blueprint grid */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4">
          <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-bold tracking-[-0.028em] text-white leading-[1.14]">
            {t('pages.baggage.title', 'Find My Bag · Real-Time Baggage Tracing')}
          </h1>
          <p className="text-base sm:text-lg text-blue-100/90 max-w-2xl mx-auto leading-relaxed font-normal">
            {t('pages.baggage.desc', 'Direct passenger status query for checked luggage, carousel offload stages, and delayed baggage reconciliation at Kotoka International Airport (ACC) Terminal 3.')}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 space-y-16 sm:space-y-24 lg:space-y-32">
        {/* The Live Baggage Tracker Component */}
        <BaggageTracker onOpenEnquiry={() => _setEnquiryOpen(true)} />

        {/* Baggage Operations Field Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-4">
          {/* Visual Photo Card */}
          <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-950 group border border-slate-200/80 dark:border-slate-800 shadow-md">
            <img
              src={BAGGAGE_IMG}
              alt="Aviance Baggage Makeup Hall at Kotoka Terminal 3"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Operational Text & Specifications */}
          <div className="lg:col-span-5 space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-gradient-to-b from-[#204696] via-[#009EE0] to-[#72BF44]" />
                <span className={`text-xs font-extrabold uppercase tracking-wider ${
                  isLight ? 'text-[#204696]' : 'text-[#58C1EB]'
                }`}>
                  WorldTracer Reconciliation
                </span>
              </div>
              <h3 className={`text-xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Precision Bag Reconciliation & Rapid Delivery
              </h3>
            </div>

            <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              From the moment aircraft wheels touch down at Kotoka, Aviance ramp teams offload belly holds onto container dollies, transporting checked luggage directly to the Terminal 3 automated makeup hall.
            </p>

            <div className="space-y-2.5 pt-1 text-xs">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-[#72BF44] mt-0.5" />
                <span className={isLight ? 'text-slate-700' : 'text-slate-300'}>
                  <strong>Barcoded Handheld Scanners:</strong> Every baggage tag stub is scanned to confirm receipt before conveyor induction.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-[#72BF44] mt-0.5" />
                <span className={isLight ? 'text-slate-700' : 'text-slate-300'}>
                  <strong>Rush & Delayed Bag Expediting:</strong> Direct liaison with partner airlines to reconnect separated luggage within hours.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-[#72BF44] mt-0.5" />
                <span className={isLight ? 'text-slate-700' : 'text-slate-300'}>
                  <strong>24/7 Arrivals Helpdesk:</strong> Immediate PIR (Property Irregularity Report) creation directly at Carousel 2.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Operational Baggage Desks & Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <div className={`w-9 h-9 rounded-lg border flex items-center justify-center ${
              isLight ? 'bg-blue-50 text-[#204696] border-blue-200' : 'bg-[#58C1EB]/10 text-[#58C1EB] border-[#58C1EB]/25'
            }`}>
              <Phone className="w-4 h-4" />
            </div>
            <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Terminal 3 Baggage Office</h3>
            <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Located on the Arrivals Baggage Claim Hall beside Carousel 2. Staffed around the clock for arriving commercial flights.
            </p>
            <div className={`text-xs font-mono font-semibold ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`}>
              Tel: +233 (0) 544 33 4022
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <div className={`w-9 h-9 rounded-lg border flex items-center justify-center ${
              isLight ? 'bg-blue-50 text-[#204696] border-blue-200' : 'bg-[#58C1EB]/10 text-[#58C1EB] border-[#58C1EB]/25'
            }`}>
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>SITA WorldTracer Network</h3>
            <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Our baggage tracing team connects directly to international tracing systems utilized by partner airlines and WorldTracer tracing desks.
            </p>
            <div className={`text-xs font-mono font-semibold ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>
              International Tracing Desks
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <div className={`w-9 h-9 rounded-lg border flex items-center justify-center ${
              isLight ? 'bg-blue-50 text-[#204696] border-blue-200' : 'bg-[#58C1EB]/10 text-[#58C1EB] border-[#58C1EB]/25'
            }`}>
              <Clock className="w-4 h-4" />
            </div>
            <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Baggage Delivery & Rush Tags</h3>
            <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Delayed bags received on subsequent flights are priority rush-tagged, customs cleared, and staged for passenger collection or delivery liaison.
            </p>
            <div className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              Email: findmybag@avianceghana.com
            </div>
          </div>
        </div>

        {/* Official Before Contacting Us Guidance from avianceghana.com */}
        <div className="max-w-3xl mx-auto">
          <div className={`p-6 sm:p-8 rounded-2xl border ${
            isLight ? 'bg-blue-50/70 border-blue-200' : 'bg-[#11244C]/60 border-[#204696]/40'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-4 rounded-full bg-gradient-to-b from-[#204696] via-[#009EE0] to-[#72BF44]" />
              <span className={`text-xs font-extrabold uppercase tracking-widest ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`}>
                Official Tracing Guidance · avianceghana.com
              </span>
            </div>
            <h3 className={`text-base sm:text-lg font-bold mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Before contacting us
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed mb-4 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              We understand how stressful it can be when baggage does not arrive with your flight. If your baggage report is being handled by Aviance Ghana, our Lost and Found team can assist you with an update.
            </p>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#72BF44] shrink-0 mt-0.5" />
                <span className={isLight ? 'text-slate-700 font-medium' : 'text-slate-200'}>
                  Report the missing baggage at the airport and obtain a <strong>Property Irregularity Report (PIR)</strong> or reference number.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#72BF44] shrink-0 mt-0.5" />
                <span className={isLight ? 'text-slate-700 font-medium' : 'text-slate-200'}>
                  Keep your baggage tag and travel documents available.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#72BF44] shrink-0 mt-0.5" />
                <span className={isLight ? 'text-slate-700 font-medium' : 'text-slate-200'}>
                  Email <a href="mailto:findmybag@avianceghana.com" className="text-[#204696] dark:text-[#58C1EB] underline font-semibold">findmybag@avianceghana.com</a> with your full name, flight details, baggage reference number and contact details.
                </span>
              </li>
            </ul>
            <p className={`text-xs mt-3.5 pt-3 border-t italic ${isLight ? 'border-blue-200/60 text-slate-600' : 'border-slate-800 text-slate-400'}`}>
              We will acknowledge your enquiry and provide an update based on the information available in the baggage tracing system.
            </p>
          </div>
        </div>

        {/* Claim / Enquiry Drawer Form */}
        <div className="max-w-3xl mx-auto space-y-6 pt-10 sm:pt-14 border-t border-slate-200 dark:border-slate-800">
          <div className={`border-b pb-4 ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
            <h3 className={`text-xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {t('pages.baggage.claimHeading', 'Submit a Baggage Claim or Enquiry')}
            </h3>
            <p className={`text-xs mt-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              {t('pages.baggage.claimDesc', 'Our arrivals baggage resolution team is on-duty 24/7 inside Terminal 3. Submit your flight and baggage details for urgent tracing.')}
            <div className="mt-3.5 p-3 rounded-xl bg-blue-50/70 border border-blue-200/80 text-[11px] text-slate-700 leading-relaxed flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-[#204696] shrink-0 mt-0.5" />
              <span>
                <strong>Carrier Liability Notice:</strong> Aviance Ghana operates baggage handling and WorldTracer tracing as an independent ground service provider on behalf of contracting air carriers. In accordance with the Montreal Convention and IATA SGHA, passenger carriage contracts and all baggage compensation liability remain exclusively with your contracting airline.
              </span>
            </div>
            </p>
          </div>

          {enquirySuccessRef ? (
            <div className={`p-6 rounded-xl border text-center space-y-3 ${
              isLight ? 'bg-emerald-50/50 border-emerald-200' : 'bg-slate-950 border-emerald-500/30'
            }`}>
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
              <h4 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Baggage Query Logged Successfully
              </h4>
              <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                Assistance Ticket Reference: <strong className={`font-mono ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`}>{enquirySuccessRef}</strong>. Our Baggage Services Office at Kotoka Terminal 3 has received your details and will trace your record.
              </p>
              <button
                onClick={() => setEnquirySuccessRef(null)}
                className="btn-primary !py-2.5 !px-5 text-xs"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitClaim} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    {t('pages.contact.name', 'Passenger Full Name')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={enquiryForm.name}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                    placeholder="e.g. Kwame Mensah"
                    className={`w-full border rounded-lg px-3 py-2 text-xs transition-colors focus:outline-none ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#204696]'
                        : 'bg-slate-950 border-slate-700 text-white placeholder-slate-500 focus:border-[#58C1EB]'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    {t('pages.contact.phone', 'Contact Phone / WhatsApp')} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={enquiryForm.phone}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                    placeholder="+233 24 000 0000"
                    className={`w-full border rounded-lg px-3 py-2 text-xs transition-colors focus:outline-none ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#204696]'
                        : 'bg-slate-950 border-slate-700 text-white placeholder-slate-500 focus:border-[#58C1EB]'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    Baggage Tag Stub Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={enquiryForm.baggageTag}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, baggageTag: e.target.value })}
                    placeholder="e.g. BA-902144"
                    className={`w-full border rounded-lg px-3 py-2 text-xs font-mono uppercase transition-colors focus:outline-none ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#204696]'
                        : 'bg-slate-950 border-slate-700 text-white placeholder-slate-500 focus:border-[#58C1EB]'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    Airline
                  </label>
                  <input
                    type="text"
                    value={enquiryForm.airline}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, airline: e.target.value })}
                    placeholder="e.g. British Airways"
                    className={`w-full border rounded-lg px-3 py-2 text-xs transition-colors focus:outline-none ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#204696]'
                        : 'bg-slate-950 border-slate-700 text-white placeholder-slate-500 focus:border-[#58C1EB]'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    Flight Number
                  </label>
                  <input
                    type="text"
                    value={enquiryForm.flightNumber}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, flightNumber: e.target.value })}
                    placeholder="e.g. BA 078"
                    className={`w-full border rounded-lg px-3 py-2 text-xs font-mono uppercase transition-colors focus:outline-none ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#204696]'
                        : 'bg-slate-950 border-slate-700 text-white placeholder-slate-500 focus:border-[#58C1EB]'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  Bag Description & Characteristics (Brand, Color, Shell)
                </label>
                <textarea
                  rows={3}
                  value={enquiryForm.description}
                  onChange={(e) => setEnquiryForm({ ...enquiryForm, description: e.target.value })}
                  placeholder="e.g. Samsonite black hard-shell suitcase with yellow identifier ribbon on handle..."
                  className={`w-full border rounded-lg p-3 text-xs resize-none transition-colors focus:outline-none ${
                    isLight
                      ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#204696]'
                      : 'bg-slate-950 border-slate-700 text-white placeholder-slate-500 focus:border-[#58C1EB]'
                  }`}
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="btn-primary !py-3 !px-7 text-xs"
                >
                  {t('pages.baggage.fileClaim', 'Submit Baggage File')}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
