---
title: Relations
chapter: Sets and Relations
description: Binary relations and their matrix and graph forms, reflexive, symmetric, antisymmetric and transitive relations, counting relations of each kind, closures, equivalence relations and partitions, and Bell numbers.
---
A **binary relation** R on a set A is any subset of A × A; we write a R b when (a, b) ∈ R. "Less than", "divides" and "has the same remainder mod 3" are relations on the integers.

A relation on a finite set can be drawn as a **0/1 matrix** (entry (a, b) is 1 when a R b) or as a **directed graph** (an arrow a → b when a R b). On a set of n elements there are n² possible pairs, so **2^(n²) relations**.

## Properties

| Property | Definition | In the matrix | Example |
| --- | --- | --- | --- |
| **Reflexive** | a R a for every a | All diagonal entries 1 | ≤, = |
| **Irreflexive** | a R a for no a | All diagonal entries 0 | < |
| **Symmetric** | a R b ⇒ b R a | Matrix equals its transpose | "is a sibling of" |
| **Antisymmetric** | a R b and b R a ⇒ a = b | No symmetric pair off the diagonal | ≤, "divides" on positive integers |
| **Asymmetric** | a R b ⇒ not b R a | Antisymmetric **and** irreflexive | < |
| **Transitive** | a R b and b R c ⇒ a R c | (R²) ⊆ R | ≤, "divides" |

Symmetric and antisymmetric are **not** opposites: the equality relation is both, and some relations are neither.

## Counting relations on an n-element set

Each property restricts some entries of the n × n matrix. Counting the free choices gives:

| Relations on n elements | Count | n = 3 |
| --- | --- | --- |
| All | 2^(n²) | 512 |
| Reflexive (diagonal fixed to 1) | 2^(n² − n) | 64 |
| Irreflexive | 2^(n² − n) | 64 |
| Symmetric (choose the diagonal and each unordered pair) | 2^(n(n+1)/2) | 64 |
| Reflexive and symmetric | 2^(n(n−1)/2) | 8 |
| Antisymmetric (diagonal free; each pair: neither, one way or the other) | 2ⁿ · 3^(n(n−1)/2) | 216 |
| Asymmetric | 3^(n(n−1)/2) | 27 |
| Equivalence relations | Bell number Bₙ | 5 |
| Partial orders | (no simple formula) | 19 |
| Transitive | (no simple formula) | 171 |

A brute-force check over all 512 relations on {0, 1, 2}:

```python
from itertools import product

n = 3
S = range(n)
pairs = [(a, b) for a in S for b in S]
counts = dict.fromkeys(["reflexive", "symmetric", "antisymmetric", "transitive", "equivalence", "partial order"], 0)

for mask in range(2 ** len(pairs)):
    R = {pairs[i] for i in range(len(pairs)) if mask >> i & 1}
    reflexive = all((a, a) in R for a in S)
    symmetric = all((b, a) in R for a, b in R)
    antisymmetric = all(a == b or (b, a) not in R for a, b in R)
    transitive = all((a, d) in R for a, b in R for c, d in R if b == c)
    counts["reflexive"] += reflexive
    counts["symmetric"] += symmetric
    counts["antisymmetric"] += antisymmetric
    counts["transitive"] += transitive
    counts["equivalence"] += reflexive and symmetric and transitive
    counts["partial order"] += reflexive and antisymmetric and transitive
print(counts)
```
```output
{'reflexive': 64, 'symmetric': 64, 'antisymmetric': 216, 'transitive': 171, 'equivalence': 5, 'partial order': 19}
```

## Closures

The **closure** of R with respect to a property is the smallest relation containing R that has the property:

- **Reflexive closure**: add all pairs (a, a).
- **Symmetric closure**: add (b, a) for every (a, b) ∈ R.
- **Transitive closure** R⁺: add (a, c) whenever there is a path from a to c in the graph of R. It is computed by **Warshall's algorithm** in O(n³), the same idea as Floyd–Warshall for shortest paths.

## Equivalence relations

A relation that is **reflexive, symmetric and transitive** is an **equivalence relation**. It splits the set into disjoint **equivalence classes** [a] = {x : x R a}: a **partition**. Conversely, every partition defines an equivalence relation ("in the same block").

Example: congruence mod 3 on the integers has three classes, [0], [1] and [2].

So the number of equivalence relations on an n-element set equals the number of partitions of the set, the **Bell number** Bₙ: 1, 1, 2, 5, 15, 52, 203, … (for n = 0, 1, 2, …). They satisfy B<sub>n+1</sub> = Σₖ C(n, k) Bₖ. The number of partitions into exactly k non-empty blocks is the **Stirling number of the second kind** S(n, k).

## Practice questions

```quiz
q: How many relations on a 4-element set are **reflexive**?
answer: 4096
verify: 2 ** (4 * 4 - 4)
explain: The 4 diagonal entries must be 1; each of the other 16 − 4 = 12 entries is free: 2¹² = 4096.
```

```quiz
q: How many relations on a 4-element set are **symmetric**?
answer: 1024
verify: 2 ** (4 * 5 // 2)
explain: A symmetric relation is fixed by the diagonal (4 entries) and one entry of each unordered pair (C(4, 2) = 6): 2^(4 + 6) = 2¹⁰ = 1024.
```

```quiz
q: How many equivalence relations are there on a set of 5 elements?
answer: 52
verify:
  from math import comb
  B = [1]
  for i in range(5):
      B.append(sum(comb(i, k) * B[k] for k in range(i + 1)))
  print(B[5])
explain: Equivalence relations correspond to partitions, counted by the Bell number B₅ = 52.
```

```quiz
q: How many antisymmetric relations are there on a set of 3 elements?
answer: 216
verify: 2 ** 3 * 3 ** 3
explain: Each of the 3 diagonal entries is free (2³). Each of the C(3, 2) = 3 off-diagonal pairs {a, b} has 3 allowed choices: neither, only (a, b), or only (b, a). 8 × 27 = 216.
```

```quiz
q: R = {(1, 1), (1, 2), (2, 1), (2, 2), (3, 3)} on {1, 2, 3}. Which properties does R have? (Select all that apply.)
* Reflexive
* Symmetric
- Antisymmetric
* Transitive
explain: Every (a, a) is present, (1, 2) and (2, 1) both appear, and every chain closes up, so R is an equivalence relation with classes {1, 2} and {3}. It is not antisymmetric, because (1, 2) and (2, 1) are both in R with 1 ≠ 2.
```
