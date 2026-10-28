---
title: Oscilloscopes and Digital Instruments
chapter: Measurement Methods
description: CRO working, measuring amplitude, frequency and phase with Lissajous figures, probes, digital voltmeters and ADC types, frequency counters, Q-meter and transducers.
---
Modern measurement uses oscilloscopes and digital instruments. GATE asks about Lissajous patterns, ADC types and resolution.

## Cathode ray oscilloscope (CRO) and DSO

- An electron beam (or, in a digital storage oscilloscope, a sampled display) shows voltage against time. The **time base** sweeps horizontally with a sawtooth; the **trigger** keeps the trace stable.
- Amplitude = divisions × volts/div; period = divisions × time/div.
- **Probes:** a 10:1 probe divides the signal by 10 and reduces loading; it must be compensated (adjustable capacitor) to avoid distorting square waves.

## Lissajous figures

With signals on both X and Y plates:

- **Frequency ratio:** f_y/f_x = (number of horizontal tangencies)/(number of vertical tangencies).
- **Phase difference** of equal-frequency signals: **sin φ = Y₀/Y_max** (intercept on the Y axis divided by the maximum Y). A straight line → 0° or 180°; circle (equal amplitudes) → 90°.

## Digital voltmeters and ADCs

| ADC type | Speed | Notes |
| --- | --- | --- |
| **Flash (parallel)** | Fastest | Needs 2ⁿ − 1 comparators |
| **Successive approximation** | Fast | n clock cycles per conversion |
| **Dual-slope integrating** | Slow | Rejects noise (mains hum); used in DVMs |
| Counter (ramp) | Slow | Up to 2ⁿ clock cycles |

- **Resolution** of an n-bit converter = full scale/2ⁿ (or /(2ⁿ − 1)). A **3½-digit** DVM shows up to 1999.
- Quantisation error is ±½ LSB.

## Frequency and other measurements

- **Frequency counter:** counts cycles in a gate time; for low frequencies, measuring the period is more accurate.
- **Q-meter:** uses series resonance; Q = V_C/V_in.
- **Transducers:** strain gauges (gauge factor = (ΔR/R)/strain), thermocouples, RTDs, thermistors, LVDT (displacement), piezoelectric (dynamic force).

## Worked example

An 8-bit ADC has a 5 V range.

- Resolution = 5/255 = **19.6 mV** (using 2ⁿ − 1 steps).

## Practice

```quiz
q: A Lissajous figure has 3 horizontal tangencies and 2 vertical tangencies. If f_x = 100 Hz, what is f_y in Hz?
answer: 150
verify: 100 * 3 / 2
explain: f_y/f_x = 3/2, so f_y = 150 Hz.
```

```quiz
q: An ellipse on a CRO cuts the Y axis at ±3 divisions and its maximum Y is ±6 divisions. What is the phase difference in degrees?
answer: 30
verify: round(__import__("math").degrees(__import__("math").asin(3 / 6)), 6)
explain: sin φ = 3/6 = 0.5, so φ = 30°.
```

```quiz
q: How many comparators does a 6-bit flash ADC need?
answer: 63
verify: 2 ** 6 - 1
explain: A flash ADC needs 2ⁿ − 1 = 63 comparators.
```

```quiz
q: A strain gauge of 120 Ω with gauge factor 2 is strained by 500 × 10⁻⁶. What is its change in resistance (Ω)?
answer: 0.12
verify: round(2 * 500e-6 * 120, 6)
explain: ΔR = GF × strain × R = 2 × 0.0005 × 120 = 0.12 Ω.
```

```quiz
q: A 10-bit ADC has a 5 V range. What is its resolution in mV using V/2ⁿ? (Give 3 decimal places.)
answer: 4.883
verify: round(5 / 2 ** 10 * 1000, 3)
explain: 5/1024 = 4.883 mV.
```

```quiz
q: A Lissajous figure is a circle with equal amplitudes. What is the phase difference in degrees?
answer: 90
verify: 90
explain: Equal amplitudes 90° apart trace a circle.
```
