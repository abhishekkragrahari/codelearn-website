---
title: Complex Variables
chapter: Complex Variables
description: Analytic functions and the Cauchy-Riemann equations, harmonic functions, complex integration, Cauchy's integral theorem and integral formula, Taylor and Laurent series, singularities, residues and the residue theorem, with solved GATE examples.
---
## Analytic functions

A function f(z) = u(x, y) + iv(x, y) of z = x + iy is **analytic** in a region if it has a derivative at every point there. A necessary condition is the **Cauchy-Riemann equations**:

**u<sub>x</sub> = v<sub>y</sub> and u<sub>y</sub> = −v<sub>x</sub>**

If the partial derivatives are continuous and satisfy these equations, f is analytic, and f′(z) = u<sub>x</sub> + iv<sub>x</sub>.

- Polynomials, eᶻ, sin z and cos z are analytic everywhere (**entire**). 1/z is analytic except at z = 0.
- z̄ (the conjugate) and |z|² are **not** analytic anywhere except possibly at single points: for z̄, u<sub>x</sub> = 1 but v<sub>y</sub> = −1.
- The real and imaginary parts of an analytic function are **harmonic**: u<sub>xx</sub> + u<sub>yy</sub> = 0. Given u, its **harmonic conjugate** v follows from the Cauchy-Riemann equations.

**Example.** Is u = x² − y² the real part of an analytic function? u<sub>xx</sub> + u<sub>yy</sub> = 2 − 2 = 0, so yes: v = 2xy, and f(z) = z².

## Complex integration

**Cauchy's integral theorem.** If f is analytic inside and on a simple closed curve C, then **∮<sub>C</sub> f(z) dz = 0**.

**Cauchy's integral formula.** If f is analytic inside and on C, and a is inside C:

**∮<sub>C</sub> f(z)/(z − a) dz = 2πi f(a)**, and ∮<sub>C</sub> f(z)/(z − a)ⁿ⁺¹ dz = (2πi/n!) f⁽ⁿ⁾(a).

A basic result: ∮ dz/(z − a) = 2πi around a, and ∮ (z − a)ⁿ dz = 0 for every other integer n.

## Series and singularities

- **Taylor series** about a point where f is analytic: f(z) = Σ f⁽ⁿ⁾(a)(z − a)ⁿ/n!.
- **Laurent series** in an annulus around a singularity: f(z) = Σ aₙ(z − a)ⁿ over all integers n. The negative powers form the **principal part**.
- A **singularity** is **removable** if the principal part is empty (sin z/z at 0), a **pole of order m** if it ends at (z − a)<sup>−m</sup>, and **essential** if it is infinite (e<sup>1/z</sup> at 0).

## Residues

The **residue** of f at a is the coefficient a₋₁ of 1/(z − a) in the Laurent series.

- Simple pole: Res = lim<sub>z→a</sub> (z − a)f(z). For f = p/q with a simple zero of q: Res = p(a)/q′(a).
- Pole of order m: Res = (1/(m − 1)!) lim<sub>z→a</sub> d<sup>m−1</sup>/dz<sup>m−1</sup> [(z − a)ᵐ f(z)].

**Residue theorem.** **∮<sub>C</sub> f(z) dz = 2πi × (sum of the residues inside C)**.

**Example.** ∮ dz/(z(z − 2)) around |z| = 1: only z = 0 is inside, with residue 1/(0 − 2) = −1/2, so the integral is 2πi(−1/2) = −πi. Around |z| = 3 both poles are inside; the residues −1/2 and 1/2 cancel and the integral is 0.

## Worked example

Check the Cauchy-Riemann equations for f(z) = z² numerically, and compute ∮ dz/(z(z − 2)) around |z| = 1 by direct numerical integration.

```python
import cmath, math

f = lambda z: z * z
x, y, h = 1.3, -0.7, 1e-6
u = lambda x, y: f(complex(x, y)).real
v = lambda x, y: f(complex(x, y)).imag
ux = (u(x + h, y) - u(x - h, y)) / (2 * h)
vy = (v(x, y + h) - v(x, y - h)) / (2 * h)
uy = (u(x, y + h) - u(x, y - h)) / (2 * h)
vx = (v(x + h, y) - v(x - h, y)) / (2 * h)
print(f"ux = {ux:.4f}, vy = {vy:.4f}, uy = {uy:.4f}, -vx = {-vx:.4f}")

def contour(g, r, n=200000):
    total = 0
    for k in range(n):
        t = 2 * math.pi * (k + 0.5) / n
        z = r * cmath.exp(1j * t)
        total += g(z) * 1j * z * (2 * math.pi / n)
    return total

g = lambda z: 1 / (z * (z - 2))
I1 = contour(g, 1)
I3 = contour(g, 3)
print(f"around |z| = 1: real part {abs(I1.real):.6f}, imaginary part {I1.imag:.6f} (expected -pi = {-math.pi:.6f})")
print(f"around |z| = 3: magnitude {abs(I3):.6f} (expected 0)")
```
```output
ux = 2.6000, vy = 2.6000, uy = 1.4000, -vx = 1.4000
around |z| = 1: real part 0.000000, imaginary part -3.141593 (expected -pi = -3.141593)
around |z| = 3: magnitude 0.000000 (expected 0)
```

## Practice questions

```quiz
q: What is the residue of f(z) = (z + 1)/(z − 2) at z = 2?
answer: 3
verify: 2 + 1
explain: For a simple pole, Res = lim (z − 2)f(z) = 2 + 1 = 3.
```

```quiz
q: The value of ∮ e<sup>z</sup>/(z − 1) dz around |z| = 2 is 2πi × k. What is k? Give the answer to four decimal places.
answer: 2.7183
verify: round(__import__("math").e, 4)
explain: By Cauchy's integral formula, the integral is 2πi f(1) with f = eᶻ, so k = e ≈ 2.7183.
```

```quiz
q: What is the value of ∮ dz/(z − 3) around the circle |z| = 1?
answer: 0
verify: 0
explain: The integrand is analytic inside and on |z| = 1 (the pole at 3 is outside), so by Cauchy's theorem the integral is 0.
```

```quiz
q: Which of these functions is analytic everywhere in the complex plane?
* f(z) = z³ + eᶻ
- f(z) = z̄
- f(z) = |z|²
- f(z) = 1/z
explain: Polynomials and eᶻ are entire. z̄ and |z|² fail the Cauchy-Riemann equations, and 1/z has a pole at 0.
```

```quiz
q: f(z) = 1/(z²(z − 1)) has a pole of order 2 at z = 0. What is its residue there?
answer: -1
verify: -1 / (0 - 1) ** 2
explain: Res = d/dz[z²f(z)] at z = 0 = d/dz[1/(z − 1)] = −1/(z − 1)² = −1 at z = 0.
```
