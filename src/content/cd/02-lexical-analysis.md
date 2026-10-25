---
title: Lexical Analysis
chapter: Front End
description: Tokens, lexemes and patterns, specifying tokens with regular expressions, the longest-match and priority rules, recognising tokens with finite automata, counting tokens in a program, and lexical errors.
---
The **lexical analyser** (scanner, lexer) reads the source program as a stream of characters and groups them into **tokens**, the "words" of the language. It also removes white space and comments, counts lines for error messages, and enters identifiers into the symbol table.

## Tokens, lexemes and patterns

| Term | Meaning | Example |
| --- | --- | --- |
| **Token** | A category of words, passed to the parser as ⟨name, attribute⟩ | ⟨id, pointer to symbol-table entry⟩, ⟨num, 60⟩ |
| **Lexeme** | The actual characters in the source that form one token | `rate`, `60`, `<=` |
| **Pattern** | The rule describing all lexemes of a token, usually a regular expression | id: letter (letter \| digit)\* |

Typical token classes: **keywords** (`if`, `while`, `int`), **identifiers**, **constants** (numbers, characters), **string literals**, **operators** (`+`, `<=`, `++`) and **punctuation** (`;`, `,`, `(`, `{`).

## Specifying tokens

Each token's pattern is a regular expression, so the set of tokens is a **regular language** and can be recognised by a finite automaton:

| Token | Regular expression |
| --- | --- |
| digit | [0-9] |
| letter | [A-Za-z_] |
| id | letter (letter \| digit)\* |
| number | digit⁺ (. digit\*)? (E [+−]? digit⁺)? |
| relop | < \| <= \| == \| != \| > \| >= |
| whitespace | (blank \| tab \| newline)⁺ |

Tools such as **Lex** and **Flex** take such a list of patterns with actions and generate the scanner: they turn each regular expression into an NFA, combine them, and convert the result into one DFA.

## Resolving ambiguities

The input `<=` could be `<` followed by `=`, and `iffy` could be the keyword `if` followed by `fy`. Scanners use two rules:

1. **Longest match** (maximal munch): always take the longest prefix that matches some pattern. So `<=` is one token, `iffy` is one identifier, and `a+++b` is `a ++ + b`.
2. **Priority**: if several patterns match the same longest lexeme, choose the one listed first. Keywords are listed before identifiers, so `if` is a keyword, not an identifier.

To apply longest match, the scanner may read **ahead** past the end of a token (to see that `<` is not followed by `=`) and then push the extra character back.

## Counting tokens

GATE often asks how many tokens a statement contains. The rules: a string literal is **one** token however long, comments and white space are **not** tokens, and multi-character operators (`++`, `<=`, `+=`, `->`, `>>`) count as one. This scanner, built from regular expressions with longest match, does the counting:

```python
import re

TOKEN_SPEC = [
    ("COMMENT", r"//[^\n]*|/\*[\s\S]*?\*/"),
    ("STRING",  r'"(?:\\.|[^"\\])*"'),
    ("CHAR",    r"'(?:\\.|[^'\\])'"),
    ("NUMBER",  r"\d+\.\d*(?:[eE][+-]?\d+)?|\d+(?:[eE][+-]?\d+)?"),
    ("KEYWORD", r"\b(?:int|float|char|if|else|while|for|return|void)\b"),
    ("ID",      r"[A-Za-z_]\w*"),
    ("OP",      r"\+\+|--|->|<=|>=|==|!=|&&|\|\||\+=|-=|\*=|/=|<<|>>|[-+*/%=<>!&|^~?:]"),
    ("PUNCT",   r"[;,(){}\[\].]"),
    ("SPACE",   r"\s+"),
]
SCANNER = re.compile("|".join(f"(?P<{name}>{pattern})" for name, pattern in TOKEN_SPEC))

def tokenize(source):
    result, pos = [], 0
    while pos < len(source):
        m = SCANNER.match(source, pos)
        if m is None:
            raise SyntaxError(f"lexical error: unexpected {source[pos]!r} at position {pos}")
        if m.lastgroup not in ("SPACE", "COMMENT"):
            result.append(m.group())
        pos = m.end()
    return result

for line in ['printf("x = %d, y = %d", x, &y);',
             "int a[10], *p = &a[2]; /* pointer */ p++;",
             "c = a+++b;"]:
    toks = tokenize(line)
    print(len(toks), "tokens:", " | ".join(toks))
```
```output
10 tokens: printf | ( | "x = %d, y = %d" | , | x | , | & | y | ) | ;
18 tokens: int | a | [ | 10 | ] | , | * | p | = | & | a | [ | 2 | ] | ; | p | ++ | ;
7 tokens: c | = | a | ++ | + | b | ;
```

(Python's `re` alternation picks the first alternative that matches, so the patterns list longer operators such as `++` before `+` to get the longest match.)

## Lexical errors

A lexical error occurs when no pattern matches a prefix of the remaining input, for example a stray `@` or `#` in C code (outside the preprocessor), or an unterminated string. The scanner can recover by **panic mode**: delete characters until a token can be formed. Most errors, such as `fi (x)` instead of `if (x)`, are **not** lexical errors: `fi` is a valid identifier, and the mistake is found later by the parser.

## Practice questions

```quiz
q: How many tokens are in the C statement `if (x<=y) x += y--;`?
code: python
  import re
  scanner = re.compile(r'\+\+|--|<=|\+=|[A-Za-z_]\w*|\d+|[-+*/=<>;,()]|\s+')
  print(len([t for t in scanner.findall("if (x<=y) x += y--;") if not t.isspace()]))
answer: 11
explain: if ( x <= y ) x += y -- ; : the operators <=, += and -- are single tokens, giving 11.
```

```quiz
q: How many tokens are in `while(i++<n)sum=sum+a[i]*2.5e3;`?
code: python
  import re
  scanner = re.compile(r'\d+\.\d*(?:[eE][+-]?\d+)?|\d+|\+\+|[A-Za-z_]\w*|[-+*/=<>;,()\[\]]')
  print(len(scanner.findall("while(i++<n)sum=sum+a[i]*2.5e3;")))
answer: 18
explain: while ( i ++ < n ) sum = sum + a [ i ] * 2.5e3 ; : 18 tokens. The number 2.5e3 is a single token.
```

```quiz
q: How does a scanner using the longest-match rule split `a+++b`?
- a + ++ b
* a ++ + b
- a + + + b
- It reports a lexical error
explain: From the start of `+++`, the longest operator is `++`, so the scanner takes it; then `+` is left. The parser sees a ++ + b, that is (a++) + b.
```

```quiz
q: Which of these are **lexical** errors in C? (Select all that apply.)
* An `@` character in the middle of an expression
* A string literal with no closing quote
- `fi (x > 0)` written instead of `if (x > 0)`
- Using a variable that was never declared
explain: No token pattern matches `@` or an unterminated string. `fi` is a perfectly valid identifier, so the error appears only to the parser (or later), and undeclared variables are found by semantic analysis.
```
