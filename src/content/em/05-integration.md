---
title: Integration
chapter: Calculus
description: Standard integrals, substitution and integration by parts, properties of definite integrals (symmetry and the a − x trick), areas between curves, and checking answers with Simpson's rule.
---
## Standard integrals

| f(x) | ∫ f(x) dx |
| --- | --- |
| xⁿ (n ≠ −1) | xⁿ⁺¹/(n + 1) |
| 1/x | ln \|x\| |
| eˣ, aˣ | eˣ, aˣ/ln a |
| sin x, cos x | −cos x, sin x |
| sec² x | tan x |
| 1/(1 + x²) | tan⁻¹ x |
| 1/√(1 − x²) | sin⁻¹ x |

(Each plus a constant C.)

## Techniques

- **Substitution**: if the integrand contains g(x) and g′(x), put u = g(x). Example: ∫ 2x eˣ² dx = eˣ² + C.
- **Integration by parts**: ∫ u dv = uv − ∫ v du. Choose u in the order **ILATE** (inverse trigonometric, logarithmic, algebraic, trigonometric, exponential). Example: ∫₀¹ x eˣ dx = [x eˣ]₀¹ − ∫₀¹ eˣ dx = e − (e − 1) = **1**.
- **Partial fractions** for rational functions; trigonometric identities such as sin² x = (1 − cos 2x)/2.

## Properties of definite integrals

| Property | Statement |
| --- | --- |
| Reversing limits | ∫<sub>a</sub><sup>b</sup> f = −∫<sub>b</sub><sup>a</sup> f |
| Splitting | ∫<sub>a</sub><sup>b</sup> f = ∫<sub>a</sub><sup>c</sup> f + ∫<sub>c</sub><sup>b</sup> f |
| **The a − x property** | ∫₀ᵃ f(x) dx = ∫₀ᵃ f(a − x) dx |
| **Odd function** on [−a, a] | ∫₋ₐᵃ f = 0 |
| **Even function** on [−a, a] | ∫₋ₐᵃ f = 2∫₀ᵃ f |
| Periodic with period T | ∫₀ⁿᵀ f = n∫₀ᵀ f |

The a − x property solves integrals that look hard. Let I = ∫₀^(π/2) sin x / (sin x + cos x) dx. Replacing x by π/2 − x swaps sin and cos, so I = ∫₀^(π/2) cos x / (cos x + sin x) dx. Adding the two forms: 2I = ∫₀^(π/2) 1 dx = π/2, so **I = π/4**.

Symmetry: ∫₋₁¹ x³ cos x dx = **0**, because x³ cos x is odd.

## Areas

The area between y = f(x) and y = g(x) from a to b (with f ≥ g) is ∫ₐᵇ (f(x) − g(x)) dx. Between y = x and y = x², which meet at x = 0 and x = 1: ∫₀¹ (x − x²) dx = 1/2 − 1/3 = **1/6**.

When a function changes sign, area and integral differ: ∫₀³ |x − 1| dx splits at x = 1 into 1/2 + 2 = 2.5.

## Checking answers numerically

**Simpson's rule** approximates ∫ₐᵇ f by fitting parabolas through equally spaced points: (h/3)[f(x₀) + 4f(x₁) + 2f(x₂) + 4f(x₃) + … + f(xₙ)] with n even. It is very accurate for smooth functions, and a good way to check a hand computation:

```python
import math

def simpson(f, a, b, n=1000):
    h = (b - a) / n
    total = f(a) + f(b) + sum((4 if i % 2 else 2) * f(a + i * h) for i in range(1, n))
    return total * h / 3

checks = [
    ("x e^x on [0, 1]", lambda x: x * math.exp(x), 0, 1, 1),
    ("sin^2 x on [0, pi/2]", lambda x: math.sin(x) ** 2, 0, math.pi / 2, math.pi / 4),
    ("x sin x on [0, pi]", lambda x: x * math.sin(x), 0, math.pi, math.pi),
    ("sin/(sin+cos) on [0, pi/2]", lambda x: math.sin(x) / (math.sin(x) + math.cos(x)), 0, math.pi / 2, math.pi / 4),
    ("x - x^2 on [0, 1]", lambda x: x - x * x, 0, 1, 1 / 6),
]
for name, f, a, b, exact in checks:
    print(f"{name:28} Simpson {simpson(f, a, b):.6f}   exact {exact:.6f}")
```
```output
x e^x on [0, 1]              Simpson 1.000000   exact 1.000000
sin^2 x on [0, pi/2]         Simpson 0.785398   exact 0.785398
x sin x on [0, pi]           Simpson 3.141593   exact 3.141593
sin/(sin+cos) on [0, pi/2]   Simpson 0.785398   exact 0.785398
x - x^2 on [0, 1]            Simpson 0.166667   exact 0.166667
```

**Trapezoidal rule**: (h/2)[f(x₀) + 2f(x₁) + … + 2f(xₙ₋₁) + f(xₙ)]. Its error is O(h²), compared with O(h⁴) for Simpson's rule; the trapezoidal rule is exact for straight lines, Simpson's rule for polynomials up to degree 3.

## Practice questions

```quiz
q: What is ∫₀^π x sin x dx? Give the answer to two decimal places.
answer: 3.14
verify:
  import math
  n, a, b = 1000, 0, math.pi
  h = (b - a) / n
  f = lambda x: x * math.sin(x)
  print(round((f(a) + f(b) + sum((4 if i % 2 else 2) * f(a + i * h) for i in range(1, n))) * h / 3, 2))
explain: By parts with u = x, dv = sin x dx: [−x cos x]₀^π + ∫₀^π cos x dx = π + 0 = π ≈ 3.14.
```

```quiz
q: What is ∫₋₂² (x⁵ + 3x²) dx?
answer: 16
verify: 2 * (2 ** 3)
explain: x⁵ is odd, so its integral over [−2, 2] is 0. 3x² is even: 2∫₀² 3x² dx = 2[x³]₀² = 16.
```

```quiz
q: What is the area enclosed between y = x² and y = 2x? Give the answer to two decimal places.
answer: 1.33
verify: round((2 ** 2) - (2 ** 3) / 3, 2)
explain: The curves meet at x = 0 and x = 2, and 2x ≥ x² between them: ∫₀² (2x − x²) dx = [x² − x³/3]₀² = 4 − 8/3 = 4/3 ≈ 1.33.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* ∫₋ₐᵃ f(x) dx = 0 when f is odd
* ∫₀ᵃ f(x) dx = ∫₀ᵃ f(a − x) dx
- ∫ₐᵇ f(x) g(x) dx = (∫ₐᵇ f dx)(∫ₐᵇ g dx)
* Simpson's rule is exact for polynomials of degree at most 3
explain: Odd functions cancel over symmetric intervals, and substituting x → a − x maps [0, a] onto itself. The integral of a product is not the product of integrals (try f = g = x on [0, 1]: 1/3 versus 1/4). Simpson's rule happens to integrate cubics exactly.
```
