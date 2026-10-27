---
title: Flexible and Rigid Pavement Design
chapter: Pavements
description: Flexible pavement design with traffic in msa, vehicle damage factor and fourth power law, CBR method, rigid pavement stresses (Westergaard), radius of relative stiffness, temperature stresses and joints.
---
A **flexible** pavement (bituminous) spreads load through layers; a **rigid** pavement (concrete slab) carries it by bending. Both are designed for the traffic they will carry over their life.

## Traffic for flexible pavements (IRC:37)

Traffic is expressed in **million standard axles (msa)** of 80 kN:

**N = 365 A [(1 + r)ⁿ − 1]/r × D × F**

- A = initial commercial vehicles per day (after growth up to opening), r = growth rate, n = design life (years).
- D = **lane distribution factor** (for example 0.75 per direction on a two-lane road).
- F = **vehicle damage factor (VDF)**.
- **Fourth power law:** damage ∝ (axle load/standard axle load)⁴. A 160 kN axle does 16 times the damage of an 80 kN axle.

## Flexible pavement design

- **CBR method:** the older approach read the total thickness from design charts for the subgrade CBR and traffic; IRC:37 now uses mechanistic–empirical design.
- **Mechanistic checks:** horizontal tensile strain at the bottom of the bituminous layer (fatigue cracking) and vertical compressive strain on top of the subgrade (**rutting**).
- **Equivalent single wheel load (ESWL)** for dual wheels.
- Layers: subgrade, granular sub-base, base, binder course, surface course.

## Rigid pavement stresses (Westergaard)

- **Radius of relative stiffness:** **l = [E h³/(12(1 − μ²) k)]^(1/4)**.
- Load stresses are critical at the **corner**, edge and interior; the edge and corner usually govern.
- **Corner stress** (Goldbeck, simple): σ = 3P/h².
- **Temperature (warping) stresses:** σ = (Eα Δt/2) C (Bradbury's coefficient C).
- **Frictional stress** when a slab contracts: the subgrade friction on half the slab length, σ_f = γ_c L f/2 (γ_c = unit weight of concrete, L = slab length, f = friction coefficient). It limits the spacing of contraction joints.

## Joints in concrete pavements

- **Contraction joints** (control cracking), with **dowel bars** for load transfer.
- **Expansion joints** (allow expansion), with gap filler.
- **Longitudinal joints**, held together by **tie bars**.
- Spacing of contraction joints depends on friction and slab weight.

## Worked example

Initial traffic A = 2000 CVPD, r = 7.5%, n = 15 years, D = 0.75, F = 3.5.

- Growth sum = [(1.075)¹⁵ − 1]/0.075 = 26.12.
- N = 365 × 2000 × 26.12 × 0.75 × 3.5 = **50.05 msa**.

## Practice

```quiz
q: By the fourth power law, how many times more damage does a 120 kN axle do than an 80 kN standard axle? (Give 4 decimal places.)
answer: 5.0625
verify: round((120 / 80) ** 4, 4)
explain: (120/80)⁴ = 1.5⁴ = 5.0625.
```

```quiz
q: A slab has E = 30,000 MPa, h = 250 mm, μ = 0.15 and k = 0.06 N/mm³. What is the radius of relative stiffness in mm? (Round to the nearest integer.)
answer: 903
verify: round((30000 * 250 ** 3 / (12 * (1 - 0.15 ** 2) * 0.06)) ** 0.25)
explain: l = [30,000 × 15.625 × 10⁶/(12 × 0.9775 × 0.06)]^(1/4) = (6.66 × 10¹¹)^(1/4) ≈ 903 mm.
```

```quiz
q: Using the simple corner formula σ = 3P/h², what is the corner stress (MPa) for a 50 kN wheel load on a 250 mm slab?
answer: 2.4
verify: round(3 * 50000 / 250 ** 2, 6)
explain: σ = 3 × 50,000/62,500 = 2.4 MPa.
```

```quiz
q: Dowel bars in a concrete pavement are provided at:
* Transverse (contraction and expansion) joints, for load transfer
- Longitudinal joints, to hold slabs together
- The subgrade only
- Every 1 m along the slab
explain: Dowels transfer wheel loads across transverse joints while letting the slabs move; tie bars hold longitudinal joints together.
```
