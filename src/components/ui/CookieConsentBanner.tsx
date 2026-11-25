import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie, Settings, X, ChevronRight, Lock, SlidersHorizontal, Info, Check } from 'lucide-react';
import { AvianceLogo } from './AvianceLogo';
import { cookieConsentService } from '../../services/cookieConsentService';

interface CookieConsentBannerProps {
  onNavigate?: (path: string) => void;
}

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Preference state
  const [functional, setFunctional] = useState(true);
  const [analytics, setAnalytics] = useState(true);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = cookieConsentService.getPreferences();
    if (!consent) {
      // Delay entrance slightly so initial page render and animations load smoothly
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 700);
      return () => clearTimeout(timer);
    } else {
      setFunctional(consent.functional);
      setAnalytics(consent.analytics);
    }
  }, []);

  // Listen for global open event from footer or user settings
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

  // Only lock body scroll when the full preferences modal is open, NOT for the floating banner
  useEffect(() => {
    if (isModalOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isModalOpen]);

  // Trap Escape key in preferences modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
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

  const handleNavigatePolicy = () => {
    if (onNavigate) {
      onNavigate('/privacy-policy');
    } else {
      window.location.href = '/privacy-policy';
    }
  };

  if (!isVisible && !isModalOpen) {
    return null;
  }

  return (
    <>
      {/* Modern Minimalist Floating Cookie Consent Card */}
      {isVisible && !isModalOpen && (
        <aside
          role="region"
          aria-label="Privacy and Cookie Consent"
          className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-[950] max-w-[360px] w-[calc(100%-2rem)] animate-in fade-in slide-in-from-bottom-5 duration-400 ease-out"
        >
          <div className="relative overflow-hidden rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800 shadow-[0_16px_48px_-12px_rgba(15,46,83,0.18)] dark:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] transition-all">
            {/* Signature Aviance Tri-Color Top Accent Line */}
            <div className="h-1 w-full bg-gradient-to-r from-[#204696] via-[#009EE0] to-[#72BF44]" />

            <div className="p-4 sm:p-5 space-y-3">
              {/* Header: Icon, Title & Dismiss (X) */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-[#204696]/15 dark:border-[#58C1EB]/20 flex items-center justify-center shrink-0 text-[#204696] dark:text-[#58C1EB]">
                    <Cookie className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                    Cookie Preferences
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={handleAcceptEssential}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
                  aria-label="Close cookie banner"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Simple, natural copy */}
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                We use cookies to improve your browsing experience and analyze site traffic.{' '}
                <button
                  type="button"
                  onClick={handleNavigatePolicy}
                  className="text-[#204696] dark:text-[#58C1EB] hover:underline font-medium cursor-pointer"
                >
                  Privacy Policy
                </button>
              </p>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleAcceptEssential}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-all cursor-pointer text-center active:scale-95 shadow-2xs"
                >
                  Essential Only
                </button>

                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="w-full px-3 py-2 rounded-xl bg-[#204696] hover:bg-[#1a3d8c] active:scale-95 text-white text-xs font-semibold shadow-sm shadow-[#204696]/25 transition-all cursor-pointer text-center"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* Comprehensive Cookie Preferences Modal (Customization) */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-modal-title"
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
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
                    Aviance Ghana Limited · Compliance & Governance
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
                aria-label="Close preferences modal"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-5 space-y-4 overflow-y-auto text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <div className="p-3 bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 rounded-2xl flex items-start gap-2.5 text-slate-600 dark:text-slate-300 text-xs">
                <Info className="w-4 h-4 text-[#204696] dark:text-[#58C1EB] shrink-0 mt-0.5" />
                <span>
                  Configure which cookie categories you permit. Essential cookies are required to preserve session defense, partner authorizations, and flight handling safety.
                </span>
              </div>

              {/* Category 1: Strictly Necessary */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300/40 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
                      <Lock className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white text-xs sm:text-[13px] block">
                        Strictly Necessary Cookies
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">
                        Session & Security Tokens
                      </span>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-300/40">
                    <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    Always Active
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed pt-1">
                  Required for core platform features, airline station security tokens, CSRF defense, and persisting your cookie choices. These cannot be disabled.
                </p>
              </div>

              {/* Category 2: Functional */}
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700/80 space-y-2 shadow-2xs">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-[#204696]/20 flex items-center justify-center text-[#204696] dark:text-[#58C1EB]">
                      <Settings className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white text-xs sm:text-[13px] block">
                        Functional Preferences
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">
                        User Interface & Personalization
                      </span>
                    </div>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={functional}
                      onChange={(e) => setFunctional(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-hidden rounded-full peer peer-checked:bg-[#204696] transition-colors duration-200 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all after:shadow-xs peer-checked:after:translate-x-5 peer-checked:after:border-white"></div>
                  </label>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed pt-1">
                  Remembers your language choice (English/French), VIP lounge enquiry drafts, and preserves your AI Concierge conversation context between page visits.
                </p>
              </div>

              {/* Category 3: Analytics */}
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700/80 space-y-2 shadow-2xs">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-sky-50 dark:bg-sky-950/60 border border-[#009EE0]/20 flex items-center justify-center text-[#009EE0]">
                      <Cookie className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white text-xs sm:text-[13px] block">
                        Analytics & Insights
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">
                        First-Party Aggregated Telemetry
                      </span>
                    </div>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={analytics}
                      onChange={(e) => setAnalytics(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-hidden rounded-full peer peer-checked:bg-[#204696] transition-colors duration-200 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all after:shadow-xs peer-checked:after:translate-x-5 peer-checked:after:border-white"></div>
                  </label>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed pt-1">
                  Collects anonymous operational flight traffic and page view statistics to improve platform response times and service accessibility. Never sold or shared with external ad networks.
                </p>
              </div>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={handleNavigatePolicy}
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-[#204696] dark:text-[#58C1EB] hover:underline cursor-pointer"
                >
                  <span>Read our comprehensive Privacy & Data Protection Policy</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 shrink-0 flex flex-wrap items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={handleAcceptEssential}
                className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 hover:-translate-y-0.5 active:scale-95 cursor-pointer shadow-2xs"
              >
                Essential Only
              </button>
              <button
                type="button"
                onClick={handleSaveCustom}
                className="px-5 py-2 bg-[#204696] hover:bg-[#183878] text-white text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 hover:-translate-y-0.5 active:scale-95 cursor-pointer shadow-md shadow-[#204696]/20"
              >
                Save My Preferences
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="px-5 py-2 bg-gradient-to-r from-[#204696] via-[#1a3d8c] to-[#009EE0] hover:brightness-105 active:scale-95 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
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
