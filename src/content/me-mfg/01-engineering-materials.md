---
title: Engineering Materials and Testing
chapter: Materials
description: Crystal structures, the iron-carbon diagram, heat treatment of steels, mechanical properties, hardness and impact tests, and stress-strain behaviour of materials.
---
Manufacturing begins with choosing a material and knowing how it behaves. GATE asks about crystal structures, the iron–carbon diagram, heat treatment and material tests.

## Crystal structures

| Structure | Atoms per cell | Coordination number | Packing factor | Examples |
| --- | --- | --- | --- | --- |
| Simple cubic | 1 | 6 | 0.52 | Polonium |
| **BCC** | 2 | 8 | **0.68** | α-iron, Cr, W |
| **FCC** | 4 | 12 | **0.74** | γ-iron, Al, Cu, Ni |
| **HCP** | 6 | 12 | 0.74 | Zn, Mg, Ti |

FCC metals have many slip systems and are very ductile. Imperfections (vacancies, **dislocations**, grain boundaries) control strength: dislocation motion is how metals deform plastically.

## Iron–carbon diagram

Key points (approximate):

- **Eutectoid** at 0.8% C and 727 °C: austenite → **pearlite** (ferrite + cementite).
- **Eutectic** at 4.3% C and 1147 °C: liquid → ledeburite.
- Steels have up to about 2.1% C; cast irons have more.
- Hypo-eutectoid steels (< 0.8% C) are ferrite + pearlite; hyper-eutectoid steels are pearlite + cementite.

**Lever rule:** the fraction of a phase in a two-phase region is the length of the opposite tie-line segment divided by the whole tie line.

## Heat treatment

- **Annealing:** heat and cool slowly in the furnace → soft, ductile.
- **Normalising:** cool in still air → finer grains, a little stronger than annealed.
- **Hardening (quenching):** cool fast from austenite → **martensite**, very hard and brittle.
- **Tempering:** reheat hardened steel to a moderate temperature → tougher, slightly softer.
- **Case hardening** (carburising, nitriding, induction hardening): hard surface, tough core.

## Mechanical properties and tests

- **Tensile test:** E, yield strength, UTS, % elongation, % reduction in area.
- **Hardness:** Brinell (ball, BHN = load/curved area), Vickers (diamond pyramid), Rockwell (depth of indentation; scales B and C).
- **Impact test** (Charpy, Izod): toughness, the energy to fracture a notched bar. BCC steels show a ductile-to-brittle transition at low temperature.
- **Fatigue** and **creep** tests: life under cyclic load, and slow deformation under constant load at high temperature.

## Practice

```quiz
q: How many atoms are there in an FCC unit cell?
answer: 4
verify: 8 * (1 / 8) + 6 * (1 / 2)
explain: 8 corners × 1/8 + 6 face centres × 1/2 = 1 + 3 = 4.
```

```quiz
q: What is the atomic packing factor of BCC? (Give 2 decimal places.)
answer: 0.68
verify: round(__import__("math").pi * 3 ** 0.5 / 8, 2)
explain: APF = π√3/8 ≈ 0.68.
```

```quiz
q: Steel is quenched from the austenite range into water. The main phase formed is:
- Pearlite
- Ferrite
* Martensite
- Austenite
explain: Fast cooling stops carbon diffusion and traps it in a distorted lattice: martensite.
```

```quiz
q: A Brinell test uses a 3000 kgf load and leaves an impression of curved area 15 mm². What is the BHN?
answer: 200
verify: 3000 / 15
explain: BHN = load (kgf)/curved area (mm²) = 3000/15 = 200.
```

```quiz
q: How many atoms are in a BCC unit cell?
answer: 2
verify: 8 * (1 / 8) + 1
explain: 8 corners × 1/8 + 1 body centre = 2.
```

```quiz
q: Which heat treatment gives the softest and most ductile steel?
* Annealing
- Hardening
- Normalising
- Case hardening
explain: Slow furnace cooling in annealing gives coarse pearlite and the lowest hardness.
```
