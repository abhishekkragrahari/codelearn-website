---
title: Compiler Design GATE Practice Set
chapter: GATE Practice
description: Mixed GATE-style questions on tokens, FIRST and FOLLOW, LL(1) and LR parsing, syntax-directed translation, intermediate code, runtime environments and optimization.
---
These questions mix every lesson of the Compiler Design track, in the three GATE formats. For parsing questions, write the FIRST and FOLLOW sets or the item sets out in full; for code questions, number the instructions first. Every numerical answer is recomputed by a program when the site is built.

## Lexical and syntax analysis

```quiz
q: **[Tokens]** How many tokens does the C statement `for(i=0;i<n;i++) s+=a[i];` contain?
code: python
  import re
  scanner = re.compile(r"\+\+|\+=|[A-Za-z_]\w*|\d+|[-+*/=<>;,()\[\]]")
  print(len(scanner.findall("for(i=0;i<n;i++) s+=a[i];")))
answer: 20
explain: for ( i = 0 ; i < n ; i ++ ) s += a [ i ] ; gives 20 tokens; ++ and += are one token each.
```

```quiz
q: **[FOLLOW]** For S → A B c, A → a | ε, B → b | ε, what is FOLLOW(A)?
- `{b}`
* `{b, c}`
- `{a, b, c}`
- `{c, $}`
explain: In S → A B c, A is followed by FIRST(B c). B can derive ε, so this is {b} ∪ {c} = {b, c}. A never appears at the end of a right side, so $ is not included.
```

```quiz
q: **[LL(1)]** How many non-empty entries does the LL(1) parsing table for S → A B c, A → a | ε, B → b | ε have?
answer: 8
verify:
  G = {"S": [["A", "B", "c"]], "A": [["a"], []], "B": [["b"], []]}
  FIRST = {"S": {"a", "b", "c"}, "A": {"a", ""}, "B": {"b", ""}}
  FOLLOW = {"S": {"$"}, "A": {"b", "c"}, "B": {"c"}}
  def first_of(p):
      out = set()
      for X in p:
          f = FIRST.get(X, {X})
          out |= f - {""}
          if "" not in f: return out
      return out | {""}
  cells = set()
  for A, prods in G.items():
      for p in prods:
          f = first_of(p)
          cells |= {(A, a) for a in (f - {""}) | (FOLLOW[A] if "" in f else set())}
  print(len(cells))
explain: S → ABc goes under FIRST(ABc) = {a, b, c}: 3 entries. A → a under a, A → ε under FOLLOW(A) = {b, c}: 3 entries. B → b under b, B → ε under FOLLOW(B) = {c}: 2 entries. Total 8, with no conflicts.
```

```quiz
q: **[LR(0)]** How many states does the canonical collection of LR(0) items have for the augmented grammar S′ → S, S → (S) | x?
answer: 6
verify:
  prods = [("S'", ("S",)), ("S", ("(", "S", ")")), ("S", ("x",))]
  def closure(I):
      I = set(I)
      while True:
          new = {(j, 0) for i, d in I if d < len(prods[i][1]) and prods[i][1][d] == "S" for j in (1, 2)}
          if new <= I: return frozenset(I)
          I |= new
  states, k = [closure({(0, 0)})], 0
  while k < len(states):
      for X in ["S", "(", ")", "x"]:
          J = closure({(i, d + 1) for i, d in states[k] if d < len(prods[i][1]) and prods[i][1][d] == X})
          if J and J not in states: states.append(J)
      k += 1
  print(len(states))
explain: I0 (start), goto on S (accept), on ( (S → (·S) with closure), on x (S → x·); from the ( state, goto on S gives S → (S·) and then on ) gives S → (S)·. The ( state loops to itself on ( and reaches the x state on x. Six states.
```

```quiz
q: **[Parsers]** Which statement is **true**?
- Every LR(1) grammar is LL(1)
* Every LL(1) grammar is LR(1)
- An LALR(1) parser can have more states than the canonical LR(1) parser for the same grammar
- SLR(1) parsers are more powerful than LALR(1) parsers
explain: LR(1) parsing is strictly more general than LL(1). LALR(1) merges LR(1) states, so it has at most as many, and LALR(1) is more powerful than SLR(1).
```

## Translation and intermediate code

```quiz
q: **[SDT]** Using E → E \* T { E.val = E.val − T.val } | T, T → T + F { T.val = T.val × F.val } | F, F → num, what is the value of `8 * 3 + 2 * 1`?
code: python
  import re
  def ev(s):
      toks, pos = re.findall(r"\d+|\S", s), [0]
      def F():
          pos[0] += 1
          return int(toks[pos[0] - 1])
      def T():
          v = F()
          while pos[0] < len(toks) and toks[pos[0]] == "+":
              pos[0] += 1
              v = v * F()
          return v
      def E():
          v = T()
          while pos[0] < len(toks) and toks[pos[0]] == "*":
              pos[0] += 1
              v = v - T()
          return v
      return E()
  print(ev("8 * 3 + 2 * 1"))
answer: 1
explain: `+` sits lower in the grammar, so it binds tighter, and it means multiplication: 3 + 2 → 3 × 2 = 6. `*` means subtraction, left-associative: 8 − 6 − 1 = 1.
```

```quiz
q: **[DAG]** How many nodes does the DAG of `t1 = a + b; t2 = t1 * c; t3 = a + b; t4 = t3 * c; t5 = t2 - t4` have?
answer: 6
verify:
  nodes, table, cur = [], {}, {}
  def leaf(n):
      if n not in cur:
          nodes.append(n); cur[n] = len(nodes) - 1
      return cur[n]
  for t, op, a, b in [("t1", "+", "a", "b"), ("t2", "*", "t1", "c"), ("t3", "+", "a", "b"), ("t4", "*", "t3", "c"), ("t5", "-", "t2", "t4")]:
      key = (op, leaf(a), leaf(b))
      if key not in table:
          nodes.append(key); table[key] = len(nodes) - 1
      cur[t] = table[key]
  print(len(nodes))
explain: Leaves a, b, c; the node a + b (shared by t1 and t3); the node (a + b) × c (shared by t2 and t4); and the subtraction: 6 nodes. (Both operands of the subtraction are the same node, so t5 is always 0, which an optimizer can exploit.)
```

```quiz
q: **[SSA]** The code `p = q + r; q = p - s; p = q * p; s = p + q` is converted to SSA form. How many distinct variables (inputs plus new versions) does it use?
answer: 7
verify:
  code = [("p", ["q", "r"]), ("q", ["p", "s"]), ("p", ["q", "p"]), ("s", ["p", "q"])]
  inputs, assigned = set(), set()
  for target, uses in code:
      inputs |= {u for u in uses if u not in assigned}
      assigned.add(target)
  print(len(inputs) + len(code))
explain: The values used before being assigned are q, r and s (3 inputs). The four assignments create p1, q1, p2 and s1. Total 3 + 4 = 7.
```

## Runtime and optimization

```quiz
q: **[Basic blocks]** How many basic blocks does this code have? 1: i = 0; 2: if i >= n goto 7; 3: t = a[i]; 4: s = s + t; 5: i = i + 1; 6: goto 2; 7: print s; 8: if s > 0 goto 1; 9: return
answer: 5
verify:
  import re
  code = ["i = 0", "if i >= n goto 7", "t = a[i]", "s = s + t", "i = i + 1", "goto 2", "print s", "if s > 0 goto 1", "return"]
  leaders = {1}
  for n, ins in enumerate(code, 1):
      m = re.search(r"goto (\d+)", ins)
      if m:
          leaders.add(int(m.group(1)))
          if n < len(code): leaders.add(n + 1)
  print(len(leaders))
explain: Leaders: 1 (first, and target of 8), 2 (target of 6), 3 (after the jump in 2), 7 (target of 2, and after the goto in 6) and 9 (after the jump in 8). Blocks: {1}, {2}, {3–6}, {7, 8}, {9}.
```

```quiz
q: **[Scoping]** `int x = 5; void p() { x = x + 1; } void q() { int x = 10; p(); print(x); } main() { q(); print(x); }` What does it print under **static** scoping?
code: python
  g = {"x": 5}
  out = []
  def p():
      g["x"] = g["x"] + 1          # static scoping: p's x is the global x
  def q():
      x = 10
      p()
      out.append(x)
  q()
  out.append(g["x"])
  print(" ".join(map(str, out)))
- `11 5`
* `10 6`
- `11 6`
- `10 5`
explain: Under static scoping, p always updates the global x (5 → 6), so q's local x stays 10: the output is 10 then 6. Under dynamic scoping, p would update q's local x instead, printing 11 then 5.
```

```quiz
q: **[Data flow]** Which analyses are **forward** analyses? (Select all that apply.)
* Reaching definitions
* Available expressions
- Liveness analysis
* Constant propagation
explain: Reaching definitions, available expressions and constant propagation follow values from where they are created to where they are used. Liveness looks ahead to future uses, so it flows backward.
```
