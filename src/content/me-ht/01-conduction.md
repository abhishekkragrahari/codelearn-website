---
title: Steady Conduction and Thermal Resistance
chapter: Conduction
description: Fourier's law, conduction through plane walls, cylinders and spheres, thermal resistance networks, overall heat transfer coefficient and critical radius of insulation.
---
Heat moves by **conduction**, **convection** and **radiation**. Conduction is heat flow through a solid (or a still fluid) from hot to cold, and in steady state it behaves exactly like current in a circuit of resistors.

## Fourier's law

**q = −k A dT/dx**

k is the thermal conductivity (W/m·K): about 400 for copper, 50 for steel, 1 for brick, 0.04 for insulation. Metals conduct well; gases poorly.

## Thermal resistances

Heat flow Q = ΔT/R, just like I = V/R.

| Geometry | Conduction resistance |
| --- | --- |
| Plane wall, thickness L | R = L/(kA) |
| Cylinder, radii r₁ to r₂, length L | R = ln(r₂/r₁)/(2πkL) |
| Sphere, radii r₁ to r₂ | R = (r₂ − r₁)/(4πk r₁ r₂) |
| Convection at a surface | R = 1/(hA) |

Resistances in **series** add; in **parallel**, their reciprocals add.

**Overall heat transfer coefficient** U: Q = U A ΔT_overall, with 1/(UA) = ΣR.

## Temperature profiles

- Plane wall (constant k, no heat generation): **linear**.
- Cylinder: **logarithmic**.
- With uniform heat generation q̇ in a plane wall of half-thickness L, both faces at T_s: T_max = T_s + q̇L²/(2k). In a solid cylinder of radius R: T_max = T_s + q̇R²/(4k).

## Critical radius of insulation

Adding insulation to a **small** pipe or wire can **increase** heat loss, because the outer surface area grows faster than the conduction resistance. Heat loss is maximum at the **critical radius**:

- Cylinder: **r_c = k/h**
- Sphere: r_c = 2k/h

If the pipe's radius is below r_c, a thin layer of insulation increases heat loss (useful for cooling electric wires).

## Worked example

A furnace wall has 0.2 m of firebrick (k = 1.0) and 0.1 m of insulation (k = 0.1), per m². Inside 900 °C, outside 50 °C. Find the heat loss.

- R = 0.2/1.0 + 0.1/0.1 = 0.2 + 1.0 = 1.2 K/W per m².
- q = 850/1.2 = **708.3 W/m²**.
- Interface temperature = 900 − 708.3 × 0.2 = 758.3 °C.

## Practice

```quiz
q: A wall 0.3 m thick (k = 0.6 W/m·K) has faces at 30 °C and 10 °C. What is the heat flux in W/m²?
answer: 40
verify: round(0.6 * 20 / 0.3, 6)
explain: q = kΔT/L = 0.6 × 20/0.3 = 40 W/m².
```

```quiz
q: Insulation with k = 0.05 W/m·K covers a wire; the outside h = 10 W/m²·K. What is the critical radius in mm?
answer: 5
verify: round(0.05 / 10 * 1000, 6)
explain: r_c = k/h = 0.005 m = 5 mm.
```

```quiz
q: A plane wall has conduction resistance 0.5 K/W and inner and outer convection resistances 0.1 and 0.4 K/W. The fluids are at 120 °C and 20 °C. What is the heat flow in W?
answer: 100
verify: (120 - 20) / (0.1 + 0.5 + 0.4)
explain: Total R = 1.0 K/W, so Q = 100/1 = 100 W.
```

```quiz
q: In steady one-dimensional conduction through a hollow cylinder with constant k, the temperature varies:
- Linearly with radius
* Logarithmically with radius
- Parabolically with radius
- Exponentially with radius
explain: Constant Q through growing areas 2πrL gives T ∝ ln r.
```

```quiz
q: A copper plate (k = 400 W/m·K) 2 cm thick has a temperature difference of 10 K. What is the heat flux in kW/m²?
answer: 200
verify: 400 * 10 / 0.02 / 1000
explain: q = kΔT/L = 400 × 10/0.02 = 200,000 W/m².
```

```quiz
q: A pipe has outer radius 2 cm, insulation k = 0.1 W/m·K and h = 10 W/m²·K. What does adding a thin layer of this insulation do to the heat loss?
- It increases the heat loss
* It decreases the heat loss
- It makes no change
- It first doubles the heat loss
explain: r_c = 0.1/10 = 0.01 m = 1 cm. The pipe is already bigger than r_c, so insulation reduces heat loss.
```
