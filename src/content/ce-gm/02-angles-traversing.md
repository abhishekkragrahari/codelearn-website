---
title: Compass, Theodolite and Traversing
chapter: Angles and Control
description: Bearings (WCB and quadrantal), magnetic declination and local attraction, theodolite measurement, latitudes and departures, closing error, Bowditch and transit rules, and area by coordinates.
---
Angles and directions locate points horizontally. A **traverse** is a series of lines whose lengths and directions are measured to build a control framework.

## Bearings

- **Whole circle bearing (WCB):** 0°–360° clockwise from north.
- **Quadrantal (reduced) bearing:** N or S, angle (0–90°), E or W. Example: WCB 210° = S 30° W.
- **Back bearing** = fore bearing ± 180°.
- **Included angle** between two lines = difference of their bearings (taken properly).
- **True bearing = magnetic bearing ± declination** (+ for east declination).
- **Local attraction** (from nearby iron) is detected when the fore and back bearings of a line differ by other than 180°; correct from a station free of it.

## Theodolite

- Measures horizontal and vertical angles to seconds of arc.
- **Face left and face right** observations, averaged, eliminate collimation, trunnion axis and index errors.
- Methods: **repetition** (accumulate an angle several times) and **reiteration** (several angles from one station).

## Traverse computations

For each line of length L and bearing θ:

- **Latitude** = L cos θ (northing +, southing −).
- **Departure** = L sin θ (easting +, westing −).

For a **closed traverse**, Σ latitudes = 0 and Σ departures = 0 ideally. In practice:

- **Closing error** e = √((ΣL)² + (ΣD)²), with direction tan⁻¹(ΣD/ΣL).
- **Relative precision** = e/perimeter (for example 1 in 5000).
- **Angular check:** sum of interior angles = (2n − 4) × 90°.

**Balancing:**

- **Bowditch's (compass) rule:** correction to a line ∝ its **length** (when angles and distances are equally precise).
- **Transit rule:** correction ∝ the line's latitude or departure (when angles are more precise than distances).

## Area from coordinates

**A = ½ |Σ (xᵢ yᵢ₊₁ − xᵢ₊₁ yᵢ)|** (the shoelace formula). Areas of irregular boundaries: **trapezoidal rule** or **Simpson's rule** (odd number of ordinates).

## Worked example

A closed traverse has ΣL = +0.30 m and ΣD = −0.40 m with a perimeter of 2500 m.

- e = √(0.09 + 0.16) = **0.5 m**; precision = 0.5/2500 = **1 in 5000**.

## Practice

```quiz
q: Convert the whole circle bearing 300° to a quadrantal bearing.
* N 60° W
- S 60° W
- N 30° W
- S 30° E
explain: 300° lies in the NW quadrant: 360° − 300° = 60°, so N 60° W.
```

```quiz
q: A line 100 m long has a WCB of 60°. What is its departure in m? (Give 2 decimal places.)
answer: 86.6
verify: round(100 * __import__("math").sin(__import__("math").radians(60)), 2)
explain: Departure = L sin θ = 100 × 0.866 = 86.60 m (east).
```

```quiz
q: What should be the sum of the interior angles of a closed traverse with 6 sides, in degrees?
answer: 720
verify: (2 * 6 - 4) * 90
explain: (2n − 4) × 90° = 8 × 90° = 720°.
```

```quiz
q: A triangle has vertices (0, 0), (40, 0) and (40, 30) in metres. What is its area in m²?
answer: 600
verify: abs((0 * 0 - 40 * 0) + (40 * 30 - 40 * 0) + (40 * 0 - 0 * 30)) / 2
explain: Shoelace: ½|0 + 1200 + 0| = 600 m².
```

```quiz
q: The fore bearing of a line is 75°. What is its back bearing in degrees?
answer: 255
verify: 75 + 180
explain: BB = FB ± 180° = 255°.
```

```quiz
q: A line 200 m long has a WCB of 150°. What is its latitude in m? (Give 2 decimal places.)
answer: -173.21
verify: round(200 * __import__("math").cos(__import__("math").radians(150)), 2)
explain: Latitude = L cos θ = 200 × (−0.866) = −173.21 m (southing).
```
