---
title: Engineering Mechanics and Mechanics of Materials
chapter: Applied Mechanics and Design
description: GATE ME syllabus for engineering mechanics and mechanics of materials, with equilibrium, friction, work-energy and impulse-momentum, stress and strain, Mohr's circle, bending, torsion, deflection, columns, strain energy and thermal stress, with solved examples.
---
## Syllabus

- **Engineering mechanics**: free-body diagrams and equilibrium, friction, trusses and frames, virtual work, kinematics and dynamics of rigid bodies in plane motion, impulse and momentum, energy methods.
- **Mechanics of materials**: stress and strain, elastic constants, Mohr's circle, thin cylinders, SFD and BMD, bending and shear stresses, shear centre, deflection of beams, torsion, Euler columns, energy methods, thermal stresses, strain gauges, material testing.

## Key concepts and formulas

**Dynamics.**

- Work-energy: work done = change in kinetic energy. Rolling disc: KE = ½mv² + ½Iω², with v = rω.
- Impulse-momentum: F Δt = m Δv. Coefficient of restitution e = (relative velocity of separation)/(relative velocity of approach).
- Moments of inertia about the centre: rod mL²/12, solid disc mr²/2, ring mr², solid sphere (2/5)mr². Parallel axis: I = I<sub>G</sub> + md².

**Friction.** F ≤ μN; angle of friction tan φ = μ. A block on an incline slides when tan θ > μ. Belt friction: T₁/T₂ = e<sup>μθ</sup>.

**Stress and strain.** σ = Eε, E = 2G(1 + ν) = 3K(1 − 2ν). Volumetric strain of a rod: ε<sub>v</sub> = ε(1 − 2ν). Thermal stress in a fully restrained bar: **σ = EαΔT**.

**Mohr's circle.** Centre (σ<sub>x</sub> + σ<sub>y</sub>)/2, radius √(((σ<sub>x</sub> − σ<sub>y</sub>)/2)² + τ<sub>xy</sub>²) = maximum in-plane shear stress. Principal planes are at 2θ<sub>p</sub> = tan⁻¹(2τ<sub>xy</sub>/(σ<sub>x</sub> − σ<sub>y</sub>)).

**Bending, torsion and deflection.** M/I = σ/y = E/R; T/J = τ/r = Gθ/L. Power transmitted P = 2πNT/60 (N in rpm). Hollow shaft J = π(D⁴ − d⁴)/32. Deflections: cantilever with end load PL³/(3EI); simply supported beam with central load PL³/(48EI) and with UDL 5wL⁴/(384EI).

**Columns.** Euler load P<sub>cr</sub> = π²EI/L<sub>e</sub²; slenderness ratio L<sub>e</sub>/k with I = Ak².

**Strain energy.** Axial U = P²L/(2AE); resilience per unit volume σ²/(2E). A load dropped suddenly (h = 0) produces twice the stress of the same load applied gradually.

**Springs.** Series: 1/k = 1/k₁ + 1/k₂; parallel: k = k₁ + k₂.

## Worked example

A solid shaft transmits 50 kW at 300 rpm, with an allowable shear stress of 60 MPa. Find the torque and the minimum diameter. Then find the principal stresses for σ<sub>x</sub> = 100 MPa, σ<sub>y</sub> = 40 MPa and τ<sub>xy</sub> = 40 MPa.

```python
import math

P, N, tau = 50e3, 300, 60e6
T = P * 60 / (2 * math.pi * N)
d = (16 * T / (math.pi * tau)) ** (1 / 3)
print(f"T = {T:.2f} N m, d_min = {d * 1000:.2f} mm")
sx, sy, t = 100, 40, 40
c, r = (sx + sy) / 2, math.hypot((sx - sy) / 2, t)
print(f"sigma1 = {c + r:.1f} MPa, sigma2 = {c - r:.1f} MPa, tau_max(in-plane) = {r:.1f} MPa")
print(f"thermal stress, steel, 50 K: {200e9 * 12e-6 * 50 / 1e6:.0f} MPa")
```
```output
T = 1591.55 N m, d_min = 51.31 mm
sigma1 = 120.0 MPa, sigma2 = 20.0 MPa, tau_max(in-plane) = 50.0 MPa
thermal stress, steel, 50 K: 120 MPa
```

## Practice questions

```quiz
q: A steel bar (E = 200 GPa, α = 12 × 10⁻⁶ /°C) is held between rigid walls and heated by 40 °C. What is the thermal stress in MPa?
answer: 96
verify: round(200e3 * 12e-6 * 40, 4)
explain: σ = EαΔT = 200000 MPa × 12 × 10⁻⁶ × 40 = 96 MPa (compressive).
```

```quiz
q: A shaft transmits 20 kW at 1000 rpm. What is the torque in N m? Give the answer to two decimal places.
answer: 190.99
verify: round(20e3 * 60 / (2 * __import__("math").pi * 1000), 2)
explain: T = 60P/(2πN) = 60 × 20000/(2π × 1000) ≈ 190.99 N m.
```

```quiz
q: Two springs of stiffness 300 N/mm and 600 N/mm are connected in series. What is the equivalent stiffness in N/mm?
answer: 200
verify: 1 / (1 / 300 + 1 / 600)
explain: 1/k = 1/300 + 1/600 = 3/600, so k = 200 N/mm.
```

```quiz
q: A plane stress state has σ<sub>x</sub> = 60 MPa, σ<sub>y</sub> = −20 MPa and τ<sub>xy</sub> = 30 MPa. What is the maximum in-plane shear stress in MPa?
answer: 50
verify: round(((60 + 20) / 2) ** 2 + 30 ** 2, 9) ** 0.5
explain: τ<sub>max</sub> = √(40² + 30²) = 50 MPa, the radius of Mohr's circle.
```

```quiz
q: A solid disc of mass 4 kg and radius 0.5 m rolls without slipping at 2 m/s. What is its total kinetic energy in J?
answer: 12
verify: 0.5 * 4 * 2 ** 2 + 0.5 * (0.5 * 4 * 0.5 ** 2) * (2 / 0.5) ** 2
explain: Translational ½mv² = 8 J. Rotational ½Iω² with I = ½mr² = 0.5 kg m² and ω = 4 rad/s gives 4 J. Total 12 J (= ¾mv²).
```
