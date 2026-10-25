---
title: Top-Down Parsing and LL(1)
chapter: Front End
description: The parser's job, top-down parsing, eliminating left recursion and left factoring, FIRST and FOLLOW sets, building an LL(1) parsing table, table-driven predictive parsing, and recursive descent.
---
The **parser** (syntax analyser) checks that the token stream follows the grammar of the language and builds a parse tree (or directly a syntax tree). Parsers come in two families:

- **Top-down** parsers build the tree from the root, expanding the start symbol towards the input (finding a **leftmost derivation**).
- **Bottom-up** parsers build it from the leaves, reducing the input towards the start symbol (finding a **rightmost derivation in reverse**), covered in the next lesson.

## Preparing a grammar for top-down parsing

A top-down parser decides which production to use by looking at the next input token. Two grammar features make that impossible:

**Left recursion** (A → Aα): the parser would expand A forever without consuming input. Replace

A → Aα | β

with the right-recursive

A → βA′,  A′ → αA′ | ε

For example E → E + T | T becomes E → T E′, E′ → + T E′ | ε.

**Common prefixes** (A → αβ₁ | αβ₂): the parser cannot choose until it has seen past α. **Left factoring** delays the choice:

A → αA′,  A′ → β₁ | β₂

## FIRST and FOLLOW

- **FIRST(α)**: the terminals that can begin a string derived from α (plus ε if α can derive ε).
- **FOLLOW(A)**: the terminals that can appear **immediately after** A in some sentential form (plus $, the end marker, if A can be at the end).

Rules for FOLLOW:

1. Put $ in FOLLOW(start symbol).
2. For a production B → αAβ, add FIRST(β) − {ε} to FOLLOW(A).
3. For B → αA, or B → αAβ where β can derive ε, add FOLLOW(B) to FOLLOW(A).

Repeat until nothing changes. The program below computes both sets for the expression grammar without left recursion:

E → T E′, E′ → + T E′ | ε, T → F T′, T′ → \* F T′ | ε, F → ( E ) | id

```python
def first_follow(grammar, start):
    FIRST = {A: set() for A in grammar}
    FOLLOW = {A: set() for A in grammar}
    FOLLOW[start].add("$")

    def first_of(seq):
        out = set()
        for X in seq:
            f = FIRST[X] if X in grammar else {X}
            out |= f - {"ε"}
            if "ε" not in f:
                return out
        return out | {"ε"}

    changed = True
    while changed:
        changed = False
        for A, prods in grammar.items():
            for p in prods:
                f = first_of([x for x in p if x != "ε"])
                if not f <= FIRST[A]:
                    FIRST[A] |= f
                    changed = True
    changed = True
    while changed:
        changed = False
        for A, prods in grammar.items():
            for p in prods:
                p = [x for x in p if x != "ε"]
                for i, X in enumerate(p):
                    if X in grammar:
                        f = first_of(p[i + 1:])
                        add = (f - {"ε"}) | (FOLLOW[A] if "ε" in f else set())
                        if not add <= FOLLOW[X]:
                            FOLLOW[X] |= add
                            changed = True
    return FIRST, FOLLOW, first_of

G = {"E": [["T", "E'"]], "E'": [["+", "T", "E'"], ["ε"]],
     "T": [["F", "T'"]], "T'": [["*", "F", "T'"], ["ε"]], "F": [["(", "E", ")"], ["id"]]}
FIRST, FOLLOW, first_of = first_follow(G, "E")
for A in G:
    print(f"{A:3} FIRST = {sorted(FIRST[A])!s:16} FOLLOW = {sorted(FOLLOW[A])}")
```
```output
E   FIRST = ['(', 'id']      FOLLOW = ['$', ')']
E'  FIRST = ['+', 'ε']       FOLLOW = ['$', ')']
T   FIRST = ['(', 'id']      FOLLOW = ['$', ')', '+']
T'  FIRST = ['*', 'ε']       FOLLOW = ['$', ')', '+']
F   FIRST = ['(', 'id']      FOLLOW = ['$', ')', '*', '+']
```

## The LL(1) parsing table

**LL(1)** means: scan the input **L**eft to right, produce a **L**eftmost derivation, with **1** token of lookahead. The table M[A, a] says which production to use when A is on top of the stack and a is the next token:

- For each production A → α and each terminal a in FIRST(α), set M[A, a] = A → α.
- If ε ∈ FIRST(α), also set M[A, b] = A → α for each b in FOLLOW(A) (including $).

A grammar is **LL(1)** if no cell gets two productions. Equivalently, for every pair of alternatives A → α | β: FIRST(α) and FIRST(β) are disjoint, and if one of them can derive ε, the other's FIRST set is disjoint from FOLLOW(A).

A **predictive parser** uses the table and a stack. Start with $ E on the stack. Repeatedly: if the top is a terminal, it must match the input token (pop and advance); if it is a variable A, replace it by the right side of M[A, a] (pushed in reverse); accept when both stack and input reach $.

```python
def first_follow(grammar, start):
    FIRST = {A: set() for A in grammar}
    FOLLOW = {A: set() for A in grammar}
    FOLLOW[start].add("$")
    def first_of(seq):
        out = set()
        for X in seq:
            f = FIRST[X] if X in grammar else {X}
            out |= f - {"ε"}
            if "ε" not in f:
                return out
        return out | {"ε"}
    for _ in range(len(grammar) + 2):
        for A, prods in grammar.items():
            for p in prods:
                FIRST[A] |= first_of([x for x in p if x != "ε"])
    for _ in range(len(grammar) + 2):
        for A, prods in grammar.items():
            for p in prods:
                p = [x for x in p if x != "ε"]
                for i, X in enumerate(p):
                    if X in grammar:
                        f = first_of(p[i + 1:])
                        FOLLOW[X] |= (f - {"ε"}) | (FOLLOW[A] if "ε" in f else set())
    return FIRST, FOLLOW, first_of

G = {"E": [["T", "E'"]], "E'": [["+", "T", "E'"], ["ε"]],
     "T": [["F", "T'"]], "T'": [["*", "F", "T'"], ["ε"]], "F": [["(", "E", ")"], ["id"]]}
FIRST, FOLLOW, first_of = first_follow(G, "E")
table = {}
for A, prods in G.items():
    for p in prods:
        f = first_of([x for x in p if x != "ε"])
        for a in (f - {"ε"}) | (FOLLOW[A] if "ε" in f else set()):
            assert (A, a) not in table, "not LL(1)"
            table[(A, a)] = p

def parse(tokens):
    stack, tokens, steps = ["$", "E"], tokens + ["$"], 0
    while stack:
        top, a = stack.pop(), tokens[0]
        steps += 1
        if top == a:
            tokens.pop(0)
            if a == "$":
                return f"accepted in {steps} steps"
        elif top in G:
            prod = table.get((top, a))
            if prod is None:
                return f"syntax error at {a!r}"
            stack.extend(x for x in reversed(prod) if x != "ε")
        else:
            return f"syntax error: expected {top!r}, found {a!r}"

print(len(table), "table entries, no conflicts")
print("id + id * id :", parse(["id", "+", "id", "*", "id"]))
print("id + * id    :", parse(["id", "+", "*", "id"]))
```
```output
13 table entries, no conflicts
id + id * id : accepted in 17 steps
id + * id    : syntax error at '*'
```

## Recursive descent

A **recursive-descent parser** has one function per variable; each function looks at the next token to choose a production and calls the functions for the variables on its right side. For an LL(1) grammar no backtracking is needed. It is the easiest parser to write by hand, and many production compilers (GCC and Clang for C and C++) use hand-written recursive descent.

## Not LL(1)

A grammar is certainly **not** LL(1) if it is **left recursive**, **ambiguous**, or **not left factored**. Some languages have no LL(1) grammar at all. The classic case is the **dangling else**: S → i E t S S′ | a, S′ → e S | ε puts two productions in M[S′, e], because e is in both FIRST(e S) and FOLLOW(S′). Parsers resolve it by always choosing S′ → e S, which attaches each `else` to the nearest `if`.

## Practice questions

```quiz
q: For the grammar S → aABb | bA, A → c | ε, B → d | ε, what is FOLLOW(A)?
code: python
  G = {"S": [["a", "A", "B", "b"], ["b", "A"]], "A": [["c"], []], "B": [["d"], []]}
  FIRST = {"S": {"a", "b"}, "A": {"c", ""}, "B": {"d", ""}}      # "" stands for ε
  FOLLOW = {A: set() for A in G}
  FOLLOW["S"].add("$")
  for _ in range(5):
      for A, prods in G.items():
          for p in prods:
              for i, X in enumerate(p):
                  if X in G:
                      rest, nullable = set(), True
                      for Y in p[i + 1:]:
                          f = FIRST.get(Y, {Y})
                          rest |= f - {""}
                          if "" not in f:
                              nullable = False
                              break
                      FOLLOW[X] |= rest | (FOLLOW[A] if nullable else set())
  print("{" + ", ".join(sorted(FOLLOW["A"])) + "}")
- `{b, d}`
* `{$, b, d}`
- `{c, d, $}`
- `{b}`
explain: In S → aABb, A is followed by FIRST(Bb) = {d, b} (B can vanish, so b counts). In S → bA, A is at the end, so FOLLOW(S) = {$} is added. FOLLOW(A) = {$, b, d}.
```

```quiz
q: How many non-empty entries does the LL(1) table of S → aABb | bA, A → c | ε, B → d | ε have?
answer: 8
verify:
  G = {"S": [["a", "A", "B", "b"], ["b", "A"]], "A": [["c"], ["ε"]], "B": [["d"], ["ε"]]}
  FIRST = {"S": {"a", "b"}, "A": {"c", "ε"}, "B": {"d", "ε"}}
  FOLLOW = {"S": {"$"}, "A": {"$", "b", "d"}, "B": {"b"}}
  def first_of(p):
      out = set()
      for X in p:
          f = FIRST.get(X, {X})
          out |= f - {"ε"}
          if "ε" not in f: return out
      return out | {"ε"}
  cells = set()
  for A, prods in G.items():
      for p in prods:
          f = first_of([x for x in p if x != "ε"])
          cells |= {(A, a) for a in (f - {"ε"}) | (FOLLOW[A] if "ε" in f else set())}
  print(len(cells))
explain: S has 2 entries (a, b). A → c fills (A, c) and A → ε fills FOLLOW(A) = {$, b, d}: 4 entries. B → d fills (B, d) and B → ε fills FOLLOW(B) = {b}: 2 entries. Total 8, with no conflicts, so the grammar is LL(1).
```

```quiz
q: Which grammar is **LL(1)**?
- S → Sa | b
- S → ab | ac
* S → aS′, S′ → b | c
- S → A a | B b, A → c, B → c
explain: The first is left recursive and the second needs left factoring (both alternatives start with a). In the last, both alternatives start with c, so one token of lookahead cannot choose. The third is the left-factored version of the second, with disjoint FIRST sets {b} and {c}.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* An ambiguous grammar cannot be LL(1)
* Eliminating left recursion is necessary before top-down parsing
- Every context-free language has an LL(1) grammar
* A recursive-descent parser for an LL(1) grammar needs no backtracking
explain: An LL(1) table has at most one production per cell, so it gives every string one parse. Left recursion makes a top-down parser loop. Some CFLs (and some DCFLs) have no LL(1) grammar. With one-token lookahead deciding every choice, recursive descent never has to back up.
```
