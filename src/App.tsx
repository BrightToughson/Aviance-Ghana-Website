import React, { useState, useEffect } from 'react';
import { ToastProvider } from './context/ToastContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navbar } from './components/ui/Navbar';
import { Footer } from './components/ui/Footer';
import { CargoEnquiryModal } from './components/public/CargoEnquiryModal';
import { GeminiChatbot } from './components/public/GeminiChatbot';
import { CookieConsentBanner } from './components/ui/CookieConsentBanner';

// Public pages
import { HomePage } from './pages/public/HomePage';
import { ServicesIndexPage } from './pages/public/ServicesIndexPage';
import { ServiceDetailPage } from './pages/public/ServiceDetailPage';
import { OperationsPage } from './pages/public/OperationsPage';
import { CargoPage } from './pages/public/CargoPage';
import { FindMyBagPage } from './pages/public/FindMyBagPage';
import { VipLoungePage } from './pages/public/VipLoungePage';
import { AboutPage } from './pages/public/AboutPage';
import { CsrPage } from './pages/public/CsrPage';
import { ManagementPage } from './pages/public/ManagementPage';
import { CertificationsPage } from './pages/public/CertificationsPage';
import { FactsFiguresPage } from './pages/public/FactsFiguresPage';
import { CareersPage } from './pages/public/CareersPage';
import { CustomersPage } from './pages/public/CustomersPage';
import { NewsIndexPage } from './pages/public/NewsIndexPage';
import { NewsDetailPage } from './pages/public/NewsDetailPage';
import { ContactPage } from './pages/public/ContactPage';
import { LegalPages } from './pages/public/LegalPages';
import { PartnerPortalPage } from './pages/public/PartnerPortalPage';
import { DocumentCentrePage } from './pages/public/DocumentCentrePage';
import { FaqPage } from './pages/public/FaqPage';
import { TrainingPage } from './pages/public/TrainingPage';

import { dataService, subscribeToDataChanges } from './services/dataService';
import { analyticsService } from './services/analyticsService';
import { Service, LocationItem, Certification, NewsArticle, CustomerPartner } from './types';

/**
 * Normalizes any route string or window.location URL into:
 * - fullPath: Canonical URL displayed in browser address bar (e.g. '/contact#stations', '/services')
 * - cleanPath: Base route path for component view matching (e.g. '/contact', '/services')
 * - hash: Anchor hash for in-page section scrolling (e.g. '#stations')
 */
function parseUrl(url: string): { fullPath: string; cleanPath: string; hash: string } {
  if (!url) return { fullPath: '/', cleanPath: '/', hash: '' };

  const hashIndex = url.indexOf('#');
  let pathPart = hashIndex !== -1 ? url.substring(0, hashIndex) : url;
  const hashPart = hashIndex !== -1 ? url.substring(hashIndex) : '';

  const queryIndex = pathPart.indexOf('?');
  if (queryIndex !== -1) {
    pathPart = pathPart.substring(0, queryIndex);
  }

  // Ensure leading slash
  if (!pathPart.startsWith('/')) {
    pathPart = '/' + pathPart;
  }

  // Remove trailing slashes (e.g. '/services/' -> '/services')
  if (pathPart.length > 1 && pathPart.endsWith('/')) {
    pathPart = pathPart.replace(/\/+$/, '');
  }

  // Standardize canonical route aliases
  if (pathPart === '/aviance-services') pathPart = '/services';
  if (pathPart === '/occ') pathPart = '/operations';
  if (pathPart === '/baggage') pathPart = '/find-my-bag';
  if (pathPart === '/services/cargo') pathPart = '/cargo';
  if (pathPart === '/services/lounge') pathPart = '/lounge';
  if (pathPart === '/services/vip-charter') pathPart = '/vip-charter';
  if (pathPart === '/services/find-my-bag') pathPart = '/find-my-bag';
  if (pathPart === '/services/operations') pathPart = '/operations';
  if (pathPart === '/facts-and-figures' || pathPart === '/facts') pathPart = '/facts-figures';
  if (pathPart === '/management-team') pathPart = '/management';
  if (pathPart === '/certifications-licenses' || pathPart === '/licenses' || pathPart === '/accreditations') pathPart = '/certifications';
  if (pathPart === '/conduct') pathPart = '/code-of-conduct';
  if (pathPart === '/privacy' || pathPart === '/privacy-policy') pathPart = '/privacy-policy';
  if (pathPart === '/terms-of-use' || pathPart === '/terms-and-conditions' || pathPart === '/disclaimer') pathPart = '/terms';
  if (pathPart === '/services/training') pathPart = '/training';
  if (pathPart.startsWith('/post/')) pathPart = pathPart.replace('/post/', '/news/');

  const fullPath = pathPart + hashPart;
  return { fullPath, cleanPath: pathPart, hash: hashPart };
}

function MainApp() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    const { cleanPath } = parseUrl(window.location.pathname + window.location.hash);
    return cleanPath;
  });

  const [cargoModalOpen, setCargoModalOpen] = useState(false);

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const { cleanPath, hash } = parseUrl(window.location.pathname + window.location.hash);
      setCurrentPath(cleanPath);
      if (hash) {
        setTimeout(() => {
          const id = hash.replace('#', '');
          const elem = document.getElementById(id);
          if (elem) elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 60);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Initial scroll to hash if user opened direct link with anchor (e.g. /contact#stations)
  useEffect(() => {
    const { hash } = parseUrl(window.location.pathname + window.location.hash);
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const elem = document.getElementById(id);
        if (elem) elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 250);
    }
  }, []);

  // Reactive state synced with dataService
  const [services, setServices] = useState<Service[]>(() => dataService.getServices());
  const [locations, setLocations] = useState<LocationItem[]>(() => dataService.getLocations());
  const [certifications, setCertifications] = useState<Certification[]>(() => dataService.getCertifications());
  const [news, setNews] = useState<NewsArticle[]>(() => dataService.getNews());
  const [customers, setCustomers] = useState<CustomerPartner[]>(() => dataService.getCustomers());
  const [team, setTeam] = useState(() => dataService.getTeam());
  const [vacancies, setVacancies] = useState(() => dataService.getVacancies());

  useEffect(() => {
    const unsubscribe = subscribeToDataChanges(() => {
      setServices(dataService.getServices());
      setLocations(dataService.getLocations());
      setCertifications(dataService.getCertifications());
      setNews(dataService.getNews());
      setCustomers(dataService.getCustomers());
      setTeam(dataService.getTeam());
      setVacancies(dataService.getVacancies());
    });
    return unsubscribe;
  }, []);

  const navigate = (targetUrl: string) => {
    const { fullPath, cleanPath, hash } = parseUrl(targetUrl);

    // Update browser address bar unconditionally whenever URL changes
    const currentFull = window.location.pathname + window.location.hash;
    if (currentFull !== fullPath) {
      window.history.pushState(null, '', fullPath);
    }

    setCurrentPath(cleanPath);

    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const elem = document.getElementById(id);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    analyticsService.trackEvent('page_view', fullPath);
  };

  // Handle service alias routes like /passenger-services or /services/:slug
  let activeService: Service | undefined;
  if (currentPath === '/passenger-services') {
    activeService = services.find((s) => s.slug === 'passenger-services') || services[0];
  } else if (currentPath === '/ramp-handling') {
    activeService = services.find((s) => s.slug === 'ramp-handling') || services[1];
  } else if (currentPath === '/gse-fleet-maintenance') {
    activeService = services.find((s) => s.slug === 'gse-fleet-maintenance') || services[6];
  } else if (currentPath === '/vip-charter') {
    activeService = services.find((s) => s.slug === 'vip-charter') || services[3];
  } else if (currentPath === '/information-technology') {
    activeService = services.find((s) => s.slug === 'information-technology') || services[8];
  } else if (currentPath === '/quality-safety-health') {
    activeService = services.find((s) => s.slug === 'quality-safety-health') || services[9];
  } else if (currentPath.startsWith('/services/')) {
    const slug = currentPath.replace('/services/', '');
    activeService = services.find((s) => s.slug === slug);
  }

  // Handle news detail routes (supports both /news/:slug and /post/:slug)
  let activeArticle: NewsArticle | undefined;
  if (currentPath.startsWith('/news/') || currentPath.startsWith('/post/')) {
    const rawSlug = currentPath.startsWith('/news/')
      ? currentPath.replace('/news/', '')
      : currentPath.replace('/post/', '');
    const slug = decodeURIComponent(rawSlug).trim();
    activeArticle = news.find((n) => n.slug === slug || n.id === slug);
  }

  // Synchronize browser tab document.title with the active route
  useEffect(() => {
    const titles: Record<string, string> = {
      '/': 'Ground Handling & Cargo Company — Aviance Ghana',
      '/services': 'Aviation Ground Handling Services — Aviance Ghana',
      '/passenger-services': 'Passenger Services & Terminal Operations — Aviance Ghana',
      '/ramp-handling': 'Ramp Handling & Apron Turnaround — Aviance Ghana',
      '/cargo': 'Air Cargo Handling & Cold Chain Storage — Aviance Ghana',
      '/operations': 'OCC - Flight Operations & 24/7 Dispatch — Aviance Ghana',
      '/find-my-bag': 'Find My Bag & Baggage Tracing — Aviance Ghana',
      '/lounge': 'Adinkra & The U Lounge Hospitality — Aviance Ghana',
      '/vip-charter': 'VIP & Charter Aircraft Services — Aviance Ghana',
      '/gse-fleet-maintenance': 'GSE Fleet Maintenance & Engineering — Aviance Ghana',
      '/about': 'About Aviance Ghana — Heritage & Excellence Since 1994',
      '/facts-figures': 'Facts & Figures 2025 — Aviance Ghana',
      '/csr': 'Corporate Social Responsibility — Aviance Ghana',
      '/management': 'Executive Leadership & Board — Aviance Ghana',
      '/certifications': 'Safety & ISAGO Certifications — Aviance Ghana',
      '/careers': 'Aviation Careers — Aviance Ghana',
      '/customers': 'Airlines & Strategic Partners — Aviance Ghana',
      '/news': 'News | Aviance Ghana',
      '/contact': 'Station Offices & 24/7 Operations Contact — Aviance Ghana',
      '/partner-portal': 'Airline Partner Operations Portal — Aviance Ghana',
      '/documents': 'Digital Document Centre — Aviance Ghana',
      '/faqs': 'Frequently Asked Questions (FAQs) — Aviance Ghana',
      '/code-of-conduct': 'Corporate Code of Conduct — Aviance Ghana',
      '/privacy-policy': 'Privacy Policy — Aviance Ghana',
      '/terms': 'Terms of Use — Aviance Ghana',
      '/training': 'Training & Room Hire — Aviance Ghana',
    };

    if (activeService) {
      document.title = `${activeService.title} — Aviance Ghana`;
    } else if (activeArticle) {
      document.title = `${activeArticle.title} | Aviance Ghana`;
    } else if (titles[currentPath]) {
      document.title = titles[currentPath];
    } else {
      document.title = 'Aviance Ghana Limited';
    }
  }, [currentPath, activeService, activeArticle]);

  const isKnownRoute =
    currentPath === '/' ||
    currentPath === '/services' ||
    Boolean(activeService) ||
    currentPath === '/operations' ||
    currentPath === '/cargo' ||
    currentPath === '/find-my-bag' ||
    currentPath === '/lounge' ||
    currentPath === '/vip-charter' ||
    currentPath === '/training' ||
    currentPath === '/about' ||
    currentPath === '/facts-figures' ||
    currentPath === '/csr' ||
    currentPath === '/management' ||
    currentPath === '/certifications' ||
    currentPath === '/careers' ||
    currentPath === '/customers' ||
    currentPath === '/news' ||
    Boolean(activeArticle) ||
    currentPath.startsWith('/news/') ||
    currentPath.startsWith('/post/') ||
    currentPath === '/contact' ||
    currentPath === '/partner-portal' ||
    currentPath === '/documents' ||
    currentPath === '/faqs' ||
    currentPath === '/code-of-conduct' ||
    currentPath === '/privacy-policy' ||
    currentPath === '/terms';

  const { isLight } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col font-sans selection:bg-[#204696] selection:text-white transition-colors duration-200 ${
      isLight
        ? 'bg-white text-slate-800'
        : 'bg-[#F8FAFC] text-slate-900'
    }`}>
      {/* Top Navbar */}
      <Navbar
        currentPath={currentPath}
        onNavigate={navigate}
      />

      {/* Main View Body */}
      <main className="flex-1">
        {currentPath === '/' && (
          <HomePage
            services={services}
            locations={locations}
            certifications={certifications}
            news={news}
            customers={customers}
            onNavigate={navigate}
            onOpenCargoModal={() => setCargoModalOpen(true)}
          />
        )}

        {(currentPath === '/services' || currentPath === '/aviance-services') && (
          <ServicesIndexPage
            services={services}
            onNavigate={navigate}
            onOpenCargoModal={() => setCargoModalOpen(true)}
          />
        )}

        {activeService && (
          <ServiceDetailPage
            service={activeService}
            allServices={services}
            onNavigate={navigate}
            onOpenCargoModal={() => setCargoModalOpen(true)}
          />
        )}

        {(currentPath === '/operations' || currentPath === '/occ') && (
          <OperationsPage
            locations={locations}
            onNavigate={navigate}
            onOpenCargoModal={() => setCargoModalOpen(true)}
          />
        )}

        {currentPath === '/cargo' && (
          <CargoPage
            onNavigate={navigate}
            onOpenCargoModal={() => setCargoModalOpen(true)}
          />
        )}

        {currentPath === '/find-my-bag' && (
          <FindMyBagPage onNavigate={navigate} />
        )}

        {currentPath === '/lounge' && (
          <VipLoungePage
            onNavigate={navigate}
          />
        )}

        {currentPath === '/baggage' && (
          <FindMyBagPage onNavigate={navigate} />
        )}

        {currentPath === '/training' && (
          <TrainingPage onNavigate={navigate} />
        )}

        {currentPath === '/about' && (
          <AboutPage onNavigate={navigate} />
        )}

        {currentPath === '/facts-figures' && (
          <FactsFiguresPage onNavigate={navigate} />
        )}

        {currentPath === '/csr' && (
          <CsrPage onNavigate={navigate} />
        )}

        {currentPath === '/management' && (
          <ManagementPage team={team} onNavigate={navigate} />
        )}

        {currentPath === '/certifications' && (
          <CertificationsPage certifications={certifications} onNavigate={navigate} />
        )}

        {currentPath === '/careers' && (
          <CareersPage vacancies={vacancies} onNavigate={navigate} />
        )}

        {currentPath === '/customers' && (
          <CustomersPage customers={customers} onNavigate={navigate} />
        )}

        {currentPath === '/news' && (
          <NewsIndexPage news={news} onNavigate={navigate} />
        )}

        {activeArticle && (
          <NewsDetailPage article={activeArticle} allNews={news} onNavigate={navigate} />
        )}

        {!activeArticle && (currentPath.startsWith('/news/') || currentPath.startsWith('/post/')) && (
          <div className="min-h-[50vh] flex flex-col items-center justify-center py-20 px-4 text-center space-y-4">
            <h2 className="text-2xl font-bold text-slate-800">Article Not Found</h2>
            <p className="text-sm text-slate-600 max-w-md">
              The requested news release could not be located. Explore our latest official announcements and updates.
            </p>
            <button
              onClick={() => navigate('/news')}
              className="px-5 py-2.5 rounded-xl bg-[#204696] hover:bg-[#153170] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              Back to News Center
            </button>
          </div>
        )}

        {currentPath === '/contact' && (
          <ContactPage onNavigate={navigate} />
        )}

        {currentPath === '/partner-portal' && (
          <PartnerPortalPage onNavigate={navigate} />
        )}

        {currentPath === '/documents' && (
          <DocumentCentrePage onNavigate={navigate} />
        )}

        {currentPath === '/faqs' && (
          <FaqPage onNavigate={navigate} />
        )}

        {currentPath === '/code-of-conduct' && (
          <LegalPages type="conduct" onNavigate={navigate} />
        )}

        {currentPath === '/privacy-policy' && (
          <LegalPages type="privacy" onNavigate={navigate} />
        )}

        {currentPath === '/terms' && (
          <LegalPages type="terms" onNavigate={navigate} />
        )}

        {!isKnownRoute && (
          <div className="min-h-[60vh] flex items-center justify-center py-20 px-4 text-center">
            <div className="max-w-md mx-auto space-y-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-blue-50 border border-blue-200 text-[#204696] font-mono text-3xl font-extrabold shadow-sm">
                404
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-extrabold text-slate-900">Page Not Found</h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  The requested flight path <span className="font-mono text-[#204696] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{currentPath}</span> was not found on our operational radar.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => navigate('/')}
                  className="px-5 py-2.5 rounded-xl bg-[#204696] hover:bg-[#153170] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  Return to Home
                </button>
                <button
                  onClick={() => navigate('/services')}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-bold transition-all cursor-pointer"
                >
                  View Services
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={navigate} />

      {/* Modals */}
      <CargoEnquiryModal
        isOpen={cargoModalOpen}
        onClose={() => setCargoModalOpen(false)}
      />

      {/* Aviance AI Ground Concierge Chatbot */}
      <GeminiChatbot />

      {/* Cookie & Data Privacy Consent Banner & Preferences Modal */}
      <CookieConsentBanner onNavigate={navigate} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ToastProvider>
          <MainApp />
        </ToastProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
