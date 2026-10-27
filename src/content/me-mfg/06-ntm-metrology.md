---
title: Non-Traditional Machining and Metrology
chapter: Machining
description: EDM, ECM, USM, AJM, LBM and EBM principles and MRR, limits, fits and tolerances, hole and shaft basis, gauges, surface roughness, comparators and interferometry.
---
**Non-traditional machining** removes material without a sharp cutting tool, for hard materials and fine features. **Metrology** makes sure parts fit together: limits, fits and measurement.

## Non-traditional machining

| Process | How it removes material | Typical use |
| --- | --- | --- |
| **EDM** | Electric sparks in a dielectric melt and vaporise tiny craters | Dies and moulds in hardened steel (conductive work only) |
| **ECM** | Anodic dissolution in an electrolyte (reverse electroplating) | Turbine blades; no tool wear, no residual stress |
| **USM** | Abrasive slurry hammered by a tool vibrating at about 20 kHz | Brittle materials: glass, ceramics |
| **AJM** | High-speed jet of abrasive particles in gas | Deburring, cutting thin brittle sheets |
| **LBM / EBM** | Focused laser or electron beam melts and vaporises | Very small holes; EBM needs a vacuum |
| Water jet | High-pressure water jet (with abrasive for metals) | Cutting soft materials, composites |

**ECM material removal rate** (Faraday's law): MRR (mass per second) = **A I/(F Z)**, where A is atomic weight, Z valency, F = 96,500 C. Volume rate = A I/(ρ F Z).

**EDM:** the tool also wears; MRR rises with spark energy (RC circuit energy ½CV²), but finish gets worse.

## Limits, fits and tolerances

- **Basic size:** the nominal size. **Tolerance** = upper limit − lower limit.
- **Allowance:** the minimum clearance (or maximum interference) between mating parts.
- **Fits:** **clearance** (always a gap), **interference** (always tight), **transition** (either).
- **Hole-basis system:** the hole is fixed (H, lower deviation zero) and the shaft varies. Most common, because holes are made with standard tools.
- IT grades: smaller numbers mean tighter tolerances. Tolerance unit i = 0.45 ∛D + 0.001D (µm, D in mm).

**Gauges:** a **GO** gauge checks the maximum material limit (smallest hole, largest shaft); a **NO-GO** gauge checks the least material limit. **Taylor's principle:** GO gauges check all features together (full form); NO-GO gauges check one feature at a time.

## Measurement

- **Surface roughness:** Ra (arithmetic average of deviations), Rz, Rmax.
- **Comparators** (mechanical, optical, pneumatic) compare a part with a standard.
- **Slip gauges** build up precise lengths; **sine bars** measure angles: sin θ = h/L.
- **Interferometry** with optical flats: each fringe = λ/2 change in height.

## Practice

```quiz
q: A hole is 50.000/50.025 mm and its shaft 49.950/49.975 mm. What is the maximum clearance in mm?
answer: 0.075
verify: round(50.025 - 49.950, 3)
explain: Max clearance = largest hole − smallest shaft = 50.025 − 49.950 = 0.075 mm.
```

```quiz
q: For the same hole and shaft, what is the minimum clearance (allowance) in mm?
answer: 0.025
verify: round(50.000 - 49.975, 3)
explain: Min clearance = smallest hole − largest shaft = 50.000 − 49.975 = 0.025 mm. Both are positive, so it is a clearance fit.
```

```quiz
q: A 200 mm sine bar is set with 50 mm of slip gauges. What angle (degrees) does it set? (Give 2 decimal places.)
answer: 14.48
verify: round(__import__("math").degrees(__import__("math").asin(50 / 200)), 2)
explain: sin θ = 50/200 = 0.25, so θ = 14.48°.
```

```quiz
q: Which process cannot machine an electrically non-conducting ceramic?
* EDM
- USM
- AJM
- LBM
explain: EDM needs a conductive workpiece for sparks to form. USM and AJM suit brittle non-conductors.
```

```quiz
q: In ECM of iron (A = 56, Z = 2) at 1000 A, what is the mass removal rate in g/s? (F = 96,500 C; give 3 decimal places.)
answer: 0.290
verify: round(56 * 1000 / (96500 * 2), 3)
explain: MRR = AI/(FZ) = 56,000/193,000 = 0.290 g/s.
```
