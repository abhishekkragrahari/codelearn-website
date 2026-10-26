---
title: Hypothesis Testing - z, t and Chi-Squared Tests
chapter: Statistical Inference
description: Null and alternative hypotheses, test statistics, critical regions and p-values, type I and type II errors and power, the z-test, the one-sample t-test, and the chi-squared goodness-of-fit and independence tests, with worked GATE DA examples.
---
A **hypothesis test** decides whether data provides enough evidence against a default claim. Did the new drug lower blood pressure, or is the difference just chance? Is this die fair?

## The framework

1. State the **null hypothesis H₀**, the default "no effect" claim (μ = 100, the die is fair), and the **alternative H₁** (μ ≠ 100, μ > 100, the die is not fair).
2. Choose the **significance level α**, the risk of wrongly rejecting H₀ that we accept, usually 0.05.
3. Compute a **test statistic** from the data, whose distribution is known **when H₀ is true**.
4. Decide: **reject H₀** if the statistic falls in the **critical region** (values unlikely under H₀), or equivalently if the **p-value** is at most α. Otherwise, **fail to reject H₀**.

"Fail to reject" is not the same as "accept": the data may simply be too limited to detect an effect.

### One-tailed and two-tailed tests

- **Two-tailed** (H₁: μ ≠ μ₀): reject when the statistic is far out in **either** tail. At α = 0.05 with a z statistic, reject when |z| > 1.96.
- **Right-tailed** (H₁: μ > μ₀): reject when z > 1.645 at α = 0.05.
- **Left-tailed** (H₁: μ < μ₀): reject when z < −1.645.

### The p-value

The **p-value** is the probability, **assuming H₀ is true**, of getting a test statistic at least as extreme as the one observed. A small p-value means the data would be surprising if H₀ were true. It is **not** the probability that H₀ is true.

For a two-tailed z-test, p = 2(1 − Φ(|z|)); for a right-tailed test, p = 1 − Φ(z).

### Errors and power

| | H₀ true | H₀ false |
| --- | --- | --- |
| **Reject H₀** | **Type I error** (false alarm), probability α | Correct, probability 1 − β = **power** |
| **Fail to reject H₀** | Correct, probability 1 − α | **Type II error** (missed effect), probability β |

For a fixed sample size, lowering α (being stricter about false alarms) raises β. Larger samples raise the power without changing α.

## The z-test for a mean (σ known)

**z = (X̄ − μ₀) / (σ/√n)**, which is N(0, 1) under H₀ (exactly for a normal population, approximately for large n).

**Example.** A machine is supposed to fill bottles with μ = 500 ml, with known σ = 40 ml. A sample of 64 bottles has X̄ = 510 ml. Is the machine off at α = 0.05?

- H₀: μ = 500, H₁: μ ≠ 500 (two-tailed).
- z = (510 − 500)/(40/8) = 10/5 = **2**.
- |z| = 2 > 1.96, so **reject H₀**. The p-value is 2(1 − Φ(2)) ≈ **0.0455** < 0.05.

At α = 0.01 (critical value 2.576) we would **not** reject: the conclusion depends on α.

**Proportions** use the same idea: to test H₀: p = p₀, use z = (p̂ − p₀)/√(p₀(1 − p₀)/n). For 60 heads in 100 tosses against p₀ = 0.5, z = 0.1/0.05 = 2.

## The one-sample t-test (σ unknown)

**t = (X̄ − μ₀) / (S/√n)**, which has the t distribution with **n − 1** degrees of freedom under H₀ (normal population).

**Example.** A tutor claims her students score more than 100 on average. A sample of 16 students has X̄ = 103 and S = 8. Test at α = 0.05.

- H₀: μ = 100, H₁: μ > 100 (right-tailed).
- t = (103 − 100)/(8/4) = **1.5**, with 15 degrees of freedom.
- The critical value t<sub>0.05, 15</sub> = 1.753. Since 1.5 < 1.753, **fail to reject H₀**: the data does not support the claim at the 5% level.

**Two-sample** and **paired** t-tests compare two means in the same way. For paired data (the same subjects before and after), take the differences and run a one-sample t-test on them.

## Chi-squared tests

Chi-squared tests compare **observed counts** O with the **expected counts** E predicted by H₀:

**χ² = Σ (O − E)² / E**

Large values mean the data and H₀ disagree, so these tests are **right-tailed**. The expected count in every cell should be at least about 5 for the approximation to work.

### Goodness of fit

Does a single categorical variable follow a claimed distribution? With k categories, the degrees of freedom are **k − 1** (minus one more for each parameter estimated from the data).

**Example.** A die is rolled 60 times, giving counts 8, 12, 9, 11, 6, 14 for faces 1 to 6. Is it fair? Under H₀ each face is expected 10 times:

χ² = (4 + 4 + 1 + 1 + 16 + 16)/10 = **4.2**, with 6 − 1 = 5 degrees of freedom.

The critical value χ²<sub>0.05, 5</sub> = 11.070. Since 4.2 < 11.070, **fail to reject**: the counts are consistent with a fair die.

### Independence (contingency tables)

Are two categorical variables independent? For a table with r rows and c columns, the expected count in each cell is

**E = (row total × column total) / grand total**

and the degrees of freedom are **(r − 1)(c − 1)**.

**Example.** 100 people, classified by gender and preference:

| | Tea | Coffee | Total |
| --- | --- | --- | --- |
| Men | 30 | 20 | 50 |
| Women | 20 | 30 | 50 |
| Total | 50 | 50 | 100 |

Every expected count is 50 × 50/100 = 25, so χ² = 4 × (5²/25) = **4**, with (2 − 1)(2 − 1) = 1 degree of freedom. The critical value χ²<sub>0.05, 1</sub> = 3.841, and 4 > 3.841, so **reject independence** at the 5% level.

```python
from math import sqrt
from statistics import NormalDist

Z = NormalDist()
z = (510 - 500) / (40 / sqrt(64))
print(f"z-test: z = {z:.2f}, two-tailed p-value = {2 * (1 - Z.cdf(abs(z))):.4f}")

t = (103 - 100) / (8 / sqrt(16))
print(f"t-test: t = {t:.2f}, critical value t(0.05, 15) = 1.753 -> {'reject' if t > 1.753 else 'fail to reject'} H0")

obs = [8, 12, 9, 11, 6, 14]
chi = sum((o - 10) ** 2 / 10 for o in obs)
print(f"goodness of fit: chi-squared = {chi:.2f}, critical 11.070 -> {'reject' if chi > 11.070 else 'fail to reject'} H0")

table = [[30, 20], [20, 30]]
rows = [sum(r) for r in table]
cols = [sum(c) for c in zip(*table)]
total = sum(rows)
chi = sum((table[i][j] - rows[i] * cols[j] / total) ** 2 / (rows[i] * cols[j] / total)
          for i in range(2) for j in range(2))
print(f"independence: chi-squared = {chi:.2f}, critical 3.841 -> {'reject' if chi > 3.841 else 'fail to reject'} H0")
```
```output
z-test: z = 2.00, two-tailed p-value = 0.0455
t-test: t = 1.50, critical value t(0.05, 15) = 1.753 -> fail to reject H0
goodness of fit: chi-squared = 4.20, critical 11.070 -> fail to reject H0
independence: chi-squared = 4.00, critical 3.841 -> reject H0
```

## Which test?

| Question | Test | Statistic | Distribution under H₀ |
| --- | --- | --- | --- |
| Mean, σ known (or n large) | z-test | (X̄ − μ₀)/(σ/√n) | N(0, 1) |
| Mean, σ unknown, normal data | t-test | (X̄ − μ₀)/(S/√n) | t(n − 1) |
| Proportion, n large | z-test | (p̂ − p₀)/√(p₀(1 − p₀)/n) | N(0, 1) |
| Counts fit a distribution? | χ² goodness of fit | Σ (O − E)²/E | χ²(k − 1) |
| Two categorical variables independent? | χ² independence | Σ (O − E)²/E | χ²((r − 1)(c − 1)) |

## Practice questions

```quiz
q: A z-test gives z = 2.33 for a right-tailed alternative. What is the p-value? Give the answer to four decimal places.
answer: 0.0099
verify: round(1 - __import__("statistics").NormalDist().cdf(2.33), 4)
explain: For a right-tailed test, p = 1 − Φ(2.33) ≈ 1 − 0.9901 = 0.0099.
```

```quiz
q: Bulbs are claimed to last μ = 1000 hours, with known σ = 100. A sample of 25 bulbs has mean 960 hours. What is the value of the z statistic for H₀: μ = 1000?
answer: -2
verify: (960 - 1000) / (100 / 25 ** 0.5)
explain: z = (960 − 1000)/(100/5) = −40/20 = −2.
```

```quiz
q: A sample of 9 observations from a normal population has mean 12 and sample standard deviation 3. What is the t statistic for H₀: μ = 10?
answer: 2
verify: (12 - 10) / (3 / 9 ** 0.5)
explain: t = (12 − 10)/(3/√9) = 2/1 = 2, with 8 degrees of freedom.
```

```quiz
q: A coin is tossed 200 times and shows 120 heads. What is the chi-squared goodness-of-fit statistic for H₀: the coin is fair?
answer: 8
verify: ((120 - 100) ** 2 + (80 - 100) ** 2) / 100
explain: Expected counts are 100 heads and 100 tails. χ² = (120 − 100)²/100 + (80 − 100)²/100 = 4 + 4 = 8, with 1 degree of freedom, well above 3.841: the coin looks biased.
```

```quiz
q: A contingency table has 4 rows and 3 columns. How many degrees of freedom does the chi-squared test of independence have?
answer: 6
verify: (4 - 1) * (3 - 1)
explain: (r − 1)(c − 1) = 3 × 2 = 6.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* The probability of a type I error equals the significance level α
* For a fixed sample size, lowering α increases the probability of a type II error
- The p-value is the probability that the null hypothesis is true
- Failing to reject H₀ proves that H₀ is true
explain: α is the probability of rejecting a true H₀. Being stricter about false alarms makes it harder to detect real effects. The p-value is computed assuming H₀ is true; it is not P(H₀). Failing to reject only means the evidence was insufficient.
```

```quiz
q: A two-tailed z-test at α = 0.05 gives z = −2.1. What is the correct decision?
* Reject H₀, because |z| > 1.96
- Fail to reject H₀, because z is negative
- Reject H₀, because z < 1.645
- Fail to reject H₀, because |z| < 2.576
explain: For a two-tailed test at 5%, reject when |z| > 1.96. |−2.1| = 2.1 > 1.96, so H₀ is rejected (p ≈ 0.036). The 2.576 cut-off is for α = 0.01.
```
