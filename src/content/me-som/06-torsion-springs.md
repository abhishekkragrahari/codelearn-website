---
title: Torsion of Shafts and Springs
chapter: Torsion and Columns
description: The torsion equation T/J = τ/r = Gθ/L, solid and hollow shafts, power transmission, combined bending and torsion, and close-coiled helical springs in series and parallel.
---
Shafts carry power by twisting. The torsion equation gives their shear stress and angle of twist; the same ideas explain the stiffness of **helical springs**, whose wire is also loaded in torsion.

## The torsion equation

For a circular shaft:

**T/J = τ/r = Gθ/L**

- τ grows linearly from zero at the centre to its maximum at the surface.
- **Polar moment of inertia:** solid J = πd⁴/32; hollow J = π(D⁴ − d⁴)/32.
- **Maximum shear stress:** solid shaft τmax = 16T/(πd³).
- Torsional stiffness = T/θ = GJ/L.

**Power:** P = 2πNT/60 (N in rpm, T in N·m, P in W).

A hollow shaft is stronger and stiffer than a solid shaft of the **same weight**, because material near the centre carries little stress.

## Shafts in series and parallel

- **Series** (end to end): same torque, angles of twist add: θ = Σ TLᵢ/(GᵢJᵢ).
- **Parallel** (for example a composite shaft, or a shaft fixed at both ends with a torque in between): same angle of twist, torques add.

## Combined bending and torsion

A shaft with bending moment M and torque T has:

- **Equivalent torque** Te = √(M² + T²) → τmax = 16Te/(πd³)
- **Equivalent moment** Me = ½(M + √(M² + T²)) → σmax = 32Me/(πd³)

## Close-coiled helical springs

For a spring of mean coil diameter D (radius R), wire diameter d and n active turns under axial load W:

- Wire shear stress τ = 8WD/(πd³) (times a Wahl factor for curvature).
- **Deflection δ = 8WD³n/(Gd⁴) = 64WR³n/(Gd⁴)**.
- Stiffness k = Gd⁴/(8D³n).

Springs in **series**: 1/k = 1/k₁ + 1/k₂. In **parallel**: k = k₁ + k₂. Cutting a spring in half doubles the stiffness of each half.

## Worked example

A solid shaft transmits 40 kW at 400 rpm with τallow = 50 MPa. Find the minimum diameter.

- T = 40000 × 60/(2π × 400) = 954.9 N·m.
- d = (16T/(πτ))^(1/3) = (16 × 954.9 × 10³/(π × 50))^(1/3) = **46.0 mm**.

## Practice

```quiz
q: A shaft transmits 30 kW at 600 rpm. What is the torque in N·m? (Give 1 decimal place.)
answer: 477.5
verify: round(30000 * 60 / (2 * __import__("math").pi * 600), 1)
explain: T = 60P/(2πN) = 1,800,000/3769.9 = 477.5 N·m.
```

```quiz
q: If a solid shaft's diameter is doubled, its maximum shear stress under the same torque becomes:
- Half
- One quarter
* One eighth
- One sixteenth
explain: τmax = 16T/(πd³), so doubling d divides τ by 2³ = 8.
```

```quiz
q: Two springs of 10 N/mm and 15 N/mm are connected in series. What is the combined stiffness in N/mm?
answer: 6
verify: round(1 / (1 / 10 + 1 / 15), 6)
explain: 1/k = 1/10 + 1/15 = 1/6, so k = 6 N/mm.
```

```quiz
q: A shaft carries M = 3 kN·m and T = 4 kN·m. What is the equivalent torque in kN·m?
answer: 5
verify: (3 ** 2 + 4 ** 2) ** 0.5
explain: Te = √(3² + 4²) = 5 kN·m.
```
