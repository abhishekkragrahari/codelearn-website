---
title: Random Processes and Noise
chapter: Foundations
description: Random variables and processes, mean and autocorrelation, stationarity and ergodicity, power spectral density, white noise through LTI systems, thermal noise, noise figure and noise temperature.
---
Communication signals are received with **noise**. Describing both the message and the noise as random processes lets us predict the performance of a system.

## Random processes

A random process X(t) is a family of random signals.

- **Mean** μ_X(t) = E[X(t)]; **autocorrelation** R_X(t₁, t₂) = E[X(t₁)X(t₂)].
- **Wide-sense stationary (WSS):** constant mean, and R_X depends only on τ = t₁ − t₂.
- **Ergodic:** time averages equal ensemble averages.
- R_X(0) = E[X²] = average power; R_X(τ) is even and maximum at τ = 0.

## Power spectral density

**Wiener–Khinchin theorem:** the PSD S_X(f) is the Fourier transform of R_X(τ).

- Power = ∫ S_X(f) df = R_X(0).
- Through an LTI system H(f): **S_Y(f) = |H(f)|² S_X(f)**; output mean = H(0) × input mean.

**White noise:** S(f) = N₀/2 for all f; R(τ) = (N₀/2)δ(τ). Through an ideal low-pass filter of bandwidth B, the noise power is **N₀B**.

**Gaussian processes** stay Gaussian through LTI systems.

## Physical noise

- **Thermal (Johnson) noise:** available power **P = kTB**; open-circuit RMS voltage v_n = √(4kTRB). k = 1.38 × 10⁻²³ J/K. At 290 K, kT = −174 dBm/Hz.
- **Shot noise:** i_n² = 2qIB (diodes, transistors).

## Noise figure and temperature

- **Noise figure** F = (SNR_in)/(SNR_out) ≥ 1 (NF in dB = 10 log F).
- **Equivalent noise temperature** T_e = (F − 1)T₀, with T₀ = 290 K.
- **Friis formula** for cascaded stages: **F = F₁ + (F₂ − 1)/G₁ + (F₃ − 1)/(G₁G₂) + …**. The first stage dominates, so receivers use a **low-noise amplifier** first.

## Worked example

Find the thermal noise power in a 1 MHz bandwidth at 290 K.

- P = 1.38 × 10⁻²³ × 290 × 10⁶ = **4.0 × 10⁻¹⁵ W** = −114 dBm.

## Practice

```quiz
q: Two amplifiers are cascaded: the first has F₁ = 2 and gain 10, the second F₂ = 5. What is the overall noise figure (as a ratio)?
answer: 2.4
verify: round(2 + (5 - 1) / 10, 6)
explain: F = F₁ + (F₂ − 1)/G₁ = 2 + 4/10 = 2.4.
```

```quiz
q: An amplifier has a noise figure of 2 (ratio). What is its equivalent noise temperature in K (T₀ = 290 K)?
answer: 290
verify: (2 - 1) * 290
explain: T_e = (F − 1)T₀ = 290 K.
```

```quiz
q: White noise with N₀/2 = 10⁻⁹ W/Hz passes through an ideal low-pass filter of bandwidth 1 kHz. What is the output noise power in µW?
answer: 2
verify: round(2 * 1e-9 * 1000 * 1e6, 6)
explain: Power = N₀B = 2 × 10⁻⁹ × 1000 = 2 × 10⁻⁶ W = 2 µW.
```

```quiz
q: The power spectral density of a WSS process is the Fourier transform of its:
* Autocorrelation function
- Mean
- Probability density function
- Cumulative distribution
explain: Wiener–Khinchin theorem: S_X(f) = F{R_X(τ)}.
```

```quiz
q: An amplifier has a noise figure of 3 dB (ratio about 2). What is its equivalent noise temperature in K (T₀ = 290 K), using F = 2?
answer: 290
verify: (2 - 1) * 290
explain: T_e = (F − 1)T₀ = 290 K.
```

```quiz
q: What is the thermal noise power (W) in a 10 kHz bandwidth at 300 K? (k = 1.38 × 10⁻²³; answer in units of 10⁻¹⁷ W, 2 decimal places.)
answer: 4.14
verify: round(1.38e-23 * 300 * 1e4 / 1e-17, 2)
explain: P = kTB = 1.38 × 10⁻²³ × 300 × 10⁴ = 4.14 × 10⁻¹⁷ W.
```
