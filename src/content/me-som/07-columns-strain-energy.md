---
title: Columns, Strain Energy and Theories of Failure
chapter: Torsion and Columns
description: Euler buckling load and effective lengths, slenderness ratio and Rankine's formula, strain energy, impact loading, Castigliano's theorem, and the theories of failure.
---
A short column fails by crushing; a long slender one fails by **buckling** at a much lower load. This lesson covers buckling, strain energy methods, and how to predict yielding under combined stresses.

## Euler buckling

For an ideal straight column with pinned ends:

**P_cr = π²EI/L_e²**

Use the **smallest** I of the section (it buckles about its weakest axis). The effective length L_e depends on the end conditions:

| End conditions | L_e |
| --- | --- |
| Both ends pinned | L |
| One fixed, one free | 2L |
| One fixed, one pinned | L/√2 ≈ 0.707L |
| Both ends fixed | L/2 |

**Slenderness ratio** λ = L_e/k, with I = Ak². Euler's formula holds only for long columns, where P_cr/A is below the proportional limit. **Rankine's formula** covers all lengths: 1/P = 1/P_crushing + 1/P_Euler.

## Strain energy

- Axial load: U = P²L/(2AE) = σ²(AL)/(2E). **Resilience per unit volume** = σ²/(2E).
- Bending: U = ∫M² dx/(2EI). Torsion: U = T²L/(2GJ).

**Impact loading:** a load W dropped through height h onto a bar:

σ = (W/A)[1 + √(1 + 2hAE/(WL))]

A **suddenly applied** load (h = 0) causes **twice** the stress of the same load applied gradually.

**Castigliano's theorem:** the deflection under a load P is δ = ∂U/∂P. It gives deflections of curved bars, frames and springs.

## Theories of failure

For a ductile material with yield strength S_y, under principal stresses σ₁, σ₂ (σ₃ = 0):

| Theory | Failure when |
| --- | --- |
| Maximum principal stress (Rankine) | σ₁ = S_y (used for brittle materials) |
| **Maximum shear stress (Tresca)** | σ₁ − σ₃ = S_y (largest difference of principal stresses) |
| Maximum strain (St. Venant) | σ₁ − νσ₂ = S_y |
| **Distortion energy (von Mises)** | σ₁² − σ₁σ₂ + σ₂² = S_y² |

In pure shear, Tresca predicts yield at τ = 0.5 S_y and von Mises at τ = 0.577 S_y.

## Worked example

A steel column (E = 200 GPa), 3 m long, pinned at both ends, is a solid rod of diameter 50 mm. Find its Euler load.

- I = π × 50⁴/64 = 306,796 mm⁴.
- P_cr = π² × 200,000 × 306,796/3000² = **67.3 kN**.

## Practice

```quiz
q: A column fixed at both ends has an Euler load how many times that of the same column pinned at both ends?
answer: 4
verify: (1 / 0.5) ** 2
explain: L_e falls from L to L/2, and P_cr ∝ 1/L_e², so the load becomes 4 times.
```

```quiz
q: A material has yield strength 250 MPa. By the maximum shear stress theory, at what shear stress (MPa) does it yield in pure shear?
answer: 125
verify: 250 / 2
explain: Pure shear gives σ₁ = τ, σ₃ = −τ, so 2τ = S_y and τ = 125 MPa.
```

```quiz
q: Steel with E = 200 GPa is stressed to 200 MPa. What is its strain energy per unit volume in kJ/m³?
answer: 100
verify: (200e6) ** 2 / (2 * 200e9) / 1000
explain: σ²/(2E) = (2 × 10⁸)²/(4 × 10¹¹) = 10⁵ J/m³ = 100 kJ/m³.
```

```quiz
q: A load is applied suddenly to a bar instead of gradually. The maximum stress is:
- The same
* Twice as large
- Half as large
- Four times as large
explain: With h = 0 the impact formula gives σ = 2W/A.
```

```quiz
q: Which failure theories are suited to ductile materials? (Select all that apply.)
* Maximum shear stress (Tresca)
* Distortion energy (von Mises)
- Maximum principal stress (Rankine)
- Maximum principal strain only
explain: Tresca and von Mises predict yielding of ductile metals well; Rankine's theory suits brittle materials.
```
