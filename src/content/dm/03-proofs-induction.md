---
title: Proof Techniques and Mathematical Induction
chapter: Logic
description: Direct proof, contrapositive, contradiction, proof by cases and counterexample, weak and strong mathematical induction, well-ordering and structural induction, with worked examples and checks.
---
A proof shows that a statement is true in every case, not just in the examples you tried. GATE questions often hide a proof idea (induction for a recurrence, contradiction for "there is no largest prime"), so knowing the standard techniques saves time.

## Basic techniques

| Technique | To prove p → q | Example |
| --- | --- | --- |
| **Direct proof** | Assume p, derive q | If n is odd, n² is odd: n = 2k + 1 ⇒ n² = 2(2k² + 2k) + 1 |
| **Contrapositive** | Prove ¬q → ¬p (equivalent) | If n² is even then n is even: prove "n odd ⇒ n² odd" |
| **Contradiction** | Assume p and ¬q, derive a contradiction | √2 is irrational; there are infinitely many primes |
| **Cases** | Split into cases that cover everything | \|xy\| = \|x\|\|y\| by the signs of x and y |
| **Counterexample** | Disprove "for all x" with one x | "n² + n + 41 is always prime" fails at n = 40 |

Proving "p if and only if q" needs both directions. Proving existence can be constructive (show the object) or non-constructive.

## Mathematical induction

To prove P(n) for all n ≥ n₀:

```flowchart
caption: Proof by induction
start: Claim P(n) for all n ≥ n₀
step: Base case: prove P(n₀)
step: Inductive hypothesis: assume P(k) for some k ≥ n₀
step: Inductive step: prove P(k + 1) using P(k)
end: P(n) holds for all n ≥ n₀
```

**Example:** 1 + 3 + 5 + … + (2n − 1) = n².

- Base: n = 1: 1 = 1².
- Step: assume 1 + 3 + … + (2k − 1) = k². Add 2(k + 1) − 1 = 2k + 1: the sum becomes k² + 2k + 1 = (k + 1)². ∎

## Strong induction

Assume P(n₀), P(n₀ + 1), …, P(k) **all** hold, and prove P(k + 1). Useful when P(k + 1) depends on several earlier values.

**Example:** every integer n ≥ 2 is a product of primes. If k + 1 is not prime, k + 1 = ab with 2 ≤ a, b ≤ k, and both a and b are products of primes by the hypothesis.

**Example (Fibonacci):** F(n) < 2ⁿ, with F(0) = 0, F(1) = 1: F(k + 1) = F(k) + F(k − 1) < 2ᵏ + 2ᵏ⁻¹ < 2ᵏ⁺¹.

**Well-ordering principle:** every non-empty set of non-negative integers has a least element. It is equivalent to induction and drives many "minimal counterexample" proofs.

**Structural induction** proves properties of recursively defined objects (trees, formulas, strings): prove it for the base objects, then show each construction rule preserves it. For example, a full binary tree with i internal nodes has i + 1 leaves.

## Checking a claim before proving it

A program cannot prove a statement for all n, but it can find a counterexample quickly or build confidence before you write the induction:

```python
# Sum of the first n odd numbers is n^2
print(all(sum(2 * i - 1 for i in range(1, n + 1)) == n * n for n in range(1, 101)))

# Fibonacci numbers stay below 2^n
f = [0, 1]
for n in range(2, 60):
    f.append(f[-1] + f[-2])
print(all(f[n] < 2 ** n for n in range(60)))

# "n^2 + n + 41 is always prime" - look for the first counterexample
def is_prime(m):
    return m > 1 and all(m % d for d in range(2, int(m ** 0.5) + 1))
print(next(n for n in range(100) if not is_prime(n * n + n + 41)))
```
```output
True
True
40
```

At n = 40, 40² + 40 + 41 = 1681 = 41², so the claim is false even though it holds for 0 to 39.

## Common mistakes

- Forgetting the base case (then "every n has property P" can be "proved" for false P).
- Using the statement for k + 1 inside its own proof.
- An inductive step that silently assumes k is large enough (the classic "all horses are the same colour" error fails from k = 1 to k = 2).

## GATE-style practice questions

```quiz
q: To prove "if n² is even then n is even", the easiest method is:
- Direct proof
* Proof by contrapositive
- Strong induction
- Counterexample
explain: The contrapositive "if n is odd then n² is odd" is a one-line direct calculation.
```

```quiz
q: What is the smallest non-negative n for which n² + n + 41 is not prime?
answer: 40
verify: next(n for n in range(100) if any((n * n + n + 41) % d == 0 for d in range(2, int((n * n + n + 41) ** 0.5) + 1)))
explain: 40² + 40 + 41 = 1681 = 41 × 41.
```

```quiz
q: Using the formula proved by induction, what is 1 + 3 + 5 + … + 99?
answer: 2500
verify: sum(range(1, 100, 2))
explain: These are the first 50 odd numbers, so the sum is 50² = 2500.
```

```quiz
q: Which proofs naturally use strong induction? (Select all that apply.)
* Every integer n ≥ 2 is a product of primes
* A bound on Fibonacci numbers F(n) < 2ⁿ
- n is odd ⇒ n² is odd
- √2 is irrational
explain: The first two need the statement for several smaller values; the last two use a direct proof and contradiction.
```

```quiz
q: A full binary tree has 20 internal nodes. How many leaves does it have (provable by structural induction)?
answer: 21
verify: 20 + 1
explain: Each internal node of a full binary tree has two children, giving leaves = internal nodes + 1.
```
