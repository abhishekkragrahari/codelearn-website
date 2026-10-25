// GATE-style practice questions written as ```quiz blocks in lessons.
//
//   ```quiz
//   q: Which traversal of a BST gives the keys in sorted order?
//   - Preorder
//   * Inorder            <- "*" marks a correct option, "-" a wrong one
//   - Postorder
//   explain: Inorder visits left subtree, root, then right subtree.
//   ```
//
// One "*" makes an MCQ, several make an MSQ (multiple select). A question with
// "answer: 42" instead of options is a NAT (numerical answer type); an optional
// "verify: <python expression>" is evaluated by scripts/verify-examples.mjs and
// must equal the answer, so numerical answers are checked by a computer. For
// longer checks, leave "verify:" empty and indent a Python program under it
// that prints the answer.
// q: and explain: may continue on following lines; `code` and **bold** work.
import { escapeHtml } from './highlight.mjs';

export function parseQuiz(src) {
  const quiz = { q: [], options: [], explain: [], answer: null, verify: null };
  let field = null;
  for (const raw of src.split('\n')) {
    const line = raw.trimEnd();
    let m;
    if ((m = line.match(/^q:\s*(.*)$/))) { field = 'q'; quiz.q.push(m[1]); }
    else if ((m = line.match(/^explain:\s*(.*)$/))) { field = 'explain'; quiz.explain.push(m[1]); }
    else if ((m = line.match(/^answer:\s*(.*)$/))) { field = null; quiz.answer = m[1].trim(); }
    else if ((m = line.match(/^verify:\s*(.*)$/))) { field = m[1].trim() ? null : 'program'; quiz.verify = m[1].trim(); quiz.program = []; }
    else if (field === 'program' && (/^\s/.test(raw) || !line.trim())) quiz.program.push(raw);
    else if ((m = line.match(/^([*-])\s+(.*)$/))) { field = null; quiz.options.push({ correct: m[1] === '*', text: m[2] }); }
    else if (field === 'program') field = null;
    else if (field && line.trim()) quiz[field].push(line.trim());
    else if (field && !line.trim()) quiz[field].push('');
  }
  const join = (parts) => parts.join('\n').trim();
  const program = (quiz.program || []).filter((l) => l.trim());
  const indent = Math.min(...program.map((l) => l.match(/^\s*/)[0].length));
  const verifyProgram = program.length ? program.map((l) => l.slice(indent)).join('\n') : null;
  const result = { q: join(quiz.q), explain: join(quiz.explain), options: quiz.options, answer: quiz.answer, verify: quiz.verify || null, verifyProgram };
  if (!result.q) throw new Error('quiz: missing "q:"');
  if (result.answer == null) {
    const correct = result.options.filter((o) => o.correct).length;
    if (result.options.length < 2 || correct === 0) throw new Error(`quiz "${result.q.slice(0, 40)}": needs options with at least one "*"`);
    result.type = correct > 1 ? 'msq' : 'mcq';
  } else {
    result.type = 'nat';
  }
  return result;
}

let quizCounter = 0;

// `inline` is the Markdown inline renderer, passed in to keep this module simple.
export function renderQuiz(src, inline) {
  const quiz = parseQuiz(src);
  const id = `quiz${++quizCounter}`;
  const para = (text) => text.split(/\n\s*\n/).map((p) => `<p>${inline(p.replace(/\n/g, ' '))}</p>`).join('');
  const labels = { mcq: 'MCQ · one correct answer', msq: 'MSQ · one or more correct answers', nat: 'NAT · numerical answer' };
  let body;
  let answerText;
  if (quiz.type === 'nat') {
    body = `<label class="quiz-nat"><span>Your answer</span><input type="text" inputmode="decimal" autocomplete="off" data-quiz-input></label>`;
    answerText = `<strong>Answer: ${escapeHtml(quiz.answer)}</strong>`;
  } else {
    const kind = quiz.type === 'mcq' ? 'radio' : 'checkbox';
    body = `<ol class="quiz-options" type="A">${quiz.options
      .map((o, i) => `<li><label><input type="${kind}" name="${id}" value="${i}"${o.correct ? ' data-correct' : ''}><span>${inline(o.text)}</span></label></li>`)
      .join('')}</ol>`;
    const letters = quiz.options.map((o, i) => (o.correct ? String.fromCharCode(65 + i) : null)).filter(Boolean);
    answerText = `<strong>Answer: ${letters.join(', ')}</strong>`;
  }
  return `<div class="quiz" data-quiz data-type="${quiz.type}"${quiz.type === 'nat' ? ` data-answer="${escapeHtml(quiz.answer)}"` : ''}>
<div class="quiz-head"><span class="quiz-badge">GATE-style</span><span class="quiz-type">${labels[quiz.type]}</span></div>
<div class="quiz-q">${para(quiz.q)}</div>
${body}
<div class="quiz-actions"><button type="button" class="btn btn-primary btn-sm" data-quiz-check>Check answer</button><span class="quiz-feedback" data-quiz-feedback aria-live="polite"></span></div>
<details class="quiz-answer"><summary>Show answer and explanation</summary>${answerText}${quiz.explain ? para(quiz.explain) : ''}</details>
</div>`;
}
