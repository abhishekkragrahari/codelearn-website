---
title: Heat Exchangers: LMTD and Effectiveness-NTU
chapter: Heat Exchangers
description: Types of heat exchangers, parallel and counter flow, log mean temperature difference, fouling, capacity ratio, effectiveness and NTU method, and boiling and condensation basics.
---
A heat exchanger moves heat from a hot fluid to a cold one across a wall. Two methods size and rate them: **LMTD** when all temperatures are known, and **effectiveness–NTU** when the outlet temperatures are not.

## Types

- **Parallel flow:** both fluids enter at the same end. The cold outlet can never be hotter than the hot outlet.
- **Counter flow:** opposite ends. The most effective arrangement; the cold outlet can exceed the hot outlet.
- **Cross flow** (car radiators) and **shell-and-tube** exchangers use correction factors.

## LMTD method

**Q = U A ΔT_lm**, with

**ΔT_lm = (ΔT₁ − ΔT₂)/ln(ΔT₁/ΔT₂)**

- Parallel flow: ΔT₁ = T_h,in − T_c,in; ΔT₂ = T_h,out − T_c,out.
- Counter flow: ΔT₁ = T_h,in − T_c,out; ΔT₂ = T_h,out − T_c,in.
- If ΔT₁ = ΔT₂ (a balanced counter-flow exchanger), ΔT_lm = ΔT.
- For the same terminal temperatures, counter flow gives a larger LMTD, so it needs less area.

**Fouling** (deposits on the surfaces) adds resistance: 1/U = 1/h_i + R_f + 1/h_o (thin wall).

## Effectiveness–NTU method

- Heat capacity rates: C_h = ṁ_h c_h, C_c = ṁ_c c_c. C_min is the smaller.
- **Capacity ratio** C = C_min/C_max.
- **Q_max = C_min (T_h,in − T_c,in)**.
- **Effectiveness** ε = Q/Q_max.
- **NTU = UA/C_min**.

| Arrangement | ε |
| --- | --- |
| Parallel flow | [1 − exp(−NTU(1 + C))]/(1 + C) |
| Counter flow | [1 − exp(−NTU(1 − C))]/[1 − C exp(−NTU(1 − C))] |
| Any type with C = 0 (condenser or evaporator) | 1 − exp(−NTU) |
| Counter flow with C = 1 | NTU/(1 + NTU) |

## Boiling and condensation

- **Pool boiling curve:** natural convection → nucleate boiling (very high h) → **critical heat flux** → transition → film boiling. Operating beyond the critical heat flux can burn out the surface.
- **Condensation:** dropwise condensation gives much higher h than filmwise. Nusselt's theory gives filmwise h on vertical plates.

## Worked example

Hot oil cools from 150 °C to 90 °C while water heats from 30 °C to 70 °C, in counter flow, with U = 300 W/m²·K and Q = 60 kW.

- ΔT₁ = 150 − 70 = 80; ΔT₂ = 90 − 30 = 60; ΔT_lm = 20/ln(80/60) = 69.5 K.
- A = 60,000/(300 × 69.5) = **2.88 m²**.

## Practice

```quiz
q: A condenser (C = 0) has NTU = 2. What is its effectiveness? (Give 3 decimal places.)
answer: 0.865
verify: round(1 - __import__("math").exp(-2), 3)
explain: ε = 1 − e^(−NTU) = 1 − e⁻² = 0.865.
```

```quiz
q: In a counter-flow exchanger the terminal temperature differences are 40 K and 40 K. What is the LMTD in K?
answer: 40
verify: 40
explain: When ΔT₁ = ΔT₂ the LMTD equals that difference (the limit of the formula).
```

```quiz
q: A counter-flow exchanger with C = 1 has NTU = 3. What is its effectiveness?
answer: 0.75
verify: 3 / (1 + 3)
explain: ε = NTU/(1 + NTU) = 3/4 = 0.75.
```

```quiz
q: Hot fluid enters at 200 °C and cold at 50 °C; C_min = 2 kW/K. What is the maximum possible heat transfer in kW?
answer: 300
verify: 2 * (200 - 50)
explain: Q_max = C_min (T_h,in − T_c,in) = 2 × 150 = 300 kW.
```

```quiz
q: For the same inlet and outlet temperatures, which arrangement needs the smallest area?
* Counter flow
- Parallel flow
- Cross flow with both fluids unmixed
- All need the same area
explain: Counter flow gives the largest LMTD, so for the same Q and U it needs the least area.
```

```quiz
q: In parallel flow, hot fluid goes 120 → 80 °C and cold fluid 20 → 50 °C. What is the LMTD in °C? (Give 2 decimal places.)
answer: 58.14
verify: round((100 - 30) / __import__("math").log(100 / 30), 2)
explain: ΔT₁ = 120 − 20 = 100 and ΔT₂ = 80 − 50 = 30, so LMTD = 70/ln(100/30) = 70/1.204 = 58.14 °C.
```

```quiz
q: A heat exchanger transfers 120 kW out of a maximum possible 160 kW. What is its effectiveness?
answer: 0.75
verify: 120 / 160
explain: ε = Q/Q_max = 0.75.
```
