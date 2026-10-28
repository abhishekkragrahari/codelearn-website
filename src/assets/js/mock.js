// Full-length GATE mock tests: timer, question palette, GATE marking and a score report.
// Questions are the normal quiz blocks; their check buttons and answers stay hidden until submit.
(function () {
  'use strict';

  function store(key, value) { try { localStorage.setItem(key, value); } catch (e) {} }
  function read(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }

  // Mock index page: show the best score saved for each mock.
  document.querySelectorAll('[data-mock-link]').forEach(function (a) {
    var best = read('gs-mock-' + a.getAttribute('data-mock-link'));
    if (best !== null) a.insertAdjacentHTML('afterend', ' <small>(best ' + best + '/100)</small>');
  });

  var mock = document.querySelector('[data-mock]');
  if (!mock) return;

  var id = mock.getAttribute('data-mock');
  var qs = Array.prototype.slice.call(mock.querySelectorAll('.mock-q'));
  var list = mock.querySelector('[data-mock-questions]');
  var palette = mock.querySelector('[data-mock-palette]');
  var timerEl = mock.querySelector('[data-mock-timer]');
  var countEl = mock.querySelector('[data-mock-count]');
  var startBtn = mock.querySelector('[data-mock-start]');
  var submitBtn = mock.querySelector('[data-mock-submit]');
  var result = mock.querySelector('[data-mock-result]');
  var submitted = false;
  var timer = null;

  qs.forEach(function (q, i) {
    q.querySelector('.quiz-actions').hidden = true;
    q.querySelector('.quiz-answer').hidden = true;
    var b = document.createElement('a');
    b.href = '#q' + (i + 1);
    b.textContent = i + 1;
    b.className = 'mock-cell';
    palette.appendChild(b);
    q.addEventListener('input', update);
    q.addEventListener('change', update);
  });
  palette.hidden = true;

  function quizOf(q) { return q.querySelector('[data-quiz]'); }

  function answered(q) {
    var quiz = quizOf(q);
    if (quiz.getAttribute('data-type') === 'nat') return quiz.querySelector('[data-quiz-input]').value.trim() !== '';
    return Array.prototype.some.call(quiz.querySelectorAll('.quiz-options input'), function (i) { return i.checked; });
  }

  function correct(q) {
    var quiz = quizOf(q);
    if (quiz.getAttribute('data-type') === 'nat') {
      var got = parseFloat(quiz.querySelector('[data-quiz-input]').value);
      var want = parseFloat(quiz.getAttribute('data-answer'));
      return !isNaN(got) && Math.abs(got - want) <= 1e-6 * Math.max(1, Math.abs(want)) + 0.005;
    }
    return Array.prototype.every.call(quiz.querySelectorAll('.quiz-options input'), function (i) {
      return i.checked === i.hasAttribute('data-correct');
    });
  }

  function update() {
    var n = 0;
    qs.forEach(function (q, i) {
      var a = answered(q);
      if (a) n++;
      palette.children[i].classList.toggle('is-answered', a);
    });
    countEl.textContent = n + ' / ' + qs.length + ' answered';
  }

  function format(sec) {
    var h = Math.floor(sec / 3600), m = Math.floor(sec % 3600 / 60), s = sec % 60;
    return h + ':' + (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }

  startBtn.addEventListener('click', function () {
    startBtn.hidden = true;
    submitBtn.hidden = false;
    list.hidden = false;
    palette.hidden = false;
    var end = Date.now() + Number(mock.getAttribute('data-minutes')) * 60000;
    var tick = function () {
      var left = Math.max(0, Math.round((end - Date.now()) / 1000));
      timerEl.textContent = format(left);
      timerEl.classList.toggle('is-low', left <= 600);
      if (left === 0) submit(true);
    };
    tick();
    timer = setInterval(tick, 1000);
    qs[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  submitBtn.addEventListener('click', function () {
    var left = qs.length - qs.filter(answered).length;
    if (window.confirm('Submit the test?' + (left ? ' ' + left + ' questions are unanswered.' : ''))) submit(false);
  });

  function submit(timeUp) {
    if (submitted) return;
    submitted = true;
    clearInterval(timer);
    submitBtn.hidden = true;
    var score = 0, right = 0, wrong = 0, skipped = 0, bySubject = {}, order = [];
    qs.forEach(function (q, i) {
      var marks = Number(q.getAttribute('data-marks'));
      var subject = q.getAttribute('data-subject');
      var quiz = quizOf(q);
      if (!bySubject[subject]) { bySubject[subject] = { got: 0, max: 0 }; order.push(subject); }
      bySubject[subject].max += marks;
      var cell = palette.children[i];
      var got = 0;
      if (!answered(q)) { skipped++; cell.classList.add('is-skipped'); }
      else if (correct(q)) { right++; got = marks; cell.classList.add('is-right'); }
      else {
        wrong++;
        if (quiz.getAttribute('data-type') === 'mcq') got = -marks / 3;   // negative marks only for MCQs
        cell.classList.add('is-wrong');
      }
      score += got;
      bySubject[subject].got += got;
      // Show the answer, mark the options and lock the inputs.
      quiz.querySelectorAll('.quiz-options input').forEach(function (inp) {
        var li = inp.closest('li');
        li.classList.toggle('is-right', inp.hasAttribute('data-correct'));
        li.classList.toggle('is-wrong', inp.checked && !inp.hasAttribute('data-correct'));
      });
      quiz.querySelectorAll('input').forEach(function (inp) { inp.disabled = true; });
      var ans = quiz.querySelector('.quiz-answer');
      ans.hidden = false;
      ans.open = !answered(q) || !correct(q);
    });
    var total = Math.round(score * 100) / 100;
    var bestKey = 'gs-mock-' + id;
    var best = read(bestKey);
    if (best === null || total > Number(best)) store(bestKey, String(total));
    var rows = order.map(function (s) {
      var r = bySubject[s];
      return '<tr><td>' + s + '</td><td>' + (Math.round(r.got * 100) / 100) + '</td><td>' + r.max + '</td></tr>';
    }).join('');
    result.innerHTML = '<h2>' + (timeUp ? 'Time is up. ' : '') + 'Your score: ' + total + ' / 100</h2>' +
      '<p>Correct: ' + right + ' &middot; Wrong: ' + wrong + ' &middot; Unanswered: ' + skipped + '</p>' +
      '<div class="table-wrap"><table><thead><tr><th>Subject</th><th>Marks</th><th>Out of</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
      '<p>Scroll down to see every answer with its explanation. Wrong and unanswered questions are opened for you; each one links to its lesson.</p>';
    result.hidden = false;
    result.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
})();
