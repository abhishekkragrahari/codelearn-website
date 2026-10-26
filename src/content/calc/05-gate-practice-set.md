---
title: Calculus and Optimization GATE Practice Set
chapter: GATE Practice
description: Mixed GATE DA style questions on limits, continuity, differentiability, derivatives, Taylor series, maxima and minima, convexity and numerical optimization, with answers and explanations.
---
These questions mix every topic in this track, in the GATE formats **MCQ**, **MSQ** and **NAT**. Each numerical answer is recomputed by a program when the site is built.

## Limits and continuity

```quiz
q: **[Limits]** What is lim<sub>x→0</sub> (sin 5x)/(tan 2x)?
answer: 2.5
verify: round(__import__("math").sin(5e-6) / __import__("math").tan(2e-6), 4)
explain: sin 5x ≈ 5x and tan 2x ≈ 2x near 0, so the limit is 5/2 = 2.5.
```

```quiz
q: **[L'Hôpital]** What is lim<sub>x→0</sub> (x − sin x)/x³? Give the answer to four decimal places.
answer: 0.1667
verify: round(1 / 6, 4)
explain: sin x = x − x³/6 + …, so x − sin x = x³/6 − …, and the limit is 1/6 ≈ 0.1667. (L'Hôpital three times gives cos x / 6 → 1/6.)
```

```quiz
q: **[Limits at infinity]** What is lim<sub>x→∞</sub> (4x³ − x + 2)/(2x³ + 5x²)?
answer: 2
verify: 4 / 2
explain: The degrees are equal, so the limit is the ratio of the leading coefficients: 4/2 = 2.
```

```quiz
q: **[Differentiability]** At which of these points is f(x) = |x² − 4| **not** differentiable? (Select all that apply.)
* x = 2
* x = −2
- x = 0
- x = 4
explain: x² − 4 changes sign at x = ±2 with non-zero slope (±4), so the absolute value creates corners there. At x = 0, f(x) = 4 − x² is smooth (its derivative is 0). At x = 4 it is x² − 4, also smooth.
```

## Derivatives and Taylor series

```quiz
q: **[Chain rule]** f(x) = ln(1 + e^(2x)). What is f′(0)?
answer: 1
verify:
  import math
  f = lambda x: math.log(1 + math.exp(2 * x))
  print(round((f(1e-6) - f(-1e-6)) / 2e-6, 4))
explain: f′(x) = 2e^(2x)/(1 + e^(2x)). At 0: 2 × 1/(1 + 1) = 1.
```

```quiz
q: **[Taylor]** What is the coefficient of x² in the Maclaurin series of f(x) = cos(3x)?
answer: -4.5
verify: -(3 ** 2) / 2
explain: cos u = 1 − u²/2 + …, and with u = 3x the x² term is −9x²/2. The coefficient is −4.5.
```

```quiz
q: **[Taylor]** The Maclaurin series of f is 2 + 3x − x² + 4x³ + …. What is f‴(0)?
answer: 24
verify: 4 * 6
explain: The coefficient of x³ is f‴(0)/3!, so f‴(0) = 4 × 6 = 24.
```

## Maxima, minima and optimization

```quiz
q: **[Extrema]** What is the minimum value of f(x) = x + 4/x for x > 0?
answer: 4
verify: min(x / 1000 + 4 / (x / 1000) for x in range(1, 10001))
explain: f′(x) = 1 − 4/x² = 0 at x = 2, and f″(x) = 8/x³ > 0 there. The minimum is f(2) = 2 + 2 = 4.
```

```quiz
q: **[Global extrema]** What is the absolute maximum of f(x) = 2x³ − 9x² + 12x on [0, 3]?
answer: 9
verify: max(2 * (x / 1000) ** 3 - 9 * (x / 1000) ** 2 + 12 * (x / 1000) for x in range(0, 3001))
explain: f′(x) = 6x² − 18x + 12 = 6(x − 1)(x − 2), so the critical points are 1 and 2. f(0) = 0, f(1) = 5, f(2) = 4, f(3) = 54 − 81 + 36 = 9. The absolute maximum is 9, at the endpoint x = 3.
```

```quiz
q: **[Second derivative test]** f(x) = x³ − 3x² + 4. Which statements are **true**? (Select all that apply.)
* x = 0 is a local maximum
* x = 2 is a local minimum
- f has an inflection point at x = 0
* f has an inflection point at x = 1
explain: f′ = 3x² − 6x = 3x(x − 2) gives critical points 0 and 2. f″ = 6x − 6: f″(0) = −6 (maximum), f″(2) = 6 (minimum). f″ changes sign at x = 1, the inflection point.
```

```quiz
q: **[Gradient descent]** Gradient descent on f(x) = 2x² − 8x with learning rate 0.1 starts at x₀ = 0. What is x₂?
answer: 1.28
verify:
  x = 0
  for _ in range(2):
      x -= 0.1 * (4 * x - 8)
  print(round(x, 6))
explain: f′(x) = 4x − 8. x₁ = 0 − 0.1 × (−8) = 0.8. x₂ = 0.8 − 0.1 × (3.2 − 8) = 0.8 + 0.48 = 1.28. (The minimum is at x = 2.)
```

```quiz
q: **[Newton's method]** Newton's method for the root of g(x) = x² − 5 starts at x₀ = 2. What is x₁?
answer: 2.25
verify: 2 - (2 ** 2 - 5) / (2 * 2)
explain: x₁ = x₀ − g(x₀)/g′(x₀) = 2 − (4 − 5)/4 = 2 + 0.25 = 2.25 (√5 ≈ 2.236).
```
