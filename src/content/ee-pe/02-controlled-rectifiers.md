---
title: Phase-Controlled Rectifiers
chapter: AC to DC
description: Single-phase half-wave and full-wave controlled rectifiers with R and RL loads, freewheeling diode, semi and full converters, three-phase converters, inversion mode, and overlap.
---
**Phase-controlled rectifiers** (converters) use thyristors fired at an angle α to give an adjustable DC voltage from AC. They drive DC motors and HVDC links.

## Single-phase half-wave

With a resistive load and supply V_m sin ωt:

**V_dc = (V_m/2π)(1 + cos α)**

With an RL load the current continues past π (negative voltage appears) until it falls to zero; a **freewheeling diode** stops the negative part and improves the output.

## Single-phase full-wave

| Converter | V_dc (continuous current) | Operation |
| --- | --- | --- |
| **Full converter** (4 SCRs or centre-tap) | **(2V_m/π) cos α** | Two-quadrant: rectifier for α < 90°, **inverter for α > 90°** |
| Semi-converter (2 SCRs + 2 diodes) | (V_m/π)(1 + cos α) | One quadrant, built-in freewheeling |
| Full converter, resistive load | (V_m/π)(1 + cos α) | Current is discontinuous |

**Input power factor** of a full converter with ripple-free current = 0.9 cos α (distortion factor 0.9 × displacement factor cos α).

## Three-phase converters

With line voltage V_L (RMS), V_mL = √2 V_L:

- **Three-phase full converter (6 SCRs):** **V_dc = (3V_mL/π) cos α** = 1.35 V_L cos α. Output ripple is at 6f.
- Three-phase half-wave: V_dc = (3√3 V_mp/(2π)) cos α (V_mp = peak phase voltage).
- Semi-converter: (3V_mL/(2π))(1 + cos α).

## Inversion and dual converters

With α > 90° and a DC source on the load side (for example a motor during regenerative braking), a full converter feeds power back to the AC side: **line-commutated inverter**. Limit α to about 165° to leave margin for commutation. A **dual converter** (two full converters back to back) gives four-quadrant operation.

## Overlap

Source inductance L_s delays current transfer between thyristors by the **overlap angle** μ, reducing the output voltage: drop = (3ωL_s/π) I_d for a three-phase full converter (2ωL_s I_d/π for single phase).

## Worked example

A single-phase full converter on 230 V, 50 Hz feeds a highly inductive load at α = 60°.

- V_m = 325.3 V; V_dc = (2 × 325.3/π) × 0.5 = **103.5 V**.

## Practice

```quiz
q: A three-phase full converter is fed from a 415 V line supply. What is its output voltage (V) at α = 30°? (Give 1 decimal place.)
answer: 485.4
verify: round(3 * 415 * 2 ** 0.5 / __import__("math").pi * __import__("math").cos(__import__("math").radians(30)), 1)
explain: V_dc = (3√2 × 415/π) cos 30° = 560.5 × 0.866 = 485.4 V.
```

```quiz
q: A single-phase half-wave controlled rectifier with resistive load has V_m = 200 V and α = 90°. What is V_dc in V? (Give 2 decimal places.)
answer: 31.83
verify: round(200 / (2 * __import__("math").pi) * (1 + 0), 2)
explain: V_dc = (V_m/2π)(1 + cos 90°) = 200/(2π) = 31.83 V.
```

```quiz
q: A single-phase full converter with continuous current operates as an inverter when:
- α < 90°
* α > 90°
- α = 0°
- The load is purely resistive
explain: (2V_m/π) cos α becomes negative for α > 90°; with a suitable DC source, power flows to the AC side.
```

```quiz
q: What is the input power factor of a single-phase full converter with ripple-free load current at α = 0°? (Give 1 decimal place.)
answer: 0.9
verify: round(0.9 * __import__("math").cos(0), 1)
explain: pf = 0.9 cos α = 0.9 (the 0.9 comes from the square-wave input current's distortion factor).
```

```quiz
q: A single-phase full converter (continuous current) has V_m = 200 V and α = 60°. What is the output voltage in V? (Give 2 decimal places.)
answer: 63.66
verify: round(2 * 200 / __import__("math").pi * 0.5, 2)
explain: V_dc = (2V_m/π) cos α = 127.32 × 0.5 = 63.66 V.
```

```quiz
q: A single-phase semi-converter has V_m = 200 V and α = 90°. What is the output voltage in V? (Give 2 decimal places.)
answer: 63.66
verify: round(200 / __import__("math").pi * (1 + 0), 2)
explain: V_dc = (V_m/π)(1 + cos α) = 63.66 V.
```
