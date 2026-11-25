const http = require('http');

const routes = [
  '/',
  '/services',
  '/passenger-services',
  '/ramp-handling',
  '/cargo',
  '/vip-charter',
  '/lounge',
  '/find-my-bag',
  '/operations',
  '/gse-fleet-maintenance',
  '/training',
  '/quality-safety-health',
  '/information-technology',
  '/about',
  '/facts-figures',
  '/csr',
  '/management',
  '/certifications',
  '/careers',
  '/customers',
  '/news',
  '/contact',
  '/partner-portal',
  '/documents',
  '/faqs',
  '/code-of-conduct',
  '/privacy-policy',
  '/terms',
  '/services/passenger-services',
  '/services/ramp-handling',
  '/services/vip-charter',
  '/services/gse-fleet-maintenance',
  '/services/cargo',
  '/services/lounge',
  '/services/baggage',
  '/services/operations',
  '/services/training',
  '/services/quality-safety-health',
  '/services/information-technology'
];

async function checkRoute(r) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3000${r}`, (res) => {
      resolve({ route: r, statusCode: res.statusCode });
    }).on('error', (err) => {
      resolve({ route: r, error: err.message });
    });
  });
}

async function run() {
  console.log(`Checking ${routes.length} routes...`);
  let passed = 0;
  for (const r of routes) {
    const res = await checkRoute(r);
    if (res.statusCode === 200) {
      passed++;
      console.log(`[PASS 200] ${r}`);
    } else {
      console.log(`[FAIL ${res.statusCode || res.error}] ${r}`);
    }
  }
  console.log(`\nResult: ${passed}/${routes.length} routes passed.`);
}

run();
