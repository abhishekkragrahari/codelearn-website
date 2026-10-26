---
title: Machine Design
chapter: Applied Mechanics and Design
description: GATE ME syllabus for machine design, with theories of failure, fatigue and the Goodman and Soderberg lines, design of shafts, joints, springs, bearings, gears, brakes and clutches, with solved examples.
---
## Syllabus

Design for static and dynamic loading; failure theories; fatigue strength and the S-N diagram; principles of design of bolted, riveted and welded joints, shafts, gears, rolling and sliding contact bearings, brakes and clutches, and springs.

## Key concepts and formulas

**Theories of failure** (σ<sub>y</sub> = yield strength, N = factor of safety):

| Theory | Failure when | Suited to |
| --- | --- | --- |
| Maximum principal stress (Rankine) | σ₁ = σ<sub>y</sub>/N | Brittle materials |
| Maximum shear stress (Tresca) | (σ₁ − σ₂)/2 = σ<sub>y</sub>/(2N) (in-plane, with σ₃ = 0 and σ₁, σ₂ of opposite sign) | Ductile, conservative |
| Distortion energy (von Mises) | √(σ₁² − σ₁σ₂ + σ₂²) = σ<sub>y</sub>/N | Ductile, most accurate |

In pure shear, Tresca predicts yield at τ = 0.5σ<sub>y</sub> and von Mises at τ = σ<sub>y</sub>/√3 ≈ 0.577σ<sub>y</sub>.

**Shafts under combined bending and torsion.** Equivalent torque T<sub>e</sub> = √(M² + T²) (max shear stress theory), equivalent moment M<sub>e</sub> = ½(M + √(M² + T²)) (max principal stress theory). Then τ<sub>max</sub> = 16T<sub>e</sub>/(πd³) and σ<sub>max</sub> = 32M<sub>e</sub>/(πd³).

**Fatigue.** For steels, the endurance limit S<sub>e</sub>′ ≈ 0.5S<sub>ut</sub>, reduced by surface, size, reliability and other factors. With alternating stress σ<sub>a</sub> and mean stress σ<sub>m</sub>:

- **Goodman**: σ<sub>a</sub>/S<sub>e</sub> + σ<sub>m</sub>/S<sub>ut</sub> = 1/N
- **Soderberg**: σ<sub>a</sub>/S<sub>e</sub> + σ<sub>m</sub>/S<sub>y</sub> = 1/N (more conservative)
- **Gerber**: σ<sub>a</sub>/S<sub>e</sub> + (σ<sub>m</sub>/S<sub>ut</sub>)² = 1 (with N = 1)

**Joints.** Fillet weld: throat = 0.707 × leg size; shear stress = load/(0.707 s l). Bolts: tensile stress area, preload.

**Helical springs.** Spring index C = D/d. Shear stress **τ = 8PDK/(πd³)** (K = Wahl factor); deflection **δ = 8PD³n/(Gd⁴)**; stiffness k = Gd⁴/(8D³n).

**Rolling bearings.** Rating life L₁₀ = **(C/P)ᵖ** million revolutions, with p = 3 for ball and 10/3 for roller bearings.

**Gears.** Lewis bending strength F = σ<sub>b</sub>bmY (Y = Lewis form factor).

**Brakes and clutches.** Single-plate clutch with uniform wear: T = μW(r₁ + r₂)/2 per friction surface; with uniform pressure: T = (2/3)μW(r₁³ − r₂³)/(r₁² − r₂²). Band brake: T₁/T₂ = e<sup>μθ</sup>.

## Worked example

A ductile shaft is under σ₁ = 120 MPa and σ₂ = −60 MPa, with σ<sub>y</sub> = 300 MPa. Find the factor of safety by the Tresca and von Mises theories. Then find the Goodman factor of safety for σ<sub>a</sub> = 100 MPa, σ<sub>m</sub> = 150 MPa, S<sub>e</sub> = 250 MPa and S<sub>ut</sub> = 600 MPa, and the life of a ball bearing with C = 30 kN and P = 6 kN.

```python
import math

s1, s2, sy = 120, -60, 300
tresca = sy / (s1 - s2)
vm = sy / math.sqrt(s1 ** 2 - s1 * s2 + s2 ** 2)
print(f"Tresca N = {tresca:.3f}, von Mises N = {vm:.3f}")
sa, sm, se, sut = 100, 150, 250, 600
print(f"Goodman N = {1 / (sa / se + sm / sut):.4f}")
C, P = 30, 6
print(f"ball bearing life = {(C / P) ** 3:.0f} million revolutions")
G, d, D, n, F = 80e3, 8, 48, 10, 500
print(f"spring stiffness = {G * d ** 4 / (8 * D ** 3 * n):.3f} N/mm")
```
```output
Tresca N = 1.667, von Mises N = 1.890
Goodman N = 1.5385
ball bearing life = 125 million revolutions
spring stiffness = 37.037 N/mm
```

## Practice questions

```quiz
q: A ball bearing has a dynamic load rating of 20 kN and carries 4 kN. What is its rated life in million revolutions?
answer: 125
verify: (20 / 4) ** 3
explain: L₁₀ = (C/P)³ = 5³ = 125 million revolutions.
```

```quiz
q: In pure shear, what shear stress does the maximum shear stress (Tresca) theory allow, as a fraction of the yield strength?
answer: 0.5
verify: 0.5
explain: Tresca predicts yielding when τ<sub>max</sub> = σ<sub>y</sub>/2, so the allowed shear stress is 0.5σ<sub>y</sub> (von Mises gives 0.577σ<sub>y</sub>).
```

```quiz
q: A shaft carries a bending moment of 3 kN m and a torque of 4 kN m. What is the equivalent torque in kN m (maximum shear stress theory)?
answer: 5
verify: (3 ** 2 + 4 ** 2) ** 0.5
explain: T<sub>e</sub> = √(M² + T²) = √(9 + 16) = 5 kN m.
```

```quiz
q: A component has S<sub>e</sub> = 200 MPa and S<sub>ut</sub> = 500 MPa, with σ<sub>a</sub> = 80 MPa and σ<sub>m</sub> = 100 MPa. What is the factor of safety by the Goodman criterion? Give the answer to three decimal places.
answer: 1.667
verify: round(1 / (80 / 200 + 100 / 500), 3)
explain: 1/N = 80/200 + 100/500 = 0.4 + 0.2 = 0.6, so N ≈ 1.667.
```

```quiz
q: Which failure theory is generally recommended for ductile materials as the most accurate?
- Maximum principal stress theory
- Maximum principal strain theory
* Distortion energy (von Mises) theory
- Maximum strain energy theory
explain: The distortion energy theory agrees best with experiments on ductile materials. The maximum principal stress theory suits brittle materials.
```
