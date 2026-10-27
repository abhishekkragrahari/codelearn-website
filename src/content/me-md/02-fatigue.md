---
title: Fatigue, Endurance Limit and Goodman Line
chapter: Design Basics
description: Fluctuating stresses, S-N curve and endurance limit, modifying factors, fatigue stress concentration and notch sensitivity, and Goodman, Soderberg and Gerber criteria.
---
Most machine parts fail not under one big load but under **millions of smaller repeated loads**. This is **fatigue**: cracks start at stress raisers and grow until the part breaks, often far below the yield strength.

## Fluctuating stress

A stress that varies between σmax and σmin has:

- **Mean stress** σm = (σmax + σmin)/2
- **Alternating (amplitude) stress** σa = (σmax − σmin)/2
- Fully reversed loading (a rotating shaft in bending): σm = 0.

## S–N curve and endurance limit

Plotting stress amplitude against cycles to failure (log scale) gives the **S–N curve**. For steels it flattens at about 10⁶ cycles: below the **endurance limit** S_e the part lasts indefinitely. For steels, the test-specimen value is roughly **S_e' ≈ 0.5 S_ut**.

The real part's limit is lower: **S_e = k_a k_b k_c k_d … S_e'**, with factors for surface finish, size, load type, temperature and reliability.

## Notches in fatigue

- **Fatigue stress concentration factor:** K_f = 1 + q(K_t − 1), where q (0 to 1) is the **notch sensitivity**.
- Multiply the alternating stress by K_f (or divide S_e by it).

## Mean-stress criteria

With S_e (endurance), S_y (yield) and S_ut (ultimate), and factor of safety N:

| Criterion | Equation |
| --- | --- |
| **Soderberg** (most conservative) | σa/S_e + σm/S_y = 1/N |
| **Goodman** (widely used) | σa/S_e + σm/S_ut = 1/N |
| Gerber (parabolic, least conservative) | Nσa/S_e + (Nσm/S_ut)² = 1 |

## Cumulative damage

**Miner's rule:** if a part runs nᵢ cycles at stress levels whose lives are Nᵢ, it fails when **Σ nᵢ/Nᵢ = 1**.

## Worked example

A steel bar has S_ut = 600 MPa and S_e = 250 MPa (corrected). It sees σm = 100 MPa and σa = 100 MPa. Find N by Goodman.

- 1/N = 100/250 + 100/600 = 0.4 + 0.1667 = 0.5667.
- **N = 1.76**.

## Practice

```quiz
q: A stress varies from −40 MPa to 120 MPa. What is the alternating stress in MPa?
answer: 80
verify: (120 - (-40)) / 2
explain: σa = (σmax − σmin)/2 = 160/2 = 80 MPa (and σm = 40 MPa).
```

```quiz
q: K_t = 2.0 and notch sensitivity q = 0.8. What is the fatigue stress concentration factor K_f?
answer: 1.8
verify: round(1 + 0.8 * (2.0 - 1), 6)
explain: K_f = 1 + q(K_t − 1) = 1 + 0.8 = 1.8.
```

```quiz
q: A part runs 2 × 10⁴ cycles at a level with life 10⁵ cycles and 3 × 10⁴ cycles at a level with life 10⁵ cycles. What fraction of its life is used (Miner's rule)?
answer: 0.5
verify: 2e4 / 1e5 + 3e4 / 1e5
explain: Σ n/N = 0.2 + 0.3 = 0.5: half the life is used.
```

```quiz
q: Which mean-stress criterion is the most conservative?
* Soderberg
- Goodman
- Gerber
- All are the same
explain: Soderberg uses S_y instead of S_ut, so its line lies inside the others.
```
