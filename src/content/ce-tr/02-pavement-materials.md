---
title: Pavement Materials: Soil, Aggregates and Bitumen
chapter: Pavements
description: Subgrade soil tests (CBR, plate bearing), aggregate tests (crushing, abrasion, impact, shape), bitumen tests (penetration, ductility, softening point, viscosity grades) and Marshall mix design.
---
A pavement is only as good as its materials. GATE asks what each test measures, typical limits, and the Marshall mix design calculations.

## Subgrade soil

- **California Bearing Ratio (CBR):** load needed to penetrate the soil with a standard plunger, as a percentage of the load on standard crushed stone (1370 kgf at 2.5 mm and 2055 kgf at 5.0 mm). The higher of the two values is used (re-test if the 5 mm value is higher).
- **Plate bearing test:** modulus of subgrade reaction k = p/0.125 cm (pressure at 1.25 mm settlement), for rigid pavement design. Correct for plate size: k₁a₁ = k₂a₂.

## Aggregate tests

| Test | Property | Typical IRC limit |
| --- | --- | --- |
| Crushing value | Strength under gradual load | ≤ 30% (surface course) |
| **Los Angeles abrasion** | Hardness / wear resistance | ≤ 30–35% |
| Impact value | Toughness | ≤ 24–30% |
| Shape: flakiness and elongation index | Particle shape | Combined ≤ 35% |
| Soundness | Weathering resistance | Loss after 5 cycles |
| Water absorption / stripping | Affinity to bitumen | ≤ 2% absorption |

## Bitumen tests

- **Penetration test:** depth (in 0.1 mm) a standard needle sinks in 5 s at 25 °C under 100 g. 80/100 bitumen is softer than 30/40.
- **Ductility:** elongation before breaking (≥ 75 cm for many grades).
- **Softening point** (ring and ball): temperature at which bitumen softens.
- **Flash and fire point:** safety during heating.
- Indian bitumen is now specified by **viscosity grade** (VG-10, VG-20, VG-30, VG-40; higher = stiffer).
- **Emulsions** (rapid, medium, slow setting) and **cutbacks** (bitumen with solvent).

## Marshall mix design

Specimens at different bitumen contents are tested for stability and flow.

- **Theoretical specific gravity** G_t = 100/Σ(Wᵢ/Gᵢ).
- **Air voids** V_v = (G_t − G_m)/G_t × 100 (G_m = bulk specific gravity of the mix). Target about 3–5%.
- **Voids in bitumen** V_b = G_m × W_b/G_b.
- **VMA** = V_v + V_b; **VFB** = V_b/VMA × 100.
- **Optimum bitumen content:** average of the contents at maximum stability, maximum unit weight and target air voids.

## Worked example

A mix has G_t = 2.50 and G_m = 2.40 with 5% bitumen (G_b = 1.02) by weight of mix.

- V_v = (2.50 − 2.40)/2.50 × 100 = **4%**.
- V_b = 2.40 × 5/1.02 = **11.76%**; VMA = 15.76%; VFB = **74.6%**.

## Practice

```quiz
q: In a CBR test, the load at 2.5 mm penetration is 68.5 kgf. What is the CBR in percent?
answer: 5
verify: round(68.5 / 1370 * 100, 6)
explain: CBR = 68.5/1370 × 100 = 5%.
```

```quiz
q: A Marshall specimen has G_t = 2.45 and G_m = 2.35. What are its air voids in percent? (Give 2 decimal places.)
answer: 4.08
verify: round((2.45 - 2.35) / 2.45 * 100, 2)
explain: V_v = 0.10/2.45 × 100 = 4.08%.
```

```quiz
q: Which test measures the resistance of aggregates to wear?
- Crushing value test
* Los Angeles abrasion test
- Impact test
- Soundness test
explain: The Los Angeles test tumbles aggregate with steel balls and measures the loss due to wear.
```

```quiz
q: A bitumen of penetration grade 80/100 compared with 30/40 is:
* Softer
- Harder
- The same
- Not comparable
explain: Higher penetration means the needle sinks deeper, so the bitumen is softer.
```

```quiz
q: In a CBR test, the load at 5.0 mm penetration is 205.5 kgf. What is the CBR at 5.0 mm in percent?
answer: 10
verify: round(205.5 / 2055 * 100, 6)
explain: CBR = 205.5/2055 × 100 = 10%.
```

```quiz
q: A Marshall mix has G_m = 2.30 and 5.5% bitumen (G_b = 1.0) by weight. What are the voids filled with bitumen, V_b, in percent?
answer: 12.65
verify: round(2.30 * 5.5 / 1.0, 2)
explain: V_b = G_m W_b/G_b = 2.30 × 5.5 = 12.65%.
```
