// Site-wide behaviour: theme toggle, mobile menus, copy and run buttons.
(function () {
  var doc = document.documentElement;

  // ----- Light / dark mode -----
  function currentTheme() {
    var set = doc.getAttribute('data-theme');
    if (set) return set;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      doc.setAttribute('data-theme', next);
      try { localStorage.setItem('cs-theme', next); } catch (e) {}
    });
  });

  // ----- Mobile menus -----
  function toggler(buttonSel, target, openClass) {
    document.querySelectorAll(buttonSel).forEach(function (btn) {
      var el = document.getElementById(btn.getAttribute('aria-controls'));
      if (!el) return;
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = !el.classList.contains(openClass);
        el.classList.toggle(openClass, open);
        btn.setAttribute('aria-expanded', String(open));
        if (target) document.body.classList.toggle(target, open);
      });
      document.addEventListener('click', function (e) {
        if (el.classList.contains(openClass) && !el.contains(e.target)) {
          el.classList.remove(openClass);
          btn.setAttribute('aria-expanded', 'false');
          if (target) document.body.classList.remove(target);
        }
      });
    });
  }
  toggler('[data-menu-toggle]', null, 'is-open');
  toggler('[data-sidebar-toggle]', 'sidebar-open', 'is-open');

  // ----- Copy buttons -----
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (resolve, reject) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy') ? resolve() : reject(); } catch (e) { reject(e); }
      document.body.removeChild(ta);
    });
  }
  function flash(btn, label) {
    var original = btn.getAttribute('data-label') || btn.textContent;
    btn.setAttribute('data-label', original);
    btn.textContent = label;
    clearTimeout(btn._t);
    btn._t = setTimeout(function () { btn.textContent = original; }, 1500);
  }
  window.CSCopy = function (text, btn) {
    copyText(text).then(function () { flash(btn, 'Copied!'); }, function () { flash(btn, 'Press Ctrl+C'); });
  };
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var code = btn.closest('.code-block').querySelector('.code-body code');
      window.CSCopy(code.textContent, btn);
    });
  });

  // ----- Code tabs: pick a language once, every tab group on the page follows -----
  function showTab(lang) {
    document.querySelectorAll('[data-tabs]').forEach(function (group) {
      if (!group.querySelector('[data-panel="' + lang + '"]')) return;
      group.querySelectorAll('[data-tab]').forEach(function (b) { b.setAttribute('aria-selected', String(b.getAttribute('data-tab') === lang)); });
      group.querySelectorAll('[data-panel]').forEach(function (p) { p.hidden = p.getAttribute('data-panel') !== lang; });
    });
  }
  document.querySelectorAll('[data-tab]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var lang = btn.getAttribute('data-tab');
      showTab(lang);
      try { localStorage.setItem('cs-code-tab', lang); } catch (e) {}
    });
  });
  try { var savedTab = localStorage.getItem('cs-code-tab'); if (savedTab) showTab(savedTab); } catch (e) {}

  // ----- GATE-style practice questions -----
  document.querySelectorAll('[data-quiz]').forEach(function (quiz) {
    var feedback = quiz.querySelector('[data-quiz-feedback]');
    quiz.querySelector('[data-quiz-check]').addEventListener('click', function () {
      var right;
      if (quiz.getAttribute('data-type') === 'nat') {
        var raw = quiz.querySelector('[data-quiz-input]').value.trim();
        var want = parseFloat(quiz.getAttribute('data-answer'));
        var got = parseFloat(raw);
        if (raw === '' || isNaN(got)) { feedback.className = 'quiz-feedback bad'; feedback.textContent = 'Type a number first.'; return; }
        right = Math.abs(got - want) <= 1e-6 * Math.max(1, Math.abs(want)) + 0.005;
      } else {
        var inputs = quiz.querySelectorAll('.quiz-options input');
        var chosen = Array.prototype.filter.call(inputs, function (i) { return i.checked; });
        if (!chosen.length) { feedback.className = 'quiz-feedback bad'; feedback.textContent = 'Choose an option first.'; return; }
        right = Array.prototype.every.call(inputs, function (i) { return i.checked === i.hasAttribute('data-correct'); });
        inputs.forEach(function (i) {
          var li = i.closest('li');
          li.classList.toggle('is-right', i.hasAttribute('data-correct'));
          li.classList.toggle('is-wrong', i.checked && !i.hasAttribute('data-correct'));
        });
      }
      feedback.className = 'quiz-feedback ' + (right ? 'ok' : 'bad');
      feedback.textContent = right ? 'Correct!' : 'Not quite. Open the explanation below.';
      if (!right) quiz.querySelector('.quiz-answer').open = true;
    });
  });

  // ----- Run buttons (JavaScript examples) -----
  document.querySelectorAll('[data-run]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (!window.CSRunner || btn.disabled) return;
      var block = btn.closest('.code-block');
      var code = block.querySelector('.code-body code').textContent;
      var panel = block.querySelector('.code-output');
      var out = panel.querySelector('.code-output-body');
      panel.hidden = false;
      panel.querySelector('.code-output-head').textContent = 'Output (live)';
      out.textContent = '';
      btn.disabled = true;
      btn.textContent = 'Running...';
      var any = false;
      window.CSRunner.run(code, {
        onLine: function (kind, text) {
          any = true;
          var line = document.createElement('span');
          line.className = 'out-line out-' + kind;
          line.textContent = text + '\n';
          out.appendChild(line);
        },
      }).then(function () {
        if (!any) out.textContent = '(no output)';
        btn.disabled = false;
        btn.innerHTML = '&#9654; Run';
      });
    });
  });
})();
