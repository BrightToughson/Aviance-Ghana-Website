import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck,
  ArrowLeft,
  FileText,
  Download,
  ExternalLink,
  CheckCircle2,
  Lock,
  Building2,
  Mail,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Layers,
  Maximize2,
  Minimize2,
  Eye,
  Scale,
  AlertTriangle,
  Plane,
  Luggage,
  Package,
  UserCheck,
  Globe2,
  Info,
  Clock,
  Phone,
  ShieldAlert,
} from 'lucide-react';

import page1 from '../../assets/aviance_images/code of conduct pdf/pages/page_1.png';
import page2 from '../../assets/aviance_images/code of conduct pdf/pages/page_2.png';
import page3 from '../../assets/aviance_images/code of conduct pdf/pages/page_3.png';
import page4 from '../../assets/aviance_images/code of conduct pdf/pages/page_4.png';
import page5 from '../../assets/aviance_images/code of conduct pdf/pages/page_5.png';
import page6 from '../../assets/aviance_images/code of conduct pdf/pages/page_6.png';
import page7 from '../../assets/aviance_images/code of conduct pdf/pages/page_7.png';
import page8 from '../../assets/aviance_images/code of conduct pdf/pages/page_8.png';
import page9 from '../../assets/aviance_images/code of conduct pdf/pages/page_9.png';
import page10 from '../../assets/aviance_images/code of conduct pdf/pages/page_10.png';
import page11 from '../../assets/aviance_images/code of conduct pdf/pages/page_11.png';
import conductPdfUrl from '../../assets/aviance_images/code of conduct pdf/f52640_777584ab2e854a3688a773626ca1e61c.pdf';

interface LegalPageProps {
  type: 'conduct' | 'privacy' | 'terms';
  onNavigate: (path: string) => void;
}

const CONDUCT_PAGES = [
  page1,
  page2,
  page3,
  page4,
  page5,
  page6,
  page7,
  page8,
  page9,
  page10,
  page11,
];

const CONDUCT_PDF_FALLBACK =
  '/src/assets/aviance_images/code of conduct pdf/f52640_777584ab2e854a3688a773626ca1e61c.pdf';

export const LegalPages: React.FC<LegalPageProps> = ({ type, onNavigate }) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [turnDirection, setTurnDirection] = useState<'right-to-left' | 'left-to-right'>('right-to-left');
  const [isTwoPageSpread, setIsTwoPageSpread] = useState<boolean>(false);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const [copiedWhistle, setCopiedWhistle] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const pdfSource = conductPdfUrl || CONDUCT_PDF_FALLBACK;
  const totalPages = CONDUCT_PAGES.length;

  const nextPage = () => {
    if (currentPage >= totalPages - 1) return;
    setTurnDirection('right-to-left');
    setIsFlipping(true);
    const step = isTwoPageSpread ? (currentPage === 0 ? 2 : 2) : 1;
    setTimeout(() => {
      setCurrentPage((prev) => Math.min(prev + step, totalPages - 1));
      setTimeout(() => setIsFlipping(false), 50);
    }, 220);
  };

  const prevPage = () => {
    if (currentPage <= 0) return;
    setTurnDirection('left-to-right');
    setIsFlipping(true);
    const step = isTwoPageSpread ? 2 : 1;
    setTimeout(() => {
      setCurrentPage((prev) => Math.max(prev - step, 0));
      setTimeout(() => setIsFlipping(false), 50);
    }, 220);
  };

  const goToPage = (pageIndex: number) => {
    if (pageIndex === currentPage) return;
    setTurnDirection(pageIndex > currentPage ? 'right-to-left' : 'left-to-right');
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentPage(pageIndex);
      setTimeout(() => setIsFlipping(false), 50);
    }, 220);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (type !== 'conduct') return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        nextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        prevPage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, totalPages, isTwoPageSpread, type]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX < -50) {
      nextPage();
    } else if (deltaX > 50) {
      prevPage();
    }
    touchStartX.current = null;
  };

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedWhistle(true);
    setTimeout(() => setCopiedWhistle(false), 2000);
  };

  // Shared Legal Navigation Header Bar
  const renderLegalTabs = () => (
    <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-100 rounded-2xl max-w-2xl mx-auto mb-8 border border-slate-200">
      <button
        type="button"
        onClick={() => onNavigate('/code-of-conduct')}
        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
          type === 'conduct'
            ? 'bg-[#204696] text-white shadow-xs'
            : 'text-slate-600 hover:text-slate-900 hover:bg-white/70'
        }`}
      >
        Code of Conduct & Ethics
      </button>
      <button
        type="button"
        onClick={() => onNavigate('/privacy-policy')}
        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
          type === 'privacy'
            ? 'bg-[#204696] text-white shadow-xs'
            : 'text-slate-600 hover:text-slate-900 hover:bg-white/70'
        }`}
      >
        Privacy Policy (Act 843)
      </button>
      <button
        type="button"
        onClick={() => onNavigate('/terms')}
        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
          type === 'terms'
            ? 'bg-[#204696] text-white shadow-xs'
            : 'text-slate-600 hover:text-slate-900 hover:bg-white/70'
        }`}
      >
        Terms & Aviation Disclaimers
      </button>
    </div>
  );

  // Dedicated Layout for Corporate Code of Conduct with Interactive Book Reader
  if (type === 'conduct') {
    return (
      <div className="pb-24 sm:pb-32 space-y-12 sm:space-y-16 bg-white">
        {/* Hero Header */}
        <div className="py-12 sm:py-16 text-center border-b border-slate-200 bg-slate-50 text-slate-900 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 space-y-3 relative z-10">
            <button
              onClick={() => onNavigate('/about')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#204696] hover:text-[#0F2E53] transition-colors mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to About Aviance
            </button>
            <div className="flex items-center justify-center gap-2.5">
              <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-[#204696] via-[#009EE0] to-[#72BF44]" />
              <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#204696]">
                Corporate Governance · Compliance & Ethics
              </h2>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Aviance Ghana Code of Conduct
            </h1>
            <p className="text-xs sm:text-sm max-w-2xl mx-auto text-slate-600">
              Approved by the Board of Directors. Mandatory standards of integrity, safety, anti-bribery, and statutory compliance under Ghana law.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {renderLegalTabs()}

          {/* Interactive Right-to-Left Book Reader */}
          <div className="bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
            <div className="px-6 py-4 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-white">
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4 text-[#009EE0]" />
                <span className="text-xs font-bold tracking-wide">
                  Official Code of Conduct Document (11 Pages)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={pdfSource}
                  download="Aviance_Ghana_Code_of_Conduct.pdf"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#204696] hover:bg-[#183878] text-white text-xs font-bold transition-all shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Official PDF</span>
                </a>
              </div>
            </div>

            {/* Book Display Container */}
            <div
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="relative min-h-[460px] sm:min-h-[640px] p-4 sm:p-8 flex items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden"
            >
              <button
                type="button"
                onClick={prevPage}
                disabled={currentPage === 0}
                className="absolute left-2 sm:left-4 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900/90 hover:bg-[#204696] text-white border border-slate-700 flex items-center justify-center shadow-xl transition-all disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer"
                title="Previous page"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                type="button"
                onClick={nextPage}
                disabled={currentPage >= totalPages - 1}
                className="absolute right-2 sm:right-4 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900/90 hover:bg-[#204696] text-white border border-slate-700 flex items-center justify-center shadow-xl transition-all disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer"
                title="Next page"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div className="relative max-w-full flex items-center justify-center">
                <div
                  onClick={nextPage}
                  className="relative rounded-xl overflow-hidden bg-white border border-slate-300 max-w-md sm:max-w-lg cursor-pointer shadow-2xl"
                  title="Click to flip to next page"
                >
                  <img
                    src={CONDUCT_PAGES[currentPage]}
                    alt={`Code of Conduct Page ${currentPage + 1}`}
                    className="w-full h-auto max-h-[640px] object-contain block select-none"
                    draggable={false}
                  />
                  <div className="absolute bottom-2 right-3 flex items-center gap-1.5 text-[10px] font-mono font-bold text-slate-600 bg-white/95 px-2.5 py-1 rounded shadow-xs border border-slate-200">
                    <span>Page {currentPage + 1} of {totalPages}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Scrubber */}
            <div className="px-4 sm:px-6 py-3.5 bg-slate-900 border-t border-slate-800 flex items-center justify-between gap-4 text-white text-xs">
              <button
                type="button"
                onClick={prevPage}
                disabled={currentPage === 0}
                className="font-bold disabled:opacity-30 hover:text-[#009EE0] cursor-pointer"
              >
                Previous
              </button>
              <div className="flex-1 max-w-sm flex items-center gap-2">
                <input
                  type="range"
                  min={0}
                  max={totalPages - 1}
                  value={currentPage}
                  onChange={(e) => goToPage(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#009EE0]"
                />
                <span className="font-mono">{currentPage + 1}/{totalPages}</span>
              </div>
              <button
                type="button"
                onClick={nextPage}
                disabled={currentPage >= totalPages - 1}
                className="font-bold disabled:opacity-30 text-[#009EE0] hover:text-white cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>

          {/* Ethics & Whistleblowing Card (Ghana Whistleblower Act 2006 / Act 720) */}
          <div className="mt-8 p-6 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 space-y-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-slate-900 font-bold">
              <ShieldAlert className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Confidential Whistleblower & Ethics Hotline (Act 720 Protected)</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              In accordance with the <strong>Whistleblower Act 2006 (Act 720)</strong> and Aviance Anti-Corruption policies, employees, airport partners, airline clients, and members of the public can report suspected misconduct, bribery, safety non-compliance, or harassment in absolute confidentiality without fear of reprisal.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <span className="font-semibold text-slate-900">Direct Ethics Officer Email:</span>
              <button
                type="button"
                onClick={() => handleCopyEmail('ethics@avianceghana.com')}
                className="px-3 py-1 rounded-lg bg-white border border-slate-200 text-[#204696] font-mono font-bold text-xs hover:border-[#204696] cursor-pointer"
              >
                {copiedWhistle ? 'Copied to Clipboard!' : 'ethics@avianceghana.com'}
              </button>
              <span className="text-slate-500 text-xs">· Post: Ethics Committee, P.O. Box 374, Accra, Ghana</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Comprehensive Privacy & Data Protection Policy (Act 843 & GDPR Aligned)
  if (type === 'privacy') {
    return (
      <div className="pb-24 sm:pb-32 space-y-12 sm:space-y-16 bg-white">
        {/* Hero Header */}
        <div className="py-12 sm:py-16 text-center border-b border-slate-200 bg-slate-50 text-slate-900 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 space-y-3 relative z-10">
            <button
              onClick={() => onNavigate('/')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#204696] hover:text-[#0F2E53] transition-colors mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
            </button>
            <div className="flex items-center justify-center gap-2.5">
              <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-[#204696] via-[#009EE0] to-[#72BF44]" />
              <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#204696]">
                Data Protection & Statutory Privacy Statement
              </h2>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Privacy & Data Protection Policy
            </h1>
            <p className="text-xs sm:text-sm max-w-2xl mx-auto text-slate-600">
              Compliance with the <strong>Ghana Data Protection Act 2012 (Act 843)</strong>, IATA Ground Handling Security Governance, and International Aviation Cyber Standards.
            </p>
            <div className="text-[11px] font-mono text-slate-500">
              Effective Date: January 1, 2026 · Document Ref: AGY-DPO-POL-2026-V2
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {renderLegalTabs()}

          {/* Quick Compliance Summary Card */}
          <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 text-slate-800 mb-8 space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#204696] text-sm">
              <ShieldCheck className="w-5 h-5 shrink-0" />
              <span>Statutory Compliance Commitment (Republic of Ghana)</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-700">
              Aviance Ghana Limited is fully committed to protecting your privacy rights and processing personal data with complete transparency, safety, and accountability in accordance with the <strong>Data Protection Act 2012 (Act 843)</strong>. We never sell, lease, or monetize your personal information to third-party ad networks.
            </p>
          </div>

          {/* Structured Policy Articles */}
          <div className="space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
            
            {/* Article 1 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#204696]" />
                1. Data Controller & Designated Contact Details
              </h3>
              <p>
                The Data Controller responsible for personal data processed through this digital platform, corporate communications, and direct station services is:
              </p>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1 font-mono text-xs">
                <p><strong>Legal Entity:</strong> Aviance Ghana Limited</p>
                <p><strong>Registered Office:</strong> Kotoka International Airport, Terminal 3 / Freight Village, P.O. Box 374, Accra, Ghana</p>
                <p><strong>Data Protection Officer (DPO):</strong> dpo@avianceghana.com / privacy@avianceghana.com</p>
                <p><strong>Operational Stations:</strong> Kotoka (ACC) · Prempeh I International (KMS) · Tamale International (TML)</p>
              </div>
            </div>

            {/* Article 2 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#009EE0]" />
                2. Dual Role: Data Controller vs. Data Processor in Aviation
              </h3>
              <p>
                In accordance with international civil aviation standards and IATA Standard Ground Handling Agreements (SGHA), please understand our legal role:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-600">
                <li>
                  <strong className="text-slate-900">Aviance as Data Processor:</strong> When we handle passenger check-in, boarding gate reconciliation, barcode bag tag scans, or air cargo manifests on behalf of contracting commercial airlines, we act as an independent Ground Service Provider (Processor). Your primary contract of carriage and flight privacy terms remain governed by your contracting airline.
                </li>
                <li>
                  <strong className="text-slate-900">Aviance as Data Controller:</strong> When you browse this website, submit a cargo enquiry quote, book VIP lounge hospitality, apply for employment, or interact with our AI Concierge, Aviance Ghana acts as the Data Controller under Act 843.
                </li>
              </ul>
            </div>

            {/* Article 3 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#72BF44]" />
                3. Lawful Bases for Processing under Act 843 (Sections 18–21)
              </h3>
              <p>We process personal data only when a recognized statutory ground exists:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                <li><strong>Consent (Section 20):</strong> Freely given for newsletter subscriptions, feedback forms, and optional analytics cookies.</li>
                <li><strong>Contractual Performance (Section 21):</strong> Fulfilling cargo storage bookings, VIP lounge access, and ground handling SLA obligations.</li>
                <li><strong>Legal & Aviation Regulatory Obligation:</strong> Mandated security records for the Ghana Civil Aviation Authority (GCAA), ICAO Annex 17, European Union RA3 validation, and Ghana Customs (GRA ICUMS).</li>
                <li><strong>Legitimate Interests:</strong> Preserving airside cyber infrastructure, investigating baggage discrepancies, and preventing recruitment fraud.</li>
              </ul>
            </div>

            {/* Article 4 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#204696]" />
                4. Categories of Personal Data Collected
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-900 text-xs">Cargo & Freight Services</div>
                  <p className="text-[11px] text-slate-600">Air Waybill numbers, shipper/consignee contact details, hazardous goods declarations, and customs documentation.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-900 text-xs">VIP Lounge Hospitality</div>
                  <p className="text-[11px] text-slate-600">Passenger name, frequent flyer tokens, flight number, payment reference tokens, and special dietary notes.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-900 text-xs">Careers & Recruitment</div>
                  <p className="text-[11px] text-slate-600">Curriculum vitae, academic transcripts, employment history, identity cards/passports, and verified police clearances.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-900 text-xs">Baggage Tracing Queries</div>
                  <p className="text-[11px] text-slate-600">SITA WorldTracer PIR file references, airline flight numbers, baggage claim stubs, and passenger phone numbers.</p>
                </div>
              </div>
            </div>

            {/* Article 5 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#009EE0]" />
                5. Data Retention Periods & Secure Disposal
              </h3>
              <p>
                Personal data is retained only for as long as strictly necessary to fulfill the purpose for which it was collected:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li><strong>Job Applications:</strong> Retained for a maximum of 12 months for vacancy consideration, then permanently purged from HR systems.</li>
                <li><strong>Aviation Handling & Cargo Records:</strong> Retained for 7 years to satisfy statutory GCAA, IATA, and Ghana tax audit requirements.</li>
                <li><strong>Customer Enquiries:</strong> Retained for 24 months from the date of final resolution.</li>
                <li><strong>Analytics Telemetry:</strong> Aggregated and anonymized; raw IP addresses are truncated.</li>
              </ul>
            </div>

            {/* Article 6 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#72BF44]" />
                6. Security Safeguards & International Transfers
              </h3>
              <p>
                All digital communications utilize TLS 1.3 encryption. Physical server racks and airside terminal networks are secured by biometric multi-factor authentication in alignment with IATA ISAGO cyber governance. Cross-border flight data exchanges with foreign airline headquarters operate under Standard Contractual Clauses (SCCs) and Section 33 of Ghana Act 843.
              </p>
            </div>

            {/* Article 7 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#204696]" />
                7. Your Statutory Rights under Ghana Act 843
              </h3>
              <p>Under Part V of the Ghana Data Protection Act 2012, you possess the right to:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                <li><strong>Right of Access (Section 35):</strong> Request confirmation and copies of personal data held about you.</li>
                <li><strong>Right to Rectification (Section 36):</strong> Request correction of inaccurate or incomplete personal records.</li>
                <li><strong>Right to Erasure (Section 37):</strong> Request deletion of data where statutory retention grounds no longer apply.</li>
                <li><strong>Right to Object (Section 39):</strong> Object to processing for direct marketing or automated profiling.</li>
                <li><strong>Right to Prevent Damage or Distress (Section 40):</strong> Prevent processing likely to cause unwarranted distress.</li>
              </ul>
              <p className="pt-2">
                To exercise any of these rights, email our Data Protection Officer at <a href="mailto:privacy@avianceghana.com" className="text-[#204696] font-bold underline">privacy@avianceghana.com</a>. Requests are responded to within 21 statutory business days.
              </p>
            </div>

            {/* Article 8 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                8. Supervisory Authority & Statutory Complaints
              </h3>
              <p>
                If you believe your personal data has been handled in breach of the law, you have the statutory right to lodge a complaint with the national supervisory authority:
              </p>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono space-y-1">
                <p><strong>Data Protection Commission (DPC) of Ghana</strong></p>
                <p>Address: Pawpaw Street, East Legon, Accra, Ghana</p>
                <p>Website: www.dataprotection.org.gh</p>
                <p>Email: complaints@dataprotection.org.gh · Phone: +233 (0)30 222 2929</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // Comprehensive Terms of Use & Aviation Liability Shield
  return (
    <div className="pb-24 sm:pb-32 space-y-12 sm:space-y-16 bg-white">
      {/* Hero Header */}
      <div className="py-12 sm:py-16 text-center border-b border-slate-200 bg-slate-50 text-slate-900 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 space-y-3 relative z-10">
          <button
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#204696] hover:text-[#0F2E53] transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </button>
          <div className="flex items-center justify-center gap-2.5">
            <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-[#204696] via-[#009EE0] to-[#72BF44]" />
            <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#204696]">
              Legal Platform Conditions & Liability Shield
            </h2>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Terms of Website Use & Aviation Disclaimers
          </h1>
          <p className="text-xs sm:text-sm max-w-2xl mx-auto text-slate-600">
            Governing access to avianceghana.com, operational telemetry, independent ground handler liability limitations, and intellectual property.
          </p>
          <div className="text-[11px] font-mono text-slate-500">
            Governed by the Laws of the Republic of Ghana · Last Revised: January 2026
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {renderLegalTabs()}

        {/* Essential Aviation Shield Warning Box */}
        <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-300 text-slate-800 mb-8 space-y-2">
          <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
            <Scale className="w-5 h-5 text-amber-700 shrink-0" />
            <span>Notice of Independent Ground Service Provider Status</span>
          </div>
          <p className="text-xs leading-relaxed text-slate-700">
            Aviance Ghana Limited is an <strong>independent ground handling agent</strong> operating under IATA Standard Ground Handling Agreements (SGHA). Aviance is <strong>NOT</strong> an air carrier, airline, or charter operator. Contracts of carriage for passenger flights, baggage transport, and air cargo remain strictly between the passenger/shipper and their ticketed commercial air carrier.
          </p>
        </div>

        {/* Structured Terms Sections */}
        <div className="space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          
          {/* Term 1 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#204696]" />
              1. Acceptance of Terms & Digital Platform Scope
            </h3>
            <p>
              By accessing, browsing, or using the Aviance Ghana Limited website (avianceghana.com), customer portals, baggage enquiry forms, or the AI Concierge assistant, you agree to be legally bound by these Terms of Use and our Data Protection Policy. If you do not accept these terms without qualification, you must discontinue platform use immediately.
            </p>
          </div>

          {/* Term 2: The Critical Carriage Shield */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              2. Aviation Carriage Scope & Carrier Liability Disclaimer (Montreal Convention 1999)
            </h3>
            <p>
              To the fullest extent established under international civil aviation treaties:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li>
                <strong className="text-slate-900">No Carrier Contract:</strong> Aviance Ghana Limited does not issue airline tickets, air carriage contracts, or assume the legal obligations of a commercial airline. All carriage of passengers, baggage, and cargo is governed exclusively by the contracting airline's terms of carriage, the <strong>Montreal Convention 1999</strong>, the <strong>Warsaw Convention</strong>, and Ghana Civil Aviation Authority (GCAA) directives.
              </li>
              <li>
                <strong className="text-slate-900">Baggage Liability:</strong> Under international treaties, legal liability for lost, delayed, or pilfered baggage rests entirely with the contracting air carrier. Aviance Ghana acts solely as the local ground handling agent performing physical ramp offloading, carousel induction, and WorldTracer documentation. Aviance accepts zero direct monetary liability to passengers for baggage compensation claims.
              </li>
              <li>
                <strong className="text-slate-900">Flight Delays & Cancellations:</strong> Aviance Ghana is not liable for airline schedule alterations, weather diversions, air traffic control restrictions, or missed interline flight connections.
              </li>
            </ul>
          </div>

          {/* Term 3 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#009EE0]" />
              3. Telemetry, Baggage Queries & Tracking Feeds
            </h3>
            <p>
              Telemetry data displayed through our baggage and cargo lookup portals is populated via external airline Departure Control Systems (DCS) and SITA WorldTracer. This information is provided strictly on an <strong>“AS IS”</strong> and <strong>“AS AVAILABLE”</strong> basis for informational guidance. Status displays do not constitute an admission of carrier fault or settlement approval.
            </p>
          </div>

          {/* Term 4 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#72BF44]" />
              4. Air Cargo Warehousing & Customs Regulatory Integration
            </h3>
            <p>
              Cargo handling, warehouse storage, and cold-chain staging at the Aviance Cargo Village are conducted in strict compliance with IATA Dangerous Goods Regulations (DGR), EU RA3 validation, and Ghana Revenue Authority Customs Division (ICUMS) statutes. Cargo release is contingent upon valid Air Waybill (AWB) documentation, payment of handling charges, and final customs clearance. Aviance Ghana is not liable for perishable spoilage or customs seizure resulting from incomplete forwarder documentation.
            </p>
          </div>

          {/* Term 5: Trademark Protection */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#204696]" />
              5. Intellectual Property & Third-Party Airline Trademarks
            </h3>
            <p>
              The Aviance wordmark, triangular emblem, website design, and proprietary code are the registered intellectual property of Aviance Ghana Limited.
            </p>
            <p className="text-slate-600">
              <strong className="text-slate-900">Third-Party Trademarks:</strong> All third-party commercial airline logos, freighter emblems, alliance marks, and aircraft silhouettes (including but not limited to Emirates, British Airways, KLM, Delta Air Lines, Ethiopian Airlines, Qatar Airways, Solitair, etc.) displayed on this website are the registered trademarks of their respective owners. Their display constitutes nominative fair use indicating ground handling contractual relationships and does not imply ownership or commercial endorsement by Aviance Ghana Limited.
            </p>
          </div>

          {/* Term 6: Recruitment Scam Shield */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-600" />
              6. Official Anti-Fraud & Recruitment Scam Warning
            </h3>
            <p className="text-slate-900 font-semibold">
              Aviance Ghana Limited NEVER solicits or accepts application fees, uniform deposits, medical exam charges, or interview payments at any stage of the recruitment process.
            </p>
            <p className="text-slate-600">
              Genuine employment vacancies are published exclusively through our official careers portal, and authentic recruitment emails originate strictly from verified <strong>@avianceghana.com</strong> domains. Aviance Ghana Limited disclaims all civil and financial liability for losses incurred through fraudulent third-party recruitment scams.
            </p>
          </div>

          {/* Term 7: AI Concierge Disclaimer */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#009EE0]" />
              7. Automated AI Concierge Disclaimer
            </h3>
            <p>
              The AI Concierge conversational assistant on this digital platform is powered by automated natural language processing (Google Gemini). Responses generated by the AI assistant are provided solely for general operational orientation. The AI assistant possesses no authority to issue binding airline carriage terms, grant hazardous cargo clearances, or settle customer claims.
            </p>
          </div>

          {/* Term 8: Lounge Access */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#72BF44]" />
              8. VIP Lounge Hospitality & Admittance Conditions
            </h3>
            <p>
              Access to the Adinkra Executive Lounge and The U Lounge at Terminal 3 is contingent upon passenger presentation of a valid boarding pass, partner airline credentials, or payment of the established walk-in fee. Aviance Ghana reserves the statutory right to refuse lounge admittance to any passenger failing to adhere to airport security, sobriety, or dress code standards.
            </p>
          </div>

          {/* Term 9: Limitation of Liability */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-900" />
              9. Comprehensive Limitation of Liability
            </h3>
            <p>
              To the maximum extent permissible under Ghanaian law, Aviance Ghana Limited, its directors, officers, employees, and agents shall not be liable for any direct, indirect, incidental, special, punitive, or consequential damages (including loss of profits, flight disruption, cargo delay, or business interruption) resulting from the use or inability to use this platform, server downtime, or reliance on published content.
            </p>
          </div>

          {/* Term 10: Governing Law & Jurisdiction */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#204696]" />
              10. Governing Law & Exclusive Jurisdiction (Republic of Ghana)
            </h3>
            <p>
              These Terms of Use, our Privacy Policy, and any disputes arising out of or related to this digital platform shall be governed by, and construed exclusively in accordance with, the <strong>Laws of the Republic of Ghana</strong>. You irrevocably submit to the <strong>exclusive jurisdiction of the competent Courts of Ghana</strong> located in Accra for the adjudication of any legal claim or dispute.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
