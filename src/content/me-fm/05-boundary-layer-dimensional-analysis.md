---
title: Boundary Layer, Drag and Dimensional Analysis
chapter: External Flow and Similarity
description: Boundary layer thickness, laminar and turbulent boundary layers, separation, drag and lift, Buckingham pi theorem, important dimensionless numbers and model similarity.
---
When fluid flows past a surface, friction acts only in a thin layer near it: the **boundary layer**. Dimensional analysis then lets small models predict the behaviour of full-size machines and ships.

## Boundary layer on a flat plate

- At the plate, the fluid velocity is zero (no-slip). The **boundary layer thickness** δ is where u reaches 99% of the free stream U.
- Local Reynolds number Re_x = Ux/ν. The layer turns turbulent at about Re_x ≈ 5 × 10⁵.
- **Laminar (Blasius):** δ/x = 5/√Re_x. So δ ∝ √x.
- **Turbulent:** δ/x ≈ 0.37/Re_x^(1/5).
- **Displacement thickness** δ* = ∫(1 − u/U) dy; **momentum thickness** θ = ∫(u/U)(1 − u/U) dy. Shape factor H = δ*/θ (2.59 for Blasius).

## Separation

In an **adverse pressure gradient** (pressure rising along the flow, dp/dx > 0), the slow fluid near the wall can stop and reverse; the flow **separates** at the point where (∂u/∂y) at the wall = 0. Separation causes a large wake and pressure drag. Streamlining delays it.

## Drag and lift

- **Drag** F_D = C_D (½ρU²) A; **lift** F_L = C_L (½ρU²) A.
- Drag = skin friction + pressure (form) drag.
- **Stokes' law** for a sphere at very low Re: F_D = 3πμVd, giving C_D = 24/Re.

## Dimensional analysis

**Buckingham π theorem:** a relation among n variables with m fundamental dimensions (M, L, T) can be written with **n − m** dimensionless groups.

| Number | Ratio | Formula | Important for |
| --- | --- | --- | --- |
| Reynolds | inertia/viscous | ρVL/μ | Pipe flow, drag |
| Froude | inertia/gravity | V/√(gL) | Ships, open channels, spillways |
| Euler | pressure/inertia | Δp/(ρV²) | Pressure-driven flow |
| Weber | inertia/surface tension | ρV²L/σ | Droplets, capillary waves |
| Mach | inertia/elastic | V/c | Compressible flow |

## Model similarity

A model is **dynamically similar** to the prototype when the relevant dimensionless numbers match:

- Reynolds similarity (pipes, submarines): V_m L_m/ν_m = V_p L_p/ν_p.
- Froude similarity (ships, spillways): V_m/√L_m = V_p/√L_p, so **velocity scales as √(length scale)** and discharge as L^2.5.

## Practice

```quiz
q: A relation involves 7 variables with 3 fundamental dimensions. How many dimensionless π groups are there?
answer: 4
verify: 7 - 3
explain: Buckingham π: n − m = 7 − 3 = 4.
```

```quiz
q: For a laminar boundary layer, at Re_x = 10⁴ and x = 0.5 m, what is δ in mm?
answer: 25
verify: round(5 * 0.5 / (1e4) ** 0.5 * 1000, 6)
explain: δ = 5x/√Re_x = 5 × 0.5/100 = 0.025 m = 25 mm.
```

```quiz
q: A spillway model is built at 1 : 25 scale under Froude similarity. The prototype velocity is 10 m/s. What is the model velocity in m/s?
answer: 2
verify: 10 / 25 ** 0.5
explain: V_m = V_p/√25 = 10/5 = 2 m/s.
```

```quiz
q: Flow separation from a surface occurs when:
* The pressure increases along the flow and the wall shear becomes zero
- The pressure decreases along the flow
- The Reynolds number is very low everywhere
- The surface is perfectly smooth
explain: An adverse pressure gradient slows the near-wall fluid until (∂u/∂y) at the wall = 0, where it separates.
```

```quiz
q: A ship model is tested at 1 : 16 scale under Froude similarity. The model speed is 2 m/s. What is the prototype speed in m/s?
answer: 8
verify: 2 * 16 ** 0.5
explain: V_p = V_m √16 = 8 m/s.
```

```quiz
q: A sphere has drag coefficient 0.5 and frontal area 0.01 m² in air (ρ = 1.2 kg/m³) at 20 m/s. What is the drag force in N?
answer: 1.2
verify: round(0.5 * 0.5 * 1.2 * 20 ** 2 * 0.01, 6)
explain: F_D = C_D(½ρV²)A = 0.5 × 240 × 0.01 = 1.2 N.
```
