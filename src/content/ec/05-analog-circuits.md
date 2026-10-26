---
title: Analog Circuits
chapter: Devices and Circuits
description: GATE EC syllabus for analog circuits, with diode circuits, BJT and MOSFET biasing and small-signal amplifiers, frequency response, current mirrors, differential amplifiers and CMRR, and op-amp circuits including filters, Schmitt triggers and oscillators, with solved examples.
---
## Syllabus

Diode circuits (clipping, clamping, rectifiers); BJT and MOSFET amplifiers (biasing, AC coupling, small signal analysis, frequency response); current mirrors and differential amplifiers; op-amp circuits (amplifiers, summers, differentiators, integrators, active filters, Schmitt triggers, oscillators).

## Key concepts and formulas

**Diode circuits.** A clipper removes part of a waveform above or below a reference; a clamper shifts the DC level so the waveform's peak sits at a reference (a negative clamper on a ±V<sub>m</sub> sine gives 0 to −2V<sub>m</sub>). Rectifier averages: half-wave V<sub>m</sub>/π, full-wave 2V<sub>m</sub>/π.

**Small-signal models.**

- BJT: g<sub>m</sub> = I<sub>C</sub>/V<sub>T</sub>, r<sub>π</sub> = β/g<sub>m</sub>, r<sub>o</sub> = V<sub>A</sub>/I<sub>C</sub>.
- MOSFET: g<sub>m</sub> = 2I<sub>D</sub>/(V<sub>GS</sub> − V<sub>T</sub>), r<sub>o</sub> = 1/(λI<sub>D</sub>).

**Amplifier configurations** (with load R<sub>L</sub>′ = R<sub>C</sub> ∥ R<sub>L</sub>, ignoring r<sub>o</sub>):

| Configuration | Voltage gain | Input resistance | Output resistance |
| --- | --- | --- | --- |
| Common emitter (CS) | −g<sub>m</sub>R<sub>L</sub>′ | r<sub>π</sub> (∞ for CS) | R<sub>C</sub> |
| CE with emitter resistor R<sub>E</sub> | ≈ −R<sub>L</sub>′/R<sub>E</sub> | r<sub>π</sub> + (β + 1)R<sub>E</sub> | R<sub>C</sub> |
| Common collector (emitter follower) | ≈ 1 | High | Low (≈ 1/g<sub>m</sub>) |
| Common base (CG) | +g<sub>m</sub>R<sub>L</sub>′ | Low (≈ 1/g<sub>m</sub>) | R<sub>C</sub> |

**Frequency response.** Coupling and bypass capacitors set the lower cut-off; internal capacitances set the upper cut-off. The **Miller effect**: a capacitance C between input and output of an inverting stage of gain −A appears at the input as C(1 + A). Gain-bandwidth product is constant for a single-pole amplifier.

**Current mirror.** Two matched transistors with the same V<sub>BE</sub> (or V<sub>GS</sub>) copy a reference current: I<sub>out</sub> = I<sub>ref</sub> × (W/L)₂/(W/L)₁ for MOSFETs; for BJTs, I<sub>out</sub> = I<sub>ref</sub>/(1 + 2/β).

**Differential amplifier.** Differential gain A<sub>d</sub> = g<sub>m</sub>R<sub>D</sub> (differential output); common-mode gain A<sub>cm</sub> ≈ −R<sub>D</sub>/(2R<sub>SS</sub>) per side. **CMRR = |A<sub>d</sub>/A<sub>cm</sub>|**, in dB 20 log₁₀ CMRR. A large tail resistance (current source) raises the CMRR.

**Op-amp circuits.** Inverting gain −R<sub>f</sub>/R₁, non-inverting 1 + R<sub>f</sub>/R₁; summer v<sub>o</sub> = −R<sub>f</sub>Σ(vᵢ/Rᵢ); integrator −(1/RC)∫v dt; differentiator −RC dv/dt. **Schmitt trigger** (inverting, output ±V<sub>sat</sub>, feedback divider R₁ from output to + input and R₂ from + input to ground): thresholds ±V<sub>sat</sub>R₂/(R₁ + R₂), hysteresis width 2V<sub>sat</sub>R₂/(R₁ + R₂). **Oscillators**: Barkhausen criterion |Aβ| = 1, phase 0°; Wien bridge f = 1/(2πRC) with gain 3; RC phase shift (3 sections) f = 1/(2πRC√6) with gain 29.

## Worked example

A BJT is biased at I<sub>C</sub> = 1 mA with β = 100 and V<sub>T</sub> = 25 mV: find g<sub>m</sub> and r<sub>π</sub>, and the CE gain with R<sub>C</sub> = R<sub>L</sub> = 10 kΩ. Find the Miller input capacitance for 2 pF across a stage of gain −50. Then find the CMRR in dB for A<sub>d</sub> = 100 and A<sub>cm</sub> = 0.01, and the frequency of a Wien bridge oscillator with R = 10 kΩ and C = 10 nF.

```python
import math

IC, beta, VT = 1e-3, 100, 0.025
gm = IC / VT
print(f"gm = {gm * 1000:.0f} mA/V, r_pi = {beta / gm / 1000:.2f} kohm")
RL = 10e3 * 10e3 / (10e3 + 10e3)
print(f"CE gain = {-gm * RL:.0f}")
print(f"Miller input capacitance = {2 * (1 + 50):.0f} pF")
print(f"CMRR = {20 * math.log10(100 / 0.01):.0f} dB")
print(f"Wien bridge f = {1 / (2 * math.pi * 10e3 * 10e-9):.2f} Hz")
```
```output
gm = 40 mA/V, r_pi = 2.50 kohm
CE gain = -200
Miller input capacitance = 102 pF
CMRR = 80 dB
Wien bridge f = 1591.55 Hz
```

## Practice questions

```quiz
q: A MOSFET operates at I<sub>D</sub> = 0.5 mA with V<sub>GS</sub> − V<sub>T</sub> = 0.25 V. What is its transconductance in mA/V?
answer: 4
verify: 2 * 0.5 / 0.25
explain: g<sub>m</sub> = 2I<sub>D</sub>/(V<sub>GS</sub> − V<sub>T</sub>) = 1/0.25 = 4 mA/V.
```

```quiz
q: A differential amplifier has a differential gain of 200 and a common-mode gain of 0.02. What is its CMRR in dB?
answer: 80
verify: round(20 * __import__("math").log10(200 / 0.02), 6)
explain: CMRR = 200/0.02 = 10⁴, i.e. 20 log₁₀ 10⁴ = 80 dB.
```

```quiz
q: An inverting amplifier stage has a gain of −99 and a 1 pF capacitor between its input and output. What is the Miller capacitance seen at the input, in pF?
answer: 100
verify: 1 * (1 + 99)
explain: C<sub>in</sub> = C(1 + A) = 1 × 100 = 100 pF.
```

```quiz
q: An inverting Schmitt trigger has V<sub>sat</sub> = ±12 V and a feedback divider with R₁ = 20 kΩ (output to + input) and R₂ = 10 kΩ (+ input to ground). What is the width of its hysteresis band in volts?
answer: 8
verify: 2 * 12 * 10 / (20 + 10)
explain: The thresholds are ±12 × 10/30 = ±4 V, so the hysteresis width is 8 V.
```

```quiz
q: Which amplifier configuration has a voltage gain of about 1, a high input resistance and a low output resistance?
- Common emitter
- Common base
* Common collector (emitter follower)
- Cascode
explain: The emitter follower buffers a signal: unity voltage gain, high input and low output resistance.
```
