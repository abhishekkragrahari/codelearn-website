# CodeShala

A free programming-tutorial website with short lessons for **Python, C, Java and JavaScript**.
It has syntax-highlighted examples with Copy buttons, and a playground where JavaScript runs in the browser.

- Home page with a language picker
- Tutorials split into chapters, with a sidebar of topics on the left
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
| `npm run verify-examples` | Runs every lesson example with real `python3`, `gcc`, `java` and `node`, and fails if any output differs from what the page shows. A language whose tool is missing is skipped. |

## Turn on GitHub Pages (one-time setup)

The workflow in `.github/workflows/deploy.yml` builds the site on every push and pull request.
It deploys only from `main`, and only after you switch Pages on once:

1. Open the repository on GitHub and go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**. Do not choose "Deploy from a branch".
3. Merge the pull request into `main`, or open **Actions → Build and deploy to GitHub Pages → Run workflow**.
4. When the run finishes, the site URL appears on the run summary and under Settings → Pages:
   `https://abhishekkragrahari.github.io/codelearn-website/`

Notes:

- This repository is **private**. Pages for private repositories needs a paid GitHub plan (Pro, Team or Enterprise). On a free plan you have two options: make the repository public, or host `dist/` elsewhere (any static host works).
- If you later use a custom domain or a `<user>.github.io` repository, the site is served from `/`. In that case set `SITE_BASE: /` in the workflow. It is only used by the 404 page.

## Project layout

```text
src/
  site.mjs              site name and the list of languages
  content/<language>/   one Markdown file per lesson (01-..., 02-... sets the order)
  assets/css/style.css  all styles; colours are CSS variables, with dark mode at the top
  assets/js/            app.js (theme, menus, copy/run), runner.js (JS sandbox),
                        playground.js, inspect.js (console.log formatting)
  highlight.mjs         small syntax highlighter used at build time
  diagrams.mjs          flowchart / tree / pipeline figures rendered to SVG
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
- Run `npm run verify-examples` to check that the output you wrote is correct.

### Figures and flowcharts

Three kinds of diagram can be written straight into a lesson. They are drawn as SVG at build time, follow light and dark mode, and need no extra library.

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

To add a whole new language, add an entry in `src/site.mjs`, add a folder under `src/content/`, and add a grammar in `src/highlight.mjs`.

## How the playground runs code

- **JavaScript** runs in a **Web Worker**, kept apart from the page. `console.log`, `warn` and `error` are captured as output. Code that runs longer than 5 seconds is stopped, so an endless loop cannot freeze the page.
- **Python** runs in the browser using [Pyodide](https://pyodide.org) (CPython compiled to WebAssembly), loaded from jsDelivr (`pyodide@0.26.4`) the first time someone presses Run. That first download is about 10 MB. It also runs in a Web Worker, and is stopped after 10 seconds.
- **C and Java** are sent to [Wandbox](https://wandbox.org), a free online compiler service, and the real output comes back. The newest stable GCC and OpenJDK are picked automatically from Wandbox's list. Wandbox saves Java code as `prog.java`, so the playground renames the public class to `prog` before sending it. If the service cannot be reached, an unchanged lesson example shows its known output instead.
- Text in **Input (stdin)** is passed to `input()`, `scanf` and `Scanner`.
