---
title: Unit Hydrographs, Flood Routing and Groundwater
chapter: Hydrology
description: Unit hydrograph theory and S-curve, peak flow from unit hydrographs, reservoir and channel routing (Muskingum), aquifers, Dupuit's well equations, and yield of wells.
---
The **unit hydrograph** turns any rainfall into a flood hydrograph. **Flood routing** follows the flood through reservoirs and rivers. **Groundwater** hydraulics sizes wells.

## Unit hydrograph

A D-hour unit hydrograph (UH) is the direct runoff hydrograph from **1 cm of effective rainfall** falling uniformly over the catchment in D hours.

- **Linearity:** ordinates scale with rainfall excess (3 cm in D hours → 3 × UH ordinates).
- **Time invariance:** later storms give the same shape, shifted in time.
- **Area under a UH** = catchment area × 1 cm. So for a catchment A (km²): Σ ordinates (m³/s) × Δt (h) × 3600 = A × 10⁶ × 0.01.
- To change the duration: superpose lagged UHs (for multiples of D), or use the **S-curve** (sum of an infinite series of D-hour UHs) for any duration.
- **Synthetic UH** (Snyder's method) for ungauged catchments.

## Flood routing

- **Reservoir (level-pool) routing:** continuity I − O = dS/dt; solved step by step (Puls method). The outflow peak is lower and later than the inflow peak, and it occurs where the outflow curve crosses the falling inflow curve.
- **Channel routing (Muskingum):** S = K[xI + (1 − x)O]; O₂ = C₀I₂ + C₁I₁ + C₂O₁ with C₀ + C₁ + C₂ = 1. K is roughly the travel time; x = 0 to 0.5 (0 for reservoirs).

## Groundwater

- **Aquifer:** a formation that stores and transmits water. **Confined** (between impermeable layers, may be artesian) or **unconfined** (water table aquifer).
- **Specific yield** (water that drains by gravity) + **specific retention** = porosity.
- **Transmissivity** T = k b (b = aquifer thickness). **Storativity** S.

**Steady flow to a well (Dupuit–Thiem):**

- Confined: **Q = 2π k b (h₂ − h₁)/ln(r₂/r₁)**
- Unconfined: **Q = π k (h₂² − h₁²)/ln(r₂/r₁)**

h are water levels at observation radii r. Using the well radius and **radius of influence** R gives the well's yield.

## Worked example

A 6-hour unit hydrograph has a peak of 50 m³/s. A storm gives 4 cm of effective rainfall in 6 hours, with base flow 10 m³/s.

- Peak flood = 4 × 50 + 10 = **210 m³/s**.

## Practice

```quiz
q: A 4-hour UH has ordinates at 4-hour intervals summing to 250 m³/s. What is the catchment area in km²?
answer: 360
verify: 250 * 4 * 3600 / (0.01 * 1e6)
explain: Volume = 250 × 4 × 3600 = 3.6 × 10⁶ m³ = A × 10⁶ × 0.01, so A = 360 km².
```

```quiz
q: A confined aquifer 20 m thick has k = 10⁻⁴ m/s. What is its transmissivity in m²/day?
answer: 172.8
verify: round(1e-4 * 20 * 86400, 6)
explain: T = kb = 10⁻⁴ × 20 = 0.002 m²/s = 172.8 m²/day.
```

```quiz
q: For the Muskingum method, C₀ = 0.2 and C₁ = 0.5. What is C₂?
answer: 0.3
verify: round(1 - 0.2 - 0.5, 6)
explain: C₀ + C₁ + C₂ = 1, so C₂ = 0.3.
```

```quiz
q: A storm of 3 cm effective rainfall in the UH duration falls on a catchment whose UH peak is 40 m³/s; base flow is 5 m³/s. What is the flood peak in m³/s?
answer: 125
verify: 3 * 40 + 5
explain: Peak = 3 × 40 + 5 = 125 m³/s (by linearity).
```
