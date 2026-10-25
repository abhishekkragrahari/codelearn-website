// Runs every lesson example that has an ```output block and checks that the
// real output matches. Needs python3, gcc and java on PATH; a language whose
// tool is missing is skipped. Usage: npm run verify-examples [-- python c]
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { languages } from '../src/site.mjs';
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
      writeFileSync(join(dir, 'main.cjs'), prelude + code);
      return execFileSync(process.execPath, ['main.cjs'], { cwd: dir });
    },
  },
};

const clean = (s) => s.replace(/\r\n/g, '\n').split('\n').map((l) => l.trimEnd()).join('\n').trimEnd();
const only = process.argv.slice(2);
let passed = 0;
const failures = [];

for (const lang of languages) {
  if (only.length && !only.includes(lang.id)) continue;
  const runner = runners[lang.id];
  if (!runner.available()) {
    console.log(`- ${lang.name}: tool not found, skipped`);
    continue;
  }
  for (const lesson of loadLessons(lang.id)) {
    const blocks = lesson.blocks.filter((b) => b.type === 'code' && b.lang === lang.id && b.output != null);
    blocks.forEach((b, i) => {
      const where = `${lang.id}/${lesson.file} example ${i + 1}`;
      const dir = mkdtempSync(join(tmpdir(), 'cs-verify-'));
      try {
        const actual = clean(runner.run(dir, b.code).toString());
        if (actual === clean(b.output)) passed++;
        else failures.push(`${where}\n--- expected\n${clean(b.output)}\n--- actual\n${actual}`);
      } catch (err) {
        failures.push(`${where}\n${(err.stderr || err.message).toString().trim()}`);
      } finally {
        rmSync(dir, { recursive: true, force: true });
      }
    });
  }
  console.log(`- ${lang.name}: checked`);
}

if (failures.length) {
  console.error(`\n${failures.length} example(s) failed:\n\n` + failures.join('\n\n'));
  process.exit(1);
}
console.log(`\nAll ${passed} examples produce their documented output.`);
