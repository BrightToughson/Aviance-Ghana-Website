const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Add new page imports
const targetImport = "import { TrainingPage } from './pages/public/TrainingPage';";
const replacementImport = `import { TrainingPage } from './pages/public/TrainingPage';
import { PassengerServicesPage } from './pages/public/PassengerServicesPage';
import { RampHandlingPage } from './pages/public/RampHandlingPage';
import { VipCharterPage } from './pages/public/VipCharterPage';
import { GseMaintenancePage } from './pages/public/GseMaintenancePage';
import { QhseSafetyPage } from './pages/public/QhseSafetyPage';
import { AviationItPage } from './pages/public/AviationItPage';`;

content = content.replace(targetImport, replacementImport);

// 2. Update parseUrl route normalization
const parseUrlTarget = `  // Standardize canonical route aliases
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
  if (pathPart.startsWith('/post/')) pathPart = pathPart.replace('/post/', '/news/');`;

const parseUrlReplacement = `  // Standardize canonical route aliases
  if (pathPart === '/aviance-services') pathPart = '/services';
  if (pathPart === '/occ' || pathPart === '/services/operations') pathPart = '/operations';
  if (pathPart === '/baggage' || pathPart === '/services/baggage' || pathPart === '/services/find-my-bag') pathPart = '/find-my-bag';
  if (pathPart === '/services/cargo') pathPart = '/cargo';
  if (pathPart === '/services/lounge') pathPart = '/lounge';
  if (pathPart === '/services/vip-charter' || pathPart === '/services/vip' || pathPart === '/vip') pathPart = '/vip-charter';
  if (pathPart === '/services/passenger-services' || pathPart === '/services/passenger' || pathPart === '/passenger') pathPart = '/passenger-services';
  if (pathPart === '/services/ramp-handling' || pathPart === '/services/ramp' || pathPart === '/ramp') pathPart = '/ramp-handling';
  if (pathPart === '/services/gse-fleet-maintenance' || pathPart === '/services/gse' || pathPart === '/gse') pathPart = '/gse-fleet-maintenance';
  if (pathPart === '/services/training') pathPart = '/training';
  if (pathPart === '/services/quality-safety-health' || pathPart === '/safety' || pathPart === '/security' || pathPart === '/qhse') pathPart = '/quality-safety-health';
  if (pathPart === '/services/information-technology' || pathPart === '/it' || pathPart === '/aviation-it') pathPart = '/information-technology';
  if (pathPart === '/facts-and-figures' || pathPart === '/facts') pathPart = '/facts-figures';
  if (pathPart === '/management-team') pathPart = '/management';
  if (pathPart === '/certifications-licenses' || pathPart === '/licenses' || pathPart === '/accreditations') pathPart = '/certifications';
  if (pathPart === '/conduct') pathPart = '/code-of-conduct';
  if (pathPart === '/privacy' || pathPart === '/privacy-policy') pathPart = '/privacy-policy';
  if (pathPart === '/terms-of-use' || pathPart === '/terms-and-conditions' || pathPart === '/disclaimer') pathPart = '/terms';
  if (pathPart.startsWith('/post/')) pathPart = pathPart.replace('/post/', '/news/');`;

content = content.replace(parseUrlTarget, parseUrlReplacement);

// 3. Update activeService logic
const activeServiceTarget = `  // Handle service alias routes like /passenger-services or /services/:slug
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
  }`;

const activeServiceReplacement = `  // Handle service alias routes for dynamic /services/:slug
  let activeService: Service | undefined;
  if (currentPath.startsWith('/services/')) {
    const slug = currentPath.replace('/services/', '');
    activeService = services.find((s) => s.slug === slug);
  }`;

content = content.replace(activeServiceTarget, activeServiceReplacement);

// 4. Update titles map
const titlesTarget = `      '/terms': 'Terms of Use — Aviance Ghana',
      '/training': 'Training & Room Hire — Aviance Ghana',
    };`;

const titlesReplacement = `      '/terms': 'Terms of Use — Aviance Ghana',
      '/training': 'Training & Room Hire — Aviance Ghana',
      '/quality-safety-health': 'Quality, Safety, Health & Environment (QHSE) — Aviance Ghana',
      '/information-technology': 'Aviation IT & Digital Systems — Aviance Ghana',
    };`;

content = content.replace(titlesTarget, titlesReplacement);

// 5. Update isKnownRoute
const isKnownTarget = `  const isKnownRoute =
    currentPath === '/' ||
    currentPath === '/services' ||
    Boolean(activeService) ||
    currentPath === '/operations' ||
    currentPath === '/cargo' ||
    currentPath === '/find-my-bag' ||
    currentPath === '/lounge' ||
    currentPath === '/vip-charter' ||
    currentPath === '/training' ||`;

const isKnownReplacement = `  const isKnownRoute =
    currentPath === '/' ||
    currentPath === '/services' ||
    currentPath === '/passenger-services' ||
    currentPath === '/ramp-handling' ||
    currentPath === '/cargo' ||
    currentPath === '/vip-charter' ||
    currentPath === '/lounge' ||
    currentPath === '/find-my-bag' ||
    currentPath === '/operations' ||
    currentPath === '/gse-fleet-maintenance' ||
    currentPath === '/training' ||
    currentPath === '/quality-safety-health' ||
    currentPath === '/information-technology' ||
    Boolean(activeService) ||`;

content = content.replace(isKnownTarget, isKnownReplacement);

// 6. Update main route rendering
const renderTarget = `        {activeService && (
          <ServiceDetailPage
            service={activeService}
            allServices={services}
            onNavigate={navigate}
            onOpenCargoModal={() => setCargoModalOpen(true)}
          />
        )}`;

const renderReplacement = `        {currentPath === '/passenger-services' && (
          <PassengerServicesPage
            onNavigate={navigate}
            onOpenCargoModal={() => setCargoModalOpen(true)}
          />
        )}

        {currentPath === '/ramp-handling' && (
          <RampHandlingPage
            onNavigate={navigate}
            onOpenCargoModal={() => setCargoModalOpen(true)}
          />
        )}

        {currentPath === '/vip-charter' && (
          <VipCharterPage
            onNavigate={navigate}
            onOpenCargoModal={() => setCargoModalOpen(true)}
          />
        )}

        {currentPath === '/gse-fleet-maintenance' && (
          <GseMaintenancePage
            onNavigate={navigate}
            onOpenCargoModal={() => setCargoModalOpen(true)}
          />
        )}

        {currentPath === '/quality-safety-health' && (
          <QhseSafetyPage
            onNavigate={navigate}
            onOpenCargoModal={() => setCargoModalOpen(true)}
          />
        )}

        {currentPath === '/information-technology' && (
          <AviationItPage
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
        )}`;

content = content.replace(renderTarget, renderReplacement);

fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log('App.tsx successfully updated with all dedicated service routes!');
