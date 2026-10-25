---
title: TOC GATE Practice Set
chapter: GATE Practice
description: Mixed GATE-style questions on DFAs, NFAs, regular expressions, closure properties, grammars, PDAs, Turing machines and decidability.
---
These questions mix every lesson of the Theory of Computation track, in the three GATE formats. For DFA-size questions, list the distinct situations the machine must remember, and do not forget the dead state. For "is it regular / context-free?" questions, ask what has to be counted or compared. Every numerical answer is recomputed by a program when the site is built.

## Finite automata and regular languages

```quiz
q: **[Minimal DFA]** How many states does the minimal DFA have for strings over {a, b} that contain an **even** number of a's **and** end with b?
answer: 3
verify:
  from itertools import product
  strs = lambda k: ["".join(t) for n in range(k + 1) for t in product("ab", repeat=n)]
  pred = lambda w: w.count("a") % 2 == 0 and w.endswith("b")
  suffixes = strs(7)
  print(len({tuple(pred(p + s) for s in suffixes) for p in strs(7)}))
explain: A product of a 2-state and a 2-state DFA has 4 states, but two of them merge. When the number of a's is odd, it does not matter whether the string ends in b: no continuation behaves differently. So the classes are (even, ends in b), (even, does not end in b) and (odd): 3 states.
```

```quiz
q: **[Minimal DFA]** How many states does the minimal DFA have for binary numbers (read from the most significant bit) divisible by 6?
answer: 4
verify:
  from itertools import product
  strs = lambda k: ["".join(t) for n in range(k + 1) for t in product("01", repeat=n)]
  pred = lambda w: int(w or "0", 2) % 6 == 0
  suffixes = strs(7)
  print(len({tuple(pred(p + s) for s in suffixes) for p in strs(7)}))
explain: Reading bit b takes remainder r to (2r + b) mod 6, and 2(r + 3) + b ≡ 2r + b (mod 6), so r and r + 3 always move to the same state. Remainders 1 and 4 therefore merge, and so do 2 and 5 (none of them accepts). 0 and 3 stay apart because only 0 is accepting. The classes are {0}, {3}, {1, 4}, {2, 5}: 4 states.
```

```quiz
q: **[DFA vs NFA]** An NFA for "the 4th symbol from the end is a" over {a, b} has 5 states. How many states does the minimal DFA for this language have?
answer: 16
verify:
  from itertools import product
  strs = lambda k: ["".join(t) for n in range(k + 1) for t in product("ab", repeat=n)]
  pred = lambda w: len(w) >= 4 and w[-4] == "a"
  suffixes = strs(7)
  print(len({tuple(pred(p + s) for s in suffixes) for p in strs(7)}))
explain: The DFA must remember the last 4 symbols, and any two different 4-symbol windows are distinguishable: 2⁴ = 16 states.
```

```quiz
q: **[Subset construction]** The NFA s –a→ {s, t}, s –b→ {s}, t –b→ {u}, u –a→ {u}, u –b→ {u}, with start s and accepting state u, accepts strings containing ab. How many reachable states does the subset construction produce?
answer: 4
verify:
  d = {("s", "a"): {"s", "t"}, ("s", "b"): {"s"}, ("t", "b"): {"u"}, ("u", "a"): {"u"}, ("u", "b"): {"u"}}
  seen, todo = set(), [frozenset({"s"})]
  while todo:
      S = todo.pop()
      if S in seen: continue
      seen.add(S)
      todo += [frozenset(q for x in S for q in d.get((x, c), ())) for c in "ab"]
  print(len(seen))
explain: The reachable subsets are {s}, {s, t}, {s, u} and {s, t, u}. (The last two are both accepting and accept everything afterwards, so minimization would merge them into a 3-state DFA.)
```

```quiz
q: **[Counting strings]** How many strings of length 6 over {0, 1} have no two consecutive 1s?
answer: 21
verify:
  from itertools import product
  print(sum(1 for t in product("01", repeat=6) if "11" not in "".join(t)))
explain: Let f(n) be the count. A valid string ends in 0 (any valid string of length n − 1 before it) or in 01 (any valid string of length n − 2 before it), so f(n) = f(n − 1) + f(n − 2), with f(1) = 2 and f(2) = 3: 2, 3, 5, 8, 13, 21.
```

```quiz
q: **[Regular?]** Which languages are regular? (Select all that apply.)
* { w ∈ {a, b}\* : (#a(w) − #b(w)) is divisible by 3 }
- { aⁿbᵐ : n ≥ m }
* { aⁿbⁿ : n ≤ 50 }
- { aᵖ : p is prime }
explain: The difference mod 3 needs only 3 states. n ≥ m compares unbounded counts. A language with n ≤ 50 is finite. The primes have unboundedly growing gaps, which the pumping lemma rules out.
```

## Context-free languages and machines

```quiz
q: **[CFL?]** Which languages are context-free? (Select all that apply.)
* { aⁿbᵐcᵐdⁿ : n, m ≥ 0 }
- { aⁿbᵐcⁿdᵐ : n, m ≥ 0 }
* { w ∈ {a, b}\* : #a(w) = 2·#b(w) }
- { aⁿbⁿcⁿ : n ≥ 0 }
explain: aⁿbᵐcᵐdⁿ is nested (match the b's with the c's inside the a's and d's). aⁿbᵐcⁿdᵐ has crossing comparisons. Comparing two counts with a fixed ratio needs one stack. aⁿbⁿcⁿ needs three equal counts.
```

```quiz
q: **[Ambiguity]** How many parse trees does a + a \* a + a \* a have in the grammar E → E + E | E \* E | a?
answer: 14
verify:
  from functools import lru_cache
  toks = "a+a*a+a*a"
  @lru_cache(None)
  def c(i, j):
      if i == j: return 1
      return sum(c(i, k - 1) * c(k + 1, j) for k in range(i + 1, j) if toks[k] in "+*")
  print(c(0, len(toks) - 1))
explain: The grammar gives no precedence, so every way of fully parenthesising the 5 operands is a parse tree: the Catalan number C₄ = 14.
```

```quiz
q: **[CNF]** In Chomsky normal form, how many steps does a derivation of a string of length 10 take?
answer: 19
verify: 2 * 10 - 1
explain: n − 1 = 9 steps of the form A → BC and n = 10 steps of the form A → a: 19.
```

```quiz
q: **[Closure]** L₁ is context-free and L₂ is regular. Which of these is **not necessarily** context-free?
- L₁ ∪ L₂
- L₁ ∩ L₂
- L₁L₂
* The complement of L₁
explain: CFLs are closed under union and concatenation, and under intersection with a regular language. They are not closed under complement: the complement of a CFL need not be context-free.
```

```quiz
q: **[PDA]** Which language needs a **nondeterministic** PDA (no DPDA accepts it)?
- { aⁿbⁿ : n ≥ 0 }
- { wcwᴿ : w ∈ {a, b}\* }
* { wwᴿ : w ∈ {a, b}\* }
- { aⁿbᵐ : m > n }
explain: Without a centre marker, the PDA must guess where w ends. The others are deterministic: the counts are compared in order, and the marker c tells the PDA when to start popping.
```

## Turing machines and decidability

```quiz
q: **[Turing machine]** The binary increment TM (move right to the end, then add 1 with carry going left) runs on input 1111. What is on the tape when it halts?
code: python
  delta = {("right", "0"): ("right", "0", "R"), ("right", "1"): ("right", "1", "R"),
           ("right", "_"): ("carry", "_", "L"), ("carry", "1"): ("carry", "0", "L"),
           ("carry", "0"): ("done", "1", "L"), ("carry", "_"): ("done", "1", "L")}
  tape, state, head = dict(enumerate("1111")), "right", 0
  while state != "done":
      state, tape[head], move = delta[(state, tape.get(head, "_"))]
      head += 1 if move == "R" else -1
  print("".join(tape[i] for i in sorted(tape)).strip("_"))
- `1110`
- `11110`
* `10000`
- `0000`
explain: All four 1s become 0 as the carry moves left, and the carry then writes a 1 into the blank cell before the number: 1111 (15) + 1 = 10000 (16).
```

```quiz
q: **[Decidability]** Which problems are **decidable**? (Select all that apply.)
* Is the language of a given DFA empty?
* Is a given string generated by a given CFG?
- Is the language of a given CFG equal to Σ\*?
- Does a given TM halt on the empty input?
explain: DFA emptiness is reachability, and CFG membership is CYK. CFG universality is undecidable, and halting on ε is a form of the halting problem.
```

```quiz
q: **[RE and recursive]** L is recursively enumerable and its complement L̄ is also recursively enumerable. What follows?
* L is recursive
- L is context-free
- L is regular
- Nothing more can be said
explain: Run the recognisers for L and for L̄ alternately, one step each. One of them must accept, so this always halts and decides L.
```
