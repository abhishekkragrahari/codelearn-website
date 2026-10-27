---
title: Fourier Series and Fourier Transform
chapter: Frequency Domain
description: Trigonometric and exponential Fourier series, Dirichlet conditions, symmetry, Parseval's theorem, the Fourier transform and its properties, standard pairs, and frequency response of LTI systems.
---
Fourier analysis breaks a signal into sinusoids. Periodic signals have a **Fourier series** (discrete frequencies); aperiodic signals have a **Fourier transform** (continuous spectrum).

## Fourier series

For a periodic signal with period T₀ (ω₀ = 2π/T₀):

**x(t) = Σ c_k e^(jkω₀t)**, with **c_k = (1/T₀) ∫ x(t) e^(−jkω₀t) dt**.

Trigonometric form: a₀ + Σ (a_k cos kω₀t + b_k sin kω₀t).

**Symmetry shortcuts:**

- Even signal → only cosine terms (b_k = 0).
- Odd signal → only sine terms (a₀ = a_k = 0).
- **Half-wave symmetry** x(t ± T/2) = −x(t) → only **odd harmonics**.

**Square wave** (±A, even): x(t) = (4A/π)[cos ω₀t − (1/3) cos 3ω₀t + (1/5) cos 5ω₀t − …].

**Parseval:** average power = Σ |c_k|².

## Fourier transform

**X(ω) = ∫ x(t) e^(−jωt) dt**; inverse x(t) = (1/2π) ∫ X(ω) e^(jωt) dω.

| Signal | Transform |
| --- | --- |
| δ(t) | 1 |
| 1 | 2π δ(ω) |
| e^(−at) u(t), a > 0 | 1/(a + jω) |
| Rectangular pulse, height 1, width τ | τ sinc(ωτ/2π) = τ sin(ωτ/2)/(ωτ/2) |
| cos ω₀t | π[δ(ω − ω₀) + δ(ω + ω₀)] |
| e^(−a\|t\|) | 2a/(a² + ω²) |

**Properties:** linearity; time shift → multiply by e^(−jωt₀); scaling x(at) → (1/|a|) X(ω/a); **convolution in time ↔ multiplication in frequency**; multiplication in time ↔ (1/2π) convolution in frequency; differentiation → jω X(ω); duality; **Parseval:** ∫|x|²dt = (1/2π)∫|X|²dω.

## Frequency response

For an LTI system, **H(jω)** = Fourier transform of h(t). An input e^(jωt) gives output H(jω) e^(jωt): sinusoids pass through scaled by |H| and shifted by ∠H.

- **Distortionless transmission:** H(jω) = K e^(−jωt_d) (constant gain, linear phase).
- Ideal filters (low-pass, high-pass, band-pass) are non-causal.

## Worked example

A rectangular pulse of height 2 and width 0.5 s.

- X(0) = area = 2 × 0.5 = **1**. The first zero of the spectrum is at f = 1/τ = **2 Hz**.

## Practice

```quiz
q: A square wave of amplitude ±1 has a fundamental Fourier coefficient 4/π. What is the amplitude of its 3rd harmonic? (Give 4 decimal places.)
answer: 0.4244
verify: round(4 / (3 * __import__("math").pi), 4)
explain: The kth harmonic of the square wave has amplitude 4/(kπ): 4/(3π) = 0.4244.
```

```quiz
q: x(t) = e^(−2t)u(t). What is |X(jω)| at ω = 2? (Give 4 decimal places.)
answer: 0.3536
verify: round(1 / (2 ** 2 + 2 ** 2) ** 0.5, 4)
explain: X = 1/(2 + jω); at ω = 2, |X| = 1/√8 = 0.3536.
```

```quiz
q: A signal with half-wave symmetry contains:
* Only odd harmonics
- Only even harmonics
- Only a DC term
- All harmonics
explain: x(t ± T/2) = −x(t) cancels the DC term and all even harmonics.
```

```quiz
q: Multiplication of two signals in the time domain corresponds to which operation in the frequency domain?
- Multiplication
* Convolution (scaled by 1/2π)
- Addition
- Differentiation
explain: The modulation (multiplication) property: x(t)y(t) ↔ (1/2π) X(ω) * Y(ω).
```
