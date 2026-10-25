---
title: Probability
chapter: Probability and Statistics
description: Sample spaces and events, the axioms, counting-based probability, conditional probability and independence, the law of total probability, and Bayes' theorem.
---
## Basics

An **experiment** has a set of possible outcomes, the **sample space** S. An **event** is a subset of S. When all outcomes are equally likely,

**P(A) = (number of outcomes in A) / (number of outcomes in S).**

Rolling two dice gives 36 equally likely outcomes; the event "the sum is 7" contains 6 of them, so P = 6/36 = 1/6.

The **axioms**: P(A) ≥ 0, P(S) = 1, and P(A ∪ B) = P(A) + P(B) when A and B are disjoint. From them:

- P(Ā) = 1 − P(A) (the **complement rule**, often the easy way: "at least one" = 1 − "none").
- P(A ∪ B) = P(A) + P(B) − P(A ∩ B).
- P(∅) = 0, and A ⊆ B ⇒ P(A) ≤ P(B).

## Conditional probability and independence

The probability of A **given** that B has happened:

**P(A | B) = P(A ∩ B) / P(B)**, so P(A ∩ B) = P(B) · P(A | B) (the multiplication rule).

A and B are **independent** if P(A ∩ B) = P(A) · P(B), equivalently P(A | B) = P(A). Independent is **not** the same as disjoint: two disjoint events with positive probabilities are never independent (if one happens, the other cannot).

Examples:

- Drawing 2 cards without replacement, P(both aces) = 4/52 × 3/51 = 1/221.
- Rolling a die 4 times, P(at least one six) = 1 − (5/6)⁴ = 671/1296 ≈ 0.518.

## Total probability and Bayes' theorem

If B₁, …, Bₙ partition the sample space (exactly one of them happens):

- **Law of total probability**: P(A) = Σ P(Bᵢ) P(A | Bᵢ).
- **Bayes' theorem**: P(Bᵢ | A) = P(Bᵢ) P(A | Bᵢ) / P(A): it turns "probability of the evidence given the cause" into "probability of the cause given the evidence".

**Example (medical test).** A disease affects 1% of people. A test detects it in 99% of sick people, but also gives a positive result for 5% of healthy people. If someone tests positive, how likely are they to be sick?

```tree
caption: Probability tree for the test: multiply along a branch, add the branches that give a positive result
Everyone
  Sick | 0.01
    Positive | 0.01 × 0.99 = 0.0099
    Negative | 0.01 × 0.01 = 0.0001
  Healthy | 0.99
    Positive | 0.99 × 0.05 = 0.0495
    Negative | 0.99 × 0.95 = 0.9405
```

P(sick | +) = (0.01 × 0.99) / (0.01 × 0.99 + 0.99 × 0.05) = 0.0099 / 0.0594 = **1/6 ≈ 0.167**.

Most positives come from the large healthy group, so a positive result still means only a 1-in-6 chance of being sick.

Exact computations with fractions, by enumerating outcomes:

```python
from fractions import Fraction
from itertools import product

dice = list(product(range(1, 7), repeat=2))
def P(event):
    return Fraction(sum(1 for d in dice if event(d)), len(dice))

print("P(sum = 7) =", P(lambda d: sum(d) == 7))
print("P(sum = 8 | first die even) =", P(lambda d: sum(d) == 8 and d[0] % 2 == 0) / P(lambda d: d[0] % 2 == 0))
print("P(larger die is 4) =", P(lambda d: max(d) == 4))
print("P(at least one six in 4 rolls) =", 1 - Fraction(5, 6) ** 4)

prior, sensitivity, false_positive = Fraction(1, 100), Fraction(99, 100), Fraction(5, 100)
posterior = prior * sensitivity / (prior * sensitivity + (1 - prior) * false_positive)
print("P(sick | positive) =", posterior)

p_no_shared = 1.0
for i in range(23):
    p_no_shared *= (365 - i) / 365
print(f"birthday problem, 23 people: P(some shared birthday) = {1 - p_no_shared:.4f}")
```
```output
P(sum = 7) = 1/6
P(sum = 8 | first die even) = 1/6
P(larger die is 4) = 7/36
P(at least one six in 4 rolls) = 671/1296
P(sick | positive) = 1/6
birthday problem, 23 people: P(some shared birthday) = 0.5073
```

The **birthday problem** surprises most people: with only 23 people, a shared birthday is more likely than not.

## Practice questions

```quiz
q: Urn 1 has 3 red and 2 blue balls; urn 2 has 1 red and 4 blue. An urn is chosen at random and a ball drawn from it is red. What is the probability that it came from urn 1?
answer: 0.75
verify:
  from fractions import Fraction as F
  red = F(1, 2) * F(3, 5) + F(1, 2) * F(1, 5)
  print(float(F(1, 2) * F(3, 5) / red))
explain: P(red) = ½ · 3/5 + ½ · 1/5 = 2/5. By Bayes: P(urn 1 | red) = (½ · 3/5) / (2/5) = 3/4 = 0.75.
```

```quiz
q: Two fair dice are rolled. What is the probability that the larger of the two numbers is 4? Give the answer to three decimal places.
answer: 0.194
verify:
  from itertools import product
  print(round(sum(1 for a, b in product(range(1, 7), repeat=2) if max(a, b) == 4) / 36, 3))
explain: Both dice must be at most 4 (16 outcomes) but not both at most 3 (9 outcomes): 16 − 9 = 7 outcomes, so 7/36 ≈ 0.194.
```

```quiz
q: A fair coin is tossed 5 times. What is the probability of getting at least 4 heads?
answer: 0.1875
verify:
  from itertools import product
  print(sum(1 for t in product([0, 1], repeat=5) if sum(t) >= 4) / 32)
explain: Exactly 4 heads: C(5, 4) = 5 outcomes; 5 heads: 1 outcome. 6/32 = 3/16 = 0.1875.
```

```quiz
q: P(A) = 0.5, P(B) = 0.4 and A and B are independent. What is P(A ∪ B)?
answer: 0.7
verify: round(0.5 + 0.4 - 0.5 * 0.4, 6)
explain: Independence gives P(A ∩ B) = 0.5 × 0.4 = 0.2, so P(A ∪ B) = 0.5 + 0.4 − 0.2 = 0.7.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* If A and B are independent, so are A and the complement of B
* P(A | B) can differ from P(B | A)
- Two disjoint events with positive probabilities are independent
* P(A ∪ B) ≤ P(A) + P(B) for all events A and B
explain: P(A ∩ B̄) = P(A) − P(A)P(B) = P(A)P(B̄). Conditional probabilities are not symmetric (Bayes' theorem relates them). Disjoint events give P(A ∩ B) = 0 ≠ P(A)P(B). The union bound holds because the overlap is counted twice.
```
