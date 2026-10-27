---
title: Three-Phase and Single-Phase Induction Motors
chapter: AC Machines
description: Rotating magnetic field, synchronous speed and slip, equivalent circuit and power flow, torque-slip characteristic, maximum and starting torque, starting methods, speed control and single-phase motors.
---
The induction motor is the workhorse of industry: rugged, cheap and simple. Its rotor current is induced by the stator's rotating field, and it always runs slightly below synchronous speed.

## Rotating field and slip

- Three-phase currents in a distributed winding create a field rotating at **N_s = 120 f/P** rpm.
- **Slip** s = (N_s − N)/N_s. Full-load slip is typically 2–5%.
- **Rotor frequency** f_r = s f; rotor EMF and reactance at slip s are s × their standstill values.

## Power flow

From the equivalent circuit (rotor resistance R₂/s):

- **Air-gap power** P_ag = stator input − stator losses.
- **Rotor copper loss = s P_ag**.
- **Mechanical power developed = (1 − s) P_ag**.
- So P_ag : rotor Cu loss : P_mech = 1 : s : (1 − s).
- Torque T = P_ag/ω_s.

## Torque–slip characteristic

T ∝ s R₂ E₂²/(R₂² + (s X₂)²)

- For small slip, T ∝ s (linear region where the motor runs). For large slip, T ∝ 1/s.
- **Maximum (breakdown) torque** at **s_max = R₂/X₂**; its value is **independent of R₂**.
- **Starting torque** is maximum when R₂ = X₂ (slip-ring motors add external rotor resistance for this).
- T ∝ V²: a 10% voltage drop reduces torque by about 19%.

## Starting methods

| Method | Starting current (vs DOL) | Starting torque (vs DOL) |
| --- | --- | --- |
| Direct-on-line (DOL) | 1 | 1 |
| **Star–delta** | 1/3 | 1/3 |
| Autotransformer (tap x) | x² | x² |
| Rotor resistance (slip ring) | Reduced | Increased |

## Speed control

Stator voltage control (small range), **V/f control** with inverters (constant flux, wide range), pole changing, rotor resistance control, and slip power recovery.

## Single-phase induction motors

A single-phase winding produces a pulsating field (two counter-rotating fields: **double revolving field theory**), so there is **no starting torque**. Starting methods: split-phase, **capacitor-start**, capacitor-run, shaded pole.

## Worked example

A 4-pole, 50 Hz motor runs at a slip of 4% with air-gap power 10 kW.

- N_s = 1500 rpm; N = **1440 rpm**; rotor frequency = **2 Hz**.
- Rotor copper loss = **400 W**; mechanical power = **9.6 kW**.

## Practice

```quiz
q: A 6-pole, 50 Hz induction motor runs at 960 rpm. What is the slip?
answer: 0.04
verify: round((1000 - 960) / 1000, 6)
explain: N_s = 1000 rpm; s = 40/1000 = 0.04.
```

```quiz
q: An induction motor has R₂ = 0.2 Ω and X₂ = 1 Ω (rotor values at standstill). At what slip does maximum torque occur?
answer: 0.2
verify: 0.2 / 1
explain: s_max = R₂/X₂ = 0.2.
```

```quiz
q: With star-delta starting, the starting torque compared with DOL starting is:
- The same
- Half
* One third
- One ninth
explain: Phase voltage falls by √3 in star, so torque (∝ V²) falls to 1/3, as does the line current.
```

```quiz
q: The supply voltage of an induction motor falls by 10%. By roughly what percentage does its torque at a given slip fall? (Give 1 decimal place.)
answer: 19
verify: round((1 - 0.9 ** 2) * 100, 1)
explain: T ∝ V², so the torque becomes 0.81 of its value: a 19% drop.
```
