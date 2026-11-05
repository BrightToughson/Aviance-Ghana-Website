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

export const FindMyBagPage: React.FC<FindMyBagPageProps> = ({ onNavigate: _onNavigate }) => {
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
    <div className="pb-24 sm:pb-32 space-y-16 sm:space-y-24 lg:space-y-32">
      {/* Hero Header in Official Aviance Blue */}
      <div className={`py-14 sm:py-20 lg:py-24 border-b text-center relative overflow-hidden transition-colors ${
        isLight
          ? 'bg-gradient-to-b from-blue-50 via-slate-50 to-white border-slate-200'
          : 'bg-gradient-to-b from-[#11244C] via-[#0C1933] to-[#08101E] border-[#204696]/30'
      }`}>
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-36 blur-3xl pointer-events-none rounded-full ${
          isLight ? 'bg-[#204696]/5' : 'bg-[#204696]/20'
        }`} />
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <img
            src={BAGGAGE_IMG}
            alt="Aviance Baggage Hall sortation"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-3">
          <div className="flex items-center justify-center gap-2.5">
            <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-[#204696] via-[#009EE0] to-[#72BF44]" />
            <h2 className={`text-xs sm:text-sm font-extrabold uppercase tracking-widest ${
              isLight ? 'text-[#204696]' : 'text-[#58C1EB]'
            }`}>
              Kotoka International Airport Terminal 3 <span className="text-[#009EE0]">·</span> <span className={isLight ? 'text-[#3B7A1C]' : 'text-[#72BF44]'}>Baggage Services</span>
            </h2>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#72BF44]/15 text-[#72BF44] border border-[#72BF44]/35">
              LIVE TELEMETRY
            </span>
            <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold border ${
              isLight ? 'bg-blue-50 text-[#204696] border-blue-200' : 'bg-[#204696]/30 text-[#58C1EB] border-[#58C1EB]/30'
            }`}>
              IATA WORLDTRACER CONNECTED
            </span>
          </div>
          <h1 className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            {t('pages.baggage.title', 'Find My Bag · Real-Time Baggage Tracing')}
          </h1>
          <p className={`text-sm max-w-2xl mx-auto leading-relaxed ${
            isLight ? 'text-slate-600' : 'text-slate-300'
          }`}>
            {t('pages.baggage.desc', 'Direct passenger status query for checked luggage, carousel offload stages, and delayed baggage reconciliation at Kotoka International Airport (ACC) Terminal 3.')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24 lg:space-y-32">
        {/* The Live Baggage Tracker Component */}
        <BaggageTracker onOpenEnquiry={() => _setEnquiryOpen(true)} />

        {/* Baggage Operations Field Showcase */}
        <div className={`border rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all ${
          isLight ? 'bg-white border-slate-200/90 shadow-slate-200/50' : 'bg-[#0C1933]/90 border-[#204696]/35 shadow-[#204696]/10'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual Photo Card */}
            <div className="lg:col-span-7 overflow-hidden rounded-xl border border-slate-200 dark:border-[#204696]/40 shadow-lg relative group">
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                <img
                  src={BAGGAGE_IMG}
                  alt="Aviance Baggage Makeup Hall at Kotoka Terminal 3"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute top-3 left-3 bg-[#204696]/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-[#58C1EB]/40 flex items-center gap-1.5 shadow">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#72BF44] animate-pulse" />
                  Terminal 3 Baggage Makeup Hall
                </div>
                <div className="absolute bottom-3 left-4 right-4">
                  <p className="text-white text-xs sm:text-sm font-bold drop-shadow">
                    Aviance Baggage Handlers Sorting & Barcode Tag Scanning (Kotoka T3)
                  </p>
                </div>
              </div>
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
        </div>

        {/* Operational Baggage Desks & Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`border rounded-2xl p-6 space-y-3 shadow-lg transition-all ${
            isLight
              ? 'bg-white border-slate-200/90 shadow-slate-200/60'
              : 'bg-[#0C1933]/90 border-[#204696]/30 shadow-[#204696]/5'
          }`}>
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

          <div className={`border rounded-2xl p-6 space-y-3 shadow-lg transition-all ${
            isLight
              ? 'bg-white border-slate-200/90 shadow-slate-200/60'
              : 'bg-[#0C1933]/90 border-[#204696]/30 shadow-[#204696]/5'
          }`}>
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

          <div className={`border rounded-2xl p-6 space-y-3 shadow-lg transition-all ${
            isLight
              ? 'bg-white border-slate-200/90 shadow-slate-200/60'
              : 'bg-[#0C1933]/90 border-[#204696]/30 shadow-[#204696]/5'
          }`}>
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

        {/* Claim / Enquiry Drawer Form */}
        <div className={`border rounded-2xl p-8 max-w-3xl mx-auto space-y-6 shadow-2xl transition-all ${
          isLight
            ? 'bg-white border-slate-200/90 shadow-slate-200/60'
            : 'bg-[#0C1933]/95 border-[#204696]/35 shadow-[#204696]/10'
        }`}>
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
                className="px-4 py-2 bg-[#204696] text-xs font-semibold text-white rounded-lg hover:bg-[#18397a] transition-colors"
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
                  className="px-6 py-2.5 bg-[#204696] hover:bg-[#183878] text-white border border-[#58C1EB]/40 shadow-sm font-bold text-xs rounded-xl transition-colors"
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
