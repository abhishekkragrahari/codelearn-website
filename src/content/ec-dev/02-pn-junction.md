---
title: PN Junction, Zener, LED and Photodiode
chapter: Junction Devices
description: Built-in potential, depletion width and junction capacitance, ideal diode equation, breakdown (Zener and avalanche), diffusion capacitance, LEDs, photodiodes and solar cells.
---
The PN junction is the building block of diodes, transistors and optoelectronic devices.

## Equilibrium

- At the junction, diffusion leaves a **depletion region** of fixed ions and a built-in field.
- **Built-in potential:** **V_bi = V_T ln(N_A N_D/n_i²)**.
- Depletion width W = √(2ε(V_bi − V)/q × (1/N_A + 1/N_D)); it extends mostly into the **lightly doped** side: x_n N_D = x_p N_A.
- Reverse bias widens W; forward bias narrows it. W ∝ √(V_bi + V_R).

## Current

**I = I_s(e^(V/(ηV_T)) − 1)**

- I_s depends on n_i², so it rises very fast with temperature (doubles about every 10 °C for Si).
- A 60 mV increase in forward voltage multiplies the current by about **10** (at η = 1).
- At fixed current, V_D falls by about **2 mV/°C**.

## Capacitance

- **Junction (depletion) capacitance** C_j = εA/W, dominant in reverse bias: C_j ∝ (V_bi + V_R)^(−1/2) for an abrupt junction. Used in **varactor** diodes for tuning.
- **Diffusion capacitance** C_d = τ I/V_T, dominant in forward bias.

## Breakdown

- **Zener breakdown:** heavily doped junctions, thin depletion region, tunnelling; below about 5 V; **negative** temperature coefficient.
- **Avalanche breakdown:** lightly doped, impact ionisation; above about 6 V; **positive** temperature coefficient.
- Around 5–6 V the two effects cancel, giving the most temperature-stable Zeners.

## Optoelectronic devices

- **LED:** forward-biased direct-gap junction; photon wavelength **λ (µm) = 1.24/E_g (eV)**.
- **Photodiode:** reverse-biased; light creates carriers that add a current proportional to light intensity. PIN and avalanche photodiodes are faster and more sensitive.
- **Solar cell:** unbiased junction in the fourth quadrant; open-circuit voltage, short-circuit current and fill factor describe it.

## Worked example

A Si junction has N_A = 10¹⁷ and N_D = 10¹⁶ cm⁻³, n_i = 10¹⁰ cm⁻³, V_T = 0.0259 V.

- V_bi = 0.0259 ln(10³³/10²⁰) = 0.0259 × 29.93 = **0.775 V**.
- The depletion region extends 10 times further into the n side than the p side.

## Practice

```quiz
q: What wavelength (µm) does a GaAs LED with E_g = 1.42 eV emit? (Give 3 decimal places.)
answer: 0.873
verify: round(1.24 / 1.42, 3)
explain: λ = 1.24/E_g = 1.24/1.42 = 0.873 µm (near infrared).
```

```quiz
q: A diode carries 1 mA. By roughly what factor does its current rise if the forward voltage increases by 60 mV (η = 1, V_T = 26 mV)? (Give 2 decimal places.)
answer: 10.05
verify: round(__import__("math").exp(0.06 / 0.026), 2)
explain: I₂/I₁ = e^(ΔV/V_T) = e^(2.308) = 10.05.
```

```quiz
q: A varactor has 40 pF at 4 V reverse bias. Ignoring V_bi, what is its capacitance (pF) at 16 V? (Abrupt junction.)
answer: 20
verify: 40 * (4 / 16) ** 0.5
explain: C ∝ V^(−1/2): 40 × √(4/16) = 20 pF.
```

```quiz
q: A Zener diode rated 3.3 V breaks down mainly by:
* Zener (tunnelling) breakdown, with a negative temperature coefficient
- Avalanche breakdown, with a positive temperature coefficient
- Thermal runaway
- Punch-through
explain: Low-voltage Zeners are heavily doped and break down by tunnelling, whose voltage falls as temperature rises.
```

```quiz
q: An LED has a band gap of 2 eV. What wavelength (µm) does it emit?
answer: 0.62
verify: 1.24 / 2
explain: λ = 1.24/E_g = 0.62 µm (red-orange light).
```

```quiz
q: A Si diode's forward voltage is 0.70 V at 25 °C. At about −2 mV/°C, what is it at 75 °C (same current)?
answer: 0.6
verify: round(0.70 - 0.002 * 50, 6)
explain: ΔV = −2 mV × 50 = −0.1 V, giving 0.60 V.
```
