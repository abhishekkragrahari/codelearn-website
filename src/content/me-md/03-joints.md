---
title: Bolted, Riveted and Welded Joints
chapter: Joints and Shafts
description: Design of bolted joints, bolt preload and stiffness, riveted joint efficiency, eccentrically loaded joints, and strength of butt and fillet welds with solved examples.
---
Machines are assembled from parts held by **joints**. Bolted joints can be taken apart; riveted and welded joints are permanent. GATE asks for their strength and for loads on the most stressed bolt or weld.

## Bolted joints

- Tensile stress area of a bolt carries the axial load: σ = P/A_t.
- A bolt is **preloaded** (initial tension F_i) to keep the joint tight. When an external load P is applied, the bolt takes only part of it:
  **F_bolt = F_i + C P**, with joint constant **C = k_b/(k_b + k_m)** (bolt and member stiffnesses).
- The joint separates when the member's share (1 − C)P exceeds F_i.

## Riveted joints

A riveted (or bolted) lap joint can fail by:

1. **Tearing** of the plate between rivets: P_t = (p − d) t σ_t.
2. **Shearing** of the rivets: P_s = n (π/4) d² τ (double for double shear).
3. **Crushing** of the plate or rivet: P_c = n d t σ_c.

**Efficiency** η = least of P_t, P_s, P_c divided by the strength of the solid plate p t σ_t.

## Eccentrically loaded joints

When a load P acts at an eccentricity e from the centroid of a group of n bolts:

- **Direct (primary) shear** on each bolt: P/n.
- **Secondary shear** from the moment Pe: on a bolt at distance r from the centroid, F = Pe r/Σr².
- Add the two as **vectors**; the most loaded bolt is usually the one farthest from the centroid on the side of the load.

## Welded joints

- **Butt weld** in tension: σ = P/(t L).
- **Fillet weld:** the weakest section is the **throat**, t = s cos 45° = 0.707 s (s = leg size).
  - Parallel (shear) fillet weld: P = 0.707 s L τ.
  - Transverse fillet welds are also designed on the throat area.

## Worked example

A plate is joined by two parallel fillet welds, each 100 mm long with 10 mm legs; τallow = 80 MPa. Find the safe load.

- Throat area = 2 × 0.707 × 10 × 100 = 1414 mm².
- P = 1414 × 80 = **113.1 kN**.

## Practice

```quiz
q: A bolt has stiffness 400 kN/mm and the clamped members 1200 kN/mm. What fraction of an external load does the bolt carry?
answer: 0.25
verify: 400 / (400 + 1200)
explain: C = k_b/(k_b + k_m) = 400/1600 = 0.25.
```

```quiz
q: A single fillet weld has leg 8 mm and length 150 mm; τallow = 100 MPa. What load (kN) can it carry in shear? (Give 1 decimal place.)
answer: 84.8
verify: round(0.707 * 8 * 150 * 100 / 1000, 1)
explain: P = 0.707 × 8 × 150 × 100 = 84,840 N ≈ 84.8 kN.
```

```quiz
q: A riveted joint has pitch 60 mm and rivet hole diameter 20 mm. What is its tearing efficiency in percent? (Give 2 decimal places.)
answer: 66.67
verify: round((60 - 20) / 60 * 100, 2)
explain: Tearing strength / solid plate strength = (p − d)/p = 40/60 = 66.67%.
```

```quiz
q: A bracket is held by 4 bolts at 100 mm from their centroid and carries 10 kN at an eccentricity of 200 mm. What is the secondary shear force on each bolt in kN?
answer: 5
verify: 10 * 200 * 100 / (4 * 100 ** 2)
explain: F = Pe r/Σr² = 10 × 200 × 100/(4 × 100²) = 5 kN.
```

```quiz
q: A bolt with stress area 100 mm² carries an axial load of 12 kN. What is its tensile stress in MPa?
answer: 120
verify: 12e3 / 100
explain: σ = P/A = 12,000/100 = 120 MPa.
```

```quiz
q: A fillet weld has a leg of 10 mm. What is its throat thickness in mm?
answer: 7.07
verify: round(10 * 0.7071, 2)
explain: t = s cos 45° = 0.707 × 10 = 7.07 mm.
```
