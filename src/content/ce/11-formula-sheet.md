---
title: GATE CE Formula Sheet for Quick Revision
chapter: Exam Prep
description: GATE Civil Engineering important formulas on one page: solid mechanics, structures, RCC, soil mechanics, fluids, hydrology, environmental and transportation.
---
The formulas that GATE Civil Engineering numerical questions use most, subject by subject. Use this page for revision after you have studied each subject's lesson.

## Solid mechanics and structures

| Formula | Meaning |
| --- | --- |
| σ = P/A, ε = δL/L, E = σ/ε | Stress, strain, Young's modulus |
| δ = PL/(AE) | Elongation of a bar under axial load |
| σ = My/I | Bending stress (flexure formula) |
| τ = Tr/J | Shear stress in a circular shaft |
| I = bd³/12 (rectangle), πd⁴/64 (circle) | Second moment of area about the centroid |
| Simply supported, UDL w: M_max = wL²/8, δ_max = 5wL⁴/(384EI) | Beam formulas |
| Simply supported, central load P: M_max = PL/4, δ_max = PL³/(48EI) | Beam formulas |
| Cantilever, end load P: δ = PL³/(3EI) | Beam formulas |
| P_cr = π²EI/L_e² | Euler buckling load (L_e = effective length) |
| D_s = (m + r) − 2j (plane truss) | Static indeterminacy; m members, r reactions, j joints |

See [Mechanics and solid mechanics](mechanics-solid-mechanics.html) and [Structural analysis](structural-analysis.html).

## Concrete and steel (limit state)

| Formula | Meaning |
| --- | --- |
| x_u,max/d = 0.48 (Fe 415), 0.46 (Fe 500) | Limiting neutral axis depth |
| M_u,lim = 0.138 f_ck b d² (Fe 415) | Limiting moment of resistance |
| 0.36 f_ck b x_u = 0.87 f_y A_st | Neutral axis from force balance |
| Design load = 1.5 × (dead + live) | Load factor for the strength limit state |

See [Concrete and steel](concrete-steel-construction.html).

## Geotechnical engineering

| Formula | Meaning |
| --- | --- |
| e = n/(1 − n), Se = wG | Void ratio, porosity, degree of saturation |
| γ_d = Gγ_w/(1 + e) = γ/(1 + w) | Dry unit weight |
| k from Darcy: v = ki, Q = kiA | Flow through soil |
| σ' = σ − u | Effective stress |
| τ = c + σ' tan φ | Mohr–Coulomb strength |
| K_a = (1 − sin φ)/(1 + sin φ), K_p = 1/K_a | Rankine earth pressure coefficients |
| T_v = c_v t / d² | Consolidation time factor |

See [Geotechnical engineering](geotechnical-engineering.html).

## Fluid mechanics and hydrology

| Formula | Meaning |
| --- | --- |
| Q = AV, p/γ + V²/2g + z = constant | Continuity and Bernoulli |
| h_f = fLV²/(2gD) | Darcy–Weisbach head loss |
| Re = VD/ν | Laminar pipe flow below about 2000 |
| V = (1/n) R^(2/3) S^(1/2) | Manning's formula |
| Fr = V/√(gy) | Froude number; critical flow at Fr = 1 |
| Q = CIA | Rational method for peak runoff (consistent units) |
| Δ = 8.64 B/D | Duty D (ha/cumec), delta Δ (m), base period B (days) |

See [Fluid mechanics](fluid-mechanics-hydraulics.html) and [Hydrology](hydrology-irrigation.html).

## Environmental and transportation

| Formula | Meaning |
| --- | --- |
| BOD_t = L₀(1 − e^(−kt)) | BOD exerted in t days (k base e) |
| Detention time = volume / flow | Settling tanks and reactors |
| SSD = vt + v²/(2gf) | Stopping sight distance (v in m/s) |
| e + f = v²/(gR) | Superelevation and side friction on a curve |
| Flow q = k × v | Traffic flow = density × speed |

See [Environmental engineering](environmental-engineering.html) and [Transportation](transportation-engineering.html).

## Check yourself

```quiz
q: A simply supported beam of span 6 m carries a UDL of 10 kN/m. What is the maximum bending moment in kN·m?
answer: 45
verify: 10 * 6 ** 2 / 8
explain: M_max = wL²/8 = 10 × 36/8 = 45 kN·m.
```

```quiz
q: A soil has porosity 0.375. What is its void ratio?
answer: 0.6
verify: round(0.375 / (1 - 0.375), 6)
explain: e = n/(1 − n) = 0.375/0.625 = 0.6.
```

```quiz
q: For φ = 30°, what is the Rankine passive earth pressure coefficient K_p?
answer: 3
verify: round((1 + __import__("math").sin(__import__("math").radians(30))) / (1 - __import__("math").sin(__import__("math").radians(30))), 6)
explain: K_p = (1 + sin 30°)/(1 − sin 30°) = 1.5/0.5 = 3.
```

```quiz
q: A plane truss has 9 members, 3 reactions and 6 joints. What is its degree of static indeterminacy?
answer: 0
verify: 9 + 3 - 2 * 6
explain: D_s = m + r − 2j = 9 + 3 − 12 = 0: statically determinate.
```

```quiz
q: Traffic moves at 40 km/h with a density of 50 vehicles/km. What is the flow in vehicles per hour?
answer: 2000
verify: 40 * 50
explain: q = k × v = 50 × 40 = 2000 veh/h.
```
