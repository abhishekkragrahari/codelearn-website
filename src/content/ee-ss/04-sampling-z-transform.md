---
title: Sampling, Z-Transform and DFT
chapter: Transforms
description: Sampling theorem, aliasing and reconstruction, z-transform pairs, ROC and stability, discrete-time transfer functions, the DFT and FFT, and digital filters.
---
Digital systems work on **samples** of signals. The sampling theorem says when nothing is lost; the **z-transform** plays the role of the Laplace transform for sequences.

## Sampling theorem

A signal band-limited to f_max can be recovered exactly from samples taken at **f_s ≥ 2 f_max** (the **Nyquist rate**).

- Sampling makes the spectrum repeat every f_s. If f_s < 2f_max, the copies overlap: **aliasing**. An anti-aliasing low-pass filter is used before sampling.
- A frequency f₀ sampled at f_s appears at |f₀ − k f_s| (folded into 0 to f_s/2).
- Reconstruction with an ideal low-pass filter (sinc interpolation); practical systems use a zero-order hold.

## Z-transform

**X(z) = Σ x[n] z⁻ⁿ**

| x[n] | X(z) | ROC |
| --- | --- | --- |
| δ[n] | 1 | All z |
| u[n] | z/(z − 1) | \|z\| > 1 |
| aⁿ u[n] | z/(z − a) | \|z\| > \|a\| |
| −aⁿ u[−n − 1] | z/(z − a) | \|z\| < \|a\| |
| n aⁿ u[n] | az/(z − a)² | \|z\| > \|a\| |

- Shift: x[n − k] → z⁻ᵏ X(z). Convolution → product.
- **Causal** sequences have ROCs outside the outermost pole.
- A causal LTI system is **stable** if all poles lie **inside the unit circle** (the ROC then contains |z| = 1).
- Final value: x[∞] = lim_{z→1} (z − 1) X(z).

## Discrete Fourier transform

**X[k] = Σ_{n=0}^{N−1} x[n] e^(−j2πkn/N)**, k = 0 … N − 1.

- X[0] = Σ x[n]. Frequency resolution = f_s/N.
- Direct DFT needs N² complex multiplications; a radix-2 **FFT** needs (N/2) log₂ N.
- Circular convolution in time ↔ multiplication of DFTs. To get linear convolution of lengths L and M by DFT, use N ≥ L + M − 1.

## Digital filters

- **FIR:** finite impulse response, always stable, can have exactly linear phase.
- **IIR:** feedback (poles), fewer coefficients, may be unstable; designed from analog prototypes (bilinear transform).

## Worked example

A 7 kHz tone is sampled at 10 kHz.

- It appears at |7 − 10| = **3 kHz** (aliased).

## Practice

```quiz
q: A signal contains 2 kHz and 5 kHz components. What is the Nyquist rate in kHz?
answer: 10
verify: 2 * 5
explain: f_s = 2 × highest frequency = 10 kHz.
```

```quiz
q: A 512-point DFT is computed with a sampling rate of 8 kHz. What is the frequency resolution in Hz?
answer: 15.625
verify: 8000 / 512
explain: Δf = f_s/N = 8000/512 = 15.625 Hz.
```

```quiz
q: x[n] = (0.5)ⁿ u[n]. What is X(z) at z = 1?
answer: 2
verify: 1 / (1 - 0.5)
explain: X(z) = z/(z − 0.5); at z = 1 it is 1/0.5 = 2 (the sum of the sequence).
```

```quiz
q: A causal system has H(z) = 1/(1 − 1.2z⁻¹). It is:
- Stable
* Unstable
- Marginally stable
- FIR
explain: The pole at z = 1.2 lies outside the unit circle.
```

```quiz
q: A signal band-limited to 3.4 kHz is sampled. What is the Nyquist rate in kHz?
answer: 6.8
verify: round(2 * 3.4, 6)
explain: f_s = 2 × 3.4 = 6.8 kHz.
```

```quiz
q: A 9 kHz tone is sampled at 12 kHz. At what frequency (kHz) does it appear?
answer: 3
verify: abs(9 - 12)
explain: It aliases to |9 − 12| = 3 kHz.
```
