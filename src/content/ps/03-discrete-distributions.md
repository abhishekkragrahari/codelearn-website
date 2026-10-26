---
title: Discrete Distributions
chapter: Random Variables
description: The Bernoulli, binomial, geometric, Poisson, discrete uniform and hypergeometric distributions, their pmfs, means and variances, the Poisson approximation to the binomial, and the memoryless property, for GATE DA.
---
A handful of discrete distributions describe most counting situations. For each, learn **what it models**, its **pmf**, and its **mean and variance**: GATE questions usually test exactly these.

## Bernoulli(p)

One trial with two outcomes: success (X = 1) with probability p and failure (X = 0) with probability 1 − p.

- P(X = 1) = p, P(X = 0) = 1 − p
- **E[X] = p**, **Var(X) = p(1 − p)**, which is largest (0.25) when p = 0.5.

## Binomial(n, p)

The number of successes in **n independent** Bernoulli(p) trials.

- **P(X = k) = C(n, k) pᵏ (1 − p)ⁿ⁻ᵏ** for k = 0, 1, …, n
- **E[X] = np**, **Var(X) = np(1 − p)**

The mean and variance follow from writing X as a sum of n independent Bernoulli variables. The sum of independent Binomial(n₁, p) and Binomial(n₂, p) variables is Binomial(n₁ + n₂, p).

**Example.** 30% of emails are spam. In a batch of 10, the probability of exactly 3 spam emails is C(10, 3)(0.3)³(0.7)⁷ ≈ 0.2668, and the expected number of spam emails is 10 × 0.3 = 3.

## Geometric(p)

The number of trials **up to and including the first success**.

- **P(X = k) = (1 − p)ᵏ⁻¹ p** for k = 1, 2, 3, …
- **P(X > k) = (1 − p)ᵏ** (the first k trials all fail)
- **E[X] = 1/p**, **Var(X) = (1 − p)/p²**

The geometric distribution is **memoryless**: P(X > m + n | X > m) = P(X > n). Having already failed m times does not make success any more likely on the next trial. It is the only memoryless discrete distribution.

(Some books count the failures **before** the first success instead, Y = X − 1, with mean (1 − p)/p. Read each question carefully.)

## Poisson(λ)

The number of events in a fixed interval of time or space, when events happen independently at a constant average rate λ per interval: calls to a call centre per minute, typos per page, requests per second.

- **P(X = k) = e^(−λ) λᵏ / k!** for k = 0, 1, 2, …
- **E[X] = Var(X) = λ**

The sum of independent Poisson(λ₁) and Poisson(λ₂) variables is Poisson(λ₁ + λ₂). If the rate is λ per minute, the count in t minutes is Poisson(λt).

**Poisson approximation to the binomial.** When n is large and p is small, Binomial(n, p) ≈ Poisson(λ = np). For n = 500 and p = 0.004 (λ = 2), P(X = 0) is (0.996)⁵⁰⁰ ≈ 0.1348 exactly, and e⁻² ≈ 0.1353 by the approximation.

## Discrete uniform

X is equally likely to be each of the integers a, a + 1, …, b (there are n = b − a + 1 of them).

- P(X = k) = 1/n
- **E[X] = (a + b)/2**, **Var(X) = (n² − 1)/12**

A fair die (a = 1, b = 6, n = 6) has mean 3.5 and variance 35/12 ≈ 2.917.

## Hypergeometric

Draw n items **without replacement** from a population of N items, of which K are "successes". The number of successes drawn has

- **P(X = k) = C(K, k) C(N − K, n − k) / C(N, n)**
- E[X] = nK/N (the same as the binomial with p = K/N), but a smaller variance, by the factor (N − n)/(N − 1).

**Example.** A box of 20 items contains 5 defective ones. If 4 items are drawn without replacement, P(exactly 1 defective) = C(5, 1) C(15, 3) / C(20, 4) = 5 × 455 / 4845 ≈ 0.4696.

## Summary

| Distribution | Models | P(X = k) | Mean | Variance |
| --- | --- | --- | --- | --- |
| Bernoulli(p) | One trial | pᵏ(1 − p)¹⁻ᵏ, k ∈ {0, 1} | p | p(1 − p) |
| Binomial(n, p) | Successes in n trials | C(n, k) pᵏ(1 − p)ⁿ⁻ᵏ | np | np(1 − p) |
| Geometric(p) | Trials to first success | (1 − p)ᵏ⁻¹ p | 1/p | (1 − p)/p² |
| Poisson(λ) | Events in an interval | e^(−λ) λᵏ / k! | λ | λ |
| Uniform{a..b} | Equally likely integers | 1/n | (a + b)/2 | (n² − 1)/12 |
| Hypergeometric | Successes drawn without replacement | C(K, k)C(N − K, n − k)/C(N, n) | nK/N | nK/N · (1 − K/N) · (N − n)/(N − 1) |

```python
from math import comb, exp, factorial

def binom(k, n, p):
    return comb(n, k) * p ** k * (1 - p) ** (n - k)

def poisson(k, lam):
    return exp(-lam) * lam ** k / factorial(k)

print(f"Binomial(10, 0.3): P(X = 3) = {binom(3, 10, 0.3):.4f}, P(X <= 1) = {binom(0, 10, 0.3) + binom(1, 10, 0.3):.4f}")
print(f"Poisson(4): P(X = 2) = {poisson(2, 4):.4f}, P(X >= 1) = {1 - poisson(0, 4):.4f}")
print(f"Geometric(0.2): P(X = 3) = {0.8 ** 2 * 0.2:.4f}, P(X > 3) = {0.8 ** 3:.4f}")
print(f"Binomial(500, 0.004): P(X = 0) = {binom(0, 500, 0.004):.4f}; Poisson(2): {poisson(0, 2):.4f}")
print(f"Hypergeometric N=20, K=5, n=4: P(X = 1) = {comb(5, 1) * comb(15, 3) / comb(20, 4):.4f}")

# Check the binomial mean and variance from the pmf itself
n, p = 10, 0.3
mean = sum(k * binom(k, n, p) for k in range(n + 1))
var = sum(k * k * binom(k, n, p) for k in range(n + 1)) - mean ** 2
print(f"Binomial(10, 0.3) from the pmf: mean = {mean:.4f} (np = 3), variance = {var:.4f} (np(1-p) = 2.1)")
```
```output
Binomial(10, 0.3): P(X = 3) = 0.2668, P(X <= 1) = 0.1493
Poisson(4): P(X = 2) = 0.1465, P(X >= 1) = 0.9817
Geometric(0.2): P(X = 3) = 0.1280, P(X > 3) = 0.5120
Binomial(500, 0.004): P(X = 0) = 0.1348; Poisson(2): 0.1353
Hypergeometric N=20, K=5, n=4: P(X = 1) = 0.4696
Binomial(10, 0.3) from the pmf: mean = 3.0000 (np = 3), variance = 2.1000 (np(1-p) = 2.1)
```

## Practice questions

```quiz
q: A fair coin is tossed 8 times. What is the probability of exactly 5 heads? Give the answer to four decimal places.
answer: 0.2188
verify: round(__import__("math").comb(8, 5) / 2 ** 8, 4)
explain: C(8, 5) / 2⁸ = 56 / 256 = 0.21875 ≈ 0.2188.
```

```quiz
q: A website receives on average 3 requests per second (Poisson). What is the probability of no requests in a given 2-second window? Give the answer to four decimal places.
answer: 0.0025
verify: round(__import__("math").exp(-6), 4)
explain: In 2 seconds the count is Poisson(3 × 2 = 6), so P(0) = e⁻⁶ ≈ 0.0025.
```

```quiz
q: A basketball player scores each free throw with probability 0.4, independently. What is the expected number of throws up to and including the first score?
answer: 2.5
verify: 1 / 0.4
explain: The number of trials to the first success is Geometric(0.4), with mean 1/p = 2.5.
```

```quiz
q: X is Binomial(n, p) with E[X] = 6 and Var(X) = 4.2. What is n?
answer: 20
verify: round(6 / (1 - 4.2 / 6))
explain: Var/E = 1 − p = 4.2/6 = 0.7, so p = 0.3 and n = 6/0.3 = 20.
```

```quiz
q: An urn has 6 red and 4 blue balls. Three balls are drawn without replacement. What is the probability that exactly 2 are red?
answer: 0.5
verify: __import__("math").comb(6, 2) * __import__("math").comb(4, 1) / __import__("math").comb(10, 3)
explain: Hypergeometric: C(6, 2) × C(4, 1) / C(10, 3) = 15 × 4 / 120 = 0.5.
```

```quiz
q: What is the variance of the outcome of one roll of a fair 6-sided die? Give the answer to three decimal places.
answer: 2.917
verify: round((6 ** 2 - 1) / 12, 3)
explain: For a discrete uniform distribution on n = 6 values, Var = (n² − 1)/12 = 35/12 ≈ 2.917.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* The mean and the variance of a Poisson distribution are equal
* The geometric distribution is memoryless
- The variance of a binomial distribution is largest when p = 1
* Binomial(n, p) is well approximated by Poisson(np) when n is large and p is small
explain: Poisson(λ) has mean and variance λ. Past failures do not change the chance of the next success. np(1 − p) is largest at p = 0.5 and is 0 at p = 1. The Poisson approximation is the law of rare events.
```
