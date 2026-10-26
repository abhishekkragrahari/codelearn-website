import { site, languages, tracks } from './site.mjs';
import { escapeHtml, highlight } from './highlight.mjs';

export const logoSvg = (size = 32) => `<svg class="logo-mark" width="${size}" height="${size}" viewBox="0 0 32 32" aria-hidden="true">
  <rect width="32" height="32" rx="9" fill="url(#lg)"/>
  <defs><linearGradient id="lg" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse"><stop stop-color="#0d9488"/><stop offset="1" stop-color="#4f46e5"/></linearGradient></defs>
  <path d="M12 10l-5 6 5 6M20 10l5 6-5 6" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="16" cy="16" r="2.2" fill="#fde68a"/>
</svg>`;

// Line icons (24px grid, drawn with currentColor) used across the site instead of emoji.
const ICON_PATHS = {
  sun: '<circle cx="12" cy="12" r="4.5"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"/>',
  moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  play: '<path d="M7 4.5v15l12.5-7.5z" fill="currentColor"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  code: '<path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/>',
  book: '<path d="M2.5 5.5C5 4.5 8.5 4.5 12 6.5c3.5-2 7-2 9.5-1v13c-2.5-1-6-1-9.5 1-3.5-2-7-2-9.5-1z"/><path d="M12 6.5v13"/>',
  bolt: '<path d="M13 2L4.5 13.5H11L10 22l8.5-11.5H12z" fill="currentColor" stroke="none"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"/><circle cx="17" cy="9" r="2.8"/><path d="M17 14c2.8 0 4.5 2 4.5 5"/>',
  copy: '<rect x="8" y="8" width="12" height="12" rx="2.5"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
  reset: '<path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1"/><path d="M3.5 4v5h5"/>',
  terminal: '<rect x="2.5" y="4" width="19" height="16" rx="3"/><path d="M7 9.5l3 2.5-3 2.5M12.5 15h4.5"/>',
  trash: '<path d="M4 7h16M9.5 7V4.5h5V7M6 7l1 13h10l1-13M10 11v5M14 11v5"/>',
  file: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>',
  keyboard: '<rect x="2.5" y="6" width="19" height="12" rx="2.5"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  layers: '<path d="M12 3l9.5 5L12 13 2.5 8z"/><path d="M2.5 12.5L12 17.5l9.5-5M2.5 16.5L12 21.5l9.5-5"/>',
  chart: '<path d="M5 20V13M10 20V7M15 20v-9M20 20V4" stroke-width="3"/>',
  sparkle: '<path d="M12 2.5c.8 5 2.5 6.7 7.5 7.5-5 .8-6.7 2.5-7.5 7.5-.8-5-2.5-6.7-7.5-7.5 5-.8 6.7-2.5 7.5-7.5z" fill="currentColor" stroke="none"/><path d="M19 15.5c.3 2 1 2.7 3 3-2 .3-2.7 1-3 3-.3-2-1-2.7-3-3 2-.3 2.7-1 3-3z" fill="currentColor" stroke="none"/>',
  graph: '<circle cx="12" cy="5" r="2.5"/><circle cx="5" cy="18" r="2.5"/><circle cx="19" cy="18" r="2.5"/><path d="M10.8 7.2L6.2 15.8M13.2 7.2l4.6 8.6M7.5 18h9"/>',
  cap: '<path d="M12 4L1.5 9 12 14l10.5-5z" fill="currentColor" stroke="none"/><path d="M5.5 11.2V16c0 1.8 3 3.5 6.5 3.5s6.5-1.7 6.5-3.5v-4.8M21 9.5V15"/>',
  chevron: '<path d="M6 9l6 6 6-6"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  list: '<path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01"/>',
};

export function icon(name, size = 18, cls = '') {
  return `<svg class="icon${cls ? ' ' + cls : ''}" viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON_PATHS[name]}</svg>`;
}

const icons = { sun: icon('sun'), moon: icon('moon'), menu: icon('menu', 22) };

// Full-colour logos for each language; other tracks fall back to an icon or their short letters.
const LOGOS = {
  python: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M15.9 3C9.4 3 9.8 5.8 9.8 5.8v2.9h6.2v.9H7.3S3 9.1 3 15.8s3.8 6.5 3.8 6.5h2.2v-3.1s-.1-3.8 3.7-3.8h6.3s3.6.1 3.6-3.5V6.6S23.2 3 15.9 3zm-3.5 2.1a1.1 1.1 0 1 1 0 2.3 1.1 1.1 0 0 1 0-2.3z" fill="#3776ab"/><path d="M16.1 29c6.5 0 6.1-2.8 6.1-2.8v-2.9H16v-.9h8.7s4.3.5 4.3-6.2-3.8-6.5-3.8-6.5H23v3.1s.1 3.8-3.7 3.8H13s-3.6-.1-3.6 3.5v5.3S8.8 29 16.1 29zm3.5-2.1a1.1 1.1 0 1 1 0-2.3 1.1 1.1 0 0 1 0 2.3z" fill="#ffd43b"/></svg>',
  c: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 2.5l11.7 6.75v13.5L16 29.5 4.3 22.75V9.25z" fill="#3a5fcd"/><path d="M16 2.5l11.7 6.75L16 16z" fill="#5c7fe6"/><path d="M20.6 12.2A5.6 5.6 0 1 0 20.6 19.8" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round"/></svg>',
  java: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M17 3c1.8 3.2-3.6 4.8-2 8.2.5 1.1 1.6 1.8 1.6 1.8s-.3-1 .1-2c.8-2 4.2-3.3 2.3-6.9-.4 1.6-1.2 2.3-2 3 .4-1.4.6-2.6 0-4.1z" fill="#e76f00"/><path d="M8 18.5h15v4.5a5 5 0 0 1-5 5h-5a5 5 0 0 1-5-5z" fill="#5382a1"/><path d="M23 19.5h1.5a2.5 2.5 0 0 1 0 5H22.5" fill="none" stroke="#5382a1" stroke-width="1.8"/><path d="M5 29.5h21" stroke="#5382a1" stroke-width="1.8" stroke-linecap="round"/></svg>',
  javascript: '<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="2" y="2" width="28" height="28" rx="6" fill="#f7df1e"/><path d="M10.6 23.6l2-1.2c.4.7.7 1.2 1.5 1.2s1.3-.3 1.3-1.5v-8h2.5v8.1c0 2.5-1.4 3.6-3.6 3.6-1.9 0-3-1-3.7-2.2zM19.3 23.3l2-1.2c.5.9 1.2 1.5 2.4 1.5 1 0 1.6-.5 1.6-1.2 0-.8-.7-1.1-1.8-1.6l-.6-.3c-1.8-.8-3-1.700-3-3.7 0-1.8 1.4-3.2 3.6-3.2 1.5 0 2.6.5 3.4 1.9l-1.9 1.2c-.4-.7-.9-1-1.5-1-.7 0-1.1.4-1.1 1 0 .7.4 1 1.5 1.5l.6.3c2.1.9 3.300 1.8 3.3 3.9 0 2.2-1.7 3.4-4.1 3.4-2.3 0-3.8-1.1-4.5-2.5z" fill="#1c1c1c"/></svg>',
};

// A rounded tile holding a language logo (or a track icon), tinted with the track colour.
export function langLogo(t, size = 'lg', iconName) {
  const inner = LOGOS[t.id] || (iconName ? icon(iconName, size === 'sm' ? 16 : 26) : `<b>${t.short}</b>`);
  return `<span class="logo-tile ${size}" style="--badge:${t.color}">${inner}</span>`;
}

export const langById = Object.fromEntries(languages.map((l) => [l.id, l]));

export const trackTitle = (t) => (t.topic ? t.name : `${t.name} Tutorial`);

export function langBadge(lang, size = '') {
  return `<span class="lang-badge ${size}" style="--badge:${lang.color}">${lang.short}</span>`;
}

// Builds a playground link that pre-loads a piece of code (and its expected output).
export function playgroundHref(root, lang, code, output) {
  const params = new URLSearchParams({ lang, code });
  if (output != null) params.set('output', output);
  return `${root}playground.html#${params.toString()}`;
}

export function codeBlock(block, root) {
  const lang = langById[block.lang];
  const label = lang ? lang.name : ({ sql: 'SQL' }[block.lang] ?? block.lang);
  const runnable = lang && lang.runnable;
  const actions = [
    `<button type="button" class="code-btn" data-copy>${icon('copy', 14)}Copy</button>`,
    runnable ? `<button type="button" class="code-btn code-btn-run" data-run>${icon('play', 13)}Run</button>` : '',
    lang ? `<a class="code-btn" href="${escapeHtml(playgroundHref(root, block.lang, block.code, block.output))}">${icon('code', 14)}Open in playground</a>` : '',
  ].join('');
  const output =
    block.output != null || runnable
      ? `<div class="code-output"${block.output == null ? ' hidden' : ''}>
  <div class="code-output-head">Output</div>
  <pre class="code-output-body">${escapeHtml(block.output ?? '')}</pre>
</div>`
      : '';
  return `<figure class="code-block" data-lang="${escapeHtml(block.lang)}">
<div class="code-head"><span class="code-lang">${escapeHtml(label)}</span><div class="code-actions">${actions}</div></div>
<pre class="code-body"><code>${highlight(block.code, block.lang)}</code></pre>
${output}
</figure>`;
}

export function layout({ title, description = site.description, root, body, active = '', bodyClass = '', scripts = [] }) {
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} - ${site.tagline}`;
  // The top bar lists the languages, topics marked `nav`, and one link to the GATE hub.
  const gateActive = active === 'gate' || tracks.some((t) => t.id === active && t.gate && !t.nav);
  const nav =
    tracks
      .filter((l) => !l.topic || l.nav)
      .map((l) => `<a href="${root}${l.id}/index.html"${active === l.id ? ' aria-current="page"' : ''}>${l.topic ? 'DSA' : l.name}</a>`)
      .join('') + `<a href="${root}gate.html"${gateActive ? ' aria-current="page"' : ''}>GATE CS</a>`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(fullTitle)}</title>
<meta name="description" content="${escapeHtml(description)}">
<link rel="icon" href="${root}assets/img/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&family=Caveat:wght@500;600&display=swap">
<link rel="stylesheet" href="${root}assets/css/style.css">
<script>try{var t=localStorage.getItem('cs-theme');if(t)document.documentElement.setAttribute('data-theme',t)}catch(e){}</script>
</head>
<body class="${bodyClass}">
<div class="bg-blobs" aria-hidden="true"><span></span><span></span><span></span><span></span></div>
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header">
  <div class="header-inner">
    <a class="brand" href="${root}index.html">${logoSvg()}<span>${site.name}</span></a>
    <nav class="main-nav" id="main-nav" aria-label="Main">
      ${nav}
      <a href="${root}playground.html"${active === 'playground' ? ' aria-current="page"' : ''} class="nav-playground">Playground</a>
    </nav>
    <div class="header-tools">
      <a class="btn btn-primary btn-sm header-cta" href="${root}playground.html">${icon('play', 14)}Playground</a>
      <button type="button" class="icon-btn" data-theme-toggle aria-label="Toggle dark mode" title="Toggle dark mode">
        <span class="icon-sun">${icons.sun}</span><span class="icon-moon">${icons.moon}</span>
      </button>
      <button type="button" class="icon-btn menu-btn" data-menu-toggle aria-controls="main-nav" aria-expanded="false" aria-label="Open menu">${icons.menu}</button>
    </div>
  </div>
</header>
<main id="main">
${body}
</main>
<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-brand">${logoSvg(24)}<span>${site.name}</span></div>
    <p class="footer-tag">${escapeHtml(site.tagline)} All lessons are free to read.</p>
    <nav aria-label="Footer">${nav}<a href="${root}playground.html">Playground</a></nav>
  </div>
</footer>
<script src="${root}assets/js/app.js"></script>
${scripts.map((s) => `<script src="${root}assets/js/${s}"></script>`).join('\n')}
</body>
</html>
`;
}

export function sidebar(lang, lessons, current, root) {
  const chapters = groupByChapter(lessons);
  return `<aside class="sidebar" id="sidebar" aria-label="${lang.name} topics">
  <div class="sidebar-head">${langLogo(lang, 'sm')}<a href="${root}${lang.id}/index.html">${trackTitle(lang)}</a></div>
  ${chapters
    .map(
      (ch, i) => `<div class="sidebar-chapter">
    <h2 class="sidebar-chapter-title"><span class="chapter-num">${i + 1}</span>${escapeHtml(ch.name)}</h2>
    <ul>${ch.lessons
      .map(
        (l) =>
          `<li><a href="${root}${lang.id}/${l.slug}.html"${current && current.slug === l.slug ? ' aria-current="page"' : ''}>${escapeHtml(l.title)}</a></li>`,
      )
      .join('')}</ul>
  </div>`,
    )
    .join('\n')}
</aside>`;
}

export function groupByChapter(lessons) {
  const chapters = [];
  for (const l of lessons) {
    let ch = chapters.find((c) => c.name === l.chapter);
    if (!ch) chapters.push((ch = { name: l.chapter, lessons: [] }));
    ch.lessons.push(l);
  }
  return chapters;
}
