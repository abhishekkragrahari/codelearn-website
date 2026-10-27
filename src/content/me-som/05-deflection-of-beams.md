---
title: Deflection of Beams
chapter: Beams
description: The elastic curve EI y'' = M, double integration, Macaulay's method, moment-area theorems, and standard slope and deflection results for cantilevers and simply supported beams.
---
Beams must be strong enough and also **stiff enough**: too much deflection cracks finishes and misaligns machines. All deflection methods start from the equation of the elastic curve.

## The elastic curve

For small deflections:

**EI d²y/dx² = M(x)**

Integrate once for the slope dy/dx, and again for the deflection y. The two constants come from the supports: y = 0 at a simple support; y = 0 and dy/dx = 0 at a fixed end.

**Macaulay's method** writes one moment expression for the whole beam using brackets ⟨x − a⟩ that are taken as zero when negative, so a beam with several loads needs only one pair of constants.

## Moment-area theorems

1. The change in slope between two points = (area of the M/EI diagram between them).
2. The deviation of one point from the tangent at another = (first moment of that M/EI area about the first point).

They are quickest for cantilevers, where the tangent at the fixed end is horizontal.

## Standard results

| Beam and load | Max slope | Max deflection |
| --- | --- | --- |
| Cantilever, end load P | PL²/(2EI) | **PL³/(3EI)** |
| Cantilever, UDL w | wL³/(6EI) | **wL⁴/(8EI)** |
| Cantilever, end moment M | ML/(EI) | ML²/(2EI) |
| Simply supported, central load P | PL²/(16EI) | **PL³/(48EI)** |
| Simply supported, UDL w | wL³/(24EI) | **5wL⁴/(384EI)** |

Deflections from several loads add (**superposition**), as long as the beam stays linear elastic.

## Stiffness

The ratio load/deflection is the beam's stiffness. A cantilever with end load has k = 3EI/L³; a simply supported beam with central load has k = 48EI/L³. These values are used for natural frequencies in vibrations.

## Worked example

A cantilever of length 2 m with EI = 2 × 10⁶ N·m² carries 1 kN at its free end.

- δ = PL³/(3EI) = 1000 × 8/(6 × 10⁶) = **1.33 mm**.
- Slope at the free end = PL²/(2EI) = 4000/(4 × 10⁶) = 0.001 rad.

## Practice

```quiz
q: A simply supported beam of span 4 m (EI = 4 × 10⁶ N·m²) carries 6 kN at mid-span. What is the mid-span deflection in mm?
answer: 2
verify: round(6000 * 4 ** 3 / (48 * 4e6) * 1000, 6)
explain: δ = PL³/(48EI) = 6000 × 64/(1.92 × 10⁸) = 0.002 m = 2 mm.
```

```quiz
q: If the span of a simply supported beam with a UDL is doubled (same w), its maximum deflection becomes how many times larger?
answer: 16
verify: 2 ** 4
explain: δ = 5wL⁴/(384EI) grows with L⁴, so 2⁴ = 16 times.
```

```quiz
q: The ratio of the maximum deflections of a cantilever with end load P and a simply supported beam with central load P (same L, EI) is:
- 4
- 8
* 16
- 32
explain: (PL³/3EI)/(PL³/48EI) = 48/3 = 16.
```

```quiz
q: A cantilever 1 m long (EI = 10⁵ N·m²) carries a UDL of 8 kN/m. What is the tip deflection in mm?
answer: 10
verify: round(8000 * 1 ** 4 / (8 * 1e5) * 1000, 6)
explain: δ = wL⁴/(8EI) = 8000/(8 × 10⁵) = 0.01 m = 10 mm.
```
