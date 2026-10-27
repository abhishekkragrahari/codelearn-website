---
title: GATE ME Formula Sheet for Quick Revision
chapter: Exam Prep
description: GATE Mechanical Engineering important formulas on one page: SOM, TOM and vibrations, design, fluids, thermodynamics, heat transfer, manufacturing and IE.
---
The formulas that GATE Mechanical Engineering numerical questions use most, subject by subject. Use this page for revision after studying each lesson.

## Strength of materials

| Formula | Meaning |
| --- | --- |
| δ = PL/(AE), σ = My/I, τ = Tr/J | Axial, bending and torsion |
| E = 2G(1 + ν) | Relation between elastic constants |
| σ₁,₂ = (σx + σy)/2 ± √(((σx − σy)/2)² + τ²) | Principal stresses |
| σ_h = pd/(2t), σ_l = pd/(4t) | Thin cylinder hoop and longitudinal stress |
| P_cr = π²EI/L_e² | Euler buckling load |

See [Mechanics and strength of materials](mechanics-strength-of-materials.html).

## Theory of machines and vibrations

| Formula | Meaning |
| --- | --- |
| ω_n = √(k/m), f_n = ω_n/(2π) | Natural frequency of a spring–mass system |
| ζ = c/(2√(km)) | Damping ratio |
| Logarithmic decrement δ = 2πζ/√(1 − ζ²) | From successive amplitudes: δ = ln(x₁/x₂) |
| Gear ratio = N₁/N₂ = T₂/T₁ | Speed and teeth of meshing gears |
| Grübler: F = 3(n − 1) − 2j₁ − j₂ | Degrees of freedom of a planar mechanism |

See [Theory of machines and vibrations](theory-of-machines-vibrations.html).

## Machine design

| Formula | Meaning |
| --- | --- |
| Factor of safety = failure stress / working stress | Design margin |
| Goodman: σa/Se + σm/Sut = 1/N | Fatigue under mean and alternating stress |
| L₁₀ = (C/P)^3 million revolutions | Ball bearing life (exponent 10/3 for roller bearings) |
| Max shear stress theory: τ_max = S_y/(2N) | Tresca criterion |

See [Machine design](machine-design.html).

## Fluid mechanics

| Formula | Meaning |
| --- | --- |
| p/ρg + V²/2g + z = constant | Bernoulli along a streamline |
| h_f = fLV²/(2gD); laminar f = 64/Re | Darcy–Weisbach |
| F = ρQ(V₁ − V₂) | Momentum equation (jet force) |
| Re = ρVD/μ | Reynolds number |

See [Fluid mechanics](fluid-mechanics.html).

## Thermodynamics and applications

| Formula | Meaning |
| --- | --- |
| Q − W = ΔU (closed), q − w = Δh + ΔKE + ΔPE (open) | First law |
| η_Carnot = 1 − T_L/T_H | Carnot efficiency (kelvin) |
| COP_R = T_L/(T_H − T_L), COP_HP = COP_R + 1 | Carnot refrigerator and heat pump |
| η_Otto = 1 − 1/r^(γ−1) | Otto cycle efficiency |
| pv = RT, pv^n = constant | Ideal gas and polytropic process |

See [Thermodynamics and applications](thermodynamics-applications.html).

## Heat transfer

| Formula | Meaning |
| --- | --- |
| Q = kAΔT/L | Conduction through a plane wall |
| R = L/(kA) (conduction), 1/(hA) (convection) | Thermal resistances add in series |
| Q = σεA(T₁⁴ − T₂⁴) | Radiation, σ = 5.67 × 10⁻⁸ W/m²K⁴ |
| LMTD = (ΔT₁ − ΔT₂)/ln(ΔT₁/ΔT₂) | Heat exchanger |
| Bi = hL_c/k | Lumped analysis valid when Bi < 0.1 |

See [Heat transfer](heat-transfer.html).

## Manufacturing and industrial engineering

| Formula | Meaning |
| --- | --- |
| VT^n = C | Taylor tool life |
| Merchant: 2φ + β − α = 90° | Shear angle relation |
| EOQ = √(2DS/H) | Economic order quantity |
| Break-even quantity = fixed cost / (price − variable cost) | Break-even analysis |

See [Materials and manufacturing](materials-manufacturing.html) and [Industrial engineering](industrial-engineering.html).

## Check yourself

```quiz
q: A spring of stiffness 400 N/m carries a 4 kg mass. What is the natural frequency in rad/s?
answer: 10
verify: round((400 / 4) ** 0.5, 6)
explain: ω_n = √(k/m) = √100 = 10 rad/s.
```

```quiz
q: A Carnot engine works between 600 K and 300 K. What is its efficiency?
answer: 0.5
verify: 1 - 300 / 600
explain: η = 1 − 300/600 = 0.5.
```

```quiz
q: Annual demand is 1000 units, ordering cost ₹50 per order and holding cost ₹4 per unit per year. What is the EOQ?
answer: 158.11
verify: round((2 * 1000 * 50 / 4) ** 0.5, 2)
explain: EOQ = √(2 × 1000 × 50/4) = √25000 ≈ 158.11 units.
```

```quiz
q: A wall 0.2 m thick with k = 1 W/mK and area 10 m² has a temperature difference of 40 K. What is the heat flow in W?
answer: 2000
verify: 1 * 10 * 40 / 0.2
explain: Q = kAΔT/L = 1 × 10 × 40/0.2 = 2000 W.
```

```quiz
q: A planar mechanism has 4 links and 4 lower pairs (revolute joints). How many degrees of freedom does it have?
answer: 1
verify: 3 * (4 - 1) - 2 * 4
explain: F = 3(4 − 1) − 2 × 4 = 9 − 8 = 1 (the four-bar linkage).
```
