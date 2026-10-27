---
title: Faraday's Law and Maxwell's Equations
chapter: Time-Varying Fields
description: Faraday's law and Lenz's law, motional and transformer EMF, displacement current, Maxwell's equations in integral and point form, Poynting vector and basic wave propagation.
---
When fields change with time, electricity and magnetism become linked. Faraday's law explains generators and transformers; Maxwell's displacement current completes the picture and predicts electromagnetic waves.

## Faraday's law

**EMF = −N dΦ/dt**

The minus sign is **Lenz's law**: the induced current opposes the change that caused it.

- **Transformer EMF:** a stationary loop in a time-varying field: −∫(∂B/∂t)·dS.
- **Motional EMF:** a conductor moving in a field: **e = B l v** (perpendicular B, l and v), or ∮(v × B)·dl.
- Sinusoidal flux Φ_m sin ωt in N turns gives an RMS EMF of **4.44 f N Φ_m**.

## Displacement current

Ampere's law fails for a charging capacitor. Maxwell added the **displacement current density** J_d = ∂D/∂t:

∇ × H = J + ∂D/∂t

Ratio of conduction to displacement current in a material: **σ/(ωε)**. Good conductor if σ/(ωε) ≫ 1.

## Maxwell's equations

| Point form | Integral form | Name |
| --- | --- | --- |
| ∇·D = ρ_v | ∮D·dS = Q | Gauss's law |
| ∇·B = 0 | ∮B·dS = 0 | No monopoles |
| ∇ × E = −∂B/∂t | ∮E·dl = −dΦ/dt | Faraday's law |
| ∇ × H = J + ∂D/∂t | ∮H·dl = I + I_d | Ampere–Maxwell law |

Continuity: ∇·J = −∂ρ_v/∂t.

## Waves and power

- In a lossless medium the fields travel as waves at **v = 1/√(με)** (c = 3 × 10⁸ m/s in free space).
- **Intrinsic impedance** η = √(μ/ε); η₀ ≈ 377 Ω (120π).
- **Poynting vector** P = E × H (W/m²) gives the direction and density of power flow; average for a plane wave = E₀²/(2η).
- In a good conductor fields decay with the **skin depth** δ = 1/√(π f μ σ).

## Worked example

A 0.5 m rod moves at 10 m/s perpendicular to a 0.2 T field.

- e = Blv = 0.2 × 0.5 × 10 = **1 V**.

## Practice

```quiz
q: A coil of 200 turns has a flux of 5 mWb (peak) varying at 50 Hz. What is the RMS induced EMF in V?
answer: 222
verify: round(4.44 * 50 * 200 * 5e-3, 6)
explain: E = 4.44fNΦ_m = 4.44 × 50 × 200 × 0.005 = 222 V.
```

```quiz
q: The flux through a 100-turn coil falls uniformly from 0.04 Wb to 0 in 0.02 s. What is the magnitude of the induced EMF in V?
answer: 200
verify: 100 * 0.04 / 0.02
explain: The magnitude is NΔΦ/Δt = 100 × 0.04/0.02 = 200 V.
```

```quiz
q: A plane wave in free space has E₀ = 377 V/m. What is its average power density in W/m²? (Take η₀ = 377 Ω; give 1 decimal place.)
answer: 188.5
verify: round(377 ** 2 / (2 * 377), 1)
explain: P_avg = E₀²/(2η₀) = 377/2 = 188.5 W/m².
```

```quiz
q: Maxwell's correction to Ampere's law added:
* The displacement current ∂D/∂t
- The conduction current J
- Gauss's law for magnetism
- The Lorentz force
explain: Without ∂D/∂t, Ampere's law would contradict charge continuity, for example in a charging capacitor.
```
