---
title: Context-Free Grammars
chapter: Context-Free Languages
description: Grammars, derivations and parse trees, ambiguity and how to remove it, simplifying grammars, Chomsky and Greibach normal forms, and the CYK membership algorithm.
---
Regular languages cannot count or match nested structure, but programming languages are full of it: balanced parentheses, nested blocks, expressions inside expressions. **Context-free grammars** describe such structure; they are the basis of every parser.

## Definition

A **context-free grammar (CFG)** is a 4-tuple G = (V, T, P, S):

| Part | Meaning |
| --- | --- |
| V | Variables (non-terminals), written in capitals |
| T | Terminals: the alphabet of the language |
| P | Productions of the form **A → α**, with A ∈ V and α any string of variables and terminals |
| S ∈ V | The start variable |

"Context-free" means a variable can be replaced regardless of what surrounds it. A **derivation** applies productions starting from S until only terminals remain; the **language** L(G) is the set of terminal strings derivable from S.

Example: S → 0S1 | ε generates {0ⁿ1ⁿ | n ≥ 0}:

S ⇒ 0S1 ⇒ 00S11 ⇒ 000S111 ⇒ 000111

More examples:

| Language | Grammar |
| --- | --- |
| Balanced parentheses | S → (S) \| SS \| ε |
| Palindromes over {a, b} | S → aSa \| bSb \| a \| b \| ε |
| aⁿbᵐ with m ≥ n | S → aSb \| B, B → bB \| ε |
| Equal numbers of a's and b's | S → aSbS \| bSaS \| ε |

## Derivations and parse trees

A **leftmost derivation** always replaces the leftmost variable; a **rightmost derivation** the rightmost one. A **parse tree** shows the structure without the order: the root is S, each internal node is a variable whose children are the right side of the production used, and the leaves, read left to right, spell the string (the **yield**).

Every parse tree corresponds to exactly one leftmost derivation and one rightmost derivation.

## Ambiguity

A grammar is **ambiguous** if some string has **two or more parse trees** (equivalently, two leftmost derivations). The expression grammar

E → E + E | E \* E | a

is ambiguous: `a + a * a` can be grouped as a + (a \* a) or as (a + a) \* a.

```tree
caption: Parse tree for a + (a * a)
E
  E
    a
  +
  E
    E
      a
    *
    E
      a
```

```tree
caption: Parse tree for (a + a) * a
E
  E
    E
      a
    +
    E
      a
  *
  E
    a
```

The number of parse trees grows quickly. For a string of n operands joined only by `+`, it is the Catalan number C<sub>n−1</sub>:

```python
from functools import lru_cache

def parse_trees(tokens):
    # Counts the parse trees of E -> E + E | E * E | a for a token string.
    @lru_cache(maxsize=None)
    def count(i, j):
        if i == j:
            return 1 if tokens[i] == "a" else 0
        return sum(count(i, k - 1) * count(k + 1, j)
                   for k in range(i + 1, j) if tokens[k] in "+*")
    return count(0, len(tokens) - 1)

for expr in ["a+a*a", "a+a+a+a", "a+a+a+a+a"]:
    print(f"{expr:10} {parse_trees(expr)} parse trees")
```
```output
a+a*a      2 parse trees
a+a+a+a    5 parse trees
a+a+a+a+a  14 parse trees
```

Ambiguity is removed by rewriting the grammar to encode **precedence** (one variable per level) and **associativity** (left recursion for left-associative operators):

E → E + T | T, T → T \* F | F, F → (E) | a

Now `*` binds tighter than `+`, and both group from the left, so every string has exactly one parse tree.

Some context-free languages are **inherently ambiguous**: every grammar for them is ambiguous, for example {aⁱbʲcᵏ | i = j or j = k}. And deciding whether an arbitrary CFG is ambiguous is **undecidable**.

## Simplifying a grammar

Before converting to a normal form, remove in this order:

1. **ε-productions** (A → ε): find the **nullable** variables, then for every production add versions with nullable variables left out. (If ε ∈ L, keep S → ε.)
2. **Unit productions** (A → B): replace them by B's productions.
3. **Useless symbols**: variables that derive no terminal string (non-generating), then symbols that cannot be reached from S.

## Chomsky normal form (CNF)

Every production has one of the forms **A → BC** (two variables) or **A → a** (one terminal), plus S → ε if ε ∈ L.

- Every CFG (without ε) can be converted to CNF.
- Parse trees in CNF are binary, so deriving a string of length n takes exactly **2n − 1** steps: n − 1 uses of A → BC and n uses of A → a.

## Greibach normal form (GNF)

Every production has the form **A → aα**: a terminal followed by zero or more variables. Each step produces exactly one terminal, so a string of length n takes exactly **n** steps. GNF is useful for building a PDA directly from a grammar.

## The CYK algorithm

For a grammar in CNF, the **Cocke–Younger–Kasami** algorithm decides whether w ∈ L(G) by dynamic programming in O(n³) time. Table cell (i, j) holds the variables that derive the substring w[i..j]:

- Length 1: the variables A with A → wᵢ.
- Longer substrings: A is in cell (i, j) if A → BC, B is in (i, k) and C is in (k + 1, j) for some split k.
- w ∈ L(G) if S is in the cell for the whole string.

Grammar: S → AB | SC, A → CB | a, B → AC | b, C → a.

```python
grammar = {"S": [("A", "B"), ("S", "C")], "A": [("C", "B"), "a"],
           "B": [("A", "C"), "b"], "C": ["a"]}

def cyk(w):
    n = len(w)
    table = [[set() for _ in range(n)] for _ in range(n)]
    for i, ch in enumerate(w):
        table[i][i] = {A for A, rules in grammar.items() if ch in rules}
    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            for k in range(i, j):
                for A, rules in grammar.items():
                    for r in rules:
                        if isinstance(r, tuple) and r[0] in table[i][k] and r[1] in table[k + 1][j]:
                            table[i][j].add(A)
    return table

for w in ["ab", "abaa", "aab", "abba"]:
    t = cyk(w)
    print(f"{w:5} variables for the whole string: {sorted(t[0][len(w) - 1])}  accepted: {'S' in t[0][len(w) - 1]}")
```
```output
ab    variables for the whole string: ['A', 'S']  accepted: True
abaa  variables for the whole string: ['S']  accepted: True
aab   variables for the whole string: []  accepted: False
abba  variables for the whole string: ['S']  accepted: True
```

## Practice questions

```quiz
q: A grammar is in Chomsky normal form. How many steps does the derivation of a string of length 7 take?
answer: 13
verify: 2 * 7 - 1
explain: A CNF derivation uses n − 1 binary productions (A → BC) to create n variables, and n terminal productions (A → a): 2 × 7 − 1 = 13 steps.
```

```quiz
q: How many parse trees does the string a + a + a + a have in the grammar E → E + E | a?
answer: 5
verify:
  from functools import lru_cache
  toks = "a+a+a+a"
  @lru_cache(None)
  def c(i, j):
      if i == j: return 1
      return sum(c(i, k - 1) * c(k + 1, j) for k in range(i + 1, j) if toks[k] == "+")
  print(c(0, len(toks) - 1))
explain: The parse trees correspond to the ways of fully parenthesising 4 operands, which is the Catalan number C₃ = 5: ((a+a)+a)+a, (a+(a+a))+a, (a+a)+(a+a), a+((a+a)+a) and a+(a+(a+a)).
```

```quiz
q: Using the grammar S → AB | SC, A → CB | a, B → AC | b, C → a from this lesson, which string is **not** in the language?
code: python
  grammar = {"S": [("A", "B"), ("S", "C")], "A": [("C", "B"), "a"], "B": [("A", "C"), "b"], "C": ["a"]}
  def cyk(w):
      n = len(w)
      t = [[set() for _ in range(n)] for _ in range(n)]
      for i, ch in enumerate(w):
          t[i][i] = {A for A, rs in grammar.items() if ch in rs}
      for L in range(2, n + 1):
          for i in range(n - L + 1):
              j = i + L - 1
              for k in range(i, j):
                  for A, rs in grammar.items():
                      for r in rs:
                          if isinstance(r, tuple) and r[0] in t[i][k] and r[1] in t[k + 1][j]:
                              t[i][j].add(A)
      return "S" in t[0][n - 1]
  print([w for w in ["aba", "aab", "abb", "aaa"] if not cyk(w)][0])
- `aba`
* `aab`
- `abb`
- `aaa`
explain: Running CYK, the cell for the whole string aab is empty, so S cannot derive it. The other three strings have S in that cell; for example aba is derived as S ⇒ SC ⇒ ABC ⇒ aBC ⇒ abC ⇒ aba.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* Deciding whether a given CFG is ambiguous is undecidable
* Some context-free languages are inherently ambiguous
- Every ambiguous grammar can be made unambiguous for the same language
* In Greibach normal form, a string of length n is derived in exactly n steps
explain: There is no algorithm for ambiguity of CFGs, and inherently ambiguous languages have no unambiguous grammar at all. Each GNF step produces exactly one terminal.
```

```quiz
q: Which language does S → aSb | B, B → bB | ε generate?
- { aⁿbⁿ : n ≥ 0 }
* { aⁿbᵐ : m ≥ n ≥ 0 }
- { aⁿbᵐ : n ≥ m ≥ 0 }
- { aⁿbᵐ : n, m ≥ 0 }
explain: Each use of S → aSb adds one a and one b; B then adds any number of extra b's. So the b's are at least as many as the a's.
```
