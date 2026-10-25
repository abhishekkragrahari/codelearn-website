import { site, languages, tracks } from './site.mjs';
import { escapeHtml, highlight } from './highlight.mjs';

export const logoSvg = (size = 32) => `<svg class="logo-mark" width="${size}" height="${size}" viewBox="0 0 32 32" aria-hidden="true">
  <rect width="32" height="32" rx="9" fill="url(#lg)"/>
  <defs><linearGradient id="lg" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse"><stop stop-color="#0d9488"/><stop offset="1" stop-color="#4f46e5"/></linearGradient></defs>
  <path d="M12 10l-5 6 5 6M20 10l5 6-5 6" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="16" cy="16" r="2.2" fill="#fde68a"/>
</svg>`;

const icons = {
  sun: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="12" cy="12" r="4.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  moon: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
  menu: '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
};

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
  const label = lang ? lang.name : block.lang;
  const runnable = lang && lang.runnable;
  const actions = [
    '<button type="button" class="code-btn" data-copy>Copy</button>',
    runnable ? '<button type="button" class="code-btn code-btn-run" data-run>&#9654; Run</button>' : '',
    lang ? `<a class="code-btn" href="${escapeHtml(playgroundHref(root, block.lang, block.code, block.output))}">Open in playground</a>` : '',
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
<link rel="stylesheet" href="${root}assets/css/style.css">
<script>try{var t=localStorage.getItem('cs-theme');if(t)document.documentElement.setAttribute('data-theme',t)}catch(e){}</script>
</head>
<body class="${bodyClass}">
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header">
  <div class="header-inner">
    <a class="brand" href="${root}index.html">${logoSvg()}<span>${site.name}</span></a>
    <nav class="main-nav" id="main-nav" aria-label="Main">
      ${nav}
      <a href="${root}playground.html"${active === 'playground' ? ' aria-current="page"' : ''} class="nav-playground">Playground</a>
    </nav>
    <div class="header-tools">
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
    <p>${escapeHtml(site.tagline)} All lessons are free to read.</p>
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
  <div class="sidebar-head">${langBadge(lang)}<a href="${root}${lang.id}/index.html">${trackTitle(lang)}</a></div>
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
