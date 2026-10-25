// A tiny, dependency-free syntax highlighter used at build time.
// It wraps tokens in <span class="tok-*"> elements; colours live in style.css.

const words = (s) => new Set(s.trim().split(/\s+/));

const grammars = {
  python: {
    keywords: words(`and as assert async await break class continue def del elif else except
      finally for from global if import in is lambda nonlocal not or pass raise return try
      while with yield match case`),
    constants: words('True False None'),
    builtins: words(`print input len range int float str bool list dict set tuple type abs min
      max sum sorted enumerate zip open round isinstance map filter`),
    comment: /#[^\n]*/,
    string: /[rRbBfFuU]{0,2}(?:"""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*')/,
  },
  c: {
    keywords: words(`auto break case char const continue default do double else enum extern
      float for goto if int long register return short signed sizeof static struct switch
      typedef union unsigned void volatile while`),
    constants: words('true false NULL'),
    builtins: words('printf scanf puts putchar malloc free strlen strcpy strcmp bool'),
    comment: /\/\/[^\n]*|\/\*[\s\S]*?\*\//,
    string: /"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'/,
    preprocessor: /#[ \t]*(?:include|define|ifdef|ifndef|endif|if|else|pragma)[^\n]*/,
  },
  java: {
    keywords: words(`abstract assert boolean break byte case catch char class const continue
      default do double else enum extends final finally float for if implements import
      instanceof int interface long native new package private protected public return short
      static super switch synchronized this throw throws try var void volatile while record`),
    constants: words('true false null'),
    builtins: words('System String Math Integer Double Scanner ArrayList List Arrays'),
    comment: /\/\/[^\n]*|\/\*[\s\S]*?\*\//,
    string: /"""[\s\S]*?"""|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'/,
    classNames: true,
  },
  javascript: {
    keywords: words(`async await break case catch class const continue debugger default delete
      do else export extends finally for function if import in instanceof let new of return
      static super switch this throw try typeof var void while yield`),
    constants: words('true false null undefined NaN Infinity'),
    builtins: words('console Math JSON Array Object Number String Boolean Promise Map Set Date parseInt parseFloat'),
    comment: /\/\/[^\n]*|\/\*[\s\S]*?\*\//,
    string: /`(?:\\[\s\S]|[^`\\])*`|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'/,
    classNames: true,
  },
  // SQL keywords are matched case-insensitively; lessons write them in capitals.
  sql: {
    keywords: words(`SELECT FROM WHERE AND OR NOT IN IS NULL AS DISTINCT ORDER BY GROUP HAVING
      ASC DESC JOIN INNER LEFT RIGHT FULL OUTER CROSS NATURAL ON USING UNION ALL INTERSECT
      EXCEPT EXISTS ANY SOME BETWEEN LIKE CASE WHEN THEN ELSE END CREATE TABLE INSERT INTO
      VALUES UPDATE SET DELETE DROP PRIMARY KEY FOREIGN REFERENCES UNIQUE CHECK DEFAULT
      CONSTRAINT INTEGER INT TEXT REAL VARCHAR CHAR LIMIT VIEW WITH RECURSIVE CASCADE`),
    constants: words('TRUE FALSE'),
    builtins: words('COUNT SUM AVG MIN MAX COALESCE ROUND LENGTH UPPER LOWER'),
    comment: /--[^\n]*/,
    string: /'(?:''|[^'\n])*'/,
    ignoreCase: true,
  },
};

const NUMBER = /\b(?:0[xX][\da-fA-F]+|\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)[fFlLuU]?\b/;
const WORD = /[A-Za-z_$][\w$]*/;
const OPERATOR = /[+\-*/%=<>!&|^~?:]+/;

const compiled = {};
function regexFor(lang) {
  if (compiled[lang]) return compiled[lang];
  const g = grammars[lang];
  const parts = [
    ['comment', g.comment],
    g.preprocessor && ['preprocessor', g.preprocessor],
    ['string', g.string],
    ['number', NUMBER],
    ['word', WORD],
    ['operator', OPERATOR],
  ].filter(Boolean);
  const source = parts.map(([name, re]) => `(?<${name}>${re.source})`).join('|');
  return (compiled[lang] = new RegExp(source, 'g'));
}

export function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const span = (cls, text) => `<span class="tok-${cls}">${escapeHtml(text)}</span>`;

export function highlight(code, lang) {
  const g = grammars[lang];
  if (!g) return escapeHtml(code);
  const re = regexFor(lang);
  let out = '';
  let last = 0;
  for (const m of code.matchAll(re)) {
    out += escapeHtml(code.slice(last, m.index));
    last = m.index + m[0].length;
    const t = m.groups;
    const text = m[0];
    if (t.comment) out += span('comment', text);
    else if (t.preprocessor) out += span('meta', text);
    else if (t.string) out += span('string', text);
    else if (t.number) out += span('number', text);
    else if (t.operator) out += span('operator', text);
    else if (g.keywords.has(g.ignoreCase ? text.toUpperCase() : text)) out += span('keyword', text);
    else if (g.constants.has(g.ignoreCase ? text.toUpperCase() : text)) out += span('constant', text);
    else if (g.builtins.has(g.ignoreCase ? text.toUpperCase() : text)) out += span('builtin', text);
    else if (/^\s*\(/.test(code.slice(last))) out += span('function', text);
    else if (g.classNames && /^[A-Z][a-z]/.test(text)) out += span('class', text);
    else out += escapeHtml(text);
  }
  return out + escapeHtml(code.slice(last));
}

export const supportedLanguages = Object.keys(grammars);
