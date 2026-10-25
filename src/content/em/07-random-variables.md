---
title: Random Variables and Distributions
chapter: Probability and Statistics
description: Discrete and continuous random variables, expectation and variance, and the distributions in the GATE syllabus: Bernoulli, binomial, Poisson, geometric, uniform, exponential and normal.
---
A **random variable** X assigns a number to each outcome of an experiment: the number of heads in 10 tosses, the time until a server fails.

## Discrete and continuous

- A **discrete** random variable has a **probability mass function** (pmf) p(x) = P(X = x), with Σ p(x) = 1.
- A **continuous** random variable has a **probability density function** (pdf) f(x) ≥ 0 with ∫ f(x) dx = 1, and P(a ≤ X ≤ b) = ∫ₐᵇ f(x) dx. For continuous X, P(X = a) = 0 for every single value a.
- The **cumulative distribution function** F(x) = P(X ≤ x) works for both; for continuous X, f(x) = F′(x).

## Expectation and variance

| | Discrete | Continuous |
| --- | --- | --- |
| Mean E[X] = μ | Σ x p(x) | ∫ x f(x) dx |
| Variance Var(X) = σ² | E[X²] − (E[X])² | same |

Rules: E[aX + b] = aE[X] + b; Var(aX + b) = a² Var(X); E[X + Y] = E[X] + E[Y] always; Var(X + Y) = Var(X) + Var(Y) when X and Y are **independent**. The standard deviation σ is √Var(X).

Example: X takes 0, 1, 2, 3 with probabilities 0.1, 0.3, 0.4, 0.2. E[X] = 0.3 + 0.8 + 0.6 = 1.7; E[X²] = 0.3 + 1.6 + 1.8 = 3.7; Var(X) = 3.7 − 1.7² = 0.81.

## Discrete distributions

| Distribution | Models | P(X = k) | Mean | Variance |
| --- | --- | --- | --- | --- |
| **Bernoulli(p)** | One trial, success probability p | p for k = 1, 1 − p for k = 0 | p | p(1 − p) |
| **Binomial(n, p)** | Number of successes in n independent trials | C(n, k) pᵏ (1 − p)ⁿ⁻ᵏ | np | np(1 − p) |
| **Poisson(λ)** | Number of events in an interval, at average rate λ | e^(−λ) λᵏ / k! | λ | λ |
| **Geometric(p)** | Number of trials up to and including the first success | (1 − p)ᵏ⁻¹ p | 1/p | (1 − p)/p² |

The Poisson distribution approximates Binomial(n, p) when n is large and p small, with λ = np.

## Continuous distributions

| Distribution | pdf | Mean | Variance |
| --- | --- | --- | --- |
| **Uniform(a, b)** | 1/(b − a) on [a, b] | (a + b)/2 | (b − a)²/12 |
| **Exponential(λ)** | λ e^(−λx) for x ≥ 0 | 1/λ | 1/λ² |
| **Normal(μ, σ²)** | (1/(σ√(2π))) e^(−(x − μ)²/(2σ²)) | μ | σ² |

- The exponential distribution is **memoryless**: P(X > s + t | X > s) = P(X > t). It models waiting times (time to the next request, lifetime of a component), and P(X > t) = e^(−λt).
- For the normal distribution, **standardise** with Z = (X − μ)/σ, which is Normal(0, 1). About 68% of values lie within 1σ of the mean, 95% within 1.96σ (≈ 2σ) and 99.7% within 3σ.

```python
from math import comb, exp, factorial
from statistics import NormalDist

print(f"Binomial(10, 0.3): P(X = 3) = {comb(10, 3) * 0.3 ** 3 * 0.7 ** 7:.4f}, mean {10 * 0.3:.1f}, variance {10 * 0.3 * 0.7:.2f}")
print(f"Poisson(2): P(X = 0) = {exp(-2):.4f}, P(X <= 2) = {sum(exp(-2) * 2 ** k / factorial(k) for k in range(3)):.4f}")
print(f"Exponential(0.5): mean 2, P(X > 3) = {exp(-0.5 * 3):.4f}")
Z = NormalDist()
print(f"Normal: P(|Z| < 1) = {Z.cdf(1) - Z.cdf(-1):.4f}, P(|Z| < 1.96) = {Z.cdf(1.96) - Z.cdf(-1.96):.4f}")
print(f"Normal(70, 10^2): P(X > 85) = {1 - NormalDist(70, 10).cdf(85):.4f}")
```
```output
Binomial(10, 0.3): P(X = 3) = 0.2668, mean 3.0, variance 2.10
Poisson(2): P(X = 0) = 0.1353, P(X <= 2) = 0.6767
Exponential(0.5): mean 2, P(X > 3) = 0.2231
Normal: P(|Z| < 1) = 0.6827, P(|Z| < 1.96) = 0.9500
Normal(70, 10^2): P(X > 85) = 0.0668
```

## Practice questions

```quiz
q: X is the number of heads in 5 tosses of a fair coin. What is P(X = 2)? Give the answer to four decimal places.
answer: 0.3125
verify: round(__import__("math").comb(5, 2) * 0.5 ** 5, 4)
explain: Binomial(5, 0.5): C(5, 2) × 0.5⁵ = 10/32 = 0.3125.
```

```quiz
q: Requests arrive at a server as a Poisson process with an average of 3 per second. What is the probability of **at least 2** requests in a given second? Give the answer to four decimal places.
answer: 0.8009
verify: round(1 - __import__("math").exp(-3) * (1 + 3), 4)
explain: P(X ≥ 2) = 1 − P(0) − P(1) = 1 − e⁻³(1 + 3) = 1 − 4e⁻³ ≈ 1 − 0.1991 = 0.8009.
```

```quiz
q: X is uniformly distributed on [2, 8]. What is its variance?
answer: 3
verify: (8 - 2) ** 2 / 12
explain: Var = (b − a)²/12 = 36/12 = 3.
```

```quiz
q: X takes the values 0, 1, 2, 3 with probabilities 0.1, 0.3, 0.4, 0.2. What is Var(2X + 5)?
answer: 3.24
verify:
  xs, ps = [0, 1, 2, 3], [0.1, 0.3, 0.4, 0.2]
  m = sum(x * p for x, p in zip(xs, ps))
  v = sum(x * x * p for x, p in zip(xs, ps)) - m * m
  print(round(4 * v, 4))
explain: Var(X) = 3.7 − 1.7² = 0.81, and Var(2X + 5) = 2² × 0.81 = 3.24. The constant 5 does not change the spread.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* The mean and the variance of a Poisson distribution are equal
* The exponential distribution is memoryless
- For a continuous random variable, P(X = a) is given by the pdf value f(a)
* Var(X + Y) = Var(X) + Var(Y) when X and Y are independent
explain: Poisson(λ) has mean and variance λ. Exponential waiting times have no memory. For continuous X, P(X = a) = 0; f(a) is a density, not a probability. Variances add for independent variables.
```
