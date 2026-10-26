---
title: Functions, Limits, Continuity and Differentiability
chapter: Single-Variable Calculus
description: Functions of a single variable, limits and one-sided limits, standard limits, indeterminate forms and L'Hôpital's rule, continuity and types of discontinuity, and differentiability (with |x| as the classic counterexample), for GATE DA.
---
Calculus studies how functions change. Machine learning uses it everywhere: training a model means finding the minimum of a loss function, and that needs derivatives. This lesson builds the foundation: limits, continuity and differentiability.

## Functions

A **function** f assigns to each x in its **domain** exactly one value f(x). Common facts GATE uses:

- **Domain restrictions**: √g(x) needs g(x) ≥ 0; ln g(x) needs g(x) > 0; 1/g(x) needs g(x) ≠ 0.
- **Even** functions satisfy f(−x) = f(x) (x², cos x, |x|); **odd** functions satisfy f(−x) = −f(x) (x³, sin x).
- A function is **increasing** on an interval if x₁ < x₂ ⇒ f(x₁) ≤ f(x₂), and strictly increasing with <.
- **Composition**: (f ∘ g)(x) = f(g(x)).

## Limits

lim<sub>x→a</sub> f(x) = L means f(x) gets arbitrarily close to L as x gets close to a (without being equal to a). The value f(a) itself, or whether it exists, does not matter.

- **One-sided limits**: lim<sub>x→a⁻</sub> (from the left) and lim<sub>x→a⁺</sub> (from the right). The two-sided limit exists **if and only if both one-sided limits exist and are equal**.
- Limits respect sums, products, quotients (when the denominator's limit is not 0) and continuous functions.

**Standard limits** (worth memorising):

| Limit | Value |
| --- | --- |
| lim<sub>x→0</sub> sin x / x | 1 |
| lim<sub>x→0</sub> (1 − cos x) / x² | 1/2 |
| lim<sub>x→0</sub> (eˣ − 1) / x | 1 |
| lim<sub>x→0</sub> ln(1 + x) / x | 1 |
| lim<sub>x→0</sub> (1 + x)^(1/x) | e |
| lim<sub>x→∞</sub> (1 + a/x)ˣ | eᵃ |
| lim<sub>x→a</sub> (xⁿ − aⁿ)/(x − a) | naⁿ⁻¹ |
| lim<sub>x→∞</sub> xⁿ/eˣ | 0 (exponentials beat powers) |
| lim<sub>x→∞</sub> (ln x)/xⁿ, n > 0 | 0 (powers beat logarithms) |

**Example.** lim<sub>x→2</sub> (x² − 4)/(x − 2): at x = 2 this is 0/0, but for x ≠ 2 the fraction equals x + 2, so the limit is **4**.

**Limits at infinity of rational functions.** Divide by the highest power of x in the denominator. If the degrees are equal, the limit is the ratio of the leading coefficients: lim<sub>x→∞</sub> (3x² + 1)/(5x² − x) = 3/5.

## Indeterminate forms and L'Hôpital's rule

The forms **0/0, ∞/∞, 0·∞, ∞ − ∞, 0⁰, 1^∞ and ∞⁰** are **indeterminate**: the limit could be anything and must be worked out.

**L'Hôpital's rule.** If lim f(x)/g(x) has the form 0/0 or ∞/∞, then

**lim f(x)/g(x) = lim f′(x)/g′(x)**, provided the right-hand limit exists.

Apply it repeatedly if needed. Other forms are rewritten first:

- 0 · ∞: write f · g as f/(1/g).
- 1^∞, 0⁰, ∞⁰: take logarithms. If y = f^g, then ln y = g ln f; find that limit L, and the answer is e^L.

**Examples.**

- lim<sub>x→0</sub> (eˣ − 1 − x)/x² = lim (eˣ − 1)/(2x) = lim eˣ/2 = **1/2**.
- lim<sub>x→0⁺</sub> x ln x = lim (ln x)/(1/x) = lim (1/x)/(−1/x²) = lim (−x) = **0**.
- lim<sub>x→∞</sub> (1 + 2/x)ˣ: ln y = x ln(1 + 2/x) → 2, so the limit is **e²**.

## Continuity

f is **continuous at a** if all three hold:

1. f(a) is defined,
2. lim<sub>x→a</sub> f(x) exists,
3. lim<sub>x→a</sub> f(x) = f(a).

Polynomials, eˣ, sin x and cos x are continuous everywhere; rational functions, ln x and √x are continuous on their domains. Sums, products, quotients (where defined) and compositions of continuous functions are continuous.

**Types of discontinuity:**

- **Removable**: the limit exists but differs from f(a) (or f(a) is undefined). Redefining f(a) fixes it.
- **Jump**: the one-sided limits exist but differ (a step function).
- **Infinite**: the function blows up, like 1/x at 0.
- **Oscillating**: no limit at all, like sin(1/x) at 0.

**Intermediate value theorem.** If f is continuous on [a, b] and k lies between f(a) and f(b), then f(c) = k for some c in [a, b]. In particular, if f(a) and f(b) have opposite signs, f has a root in between: this is why the **bisection method** works.

**Extreme value theorem.** A continuous function on a **closed, bounded** interval [a, b] attains a maximum and a minimum there.

## Differentiability

The **derivative** of f at a is

**f′(a) = lim<sub>h→0</sub> (f(a + h) − f(a)) / h**

if the limit exists. It is the slope of the tangent line, or the instantaneous rate of change.

- **Differentiable ⇒ continuous**, but **not the other way round**.
- The classic counterexample is **f(x) = |x| at x = 0**: it is continuous, but the left derivative is −1 and the right derivative is +1. A **corner** (or a cusp, or a vertical tangent) means no derivative.
- At a boundary between two formulas, check that the function values match (continuity) **and** that the left and right derivatives match.

**Example.** For which a and b is f(x) = x² for x ≤ 1, and ax + b for x > 1, differentiable at 1? Continuity: 1 = a + b. Matching slopes: 2x at 1 is 2, so a = 2. Then b = −1.

```python
import math

def limit(f, a, side=0, steps=(1e-2, 1e-4, 1e-6)):
    return [round(f(a + side * h if side else a + h), 6) for h in steps]

print("sin x / x near 0:", limit(lambda x: math.sin(x) / x, 0))
print("(1 - cos x)/x^2 near 0:", limit(lambda x: (1 - math.cos(x)) / x ** 2, 0, steps=(1e-1, 1e-2, 1e-3)))
print("(e^x - 1 - x)/x^2 near 0:", limit(lambda x: (math.exp(x) - 1 - x) / x ** 2, 0, steps=(1e-1, 1e-2, 1e-3)))
print("x ln x as x -> 0+:", limit(lambda x: x * math.log(x), 0, side=1))
print("(1 + 2/x)^x for large x:", [round((1 + 2 / x) ** x, 4) for x in (10, 1000, 100000)], " e^2 =", round(math.e ** 2, 4))

# |x| at 0: one-sided difference quotients disagree
for h in (0.1, 0.001):
    print(f"h = {h}: right quotient {(abs(h) - 0) / h:+.1f}, left quotient {(abs(-h) - 0) / -h:+.1f}")
```
```output
sin x / x near 0: [0.999983, 1.0, 1.0]
(1 - cos x)/x^2 near 0: [0.499583, 0.499996, 0.5]
(e^x - 1 - x)/x^2 near 0: [0.517092, 0.501671, 0.500167]
x ln x as x -> 0+: [-0.046052, -0.000921, -1.4e-05]
(1 + 2/x)^x for large x: [6.1917, 7.3743, 7.3889]  e^2 = 7.3891
h = 0.1: right quotient +1.0, left quotient -1.0
h = 0.001: right quotient +1.0, left quotient -1.0
```

## Practice questions

```quiz
q: What is lim<sub>x→3</sub> (x² − 9)/(x − 3)?
answer: 6
verify: round((3.000001 ** 2 - 9) / 0.000001, 3)
explain: For x ≠ 3, (x² − 9)/(x − 3) = x + 3, so the limit is 3 + 3 = 6.
```

```quiz
q: What is lim<sub>x→0</sub> (1 − cos 4x)/x²?
answer: 8
verify: round((1 - __import__("math").cos(4 * 1e-4)) / 1e-8, 3)
explain: Using (1 − cos u)/u² → 1/2 with u = 4x: (1 − cos 4x)/x² = 16 × (1 − cos 4x)/(4x)² → 16 × 1/2 = 8.
```

```quiz
q: What is lim<sub>x→∞</sub> (1 + 3/x)^(2x)? Give the answer to two decimal places.
answer: 403.43
verify: round(__import__("math").exp(6), 2)
explain: ln y = 2x ln(1 + 3/x) → 2 × 3 = 6, so the limit is e⁶ ≈ 403.43.
```

```quiz
q: f(x) = (x² − 1)/(x − 1) for x ≠ 1, and f(1) = k. For which k is f continuous at x = 1?
answer: 2
verify: 1 + 1
explain: For x ≠ 1, f(x) = x + 1, which tends to 2. Continuity needs f(1) = 2, so k = 2. Any other k gives a removable discontinuity.
```

```quiz
q: f(x) = x² for x ≤ 2 and f(x) = ax + b for x > 2 is differentiable at x = 2. What is b?
answer: -4
verify:
  a = 2 * 2
  print(2 ** 2 - a * 2)
explain: Matching derivatives: 2x at x = 2 gives a = 4. Matching values: 4 = 2a + b = 8 + b, so b = −4.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* Every differentiable function is continuous
- Every continuous function is differentiable
* f(x) = |x − 2| is continuous but not differentiable at x = 2
* A continuous function on [a, b] with f(a) < 0 < f(b) has a root in (a, b)
explain: Differentiability implies continuity, not the reverse: |x − 2| has a corner at 2, with one-sided derivatives −1 and +1. The last statement is the intermediate value theorem.
```
