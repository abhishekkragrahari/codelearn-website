---
title: Random Variables, Expectation and Variance
chapter: Random Variables
description: Discrete and continuous random variables, pmf, pdf and cdf, expectation and variance and their rules, joint and marginal distributions, covariance and correlation, independence, and conditional expectation, for GATE DA.
---
A **random variable** X is a function that assigns a number to each outcome of an experiment: the sum of two dice, the number of defective items in a batch, the time until a server fails.

## Discrete random variables

A discrete random variable takes countably many values. Its **probability mass function** (pmf) is p(x) = P(X = x), with p(x) ≥ 0 and Σ p(x) = 1.

**Example.** Let X be the number of heads in 3 tosses of a fair coin. The 8 outcomes are equally likely:

| x | 0 | 1 | 2 | 3 |
| --- | --- | --- | --- | --- |
| p(x) | 1/8 | 3/8 | 3/8 | 1/8 |

## Continuous random variables

A continuous random variable has a **probability density function** (pdf) f(x) ≥ 0 with ∫ f(x) dx = 1 over the whole line, and

P(a ≤ X ≤ b) = ∫ₐᵇ f(x) dx.

A single value has probability 0: P(X = a) = 0. So P(a ≤ X ≤ b) = P(a < X < b). A density can be larger than 1 (only its integral must be 1).

**Example.** f(x) = 2x on [0, 1] (and 0 elsewhere) is a valid pdf: ∫₀¹ 2x dx = 1. Then P(X ≤ 0.5) = ∫₀^0.5 2x dx = 0.25.

## The cumulative distribution function

The **cdf** F(x) = P(X ≤ x) works for both kinds. It is non-decreasing, goes from 0 at −∞ to 1 at +∞, and is right-continuous.

- P(a < X ≤ b) = F(b) − F(a).
- For a continuous X, f(x) = F′(x) and F(x) = ∫ from −∞ to x of f(t) dt.
- For the example above, F(x) = x² on [0, 1].

The **median** m satisfies F(m) = 0.5; for f(x) = 2x, m² = 0.5 so m = 1/√2 ≈ 0.707.

## Expectation

The **expected value** (mean) is the probability-weighted average:

- discrete: **E[X] = Σ x p(x)**;
- continuous: **E[X] = ∫ x f(x) dx**.

More generally, E[g(X)] = Σ g(x) p(x) or ∫ g(x) f(x) dx (the "law of the unconscious statistician").

Rules (they hold whether or not the variables are independent):

- **E[aX + b] = a E[X] + b**
- **E[X + Y] = E[X] + E[Y]** (linearity of expectation)

For the 3 coin tosses: E[X] = 0 · 1/8 + 1 · 3/8 + 2 · 3/8 + 3 · 1/8 = 12/8 = 1.5. For f(x) = 2x on [0, 1]: E[X] = ∫₀¹ x · 2x dx = 2/3.

**Indicator trick.** Linearity makes many expectations easy. The expected number of fixed points of a random permutation of n items is n × (1/n) = 1, whatever n is: item i is a fixed point with probability 1/n, and we add these up, even though the events are dependent.

## Variance and standard deviation

**Var(X) = E[(X − μ)²] = E[X²] − (E[X])²**, where μ = E[X]. The **standard deviation** is σ = √Var(X).

- **Var(aX + b) = a² Var(X)**: shifting does not change spread; scaling by a multiplies it by a².
- **Var(X + Y) = Var(X) + Var(Y) + 2 Cov(X, Y)**, which equals Var(X) + Var(Y) when X and Y are uncorrelated (in particular, independent).
- Var(X − Y) = Var(X) + Var(Y) − 2 Cov(X, Y). Variances of independent variables **add even when you subtract** the variables.

For the 3 coin tosses: E[X²] = (0 + 3 + 12 + 9)/8 = 3, so Var(X) = 3 − 1.5² = 0.75. For f(x) = 2x: E[X²] = ∫₀¹ 2x³ dx = 1/2, so Var(X) = 1/2 − 4/9 = 1/18.

## Joint distributions, covariance and correlation

Two discrete random variables have a **joint pmf** p(x, y) = P(X = x, Y = y). The **marginal** pmfs come from summing: p<sub>X</sub>(x) = Σᵧ p(x, y). X and Y are **independent** if p(x, y) = p<sub>X</sub>(x) p<sub>Y</sub>(y) for **every** x and y. For continuous variables, the same holds with densities and integrals.

- **Covariance**: Cov(X, Y) = E[(X − μ<sub>X</sub>)(Y − μ<sub>Y</sub>)] = **E[XY] − E[X]E[Y]**. Cov(X, X) = Var(X), and Cov(aX + b, cY + d) = ac Cov(X, Y).
- **Correlation**: ρ(X, Y) = Cov(X, Y) / (σ<sub>X</sub> σ<sub>Y</sub>), always between −1 and 1. ρ = ±1 exactly when Y = aX + b with a ≠ 0 (a perfect linear relationship).
- If X and Y are independent, E[XY] = E[X]E[Y], so Cov(X, Y) = 0. **The converse is false**: X uniform on {−1, 0, 1} and Y = X² have Cov(X, Y) = E[X³] − E[X]E[X²] = 0, yet Y is completely determined by X.

**Example.** Joint pmf of X and Y:

| | Y = 0 | Y = 1 |
| --- | --- | --- |
| **X = 0** | 0.2 | 0.1 |
| **X = 1** | 0.3 | 0.4 |

E[X] = 0.7, E[Y] = 0.5, E[XY] = 0.4, so Cov(X, Y) = 0.4 − 0.35 = 0.05. They are not independent: P(X = 0, Y = 0) = 0.2, but P(X = 0) P(Y = 0) = 0.3 × 0.5 = 0.15.

## Conditional distributions and conditional expectation

The **conditional pmf** of X given Y = y is p(x | y) = p(x, y) / p<sub>Y</sub>(y), and the **conditional expectation** is E[X | Y = y] = Σ x p(x | y). In the table, E[X | Y = 1] = 1 × 0.4/0.5 = 0.8.

The **law of total expectation**: **E[X] = E[ E[X | Y] ]** = Σᵧ E[X | Y = y] P(Y = y). Here E[X | Y = 0] = 0.3/0.5 = 0.6, and 0.6 × 0.5 + 0.8 × 0.5 = 0.7 = E[X].

```python
from fractions import Fraction as F
from itertools import product

# Number of heads in 3 fair coin tosses
pmf = {}
for t in product([0, 1], repeat=3):
    pmf[sum(t)] = pmf.get(sum(t), 0) + F(1, 8)
EX = sum(x * p for x, p in pmf.items())
EX2 = sum(x * x * p for x, p in pmf.items())
print("pmf:", {x: str(p) for x, p in sorted(pmf.items())})
print("E[X] =", EX, " Var(X) =", EX2 - EX ** 2)

# The joint table from the lesson
joint = {(0, 0): F(2, 10), (0, 1): F(1, 10), (1, 0): F(3, 10), (1, 1): F(4, 10)}
E = lambda g: sum(g(x, y) * p for (x, y), p in joint.items())
ex, ey = E(lambda x, y: x), E(lambda x, y: y)
cov = E(lambda x, y: x * y) - ex * ey
vx, vy = E(lambda x, y: x * x) - ex ** 2, E(lambda x, y: y * y) - ey ** 2
print("E[X] =", ex, " E[Y] =", ey, " Cov(X, Y) =", cov)
print(f"correlation = {float(cov) / (float(vx) * float(vy)) ** 0.5:.4f}")

# Uncorrelated but dependent: X uniform on {-1, 0, 1}, Y = X^2
xs = [-1, 0, 1]
print("Cov(X, X^2) =", sum(F(x ** 3, 3) for x in xs) - sum(F(x, 3) for x in xs) * sum(F(x * x, 3) for x in xs))
```
```output
pmf: {0: '1/8', 1: '3/8', 2: '3/8', 3: '1/8'}
E[X] = 3/2  Var(X) = 3/4
E[X] = 7/10  E[Y] = 1/2  Cov(X, Y) = 1/20
correlation = 0.2182
Cov(X, X^2) = 0
```

## Practice questions

```quiz
q: A random variable X takes the values 1, 2 and 4 with probabilities 0.5, 0.3 and 0.2. What is Var(X)?
answer: 1.29
verify:
  xs, ps = [1, 2, 4], [0.5, 0.3, 0.2]
  m = sum(x * p for x, p in zip(xs, ps))
  print(round(sum(x * x * p for x, p in zip(xs, ps)) - m * m, 4))
explain: E[X] = 0.5 + 0.6 + 0.8 = 1.9. E[X²] = 0.5 + 1.2 + 3.2 = 4.9. Var(X) = 4.9 − 1.9² = 4.9 − 3.61 = 1.29.
```

```quiz
q: X has pdf f(x) = kx² on [0, 3] and 0 elsewhere. What is k?
answer: 0.1111
verify: round(1 / 9, 4)
explain: ∫₀³ kx² dx = k × 27/3 = 9k must equal 1, so k = 1/9 ≈ 0.1111.
```

```quiz
q: Var(X) = 4 and Var(Y) = 9, and X and Y are independent. What is Var(2X − Y + 5)?
answer: 25
verify: 2 ** 2 * 4 + 9
explain: Var(2X − Y + 5) = 2² Var(X) + (−1)² Var(Y) = 16 + 9 = 25. The constant does not matter, and the variances add even though Y is subtracted.
```

```quiz
q: E[X] = 2, E[Y] = 3, E[XY] = 8, Var(X) = 1 and Var(Y) = 4. What is the correlation coefficient ρ(X, Y)?
answer: 1
verify: (8 - 2 * 3) / (1 * 4) ** 0.5
explain: Cov(X, Y) = 8 − 6 = 2. ρ = 2 / (1 × 2) = 1, a perfect positive linear relationship.
```

```quiz
q: Ten people put their hats in a pile and each picks one at random. What is the expected number of people who get their own hat back?
answer: 1
verify:
  from fractions import Fraction as F
  print(10 * F(1, 10))
explain: Person i gets their own hat with probability 1/10. By linearity of expectation, the expected number is 10 × 1/10 = 1, even though the events are not independent.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* If X and Y are independent, then Cov(X, Y) = 0
- If Cov(X, Y) = 0, then X and Y are independent
* E[X + Y] = E[X] + E[Y] even when X and Y are dependent
- Var(X + Y) = Var(X) + Var(Y) for all random variables X and Y
explain: Independence gives E[XY] = E[X]E[Y], so the covariance is 0, but zero covariance does not imply independence (Y = X² with X symmetric). Linearity of expectation always holds. Variances add only when the covariance is 0.
```
