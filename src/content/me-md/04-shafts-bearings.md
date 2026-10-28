---
title: Shafts, Keys, Couplings and Bearings
chapter: Joints and Shafts
description: Shaft design for strength and rigidity, keys and couplings, rolling contact bearing life and equivalent load, and sliding bearings with Petroff's equation and Sommerfeld number.
---
Shafts carry power; keys and couplings connect them to hubs and to other shafts; bearings support them. GATE asks for shaft sizes, key stresses and especially **bearing life**.

## Shafts

- **Strength:** with moment M and torque T, use the equivalent torque √(M² + T²) (Tresca) or √(M² + 0.75T²) (von Mises). See [static design](static-design-failure.html).
- **Rigidity:** limit the angle of twist θ = TL/(GJ), often to about 0.25° per metre.
- ASME code adds shock factors K_m and K_t to M and T.

## Keys

A rectangular sunk key of width w, height h and length l on a shaft of diameter d carries torque T through a tangential force F = 2T/d.

- **Shear** of the key: τ = F/(w l).
- **Crushing** of the key: σ_c = F/(l h/2).
- A **square key** (w = h) is equally strong in shear and crushing when σ_c = 2τ.

## Couplings

- **Rigid** (sleeve, flange) couplings need accurately aligned shafts.
- **Flexible** couplings (bush-pin, Oldham, universal joint) allow some misalignment. A **universal (Hooke's) joint** connects intersecting shafts; its output speed varies within each turn.

## Rolling contact bearings

- **Rating life** (90% reliability): **L₁₀ = (C/P)^a** million revolutions, with a = 3 for ball bearings and 10/3 for roller bearings. C is the dynamic load rating.
- **Equivalent dynamic load:** P = X V F_r + Y F_a (radial and axial loads with factors X, Y; V = rotation factor).
- Life in hours = L₁₀ × 10⁶/(60 N).
- Doubling the load on a ball bearing cuts its life by 2³ = 8.

## Sliding (journal) bearings

- **Petroff's equation** (lightly loaded): friction coefficient f = 2π² (μN/p)(r/c), where μ is viscosity, N speed (rev/s), p bearing pressure, c radial clearance.
- **Sommerfeld number** S = (r/c)² (μN/p): the main design number of hydrodynamic bearings.

## Worked example

A ball bearing has C = 30 kN and carries P = 3 kN at 1000 rpm. Find its life in hours.

- L₁₀ = (30/3)³ = 1000 million revolutions.
- Hours = 1000 × 10⁶/(60 × 1000) = **16,667 h**.

## Practice

```quiz
q: A roller bearing has C = 40 kN and P = 4 kN. What is its L₁₀ life in million revolutions? (Round to the nearest integer.)
answer: 2154
verify: round((40 / 4) ** (10 / 3))
explain: L₁₀ = 10^(10/3) ≈ 2154 million revolutions.
```

```quiz
q: A shaft of diameter 50 mm transmits 500 N·m through a key 15 mm wide and 60 mm long. What is the shear stress in the key in MPa? (Give 2 decimal places.)
answer: 22.22
verify: round(2 * 500e3 / 50 / (15 * 60), 2)
explain: F = 2T/d = 2 × 500,000/50 = 20,000 N; τ = 20,000/(15 × 60) = 22.22 MPa.
```

```quiz
q: If the load on a ball bearing is halved, its rated life becomes:
- Twice
- Four times
* Eight times
- Sixteen times
explain: L ∝ (1/P)³ for ball bearings, so halving P gives 2³ = 8 times the life.
```

```quiz
q: Which coupling connects two shafts whose axes intersect at an angle?
- Sleeve coupling
- Flange coupling
* Universal (Hooke's) joint
- Oldham coupling
explain: A Hooke's joint joins intersecting shafts; an Oldham coupling joins parallel shafts with a small offset.
```

```quiz
q: A ball bearing has a life of 90 million revolutions at a load of P. What is its life (million revolutions) if the load becomes 3P?
answer: 3.33
verify: round(90 / 3 ** 3, 2)
explain: L ∝ 1/P³, so L = 90/27 = 3.33 million revolutions.
```

```quiz
q: A bearing rated for 500 million revolutions runs at 1000 rpm. What is its life in hours? (Give 2 decimal places.)
answer: 8333.33
verify: round(500e6 / (60 * 1000), 2)
explain: Hours = 500 × 10⁶/(60 × 1000) = 8333.33 h.
```
