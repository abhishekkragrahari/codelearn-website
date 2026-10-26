---
title: Counting and Probability
chapter: Probability
description: Counting principles, permutations and combinations, the axioms of probability, conditional probability, independence, the law of total probability and Bayes' theorem, with worked GATE DA examples.
---
Probability starts with counting: when all outcomes are equally likely, the probability of an event is the number of outcomes in it divided by the total number of outcomes. This lesson builds the counting tools first, then the rules of probability.

## Counting

**Multiplication rule.** If a task is done in k steps, with n₁ ways for the first step, n₂ for the second, and so on, the task can be done in n₁ × n₂ × … × nₖ ways. A password of 2 letters followed by 3 digits can be formed in 26² × 10³ = 676,000 ways.

**Permutations (order matters).**

- Arranging n distinct objects in a row: **n!** ways.
- Choosing and arranging r of n distinct objects: **P(n, r) = n! / (n − r)!**
- Arranging n objects where n₁ are alike, n₂ are alike, …: **n! / (n₁! n₂! …)**. The letters of BANANA can be arranged in 6! / (3! 2! 1!) = 60 ways.
- Arranging n distinct objects in a **circle**: (n − 1)! ways (rotations of the same arrangement are not counted separately).

**Combinations (order does not matter).**

- Choosing r of n distinct objects: **C(n, r) = n! / (r! (n − r)!)**, also written ⁿCᵣ or "n choose r".
- C(n, r) = C(n, n − r), and **Pascal's rule** C(n, r) = C(n − 1, r − 1) + C(n − 1, r).
- **Stars and bars**: the number of ways to put r identical balls into n distinct boxes (boxes may be empty), equivalently the number of non-negative integer solutions of x₁ + … + xₙ = r, is **C(n + r − 1, r)**.

**Inclusion-exclusion.** |A ∪ B| = |A| + |B| − |A ∩ B|, and for three sets |A ∪ B ∪ C| = |A| + |B| + |C| − |A ∩ B| − |A ∩ C| − |B ∩ C| + |A ∩ B ∩ C|.

```python
from math import comb, factorial, perm
from itertools import permutations, product

print("P(10, 3) =", perm(10, 3), " C(10, 3) =", comb(10, 3))
print("arrangements of BANANA:", len(set(permutations("BANANA"))), "=", factorial(6) // (factorial(3) * factorial(2)))
print("5 people around a round table:", factorial(4))
sols = sum(1 for x in product(range(8), repeat=3) if sum(x) == 7)
print("non-negative solutions of x1 + x2 + x3 = 7:", sols, "=", comb(3 + 7 - 1, 7))
print("numbers 1..100 divisible by 2 or 3 or 5:", sum(1 for n in range(1, 101) if n % 2 == 0 or n % 3 == 0 or n % 5 == 0))
```
```output
P(10, 3) = 720  C(10, 3) = 120
arrangements of BANANA: 60 = 60
5 people around a round table: 24
non-negative solutions of x1 + x2 + x3 = 7: 36 = 36
numbers 1..100 divisible by 2 or 3 or 5: 74
```

## The axioms of probability

A **sample space** S is the set of all outcomes of an experiment, and an **event** is a subset of S. A probability P assigns a number to each event so that:

1. P(A) ≥ 0 for every event A;
2. P(S) = 1;
3. if A and B are **mutually exclusive** (A ∩ B = ∅), P(A ∪ B) = P(A) + P(B) (and the same for any countable collection of disjoint events).

Everything else follows:

- P(Aᶜ) = 1 − P(A), the **complement rule**. "At least one" problems are almost always easier as 1 − P(none).
- P(∅) = 0, and A ⊆ B implies P(A) ≤ P(B).
- **Addition rule**: P(A ∪ B) = P(A) + P(B) − P(A ∩ B).

## Conditional probability and independence

The probability of A given that B has occurred (with P(B) > 0) is

**P(A | B) = P(A ∩ B) / P(B)**

which rearranges to the **multiplication rule** P(A ∩ B) = P(B) P(A | B) = P(A) P(B | A).

Events A and B are **independent** if **P(A ∩ B) = P(A) P(B)**, equivalently P(A | B) = P(A). Several events are **mutually independent** if this product rule holds for every sub-collection; **pairwise** independence (every pair independent) is weaker.

Independent and mutually exclusive are very different: if A and B are mutually exclusive and both have positive probability, then P(A ∩ B) = 0 ≠ P(A) P(B), so they are **dependent** (knowing A happened tells you B did not).

## Total probability and Bayes' theorem

If B₁, …, Bₙ **partition** S (they are mutually exclusive and one of them must happen), then:

- **Law of total probability**: P(A) = Σᵢ P(A | Bᵢ) P(Bᵢ).
- **Bayes' theorem**: P(Bⱼ | A) = P(A | Bⱼ) P(Bⱼ) / Σᵢ P(A | Bᵢ) P(Bᵢ).

P(Bⱼ) is the **prior** (belief before seeing A), P(A | Bⱼ) the **likelihood**, and P(Bⱼ | A) the **posterior**. Bayes' theorem is the basis of the naive Bayes classifier and of Bayesian networks.

**Example.** A factory has three machines. M₁ makes 50% of the items with a 2% defect rate, M₂ makes 30% with 3% defects, and M₃ makes 20% with 5% defects. An item is found to be defective. Which machine most likely made it?

- P(D) = 0.5 × 0.02 + 0.3 × 0.03 + 0.2 × 0.05 = 0.010 + 0.009 + 0.010 = 0.029.
- P(M₁ | D) = 0.010 / 0.029 ≈ 0.345, P(M₂ | D) = 0.009 / 0.029 ≈ 0.310, P(M₃ | D) = 0.010 / 0.029 ≈ 0.345.

M₁ and M₃ are equally likely: M₃ makes fewer items, but its higher defect rate exactly makes up for it.

```python
from fractions import Fraction as F

prior = {"M1": F(50, 100), "M2": F(30, 100), "M3": F(20, 100)}
defect = {"M1": F(2, 100), "M2": F(3, 100), "M3": F(5, 100)}
pD = sum(prior[m] * defect[m] for m in prior)
print("P(defective) =", pD, "=", float(pD))
for m in prior:
    post = prior[m] * defect[m] / pD
    print(f"P({m} | defective) = {post} = {float(post):.4f}")

# Birthday problem: P(at least two of n people share a birthday), 365 equally likely days
for n in [10, 23, 50]:
    none = 1.0
    for i in range(n):
        none *= (365 - i) / 365
    print(f"n = {n}: P(shared birthday) = {1 - none:.4f}")
```
```output
P(defective) = 29/1000 = 0.029
P(M1 | defective) = 10/29 = 0.3448
P(M2 | defective) = 9/29 = 0.3103
P(M3 | defective) = 10/29 = 0.3448
n = 10: P(shared birthday) = 0.1169
n = 23: P(shared birthday) = 0.5073
n = 50: P(shared birthday) = 0.9704
```

## Practice questions

```quiz
q: In how many ways can a committee of 3 men and 2 women be chosen from 7 men and 5 women?
answer: 350
verify: __import__("math").comb(7, 3) * __import__("math").comb(5, 2)
explain: Choose the men in C(7, 3) = 35 ways and the women in C(5, 2) = 10 ways. By the multiplication rule: 35 × 10 = 350.
```

```quiz
q: Two cards are drawn from a standard deck of 52 without replacement. What is the probability that both are aces? Give the answer to four decimal places.
answer: 0.0045
verify: round(4 / 52 * 3 / 51, 4)
explain: P = (4/52) × (3/51) = 12/2652 = 1/221 ≈ 0.0045. Equivalently, C(4, 2)/C(52, 2) = 6/1326.
```

```quiz
q: P(A) = 0.5, P(B) = 0.4 and P(A ∪ B) = 0.7. What is P(A | B)?
answer: 0.5
verify: round((0.5 + 0.4 - 0.7) / 0.4, 9)
explain: P(A ∩ B) = P(A) + P(B) − P(A ∪ B) = 0.2. P(A | B) = 0.2 / 0.4 = 0.5. Since P(A | B) = P(A), A and B are independent.
```

```quiz
q: A fair die is rolled 4 times. What is the probability of getting at least one six? Give the answer to four decimal places.
answer: 0.5177
verify: round(1 - (5 / 6) ** 4, 4)
explain: P(no six in 4 rolls) = (5/6)⁴ = 625/1296 ≈ 0.4823, so P(at least one six) = 1 − 0.4823 = 0.5177.
```

```quiz
q: How many non-negative integer solutions does x₁ + x₂ + x₃ + x₄ = 10 have?
answer: 286
verify: __import__("math").comb(10 + 4 - 1, 10)
explain: Stars and bars with r = 10 and n = 4: C(10 + 4 − 1, 10) = C(13, 10) = C(13, 3) = 286.
```

```quiz
q: A test for a disease that affects 2% of a population has sensitivity 95% (P(positive | disease)) and a false positive rate of 10%. A person tests positive. What is the probability that they have the disease? Give the answer to three decimal places.
answer: 0.162
verify: round(0.02 * 0.95 / (0.02 * 0.95 + 0.98 * 0.10), 3)
explain: P(positive) = 0.02 × 0.95 + 0.98 × 0.10 = 0.019 + 0.098 = 0.117. P(disease | positive) = 0.019 / 0.117 ≈ 0.162. Because the disease is rare, most positives are false positives.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* If A and B are independent, then A and Bᶜ are also independent
- If A and B are mutually exclusive with positive probabilities, they are independent
* P(A ∩ B) ≤ P(A) for all events A and B
- P(A | B) = P(B | A) for all events A and B
explain: P(A ∩ Bᶜ) = P(A) − P(A)P(B) = P(A)P(Bᶜ). Mutually exclusive events with positive probabilities have P(A ∩ B) = 0 ≠ P(A)P(B). A ∩ B ⊆ A. P(A | B) and P(B | A) differ unless P(A) = P(B) (or the intersection is empty).
```
