---
title: Design for Static Loading and Failure Theories
chapter: Design Basics
description: Factor of safety, stress concentration, design of members under static loads using Tresca and von Mises theories, and the choice of theory for ductile and brittle materials.
---
Machine design asks: given the loads, what size must a part be so that it does not fail? For steady (static) loads the answer combines a **failure theory** with a **factor of safety**.

## Factor of safety

**N = failure stress / allowable (working) stress**

- For ductile materials, failure stress = yield strength S_y.
- For brittle materials, failure stress = ultimate strength S_ut.

Higher N is used when loads are uncertain, materials vary, or failure would be dangerous.

## Stress concentration

Holes, fillets, grooves and keyways raise the local stress: σmax = K_t σnominal, where K_t is the theoretical **stress concentration factor**.

- For **brittle** materials under static load, K_t must be applied.
- For **ductile** materials under static load, local yielding redistributes the stress, so K_t is usually ignored. Under fatigue loading it matters for both (see the next lesson).

## Choosing a failure theory

With principal stresses σ₁ ≥ σ₂ ≥ σ₃:

| Theory | Design equation | Use |
| --- | --- | --- |
| Maximum principal stress | σ₁ = S_ut/N | Brittle materials |
| Maximum shear stress (Tresca) | σ₁ − σ₃ = S_y/N | Ductile; conservative |
| Distortion energy (von Mises) | σ_vm = S_y/N | Ductile; most accurate |

Von Mises stress in 2D: **σ_vm = √(σ₁² − σ₁σ₂ + σ₂²)**; for a shaft with bending stress σ and torsional shear τ: **σ_vm = √(σ² + 3τ²)**, and Tresca gives **√(σ² + 4τ²)**.

## Shaft under combined loads

For a solid shaft of diameter d with moment M and torque T:

- Tresca: d³ = (32N/(πS_y)) √(M² + T²)
- Von Mises: d³ = (32N/(πS_y)) √(M² + 0.75T²)

## Worked example

A point in a ductile part (S_y = 300 MPa) has σ = 120 MPa (bending) and τ = 40 MPa (torsion). Find the factor of safety by both theories.

- Tresca: √(120² + 4 × 40²) = √20800 = 144.2 MPa → N = 300/144.2 = **2.08**.
- Von Mises: √(120² + 3 × 40²) = √19200 = 138.6 MPa → N = 300/138.6 = **2.17**.

Von Mises always gives an equal or higher factor of safety than Tresca.

## Practice

```quiz
q: A plate with a hole has nominal stress 50 MPa and K_t = 2.5. What is the peak stress in MPa?
answer: 125
verify: 2.5 * 50
explain: σmax = K_t σnom = 2.5 × 50 = 125 MPa.
```

```quiz
q: A point has σ = 80 MPa and τ = 60 MPa. What is the von Mises equivalent stress in MPa? (Give 1 decimal place.)
answer: 131.1
verify: round((80 ** 2 + 3 * 60 ** 2) ** 0.5, 1)
explain: σ_vm = √(80² + 3 × 60²) = √(6400 + 10800) = √17200 ≈ 131.1 MPa.
```

```quiz
q: For a brittle material under static load, the appropriate failure theory is:
* Maximum principal stress theory
- Maximum shear stress theory
- Distortion energy theory
- Maximum strain energy theory
explain: Brittle materials fail by separation when the largest normal stress reaches S_ut.
```

```quiz
q: A ductile part has S_y = 240 MPa and a design factor of safety 3. What is the allowable stress in MPa?
answer: 80
verify: 240 / 3
explain: Allowable = S_y/N = 240/3 = 80 MPa.
```

```quiz
q: A ductile part has principal stresses 120 MPa and 40 MPa (σ₃ = 0). By the maximum shear stress theory, what is the equivalent stress in MPa?
answer: 120
verify: max(120, 40, 0) - min(120, 40, 0)
explain: Tresca uses σmax − σmin = 120 − 0 = 120 MPa (both principal stresses are tensile).
```

```quiz
q: A brittle material has an ultimate strength of 300 MPa and a factor of safety of 4. What is the allowable stress in MPa?
answer: 75
verify: 300 / 4
explain: For brittle materials, allowable = S_ut/N = 75 MPa.
```
