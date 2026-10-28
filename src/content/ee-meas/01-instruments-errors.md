---
title: Measuring Instruments and Errors
chapter: Instruments
description: Errors and accuracy, PMMC, moving iron, electrodynamometer and rectifier instruments, extension of ranges with shunts and multipliers, loading effect, and instrument transformers.
---
Measurements are only as good as the instruments and how they are used. GATE asks which instrument suits AC or DC, how to extend ranges, and how errors combine.

## Errors

- **Accuracy:** closeness to the true value. **Precision:** closeness of repeated readings to each other. **Resolution:** smallest detectable change.
- Types: gross (human), systematic (instrumental, environmental, loading) and random errors.
- **Limiting (guarantee) error** is quoted as a percentage of **full-scale**, so the relative error grows at lower readings: a ±1% of full-scale instrument reading at half-scale has ±2% error.
- **Combining errors:** for a sum or difference, absolute errors add; for a product or quotient, **relative (percentage) errors add**; for a power xⁿ, n times the relative error.

## Analog instruments

| Instrument | Works on | Scale | Reads |
| --- | --- | --- | --- |
| **PMMC** | Force on a coil in a permanent magnet field | Linear | **DC only** (average value) |
| **Moving iron** (attraction, repulsion) | Iron vane in a coil's field, T ∝ I² | Non-linear (cramped at the start) | AC and DC (RMS) |
| **Electrodynamometer** | Fixed and moving coils | Non-linear for V and I; linear as a wattmeter | AC and DC, transfer standard |
| Rectifier type | PMMC + diode bridge | Calibrated in RMS for sine waves | AC (errors for non-sinusoidal waves) |
| Thermocouple / hot-wire | Heating effect | Square law | True RMS, high frequency |

**Damping:** eddy-current damping (PMMC), air-friction damping (moving iron). **Controlling torque:** springs or gravity.

## Extending ranges

- **Ammeter shunt:** R_sh = R_m I_m/(I − I_m) = R_m/(m − 1), with m = I/I_m.
- **Voltmeter multiplier:** R_se = V/I_m − R_m = R_m(m − 1).
- **Voltmeter sensitivity** (Ω/V) = 1/I_fs. A low-sensitivity voltmeter **loads** a high-resistance circuit and reads low.

## Instrument transformers

- **CT (current transformer):** steps current down (for example 1000/5 A). Its **secondary must never be opened** while the primary carries current: dangerously high voltage and core saturation.
- **PT (potential transformer):** steps voltage down (for example 11 kV/110 V).
- Errors: ratio error and phase-angle error.

## Worked example

A PMMC meter with 1 mA full-scale and 100 Ω resistance is to read 10 V.

- Multiplier = 10/0.001 − 100 = **9900 Ω**. Sensitivity = 1000 Ω/V.

## Practice

```quiz
q: A 0–100 V voltmeter has a guaranteed accuracy of 2% of full scale. What is the possible percentage error when it reads 50 V?
answer: 4
verify: 2 * 100 / 50
explain: Error = ±2 V; at 50 V this is ±4%.
```

```quiz
q: A meter with R_m = 50 Ω and full-scale current 1 mA must measure 1 A. What shunt resistance (mΩ) is needed? (Give 2 decimal places.)
answer: 50.05
verify: round(50 * 1e-3 / (1 - 1e-3) * 1000, 2)
explain: R_sh = R_m I_m/(I − I_m) = 0.05/0.999 = 0.05005 Ω = 50.05 mΩ.
```

```quiz
q: Power is found as P = V I. V has ±1% error and I has ±2% error. What is the maximum percentage error in P?
answer: 3
verify: 1 + 2
explain: For a product, relative errors add: 1% + 2% = 3%.
```

```quiz
q: Which instrument can measure only DC?
* PMMC
- Moving iron
- Electrodynamometer
- Thermocouple
explain: The PMMC torque reverses with current direction, so it reads the average, which is zero for AC.
```

```quiz
q: A 50 µA, 2 kΩ meter is made into a 0–10 V voltmeter. What multiplier resistance (kΩ) is needed?
answer: 198
verify: round(10 / 50e-6 / 1000 - 2, 6)
explain: R = V/I_m − R_m = 200 kΩ − 2 kΩ = 198 kΩ.
```

```quiz
q: What is the sensitivity (Ω/V) of a voltmeter with 50 µA full-scale current?
answer: 20000
verify: round(1 / 50e-6)
explain: Sensitivity = 1/I_fs = 20,000 Ω/V.
```
