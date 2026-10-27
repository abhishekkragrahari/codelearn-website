---
title: Gears and Gear Trains
chapter: Power Transmission
description: Gear terminology, the law of gearing, involute teeth, module, interference and minimum teeth, and speed ratios of simple, compound and epicyclic gear trains.
---
Gears transmit motion between shafts at a fixed speed ratio. GATE asks about tooth geometry and about speed ratios in gear trains, especially **epicyclic** trains.

## Terminology

- **Pitch circle:** the imaginary circle that rolls without slipping on the mating gear's pitch circle. Diameter d.
- **Module** m = d/T (mm per tooth). Mating gears must have the same module.
- **Circular pitch** p = πm. **Diametral pitch** = T/d = 1/m.
- **Addendum** (standard) = 1m; **dedendum** = 1.25m.
- **Pressure angle** φ: usually 20°.
- **Centre distance** = m(T₁ + T₂)/2.

## Law of gearing

For a constant velocity ratio, the common normal at the point of contact must always pass through a fixed point, the **pitch point**. **Involute** and cycloidal profiles satisfy it. Involute gears also keep the velocity ratio constant if the centre distance changes slightly.

**Velocity ratio:** N₁/N₂ = T₂/T₁ = d₂/d₁.

## Interference

If a gear has too few teeth, the tip of the mating tooth digs into the non-involute flank: **interference**. The minimum number of teeth on a pinion meshing with a rack to avoid it is 2a_w/sin²φ (a_w = addendum in modules), which is about **17 teeth for 20° full-depth teeth**.

## Gear trains

- **Simple train:** each shaft has one gear. Speed ratio = T_last/T_first; idlers change direction only.
- **Compound train:** two gears on an intermediate shaft. **Train value** = N_out/N_in = (product of driver teeth)/(product of driven teeth).
- **Epicyclic train:** the axis of a planet gear moves around the sun on an arm.

**Epicyclic method (tabular):** give the arm a fixed rotation, then lock the arm and rotate the sun. The basic relation, for a sun S, an annulus A (internal gear) and the arm a:

**(N_S − N_a)/(N_A − N_a) = −T_A/T_S**

Also, for meshing planets: T_A = T_S + 2T_P.

## Worked example

An epicyclic train has a sun with 30 teeth and a fixed annulus with 90 teeth. The sun turns at 400 rpm. Find the arm speed.

- (400 − N_a)/(0 − N_a) = −90/30 = −3.
- 400 − N_a = 3N_a, so **N_a = 100 rpm**, same direction as the sun.
- Planet teeth: T_P = (90 − 30)/2 = 30.

## Practice

```quiz
q: Two gears of module 4 mm have 20 and 50 teeth. What is the centre distance in mm?
answer: 140
verify: 4 * (20 + 50) / 2
explain: C = m(T₁ + T₂)/2 = 4 × 70/2 = 140 mm.
```

```quiz
q: A compound train has driver gears with 20 and 25 teeth and driven gears with 60 and 50 teeth. The input runs at 1200 rpm. What is the output speed in rpm?
answer: 200
verify: 1200 * 20 * 25 // (60 * 50)
explain: N_out = 1200 × (20 × 25)/(60 × 50) = 1200 × 500/3000 = 200 rpm.
```

```quiz
q: In an epicyclic train, the annulus has 100 teeth and is fixed, the sun has 25 teeth. The arm turns at 50 rpm. What is the sun speed in rpm?
answer: 250
verify: 50 + 4 * 50
explain: (N_S − 50)/(0 − 50) = −100/25 = −4, so N_S − 50 = 200 and N_S = 250 rpm.
```

```quiz
q: In a simple gear train, an idler gear changes:
- The speed ratio
* Only the direction of rotation
- Both speed ratio and direction
- Neither
explain: The idler's teeth cancel out of the ratio; it only reverses direction (and fills the centre distance).
```
