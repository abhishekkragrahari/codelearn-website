---
title: Soil Phase Relations and Classification
chapter: Soil Properties
description: Three-phase diagram, void ratio, porosity, water content, degree of saturation, unit weights, specific gravity, Atterberg limits, grain size distribution and IS soil classification.
---
Soil is a mix of solid grains, water and air. Almost every geotechnical calculation starts with the **phase relations** between them.

## Phase relations

| Quantity | Definition |
| --- | --- |
| Void ratio e | V_v/V_s |
| Porosity n | V_v/V; **n = e/(1 + e)** |
| Water content w | W_w/W_s |
| Degree of saturation S | V_w/V_v |
| Specific gravity G | γ_s/γ_w (about 2.65–2.7) |
| Air content a_c | V_a/V = n(1 − S) |

The key link: **S e = w G**.

**Unit weights:**

- Bulk: γ = (G + Se)γ_w/(1 + e)
- Dry: **γ_d = Gγ_w/(1 + e) = γ/(1 + w)**
- Saturated: γ_sat = (G + e)γ_w/(1 + e)
- Submerged: γ' = γ_sat − γ_w = (G − 1)γ_w/(1 + e)

**Relative density** of sands: D_r = (e_max − e)/(e_max − e_min).

## Consistency limits (Atterberg)

As a fine soil dries it passes from liquid to plastic to semi-solid to solid states:

- **Liquid limit (LL)**: Casagrande cup, 25 blows; or cone penetrometer.
- **Plastic limit (PL)**: rolls into 3 mm threads that just crumble.
- **Shrinkage limit (SL)**: below it, losing water does not reduce volume.
- **Plasticity index** I_p = LL − PL; **liquidity index** I_L = (w − PL)/I_p; **consistency index** I_c = (LL − w)/I_p.
- **Activity** = I_p / (% clay finer than 2 µm). High activity: montmorillonite.

## Grain size

- Sieve analysis for coarse soils; hydrometer (Stokes' law) for fines.
- **Coefficient of uniformity** C_u = D₆₀/D₁₀; **coefficient of curvature** C_c = D₃₀²/(D₁₀ D₆₀).
- **Well graded:** C_u > 4 (gravel) or > 6 (sand), and 1 ≤ C_c ≤ 3.

## IS classification

- **Coarse** soils (more than 50% retained on the 75 µm sieve): gravel (G) or sand (S), with W, P, M or C.
- **Fine** soils: silt (M), clay (C), organic (O), with L (LL < 35), I (35–50) or H (LL > 50) compressibility, using the **plasticity chart** A-line: I_p = 0.73(LL − 20).

## Worked example

A soil has w = 20%, G = 2.7 and e = 0.6 (γ_w = 9.81 kN/m³).

- S = wG/e = 0.54/0.6 = **0.9**.
- γ_d = 2.7 × 9.81/1.6 = **16.55 kN/m³**; γ = γ_d (1 + w) = 19.87 kN/m³.

## Practice

```quiz
q: A soil has void ratio 0.8. What is its porosity? (Give 3 decimal places.)
answer: 0.444
verify: round(0.8 / 1.8, 3)
explain: n = e/(1 + e) = 0.8/1.8 = 0.444.
```

```quiz
q: A saturated soil has G = 2.65 and e = 0.7. What is its saturated unit weight in kN/m³ (γ_w = 10 kN/m³)? (Give 2 decimal places.)
answer: 19.71
verify: round((2.65 + 0.7) * 10 / 1.7, 2)
explain: γ_sat = (G + e)γ_w/(1 + e) = 3.35 × 10/1.7 = 19.71 kN/m³.
```

```quiz
q: A clay has LL = 60%, PL = 25% and natural water content 35%. What is its liquidity index? (Give 3 decimal places.)
answer: 0.286
verify: round((35 - 25) / (60 - 25), 3)
explain: I_L = (w − PL)/(LL − PL) = 10/35 = 0.286.
```

```quiz
q: A sand has D₁₀ = 0.1 mm, D₃₀ = 0.3 mm and D₆₀ = 0.8 mm. Is it well graded?
* Yes: C_u = 8 and C_c = 1.125
- No: C_u is less than 6
- No: C_c is greater than 3
- Cannot be judged
explain: C_u = 0.8/0.1 = 8 > 6 and C_c = 0.09/0.08 = 1.125 lies between 1 and 3, so it is well graded.
```
