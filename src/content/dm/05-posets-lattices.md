---
title: Partial Orders and Lattices
chapter: Sets and Relations
description: Partially ordered sets, Hasse diagrams, maximal, minimal, greatest and least elements, upper and lower bounds, lattices, distributive, complemented and Boolean lattices, and the divisor lattices Dₙ.
---
## Partial orders

A relation that is **reflexive, antisymmetric and transitive** is a **partial order**, and a set with a partial order is a **poset**, written (A, ≤). Examples: (ℤ, ≤), (P(S), ⊆), and the positive integers under **divisibility** (a | b).

"Partial" means two elements may be **incomparable**: neither 2 | 3 nor 3 | 2. If every pair is comparable, the order is **total** (a **chain**); a set of pairwise incomparable elements is an **antichain**.

## Hasse diagrams

A **Hasse diagram** draws a poset compactly: draw a line upward from a to b when b **covers** a (a < b with nothing strictly between). Reflexive loops and lines implied by transitivity are left out.

The divisors of 12 under divisibility, D₁₂ = {1, 2, 3, 4, 6, 12}, have the cover relations 1–2, 1–3, 2–4, 2–6, 3–6, 4–12 and 6–12:

```graph
caption: Hasse diagram of D₁₂ (divisors of 12, ordered by divisibility); in a real Hasse diagram 1 is at the bottom and 12 at the top
nodes: 1 2 4 12 6 3
1 - 2
2 - 4
4 - 12
12 - 6
6 - 3
3 - 1
2 - 6
```

## Special elements

For a poset (A, ≤) and a subset B:

| Term | Meaning |
| --- | --- |
| **Maximal** element | Nothing in A is above it (there may be several) |
| **Minimal** element | Nothing is below it |
| **Greatest** element (top, 1) | Above **every** element; unique if it exists |
| **Least** element (bottom, 0) | Below every element |
| Upper bound of B | An element ≥ every element of B |
| **Least upper bound** (lub, supremum, join a ∨ b) | The smallest upper bound |
| **Greatest lower bound** (glb, infimum, meet a ∧ b) | The largest lower bound |

In the divisibility order, a ∨ b = **lcm(a, b)** and a ∧ b = **gcd(a, b)**. In (P(S), ⊆), the join is union and the meet is intersection.

## Lattices

A poset is a **lattice** if **every pair** of elements has both a lub and a glb. Every finite lattice has a greatest and a least element.

| Kind of lattice | Condition | Example |
| --- | --- | --- |
| **Distributive** | a ∧ (b ∨ c) = (a ∧ b) ∨ (a ∧ c) for all a, b, c | Every Dₙ, every P(S) |
| **Complemented** | Every a has a complement a′ with a ∨ a′ = 1 and a ∧ a′ = 0 | P(S) (a′ = S − a) |
| **Boolean** | Distributive **and** complemented | P(S), Dₙ for square-free n |

In a distributive lattice, a complement, when it exists, is **unique**. A lattice is non-distributive exactly when it contains one of two five-element sublattices: the "diamond" M₃ or the "pentagon" N₅.

## Divisor lattices

Dₙ (the divisors of n under divisibility) is always a distributive lattice. It is **complemented**, and therefore Boolean, exactly when n is **square-free** (no prime appears twice in n). In D₁₂, the element 2 has no complement: a complement x would need gcd(2, x) = 1, so x is odd (1 or 3), but then lcm(2, x) is 2 or 6, never 12.

```python
from math import gcd

def divisors(n):
    return [d for d in range(1, n + 1) if n % d == 0]

def hasse_edges(n):
    D = divisors(n)
    return [(a, b) for a in D for b in D
            if a != b and b % a == 0 and not any(c not in (a, b) and c % a == 0 and b % c == 0 for c in D)]

def complemented(n):
    lcm = lambda a, b: a * b // gcd(a, b)
    return all(any(gcd(a, b) == 1 and lcm(a, b) == n for b in divisors(n)) for a in divisors(n))

for n in [12, 30, 36, 105]:
    print(f"D{n}: {len(divisors(n))} elements, {len(hasse_edges(n))} Hasse edges, complemented: {complemented(n)}")
```
```output
D12: 6 elements, 7 Hasse edges, complemented: False
D30: 8 elements, 12 Hasse edges, complemented: True
D36: 9 elements, 12 Hasse edges, complemented: False
D105: 8 elements, 12 Hasse edges, complemented: True
```

D₃₀ (30 = 2 · 3 · 5) and D₁₀₅ (105 = 3 · 5 · 7) are Boolean: their Hasse diagrams are cubes, with 8 elements and 12 edges, just like the subsets of a 3-element set.

## Practice questions

```quiz
q: How many edges does the Hasse diagram of D₆₀ (the divisors of 60 under divisibility) have?
answer: 20
verify:
  D = [d for d in range(1, 61) if 60 % d == 0]
  print(sum(1 for a in D for b in D if a != b and b % a == 0 and not any(c not in (a, b) and c % a == 0 and b % c == 0 for c in D)))
explain: An edge joins a and b exactly when b / a is a prime. 60 = 2² · 3 · 5, so each divisor 2ⁱ3ʲ5ᵏ (i ≤ 2, j ≤ 1, k ≤ 1) is a point of a 3 × 2 × 2 grid. Edges along the 2-direction: 2 × 2 × 2 = 8; along 3: 3 × 1 × 2 = 6; along 5: 3 × 2 × 1 = 6. Total 20.
```

```quiz
q: For which n is the divisor lattice Dₙ a Boolean algebra?
- n = 12
- n = 36
* n = 70
- n = 8
explain: Dₙ is complemented (hence Boolean) exactly when n is square-free. 70 = 2 · 5 · 7 is square-free; 12, 36 and 8 contain a squared prime.
```

```quiz
q: In the lattice D₃₆, what is 4 ∨ 6 (the least upper bound)?
answer: 12
verify: 4 * 6 // __import__("math").gcd(4, 6)
explain: In the divisibility lattice the join is the lcm: lcm(4, 6) = 12, which divides 36.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* Every finite lattice has a greatest and a least element
* In a distributive lattice, an element has at most one complement
- Every poset is a lattice
* (P(S), ⊆) is a Boolean lattice
explain: Joining all elements of a finite lattice gives the top, meeting them gives the bottom. Distributivity forces complements to be unique. A poset such as {a, b} with a and b incomparable has no lub for the pair, so it is not a lattice. Subsets under inclusion form the standard Boolean algebra.
```
