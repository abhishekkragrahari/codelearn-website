---
title: Properties of Pure Substances and Ideal Gases
chapter: Properties
description: Phase change, p-v and T-s diagrams, saturation, dryness fraction, using steam tables, ideal gas equation, compressibility factor and processes of ideal gases.
---
Power plants and refrigerators use working fluids that change phase. To analyse them you need the **steam tables** and the idea of **dryness fraction**; for gases, the ideal gas law.

## Phase change of water

Heating water at constant pressure: compressed liquid → saturated liquid → wet mixture → saturated vapour → superheated vapour.

- **Saturation temperature** depends on pressure (100 °C at 1.013 bar).
- **Critical point** (water: about 22.06 MPa, 374 °C): above it, liquid and vapour cannot be told apart.
- **Triple point:** solid, liquid and vapour coexist.

## Wet steam and dryness fraction

In the wet region, the **dryness fraction** x = mass of vapour / total mass. Any specific property:

**y = y_f + x y_fg** (y = v, u, h or s; f = saturated liquid, g = saturated vapour, fg = g − f)

**Degree of superheat** = T − T_sat.

**Measuring dryness:** a throttling calorimeter (h before = h after) or a separating-and-throttling calorimeter for very wet steam.

## Diagrams

- **p–v:** the saturation dome; isotherms are flat inside it.
- **T–s:** area under a reversible process = heat transfer. Cycles are clearest here.
- **h–s (Mollier):** vertical lines are isentropic; used for turbines and nozzles.

## Ideal gases

**pv = RT**, with R = R̄/M (R̄ = 8.314 kJ/kmol·K). For air, R = 0.287 kJ/kg·K, c_p = 1.005, c_v = 0.718, γ = 1.4.

| Process | Relation | Index n |
| --- | --- | --- |
| Isobaric | V/T = constant | 0 |
| Isothermal | pV = constant | 1 |
| Isentropic | pV^γ = constant | γ |
| Isochoric | p/T = constant | ∞ |
| Polytropic | pVⁿ = constant | n |

Heat in a polytropic process: Q = W (γ − n)/(γ − 1).

Real gases deviate from pv = RT; the **compressibility factor** Z = pv/(RT) measures this (Z = 1 for an ideal gas). Gases follow the ideal law well at low pressure and high temperature.

## Worked example

At 1 MPa, h_f = 762.6 kJ/kg and h_fg = 2015.3 kJ/kg (steam table values). Find the enthalpy of steam with x = 0.9.

- h = 762.6 + 0.9 × 2015.3 = **2576.4 kJ/kg**.

## Practice

```quiz
q: Using h_f = 762.6 and h_fg = 2015.3 kJ/kg, what is the enthalpy of steam with dryness fraction 0.8? (Give 2 decimal places.)
answer: 2374.84
verify: round(762.6 + 0.8 * 2015.3, 2)
explain: h = h_f + x h_fg = 762.6 + 1612.24 = 2374.84 kJ/kg.
```

```quiz
q: What is the density of air (R = 0.287 kJ/kg·K) at 100 kPa and 300 K in kg/m³? (Give 3 decimal places.)
answer: 1.161
verify: round(100 / (0.287 * 300), 3)
explain: ρ = p/(RT) = 100/(0.287 × 300) = 1.161 kg/m³.
```

```quiz
q: Air is compressed isentropically (γ = 1.4) from 100 kPa, 300 K to 800 kPa. What is the final temperature in K? (Give 1 decimal place.)
answer: 543.4
verify: round(300 * 8 ** (0.4 / 1.4), 1)
explain: T₂ = T₁ (p₂/p₁)^((γ−1)/γ) = 300 × 8^0.2857 = 543.4 K.
```

```quiz
q: On a T–s diagram, the area under a reversible process curve represents:
* Heat transfer
- Work done
- Change in enthalpy
- Change in internal energy
explain: For a reversible process δQ = T ds, so the area under the T–s curve is the heat transferred.
```

```quiz
q: Air (R = 0.287 kJ/kg·K) occupies 1 m³ at 287 kPa and 300 K. What is its mass in kg? (Give 3 decimal places.)
answer: 3.333
verify: round(287 * 1 / (0.287 * 300), 3)
explain: m = pV/(RT) = 287/(0.287 × 300) = 3.333 kg.
```

```quiz
q: Wet steam has v_f = 0.001 and v_g = 0.2 m³/kg, and dryness 0.5. What is its specific volume in m³/kg? (Give 4 decimal places.)
answer: 0.1005
verify: round(0.001 + 0.5 * (0.2 - 0.001), 4)
explain: v = v_f + x(v_g − v_f) = 0.001 + 0.0995 = 0.1005 m³/kg.
```
