---
title: Engineering Mechanics and Solid Mechanics
chapter: Structural Engineering
description: GATE CE syllabus for engineering mechanics and solid mechanics, with the key formulas for equilibrium, SFD and BMD, stress and strain, elastic constants, Mohr's circle, bending, torsion and deflection, and solved examples.
---
## Syllabus

- **Engineering mechanics**: force systems, free-body diagrams, equilibrium, friction, centroid and moment of inertia, kinematics and dynamics, virtual work.
- **Solid mechanics**: shear force and bending moment diagrams, stress and strain, Hooke's law, elastic constants, principal stresses and Mohr's circle, theories of failure, bending and shear stresses, torsion, thin cylinders, deflection of beams, buckling of columns.

## Key concepts and formulas

**Equilibrium.** In two dimensions, ΣF<sub>x</sub> = 0, ΣF<sub>y</sub> = 0 and ΣM = 0. Limiting friction F = μN.

**Shear force and bending moment.** dM/dx = V and dV/dx = −w (load intensity). The bending moment is maximum where the shear force is zero.

| Simply supported beam, span L | Max bending moment | Max deflection |
| --- | --- | --- |
| Central point load P | PL/4 | PL³/(48EI) |
| Uniformly distributed load w | wL²/8 | 5wL⁴/(384EI) |

| Cantilever, length L | Max bending moment | Max deflection |
| --- | --- | --- |
| Point load P at the free end | PL | PL³/(3EI) |
| Uniformly distributed load w | wL²/2 | wL⁴/(8EI) |

**Stress, strain and elastic constants.** σ = P/A, ε = δL/L, σ = Eε, δL = PL/(AE). The elastic constants are related by **E = 2G(1 + μ) = 3K(1 − 2μ)**, where μ is Poisson's ratio.

**Principal stresses** for a plane stress state (σ<sub>x</sub>, σ<sub>y</sub>, τ<sub>xy</sub>):

σ<sub>1,2</sub> = (σ<sub>x</sub> + σ<sub>y</sub>)/2 ± √(((σ<sub>x</sub> − σ<sub>y</sub>)/2)² + τ<sub>xy</sub>²), and the maximum in-plane shear stress is the radius of Mohr's circle.

**Bending equation:** M/I = σ/y = E/R. The section modulus is Z = I/y<sub>max</sub>. For a rectangle b × d: I = bd³/12, Z = bd²/6. The maximum shear stress in a rectangular section is 1.5 times the average.

**Torsion:** T/J = τ/r = Gθ/L. For a solid shaft of diameter d: J = πd⁴/32, so τ<sub>max</sub> = 16T/(πd³).

**Thin cylinder** (pressure p, diameter d, thickness t): hoop stress pd/(2t), longitudinal stress pd/(4t).

**Euler buckling load:** P<sub>cr</sub> = π²EI/L<sub>e</sub², with effective length L<sub>e</sub> = L (both ends pinned), 2L (one end fixed, one free), L/√2 (fixed-pinned) and L/2 (both ends fixed).

## Worked example

A simply supported steel beam of span 6 m carries a UDL of 20 kN/m. Its rectangular section is 200 mm wide and 400 mm deep, and E = 200 GPa. Find the maximum bending moment, the maximum bending stress and the maximum deflection.

```python
import math

L, w = 6.0, 20e3          # m, N/m
b, d, E = 0.2, 0.4, 200e9
I = b * d ** 3 / 12
M = w * L ** 2 / 8
sigma = M * (d / 2) / I
delta = 5 * w * L ** 4 / (384 * E * I)
print(f"I = {I:.6e} m^4")
print(f"M_max = {M / 1e3:.1f} kN m")
print(f"sigma_max = {sigma / 1e6:.3f} MPa")
print(f"deflection = {delta * 1000:.3f} mm")

# Principal stresses for sigma_x = 80, sigma_y = -20, tau_xy = 30 (MPa)
sx, sy, t = 80, -20, 30
c, r = (sx + sy) / 2, math.hypot((sx - sy) / 2, t)
print(f"sigma1 = {c + r:.2f} MPa, sigma2 = {c - r:.2f} MPa, tau_max = {r:.2f} MPa")
```
```output
I = 1.066667e-03 m^4
M_max = 90.0 kN m
sigma_max = 16.875 MPa
deflection = 1.582 mm
sigma1 = 88.31 MPa, sigma2 = -28.31 MPa, tau_max = 58.31 MPa
```

## Practice questions

```quiz
q: A material has E = 200 GPa and Poisson's ratio 0.25. What is its shear modulus G in GPa?
answer: 80
verify: 200 / (2 * (1 + 0.25))
explain: E = 2G(1 + μ), so G = 200/(2 × 1.25) = 80 GPa.
```

```quiz
q: A cantilever of length 2 m carries a point load of 10 kN at its free end. What is the maximum bending moment in kN m?
answer: 20
verify: 10 * 2
explain: For a cantilever with an end load, M<sub>max</sub> = PL = 10 × 2 = 20 kN m, at the fixed support.
```

```quiz
q: A solid shaft of diameter 50 mm transmits a torque of 1 kN m. What is the maximum shear stress in MPa? Give the answer to two decimal places.
answer: 40.74
verify: round(16 * 1e6 / (__import__("math").pi * 50 ** 3), 2)
explain: τ<sub>max</sub> = 16T/(πd³) = 16 × 10⁶ N mm / (π × 50³ mm³) ≈ 40.74 MPa.
```

```quiz
q: A column pinned at both ends has an Euler buckling load of 400 kN. What is the buckling load if both ends are fixed (all else the same)?
answer: 1600
verify: 400 * (1 / 0.5) ** 2
explain: Fixing both ends halves the effective length (L<sub>e</sub> = L/2). P<sub>cr</sub> ∝ 1/L<sub>e</sub>², so the load becomes 4 × 400 = 1600 kN.
```

```quiz
q: For a thin cylinder under internal pressure, what is the ratio of hoop stress to longitudinal stress?
answer: 2
verify: (1 / 2) / (1 / 4)
explain: Hoop stress pd/(2t) is twice the longitudinal stress pd/(4t), so the ratio is 2.
```
