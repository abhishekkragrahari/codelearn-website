---
title: GATE EC Formula Sheet for Quick Revision
chapter: Exam Prep
description: GATE Electronics and Communication formulas on one page: networks, signals, devices, analog and digital circuits, control, communications and EM waves.
---
The formulas that GATE Electronics and Communication numerical questions use most, subject by subject. Use this page for revision after studying each lesson.

## Networks

| Formula | Meaning |
| --- | --- |
| τ = RC or L/R | Time constant |
| ω₀ = 1/√(LC); series Q = ω₀L/R; bandwidth = ω₀/Q | Resonance |
| Maximum power transfer: Z_L = Z_th* | Load matching |
| Two-port: V₁ = z₁₁I₁ + z₁₂I₂, V₂ = z₂₁I₁ + z₂₂I₂ | Z parameters |

See [Networks](networks.html).

## Signals and systems

| Formula | Meaning |
| --- | --- |
| f_s ≥ 2 f_max | Nyquist rate |
| DFT of N points: N² multiplications directly, (N/2) log₂ N with FFT | Computation |
| Parseval: energy = ∫ x(t)² dt = (1/2π) ∫ (magnitude of X(jω))² dω | Energy in time and frequency (real x) |

See [Signals and systems](signals-systems.html).

## Electronic devices

| Formula | Meaning |
| --- | --- |
| V_T = kT/q ≈ 26 mV at 300 K | Thermal voltage |
| I = I_s(e^(V/(ηV_T)) − 1) | Diode equation |
| σ = q(nμ_n + pμ_p) | Conductivity of a semiconductor |
| n p = n_i² | Mass-action law |

See [Electronic devices](electronic-devices.html).

## Analog circuits

| Formula | Meaning |
| --- | --- |
| g_m = I_C/V_T (BJT) | Transconductance |
| I_D = (k/2)(V_GS − V_T)² | MOSFET in saturation (square law) |
| Inverting gain −R_f/R₁; non-inverting 1 + R_f/R₁ | Op-amp amplifiers |
| Gain–bandwidth product = constant | Op-amp frequency response |

See [Analog circuits](analog-circuits.html).

## Digital circuits

| Formula | Meaning |
| --- | --- |
| n-bit 2's complement: −2^(n−1) to 2^(n−1) − 1 | Number range |
| Mod-N counter: ⌈log₂ N⌉ flip-flops | Counters |
| 2ⁿ:1 multiplexer has n select lines | Multiplexers |
| n-bit DAC resolution = V_ref/(2ⁿ − 1) or V_ref/2ⁿ (by convention) | Data converters |

See [Digital circuits](digital-circuits.html).

## Control systems

| Formula | Meaning |
| --- | --- |
| T(s) = G/(1 + GH) | Closed loop |
| M_p = e^(−πζ/√(1 − ζ²)), t_s ≈ 4/(ζω_n) | Second-order step response |
| Routh: number of sign changes in the first column = number of right-half-plane poles | Stability test |

See [Control systems](control-systems.html).

## Communications

| Formula | Meaning |
| --- | --- |
| AM: P_t = P_c(1 + μ²/2) | Total power with modulation index μ |
| Carson's rule: B = 2(Δf + f_m) | FM bandwidth |
| C = B log₂(1 + SNR) | Shannon capacity |
| PCM bit rate = n × f_s | n bits per sample |
| H = −Σ p log₂ p | Entropy of a source |

See [Communications](communications.html).

## Electromagnetics

| Formula | Meaning |
| --- | --- |
| v = 1/√(με), η₀ ≈ 377 Ω | Wave speed and free-space impedance |
| Γ = (Z_L − Z₀)/(Z_L + Z₀), VSWR = (1 + ρ)/(1 − ρ), ρ = magnitude of Γ | Transmission lines |
| δ = 1/√(πfμσ) | Skin depth |
| Rectangular waveguide TE₁₀: f_c = c/(2a) | Cutoff frequency |

See [Electromagnetics](electromagnetics.html).

## Check yourself

```quiz
q: A channel has bandwidth 3 kHz and SNR 15 (linear). What is its Shannon capacity in kbit/s?
answer: 12
verify: 3 * __import__("math").log2(1 + 15)
explain: C = 3 × log₂ 16 = 3 × 4 = 12 kbit/s.
```

```quiz
q: An FM signal has frequency deviation 75 kHz and message frequency 15 kHz. What is its bandwidth by Carson's rule in kHz?
answer: 180
verify: 2 * (75 + 15)
explain: B = 2(75 + 15) = 180 kHz.
```

```quiz
q: A line with Z₀ = 50 Ω is terminated in 150 Ω. What is the VSWR?
answer: 3
verify: round((1 + (150 - 50) / (150 + 50)) / (1 - (150 - 50) / (150 + 50)), 6)
explain: Γ = 100/200 = 0.5; VSWR = 1.5/0.5 = 3.
```

```quiz
q: A source emits four symbols with equal probability. What is its entropy in bits per symbol?
answer: 2
verify: -4 * 0.25 * __import__("math").log2(0.25)
explain: H = log₂ 4 = 2 bits.
```

```quiz
q: An AM carrier of 100 W is modulated with μ = 1. What is the total transmitted power in W?
answer: 150
verify: 100 * (1 + 1 ** 2 / 2)
explain: P_t = 100(1 + 0.5) = 150 W.
```
