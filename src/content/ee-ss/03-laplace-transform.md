---
title: Laplace Transform and System Analysis
chapter: Transforms
description: Laplace transform pairs and properties, region of convergence, inverse by partial fractions, initial and final value theorems, transfer functions, poles and zeros, and stability.
---
The **Laplace transform** extends the Fourier transform to signals that grow or start at t = 0. It turns differential equations into algebra and is the main tool for circuits and control.

## Definition

**X(s) = ∫₀^∞ x(t) e^(−st) dt** (unilateral), s = σ + jω. The **region of convergence (ROC)** is where the integral converges; for right-sided signals it is to the right of the rightmost pole.

## Common pairs

| x(t) (for t ≥ 0) | X(s) |
| --- | --- |
| δ(t) | 1 |
| u(t) | 1/s |
| t u(t) | 1/s² |
| tⁿ | n!/sⁿ⁺¹ |
| e^(−at) | 1/(s + a) |
| t e^(−at) | 1/(s + a)² |
| sin ωt | ω/(s² + ω²) |
| cos ωt | s/(s² + ω²) |
| e^(−at) sin ωt | ω/((s + a)² + ω²) |

## Properties

- Time shift: x(t − t₀)u(t − t₀) → e^(−st₀) X(s).
- Frequency shift: e^(−at) x(t) → X(s + a).
- Differentiation: dx/dt → sX(s) − x(0⁻). Integration: ∫x dt → X(s)/s.
- Convolution in time → product X(s)H(s).
- **Initial value theorem:** x(0⁺) = lim_{s→∞} s X(s).
- **Final value theorem:** x(∞) = lim_{s→0} s X(s), valid only if all poles of sX(s) are in the left half-plane.

## Inverse transform

Use **partial fractions**: write X(s) = Σ A_i/(s + p_i), with A_i = (s + p_i)X(s) evaluated at s = −p_i, and invert term by term. Repeated and complex poles give t e^(−at) and damped sinusoid terms.

## Transfer functions

H(s) = Y(s)/X(s) with zero initial conditions = Laplace transform of h(t).

- **Poles** (roots of the denominator) set the natural response; **zeros** shape it.
- A causal system is **stable** if all poles have **negative real parts** (left half s-plane). Poles on the jω axis (simple) → marginally stable.

## Worked example

X(s) = 5/(s(s + 5)).

- Partial fractions: 1/s − 1/(s + 5), so x(t) = (1 − e^(−5t)) u(t).
- Final value: lim s × 5/(s(s + 5)) = **1**; initial value 0.

## Practice

```quiz
q: What is the final value of x(t) if X(s) = 10/(s(s + 2))?
answer: 5
verify: 10 / 2
explain: x(∞) = lim s × 10/(s(s + 2)) as s → 0 = 10/2 = 5.
```

```quiz
q: What is the initial value x(0⁺) if X(s) = (3s + 1)/(s² + 4s + 5)?
answer: 3
verify: 3
explain: x(0⁺) = lim s(3s + 1)/(s² + 4s + 5) as s → ∞ = 3.
```

```quiz
q: The inverse Laplace transform of 1/((s + 1)(s + 2)) is:
* e^(−t) − e^(−2t)
- e^(−t) + e^(−2t)
- t e^(−t)
- e^(−2t) − e^(−t)
explain: Partial fractions: 1/(s + 1) − 1/(s + 2), giving e^(−t) − e^(−2t).
```

```quiz
q: A causal LTI system has poles at −1, −3 and +2. It is:
- Stable
* Unstable
- Marginally stable
- Stable for step inputs only
explain: The pole at +2 lies in the right half-plane, so the response grows without bound.
```
