---
title: Maxima and Minima
chapter: Optimization
description: Local and global extrema, critical points, the first and second derivative tests, finding the absolute maximum and minimum on a closed interval, convex functions and why their local minima are global, for GATE DA.
---
Finding the largest or smallest value of a function is the core of optimization, and training a machine learning model is exactly that: minimising a loss. This lesson covers functions of one variable, the setting of the GATE DA syllabus.

## Local and global extrema

- f has a **local (relative) maximum** at c if f(c) ≥ f(x) for all x **near** c; a **local minimum** if f(c) ≤ f(x) near c.
- f has a **global (absolute) maximum** at c if f(c) ≥ f(x) for **every** x in the domain; similarly for a global minimum.

A global extremum in the interior of the domain is also a local one, but a function can have several local extrema and only one global value (or none, like eˣ on ℝ).

## Critical points

**Fermat's theorem.** If f has a local extremum at an interior point c and f is differentiable at c, then **f′(c) = 0**.

So candidates for local extrema are the **critical points**: points where f′(c) = 0, or where f′(c) does not exist (|x| has its minimum at 0, where there is no derivative). Not every critical point is an extremum: f(x) = x³ has f′(0) = 0 but keeps increasing through 0.

## The first derivative test

Look at the sign of f′ on each side of a critical point c:

- f′ changes from **+ to −**: local **maximum**.
- f′ changes from **− to +**: local **minimum**.
- f′ does not change sign: **neither** (x³ at 0).

## The second derivative test

If f′(c) = 0:

- **f″(c) > 0**: local **minimum** (the graph curves upward, like a cup).
- **f″(c) < 0**: local **maximum** (the graph curves downward, like a cap).
- **f″(c) = 0**: the test is **inconclusive**. Use the first derivative test or higher derivatives: x⁴ (minimum), −x⁴ (maximum) and x³ (neither) all have f′(0) = f″(0) = 0.

**Higher-order test.** If the first non-zero derivative at c is f⁽ⁿ⁾(c): when n is even, c is a minimum if f⁽ⁿ⁾(c) > 0 and a maximum if < 0; when n is odd, c is not an extremum.

**Example.** f(x) = x³ − 6x² + 9x + 1.

- f′(x) = 3x² − 12x + 9 = 3(x − 1)(x − 3), so the critical points are x = 1 and x = 3.
- f″(x) = 6x − 12: f″(1) = −6 < 0, so **x = 1 is a local maximum** with f(1) = 5; f″(3) = 6 > 0, so **x = 3 is a local minimum** with f(3) = 1.

## Global extrema on a closed interval

For a continuous f on [a, b], the extreme value theorem guarantees a global maximum and minimum. To find them (the **closed interval method**):

1. Find the critical points in (a, b).
2. Evaluate f at those points **and at the endpoints a and b**.
3. The largest value is the global maximum, the smallest is the global minimum.

**Example.** The same f on [0, 5]: f(0) = 1, f(1) = 5, f(3) = 1, f(5) = 125 − 150 + 45 + 1 = 21. The global maximum is **21 at x = 5** (an endpoint, not the local maximum at 1), and the global minimum is **1**, reached at both x = 0 and x = 3.

## Convex functions

f is **convex** on an interval if the chord between any two points of its graph lies on or above the graph:

f(tx + (1 − t)y) ≤ t f(x) + (1 − t) f(y) for all t in [0, 1].

For a twice-differentiable f, convex ⟺ **f″(x) ≥ 0** everywhere. Examples: x², eˣ, |x|, −ln x (for x > 0), and the losses of linear and logistic regression.

**Why convexity matters**: for a convex function, **every local minimum is a global minimum**, and a point with f′(c) = 0 is automatically a global minimum. That is why convex losses can be minimised reliably by gradient descent, and why neural network training (non-convex) is harder. Sums of convex functions and positive multiples of them are convex.

```python
f = lambda x: x ** 3 - 6 * x ** 2 + 9 * x + 1
df = lambda x: 3 * x ** 2 - 12 * x + 9
d2f = lambda x: 6 * x - 12

crit = sorted({round(r, 9) for r in [(12 - (144 - 108) ** 0.5) / 6, (12 + (144 - 108) ** 0.5) / 6]})
for c in crit:
    kind = "local max" if d2f(c) < 0 else "local min" if d2f(c) > 0 else "test fails"
    print(f"critical point x = {c:g}: f = {f(c):g}, f'' = {d2f(c):g} -> {kind}")

a, b = 0, 5
candidates = [a, b] + [c for c in crit if a < c < b]
values = {x: f(x) for x in candidates}
print("values at candidates:", {x: round(v, 6) for x, v in sorted(values.items())})
print("global max on [0, 5]:", max(values.values()), " global min:", min(values.values()))

# A brute-force scan agrees
xs = [a + (b - a) * i / 100000 for i in range(100001)]
print(f"scan: max {max(map(f, xs)):.4f}, min {min(map(f, xs)):.4f}")
```
```output
critical point x = 1: f = 5, f'' = -6 -> local max
critical point x = 3: f = 1, f'' = 6 -> local min
values at candidates: {0: 1, 1.0: 5.0, 3.0: 1.0, 5: 21}
global max on [0, 5]: 21  global min: 1
scan: max 21.0000, min 1.0000
```

## Practice questions

```quiz
q: What is the local maximum value of f(x) = −x² + 6x − 5?
answer: 4
verify: -3 ** 2 + 6 * 3 - 5
explain: f′(x) = −2x + 6 = 0 at x = 3, and f″ = −2 < 0, so it is a maximum: f(3) = −9 + 18 − 5 = 4.
```

```quiz
q: What is the absolute minimum value of f(x) = x³ − 3x on the interval [0, 2]?
answer: -2
verify: min((x / 10000) ** 3 - 3 * (x / 10000) for x in range(0, 20001))
explain: f′(x) = 3x² − 3 = 0 at x = 1 (x = −1 is outside the interval). f(0) = 0, f(1) = −2, f(2) = 8 − 6 = 2. The minimum is −2.
```

```quiz
q: How many local extrema does f(x) = x⁴ − 2x² have?
answer: 3
verify:
  f = lambda x: x ** 4 - 2 * x ** 2
  xs = [i / 1000 for i in range(-3000, 3001)]
  print(sum(1 for i in range(1, len(xs) - 1) if (f(xs[i]) - f(xs[i - 1])) * (f(xs[i + 1]) - f(xs[i])) < 0))
explain: f′(x) = 4x³ − 4x = 4x(x − 1)(x + 1), so the critical points are −1, 0 and 1. f″(x) = 12x² − 4 gives f″(±1) = 8 > 0 (minima) and f″(0) = −4 < 0 (maximum). That is 3 local extrema.
```

```quiz
q: f(x) = x⁵. At x = 0, f′(0) = f″(0) = f‴(0) = f⁗(0) = 0 and f⁽⁵⁾(0) = 120. What kind of point is x = 0?
- A local minimum
- A local maximum
* Neither a minimum nor a maximum
- A global minimum
explain: The first non-zero derivative has odd order (5), so x = 0 is not an extremum. Indeed x⁵ is negative for x < 0 and positive for x > 0.
```

```quiz
q: Which of these functions are **convex** on their whole domain? (Select all that apply.)
* f(x) = eˣ
* f(x) = x² + |x|
- f(x) = sin x
- f(x) = ln x
explain: eˣ has f″ = eˣ > 0. x² and |x| are convex, and so is their sum. sin x changes concavity. ln x has f″ = −1/x² < 0: it is concave.
```
