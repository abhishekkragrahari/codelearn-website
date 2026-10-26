---
title: Derivatives, Mean Value Theorem and Taylor Series
chapter: Single-Variable Calculus
description: Rules of differentiation, the chain rule, derivatives of common functions, higher derivatives, Rolle's theorem and the mean value theorem, and Taylor and Maclaurin series with the error of a Taylor approximation, for GATE DA.
---
Once we know what a derivative is, we need to compute them quickly. This lesson collects the rules, the two big theorems about derivatives, and **Taylor series**, which approximate any smooth function by a polynomial. Taylor series are behind gradient descent, Newton's method, and most numerical methods.

## Rules of differentiation

| Rule | Formula |
| --- | --- |
| Constant multiple | (c f)′ = c f′ |
| Sum | (f + g)′ = f′ + g′ |
| Product | (fg)′ = f′g + fg′ |
| Quotient | (f/g)′ = (f′g − fg′)/g² |
| **Chain rule** | (f(g(x)))′ = f′(g(x)) · g′(x) |

Derivatives of common functions:

| f(x) | f′(x) |
| --- | --- |
| xⁿ | nxⁿ⁻¹ |
| eˣ | eˣ |
| aˣ | aˣ ln a |
| ln x | 1/x |
| sin x | cos x |
| cos x | −sin x |
| tan x | sec² x |
| σ(x) = 1/(1 + e^(−x)) | σ(x)(1 − σ(x)) |

**Examples.**

- (x² eˣ)′ = 2x eˣ + x² eˣ = eˣ(x² + 2x) (product rule).
- (ln(x² + 1))′ = 2x/(x² + 1) (chain rule).
- (e^(sin x))′ = cos x · e^(sin x).
- For f(x) = xˣ (x > 0), take logs: ln f = x ln x, so f′/f = ln x + 1 and f′(x) = xˣ(1 + ln x). This **logarithmic differentiation** handles variable exponents.

**Higher derivatives** are derivatives of derivatives: f″ is the rate of change of the slope. f″ > 0 means f is **convex** (curves upward); f″ < 0 means **concave**. A point where the concavity changes is an **inflection point**.

## Rolle's theorem and the mean value theorem

**Rolle's theorem.** If f is continuous on [a, b], differentiable on (a, b), and **f(a) = f(b)**, then f′(c) = 0 for some c in (a, b). Somewhere between two equal values, the graph is flat.

**Mean value theorem (MVT).** If f is continuous on [a, b] and differentiable on (a, b), then for some c in (a, b):

**f′(c) = (f(b) − f(a)) / (b − a)**

At some point the instantaneous slope equals the average slope. Consequences: if f′ = 0 on an interval, f is constant there; if f′ > 0, f is increasing.

**Example.** For f(x) = x² on [1, 3], the average slope is (9 − 1)/2 = 4, and f′(c) = 2c = 4 at **c = 2**.

## Taylor series

If f has derivatives of all orders at a, its **Taylor series** about a is

**f(x) = f(a) + f′(a)(x − a) + f″(a)(x − a)²/2! + f‴(a)(x − a)³/3! + …**

With a = 0 it is called the **Maclaurin series**. Truncating after the (x − a)ⁿ term gives the **Taylor polynomial** of degree n, the best polynomial approximation of f near a.

| Function | Maclaurin series | Valid for |
| --- | --- | --- |
| eˣ | 1 + x + x²/2! + x³/3! + … | all x |
| sin x | x − x³/3! + x⁵/5! − … | all x |
| cos x | 1 − x²/2! + x⁴/4! − … | all x |
| ln(1 + x) | x − x²/2 + x³/3 − … | −1 < x ≤ 1 |
| 1/(1 − x) | 1 + x + x² + x³ + … | \|x\| < 1 |
| (1 + x)ᵏ | 1 + kx + k(k − 1)x²/2! + … | \|x\| < 1 |

Uses:

- **Approximation**: near a, f(x) ≈ f(a) + f′(a)(x − a) (the **linear approximation**, or tangent line). √(4.1) ≈ 2 + (1/4)(0.1) = 2.025 (true value 2.02485).
- **Limits**: (sin x − x)/x³ → −1/6, read straight from the series.
- **Coefficients**: the coefficient of xⁿ in the Maclaurin series is f⁽ⁿ⁾(0)/n!, so derivatives at 0 can be read off a known series. For f(x) = x² eˣ = x² + x³ + x⁴/2 + …, the coefficient of x⁴ is 1/2, so f⁽⁴⁾(0) = 4!/2 = 12.
- **Optimization**: the second-order expansion f(x + h) ≈ f(x) + f′(x)h + f″(x)h²/2 is what Newton's method minimises at each step.

**Error of a Taylor polynomial.** The remainder after the degree-n term is f⁽ⁿ⁺¹⁾(c)(x − a)ⁿ⁺¹/(n + 1)! for some c between a and x (Lagrange's form). For an alternating series with decreasing terms, the error is smaller than the first term left out.

```python
import math

def taylor_exp(x, n):
    return sum(x ** k / math.factorial(k) for k in range(n + 1))

for n in (1, 2, 4, 8):
    approx = taylor_exp(1, n)
    print(f"degree {n}: e ~ {approx:.6f}, error {abs(math.e - approx):.2e}")

print(f"linear approximation sqrt(4.1) ~ {2 + 0.1 / 4:.5f}, true {math.sqrt(4.1):.5f}")
x = 1e-2
print(f"(sin x - x)/x^3 at x = 0.01: {(math.sin(x) - x) / x ** 3:.6f} (series gives -1/6 = {-1 / 6:.6f})")

# Numerical derivatives check the rules
d = lambda f, x, h=1e-6: (f(x + h) - f(x - h)) / (2 * h)
f = lambda x: x ** 2 * math.exp(x)
print(f"d/dx x^2 e^x at 1: numeric {d(f, 1):.5f}, formula e(1 + 2) = {math.e * 3:.5f}")
g = lambda x: x ** x
print(f"d/dx x^x at 2: numeric {d(g, 2):.5f}, formula 4(1 + ln 2) = {4 * (1 + math.log(2)):.5f}")
```
```output
degree 1: e ~ 2.000000, error 7.18e-01
degree 2: e ~ 2.500000, error 2.18e-01
degree 4: e ~ 2.708333, error 9.95e-03
degree 8: e ~ 2.718279, error 3.06e-06
linear approximation sqrt(4.1) ~ 2.02500, true 2.02485
(sin x - x)/x^3 at x = 0.01: -0.166666 (series gives -1/6 = -0.166667)
d/dx x^2 e^x at 1: numeric 8.15485, formula e(1 + 2) = 8.15485
d/dx x^x at 2: numeric 6.77259, formula 4(1 + ln 2) = 6.77259
```

## Practice questions

```quiz
q: f(x) = x³ ln x. What is f′(e)? Give the answer to three decimal places.
answer: 29.556
verify: round(3 * __import__("math").e ** 2 * 1 + __import__("math").e ** 2, 3)
explain: Product rule: f′(x) = 3x² ln x + x³ · (1/x) = 3x² ln x + x². At x = e: 3e² + e² = 4e² ≈ 29.556.
```

```quiz
q: f(x) = e^(x²). What is f″(0)?
answer: 2
verify:
  import math
  h = 1e-4
  f = lambda x: math.exp(x * x)
  print(round((f(h) - 2 * f(0) + f(-h)) / h ** 2, 3))
explain: f′(x) = 2x e^(x²) and f″(x) = 2e^(x²) + 4x² e^(x²). At 0: f″(0) = 2. (From the series e^(x²) = 1 + x² + …, the x² coefficient is 1 = f″(0)/2!.)
```

```quiz
q: By the mean value theorem, f(x) = x³ on [0, 3] has a point c with f′(c) equal to the average slope. What is c? Give the answer to three decimal places.
answer: 1.732
verify: round(3 ** 0.5, 3)
explain: The average slope is (27 − 0)/3 = 9. f′(c) = 3c² = 9 gives c² = 3, so c = √3 ≈ 1.732, which lies in (0, 3).
```

```quiz
q: What is the coefficient of x³ in the Maclaurin series of e^(2x)? Give the answer to four decimal places.
answer: 1.3333
verify: round(2 ** 3 / 6, 4)
explain: e^(2x) = Σ (2x)ⁿ/n!, so the x³ coefficient is 2³/3! = 8/6 ≈ 1.3333.
```

```quiz
q: Using the linear approximation about x = 0, what is the approximate value of ln(1.05)?
answer: 0.05
verify: 0.05
explain: ln(1 + x) ≈ x for small x, so ln(1.05) ≈ 0.05. (The true value is 0.04879; the next term, −x²/2 = −0.00125, accounts for most of the difference.)
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* If f′(x) > 0 on an interval, f is strictly increasing there
* The Maclaurin series of sin x contains only odd powers of x
- Rolle's theorem applies to f(x) = |x| on [−1, 1]
* If f″(x) > 0 everywhere, f is convex
explain: By the MVT, f(x₂) − f(x₁) = f′(c)(x₂ − x₁) > 0. sin is odd, so only odd powers appear. |x| is not differentiable at 0, so Rolle's theorem does not apply (and indeed no c has f′(c) = 0). A positive second derivative means the slope increases: convexity.
```
