// The playground page: a small editor with a real JavaScript runner.
// Python, C and Java cannot run in the browser here, so for those we show
// the expected output that ships with each example.
(function () {
  var examples = JSON.parse(document.getElementById('pg-examples').textContent);
  var langSel = document.getElementById('pg-lang');
  var exSel = document.getElementById('pg-example');
  var editor = document.getElementById('pg-editor');
  var output = document.getElementById('pg-output');
  var notice = document.getElementById('pg-notice');
  var runBtn = document.getElementById('pg-run');
  var fileName = document.getElementById('pg-filename');

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
    if (lang === 'javascript') {
      runBtn.innerHTML = '&#9654; Run';
      setNotice('');
    } else {
      runBtn.textContent = 'Show output';
      setNotice(names[lang] + ' runs on a compiler or interpreter, not in the browser. ' +
        'Press "Show output" to see what this example prints. To run your own ' + names[lang] +
        ' code, install it locally (see the first lesson).');
    }
  }

  function fillExamples(lang, selectIndex) {
    exSel.innerHTML = '';
    (examples[lang] || []).forEach(function (ex, i) {
      var opt = document.createElement('option');
      opt.value = String(i);
      opt.textContent = ex.label;
      exSel.appendChild(opt);
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
    output.textContent = '';
    if (current.lang !== 'javascript') {
      var edited = editor.value !== current.code;
      if (current.output == null) {
        line('info', 'This example has no recorded output.');
      } else {
        if (edited) line('info', 'Note: you changed the code. This is the output of the original example.\n');
        line('log', current.output);
      }
      return;
    }
    runBtn.disabled = true;
    runBtn.textContent = 'Running...';
    var started = performance.now();
    var any = false;
    window.CSRunner.run(editor.value, {
      onLine: function (kind, text) { any = true; line(kind, text); },
    }).then(function (res) {
      if (!any) line('info', '(no output)');
      if (!res.timedOut) line('info', '\nFinished in ' + Math.round(performance.now() - started) + ' ms');
      runBtn.disabled = false;
      runBtn.innerHTML = '&#9654; Run';
    });
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
