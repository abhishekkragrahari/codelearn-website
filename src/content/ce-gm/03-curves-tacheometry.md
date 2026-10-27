---
title: Curves, Tacheometry and Contouring
chapter: Curves and Heights
description: Simple circular curve elements and setting out (Rankine's method), degree of curve, tacheometric distance and elevation formulas, contours and their characteristics, and volumes of earthwork.
---
Roads and railways change direction along **curves**. **Tacheometry** finds distances and heights quickly with an optical instrument. **Contours** and earthwork volumes follow.

## Simple circular curve

Two straights meet at the point of intersection with a **deflection angle** Δ; a curve of radius R joins them.

| Element | Formula |
| --- | --- |
| Tangent length | T = R tan(Δ/2) |
| Length of curve | l = π R Δ/180 |
| Long chord | 2R sin(Δ/2) |
| External distance | R(sec(Δ/2) − 1) |
| Mid-ordinate (versine) | R(1 − cos(Δ/2)) |

- **Degree of curve** D (30 m arc): **R = 1718.9/D** (metres, D in degrees).
- **Rankine's deflection angle method** (with a theodolite): δ = 1718.9 c/R minutes for a chord of length c.

**Transition curves** and **vertical curves** are covered in highway design.

## Tacheometry

**Stadia method** (fixed hair interval, staff vertical), staff intercept s, line of sight at angle θ:

- Horizontal distance **D = k s cos² θ + C cos θ**
- Vertical component **V = k s (sin 2θ)/2 + C sin θ**
- Usually k = 100 and C = 0 (anallactic lens). On level sights: D = 100 s.

## Contours

A contour joins points of equal elevation.

- Contour **interval** is constant on a map. Close spacing = steep slope; even spacing = uniform slope.
- Contours never cross (except overhanging cliffs) and close on themselves.
- **V-shapes point uphill in valleys** and downhill on ridges.

## Volumes

- **Trapezoidal rule:** V = d[(A₁ + Aₙ)/2 + A₂ + … + Aₙ₋₁].
- **Prismoidal rule:** V = (d/3)[A₁ + Aₙ + 4(even areas) + 2(odd interior areas)] (needs an odd number of sections). Usually more accurate.
- **Prismoidal correction** = trapezoidal − prismoidal volume.
- Mass haul diagram for balancing cut and fill.

## Worked example

A curve of radius 300 m has a deflection angle of 60°.

- T = 300 tan 30° = **173.2 m**; length = π × 300 × 60/180 = **314.16 m**.

## Practice

```quiz
q: What is the radius (m) of a 5° curve on a 30 m arc basis? (Give 2 decimal places.)
answer: 343.78
verify: round(1718.9 / 5, 2)
explain: R = 1718.9/D = 1718.9/5 = 343.78 m.
```

```quiz
q: A curve of radius 200 m has a deflection angle of 90°. What is the tangent length in m?
answer: 200
verify: round(200 * __import__("math").tan(__import__("math").radians(45)), 6)
explain: T = R tan(Δ/2) = 200 × tan 45° = 200 m.
```

```quiz
q: A tacheometer (k = 100, C = 0) on a level sight reads a staff intercept of 1.25 m. What is the horizontal distance in m?
answer: 125
verify: 100 * 1.25
explain: D = ks = 100 × 1.25 = 125 m.
```

```quiz
q: Cross-sectional areas at 20 m intervals are 10, 16 and 14 m². What is the earthwork volume by the prismoidal rule in m³?
answer: 586.67
verify: round(20 / 3 * (10 + 14 + 4 * 16), 2)
explain: V = (20/3)(10 + 14 + 64) = (20/3) × 88 = 586.67 m³.
```
