---
title: Metal Forming: Rolling, Forging and Extrusion
chapter: Primary Processes
description: Hot and cold working, flow stress, rolling (maximum draft, roll force), forging, extrusion and wire drawing forces, and sheet metal operations including blanking force and deep drawing.
---
Forming shapes metal by **plastic deformation** without removing material. GATE asks about rolling limits, forming forces and sheet-metal calculations.

## Hot and cold working

- **Hot working** is done above the **recrystallisation temperature** (about 0.4–0.5 of the melting point in kelvin): low forces, no strain hardening, but poorer finish and accuracy.
- **Cold working** is done below it: strain hardening raises strength, good finish and accuracy, but higher forces.
- **Flow stress** of a strain-hardening metal: σ_f = K εⁿ (n = strain-hardening exponent). Average flow stress over a strain ε: K εⁿ/(n + 1).
- **True strain** ε = ln(L/L₀) = ln(A₀/A).

## Rolling

- **Draft** Δh = h₀ − h_f.
- **Maximum possible draft** (bite condition): **Δh_max = μ² R** (R = roll radius).
- **Roll force** ≈ σ_f,avg × w × L, with contact length **L = √(R Δh)**.
- **Neutral point:** where the strip moves at the roll speed. Before it the strip is slower, after it faster.

## Forging

- **Open-die:** simple shapes; force for upsetting a cylinder F = σ_f × A × (1 + 2μr/(3h)) (friction raises it).
- **Closed (impression)-die:** flash forms around the parting line.

## Extrusion and drawing

- **Extrusion ratio** R = A₀/A_f. Extrusion pressure ≈ σ_f ln R (ideal, no friction); real presses add friction and redundant work.
- **Direct extrusion:** billet moves with the ram, friction with the container. **Indirect:** die moves, lower friction.
- **Wire drawing:** the wire is pulled, so the drawing stress must stay below the flow stress of the drawn wire. Ideal limit: **ln(A₀/A_f) = 1**, a maximum reduction of 1 − 1/e ≈ **63%** per pass.

## Sheet metal

- **Blanking / punching force:** **F = L t τ_s** (perimeter × thickness × shear strength).
- **Blanking:** the die is the blank size; **clearance** is put on the **punch**. **Punching (piercing):** the punch is the hole size; clearance on the **die**.
- **Deep drawing:** limiting draw ratio D/d ≈ 2. Blank diameter for a cup of diameter d and height h (thin): D = √(d² + 4dh).
- **Bending:** spring-back after unloading; minimum bend radius depends on ductility.

## Practice

```quiz
q: Rolls of radius 300 mm have μ = 0.1. What is the maximum possible draft in mm?
answer: 3
verify: round(0.1 ** 2 * 300, 6)
explain: Δh_max = μ²R = 0.01 × 300 = 3 mm.
```

```quiz
q: A 50 mm diameter hole is punched in a 2 mm steel sheet with shear strength 300 MPa. What is the punching force in kN? (Give 2 decimal places.)
answer: 94.25
verify: round(__import__("math").pi * 50 * 2 * 300 / 1000, 2)
explain: F = πd t τ = π × 50 × 2 × 300 = 94,248 N = 94.25 kN.
```

```quiz
q: A cup of diameter 60 mm and height 40 mm is deep-drawn. What blank diameter (mm) is needed? (Give 2 decimal places.)
answer: 114.89
verify: round((60 ** 2 + 4 * 60 * 40) ** 0.5, 2)
explain: D = √(d² + 4dh) = √(3600 + 9600) = √13200 = 114.89 mm.
```

```quiz
q: In blanking, the clearance is provided on the:
* Punch
- Die
- Both equally
- Neither
explain: In blanking the blank is the product, so the die is made to the blank size and the punch is made smaller.
```

```quiz
q: A strip is rolled from 20 mm to 16 mm with rolls of radius 250 mm. What is the contact length in mm? (Give 2 decimal places.)
answer: 31.62
verify: round((250 * 4) ** 0.5, 2)
explain: L = √(RΔh) = √(250 × 4) = 31.62 mm.
```

```quiz
q: A 2 mm sheet with shear strength 250 MPa is blanked into a 40 mm × 40 mm square. What is the blanking force in kN?
answer: 80
verify: 4 * 40 * 2 * 250 / 1000
explain: F = perimeter × t × τ = 160 × 2 × 250 = 80,000 N.
```
