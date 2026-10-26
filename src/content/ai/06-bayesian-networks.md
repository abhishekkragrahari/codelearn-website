---
title: Reasoning under Uncertainty and Bayesian Networks
chapter: Reasoning under Uncertainty
description: Probability for AI, joint distributions, conditional independence, Bayesian networks, the chain-rule factorisation, counting parameters, and reading independences with d-separation (chains, forks and colliders, explaining away), for GATE DA.
---
Logic deals in certainties: a sentence is true or false. Real agents rarely know the world for sure: a sensor may be noisy, a symptom may have several causes. **Probability** lets an agent represent **degrees of belief** and update them as evidence arrives.

## Probability refresher

- The **full joint distribution** P(X₁, …, Xₙ) gives the probability of every combination of values. From it, any question can be answered.
- **Marginalisation**: P(X) = Σᵧ P(X, y), summing out the other variables.
- **Conditioning**: P(X | e) = P(X, e) / P(e) = α P(X, e), where α = 1/P(e) is a **normalising constant**.
- **Product rule**: P(X, Y) = P(X | Y) P(Y). **Chain rule**: P(X₁, …, Xₙ) = Πᵢ P(Xᵢ | X₁, …, Xᵢ₋₁).
- **Bayes' rule**: P(cause | effect) = P(effect | cause) P(cause) / P(effect).

The catch: for n Boolean variables the joint table has 2ⁿ entries (2ⁿ − 1 free numbers). With 30 variables, that is over a billion. Independence is what makes the problem manageable.

## Independence and conditional independence

- X and Y are **independent** if P(X, Y) = P(X) P(Y), i.e. P(X | Y) = P(X).
- X and Y are **conditionally independent given Z** if **P(X, Y | Z) = P(X | Z) P(Y | Z)**, i.e. P(X | Y, Z) = P(X | Z): once Z is known, Y tells us nothing more about X.

Neither kind implies the other. Two symptoms of the same disease are usually **dependent** (one makes the disease, and hence the other, more likely) but **conditionally independent given the disease**.

## Bayesian networks

A **Bayesian network** (belief network) is a **directed acyclic graph** in which:

- each node is a random variable;
- an arrow X → Y means X **directly influences** Y (X is a **parent** of Y);
- each node Xᵢ has a **conditional probability table** (CPT) P(Xᵢ | Parents(Xᵢ)).

The network represents the full joint distribution as a product of these local tables:

**P(x₁, …, xₙ) = Πᵢ P(xᵢ | parents(Xᵢ))**

This works because each node is assumed **conditionally independent of its non-descendants, given its parents**.

### The running example

Whether the grass is wet (W) depends on whether the sprinkler was on (S) and whether it rained (R); both depend on whether it was cloudy (C).

```graph
caption: The sprinkler network: Cloudy influences Sprinkler and Rain, which both influence WetGrass
nodes: C S W R
C -> S
C -> R
S -> W
R -> W
```

| CPT | Probabilities |
| --- | --- |
| P(C) | 0.5 |
| P(S \| C) | C true: 0.1, C false: 0.5 |
| P(R \| C) | C true: 0.8, C false: 0.2 |
| P(W \| S, R) | S, R: 0.99; S, ¬R: 0.90; ¬S, R: 0.90; ¬S, ¬R: 0.05 |

The probability of one complete world, say cloudy, sprinkler off, rain, wet grass:

P(c, ¬s, r, w) = P(c) P(¬s | c) P(r | c) P(w | ¬s, r) = 0.5 × 0.9 × 0.8 × 0.9 = **0.324**.

### Counting parameters

A Boolean node with k Boolean parents needs **2ᵏ** numbers (one P(true) for each combination of parent values). Here: C needs 1, S and R need 2 each, W needs 4, so **9** numbers instead of 2⁴ − 1 = 15 for the full joint. With n nodes and at most k parents each, the network needs at most n · 2ᵏ numbers instead of 2ⁿ − 1: linear instead of exponential in n.

The **order** in which a network is built matters: adding nodes in causal order (causes before effects) usually gives the sparsest network. Built in the wrong order, the same distribution can need many more arrows.

## Reading independences: d-separation

Which conditional independences does a network imply? Look at how information can flow along a path between two variables. There are three kinds of connections through a middle node Z:

| Connection | Shape | X and Y independent? | Given Z? |
| --- | --- | --- | --- |
| **Chain** (causal) | X → Z → Y | No | **Yes**: Z blocks the path |
| **Fork** (common cause) | X ← Z → Y | No | **Yes**: Z blocks the path |
| **Collider** (common effect) | X → Z ← Y | **Yes** | **No**: observing Z (or any descendant of Z) opens the path |

A path is **blocked** by the evidence E if it contains a chain or fork whose middle node is in E, or a collider whose middle node is **not** in E and has no descendant in E. X and Y are **d-separated** by E, and hence conditionally independent given E, if **every** path between them is blocked.

In the sprinkler network:

- S and R are **dependent**: the fork S ← C → R is open. Here P(S) = 0.3 but P(S | r) = 0.18 (rain suggests clouds, and clouds make the sprinkler less likely).
- S and R are **independent given C**: the fork is blocked, and the other path S → W ← R has a collider with W unobserved. Indeed P(S | r, c) = P(S | c) = 0.1.
- Given W, S and R become **dependent** again through the collider. This is **explaining away**: if the grass is wet, learning that it rained makes the sprinkler explanation less likely.

```python
from itertools import product

pC = 0.5
pS = {True: 0.1, False: 0.5}
pR = {True: 0.8, False: 0.2}
pW = {(True, True): 0.99, (True, False): 0.90, (False, True): 0.90, (False, False): 0.05}

def joint(c, s, r, w):
    p = (pC if c else 1 - pC) * (pS[c] if s else 1 - pS[c]) * (pR[c] if r else 1 - pR[c])
    return p * (pW[(s, r)] if w else 1 - pW[(s, r)])

worlds = list(product([True, False], repeat=4))
print("sum of all 16 joint entries =", round(sum(joint(*x) for x in worlds), 10))
print("P(c, not s, r, w) =", round(joint(True, False, True, True), 4))

def P(query, given=lambda c, s, r, w: True):
    num = sum(joint(*x) for x in worlds if query(*x) and given(*x))
    return num / sum(joint(*x) for x in worlds if given(*x))

print(f"P(S) = {P(lambda c, s, r, w: s):.4f}")
print(f"P(S | r) = {P(lambda c, s, r, w: s, lambda c, s, r, w: r):.4f}")
print(f"P(S | r, c) = {P(lambda c, s, r, w: s, lambda c, s, r, w: r and c):.4f}")
print(f"P(S | w) = {P(lambda c, s, r, w: s, lambda c, s, r, w: w):.4f}")
print(f"P(S | w, r) = {P(lambda c, s, r, w: s, lambda c, s, r, w: w and r):.4f}")
```
```output
sum of all 16 joint entries = 1.0
P(c, not s, r, w) = 0.324
P(S) = 0.3000
P(S | r) = 0.1800
P(S | r, c) = 0.1000
P(S | w) = 0.4203
P(S | w, r) = 0.1945
```

Wet grass raises the probability of the sprinkler from 0.3 to about 0.42; learning that it also rained drops it to about 0.19. The rain has "explained away" the wet grass.

## Practice questions

```quiz
q: In the sprinkler network, what is P(¬c, s, ¬r, w), the probability that it was not cloudy, the sprinkler was on, it did not rain, and the grass is wet?
answer: 0.18
verify: round(0.5 * 0.5 * 0.8 * 0.9, 4)
explain: P(¬c) P(s | ¬c) P(¬r | ¬c) P(w | s, ¬r) = 0.5 × 0.5 × 0.8 × 0.90 = 0.18.
```

```quiz
q: A Bayesian network has 6 Boolean nodes. Two nodes have no parents, two nodes have 1 parent each, one node has 2 parents, and one node has 3 parents. How many independent numbers do its CPTs need?
answer: 18
verify: 2 * 1 + 2 * 2 + 4 + 8
explain: 2⁰ + 2⁰ + 2¹ + 2¹ + 2² + 2³ = 1 + 1 + 2 + 2 + 4 + 8 = 18, compared with 2⁶ − 1 = 63 for the full joint distribution.
```

```quiz
q: In the network A → B → C, which statement is true?
- A and C are always independent
* A and C are conditionally independent given B
- A and C become dependent when B is observed
- B and C are independent
explain: In a chain, A influences C only through B. Once B is known, A adds nothing: A ⊥ C | B. Without evidence, A and C are dependent.
```

```quiz
q: In the network A → C ← B (A and B have no other connections), which statements are **true**? (Select all that apply.)
* A and B are independent when nothing is observed
* A and B can become dependent once C is observed
- A and B are independent given C
* If C has a child D, observing D can also make A and B dependent
explain: A collider blocks the path when neither it nor any of its descendants is observed. Observing C, or a descendant of C such as D, opens the path: this is explaining away.
```

```quiz
q: Using the sprinkler network's CPTs, what is P(R), the prior probability of rain?
answer: 0.5
verify: round(0.5 * 0.8 + 0.5 * 0.2, 9)
explain: Sum over C: P(r) = P(r | c) P(c) + P(r | ¬c) P(¬c) = 0.8 × 0.5 + 0.2 × 0.5 = 0.5.
```
