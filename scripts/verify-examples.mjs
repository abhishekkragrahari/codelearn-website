// Runs every lesson example that has an ```output block and checks that the
// real output matches. Needs python3, gcc and java on PATH; a language whose
// tool is missing is skipped. Usage: npm run verify-examples [-- python c]
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tracks } from '../src/site.mjs';
import { parseQuiz } from '../src/quiz.mjs';
import { loadLessons } from './build.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const INSPECT = join(ROOT, 'src', 'assets', 'js', 'inspect.js');

const has = (cmd) => spawnSync(cmd, ['--version'], { stdio: 'ignore' }).status === 0;

const runners = {
  python: {
    available: () => has('python3'),
    run: (dir, code) => execFileSync('python3', ['-c', code], { cwd: dir }),
  },
  c: {
    available: () => has('gcc'),
    run: (dir, code) => {
      writeFileSync(join(dir, 'main.c'), code);
      execFileSync('gcc', ['-std=c11', '-Wall', '-Werror', 'main.c', '-o', 'main'], { cwd: dir });
      return execFileSync(join(dir, 'main'), { cwd: dir });
    },
  },
  java: {
    available: () => has('java'),
    run: (dir, code) => {
      writeFileSync(join(dir, 'Main.java'), code);
      return execFileSync('java', ['Main.java'], { cwd: dir, stdio: ['ignore', 'pipe', 'pipe'] });
    },
  },
  javascript: {
    available: () => true,
    run: (dir, code) => {
      // Same console formatting as the in-browser runner.
      const prelude =
        `const inspect = require(${JSON.stringify(INSPECT)});\n` +
        `console.log = (...a) => process.stdout.write(a.map((x) => inspect(x)).join(' ') + '\\n');\n`;
      // Wrapped in an async function, like the browser runner, so top-level await works.
      writeFileSync(join(dir, 'main.cjs'), prelude + `(async () => {\n${code}\n})().catch((e) => console.log(e.name + ': ' + e.message));\n`);
      return execFileSync(process.execPath, ['main.cjs'], { cwd: dir });
    },
  },
};

const clean = (s) => s.replace(/\r\n/g, '\n').split('\n').map((l) => l.trimEnd()).join('\n').trimEnd();
const only = process.argv.slice(2);
let passed = 0;
const failures = [];

const availability = {};
const usable = (lang) => (availability[lang] ??= runners[lang].available());
let quizzes = 0;

for (const track of tracks) {
  for (const lesson of loadLessons(track.id)) {
    const counters = {};
    for (const b of lesson.blocks) {
      if (b.type !== 'code') continue;
      // Numerical GATE-style answers with a "verify:" expression are recomputed in Python.
      if (b.lang === 'quiz') {
        const quiz = parseQuiz(b.code);
        if ((quiz.verify == null && quiz.verifyProgram == null) || (only.length && !only.includes(track.id) && !only.includes('quiz'))) continue;
        const where = `${track.id}/${lesson.file} quiz "${quiz.q.slice(0, 50)}"`;
        try {
          const got = execFileSync('python3', ['-c', quiz.verifyProgram ?? `print(${quiz.verify})`]).toString().trim();
          if (got === quiz.answer) quizzes++;
          else failures.push(`${where}\n--- answer\n${quiz.answer}\n--- verify gives\n${got}`);
        } catch (err) {
          failures.push(`${where}\n${(err.stderr || err.message).toString().trim()}`);
        }
        continue;
      }
      const runner = runners[b.lang];
      if (!runner || b.output == null) continue;
      if (only.length && !only.includes(track.id) && !only.includes(b.lang)) continue;
      counters[b.lang] = (counters[b.lang] || 0) + 1;
      const where = `${track.id}/${lesson.file} ${b.lang} example ${counters[b.lang]}`;
      if (!usable(b.lang)) continue;
      const dir = mkdtempSync(join(tmpdir(), 'cs-verify-'));
      try {
        const actual = clean(runner.run(dir, b.code).toString());
        if (actual === clean(b.output)) passed++;
        else failures.push(`${where}\n--- expected\n${clean(b.output)}\n--- actual\n${actual}`);
      } catch (err) {
        failures.push(`${where}\n${(err.stderr || err.message).toString().replace(/^Picked up JAVA_TOOL_OPTIONS.*\n/m, '').trim()}`);
      } finally {
        rmSync(dir, { recursive: true, force: true });
      }
    }
  }
  console.log(`- ${track.name}: checked`);
}
for (const [lang, ok] of Object.entries(availability)) if (!ok) console.log(`- ${lang}: tool not found, examples skipped`);

if (failures.length) {
  console.error(`\n${failures.length} example(s) failed:\n\n` + failures.join('\n\n'));
  process.exit(1);
}
console.log(`\nAll ${passed} examples produce their documented output` + (quizzes ? `, and ${quizzes} numerical answers check out.` : '.'));
