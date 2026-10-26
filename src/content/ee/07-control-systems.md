---
title: Control Systems
chapter: Signals and Control
description: GATE EE syllabus for control systems, with transfer functions and block diagrams, second-order transient response, steady-state error, Routh-Hurwitz stability, root locus, Bode and Nyquist plots, gain and phase margins, compensators and state space, with solved examples.
---
## Syllabus

Mathematical modelling, feedback, transfer functions, block diagrams and signal flow graphs (Mason's gain formula); transient and steady-state analysis of LTI systems; stability by Routh-Hurwitz and Nyquist criteria; Bode plots; root loci; lag, lead and lead-lag compensators; P, PI and PID controllers; state space models and solution of state equations.

## Key concepts and formulas

**Feedback.** Closed-loop transfer function T = G/(1 + GH) for negative feedback. **Mason's gain formula**: T = Σ P<sub>k</sub>Δ<sub>k</sub>/Δ.

**Second-order system** G(s) = ω<sub>n</sub>²/(s² + 2ζω<sub>n</sub>s + ω<sub>n</sub>²):

- Damped frequency ω<sub>d</sub> = ω<sub>n</sub>√(1 − ζ²).
- **Peak overshoot** M<sub>p</sub> = e<sup>−πζ/√(1−ζ²)</sup>; peak time t<sub>p</sub> = π/ω<sub>d</sub>.
- Settling time t<sub>s</sub> ≈ 4/(ζω<sub>n</sub>) (2% band) or 3/(ζω<sub>n</sub>) (5% band).
- ζ < 1 underdamped, = 1 critically damped, > 1 overdamped.

**Steady-state error** (unity feedback, open-loop G):

| Input | Error | Constant |
| --- | --- | --- |
| Step | 1/(1 + K<sub>p</sub>) | K<sub>p</sub> = lim<sub>s→0</sub> G(s) |
| Ramp | 1/K<sub>v</sub> | K<sub>v</sub> = lim<sub>s→0</sub> sG(s) |
| Parabola | 1/K<sub>a</sub> | K<sub>a</sub> = lim<sub>s→0</sub> s²G(s) |

The **type** of a system is the number of poles of G at the origin. A type-1 system has zero step error and a finite ramp error.

**Routh-Hurwitz.** The number of sign changes in the first column of the Routh array equals the number of roots in the right half-plane. For s³ + a₂s² + a₁s + a₀, stability needs all coefficients positive and **a₂a₁ > a₀**.

**Root locus.** Starts at open-loop poles (K = 0) and ends at zeros or infinity; the number of asymptotes = P − Z, at angles (2k + 1)180°/(P − Z) from the centroid σ = (Σ poles − Σ zeros)/(P − Z). A real-axis point is on the locus if the number of poles and zeros to its right is odd.

**Frequency response.** Gain margin GM = 1/|G(jω<sub>pc</sub>)| at the phase crossover (phase = −180°); phase margin PM = 180° + ∠G(jω<sub>gc</sub>) at the gain crossover (|G| = 1). A stable minimum-phase system has positive GM (in dB) and PM. In Bode plots, each pole adds −20 dB/decade, each zero +20 dB/decade. **Nyquist criterion**: Z = P + N (closed-loop RHP poles = open-loop RHP poles + clockwise encirclements of −1).

**Compensators and controllers.** A lead compensator adds phase (improves transient response and PM); a lag compensator improves steady-state error. Integral action removes the steady-state error to a step; derivative action adds damping.

**State space.** ẋ = Ax + Bu, y = Cx + Du; transfer function C(sI − A)⁻¹B + D; the eigenvalues of A are the poles. State transition matrix e<sup>At</sup> = L⁻¹{(sI − A)⁻¹}. Controllable if [B AB … Aⁿ⁻¹B] has full rank.

## Worked example

For G(s) = 25/(s(s + 6)) with unity feedback, find ω<sub>n</sub>, ζ, the peak overshoot, peak time, 2% settling time and the ramp error. Then find the range of K for which s³ + 6s² + 11s + 6 + K = 0 is stable.

```python
import math

# Closed loop: s^2 + 6s + 25 -> wn^2 = 25, 2 zeta wn = 6
wn = 5.0
zeta = 6 / (2 * wn)
wd = wn * math.sqrt(1 - zeta ** 2)
Mp = math.exp(-math.pi * zeta / math.sqrt(1 - zeta ** 2))
print(f"wn = {wn}, zeta = {zeta}, Mp = {Mp * 100:.2f}%, tp = {math.pi / wd:.4f} s, ts = {4 / (zeta * wn):.4f} s")
Kv = 25 / 6
print(f"Kv = {Kv:.4f}, ramp error = {1 / Kv:.2f}")
# Routh for s^3 + 6s^2 + 11s + (6 + K): need 6*11 > 6 + K and 6 + K > 0
print(f"stable for {-6} < K < {6 * 11 - 6}")
```
```output
wn = 5.0, zeta = 0.6, Mp = 9.48%, tp = 0.7854 s, ts = 1.3333 s
Kv = 4.1667, ramp error = 0.24
stable for -6 < K < 60
```

## Practice questions

```quiz
q: A second-order system has ζ = 0.5. What is its percentage peak overshoot? Give the answer to two decimal places.
answer: 16.3
verify: round(100 * __import__("math").exp(-__import__("math").pi * 0.5 / (1 - 0.25) ** 0.5), 2)
explain: M<sub>p</sub> = e<sup>−π(0.5)/√0.75</sup> = e<sup>−1.8138</sup> ≈ 0.1630, i.e. about 16.30%.
```

```quiz
q: A unity feedback system has G(s) = 10/(s(s + 2)). What is the steady-state error for a unit ramp input?
answer: 0.2
verify: 1 / (10 / 2)
explain: K<sub>v</sub> = lim sG(s) = 10/2 = 5, so e<sub>ss</sub> = 1/K<sub>v</sub> = 0.2.
```

```quiz
q: For the characteristic equation s³ + 4s² + 5s + K = 0, what is the largest K (the marginal value) for stability?
answer: 20
verify: 4 * 5
explain: The Routh condition a₂a₁ > a₀ gives 4 × 5 > K, so 0 < K < 20. At K = 20 the system is marginally stable.
```

```quiz
q: A system with open-loop poles at 0, −2 and −4 and no zeros has how many root locus asymptotes, and where is their centroid?
* 3 asymptotes, centroid at −2
- 2 asymptotes, centroid at −3
- 3 asymptotes, centroid at −6
- 1 asymptote, centroid at 0
explain: P − Z = 3 asymptotes. The centroid is (0 − 2 − 4)/3 = −2.
```

```quiz
q: The open-loop gain at the phase crossover frequency is 0.25. What is the gain margin in dB? Give the answer to two decimal places.
answer: 12.04
verify: round(20 * __import__("math").log10(1 / 0.25), 2)
explain: GM = 1/0.25 = 4, i.e. 20 log₁₀ 4 ≈ 12.04 dB.
```
