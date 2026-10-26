---
title: Artificial Intelligence GATE Practice Set
chapter: GATE Practice
description: Mixed GATE DA style questions on uninformed, informed and adversarial search, propositional and predicate logic, Bayesian networks and inference, with answers and explanations.
---
These questions mix every topic in this track, in the GATE formats **MCQ**, **MSQ** and **NAT**. Each numerical answer is recomputed by a program when the site is built.

## Search

```quiz
q: **[BFS]** A graph has edges A–B, A–C, B–D, B–E, C–F, E–G (undirected). BFS starts at A, adds neighbours in alphabetical order, and stops when G is **expanded**. How many nodes are expanded, including A and G?
answer: 7
verify:
  from collections import deque
  g = {"A": "BC", "B": "ADE", "C": "AF", "D": "B", "E": "BG", "F": "C", "G": "E"}
  q, seen, order = deque("A"), {"A"}, []
  while q:
      n = q.popleft()
      order.append(n)
      if n == "G":
          break
      for m in sorted(g[n]):
          if m not in seen:
              seen.add(m)
              q.append(m)
  print(len(order))
explain: BFS expands level by level: A; then B, C; then D, E, F; then G. That is A, B, C, D, E, F, G: 7 nodes.
```

```quiz
q: **[A\*]** A node n is reached with g(n) = 9. Its heuristic is admissible, and the optimal solution cost through n is 15. What is the largest value h(n) can have?
answer: 6
verify: 15 - 9
explain: The true remaining cost from n is 15 − 9 = 6. An admissible heuristic never overestimates, so h(n) ≤ 6.
```

```quiz
q: **[Heuristics]** For the 8-puzzle, h₁ is the number of misplaced tiles and h₂ is the sum of Manhattan distances. Which statements are **true**? (Select all that apply.)
* Both h₁ and h₂ are admissible
* h₂(n) ≥ h₁(n) for every state n
- h₁ dominates h₂
* max(h₁, h₂) = h₂ for every state
explain: Each misplaced tile needs at least one move, and at least its Manhattan distance in moves, so both are admissible. A misplaced tile is at least 1 square away, so h₂ ≥ h₁ (h₂ dominates h₁), and therefore max(h₁, h₂) = h₂.
```

```quiz
q: **[Minimax]** A MAX root has three MIN children with leaves (4, 7), (2, 9) and (6, 5). What is the minimax value of the root?
answer: 5
verify: max(min(4, 7), min(2, 9), min(6, 5))
explain: The MIN nodes give 4, 2 and 5. MAX takes the largest, 5.
```

```quiz
q: **[Alpha-beta]** For the same tree, MIN children (4, 7), (2, 9) and (6, 5) evaluated left to right, how many leaves does alpha-beta pruning skip?
answer: 1
verify:
  def ab(n, mx, a, b, seen):
      if isinstance(n, int):
          seen.append(n)
          return n
      best = float("-inf") if mx else float("inf")
      for c in n:
          v = ab(c, not mx, a, b, seen)
          if mx:
              best = max(best, v); a = max(a, best)
          else:
              best = min(best, v); b = min(b, best)
          if a >= b:
              break
      return best
  seen = []
  ab([[4, 7], [2, 9], [6, 5]], True, float("-inf"), float("inf"), seen)
  print(6 - len(seen))
explain: The first MIN node gives 4, so α = 4. In the second, the leaf 2 shows MIN can hold it to at most 2 < 4, so 9 is pruned. In the third, 6 > 4 does not allow a cut, so 5 must be examined. One leaf is pruned.
```

## Logic

```quiz
q: **[Propositional logic]** How many of the 16 models over P, Q, R, S satisfy (P ∨ Q) ∧ (R ∨ S)?
answer: 9
verify:
  from itertools import product
  print(sum(1 for p, q, r, s in product([0, 1], repeat=4) if (p or q) and (r or s)))
explain: P ∨ Q is true in 3 of the 4 assignments to (P, Q), and R ∨ S in 3 of 4 assignments to (R, S). The two parts use different symbols, so 3 × 3 = 9 models.
```

```quiz
q: **[Entailment]** KB = {P → Q, ¬Q}. Which sentence does the KB entail?
- P
* ¬P
- Q
- P ∨ Q
explain: By modus tollens, from P → Q and ¬Q we get ¬P. The only model of the KB has P false and Q false, so P, Q and P ∨ Q are all false there.
```

```quiz
q: **[Predicate logic]** Which formula says "Every person has exactly one mother"?
* ∀x (Person(x) → ∃y (Mother(y, x) ∧ ∀z (Mother(z, x) → z = y)))
- ∀x ∃y (Person(x) ∧ Mother(y, x))
- ∃y ∀x (Person(x) → Mother(y, x))
- ∀x (Person(x) → ∃y Mother(y, x))
explain: For every person x there must be a mother y, and any mother z of x must be y. The second makes everything a person. The third says one y is everyone's mother. The fourth says at least one mother, not exactly one.
```

## Uncertainty

```quiz
q: **[Bayesian networks]** A network has Boolean nodes A, B, C, D with arrows A → C, B → C and C → D. How many independent numbers do its CPTs need?
answer: 8
verify: 1 + 1 + 4 + 2
explain: A and B have no parents (1 each), C has two parents (4), D has one parent (2): 1 + 1 + 4 + 2 = 8, compared with 2⁴ − 1 = 15 for the full joint.
```

```quiz
q: **[d-separation]** In the network A → C ← B, C → D, which statements are **true**? (Select all that apply.)
* A and B are independent when nothing is observed
- A and D are independent when nothing is observed
* A and B can be dependent given D
* A and D are independent given C
explain: The only path between A and B passes through the collider C, which blocks it while neither C nor its descendant D is observed. Observing D opens it. A → C → D is a chain: open without evidence, blocked by C.
```

```quiz
q: **[Inference]** P(A) = 0.3. P(B | A) = 0.9 and P(B | ¬A) = 0.2. What is P(A | B)? Give the answer to three decimal places.
answer: 0.659
verify: round(0.3 * 0.9 / (0.3 * 0.9 + 0.7 * 0.2), 3)
explain: P(B) = 0.3 × 0.9 + 0.7 × 0.2 = 0.27 + 0.14 = 0.41. P(A | B) = 0.27 / 0.41 ≈ 0.659.
```

```quiz
q: **[Sampling]** Which method fixes the evidence variables and gives each sample a weight equal to the probability of the evidence given its parents?
- Rejection sampling
* Likelihood weighting
- Gibbs sampling
- Prior sampling
explain: That is the definition of likelihood weighting. Rejection sampling discards samples, Gibbs sampling resamples one variable at a time, and prior sampling ignores evidence.
```
