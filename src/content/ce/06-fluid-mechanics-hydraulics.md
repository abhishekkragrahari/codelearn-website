---
title: Fluid Mechanics and Hydraulics
chapter: Water Resources Engineering
description: GATE CE syllabus for fluid mechanics and hydraulics, with hydrostatics, Bernoulli's equation, pipe flow and head losses, dimensional analysis, and open channel flow (specific energy, critical depth, Manning's equation, hydraulic jump), with solved examples.
---
## Syllabus

- **Fluid mechanics**: fluid properties, fluid statics, continuity, momentum and energy equations and their applications, potential flow, laminar and turbulent flow, flow in pipes and pipe networks, boundary layers, dimensional analysis and similitude.
- **Hydraulics**: forces on immersed bodies, flow measurement, open channel flow (specific energy, critical flow, hydraulic jump, uniform flow, gradually varied flow), channel design.

## Key concepts and formulas

**Hydrostatics.** p = ρgh. The force on a plane surface is F = ρgAh̄ (h̄ = depth of the centroid), acting at the centre of pressure h<sub>cp</sub> = h̄ + I<sub>G</sub>/(Ah̄) for a vertical surface.

**Bernoulli's equation** along a streamline (steady, incompressible, frictionless): p/(ρg) + V²/(2g) + z = constant. Continuity: Q = A₁V₁ = A₂V₂.

**Pipe flow.**

- Reynolds number Re = ρVD/μ = VD/ν. Flow is laminar for Re < 2000 in a pipe.
- Darcy-Weisbach head loss: **h<sub>f</sub> = fLV²/(2gD)**. For laminar flow, **f = 64/Re**.
- Hagen-Poiseuille (laminar): the velocity profile is parabolic and V<sub>max</sub> = 2V<sub>avg</sub>.
- Pipes in series: the same Q and added head losses. Pipes in parallel: the same head loss and added Q.
- Power of a jet or pump: P = ρgQH.

**Dimensional analysis.** Buckingham π theorem: n variables with m fundamental dimensions give n − m dimensionless groups. Froude similarity (open channels, spillways) gives a velocity scale √L<sub>r</sub>, a discharge scale L<sub>r</sub><sup>5/2</sup> and a time scale √L<sub>r</sub>.

**Open channel flow.**

- **Manning's equation**: V = (1/n) R<sup>2/3</sup> S<sup>1/2</sup>, with hydraulic radius R = A/P.
- Froude number Fr = V/√(gD) (D = hydraulic depth); Fr < 1 subcritical, = 1 critical, > 1 supercritical.
- Rectangular channel, discharge per unit width q: critical depth **y<sub>c</sub> = (q²/g)<sup>1/3</sup>**, minimum specific energy **E<sub>min</sub> = 1.5y<sub>c</sub>**.
- **Hydraulic jump** in a rectangular channel: y₂/y₁ = ½(−1 + √(1 + 8Fr₁²)), with energy loss ΔE = (y₂ − y₁)³/(4y₁y₂).
- Most economical rectangular section: width = 2 × depth (R = y/2); trapezoidal: half a hexagon.

## Worked example

A rectangular channel 4 m wide carries 12 m³/s. Find the critical depth and minimum specific energy. A hydraulic jump forms where the depth is 0.4 m: find the sequent depth and the energy loss.

```python
import math

g, Q, b = 9.81, 12.0, 4.0
q = Q / b
yc = (q * q / g) ** (1 / 3)
print(f"q = {q} m2/s, yc = {yc:.4f} m, Emin = {1.5 * yc:.4f} m")
y1 = 0.4
Fr1 = (q / y1) / math.sqrt(g * y1)
y2 = 0.5 * y1 * (-1 + math.sqrt(1 + 8 * Fr1 ** 2))
loss = (y2 - y1) ** 3 / (4 * y1 * y2)
print(f"Fr1 = {Fr1:.3f}, y2 = {y2:.4f} m, energy loss = {loss:.4f} m")

# Laminar pipe flow check and head loss
V, D, nu, L = 0.01, 0.1, 1e-6, 100
Re = V * D / nu
f = 64 / Re
print(f"Re = {Re:.0f} ({'laminar' if Re < 2000 else 'not laminar'}), f = {f:.4f}, hf = {f * L * V * V / (2 * g * D) * 1000:.4f} mm")
```
```output
q = 3.0 m2/s, yc = 0.9717 m, Emin = 1.4575 m
Fr1 = 3.786, y2 = 1.9511 m, energy loss = 1.1954 m
Re = 1000 (laminar), f = 0.0640, hf = 0.3262 mm
```

## Practice questions

```quiz
q: Oil (ν = 10⁻⁴ m²/s) flows at 0.5 m/s in a pipe of diameter 0.1 m. What is the Darcy friction factor f?
answer: 0.128
verify: 64 / (0.5 * 0.1 / 1e-4)
explain: Re = VD/ν = 0.5 × 0.1/10⁻⁴ = 500 (laminar), so f = 64/Re = 0.128.
```

```quiz
q: A rectangular channel carries 2 m³/s per metre width. What is the critical depth in m? Give the answer to three decimal places.
answer: 0.742
verify: round((2 ** 2 / 9.81) ** (1 / 3), 3)
explain: y<sub>c</sub> = (q²/g)<sup>1/3</sup> = (4/9.81)<sup>1/3</sup> ≈ 0.742 m.
```

```quiz
q: A model of a spillway is built at a length scale of 1:25 using Froude similarity. If the model discharge is 0.2 m³/s, what is the prototype discharge in m³/s?
answer: 625
verify: 0.2 * 25 ** 2.5
explain: The discharge scale is L<sub>r</sub><sup>5/2</sup> = 25<sup>2.5</sup> = 3125, so Q<sub>p</sub> = 0.2 × 3125 = 625 m³/s.
```

```quiz
q: A hydraulic jump in a rectangular channel has y₁ = 0.5 m and y₂ = 2.5 m. What is the energy loss in m?
answer: 1.6
verify: (2.5 - 0.5) ** 3 / (4 * 0.5 * 2.5)
explain: ΔE = (y₂ − y₁)³/(4y₁y₂) = 8/5 = 1.6 m.
```

```quiz
q: What is the hydraulic radius of the most economical rectangular channel section with depth 1.5 m?
answer: 0.75
verify: 1.5 / 2
explain: The most economical rectangle has b = 2y, so A = 2y², P = 4y and R = y/2 = 0.75 m.
```
