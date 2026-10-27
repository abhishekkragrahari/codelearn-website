---
title: Fourier Series and Partial Differential Equations
chapter: Differential Equations
description: Fourier series and their coefficients, even and odd functions, half-range series, Dirichlet conditions, classification of second-order PDEs, separation of variables, and the heat, wave and Laplace equations, with solved GATE examples.
---
## Fourier series

A periodic function f(x) of period 2L can be written as

**f(x) = a₀/2 + Σ (aₙ cos(nπx/L) + bₙ sin(nπx/L))**, n = 1, 2, 3, …

with

- aₙ = (1/L) ∫<sub>−L</sub><sup>L</sup> f(x) cos(nπx/L) dx (a₀ is the same with n = 0, so a₀/2 is the average value);
- bₙ = (1/L) ∫<sub>−L</sub><sup>L</sup> f(x) sin(nπx/L) dx.

**Symmetry saves work.**

- An **even** function (f(−x) = f(x)) has bₙ = 0: a cosine series.
- An **odd** function (f(−x) = −f(x)) has aₙ = 0 (and a₀ = 0): a sine series.
- **Half-range series**: a function given on (0, L) can be extended as even (cosine series) or odd (sine series).

**Dirichlet conditions.** If f is periodic, piecewise continuous with finitely many maxima, minima and discontinuities in a period, its Fourier series converges to f(x) where f is continuous, and to the **average of the left and right limits** at a jump.

**Example.** The square wave f(x) = −1 on (−π, 0) and +1 on (0, π) is odd, with bₙ = 4/(nπ) for odd n and 0 for even n:

f(x) = (4/π)(sin x + sin 3x/3 + sin 5x/5 + …)

At x = 0 (a jump from −1 to 1) the series gives 0, the average. Putting x = π/2 gives the Leibniz series 1 − 1/3 + 1/5 − … = π/4.

## Classifying second-order PDEs

For A u<sub>xx</sub> + B u<sub>xy</sub> + C u<sub>yy</sub> + (lower-order terms) = 0, the discriminant **B² − 4AC** decides the type:

| B² − 4AC | Type | Example |
| --- | --- | --- |
| < 0 | Elliptic | Laplace u<sub>xx</sub> + u<sub>yy</sub> = 0 |
| = 0 | Parabolic | Heat u<sub>t</sub> = c²u<sub>xx</sub> |
| > 0 | Hyperbolic | Wave u<sub>tt</sub> = c²u<sub>xx</sub> |

## Separation of variables

Assume u(x, t) = X(x)T(t). The PDE splits into two ODEs linked by a separation constant, and the boundary conditions pick out the allowed values.

**One-dimensional heat equation** u<sub>t</sub> = c²u<sub>xx</sub> on 0 < x < L with u(0, t) = u(L, t) = 0:

u(x, t) = Σ Bₙ sin(nπx/L) e<sup>−(cnπ/L)²t</sup>,

where the Bₙ are the Fourier sine coefficients of the initial temperature u(x, 0). Each mode decays, the higher ones faster.

**Wave equation** u<sub>tt</sub> = c²u<sub>xx</sub> for a string fixed at both ends: u(x, t) = Σ sin(nπx/L)[Cₙ cos(cnπt/L) + Dₙ sin(cnπt/L)]. The n-th mode vibrates at frequency nc/(2L). **D'Alembert's solution**: u = F(x + ct) + G(x − ct), waves travelling in both directions.

**Laplace equation** u<sub>xx</sub> + u<sub>yy</sub> = 0: steady-state temperature or potential; its solutions (harmonic functions) have no interior maximum or minimum.

## Worked example

Compute the Fourier coefficients of the square wave numerically, check the series at x = π/2, and find how much of the first heat mode remains after t = 1 for c = 1 and L = π.

```python
import math

def b(n, N=20000):
    # bn = (1/pi) * integral over (-pi, pi) of f(x) sin(nx), with f the square wave
    h = 2 * math.pi / N
    total = 0.0
    for i in range(N):
        x = -math.pi + (i + 0.5) * h
        total += (1 if x > 0 else -1) * math.sin(n * x) * h
    return total / math.pi

print("b1..b5:", [round(b(n), 4) + 0.0 for n in range(1, 6)])
print("4/(n pi) for odd n:", [round(4 / (n * math.pi), 4) for n in (1, 3, 5)])
s = sum(4 / (n * math.pi) * math.sin(n * math.pi / 2) for n in range(1, 20001, 2))
print(f"series at x = pi/2 with 10000 terms: {s:.4f}")
print(f"first heat mode after t = 1 (c = 1, L = pi): e^-1 = {math.exp(-1):.4f} of its start")
```
```output
b1..b5: [1.2732, 0.0, 0.4244, 0.0, 0.2546]
4/(n pi) for odd n: [1.2732, 0.4244, 0.2546]
series at x = pi/2 with 10000 terms: 1.0000
first heat mode after t = 1 (c = 1, L = pi): e^-1 = 0.3679 of its start
```

## Practice questions

```quiz
q: The PDE 4u<sub>xx</sub> + 4u<sub>xy</sub> + u<sub>yy</sub> = 0 has B² − 4AC equal to:
answer: 0
verify: 4 ** 2 - 4 * 4 * 1
explain: A = 4, B = 4, C = 1: B² − 4AC = 16 − 16 = 0, so the equation is parabolic.
```

```quiz
q: Which type is the PDE u<sub>xx</sub> − 9u<sub>yy</sub> = 0?
- Elliptic
- Parabolic
* Hyperbolic
- It cannot be classified
explain: A = 1, B = 0, C = −9: B² − 4AC = 36 > 0, so it is hyperbolic (a wave equation with speed 3).
```

```quiz
q: A function with period 2π is even. Which Fourier coefficients are necessarily zero?
- All aₙ
* All bₙ
- a₀ only
- None
explain: For an even function, f(x) sin(nx) is odd, so every bₙ integral is zero: the series contains only cosines (and the constant term).
```

```quiz
q: The Fourier series of f(x) = x on (−π, π) is evaluated at x = π, where f jumps from π to −π. What value does the series converge to?
answer: 0
verify: (__import__("math").pi + -__import__("math").pi) / 2
explain: At a discontinuity the series converges to the average of the one-sided limits: (π + (−π))/2 = 0.
```

```quiz
q: In the heat equation solution on 0 < x < L, the n-th mode decays like e<sup>−(cnπ/L)²t</sup>. By what factor is the decay rate of the third mode larger than that of the first?
answer: 9
verify: 3 ** 2
explain: The decay rate is proportional to n², so the third mode decays 3² = 9 times faster.
```
