---
title: Electrical and Electronic Measurements
chapter: Measurements and Electronics
description: GATE EE syllabus for measurements, with PMMC, moving iron and dynamometer instruments, shunts and multipliers, bridges and potentiometers, power and energy measurement, instrument transformers, digital meters, oscilloscopes and error analysis, with solved examples.
---
## Syllabus

Bridges and potentiometers; measurement of voltage, current, power, energy and power factor; instrument transformers; digital voltmeters and multimeters; phase, time and frequency measurement; oscilloscopes; error analysis.

## Key concepts and formulas

**Instruments.**

| Type | Measures | Scale | Reads |
| --- | --- | --- | --- |
| PMMC | DC only | Uniform | Average |
| Moving iron | AC and DC | Non-uniform (square law) | RMS |
| Electrodynamometer | AC and DC | Non-uniform | RMS (used as wattmeter) |
| Rectifier type | AC | Uniform | Average, calibrated in RMS for a sine (form factor 1.11) |

A PMMC meter on a pure sine reads 0; on a half-wave rectified sine it reads V<sub>m</sub>/π.

**Range extension.** Ammeter shunt **R<sub>sh</sub> = I<sub>m</sub>R<sub>m</sub>/(I − I<sub>m</sub>)** = R<sub>m</sub>/(m − 1), with multiplying factor m = I/I<sub>m</sub>. Voltmeter series multiplier **R<sub>s</sub> = V/I<sub>m</sub> − R<sub>m</sub>** = R<sub>m</sub>(m − 1). Voltmeter sensitivity = 1/I<sub>fs</sub> (Ω/V).

**Bridges.**

- Wheatstone (balance): R₁R₄ = R₂R₃.
- Maxwell's inductance-capacitance bridge: L = R₂R₃C₁; Hay's bridge for high-Q coils; Schering bridge for capacitance and loss angle; Wien bridge for frequency (f = 1/(2πRC) for equal R and C).
- Kelvin double bridge for low resistance; megger for insulation resistance.

**Power and energy.** Wattmeter reading = VI cos φ (with V and I to the pressure and current coils). Three-phase: the two-wattmeter method (P = W₁ + W₂; if one reads negative, the power factor is below 0.5). Energy meter constant = revolutions per kWh.

**Instrument transformers.** CT: never open-circuit the secondary under load (dangerous voltage). Ratio and phase angle errors. PT: works like a small transformer on light load.

**Errors.** Limiting (guarantee) errors add for sums and differences in absolute terms, and add as percentages for products and quotients. For X = AB/C, the relative error is ±(δA/A + δB/B + δC/C). Loading effect: a voltmeter of finite resistance across a high-resistance circuit reads low.

**Digital and CRO.** Resolution of an n-digit display = 1/10ⁿ; a 3½-digit meter shows up to 1999. CRO: Lissajous figures give a frequency ratio f<sub>y</sub>/f<sub>x</sub> = horizontal tangencies/vertical tangencies; phase difference sin φ = y-intercept/y-max for an ellipse.

## Worked example

A PMMC meter has R<sub>m</sub> = 100 Ω and full-scale current 1 mA. Find the shunt to read 10 A, and the series resistance to read 100 V. Then find the limiting error of power P = I²R when I = 5 A ± 1% and R = 20 Ω ± 0.5%.

```python
Rm, Im = 100, 1e-3
I = 10
Rsh = Im * Rm / (I - Im)
print(f"shunt for 10 A = {Rsh * 1000:.4f} milliohm")
V = 100
print(f"multiplier for 100 V = {V / Im - Rm:.0f} ohm, sensitivity = {1 / Im:.0f} ohm/V")
err = 2 * 1 + 0.5
print(f"P = {5 ** 2 * 20} W with limiting error +/-{err}% = +/-{5 ** 2 * 20 * err / 100:.1f} W")
```
```output
shunt for 10 A = 10.0010 milliohm
multiplier for 100 V = 99900 ohm, sensitivity = 1000 ohm/V
P = 500 W with limiting error +/-2.5% = +/-12.5 W
```

## Practice questions

```quiz
q: A meter with internal resistance 50 Ω gives full-scale deflection at 2 mA. What series resistance (Ω) converts it into a 0–20 V voltmeter?
answer: 9950
verify: 20 / 2e-3 - 50
explain: R<sub>s</sub> = V/I<sub>m</sub> − R<sub>m</sub> = 20/0.002 − 50 = 10000 − 50 = 9950 Ω.
```

```quiz
q: A Wheatstone bridge balances with R₁ = 100 Ω, R₂ = 200 Ω and R₃ = 150 Ω, where R₁R₄ = R₂R₃. What is R₄ in Ω?
answer: 300
verify: 200 * 150 / 100
explain: R₄ = R₂R₃/R₁ = 200 × 150/100 = 300 Ω.
```

```quiz
q: A PMMC voltmeter is connected across v(t) = 100 sin(ωt) V. What does it read?
answer: 0
verify: 0
explain: A PMMC instrument responds to the average value, which is zero for a pure sinusoid.
```

```quiz
q: A resistance R = V/I is found with V measured to ±2% and I to ±1.5%. What is the limiting error of R in percent?
answer: 3.5
verify: 2 + 1.5
explain: For a quotient, the relative limiting errors add: 2% + 1.5% = 3.5%.
```

```quiz
q: In the two-wattmeter method on a balanced load, one wattmeter reads negative. What can be said about the power factor?
* It is less than 0.5
- It is exactly 0.5
- It is between 0.5 and 1
- It is unity
explain: W₁ = V<sub>L</sub>I<sub>L</sub> cos(30° − φ) and W₂ = V<sub>L</sub>I<sub>L</sub> cos(30° + φ). W₂ becomes negative when φ > 60°, i.e. power factor below 0.5.
```
