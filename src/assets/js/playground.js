// The playground page: a small editor that really runs the code.
// JavaScript runs in a Web Worker (runner.js), Python runs in the browser
// through Pyodide, and C and Java run on wandbox.org (coderun.js).
(function () {
  var examples = JSON.parse(document.getElementById('pg-examples').textContent);
  var langSel = document.getElementById('pg-lang');
  var exSel = document.getElementById('pg-example');
  var editor = document.getElementById('pg-editor');
  var output = document.getElementById('pg-output');
  var notice = document.getElementById('pg-notice');
  var runBtn = document.getElementById('pg-run');
  var fileName = document.getElementById('pg-filename');
  var stdinBox = document.getElementById('pg-stdin');

  var files = { python: 'main.py', c: 'main.c', java: 'Main.java', javascript: 'main.js' };
  var names = { python: 'Python', c: 'C', java: 'Java', javascript: 'JavaScript' };
  var current = { lang: 'javascript', code: '', output: null };

  function setNotice(text) {
    notice.hidden = !text;
    notice.textContent = text || '';
  }

  function load(lang, code, expected) {
    current = { lang: lang, code: code, output: expected == null ? null : expected };
    langSel.value = lang;
    editor.value = code;
    fileName.textContent = files[lang];
    output.textContent = '';
    setNotice(notices[lang]);
  }

  var notices = {
    javascript: '',
    python: 'Python runs right in your browser (Pyodide). The first run downloads about 10 MB; after that it is quick.',
    c: 'C code is compiled and run on wandbox.org, a free online compiler, so you need an internet connection. Do not put passwords or private data in your code.',
    java: 'Java code is compiled and run on wandbox.org, a free online compiler, so you need an internet connection. Do not put passwords or private data in your code.',
  };

  function fillExamples(lang, selectIndex) {
    exSel.innerHTML = '';
    var group = null;
    (examples[lang] || []).forEach(function (ex, i) {
      if (!group || group.label !== ex.lesson) {
        group = document.createElement('optgroup');
        group.label = ex.lesson;
        exSel.appendChild(group);
      }
      var opt = document.createElement('option');
      opt.value = String(i);
      opt.textContent = ex.label;
      group.appendChild(opt);
    });
    if (selectIndex != null) exSel.value = String(selectIndex);
  }

  function loadExample(lang, i) {
    var ex = (examples[lang] || [])[i];
    if (ex) load(lang, ex.code, ex.output);
  }

  function line(kind, text) {
    var span = document.createElement('span');
    span.className = 'out-line out-' + kind;
    span.textContent = text + '\n';
    output.appendChild(span);
  }

  function run() {
    if (runBtn.disabled) return;
    output.textContent = '';
    runBtn.disabled = true;
    runBtn.textContent = 'Running...';
    var lang = current.lang;
    var code = editor.value;
    var started = performance.now();
    var any = false;
    var status = null;
    // Status messages ("Loading Python...") disappear once real output arrives.
    function onLine(kind, text) {
      if (kind === 'status') {
        status = document.createElement('span');
        status.className = 'out-line out-info';
        status.textContent = text + '\n';
        output.appendChild(status);
        return;
      }
      if (status) { status.remove(); status = null; }
      any = true;
      line(kind, text);
    }
    function finish(res) {
      if (status) { status.remove(); status = null; }
      if (!any) line('info', '(no output)');
      if (!res || !res.timedOut) line('info', '\nFinished in ' + Math.round(performance.now() - started) + ' ms');
      runBtn.disabled = false;
      runBtn.innerHTML = '&#9654; Run';
    }

    var job;
    if (lang === 'javascript') job = window.CSRunner.run(code, { onLine: onLine });
    else if (lang === 'python') job = window.CSCodeRun.python(code, stdinBox.value, onLine);
    else if (code === current.code && current.output != null && stdinBox.value === '') {
      // An unchanged lesson example: its output was produced by the real compiler
      // when the site was built, so show it without calling the online service.
      line('info', 'Output of this unchanged lesson example (checked with the real compiler when the site was built):');
      line('log', current.output);
      job = Promise.resolve();
    } else {
      job = window.CSCodeRun.remote(lang, code, stdinBox.value, onLine).catch(function () {
        // Offline or the service is down: for an unchanged example we can still show its known output.
        if (code === current.code && current.output != null) {
          line('info', '\nThis is the expected output of the original example:');
          line('log', current.output);
        }
      });
    }
    job.then(finish, finish);
  }

  // Code can be handed over from a lesson through the URL hash.
  function fromHash() {
    var params = new URLSearchParams(location.hash.slice(1));
    var lang = params.get('lang');
    if (lang && examples[lang] && params.has('code')) {
      fillExamples(lang);
      var idx = examples[lang].findIndex(function (ex) { return ex.code === params.get('code'); });
      if (idx >= 0) exSel.value = String(idx);
      load(lang, params.get('code'), params.get('output'));
      stdinBox.value = '';
      return true;
    }
    return false;
  }

  langSel.addEventListener('change', function () {
    fillExamples(langSel.value, 0);
    loadExample(langSel.value, 0);
  });
  exSel.addEventListener('change', function () { loadExample(current.lang, +exSel.value); });
  runBtn.addEventListener('click', run);
  document.getElementById('pg-reset').addEventListener('click', function () { load(current.lang, current.code, current.output); });
  document.getElementById('pg-clear').addEventListener('click', function () { output.textContent = ''; });
  document.getElementById('pg-copy').addEventListener('click', function (e) { window.CSCopy(editor.value, e.currentTarget); });

  editor.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      run();
    } else if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault();
      var s = editor.selectionStart;
      editor.setRangeText('    ', s, editor.selectionEnd, 'end');
    }
  });
  window.addEventListener('hashchange', fromHash);

  if (!fromHash()) {
    fillExamples('javascript', 0);
    loadExample('javascript', 0);
  }
})();
