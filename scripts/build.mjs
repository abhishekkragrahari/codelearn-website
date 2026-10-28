// Builds the whole site into dist/. No dependencies: run with `node scripts/build.mjs`.
import { readFileSync, readdirSync, mkdirSync, writeFileSync, rmSync, cpSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, languages, topics, tracks, gateSubjects, gateDaSubjects } from '../src/site.mjs';
import { parseFrontMatter, parseBlocks, renderBlocks, inline } from '../src/markdown.mjs';
import { escapeHtml, highlight } from '../src/highlight.mjs';
import { layout, sidebar, codeBlock, groupByChapter, logoSvg, langById, trackTitle, icon, langLogo, playgroundHref } from '../src/templates.mjs';
import { renderQuiz } from '../src/quiz.mjs';
import { isDiagram, renderDiagram } from '../src/diagrams.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'src');
const OUT = join(ROOT, 'dist');
// Absolute base path, only needed by 404.html (it can be served at any URL).
// The deploy workflow sets it to "/" for the custom domain.
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

// Pages listed in sitemap.xml (every HTML page except 404.html).
const pages = [];

// Canonical and social-share tags need the page's own address, so they are
// added here rather than in layout().
function seoTags(path, html) {
  const url = site.url + path.replace(/(^|\/)index\.html$/, '$1');
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || site.name;
  const desc = (html.match(/<meta name="description" content="([^"]*)">/) || [])[1] || '';
  return `<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${escapeHtml(site.name)}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${site.url}assets/img/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
`;
}

function write(path, html) {
  if (path.endsWith('.html') && path !== '404.html') {
    pages.push(path);
    html = html.replace('</head>', seoTags(path, html) + '</head>');
  }
  const full = join(OUT, path);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, html);
}

const jsonForScript = (v) => JSON.stringify(v).replace(/</g, '\\u003c');

// Structured data (JSON-LD) that tells search engines what a page is and where it sits.
const absolute = (path) => site.url + path.replace(/(^|\/)index\.html$/, '$1');
const jsonLd = (...objects) =>
  objects.map((o) => `<script type="application/ld+json">${jsonForScript({ '@context': 'https://schema.org', ...o })}</script>\n`).join('');
const breadcrumbs = (items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: absolute(path) })),
});
const gateTag = (t) => (t.gate ? t.paper || (t.da ? 'GATE DA' : 'GATE CS') : '');

// Title candidates for a lesson, longest first. The track name is left out when the lesson
// title already contains it ("Loops in C"), and long titles fall back to the part before " - ",
// then to the part before ": ", then before the first ", " or " and ", so that a GATE lesson
// keeps "GATE" in its title.
function lessonTitles(lang, title) {
  const tag = lang.gate && !title.includes('GATE') ? ` (${gateTag(lang)})` : '';
  const track = title.endsWith(` in ${lang.name}`) && !lang.topic ? ' Programming' : title.includes(lang.name) ? '' : lang.topic ? ` - ${lang.name}` : ` in ${lang.name} Programming`;
  const short = title.split(' - ')[0];
  const head = short.split(': ')[0];
  const first = head.split(/, | and /)[0];
  return [...new Set([`${title}${track}${tag}`, `${title}${tag}`, `${short}${track}${tag}`, `${short}${tag}`, `${head}${tag}`, `${first}${tag}`, short])];
}

function topicCard(t, all, root) {
  return `<a class="topic-card glass" href="${root}${t.id}/index.html" style="--badge:${t.color}">
  ${langLogo(t, 'lg', 'graph')}
  <div class="topic-card-body"><h3>${escapeHtml(t.cardTitle || t.name)}</h3><p>${escapeHtml(t.blurb)}</p>
  <span class="lang-card-meta">${all[t.id].length} lessons &middot; ${escapeHtml(t.cardMeta || 'GATE-style questions')}</span></div>
  <span class="card-arrow">${icon('arrow', 16)}</span>
</a>`;
}

const gatePapers = {
  cs: {
    file: 'gate.html',
    title: 'GATE CS',
    heading: 'GATE Computer Science preparation',
    paper: 'GATE CS',
    subjects: gateSubjects,
    description: 'Subject-wise GATE Computer Science preparation with GATE-style practice questions.',
  },
  da: {
    file: 'gate-da.html',
    title: 'GATE DA',
    heading: 'GATE Data Science and AI preparation',
    paper: 'GATE DA',
    subjects: gateDaSubjects,
    description: 'Subject-wise GATE Data Science and Artificial Intelligence (DA) preparation with GATE-style practice questions.',
  },
  ce: corePaper('ce', 'GATE CE', 'GATE Civil Engineering preparation', 'Civil Engineering (CE)'),
  me: corePaper('me', 'GATE ME', 'GATE Mechanical Engineering preparation', 'Mechanical Engineering (ME)'),
  ee: corePaper('ee', 'GATE EE', 'GATE Electrical Engineering preparation', 'Electrical Engineering (EE)'),
  ec: corePaper('ec', 'GATE EC', 'GATE Electronics and Communication preparation', 'Electronics and Communication Engineering (EC)'),
};

// A core-branch paper: one track whose lessons are the subjects, plus the shared
// Engineering Mathematics and General Aptitude tracks.
function corePaper(id, title, heading, branch) {
  // Exam Prep pages (study plan, formula sheet, mock test) are linked separately, not listed as subjects.
  const lessons = loadLessons(id);
  let subjects = lessons.filter((l) => l.chapter !== 'Exam Prep').map((l) => ({ name: l.title, track: id, lesson: l.slug }));
  // A branch whose subjects have their own topic-wise tracks lists those tracks instead.
  const own = topics.filter((t) => t.branch === id || t.alsoBranch === id);
  if (own.length) subjects = [subjects[0], ...own.map((t) => ({ name: t.name, track: t.id }))];
  const prep = lessons.filter((l) => l.chapter === 'Exam Prep');
  return {
    file: `gate-${id}.html`,
    title,
    heading,
    paper: title,
    subjects: [...subjects, { name: 'Engineering Mathematics', track: 'em' }, { name: 'General Aptitude', track: 'ga' }],
    description: `GATE ${branch} preparation: the detailed syllabus, key concepts and formulas for every subject, with solved GATE-style questions.`,
    prep: prep.map((l) => ({ title: l.title, href: `${id}/${l.slug}.html` })),
    lead:
      `The detailed ${title} syllabus, with one lesson per subject: the topics to study, the key concepts and formulas, a worked ` +
      'example and GATE-style questions (MCQ, MSQ and NAT) whose numerical answers are recomputed by a program when the site is built. ' +
      'Engineering Mathematics, including differential equations, complex variables and numerical methods, has its own track.',
  };
}

function gatePage(all, paper) {
  const root = './';
  const byId = Object.fromEntries(tracks.map((t) => [t.id, t]));
  const rows = paper.subjects
    .map((g, i) => {
      const t = g.track && byId[g.track];
      if (!t) {
        return `<li class="gate-subject is-soon"><span class="chapter-num">${i + 1}</span><div><strong>${escapeHtml(g.name)}</strong><span>Coming soon</span></div></li>`;
      }
      // A subject is either a whole track or, for the core-branch papers, one lesson of the branch track.
      const lessons = g.lesson ? all[t.id].filter((l) => l.slug === g.lesson) : all[t.id];
      if (!lessons.length) throw new Error(`${paper.file}: no lesson ${g.track}/${g.lesson}`);
      const quizzes = lessons.reduce((n, l) => n + l.blocks.filter((b) => b.type === 'code' && b.lang === 'quiz').length, 0);
      const href = g.lesson ? `${t.id}/${g.lesson}.html` : `${t.id}/index.html`;
      const count = g.lesson ? 'Notes and key formulas' : `${lessons.length} lessons`;
      return `<li class="gate-subject"><span class="chapter-num">${i + 1}</span><a href="${href}"><strong>${escapeHtml(g.name)}</strong><span>${count}${quizzes ? ` &middot; ${quizzes} GATE-style questions` : ''}</span></a></li>`;
    })
    .join('');
  const body = `<section class="section"><div class="container">
  <nav class="breadcrumb" aria-label="Breadcrumb"><a href="index.html">Home</a><span>/</span>${paper.title}</nav>
  <h1 class="section-title">${paper.heading}</h1>
  <p class="section-lead">${paper.lead || `Every subject of the ${paper.paper} syllabus, explained step by step with figures and worked examples. Each lesson ends with GATE-style questions in the exam's three formats: MCQ, MSQ and NAT. Every program shown in a question is compiled and run, and every numerical answer is recomputed by a program when the site is built.`}</p>
  <ol class="gate-list">${rows}</ol>
  <p class="gate-other">Other GATE papers: ${Object.values(gatePapers).filter((p) => p !== paper).map((p) => `<a href="${p.file}">${p.title}</a>`).join(' &middot; ')}</p>
  ${Object.entries(mockPapers).filter(([, m]) => m.hub === paper.file).map(([id]) => `<p class="gate-other"><strong>Full-length mock tests:</strong> ${Array.from({ length: MOCKS_PER_PAPER }, (_, k) => `<a href="mock/${id}-${k + 1}.html">${paper.title} Mock ${k + 1}</a>`).join(' &middot; ')} (65 questions, 3-hour timer, GATE marking)</p>`).join('')}
  ${paper.prep && paper.prep.length ? `<p class="gate-other">Exam prep: ${paper.prep.map((p) => `<a href="${p.href}">${escapeHtml(p.title)}</a>`).join(' &middot; ')}</p>` : ''}
  ${paper.paper === 'GATE CS' || paper.paper === 'GATE DA' ? `<p class="gate-other">Planning your preparation? Read the <a href="prep/index.html">GATE CS Exam Guide</a>: <a href="prep/exam-pattern-marking-scheme.html">exam pattern</a>, <a href="prep/syllabus.html">syllabus</a>, <a href="prep/six-month-study-plan.html">study plans</a>, <a href="prep/formula-sheet.html">formula sheet</a> and a <a href="prep/mock-test-1.html">free mock test</a>.</p>` : ''}
  <aside class="callout callout-note"><strong>Note:</strong> The questions are original GATE-style questions written for this site, modelled on the topics and tricks that GATE papers test. They are not copies of past GATE papers.</aside>
</div></section>`;
  return layout({
    titles: [`${paper.title} Preparation: Notes and Practice Questions`, `${paper.title} Preparation`],
    description: paper.description,
    descriptionExtra: 'Free notes, worked examples and solved practice questions for every subject.',
    head: jsonLd(breadcrumbs([['Home', 'index.html'], [paper.title, paper.file]])),
    root,
    body,
    active: 'gate',
  });
}

function homePage(all) {
  const root = './';
  const ready = gateSubjects.filter((g) => g.track).length;
  const gate = { id: 'gate', short: 'GT', color: '#7c3aed' };
  const topicCards =
    topics
      .filter((t) => t.nav)
      .map((t) => topicCard(t, all, ''))
      .join('\n') +
    `<a class="topic-card glass" href="gate.html" style="--badge:${gate.color}">
  ${langLogo(gate, 'lg', 'cap')}
  <div class="topic-card-body"><h3>GATE CS preparation</h3><p>Subject-wise lessons for the GATE Computer Science exam, each with figures, worked examples and practice questions.</p>
  <span class="lang-card-meta">${ready} of ${gateSubjects.length} subjects ready</span></div>
  <span class="card-arrow">${icon('arrow', 16)}</span>
</a>
<a class="topic-card glass" href="gate-da.html" style="--badge:#0891b2">
  ${langLogo({ id: 'gate-da', short: 'DA', color: '#0891b2' }, 'lg', 'cap')}
  <div class="topic-card-body"><h3>GATE DA preparation</h3><p>Data Science and AI: probability, linear algebra, machine learning, AI and more, with worked examples and practice questions.</p>
  <span class="lang-card-meta">${gateDaSubjects.length} subjects &middot; GATE-style questions</span></div>
  <span class="card-arrow">${icon('arrow', 16)}</span>
</a>
<a class="topic-card glass" href="gate-ce.html" style="--badge:#b45309">
  ${langLogo({ id: 'gate-core', short: 'CE', color: '#b45309' }, 'lg', 'cap')}
  <div class="topic-card-body"><h3>GATE CE, ME, EE and EC</h3><p>Civil, Mechanical, Electrical and Electronics papers: the detailed syllabus, key formulas and practice questions for every subject.</p>
  <span class="lang-card-meta">4 papers &middot; CE, ME, EE and EC</span></div>
  <span class="card-arrow">${icon('arrow', 16)}</span>
</a>`;
  const cards = languages
    .map((lang) => {
      const lessons = all[lang.id];
      return `<a class="lang-card glass" href="${lang.id}/index.html" style="--badge:${lang.color}">
  <div class="lang-card-top">${langLogo(lang)}<span class="card-arrow">${icon('arrow', 16)}</span></div>
  <h3>${lang.name}</h3>
  <p>${escapeHtml(lang.blurb)}</p>
  <span class="lang-card-meta">${lessons.length} lessons${lang.runnable ? ' &middot; runs in browser' : ''}<span class="card-arrow">${icon('arrow', 16)}</span></span>
</a>`;
    })
    .join('\n');
  const sample = `def greet(name):
    return f"Namaste, {name}!"

for learner in ["Asha", "Ravi"]:
    print(greet(learner))`;
  const lines = highlight(sample, 'python').split('\n').map((l, i) => `<span class="ln-row" style="animation-delay:${0.5 + i * 0.18}s"><span class="ln">${i + 1}</span>${l}</span>`).join('\n');
  const sectionHead = (ic, title, lead) =>
    `<div class="section-head"><span class="section-icon">${icon(ic, 20)}</span><div><h2 class="section-title">${title}</h2><p class="section-lead">${lead}</p></div></div>`;
  const body = `<section class="hero">
  <div class="hero-inner">
    <div class="hero-text">
      <p class="eyebrow"><span class="eyebrow-dot"></span>Free tutorials &middot; No sign-up required</p>
      <h1>Learn programming the <span class="grad squiggle">friendly</span> way.</h1>
      <p class="hero-lead">Short lessons, clear examples and a playground to try things out.
        Pick a language and write your first program in minutes.</p>
      <div class="hero-actions">
        <a class="btn btn-primary btn-lg" href="python/index.html">Start with Python ${icon('arrow', 18)}</a>
        <a class="btn btn-ghost btn-lg" href="playground.html">${icon('code', 18)}Open the playground</a>
      </div>
      <ul class="hero-points">
        <li><span class="pt pt-blue">${icon('book', 18)}</span>Bite-sized lessons</li>
        <li><span class="pt pt-amber">${icon('bolt', 18)}</span>Run in browser</li>
        <li><span class="pt pt-violet">${icon('users', 18)}</span>Perfect for beginners</li>
      </ul>
    </div>
    <div class="hero-visual">
      <div class="hero-code glass">
        <div class="hero-code-bar">
          <div class="window-dots"><span></span><span></span><span></span></div>
          <span class="file-tab">${langLogo(languages[0], 'xs')}hello.py</span>
          <div class="hero-code-tools">
            <a class="mini-btn" href="${escapeHtml(playgroundHref(root, 'python', sample))}" aria-label="Copy into the playground">${icon('copy', 15)}</a>
            <a class="mini-btn" href="${escapeHtml(playgroundHref(root, 'python', sample))}">${icon('reset', 15)}Reset</a>
            <a class="mini-btn mini-run" href="${escapeHtml(playgroundHref(root, 'python', sample))}">${icon('play', 13)}Run</a>
          </div>
        </div>
        <pre class="code-body numbered"><code>${lines}</code></pre>
        <div class="hero-code-out">
          <div class="out-head"><span>${icon('terminal', 16)}Output</span><em>Clear</em></div>
          <pre>Namaste, Asha!
Namaste, Ravi!</pre>
        </div>
      </div>
      <div class="hero-float" aria-hidden="true">${icon('code', 26)}</div>
      <p class="hand-note" aria-hidden="true">Code<br>Run<br>Learn<br>Repeat</p>
    </div>
  </div>
</section>
<section class="section">
  <div class="container">
    ${sectionHead('layers', 'Choose a language', 'Every track starts from zero and builds up step by step.')}
    <div class="lang-grid">${cards}</div>
    <div class="section-gap">
      ${sectionHead('chart', 'Go deeper', 'Ready for interviews and the GATE exam? Learn how data is organised and how fast algorithms really are.')}
      <p class="hand-note hand-note-right" aria-hidden="true">From basics<br>to beyond</p>
    </div>
    <div class="topic-grid">${topicCards}</div>
    <div class="section-gap">
      ${sectionHead('sparkle', 'How it works', 'Start learning in three simple steps.')}
    </div>
    <div class="features">
      <div class="feature glass"><span class="step">1</span><span class="feature-icon pt-blue">${icon('book', 22)}</span><div><h3>Read a short lesson</h3><p>Each topic fits on one page and explains one idea with plain words and small examples.</p></div></div>
      <div class="feature glass"><span class="step">2</span><span class="feature-icon pt-teal">${icon('terminal', 22)}</span><div><h3>See the output</h3><p>Every example shows exactly what it prints, so you know what to expect before you run it.</p></div></div>
      <div class="feature glass"><span class="step">3</span><span class="feature-icon pt-violet">${icon('play', 20)}</span><div><h3>Try it yourself</h3><p>Copy any example, or open it in the playground and run it right in your browser.</p></div></div>
    </div>
  </div>
</section>`;
  const head = jsonLd(
    { '@type': 'WebSite', name: site.name, url: site.url, description: site.description, inLanguage: 'en' },
    { '@type': 'Organization', name: site.name, url: site.url, logo: absolute('assets/img/og-image.png') },
  ) +
    // Bing Webmaster Tools ownership check; keep it even after verification.
    '<meta name="msvalidate.01" content="6028ECC39AAE8BF8EBA002674091D003">\n';
  return layout({
    // The brand is already in this title, so it is used without the " | GateShala" suffix.
    titles: [`${site.name} - ${site.tagline}`],
    head,
    root,
    body,
    bodyClass: 'home',
  });
}

function languagePage(lang, lessons) {
  const root = '../';
  const chapters = groupByChapter(lessons)
    .map(
      (ch, i) => `<section class="chapter-card">
  <h2><span class="chapter-num">${i + 1}</span>${escapeHtml(ch.name)}</h2>
  <ol class="chapter-lessons">${ch.lessons
    .map(
      (l) => `<li><a href="${l.slug}.html" data-lesson="${lang.id}/${l.slug}"><strong>${escapeHtml(l.title)}</strong><span>${escapeHtml(l.description || '')}</span></a></li>`,
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
  <div class="lang-hero" style="--badge:${lang.color}">${langLogo(lang, 'lg', 'graph')}<div><h1>${trackTitle(lang)}</h1><p class="lesson-lead">${escapeHtml(lang.intro)}</p></div></div>
  <a class="btn btn-primary" href="${lessons[0].slug}.html">Start the first lesson</a>
  <div class="track-progress" data-track-progress="${lang.id}" data-total="${lessons.length}" hidden></div>
  ${chapters}
</div>
</div>`;
  return layout({
    titles: lang.indexTitles || [
      lang.gate ? `${lang.name} for ${gateTag(lang)}: Notes and Practice Questions` : `${trackTitle(lang)}: Free Lessons with Examples`,
      lang.gate ? `${lang.name} for ${gateTag(lang)}` : trackTitle(lang),
    ],
    description: lang.intro,
    head: jsonLd(breadcrumbs([['Home', 'index.html'], [lang.name, `${lang.id}/index.html`]])),
    root,
    body,
    active: lang.id,
    bodyClass: 'tutorial',
  });
}

// Code blocks in different languages that follow each other directly (for
// example Java then Python, each with its output) become one tabbed block.
function groupCodeTabs(blocks) {
  const out = [];
  for (const b of blocks) {
    const prev = out[out.length - 1];
    const isLang = b.type === 'code' && langById[b.lang];
    if (isLang && prev && prev.type === 'tabs' && !prev.items.some((x) => x.lang === b.lang)) prev.items.push(b);
    else if (isLang && prev && prev.type === 'code' && langById[prev.lang] && prev.lang !== b.lang) out[out.length - 1] = { type: 'tabs', items: [prev, b] };
    else out.push(b);
  }
  return out;
}

function codeTabs(items, renderOne) {
  const buttons = items
    .map((b, i) => `<button type="button" role="tab" class="code-tab" data-tab="${b.lang}" aria-selected="${i === 0}">${langById[b.lang].name}</button>`)
    .join('');
  const panels = items.map((b, i) => `<div class="code-tab-panel" data-panel="${b.lang}"${i ? ' hidden' : ''}>${renderOne(b)}</div>`).join('');
  return `<div class="code-tabs" data-tabs><div class="code-tabs-bar" role="tablist">${buttons}</div>${panels}</div>`;
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
  const renderOne = (b) => {
    if (b.lang === 'quiz') return renderQuiz(b.code, inline);
    if (isDiagram(b.lang)) return renderDiagram(b.lang, b.code);
    return codeBlock(b, root);
  };
  const content = renderBlocks(groupCodeTabs(l.blocks).map((b) => (b.type === 'tabs' ? { type: 'html', html: codeTabs(b.items, renderOne) } : b)), renderOne);
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
  <div class="lesson-done" data-lesson-done="${lang.id}/${l.slug}"><button type="button" class="btn btn-sm" data-mark-done>Mark this lesson as done</button><span data-done-note></span></div>
  ${pager}
</article>
</div>`;
  return layout({
    // "GATE" in the title helps people searching for exam notes find the page; shorter forms are used when it is too long.
    titles: lessonTitles(lang, l.title),
    // A GATE lesson's description starts with the paper name when it does not mention GATE already.
    description: lang.gate && l.description && !l.description.includes('GATE') ? `${gateTag(lang)}: ${l.description}` : l.description || `${l.title} in ${trackTitle(lang)}.`,
    descriptionExtra: lang.gate
      ? `Free ${lang.name} notes for ${gateTag(lang)} with solved practice questions.`
      : `Free ${lang.name} lesson with examples and their output.`,
    head: jsonLd(
      breadcrumbs([['Home', 'index.html'], [lang.name, `${lang.id}/index.html`], [l.title, `${lang.id}/${l.slug}.html`]]),
      {
        '@type': 'LearningResource',
        name: l.title,
        description: l.description || l.title,
        url: absolute(`${lang.id}/${l.slug}.html`),
        inLanguage: 'en',
        isAccessibleForFree: true,
        learningResourceType: 'Lesson',
        educationalUse: lang.gate ? 'GATE exam preparation' : 'Programming tutorial',
        about: lang.name,
        isPartOf: { '@type': 'Course', name: trackTitle(lang), url: absolute(`${lang.id}/index.html`) },
        provider: { '@type': 'Organization', name: site.name, url: site.url },
      },
    ),
    root,
    body,
    active: lang.id,
    bodyClass: 'tutorial',
    scripts: lang.runnable || l.blocks.some((b) => b.type === 'code' && langById[b.lang] && langById[b.lang].runnable) ? ['inspect.js', 'runner.js'] : [],
  });
}

function playgroundPage(all) {
  const root = './';
  const examples = {};
  for (const lang of languages) examples[lang.id] = [];
  for (const track of tracks) {
    for (const l of all[track.id]) {
      l.blocks
        .filter((b) => b.type === 'code' && examples[b.lang])
        .forEach((b) => {
          const list = examples[b.lang];
          const lesson = track.topic ? `${track.name}: ${l.title}` : l.title;
          const n = list.filter((x) => x.lesson === lesson).length + 1;
          list.push({ lesson, label: `Example ${n}`, code: b.code, output: b.output });
        });
    }
  }
  const cards = [
    ...languages.map((l) => ({ href: `${l.id}/index.html`, t: l, ic: '', blurb: l.blurb })),
    ...topics.filter((t) => t.nav).map((t) => ({ href: `${t.id}/index.html`, t, ic: 'graph', blurb: t.blurb })),
    { href: 'gate.html', t: { id: 'gate', short: 'GT', color: '#7c3aed', name: 'GATE CS' }, ic: 'cap', blurb: 'Practice with GATE-style questions.' },
  ]
    .map(
      (c) => `<a class="pg-track glass" href="${c.href}" style="--badge:${c.t.color}">${langLogo(c.t, 'md', c.ic)}<span><strong>${escapeHtml(c.t.topic ? 'DSA' : c.t.name)}</strong><small>${escapeHtml(c.t.tagline || c.blurb)}</small></span><span class="card-arrow">${icon('arrow', 15)}</span></a>`,
    )
    .join('');
  const options = languages.map((l) => `<option value="${l.id}">${l.name}</option>`).join('');
  const body = `<div class="playground">
  <div class="pg-hero">
    <div>
      <p class="eyebrow">${icon('code', 15)}Interactive Coding Playground</p>
      <h1 class="pg-title">Code. Run. <span class="grad">Learn.</span></h1>
      <p class="hero-lead">Write code, run it instantly, and learn with hands-on examples.<br>Choose a language, try examples or write your own code.</p>
    </div>
    <ul class="pg-points">
      <li><span class="pt pt-amber">${icon('bolt', 22)}</span><span><strong>Run instantly</strong>See output in real time</span></li>
      <li><span class="pt pt-blue">${icon('book', 22)}</span><span><strong>Try examples</strong>Learn from ready code</span></li>
      <li><span class="pt pt-violet">${icon('users', 22)}</span><span><strong>Practice freely</strong>No sign-up required</span></li>
    </ul>
  </div>
  <div class="pg-shell glass">
    <div class="pg-toolbar">
      <label class="pg-field"><span>Language</span><span class="select-wrap" id="pg-lang-wrap" data-lang="python"><span class="select-icon">${languages.map((l) => `<span data-logo="${l.id}">${langLogo(l, 'xs')}</span>`).join('')}</span><select id="pg-lang">${options}</select>${icon('chevron', 16, 'select-caret')}</span></label>
      <label class="pg-field"><span>Example</span><span class="select-wrap">${icon('file', 18, 'select-icon')}<select id="pg-example"></select>${icon('chevron', 16, 'select-caret')}</span></label>
      <div class="pg-buttons">
        <button type="button" class="btn btn-ghost" id="pg-copy">${icon('copy', 17)}Copy</button>
        <button type="button" class="btn btn-ghost" id="pg-reset">${icon('reset', 17)}Reset</button>
        <button type="button" class="btn btn-primary btn-run" id="pg-run">${icon('play', 16)}Run<kbd>Ctrl + Enter</kbd></button>
      </div>
    </div>
    <div class="pg-panes">
      <div class="pg-left">
        <section class="pg-pane">
          <div class="pg-pane-head"><span class="pg-file">${icon('file', 17)}<span id="pg-filename">main.js</span></span><span class="pg-hint">${icon('keyboard', 17)}Ctrl + Enter to run</span></div>
          <textarea id="pg-editor" spellcheck="false" autocapitalize="off" autocomplete="off" aria-label="Code editor"></textarea>
        </section>
        <section class="pg-pane pg-stdin">
          <div class="pg-pane-head"><span class="pg-file">${icon('terminal', 17)}<strong>Input (stdin)</strong>${icon('info', 14, 'muted')}</span><span class="pg-hint">Provide custom input for your program (optional)</span></div>
          <textarea id="pg-stdin" spellcheck="false" rows="2" placeholder="Enter input here (if your code expects input)..." aria-label="Program input"></textarea>
        </section>
      </div>
      <section class="pg-pane pg-out-pane">
        <div class="pg-pane-head"><span class="pg-file">${icon('terminal', 17)}<strong>Output</strong></span><button type="button" class="pg-clear" id="pg-clear">${icon('trash', 15)}Clear</button></div>
        <div class="pg-notice" id="pg-notice" hidden></div>
        <pre id="pg-output" class="pg-output" aria-live="polite"></pre>
      </section>
    </div>
  </div>
  <nav class="pg-tracks" aria-label="Tutorials">${cards}</nav>
</div>
<script type="application/json" id="pg-examples">${jsonForScript(examples)}</script>`;
  return layout({
    titles: ['Online Compiler: Run Python, C, Java and JavaScript', 'Online Code Playground'],
    description: 'Write and run Python, C, Java and JavaScript code online.',
    descriptionExtra: 'A free online compiler in your browser: no installation or sign-up needed.',
    head: jsonLd(breadcrumbs([['Home', 'index.html'], ['Playground', 'playground.html']])),
    root,
    body,
    active: 'playground',
    bodyClass: 'pg-page',
    scripts: ['inspect.js', 'runner.js', 'coderun.js', 'playground.js'],
  });
}

// About, Contact, Privacy Policy and other site pages, written in Markdown in src/pages/.
function infoPage(file) {
  const { data, body } = parseFrontMatter(readFileSync(join(SRC, 'pages', file), 'utf8'));
  const html = renderBlocks(parseBlocks(body), (b) => codeBlock(b, ''));
  const content = `<article class="container info-page prose">
  <h1>${escapeHtml(data.title)}</h1>
  ${html}
</article>`;
  const path = file.replace(/\.md$/, '.html');
  return layout({
    title: data.title,
    description: data.description,
    descriptionExtra: `${site.name} offers free GATE CS and GATE DA notes, practice questions and coding tutorials.`,
    head: jsonLd(breadcrumbs([['Home', 'index.html'], [data.title, path]])),
    root: '',
    body: content,
  });
}

function notFoundPage() {
  const body = `<section class="not-found container">
  ${logoSvg(64)}
  <h1>Page not found</h1>
  <p>The page you were looking for does not exist or has moved.</p>
  <a class="btn btn-primary" href="${BASE}index.html">Go to the home page</a>
</section>`;
  return layout({ title: 'Page not found', head: '<meta name="robots" content="noindex">\n', root: BASE, body });
}

// Full-length mock tests: 65 questions (100 marks) drawn from the verified lesson questions,
// in proportion to each paper's syllabus. Each entry is [track id, number of questions, label,
// optional lesson slugs]; General Aptitude always comes first with 10 questions.
const EM_CS = ['matrices-determinants', 'linear-equations', 'eigenvalues', 'calculus', 'integration', 'probability', 'random-variables', 'statistics'];
const mockPapers = {
  cs: { title: 'GATE CS', hub: 'gate.html', subjects: [['dm', 5, 'Discrete Mathematics'], ['em', 4, 'Engineering Mathematics', EM_CS], ['dsa', 9, 'Data Structures & Algorithms'], ['c', 3, 'Programming in C'], ['os', 5, 'Operating Systems'], ['dbms', 5, 'Databases'], ['cn', 6, 'Computer Networks'], ['toc', 5, 'Theory of Computation'], ['coa', 5, 'Computer Organization'], ['dl', 4, 'Digital Logic'], ['cd', 4, 'Compiler Design']] },
  da: { title: 'GATE DA', hub: 'gate-da.html', subjects: [['ps', 9, 'Probability & Statistics'], ['la', 6, 'Linear Algebra'], ['calc', 4, 'Calculus & Optimization'], ['dsa', 10, 'Programming, Data Structures & Algorithms'], ['dbms', 5, 'Databases'], ['dw', 3, 'Data Warehousing'], ['ml', 11, 'Machine Learning'], ['ai', 7, 'Artificial Intelligence']] },
  me: { title: 'GATE ME', hub: 'gate-me.html', subjects: [['em', 8, 'Engineering Mathematics'], ['me-mech', 4, 'Engineering Mechanics'], ['me-som', 7, 'Strength of Materials'], ['me-tom', 6, 'Theory of Machines'], ['me-md', 5, 'Machine Design'], ['me-fm', 6, 'Fluid Mechanics'], ['me-td', 7, 'Thermodynamics'], ['me-ht', 4, 'Heat Transfer'], ['me-mfg', 5, 'Manufacturing'], ['me-ie', 3, 'Industrial Engineering']] },
  ce: { title: 'GATE CE', hub: 'gate-ce.html', subjects: [['em', 8, 'Engineering Mathematics'], ['me-mech', 3, 'Engineering Mechanics'], ['me-som', 6, 'Solid Mechanics'], ['ce-str', 6, 'Structural Analysis'], ['ce-rcc', 5, 'Concrete & Steel'], ['ce-geo', 8, 'Geotechnical'], ['me-fm', 4, 'Fluid Mechanics'], ['ce-wr', 5, 'Water Resources'], ['ce-env', 4, 'Environmental'], ['ce-tr', 4, 'Transportation'], ['ce-gm', 2, 'Geomatics']] },
  ee: { title: 'GATE EE', hub: 'gate-ee.html', subjects: [['em', 8, 'Engineering Mathematics'], ['ee-ckt', 7, 'Electric Circuits'], ['ee-emf', 4, 'Electromagnetic Fields'], ['ee-ss', 5, 'Signals & Systems'], ['ee-mac', 8, 'Electrical Machines'], ['ee-ps', 7, 'Power Systems'], ['ee-cs', 5, 'Control Systems'], ['ee-meas', 3, 'Measurements'], ['ee-elec', 4, 'Analog & Digital Electronics'], ['ee-pe', 4, 'Power Electronics']] },
  ec: { title: 'GATE EC', hub: 'gate-ec.html', subjects: [['em', 8, 'Engineering Mathematics'], ['ee-ckt', 7, 'Networks'], ['ee-ss', 7, 'Signals & Systems'], ['ec-dev', 6, 'Electronic Devices'], ['ee-elec', 7, 'Analog & Digital Circuits'], ['ee-cs', 5, 'Control Systems'], ['ec-comm', 8, 'Communications'], ['ee-emf', 2, 'Electromagnetic Fields'], ['ec-emw', 5, 'Electromagnetic Waves']] },
};
const MOCKS_PER_PAPER = 2;

// Small deterministic shuffle, so every build produces the same mock tests.
function seededShuffle(items, seed) {
  let s = [...seed].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
  const rand = () => ((s = (s * 1103515245 + 12345) >>> 0) / 2 ** 32);
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function quizPool(all, trackId, slugs) {
  return all[trackId]
    .filter((l) => !slugs || slugs.includes(l.slug))
    .flatMap((l) => l.blocks.filter((b) => b.type === 'code' && b.lang === 'quiz').map((b) => ({ src: b.code, from: `${trackId}/${l.slug}.html` })));
}

// The questions of mock n for a paper: disjoint slices of each subject's shuffled pool.
function mockQuestions(all, id, n) {
  const paper = mockPapers[id];
  const sections = [['ga', 10, 'General Aptitude'], ...paper.subjects];
  const qs = [];
  for (const [track, count, label, slugs] of sections) {
    const pool = seededShuffle(quizPool(all, track, slugs), `${id}-${track}`);
    if (pool.length < count * MOCKS_PER_PAPER) throw new Error(`mock ${id}: only ${pool.length} questions for ${track}, need ${count * MOCKS_PER_PAPER}`);
    pool.slice((n - 1) * count, n * count).forEach((q) => qs.push({ ...q, subject: label }));
  }
  // GA: 5 one-mark then 5 two-mark questions; the other 55: 25 one-mark and 30 two-mark.
  return qs.map((q, i) => ({ ...q, marks: i < 10 ? (i < 5 ? 1 : 2) : (i - 10) % 11 < 5 ? 1 : 2 }));
}

function mockPage(all, id, n) {
  const paper = mockPapers[id];
  const root = '../';
  const qs = mockQuestions(all, id, n);
  const items = qs
    .map(
      (q, i) => `<section class="mock-q" id="q${i + 1}" data-marks="${q.marks}" data-subject="${escapeHtml(q.subject)}">
<p class="mock-q-head"><strong>Q${i + 1}</strong> <span>${q.marks} mark${q.marks > 1 ? 's' : ''}</span> <span>${escapeHtml(q.subject)}</span> <a href="${root}${q.from}">lesson</a></p>
${renderQuiz(q.src, inline)}
</section>`,
    )
    .join('\n');
  const body = `<section class="section"><div class="container mock" data-mock="${id}-${n}" data-minutes="180">
  <nav class="breadcrumb" aria-label="Breadcrumb"><a href="${root}index.html">Home</a><span>/</span><a href="${root}${paper.hub}">${paper.title}</a><span>/</span><a href="index.html">Mock tests</a><span>/</span>Mock ${n}</nav>
  <h1 class="section-title">${paper.title} Full-Length Mock Test ${n}</h1>
  <p class="section-lead">65 questions, 100 marks, 3 hours, in the GATE format: General Aptitude (15 marks) and the technical section (85 marks). MCQs carry negative marks (−1/3 for 1 mark, −2/3 for 2 marks); MSQs and NATs do not. The timer starts when you press Start; answers and explanations appear after you submit.</p>
  <div class="mock-bar" data-mock-bar><button type="button" class="btn btn-primary" data-mock-start>Start the test</button><span class="mock-timer" data-mock-timer>3:00:00</span><span data-mock-count>0 / 65 answered</span><button type="button" class="btn btn-sm" data-mock-submit hidden>Submit</button></div>
  <nav class="mock-palette" data-mock-palette aria-label="Question palette"></nav>
  <div class="mock-result" data-mock-result hidden></div>
  <div class="mock-questions" data-mock-questions hidden>
${items}
  </div>
</div></section>`;
  return layout({
    titles: [`${paper.title} Mock Test ${n}: Free Full-Length Test`, `${paper.title} Mock Test ${n}`],
    description: `Free ${paper.title} full-length mock test ${n}: 65 original GATE-style questions, 3-hour timer, GATE marking with negative marks, instant score and subject-wise analysis.`,
    head: jsonLd(breadcrumbs([['Home', 'index.html'], [paper.title, paper.hub], ['Mock tests', 'mock/index.html'], [`Mock ${n}`, `mock/${id}-${n}.html`]])),
    root,
    body,
    scripts: ['mock.js'],
  });
}

function mockIndexPage() {
  const root = '../';
  const rows = Object.entries(mockPapers)
    .map(
      ([id, p]) => `<li class="gate-subject"><span class="chapter-num">${p.title.slice(5)}</span><div><strong>${p.title}</strong><span>${Array.from({ length: MOCKS_PER_PAPER }, (_, k) => `<a href="${id}-${k + 1}.html" data-mock-link="${id}-${k + 1}">Mock ${k + 1}</a>`).join(' &middot; ')}</span></div></li>`,
    )
    .join('');
  const body = `<section class="section"><div class="container">
  <nav class="breadcrumb" aria-label="Breadcrumb"><a href="${root}index.html">Home</a><span>/</span>Mock tests</nav>
  <h1 class="section-title">Free GATE full-length mock tests</h1>
  <p class="section-lead">Each mock has 65 questions worth 100 marks with a 3-hour timer and GATE's marking scheme, drawn in proportion to the syllabus. Your best score is saved in this browser.</p>
  <ol class="gate-list">${rows}</ol>
</div></section>`;
  return layout({
    titles: ['Free GATE Mock Tests 2027: Full-Length, Timed', 'Free GATE Mock Tests'],
    description: 'Free full-length GATE mock tests for CS, DA, CE, ME, EE and EC: 65 questions, 100 marks, 3-hour timer, negative marking and subject-wise score analysis.',
    head: jsonLd(breadcrumbs([['Home', 'index.html'], ['Mock tests', 'mock/index.html']])),
    root,
    body,
    scripts: ['mock.js'],
  });
}

export function build() {
  if (existsSync(OUT)) rmSync(OUT, { recursive: true });
  mkdirSync(OUT, { recursive: true });
  cpSync(join(SRC, 'assets'), join(OUT, 'assets'), { recursive: true });

  const all = {};
  for (const track of tracks) all[track.id] = loadLessons(track.id);

  write('index.html', homePage(all));
  write('playground.html', playgroundPage(all));
  for (const paper of Object.values(gatePapers)) write(paper.file, gatePage(all, paper));
  write('mock/index.html', mockIndexPage());
  for (const id of Object.keys(mockPapers)) {
    for (let n = 1; n <= MOCKS_PER_PAPER; n++) write(`mock/${id}-${n}.html`, mockPage(all, id, n));
  }
  write('404.html', notFoundPage());
  write('.nojekyll', '');
  write('CNAME', new URL(site.url).host + '\n');
  let count = 5;
  for (const file of readdirSync(join(SRC, 'pages')).filter((f) => f.endsWith('.md'))) {
    write(file.replace(/\.md$/, '.html'), infoPage(file));
    count++;
  }
  for (const lang of tracks) {
    const lessons = all[lang.id];
    write(`${lang.id}/index.html`, languagePage(lang, lessons));
    lessons.forEach((_, i) => write(`${lang.id}/${lessons[i].slug}.html`, lessonPage(lang, lessons, i)));
    count += 1 + lessons.length;
  }
  const urls = pages.map((p) => `  <url><loc>${site.url}${p.replace(/(^|\/)index\.html$/, '$1')}</loc></url>`);
  write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`);
  if (site.adsenseClient) {
    write('ads.txt', `google.com, ${site.adsenseClient.replace(/^ca-/, '')}, DIRECT, f08c47fec0942fa0\n`);
  }
  write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${site.url}sitemap.xml\n`);
  return count;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const n = build();
  console.log(`Built ${n} pages for ${site.name} into dist/`);
}
