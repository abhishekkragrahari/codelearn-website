---
title: Geomatics Engineering
chapter: Geomatics Engineering
description: GATE CE syllabus for geomatics engineering (surveying), with errors, levelling and curvature and refraction corrections, traversing, tacheometry, curves, photogrammetry, remote sensing, GIS and GPS, with solved examples.
---
## Syllabus

Principles of surveying; errors and their adjustment; maps (scale, coordinate systems); distance and angle measurement (levelling, theodolite traversing, triangulation); total station; horizontal and vertical curves; photogrammetry and remote sensing (scale, flying height, relief displacement); basics of GIS and GPS.

## Key concepts and formulas

**Levelling.** Height of instrument HI = RL of benchmark + backsight; RL of a point = HI − foresight. Check: Σ BS − Σ FS = last RL − first RL. Corrections over a distance d (in km), in metres:

- curvature: −0.0785d²
- refraction: +0.0112d²
- combined: **−0.0673d²**

Reciprocal levelling eliminates these errors and collimation error.

**Errors.** Probable error, weights inversely proportional to the variance; the most probable value of a quantity measured with weights is the weighted mean.

**Traversing.** Latitude = L cos θ, departure = L sin θ (θ = whole circle bearing). The closing error is √((ΣL)² + (ΣD)²). The **Bowditch rule** distributes it in proportion to the line lengths; the transit rule in proportion to the latitudes and departures. The sum of interior angles of an n-sided closed traverse is (2n − 4) × 90°.

**Tacheometry.** Horizontal distance D = Ks + C (stadia, line of sight horizontal), usually with K = 100 and C = 0. With an inclined line of sight at angle θ: D = Ks cos²θ.

**Simple circular curves** (radius R, deflection angle Δ):

- tangent length T = R tan(Δ/2)
- curve length l = πRΔ/180
- long chord = 2R sin(Δ/2)
- degree of curve (30 m arc): D ≈ 1719/R

**Photogrammetry.** Scale of a vertical photograph S = f/(H − h), where f is the focal length, H the flying height and h the ground elevation. **Relief displacement** d = rh/H, where r is the radial distance of the image from the principal point.

**Remote sensing and GPS.** Spatial, spectral, radiometric and temporal resolution; GPS needs signals from at least four satellites for a 3D position (x, y, z and the receiver clock error).

## Worked example

Find the combined curvature and refraction correction for a sight of 2 km. For a curve with R = 400 m and Δ = 60°, find the tangent length and the curve length. Find the photo scale for f = 150 mm, H = 3000 m and h = 600 m.

```python
import math

d = 2.0
print(f"combined correction = {-0.0673 * d * d:.4f} m")
R, D = 400, 60
print(f"T = {R * math.tan(math.radians(D / 2)):.3f} m, curve length = {math.pi * R * D / 180:.3f} m")
f, H, h = 0.150, 3000, 600
s = f / (H - h)
print(f"scale = 1 : {1 / s:.0f}")
```
```output
combined correction = -0.2692 m
T = 230.940 m, curve length = 418.879 m
scale = 1 : 16000
```

## Practice questions

```quiz
q: The RL of a benchmark is 100.000 m and the backsight on it is 1.250 m. The foresight on point P is 2.785 m. What is the RL of P in m?
answer: 98.465
verify: round(100 + 1.250 - 2.785, 3)
explain: HI = 100 + 1.250 = 101.250 m; RL of P = 101.250 − 2.785 = 98.465 m.
```

```quiz
q: What is the sum of the interior angles of a closed traverse with 6 sides, in degrees?
answer: 720
verify: (2 * 6 - 4) * 90
explain: (2n − 4) × 90° = 8 × 90° = 720°.
```

```quiz
q: A stadia reading gives a staff intercept of 1.5 m with K = 100, C = 0 and a horizontal line of sight. What is the horizontal distance in m?
answer: 150
verify: 100 * 1.5
explain: D = Ks + C = 100 × 1.5 = 150 m.
```

```quiz
q: A tower 60 m high appears on a vertical photograph with its top 80 mm from the principal point. The flying height above the tower's base is 2400 m. What is the relief displacement in mm?
answer: 2
verify: 80 * 60 / 2400
explain: d = rh/H = 80 × 60/2400 = 2 mm.
```
