---
title: Force Methods and Consistent Deformation
chapter: Indeterminate Structures
description: Method of consistent deformation, propped cantilever and fixed beam results, three-moment theorem, unit load method, Castigliano's theorems and Maxwell's reciprocal theorem.
---
In a **force method**, you remove the redundant restraints, find the deflections they would have prevented, and choose the redundant forces that make those deflections zero (or equal to the support movement).

## Consistent deformation

1. Choose redundants and remove them to get a determinate **primary structure**.
2. Find the deflection at each removed restraint due to the loads.
3. Find the deflection due to a unit value of each redundant (flexibility coefficients).
4. Write compatibility: total deflection = 0, and solve.

**Example: propped cantilever with UDL w.** Remove the prop B. The cantilever tip deflects wL⁴/(8EI) down; a force R_B lifts it R_B L³/(3EI). Setting them equal: **R_B = 3wL/8**. The fixed-end moment is wL²/8 (hogging).

## Standard results

| Beam | Result |
| --- | --- |
| Propped cantilever, UDL | Prop reaction 3wL/8; fixed-end moment wL²/8 |
| Propped cantilever, central load P | Prop reaction 5P/16; fixed-end moment 3PL/16 |
| Fixed beam, UDL | End moments wL²/12; mid-span moment wL²/24 |
| Fixed beam, central load P | End moments PL/8; mid-span moment PL/8 |
| Fixed beam, load P at a from A | M_A = Pab²/L², M_B = Pa²b/L² |
| Fixed beam, support B sinks by Δ | End moments 6EIΔ/L² |

## Three-moment theorem (Clapeyron)

For continuous beams with spans L₁ and L₂ meeting at support 2 (constant EI, no settlement):

**M₁L₁ + 2M₂(L₁ + L₂) + M₃L₂ = −6A₁x̄₁/L₁ − 6A₂x̄₂/L₂**

where A and x̄ are the area of each span's free (simply supported) BMD and its centroid distance from the outer support. For a UDL on a span: 6Ax̄/L = wL³/4.

## Energy methods

- **Unit load method:** deflection Δ = ∫ M m dx/(EI) (m = moment due to a unit load at the point). For trusses: Δ = Σ P k L/(AE).
- **Castigliano's first theorem:** ∂U/∂Δ = P. **Second theorem:** **∂U/∂P = Δ**; for redundants, ∂U/∂R = 0 (least work).
- **Maxwell's reciprocal theorem:** the deflection at A due to a unit load at B equals the deflection at B due to a unit load at A (δ_AB = δ_BA). **Betti's theorem** is its general form.

## Worked example

A two-span continuous beam, spans 4 m each, UDL 12 kN/m, simply supported at the ends. Find the support moment at the middle.

- M₁ = M₃ = 0: 2M₂(8) = −2 × (12 × 4³/4) = −384, so **M₂ = −24 kN·m** (hogging). That is wL²/8, the known result for two equal spans.

## Practice

```quiz
q: A propped cantilever of span 6 m carries a UDL of 8 kN/m. What is the prop reaction in kN?
answer: 18
verify: 3 * 8 * 6 / 8
explain: R_B = 3wL/8 = 3 × 8 × 6/8 = 18 kN.
```

```quiz
q: A fixed beam of span 6 m carries a UDL of 10 kN/m. What is the fixed-end moment in kN·m?
answer: 30
verify: 10 * 6 ** 2 / 12
explain: M = wL²/12 = 10 × 36/12 = 30 kN·m.
```

```quiz
q: A fixed beam of span 5 m (EI = 20,000 kN·m²) has one support sinking 10 mm. What is the induced end moment in kN·m?
answer: 48
verify: round(6 * 20000 * 0.01 / 5 ** 2, 6)
explain: M = 6EIΔ/L² = 6 × 20,000 × 0.01/25 = 48 kN·m.
```

```quiz
q: Which theorem states that δ_AB = δ_BA?
- Castigliano's first theorem
* Maxwell's reciprocal theorem
- Three-moment theorem
- Müller-Breslau principle
explain: Maxwell's reciprocal theorem: the deflection at A due to a unit load at B equals that at B due to a unit load at A.
```
