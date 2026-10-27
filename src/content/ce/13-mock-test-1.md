---
title: GATE CE Mock Test 1 (20 Questions, Free)
chapter: Exam Prep
description: A free GATE Civil Engineering mock test with 20 original questions on mechanics, structures, RCC, soils, fluids, hydrology, environmental and transportation.
---
This mock test has **20 original GATE-style questions** across the civil engineering syllabus. Give yourself **60 minutes**, write your answers on paper, then open each question to check. Score +1 per correct answer and −1/3 per wrong MCQ.

> **Note:** All questions are written for GateShala in the GATE style; none is copied from a GATE paper. Every numerical answer is recomputed by a program when the site is built.

## Solid mechanics and structures

```quiz
q: A steel bar 2 m long with area 500 mm² carries an axial load of 50 kN. E = 200 GPa. What is its elongation in mm?
answer: 1
verify: round(50e3 * 2000 / (500 * 200e3), 6)
explain: δ = PL/(AE) = 50000 × 2000 / (500 × 200000) = 1 mm.
```

```quiz
q: A rectangular beam 200 mm wide and 300 mm deep carries a bending moment of 18 kN·m. What is the maximum bending stress in MPa?
answer: 6
verify: round(18e6 / (200 * 300 ** 2 / 6), 6)
explain: Section modulus Z = bd²/6 = 200 × 300²/6 = 3 × 10⁶ mm³; σ = M/Z = 18 × 10⁶ / 3 × 10⁶ = 6 MPa.
```

```quiz
q: A column fixed at both ends has actual length L. Its effective length for Euler buckling is:
- 2L
- L
- 0.7L
* 0.5L
explain: Both ends fixed: L_e = L/2. (Fixed–free is 2L, pinned–pinned is L, fixed–pinned about 0.7L.)
```

```quiz
q: A simply supported beam of span 4 m carries a central point load of 20 kN. What is the maximum bending moment in kN·m?
answer: 20
verify: 20 * 4 / 4
explain: M_max = PL/4 = 20 × 4/4 = 20 kN·m.
```

```quiz
q: Which of these increase the deflection of a cantilever with an end load? (Select all that apply.)
* Increasing the span
* Using a material with a lower E
- Increasing the depth of the section
- Reducing the load
explain: δ = PL³/(3EI): it grows with L and with smaller E. A deeper section raises I and reduces deflection.
```

## Concrete and steel

```quiz
q: For Fe 415 steel, the limiting neutral axis depth ratio x_u,max/d is:
- 0.53
* 0.48
- 0.46
- 0.36
explain: Per IS 456, x_u,max/d is 0.53 for Fe 250, 0.48 for Fe 415 and 0.46 for Fe 500.
```

```quiz
q: A slab carries a dead load of 4 kN/m² and a live load of 3 kN/m². What is the factored design load in kN/m² (load factor 1.5)?
answer: 10.5
verify: 1.5 * (4 + 3)
explain: w_u = 1.5 × (4 + 3) = 10.5 kN/m².
```

## Geotechnical engineering

```quiz
q: A saturated soil has water content 30% and specific gravity 2.7. What is its void ratio?
answer: 0.81
verify: round(0.30 * 2.7 / 1, 6)
explain: Se = wG with S = 1: e = 0.30 × 2.7 = 0.81.
```

```quiz
q: At a depth, total stress is 150 kPa and pore water pressure is 50 kPa. What is the effective stress in kPa?
answer: 100
verify: 150 - 50
explain: σ' = σ − u = 150 − 50 = 100 kPa.
```

```quiz
q: For a sand with φ = 30° and no cohesion, what is the active earth pressure coefficient? (Give 3 decimal places.)
answer: 0.333
verify: round((1 - __import__("math").sin(__import__("math").radians(30))) / (1 + __import__("math").sin(__import__("math").radians(30))), 3)
explain: K_a = (1 − sin 30°)/(1 + sin 30°) = 0.5/1.5 = 1/3.
```

## Fluid mechanics and hydrology

```quiz
q: Water flows through a pipe of area 0.02 m² at 3 m/s and then through a section of area 0.01 m². What is the velocity there in m/s?
answer: 6
verify: 0.02 * 3 / 0.01
explain: Continuity: A₁V₁ = A₂V₂, so V₂ = 0.02 × 3/0.01 = 6 m/s.
```

```quiz
q: A pipe of diameter 0.1 m carries water at 0.02 m/s. ν = 1 × 10⁻⁶ m²/s. What is the Reynolds number?
answer: 2000
verify: round(0.02 * 0.1 / 1e-6, 6)
explain: Re = VD/ν = 0.02 × 0.1/10⁻⁶ = 2000.
```

```quiz
q: Flow in an open channel has velocity 3 m/s and depth 0.4 m. Taking g = 10 m/s², the flow is:
- Subcritical
- Critical
* Supercritical
- Cannot be determined
explain: Fr = V/√(gy) = 3/√(10 × 0.4) = 3/2 = 1.5 > 1, so the flow is supercritical.
```

```quiz
q: A crop has a base period of 120 days and duty 864 ha/cumec. What is its delta in metres?
answer: 1.2
verify: round(8.64 * 120 / 864, 6)
explain: Δ = 8.64 B/D = 8.64 × 120/864 = 1.2 m.
```

## Environmental and transportation

```quiz
q: A sedimentation tank of volume 600 m³ treats 200 m³/h. What is the detention time in hours?
answer: 3
verify: 600 / 200
explain: Detention time = V/Q = 600/200 = 3 hours.
```

```quiz
q: The 5-day BOD of a waste is 200 mg/L and the rate constant (base e) is 0.23 per day. What is the ultimate BOD in mg/L? (Round to the nearest integer.)
answer: 293
verify: round(200 / (1 - __import__("math").exp(-0.23 * 5)))
explain: L₀ = BOD₅/(1 − e^(−kt)) = 200/(1 − e^(−1.15)) = 200/0.683 ≈ 293 mg/L.
```

```quiz
q: A vehicle moves at 20 m/s. Reaction time is 2.5 s and f = 0.4; take g = 10 m/s². What is the stopping sight distance in m?
answer: 100
verify: 20 * 2.5 + 20 ** 2 / (2 * 10 * 0.4)
explain: SSD = vt + v²/(2gf) = 50 + 400/8 = 50 + 50 = 100 m.
```

```quiz
q: On a curve of radius 100 m with a design speed of 20 m/s, e + f must equal (g = 10 m/s²):
answer: 0.4
verify: round(20 ** 2 / (10 * 100), 6)
explain: e + f = v²/(gR) = 400/1000 = 0.4.
```

```quiz
q: On a map of scale 1 : 500, two points are 4 cm apart. What is the ground distance in metres?
answer: 20
verify: 4 * 500 / 100
explain: 4 cm × 500 = 2000 cm = 20 m.
```

```quiz
q: In surveying, a closed traverse is used to:
* Check the accuracy of angle and distance measurements through closing error
- Measure only elevations
- Avoid all errors in the field
- Replace levelling
explain: In a closed traverse the latitudes and departures must sum to zero; the closing error measures how accurate the work was.
```

## Your score

| Score (out of 20) | What it means |
| --- | --- |
| 16 and above | Strong: move to full-length papers |
| 10 – 15 | Revise the subjects where you lost marks |
| Below 10 | Go back to the lessons, then retake after two weeks |

Revise with the [formula sheet](formula-sheet.html) and follow the [study plan](study-plan.html).
