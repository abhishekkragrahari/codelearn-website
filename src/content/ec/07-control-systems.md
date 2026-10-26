---
title: Control Systems
chapter: Control and Communication
description: GATE EC syllabus for control systems, with transfer functions, block diagrams and signal flow graphs, second-order response, steady-state errors, Routh-Hurwitz and Nyquist stability, root locus, Bode plots, compensators and state equations, with solved examples.
---
## Syllabus

Basic control system components; feedback principle; transfer function; block diagrams; signal flow graphs; transient and steady-state analysis of LTI systems; frequency response; Routh-Hurwitz and Nyquist stability criteria; Bode and root-locus plots; lag, lead and lag-lead compensation; state variable model and solution of state equations.

## Key concepts and formulas

The [GATE EE control systems lesson](../ee/control-systems.html) covers the same syllabus with more detail; the essentials are:

- **Closed loop**: T = G/(1 + GH). Mason: T = Σ P<sub>k</sub>Δ<sub>k</sub>/Δ.
- **Second order**: M<sub>p</sub> = e<sup>−πζ/√(1−ζ²)</sup>, t<sub>p</sub> = π/(ω<sub>n</sub>√(1 − ζ²)), t<sub>s</sub> ≈ 4/(ζω<sub>n</sub>) (2%), rise time decreases as ω<sub>n</sub> increases.
- **Steady-state error** (unity feedback): step 1/(1 + K<sub>p</sub>), ramp 1/K<sub>v</sub>, parabola 1/K<sub>a</sub>.
- **Routh-Hurwitz**: sign changes in the first column = right-half-plane roots. A row of zeros signals symmetric roots (for example, a pair on the jω axis).
- **Root locus**: P − Z asymptotes at angles (2k + 1)180°/(P − Z), centroid (Σ poles − Σ zeros)/(P − Z); break-away points from dK/ds = 0.
- **Bode**: each pole −20 dB/decade, each zero +20 dB/decade; a type-n system starts with slope −20n dB/decade. Gain and phase margins from the crossover frequencies.
- **Nyquist**: N = Z − P (encirclements of −1, counted clockwise as positive, give Z = closed-loop RHP poles).
- **Compensators**: lead (zero closer to the origin than the pole) adds phase margin and bandwidth; lag (pole closer to the origin) improves steady-state accuracy. Maximum phase lead of (1 + s/ω₁)/(1 + s/ω₂) is sin⁻¹((ω₂ − ω₁)/(ω₂ + ω₁)), at ω = √(ω₁ω₂).
- **State space**: ẋ = Ax + Bu; the eigenvalues of A are the poles; x(t) = e<sup>At</sup>x(0) for u = 0.

## Worked example

Find the break-away point of the root locus of G(s)H(s) = K/(s(s + 4)), the maximum phase lead of a compensator with corners at 1 and 9 rad/s, and the state transition matrix of A = [[0, 1], [−2, −3]] at t = 1 s by series expansion.

```python
import math

# K = -s(s + 4) -> dK/ds = -(2s + 4) = 0 -> s = -2
print("break-away point: s = -2, K there =", -(-2) * (-2 + 4))
w1, w2 = 1, 9
print(f"max phase lead = {math.degrees(math.asin((w2 - w1) / (w2 + w1))):.2f} deg at w = {math.sqrt(w1 * w2):.0f} rad/s")
A = [[0, 1], [-2, -3]]
def mul(X, Y):
    return [[sum(X[i][k] * Y[k][j] for k in range(2)) for j in range(2)] for i in range(2)]
term = [[1.0, 0.0], [0.0, 1.0]]
total = [[1.0, 0.0], [0.0, 1.0]]
for k in range(1, 40):
    term = [[v / k for v in row] for row in mul(term, A)]
    total = [[total[i][j] + term[i][j] for j in range(2)] for i in range(2)]
print("e^(A t) at t = 1:", [[round(v, 4) for v in row] for row in total])
e1, e2 = math.exp(-1), math.exp(-2)
print("exact first row:", [round(2 * e1 - e2, 4), round(e1 - e2, 4)])
```
```output
break-away point: s = -2, K there = 4
max phase lead = 53.13 deg at w = 3 rad/s
e^(A t) at t = 1: [[0.6004, 0.2325], [-0.4651, -0.0972]]
exact first row: [0.6004, 0.2325]
```

## Practice questions

```quiz
q: A unity feedback system has G(s) = 100/((s + 2)(s + 5)). What is its steady-state error for a unit step input? Give the answer to four decimal places.
answer: 0.0909
verify: round(1 / (1 + 100 / 10), 4)
explain: K<sub>p</sub> = G(0) = 100/10 = 10, so e<sub>ss</sub> = 1/(1 + 10) ≈ 0.0909.
```

```quiz
q: What is the maximum phase lead (degrees) of a lead compensator (1 + s/2)/(1 + s/18)?
answer: 53.13
verify: round(__import__("math").degrees(__import__("math").asin((18 - 2) / (18 + 2))), 2)
explain: φ<sub>max</sub> = sin⁻¹((18 − 2)/(18 + 2)) = sin⁻¹(0.8) ≈ 53.13°, at ω = √(2 × 18) = 6 rad/s.
```

```quiz
q: The characteristic equation s⁴ + 2s³ + 3s² + 4s + 5 = 0 has how many roots in the right half-plane?
answer: 2
verify:
  r1 = [1, 3, 5]
  r2 = [2, 4, 0]
  b1 = (r2[0] * r1[1] - r1[0] * r2[1]) / r2[0]
  b2 = (r2[0] * r1[2] - r1[0] * r2[2]) / r2[0]
  c1 = (b1 * r2[1] - r2[0] * b2) / b1
  d1 = b2
  col = [r1[0], r2[0], b1, c1, d1]
  print(sum(1 for a, b in zip(col, col[1:]) if a * b < 0))
explain: The first column of the Routh array is 1, 2, 1, −6, 5. It changes sign twice (1 → −6 → 5), so 2 roots lie in the right half-plane.
```

```quiz
q: A system's Bode magnitude plot starts with a slope of −40 dB/decade at low frequencies. What is the type of the system?
answer: 2
verify: 40 // 20
explain: Each pole at the origin contributes −20 dB/decade, so −40 dB/decade means 2 poles at the origin: a type-2 system.
```
