---
title: Limits, Continuity and Differentiation
chapter: Calculus
description: Limits and standard limits, L'Hôpital's rule, continuity and differentiability, Rolle's and the mean value theorem, and finding maxima and minima.
---
## Limits

lim<sub>x→a</sub> f(x) = L means f(x) gets arbitrarily close to L as x approaches a (without needing f(a) to exist). The limit exists only if the **left** and **right** limits are equal.

Standard limits worth memorising:

| Limit | Value |
| --- | --- |
| lim<sub>x→0</sub> (sin x)/x | 1 |
| lim<sub>x→0</sub> (1 − cos x)/x² | 1/2 |
| lim<sub>x→0</sub> (eˣ − 1)/x | 1 |
| lim<sub>x→0</sub> (aˣ − 1)/x | ln a |
| lim<sub>x→0</sub> ln(1 + x)/x | 1 |
| lim<sub>x→0</sub> (1 + x)^(1/x) | e |
| lim<sub>x→∞</sub> (1 + 1/x)ˣ | e |
| lim<sub>x→a</sub> (xⁿ − aⁿ)/(x − a) | n·aⁿ⁻¹ |

**L'Hôpital's rule**: if f(x)/g(x) has the form 0/0 or ∞/∞ at a, then lim f/g = lim f′/g′ (if the latter exists). It can be applied repeatedly. Other indeterminate forms (0 · ∞, ∞ − ∞, 1^∞, 0⁰, ∞⁰) are first rewritten as a quotient, often by taking logarithms.

Example: lim<sub>x→0</sub> (tan x − sin x)/x³. Since tan x − sin x = tan x (1 − cos x), the limit is lim (tan x / x) · ((1 − cos x)/x²) = 1 · 1/2 = **1/2**.

A quick numerical check (evaluating close to the limit point) is a useful sanity test:

```python
import math

def near_zero(f, h=1e-4):
    return f(h)

print(f"sin x / x           -> {near_zero(lambda x: math.sin(x) / x):.6f}")
print(f"(1 - cos x) / x^2   -> {near_zero(lambda x: (1 - math.cos(x)) / x ** 2):.6f}")
print(f"(tan x - sin x)/x^3 -> {near_zero(lambda x: (math.tan(x) - math.sin(x)) / x ** 3, 1e-3):.6f}")
print(f"(1 + x)^(1/x)       -> {near_zero(lambda x: (1 + x) ** (1 / x), 1e-7):.6f}  (e = {math.e:.6f})")
```
```output
sin x / x           -> 1.000000
(1 - cos x) / x^2   -> 0.500000
(tan x - sin x)/x^3 -> 0.500000
(1 + x)^(1/x)       -> 2.718282  (e = 2.718282)
```

## Continuity and differentiability

- f is **continuous** at a if lim<sub>x→a</sub> f(x) = f(a): the limit exists, f(a) exists, and they agree.
- f is **differentiable** at a if f′(a) = lim<sub>h→0</sub> (f(a + h) − f(a))/h exists (left and right derivatives agree).

**Differentiable ⇒ continuous**, but not the other way round: f(x) = |x| is continuous at 0, but its left derivative is −1 and its right derivative is +1, so it is not differentiable there (a corner).

Typical GATE question: for which constants is a piecewise function continuous or differentiable at the join? Equate the two pieces' values (continuity) and their derivatives (differentiability) at that point.

## Mean value theorems

- **Rolle's theorem**: if f is continuous on [a, b], differentiable on (a, b), and f(a) = f(b), then f′(c) = 0 for some c in (a, b).
- **Lagrange's mean value theorem**: under the same conditions without f(a) = f(b), there is a c in (a, b) with **f′(c) = (f(b) − f(a)) / (b − a)**: somewhere the instantaneous slope equals the average slope.

Example: f(x) = x² on [1, 3]: the average slope is (9 − 1)/2 = 4 = 2c, so c = 2.

## Maxima and minima

1. Find the **critical points**: where f′(x) = 0 or f′ does not exist.
2. **Second derivative test**: f″(c) < 0 ⇒ local maximum; f″(c) > 0 ⇒ local minimum; f″(c) = 0 ⇒ inconclusive (use the first-derivative sign change).
3. On a closed interval [a, b], the **absolute** maximum and minimum are among the critical points **and the endpoints**: evaluate f at all of them.

Example: f(x) = x³ − 6x² + 9x + 1. f′(x) = 3x² − 12x + 9 = 3(x − 1)(x − 3), and f″(x) = 6x − 12.

- At x = 1: f″ = −6 < 0, a local maximum, f(1) = 5.
- At x = 3: f″ = 6 > 0, a local minimum, f(3) = 1.
- On [0, 4]: f(0) = 1 and f(4) = 5, so the absolute maximum is 5 (at x = 1 and x = 4) and the absolute minimum is 1 (at x = 0 and x = 3).

For a function of two variables f(x, y): at a point where f<sub>x</sub> = f<sub>y</sub> = 0, let r = f<sub>xx</sub>, s = f<sub>xy</sub>, t = f<sub>yy</sub>. If rt − s² > 0 it is a maximum (r < 0) or minimum (r > 0); if rt − s² < 0 it is a **saddle point**.

## Practice questions

```quiz
q: What is lim<sub>x→0</sub> (1 − cos 2x) / x²?
answer: 2
verify:
  import math
  x = 1e-4
  print(round((1 - math.cos(2 * x)) / x ** 2))
explain: (1 − cos 2x)/x² = 4 · (1 − cos 2x)/(2x)², and (1 − cos u)/u² → 1/2, so the limit is 4 × 1/2 = 2.
```

```quiz
q: What is the maximum value of f(x) = x³ − 3x on the interval [−2, 2]?
answer: 2
verify: max(x ** 3 - 3 * x for x in [-2, -1, 1, 2])
explain: f′(x) = 3x² − 3 = 0 at x = ±1. Candidates: f(−2) = −2, f(−1) = 2, f(1) = −2, f(2) = 2. The maximum is 2 (at x = −1 and x = 2).
```

```quiz
q: By the mean value theorem, f(x) = x³ on [0, 3] has a point c with f′(c) equal to the average slope. What is c? Give the answer to two decimal places.
answer: 1.73
verify: round((27 / 3 / 3) ** 0.5, 2)
explain: The average slope is (27 − 0)/3 = 9, and f′(c) = 3c² = 9 gives c = √3 ≈ 1.73, which lies in (0, 3).
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* Every differentiable function is continuous
- Every continuous function is differentiable
* f(x) = |x| is continuous but not differentiable at x = 0
* lim<sub>x→0</sub> (eˣ − 1)/x = 1
explain: Differentiability implies continuity, not the reverse: |x| has a corner at 0, where the left and right derivatives are −1 and 1. The last limit is the derivative of eˣ at 0.
```
