// Build-time diagrams for lessons, rendered to inline SVG (no dependencies).
// Colours come from CSS variables, so diagrams follow light and dark mode.
//
//   ```flowchart                 ```tree                    ```pipeline
//   caption: Checking a result   caption: Collections       caption: Compiling Java
//   start: Start                 Collection                 Main.java | source code
//   io: Read marks                 List                     javac
//   if: marks >= 40?                 ArrayList              Main.class | bytecode
//     yes:                         Set                      JVM
//       io: Print "Pass"             HashSet
//     no:
//       io: Print "Fail"
//   end: End
//   ```
//
// Flowchart lines: start/end/step/io/if/while. `if` takes indented `yes:` and
// optional `no:` blocks; `while` takes an indented body that loops back.
import { escapeHtml } from './highlight.mjs';

const CHAR_W = 7.4; // rough width of one character at 13px
const NODE_H = 40;
const DIAMOND_H = 64;
const GAP = 30;
const PAD = 16;

const textWidth = (s) => s.length * CHAR_W;
let idCounter = 0;

function arrowMarker(id) {
  return `<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="currentColor"/></marker></defs>`;
}

function svgWrap(width, height, body, caption, kind) {
  const id = `dg${++idCounter}`;
  const svg = `<svg class="diagram-svg" viewBox="0 0 ${Math.ceil(width)} ${Math.ceil(height)}" width="${Math.ceil(width)}" role="img" aria-label="${escapeHtml(caption || kind)}">${arrowMarker(id)}${body.replaceAll('__ARROW__', `url(#${id})`)}</svg>`;
  return `<figure class="diagram diagram-${kind}"><div class="diagram-scroll">${svg}</div>${caption ? `<figcaption>${escapeHtml(caption)}</figcaption>` : ''}</figure>`;
}

const line = (pts, arrow = true) =>
  `<polyline class="dg-line" points="${pts.map((p) => p.join(',')).join(' ')}"${arrow ? ' marker-end="__ARROW__"' : ''}/>`;
const label = (x, y, text, anchor = 'middle') =>
  `<text class="dg-label" x="${x}" y="${y}" text-anchor="${anchor}">${escapeHtml(text)}</text>`;
const nodeText = (x, y, text) => `<text class="dg-text" x="${x}" y="${y + 4.5}" text-anchor="middle">${escapeHtml(text)}</text>`;

/* ---------------- Flowchart ---------------- */

function parseIndented(src) {
  const root = { children: [] };
  const stack = [{ indent: -1, node: root }];
  for (const raw of src.split('\n')) {
    if (!raw.trim() || raw.trim().startsWith('#')) continue;
    const indent = raw.match(/^\s*/)[0].length;
    const m = raw.trim().match(/^(\w+):\s*(.*)$/);
    if (!m) throw new Error(`flowchart: cannot read line "${raw.trim()}"`);
    const node = { kind: m[1], text: m[2], children: [] };
    while (stack[stack.length - 1].indent >= indent) stack.pop();
    stack[stack.length - 1].node.children.push(node);
    stack.push({ indent, node });
  }
  return root.children;
}

// Every layout returns { l, r, h, draw(cx, y) } where l/r are the extents left
// and right of the centre line, the inlet is (cx, y) and the outlet is (cx, y + h).
function layoutNode(n) {
  const tw = textWidth(n.text);
  const hw = Math.max(55, tw / 2 + PAD);
  const shapes = {
    start: (cx, y) => `<rect class="dg-node dg-terminal" x="${cx - hw}" y="${y}" width="${hw * 2}" height="${NODE_H}" rx="20"/>`,
    end: (cx, y) => `<rect class="dg-node dg-terminal" x="${cx - hw}" y="${y}" width="${hw * 2}" height="${NODE_H}" rx="20"/>`,
    step: (cx, y) => `<rect class="dg-node" x="${cx - hw}" y="${y}" width="${hw * 2}" height="${NODE_H}" rx="6"/>`,
    io: (cx, y) => {
      const s = 12;
      return `<polygon class="dg-node dg-io" points="${cx - hw + s},${y} ${cx + hw + s},${y} ${cx + hw - s},${y + NODE_H} ${cx - hw - s},${y + NODE_H}"/>`;
    },
  };
  const shape = shapes[n.kind];
  if (!shape) throw new Error(`flowchart: unknown node type "${n.kind}"`);
  const extra = n.kind === 'io' ? 12 : 0;
  return { l: hw + extra, r: hw + extra, h: NODE_H, draw: (cx, y) => shape(cx, y) + nodeText(cx, y + NODE_H / 2, n.text) };
}

function diamond(text) {
  const tw = textWidth(text);
  const hw = Math.max(tw * 0.68, tw / 2 + 30, 60);
  return {
    hw,
    draw: (cx, y) =>
      `<polygon class="dg-node dg-decision" points="${cx},${y} ${cx + hw},${y + DIAMOND_H / 2} ${cx},${y + DIAMOND_H} ${cx - hw},${y + DIAMOND_H / 2}"/>` +
      nodeText(cx, y + DIAMOND_H / 2, text),
  };
}

function layoutSequence(nodes) {
  const items = nodes.map(layoutBlock);
  if (!items.length) return { l: 0, r: 0, h: 0, draw: () => '' };
  const h = items.reduce((s, it) => s + it.h, 0) + GAP * (items.length - 1);
  return {
    l: Math.max(...items.map((i) => i.l)),
    r: Math.max(...items.map((i) => i.r)),
    h,
    draw(cx, y) {
      let out = '';
      items.forEach((it, i) => {
        out += it.draw(cx, y);
        y += it.h;
        if (i < items.length - 1) {
          out += line([[cx, y], [cx, y + GAP]]);
          y += GAP;
        }
      });
      return out;
    },
  };
}

function layoutIf(n) {
  const d = diamond(n.text);
  const yes = layoutSequence((n.children.find((c) => c.kind === 'yes') || { children: [] }).children);
  const no = layoutSequence((n.children.find((c) => c.kind === 'no') || { children: [] }).children);
  const dl = Math.max(d.hw, yes.r + 24);
  const dr = Math.max(d.hw, no.h ? no.l + 24 : d.hw);
  const branchH = Math.max(yes.h, no.h);
  const h = DIAMOND_H + 26 + branchH + 18 + 22;
  return {
    // the extra 34 leaves room for the Yes / No labels beside the diamond
    l: Math.max(d.hw + 34, dl + yes.l),
    r: Math.max(d.hw + 34, dr + (no.h ? no.r : 0)),
    h,
    draw(cx, y) {
      const mid = y + DIAMOND_H / 2;
      const top = y + DIAMOND_H + 26;
      const merge = y + h;
      let out = d.draw(cx, y);
      const xl = cx - dl, xr = cx + dr;
      out += line([[cx - d.hw, mid], [xl, mid], [xl, top]], yes.h > 0) + label(cx - d.hw - 6, mid - 7, 'Yes', 'end');
      out += line([[cx + d.hw, mid], [xr, mid], [xr, no.h ? top : merge - 22]], no.h > 0) + label(cx + d.hw + 6, mid - 7, 'No', 'start');
      out += yes.draw(xl, top) + no.draw(xr, top);
      out += line([[xl, top + yes.h], [xl, merge - 22]], false);
      if (no.h) out += line([[xr, top + no.h], [xr, merge - 22]], false);
      out += line([[xl, merge - 22], [xr, merge - 22]], false) + line([[cx, merge - 22], [cx, merge]], false);
      return out;
    },
  };
}

function layoutWhile(n) {
  const d = diamond(n.text);
  const body = layoutSequence(n.children);
  const L = Math.max(d.hw, body.l) + 26;
  const R = Math.max(d.hw, body.r) + 26;
  const h = DIAMOND_H + 26 + body.h + 18 + 22;
  return {
    l: L + 4,
    r: R + 4,
    h,
    draw(cx, y) {
      const mid = y + DIAMOND_H / 2;
      const top = y + DIAMOND_H + 26;
      const back = top + body.h + 18;
      let out = d.draw(cx, y);
      out += line([[cx, y + DIAMOND_H], [cx, top]]) + label(cx + 6, y + DIAMOND_H + 16, 'Yes', 'start');
      out += body.draw(cx, top);
      out += line([[cx, top + body.h], [cx, back], [cx - L, back], [cx - L, mid], [cx - d.hw, mid]]);
      out += line([[cx + d.hw, mid], [cx + R, mid], [cx + R, y + h], [cx, y + h]], false) + label(cx + d.hw + 6, mid - 7, 'No', 'start');
      return out;
    },
  };
}

function layoutBlock(n) {
  if (n.kind === 'if') return layoutIf(n);
  if (n.kind === 'while') return layoutWhile(n);
  return layoutNode(n);
}

function flowchart(src) {
  const { caption, rest } = takeCaption(src);
  const seq = layoutSequence(parseIndented(rest));
  const margin = 12;
  const width = seq.l + seq.r + margin * 2;
  const body = seq.draw(seq.l + margin, margin);
  return svgWrap(width, seq.h + margin * 2, body, caption, 'flowchart');
}

/* ---------------- Tree (hierarchy) ---------------- */

function tree(src) {
  const { caption, rest } = takeCaption(src);
  const roots = [];
  const stack = [];
  for (const raw of rest.split('\n')) {
    if (!raw.trim()) continue;
    const indent = raw.match(/^\s*/)[0].length;
    const [name, note] = raw.trim().split('|').map((s) => s.trim());
    const node = { name, note, children: [] };
    while (stack.length && stack[stack.length - 1].indent >= indent) stack.pop();
    if (stack.length) stack[stack.length - 1].node.children.push(node);
    else roots.push(node);
    stack.push({ indent, node });
  }
  const BOX_H = 34, LEVEL = 74, HGAP = 18;
  const boxW = (n) => Math.max(textWidth(n.name), n.note ? textWidth(n.note) * 0.85 : 0) + 26;
  // Width each subtree needs, then place children left to right under their parent.
  const need = (n) => (n.w = Math.max(boxW(n), n.children.reduce((s, c) => s + need(c), 0) + HGAP * Math.max(0, n.children.length - 1)));
  let depth = 0;
  const place = (n, x0, level) => {
    depth = Math.max(depth, level);
    n.y = level * LEVEL;
    let x = x0 + (n.w - (n.children.reduce((s, c) => s + c.w, 0) + HGAP * Math.max(0, n.children.length - 1))) / 2;
    for (const c of n.children) {
      place(c, x, level + 1);
      x += c.w + HGAP;
    }
    n.cx = n.children.length ? (n.children[0].cx + n.children[n.children.length - 1].cx) / 2 : x0 + n.w / 2;
  };
  let x = 0;
  for (const r of roots) {
    need(r);
    place(r, x, 0);
    x += r.w + HGAP * 2;
  }
  const margin = 12;
  let out = '';
  const draw = (n) => {
    const w = boxW(n);
    const h = n.note ? BOX_H + 12 : BOX_H;
    out += `<rect class="dg-node${n.children.length ? ' dg-parent' : ''}" x="${n.cx - w / 2 + margin}" y="${n.y + margin}" width="${w}" height="${h}" rx="6"/>`;
    out += `<text class="dg-text" x="${n.cx + margin}" y="${n.y + margin + (n.note ? 15 : 21.5)}" text-anchor="middle">${escapeHtml(n.name)}</text>`;
    if (n.note) out += `<text class="dg-note" x="${n.cx + margin}" y="${n.y + margin + 33}" text-anchor="middle">${escapeHtml(n.note)}</text>`;
    for (const c of n.children) {
      const py = n.y + margin + h, cy = c.y + margin, my = py + (cy - py) / 2;
      out += line([[n.cx + margin, py], [n.cx + margin, my], [c.cx + margin, my], [c.cx + margin, cy]], false);
      draw(c);
    }
  };
  roots.forEach(draw);
  const width = x - HGAP * 2 + margin * 2;
  const wide = svgWrap(width, depth * LEVEL + BOX_H + 12 + margin * 2, out, caption, 'tree');
  // Wide trees become unreadable when scaled down, so they switch to an
  // indented, top-to-bottom layout: always for very wide trees, and on
  // narrow screens (via CSS) for medium ones.
  if (width <= 560) return wide;
  const tall = treeVertical(roots, caption);
  if (width > 720) return tall;
  return wide.replace('class="diagram diagram-tree"', 'class="diagram diagram-tree diagram-wide-only"') +
    tall.replace('class="diagram diagram-tree"', 'class="diagram diagram-tree diagram-narrow-only"');
}

function treeVertical(roots, caption) {
  const ROW = 44, INDENT = 30, BOX_H = 32, margin = 12;
  let out = '', row = 0, maxX = 0;
  const draw = (n, depth) => {
    const x = margin + depth * INDENT, y = margin + row * ROW;
    const w = textWidth(n.name) + (n.note ? textWidth(n.note) * 0.85 + 30 : 0) + 24;
    maxX = Math.max(maxX, x + w);
    out += `<rect class="dg-node${n.children.length ? ' dg-parent' : ''}" x="${x}" y="${y}" width="${w}" height="${BOX_H}" rx="6"/>`;
    out += `<text class="dg-text" x="${x + 12}" y="${y + 20.5}">${escapeHtml(n.name)}`;
    if (n.note) out += `<tspan class="dg-note" dx="10">${escapeHtml(n.note)}</tspan>`;
    out += '</text>';
    row++;
    for (const c of n.children) {
      const cy = margin + row * ROW + BOX_H / 2;
      out += line([[x + 14, y + BOX_H], [x + 14, cy], [x + INDENT, cy]], false);
      draw(c, depth + 1);
    }
  };
  roots.forEach((r) => draw(r, 0));
  return svgWrap(maxX + margin, row * ROW - (ROW - BOX_H) + margin * 2, out, caption, 'tree');
}

/* ---------------- Pipeline (left to right steps) ---------------- */

function pipeline(src) {
  const { caption, rest } = takeCaption(src);
  const steps = rest.split('\n').filter((l) => l.trim()).map((l) => {
    const [name, note] = l.split('|').map((s) => s.trim());
    return { name, note, w: Math.max(textWidth(name), note ? textWidth(note) * 0.85 : 0) + 28 };
  });
  const H = 56, ARROW = 40, margin = 12;
  let x = margin, out = '';
  steps.forEach((s, i) => {
    out += `<rect class="dg-node${i % 2 ? ' dg-tool' : ''}" x="${x}" y="${margin}" width="${s.w}" height="${H}" rx="8"/>`;
    out += `<text class="dg-text" x="${x + s.w / 2}" y="${margin + (s.note ? 24 : 32.5)}" text-anchor="middle">${escapeHtml(s.name)}</text>`;
    if (s.note) out += `<text class="dg-note" x="${x + s.w / 2}" y="${margin + 42}" text-anchor="middle">${escapeHtml(s.note)}</text>`;
    x += s.w;
    if (i < steps.length - 1) {
      out += line([[x + 4, margin + H / 2], [x + ARROW - 4, margin + H / 2]]);
      x += ARROW;
    }
  });
  return svgWrap(x + margin, H + margin * 2, out, caption, 'pipeline');
}

/* ---------------- Graph (nodes on a circle) ---------------- */

// Lines are edges: "A - B" (undirected), "A -> B" (directed), with an optional
// ": label" for a weight. A line "nodes: A B C" fixes the order around the circle.
function graph(src) {
  const { caption, rest } = takeCaption(src);
  const nodes = [];
  const edges = [];
  const add = (n) => { if (!nodes.includes(n)) nodes.push(n); };
  for (const raw of rest.split('\n')) {
    const l = raw.trim();
    if (!l) continue;
    let m;
    if ((m = l.match(/^nodes:\s*(.*)$/))) { m[1].split(/\s+/).forEach(add); continue; }
    m = l.match(/^(\S+)\s*(->|-)\s*(\S+)(?:\s*:\s*(.+))?$/);
    if (!m) throw new Error(`graph: cannot read "${l}"`);
    add(m[1]); add(m[3]);
    edges.push({ a: m[1], b: m[3], directed: m[2] === '->', label: m[4] });
  }
  const NR = Math.max(19, Math.max(...nodes.map((n) => textWidth(n))) / 2 + 9);   // fit the longest label
  const R = Math.max(70, nodes.length * (NR + 2)), margin = 30;
  const cx = R + margin, cy = R + margin;
  const pos = {};
  nodes.forEach((n, i) => {
    const t = -Math.PI / 2 + (2 * Math.PI * i) / nodes.length;
    pos[n] = [cx + R * Math.cos(t), cy + R * Math.sin(t)];
  });
  let out = '';
  for (const e of edges) {
    const [x1, y1] = pos[e.a], [x2, y2] = pos[e.b];
    const d = Math.hypot(x2 - x1, y2 - y1) || 1;
    const ux = (x2 - x1) / d, uy = (y2 - y1) / d;
    // When both u -> v and v -> u exist, shift each line sideways so they do not overlap.
    const twin = e.directed && edges.some((o) => o.directed && o.a === e.b && o.b === e.a);
    const ox = twin ? -uy * 5 : 0, oy = twin ? ux * 5 : 0;
    const pts = [[x1 + ux * NR + ox, y1 + uy * NR + oy], [x2 - ux * (NR + (e.directed ? 3 : 0)) + ox, y2 - uy * (NR + (e.directed ? 3 : 0)) + oy]];
    out += line(pts.map((p) => p.map((v) => +v.toFixed(1))), e.directed);
    if (e.label) {
      const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
      out += `<rect class="dg-weight-bg" x="${mx - 11}" y="${my - 9}" width="22" height="18" rx="4"/>` + label(mx, my + 4.5, e.label);
    }
  }
  for (const n of nodes) {
    const [x, y] = pos[n];
    out += `<circle class="dg-node dg-vertex" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${NR}"/>` + nodeText(x.toFixed(1), +y.toFixed(1), n);
  }
  return svgWrap(cx * 2, cy * 2, out, caption, 'graph');
}

/* ---------------- Automaton (states in a row) ---------------- */

// A finite automaton, PDA or Turing machine drawn as a state diagram:
//   states: q0 q1 q2      (optional; fixes the left-to-right order)
//   start: q0
//   accept: q2            (one or more states, drawn as double circles)
//   q0 -> q1 : a          (one transition per line; "a, b" for several symbols)
// Neighbouring forward edges are straight; longer forward edges arc above the
// row, backward edges arc below it, and self-loops sit on top of the state.
function automaton(src) {
  const { caption, rest } = takeCaption(src);
  const states = [], edges = [];
  let start = null, accept = [];
  const add = (n) => { if (!states.includes(n)) states.push(n); };
  for (const raw of rest.split('\n')) {
    const l = raw.trim();
    if (!l) continue;
    let m;
    if ((m = l.match(/^states:\s*(.*)$/))) { m[1].split(/\s+/).forEach(add); continue; }
    if ((m = l.match(/^start:\s*(\S+)$/))) { start = m[1]; if (!states.length) add(start); continue; }
    if ((m = l.match(/^accept:\s*(.*)$/))) { accept = m[1].split(/\s+/).filter(Boolean); continue; }
    m = l.match(/^(\S+)\s*->\s*(\S+)\s*:\s*(.+)$/);
    if (!m) throw new Error(`automaton: cannot read "${l}"`);
    add(m[1]); add(m[2]);
    edges.push({ a: m[1], b: m[2], label: m[3].trim() });
  }
  accept.forEach(add);
  const r = Math.max(20, Math.max(...states.map((n) => textWidth(n))) / 2 + 8);
  const widest = Math.max(0, ...edges.map((e) => textWidth(e.label)));
  const step = Math.max(110, widest + 2 * r + 30);
  const idx = (n) => states.indexOf(n);
  const arcHeight = (e) => {
    const span = Math.abs(idx(e.b) - idx(e.a));
    const twin = edges.some((o) => o.a === e.b && o.b === e.a);
    if (span === 1) return twin || idx(e.b) < idx(e.a) ? 24 : 0;   // straight only for a lone forward edge
    return 30 + 26 * (span - 1);
  };
  const forward = edges.filter((e) => idx(e.b) > idx(e.a)), backward = edges.filter((e) => idx(e.b) < idx(e.a));
  const top = Math.max(edges.some((e) => e.a === e.b) ? 62 : 16, ...forward.map((e) => arcHeight(e) + 22));
  const bottom = Math.max(16, ...backward.map((e) => arcHeight(e) + 22));
  const left = start ? 44 : 14;
  const y = top + r;
  const x = (n) => left + r + idx(n) * step;
  const f = (v) => +v.toFixed(1);
  const tag = (lx, ly, text) => {
    const w = textWidth(text) + 8;
    return `<rect class="dg-weight-bg" x="${f(lx - w / 2)}" y="${f(ly - 9)}" width="${f(w)}" height="18" rx="4"/>` + label(f(lx), f(ly + 4.5), text);
  };
  const path = (d) => `<path class="dg-line" d="${d}" marker-end="__ARROW__"/>`;
  let out = '';
  if (start) out += line([[f(x(start) - r - 32), y], [f(x(start) - r - 3), y]]);
  for (const e of edges) {
    const xa = x(e.a), xb = x(e.b);
    if (e.a === e.b) {
      const dx = r * 0.42, dy = r * 0.9;
      out += path(`M${f(xa - dx)} ${f(y - dy)} C${f(xa - 28)} ${f(y - r - 46)} ${f(xa + 28)} ${f(y - r - 46)} ${f(xa + dx)} ${f(y - dy - 2)}`);
      out += tag(xa, y - r - 38, e.label);
      continue;
    }
    const h = arcHeight(e);
    if (h === 0) {
      out += line([[f(xa + r), y], [f(xb - r - 3), y]]);
      out += tag((xa + xb) / 2, y - 12, e.label);
      continue;
    }
    const dir = xb > xa ? -1 : 1;              // -1: arc above (forward), 1: arc below (backward)
    const ang = 0.9;                            // leave and enter about 50 degrees off the row
    const sx = xa + Math.sign(xb - xa) * r * Math.cos(ang), sy = y + dir * r * Math.sin(ang);
    const ex = xb - Math.sign(xb - xa) * (r + 3) * Math.cos(ang), ey = y + dir * (r + 3) * Math.sin(ang);
    const cy = y + dir * (r * Math.sin(ang) + 2 * h);
    out += path(`M${f(sx)} ${f(sy)} Q${f((sx + ex) / 2)} ${f(cy)} ${f(ex)} ${f(ey)}`);
    out += tag((xa + xb) / 2, (sy + ey) / 4 + cy / 2, e.label);
  }
  for (const n of states) {
    out += `<circle class="dg-node dg-vertex" cx="${f(x(n))}" cy="${y}" r="${f(r)}"/>`;
    if (accept.includes(n)) out += `<circle class="dg-node dg-vertex" cx="${f(x(n))}" cy="${y}" r="${f(r - 5)}"/>`;
    out += nodeText(f(x(n)), y, n);
  }
  const width = left + 2 * r + (states.length - 1) * step + 14;
  return svgWrap(width, y + r + bottom, out, caption, 'automaton');
}

function takeCaption(src) {
  const m = src.match(/^\s*caption:\s*(.*)\n/);
  return m ? { caption: m[1].trim(), rest: src.slice(m[0].length) } : { caption: '', rest: src };
}

const renderers = { flowchart, tree, pipeline, graph, automaton };
export const isDiagram = (lang) => lang in renderers;
export const renderDiagram = (lang, src) => renderers[lang](src);
