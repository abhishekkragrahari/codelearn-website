---
title: Hydrology: Precipitation, Losses and Runoff
chapter: Hydrology
description: Hydrologic cycle, rain gauges and average rainfall (arithmetic, Thiessen, isohyetal), double mass curve, evaporation and infiltration, phi-index, rational method and hydrographs.
---
Hydrology estimates how much water a catchment gives and when. It feeds the design of dams, bridges, drains and irrigation systems.

## Precipitation

- **Rain gauges:** non-recording (Symons) and recording (tipping bucket, weighing, float).
- **Average rainfall over a catchment:**
  - Arithmetic mean (flat areas, even gauges).
  - **Thiessen polygon:** each gauge weighted by its area of influence: P = Σ PᵢAᵢ/ΣAᵢ.
  - **Isohyetal:** areas between lines of equal rainfall; the most accurate.
- **Missing data** (normal ratio method): P_x = (N_x/n) Σ(Pᵢ/Nᵢ), used when normal rainfalls differ by more than 10%.
- **Double mass curve:** checks the consistency of a gauge record; a break in slope means a change in the gauge site or exposure.
- **Optimum number of gauges:** N = (C_v/ε)², with C_v the coefficient of variation of rainfall and ε the allowable error (%).

## Losses

- **Evaporation:** measured with pans (Class A pan coefficient about 0.7).
- **Infiltration:** Horton's equation f = f_c + (f₀ − f_c) e^(−kt).
- **φ-index:** the constant loss rate such that rainfall above it equals the runoff volume. **W-index** excludes initial losses.

## Runoff

- **Rational method** (small catchments): **Q = C i A/3.6** (Q in m³/s, i in mm/h, A in km²), with i for a duration equal to the **time of concentration** t_c.
- t_c from Kirpich's formula.
- Runoff coefficient C is about 0.7–0.95 for paved areas and 0.1–0.3 for grassland.

## Hydrographs

A **hydrograph** plots discharge against time at a point: rising limb, crest, recession limb. **Base flow** is separated out to get the **direct runoff hydrograph (DRH)**.

## Worked example

A catchment of 2 km² has C = 0.5 and design intensity 72 mm/h.

- Q = 0.5 × 72 × 2/3.6 = **20 m³/s**.

## Practice

```quiz
q: Rainfall of 6 cm falls in 3 hours on a catchment and the runoff is 3 cm. If there is no initial loss, what is the φ-index in cm/h?
answer: 1
verify: (6 - 3) / 3
explain: Losses = 3 cm in 3 h, so φ = 1 cm/h (assuming rainfall intensity was above φ throughout).
```

```quiz
q: Three gauges have Thiessen areas 20, 30 and 50 km² and rainfalls 40, 60 and 80 mm. What is the average rainfall in mm?
answer: 66
verify: (20 * 40 + 30 * 60 + 50 * 80) / 100
explain: P = (800 + 1800 + 4000)/100 = 66 mm.
```

```quiz
q: For a coefficient of variation of 30% and an allowable error of 10%, how many rain gauges are needed?
answer: 9
verify: (30 / 10) ** 2
explain: N = (C_v/ε)² = 3² = 9.
```

```quiz
q: A 1.8 km² urban catchment has C = 0.8 and i = 50 mm/h. What is the peak runoff in m³/s?
answer: 20
verify: round(0.8 * 50 * 1.8 / 3.6, 6)
explain: Q = CiA/3.6 = 0.8 × 50 × 1.8/3.6 = 20 m³/s.
```
