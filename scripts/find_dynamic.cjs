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
const dynamicLinks = [];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (line.includes('navigate(') || line.includes('onNavigate(') || line.includes('href={`') || line.includes('href={')) {
      dynamicLinks.push({ file: path.relative('.', f), line: idx + 1, text: line.trim() });
    }
  });
});

console.log('DYNAMIC / TEMPLATE NAVIGATION CALLS:');
dynamicLinks.forEach(d => console.log(`${d.file}:${d.line}: ${d.text}`));
