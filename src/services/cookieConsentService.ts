export interface CookiePreferences {
  necessary: boolean;  // Always true: security, session, basic functionality
  functional: boolean; // Retaining language choice, chatbot context
  analytics: boolean;  // First-party anonymized traffic telemetry
  timestamp: string;
  version: string;
}

const STORAGE_KEY = 'aviance_cookie_consent_v1';
const CONSENT_VERSION = '1.0';

type Listener = (prefs: CookiePreferences) => void;
const listeners = new Set<Listener>();

export const cookieConsentService = {
  getPreferences(): CookiePreferences | null {
    if (typeof window === 'undefined') return null;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed.necessary === 'boolean') {
        return parsed as CookiePreferences;
      }
    } catch {}
    return null;
  },

  hasConsent(): boolean {
    return this.getPreferences() !== null;
  },

  isAnalyticsAllowed(): boolean {
    const prefs = this.getPreferences();
    return prefs ? prefs.analytics === true : false;
  },

  isFunctionalAllowed(): boolean {
    const prefs = this.getPreferences();
    return prefs ? prefs.functional === true : false;
  },

  savePreferences(prefs: { functional: boolean; analytics: boolean }): CookiePreferences {
    const consent: CookiePreferences = {
      necessary: true,
      functional: prefs.functional,
      analytics: prefs.analytics,
      timestamp: new Date().toISOString(),
      version: CONSENT_VERSION,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
      listeners.forEach((fn) => fn(consent));
    } catch {}
    return consent;
  },

  acceptAll(): CookiePreferences {
    return this.savePreferences({ functional: true, analytics: true });
  },

  acceptEssentialOnly(): CookiePreferences {
    return this.savePreferences({ functional: false, analytics: false });
  },

  openPreferencesModal(): void {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('aviance:open-cookie-preferences'));
    }
  },

  subscribe(listener: Listener): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};
