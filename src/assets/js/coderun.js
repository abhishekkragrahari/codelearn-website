// Real runners for Python, C and Java in the playground.
//   CSCodeRun.python(code, stdin, onLine) -> Promise<{ timedOut }>
//     Runs CPython compiled to WebAssembly (Pyodide) inside a Web Worker.
//   CSCodeRun.remote(lang, code, stdin, onLine) -> Promise
//     Sends C or Java code to wandbox.org, a free online compiler, and
//     reports what the program printed.
// onLine(kind, text) receives output lines; kind is log, error, info or status.
(function () {
  // Exact version, served by jsDelivr from the pyodide npm package.
  var PYODIDE_BASE = window.CS_PYODIDE_BASE || 'https://cdn.jsdelivr.net/npm/pyodide@0.26.4/';
  var PY_TIMEOUT_MS = 10000;
  var WANDBOX = 'https://wandbox.org/api/';
  var REMOTE_TIMEOUT_MS = 30000;

  /* ---------------- Python (Pyodide in a worker) ---------------- */

  function pyWorkerMain(base) {
    importScripts(base + 'pyodide.js');
    var pyodide = null;

    // Keep only the user's part of a traceback, not Pyodide's internal frames.
    function cleanTraceback(text) {
      var lines = text.split('\n');
      var start = lines.findIndex(function (l) { return l.indexOf('File "<exec>"') !== -1; });
      if (start === -1) return text.trim();
      return ['Traceback (most recent call last):'].concat(lines.slice(start)).join('\n').trim();
    }

    self.onmessage = async function (e) {
      try {
        if (!pyodide) {
          postMessage({ kind: 'status', text: 'Loading Python (the first run downloads about 10 MB)...' });
          pyodide = await loadPyodide({ indexURL: base });
        }
        postMessage({ kind: 'started' });
        var input = e.data.stdin === '' ? [] : e.data.stdin.split('\n');
        var next = 0;
        pyodide.setStdin({ stdin: function () { return next < input.length ? input[next++] : undefined; } });
        pyodide.setStdout({ batched: function (s) { postMessage({ kind: 'log', text: s }); } });
        pyodide.setStderr({ batched: function (s) { postMessage({ kind: 'error', text: s }); } });
        var globals = pyodide.globals.get('dict')();   // a clean namespace for every run
        try {
          await pyodide.runPythonAsync(e.data.code, { globals: globals });
        } finally {
          globals.destroy();
        }
      } catch (err) {
        postMessage({ kind: 'error', text: cleanTraceback(String(err && err.message ? err.message : err)) });
      }
      postMessage({ kind: 'done' });
    };
  }

  var pyWorker = null;
  function getPyWorker() {
    if (!pyWorker) {
      var src = '(' + pyWorkerMain.toString() + ')(' + JSON.stringify(PYODIDE_BASE) + ');';
      pyWorker = new Worker(URL.createObjectURL(new Blob([src], { type: 'text/javascript' })));
    }
    return pyWorker;
  }

  function python(code, stdin, onLine) {
    return new Promise(function (resolve) {
      var worker = getPyWorker();
      var timer = null;
      function finish(timedOut) {
        clearTimeout(timer);
        worker.onmessage = worker.onerror = null;
        resolve({ timedOut: timedOut });
      }
      worker.onmessage = function (e) {
        var d = e.data;
        if (d.kind === 'started') {
          // The time limit starts once Python is loaded, so a slow download is not counted.
          timer = setTimeout(function () {
            worker.terminate();
            pyWorker = null;            // the next run starts a fresh interpreter
            onLine('error', 'Stopped: the code ran for more than ' + PY_TIMEOUT_MS / 1000 + ' seconds (is there an endless loop?)');
            finish(true);
          }, PY_TIMEOUT_MS);
        } else if (d.kind === 'done') {
          finish(false);
        } else {
          onLine(d.kind, d.text);
        }
      };
      worker.onerror = function (e) {
        e.preventDefault();
        worker.terminate();
        pyWorker = null;
        onLine('error', 'Could not start Python: ' + (e.message || 'download failed') + '. Check your internet connection.');
        finish(false);
      };
      worker.postMessage({ code: code, stdin: stdin });
    });
  }

  /* ---------------- C and Java (wandbox.org) ---------------- */

  var compilerList = null;
  function compilers() {
    if (!compilerList) {
      compilerList = fetch(WANDBOX + 'list.json').then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      });
      compilerList.catch(function () { compilerList = null; });   // retry next time
    }
    return compilerList;
  }

  // Wandbox lists its newest compilers first; prefer stable releases over "head" builds.
  function pickCompiler(list, lang) {
    var want = lang === 'c' ? { language: 'C', name: /^gcc/ } : { language: 'Java', name: /jdk/ };
    var matches = list.filter(function (c) { return c.language === want.language && want.name.test(c.name); });
    var stable = matches.filter(function (c) { return !/head/.test(c.name); });
    return stable[0] || matches[0] || null;
  }

  // Wandbox saves Java code as prog.java, so a public class must be called prog.
  function prepareJava(code, compiler) {
    var command = (compiler['display-compile-command'] || '') + ' ' + (compiler['display-name'] || '');
    var m = code.match(/public\s+(?:final\s+)?class\s+([A-Za-z_]\w*)/);
    if (!m || !/prog/.test(command)) return code;
    return code.replace(new RegExp('\\b' + m[1] + '\\b', 'g'), 'prog');
  }

  function emitLines(kind, text, onLine) {
    if (!text) return;
    text.replace(/\n$/, '').split('\n').forEach(function (line) { onLine(kind, line); });
  }

  function remote(lang, code, stdin, onLine) {
    var controller = new AbortController();
    var timer = setTimeout(function () { controller.abort(); }, REMOTE_TIMEOUT_MS);
    onLine('status', 'Compiling and running on wandbox.org...');
    return compilers()
      .then(function (list) {
        var compiler = pickCompiler(list, lang);
        if (!compiler) throw new Error('no ' + lang + ' compiler is available right now');
        return fetch(WANDBOX + 'compile.json', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            compiler: compiler.name,
            code: lang === 'java' ? prepareJava(code, compiler) : code,
            stdin: stdin,
            save: false,
          }),
          signal: controller.signal,
        });
      })
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function (res) {
        emitLines('error', res.compiler_error, onLine);
        emitLines('log', res.program_output, onLine);
        emitLines('error', res.program_error, onLine);
        if (res.signal) onLine('error', 'Program stopped by signal: ' + res.signal);
        else if (res.status && res.status !== '0') onLine('info', 'Exited with status ' + res.status);
      })
      .catch(function (err) {
        var why = err && err.name === 'AbortError' ? 'it took too long to answer' : err && err.message ? err.message : 'network error';
        onLine('error', 'Could not run the code on the online compiler (' + why + '). Check your internet connection and try again.');
        throw err;
      })
      .finally(function () { clearTimeout(timer); });
  }

  window.CSCodeRun = { python: python, remote: remote };
})();
