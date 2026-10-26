# GateShala

A free programming-tutorial website with short lessons for **Python, C, Java and JavaScript**, plus GATE CS subject tracks (Data Structures & Algorithms, Operating Systems, Databases, Computer Networks, Theory of Computation, Digital Logic, Computer Organization, Compiler Design, Discrete Mathematics, Engineering Mathematics and General Aptitude: all 12 GATE CS subjects) collected on a **GATE CS** hub page.
It has syntax-highlighted examples with Copy buttons, and a playground where JavaScript runs in the browser.

- Home page with a language picker
- Tutorials split into chapters, with a sidebar of topics on the left
- Data Structures & Algorithms track: 23 lessons covering the GATE CS syllabus. Each lesson has figures, the same code in Java, Python and C (switchable tabs), and interactive GATE-style practice questions (MCQ, MSQ, NAT).
- Operating Systems track: 12 lessons (processes, scheduling, synchronization, deadlocks, memory, paging, virtual memory, file systems, disk scheduling) with C and Python simulations and GATE-style questions.
- Databases (DBMS) track: 13 lessons (ER model, relational algebra and calculus, SQL, functional dependencies, normalization, transactions, concurrency control, indexing). Every SQL example runs on a real SQLite database at build time.
- Computer Networks track: 12 lessons (layering, switching, framing and CRC, sliding windows, MAC and Ethernet, IP addressing and subnets, IP/ARP/DHCP/ICMP/NAT, routing, TCP/UDP and sockets, congestion control, application protocols), with every numerical computed by a program.
- Theory of Computation track: 12 lessons (DFA, NFA, minimization, regular expressions, pumping lemmas, CFGs and CYK, PDAs, Turing machines, undecidability), with state diagrams and Python simulators for every machine.
- Digital Logic track: 10 lessons (number systems, 2's complement, IEEE 754, Boolean algebra, gates, K-maps and Quine–McCluskey, combinational circuits, flip-flops, counters), with truth tables and minimizations computed by programs.
- Computer Organization & Architecture track: 12 lessons (performance, instruction formats, addressing modes, Booth multiplication, data path and microprogrammed control, pipelining and hazards, caches, memory, I/O and DMA), with pipeline and cache simulators.
- Compiler Design track: 10 lessons (lexical analysis, LL(1) and LR parsing, syntax-directed translation, intermediate code, runtime environments, optimization, data-flow analysis), with working Python pieces of a compiler.
- Discrete Mathematics track: 10 lessons (propositional and first-order logic, sets and functions, relations, lattices, groups, combinatorics, recurrences, graph theory), with counting formulas checked by brute-force enumeration.
- Engineering Mathematics track: 9 lessons (matrices, linear systems, eigenvalues, limits and maxima, integration, probability, distributions, statistics), checked with exact fractions, Simpson's rule and enumeration.
- General Aptitude track: 10 lessons (numbers and percentages, ratios and averages, time and work, speed and distance, profit and interest, data interpretation, logical and spatial reasoning, verbal ability).
- GATE CS hub (`gate.html`) listing every GATE CS subject, with lesson and question counts for the ready ones.
- Every example shows its exact output. JavaScript examples also have a **Run** button.
- Playground page that really runs code: JavaScript and Python in the browser, C and Java on a free online compiler, with an input (stdin) box.
- Responsive layout, plus light and dark mode (follows the system setting, with a toggle in the header)
- Plain HTML, CSS and JS with **no npm dependencies**. A small Node script generates the pages.

All lesson text, the name, the logo and the design are original.

## Run it locally

You need [Node.js](https://nodejs.org) 18 or newer. There is nothing to install, so `npm install` is not needed.

```bash
git clone https://github.com/abhishekkragrahari/codelearn-website.git
cd codelearn-website
npm run dev
```

Then open <http://localhost:8080>. The dev server rebuilds the site whenever a file in `src/` changes, so after an edit you only need to refresh the browser.

Other commands:

| Command | What it does |
| --- | --- |
| `npm run build` | Builds the static site into `dist/` |
| `npm run check` | Builds, then checks that every internal link points to a real file |
| `npm run verify-examples` | Runs every lesson example with real `python3`, `gcc`, `java` and `node` (SQL examples on SQLite through Python's `sqlite3`), and fails if any output differs from what the page shows. Also recomputes every numerical quiz answer. A language whose tool is missing is skipped. |

## Turn on GitHub Pages (one-time setup)

The workflow in `.github/workflows/deploy.yml` builds the site on every push and pull request.
It deploys only from `main`, and only after you switch Pages on once:

1. Open the repository on GitHub and go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**. Do not choose "Deploy from a branch".
3. Merge the pull request into `main`, or open **Actions → Build and deploy to GitHub Pages → Run workflow**.
4. When the run finishes, the site URL appears on the run summary and under Settings → Pages:
   `https://abhishekkragrahari.github.io/codelearn-website/`

Notes:

- Pages for a **private** repository needs a paid GitHub plan (Pro, Team or Enterprise); for a public repository it is free.
- If you later use a custom domain or a `<user>.github.io` repository, the site is served from `/`. In that case set `SITE_BASE: /` in the workflow. It is only used by the 404 page.

## Project layout

```text
src/
  site.mjs              site name, languages, topic tracks (DSA, OS, DBMS, CN, TOC, DL, COA, CD, DM, EM, GA) and the GATE subject list
  content/<language>/   one Markdown file per lesson (01-..., 02-... sets the order)
  assets/css/style.css  all styles; colours are CSS variables, with dark mode at the top
  assets/js/            app.js (theme, menus, copy/run), runner.js (JS sandbox),
                        playground.js, inspect.js (console.log formatting)
  highlight.mjs         small syntax highlighter used at build time
  diagrams.mjs          flowchart / tree / pipeline / graph / automaton figures rendered to SVG
  quiz.mjs              GATE-style practice questions
  markdown.mjs          small Markdown parser for lessons
  templates.mjs         page layout, header, sidebar, code blocks
scripts/                build, dev server, link checker, example verifier
```

## Adding a lesson

Create a file such as `src/content/python/06-lists.md`:

````markdown
---
title: Lists
chapter: Data Structures
description: One sentence shown under the title and on the language page.
---
Normal paragraphs, `inline code`, **bold**, [links](https://example.com).

## A heading

```python
print([1, 2, 3])
```
```output
[1, 2, 3]
```

> **Tip:** Blockquotes become callouts. Start them with Note:, Tip: or Warning:.
````

- An `output` block placed right after a code block becomes that example's output panel.
- A new `chapter` name creates a new chapter in the sidebar.
- `<sub>`, `<sup>` and `<br>` may be used in text; any other HTML is shown as text.
- Write `\*` for a literal star (for example Σ\*), and `\|` for a literal bar inside a table cell.
- Run `npm run verify-examples` to check that the output you wrote is correct.

### Figures and flowcharts

Several kinds of diagram can be written straight into a lesson. They are drawn as SVG at build time, follow light and dark mode, and need no extra library.

````markdown
```flowchart
caption: Checking a result
start: Start
io: Read marks
if: marks >= 40?
  yes:
    io: Print "Pass"
  no:
    io: Print "Fail"
end: End
```
````

- `flowchart`: one node per line. The node types are `start`, `end`, `step`, `io` (input/output), `if` (with indented `yes:` and an optional `no:` block, which can nest) and `while` (its indented body loops back to the condition).
- `tree`: a hierarchy, with one name per line and indentation for children. Add `| note` after a name for a small second line. Wide trees switch to a top-to-bottom layout on small screens.
- `pipeline`: steps from left to right, one per line, also with an optional `| note`.
- `graph`: one edge per line (`A - B` undirected, `A -> B` directed, `: 5` for a weight). The vertices are drawn on a circle; a `nodes: A B C` line sets their order.
- `automaton`: a state diagram. `start: q0`, `accept: q2` (double circles), an optional `states:` line for the left-to-right order, then one transition per line such as `q0 -> q1 : a, b`. Self-loops are drawn above a state, longer forward edges arc above the row and backward edges below it.

### Code in several languages (tabs)

Code blocks in **different** languages that follow each other directly, each optionally with its own `output` block, are shown as one block with a tab for each language. The reader's choice of tab is remembered across pages. The DSA track uses this for its Java, Python and C versions.

### GATE-style practice questions

````markdown
```quiz
q: Which traversal of a BST visits the keys in sorted order?
- Preorder
* Inorder
- Postorder
explain: Inorder visits the left subtree, then the node, then the right subtree.
```

```quiz
q: How many moves does the Tower of Hanoi need for 8 discs?
answer: 255
verify: 2 ** 8 - 1
explain: M(n) = 2ⁿ − 1.
```
````

- `*` marks a correct option and `-` a wrong one. One `*` makes an MCQ; several make an MSQ.
- `answer:` makes a NAT (numerical) question.
- `verify:` is a Python expression that `npm run verify-examples` evaluates; the build fails if it does not equal the answer. For longer checks, leave `verify:` empty and indent a Python program under it that prints the answer.
- `code: c` (or `java`, `python`, `javascript`, `sql`) followed by an indented program shows that program in the question, for "what does this print?" questions. `npm run verify-examples` compiles and runs it, and its output must equal the NAT answer or the text of the one correct option. A `sql` program runs on a fresh SQLite database and prints bare values, one row per line. C quiz programs may compile with warnings, since GATE questions are often deliberately tricky; lesson examples must compile cleanly with `-Wall -Werror`.

To add a whole new language, add an entry in `src/site.mjs`, add a folder under `src/content/`, and add a grammar in `src/highlight.mjs`.

## How the playground runs code

- **JavaScript** runs in a **Web Worker**, kept apart from the page. `console.log`, `warn` and `error` are captured as output. Code that runs longer than 5 seconds is stopped, so an endless loop cannot freeze the page.
- **Python** runs in the browser using [Pyodide](https://pyodide.org) (CPython compiled to WebAssembly), loaded from jsDelivr (`pyodide@0.26.4`) the first time someone presses Run. That first download is about 10 MB. It also runs in a Web Worker, and is stopped after 10 seconds.
- **C and Java** are sent to [Wandbox](https://wandbox.org), a free online compiler service, and the real output comes back. The newest stable GCC and OpenJDK are picked automatically from Wandbox's list. Wandbox saves Java code as `prog.java`, so the playground renames the public class to `prog` before sending it. To go easy on this free shared service:
  - An **unchanged** lesson example is not sent at all. Its output was produced by the real compiler during the build (`npm run verify-examples` in CI), so it is shown straight away.
  - Each browser sends at most one request every 3 seconds.
  - If Wandbox is busy (HTTP 429) or unreachable, a clear message is shown.

  JavaScript and Python run on the visitor's own computer, so they scale with any amount of traffic. For heavy C/Java traffic, the long-term options are compilers running in the browser (WebAssembly) or a self-hosted code runner such as Piston or Judge0.
- Text in **Input (stdin)** is passed to `input()`, `scanf` and `Scanner`.
