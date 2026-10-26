---
title: Signals and Systems
chapter: Networks, Signals and Systems
description: GATE EC syllabus for signals and systems, with Fourier series and transform, sampling, DTFT, DFT, z-transform, LTI system properties, convolution, poles and zeros, frequency response, group delay and phase delay, with solved examples.
---
## Syllabus

Continuous-time signals: Fourier series and Fourier transform, sampling theorem and applications. Discrete-time signals: DTFT, DFT, z-transform, discrete-time processing of continuous-time signals. LTI systems: properties, causality, stability, impulse response, convolution, poles and zeros, frequency response, group delay, phase delay.

## Key concepts and formulas

**LTI systems.** y = x ∗ h. Causal if h(t) = 0 for t < 0; BIBO stable if ∫|h| < ∞. A causal continuous system is stable if all poles have negative real parts; a causal discrete system if all poles lie inside the unit circle.

**Fourier transform.** Key pairs: rect ↔ sinc, e<sup>−at</sup>u(t) ↔ 1/(a + jω), δ(t) ↔ 1, a constant ↔ 2πδ(ω). Properties: linearity, time shift (e<sup>−jωt₀</sup>), frequency shift (modulation), time scaling, convolution ↔ product, Parseval's theorem (energy is the same in both domains).

**Sampling.** f<sub>s</sub> ≥ 2f<sub>max</sub>; the spectrum of the sampled signal repeats every f<sub>s</sub>. For a bandpass signal, a lower rate can work (bandpass sampling).

**DTFT and DFT.** The DTFT X(e<sup>jω</sup>) is periodic with period 2π. The N-point DFT samples it at ω = 2πk/N: X[k] = Σ x[n] e<sup>−j2πkn/N</sup>. DFT multiplication corresponds to **circular** convolution; to get linear convolution of lengths L and M, use N ≥ L + M − 1. The FFT needs about (N/2) log₂N complex multiplications instead of N².

**z-transform.** Z{aⁿu[n]} = z/(z − a), ROC |z| > |a|; Z{−aⁿu[−n − 1]} = z/(z − a), ROC |z| < |a|. The ROC never contains poles; a right-sided sequence has an ROC outside its outermost pole.

**Delays.** For H(e<sup>jω</sup>) with phase θ(ω): **group delay τ<sub>g</sub> = −dθ/dω** and phase delay τ<sub>p</sub> = −θ(ω)/ω. A linear-phase system (θ = −αω) delays all frequencies equally, so it does not distort the waveform shape. FIR filters with symmetric coefficients have linear phase.

## Worked example

Compute the 4-point DFT of x = [1, 2, 0, 1], check Parseval's relation for it, and compute the circular convolution of [1, 2, 3, 0] with [1, 1, 0, 0].

```python
import cmath

x = [1, 2, 0, 1]
N = len(x)
X = [sum(x[n] * cmath.exp(-2j * cmath.pi * k * n / N) for n in range(N)) for k in range(N)]
print("DFT:", [complex(round(v.real, 6) + 0.0, round(v.imag, 6) + 0.0) for v in X])
print("energy in time:", sum(v * v for v in x), " energy from DFT:", round(sum(abs(v) ** 2 for v in X) / N, 6))
a, b = [1, 2, 3, 0], [1, 1, 0, 0]
circ = [sum(a[m] * b[(n - m) % 4] for m in range(4)) for n in range(4)]
print("circular convolution:", circ)
```
```output
DFT: [(4+0j), (1-1j), (-2+0j), (1+1j)]
energy in time: 6  energy from DFT: 6.0
circular convolution: [1, 3, 5, 3]
```

## Practice questions

```quiz
q: Two sequences of lengths 6 and 4 are to be linearly convolved using DFTs. What is the minimum DFT length?
answer: 9
verify: 6 + 4 - 1
explain: N ≥ L + M − 1 = 9 avoids time-domain aliasing in the circular convolution.
```

```quiz
q: A system has H(e<sup>jω</sup>) = e<sup>−j3ω</sup>. What is its group delay in samples?
answer: 3
verify: 3
explain: θ(ω) = −3ω, so τ<sub>g</sub> = −dθ/dω = 3 samples. The system is a pure 3-sample delay.
```

```quiz
q: What is the DFT coefficient X[0] of the sequence [2, −1, 3, 4]?
answer: 8
verify: 2 - 1 + 3 + 4
explain: X[0] is the sum of all samples: 2 − 1 + 3 + 4 = 8.
```

```quiz
q: A causal discrete-time LTI system has poles at z = 0.5 and z = −0.9. Is it stable?
* Yes, both poles lie inside the unit circle
- No, because one pole is negative
- No, because a pole is close to the unit circle
- It cannot be decided without the zeros
explain: A causal discrete system is stable when all its poles satisfy |z| < 1. Both 0.5 and 0.9 are below 1.
```

```quiz
q: How many complex multiplications does a radix-2 FFT need for N = 1024 (using (N/2) log₂N)?
answer: 5120
verify: 1024 // 2 * 10
explain: (N/2) log₂N = 512 × 10 = 5120, compared with N² ≈ 10⁶ for the direct DFT.
```
