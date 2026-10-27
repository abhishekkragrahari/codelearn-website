---
title: Air Pollution, Noise and Solid Waste Management
chapter: Air and Solid Waste
description: Air pollutants and their sources, units ppm and µg/m³, lapse rate and atmospheric stability, plume behaviour, particulate control devices, noise levels in decibels, and municipal solid waste management.
---
Environmental engineering also covers air quality, noise and solid waste. These topics bring short conceptual and numerical questions in GATE CE.

## Air pollutants

- **Primary:** emitted directly (SO₂, NOₓ, CO, particulate matter PM₁₀ and PM₂.₅, hydrocarbons).
- **Secondary:** formed in the air (ozone, PAN, sulphuric acid in acid rain). Photochemical smog needs NOₓ, hydrocarbons and sunlight.
- **Units:** convert ppm (by volume) to µg/m³ at 25 °C and 1 atm: **µg/m³ = ppm × M × 1000/24.45** (M = molecular weight in g/mol).
- India's National Ambient Air Quality Standards set limits for each pollutant.

## Meteorology

- **Dry adiabatic lapse rate:** about **9.8 °C/km** (temperature drop of rising dry air).
- **Environmental lapse rate (ELR)** greater than adiabatic: **super-adiabatic, unstable** (good dispersion; looping plume).
- ELR less than adiabatic: stable (coning plume when neutral to slightly stable; fanning plume in an inversion).
- **Inversion** (temperature rises with height): very stable, traps pollutants. Fumigation and lofting plumes occur with inversions below or above the stack.
- **Gaussian plume model** for ground-level concentrations from a stack of effective height H = h + Δh.

## Particulate control devices

| Device | Principle | Typical efficiency |
| --- | --- | --- |
| Gravity settling chamber | Gravity | Large particles only |
| Cyclone | Centrifugal force | Medium (> 10 µm) |
| Fabric (bag) filter | Filtration | Very high, fine particles |
| **Electrostatic precipitator** | Electric charge | > 99%, fine particles |
| Wet scrubber | Liquid droplets | Also removes gases |

ESP efficiency (Deutsch–Anderson): η = 1 − e^(−wA/Q).

## Noise

- Sound level **L = 10 log₁₀(I/I₀) = 20 log₁₀(p/p₀)** dB, with p₀ = 20 µPa.
- **Adding levels:** L_total = 10 log₁₀(Σ 10^(Lᵢ/10)). Two equal sources add **3 dB**.
- Equivalent level L_eq averages energy over time. dB(A) weighting follows the ear's response.

## Municipal solid waste

- Functional elements: generation, storage, collection, transfer, processing, disposal.
- Processing: composting (aerobic), vermicomposting, anaerobic digestion, incineration (needs high calorific value), recycling.
- **Sanitary landfills:** liner, leachate collection, gas venting, daily cover.
- Composting needs a C/N ratio of about 25–30.

## Practice

```quiz
q: Two machines each produce 80 dB. What is the combined sound level in dB? (Give 1 decimal place.)
answer: 83
verify: round(10 * __import__("math").log10(2 * 10 ** 8), 1)
explain: L = 10 log(2 × 10⁸) = 80 + 3.01 = 83.0 dB.
```

```quiz
q: Convert 1 ppm of SO₂ (M = 64) to µg/m³ at 25 °C and 1 atm. (Round to the nearest integer.)
answer: 2618
verify: round(1 * 64 * 1000 / 24.45)
explain: µg/m³ = 1 × 64 × 1000/24.45 = 2618.
```

```quiz
q: An ESP has wA/Q = 3. What is its collection efficiency in percent? (Give 2 decimal places.)
answer: 95.02
verify: round((1 - __import__("math").exp(-3)) * 100, 2)
explain: η = 1 − e⁻³ = 0.9502 = 95.02%.
```

```quiz
q: When the environmental lapse rate is greater than the dry adiabatic lapse rate, the atmosphere is:
* Unstable, with a looping plume
- Stable, with a fanning plume
- Neutral, with a coning plume
- An inversion
explain: Super-adiabatic conditions make rising air keep rising: strong mixing and a looping plume.
```
