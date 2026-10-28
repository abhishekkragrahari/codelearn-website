---
title: Fluid Kinematics, Bernoulli and Momentum
chapter: Fluid Dynamics
description: Types of flow, continuity equation, streamlines and stream function, velocity potential, Bernoulli's equation, venturimeter and Pitot tube, and the momentum equation for jets and bends.
---
Fluid dynamics links velocity, pressure and force through three conservation laws: **mass** (continuity), **energy** (Bernoulli) and **momentum**.

## Describing flow

- **Steady:** properties at a point do not change with time. **Uniform:** they do not change along the flow.
- **Streamline:** a line tangent to the velocity everywhere. In steady flow, streamlines, pathlines and streaklines coincide.
- **Acceleration** in a flow field = local (∂V/∂t) + convective (u ∂V/∂x + …).

## Continuity

For incompressible flow:

- In a pipe: **Q = A₁V₁ = A₂V₂**.
- In 2D: **∂u/∂x + ∂v/∂y = 0**.

**Stream function** ψ: u = ∂ψ/∂y, v = −∂ψ/∂x. It satisfies continuity automatically; the flow between two streamlines = ψ₂ − ψ₁.

**Velocity potential** φ: u = ∂φ/∂x, v = ∂φ/∂y. It exists only for **irrotational** flow (vorticity ∂v/∂x − ∂u/∂y = 0).

## Bernoulli's equation

For steady, incompressible, inviscid flow along a streamline:

**p/(ρg) + V²/(2g) + z = constant** (pressure head + velocity head + elevation head)

With losses and pumps: p₁/ρg + V₁²/2g + z₁ + h_pump = p₂/ρg + V₂²/2g + z₂ + h_loss.

**Applications:**

- **Venturimeter:** Q = C_d A₁A₂ √(2gh)/√(A₁² − A₂²), with h the head difference.
- **Pitot tube:** measures stagnation pressure; V = √(2gh) (times a coefficient).
- **Torricelli:** flow from an orifice at depth H: V = √(2gH).

## Momentum equation

The net force on a fluid in a control volume = rate of change of momentum:

**ΣF = ρQ(V_out − V_in)** (vectors)

- Jet on a **fixed flat plate** normal to it: F = ρAV².
- Jet on a plate **moving** away at u: F = ρA(V − u)².
- Jet deflected through angle θ by a fixed vane: F_x = ρQV(1 − cos θ).

## Worked example

Water flows through a pipe that narrows from 0.2 m to 0.1 m diameter, at 0.05 m³/s. Find the velocities and the pressure drop (same level, no losses).

- V₁ = 0.05/(π × 0.01) = 1.59 m/s; V₂ = 0.05/(π × 0.0025) = 6.37 m/s.
- Δp = ρ(V₂² − V₁²)/2 = 500 × (40.53 − 2.53) = **19.0 kPa**.

## Practice

```quiz
q: Water leaves a hole 5 m below the free surface of a large tank. What is the jet speed in m/s? (g = 9.81 m/s², give 2 decimal places.)
answer: 9.9
verify: round((2 * 9.81 * 5) ** 0.5, 2)
explain: V = √(2gH) = √98.1 = 9.90 m/s.
```

```quiz
q: A 2D flow has u = 2x. For incompressible flow with v = 0 at y = 0, what is v?
- 2y
* −2y
- 2x
- −2x
explain: ∂u/∂x + ∂v/∂y = 0 gives ∂v/∂y = −2, so v = −2y.
```

```quiz
q: A jet of area 0.001 m² at 20 m/s hits a fixed flat plate normally. What is the force on the plate in N?
answer: 400
verify: round(1000 * 0.001 * 20 ** 2, 6)
explain: F = ρAV² = 1000 × 0.001 × 400 = 400 N.
```

```quiz
q: A Pitot tube in a water stream shows a dynamic head of 0.2 m. What is the velocity in m/s? (g = 9.81 m/s², give 2 decimal places.)
answer: 1.98
verify: round((2 * 9.81 * 0.2) ** 0.5, 2)
explain: V = √(2gh) = √3.924 = 1.98 m/s.
```

```quiz
q: Water flows at 2 m/s in a pipe of 0.3 m diameter. What is the flow rate in m³/s? (Give 4 decimal places.)
answer: 0.1414
verify: round(__import__("math").pi / 4 * 0.3 ** 2 * 2, 4)
explain: Q = AV = (π/4)(0.09)(2) = 0.1414 m³/s.
```

```quiz
q: In steady flow, the velocity head at a point is 0.8 m (g = 10 m/s²). What is the velocity in m/s?
answer: 4
verify: (2 * 10 * 0.8) ** 0.5
explain: V²/(2g) = 0.8 gives V = √16 = 4 m/s.
```
