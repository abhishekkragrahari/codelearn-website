---
title: Sinusoidal Steady State, Phasors and AC Power
chapter: AC Circuits
description: RMS and average values, phasors and impedance, series and parallel AC circuits, real, reactive, apparent and complex power, power factor correction and maximum power transfer in AC.
---
In sinusoidal steady state, every voltage and current is a sine wave at the source frequency. **Phasors** turn the differential equations into complex algebra.

## RMS and average values

| Waveform | RMS | Average (half cycle) | Form factor |
| --- | --- | --- | --- |
| Sine, peak V_m | V_m/√2 | 2V_m/π | 1.11 |
| Square, peak V_m | V_m | V_m | 1 |
| Triangle, peak V_m | V_m/√3 | V_m/2 | 1.155 |

Form factor = RMS/average; crest (peak) factor = peak/RMS (√2 for a sine).

## Phasors and impedance

- v(t) = V_m cos(ωt + φ) ↔ phasor V = V∠φ (using RMS magnitudes in power work).
- **Impedances:** Z_R = R, Z_L = jωL, Z_C = 1/(jωC) = −j/(ωC).
- In an inductor current **lags** voltage by 90°; in a capacitor it **leads** by 90° (ELI the ICE man).
- Impedances combine like resistances. Admittance Y = 1/Z = G + jB.

## AC power

With RMS phasors V and I and the angle φ between them:

- **Real power** P = VI cos φ (W).
- **Reactive power** Q = VI sin φ (VAR); positive for inductive loads.
- **Apparent power** S = VI (VA), with **S² = P² + Q²**.
- **Complex power** S = V I* = P + jQ.
- **Power factor** = cos φ = P/S (lagging for inductive loads).

**Power factor correction:** a capacitor in parallel supplies reactive power Q_C = P(tan φ₁ − tan φ₂), with C = Q_C/(ωV²).

**Maximum power transfer (AC):** Z_L = Z_th* (complex conjugate), giving P_max = |V_th|²/(4R_th).

## Worked example

A load takes 10 kW at 0.8 pf lagging from 230 V, 50 Hz. Find the capacitor to raise the pf to 1.

- tan φ₁ = 0.75, so Q = 10 × 0.75 = **7.5 kVAR**.
- C = 7500/(2π × 50 × 230²) = **451 µF**.

## Practice

```quiz
q: A sine wave has a peak of 325 V. What is its RMS value in V? (Give 1 decimal place.)
answer: 229.8
verify: round(325 / 2 ** 0.5, 1)
explain: V_rms = 325/√2 = 229.8 V.
```

```quiz
q: A load takes 3 kW and 4 kVAR. What is its apparent power in kVA?
answer: 5
verify: (3 ** 2 + 4 ** 2) ** 0.5
explain: S = √(P² + Q²) = √(9 + 16) = 5 kVA (pf 0.6).
```

```quiz
q: What is the reactance (Ω) of a 10 µF capacitor at 50 Hz? (Give 2 decimal places.)
answer: 318.31
verify: round(1 / (2 * __import__("math").pi * 50 * 10e-6), 2)
explain: X_C = 1/(2πfC) = 1/(2π × 50 × 10⁻⁵) = 318.31 Ω.
```

```quiz
q: In a purely capacitive circuit, the current:
* Leads the voltage by 90°
- Lags the voltage by 90°
- Is in phase with the voltage
- Leads by 45°
explain: i = C dv/dt, so the current peaks a quarter cycle before the voltage.
```
