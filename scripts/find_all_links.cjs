const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.resolve(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      if (!file.includes('node_modules') && !file.includes('.git') && !file.includes('dist')) {
        results = results.concat(walk(file));
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('./src');
const serviceLinks = new Set();
const allLinks = new Set();

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const matches = content.matchAll(/(?:navigate|href|to|onNavigate)\s*(?:\(|\=)\s*['"]([^'"]+)['"]/g);
  for (const m of matches) {
    const link = m[1];
    if (link.startsWith('/') && !link.startsWith('//') && !link.startsWith('/assets')) {
      allLinks.add(link);
      if (link.includes('service') || link.includes('ramp') || link.includes('passenger') || link.includes('cargo') || link.includes('lounge') || link.includes('vip') || link.includes('gse') || link.includes('operations') || link.includes('bag') || link.includes('training') || link.includes('safety') || link.includes('quality') || link.includes('security') || link.includes('it')) {
        serviceLinks.add(link);
      }
    }
  }
});

console.log('ALL SERVICE-RELATED LINKS:');
Array.from(serviceLinks).sort().forEach(l => console.log('  ', l));

console.log('\nALL INTERNAL LINKS:');
Array.from(allLinks).sort().forEach(l => console.log('  ', l));
