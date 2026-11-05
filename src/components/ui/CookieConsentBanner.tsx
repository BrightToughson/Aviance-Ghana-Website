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

  // Only lock body scroll when the full customization modal is explicitly open
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
      {/* Sleek Floating Toast Card (Non-blocking, Executive Aviation Grade) */}
      {isVisible && !isModalOpen && (
        <aside
          role="region"
          aria-label="Privacy and Cookie Consent"
          className="fixed bottom-3 left-3 right-3 sm:bottom-6 sm:right-6 sm:left-auto sm:max-w-[440px] z-[950] animate-in fade-in slide-in-from-bottom-6 duration-500"
        >
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 shadow-[0_20px_50px_rgba(15,46,83,0.18)] transition-all">
            {/* Top Brand Tri-Color Accent Line */}
            <div className="h-1 w-full bg-gradient-to-r from-[#204696] via-[#009EE0] to-[#72BF44]" />

            <div className="p-4 sm:p-5">
              {/* Header Section */}
              <div className="flex items-start justify-between gap-3 mb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-[#204696]/20 flex items-center justify-center shrink-0 text-[#204696] dark:text-[#58C1EB] shadow-xs">
                    <Cookie className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                      Cookie & Privacy Choices
                    </h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[10px] font-mono font-semibold text-[#204696] dark:text-[#58C1EB] bg-blue-50 dark:bg-blue-950/50 border border-[#204696]/20 px-1.5 py-0.5 rounded-md">
                        Ghana Act 843
                      </span>
                      <span className="text-[10px] font-mono font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300/30 px-1.5 py-0.5 rounded-md">
                        ISAGO Compliant
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAcceptEssential}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Dismiss with essential cookies only"
                  aria-label="Dismiss banner"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Concise, Professional Copy */}
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                We use essential cookies to maintain secure flight and cargo operations, and optional cookies to deliver an elevated digital experience. Under the <strong className="font-semibold text-slate-800 dark:text-slate-100">Ghana Data Protection Act</strong>, you have full control.
              </p>

              {/* Action Buttons Cluster */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="text-xs font-semibold text-[#204696] dark:text-[#58C1EB] hover:text-[#009EE0] flex items-center justify-center sm:justify-start gap-1.5 py-2 px-2.5 rounded-xl hover:bg-blue-50/70 dark:hover:bg-blue-950/40 transition-colors cursor-pointer"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Customize</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleAcceptEssential}
                    className="flex-1 sm:flex-none px-3.5 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl transition-all cursor-pointer text-center"
                  >
                    Essential Only
                  </button>
                  <button
                    type="button"
                    onClick={handleAcceptAll}
                    className="flex-1 sm:flex-none px-4 py-2 bg-gradient-to-r from-[#204696] via-[#1a3d8c] to-[#009EE0] hover:brightness-105 active:scale-[0.98] text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer text-center"
                  >
                    Accept All
                  </button>
                </div>
              </div>

              {/* Policy Link */}
              <div className="mt-2.5 text-center sm:text-left">
                <button
                  type="button"
                  onClick={handleNavigatePolicy}
                  className="text-[11px] text-slate-400 hover:text-[#204696] dark:hover:text-[#58C1EB] underline underline-offset-2 transition-colors cursor-pointer inline-flex items-center gap-1"
                >
                  <span>Read Aviance Ghana's Data Protection Policy</span>
                  <ChevronRight className="w-3 h-3" />
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
                className="px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Essential Only
              </button>
              <button
                type="button"
                onClick={handleSaveCustom}
                className="px-4 py-2 bg-[#204696] hover:bg-[#183878] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-xs"
              >
                Save My Preferences
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="px-4 py-2 bg-gradient-to-r from-[#204696] via-[#1a3d8c] to-[#009EE0] hover:brightness-105 active:scale-[0.98] text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
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
