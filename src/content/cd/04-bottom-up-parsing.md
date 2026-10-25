---
title: Bottom-Up Parsing and LR Parsers
chapter: Front End
description: Shift-reduce parsing and handles, LR(0) items, closure and goto, the canonical collection, SLR, canonical LR(1) and LALR(1) parsers, shift-reduce and reduce-reduce conflicts, and the relative power of parsers.
---
A **bottom-up** parser starts from the input tokens and repeatedly replaces a substring that matches the right side of a production by its left side (a **reduction**), until only the start symbol is left. Read backwards, the reductions form a **rightmost derivation**.

## Shift-reduce parsing

The parser has a stack and the remaining input, and four actions:

- **Shift**: push the next input token.
- **Reduce**: the top of the stack matches the right side β of A → β; pop β and push A.
- **Accept**: the stack holds the start symbol and the input is empty.
- **Error**.

The substring that should be reduced next is the **handle**: the right side of the production used in the corresponding step of the rightmost derivation. The difficulty is knowing when the top of the stack is a handle. For the grammar S → aSb | c and the input `aacbb`:

| Stack | Input | Action |
| --- | --- | --- |
| $ | aacbb$ | shift |
| $a | acbb$ | shift |
| $aa | cbb$ | shift |
| $aac | bb$ | reduce S → c |
| $aaS | bb$ | shift |
| $aaSb | b$ | reduce S → aSb |
| $aS | b$ | shift |
| $aSb | $ | reduce S → aSb |
| $S | $ | accept |

Two kinds of conflicts can make a grammar unsuitable: a **shift-reduce conflict** (the parser cannot tell whether to shift or reduce) and a **reduce-reduce conflict** (two different reductions are possible).

## LR parsers

**LR(k)** parsers scan **L**eft to right, build a **R**ightmost derivation in reverse, and use **k** tokens of lookahead. They decide every action with a table built from a finite automaton whose states are sets of **items**.

An **LR(0) item** is a production with a dot showing how much of it has been seen: A → X·YZ means X is on the stack and the parser expects to see something derivable from YZ next. An item A → XYZ· (dot at the end) means the right side is complete and ready to be reduced.

- **closure(I)**: if A → α·Bβ is in I, add B → ·γ for every production of B (repeat).
- **goto(I, X)**: move the dot over X in every item of I where X follows the dot, then take the closure.

Starting from closure({S′ → ·S}) for an augmented grammar (new start S′ → S), applying goto with every symbol builds the **canonical collection of LR(0) item sets**: the states of the parser's automaton.

```python
def lr0_states(grammar, start):
    prods = [("S'", (start,))] + [(A, tuple(p)) for A, ps in grammar.items() for p in ps]

    def closure(items):
        items, changed = set(items), True
        while changed:
            changed = False
            for i, dot in list(items):
                rhs = prods[i][1]
                if dot < len(rhs) and rhs[dot] in grammar:
                    for j, (B, _) in enumerate(prods):
                        if B == rhs[dot] and (j, 0) not in items:
                            items.add((j, 0))
                            changed = True
        return frozenset(items)

    def goto(I, X):
        return closure({(i, d + 1) for i, d in I if d < len(prods[i][1]) and prods[i][1][d] == X})

    states, k = [closure({(0, 0)})], 0
    symbols = sorted({x for _, rhs in prods for x in rhs})
    while k < len(states):
        for X in symbols:
            J = goto(states[k], X)
            if J and J not in states:
                states.append(J)
        k += 1
    return prods, states

def show(prods, item):
    A, rhs = prods[item[0]]
    return f"{A} -> {' '.join(rhs[:item[1]] + ('.',) + rhs[item[1]:])}"

prods, states = lr0_states({"S": [["a", "S", "b"], ["c"]]}, "S")
for n, I in enumerate(states):
    print(f"I{n}: " + ";  ".join(show(prods, it) for it in sorted(I)))
```
```output
I0: S' -> . S;  S -> . a S b;  S -> . c
I1: S' -> S .
I2: S -> . a S b;  S -> a . S b;  S -> . c
I3: S -> c .
I4: S -> a S . b
I5: S -> a S b .
```

The transitions between these item sets form the parser's automaton (I1 is the accepting state):

```automaton
caption: The LR(0) automaton for S → aSb | c
states: I1 I0 I2 I4 I5 I3
start: I0
accept: I1
I0 -> I1 : S
I0 -> I2 : a
I2 -> I2 : a
I2 -> I4 : S
I4 -> I5 : b
I0 -> I3 : c
I2 -> I3 : c
```

## SLR, CLR and LALR

The item sets give the **shift** and **goto** entries directly. They differ in where they put **reduce** actions for a complete item A → α·:

| Parser | Reduce by A → α in a state containing A → α· when the next token is | States |
| --- | --- | --- |
| **LR(0)** | **any** token (no lookahead) | LR(0) collection |
| **SLR(1)** | a token in **FOLLOW(A)** | LR(0) collection |
| **Canonical LR(1)** (CLR) | the specific **lookahead** carried in the LR(1) item [A → α·, a] | LR(1) collection: often many more states |
| **LALR(1)** | the lookaheads obtained by **merging** LR(1) states with the same core | Same number as LR(0) / SLR |

Power: **LR(0) ⊂ SLR(1) ⊂ LALR(1) ⊂ LR(1)** (as classes of grammars), and every LL(1) grammar is LR(1). Merging states in LALR can create **reduce-reduce** conflicts that the canonical LR(1) parser did not have, but **never new shift-reduce** conflicts. Parser generators such as **Yacc and Bison** build LALR(1) parsers: almost as powerful as LR(1), with tables as small as SLR's.

The program below counts the LR(0) states of some grammars and checks for conflicts in the LR(0) and SLR tables:

```python
def analyse(grammar, start):
    prods = [("S'", (start,))] + [(A, tuple(p)) for A, ps in grammar.items() for p in ps]
    def closure(items):
        items = set(items)
        while True:
            new = {(j, 0) for i, d in items if d < len(prods[i][1]) and prods[i][1][d] in grammar
                   for j, (B, _) in enumerate(prods) if B == prods[i][1][d]}
            if new <= items:
                return frozenset(items)
            items |= new
    states, k = [closure({(0, 0)})], 0
    symbols = sorted({x for _, r in prods for x in r})
    while k < len(states):
        for X in symbols:
            J = closure({(i, d + 1) for i, d in states[k] if d < len(prods[i][1]) and prods[i][1][d] == X})
            if J and J not in states:
                states.append(J)
        k += 1
    # FIRST and FOLLOW (no epsilon productions in these grammars)
    FIRST = {A: set() for A in grammar}
    for _ in range(10):
        for A, ps in grammar.items():
            for p in ps:
                FIRST[A] |= FIRST[p[0]] if p[0] in grammar else {p[0]}
    FOLLOW = {A: set() for A in grammar}
    FOLLOW[start].add("$")
    for _ in range(10):
        for A, ps in grammar.items():
            for p in ps:
                for i, X in enumerate(p):
                    if X in grammar:
                        nxt = p[i + 1] if i + 1 < len(p) else None
                        FOLLOW[X] |= FOLLOW[A] if nxt is None else (FIRST[nxt] if nxt in grammar else {nxt})
    lr0 = slr = 0
    for I in states:
        done = [i for i, d in I if d == len(prods[i][1]) and i != 0]
        shift = {prods[i][1][d] for i, d in I if d < len(prods[i][1]) and prods[i][1][d] not in grammar}
        lr0 += bool(done and shift) or len(done) > 1
        looks = [FOLLOW[prods[i][0]] for i in done]
        slr += any(l & shift for l in looks) or any(a & b for n, a in enumerate(looks) for b in looks[n + 1:])
    return len(states), lr0, slr

grammars = {
    "S -> aSb | c": {"S": [["a", "S", "b"], ["c"]]},
    "E -> E+T | T, T -> T*F | F, F -> (E) | id": {"E": [["E", "+", "T"], ["T"]], "T": [["T", "*", "F"], ["F"]], "F": [["(", "E", ")"], ["id"]]},
    "S -> L=R | R, L -> *R | id, R -> L": {"S": [["L", "=", "R"], ["R"]], "L": [["*", "R"], ["id"]], "R": [["L"]]},
}
for name, g in grammars.items():
    n, lr0, slr = analyse(g, list(g)[0])
    print(f"{name:42} {n:2} states, LR(0) conflict states: {lr0}, SLR conflict states: {slr}")
```
```output
S -> aSb | c                                6 states, LR(0) conflict states: 0, SLR conflict states: 0
E -> E+T | T, T -> T*F | F, F -> (E) | id  12 states, LR(0) conflict states: 2, SLR conflict states: 0
S -> L=R | R, L -> *R | id, R -> L         10 states, LR(0) conflict states: 1, SLR conflict states: 1
```

- S → aSb | c is LR(0).
- The expression grammar has shift-reduce conflicts in LR(0) (after E → T· the parser cannot decide whether to reduce or shift `*`), but SLR resolves them with FOLLOW(E) = {+, ), $}, which does not contain `*`.
- The assignment grammar S → L = R | R is **not SLR**: in the state with S → L·= R and R → L·, the token `=` is in FOLLOW(R), giving a shift-reduce conflict. It **is** LALR(1): the precise LR(1) lookahead of R → L· in that state is only $.

## Practice questions

```quiz
q: How many states does the canonical collection of LR(0) items have for the augmented grammar S′ → S, S → aSb | c?
answer: 6
verify:
  prods = [("S'", ("S",)), ("S", ("a", "S", "b")), ("S", ("c",))]
  def closure(I):
      I = set(I)
      while True:
          new = {(j, 0) for i, d in I if d < len(prods[i][1]) and prods[i][1][d] == "S" for j in (1, 2)}
          if new <= I: return frozenset(I)
          I |= new
  states, k = [closure({(0, 0)})], 0
  while k < len(states):
      for X in "Sabc":
          J = closure({(i, d + 1) for i, d in states[k] if d < len(prods[i][1]) and prods[i][1][d] == X})
          if J and J not in states: states.append(J)
      k += 1
  print(len(states))
explain: I0 = closure of S′ → ·S; then goto on S (accept item), on a (S → a·Sb plus closure), on c (S → c·), then from the a-state goto on S (S → aS·b) and on b (S → aSb·). The a-state loops to itself on a and goes to the c-state on c. Six states.
```

```quiz
q: Which statement about the relative power of LR parsers is **true**?
- SLR(1) parsers can parse every LALR(1) grammar
* Every SLR(1) grammar is LALR(1), and every LALR(1) grammar is LR(1)
- LALR(1) parsers have more states than canonical LR(1) parsers
- Merging LR(1) states into LALR(1) states can create new shift-reduce conflicts
explain: The hierarchy is LR(0) ⊂ SLR(1) ⊂ LALR(1) ⊂ LR(1). LALR has as many states as LR(0) (fewer than or equal to LR(1)). Merging states with the same core can only add reduce-reduce conflicts, never shift-reduce ones.
```

```quiz
q: In shift-reduce parsing of `aacbb` with S → aSb | c, how many **reduce** actions are performed?
answer: 3
verify:
  stack, inp, reduces = [], list("aacbb"), 0
  while True:
      if stack[-1:] == ["c"]:
          stack[-1:] = ["S"]; reduces += 1
      elif stack[-3:] == ["a", "S", "b"]:
          stack[-3:] = ["S"]; reduces += 1
      elif inp:
          stack.append(inp.pop(0))
      else:
          break
  print(reduces)
explain: One reduction S → c, then S → aSb twice (once for each a): 3 reductions, matching the 3 steps of the rightmost derivation S ⇒ aSb ⇒ aaSbb ⇒ aacbb.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* LR parsers find a rightmost derivation in reverse
* Every LL(1) grammar is also LR(1)
- An ambiguous grammar can be LR(1)
* SLR(1) and LALR(1) parsers for the same grammar have the same number of states
explain: Bottom-up parsing reverses a rightmost derivation. LR(1) is strictly more general than LL(1). An LR(1) table gives each input one parse, so ambiguous grammars are never LR(1) (parser generators accept them only with extra precedence rules). Both SLR and LALR use the LR(0) cores as states.
```
