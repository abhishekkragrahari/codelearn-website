---
title: Fins and Transient Conduction
chapter: Conduction
description: Heat transfer from fins, fin efficiency and effectiveness, the fin parameter m, lumped capacitance analysis with the Biot and Fourier numbers, and time constants of thermocouples.
---
Fins add surface area to push more heat into a fluid. Transient conduction asks how fast a body heats or cools; the simplest and most tested case is the **lumped** body.

## Fins

A fin of perimeter P, cross-section A_c and conductivity k in a fluid with coefficient h has the **fin parameter**

**m = √(hP/(kA_c))**

With base excess temperature θ_b = T_b − T_∞:

| Fin tip condition | Heat flow |
| --- | --- |
| Very long fin | Q = √(hPkA_c) θ_b |
| Insulated tip | Q = √(hPkA_c) θ_b tanh(mL) |

A short fin with a convecting tip can be treated as an insulated fin with a **corrected length** L_c = L + A_c/P (L + t/2 for a thin rectangular fin, L + d/4 for a pin fin).

- **Fin efficiency** η_f = actual heat flow / heat flow if the whole fin were at base temperature. For an insulated tip: η_f = tanh(mL)/(mL).
- **Fin effectiveness** ε_f = heat flow with fin / heat flow from the base area without it. Fins are worth adding only if ε_f > 2 or so, which needs **h small and k large** (fins on the air side, not the water side).

## Transient conduction: lumped capacitance

If the **Biot number** **Bi = hL_c/k < 0.1** (L_c = V/A_s), the temperature inside the body is nearly uniform. Then:

**(T − T_∞)/(T_i − T_∞) = exp(−hA_s t/(ρVc)) = exp(−Bi·Fo)**

- **Time constant** τ = ρVc/(hA_s). After one time constant, the body has covered 63.2% of the temperature change.
- **Fourier number** Fo = αt/L_c² (α = k/(ρc), the thermal diffusivity).
- For a sphere L_c = r/3; for a long cylinder L_c = r/2.

For Bi > 0.1, use Heisler charts or the semi-infinite solid solution.

## Worked example

A steel ball (r = 5 mm, ρ = 7800 kg/m³, c = 460 J/kg·K, k = 40 W/m·K) cools in air with h = 20 W/m²·K.

- L_c = r/3 = 1.667 mm; Bi = 20 × 0.001667/40 = 0.00083 → lumped is valid.
- τ = ρc L_c/h = 7800 × 460 × 0.001667/20 = **299 s**.

## Practice

```quiz
q: A pin fin has m = 10 m⁻¹ and length 0.1 m with an insulated tip. What is its efficiency? (Give 3 decimal places.)
answer: 0.762
verify: round(__import__("math").tanh(1) / 1, 3)
explain: mL = 1, so η = tanh(1)/1 = 0.762.
```

```quiz
q: A thermocouple bead has a time constant of 2 s. How long (s) does it take to reach 63.2% of a step change in temperature?
answer: 2
verify: 2
explain: After one time constant, 1 − e⁻¹ = 63.2% of the change is complete.
```

```quiz
q: A copper sphere of radius 6 mm (k = 400 W/m·K) is in a fluid with h = 100 W/m²·K. What is its Biot number based on L_c = r/3?
answer: 0.0005
verify: round(100 * 0.006 / 3 / 400, 6)
explain: Bi = h(r/3)/k = 100 × 0.002/400 = 0.0005: lumped analysis is valid.
```

```quiz
q: Fins are most useful on a surface where:
* The heat transfer coefficient is low (for example air)
- The heat transfer coefficient is high (for example boiling water)
- The fin material has low conductivity
- The temperature difference is zero
explain: Fin effectiveness grows with k/h, so fins help most on the gas side.
```
