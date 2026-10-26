---
title: Probability and Statistics GATE Practice Set
chapter: GATE Practice
description: Mixed GATE DA style questions on counting, conditional probability and Bayes, random variables, distributions, the central limit theorem, confidence intervals and hypothesis tests, with answers and explanations.
---
These questions mix every topic in this track, in the GATE formats **MCQ**, **MSQ** and **NAT**. Each numerical answer is recomputed by a program when the site is built.

## Probability

```quiz
q: **[Counting]** How many 4-digit numbers (no leading zero) have all digits distinct?
answer: 4536
verify: 9 * 9 * 8 * 7
explain: The first digit has 9 choices (1 to 9). The second has 9 (any digit except the first, now including 0), the third 8 and the fourth 7: 9 × 9 × 8 × 7 = 4536.
```

```quiz
q: **[Conditional probability]** Two fair dice are rolled. Given that the sum is 8, what is the probability that both dice show even numbers? Give the answer to one decimal place.
answer: 0.6
verify:
  from itertools import product
  s = [d for d in product(range(1, 7), repeat=2) if sum(d) == 8]
  print(round(sum(1 for a, b in s if a % 2 == 0 and b % 2 == 0) / len(s), 1))
explain: Sum 8 has 5 outcomes: (2, 6), (3, 5), (4, 4), (5, 3), (6, 2). Three of them have both dice even, so the probability is 3/5 = 0.6.
```

```quiz
q: **[Bayes]** Box A has 2 white and 3 black balls; box B has 4 white and 1 black. A box is chosen with probability 1/2 each and a ball is drawn; it is white. What is the probability that it came from box B? Give the answer to three decimal places.
answer: 0.667
verify: round(0.5 * 0.8 / (0.5 * 0.4 + 0.5 * 0.8), 3)
explain: P(white) = ½ × 2/5 + ½ × 4/5 = 0.2 + 0.4 = 0.6. P(B | white) = 0.4 / 0.6 = 2/3 ≈ 0.667.
```

```quiz
q: **[Independence]** P(A) = 0.4 and P(B) = 0.5, and A and B are independent. What is P(A ∪ B)?
answer: 0.7
verify: round(0.4 + 0.5 - 0.4 * 0.5, 9)
explain: P(A ∩ B) = 0.4 × 0.5 = 0.2, so P(A ∪ B) = 0.4 + 0.5 − 0.2 = 0.7.
```

## Random variables and distributions

```quiz
q: **[Expectation]** X has pdf f(x) = 3x² on [0, 1]. What is E[X]?
answer: 0.75
verify:
  n = 100000
  print(round(sum(3 * ((i + 0.5) / n) ** 3 for i in range(n)) / n, 4))
explain: E[X] = ∫₀¹ x · 3x² dx = 3/4 = 0.75.
```

```quiz
q: **[Binomial]** A multiple-choice test has 5 questions with 4 options each. A student guesses every answer at random. What is the probability of getting at least 4 right? Give the answer to four decimal places.
answer: 0.0156
verify:
  from math import comb
  print(round(sum(comb(5, k) * 0.25 ** k * 0.75 ** (5 - k) for k in (4, 5)), 4))
explain: X ~ Binomial(5, 0.25). P(4) = 5 × 0.25⁴ × 0.75 = 0.014648 and P(5) = 0.25⁵ = 0.000977. The total is about 0.0156.
```

```quiz
q: **[Poisson]** A page of a book has on average 0.5 typos (Poisson). What is the probability that a page has at least one typo? Give the answer to four decimal places.
answer: 0.3935
verify: round(1 - __import__("math").exp(-0.5), 4)
explain: P(X ≥ 1) = 1 − P(X = 0) = 1 − e^(−0.5) ≈ 1 − 0.6065 = 0.3935.
```

```quiz
q: **[Normal]** X ~ N(50, 25). What is P(45 < X < 60)? Give the answer to four decimal places.
answer: 0.8186
verify:
  from statistics import NormalDist
  d = NormalDist(50, 5)
  print(round(d.cdf(60) - d.cdf(45), 4))
explain: σ = 5. Standardising: P(−1 < Z < 2) = Φ(2) − Φ(−1) = 0.9772 − 0.1587 = 0.8186 (to four decimal places, using exact values).
```

```quiz
q: **[Covariance]** Var(X) = 4, Var(Y) = 1 and ρ(X, Y) = 0.5. What is Var(X + 2Y)?
answer: 12
verify: 4 + 4 * 1 + 2 * 2 * 0.5 * 2 * 1
explain: Cov(X, Y) = ρσ<sub>X</sub>σ<sub>Y</sub> = 0.5 × 2 × 1 = 1. Var(X + 2Y) = Var(X) + 4 Var(Y) + 2 × 2 × Cov(X, Y) = 4 + 4 + 4 = 12.
```

## Inference

```quiz
q: **[CLT]** The time to serve a customer has mean 3 minutes and standard deviation 2 minutes. What is the approximate probability that 100 customers take more than 330 minutes in total? Give the answer to four decimal places.
answer: 0.0668
verify:
  from statistics import NormalDist
  print(round(1 - NormalDist(300, 20).cdf(330), 4))
explain: The total has mean 100 × 3 = 300 and standard deviation √100 × 2 = 20. Z = (330 − 300)/20 = 1.5, and P(Z > 1.5) = 1 − 0.9332 = 0.0668.
```

```quiz
q: **[Confidence interval]** A 95% z interval for μ, based on n = 25 and known σ = 10, is (46.08, 53.92). What was the sample mean?
answer: 50
verify: (46.08 + 53.92) / 2
explain: The interval is centred at X̄: (46.08 + 53.92)/2 = 50. (The half-width 3.92 = 1.96 × 10/5, as expected.)
```

```quiz
q: **[Hypothesis test]** In a right-tailed z-test at α = 0.05, the test statistic is 1.5. Which statements are **true**? (Select all that apply.)
* H₀ is not rejected at α = 0.05
* The p-value is about 0.067
- H₀ is rejected because the test statistic is positive
* H₀ would be rejected at α = 0.10
explain: The critical value at 5% is 1.645 > 1.5, so H₀ is not rejected. p = 1 − Φ(1.5) ≈ 0.0668, which is below 0.10, so H₀ would be rejected at the 10% level (critical value 1.282).
```

```quiz
q: **[Chi-squared]** For a 3 × 3 contingency table with 90 observations, row totals 30, 30, 30 and column totals 20, 30, 40, what is the expected count in row 1, column 3?
answer: 13.3333
verify: round(30 * 40 / 90, 4)
explain: E = row total × column total / grand total = 30 × 40 / 90 = 13.3333.
```
