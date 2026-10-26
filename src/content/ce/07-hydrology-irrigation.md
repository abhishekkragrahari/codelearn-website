---
title: Hydrology and Irrigation
chapter: Water Resources Engineering
description: GATE CE syllabus for hydrology and irrigation, with precipitation, infiltration indices, the rational method, hydrographs and unit hydrographs, flood routing, well hydraulics, crop water requirements, duty and delta, with solved examples.
---
## Syllabus

- **Hydrology**: hydrologic cycle, precipitation, evaporation, evapotranspiration, infiltration, watersheds, hydrographs and unit hydrographs, flood estimation and routing, reservoir capacity, groundwater and well hydraulics.
- **Irrigation**: crop water requirements, duty, delta and base period, irrigation methods and efficiencies, design of lined and unlined canals (Kennedy and Lacey), cross-drainage works, gravity dams and spillways.

## Key concepts and formulas

**Precipitation.** Average rainfall over a basin: arithmetic mean, Thiessen polygons (area-weighted), or isohyets. A missing record can be estimated by the normal ratio method: P<sub>x</sub> = (N<sub>x</sub>/n) Σ (P<sub>i</sub>/N<sub>i</sub>).

**Infiltration.** Horton's equation f = f<sub>c</sub> + (f<sub>0</sub> − f<sub>c</sub>)e<sup>−kt</sup>. The **φ-index** is the constant loss rate such that rainfall above it equals the observed runoff.

**Rational method:** **Q = CIA/3.6**, with Q in m³/s, I in mm/h and A in km² (C is the runoff coefficient). The design intensity is for a duration equal to the time of concentration.

**Unit hydrograph.** The direct runoff hydrograph from 1 cm of effective rain falling uniformly over the basin in a given duration. Runoff from P cm of effective rain is P times the ordinates (linearity). The area under a unit hydrograph equals 1 cm of runoff over the catchment: Σ Q Δt = A × 0.01 m.

**Flood routing.** Muskingum: storage S = K[xI + (1 − x)Q], and O₂ = C₀I₂ + C₁I₁ + C₂O₁ with C₀ + C₁ + C₂ = 1.

**Well hydraulics (steady flow).**

- Confined aquifer of thickness b (Thiem): **Q = 2πKb(H − h)/ln(R/r)**
- Unconfined aquifer (Dupuit): **Q = πK(H² − h²)/ln(R/r)**
- Transmissivity T = Kb.

**Irrigation.**

- **Delta** Δ (total depth of water for a crop), **duty** D (hectares per cumec), base period B (days): **Δ = 8.64B/D** metres.
- Consumptive use, effective rainfall, and net and gross irrigation requirements; irrigation efficiencies (conveyance, application).
- **Lacey's** regime theory: velocity V = √(2fR/5), wetted perimeter P = 4.75√Q, and silt factor f = 1.76√d (d = mean particle size in mm).
- **Gravity dam**: the resultant must lie within the middle third to avoid tension at the heel; the uplift pressure acts at the base.

## Worked example

A crop has a base period of 120 days and a duty of 1728 ha/cumec. Find its delta. A catchment of 2.5 km² with C = 0.4 receives a design storm of 60 mm/h: find the peak runoff by the rational method. Finally, find the discharge from a fully penetrating well in a confined aquifer.

```python
import math

B, D = 120, 1728
print(f"delta = {8.64 * B / D:.3f} m")
C, I, A = 0.4, 60, 2.5
print(f"rational method Q = {C * I * A / 3.6:.3f} m3/s")
K, b, H, h, R, r = 30 / 86400, 20, 40, 34, 500, 0.15   # K in m/s (30 m/day)
Q = 2 * math.pi * K * b * (H - h) / math.log(R / r)
print(f"confined well Q = {Q:.5f} m3/s = {Q * 86400:.1f} m3/day")
```
```output
delta = 0.600 m
rational method Q = 16.667 m3/s
confined well Q = 0.03227 m3/s = 2788.5 m3/day
```

## Practice questions

```quiz
q: The duty of a canal is 864 ha/cumec for a crop with a base period of 100 days. What is the delta in metres?
answer: 1
verify: 8.64 * 100 / 864
explain: Δ = 8.64B/D = 8.64 × 100/864 = 1 m.
```

```quiz
q: A 5 km² catchment with runoff coefficient 0.3 receives rain at 36 mm/h. What is the peak discharge by the rational method, in m³/s?
answer: 15
verify: round(0.3 * 36 * 5 / 3.6, 4)
explain: Q = CIA/3.6 = 0.3 × 36 × 5/3.6 = 15 m³/s.
```

```quiz
q: The ordinates of a 4-hour unit hydrograph are known. What is the direct runoff peak from a 4-hour storm with 3 cm of effective rainfall, if the unit hydrograph peak is 50 m³/s?
answer: 150
verify: 3 * 50
explain: By linearity, the ordinates scale with the effective rainfall: 3 × 50 = 150 m³/s.
```

```quiz
q: In steady flow to a well in an unconfined aquifer, if the drawdown at the well is doubled (all other quantities the same, with H² − h² as the driving term), the discharge:
- doubles exactly
* changes in proportion to H² − h², so it does not exactly double
- halves
- stays the same
explain: Q = πK(H² − h²)/ln(R/r). H² − h² = (H − h)(H + h) is not proportional to the drawdown H − h alone, because H + h also changes. In a confined aquifer, Q is proportional to the drawdown.
```
