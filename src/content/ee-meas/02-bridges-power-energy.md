---
title: Bridges and Measurement of Power and Energy
chapter: Measurement Methods
description: Wheatstone, Kelvin double, Maxwell, Hay, Anderson, Schering and Wien bridges, wattmeter methods for single and three-phase power, energy meters, and potentiometers.
---
Bridges measure R, L and C by balancing; wattmeters and energy meters measure power and energy.

## DC bridges

- **Wheatstone bridge:** balance when **P/Q = R/S**, so the unknown R = (P/Q) S. Best for medium resistances (1 Ω to 100 kΩ).
- **Kelvin double bridge:** low resistances (below 1 Ω), eliminates lead and contact resistance.
- **Megger / loss of charge method:** very high resistances (insulation).

## AC bridges

Balance needs both magnitude and phase: **Z₁ Z₄ = Z₂ Z₃** (two equations).

| Bridge | Measures | Notes |
| --- | --- | --- |
| **Maxwell's inductance–capacitance** | Medium-Q inductors (1 < Q < 10) | Compares L with a standard C |
| **Hay's** | High-Q inductors (Q > 10) | |
| **Anderson's** | Inductance precisely, over a wide range | Modified Maxwell |
| **Schering** | Capacitance and dissipation factor (insulation) | High voltage use |
| **Wien** | Frequency (and capacitance) | f = 1/(2πRC) for equal arms |
| De Sauty | Capacitance (lossless) | Simple |

Maxwell L–C bridge balance: L_x = R₂ R₃ C₁, R_x = R₂R₃/R₁.

## Power measurement

- **Electrodynamometer wattmeter:** current coil in series, pressure coil across the load; reads V I cos φ.
- **Three-phase power:** **two-wattmeter method** for three-wire loads: P = W₁ + W₂ and tan φ = √3(W₁ − W₂)/(W₁ + W₂). One wattmeter reads zero at pf 0.5 and negative below it.
- **Reactive power** of a balanced load from one wattmeter with its pressure coil across the other two lines: Q = √3 × reading.

## Energy meters

- **Induction-type energy meter** (older): an aluminium disc driven by eddy currents; braked by a permanent magnet. **Meter constant** K = revolutions per kWh.
- Adjustments: light load (friction) compensation, lag adjustment (for correct power factor), creep prevention (holes in the disc).
- **Electronic (static) meters** are now standard.
- **Percentage error** = (energy recorded − true energy)/true energy × 100.

## Potentiometers

A DC potentiometer measures voltage by comparing with a standard cell at **null** (no current is drawn from the unknown), so it is very accurate; it is also used to calibrate meters.

## Worked example

A Wheatstone bridge balances with P = 100 Ω, Q = 1000 Ω and S = 470 Ω.

- R = (P/Q) S = 0.1 × 470 = **47 Ω**.

## Practice

```quiz
q: An energy meter has a constant of 600 rev/kWh. A 2 kW load runs for 30 minutes. How many revolutions should the disc make?
answer: 600
verify: 600 * 2 * 0.5
explain: Energy = 2 × 0.5 = 1 kWh, so 600 revolutions.
```

```quiz
q: The same meter actually makes 612 revolutions. What is its percentage error?
answer: 2
verify: (612 - 600) / 600 * 100
explain: Error = (612 − 600)/600 × 100 = +2% (the meter runs fast).
```

```quiz
q: A Wien bridge has R = 10 kΩ and C = 10 nF in both arms. At what frequency (Hz) does it balance? (Give 1 decimal place.)
answer: 1591.5
verify: round(1 / (2 * __import__("math").pi * 10e3 * 10e-9), 1)
explain: f = 1/(2πRC) = 1/(2π × 10⁻⁴) = 1591.5 Hz.
```

```quiz
q: Which bridge is best for measuring the capacitance and loss angle of a cable's insulation?
- Maxwell's bridge
- Hay's bridge
* Schering bridge
- Kelvin double bridge
explain: The Schering bridge measures capacitance and dissipation factor, often at high voltage.
```
