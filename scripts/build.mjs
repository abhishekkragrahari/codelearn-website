// Builds the whole site into dist/. No dependencies: run with `node scripts/build.mjs`.
import { readFileSync, readdirSync, mkdirSync, writeFileSync, rmSync, cpSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, languages } from '../src/site.mjs';
import { parseFrontMatter, parseBlocks, renderBlocks } from '../src/markdown.mjs';
import { escapeHtml, highlight } from '../src/highlight.mjs';
import { layout, sidebar, codeBlock, langBadge, groupByChapter, logoSvg } from '../src/templates.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'src');
const OUT = join(ROOT, 'dist');
// Absolute base path, only needed by 404.html (it can be served at any URL).
// The deploy workflow sets it to "/<repo-name>/" for GitHub Pages project sites.
const BASE = (process.env.SITE_BASE || '/').replace(/\/?$/, '/');

export function loadLessons(langId) {
  const dir = join(SRC, 'content', langId);
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .sort()
    .map((file) => {
      const { data, body } = parseFrontMatter(readFileSync(join(dir, file), 'utf8'));
      const slug = file.replace(/^\d+-/, '').replace(/\.md$/, '');
      for (const key of ['title', 'chapter']) {
        if (!data[key]) throw new Error(`${langId}/${file}: missing "${key}" in front matter`);
      }
      return { ...data, slug, file, blocks: parseBlocks(body) };
    });
}

function write(path, html) {
  const full = join(OUT, path);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, html);
}

const jsonForScript = (v) => JSON.stringify(v).replace(/</g, '\\u003c');

function homePage(all) {
  const root = './';
  const cards = languages
    .map((lang) => {
      const lessons = all[lang.id];
      return `<a class="lang-card" href="${lang.id}/index.html" style="--badge:${lang.color}">
  ${langBadge(lang, 'lg')}
  <h3>${lang.name}</h3>
  <p>${escapeHtml(lang.blurb)}</p>
  <span class="lang-card-meta">${lessons.length} lessons${lang.runnable ? ' &middot; runs in browser' : ''}</span>
</a>`;
    })
    .join('\n');
  const sample = `def greet(name):
    return f"Namaste, {name}!"

for learner in ["Asha", "Ravi"]:
    print(greet(learner))`;
  const body = `<section class="hero">
  <div class="hero-inner">
    <div class="hero-text">
      <p class="eyebrow">Free tutorials &middot; No sign-up</p>
      <h1>Learn programming the <span class="grad">friendly</span> way.</h1>
      <p class="hero-lead">Short lessons, clear examples and a playground to try things out.
        Pick a language and write your first program in minutes.</p>
      <div class="hero-actions">
        <a class="btn btn-primary" href="python/index.html">Start with Python</a>
        <a class="btn btn-ghost" href="playground.html">Open the playground</a>
      </div>
    </div>
    <div class="hero-code" aria-hidden="true">
      <div class="window-dots"><span></span><span></span><span></span><em>hello.py</em></div>
      <pre class="code-body"><code>${highlight(sample, 'python')}</code></pre>
      <div class="hero-code-out"><span>Output</span>Namaste, Asha!<br>Namaste, Ravi!</div>
    </div>
  </div>
</section>
<section class="section">
  <div class="container">
    <h2 class="section-title">Choose a language</h2>
    <p class="section-lead">Every track starts from zero and builds up step by step.</p>
    <div class="lang-grid">${cards}</div>
  </div>
</section>
<section class="section section-alt">
  <div class="container features">
    <div class="feature"><div class="feature-icon">1</div><h3>Read a short lesson</h3><p>Each topic fits on one page and explains one idea with plain words and small examples.</p></div>
    <div class="feature"><div class="feature-icon">2</div><h3>See the output</h3><p>Every example shows exactly what it prints, so you know what to expect before you run it.</p></div>
    <div class="feature"><div class="feature-icon">3</div><h3>Try it yourself</h3><p>Copy any example, or open it in the playground. JavaScript runs right in your browser.</p></div>
  </div>
</section>`;
  return layout({ title: '', root, body, bodyClass: 'home' });
}

function languagePage(lang, lessons) {
  const root = '../';
  const chapters = groupByChapter(lessons)
    .map(
      (ch, i) => `<section class="chapter-card">
  <h2><span class="chapter-num">${i + 1}</span>${escapeHtml(ch.name)}</h2>
  <ol class="chapter-lessons">${ch.lessons
    .map(
      (l) => `<li><a href="${l.slug}.html"><strong>${escapeHtml(l.title)}</strong><span>${escapeHtml(l.description || '')}</span></a></li>`,
    )
    .join('')}</ol>
</section>`,
    )
    .join('\n');
  const body = `<div class="tutorial-layout">
${sidebar(lang, lessons, null, root)}
<div class="lesson">
  <button type="button" class="sidebar-toggle" data-sidebar-toggle aria-controls="sidebar" aria-expanded="false">Topics</button>
  <nav class="breadcrumb" aria-label="Breadcrumb"><a href="${root}index.html">Home</a><span>/</span>${lang.name}</nav>
  <div class="lang-hero" style="--badge:${lang.color}">${langBadge(lang, 'lg')}<div><h1>${lang.name} Tutorial</h1><p class="lesson-lead">${escapeHtml(lang.intro)}</p></div></div>
  <a class="btn btn-primary" href="${lessons[0].slug}.html">Start the first lesson</a>
  ${chapters}
</div>
</div>`;
  return layout({ title: `${lang.name} Tutorial`, description: lang.intro, root, body, active: lang.id, bodyClass: 'tutorial' });
}

function lessonPage(lang, lessons, i) {
  const root = '../';
  const l = lessons[i];
  const prev = lessons[i - 1];
  const next = lessons[i + 1];
  const pager = `<nav class="pager" aria-label="Lesson navigation">
  ${prev ? `<a class="pager-prev" href="${prev.slug}.html"><span>Previous</span>${escapeHtml(prev.title)}</a>` : '<span></span>'}
  ${next ? `<a class="pager-next" href="${next.slug}.html"><span>Next</span>${escapeHtml(next.title)}</a>` : `<a class="pager-next" href="${root}index.html"><span>Finished!</span>Pick another language</a>`}
</nav>`;
  const content = renderBlocks(l.blocks, (b) => codeBlock(b, root));
  const body = `<div class="tutorial-layout">
${sidebar(lang, lessons, l, root)}
<article class="lesson">
  <button type="button" class="sidebar-toggle" data-sidebar-toggle aria-controls="sidebar" aria-expanded="false">Topics</button>
  <nav class="breadcrumb" aria-label="Breadcrumb"><a href="${root}index.html">Home</a><span>/</span><a href="index.html">${lang.name}</a><span>/</span>${escapeHtml(l.chapter)}</nav>
  <h1>${escapeHtml(l.title)}</h1>
  ${l.description ? `<p class="lesson-lead">${escapeHtml(l.description)}</p>` : ''}
  <div class="prose">
${content}
  </div>
  ${pager}
</article>
</div>`;
  return layout({
    title: `${l.title} - ${lang.name}`,
    description: l.description,
    root,
    body,
    active: lang.id,
    bodyClass: 'tutorial',
    scripts: lang.runnable ? ['inspect.js', 'runner.js'] : [],
  });
}

function playgroundPage(all) {
  const root = './';
  const examples = {};
  for (const lang of languages) {
    examples[lang.id] = [];
    for (const l of all[lang.id]) {
      l.blocks
        .filter((b) => b.type === 'code' && b.lang === lang.id)
        .forEach((b, n) => examples[lang.id].push({ label: `${l.title} #${n + 1}`, code: b.code, output: b.output }));
    }
  }
  const options = languages.map((l) => `<option value="${l.id}">${l.name}</option>`).join('');
  const body = `<div class="playground">
  <div class="pg-toolbar">
    <h1 class="pg-title">Playground</h1>
    <label class="pg-field"><span>Language</span><select id="pg-lang">${options}</select></label>
    <label class="pg-field"><span>Example</span><select id="pg-example"></select></label>
    <div class="pg-buttons">
      <button type="button" class="btn btn-ghost btn-sm" id="pg-copy">Copy</button>
      <button type="button" class="btn btn-ghost btn-sm" id="pg-reset">Reset</button>
      <button type="button" class="btn btn-primary btn-sm" id="pg-run">&#9654; Run</button>
    </div>
  </div>
  <div class="pg-panes">
    <section class="pg-pane">
      <div class="pg-pane-head"><span id="pg-filename">main.js</span><span class="pg-hint">Ctrl + Enter to run</span></div>
      <textarea id="pg-editor" spellcheck="false" autocapitalize="off" autocomplete="off" aria-label="Code editor"></textarea>
    </section>
    <section class="pg-pane">
      <div class="pg-pane-head"><span>Output</span><button type="button" class="pg-clear" id="pg-clear">Clear</button></div>
      <div class="pg-notice" id="pg-notice" hidden></div>
      <pre id="pg-output" class="pg-output" aria-live="polite"></pre>
    </section>
  </div>
</div>
<script type="application/json" id="pg-examples">${jsonForScript(examples)}</script>`;
  return layout({
    title: 'Playground',
    description: 'Write and run JavaScript in your browser, and explore Python, C and Java examples with their output.',
    root,
    body,
    active: 'playground',
    bodyClass: 'pg-page',
    scripts: ['inspect.js', 'runner.js', 'playground.js'],
  });
}

function notFoundPage() {
  const body = `<section class="not-found container">
  ${logoSvg(64)}
  <h1>Page not found</h1>
  <p>The page you were looking for does not exist or has moved.</p>
  <a class="btn btn-primary" href="${BASE}index.html">Go to the home page</a>
</section>`;
  return layout({ title: 'Page not found', root: BASE, body });
}

export function build() {
  if (existsSync(OUT)) rmSync(OUT, { recursive: true });
  mkdirSync(OUT, { recursive: true });
  cpSync(join(SRC, 'assets'), join(OUT, 'assets'), { recursive: true });

  const all = {};
  for (const lang of languages) all[lang.id] = loadLessons(lang.id);

  write('index.html', homePage(all));
  write('playground.html', playgroundPage(all));
  write('404.html', notFoundPage());
  write('.nojekyll', '');
  let count = 3;
  for (const lang of languages) {
    const lessons = all[lang.id];
    write(`${lang.id}/index.html`, languagePage(lang, lessons));
    lessons.forEach((_, i) => write(`${lang.id}/${lessons[i].slug}.html`, lessonPage(lang, lessons, i)));
    count += 1 + lessons.length;
  }
  return count;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const n = build();
  console.log(`Built ${n} pages for ${site.name} into dist/`);
}
