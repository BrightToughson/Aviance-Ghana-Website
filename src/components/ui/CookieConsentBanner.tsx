import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie, Settings, X, ChevronRight, Lock, SlidersHorizontal, Info } from 'lucide-react';
import { AvianceLogo } from './AvianceLogo';
import { cookieConsentService, CookiePreferences } from '../../services/cookieConsentService';

interface CookieConsentBannerProps {
  onNavigate?: (path: string) => void;
}

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Modal toggle state
  const [functional, setFunctional] = useState(true);
  const [analytics, setAnalytics] = useState(true);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = cookieConsentService.getPreferences();
    if (!consent) {
      // Must respond before using the site: show immediately to gate access
      setIsVisible(true);
    } else {
      setFunctional(consent.functional);
      setAnalytics(consent.analytics);
    }
  }, []);

  // Listen for global open event from footer or settings
  useEffect(() => {
    const handleOpen = () => {
      const consent = cookieConsentService.getPreferences();
      if (consent) {
        setFunctional(consent.functional);
        setAnalytics(consent.analytics);
      }
      setIsModalOpen(true);
    };

    window.addEventListener('aviance:open-cookie-preferences', handleOpen);
    return () => window.removeEventListener('aviance:open-cookie-preferences', handleOpen);
  }, []);

  // Lock body scroll whenever consent is required or customize modal is active
  useEffect(() => {
    const isGated = (isVisible && !cookieConsentService.hasConsent()) || isModalOpen;
    if (isGated) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isVisible, isModalOpen]);

  // Trap Escape key if consent has not been given yet
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !cookieConsentService.hasConsent()) {
        e.preventDefault();
        // If in customize view, return to the main gate prompt
        if (isModalOpen) {
          setIsModalOpen(false);
          setIsVisible(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const handleAcceptAll = () => {
    cookieConsentService.acceptAll();
    setIsVisible(false);
    setIsModalOpen(false);
  };

  const handleAcceptEssential = () => {
    cookieConsentService.acceptEssentialOnly();
    setIsVisible(false);
    setIsModalOpen(false);
  };

  const handleSaveCustom = () => {
    cookieConsentService.savePreferences({ functional, analytics });
    setIsVisible(false);
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    if (!cookieConsentService.hasConsent()) {
      // User must answer before accessing site: return to gate
      setIsModalOpen(false);
      setIsVisible(true);
    } else {
      setIsModalOpen(false);
    }
  };

  if (!isVisible && !isModalOpen) {
    return null;
  }

  return (
    <>
      {/* Full-Screen Blocking Consent Gate Backdrop */}
      {isVisible && !isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-gate-title"
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200 select-none"
          onClick={(e) => e.stopPropagation()}
        >
          <div 
            className="bg-white border border-slate-200/90 rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden flex flex-col max-h-[92vh] select-text animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Brand Tri-Color Accent Line */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#204696] via-[#009EE0] to-[#72BF44] shrink-0" />

            {/* Header */}
            <div className="px-6 pt-6 pb-4 bg-gradient-to-b from-slate-50 to-white border-b border-slate-100 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-[#204696]/20 flex items-center justify-center shrink-0 text-[#204696] shadow-sm">
                <ShieldCheck className="w-6 h-6 text-[#204696]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h2 id="cookie-gate-title" className="text-lg font-bold text-slate-900 tracking-tight">
                    Privacy & Cookie Consent
                  </h2>
                  <span className="text-[10px] font-mono font-bold text-[#204696] bg-blue-50 border border-[#204696]/30 px-2.5 py-0.5 rounded-full">
                    Ghana Act 843
                  </span>
                  <span className="text-[10px] font-mono font-semibold text-emerald-700 bg-emerald-50 border border-emerald-300/40 px-2 py-0.5 rounded-full">
                    ISAGO Compliant
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  Aviance Ghana Limited · Ground Handling & Flight Operations
                </p>
              </div>
            </div>

            {/* Scrollable Explanatory Body */}
            <div className="p-6 space-y-4 overflow-y-auto text-xs text-slate-600 leading-relaxed">
              <p className="text-slate-700 text-[13px] leading-normal font-normal">
                Welcome to Aviance Ghana. In compliance with the <strong className="font-semibold text-slate-900">Ghana Data Protection Act 2012 (Act 843)</strong> and international aviation cyber governance protocols, please confirm your cookie preferences to begin browsing our site and services.
              </p>

              {/* Categorization Preview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                    <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Strictly Necessary</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Session integrity, station partner tokens, CSRF protection, and consent tracking. Always active.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                    <SlidersHorizontal className="w-4 h-4 text-[#204696] shrink-0" />
                    <span>Functional & Analytics</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Cargo form drafts, bilingual language preferences, and anonymous operational flight traffic analytics.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-xl text-[11px] text-blue-900 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-[#204696] shrink-0 mt-0.5" />
                <span>
                  Please select an option below to proceed. You can customize your permitted cookies or update your decision anytime via the footer link.
                </span>
              </div>

              {onNavigate && (
                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={() => window.open('/privacy-policy', '_blank')}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#204696] hover:text-[#009EE0] underline underline-offset-2 transition-colors cursor-pointer"
                  >
                    <span>Read Aviance Ghana's Full Data Protection Policy</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            {/* Action Bar */}
            <div className="p-5 bg-slate-50 border-t border-slate-200 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto text-xs font-semibold text-[#204696] hover:text-[#009EE0] flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg hover:bg-blue-50/50 transition-colors cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Customize Settings</span>
              </button>

              <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={handleAcceptEssential}
                  className="flex-1 sm:flex-none px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-2xs"
                >
                  Essential Only
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="flex-1 sm:flex-none px-6 py-2.5 bg-gradient-to-r from-[#204696] to-[#009EE0] hover:from-[#183878] hover:to-[#0089c4] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer hover:shadow-lg active:scale-[0.98]"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comprehensive Cookie Preferences Modal (Customization) */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-modal-title"
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150"
          onClick={(e) => e.stopPropagation()}
        >
          <div 
            className="bg-white border border-slate-200 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Brand Tri-Color Accent Line */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#204696] via-[#009EE0] to-[#72BF44] shrink-0" />

            {/* Modal Header */}
            <div className="px-5 py-4 bg-gradient-to-r from-[#0F2E53] via-[#163469] to-[#204696] text-white shrink-0 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white/10 backdrop-blur-xs border border-white/20 flex items-center justify-center p-1 shrink-0">
                  <AvianceLogo variant="mark-only" size="sm" markSize={24} />
                </div>
                <div>
                  <h3 id="cookie-modal-title" className="text-sm font-bold text-white tracking-tight">
                    Cookie & Data Preferences
                  </h3>
                  <div className="text-[11px] text-slate-300">
                    Aviance Ghana Limited · Compliance Manager
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
                aria-label={cookieConsentService.hasConsent() ? "Close preferences modal" : "Return to consent prompt"}
                title={cookieConsentService.hasConsent() ? "Close" : "Return"}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-5 space-y-4 overflow-y-auto text-xs text-slate-700 leading-relaxed">
              <p className="text-slate-600">
                You can choose which types of cookies you permit on our aviation platform. Strictly necessary cookies are required for safety and session authentication.
              </p>

              {/* Category 1: Strictly Necessary */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-bold text-slate-900 text-xs sm:text-[13px]">
                      Strictly Necessary Cookies
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-300/40">
                    Always Active
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Essential for security tokens, airport partner authentication, CSRF defense, and persisting your cookie preferences. These cannot be disabled.
                </p>
              </div>

              {/* Category 2: Functional */}
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 space-y-2 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Settings className="w-4 h-4 text-[#204696] shrink-0" />
                    <span className="font-bold text-slate-900 text-xs sm:text-[13px]">
                      Functional Cookies
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={functional}
                      onChange={(e) => setFunctional(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#204696]"></div>
                  </label>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Remembers your language choice (English/French), VIP lounge enquiry form drafts, and preserves your AI Concierge conversation context between page visits.
                </p>
              </div>

              {/* Category 3: Analytics */}
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 space-y-2 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cookie className="w-4 h-4 text-[#009EE0] shrink-0" />
                    <span className="font-bold text-slate-900 text-xs sm:text-[13px]">
                      Analytics & Performance Cookies
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={analytics}
                      onChange={(e) => setAnalytics(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#204696]"></div>
                  </label>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Collects anonymous, first-party aggregated telemetry on page views and popular services (Cargo, Ramp, Baggage) without selling or sharing personal identifiers.
                </p>
              </div>

              <div className="pt-1 text-center">
                <button
                  type="button"
                  onClick={() => window.open('/privacy-policy', '_blank')}
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-[#204696] hover:underline cursor-pointer"
                >
                  <span>Read our full Privacy & Data Protection Policy</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 shrink-0 flex flex-wrap items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={handleAcceptEssential}
                className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Essential Only
              </button>
              <button
                type="button"
                onClick={handleSaveCustom}
                className="px-4 py-2 bg-[#204696] hover:bg-[#183878] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Save My Preferences
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="px-4 py-2 bg-gradient-to-r from-[#204696] to-[#009EE0] hover:from-[#183878] hover:to-[#0089c4] text-white text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
