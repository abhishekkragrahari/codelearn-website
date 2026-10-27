---
title: First-Order Differential Equations
chapter: Differential Equations
description: Order and degree, variable separable, homogeneous, linear (integrating factor), exact and Bernoulli equations, and applications such as growth, decay and cooling, with solved GATE examples.
---
A **differential equation** relates a function to its derivatives. Its **order** is the highest derivative that appears; its **degree** is the power of that highest derivative once the equation is free of radicals and fractions in the derivatives. The general solution of an n-th order equation has n arbitrary constants, fixed by initial or boundary conditions.

## Variable separable

dy/dx = f(x)g(y) ⇒ ∫ dy/g(y) = ∫ f(x) dx.

**Example.** dy/dx = ky gives ln y = kx + c, so **y = Ce<sup>kx</sup>**: exponential growth (k > 0) or decay (k < 0). Newton's law of cooling dT/dt = −k(T − T<sub>a</sub>) gives T = T<sub>a</sub> + (T₀ − T<sub>a</sub>)e<sup>−kt</sup>.

## Homogeneous equations

dy/dx = f(y/x): substitute y = vx, so dy/dx = v + x dv/dx, which separates.

## Linear first-order equations

**dy/dx + P(x)y = Q(x)**. Multiply by the **integrating factor** IF = e<sup>∫P dx</sup>:

**y · IF = ∫ Q · IF dx + C**

**Example.** dy/dx + y = x. IF = eˣ, so yeˣ = ∫ xeˣ dx = eˣ(x − 1) + C, and **y = x − 1 + Ce<sup>−x</sup>**. With y(0) = 0, C = 1.

## Exact equations

M dx + N dy = 0 is **exact** if **∂M/∂y = ∂N/∂x**. Then there is a function f with ∂f/∂x = M and ∂f/∂y = N, and the solution is f(x, y) = C. If it is not exact, an integrating factor may make it so: if (∂M/∂y − ∂N/∂x)/N depends on x only, IF = e<sup>∫ that dx</sup>.

## Bernoulli equations

dy/dx + P(x)y = Q(x)yⁿ (n ≠ 0, 1). Substituting z = y<sup>1−n</sup> turns it into a linear equation in z.

## Worked example

Solve dy/dx + 2y = 4 with y(0) = 0 exactly (y = 2(1 − e<sup>−2x</sup>)), and compare with a numerical solution. Check whether (2xy + 3) dx + (x² + 4y) dy = 0 is exact.

```python
import math

# Numerical check with many small Euler steps
y, x, h = 0.0, 0.0, 1e-5
while x < 1 - 1e-12:
    y += h * (4 - 2 * y)
    x += h
print(f"numerical y(1) = {y:.5f}, exact 2(1 - e^-2) = {2 * (1 - math.exp(-2)):.5f}")

# Exactness: M = 2xy + 3, N = x^2 + 4y -> dM/dy = 2x, dN/dx = 2x
dMdy = lambda x, y: 2 * x
dNdx = lambda x, y: 2 * x
print("exact:", all(dMdy(a, b) == dNdx(a, b) for a in range(-3, 4) for b in range(-3, 4)))
print("solution: x^2 y + 3x + 2y^2 = C")

# Cooling: body at 90 C in a 30 C room, 60 C after 10 min. Temperature after 20 min?
k = math.log((90 - 30) / (60 - 30)) / 10
print(f"k = {k:.5f} per min, T(20) = {30 + 60 * math.exp(-20 * k):.2f} C")
```
```output
numerical y(1) = 1.72934, exact 2(1 - e^-2) = 1.72933
exact: True
solution: x^2 y + 3x + 2y^2 = C
k = 0.06931 per min, T(20) = 45.00 C
```

## Practice questions

```quiz
q: What is the order of the differential equation (d²y/dx²)³ + (dy/dx)⁴ + y = 0?
answer: 2
verify: 2
explain: The highest derivative is d²y/dx², so the order is 2. (Its degree, the power of that derivative, is 3.)
```

```quiz
q: The solution of dy/dx = −0.5y with y(0) = 8 is evaluated at x = 2. What is y(2)? Give the answer to four decimal places.
answer: 2.943
verify: round(8 * __import__("math").exp(-1), 4)
explain: y = 8e<sup>−0.5x</sup>, so y(2) = 8e<sup>−1</sup> ≈ 2.9430.
```

```quiz
q: What is the integrating factor of dy/dx + (2/x)y = x³ (x > 0)?
- e^(2x)
* x²
- 2 ln x
- 1/x²
explain: IF = e<sup>∫2/x dx</sup> = e<sup>2 ln x</sup> = x².
```

```quiz
q: For dy/dx + y = 1 with y(0) = 0, what is y(1)? Give the answer to four decimal places.
answer: 0.6321
verify: round(1 - __import__("math").exp(-1), 4)
explain: The solution is y = 1 − e<sup>−x</sup>, so y(1) = 1 − e<sup>−1</sup> ≈ 0.6321.
```

```quiz
q: For which value of k is (y + kx) dx + (x + 3y²) dy = 0 exact?
* Any value of k
- Only k = 0
- Only k = 1
- No value of k
explain: ∂M/∂y = 1 and ∂N/∂x = 1 for every k, so the equation is exact whatever k is.
```
