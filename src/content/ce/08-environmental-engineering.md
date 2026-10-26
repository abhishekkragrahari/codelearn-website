---
title: Environmental Engineering
chapter: Environmental Engineering
description: GATE CE syllabus for environmental engineering, with water demand, water and wastewater treatment, BOD kinetics, sedimentation, activated sludge, air pollution, solid waste and noise, with solved examples.
---
## Syllabus

- **Water and wastewater**: quality standards, water demand and population forecasting, unit operations and processes (sedimentation, coagulation, filtration, disinfection), distribution, sewerage, primary, secondary and tertiary treatment, sludge treatment and disposal.
- **Air pollution**: pollutants and sources, meteorology and dispersion, control devices, standards.
- **Municipal solid waste**: characteristics, generation, collection, transport, disposal (sanitary landfill, incineration, composting).
- **Noise pollution**: sources, measurement and control.

## Key concepts and formulas

**Population forecasting.** Arithmetic increase P<sub>n</sub> = P₀ + n x̄; geometric increase P<sub>n</sub> = P₀(1 + r)ⁿ; incremental increase P<sub>n</sub> = P₀ + n x̄ + n(n + 1)ȳ/2.

**BOD.** With ultimate BOD L₀ and rate constant k (base e), the BOD exerted after t days is **BOD<sub>t</sub> = L₀(1 − e<sup>−kt</sup>)**. (With a base-10 constant K, use 10<sup>−Kt</sup>; k = 2.303K.) The rate constant changes with temperature as k<sub>T</sub> = k₂₀ θ<sup>T−20</sup>, with θ ≈ 1.047. For a diluted sample, BOD = (DO<sub>i</sub> − DO<sub>f</sub>)/P, where P is the dilution fraction.

**Sedimentation.**

- **Stokes' law**: settling velocity v<sub>s</sub> = g(G<sub>s</sub> − 1)d²/(18ν).
- Surface overflow rate = Q/A (plan area); a particle is fully removed if v<sub>s</sub> ≥ Q/A. Detention time = V/Q.

**Activated sludge.**

- Food to microorganism ratio F/M = QS₀/(VX).
- Mean cell residence time θ<sub>c</sub> = VX/(Q<sub>w</sub>X<sub>w</sub>) (sludge age).
- Sludge volume index SVI = settled volume (mL/L) × 1000 / MLSS (mg/L).

**Hardness** (as CaCO₃): mg/L of ion × 50/equivalent weight (Ca²⁺: 20, Mg²⁺: 12.15).

**Air pollution.** Gaussian plume concentration on the centreline at ground level for an effective stack height H: C = Q/(πuσ<sub>y</sub>σ<sub>z</sub>) · exp(−H²/(2σ<sub>z</sub>²)). Control devices include cyclones, bag filters, electrostatic precipitators and scrubbers. Lapse rates decide stability: a superadiabatic lapse rate gives unstable air and looping plumes; an inversion gives fanning.

**Noise.** Sound levels add on an energy basis: **L = 10 log₁₀ Σ 10<sup>L<sub>i</sub>/10</sup>**. Two equal sources give 3 dB more than one.

## Worked example

A wastewater has an ultimate BOD of 250 mg/L and k = 0.23 per day (base e). Find the 5-day BOD. Then find the settling velocity of a particle of diameter 0.05 mm and G<sub>s</sub> = 2.65 in water at ν = 1.0 × 10⁻⁶ m²/s, and the combined level of two machines at 85 dB and 88 dB.

```python
import math

L0, k = 250, 0.23
print(f"BOD5 = {L0 * (1 - math.exp(-k * 5)):.2f} mg/L")
g, Gs, d, nu = 9.81, 2.65, 0.05e-3, 1.0e-6
vs = g * (Gs - 1) * d * d / (18 * nu)
print(f"Stokes settling velocity = {vs * 1000:.4f} mm/s")
print(f"85 dB + 88 dB = {10 * math.log10(10 ** 8.5 + 10 ** 8.8):.2f} dB")
P0, r = 50000, 0.03
print(f"geometric growth, 20 years at 3%: {P0 * (1 + r) ** 20:.0f}")
```
```output
BOD5 = 170.84 mg/L
Stokes settling velocity = 2.2481 mm/s
85 dB + 88 dB = 89.76 dB
geometric growth, 20 years at 3%: 90306
```

## Practice questions

```quiz
q: A sample has an ultimate BOD of 200 mg/L and k = 0.1 per day (base e). What is its 5-day BOD in mg/L? Give the answer to two decimal places.
answer: 78.69
verify: round(200 * (1 - __import__("math").exp(-0.5)), 2)
explain: BOD₅ = 200(1 − e<sup>−0.5</sup>) = 200 × 0.3935 ≈ 78.69 mg/L.
```

```quiz
q: A settling tank has a plan area of 400 m² and treats 8000 m³/day. What is its surface overflow rate in m³/m²/day?
answer: 20
verify: 8000 / 400
explain: Surface overflow rate = Q/A = 8000/400 = 20 m³/m²/day. Particles settling faster than 20 m/day are fully removed.
```

```quiz
q: Two identical machines each produce 80 dB. What is the combined sound level in dB? Give the answer to one decimal place.
answer: 83
verify: round(10 * __import__("math").log10(2 * 10 ** 8), 1)
explain: L = 10 log₁₀(2 × 10⁸) = 80 + 10 log₁₀ 2 ≈ 83.0 dB.
```

```quiz
q: A 30-minute settling test gives 250 mL/L of sludge for an MLSS of 2500 mg/L. What is the SVI in mL/g?
answer: 100
verify: 250 * 1000 / 2500
explain: SVI = 250 × 1000/2500 = 100 mL/g, which indicates good settling.
```

```quiz
q: Water contains 40 mg/L of Ca²⁺. What is its calcium hardness in mg/L as CaCO₃?
answer: 100
verify: 40 * 50 / 20
explain: Hardness = 40 × 50/20 = 100 mg/L as CaCO₃ (equivalent weight of Ca²⁺ is 20).
```
