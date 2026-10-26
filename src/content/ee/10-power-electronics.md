---
title: Power Electronics
chapter: Measurements and Electronics
description: GATE EE syllabus for power electronics, with thyristor, MOSFET and IGBT characteristics, controlled rectifiers, buck, boost and buck-boost converters, inverters and sinusoidal PWM, harmonics, power factor and distortion factor, with solved examples.
---
## Syllabus

Static V-I characteristics and gating circuits for thyristor, MOSFET and IGBT; DC-DC conversion (buck, boost, buck-boost); single and three-phase uncontrolled rectifiers; voltage and current commutated thyristor converters; bidirectional AC-DC voltage source converters; line current harmonics; power factor and distortion factor of AC-DC converters; single and three-phase voltage and current source inverters; sinusoidal PWM.

## Key concepts and formulas

**Devices.** The SCR turns on with a gate pulse when forward biased and turns off only when its current falls below the holding current (latching current > holding current). MOSFETs are voltage-controlled and fast (low-voltage, high-frequency use); IGBTs combine MOS gate drive with bipolar conduction (medium power and frequency).

**Controlled rectifiers** (supply peak V<sub>m</sub>, firing angle α, continuous conduction unless stated):

| Converter | Average output voltage |
| --- | --- |
| Single-phase half-wave, R load | (V<sub>m</sub>/2π)(1 + cos α) |
| Single-phase full converter (highly inductive load) | (2V<sub>m</sub>/π) cos α |
| Single-phase semi-converter | (V<sub>m</sub>/π)(1 + cos α) |
| Three-phase full converter | (3√3V<sub>m</sub>/π) cos α = (3V<sub>m,L</sub>/π) cos α ≈ 1.35V<sub>L,rms</sub> cos α |
| Three-phase diode bridge | 1.35V<sub>L,rms</sub> |

A full converter inverts (negative average voltage, power flows back to the AC side) for α > 90°.

**DC-DC converters** (duty ratio D, continuous conduction, ideal):

- **Buck**: V<sub>o</sub> = DV<sub>s</sub>
- **Boost**: V<sub>o</sub> = V<sub>s</sub>/(1 − D)
- **Buck-boost**: V<sub>o</sub> = −DV<sub>s</sub>/(1 − D) (polarity reversed)
- Buck inductor ripple ΔI = V<sub>s</sub>D(1 − D)/(Lf).

**Inverters.** Single-phase full-bridge square wave: the fundamental RMS is 0.9V<sub>dc</sub> (peak 4V<sub>dc</sub>/π), and only odd harmonics appear. Sinusoidal PWM: modulation index m<sub>a</sub> = V<sub>control</sub>/V<sub>carrier</sub>; for m<sub>a</sub> ≤ 1 the fundamental amplitude is m<sub>a</sub>V<sub>dc</sub> (full bridge) or m<sub>a</sub>V<sub>dc</sub>/2 (per half bridge leg).

**Harmonics and power factor.** Total harmonic distortion THD = √(I<sub>rms</sub>² − I₁²)/I₁. **Power factor = distortion factor × displacement factor** = (I₁/I<sub>rms</sub>) × cos φ₁. A square-wave line current (as with a single-phase full converter on a highly inductive load) has I₁/I<sub>rms</sub> = 2√2/π ≈ 0.9, and its displacement angle equals α.

## Worked example

A single-phase full converter on a 230 V, 50 Hz supply feeds a highly inductive load at α = 30°: find V<sub>dc</sub> and the input power factor. Find the outputs of buck, boost and buck-boost converters with V<sub>s</sub> = 24 V and D = 0.4, and the V<sub>dc</sub> of a three-phase full converter on 415 V at α = 45°.

```python
import math

Vm = 230 * math.sqrt(2)
a = math.radians(30)
print(f"full converter Vdc = {2 * Vm / math.pi * math.cos(a):.2f} V")
print(f"input power factor = {2 * math.sqrt(2) / math.pi * math.cos(a):.4f}")
Vs, D = 24, 0.4
print(f"buck = {D * Vs:.2f} V, boost = {Vs / (1 - D):.2f} V, buck-boost = {-D * Vs / (1 - D):.2f} V")
VL = 415
print(f"3-phase full converter Vdc = {3 * math.sqrt(2) * VL / math.pi * math.cos(math.radians(45)):.2f} V")
```
```output
full converter Vdc = 179.33 V
input power factor = 0.7797
buck = 9.60 V, boost = 40.00 V, buck-boost = -16.00 V
3-phase full converter Vdc = 396.30 V
```

## Practice questions

```quiz
q: A boost converter has an input of 12 V and a duty ratio of 0.75. What is its output voltage (ideal, continuous conduction)?
answer: 48
verify: 12 / (1 - 0.75)
explain: V<sub>o</sub> = V<sub>s</sub>/(1 − D) = 12/0.25 = 48 V.
```

```quiz
q: A single-phase full converter with a highly inductive load is fed from a 200 V peak supply. What is the average output voltage at α = 60°? Give the answer to two decimal places.
answer: 63.66
verify: round(2 * 200 / __import__("math").pi * 0.5, 2)
explain: V<sub>dc</sub> = (2V<sub>m</sub>/π) cos α = (400/π) × 0.5 ≈ 63.66 V.
```

```quiz
q: A buck converter steps 48 V down to 12 V. What is its duty ratio?
answer: 0.25
verify: 12 / 48
explain: V<sub>o</sub> = DV<sub>s</sub>, so D = 12/48 = 0.25.
```

```quiz
q: A current waveform has a fundamental RMS of 9 A and a total RMS of 10 A, and its displacement factor is 0.8. What is the power factor?
answer: 0.72
verify: round(9 / 10 * 0.8, 6)
explain: PF = (I₁/I<sub>rms</sub>) cos φ₁ = 0.9 × 0.8 = 0.72.
```

```quiz
q: For which range of firing angle does a single-phase full converter (continuous conduction) operate as an inverter?
- 0° < α < 90°
* 90° < α < 180°
- 0° < α < 45°
- It never inverts
explain: V<sub>dc</sub> ∝ cos α becomes negative for α > 90°, so with a suitable DC source the power flows from the DC side to the AC side.
```
