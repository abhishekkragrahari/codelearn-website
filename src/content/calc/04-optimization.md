---
title: Single-Variable Optimization Methods
chapter: Optimization
description: Solving optimization word problems, gradient descent in one dimension and the effect of the learning rate, Newton's method for minimisation and root finding, and bisection and golden-section search, for GATE DA.
---
The previous lesson found extrema by solving f′(x) = 0 exactly. Real problems need two more skills: turning a situation into a function to optimise, and finding the optimum **numerically** when the equation cannot be solved by hand. Both ideas scale directly to the many-parameter problems of machine learning.

## Optimization word problems

1. Name the quantity to optimise, and write it as a function of **one** variable, using any constraint to remove the others.
2. Find the domain of that variable.
3. Find the critical points and check the endpoints.

**Example: the largest box.** Squares of side x are cut from the corners of a 12 × 12 sheet, and the sides folded up. What x maximises the volume?

- V(x) = x(12 − 2x)², with 0 < x < 6.
- V′(x) = (12 − 2x)² − 4x(12 − 2x) = (12 − 2x)(12 − 6x), so x = 2 (x = 6 gives zero volume).
- V(2) = 2 × 8² = **128**, the maximum.

**Example: the fence.** A farmer has 100 m of fence for three sides of a rectangle (a wall forms the fourth). With width x, the length is 100 − 2x, so the area is A(x) = x(100 − 2x). A′(x) = 100 − 4x = 0 at x = 25, giving **A = 25 × 50 = 1250 m²**.

## Gradient descent

To minimise a differentiable f, start at x₀ and repeatedly step **downhill**:

**xₖ₊₁ = xₖ − η f′(xₖ)**

The **learning rate** η > 0 sets the step size. Near a minimum f′ is small, so the steps shrink automatically.

For f(x) = (x − 3)² + 1, f′(x) = 2(x − 3), and the update is xₖ₊₁ − 3 = (1 − 2η)(xₖ − 3). The error is multiplied by **1 − 2η** at each step:

- 0 < η < 0.5: the error shrinks steadily (no overshoot);
- η = 0.5: one step lands exactly on the minimum;
- 0.5 < η < 1: the iterates overshoot and oscillate, but still converge;
- **η ≥ 1**: |1 − 2η| ≥ 1, so the iterates fail to converge (at η = 1 they bounce forever; above it they diverge).

In general, for f with f″ ≤ L, any η < 2/L converges on a convex function. On a non-convex function, gradient descent finds a **local** minimum that depends on the starting point.

## Newton's method

Newton's method uses the **second derivative** as well. At each step it minimises the quadratic Taylor approximation f(xₖ) + f′(xₖ)h + f″(xₖ)h²/2, whose minimum is at h = −f′(xₖ)/f″(xₖ):

**xₖ₊₁ = xₖ − f′(xₖ) / f″(xₖ)**

- On a quadratic, it reaches the minimum in **one step**.
- Near a minimum with f″ > 0 it converges **quadratically**: the number of correct digits roughly doubles each step.
- It needs f″, which is expensive in many dimensions (the Hessian), and it can head for a maximum or diverge if started far away or where f″ ≤ 0.

The same idea finds **roots** of g(x) = 0: xₖ₊₁ = xₖ − g(xₖ)/g′(xₖ) (applied to g = f′, it is the update above). For g(x) = x² − 2 it gives xₖ₊₁ = (xₖ + 2/xₖ)/2, the ancient Babylonian method for √2.

## Derivative-free methods

- **Bisection** finds a root of a continuous g on [a, b] with g(a) and g(b) of opposite signs: check the midpoint and keep the half where the sign changes. Each step halves the interval, so after n steps the error is at most (b − a)/2ⁿ.
- **Golden-section search** finds the minimum of a **unimodal** function (one that decreases and then increases) on an interval, shrinking it by the factor 0.618 at each step, using only function values.

```python
import math

f = lambda x: (x - 3) ** 2 + 1
df = lambda x: 2 * (x - 3)
for eta in (0.1, 0.5, 0.9, 1.1):
    x = 0.0
    path = []
    for k in range(20):
        x -= eta * df(x)
        path.append(x)
    print(f"eta = {eta}: x1..x3 = {[round(p, 4) for p in path[:3]]}, x20 = {path[-1]:.4g}")

# Newton's method on a non-quadratic function: minimise g(x) = x^4 - 3x^2 + x near x = 1
g1 = lambda x: 4 * x ** 3 - 6 * x + 1
g2 = lambda x: 12 * x ** 2 - 6
x = 1.0
for k in range(1, 6):
    x -= g1(x) / g2(x)
    print(f"Newton step {k}: x = {x:.10f}, g'(x) = {g1(x):.2e}")

# Babylonian square root and bisection for sqrt(2)
x = 1.0
for k in range(4):
    x = (x + 2 / x) / 2
print(f"Newton for sqrt(2): {x:.12f}  (true {math.sqrt(2):.12f})")
lo, hi = 1.0, 2.0
for k in range(20):
    mid = (lo + hi) / 2
    if mid * mid - 2 > 0:
        hi = mid
    else:
        lo = mid
print(f"bisection after 20 steps: [{lo:.8f}, {hi:.8f}], width {hi - lo:.2e}")
print("largest box volume:", max(x / 1000 * (12 - 2 * x / 1000) ** 2 for x in range(1, 6000)))
```
```output
eta = 0.1: x1..x3 = [0.6, 1.08, 1.464], x20 = 2.965
eta = 0.5: x1..x3 = [3.0, 3.0, 3.0], x20 = 3
eta = 0.9: x1..x3 = [5.4, 1.08, 4.536], x20 = 2.965
eta = 1.1: x1..x3 = [6.6, -1.32, 8.184], x20 = -112
Newton step 1: x = 1.1666666667, g'(x) = 3.52e-01
Newton step 2: x = 1.1326164875, g'(x) = 1.61e-02
Newton step 3: x = 1.1309053778, g'(x) = 3.98e-05
Newton step 4: x = 1.1309011227, g'(x) = 2.46e-10
Newton step 5: x = 1.1309011226, g'(x) = 0.00e+00
Newton for sqrt(2): 1.414213562375  (true 1.414213562373)
bisection after 20 steps: [1.41421318, 1.41421413], width 9.54e-07
largest box volume: 128.0
```

## Practice questions

```quiz
q: Gradient descent with learning rate η = 0.25 is applied to f(x) = x², starting at x₀ = 8. What is x₂?
answer: 2
verify:
  x = 8
  for _ in range(2):
      x -= 0.25 * 2 * x
  print(x)
explain: f′(x) = 2x, so xₖ₊₁ = xₖ − 0.25 × 2xₖ = 0.5xₖ. Then x₁ = 4 and x₂ = 2.
```

```quiz
q: For f(x) = 5x², what is the largest learning rate η for which gradient descent converges from every starting point (strict inequality: η must be below this value)?
answer: 0.2
verify: 2 / 10
explain: f′(x) = 10x, so xₖ₊₁ = (1 − 10η)xₖ. Convergence needs |1 − 10η| < 1, i.e. 0 < η < 0.2. In general η < 2/f″ for a quadratic.
```

```quiz
q: One step of Newton's method for **minimising** f(x) = x² − 4x + 7 is taken from x₀ = 10. Where does it land?
answer: 2
verify: 10 - (2 * 10 - 4) / 2
explain: x₁ = x₀ − f′(x₀)/f″(x₀) = 10 − (20 − 4)/2 = 10 − 8 = 2. On a quadratic, Newton's method jumps straight to the minimum, x = 2.
```

```quiz
q: A rectangle has perimeter 40. What is its largest possible area?
answer: 100
verify: max(x * (20 - x) for x in range(0, 21))
explain: With sides x and 20 − x, A = x(20 − x), A′ = 20 − 2x = 0 at x = 10. The best rectangle is a 10 × 10 square with area 100.
```

```quiz
q: Bisection starts on an interval of length 1. What is the smallest number of steps that guarantees an interval of length below 0.001?
answer: 10
verify: next(n for n in range(1, 40) if 1 / 2 ** n < 0.001)
explain: After n steps the length is 1/2ⁿ. 2⁹ = 512 gives 0.00195, too big; 2¹⁰ = 1024 gives 0.000977 < 0.001. So 10 steps.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* Newton's method finds the minimum of a quadratic with positive leading coefficient in one step
* With too large a learning rate, gradient descent can diverge
- Gradient descent always finds the global minimum of any differentiable function
* Bisection needs only function values, not derivatives
explain: Newton's method minimises the quadratic Taylor model, which for a quadratic is the function itself. Too large a step overshoots further each time. On non-convex functions, gradient descent can stop at a local minimum. Bisection only compares signs of g.
```
