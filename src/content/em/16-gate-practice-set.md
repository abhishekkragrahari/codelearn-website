---
title: Engineering Mathematics GATE Practice Set
chapter: GATE Practice
description: Mixed GATE-style questions on matrices, linear systems, eigenvalues, limits, maxima, integration, probability, distributions and statistics.
---
These questions mix every lesson of the Engineering Mathematics track, in the three GATE formats. Every numerical answer is recomputed by a program when the site is built. Round only at the end, to the number of decimal places asked for.

## Linear algebra

```quiz
q: **[Determinant]** For which value of k is the matrix [[1, 2, 3], [0, k, 4], [2, 1, 5]] singular?
answer: 12
verify: next(k for k in range(-50, 51) if 1 * (5 * k - 4) - 2 * (0 - 8) + 3 * (0 - 2 * k) == 0)
explain: Expanding along the first row: 1(5k − 4) − 2(0 − 8) + 3(0 − 2k) = 5k − 4 + 16 − 6k = 12 − k. It is 0 when k = 12.
```

```quiz
q: **[Eigenvalues]** A = [[2, 1], [1, 2]]. What is the sum of the eigenvalues of A³?
answer: 28
verify: 1 ** 3 + 3 ** 3
explain: A has trace 4 and determinant 3, so its eigenvalues are 1 and 3. A³ has eigenvalues 1³ = 1 and 3³ = 27, summing to 28 (which is also the trace of A³).
```

```quiz
q: **[Linear systems]** A 4 × 4 system Ax = b has det(A) = 0 and is consistent. How many solutions does it have?
- Exactly one
- None
* Infinitely many
- Exactly four
explain: det(A) = 0 means rank(A) < 4. A consistent system with rank below the number of unknowns has free variables, hence infinitely many solutions.
```

## Calculus

```quiz
q: **[Limits]** What is lim<sub>x→0</sub> (e^(3x) − 1 − 3x) / x²?
answer: 4.5
verify:
  import math
  x = 1e-4
  print(round((math.exp(3 * x) - 1 - 3 * x) / x ** 2, 3))
explain: e^(3x) = 1 + 3x + 9x²/2 + …, so the numerator is 9x²/2 + higher terms and the limit is 9/2 = 4.5. (L'Hôpital twice gives 9e^(3x)/2 → 9/2.)
```

```quiz
q: **[Maxima]** What is the maximum value of f(x) = x e^(−x) for x ≥ 0? Give the answer to two decimal places.
answer: 0.37
verify: round(1 / __import__("math").e, 2)
explain: f′(x) = e^(−x)(1 − x) = 0 at x = 1, where f″(1) = −e⁻¹ < 0. The maximum is f(1) = 1/e ≈ 0.37.
```

```quiz
q: **[Integration]** What is ∫₀¹ x² eˣ dx? Give the answer to three decimal places.
answer: 0.718
verify:
  import math
  n = 1000
  h = 1 / n
  f = lambda t: t * t * math.exp(t)
  print(round((f(0) + f(1) + sum((4 if i % 2 else 2) * f(i * h) for i in range(1, n))) * h / 3, 3))
explain: By parts twice: ∫ x²eˣ dx = eˣ(x² − 2x + 2). From 0 to 1: e(1 − 2 + 2) − 2 = e − 2 ≈ 0.718.
```

## Probability and statistics

```quiz
q: **[Probability]** Two cards are drawn without replacement from a standard deck. What is the probability that both are hearts? Give the answer to four decimal places.
answer: 0.0588
verify: round(13 / 52 * 12 / 51, 4)
explain: 13/52 × 12/51 = 1/4 × 4/17 = 1/17 ≈ 0.0588.
```

```quiz
q: **[Bayes]** Machines M1, M2 and M3 make 50%, 30% and 20% of a factory's output, with defect rates 1%, 2% and 3%. A randomly chosen item is defective. What is the probability that M3 made it? Give the answer to four decimal places.
answer: 0.3529
verify: round(0.2 * 0.03 / (0.5 * 0.01 + 0.3 * 0.02 + 0.2 * 0.03), 4)
explain: P(defective) = 0.005 + 0.006 + 0.006 = 0.017. P(M3 | defective) = 0.006 / 0.017 ≈ 0.3529.
```

```quiz
q: **[Poisson]** Calls arrive at an average rate of 2 per minute (Poisson). What is the probability of exactly one call in a given minute? Give the answer to four decimal places.
answer: 0.2707
verify: round(2 * __import__("math").exp(-2), 4)
explain: P(X = 1) = e⁻² × 2¹ / 1! = 2e⁻² ≈ 0.2707.
```

```quiz
q: **[Exponential]** The lifetime of a component is exponentially distributed with mean 4 years. What is the probability that it lasts more than 4 years? Give the answer to four decimal places.
answer: 0.3679
verify: round(__import__("math").exp(-1), 4)
explain: λ = 1/4, so P(X > 4) = e^(−4/4) = e⁻¹ ≈ 0.3679, whatever the component's age so far (memorylessness).
```

```quiz
q: **[Expectation]** What is the variance of the number shown by a fair six-sided die? Give the answer to two decimal places.
answer: 2.92
verify: round(sum(i * i for i in range(1, 7)) / 6 - 3.5 ** 2, 2)
explain: E[X] = 3.5 and E[X²] = 91/6, so Var(X) = 91/6 − 12.25 = 35/12 ≈ 2.92.
```

```quiz
q: **[Statistics]** One class of 20 students has a mean score of 50 and another class of 30 students has a mean of 60. What is the mean score of all 50 students?
answer: 56
verify: (20 * 50 + 30 * 60) / 50
explain: The combined mean weights each class by its size: (20 × 50 + 30 × 60) / 50 = 2800 / 50 = 56.
```
