---
title: Laplace Transforms
chapter: Differential Equations
description: The Laplace transform and its table, linearity, shifting, derivatives and integrals, the convolution theorem, initial and final value theorems, inverse transforms by partial fractions, and solving differential equations, with solved GATE examples.
---
The **Laplace transform** turns a function of time into a function of a complex variable s:

**F(s) = L{f(t)} = ∫₀^∞ e<sup>−st</sup> f(t) dt**

It turns differential equations into algebraic ones, which is why it is the main tool for circuits and control systems.

## Table of transforms

| f(t) | F(s) |
| --- | --- |
| 1 (unit step) | 1/s |
| tⁿ | n!/sⁿ⁺¹ |
| e<sup>at</sup> | 1/(s − a) |
| sin ωt | ω/(s² + ω²) |
| cos ωt | s/(s² + ω²) |
| sinh at | a/(s² − a²) |
| cosh at | s/(s² − a²) |
| δ(t) (impulse) | 1 |
| u(t − a) | e<sup>−as</sup>/s |

## Properties

- **Linearity**: L{af + bg} = aF + bG.
- **First shifting** (frequency shift): L{e<sup>at</sup>f(t)} = F(s − a). So L{e<sup>−2t</sup> sin 3t} = 3/((s + 2)² + 9).
- **Second shifting** (time shift): L{f(t − a)u(t − a)} = e<sup>−as</sup>F(s).
- **Derivatives**: L{f′} = sF(s) − f(0); L{f″} = s²F(s) − sf(0) − f′(0).
- **Integral**: L{∫₀ᵗ f(τ) dτ} = F(s)/s.
- **Multiplication by t**: L{t f(t)} = −dF/ds.
- **Convolution**: L{f ∗ g} = F(s)G(s), with (f ∗ g)(t) = ∫₀ᵗ f(τ)g(t − τ) dτ.
- **Initial value theorem**: f(0⁺) = lim<sub>s→∞</sub> sF(s). **Final value theorem**: f(∞) = lim<sub>s→0</sub> sF(s), valid only if all poles of sF(s) are in the left half-plane.

## Inverse transforms

Split F(s) into **partial fractions** and use the table. For example,

(s + 3)/((s + 1)(s + 2)) = 2/(s + 1) − 1/(s + 2), so f(t) = 2e<sup>−t</sup> − e<sup>−2t</sup>.

## Solving differential equations

Transform both sides, put in the initial conditions, solve for Y(s), and invert.

**Example.** y′ + 2y = 4, y(0) = 1: sY − 1 + 2Y = 4/s gives Y = (s + 4)/(s(s + 2)) = 2/s − 1/(s + 2), so **y = 2 − e<sup>−2t</sup>**.

## Worked example

Check L{t e<sup>−t</sup>} = 1/(s + 1)² numerically at s = 2, check the partial fraction expansion above, and the solution of y′ + 2y = 4.

```python
import math

def laplace(f, s, T=60.0, n=600000):
    h = T / n
    return sum(math.exp(-s * (i + 0.5) * h) * f((i + 0.5) * h) for i in range(n)) * h

print(f"L{{t e^-t}} at s = 2: numerical {laplace(lambda t: t * math.exp(-t), 2):.6f}, formula {1 / 9:.6f}")
F = lambda s: (s + 3) / ((s + 1) * (s + 2))
P = lambda s: 2 / (s + 1) - 1 / (s + 2)
print("partial fractions agree:", all(abs(F(s) - P(s)) < 1e-12 for s in [0.5, 1, 3, 10]))
y = lambda t: 2 - math.exp(-2 * t)
dy = lambda t, h=1e-6: (y(t + h) - y(t - h)) / (2 * h)
print("y(0) =", y(0), " y' + 2y at t = 0.7:", round(dy(0.7) + 2 * y(0.7), 6))
```
```output
L{t e^-t} at s = 2: numerical 0.111111, formula 0.111111
partial fractions agree: True
y(0) = 1.0  y' + 2y at t = 0.7: 4.0
```

## Practice questions

```quiz
q: What is L{t³} evaluated at s = 2?
answer: 0.375
verify: 6 / 2 ** 4
explain: L{tⁿ} = n!/sⁿ⁺¹, so L{t³} = 6/s⁴ = 6/16 = 0.375 at s = 2.
```

```quiz
q: Using the final value theorem, what is lim<sub>t→∞</sub> f(t) for F(s) = 5(s + 2)/(s(s + 4))?
answer: 2.5
verify: 5 * 2 / 4
explain: f(∞) = lim<sub>s→0</sub> sF(s) = 5 × 2/4 = 2.5.
```

```quiz
q: Using the initial value theorem, what is f(0⁺) for F(s) = (3s + 1)/(s² + 4s + 5)?
answer: 3
verify: 3
explain: sF(s) = (3s² + s)/(s² + 4s + 5) → 3 as s → ∞.
```

```quiz
q: The inverse Laplace transform of 1/((s + 1)(s + 3)) is A e<sup>−t</sup> + B e<sup>−3t</sup>. What is A?
answer: 0.5
verify: 1 / (-1 + 3)
explain: By the cover-up rule, A = 1/(−1 + 3) = 0.5 and B = 1/(−3 + 1) = −0.5.
```

```quiz
q: What is L{e<sup>−3t</sup> cos 4t}?
- s/(s² + 16)
* (s + 3)/((s + 3)² + 16)
- (s − 3)/((s − 3)² + 16)
- 4/((s + 3)² + 16)
explain: By the first shifting theorem, replace s by s + 3 in L{cos 4t} = s/(s² + 16).
```
