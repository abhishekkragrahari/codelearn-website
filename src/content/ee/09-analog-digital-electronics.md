---
title: Analog and Digital Electronics
chapter: Measurements and Electronics
description: GATE EE syllabus for analog and digital electronics, with diode circuits and rectifiers, transistor biasing and amplifiers, feedback and oscillators, op-amp circuits and active filters, timers, combinational and sequential logic, and A/D and D/A converters, with solved examples.
---
## Syllabus

Simple diode circuits (clipping, clamping, rectifiers); amplifiers (biasing, equivalent circuit, frequency response); oscillators and feedback amplifiers; operational amplifiers and their applications; active filters (Sallen-Key, Butterworth); VCOs and timers; combinational and sequential logic circuits; multiplexers, demultiplexers; Schmitt triggers; sample and hold circuits; A/D and D/A converters.

## Key concepts and formulas

**Rectifiers** (peak V<sub>m</sub>, ideal diodes):

| Rectifier | V<sub>dc</sub> | Ripple factor | PIV |
| --- | --- | --- | --- |
| Half-wave | V<sub>m</sub>/π | 1.21 | V<sub>m</sub> |
| Full-wave centre-tapped | 2V<sub>m</sub>/π | 0.48 | 2V<sub>m</sub> |
| Full-wave bridge | 2V<sub>m</sub>/π | 0.48 | V<sub>m</sub> |

A capacitor filter on a full-wave rectifier gives a peak-to-peak ripple of about V<sub>m</sub>/(2fRC).

**Transistors.** I<sub>C</sub> = βI<sub>B</sub>, I<sub>E</sub> = (β + 1)I<sub>B</sub>, α = β/(β + 1). Small-signal transconductance g<sub>m</sub> = I<sub>C</sub>/V<sub>T</sub> (V<sub>T</sub> ≈ 25 mV at room temperature), r<sub>π</sub> = β/g<sub>m</sub>. Common-emitter voltage gain ≈ −g<sub>m</sub>R<sub>C</sub>. Voltage-divider bias gives a stable operating point.

**Feedback and oscillators.** Negative feedback: A<sub>f</sub> = A/(1 + Aβ), which stabilises gain and widens bandwidth by (1 + Aβ). **Barkhausen criterion** for oscillation: |Aβ| = 1 with total phase shift 0° (or 360°). RC phase shift oscillator: A ≥ 29; Wien bridge oscillator f = 1/(2πRC) with A ≥ 3.

**Op-amps** (ideal: infinite gain and input impedance, virtual short):

- Inverting amplifier gain **−R<sub>f</sub>/R₁**; non-inverting **1 + R<sub>f</sub>/R₁**; voltage follower gain 1.
- Summing amplifier, difference amplifier, integrator v<sub>o</sub> = −(1/RC)∫v<sub>i</sub>dt, differentiator v<sub>o</sub> = −RC dv<sub>i</sub>/dt.
- Slew rate limits the maximum undistorted frequency: f<sub>max</sub> = SR/(2πV<sub>m</sub>). Gain-bandwidth product is constant.
- First-order active filter cut-off f<sub>c</sub> = 1/(2πRC); a Butterworth filter has a maximally flat passband and rolls off at 20n dB/decade for order n.

**555 timer.** Astable: f = 1.44/((R<sub>A</sub> + 2R<sub>B</sub>)C), duty cycle (R<sub>A</sub> + R<sub>B</sub>)/(R<sub>A</sub> + 2R<sub>B</sub>). Monostable pulse width T = 1.1RC.

**Digital.** Boolean algebra, K-maps, NAND and NOR as universal gates; a 2ⁿ:1 multiplexer has n select lines; flip-flops (SR, JK, D, T); a mod-N counter needs ⌈log₂N⌉ flip-flops; a Schmitt trigger has two thresholds (hysteresis).

**Converters.** An n-bit converter has 2ⁿ levels and **resolution V<sub>ref</sub>/2ⁿ** (or V<sub>FS</sub>/(2ⁿ − 1) for a DAC). Flash ADC: fastest, needs 2ⁿ − 1 comparators. Successive approximation ADC: n clock cycles per conversion. Dual slope ADC: slow, high noise rejection.

## Worked example

Find V<sub>dc</sub> for half-wave and full-wave rectification of a 20 V peak sine. Find the output of an inverting amplifier with R<sub>f</sub> = 100 kΩ, R₁ = 10 kΩ and input 0.3 V. Find the frequency and duty cycle of a 555 astable with R<sub>A</sub> = 1 kΩ, R<sub>B</sub> = 10 kΩ, C = 0.1 μF, and the resolution of an 8-bit ADC with V<sub>ref</sub> = 5.12 V.

```python
import math

Vm = 20
print(f"half-wave Vdc = {Vm / math.pi:.4f} V, full-wave Vdc = {2 * Vm / math.pi:.4f} V")
print(f"inverting amplifier output = {-100e3 / 10e3 * 0.3:.2f} V")
RA, RB, C = 1e3, 10e3, 0.1e-6
print(f"555 astable f = {1.44 / ((RA + 2 * RB) * C):.2f} Hz, duty = {(RA + RB) / (RA + 2 * RB) * 100:.2f}%")
print(f"8-bit ADC resolution = {5.12 / 2 ** 8 * 1000:.0f} mV")
```
```output
half-wave Vdc = 6.3662 V, full-wave Vdc = 12.7324 V
inverting amplifier output = -3.00 V
555 astable f = 685.71 Hz, duty = 52.38%
8-bit ADC resolution = 20 mV
```

## Practice questions

```quiz
q: A non-inverting amplifier has R<sub>f</sub> = 90 kΩ and R₁ = 10 kΩ. What is its voltage gain?
answer: 10
verify: 1 + 90 / 10
explain: Gain = 1 + R<sub>f</sub>/R₁ = 1 + 9 = 10.
```

```quiz
q: What is the DC output voltage of a full-wave bridge rectifier fed with a 50 V peak sine wave (ideal diodes)? Give the answer to two decimal places.
answer: 31.83
verify: round(2 * 50 / __import__("math").pi, 2)
explain: V<sub>dc</sub> = 2V<sub>m</sub>/π = 100/π ≈ 31.83 V.
```

```quiz
q: An amplifier with open-loop gain 1000 uses negative feedback with β = 0.009. What is the closed-loop gain?
answer: 100
verify: 1000 / (1 + 1000 * 0.009)
explain: A<sub>f</sub> = A/(1 + Aβ) = 1000/(1 + 9) = 100.
```

```quiz
q: A 10-bit ADC has a reference of 10.24 V. What is its resolution in mV?
answer: 10
verify: round(10.24 / 2 ** 10 * 1000, 6)
explain: Resolution = V<sub>ref</sub>/2¹⁰ = 10.24/1024 = 0.01 V = 10 mV.
```

```quiz
q: An op-amp has a slew rate of 0.5 V/μs. What is the highest frequency (kHz) at which it can output a 10 V peak sine without slew distortion? Give the answer to two decimal places.
answer: 7.96
verify: round(0.5e6 / (2 * __import__("math").pi * 10) / 1000, 2)
explain: f<sub>max</sub> = SR/(2πV<sub>m</sub>) = 0.5 × 10⁶/(2π × 10) ≈ 7957.7 Hz ≈ 7.96 kHz.
```
