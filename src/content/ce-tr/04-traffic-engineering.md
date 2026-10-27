---
title: Traffic Engineering: Flow, Capacity and Signal Design
chapter: Traffic
description: Traffic stream parameters, fundamental relation q = kv, Greenshields model, capacity, spot and journey speed studies, PCU, and traffic signal design by Webster's method.
---
Traffic engineering studies how vehicles move and how roads and junctions should be controlled. GATE asks about traffic flow models and **signal timing**.

## Traffic stream parameters

- **Flow (volume)** q: vehicles per hour. **Density** k: vehicles per km. **Speed** v: km/h.
- **Fundamental relation: q = k × v** (with v the **space-mean speed**).
- **Time-mean speed** (average of spot speeds) ≥ space-mean speed (harmonic mean of spot speeds).
- **Headway** h = 1/q; **spacing** s = 1/k.

## Greenshields model

Speed falls linearly with density: **v = v_f (1 − k/k_j)** (v_f = free speed, k_j = jam density).

- Then **q = v_f (k − k²/k_j)**, a parabola.
- **Maximum flow (capacity): q_max = v_f k_j/4**, at k = k_j/2 and v = v_f/2.

## Speed and volume studies

- **Spot speed:** 85th percentile speed is used for speed limits; 98th for geometric design; 15th for minimum speed limits.
- Journey speed and delay studies: moving observer method.
- **PCU** (passenger car units) convert mixed traffic to equivalent cars.
- **Origin–destination** studies for planning.

## Traffic signals (Webster's method)

- **Critical flow ratio** for each phase: y = q/s (q = design flow, s = saturation flow).
- **Optimum cycle length:** **C₀ = (1.5 L + 5)/(1 − Y)**, with Y = Σy (critical ratios of all phases) and L = total lost time per cycle (s).
- **Effective green** for each phase is shared in proportion to y: gᵢ = (yᵢ/Y)(C₀ − L).
- Pedestrian crossing time and amber (2–4 s) are added.

Other control: rotaries (weaving sections), grade separation, channelisation.

## Accident studies

Collision and condition diagrams; accident rates per million vehicle-km.

## Worked example

A road has v_f = 80 km/h and k_j = 120 veh/km (Greenshields).

- Capacity = 80 × 120/4 = **2400 veh/h**, at 60 veh/km and 40 km/h.

## Practice

```quiz
q: A road has free speed 60 km/h and jam density 160 veh/km. What is its capacity in veh/h by Greenshields' model?
answer: 2400
verify: 60 * 160 / 4
explain: q_max = v_f k_j/4 = 60 × 160/4 = 2400 veh/h.
```

```quiz
q: Two phases have critical flow ratios 0.3 and 0.25; total lost time is 10 s. What is Webster's optimum cycle length in seconds? (Give 1 decimal place.)
answer: 44.4
verify: round((1.5 * 10 + 5) / (1 - 0.55), 1)
explain: C₀ = (1.5 × 10 + 5)/(1 − 0.55) = 20/0.45 = 44.4 s.
```

```quiz
q: Spot speeds of three vehicles are 30, 40 and 60 km/h. What is the space-mean speed in km/h?
answer: 40
verify: round(3 / (1 / 30 + 1 / 40 + 1 / 60), 6)
explain: Space-mean speed = harmonic mean = 3/(1/30 + 1/40 + 1/60) = 3/0.075 = 40 km/h (time-mean is 43.3 km/h).
```

```quiz
q: Which percentile of spot speed is generally used to set the speed limit?
- 15th
- 50th
* 85th
- 98th
explain: The 85th percentile speed is the upper safe limit used for speed regulation.
```
