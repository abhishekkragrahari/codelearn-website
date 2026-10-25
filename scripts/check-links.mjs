// Checks that every relative href/src in dist/ points at a file that exists.
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');

function* htmlFiles(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* htmlFiles(p);
    else if (p.endsWith('.html')) yield p;
  }
}

let checked = 0;
const broken = [];
for (const file of htmlFiles(DIST)) {
  if (file.endsWith('404.html')) continue; // uses absolute links on purpose
  const html = readFileSync(file, 'utf8');
  for (const [, url] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(?:[a-z]+:|#|\/\/)/i.test(url)) continue;
    const path = url.replace(/&amp;/g, '&').split('#')[0].split('?')[0];
    if (!path) continue;
    checked++;
    if (!existsSync(join(dirname(file), path))) broken.push(`${relative(DIST, file)} -> ${url}`);
  }
}

if (broken.length) {
  console.error(`Broken links (${broken.length}):\n  ` + broken.join('\n  '));
  process.exit(1);
}
console.log(`All ${checked} internal links OK`);
