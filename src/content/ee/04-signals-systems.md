---
title: Signals and Systems
chapter: Signals and Control
description: GATE EE syllabus for signals and systems, with signal operations, LTI systems and convolution, Fourier series and transforms, the sampling theorem, Laplace and z-transforms, stability, and RMS and average values of periodic waveforms, with solved examples.
---
## Syllabus

Continuous and discrete time signals, shifting and scaling; linear, time-invariant and causal systems; Fourier series of periodic signals; sampling theorem; Fourier transform for continuous and discrete time signals; Laplace and z-transforms; RMS and average values of periodic waveforms.

## Key concepts and formulas

**Systems.** A system is **linear** if it obeys superposition, **time-invariant** if a shifted input gives a shifted output, **causal** if the output depends only on present and past inputs, and **BIBO stable** if every bounded input gives a bounded output (for an LTI system: ∫|h(t)| dt < ∞, or all poles in the left half-plane / inside the unit circle).

**Convolution.** For an LTI system, y(t) = x(t) ∗ h(t) = ∫ x(τ)h(t − τ) dτ, and in the transform domain Y = XH. The length of the convolution of discrete sequences of lengths N and M is N + M − 1.

**Fourier series.** A periodic signal x(t) = Σ c<sub>k</sub> e<sup>jkω₀t</sup>. **Parseval**: average power = Σ |c<sub>k</sub>|². Even signals have only cosine terms; odd signals only sine terms; half-wave symmetry gives only odd harmonics.

**Fourier transform pairs and properties.** A rectangular pulse ↔ a sinc; time shift multiplies by e<sup>−jωt₀</sup>; time scaling x(at) ↔ (1/|a|)X(ω/a); differentiation ↔ jω; convolution ↔ multiplication; duality.

**Sampling theorem.** A signal band-limited to f<sub>m</sub> is recovered from samples taken at **f<sub>s</sub> ≥ 2f<sub>m</sub>** (the Nyquist rate is 2f<sub>m</sub>). Sampling below it causes **aliasing**: a tone at f appears at |f − kf<sub>s</sub>|.

**Laplace and z-transforms.** L{e<sup>−at</sup>u(t)} = 1/(s + a), L{u(t)} = 1/s; Z{aⁿu[n]} = z/(z − a), with ROC |z| > |a|. Initial value theorem x(0⁺) = lim<sub>s→∞</sub> sX(s); final value theorem x(∞) = lim<sub>s→0</sub> sX(s) (if the poles of sX(s) are in the left half-plane).

**RMS and average values.**

| Waveform (peak V<sub>m</sub>) | RMS | Average (full cycle / half-wave rectified) |
| --- | --- | --- |
| Sine | V<sub>m</sub>/√2 | 0 (full cycle); 2V<sub>m</sub>/π over a half cycle |
| Half-wave rectified sine | V<sub>m</sub>/2 | V<sub>m</sub>/π |
| Full-wave rectified sine | V<sub>m</sub>/√2 | 2V<sub>m</sub>/π |
| Square (±V<sub>m</sub>) | V<sub>m</sub> | 0 |
| Triangular / sawtooth | V<sub>m</sub>/√3 | 0 (symmetric) |

The RMS of a sum of a DC value and sinusoids at different frequencies is √(V<sub>dc</sub>² + Σ V<sub>k,rms</sub>²).

## Worked example

Compute the discrete convolution of [1, 2, 3] and [1, 1], check the RMS of a full-wave rectified sine numerically, and find the alias of a 7 kHz tone sampled at 10 kHz.

```python
import math

x, h = [1, 2, 3], [1, 1]
y = [sum(x[k] * h[n - k] for k in range(len(x)) if 0 <= n - k < len(h)) for n in range(len(x) + len(h) - 1)]
print("convolution:", y)
N = 100000
vals = [abs(math.sin(2 * math.pi * i / N)) for i in range(N)]
print(f"full-wave rectified sine: RMS = {math.sqrt(sum(v * v for v in vals) / N):.4f}, average = {sum(vals) / N:.4f}")
print(f"1/sqrt(2) = {1 / math.sqrt(2):.4f}, 2/pi = {2 / math.pi:.4f}")
f, fs = 7000, 10000
print("alias of 7 kHz at fs = 10 kHz:", min(abs(f - k * fs) for k in range(3)), "Hz")
v = (5 ** 2 + (10 / math.sqrt(2)) ** 2) ** 0.5
print(f"RMS of 5 + 10 sin(wt) = {v:.4f}")
```
```output
convolution: [1, 3, 5, 3]
full-wave rectified sine: RMS = 0.7071, average = 0.6366
1/sqrt(2) = 0.7071, 2/pi = 0.6366
alias of 7 kHz at fs = 10 kHz: 3000 Hz
RMS of 5 + 10 sin(wt) = 8.6603
```

## Practice questions

```quiz
q: A signal contains frequencies up to 4 kHz. What is the minimum sampling rate (in kHz) to avoid aliasing?
answer: 8
verify: 2 * 4
explain: The Nyquist rate is 2f<sub>m</sub> = 8 kHz.
```

```quiz
q: What is the RMS value of v(t) = 3 + 4√2 sin(ωt) volts?
answer: 5
verify: round((3 ** 2 + 4 ** 2) ** 0.5, 6)
explain: The sinusoid has RMS 4 V. V<sub>rms</sub> = √(3² + 4²) = 5 V.
```

```quiz
q: Two discrete sequences have lengths 5 and 7. What is the length of their linear convolution?
answer: 11
verify: 5 + 7 - 1
explain: N + M − 1 = 11.
```

```quiz
q: Using the final value theorem, what is lim<sub>t→∞</sub> x(t) for X(s) = 10/(s(s + 5))?
answer: 2
verify: 10 / 5
explain: x(∞) = lim<sub>s→0</sub> sX(s) = 10/5 = 2.
```

```quiz
q: Which systems are **linear and time-invariant**? (Select all that apply.)
* y(t) = 3x(t − 2)
* y(t) = dx/dt
- y(t) = x(t)²
- y(t) = t·x(t)
explain: A scaled, delayed copy and a derivative are both LTI. Squaring is non-linear. Multiplying by t is linear but time-varying.
```
