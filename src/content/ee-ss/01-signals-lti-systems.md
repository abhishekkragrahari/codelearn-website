---
title: Signals, LTI Systems and Convolution
chapter: Time Domain
description: Signal classification, energy and power signals, basic operations, system properties (linearity, time invariance, causality, stability, memory), impulse response and convolution.
---
A **signal** carries information as a function of time; a **system** transforms an input signal into an output. Linear time-invariant (LTI) systems are fully described by one function: the **impulse response**.

## Classifying signals

- **Continuous / discrete** time; **analog / digital** amplitude.
- **Periodic:** x(t + T) = x(t). The sum of two periodic signals is periodic only if the ratio of their periods is rational; the period is the LCM.
- **Even** x(−t) = x(t); **odd** x(−t) = −x(t). Every signal = even part + odd part.
- **Energy signal:** finite energy E = ∫|x|² dt (power 0). **Power signal:** finite non-zero average power (energy infinite), like periodic signals.
- **Operations:** time shift x(t − t₀), scaling x(at), reversal x(−t). For x(at − b), shift by b first, then scale by a.

**Standard signals:** unit impulse δ(t) (∫δ = 1; sifting: ∫x(t)δ(t − t₀)dt = x(t₀)), unit step u(t), ramp, exponential, sinc.

## System properties

| Property | Test |
| --- | --- |
| **Linear** | Additive and homogeneous: a x₁ + b x₂ → a y₁ + b y₂ |
| **Time-invariant** | Shifted input gives the same output, shifted |
| **Causal** | Output depends only on present and past input |
| **Memoryless** | Output depends only on the present input |
| **BIBO stable** | Every bounded input gives a bounded output |
| Invertible | Distinct inputs give distinct outputs |

Examples: y(t) = x(2t) is linear but time-varying; y(t) = x(t) + 1 is not linear; y(t) = x(t + 1) is not causal.

## Convolution

For an LTI system with impulse response h(t):

**y(t) = x(t) * h(t) = ∫ x(τ) h(t − τ) dτ**; discrete: y[n] = Σ x[k] h[n − k].

- **Causal** if h(t) = 0 for t < 0. **Stable** if **∫|h(t)| dt < ∞** (Σ|h[n]| < ∞).
- Convolution is commutative, associative and distributive.
- Length of the discrete convolution of sequences with lengths N and M: **N + M − 1**.
- Convolving with δ(t − t₀) shifts the signal by t₀.

## Worked example

x[n] = {1, 2} and h[n] = {1, 1, 1} (both starting at n = 0).

- y[n] = {1, 3, 3, 2}, length 2 + 3 − 1 = 4.

## Practice

```quiz
q: What is the energy of x(t) = 3 for 0 ≤ t ≤ 2 (and zero elsewhere)?
answer: 18
verify: 3 ** 2 * 2
explain: E = ∫|x|²dt = 9 × 2 = 18.
```

```quiz
q: What is the sum of the output samples when {1, 2, 3} is convolved with {1, −1, 2}?
answer: 12
verify: sum([1, 2, 3]) * sum([1, -1, 2])
explain: The sum of a convolution equals the product of the sums: 6 × 2 = 12.
```

```quiz
q: x(t) = cos(2πt/3) + sin(2πt/4). What is its fundamental period?
answer: 12
verify: __import__("math").lcm(3, 4)
explain: The periods are 3 and 4; their LCM is 12.
```

```quiz
q: The system y(t) = t·x(t) is:
* Linear and time-varying
- Linear and time-invariant
- Non-linear and time-invariant
- Non-causal
explain: Scaling and adding inputs works (linear), but the gain t changes with time, so a shifted input does not give a shifted output.
```
