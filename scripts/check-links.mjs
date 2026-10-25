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
const rawMarkdown = [];
for (const file of htmlFiles(DIST)) {
  if (file.endsWith('404.html')) continue; // uses absolute links on purpose
  const html = readFileSync(file, 'utf8');
  // Markdown the lesson parser did not understand shows up as raw text, e.g. a table row.
  if (/<p>\s*\|/.test(html)) rawMarkdown.push(relative(DIST, file));
  // Inline tags such as <sub> must render as tags, not as escaped text (outside code blocks).
  if (/&lt;\/?(?:sub|sup)&gt;/.test(html.replace(/<pre[\s\S]*?<\/pre>|<code>[\s\S]*?<\/code>/g, ''))) rawMarkdown.push(relative(DIST, file) + ' (escaped <sub>/<sup>)');
  for (const [, url] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(?:[a-z]+:|#|\/\/)/i.test(url)) continue;
    const path = url.replace(/&amp;/g, '&').split('#')[0].split('?')[0];
    if (!path) continue;
    checked++;
    if (!existsSync(join(dirname(file), path))) broken.push(`${relative(DIST, file)} -> ${url}`);
  }
}

if (rawMarkdown.length) {
  console.error(`Unrendered Markdown (a line starting with "|", or escaped inline tags) in:\n  ` + rawMarkdown.join('\n  '));
  process.exit(1);
}
if (broken.length) {
  console.error(`Broken links (${broken.length}):\n  ` + broken.join('\n  '));
  process.exit(1);
}
console.log(`All ${checked} internal links OK`);
