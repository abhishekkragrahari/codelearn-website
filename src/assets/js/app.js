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
