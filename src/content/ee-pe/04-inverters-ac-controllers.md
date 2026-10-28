---
title: Inverters, PWM and AC Voltage Controllers
chapter: DC to AC
description: Single-phase half and full-bridge inverters, square-wave Fourier analysis, three-phase 180° and 120° conduction, sinusoidal PWM and modulation index, harmonics, and AC voltage controllers and cycloconverters.
---
An **inverter** turns DC into AC of adjustable voltage and frequency, as needed for motor drives, UPS and solar systems. AC voltage controllers change only the RMS voltage.

## Single-phase inverters

**Half bridge** (output ±V_dc/2) and **full bridge** (output ±V_dc).

For a full-bridge square-wave output of amplitude V_dc:

- Fundamental peak = **4V_dc/π**; fundamental RMS = 4V_dc/(π√2) = **0.9 V_dc**.
- Only odd harmonics; the nth harmonic has amplitude 4V_dc/(nπ).
- **Quasi-square (phase-shift) control** with pulse width 2d: V_n = (4V_dc/(nπ)) sin(n d). The 3rd harmonic is eliminated with a pulse width of 120°.

## Three-phase bridge inverter

- **180° conduction:** each switch conducts for half a cycle, three switches on at a time. Line voltage RMS = **0.816 V_dc**; phase voltage is a six-step wave.
- 120° conduction: two switches on at a time.
- Triplen harmonics are absent from the line voltages.

## Pulse-width modulation

- **Sinusoidal PWM:** compare a sine reference with a triangular carrier.
- **Modulation index** m_a = V_ref,peak/V_carrier,peak. For m_a ≤ 1 (linear region), single-phase full-bridge fundamental peak = m_a V_dc; three-phase line-to-line RMS fundamental = 0.612 m_a V_dc.
- **Frequency modulation ratio** m_f = f_carrier/f_ref; harmonics appear around multiples of m_f, so a high carrier frequency makes them easy to filter.
- Space vector PWM uses the DC bus about 15% better.

## Current and voltage source inverters

VSI (stiff DC voltage, capacitor) is most common; CSI (stiff DC current, large inductor) suits some large drives.

## AC voltage controllers and cycloconverters

- **Phase control** of an AC supply with back-to-back SCRs or a TRIAC (lamp dimmers, fan regulators). Resistive load RMS output: V_o = V_s √((1/π)(π − α + sin 2α/2)).
- **Integral cycle control:** on for n cycles out of m: V_o = V_s √(n/m) (heaters).
- **Cycloconverters** convert AC directly to lower-frequency AC (large slow motors).

## Worked example

A full-bridge inverter has V_dc = 200 V with square-wave output.

- Fundamental RMS = 4 × 200/(π√2) = **180.1 V**.

## Practice

```quiz
q: A single-phase full-bridge square-wave inverter has V_dc = 100 V. What is the peak of its 3rd harmonic voltage in V? (Give 2 decimal places.)
answer: 42.44
verify: round(4 * 100 / (3 * __import__("math").pi), 2)
explain: V₃ = 4V_dc/(3π) = 400/9.425 = 42.44 V.
```

```quiz
q: A heater is fed by integral cycle control, on for 3 cycles out of every 4, from 230 V. What is the RMS output voltage in V? (Give 2 decimal places.)
answer: 199.19
verify: round(230 * (3 / 4) ** 0.5, 2)
explain: V_o = 230√(3/4) = 199.19 V.
```

```quiz
q: A three-phase 180° conduction inverter has V_dc = 600 V. What is the RMS line voltage in V? (Give 1 decimal place.)
answer: 489.9
verify: round(600 * (2 / 3) ** 0.5, 1)
explain: V_L = √(2/3) V_dc = 0.8165 × 600 = 489.9 V.
```

```quiz
q: Increasing the carrier frequency in sinusoidal PWM mainly:
* Moves harmonics to higher frequencies, where they are easier to filter
- Increases the fundamental output voltage
- Removes the fundamental
- Reduces switching losses
explain: Harmonics cluster around multiples of m_f; a higher carrier pushes them up (at the cost of more switching loss).
```

```quiz
q: A full-bridge square-wave inverter has V_dc = 220 V. What is the RMS value of the fundamental output in V? (Give 1 decimal place.)
answer: 198.1
verify: round(4 * 220 / (__import__("math").pi * 2 ** 0.5), 1)
explain: V₁,rms = 4V_dc/(π√2) = 0.9 × 220 = 198.1 V.
```

```quiz
q: Integral cycle control keeps a heater on for 4 cycles out of 5 from 230 V. What is the output power as a fraction of full power?
answer: 0.8
verify: 4 / 5
explain: Power ∝ on-cycles, so 4/5 = 0.8 of full power.
```
