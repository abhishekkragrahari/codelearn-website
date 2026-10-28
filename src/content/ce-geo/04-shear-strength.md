---
title: Shear Strength of Soils
chapter: Strength
description: Mohr-Coulomb failure criterion, direct shear, triaxial (UU, CU, CD) and unconfined compression tests, sensitivity, pore pressure parameters and stress paths.
---
Soils fail in shear. Bearing capacity, earth pressure and slope stability all depend on the **shear strength** parameters c and φ.

## Mohr–Coulomb criterion

**τ_f = c' + σ' tan φ'** (in terms of effective stresses)

- Clean sand: c' = 0. Normally consolidated clay: c' ≈ 0 in drained terms.
- The failure plane makes an angle **45° + φ/2** with the major principal plane.
- Relation between principal stresses at failure:
  **σ₁ = σ₃ tan²(45° + φ/2) + 2c tan(45° + φ/2)**.

## Laboratory tests

**Direct shear test:** the failure plane is forced to be horizontal; quick and suited to sands. Drainage cannot be controlled well.

**Triaxial test** (cylindrical sample, cell pressure σ₃, deviator stress σ_d = σ₁ − σ₃):

| Test | Consolidation | Shearing | Gives |
| --- | --- | --- | --- |
| UU (quick) | No | Undrained | c_u (φ_u = 0 for saturated clay) |
| CU | Yes | Undrained, measure u | c', φ' and total-stress parameters |
| CD (slow) | Yes | Drained | c', φ' directly |

**Unconfined compression test** (σ₃ = 0): for saturated clay, **c_u = q_u/2**.

**Vane shear test** (field, soft clays): c_u = T/(πD²(H/2 + D/6)).

**Sensitivity** S_t = undisturbed strength / remoulded strength. Above 8: quick clays.

## Pore pressure parameters (Skempton)

**Δu = B[Δσ₃ + A(Δσ₁ − Δσ₃)]**

- B = 1 for fully saturated soil.
- A at failure: positive for normally consolidated clays (they contract), negative for heavily over-consolidated clays and dense sands (they dilate).

## Sands

- **Dense sand** peaks and then softens (dilates); **loose sand** reaches its strength slowly (contracts).
- Saturated loose sand under rapid cyclic loading can **liquefy** (σ' → 0).

## Worked example

A CD triaxial test on sand (c' = 0) fails at σ₃ = 100 kPa and σ₁ = 300 kPa.

- sin φ' = (σ₁ − σ₃)/(σ₁ + σ₃) = 200/400 = 0.5 → **φ' = 30°**.
- Failure plane at 45° + 15° = **60°** to the major principal plane.

## Practice

```quiz
q: An unconfined compression test on saturated clay gives q_u = 80 kPa. What is the undrained cohesion in kPa?
answer: 40
verify: 80 / 2
explain: c_u = q_u/2 = 40 kPa.
```

```quiz
q: A dry sand with φ = 30° is tested at σ₃ = 50 kPa. What is σ₁ at failure in kPa?
answer: 150
verify: round(50 * __import__("math").tan(__import__("math").radians(60)) ** 2, 6)
explain: σ₁ = σ₃ tan²(45° + 15°) = 50 × 3 = 150 kPa.
```

```quiz
q: Undisturbed and remoulded unconfined strengths of a clay are 120 and 30 kPa. What is its sensitivity?
answer: 4
verify: 120 / 30
explain: S_t = 120/30 = 4 (a sensitive clay).
```

```quiz
q: For a saturated clay in a UU test, the angle of shearing resistance in terms of total stress is:
* Zero
- 30°
- 45°
- Equal to φ'
explain: Raising the cell pressure only raises the pore pressure, so the strength (and Mohr circle size) does not change: φ_u = 0.
```

```quiz
q: A soil has c = 10 kPa and φ = 30°. What is its shear strength (kPa) on a plane with normal effective stress 100 kPa? (Give 2 decimal places.)
answer: 67.74
verify: round(10 + 100 * __import__("math").tan(__import__("math").radians(30)), 2)
explain: τ = c + σ′ tan φ = 10 + 100 × 0.5774 = 67.74 kPa.
```

```quiz
q: In a CD test on sand, σ₃ = 50 kPa and σ₁ = 150 kPa at failure. What is φ in degrees?
answer: 30
verify: round(__import__("math").degrees(__import__("math").asin((150 - 50) / (150 + 50))), 6)
explain: sin φ = (σ₁ − σ₃)/(σ₁ + σ₃) = 100/200 = 0.5, so φ = 30°.
```
