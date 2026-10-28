---
title: Transmission Line Parameters
chapter: Transmission
description: Resistance and skin effect, inductance and capacitance of single-phase and three-phase lines using GMD and GMR, transposition, bundled conductors, corona and sag of overhead lines.
---
An overhead line has series resistance and inductance, and shunt capacitance, spread along its length. These parameters set how much power it can carry and how its voltage behaves.

## Resistance

R = ρl/A, increased by spiralling (stranding), temperature and **skin effect** (AC current crowds to the surface, more at high frequency and for large conductors).

## Inductance

For a three-phase line with equilateral spacing D (or transposed, with D = GMD):

**L = 2 × 10⁻⁷ ln(D/r′) H/m per phase**, with **r′ = 0.7788 r** (the GMR of a solid round conductor).

- Unequal spacing: use the geometric mean distance **D_m = (D_ab D_bc D_ca)^(1/3)**; **transposition** balances the phases.
- Single-phase two-wire line: loop inductance 4 × 10⁻⁷ ln(D/r′) H/m.
- **Bundled conductors** (two or more per phase) increase the effective GMR: for 2 conductors at spacing d, GMR = √(r′d). This lowers L, raises C, and reduces corona.

## Capacitance

**C = 2πε₀/ln(D/r) F/m to neutral** (uses the actual radius r, not r′).

- Single-phase: line-to-line C = πε₀/ln(D/r).
- Charging current = V_ph ωC per unit length.
- Earth raises the capacitance slightly (method of images).

## Corona

When the field at the conductor surface exceeds the breakdown strength of air (about 30 kV/cm peak, 21.2 kV/cm RMS), the air ionises: **corona**. It causes power loss, radio interference and a hissing sound. It is reduced by larger conductor diameter, bundling and greater spacing. Disruptive critical voltage V_c = m₀ g₀ δ r ln(D/r).

## Sag

For a span L with conductor weight w per metre and tension T (supports at equal level):

**Sag = w L²/(8T)**

Ice and wind loading increase the effective weight: w_eff = √((w + w_ice)² + w_wind²).

## Worked example

A three-phase line has conductors of radius 1 cm in an equilateral triangle of side 2 m.

- L = 2 × 10⁻⁷ ln(2/(0.7788 × 0.01)) = **1.11 mH/km** per phase.
- C = 2π × 8.854 × 10⁻¹²/ln(2/0.01) = **10.5 nF/km** to neutral.

## Practice

```quiz
q: Three conductors are spaced 3 m, 3 m and 6 m apart. What is the geometric mean distance in m? (Give 3 decimal places.)
answer: 3.78
verify: round((3 * 3 * 6) ** (1 / 3), 3)
explain: D_m = (3 × 3 × 6)^(1/3) = 54^(1/3) = 3.780 m.
```

```quiz
q: A span of 200 m has a conductor weighing 6 N/m under a tension of 12,000 N. What is the sag in m?
answer: 2.5
verify: 6 * 200 ** 2 / (8 * 12000)
explain: Sag = wL²/(8T) = 6 × 40,000/96,000 = 2.5 m.
```

```quiz
q: A bundle of two subconductors, each with GMR 1 cm, is spaced 40 cm apart. What is the bundle GMR in cm?
answer: 6.32
verify: round((1 * 40) ** 0.5, 2)
explain: GMR = √(r′d) = √40 = 6.32 cm.
```

```quiz
q: Using bundled conductors on an EHV line:
* Reduces inductance and corona loss
- Increases inductance
- Reduces capacitance
- Increases the surge impedance
explain: A larger effective radius lowers L, raises C (so surge impedance falls and SIL rises) and lowers the surface field.
```

```quiz
q: A span of 300 m has a conductor weighing 8 N/m under 20,000 N tension. What is the sag in m?
answer: 4.5
verify: 8 * 300 ** 2 / (8 * 20000)
explain: Sag = wL²/(8T) = 8 × 90,000/160,000 = 4.5 m.
```

```quiz
q: Three conductors are spaced 2 m, 2 m and 4 m apart. What is their geometric mean distance in m? (Give 3 decimal places.)
answer: 2.52
verify: round((2 * 2 * 4) ** (1 / 3), 3)
explain: D_m = 16^(1/3) = 2.520 m.
```
