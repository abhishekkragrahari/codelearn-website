---
title: Numerical Methods
chapter: Numerical Methods
description: Errors, bisection, Newton-Raphson and secant methods, Gauss elimination and the Jacobi and Gauss-Seidel iterations, the trapezoidal rule and Simpson's rules with their errors, and Euler, modified Euler and Runge-Kutta methods for ODEs, with solved GATE examples.
---
When an equation, integral or differential equation cannot be solved exactly, numerical methods give approximate answers with controlled error.

## Errors

Absolute error = |true − approximate|; relative error = absolute error/|true|. **Round-off** errors come from finite precision; **truncation** errors from cutting an infinite process (a series, a limit) short.

## Roots of non-linear equations

| Method | Iteration | Convergence |
| --- | --- | --- |
| **Bisection** | Halve an interval [a, b] with f(a)f(b) < 0 | Linear; error ≤ (b − a)/2ⁿ after n steps; always converges |
| **Regula falsi** | Secant through the end points, keeping a bracket | Linear |
| **Secant** | xₙ₊₁ = xₙ − f(xₙ)(xₙ − xₙ₋₁)/(f(xₙ) − f(xₙ₋₁)) | Order about 1.618 |
| **Newton-Raphson** | **xₙ₊₁ = xₙ − f(xₙ)/f′(xₙ)** | **Quadratic** near a simple root; can fail if f′ ≈ 0 |

Newton's method for √N: xₙ₊₁ = (xₙ + N/xₙ)/2. For 1/N (division-free): xₙ₊₁ = xₙ(2 − Nxₙ).

## Systems of linear equations

- **Gauss elimination** reduces to triangular form and back-substitutes (about n³/3 operations); partial pivoting improves stability.
- **Jacobi**: each new xᵢ uses only the previous iteration's values. **Gauss-Seidel**: each new xᵢ uses the latest values, usually converging about twice as fast.
- Both iterations converge if the matrix is **strictly diagonally dominant** (|aᵢᵢ| > Σ<sub>j≠i</sub>|aᵢⱼ| in every row).

## Numerical integration

With step h over n sub-intervals:

| Rule | Formula | Exact for polynomials of degree | Error order |
| --- | --- | --- | --- |
| **Trapezoidal** | (h/2)[y₀ + 2(y₁ + … + yₙ₋₁) + yₙ] | ≤ 1 | O(h²) |
| **Simpson's 1/3** (n even) | (h/3)[y₀ + 4(odd terms) + 2(even interior terms) + yₙ] | ≤ 3 | O(h⁴) |
| **Simpson's 3/8** (n a multiple of 3) | (3h/8)[y₀ + 3y₁ + 3y₂ + 2y₃ + … + yₙ] | ≤ 3 | O(h⁴) |

Halving h divides the trapezoidal error by about 4 and Simpson's error by about 16.

## Ordinary differential equations

For y′ = f(x, y), y(x₀) = y₀, with step h:

- **Euler**: yₙ₊₁ = yₙ + h f(xₙ, yₙ) (first order, error O(h) globally).
- **Modified Euler (Heun)**: predict with Euler, then average the slopes at both ends (second order).
- **Runge-Kutta (RK4)**: k₁ = hf(xₙ, yₙ), k₂ = hf(xₙ + h/2, yₙ + k₁/2), k₃ = hf(xₙ + h/2, yₙ + k₂/2), k₄ = hf(xₙ + h, yₙ + k₃), and yₙ₊₁ = yₙ + (k₁ + 2k₂ + 2k₃ + k₄)/6 (fourth order).

Multi-step methods (Adams-Bashforth, Milne) reuse previous points.

## Worked example

Find √5 by Newton-Raphson from x₀ = 2, integrate ∫₀¹ eˣ dx with the trapezoidal and Simpson's rules (n = 4), and take one Euler and one RK4 step of size 0.1 for y′ = x + y, y(0) = 1.

```python
import math

x = 2.0
for k in range(1, 5):
    x = x - (x * x - 5) / (2 * x)
    print(f"Newton step {k}: {x:.10f}")
print(f"sqrt(5) = {math.sqrt(5):.10f}")

f, a, b, n = math.exp, 0.0, 1.0, 4
h = (b - a) / n
y = [f(a + i * h) for i in range(n + 1)]
trap = h / 2 * (y[0] + 2 * sum(y[1:-1]) + y[-1])
simp = h / 3 * (y[0] + 4 * sum(y[1:-1:2]) + 2 * sum(y[2:-1:2]) + y[-1])
exact = math.e - 1
print(f"trapezoidal = {trap:.6f} (error {trap - exact:.2e}), Simpson = {simp:.6f} (error {simp - exact:.2e})")

g = lambda x, y: x + y
x0, y0, h = 0.0, 1.0, 0.1
print(f"Euler: y(0.1) = {y0 + h * g(x0, y0):.4f}")
k1 = h * g(x0, y0)
k2 = h * g(x0 + h / 2, y0 + k1 / 2)
k3 = h * g(x0 + h / 2, y0 + k2 / 2)
k4 = h * g(x0 + h, y0 + k3)
print(f"RK4: y(0.1) = {y0 + (k1 + 2 * k2 + 2 * k3 + k4) / 6:.6f}, exact 2e^0.1 - 1.1 = {2 * math.exp(0.1) - 1.1:.6f}")
```
```output
Newton step 1: 2.2500000000
Newton step 2: 2.2361111111
Newton step 3: 2.2360679779
Newton step 4: 2.2360679775
sqrt(5) = 2.2360679775
trapezoidal = 1.727222 (error 8.94e-03), Simpson = 1.718319 (error 3.70e-05)
Euler: y(0.1) = 1.1000
RK4: y(0.1) = 1.110342, exact 2e^0.1 - 1.1 = 1.110342
```

## Practice questions

```quiz
q: One Newton-Raphson step for f(x) = x³ − 2 starting at x₀ = 1 gives x₁ = ?  Give the answer to four decimal places.
answer: 1.3333
verify: round(1 - (1 - 2) / 3, 4)
explain: x₁ = 1 − (1 − 2)/(3 × 1²) = 1 + 1/3 ≈ 1.3333.
```

```quiz
q: Using the trapezoidal rule with one interval (h = 1), what is the approximate value of ∫₀¹ x² dx?
answer: 0.5
verify: 1 / 2 * (0 + 1)
explain: (h/2)(y₀ + y₁) = 0.5 × (0 + 1) = 0.5, compared with the exact 1/3: the trapezoidal rule overestimates for a convex function.
```

```quiz
q: Using Simpson's 1/3 rule with h = 0.5, what is ∫₀¹ x³ dx?
answer: 0.25
verify: round(0.5 / 3 * (0 + 4 * 0.5 ** 3 + 1), 6)
explain: (h/3)[y₀ + 4y₁ + y₂] = (0.5/3)(0 + 0.5 + 1) = 0.25, exactly the true value, because Simpson's rule is exact for cubics.
```

```quiz
q: One Euler step of size 0.2 for y′ = 2xy with y(1) = 1 gives y(1.2) = ?
answer: 1.4
verify: round(1 + 0.2 * 2 * 1 * 1, 6)
explain: y₁ = y₀ + h f(x₀, y₀) = 1 + 0.2 × 2 = 1.4.
```

```quiz
q: Bisection is applied to an interval of length 2. After how many steps is the interval guaranteed to be shorter than 0.01?
answer: 8
verify: next(n for n in range(1, 30) if 2 / 2 ** n < 0.01)
explain: The length after n steps is 2/2ⁿ. 2/2⁷ = 0.0156 is too long and 2/2⁸ = 0.0078 < 0.01, so 8 steps.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* Newton-Raphson converges quadratically near a simple root
* Gauss-Seidel converges for a strictly diagonally dominant system
- The trapezoidal rule is exact for all cubic polynomials
* RK4 is a fourth-order method
explain: Newton's error is squared each step near a simple root. Diagonal dominance guarantees Jacobi and Gauss-Seidel convergence. The trapezoidal rule is exact only up to degree 1 (Simpson's rules handle cubics). RK4 has a local error O(h⁵) and global error O(h⁴).
```
