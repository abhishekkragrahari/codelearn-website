---
title: GATE EC Mock Test 1 (20 Questions, Free)
chapter: Exam Prep
description: A free GATE Electronics and Communication mock test with 20 original questions on networks, signals, devices, analog, digital, control, communications and EM.
---
This mock test has **20 original GATE-style questions** across the electronics and communication syllabus. Give yourself **60 minutes**, write your answers on paper, then open each question to check. Score +1 per correct answer and −1/3 per wrong MCQ.

> **Note:** All questions are written for GateShala in the GATE style; none is copied from a GATE paper. Every numerical answer is recomputed by a program when the site is built.

## Networks and signals

```quiz
q: A series RLC circuit has R = 10 Ω, L = 1 mH and C = 1 µF. What is its quality factor at resonance?
answer: 3.16
verify: round((1e-3 / 1e-6) ** 0.5 / 10, 2)
explain: Q = (1/R)√(L/C) = (1/10)√1000 ≈ 3.16.
```

```quiz
q: The impulse response of an LTI system is h(t) = e^(−2t) u(t). What is its DC gain H(0)?
answer: 0.5
verify: 1 / 2
explain: H(s) = 1/(s + 2), so H(0) = 1/2.
```

```quiz
q: A 1024-point FFT (radix-2) needs how many complex multiplications, using (N/2) log₂ N?
answer: 5120
verify: 1024 // 2 * 10
explain: (1024/2) × log₂ 1024 = 512 × 10 = 5120.
```

```quiz
q: Which of these systems are linear? (Select all that apply.)
* y(t) = 3x(t)
* y(t) = x(t − 2)
- y(t) = x(t)²
- y(t) = x(t) + 1
explain: Scaling and delay are linear. Squaring is not, and adding a constant breaks additivity (zero input gives non-zero output).
```

## Devices and analog circuits

```quiz
q: A BJT has collector current 2.6 mA and V_T = 26 mV. What is its transconductance in mA/V?
answer: 100
verify: round(2.6 / 0.026, 6)
explain: g_m = I_C/V_T = 2.6 mA/26 mV = 100 mA/V.
```

```quiz
q: A MOSFET in saturation has k = 2 mA/V², V_GS = 3 V and V_T = 1 V. Using I_D = (k/2)(V_GS − V_T)², what is I_D in mA?
answer: 4
verify: 2 / 2 * (3 - 1) ** 2
explain: I_D = 1 × 2² = 4 mA.
```

```quiz
q: An intrinsic semiconductor has n_i = 10¹⁰ cm⁻³. After doping, n = 10¹⁶ cm⁻³. What is the hole concentration in cm⁻³?
answer: 10000
verify: 10 ** 20 // 10 ** 16
explain: p = n_i²/n = 10²⁰/10¹⁶ = 10⁴ cm⁻³.
```

```quiz
q: A non-inverting op-amp amplifier has R_f = 90 kΩ and R₁ = 10 kΩ. What is its gain?
answer: 10
verify: 1 + 90 / 10
explain: Gain = 1 + R_f/R₁ = 1 + 9 = 10.
```

```quiz
q: An op-amp has gain–bandwidth product 1 MHz. What is the bandwidth in kHz when it is used with a closed-loop gain of 20?
answer: 50
verify: 1000 / 20
explain: Bandwidth = GBW/gain = 1000 kHz/20 = 50 kHz.
```

## Digital circuits

```quiz
q: How many flip-flops are needed for a mod-12 counter?
answer: 4
verify: (12 - 1).bit_length()
explain: 2³ = 8 < 12 ≤ 16 = 2⁴: 4 flip-flops.
```

```quiz
q: How many select lines does a 32:1 multiplexer have?
answer: 5
verify: (32).bit_length() - 1
explain: 2⁵ = 32, so 5 select lines.
```

```quiz
q: What is the output of an XOR gate with inputs A and B when A = B?
* 0
- 1
- A
- Depends on A
explain: XOR is 1 only when the inputs differ, so A ⊕ A = 0.
```

## Control systems

```quiz
q: The characteristic equation s³ + 2s² + 3s + 10 = 0 has how many roots in the right half-plane?
answer: 2
verify:
  a = [1, 2, 3, 10]
  b1 = (a[1] * a[2] - a[0] * a[3]) / a[1]
  col = [a[0], a[1], b1, a[3]]
  print(sum(1 for x, y in zip(col, col[1:]) if x * y < 0))
explain: Routh column: 1, 2, (6 − 10)/2 = −2, 10. Two sign changes: two right-half-plane roots.
```

```quiz
q: A unity-feedback system has G(s) = 9/(s(s + 3)). What is the natural frequency ω_n in rad/s of the closed loop?
answer: 3
verify: 9 ** 0.5
explain: Closed loop 9/(s² + 3s + 9): ω_n = 3 rad/s.
```

## Communications

```quiz
q: A voice signal is sampled at 8 kHz with 8 bits per sample. What is the PCM bit rate in kbit/s?
answer: 64
verify: 8 * 8
explain: Bit rate = n × f_s = 8 × 8 = 64 kbit/s.
```

```quiz
q: A source has symbols with probabilities 1/2, 1/4 and 1/4. What is its entropy in bits per symbol?
answer: 1.5
verify: -sum(p * __import__("math").log2(p) for p in [0.5, 0.25, 0.25])
explain: H = 0.5 × 1 + 0.25 × 2 + 0.25 × 2 = 1.5 bits.
```

```quiz
q: In AM with modulation index 0.5, what fraction of the total power is in the sidebands? (Give 3 decimal places.)
answer: 0.111
verify: round((0.5 ** 2 / 2) / (1 + 0.5 ** 2 / 2), 3)
explain: Sideband share = (μ²/2)/(1 + μ²/2) = 0.125/1.125 ≈ 0.111.
```

## Electromagnetics

```quiz
q: A rectangular waveguide has a = 2.5 cm. What is the TE₁₀ cutoff frequency in GHz (c = 3 × 10⁸ m/s)?
answer: 6
verify: round(3e8 / (2 * 0.025) / 1e9, 6)
explain: f_c = c/(2a) = 3 × 10⁸/0.05 = 6 GHz.
```

```quiz
q: A line with Z₀ = 50 Ω is terminated in 50 Ω. The reflection coefficient is:
* 0
- 1
- −1
- 0.5
explain: Γ = (50 − 50)/(50 + 50) = 0: a matched load reflects nothing.
```

```quiz
q: A plane wave travels in a lossless medium with ε_r = 4 and μ_r = 1. What is its speed in units of 10⁸ m/s?
answer: 1.5
verify: 3 / 4 ** 0.5
explain: v = c/√(ε_r μ_r) = 3 × 10⁸/2 = 1.5 × 10⁸ m/s.
```

## Your score

| Score (out of 20) | What it means |
| --- | --- |
| 16 and above | Strong: move to full-length papers |
| 10 – 15 | Revise the subjects where you lost marks |
| Below 10 | Go back to the lessons, then retake after two weeks |

Revise with the [formula sheet](formula-sheet.html) and follow the [study plan](study-plan.html).
