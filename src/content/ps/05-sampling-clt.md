---
title: Sampling Distributions and the Central Limit Theorem
chapter: Statistical Inference
description: Populations and samples, the sample mean and sample variance, unbiased estimators, the standard error, the law of large numbers, and the central limit theorem with worked GATE DA examples.
---
Statistics works backwards from data to the process that produced it. We rarely know the true mean of a population; we estimate it from a **sample**. This lesson explains how good such estimates are.

## Populations, samples and statistics

- The **population** is the whole set we care about, described by **parameters** such as the mean μ and the variance σ².
- A **random sample** X₁, …, Xₙ is n independent observations from the population (independent and identically distributed, **i.i.d.**).
- A **statistic** is any quantity computed from the sample. Because the sample is random, a statistic is a random variable, and its distribution is called its **sampling distribution**.

The two key statistics:

- **Sample mean**: X̄ = (1/n) Σ Xᵢ
- **Sample variance**: S² = (1/(n − 1)) Σ (Xᵢ − X̄)²

## The sample mean

By linearity of expectation and independence:

- **E[X̄] = μ**: X̄ is an **unbiased** estimator of μ.
- **Var(X̄) = σ²/n**, so the **standard error** of the mean is **SE = σ/√n**.

Averaging n observations divides the variance by n and the standard deviation by √n. To halve the standard error, you need **four times** as many observations.

## Why n − 1 in the sample variance?

The deviations Xᵢ − X̄ are measured from the sample mean, which is itself fitted to the data, so they are slightly smaller on average than deviations from the true μ. Dividing by n − 1 instead of n corrects this: **E[S²] = σ²**, so S² is unbiased. Dividing by n gives a biased estimator, with expectation ((n − 1)/n) σ². The n − 1 is the number of **degrees of freedom**: once X̄ is fixed, only n − 1 of the deviations are free (they must sum to 0).

## The law of large numbers

As n grows, X̄ gets closer and closer to μ: for any ε > 0, P(|X̄ − μ| > ε) → 0. This is the **(weak) law of large numbers**, and it is why long-run frequencies estimate probabilities. **Chebyshev's inequality** gives a guarantee for any distribution with finite variance:

**P(|X − μ| ≥ kσ) ≤ 1/k²**

For the sample mean, P(|X̄ − μ| ≥ ε) ≤ σ²/(nε²), which goes to 0 as n → ∞.

## The central limit theorem

The law of large numbers says where X̄ goes; the **central limit theorem** (CLT) says what its distribution looks like on the way:

**If X₁, …, Xₙ are i.i.d. with mean μ and finite variance σ², then for large n, X̄ is approximately N(μ, σ²/n).**

Equivalently, (X̄ − μ)/(σ/√n) is approximately N(0, 1), and the sum Σ Xᵢ is approximately N(nμ, nσ²).

This holds **whatever the shape of the population**: skewed, discrete, uniform. A common rule of thumb is that n ≥ 30 is enough, unless the population is very skewed. If the population is itself normal, X̄ is exactly normal for every n.

**Example 1.** Battery lifetimes have mean 40 hours and standard deviation 6 hours (the distribution is not normal). For a random sample of 36 batteries, what is P(X̄ < 38)?

SE = 6/√36 = 1, so Z = (38 − 40)/1 = −2, and P(X̄ < 38) ≈ Φ(−2) = **0.0228**.

**Example 2.** A fair die is rolled 30 times. Each roll has mean 3.5 and variance 35/12. The average roll has SE = √(35/12/30) ≈ 0.312, so P(average > 4) ≈ P(Z > 0.5/0.312) = P(Z > 1.60) ≈ **0.054**.

The program checks Example 2 by simulation: the distribution of a single roll is flat, but the averages pile up in a bell shape around 3.5.

```python
import random
from statistics import NormalDist, mean, pstdev

random.seed(3)
n, trials = 30, 50000
averages = [mean(random.randint(1, 6) for _ in range(n)) for _ in range(trials)]
se = (35 / 12 / n) ** 0.5
print(f"mean of the averages = {mean(averages):.3f} (theory 3.5)")
print(f"sd of the averages = {pstdev(averages):.3f} (theory {se:.3f})")
print(f"simulated P(average > 4) = {sum(a > 4 for a in averages) / trials:.4f}")
print(f"CLT approximation      = {1 - NormalDist(3.5, se).cdf(4):.4f}")

# A text histogram of the averages: a bell shape, though each roll is uniform
bins = {}
for a in averages:
    b = round(a * 4) / 4
    bins[b] = bins.get(b, 0) + 1
for b in sorted(bins):
    if 2.5 <= b <= 4.5:
        print(f"{b:4.2f} {'#' * (bins[b] // 400)}")
```
```output
mean of the averages = 3.499 (theory 3.5)
sd of the averages = 0.311 (theory 0.312)
simulated P(average > 4) = 0.0473
CLT approximation      = 0.0544
2.50
2.75 ##
3.00 ##########
3.25 ##############################
3.50 ####################################
3.75 ##############################
4.00 ##########
4.25 ##
4.50
```

The simulated tail probability is close to the CLT value. The small difference comes from the averages being discrete (they move in steps of 1/30).

## Practice questions

```quiz
q: A population has standard deviation 12. What is the standard error of the mean for a sample of size 36?
answer: 2
verify: 12 / 36 ** 0.5
explain: SE = σ/√n = 12/6 = 2.
```

```quiz
q: The weights of packets have mean 500 g and standard deviation 20 g. For a random sample of 100 packets, what is the probability that the sample mean exceeds 504 g? Give the answer to four decimal places.
answer: 0.0228
verify: round(1 - __import__("statistics").NormalDist(500, 20 / 10).cdf(504), 4)
explain: SE = 20/√100 = 2, so Z = (504 − 500)/2 = 2. P(Z > 2) = 1 − 0.9772 = 0.0228.
```

```quiz
q: A sample of size n has standard error 3. How large must the sample be to bring the standard error down to 1, as a multiple of n?
answer: 9
verify: (3 / 1) ** 2
explain: SE is proportional to 1/√n. Dividing SE by 3 needs √n to triple, so n must be multiplied by 3² = 9.
```

```quiz
q: The sample 4, 7, 7, 10 is drawn from a population. What is the sample variance S² (with divisor n − 1)?
answer: 6
verify: __import__("statistics").variance([4, 7, 7, 10])
explain: X̄ = 7. The squared deviations are 9, 0, 0 and 9, summing to 18. S² = 18/(4 − 1) = 6. (Dividing by n would give 4.5.)
```

```quiz
q: By Chebyshev's inequality, at most what fraction of any distribution lies 3 or more standard deviations away from its mean? Give the answer to four decimal places.
answer: 0.1111
verify: round(1 / 9, 4)
explain: P(|X − μ| ≥ kσ) ≤ 1/k² = 1/9 ≈ 0.1111 for k = 3. For a normal distribution the true value is only about 0.0027; Chebyshev holds for every distribution, so it is loose.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* The central limit theorem applies even when the population is not normal
* The sample mean is an unbiased estimator of the population mean
- The sample variance with divisor n is an unbiased estimator of σ²
- By the CLT, a single observation from any population is approximately normal
explain: The CLT is about the distribution of the sample mean (or sum) for large n, whatever the population's shape; it says nothing about single observations. E[X̄] = μ. The divisor n − 1 is needed for unbiasedness.
```
