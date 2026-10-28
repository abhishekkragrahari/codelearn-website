---
title: Irrigation Engineering
chapter: Irrigation
description: Crop water requirement, duty, delta and base period, consumptive use, irrigation efficiencies, soil moisture and frequency of irrigation, Lacey's and Kennedy's silt theories, and canal structures.
---
Irrigation supplies water to crops when rainfall is not enough. GATE asks about water requirement calculations, canal design by the silt theories, and hydraulic structures.

## Duty, delta and base period

- **Delta (Δ):** total depth of water a crop needs over its base period.
- **Duty (D):** area irrigated per cumec of continuous flow (ha/cumec).
- **Base period (B):** days from first to last watering.
- **Relation: Δ = 8.64 B/D** (Δ in m, B in days, D in ha/cumec).
- Duty is higher at the field than at the canal head (losses on the way).
- **Crop period** ≥ base period.

## Water requirement

- **Consumptive use (CU):** evapotranspiration + water in plant tissue. **Net irrigation requirement** = CU − effective rainfall.
- **Field irrigation requirement** = net requirement / application efficiency; **gross** = field requirement / conveyance efficiency.
- **Efficiencies:** conveyance, application, storage, and uniformity (distribution).

**Soil moisture:** field capacity (water held after free drainage), permanent wilting point, and available moisture = FC − PWP. Water depth to apply:

**d = (γ_d/γ_w) D (F_c − m₀)**, with D = root depth and m₀ the moisture content at which irrigation starts. **Frequency** = d/(daily consumptive use).

## Canal design: silt theories

**Kennedy's theory:** critical velocity V₀ = 0.55 m y^0.64 (m = critical velocity ratio); trial and error with Kutter's formula.

**Lacey's regime theory:**

- Silt factor f = 1.76 √d (d = particle size in mm).
- **Velocity: V = (Q f²/140)^(1/6)**.
- Hydraulic radius R = (5/2)(V²/f); **wetted perimeter P = 4.75 √Q**.
- Regime slope S = f^(5/3)/(3340 Q^(1/6)).

## Canal structures

- **Weirs and barrages** on permeable foundations: **Bligh's creep theory** (creep length L = C × H, safe if the hydraulic gradient H/L ≤ 1/C) and **Khosla's theory** (uplift pressures from the potential flow; exit gradient G_E = (H/d)(1/(π√λ))).
- Cross-drainage works: aqueduct (canal over drain), super-passage (drain over canal), syphon, level crossing.
- Canal falls, regulators, outlets (modular, semi-modular).

## Worked example

A crop has B = 120 days and duty 1728 ha/cumec at the field.

- Δ = 8.64 × 120/1728 = **0.6 m**.

## Practice

```quiz
q: The delta of a crop is 1.2 m and its base period 100 days. What is the duty in ha/cumec?
answer: 720
verify: 8.64 * 100 / 1.2
explain: D = 8.64B/Δ = 864/1.2 = 720 ha/cumec.
```

```quiz
q: By Lacey's theory, what is the wetted perimeter (m) of a regime canal carrying 64 m³/s?
answer: 38
verify: 4.75 * 64 ** 0.5
explain: P = 4.75√Q = 4.75 × 8 = 38 m.
```

```quiz
q: Root zone depth 1 m, field capacity 30%, irrigation starts at 18%, dry unit weight of soil 15 kN/m³ (γ_w = 10). What depth of water (mm) should be applied?
answer: 180
verify: round(15 / 10 * 1 * (0.30 - 0.18) * 1000, 6)
explain: d = (γ_d/γ_w) D (F_c − m₀) = 1.5 × 1 × 0.12 = 0.18 m = 180 mm.
```

```quiz
q: A cross-drainage work where the canal passes over a natural drain, with the drain flowing freely below, is called:
* An aqueduct
- A super-passage
- A level crossing
- An inlet
explain: In an aqueduct the canal is carried over the drain; in a super-passage the drain passes over the canal.
```

```quiz
q: A crop needs Δ = 0.96 m over a base period of 100 days. What is the duty in ha/cumec?
answer: 900
verify: round(8.64 * 100 / 0.96, 6)
explain: D = 8.64B/Δ = 864/0.96 = 900 ha/cumec.
```

```quiz
q: By Lacey's theory, what is the silt factor for a mean particle size of 0.64 mm? (Give 3 decimal places.)
answer: 1.408
verify: round(1.76 * 0.64 ** 0.5, 3)
explain: f = 1.76√d = 1.76 × 0.8 = 1.408.
```
