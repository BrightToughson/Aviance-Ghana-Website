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
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const [copiedWhistle, setCopiedWhistle] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const bookContainerRef = useRef<HTMLDivElement>(null);

  const pdfSource = conductPdfUrl || CONDUCT_PDF_FALLBACK;
  const totalPages = CONDUCT_PAGES.length; // 11

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

  // Keyboard Navigation: Right arrow turns from right to left (next), Left arrow turns back
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        nextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        prevPage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, totalPages, isTwoPageSpread]);

  // Touch Swipe Handlers for mobile & tablet
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX < -50) {
      // Swiped right-to-left -> Next Page
      nextPage();
    } else if (deltaX > 50) {
      // Swiped left-to-right -> Prev Page
      prevPage();
    }
    touchStartX.current = null;
  };

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedWhistle(true);
    setTimeout(() => setCopiedWhistle(false), 2000);
  };

  // Dedicated Rich Layout for Corporate Code of Conduct with Interactive Right-to-Left Book Reader
  if (type === 'conduct') {
    return (
      <div className="pb-24 sm:pb-32 space-y-16 sm:space-y-24 bg-white">
        {/* Hero Header */}
        <div className="py-14 sm:py-20 lg:py-24 text-center border-b border-slate-200 bg-slate-50 text-slate-900 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 space-y-4 relative z-10">
            <button
              onClick={() => onNavigate('/about')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#204696] hover:text-[#0F2E53] transition-colors mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to About Us
            </button>

            <div className="flex items-center justify-center gap-2.5">
              <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-[#204696] via-[#009EE0] to-[#72BF44]" />
              <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#204696]">
                Aviance Ghana Limited <span className="text-[#009EE0]">·</span> <span className="text-[#3B7A1C]">Governance Standards</span>
              </h2>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
              Corporate Code of Conduct &amp; Ethics
            </h1>

            <p className="text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-slate-600">
              Conducting business in an ethical, safe, and transparent manner across all stations and aviation operations.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#204696] text-xs font-semibold">
              <BookOpen className="w-3.5 h-3.5 text-[#009EE0]" />
              <span>Interactive Book Reader · Flip Pages Right-to-Left</span>
            </div>
          </div>
        </div>

        {/* Main Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* 2-Column Presentation: Text & Guidelines on the Left, Interactive Book on the Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Guidelines, Descriptions & Governance Pillars */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#204696] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100 inline-block">
                  Official Policy Guidelines
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                  Conducting business in an ethical and responsible manner.
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  The Code of Conduct provides guidelines on how Aviance Ghana conducts business and explains our expectations of our employees. Click on the adjacent document to flip through the book or download the complete policy.
                </p>
              </div>

              {/* Direct Actions: Download & Open in New Tab */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={pdfSource}
                  download="Aviance_Ghana_Code_of_Conduct.pdf"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#204696] text-white font-bold text-xs hover:bg-[#0F2E53] shadow-md hover:shadow-lg transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Document (PDF)</span>
                </a>

                <a
                  href={pdfSource}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-[#204696]" />
                  <span>Open Full PDF</span>
                </a>
              </div>

              {/* Document Metadata Pill */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-[#204696]" /> Document Format
                  </span>
                  <span className="font-mono font-bold text-[#204696]">11-Page Official Policy (127 KB)</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#72BF44]" /> Compliance
                  </span>
                  <span>IATA ISAGO · GCAA · EU RA3</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-slate-400" /> Navigation
                  </span>
                  <span className="font-semibold text-slate-700">Right-to-Left (Swipe / Click / Keys)</span>
                </div>
              </div>

              {/* Core Governance Highlights */}
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                  Core Standards &amp; Principles
                </h3>

                <div className="space-y-3">
                  <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs space-y-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <h4 className="text-xs font-bold text-slate-900">1. Safety &amp; Regulatory Compliance</h4>
                    </div>
                    <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                      Every Aviance employee and contractor is empowered and obligated to stop any operation where safety or security could be compromised. Adherence to IATA ISAGO, GCAA, and airport bye-laws is absolute.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs space-y-1">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-[#204696] shrink-0" />
                      <h4 className="text-xs font-bold text-slate-900">2. Zero Tolerance for Bribery &amp; Corruption</h4>
                    </div>
                    <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                      We condemn any form of bribery or corruption. Employees must never accept, solicit, or offer improper payments, gifts, or favors to influence commercial or statutory decisions.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs space-y-1">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[#009EE0] shrink-0" />
                      <h4 className="text-xs font-bold text-slate-900">3. Protection of Assets &amp; Customer Information</h4>
                    </div>
                    <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                      All employees are required to protect tangible airport equipment and intellectual assets, ensuring total confidentiality of airline passenger, DCS, and cargo manifest information.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs space-y-1">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#72BF44] shrink-0" />
                      <h4 className="text-xs font-bold text-slate-900">4. Equal Opportunity &amp; Non-Discrimination</h4>
                    </div>
                    <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                      Aviance Ghana provides an inclusive workplace free from discrimination, harassment, and intimidation based on gender, ethnicity, disability, or religious belief.
                    </p>
                  </div>
                </div>
              </div>

              {/* Ethics Reporting Desk Notice */}
              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-2">
                <div className="flex items-center gap-2 text-[#204696] font-bold text-xs">
                  <Mail className="w-4 h-4" />
                  <span>Confidential Ethics &amp; Compliance Channel</span>
                </div>
                <p className="text-xs text-slate-600">
                  Suspected violations of this Code of Conduct can be reported confidentially to the Internal Audit and Compliance team at:
                </p>
                <div className="flex items-center justify-between pt-1">
                  <a
                    href="mailto:info@avianceghana.com"
                    className="text-xs font-mono font-bold text-[#204696] hover:underline"
                  >
                    info@avianceghana.com
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopyEmail('info@avianceghana.com')}
                    className="text-xs font-semibold text-[#204696] hover:underline"
                  >
                    {copiedWhistle ? 'Copied!' : 'Copy Email'}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Book Reader (Pages turn Right to Left) */}
            <div className="lg:col-span-7 space-y-4">
              <div
                ref={bookContainerRef}
                className={`rounded-2xl border-2 border-slate-200 bg-slate-900 text-white shadow-2xl overflow-hidden transition-all duration-300 ${
                  isFullscreen ? 'fixed inset-0 z-50 rounded-none bg-slate-950 flex flex-col justify-between p-4 sm:p-6' : ''
                }`}
              >
                {/* Book Reader Header Toolbar */}
                <div className="px-4 sm:px-6 py-3.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-[#204696] flex items-center justify-center shrink-0 shadow-xs">
                      <BookOpen className="w-4 h-4 text-white" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold truncate text-white">
                        Aviance Ghana Code of Conduct
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        Page {currentPage + 1} of {totalPages}
                      </div>
                    </div>
                  </div>

                  {/* Flow Badge & Reader Control Buttons */}
                  <div className="flex items-center gap-2">
                    {/* Explicit Right-to-Left Direction Indicator */}
                    <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#009EE0]/15 border border-[#009EE0]/30 text-[#58C1EB] text-[11px] font-semibold">
                      <span className="text-xs font-bold animate-pulse">⮌</span>
                      <span>Turn: Right-to-Left</span>
                    </div>

                    {/* Two-Page Spread Toggle (desktop only) */}
                    <button
                      type="button"
                      onClick={() => setIsTwoPageSpread(!isTwoPageSpread)}
                      title={isTwoPageSpread ? 'Switch to Single Page View' : 'Switch to 2-Page Book Spread'}
                      className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                        isTwoPageSpread
                          ? 'bg-[#204696] text-white'
                          : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>{isTwoPageSpread ? '2-Page Spread' : 'Single Page'}</span>
                    </button>

                    {/* Fullscreen Toggle */}
                    <button
                      type="button"
                      onClick={() => setIsFullscreen(!isFullscreen)}
                      title={isFullscreen ? 'Exit Fullscreen' : 'View Book in Fullscreen'}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    >
                      {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                    </button>

                    {/* Download PDF button */}
                    <a
                      href={pdfSource}
                      download="Aviance_Ghana_Code_of_Conduct.pdf"
                      title="Download full PDF"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#204696] hover:bg-[#009EE0] text-white text-xs font-bold transition-colors shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">PDF</span>
                    </a>
                  </div>
                </div>

                {/* The Interactive Book Stage with Right-to-Left 3D Flip */}
                <div
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                  className="relative w-full bg-slate-950/90 p-4 sm:p-8 flex items-center justify-center select-none overflow-hidden min-h-[520px] sm:min-h-[640px]"
                >
                  {/* Subtle Background Radial Glow */}
                  <div className="absolute inset-0 bg-radial from-[#204696]/20 via-slate-950/60 to-slate-950 pointer-events-none" />

                  {/* Left Navigation Trigger Button (Turn Back Left-to-Right) */}
                  <button
                    type="button"
                    onClick={prevPage}
                    disabled={currentPage === 0}
                    title="Previous page (Left arrow key)"
                    className={`absolute left-2 sm:left-4 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-slate-900/90 hover:bg-[#204696] text-white border border-slate-700 flex items-center justify-center shadow-2xl transition-all backdrop-blur-md ${
                      currentPage === 0 ? 'opacity-25 cursor-not-allowed' : 'hover:scale-110 cursor-pointer active:scale-95'
                    }`}
                  >
                    <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
                  </button>

                  {/* Right Navigation Trigger Button (Turn Right-to-Left -> Next Page) */}
                  <button
                    type="button"
                    onClick={nextPage}
                    disabled={currentPage >= totalPages - 1}
                    title="Next page: Flip Right-to-Left (Right arrow key / Spacebar)"
                    className={`absolute right-2 sm:right-4 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-slate-900/90 hover:bg-[#204696] text-white border border-slate-700 flex items-center justify-center shadow-2xl transition-all backdrop-blur-md ${
                      currentPage >= totalPages - 1 ? 'opacity-25 cursor-not-allowed' : 'hover:scale-110 cursor-pointer animate-pulse active:scale-95'
                    }`}
                  >
                    <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
                  </button>

                  {/* The Physical Book Container with Spine Binding and Stacked Paper Edges */}
                  <div className="relative max-w-full flex items-center justify-center transition-all duration-300">
                    <div
                      className={`relative flex items-center justify-center rounded-xl overflow-hidden bg-white border border-slate-300/80 transition-all ${
                        isTwoPageSpread ? 'max-w-4xl' : 'max-w-md sm:max-w-lg border-l-6 border-l-[#0F2E53]'
                      }`}
                      style={{
                        perspective: '1600px',
                        boxShadow: isTwoPageSpread
                          ? '0 30px 70px -15px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                          : '6px 0 0 -2px #f8fafc, 12px 0 0 -4px #e2e8f0, 18px 0 0 -6px #cbd5e1, 0 30px 70px -15px rgba(0, 0, 0, 0.8)',
                      }}
                    >
                      {/* Left Book Page (in 2-page spread when past cover) */}
                      {isTwoPageSpread && currentPage > 0 && (
                        <div
                          onClick={prevPage}
                          className="relative flex-1 cursor-pointer border-r border-slate-200 overflow-hidden bg-white"
                          title="Click left page to turn back"
                        >
                          <img
                            src={CONDUCT_PAGES[currentPage - 1]}
                            alt={`Page ${currentPage}`}
                            className="w-full h-auto max-h-[640px] object-contain block select-none pointer-events-none"
                            draggable={false}
                          />
                          {/* Book Center Binding Shadow Gutter */}
                          <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-slate-900/25 to-transparent pointer-events-none" />
                          <div className="absolute bottom-2 left-3 text-[10px] font-mono font-bold text-slate-500 bg-white/90 px-2 py-0.5 rounded shadow-xs border border-slate-200">
                            Page {currentPage}
                          </div>
                        </div>
                      )}

                      {/* Active Book Page (Turning from Right to Left) */}
                      <div
                        onClick={nextPage}
                        className="relative flex-1 cursor-pointer overflow-hidden bg-white"
                        style={{
                          transform: isFlipping
                            ? turnDirection === 'right-to-left'
                              ? 'perspective(1400px) rotateY(-22deg) scale(0.97)'
                              : 'perspective(1400px) rotateY(22deg) scale(0.97)'
                            : 'perspective(1400px) rotateY(0deg) scale(1)',
                          transformOrigin: turnDirection === 'right-to-left' ? 'left center' : 'right center',
                          transition: 'transform 220ms cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 220ms ease',
                        }}
                        title="Click right edge to flip page from Right to Left"
                      >
                        <img
                          src={CONDUCT_PAGES[currentPage]}
                          alt={`Page ${currentPage + 1}`}
                          className="w-full h-auto max-h-[640px] object-contain block select-none pointer-events-none"
                          draggable={false}
                        />

                        {/* Interactive Page Dog-Ear Curl (Top Right Corner) */}
                        {currentPage < totalPages - 1 && (
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              nextPage();
                            }}
                            title="Turn Page (Right to Left)"
                            className="group/curl absolute top-0 right-0 w-10 h-10 z-20 cursor-pointer overflow-hidden"
                          >
                            <div className="absolute top-0 right-0 w-0 h-0 border-t-20 border-r-20 border-t-amber-100 border-r-slate-300 shadow-md group-hover/curl:border-t-28 group-hover/curl:border-r-28 transition-all duration-200" />
                            <div className="absolute top-0.5 right-0.5 text-[7px] font-bold text-slate-700 opacity-60 group-hover/curl:opacity-100 rotate-45 select-none pointer-events-none">
                              ⮌
                            </div>
                          </div>
                        )}

                        {/* Spine Shadow on Left Edge of Page */}
                        <div className="absolute top-0 left-0 bottom-0 w-8 bg-gradient-to-r from-slate-900/20 to-transparent pointer-events-none" />

                        {/* Dynamic Shading Overlay that activates during Right-to-Left Page Flip */}
                        <div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-900/15 to-slate-900/30 pointer-events-none transition-opacity duration-200"
                          style={{ opacity: isFlipping ? 1 : 0 }}
                        />

                        {/* Page Number Badge & Turn Cue */}
                        <div className="absolute bottom-2 right-3 flex items-center gap-1.5 text-[10px] font-mono font-bold text-slate-600 bg-white/95 px-2.5 py-1 rounded shadow-xs border border-slate-200">
                          <span>Page {currentPage + 1}</span>
                          {currentPage < totalPages - 1 && (
                            <span className="text-[#009EE0] font-sans text-xs">⮌ Flip</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Navigation & Scrubber Bar */}
                <div className="px-4 sm:px-6 py-3.5 bg-slate-900 border-t border-slate-800 space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={prevPage}
                      disabled={currentPage === 0}
                      className="text-xs font-bold text-slate-300 hover:text-white disabled:opacity-30 flex items-center gap-1.5 transition-colors cursor-pointer disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Previous</span>
                    </button>

                    {/* Page Scrubber Range */}
                    <div className="flex-1 max-w-sm flex items-center gap-2.5">
                      <input
                        type="range"
                        min={0}
                        max={totalPages - 1}
                        value={currentPage}
                        onChange={(e) => goToPage(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#009EE0]"
                      />
                      <span className="text-xs font-mono font-bold text-slate-300 shrink-0">
                        {currentPage + 1} / {totalPages}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={nextPage}
                      disabled={currentPage >= totalPages - 1}
                      className="text-xs font-bold text-[#009EE0] hover:text-white disabled:opacity-30 flex items-center gap-1.5 transition-colors cursor-pointer disabled:cursor-not-allowed"
                    >
                      <span>Next (Right to Left)</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Thumbnail Strip (Quick jump to any page) */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-thin">
                    {CONDUCT_PAGES.map((thumb, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => goToPage(idx)}
                        className={`relative rounded-md overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                          currentPage === idx
                            ? 'border-[#009EE0] ring-2 ring-[#009EE0]/40 scale-105'
                            : 'border-slate-700 hover:border-slate-500 opacity-60 hover:opacity-100'
                        }`}
                        title={`Jump to Page ${idx + 1}`}
                      >
                        <img
                          src={thumb}
                          alt={`Thumb ${idx + 1}`}
                          className="w-10 h-13 object-cover object-top"
                        />
                        <span className="absolute bottom-0 inset-x-0 bg-black/75 text-[8px] font-mono text-center text-white">
                          {idx + 1}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reader Guidance Notice */}
              <div className="flex items-center justify-between text-xs text-slate-500 px-2">
                <span>Tip: Click on the right page or use your keyboard arrow keys (← / →) to flip pages.</span>
                <a
                  href={pdfSource}
                  download="Aviance_Ghana_Code_of_Conduct.pdf"
                  className="text-[#204696] font-bold hover:underline inline-flex items-center gap-1 shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Complete PDF</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Generic Policy Layout for Privacy Policy and Terms of Use
  const content = {
    privacy: {
      title: 'Website Privacy & Data Protection Policy',
      subtitle: 'Compliance with the Ghana Data Protection Act 2012 (Act 843)',
      sections: [
        {
          title: '1. Data Collection Principles',
          text: 'Aviance Ghana collects only personal data strictly necessary to respond to service enquiries, process job applications, or manage baggage tracing requests.',
        },
        {
          title: '2. First-Party Privacy-Conscious Analytics',
          text: 'Our website analytics engine records aggregate page views and session durations without collecting or selling sensitive personal identifiers, third-party cookies, or cross-site tracking profiles.',
        },
        {
          title: '3. Recruitment Data Storage',
          text: 'Resumes and employment applications submitted through our career portal are held securely in restricted HR storage and accessed only by authorized recruitment personnel.',
        },
        {
          title: '4. Your Rights',
          text: 'Under Act 843, you have the right to request access to, correction of, or deletion of your personal contact records held in our customer enquiry database by emailing info@avianceghana.com.',
        },
      ],
    },
    terms: {
      title: 'Terms of Website Use & Portal Access',
      subtitle: 'Legal Conditions Governing the Aviance Ghana Digital Platform',
      sections: [
        {
          title: '1. Intellectual Property',
          text: 'All trademarks, logos, brand assets, imagery, and text content published on this digital platform are the proprietary intellectual property of Aviance Ghana Limited or used under permission.',
        },
        {
          title: '2. Baggage Telemetry & Tracking Status',
          text: 'The baggage query portal provides status updates derived from baggage reconciliation feeds. Actual baggage delivery timelines remain subject to airline carriage contracts and customs inspection clearance.',
        },
        {
          title: '3. Portal Security',
          text: 'Administrative portal access is restricted to authorized personnel. Unauthorized access attempts are logged with audit timestamps and IP addresses in accordance with Ghanaian cybersecurity laws.',
        },
      ],
    },
  }[type];

  return (
    <div className="pb-24 sm:pb-32 space-y-16 sm:space-y-24">
      {/* Hero in Official Aviance Blue */}
      <div className="py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-[#11244C] via-[#0C1933] to-[#08101E] border-b border-[#204696]/30 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-36 bg-[#204696]/20 blur-3xl pointer-events-none rounded-full" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 space-y-3">
          <button
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </button>
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-[#204696] via-[#009EE0] to-[#72BF44]" />
            <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#58C1EB]">
              {content.subtitle}
            </h2>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {content.title}
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        {content.sections.map((sec, idx) => (
          <div
            key={idx}
            className="bg-[#0C1933]/90 border border-[#204696]/25 rounded-2xl p-6 sm:p-8 space-y-2 shadow-lg shadow-[#204696]/5"
          >
            <h3 className="text-lg font-bold text-white">{sec.title}</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{sec.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

