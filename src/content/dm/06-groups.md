---
title: Semigroups, Monoids and Groups
chapter: Algebraic Structures
description: Binary operations and their properties, semigroups, monoids and groups, abelian groups, the order of an element, subgroups and Lagrange's theorem, and cyclic groups with their generators.
---
An **algebraic structure** is a set with one or more operations. The structures GATE asks about are defined by which **axioms** a single binary operation ∗ satisfies.

## The axioms

| Axiom | Meaning |
| --- | --- |
| **Closure** | a ∗ b is in the set for all a, b in the set |
| **Associativity** | (a ∗ b) ∗ c = a ∗ (b ∗ c) |
| **Identity** | There is an e with e ∗ a = a ∗ e = a for every a |
| **Inverse** | Every a has an a⁻¹ with a ∗ a⁻¹ = a⁻¹ ∗ a = e |
| **Commutativity** | a ∗ b = b ∗ a |

| Structure | Axioms required | Example |
| --- | --- | --- |
| Algebraic structure (magma) | Closure | (ℤ, −) |
| **Semigroup** | Closure, associativity | (ℤ⁺, +) |
| **Monoid** | Semigroup + identity | (ℕ, +) with 0; strings under concatenation with ε |
| **Group** | Monoid + inverses | (ℤ, +), (ℤₙ, + mod n) |
| **Abelian group** | Group + commutativity | (ℝ − {0}, ×) |

(ℤ, −) is not a semigroup, since subtraction is not associative. (ℕ, +) has no inverses, so it is a monoid but not a group. Invertible matrices under multiplication form a group that is **not** abelian.

Basic facts in any group: the identity is unique, each element's inverse is unique, (ab)⁻¹ = b⁻¹a⁻¹, and the cancellation laws hold (ab = ac ⇒ b = c). In the **Cayley table** (operation table) of a finite group, every element appears exactly once in each row and each column.

Checking the axioms by brute force over a small set:

```python
def check(name, S, op):
    S = list(S)
    closed = all(op(a, b) in S for a in S for b in S)
    assoc = all(op(op(a, b), c) == op(a, op(b, c)) for a in S for b in S for c in S)
    ids = [e for e in S if all(op(e, a) == a == op(a, e) for a in S)]
    inverses = bool(ids) and all(any(op(a, b) == ids[0] for b in S) for a in S)
    group = closed and assoc and bool(ids) and inverses
    print(f"{name:26} closed {closed!s:5} assoc {assoc!s:5} identity {bool(ids)!s:5} inverses {inverses!s:5} group {group}")

check("{0..5} under + mod 6", range(6), lambda a, b: (a + b) % 6)
check("{1..4} under x mod 5", range(1, 5), lambda a, b: a * b % 5)
check("{0..5} under x mod 6", range(6), lambda a, b: a * b % 6)
check("{1..5} under x mod 6", range(1, 6), lambda a, b: a * b % 6)
```
```output
{0..5} under + mod 6       closed True  assoc True  identity True  inverses True  group True
{1..4} under x mod 5       closed True  assoc True  identity True  inverses True  group True
{0..5} under x mod 6       closed True  assoc True  identity True  inverses False group False
{1..5} under x mod 6       closed False assoc True  identity True  inverses False group False
```

Multiplication mod 5 on {1, 2, 3, 4} is a group because 5 is prime; mod 6, the elements 2, 3 and 4 have no inverses (and 2 × 3 = 0 is not even in {1, …, 5}).

## Order of an element and subgroups

The **order** of a group is its number of elements. The **order of an element** a is the smallest k ≥ 1 with aᵏ = e (in additive notation, k·a = 0).

A **subgroup** is a subset that is itself a group under the same operation. For a finite non-empty subset H, being closed under the operation is enough.

> **Lagrange's theorem**: in a finite group G, the order of every subgroup divides |G|. Consequently, the order of every element divides |G|.

So a group of prime order p has no subgroups other than {e} and itself, and every non-identity element generates the whole group: **every group of prime order is cyclic** (and abelian).

## Cyclic groups

A group is **cyclic** if some element g (a **generator**) produces every element as a power gᵏ. (ℤₙ, +) is cyclic with generator 1.

In ℤₙ:

- The order of a is n / gcd(a, n). In ℤ₁₂, the element 8 has order 12 / 4 = 3 (8, 16 ≡ 4, 24 ≡ 0).
- a is a generator exactly when gcd(a, n) = 1, so ℤₙ has **φ(n)** generators (Euler's totient). ℤ₁₂ has the 4 generators 1, 5, 7, 11.
- For each divisor d of n there is **exactly one** subgroup of order d. So ℤₙ has as many subgroups as n has divisors.

Every cyclic group is abelian, and every subgroup of a cyclic group is cyclic. The **Klein four-group** (for example {1, 3, 5, 7} under multiplication mod 8) has order 4 but no element of order 4, so it is the smallest non-cyclic group.

The multiplicative group **U(n)** = {a : 1 ≤ a < n, gcd(a, n) = 1} under multiplication mod n has φ(n) elements. U(p) is cyclic for every prime p; its generators are called **primitive roots** (3 is a primitive root mod 7: its powers are 3, 2, 6, 4, 5, 1).

## Practice questions

```quiz
q: How many generators does the cyclic group (ℤ₂₀, + mod 20) have?
answer: 8
verify: sum(1 for k in range(1, 21) if __import__("math").gcd(k, 20) == 1)
explain: The generators are the a with gcd(a, 20) = 1: 1, 3, 7, 9, 11, 13, 17, 19. That is φ(20) = 20 × (1 − 1/2)(1 − 1/5) = 8.
```

```quiz
q: How many subgroups does the cyclic group ℤ₂₄ have?
answer: 8
verify: sum(1 for d in range(1, 25) if 24 % d == 0)
explain: A cyclic group of order n has exactly one subgroup for each divisor of n. 24 has the divisors 1, 2, 3, 4, 6, 8, 12, 24: 8 subgroups.
```

```quiz
q: What is the order of the element 8 in (ℤ₁₂, + mod 12)?
answer: 3
verify: 12 // __import__("math").gcd(8, 12)
explain: The order is 12 / gcd(8, 12) = 12 / 4 = 3: 8 + 8 = 16 ≡ 4, and 4 + 8 = 12 ≡ 0.
```

```quiz
q: Which of these are **groups**? (Select all that apply.)
* {1, 2, 3, 4} under multiplication mod 5
* The integers under addition
- The natural numbers {0, 1, 2, …} under addition
- {0, 1, 2, 3, 4, 5} under multiplication mod 6
explain: Multiplication mod a prime has inverses for all non-zero elements, and (ℤ, +) has −a as the inverse of a. The natural numbers have no additive inverses (a monoid only). Mod 6, the element 0 (and 2, 3, 4) has no multiplicative inverse.
```

```quiz
q: A group has 35 elements. Which of these **cannot** be the order of one of its elements?
- 5
- 7
* 10
- 35
explain: By Lagrange's theorem, an element's order divides the group order. The divisors of 35 are 1, 5, 7 and 35; 10 does not divide 35.
```
