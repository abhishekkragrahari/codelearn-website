---
title: Op-Amps, Feedback and Oscillators
chapter: Analog Electronics
description: Ideal op-amp rules, inverting, non-inverting, summing, difference, integrator and differentiator circuits, CMRR and slew rate, feedback topologies, Barkhausen criterion and RC and LC oscillators.
---
The operational amplifier is a high-gain differential amplifier. With negative feedback, its circuits behave almost exactly as the external resistors and capacitors dictate.

## Ideal op-amp rules (with negative feedback)

1. **No current into the inputs** (infinite input resistance).
2. **Virtual short:** V₊ = V₋.

## Standard circuits

| Circuit | Output |
| --- | --- |
| Inverting | V_o = −(R_f/R₁) V_in |
| Non-inverting | V_o = (1 + R_f/R₁) V_in |
| Voltage follower | V_o = V_in |
| Summing (inverting) | V_o = −R_f Σ(Vᵢ/Rᵢ) |
| Difference (equal ratios) | V_o = (R_f/R₁)(V₂ − V₁) |
| **Integrator** | V_o = −(1/RC) ∫ V_in dt |
| Differentiator | V_o = −RC dV_in/dt |

## Non-ideal parameters

- **CMRR** = differential gain/common-mode gain (often in dB).
- **Slew rate:** maximum dV_o/dt. For a sine of amplitude V_m: full-power bandwidth f_max = **SR/(2πV_m)**.
- Input offset voltage, bias current, finite gain–bandwidth product.
- **Comparators** and the **Schmitt trigger** (positive feedback, hysteresis) use the op-amp without negative feedback.

## Feedback

Negative feedback with loop gain Aβ: A_f = A/(1 + Aβ). It reduces gain and distortion and increases bandwidth by (1 + Aβ).

| Topology | Input resistance | Output resistance |
| --- | --- | --- |
| Voltage-series | Increases | Decreases |
| Voltage-shunt | Decreases | Decreases |
| Current-series | Increases | Increases |
| Current-shunt | Decreases | Increases |

## Oscillators

**Barkhausen criterion:** loop gain **Aβ = 1** in magnitude with a total phase shift of **0° (or 360°)**.

| Oscillator | Frequency | Gain needed |
| --- | --- | --- |
| **RC phase shift** (3 RC sections) | f = 1/(2πRC√6) | A ≥ 29 |
| **Wien bridge** | f = 1/(2πRC) | A ≥ 3 |
| Colpitts (LC) | f = 1/(2π√(L C_eq)), C_eq = C₁C₂/(C₁ + C₂) | |
| Hartley (LC) | f = 1/(2π√((L₁ + L₂ + 2M)C)) | |
| Crystal | Very stable, series or parallel resonance | |

## Worked example

An op-amp with slew rate 0.5 V/µs drives a 10 V peak sine.

- f_max = 0.5 × 10⁶/(2π × 10) = **7.96 kHz**.

## Practice

```quiz
q: An RC phase-shift oscillator uses R = 1 kΩ and C = 1 µF. What is its frequency in Hz? (Give 2 decimal places.)
answer: 64.97
verify: round(1 / (2 * __import__("math").pi * 1e3 * 1e-6 * 6 ** 0.5), 2)
explain: f = 1/(2πRC√6) = 1/(2π × 10⁻³ × 2.449) = 64.97 Hz.
```

```quiz
q: An inverting summer has R_f = 10 kΩ and inputs of 1 V through 10 kΩ and 2 V through 5 kΩ. What is V_o in V?
answer: -5
verify: -10 * (1 / 10 + 2 / 5)
explain: V_o = −10k(1/10k + 2/5k) = −(1 + 4) = −5 V.
```

```quiz
q: An amplifier has A = 1000 and β = 0.01. What is its closed-loop gain? (Give 2 decimal places.)
answer: 90.91
verify: round(1000 / (1 + 1000 * 0.01), 2)
explain: A_f = A/(1 + Aβ) = 1000/11 = 90.91.
```

```quiz
q: What minimum amplifier gain does a Wien bridge oscillator need?
answer: 3
verify: 3
explain: At f₀ the Wien network attenuates by 1/3 with zero phase shift, so A must be at least 3.
```

```quiz
q: A non-inverting amplifier has R_f = 47 kΩ and R₁ = 4.7 kΩ. What is its gain?
answer: 11
verify: 1 + 47 / 4.7
explain: Gain = 1 + R_f/R₁ = 1 + 10 = 11.
```

```quiz
q: An op-amp has a slew rate of 1 V/µs. What is the full-power bandwidth (kHz) for a 5 V peak output? (Give 2 decimal places.)
answer: 31.83
verify: round(1e6 / (2 * __import__("math").pi * 5) / 1000, 2)
explain: f_max = SR/(2πV_m) = 10⁶/(31.42) = 31,831 Hz.
```
