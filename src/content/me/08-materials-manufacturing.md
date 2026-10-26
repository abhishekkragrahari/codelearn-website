---
title: Engineering Materials and Manufacturing
chapter: Materials, Manufacturing and Industrial Engineering
description: GATE ME syllabus for materials and manufacturing, with the iron-carbon diagram and heat treatment, casting (Chvorinov's rule, gating), metal forming, welding, machining (Merchant's theory, Taylor's tool life), non-traditional machining, metrology and CIM, with solved examples.
---
## Syllabus

- **Engineering materials**: structure and properties, phase diagrams, heat treatment, stress-strain diagrams.
- **Casting, forming and joining**: casting types, patterns, moulds and cores, solidification, riser and gating design; plastic deformation and yield criteria, hot and cold working, forging, rolling, extrusion, drawing, sheet metal operations, powder metallurgy; welding, brazing, soldering, adhesive bonding.
- **Machining and machine tools**: mechanics of machining, cutting tools, tool geometry and materials, tool life and wear, machining economics, non-traditional machining, jigs and fixtures, abrasive machining, NC/CNC programming.
- **Metrology and inspection**: limits, fits and tolerances, linear and angular measurement, comparators, interferometry, surface finish, CMMs.
- **Computer integrated manufacturing**: CAD/CAM, additive manufacturing.

## Key concepts and formulas

**Iron-carbon diagram.** Eutectoid at about 0.76–0.8% C and 727 °C (austenite → pearlite); eutectic at 4.3% C and about 1147 °C (liquid → ledeburite). Steels have up to about 2.1% C. **Heat treatment**: annealing (soft), normalising (air cooled, finer grains), hardening (quenching to martensite), tempering (reduces brittleness).

**Casting.**

- **Chvorinov's rule**: solidification time t = B(V/A)²; the riser must solidify after the casting, so its modulus V/A must be larger.
- Gating: continuity A₁V₁ = A₂V₂; velocity at the sprue base V = √(2gh). Pouring time of a top gate t = A<sub>m</sub>H/(A<sub>g</sub>√(2gH)).

**Forming.** Rolling: maximum draft Δh<sub>max</sub> = μ²R. True strain ε = ln(L/L₀). Wire drawing and extrusion forces grow with ln(A₀/A<sub>f</sub>). Blanking force = perimeter × thickness × shear strength.

**Welding.** Heat input = ηVI/v (per unit length). Arc power V × I. Resistance welding heat H = I²Rt.

**Machining.**

- Chip thickness ratio r = t₁/t₂ (< 1). **Shear angle**: tan φ = r cos α/(1 − r sin α), with rake angle α.
- **Merchant's theory**: 2φ + β − α = 90° (β = friction angle).
- **Taylor's tool life**: **VTⁿ = C**. Typical n: about 0.1–0.15 for HSS, 0.2–0.4 for carbides, higher for ceramics.
- Material removal rate in turning MRR = πDfdN (f = feed per revolution, d = depth of cut).
- Machining time for turning: L/(fN).

**Metrology.** Hole basis system: the lower deviation of the hole is zero. Clearance, transition and interference fits. Tolerance = upper limit − lower limit. Statistical (root-sum-square) tolerance stacking is tighter than the worst case.

**Non-traditional machining.** EDM (spark erosion, conductive materials), ECM (electrolytic dissolution, no tool wear), USM (brittle materials), LBM, EBM, AJM, WJM.

## Worked example

Orthogonal cutting with rake angle 10°, uncut chip thickness 0.3 mm and chip thickness 0.75 mm: find the shear angle. With Taylor's equation VT<sup>0.25</sup> = 300, find the tool life at 150 m/min. Then compare the solidification times of a cube of side 100 mm and a sphere of the same volume.

```python
import math

a, t1, t2 = math.radians(10), 0.3, 0.75
r = t1 / t2
phi = math.degrees(math.atan(r * math.cos(a) / (1 - r * math.sin(a))))
print(f"chip ratio = {r:.2f}, shear angle = {phi:.2f} deg")
n, C, V = 0.25, 300, 150
print(f"tool life at {V} m/min = {(C / V) ** (1 / n):.1f} min")
side = 0.1
V_ = side ** 3
m_cube = V_ / (6 * side ** 2)
rs = (3 * V_ / (4 * math.pi)) ** (1 / 3)
m_sph = rs / 3
print(f"modulus cube = {m_cube * 1000:.3f} mm, sphere = {m_sph * 1000:.3f} mm, t_sphere/t_cube = {(m_sph / m_cube) ** 2:.3f}")
```
```output
chip ratio = 0.40, shear angle = 22.94 deg
tool life at 150 m/min = 16.0 min
modulus cube = 16.667 mm, sphere = 20.678 mm, t_sphere/t_cube = 1.539
```

## Practice questions

```quiz
q: In Taylor's equation VT<sup>0.5</sup> = C, the tool life is 25 min at 100 m/min. What is the tool life (min) at 125 m/min?
answer: 16
verify: round((100 * 25 ** 0.5 / 125) ** 2, 4)
explain: C = 100 × 25<sup>0.5</sup> = 500. At 125 m/min, T<sup>0.5</sup> = 500/125 = 4, so T = 16 min.
```

```quiz
q: Two castings have the same volume. Casting A has twice the surface area of casting B. What is the ratio of their solidification times t<sub>A</sub>/t<sub>B</sub> by Chvorinov's rule?
answer: 0.25
verify: (1 / 2) ** 2
explain: t ∝ (V/A)². With A doubled, (V/A) halves, so t<sub>A</sub>/t<sub>B</sub> = (1/2)² = 0.25.
```

```quiz
q: The maximum possible draft in rolling with a roll radius of 300 mm and coefficient of friction 0.1 is (in mm):
answer: 3
verify: round(0.1 ** 2 * 300, 6)
explain: Δh<sub>max</sub> = μ²R = 0.01 × 300 = 3 mm.
```

```quiz
q: In orthogonal cutting, the chip thickness ratio is 0.5 and the rake angle is 0°. What is the shear angle in degrees? Give the answer to two decimal places.
answer: 26.57
verify: round(__import__("math").degrees(__import__("math").atan(0.5)), 2)
explain: With α = 0, tan φ = r = 0.5, so φ = tan⁻¹(0.5) ≈ 26.57°.
```

```quiz
q: Which non-traditional process involves no tool wear because metal is removed by electrolytic dissolution?
- EDM
* ECM
- USM
- LBM
explain: Electrochemical machining dissolves the workpiece anodically, and the tool (cathode) does not wear. EDM tools do wear by sparking.
```
