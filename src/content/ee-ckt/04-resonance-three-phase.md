---
title: Resonance, Coupled Coils and Three-Phase
chapter: AC Circuits
description: Series and parallel resonance, quality factor and bandwidth, mutual inductance and dot convention, balanced star and delta systems, line and phase quantities, and the two-wattmeter method.
---
This lesson covers three AC topics that GATE EE tests every year: **resonance**, **magnetically coupled coils**, and **three-phase** circuits.

## Series resonance

At **ω₀ = 1/√(LC)**, X_L = X_C, so Z = R (minimum) and the current is maximum, in phase with the voltage.

- **Quality factor** Q = ω₀L/R = 1/(ω₀CR) = (1/R)√(L/C).
- **Bandwidth** BW = ω₀/Q = R/L (rad/s). Half-power frequencies: ω₁ω₂ = ω₀².
- Voltage across L or C at resonance = Q × source voltage (voltage magnification).

## Parallel resonance

An ideal parallel LC tank has maximum impedance (infinite) at ω₀; with a coil of resistance R, ω₀ = √(1/(LC) − R²/L²) and the **dynamic impedance** is L/(CR). Current magnification instead of voltage.

## Coupled coils

- Mutual inductance M = k√(L₁L₂), with coupling coefficient 0 ≤ k ≤ 1.
- Series aiding: L = L₁ + L₂ + 2M; series opposing: L₁ + L₂ − 2M.
- **Dot convention:** current entering both dots gives aiding fluxes (+M).
- Ideal transformer: V₁/V₂ = N₁/N₂, and an impedance Z_L on the secondary looks like (N₁/N₂)² Z_L from the primary.

## Balanced three-phase systems

| Connection | Line voltage | Line current |
| --- | --- | --- |
| Star (Y) | V_L = √3 V_ph (leads by 30°) | I_L = I_ph |
| Delta (Δ) | V_L = V_ph | I_L = √3 I_ph (lags by 30°) |

- **Total power** P = √3 V_L I_L cos φ (φ = phase angle of the load impedance).
- A balanced delta load Z_Δ is equivalent to a star load Z_Δ/3.
- Phase sequence ABC: V_B lags V_A by 120°.

**Two-wattmeter method** (three-wire balanced load):

- P = W₁ + W₂.
- **tan φ = √3 (W₁ − W₂)/(W₁ + W₂)**.
- At pf 0.5, one wattmeter reads zero; below 0.5, one reads negative.

## Worked example

A balanced star load of (8 + j6) Ω per phase on a 400 V line supply.

- V_ph = 400/√3 = 230.9 V; |Z| = 10 Ω; I = **23.09 A**; pf = 0.8.
- P = √3 × 400 × 23.09 × 0.8 = **12.8 kW**.

## Practice

```quiz
q: A series RLC circuit has R = 10 Ω, L = 0.1 H and C = 10 µF. What is its quality factor?
answer: 10
verify: round((1 / 10) * (0.1 / 10e-6) ** 0.5, 6)
explain: Q = (1/R)√(L/C) = 0.1 × √10,000 = 10.
```

```quiz
q: In the two-wattmeter method, W₁ = 3 kW and W₂ = 1 kW. What is the power factor? (Give 3 decimal places.)
answer: 0.756
verify: round(__import__("math").cos(__import__("math").atan(3 ** 0.5 * (3 - 1) / (3 + 1))), 3)
explain: tan φ = √3 × 2/4 = 0.866, so φ = 40.9° and cos φ = 0.756.
```

```quiz
q: Two coils of 4 mH and 9 mH have k = 0.5. What is the total inductance (mH) in series aiding?
answer: 19
verify: 4 + 9 + 2 * 0.5 * (4 * 9) ** 0.5
explain: M = 0.5√36 = 3 mH; L = 4 + 9 + 6 = 19 mH.
```

```quiz
q: In the worked example, what is the total power in kW? (Give 1 decimal place.)
answer: 12.8
verify: round(3 * (400 / 3 ** 0.5 / 10) ** 2 * 8 / 1000, 1)
explain: P = 3I²R = 3 × 23.09² × 8 = 12,800 W = 12.8 kW.
```
