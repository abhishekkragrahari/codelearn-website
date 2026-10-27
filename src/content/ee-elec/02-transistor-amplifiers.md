---
title: BJT and MOSFET Amplifiers
chapter: Analog Electronics
description: BJT operating regions and biasing, stability, small-signal hybrid-pi model, CE, CB and CC amplifiers, MOSFET characteristics, CS amplifier gain, frequency response and multistage amplifiers.
---
Transistors amplify small signals. Design has two steps: set a stable **DC operating point** (biasing), then find the **small-signal** gain and impedances.

## BJT

- Regions: **active** (amplifier: BE forward, BC reverse), saturation and cut-off (switch).
- I_C = β I_B, I_E = I_B + I_C, α = β/(1 + β).
- **Voltage-divider bias** gives the best stability against β changes; stability factor S = ∂I_C/∂I_CO.
- Thermal runaway is prevented by emitter resistance and heat sinks.

**Small-signal (hybrid-π) model:** **g_m = I_C/V_T**, r_π = β/g_m, r_o = V_A/I_C.

| Configuration | Voltage gain | Input resistance | Output resistance | Use |
| --- | --- | --- | --- | --- |
| **Common emitter** | −g_m R_C (high, inverting) | r_π (medium) | R_C | Voltage amplifier |
| Common base | +g_m R_C | ≈ 1/g_m (low) | High | High frequency, current buffer |
| **Common collector** (emitter follower) | ≈ 1 | High | Low | Buffer |

An unbypassed emitter resistor R_E gives negative feedback: gain ≈ −R_C/R_E, more stable but lower.

## MOSFET

- **Saturation** (amplifier region): **I_D = (k/2)(V_GS − V_T)²** (k = μC_ox W/L), for V_DS ≥ V_GS − V_T.
- Linear (triode) region: I_D = k[(V_GS − V_T)V_DS − V_DS²/2].
- **g_m = k(V_GS − V_T) = √(2k I_D) = 2I_D/(V_GS − V_T)**.
- Common source gain = −g_m (R_D ∥ r_o). Very high input resistance (insulated gate).
- Enhancement vs depletion; n-channel vs p-channel; CMOS uses both.

## Frequency response

- Low-frequency cut-off from coupling and bypass capacitors; high-frequency cut-off from junction capacitances.
- **Miller effect:** a capacitance C between input and output of an inverting amplifier with gain −A appears at the input as **C(1 + A)**, which limits bandwidth.
- **Gain–bandwidth product** is roughly constant.
- Cascading n identical stages: overall gain multiplies, bandwidth shrinks.

## Worked example

A BJT has I_C = 2 mA (V_T = 25 mV) and R_C = 2 kΩ in a CE stage.

- g_m = 2/25 = **80 mA/V**; gain = −80 × 10⁻³ × 2000 = **−160**.

## Practice

```quiz
q: A BJT has β = 100 and I_C = 1 mA (V_T = 25 mV). What is r_π in kΩ?
answer: 2.5
verify: round(100 / (1e-3 / 0.025) / 1000, 6)
explain: g_m = 1/25 = 40 mA/V; r_π = β/g_m = 100/0.04 = 2500 Ω.
```

```quiz
q: A MOSFET with k = 4 mA/V² operates at V_GS − V_T = 0.5 V. What is its drain current in mA?
answer: 0.5
verify: 4 / 2 * 0.5 ** 2
explain: I_D = (k/2)(V_GS − V_T)² = 2 × 0.25 = 0.5 mA.
```

```quiz
q: An inverting amplifier with gain −99 has a 2 pF capacitance between input and output. What is the Miller input capacitance in pF?
answer: 200
verify: 2 * (1 + 99)
explain: C_in = C(1 + A) = 2 × 100 = 200 pF.
```

```quiz
q: Which BJT configuration has a voltage gain close to 1 and a low output resistance?
- Common emitter
- Common base
* Common collector
- Cascode
explain: The emitter follower (CC) is a buffer: gain ≈ 1, high input and low output resistance.
```
