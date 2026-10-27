---
title: Bode, Nyquist, Compensators and State Space
chapter: Frequency Domain
description: Bode plots, gain and phase margins, Nyquist criterion, polar plots, lead and lag compensators, PID controllers, and state-space models with controllability and observability.
---
Frequency-response methods judge stability and robustness from G(jω). State-space methods describe a system with first-order matrix equations.

## Bode plots

Magnitude in dB (20 log|G|) and phase against log ω.

| Factor | Magnitude slope | Phase |
| --- | --- | --- |
| K | flat, 20 log K | 0° |
| Pole at origin 1/s | −20 dB/decade | −90° |
| Zero at origin s | +20 dB/decade | +90° |
| First-order pole 1/(1 + s/a) | 0, then −20 dB/dec after ω = a | 0 to −90° (−45° at a) |
| Second-order poles | −40 dB/dec after ω_n | 0 to −180° |

## Stability margins

- **Gain crossover** ω_gc: |G| = 1 (0 dB). **Phase margin** PM = 180° + ∠G(jω_gc).
- **Phase crossover** ω_pc: ∠G = −180°. **Gain margin** GM = 1/|G(jω_pc)| (in dB: −20 log|G|).
- Stable (minimum-phase systems) if both margins are positive. For a second-order system, PM ≈ 100ζ degrees (for ζ < 0.7).
- **Resonant peak** M_r = 1/(2ζ√(1 − ζ²)) at ω_r = ω_n√(1 − 2ζ²) (for ζ < 0.707). **Bandwidth** grows with ω_n.

## Nyquist criterion

Plot G(jω)H(jω) for ω from −∞ to ∞. **Z = N + P**:

- P = open-loop poles in the RHP; N = clockwise encirclements of (−1, 0); Z = closed-loop RHP poles.
- For stability Z = 0, so the plot must encircle −1 **counter-clockwise P times** (no encirclement if P = 0).

## Compensators and controllers

- **Lead** compensator (zero before pole): adds phase, improves transient response and margins; acts like a PD controller (high-pass).
- **Lag** compensator (pole before zero): raises low-frequency gain, reduces steady-state error; acts like PI (low-pass).
- **PID:** K_p + K_i/s + K_d s. Integral action removes steady-state error (raises type by 1); derivative action adds damping.

## State space

**ẋ = Ax + Bu, y = Cx + Du**

- Transfer function: **G(s) = C(sI − A)⁻¹B + D**.
- Eigenvalues of A = poles.
- State transition matrix φ(t) = e^(At) = L⁻¹[(sI − A)⁻¹].
- **Controllable** if [B AB … Aⁿ⁻¹B] has rank n. **Observable** if [C; CA; …; CAⁿ⁻¹] has rank n.

## Worked example

G(s) = 10/(s(s + 1)) at ω = 3 rad/s.

- |G| = 10/(3 × √10) = 1.054; ∠G = −90° − tan⁻¹3 = −161.6°.

## Practice

```quiz
q: A system's gain at the phase crossover frequency is 0.25. What is its gain margin in dB? (Give 2 decimal places.)
answer: 12.04
verify: round(-20 * __import__("math").log10(0.25), 2)
explain: GM = −20 log 0.25 = 12.04 dB.
```

```quiz
q: The phase of G at the gain crossover frequency is −140°. What is the phase margin in degrees?
answer: 40
verify: 180 - 140
explain: PM = 180° + (−140°) = 40°.
```

```quiz
q: A system has A = [[0, 1], [−6, −5]]. What are its poles?
* −2 and −3
- 2 and 3
- −1 and −6
- −5 and 0
explain: det(sI − A) = s² + 5s + 6 = (s + 2)(s + 3).
```

```quiz
q: An open-loop system has 1 pole in the RHP. Its Nyquist plot encircles −1 once counter-clockwise. How many closed-loop poles are in the RHP?
answer: 0
verify: -1 + 1
explain: N = −1 (counter-clockwise), P = 1, so Z = N + P = 0: the closed loop is stable.
```
