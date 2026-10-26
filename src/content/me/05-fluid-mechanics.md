---
title: Fluid Mechanics
chapter: Fluid Mechanics and Thermal Sciences
description: GATE ME syllabus for fluid mechanics, with fluid statics and buoyancy, control volume analysis, Bernoulli's equation, the momentum equation, dimensional analysis, viscous flow, boundary layers and pipe flow, with solved examples.
---
## Syllabus

Fluid properties; fluid statics, forces on submerged bodies, stability of floating bodies; control volume analysis of mass, momentum and energy; fluid acceleration; differential equations of continuity and momentum; Bernoulli's equation; dimensional analysis; viscous flow of incompressible fluids, boundary layer, elementary turbulent flow, flow through pipes, head losses in pipes, bends and fittings.

## Key concepts and formulas

**Properties.** Newton's law of viscosity τ = μ du/dy; kinematic viscosity ν = μ/ρ. Capillary rise h = 4σ cos θ/(ρgd). Bulk modulus K = −dp/(dV/V).

**Statics and buoyancy.** p = ρgh. Force on a plane surface F = ρgAh̄. A floating body is stable if its **metacentric height GM > 0**, where BM = I/V (I = second moment of the waterline area, V = displaced volume) and GM = BM − BG.

**Kinematics.** Continuity for incompressible flow: ∂u/∂x + ∂v/∂y = 0. A flow is irrotational if ∂v/∂x − ∂u/∂y = 0. Stream function: u = ∂ψ/∂y, v = −∂ψ/∂x.

**Bernoulli and momentum.**

- p/ρg + V²/2g + z = constant along a streamline (steady, inviscid, incompressible).
- Venturimeter: Q = C<sub>d</sub>A₁A₂√(2gh)/√(A₁² − A₂²).
- Momentum equation: ΣF = ṁ(V<sub>out</sub> − V<sub>in</sub>). Force of a jet on a fixed flat plate normal to it: F = ρAV².

**Viscous flow.**

- Flow between fixed parallel plates and in pipes (Hagen-Poiseuille): Δp = 32μVL/D², f = 64/Re, V<sub>max</sub> = 2V<sub>avg</sub> in a pipe and 1.5V<sub>avg</sub> between plates.
- Darcy-Weisbach h<sub>f</sub> = fLV²/(2gD); minor losses K V²/(2g); sudden expansion loss (V₁ − V₂)²/(2g).

**Boundary layer.** Laminar (Blasius): δ/x = 5/√Re<sub>x</sub>; the transition on a flat plate is at about Re<sub>x</sub> = 5 × 10⁵. Drag force F<sub>D</sub> = ½C<sub>D</sub>ρAV².

**Dimensional analysis.** Reynolds number (inertia/viscous), Froude (inertia/gravity), Weber (inertia/surface tension), Mach (inertia/compressibility), Euler (pressure/inertia).

## Worked example

Water flows through a venturimeter with inlet diameter 200 mm and throat 100 mm; the manometer shows a head difference of 0.5 m of water and C<sub>d</sub> = 0.98. Find Q. Then find the force of a 50 mm water jet at 20 m/s on a fixed plate normal to it, and the boundary layer thickness at 1 m on a plate in air at 5 m/s (ν = 1.5 × 10⁻⁵ m²/s).

```python
import math

g = 9.81
A1, A2 = math.pi * 0.2 ** 2 / 4, math.pi * 0.1 ** 2 / 4
Q = 0.98 * A1 * A2 * math.sqrt(2 * g * 0.5) / math.sqrt(A1 ** 2 - A2 ** 2)
print(f"venturimeter Q = {Q * 1000:.3f} L/s")
A, V = math.pi * 0.05 ** 2 / 4, 20
print(f"jet force on plate = {1000 * A * V ** 2:.2f} N")
Re = 5 * 1 / 1.5e-5
print(f"Re_x = {Re:.0f}, delta = {5 * 1 / math.sqrt(Re) * 1000:.2f} mm")
```
```output
venturimeter Q = 24.898 L/s
jet force on plate = 785.40 N
Re_x = 333333, delta = 8.66 mm
```

## Practice questions

```quiz
q: Oil of viscosity 0.1 Pa s fills a 2 mm gap between a fixed plate and a plate moving at 1 m/s. What is the shear stress on the plates in Pa?
answer: 50
verify: 0.1 * 1 / 0.002
explain: τ = μV/h = 0.1 × 1/0.002 = 50 Pa (linear velocity profile, Couette flow).
```

```quiz
q: A water jet of area 0.001 m² strikes a fixed flat plate normally at 10 m/s. What is the force on the plate in N?
answer: 100
verify: 1000 * 0.001 * 10 ** 2
explain: F = ρAV² = 1000 × 0.001 × 100 = 100 N.
```

```quiz
q: In fully developed laminar pipe flow, the average velocity is 0.6 m/s. What is the maximum velocity in m/s?
answer: 1.2
verify: 2 * 0.6
explain: For Hagen-Poiseuille flow, V<sub>max</sub> = 2V<sub>avg</sub> = 1.2 m/s.
```

```quiz
q: A floating body has BM = 1.2 m and its centre of gravity is 0.8 m above the centre of buoyancy. What is its metacentric height in m, and is it stable?
* 0.4 m, stable
- 2.0 m, stable
- −0.4 m, unstable
- 0.4 m, unstable
verify: "0.4 m, stable" if round(1.2 - 0.8, 9) == 0.4 else "x"
explain: GM = BM − BG = 1.2 − 0.8 = 0.4 m. Since GM > 0, the body is in stable equilibrium.
```

```quiz
q: How many independent dimensionless groups can be formed from 7 variables involving 3 fundamental dimensions?
answer: 4
verify: 7 - 3
explain: By the Buckingham π theorem, n − m = 7 − 3 = 4 groups.
```
