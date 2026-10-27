---
title: Sets, Functions and Counting Functions
chapter: Sets and Relations
description: Set operations and identities, power sets and Cartesian products, functions and their kinds (one-to-one, onto, bijective), counting functions between finite sets, composition and inverses, and the pigeonhole principle.
---
## Sets

A **set** is an unordered collection of distinct elements. Key notation: x ∈ A (membership), A ⊆ B (subset), ∅ (empty set), |A| (cardinality).

| Operation | Definition |
| --- | --- |
| Union A ∪ B | Elements in A or B |
| Intersection A ∩ B | Elements in both |
| Difference A − B | In A but not in B |
| Complement Ā | In the universe U but not in A |
| Symmetric difference A ⊕ B | In exactly one of them: (A − B) ∪ (B − A) |
| **Power set** P(A) | The set of all subsets of A; \|P(A)\| = 2^\|A\| |
| **Cartesian product** A × B | All ordered pairs (a, b); \|A × B\| = \|A\| · \|B\| |

The set identities mirror Boolean algebra (De Morgan: complement of A ∪ B = Ā ∩ B̄). For counting, the **inclusion–exclusion principle** gives |A ∪ B| = |A| + |B| − |A ∩ B| and |A ∪ B ∪ C| = |A| + |B| + |C| − |A ∩ B| − |A ∩ C| − |B ∩ C| + |A ∩ B ∩ C|.

## Functions

A **function** f : A → B assigns to every element of the **domain** A exactly one element of the **codomain** B. The set of values actually taken is the **range** (image).

| Kind | Meaning | Possible only if |
| --- | --- | --- |
| **Injective** (one-to-one) | Different inputs give different outputs | \|A\| ≤ \|B\| |
| **Surjective** (onto) | Every element of B is the image of some input | \|A\| ≥ \|B\| |
| **Bijective** | Both: a perfect pairing of A and B | \|A\| = \|B\| |

A function has an **inverse** f⁻¹ exactly when it is a bijection. The **composition** (g ∘ f)(x) = g(f(x)) is injective (or surjective, or bijective) when both f and g are.

## Counting functions

With |A| = m and |B| = n:

| Functions A → B | Count | m = 4, n = 3 |
| --- | --- | --- |
| All functions | nᵐ | 81 |
| Injective | n! / (n − m)! (0 if m > n) | 0 |
| Surjective | Σₖ (−1)ᵏ C(n, k) (n − k)ᵐ (inclusion–exclusion) | 36 |
| Bijective | n! if m = n, else 0 | 0 |
| Relations from A to B (any subsets of A × B) | 2^(mn) | 4096 |

The onto formula subtracts the functions that miss at least one element of B: start with nᵐ, subtract the C(n, 1)(n − 1)ᵐ functions missing a given element, add back those missing two, and so on. A brute-force check over all functions:

```python
from itertools import product
from math import comb

def count_functions(m, n):
    functions = list(product(range(n), repeat=m))          # f = (f(a1), ..., f(am))
    injective = sum(len(set(f)) == m for f in functions)
    surjective = sum(len(set(f)) == n for f in functions)
    return len(functions), injective, surjective

def onto_formula(m, n):
    return sum((-1) ** k * comb(n, k) * (n - k) ** m for k in range(n + 1))

for m, n in [(4, 3), (3, 4), (5, 3)]:
    total, inj, sur = count_functions(m, n)
    print(f"|A| = {m}, |B| = {n}: all {total}, one-to-one {inj}, onto {sur} (formula {onto_formula(m, n)})")
```
```output
|A| = 4, |B| = 3: all 81, one-to-one 0, onto 36 (formula 36)
|A| = 3, |B| = 4: all 64, one-to-one 24, onto 0 (formula 0)
|A| = 5, |B| = 3: all 243, one-to-one 0, onto 150 (formula 150)
```

## The pigeonhole principle

If **n + 1** objects are placed into **n** boxes, some box gets at least two. More generally, if N objects go into k boxes, some box gets at least **⌈N / k⌉** objects.

Examples:

- Among any 13 people, two share a birth month.
- To be sure of 3 cards of the same suit from a deck, draw 2 × 4 + 1 = 9 cards (with 8 cards you could have exactly 2 of each suit).
- Among any 5 integers from 1 to 8, two of them sum to 9: the 4 pairs {1, 8}, {2, 7}, {3, 6}, {4, 5} are the boxes.

## Practice questions

```quiz
q: How many onto (surjective) functions are there from a set of 5 elements to a set of 3 elements?
answer: 150
verify:
  from math import comb
  print(sum((-1) ** k * comb(3, k) * (3 - k) ** 5 for k in range(4)))
explain: By inclusion–exclusion: 3⁵ − C(3,1)·2⁵ + C(3,2)·1⁵ − C(3,3)·0⁵ = 243 − 96 + 3 − 0 = 150.
```

```quiz
q: How many one-to-one functions are there from a set of 3 elements to a set of 5 elements?
answer: 60
verify: 5 * 4 * 3
explain: The first element has 5 possible images, the second 4 (any other), the third 3: 5 × 4 × 3 = 60.
```

```quiz
q: Sets A and B have |A| = 3 and |B| = 2. How many elements does the power set of A × B have?
answer: 64
verify: 2 ** (3 * 2)
explain: A × B has 3 × 2 = 6 ordered pairs, so its power set has 2⁶ = 64 elements (each one a relation from A to B).
```

```quiz
q: What is the minimum number of people needed to be sure that at least 4 of them were born on the same day of the week?
answer: 22
verify: 3 * 7 + 1
explain: With 21 people, each weekday could have exactly 3. The 22nd person makes some day have 4: ⌈22 / 7⌉ = 4.
```

```quiz
q: Which statements are **true** for functions between finite sets? (Select all that apply.)
* If |A| = |B|, a function from A to B is one-to-one exactly when it is onto
* A function has an inverse exactly when it is a bijection
- If |A| > |B|, there is a one-to-one function from A to B
* The composition of two onto functions is onto
explain: Between equal-sized finite sets, injective and surjective coincide. Only bijections are invertible. With more inputs than outputs, two inputs must share an output (pigeonhole). If f and g are onto, every element of g's codomain is reached through some element reached by f.
```
