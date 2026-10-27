---
title: Plane Waves, Reflection and Skin Effect
chapter: Waves
description: Wave equation, uniform plane waves in lossless and lossy media, intrinsic impedance, polarisation, skin depth, Poynting vector, reflection at normal and oblique incidence, Brewster and critical angles.
---
Maxwell's equations predict waves. This lesson covers how plane waves travel, lose energy in conductors, and reflect at boundaries. The static and time-varying field laws are in [Electromagnetic Fields](../ee-emf/index.html).

## Uniform plane waves

In a source-free medium, E and H satisfy the wave equation and travel together, perpendicular to each other and to the direction of travel (TEM).

- **Phase velocity** v = 1/√(με) = c/√(μ_r ε_r).
- **Intrinsic impedance η = √(μ/ε)**; free space η₀ = 120π ≈ 377 Ω. In a dielectric with μ_r = 1: η = 377/√ε_r.
- Propagation constant γ = α + jβ, with β = ω√(με) = 2π/λ in a lossless medium.

**Polarisation:** linear (E stays on a line), circular (equal, 90° out-of-phase components), elliptical (general).

## Lossy media and skin depth

- **Loss tangent** σ/(ωε): ≪ 1 for a good dielectric, ≫ 1 for a good conductor.
- In a good conductor: α = β = √(πfμσ); **skin depth δ = 1/√(πfμσ)**. Fields fall to 1/e (37%) in one skin depth; at 1 MHz in copper, δ ≈ 66 µm.
- Surface resistance R_s = 1/(σδ).

## Power flow

**Poynting vector** P = E × H. For a plane wave, the time-average power density = **E₀²/(2η)**.

## Reflection at normal incidence

From medium 1 (η₁) to medium 2 (η₂):

- **Reflection coefficient Γ = (η₂ − η₁)/(η₂ + η₁)**; transmission coefficient τ = 1 + Γ = 2η₂/(η₂ + η₁).
- A perfect conductor (η₂ = 0) gives Γ = −1: a **standing wave**.
- **Standing wave ratio** SWR = (1 + |Γ|)/(1 − |Γ|).
- Reflected power fraction = |Γ|².

## Oblique incidence

- **Snell's law:** n₁ sin θ₁ = n₂ sin θ₂ (n = √ε_r).
- **Critical angle** (from denser to rarer): sin θ_c = n₂/n₁; beyond it, **total internal reflection** (optical fibres).
- **Brewster angle** (parallel polarisation is fully transmitted): **tan θ_B = n₂/n₁ = √(ε₂/ε₁)**.

## Worked example

A plane wave goes from air into a lossless dielectric with ε_r = 4 at normal incidence.

- η₂ = 377/2 = 188.5 Ω; **Γ = −1/3**; reflected power = 1/9 = 11.1%; SWR = 2.

## Practice

```quiz
q: What is the skin depth (µm) of copper (σ = 5.8 × 10⁷ S/m) at 1 MHz? (Give 1 decimal place.)
answer: 66.1
verify: round(1 / (__import__("math").pi * 1e6 * 4e-7 * __import__("math").pi * 5.8e7) ** 0.5 * 1e6, 1)
explain: δ = 1/√(πfμ₀σ) = 66.1 µm.
```

```quiz
q: What is the Brewster angle in degrees for a wave going from air into a dielectric with ε_r = 4? (Give 2 decimal places.)
answer: 63.43
verify: round(__import__("math").degrees(__import__("math").atan(2)), 2)
explain: tan θ_B = √4 = 2, so θ_B = 63.43°.
```

```quiz
q: Light in glass (n = 1.5) meets air. What is the critical angle in degrees? (Give 2 decimal places.)
answer: 41.81
verify: round(__import__("math").degrees(__import__("math").asin(1 / 1.5)), 2)
explain: sin θ_c = 1/1.5, θ_c = 41.81°.
```

```quiz
q: A plane wave hits a perfect conductor at normal incidence. The reflection coefficient is:
- 0
- +1
* −1
- 1/3
explain: η₂ = 0 gives Γ = −1: total reflection with a phase reversal of E.
```
