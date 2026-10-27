---
title: Fluid Properties, Pressure and Manometers
chapter: Fluid Statics
description: Density, viscosity and Newton's law of viscosity, surface tension and capillarity, hydrostatic pressure, gauge and absolute pressure, and manometer problems with solved examples.
---
Fluid mechanics begins with the properties of fluids and with fluids at rest, where pressure depends only on depth.

## Fluid properties

- **Density** ρ (kg/m³); specific weight γ = ρg; specific gravity = ρ/ρ_water (ρ_water = 1000 kg/m³).
- **Viscosity:** Newton's law of viscosity, **τ = μ du/dy**. μ is the dynamic viscosity (Pa·s); ν = μ/ρ is the kinematic viscosity (m²/s).
  - Liquids get **less** viscous when heated; gases get **more** viscous.
  - Non-Newtonian fluids: shear-thinning (paint), shear-thickening, Bingham plastic (toothpaste).
- **Surface tension** σ (N/m): pressure inside a droplet Δp = 4σ/d; inside a soap bubble (two surfaces) Δp = 8σ/d.
- **Capillary rise** in a tube of diameter d: **h = 4σ cos θ/(ρ g d)**. Water rises (θ ≈ 0°); mercury falls (θ > 90°).
- **Bulk modulus** K = −dp/(dV/V); compressibility = 1/K.

## Hydrostatic pressure

In a fluid at rest, pressure increases with depth:

**p = p₀ + ρ g h**

- Pressure at a point is the same in all directions (Pascal's law).
- **Absolute pressure** = gauge pressure + atmospheric pressure (about 101.3 kPa).
- Points at the same level in the **same continuous fluid** at rest have the same pressure.

## Manometers

Start at one end, add ρgh going down and subtract going up, and set the sum equal to the pressure at the other end.

- **Piezometer:** p = ρgh (only for small positive gauge pressures of liquids).
- **U-tube:** p_A + ρ₁ g h₁ − ρ_m g h_m = p_atm.
- **Differential manometer** between two pipes A and B with the same fluid ρ and manometer fluid ρ_m, reading x: **p_A − p_B = (ρ_m − ρ) g x** (when A and B are at the same level).

## Worked example

Water flows in two pipes at the same level connected by a mercury differential manometer (SG 13.6) with a reading of 100 mm. Find p_A − p_B.

- p_A − p_B = (13600 − 1000) × 9.81 × 0.1 = **12.36 kPa**.
- In metres of water: 12.6 × 0.1 = 1.26 m.

## Practice

```quiz
q: What is the gauge pressure (kPa) at 5 m depth in oil of specific gravity 0.8? (g = 9.81 m/s², give 2 decimal places.)
answer: 39.24
verify: round(800 * 9.81 * 5 / 1000, 2)
explain: p = ρgh = 800 × 9.81 × 5 = 39,240 Pa = 39.24 kPa.
```

```quiz
q: The velocity gradient in a fluid of μ = 0.1 Pa·s is 200 s⁻¹. What is the shear stress in Pa?
answer: 20
verify: round(0.1 * 200, 6)
explain: τ = μ du/dy = 0.1 × 200 = 20 Pa.
```

```quiz
q: Water (σ = 0.072 N/m, θ = 0°) is in a glass tube of diameter 1 mm. What is the capillary rise in mm? (g = 9.81 m/s², give 1 decimal place.)
answer: 29.4
verify: round(4 * 0.072 / (1000 * 9.81 * 0.001) * 1000, 1)
explain: h = 4σ/(ρgd) = 0.288/9.81 = 0.0294 m = 29.4 mm.
```

```quiz
q: When a liquid is heated, its viscosity generally:
* Decreases
- Increases
- Stays the same
- First rises then falls
explain: Heat weakens the cohesive forces between liquid molecules, so liquids flow more easily. Gases behave the opposite way.
```
