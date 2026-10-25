---
title: Recurrence Relations and Generating Functions
chapter: Combinatorics
description: Setting up recurrences for counting problems, solving linear homogeneous recurrences with the characteristic equation (distinct and repeated roots), non-homogeneous recurrences, generating functions, and Catalan numbers.
---
Many counting problems are easiest to solve by relating the answer for size n to the answers for smaller sizes. Such a **recurrence relation**, together with **initial conditions**, determines the whole sequence.

## Setting up a recurrence

**Binary strings of length n with no two consecutive 0s.** A valid string either ends in 1 (any valid string of length n − 1, then 1) or ends in 10 (any valid string of length n − 2, then 10). So f(n) = f(n − 1) + f(n − 2) with f(1) = 2 and f(2) = 3: the sequence 2, 3, 5, 8, 13, 21, … (Fibonacci numbers), and f(10) = 144.

Other classic recurrences:

| Problem | Recurrence | Solution |
| --- | --- | --- |
| Tower of Hanoi moves | T(n) = 2T(n − 1) + 1, T(1) = 1 | 2ⁿ − 1 |
| Tilings of a 2 × n board with dominoes | t(n) = t(n − 1) + t(n − 2), t(1) = 1, t(2) = 2 | Fibonacci: t(8) = 34 |
| Regions made by n lines in general position | R(n) = R(n − 1) + n, R(0) = 1 | n(n + 1)/2 + 1 |
| Derangements | Dₙ = (n − 1)(Dₙ₋₁ + Dₙ₋₂) | ≈ n!/e |

## Linear homogeneous recurrences with constant coefficients

For aₙ = c₁aₙ₋₁ + c₂aₙ₋₂, try aₙ = rⁿ. This gives the **characteristic equation**

r² − c₁r − c₂ = 0.

- **Distinct roots** r₁, r₂: aₙ = A·r₁ⁿ + B·r₂ⁿ.
- **Repeated root** r: aₙ = (A + B·n)·rⁿ.

Find A and B from the initial conditions. (Higher orders work the same way, with one term per root, and a root of multiplicity m contributing (A₀ + A₁n + … + A<sub>m−1</sub>n<sup>m−1</sup>)rⁿ.)

**Example 1.** aₙ = 5aₙ₋₁ − 6aₙ₋₂, a₀ = 1, a₁ = 4. The characteristic equation r² − 5r + 6 = 0 has roots 2 and 3, so aₙ = A·2ⁿ + B·3ⁿ. From A + B = 1 and 2A + 3B = 4: B = 2, A = −1. So **aₙ = 2·3ⁿ − 2ⁿ**.

**Example 2.** aₙ = 4aₙ₋₁ − 4aₙ₋₂, a₀ = 1, a₁ = 6. The root 2 is repeated, so aₙ = (A + Bn)2ⁿ. A = 1, and (1 + B)·2 = 6 gives B = 2. So **aₙ = (1 + 2n)·2ⁿ**.

The closed forms agree with the recurrences term by term:

```python
def iterate(c1, c2, a0, a1, n):
    seq = [a0, a1]
    while len(seq) < n:
        seq.append(c1 * seq[-1] + c2 * seq[-2])
    return seq

print(iterate(5, -6, 1, 4, 8))
print([2 * 3 ** n - 2 ** n for n in range(8)])
print(iterate(4, -4, 1, 6, 8))
print([(1 + 2 * n) * 2 ** n for n in range(8)])
```
```output
[1, 4, 14, 46, 146, 454, 1394, 4246]
[1, 4, 14, 46, 146, 454, 1394, 4246]
[1, 6, 20, 56, 144, 352, 832, 1920]
[1, 6, 20, 56, 144, 352, 832, 1920]
```

## Non-homogeneous recurrences

For aₙ = c₁aₙ₋₁ + c₂aₙ₋₂ + f(n), the solution is the general homogeneous solution **plus one particular solution**. Guess the particular solution in the form of f(n): a constant for a constant, a polynomial of the same degree for a polynomial, C·sⁿ for sⁿ (multiplied by n if s is a root of the characteristic equation).

Example: T(n) = 2T(n − 1) + 1. Homogeneous part: A·2ⁿ. Particular solution: try a constant c, so c = 2c + 1 and c = −1. T(n) = A·2ⁿ − 1, and T(1) = 1 gives A = 1: **T(n) = 2ⁿ − 1**.

## Generating functions

The **generating function** of a sequence a₀, a₁, a₂, … is the power series G(x) = a₀ + a₁x + a₂x² + …. Counting problems turn into algebra:

| Sequence | Generating function |
| --- | --- |
| 1, 1, 1, 1, … | 1 / (1 − x) |
| 1, c, c², c³, … | 1 / (1 − cx) |
| C(n, 0), C(n, 1), …, C(n, n) | (1 + x)ⁿ |
| Number of ways to pick r items from k kinds with repetition | 1 / (1 − x)ᵏ, coefficient of xʳ is C(r + k − 1, r) |

To count solutions of x₁ + x₂ + x₃ = 10 with xᵢ ≥ 0, find the coefficient of x¹⁰ in (1 + x + x² + …)³ = 1/(1 − x)³: C(12, 2) = 66, the stars-and-bars answer. Restrictions change the factors: if x₁ must be even, its factor becomes 1 + x² + x⁴ + ….

## Catalan numbers

The **Catalan numbers** Cₙ = C(2n, n) / (n + 1) = 1, 1, 2, 5, 14, 42, 132, … satisfy Cₙ₊₁ = Σᵢ Cᵢ Cₙ₋ᵢ. They count:

- binary search trees (or binary tree shapes) with n nodes,
- ways to fully parenthesise a product of n + 1 factors (the parse trees of an ambiguous expression grammar, from the compiler lessons),
- balanced strings of n pairs of parentheses,
- triangulations of a convex polygon with n + 2 sides.

## Practice questions

```quiz
q: aₙ = 5aₙ₋₁ − 6aₙ₋₂ with a₀ = 1 and a₁ = 4. What is a₅?
answer: 454
verify:
  a = [1, 4]
  for _ in range(4):
      a.append(5 * a[-1] - 6 * a[-2])
  print(a[5])
explain: The closed form is aₙ = 2·3ⁿ − 2ⁿ, so a₅ = 2 × 243 − 32 = 486 − 32 = 454.
```

```quiz
q: How many binary strings of length 10 contain no two consecutive 0s?
answer: 144
verify:
  from itertools import product
  print(sum(1 for t in product("01", repeat=10) if "00" not in "".join(t)))
explain: f(n) = f(n − 1) + f(n − 2) with f(1) = 2, f(2) = 3 gives 2, 3, 5, 8, 13, 21, 34, 55, 89, 144.
```

```quiz
q: aₙ = 4aₙ₋₁ − 4aₙ₋₂ with a₀ = 1 and a₁ = 6. What is a₄?
answer: 144
verify:
  a = [1, 6]
  for _ in range(3):
      a.append(4 * a[-1] - 4 * a[-2])
  print(a[4])
explain: The repeated root 2 gives aₙ = (1 + 2n)·2ⁿ, so a₄ = 9 × 16 = 144.
```

```quiz
q: How many binary search trees (shapes) can be formed with 5 distinct keys?
answer: 42
verify: __import__("math").comb(10, 5) // 6
explain: The number of BSTs on n distinct keys is the Catalan number Cₙ = C(2n, n) / (n + 1). C₅ = 252 / 6 = 42.
```

```quiz
q: Which is the solution of T(n) = 2T(n − 1) + 1 with T(1) = 1?
- T(n) = 2ⁿ
* T(n) = 2ⁿ − 1
- T(n) = 2ⁿ⁻¹
- T(n) = n·2ⁿ
explain: The homogeneous solution is A·2ⁿ and a constant particular solution is −1. T(1) = 2A − 1 = 1 gives A = 1. (This is the Tower of Hanoi recurrence.)
```
