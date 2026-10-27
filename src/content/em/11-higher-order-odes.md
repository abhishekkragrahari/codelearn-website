---
title: Higher-Order Linear Differential Equations
chapter: Differential Equations
description: Linear differential equations with constant coefficients, the auxiliary equation and complementary function, particular integrals, Euler-Cauchy equations, variation of parameters, and initial and boundary value problems, with solved GATE examples.
---
A linear n-th order equation with constant coefficients is

aₙy⁽ⁿ⁾ + … + a₁y′ + a₀y = f(x).

Its general solution is **y = y<sub>c</sub> + y<sub>p</sub>**: the **complementary function** (the general solution of the homogeneous equation, with n constants) plus any **particular integral**.

## The complementary function

Substitute y = e<sup>mx</sup> to get the **auxiliary equation** aₙmⁿ + … + a₀ = 0.

| Roots | Contribution to y<sub>c</sub> |
| --- | --- |
| Real and distinct m₁, m₂ | c₁e<sup>m₁x</sup> + c₂e<sup>m₂x</sup> |
| Real and repeated m (twice) | (c₁ + c₂x)e<sup>mx</sup> |
| Complex α ± iβ | e<sup>αx</sup>(c₁ cos βx + c₂ sin βx) |

**Example.** y″ − 5y′ + 6y = 0: m² − 5m + 6 = 0 gives m = 2, 3, so y = c₁e<sup>2x</sup> + c₂e<sup>3x</sup>. For y″ + 4y = 0, m = ±2i and y = c₁ cos 2x + c₂ sin 2x.

## Particular integrals

Write the equation as F(D)y = f(x), with D = d/dx.

- **f = e<sup>ax</sup>**: y<sub>p</sub> = e<sup>ax</sup>/F(a) if F(a) ≠ 0. If a is a root of multiplicity k, y<sub>p</sub> = xᵏe<sup>ax</sup>/F⁽ᵏ⁾(a).
- **f = sin ax or cos ax**: replace D² by −a² in F(D) (if that does not give zero).
- **f = polynomial**: expand 1/F(D) as a power series in D.
- **f = e<sup>ax</sup>V(x)**: shift: 1/F(D) [e<sup>ax</sup>V] = e<sup>ax</sup> · 1/F(D + a) [V].

**Variation of parameters** works for any f: with y<sub>c</sub> = c₁y₁ + c₂y₂ and Wronskian W = y₁y₂′ − y₂y₁′, y<sub>p</sub> = −y₁∫(y₂f/W) dx + y₂∫(y₁f/W) dx.

## Euler-Cauchy equations

x²y″ + axy′ + by = 0. Substitute y = xᵐ: m(m − 1) + am + b = 0. Equivalently, put x = eᵗ to get a constant-coefficient equation in t.

**Example.** x²y″ − 2xy′ + 2y = 0: m² − 3m + 2 = 0, so m = 1, 2 and y = c₁x + c₂x².

## Initial and boundary value problems

An **initial value problem** fixes y and its derivatives at one point; a **boundary value problem** fixes values at two points (for example y(0) and y(L)). A boundary value problem may have one, none or infinitely many solutions: y″ + y = 0 with y(0) = 0 and y(π) = 0 has infinitely many (y = c sin x).

## Worked example

Solve y″ + 3y′ + 2y = 0 with y(0) = 1 and y′(0) = 0, and check y(1) with a numerical solver. Then find the particular integral of y″ − 3y′ + 2y = e<sup>3x</sup>.

```python
import math

# Roots -1 and -2: y = c1 e^-x + c2 e^-2x, with c1 + c2 = 1 and -c1 - 2 c2 = 0 -> c1 = 2, c2 = -1
exact = 2 * math.exp(-1) - math.exp(-2)

def f(y, v):
    return v, -3 * v - 2 * y

y, v, h = 1.0, 0.0, 1e-3
for _ in range(1000):                       # RK4 steps up to x = 1
    k1 = f(y, v)
    k2 = f(y + h / 2 * k1[0], v + h / 2 * k1[1])
    k3 = f(y + h / 2 * k2[0], v + h / 2 * k2[1])
    k4 = f(y + h * k3[0], v + h * k3[1])
    y += h / 6 * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0])
    v += h / 6 * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1])
print(f"y(1): numerical {y:.8f}, exact 2/e - 1/e^2 = {exact:.8f}")

# PI of y'' - 3y' + 2y = e^{3x}: F(3) = 9 - 9 + 2 = 2, so y_p = e^{3x}/2
F = lambda a: a * a - 3 * a + 2
print("F(3) =", F(3), "-> y_p = e^(3x) /", F(3))
```
```output
y(1): numerical 0.60042360, exact 2/e - 1/e^2 = 0.60042360
F(3) = 2 -> y_p = e^(3x) / 2
```

## Practice questions

```quiz
q: The auxiliary equation of y″ − 6y′ + 9y = 0 has a repeated root. What is the root?
answer: 3
verify: 6 / 2
explain: m² − 6m + 9 = (m − 3)² = 0, so m = 3 (twice) and y = (c₁ + c₂x)e<sup>3x</sup>.
```

```quiz
q: The general solution of y″ + 2y′ + 5y = 0 is e<sup>αx</sup>(c₁ cos βx + c₂ sin βx). What is β?
answer: 2
verify: (5 - 1) ** 0.5
explain: m² + 2m + 5 = 0 gives m = −1 ± 2i, so α = −1 and β = 2.
```

```quiz
q: The particular integral of y″ + y = e<sup>2x</sup> is ke<sup>2x</sup>. What is k?
answer: 0.2
verify: 1 / (2 ** 2 + 1)
explain: y<sub>p</sub> = e<sup>2x</sup>/F(2) with F(D) = D² + 1, so k = 1/(4 + 1) = 0.2.
```

```quiz
q: The Euler-Cauchy equation x²y″ + xy′ − 4y = 0 has solutions xᵐ. What is the positive value of m?
answer: 2
verify: next(m for m in range(1, 10) if m * (m - 1) + m - 4 == 0)
explain: m(m − 1) + m − 4 = m² − 4 = 0, so m = ±2; the positive value is 2.
```

```quiz
q: For y″ + 4y = 0 with y(0) = 0 and y(π/2) = 0, how many solutions are there?
- Exactly one
- None
* Infinitely many
- Exactly two
explain: The general solution is c₁ cos 2x + c₂ sin 2x. y(0) = 0 gives c₁ = 0, and sin(π) = 0 satisfies the second condition for every c₂, so y = c₂ sin 2x works for any c₂.
```
