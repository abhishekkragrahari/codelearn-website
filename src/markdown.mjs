// A small Markdown subset, just enough for lessons:
//   front matter, ## / ### headings, paragraphs, - and 1. lists,
//   > callouts, | tables |, fenced code blocks, and ```output blocks that
//   attach to the code block right above them.
import { escapeHtml, highlight } from './highlight.mjs';

export function parseFrontMatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return { data: {}, body: text };
  const data = {};
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':');
    if (i > 0) data[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return { data, body: text.slice(m[0].length) };
}

export function slugify(s) {
  return s.toLowerCase().replace(/<[^>]+>/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function inline(text) {
  const codes = [];
  let s = text.replace(/`([^`]+)`/g, (_, c) => {
    codes.push(`<code>${escapeHtml(c)}</code>`);
    return `\u0000${codes.length - 1}\u0000`;
  });
  // "\*" is a literal star (Σ\*, L\*), never the start of emphasis.
  s = escapeHtml(s.replace(/\\\*/g, '\u0001'))
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*\s][^*]*?)\*/g, '$1<em>$2</em>')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>');
  // A few harmless inline tags are allowed in lesson text: <sub>, <sup> and <br>.
  s = s.replace(/&lt;(\/?)(sub|sup)&gt;/g, '<$1$2>').replace(/&lt;br\s*\/?&gt;/g, '<br>');
  return s.replace(/\u0000(\d+)\u0000/g, (_, i) => codes[+i]).replace(/\u0001/g, '*');
}

// Turns markdown into a list of blocks. Code blocks are kept as data so the
// page template can decide how to render them (copy/run buttons etc.).
export function parseBlocks(md) {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const blocks = [];
  let para = [];
  const flush = () => {
    if (para.length) blocks.push({ type: 'p', html: inline(para.join(' ')) });
    para = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const fence = line.match(/^```\s*([\w+-]*)\s*$/);
    if (fence) {
      flush();
      const body = [];
      for (i++; i < lines.length && !/^```\s*$/.test(lines[i]); i++) body.push(lines[i]);
      const code = body.join('\n');
      const prev = blocks[blocks.length - 1];
      if (fence[1] === 'output' && prev && prev.type === 'code' && prev.output == null) prev.output = code;
      else blocks.push({ type: 'code', lang: fence[1] || 'text', code, output: null });
      continue;
    }
    const h = line.match(/^(#{2,3})\s+(.*)$/);
    if (h) {
      flush();
      blocks.push({ type: 'h', level: h[1].length, html: inline(h[2]), id: slugify(h[2]) });
      continue;
    }
    if (/^>\s?/.test(line)) {
      flush();
      const body = [];
      for (; i < lines.length && /^>\s?/.test(lines[i]); i++) body.push(lines[i].replace(/^>\s?/, ''));
      i--;
      const text = body.join(' ');
      const kind = (text.match(/^\*\*(Note|Tip|Warning):\*\*/) || [, 'Note'])[1].toLowerCase();
      blocks.push({ type: 'callout', kind, html: inline(text) });
      continue;
    }
    // A table: a | header | row, a | --- | separator row, then body rows.
    if (/^\|.*\|\s*$/.test(line) && /^\|(\s*:?-+:?\s*\|)+\s*$/.test(lines[i + 1] || '')) {
      flush();
      // "\|" inside a cell is a literal bar, not a column separator.
      const cells = (row) => row.trim().replace(/^\||\|$/g, '').split(/(?<!\\)\|/).map((c) => inline(c.trim().replace(/\\\|/g, '|')));
      const head = cells(line);
      const rows = [];
      for (i += 2; i < lines.length && /^\|.*\|\s*$/.test(lines[i]); i++) rows.push(cells(lines[i]));
      i--;
      blocks.push({ type: 'table', head, rows });
      continue;
    }
    const li = line.match(/^(\s*)(-|\d+\.)\s+(.*)$/);
    if (li) {
      flush();
      const ordered = li[2] !== '-';
      const items = [];
      for (; i < lines.length; i++) {
        const m = lines[i].match(/^\s*(-|\d+\.)\s+(.*)$/);
        if (m) items.push(m[2]);
        else if (/^\s{2,}\S/.test(lines[i]) && items.length) items[items.length - 1] += ' ' + lines[i].trim();
        else break;
      }
      i--;
      blocks.push({ type: ordered ? 'ol' : 'ul', items: items.map(inline) });
      continue;
    }
    if (line.trim() === '') flush();
    else para.push(line.trim());
  }
  flush();
  return blocks;
}

export function renderBlocks(blocks, renderCode) {
  return blocks
    .map((b) => {
      switch (b.type) {
        case 'p':
          return `<p>${b.html}</p>`;
        case 'h':
          return `<h${b.level} id="${b.id}">${b.html}</h${b.level}>`;
        case 'ul':
        case 'ol':
          return `<${b.type}>${b.items.map((x) => `<li>${x}</li>`).join('')}</${b.type}>`;
        case 'table':
          return `<div class="table-wrap"><table><thead><tr>${b.head.map((c) => `<th>${c}</th>`).join('')}</tr></thead><tbody>${b.rows
            .map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`)
            .join('')}</tbody></table></div>`;
        case 'callout':
          return `<aside class="callout callout-${b.kind}">${b.html}</aside>`;
        case 'html':
          return b.html;
        case 'code':
          return renderCode ? renderCode(b) : `<pre><code>${highlight(b.code, b.lang)}</code></pre>`;
      }
    })
    .join('\n');
}
