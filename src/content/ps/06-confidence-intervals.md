---
title: Confidence Intervals
chapter: Statistical Inference
description: Point and interval estimation, confidence intervals for a mean with known variance (z interval) and unknown variance (t interval), intervals for a proportion, the margin of error, choosing the sample size, and how to interpret a confidence level, for GATE DA.
---
A single number such as X̄ = 52 is a **point estimate** of μ. It is almost certainly not exactly right. A **confidence interval** gives a range of plausible values together with a measure of how much we trust it.

## The idea

A **100(1 − α)% confidence interval** for a parameter θ is an interval computed from the sample by a procedure that captures the true θ in 100(1 − α)% of samples. For a 95% interval, α = 0.05.

Interpretation, which GATE likes to test: the parameter is fixed and the **interval is random**. "95% confidence" means that if we repeated the sampling many times, about 95% of the intervals built this way would contain μ. It does **not** mean that there is a 95% probability that μ lies in the particular interval we computed: that interval either contains μ or it does not.

## Mean with known σ: the z interval

If the population is normal, or n is large (by the CLT), and σ is known:

**X̄ ± z<sub>α/2</sub> · σ/√n**

where z<sub>α/2</sub> is the value with upper-tail area α/2 under N(0, 1):

| Confidence | 90% | 95% | 99% |
| --- | --- | --- | --- |
| z<sub>α/2</sub> | 1.645 | 1.960 | 2.576 |

The term **E = z<sub>α/2</sub> σ/√n** is the **margin of error**; the interval's width is 2E.

**Example.** n = 36, X̄ = 52, σ = 6. The standard error is 6/6 = 1, so the 95% interval is 52 ± 1.96 × 1 = **(50.04, 53.96)**.

What makes an interval wider?

- **higher confidence** (larger z): a 99% interval is wider than a 95% one;
- **more variability** (larger σ);
- **smaller samples** (the width shrinks like 1/√n).

## Mean with unknown σ: the t interval

Usually σ is unknown and is replaced by the sample standard deviation S. That adds uncertainty, so the normal value z is replaced by a value from the **t distribution with n − 1 degrees of freedom** (for a normal population):

**X̄ ± t<sub>α/2, n−1</sub> · S/√n**

**Example.** n = 10, X̄ = 20, S = 3. For 95% confidence, t<sub>0.025, 9</sub> = 2.262, so the interval is 20 ± 2.262 × 3/√10 = 20 ± 2.146 = **(17.854, 22.146)**. With z = 1.96 it would have been narrower, 20 ± 1.859, but too optimistic.

For large n, t<sub>α/2, n−1</sub> is close to z<sub>α/2</sub>, and the two intervals agree.

## Proportion

To estimate a population proportion p from x successes in n trials, use p̂ = x/n. For large n, p̂ is approximately normal with standard error √(p(1 − p)/n), so an approximate interval is

**p̂ ± z<sub>α/2</sub> √(p̂(1 − p̂)/n)**

**Example.** In a survey of 400 people, 240 prefer product A. p̂ = 0.6, and the 95% interval is 0.6 ± 1.96 × √(0.6 × 0.4/400) = 0.6 ± 1.96 × 0.0245 = 0.6 ± 0.048, i.e. about **(0.552, 0.648)**.

## Choosing the sample size

To get a margin of error at most E with known σ, solve E = z<sub>α/2</sub> σ/√n for n:

**n = (z<sub>α/2</sub> σ / E)²**, rounded **up**.

**Example.** With σ = 10, how many observations give a 95% margin of error of 2? n = (1.96 × 10/2)² = 96.04, so **97** observations.

For a proportion with no prior guess, use p = 0.5 (the worst case): n = z² × 0.25 / E². For E = 0.03 at 95%, n = 1.96² × 0.25/0.0009 ≈ 1067.1, so 1068.

```python
import random
from math import sqrt, ceil
from statistics import NormalDist, mean, stdev

z = NormalDist().inv_cdf(0.975)
print(f"z interval: 52 +/- {z * 6 / sqrt(36):.3f} -> ({52 - z:.2f}, {52 + z:.2f})")
t9 = 2.262
half = t9 * 3 / sqrt(10)
print(f"t interval: 20 +/- {half:.3f} -> ({20 - half:.3f}, {20 + half:.3f})")
p = 240 / 400
e = z * sqrt(p * (1 - p) / 400)
print(f"proportion: {p} +/- {e:.4f} -> ({p - e:.3f}, {p + e:.3f})")
print("sample size for E = 2, sigma = 10:", ceil((1.96 * 10 / 2) ** 2))

# What "95% confidence" means: about 95% of intervals contain the true mean.
random.seed(11)
mu, sigma, n, hits, reps = 50, 8, 25, 0, 10000
for _ in range(reps):
    xbar = mean(random.gauss(mu, sigma) for _ in range(n))
    if abs(xbar - mu) <= z * sigma / sqrt(n):
        hits += 1
print(f"{hits} of {reps} intervals contain the true mean ({hits / reps:.1%})")
```
```output
z interval: 52 +/- 1.960 -> (50.04, 53.96)
t interval: 20 +/- 2.146 -> (17.854, 22.146)
proportion: 0.6 +/- 0.0480 -> (0.552, 0.648)
sample size for E = 2, sigma = 10: 97
9476 of 10000 intervals contain the true mean (94.8%)
```

## Practice questions

```quiz
q: A sample of 64 observations has mean 80, and the population standard deviation is known to be 16. What is the upper limit of the 95% confidence interval for μ? (Use z = 1.96.)
answer: 83.92
verify: round(80 + 1.96 * 16 / 64 ** 0.5, 2)
explain: SE = 16/8 = 2. The interval is 80 ± 1.96 × 2 = 80 ± 3.92, so the upper limit is 83.92.
```

```quiz
q: A sample of 16 observations from a normal population has mean 50 and sample standard deviation 8. What is the width of the 95% confidence interval for μ? (Use t<sub>0.025,15</sub> = 2.131.)
answer: 8.524
verify: round(2 * 2.131 * 8 / 16 ** 0.5, 3)
explain: The margin of error is 2.131 × 8/√16 = 2.131 × 2 = 4.262, so the width is 2 × 4.262 = 8.524.
```

```quiz
q: The population standard deviation is 15. What is the smallest sample size that gives a 99% confidence interval with margin of error at most 3? (Use z = 2.576.)
answer: 166
verify: __import__("math").ceil((2.576 * 15 / 3) ** 2)
explain: n = (2.576 × 15/3)² = 12.88² ≈ 165.89, rounded up to 166.
```

```quiz
q: The margin of error of a confidence interval for a mean is 4 with a sample of 100. If the sample size is increased to 400 (everything else the same), what is the new margin of error?
answer: 2
verify: 4 * (100 / 400) ** 0.5
explain: The margin of error is proportional to 1/√n. Multiplying n by 4 divides it by √4 = 2: 4/2 = 2.
```

```quiz
q: A 95% confidence interval for μ is (12.4, 15.6). Which interpretation is correct?
- There is a 95% probability that μ lies between 12.4 and 15.6
- 95% of the observations lie between 12.4 and 15.6
* If the sampling were repeated many times, about 95% of the intervals built this way would contain μ
- μ = 14 with probability 0.95
explain: The confidence level describes the procedure, not this particular interval: μ is fixed, and the interval either contains it or not. The interval is about the mean, not about individual observations.
```

```quiz
q: Which changes make a confidence interval for a mean **narrower**? (Select all that apply.)
* Increasing the sample size
- Increasing the confidence level from 95% to 99%
* Decreasing the confidence level from 95% to 90%
- Using a population with a larger standard deviation
explain: The half-width is z<sub>α/2</sub> σ/√n. A larger n or a smaller z (lower confidence) narrows it; a larger σ or a higher confidence level widens it.
```
