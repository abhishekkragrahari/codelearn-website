---
title: Electrostatics: Coulomb, Gauss and Capacitance
chapter: Static Fields
description: Coulomb's law, electric field of point, line and sheet charges, Gauss's law, electric potential, energy, dielectrics and boundary conditions, and capacitance of common geometries.
---
Electrostatics deals with charges at rest. The field E and the potential V describe how they push on other charges.

## Coulomb's law and electric field

- **F = q₁q₂/(4πε r²)**, with ε = ε₀ε_r and ε₀ = 8.854 × 10⁻¹² F/m (1/(4πε₀) ≈ 9 × 10⁹).
- **E = F/q** (V/m). Fields of common charge distributions:

| Source | Field |
| --- | --- |
| Point charge Q | Q/(4πε r²), radial |
| Infinite line charge ρ_L | ρ_L/(2πε r), radial from the line |
| Infinite sheet ρ_S | ρ_S/(2ε), normal to the sheet (independent of distance) |

## Gauss's law

**∮ D·dS = Q_enclosed**, with D = εE. In point form: **∇·D = ρ_v**.

It gives the fields above quickly by choosing a surface where D is constant. Inside a conductor in equilibrium, E = 0 and charge sits on the surface.

## Potential

- **V = −∫E·dl**; **E = −∇V**. For a point charge: V = Q/(4πε r).
- The electrostatic field is conservative: ∮E·dl = 0 (∇ × E = 0).
- **Laplace's equation** ∇²V = 0 in charge-free regions; **Poisson's** ∇²V = −ρ_v/ε.
- **Energy stored:** W = ½ ∫ ε E² dv; energy density ½εE².

## Dielectrics and boundaries

- Polarisation increases D: D = ε₀E + P.
- At a boundary between two dielectrics: tangential **E is continuous**; normal **D is continuous** (no free surface charge).
- At a conductor surface: E is normal, E_n = ρ_S/ε.

## Capacitance

| Geometry | Capacitance |
| --- | --- |
| Parallel plates | C = εA/d |
| Coaxial cable (per metre) | C = 2πε/ln(b/a) |
| Isolated sphere | C = 4πεa |
| Two-wire line (per metre, d ≫ a) | C = πε/ln(d/a) |

Layered dielectrics in a parallel-plate capacitor act like capacitors in series (layers parallel to plates) or parallel (side by side).

## Worked example

Two charges of 1 µC each are 0.3 m apart in air.

- F = 9 × 10⁹ × 10⁻¹²/0.09 = **0.1 N** (repulsive).

## Practice

```quiz
q: A parallel-plate capacitor has A = 0.01 m², d = 1 mm and ε_r = 5. What is its capacitance in pF? (Give 1 decimal place.)
answer: 442.7
verify: round(8.854e-12 * 5 * 0.01 / 1e-3 * 1e12, 1)
explain: C = ε₀ε_rA/d = 8.854 × 10⁻¹² × 5 × 0.01/0.001 = 442.7 pF.
```

```quiz
q: What is the field (V/m) 2 m from an infinite line charge of 4 nC/m in air? Use 1/(4πε₀) = 9 × 10⁹. 
answer: 36
verify: round(2 * 9e9 * 4e-9 / 2, 6)
explain: E = ρ_L/(2πε₀r) = 2 × 9 × 10⁹ × 4 × 10⁻⁹/2 = 36 V/m.
```

```quiz
q: The field of an infinite sheet of charge at a distance d from it:
* Does not depend on d
- Falls as 1/d
- Falls as 1/d²
- Grows with d
explain: E = ρ_S/(2ε) for an infinite sheet, the same at every distance.
```

```quiz
q: At the boundary between two perfect dielectrics with no free charge, which components are continuous? (Select all that apply.)
* Tangential E
* Normal D
- Normal E
- Tangential D
explain: E_t1 = E_t2 and D_n1 = D_n2. Normal E and tangential D jump by the ratio of permittivities.
```

```quiz
q: What is the force (N) between charges of 2 µC and 3 µC placed 0.3 m apart in air? (Use 9 × 10⁹.)
answer: 0.6
verify: round(9e9 * 2e-6 * 3e-6 / 0.3 ** 2, 6)
explain: F = 9 × 10⁹ × 6 × 10⁻¹²/0.09 = 0.6 N.
```

```quiz
q: A parallel-plate capacitor in air has its gap halved. Its capacitance becomes:
- Half
* Twice
- Four times
- Unchanged
explain: C = εA/d, so halving d doubles C.
```
