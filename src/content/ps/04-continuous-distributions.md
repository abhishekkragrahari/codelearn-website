---
title: Continuous Distributions
chapter: Random Variables
description: The uniform, exponential and normal distributions, standardisation and the standard normal table, and the t and chi-squared distributions used in statistical inference, for GATE DA.
---
This lesson covers the continuous distributions in the GATE DA syllabus. The first three model data directly; the **t** and **chi-squared** distributions appear when we build confidence intervals and tests in the later lessons.

## Uniform(a, b)

Every value in [a, b] is equally likely.

- pdf f(x) = 1/(b − a) on [a, b], cdf F(x) = (x − a)/(b − a)
- **E[X] = (a + b)/2**, **Var(X) = (b − a)²/12**
- P(c ≤ X ≤ d) = (d − c)/(b − a) for a ≤ c ≤ d ≤ b: probability is proportional to length.

## Exponential(λ)

The waiting time until the next event in a Poisson process with rate λ: the time to the next customer, the lifetime of a component that does not age.

- pdf f(x) = λe^(−λx) for x ≥ 0, cdf F(x) = 1 − e^(−λx)
- **P(X > t) = e^(−λt)**
- **E[X] = 1/λ**, **Var(X) = 1/λ²**, median = (ln 2)/λ
- **Memoryless**: P(X > s + t | X > s) = P(X > t). A component that has survived s hours is as good as new. It is the only memoryless continuous distribution.
- If X₁ and X₂ are independent exponentials with rates λ₁ and λ₂, then min(X₁, X₂) is exponential with rate λ₁ + λ₂.

**Example.** A bulb's lifetime is exponential with mean 2 years (λ = 0.5). P(it lasts more than 3 years) = e^(−1.5) ≈ 0.2231, and its median lifetime is ln 2 / 0.5 ≈ 1.386 years, less than the mean, because the distribution is skewed to the right.

## The normal distribution N(μ, σ²)

The bell curve. It describes measurement errors, heights, test scores, and (by the central limit theorem) averages of almost anything.

- pdf f(x) = (1/(σ√(2π))) e^(−(x − μ)²/(2σ²)), symmetric about μ
- **E[X] = μ**, **Var(X) = σ²**; mean = median = mode
- If X ~ N(μ, σ²), then aX + b ~ N(aμ + b, a²σ²).
- Sums of independent normals are normal: X + Y ~ N(μ<sub>X</sub> + μ<sub>Y</sub>, σ²<sub>X</sub> + σ²<sub>Y</sub>).

### Standardising

**Z = (X − μ)/σ** has the **standard normal** distribution N(0, 1). Its cdf is written Φ(z), and tables give Φ(z) for z ≥ 0. By symmetry, **Φ(−z) = 1 − Φ(z)**.

| z | 1.0 | 1.645 | 1.96 | 2.0 | 2.576 | 3.0 |
| --- | --- | --- | --- | --- | --- | --- |
| Φ(z) | 0.8413 | 0.95 | 0.975 | 0.9772 | 0.995 | 0.9987 |

The **68-95-99.7 rule**: about 68% of values lie within 1σ of the mean, 95% within 2σ (more precisely 1.96σ), and 99.7% within 3σ.

**Example.** IQ scores are N(100, 15²). P(IQ > 130) = P(Z > 2) = 1 − 0.9772 = 0.0228, and P(85 < IQ < 115) = P(−1 < Z < 1) ≈ 0.6827.

## The chi-squared distribution χ²(k)

If Z₁, …, Zₖ are independent standard normals, then **Z₁² + … + Zₖ² ~ χ²(k)**, chi-squared with k **degrees of freedom**.

- It takes only non-negative values and is skewed to the right.
- **E = k**, **Var = 2k**.
- It is used for the variance of a normal sample, (n − 1)S²/σ² ~ χ²(n − 1), and for goodness-of-fit and independence tests.

## Student's t distribution t(ν)

If Z ~ N(0, 1) and V ~ χ²(ν) are independent, then **T = Z / √(V/ν) ~ t(ν)**.

- It is symmetric about 0 and bell-shaped, but with **heavier tails** than the normal: extreme values are more likely.
- Mean 0 (for ν > 1) and variance ν/(ν − 2) (for ν > 2), which is greater than 1.
- As ν → ∞, t(ν) approaches N(0, 1).
- It appears when we standardise a sample mean using the **sample** standard deviation instead of the true σ: (X̄ − μ)/(S/√n) ~ t(n − 1) for a normal population.

Critical values used in the next lessons (t<sub>α,ν</sub> has upper-tail area α):

| ν | t<sub>0.05,ν</sub> | t<sub>0.025,ν</sub> | χ²<sub>0.05,ν</sub> |
| --- | --- | --- | --- |
| 1 | 6.314 | 12.706 | 3.841 |
| 4 | 2.132 | 2.776 | 9.488 |
| 9 | 1.833 | 2.262 | 16.919 |
| 15 | 1.753 | 2.131 | 24.996 |
| 24 | 1.711 | 2.064 | 36.415 |
| ∞ (normal) | 1.645 | 1.960 | |

```python
from math import exp, log, sqrt
from statistics import NormalDist
import random

iq = NormalDist(100, 15)
print(f"P(IQ > 130) = {1 - iq.cdf(130):.4f}")
print(f"P(85 < IQ < 115) = {iq.cdf(115) - iq.cdf(85):.4f}")
z = NormalDist()
print(f"z for upper tail 0.05: {z.inv_cdf(0.95):.3f}; for 0.025: {z.inv_cdf(0.975):.3f}")
print(f"exponential, mean 2: P(X > 3) = {exp(-3 / 2):.4f}, median = {log(2) * 2:.3f}")

# Chi-squared by simulation: the sum of 3 squared standard normals has mean 3 and variance 6
random.seed(7)
samples = [sum(random.gauss(0, 1) ** 2 for _ in range(3)) for _ in range(100000)]
m = sum(samples) / len(samples)
v = sum((s - m) ** 2 for s in samples) / len(samples)
print(f"chi-squared(3) by simulation: mean = {m:.2f}, variance = {v:.2f}")
```
```output
P(IQ > 130) = 0.0228
P(85 < IQ < 115) = 0.6827
z for upper tail 0.05: 1.645; for 0.025: 1.960
exponential, mean 2: P(X > 3) = 0.2231, median = 1.386
chi-squared(3) by simulation: mean = 2.99, variance = 5.92
```

## Practice questions

```quiz
q: X is uniformly distributed on [2, 10]. What is P(X > 7)?
answer: 0.375
verify: (10 - 7) / (10 - 2)
explain: P(X > 7) = (10 − 7)/(10 − 2) = 3/8 = 0.375.
```

```quiz
q: The time between arrivals at a server is exponential with mean 4 seconds. What is the probability that the next arrival takes more than 6 seconds? Give the answer to four decimal places.
answer: 0.2231
verify: round(__import__("math").exp(-6 / 4), 4)
explain: λ = 1/4, so P(X > 6) = e^(−6/4) = e^(−1.5) ≈ 0.2231.
```

```quiz
q: A machine has already worked for 10 hours. Its lifetime is exponential with mean 5 hours. What is the probability that it works for at least 5 **more** hours? Give the answer to four decimal places.
answer: 0.3679
verify: round(__import__("math").exp(-1), 4)
explain: By the memoryless property, P(X > 15 | X > 10) = P(X > 5) = e^(−5/5) = e^(−1) ≈ 0.3679. The 10 hours already worked are irrelevant.
```

```quiz
q: Exam scores are normally distributed with mean 60 and standard deviation 10. What fraction of students score above 80? Give the answer to four decimal places.
answer: 0.0228
verify: round(1 - __import__("statistics").NormalDist(60, 10).cdf(80), 4)
explain: Z = (80 − 60)/10 = 2, and P(Z > 2) = 1 − Φ(2) = 1 − 0.9772 = 0.0228.
```

```quiz
q: X ~ N(5, 4) and Y ~ N(3, 9) are independent. What is the variance of X − Y?
answer: 13
verify: 4 + 9
explain: X − Y is normal with mean 5 − 3 = 2 and variance 4 + 9 = 13. Variances add for independent variables, even when subtracting.
```

```quiz
q: What is the variance of a chi-squared random variable with 7 degrees of freedom?
answer: 14
verify: 2 * 7
explain: χ²(k) has mean k and variance 2k = 14.
```

```quiz
q: Which statements about the t distribution are **true**? (Select all that apply.)
* It is symmetric about 0
* It has heavier tails than the standard normal distribution
* It approaches the standard normal distribution as the degrees of freedom increase
- Its variance is smaller than 1
explain: t(ν) is symmetric and bell-shaped with heavier tails; its variance ν/(ν − 2) is greater than 1 and tends to 1 as ν grows, when it becomes the standard normal.
```
