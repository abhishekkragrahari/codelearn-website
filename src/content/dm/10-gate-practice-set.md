---
title: Discrete Mathematics GATE Practice Set
chapter: GATE Practice
description: Mixed GATE-style questions on logic, functions, relations, lattices, groups, counting, recurrences and graph theory.
---
These questions mix every lesson of the Discrete Mathematics track, in the three GATE formats. For counting questions, decide first whether order matters and whether repetition is allowed; for graph questions, start from the handshaking lemma or Euler's formula. Every numerical answer is recomputed by a program when the site is built.

## Logic

```quiz
q: **[Tautologies]** Which formulas are tautologies? (Select all that apply.)
* (p → q) → ((q → r) → (p → r))
* (p ∧ q) → (p ∨ r)
- (p → q) → ((p ∨ r) → q)
* ¬(p ∧ ¬p)
explain: The first is hypothetical syllogism in curried form, the second holds because p ∧ q makes p (and so p ∨ r) true, and the last is the law of non-contradiction. The third fails for p = F, q = F, r = T: p → q is true, but p ∨ r is true while q is false.
```

```quiz
q: **[Quantifiers]** Which formula says "every student has taken some course that no other student has taken"? (T(x, c): x took course c; the domain of x and y is students.)
- ∃c ∀x ∀y (T(x, c) ∧ ¬T(y, c))
* ∀x ∃c (T(x, c) ∧ ∀y (y ≠ x → ¬T(y, c)))
- ∀x ∀y ∃c (T(x, c) → ¬T(y, c))
- ∀x ∃c ∀y (T(x, c) ∧ ¬T(y, c))
explain: For each student x, there is a course c that x took and that every other student y did not take. The last option forgets y ≠ x, so it would require x not to have taken c either.
```

## Sets, relations and algebra

```quiz
q: **[Functions]** How many onto functions are there from a 6-element set to a 3-element set?
answer: 540
verify:
  from math import comb
  print(sum((-1) ** k * comb(3, k) * (3 - k) ** 6 for k in range(4)))
explain: 3⁶ − 3·2⁶ + 3·1⁶ = 729 − 192 + 3 = 540.
```

```quiz
q: **[Relations]** How many relations on a 4-element set are both reflexive and symmetric?
answer: 64
verify: 2 ** (4 * 3 // 2)
explain: The diagonal is fixed (all 1s), and each of the C(4, 2) = 6 unordered pairs is either in both directions or in neither: 2⁶ = 64.
```

```quiz
q: **[Equivalence relations]** How many equivalence relations are there on a 4-element set?
answer: 15
verify:
  from math import comb
  B = [1]
  for i in range(4):
      B.append(sum(comb(i, k) * B[k] for k in range(i + 1)))
  print(B[4])
explain: Equivalence relations correspond to partitions; the Bell number B₄ = 15 (1 partition with one block, 7 with two blocks, 6 with three, 1 with four).
```

```quiz
q: **[Lattices]** How many edges does the Hasse diagram of D₇₂ (divisors of 72 under divisibility) have?
answer: 17
verify:
  D = [d for d in range(1, 73) if 72 % d == 0]
  print(sum(1 for a in D for b in D if a != b and b % a == 0 and not any(c not in (a, b) and c % a == 0 and b % c == 0 for c in D)))
explain: 72 = 2³ · 3², so the divisors form a 4 × 3 grid (exponent of 2 from 0 to 3, of 3 from 0 to 2). Edges in the 2-direction: 3 × 3 = 9; in the 3-direction: 4 × 2 = 8. Total 17.
```

```quiz
q: **[Groups]** How many generators does the cyclic group ℤ₃₀ have?
answer: 8
verify: sum(1 for k in range(1, 31) if __import__("math").gcd(k, 30) == 1)
explain: The generators are the elements coprime to 30: φ(30) = 30 × (1/2)(2/3)(4/5) = 8.
```

## Counting and recurrences

```quiz
q: **[Derangements]** In how many ways can 6 letters be put into their 6 addressed envelopes so that no letter goes into its own envelope?
answer: 265
verify:
  from itertools import permutations
  print(sum(1 for p in permutations(range(6)) if all(p[i] != i for i in range(6))))
explain: D₆ = 5 × (D₅ + D₄) = 5 × (44 + 9) = 265.
```

```quiz
q: **[Stars and bars]** How many solutions does x₁ + x₂ + x₃ + x₄ = 12 have in positive integers?
answer: 165
verify: __import__("math").comb(11, 3)
explain: Give each variable 1 first, leaving 8 to distribute freely among 4 variables: C(8 + 3, 3) = C(11, 3) = 165.
```

```quiz
q: **[Recurrence]** aₙ = aₙ₋₁ + 6aₙ₋₂ with a₀ = 0 and a₁ = 5. What is a₆?
answer: 665
verify:
  a = [0, 5]
  for _ in range(5):
      a.append(a[-1] + 6 * a[-2])
  print(a[6])
explain: The characteristic equation r² − r − 6 = 0 has roots 3 and −2, and the initial values give aₙ = 3ⁿ − (−2)ⁿ. So a₆ = 729 − 64 = 665.
```

```quiz
q: **[Catalan]** In how many ways can the product a₁a₂a₃a₄a₅a₆ be fully parenthesised?
answer: 42
verify: __import__("math").comb(10, 5) // 6
explain: A product of n + 1 factors has Cₙ parenthesisations; with 6 factors that is C₅ = C(10, 5) / 6 = 42.
```

## Graph theory

```quiz
q: **[Complement]** A simple graph with 10 vertices has 20 edges. How many edges does its complement have?
answer: 25
verify: 10 * 9 // 2 - 20
explain: Together, a graph and its complement form K₁₀ with 45 edges: 45 − 20 = 25.
```

```quiz
q: **[Planar graphs]** What is the maximum number of edges of a simple planar graph with 8 vertices?
answer: 18
verify: 3 * 8 - 6
explain: A simple planar graph with V ≥ 3 has at most 3V − 6 edges: 3 × 8 − 6 = 18, reached by any triangulation of 8 points.
```

```quiz
q: **[Graph facts]** Which statements are **true**? (Select all that apply.)
* Every tree with at least two vertices is 2-colourable
* The number of vertices of odd degree in any graph is even
- Every connected graph with all degrees even has a Hamiltonian cycle
* K₅ is not planar
explain: Trees have no cycles at all, so they are bipartite. The handshaking lemma makes the number of odd-degree vertices even. All-even degrees give an Euler circuit, not a Hamiltonian cycle. K₅ has 10 > 3 × 5 − 6 = 9 edges.
```
