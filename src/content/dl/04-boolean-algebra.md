---
title: Boolean Algebra
chapter: Boolean Algebra and Gates
description: Boolean operations and laws, De Morgan's theorems, duality, canonical sum-of-products and product-of-sums forms, minterms and maxterms, and counting Boolean functions.
---
**Boolean algebra** is the algebra of two values, 0 and 1, with the operations AND (·), OR (+) and NOT (written A′ or Ā). It describes exactly what logic circuits compute.

## Laws

| Law | AND form | OR form |
| --- | --- | --- |
| Identity | A · 1 = A | A + 0 = A |
| Null (domination) | A · 0 = 0 | A + 1 = 1 |
| Idempotent | A · A = A | A + A = A |
| Complement | A · A′ = 0 | A + A′ = 1 |
| Involution | (A′)′ = A | |
| Commutative | AB = BA | A + B = B + A |
| Associative | (AB)C = A(BC) | (A + B) + C = A + (B + C) |
| Distributive | A(B + C) = AB + AC | **A + BC = (A + B)(A + C)** |
| Absorption | A(A + B) = A | A + AB = A |
| **De Morgan** | (AB)′ = A′ + B′ | (A + B)′ = A′B′ |
| Consensus | AB + A′C + BC = AB + A′C | (A + B)(A′ + C)(B + C) = (A + B)(A′ + C) |

Two more identities are used constantly: **A + A′B = A + B** and **A(A′ + B) = AB**.

The second distributive law (A + BC = (A + B)(A + C)) has no counterpart in ordinary arithmetic; it is the dual of the first.

## Duality

The **dual** of an expression swaps AND with OR and 0 with 1 (variables are not complemented). **Duality principle**: if an identity holds, its dual holds too. That is why every law above comes in pairs.

A function is **self-dual** if it equals its own dual: f(A, B, C) = f′(A′, B′, C′). Example: the majority function AB + BC + CA.

## Canonical forms

Any Boolean function can be written from its truth table.

- A **minterm** is an AND of all n variables, each plain or complemented, that is 1 for exactly one row. For n = 3, row 5 (101) has minterm m₅ = AB′C.
- A **maxterm** is an OR of all variables that is 0 for exactly one row. Row 5 has maxterm M₅ = A′ + B + C′.
- **Sum of products (SOP)**, canonical: OR the minterms of the rows where f = 1: f = Σm(…).
- **Product of sums (POS)**, canonical: AND the maxterms of the rows where f = 0: f = ΠM(…).

The two lists are complementary: if f = Σm(2, 3, 5, 6, 7) then f = ΠM(0, 1, 4). And m<sub>i</sub>′ = M<sub>i</sub>.

```python
from itertools import product

def minterms(f, n):
    return [i for i, row in enumerate(product([0, 1], repeat=n)) if f(*row)]

f = lambda a, b, c: (not a and b) or (b and not c) or (a and c)     # A'B + BC' + AC
ones = minterms(f, 3)
zeros = [i for i in range(8) if i not in ones]
print("f = Σm", tuple(ones))
print("f = ΠM", tuple(zeros))

def term(i, n=3, names="ABC"):
    bits = format(i, f"0{n}b")
    return "".join(v if b == "1" else v + "'" for v, b in zip(names, bits))
print("f =", " + ".join(term(i) for i in ones))
```
```output
f = Σm (2, 3, 5, 6, 7)
f = ΠM (0, 1, 4)
f = A'BC' + A'BC + AB'C + ABC' + ABC
```

## Counting Boolean functions

A function of n variables is fixed by its truth table of 2ⁿ rows, each 0 or 1:

| Kind of function of n variables | How many | n = 3 |
| --- | --- | --- |
| All Boolean functions | 2<sup>2ⁿ</sup> | 256 |
| **Self-dual** functions | 2<sup>2ⁿ⁻¹</sup> (the rows pair up as r and its complement) | 16 |
| **Neutral** functions (equally many 0s and 1s) | C(2ⁿ, 2ⁿ⁻¹) | 70 |
| **Symmetric** functions (depend only on how many inputs are 1) | 2ⁿ⁺¹ | 16 |

A brute-force check over all 256 functions of 3 variables:

```python
from itertools import product
from math import comb

n = 3
rows = list(product([0, 1], repeat=n))
self_dual = neutral = symmetric = 0
for code in range(2 ** 2 ** n):
    f = {row: (code >> i) & 1 for i, row in enumerate(rows)}
    if all(f[r] != f[tuple(1 - x for x in r)] for r in rows):
        self_dual += 1
    if sum(f.values()) == 2 ** (n - 1):
        neutral += 1
    if all(f[r] == f[s] for r in rows for s in rows if sum(r) == sum(s)):
        symmetric += 1
print("all:", 2 ** 2 ** n, "self-dual:", self_dual, "neutral:", neutral, "symmetric:", symmetric)
print("formulas:", 2 ** 2 ** (n - 1), comb(2 ** n, 2 ** (n - 1)), 2 ** (n + 1))
```
```output
all: 256 self-dual: 16 neutral: 70 symmetric: 16
formulas: 16 70 16
```

## Simplifying with the laws

Example: simplify F = A′B + AB + AB′.

- A′B + AB = (A′ + A)B = B, so F = B + AB′.
- B + AB′ = B + A (using X + X′Y = X + Y).
- **F = A + B.**

Example: AB + A′C + BC = AB + A′C, because BC is the **consensus** term of AB and A′C (it is covered whenever B = C = 1, by AB if A = 1 and by A′C if A = 0).

## Practice questions

```quiz
q: How many Boolean functions of 4 variables are there?
answer: 65536
verify: 2 ** 2 ** 4
explain: The truth table has 2⁴ = 16 rows, each of which can be 0 or 1: 2¹⁶ = 65,536 functions.
```

```quiz
q: How many self-dual Boolean functions of 4 variables are there?
answer: 256
verify: 2 ** 2 ** (4 - 1)
explain: Self-duality forces f(r′) = f(r)′, so the 16 rows form 8 complementary pairs and only one value per pair is free: 2⁸ = 256.
```

```quiz
q: F(A, B, C) = Σm(2, 3, 5, 7). Which expression is its canonical POS?
code: python
  ones = {2, 3, 5, 7}
  print("ΠM(" + ", ".join(str(i) for i in range(8) if i not in ones) + ")")
- `ΠM(2, 3, 5, 7)`
* `ΠM(0, 1, 4, 6)`
- `ΠM(0, 1, 4)`
- `ΠM(1, 4, 6)`
explain: The maxterms are the rows where F = 0, which are all the rows not listed in the minterm list: 0, 1, 4 and 6.
```

```quiz
q: What is the simplest form of A′B + AB + AB′?
- AB
* A + B
- A′ + B
- B
explain: A′B + AB = B. Then B + AB′ = B + A by the identity X + X′Y = X + Y. The function is 0 only when A = B = 0, which is A + B.
```

```quiz
q: Which identities are **true**? (Select all that apply.)
* A + BC = (A + B)(A + C)
* AB + A′C + BC = AB + A′C
- (A + B)′ = A′ + B′
* A + A′B = A + B
explain: The first is the second distributive law, the second is the consensus theorem and the last is a standard absorption-like identity. De Morgan's law gives (A + B)′ = A′B′, not A′ + B′.
```
