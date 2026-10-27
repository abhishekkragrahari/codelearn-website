---
title: GATE ME Mock Test 1 (20 Questions, Free)
chapter: Exam Prep
description: A free GATE Mechanical Engineering mock test with 20 original questions on SOM, TOM, design, fluids, thermodynamics, heat transfer, manufacturing and IE.
---
This mock test has **20 original GATE-style questions** across the mechanical engineering syllabus. Give yourself **60 minutes**, write your answers on paper, then open each question to check. Score +1 per correct answer and −1/3 per wrong MCQ.

> **Note:** All questions are written for GateShala in the GATE style; none is copied from a GATE paper. Every numerical answer is recomputed by a program when the site is built.

## Mechanics and strength of materials

```quiz
q: A material has E = 200 GPa and Poisson's ratio 0.25. What is its shear modulus G in GPa?
answer: 80
verify: 200 / (2 * (1 + 0.25))
explain: G = E/(2(1 + ν)) = 200/2.5 = 80 GPa.
```

```quiz
q: At a point σx = 80 MPa, σy = 20 MPa and τxy = 40 MPa. What is the major principal stress in MPa?
answer: 100
verify: round((80 + 20) / 2 + (((80 - 20) / 2) ** 2 + 40 ** 2) ** 0.5, 6)
explain: σ₁ = 50 + √(30² + 40²) = 50 + 50 = 100 MPa.
```

```quiz
q: A thin cylinder of diameter 1 m and wall thickness 10 mm holds a pressure of 2 MPa. What is the hoop stress in MPa?
answer: 100
verify: 2 * 1000 / (2 * 10)
explain: σ_h = pd/(2t) = 2 × 1000/(2 × 10) = 100 MPa.
```

## Theory of machines, vibrations and design

```quiz
q: A system has m = 1 kg, k = 100 N/m and c = 10 N·s/m. What is the damping ratio?
answer: 0.5
verify: 10 / (2 * (100 * 1) ** 0.5)
explain: ζ = c/(2√(km)) = 10/(2 × 10) = 0.5.
```

```quiz
q: A gear with 20 teeth turning at 600 rpm drives a gear with 60 teeth. What is the speed of the driven gear in rpm?
answer: 200
verify: 600 * 20 / 60
explain: N₂ = N₁ × T₁/T₂ = 600 × 20/60 = 200 rpm.
```

```quiz
q: A ball bearing has a dynamic load rating of 20 kN and carries 5 kN. What is its L₁₀ life in million revolutions?
answer: 64
verify: (20 / 5) ** 3
explain: L₁₀ = (C/P)³ = 4³ = 64 million revolutions.
```

```quiz
q: Which failure theories are commonly used for ductile materials? (Select all that apply.)
* Maximum shear stress (Tresca)
* Distortion energy (von Mises)
- Maximum principal stress (Rankine)
- None of these
explain: Tresca and von Mises suit ductile materials; the maximum principal stress theory is used for brittle materials.
```

## Fluid mechanics

```quiz
q: Laminar flow in a pipe has Reynolds number 1600. What is the Darcy friction factor?
answer: 0.04
verify: 64 / 1600
explain: f = 64/Re = 64/1600 = 0.04.
```

```quiz
q: A water jet (ρ = 1000 kg/m³) with flow rate 0.01 m³/s and velocity 20 m/s strikes a fixed flat plate normally. What is the force on the plate in N?
answer: 200
verify: 1000 * 0.01 * 20
explain: F = ρQV = 1000 × 0.01 × 20 = 200 N.
```

## Thermodynamics

```quiz
q: An Otto cycle has compression ratio 8 and γ = 1.4. What is its efficiency? (Give 3 decimal places.)
answer: 0.565
verify: round(1 - 1 / 8 ** 0.4, 3)
explain: η = 1 − 1/8^0.4 = 1 − 1/2.297 ≈ 0.565.
```

```quiz
q: A Carnot refrigerator works between 250 K and 300 K. What is its COP?
answer: 5
verify: 250 / (300 - 250)
explain: COP = T_L/(T_H − T_L) = 250/50 = 5.
```

```quiz
q: In a closed system, 100 kJ of heat is added and the system does 40 kJ of work. What is the change in internal energy in kJ?
answer: 60
verify: 100 - 40
explain: ΔU = Q − W = 100 − 40 = 60 kJ.
```

## Heat transfer

```quiz
q: Two walls are in series: R₁ = 0.2 K/W and R₂ = 0.3 K/W. The overall temperature difference is 100 K. What is the heat flow in W?
answer: 200
verify: 100 / (0.2 + 0.3)
explain: Q = ΔT/(R₁ + R₂) = 100/0.5 = 200 W.
```

```quiz
q: A heat exchanger has ΔT₁ = 60 K and ΔT₂ = 20 K. What is the LMTD in K? (Give 2 decimal places.)
answer: 36.41
verify: round((60 - 20) / __import__("math").log(60 / 20), 2)
explain: LMTD = 40/ln 3 = 40/1.0986 ≈ 36.41 K.
```

```quiz
q: Lumped capacitance analysis is valid when the Biot number is:
* Less than 0.1
- Greater than 1
- Equal to 1
- Greater than 10
explain: For Bi < 0.1 the temperature inside the body is nearly uniform, so it can be treated as lumped.
```

## Manufacturing and industrial engineering

```quiz
q: Taylor's equation is VT^0.5 = 400. At V = 100 m/min, what is the tool life in minutes?
answer: 16
verify: (400 / 100) ** 2
explain: T^0.5 = 4, so T = 16 minutes.
```

```quiz
q: In orthogonal cutting, rake angle α = 10° and friction angle β = 40°. By Merchant's theory, what is the shear angle in degrees?
answer: 30
verify: (90 + 10 - 40) / 2
explain: 2φ + β − α = 90°, so φ = (90 + α − β)/2 = (90 + 10 − 40)/2 = 30°.
```

```quiz
q: Fixed cost is ₹20,000, selling price ₹50 per unit and variable cost ₹30 per unit. What is the break-even quantity?
answer: 1000
verify: 20000 // (50 - 30)
explain: BEP = 20000/(50 − 30) = 1000 units.
```

```quiz
q: Which of these are non-traditional machining processes? (Select all that apply.)
* Electric discharge machining
* Laser beam machining
- Turning
- Milling
explain: EDM and LBM remove material without a conventional cutting tool; turning and milling are conventional processes.
```

```quiz
q: In a simple exponential smoothing forecast with α = 0.2, last forecast 100 and actual demand 120, what is the new forecast?
answer: 104
verify: round(100 + 0.2 * (120 - 100), 6)
explain: F_new = F + α(D − F) = 100 + 0.2 × 20 = 104.
```

## Your score

| Score (out of 20) | What it means |
| --- | --- |
| 16 and above | Strong: move to full-length papers |
| 10 – 15 | Revise the subjects where you lost marks |
| Below 10 | Go back to the lessons, then retake after two weeks |

Revise with the [formula sheet](formula-sheet.html) and follow the [study plan](study-plan.html).
