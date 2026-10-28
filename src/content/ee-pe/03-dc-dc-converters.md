---
title: DC-DC Converters (Choppers)
chapter: DC to DC
description: Step-down (buck), step-up (boost) and buck-boost converters, duty ratio, continuous conduction, inductor ripple current, capacitor ripple voltage, chopper quadrants and control strategies.
---
A DC–DC converter (chopper) switches a DC source on and off quickly and filters the result, giving a different DC voltage with high efficiency.

## Duty ratio and control

**D = T_on/T**, with switching frequency f = 1/T. The output is controlled by **PWM** (fixed f, vary T_on) or frequency modulation.

## Basic converters (ideal, continuous conduction)

| Converter | V_o/V_in | Notes |
| --- | --- | --- |
| **Buck** (step-down) | **D** | Output ≤ input |
| **Boost** (step-up) | **1/(1 − D)** | Output ≥ input |
| **Buck–boost** | **−D/(1 − D)** | Inverted polarity, either higher or lower |
| Ćuk | −D/(1 − D) | Capacitive energy transfer, smooth input and output currents |

Input–output power balance (lossless): V_in I_in = V_o I_o.

## Ripple

**Buck converter:**

- Inductor ripple current **ΔI_L = V_in D(1 − D)/(L f) = V_o(1 − D)/(L f)**; maximum at D = 0.5.
- Output ripple voltage ΔV_o = ΔI_L/(8 C f).
- Boundary of continuous conduction: the minimum inductance L_c = (1 − D)R/(2f).

**Boost converter:** ΔI_L = V_in D/(L f); ΔV_o = I_o D/(C f).

## Chopper quadrants (for DC motors)

| Class | Quadrant | Operation |
| --- | --- | --- |
| A | I | Forward motoring |
| B | II | Regenerative braking |
| C | I and II | Two-quadrant (current reversal) |
| D | I and IV | Two-quadrant (voltage reversal) |
| E | All four | Full bridge |

## Worked example

A buck converter: V_in = 24 V, D = 0.5, L = 100 µH, f = 20 kHz.

- V_o = **12 V**; ΔI_L = 24 × 0.5 × 0.5/(100 × 10⁻⁶ × 20 × 10³) = **3 A** peak-to-peak.

## Practice

```quiz
q: A boost converter has V_in = 12 V and D = 0.75. What is the output voltage in V?
answer: 48
verify: 12 / (1 - 0.75)
explain: V_o = V_in/(1 − D) = 12/0.25 = 48 V.
```

```quiz
q: A buck–boost converter has V_in = 12 V and D = 0.6. What is the magnitude of the output voltage in V?
answer: 18
verify: round(0.6 / (1 - 0.6) * 12, 6)
explain: The magnitude is D/(1 − D) × V_in = 1.5 × 12 = 18 V (with reversed polarity).
```

```quiz
q: A buck converter steps 48 V down to 12 V while delivering 2 A. What is the average input current in A (lossless)?
answer: 0.5
verify: 12 * 2 / 48
explain: V_in I_in = V_o I_o, so I_in = 24/48 = 0.5 A.
```

```quiz
q: For a buck converter with fixed V_in, L and f, the inductor ripple current is maximum at a duty ratio of:
* 0.5
- 0.25
- 0.75
- 1
explain: ΔI_L ∝ D(1 − D), which is largest at D = 0.5.
```

```quiz
q: A boost converter has V_in = 24 V and V_o = 60 V. What is the duty ratio?
answer: 0.6
verify: round(1 - 24 / 60, 6)
explain: V_o = V_in/(1 − D) gives 1 − D = 0.4, D = 0.6.
```

```quiz
q: A buck converter has V_in = 100 V, D = 0.4 and load 10 Ω. What is the load current in A?
answer: 4
verify: round(0.4 * 100 / 10, 6)
explain: V_o = 40 V, I = 40/10 = 4 A.
```
