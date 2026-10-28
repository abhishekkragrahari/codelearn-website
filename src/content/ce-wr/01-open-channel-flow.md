---
title: Open Channel Flow and Specific Energy
chapter: Hydraulics
description: Uniform flow with Manning's and Chezy's equations, most economical channel sections, specific energy, critical depth, Froude number and gradually varied flow profiles.
---
Rivers, canals and sewers flow with a **free surface** open to the atmosphere. The driving force is gravity, and the depth adjusts itself to the flow.

## Uniform flow

Depth, velocity and area stay constant along the channel; the bed slope equals the energy slope.

- **Manning:** **V = (1/n) R^(2/3) S^(1/2)**
- **Chezy:** V = C √(R S)
- **Hydraulic radius** R = A/P (area / wetted perimeter). For a wide rectangular channel, R ≈ y.
- **Conveyance** K = (1/n) A R^(2/3), so Q = K √S.

## Most economical (efficient) sections

For a given area, the best section has the least wetted perimeter (so the most flow):

| Section | Condition |
| --- | --- |
| Rectangular | b = 2y, R = y/2 |
| Trapezoidal | Half of a regular hexagon: side slopes 60° to the horizontal, R = y/2 |
| Triangular | Vertex angle 90° (side slopes 1 : 1) |
| Circular (max discharge) | y ≈ 0.94D (max velocity at y ≈ 0.81D) |

## Specific energy

Energy measured from the channel bed: **E = y + V²/(2g) = y + q²/(2gy²)** (q = discharge per unit width).

- For a given q, E has a minimum at the **critical depth**: **y_c = (q²/g)^(1/3)**, with **E_min = 1.5 y_c** (rectangular channel).
- **Froude number** Fr = V/√(g D) (D = hydraulic depth A/T). Fr < 1 subcritical (deep, slow), Fr = 1 critical, Fr > 1 supercritical (shallow, fast).
- For other shapes, critical flow occurs when Q²T/(gA³) = 1.

## Gradually varied flow

dy/dx = (S₀ − S_f)/(1 − Fr²)

Comparing the normal depth y_n and critical depth y_c classifies slopes as **mild** (y_n > y_c, M curves), **steep** (S curves), critical (C), horizontal (H) and adverse (A). The M1 profile is the backwater curve behind a dam; M2 is the drawdown ahead of a free fall.

## Worked example

A rectangular channel 4 m wide carries 8 m³/s.

- q = 2 m²/s; y_c = (4/9.81)^(1/3) = **0.742 m**; E_min = 1.113 m.

## Practice

```quiz
q: A wide rectangular channel carries q = 3 m²/s (g = 9.81 m/s²). What is the critical depth in m? (Give 3 decimal places.)
answer: 0.972
verify: round((3 ** 2 / 9.81) ** (1 / 3), 3)
explain: y_c = (q²/g)^(1/3) = (9/9.81)^(1/3) = 0.972 m.
```

```quiz
q: A rectangular channel has a bed width of 3 m and flow depth 1.5 m. What is its hydraulic radius in m?
answer: 0.75
verify: 3 * 1.5 / (3 + 2 * 1.5)
explain: R = A/P = 4.5/6 = 0.75 m (this is the most economical rectangular section, b = 2y).
```

```quiz
q: A channel has R = 1 m, S = 0.0004 and n = 0.02. What is the velocity by Manning's formula in m/s?
answer: 1
verify: round(1 / 0.02 * 1 ** (2 / 3) * 0.0004 ** 0.5, 6)
explain: V = (1/0.02) × 1 × 0.02 = 1 m/s.
```

```quiz
q: For a rectangular channel, the minimum specific energy is how many times the critical depth?
answer: 1.5
verify: 1.5
explain: At critical flow V²/(2g) = y_c/2, so E_min = 1.5y_c.
```

```quiz
q: A rectangular channel 2 m wide carries 4 m³/s at a depth of 1 m. What is the Froude number (g = 10 m/s²)? (Give 3 decimal places.)
answer: 0.632
verify: round((4 / 2) / (10 * 1) ** 0.5, 3)
explain: V = 4/(2 × 1) = 2 m/s; Fr = 2/√10 = 0.632 (subcritical).
```

```quiz
q: What is the most economical bed width (m) of a rectangular channel flowing 1.5 m deep?
answer: 3
verify: 2 * 1.5
explain: For a rectangle, b = 2y = 3 m.
```
