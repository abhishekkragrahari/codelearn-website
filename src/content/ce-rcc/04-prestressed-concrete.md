---
title: Prestressed Concrete
chapter: Concrete
description: Principles of prestressing, pre-tensioning and post-tensioning, stress concept and load balancing, stresses at transfer and service, and losses of prestress with formulas.
---
Concrete is strong in compression but weak in tension. **Prestressing** puts a planned compression into the member before loading, so that service loads cause little or no tension.

## Methods

- **Pre-tensioning:** tendons are stretched between abutments, concrete is cast around them, and when it hardens the tendons are released; the force is transferred by bond. Used for factory-made members (sleepers, hollow-core slabs).
- **Post-tensioning:** concrete is cast with ducts; tendons are threaded, stressed and anchored after hardening. Used for bridges and large members on site.

## Three ways to look at it

**1. Stress concept.** With prestress P at eccentricity e below the centroid, and moment M from loads:

**f = P/A ∓ P e y/I ± M y/I**

At the bottom fibre: f_bottom = P/A + Pe/Z_b − M/Z_b. Compression is positive here.

**2. Strength (internal couple) concept:** the tendon and the concrete compression form a couple, like an RCC beam.

**3. Load balancing:** a parabolic tendon with sag h over span L exerts an upward load **w_p = 8Ph/L²**. If w_p equals the applied UDL, the beam is under pure axial compression P/A with no bending.

## Losses of prestress

| Loss | Pre-tensioned | Post-tensioned |
| --- | --- | --- |
| Elastic shortening of concrete | m f_c (f_c = concrete stress at tendon level) | Only if tendons are stressed one after another (about half of m f_c on average) |
| Shrinkage of concrete | Yes | Yes (smaller, concrete is older) |
| Creep of concrete | Yes | Yes |
| Relaxation of steel | Yes | Yes |
| Anchorage slip | No | Δ E_s/L |
| Friction (wobble and curvature) | No | P_x = P₀ e^(−(μα + kx)) |

Total losses are typically 15–25%, so high-strength steel is essential: with mild steel the losses would wipe out most of the prestress.

## Worked example

A rectangular beam 300 × 600 mm with a straight tendon at e = 200 mm, P = 1200 kN.

- A = 180,000 mm²; Z = 300 × 600²/6 = 18 × 10⁶ mm³.
- P/A = 6.67 MPa; Pe/Z = 1200 × 10³ × 200/(18 × 10⁶) = 13.33 MPa.
- Top: 6.67 − 13.33 = **−6.67 MPa** (tension); bottom: 6.67 + 13.33 = **20 MPa** (compression), before load.

## Practice

```quiz
q: A parabolic tendon with P = 1000 kN has a sag of 0.2 m over a 10 m span. What uniform upward load (kN/m) does it apply?
answer: 16
verify: 8 * 1000 * 0.2 / 10 ** 2
explain: w_p = 8Ph/L² = 8 × 1000 × 0.2/100 = 16 kN/m.
```

```quiz
q: A post-tensioned tendon 20 m long has an anchorage slip of 5 mm (E_s = 200 GPa). What is the loss of stress in MPa?
answer: 50
verify: 5 * 200000 / 20000
explain: Loss = ΔE_s/L = 5 × 200,000/20,000 = 50 MPa.
```

```quiz
q: The concrete stress at the tendon level is 8 MPa and the modular ratio is 6. What is the elastic shortening loss in a pre-tensioned member in MPa?
answer: 48
verify: 6 * 8
explain: Loss = m f_c = 6 × 8 = 48 MPa.
```

```quiz
q: Which loss does NOT occur in pre-tensioned members?
- Creep of concrete
- Relaxation of steel
* Friction along the duct
- Shrinkage of concrete
explain: Pre-tensioned tendons are straight in open beds with no ducts, so there is no duct friction (and no anchorage slip).
```
