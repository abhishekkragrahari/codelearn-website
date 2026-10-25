---
title: Counting and Combinatorics
chapter: Combinatorics
description: The sum and product rules, permutations and combinations, arrangements with repeated letters, circular arrangements, selections with repetition (stars and bars), inclusion–exclusion, and derangements.
---
Counting questions appear throughout GATE: in probability, in algorithm analysis, in graph theory. A few principles, applied carefully, solve almost all of them.

## Basic rules

- **Sum rule**: if a task can be done in one of m ways **or** one of n other ways (no overlap), there are m + n ways.
- **Product rule**: if a task consists of a first step with m ways **and then** a second step with n ways, there are m × n ways.

For example, a password of 2 letters followed by 3 digits: 26² × 10³ = 676,000 choices.

## Permutations and combinations

| Selecting r from n distinct objects | Order matters? | Repetition allowed? | Count |
| --- | --- | --- | --- |
| **Permutations** | Yes | No | P(n, r) = n! / (n − r)! |
| **Combinations** | No | No | C(n, r) = n! / (r! (n − r)!) |
| Sequences | Yes | Yes | nʳ |
| **Multisets** (stars and bars) | No | Yes | C(n + r − 1, r) |

Useful identities: C(n, r) = C(n, n − r), C(n, r) = C(n − 1, r − 1) + C(n − 1, r) (Pascal's rule), and Σᵣ C(n, r) = 2ⁿ.

## Arrangements with repeated objects

The number of distinct arrangements of n objects where one kind appears n₁ times, another n₂ times, and so on, is **n! / (n₁! n₂! …)**. The letters of BANANA (3 A's, 2 N's, 1 B) can be arranged in 6! / (3! 2!) = 60 ways.

**Circular arrangements** of n distinct people around a table: **(n − 1)!**, because rotations of the same seating are the same. If a necklace can also be flipped over, divide by 2 again.

## Stars and bars

The number of solutions of x₁ + x₂ + … + xₖ = n in **non-negative** integers is **C(n + k − 1, k − 1)**: arrange n stars and k − 1 bars in a row. With every xᵢ ≥ 1, first give each variable 1, leaving C(n − 1, k − 1).

For x₁ + x₂ + x₃ = 10: C(12, 2) = 66 solutions with xᵢ ≥ 0, and C(9, 2) = 36 with xᵢ ≥ 1. Upper limits (xᵢ ≤ 6, say) are handled with inclusion–exclusion.

## Inclusion–exclusion

For n sets: |A₁ ∪ A₂ ∪ … ∪ Aₙ| = Σ|Aᵢ| − Σ|Aᵢ ∩ Aⱼ| + Σ|Aᵢ ∩ Aⱼ ∩ Aₖ| − … + (−1)ⁿ⁺¹|A₁ ∩ … ∩ Aₙ|

Example: how many integers from 1 to 1000 are divisible by 3, 5 or 7? ⌊1000/3⌋ + ⌊1000/5⌋ + ⌊1000/7⌋ − ⌊1000/15⌋ − ⌊1000/21⌋ − ⌊1000/35⌋ + ⌊1000/105⌋ = 333 + 200 + 142 − 66 − 47 − 28 + 9 = **543**.

## Derangements

A **derangement** is a permutation in which **no** element stays in its own place (n letters, all put in the wrong envelopes). By inclusion–exclusion:

**Dₙ = n! (1 − 1/1! + 1/2! − 1/3! + … + (−1)ⁿ/n!)**, which is close to n!/e.

Also Dₙ = (n − 1)(Dₙ₋₁ + Dₙ₋₂), with D₁ = 0 and D₂ = 1, giving 0, 1, 2, 9, 44, 265, ….

The formulas, checked against brute-force enumeration:

```python
from itertools import permutations, product
from math import comb, factorial

print("BANANA arrangements:", len(set(permutations("BANANA"))),
      "formula:", factorial(6) // (factorial(3) * factorial(2)))

solutions = sum(1 for t in product(range(11), repeat=3) if sum(t) == 10)
print("x1 + x2 + x3 = 10, xi >= 0:", solutions, "formula:", comb(12, 2))

divisible = sum(1 for k in range(1, 1001) if k % 3 == 0 or k % 5 == 0 or k % 7 == 0)
print("1..1000 divisible by 3, 5 or 7:", divisible)

def derangements(n):
    return sum(1 for p in permutations(range(n)) if all(p[i] != i for i in range(n)))

def derangement_formula(n):
    return round(factorial(n) * sum((-1) ** k / factorial(k) for k in range(n + 1)))

print("derangements:", [derangements(n) for n in range(1, 7)], [derangement_formula(n) for n in range(1, 7)])
```
```output
BANANA arrangements: 60 formula: 60
x1 + x2 + x3 = 10, xi >= 0: 66 formula: 66
1..1000 divisible by 3, 5 or 7: 543
derangements: [0, 1, 2, 9, 44, 265] [0, 1, 2, 9, 44, 265]
```

## Practice questions

```quiz
q: In how many distinct ways can the letters of the word LETTER be arranged?
answer: 180
verify: len(set(__import__("itertools").permutations("LETTER")))
explain: LETTER has 6 letters with E twice and T twice: 6! / (2! 2!) = 720 / 4 = 180.
```

```quiz
q: How many derangements of 5 objects are there?
answer: 44
verify:
  from itertools import permutations
  print(sum(1 for p in permutations(range(5)) if all(p[i] != i for i in range(5))))
explain: D₅ = 5! (1 − 1 + 1/2 − 1/6 + 1/24 − 1/120) = 120 × 11/30 = 44. Using the recurrence: D₅ = 4 × (D₄ + D₃) = 4 × (9 + 2) = 44.
```

```quiz
q: How many solutions does x₁ + x₂ + x₃ + x₄ = 15 have in integers with 0 ≤ xᵢ ≤ 6?
answer: 180
verify:
  from itertools import product
  print(sum(1 for t in product(range(7), repeat=4) if sum(t) == 15))
explain: Without upper limits there are C(18, 3) = 816. Subtract solutions with some xᵢ ≥ 7: 4 × C(11, 3) = 660. Add back those with two variables ≥ 7: C(4, 2) × C(4, 3) = 24. Three variables ≥ 7 would need a sum of at least 21. Total 816 − 660 + 24 = 180.
```

```quiz
q: A committee of 3 is chosen from 5 men and 4 women. In how many ways can it include at least one woman?
answer: 74
verify: __import__("math").comb(9, 3) - __import__("math").comb(5, 3)
explain: All committees: C(9, 3) = 84. Committees with no woman: C(5, 3) = 10. At least one woman: 84 − 10 = 74.
```

```quiz
q: In how many ways can 6 people sit around a round table, if only their order around the table matters?
answer: 120
verify: __import__("math").factorial(6 - 1)
explain: Fix one person's seat to remove rotations; the other 5 can be arranged in 5! = 120 ways.
```
