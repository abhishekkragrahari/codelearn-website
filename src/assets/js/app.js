// Site-wide behaviour: theme toggle, mobile menus, copy and run buttons.
(function () {
  var doc = document.documentElement;

  // ----- Light / dark mode -----
  function currentTheme() {
    var set = doc.getAttribute('data-theme');
    if (set) return set;
    return 'light';
  }
  document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      doc.setAttribute('data-theme', next);
      try { localStorage.setItem('cs-theme', next); } catch (e) {}
    });
  });

  // ----- Scroll reveal: cards and sections slide in as they come into view -----
  var revealSel = '.section-head, .lang-card, .topic-card, .feature, .chapter-card, .gate-subject, .code-block, .quiz, .diagram, .pager';
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll(revealSel).forEach(function (el) {
      // Anything already on screen when the page opens is shown straight away.
      if (el.getBoundingClientRect().top < innerHeight) return;
      // Stagger siblings in the same grid so a row flows in left to right.
      var i = Array.prototype.indexOf.call(el.parentNode.children, el);
      el.style.setProperty('--d', Math.min(i, 5) * 0.08 + 's');
      el.classList.add('reveal');
      io.observe(el);
    });
  }

  // ----- Mobile menus -----
  function toggler(buttonSel, target, openClass) {
    document.querySelectorAll(buttonSel).forEach(function (btn) {
      var el = document.getElementById(btn.getAttribute('aria-controls'));
      if (!el) return;
      btn.addEventListener('click', function () {
        var open = !el.classList.contains(openClass);
        el.classList.toggle(openClass, open);
        btn.setAttribute('aria-expanded', String(open));
        if (target) document.body.classList.toggle(target, open);
      });
      document.addEventListener('click', function (e) {
        // Any click outside (including on the other menu's button) closes this one,
        // so the top menu and the topics drawer are never open together.
        if (el.classList.contains(openClass) && !el.contains(e.target) && !btn.contains(e.target)) {
          // A tap on the dimmed page only closes the menu; it must not also follow a link underneath.
          if (!e.target.closest('[data-menu-toggle], [data-sidebar-toggle]')) { e.preventDefault(); e.stopPropagation(); }
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
    // Buttons hold an icon, so the original markup is kept and restored.
    if (btn._label == null) btn._label = btn.innerHTML;
    var original = btn._label;
    btn.textContent = label;
    clearTimeout(btn._t);
    btn._t = setTimeout(function () { btn.innerHTML = original; }, 1500);
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
      var label = btn.innerHTML;
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
        btn.innerHTML = label;
      });
    });
  });
  // ----- Progress: lessons marked done and quiz results, kept in this browser only -----
  var PROGRESS_KEY = 'gs-progress';
  function loadProgress() {
    try { return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || { done: {}, quiz: {} }; } catch (e) { return { done: {}, quiz: {} }; }
  }
  function saveProgress(p) { try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(p)); } catch (e) {} }
  var progress = loadProgress();
  progress.done = progress.done || {};
  progress.quiz = progress.quiz || {};

  var doneBox = document.querySelector('[data-lesson-done]');
  if (doneBox) {
    var lessonKey = doneBox.getAttribute('data-lesson-done');
    var doneBtn = doneBox.querySelector('[data-mark-done]');
    var doneNote = doneBox.querySelector('[data-done-note]');
    var showDone = function () {
      var isDone = !!progress.done[lessonKey];
      doneBox.classList.toggle('is-done', isDone);
      doneBtn.textContent = isDone ? 'Done ✓ (click to undo)' : 'Mark this lesson as done';
      var q = progress.quiz[lessonKey];
      doneNote.textContent = q ? ' Questions answered correctly: ' + q.right + ' of ' + q.total + '.' : '';
    };
    doneBtn.addEventListener('click', function () {
      if (progress.done[lessonKey]) delete progress.done[lessonKey]; else progress.done[lessonKey] = Date.now();
      saveProgress(progress);
      showDone();
    });
    // Record each question's latest result for this lesson.
    var lessonQuizzes = document.querySelectorAll('.prose [data-quiz]');
    lessonQuizzes.forEach(function (quiz, idx) {
      quiz.querySelector('[data-quiz-check]').addEventListener('click', function () {
        var fb = quiz.querySelector('[data-quiz-feedback]');
        if (!/ok|bad/.test(fb.className) || /Choose|Type/.test(fb.textContent)) return;
        var rec = progress.quiz[lessonKey] || { total: lessonQuizzes.length, right: 0, answers: {} };
        rec.answers = rec.answers || {};
        rec.answers[idx] = / ok/.test(fb.className) ? 1 : 0;
        rec.total = lessonQuizzes.length;
        rec.right = Object.keys(rec.answers).reduce(function (n, k) { return n + rec.answers[k]; }, 0);
        progress.quiz[lessonKey] = rec;
        saveProgress(progress);
        showDone();
      });
    });
    showDone();
  }

  var trackBox = document.querySelector('[data-track-progress]');
  if (trackBox) {
    var links = document.querySelectorAll('[data-lesson]');
    var doneCount = 0;
    links.forEach(function (a) {
      if (progress.done[a.getAttribute('data-lesson')]) { a.parentNode.classList.add('is-done'); doneCount++; }
    });
    var total = Number(trackBox.getAttribute('data-total'));
    if (doneCount) {
      trackBox.hidden = false;
      trackBox.innerHTML = '<div class="track-progress-bar"><span style="width:' + Math.round(100 * doneCount / total) + '%"></span></div>' +
        '<p>' + doneCount + ' of ' + total + ' lessons done</p>';
    }
  }
})();
