---
title: Protection, Stability and Economic Dispatch
chapter: Operation
description: Overcurrent, distance and differential relays, plug setting multiplier, circuit breakers, swing equation, equal area criterion, critical clearing angle, and economic load dispatch with equal incremental cost.
---
This lesson covers how a power system is protected against faults, how it stays in step after disturbances, and how generation is shared at least cost.

## Protection

**Requirements:** selectivity, speed, sensitivity, reliability, and back-up.

- **Overcurrent relays:** **plug setting multiplier PSM = fault current/(relay setting current × CT ratio)**. The time multiplier setting (TMS) scales the operating time from the relay curve (IDMT: inverse definite minimum time).
- **Distance (impedance) relays** measure V/I and trip if it is below a setting: impedance, reactance (good for arc faults on short lines), **mho** (directional, long lines). Zones 1, 2, 3 cover about 80%, 120% and further.
- **Differential relays** compare currents entering and leaving equipment (transformers, generators, buses); **percentage (biased) differential** relays avoid false trips from CT mismatch. Transformers also need harmonic restraint against **magnetising inrush**.
- **Buchholz relay:** gas-operated, for incipient faults in oil-filled transformers.

**Circuit breakers** interrupt the arc at current zero: oil, air-blast, **SF₆** and **vacuum** breakers. **Restriking voltage** and the rate of rise of restriking voltage (RRRV) decide whether the arc reignites.

## Stability

**Swing equation** (per unit): **(2H/ω_s) d²δ/dt² = P_m − P_e**, with H = stored kinetic energy/MVA rating (MJ/MVA).

- **Steady-state stability:** small changes; limit P_max = EV/X at δ = 90°.
- **Transient stability:** large disturbances (faults).

**Equal area criterion** (single machine, infinite bus): the system is stable if the **accelerating area** (P_m > P_e during the fault) can be matched by an equal **decelerating area** after clearing. The **critical clearing angle** is where the two areas are just equal. Faster breakers and auto-reclosing improve stability.

For a three-phase fault where P_e = 0 during the fault and the post-fault curve equals the pre-fault curve: **cos δ_cr = (π − 2δ₀) sin δ₀ − cos δ₀**.

## Economic dispatch

Each generator has a cost curve; the **incremental cost** IC = dC/dP. Without losses, the cheapest sharing of a load has all units at **equal incremental cost λ** (within their limits).

With losses: IC_i × penalty factor L_i = λ, with L_i = 1/(1 − ∂P_L/∂P_i).

## Worked example

Two units: IC₁ = 0.02P₁ + 10 and IC₂ = 0.04P₂ + 8 (₹/MWh), total load 300 MW.

- 0.02P₁ + 10 = 0.04(300 − P₁) + 8 → 0.06P₁ = 10 → **P₁ = 166.7 MW**, **P₂ = 133.3 MW**, λ = ₹13.33/MWh.

## Practice

```quiz
q: A relay has a 5 A setting with a 400/5 CT. A fault current of 4000 A flows. What is the PSM?
answer: 10
verify: 4000 / (400 / 5) / 5
explain: Secondary current = 4000/80 = 50 A; PSM = 50/5 = 10.
```

```quiz
q: In the worked example, what is the system incremental cost λ in ₹/MWh? (Give 2 decimal places.)
answer: 13.33
verify: round(0.02 * (10 / 0.06) + 10, 2)
explain: λ = 0.02 × 166.67 + 10 = 13.33 ₹/MWh.
```

```quiz
q: For a fault with P_e = 0 during the fault and the same pre- and post-fault curve, the initial angle is 30°. What is the critical clearing angle in degrees? (Give 1 decimal place.)
answer: 79.6
verify: round(__import__("math").degrees(__import__("math").acos((__import__("math").pi - 2 * __import__("math").radians(30)) * 0.5 - __import__("math").cos(__import__("math").radians(30)))), 1)
explain: cos δ_cr = (π − π/3) × sin 30° − cos 30° = 1.0472 − 0.8660 = 0.1812, so δ_cr = 79.6°.
```

```quiz
q: For economic dispatch neglecting losses, generators should share the load so that:
* Their incremental costs are equal
- Their outputs are equal
- Their efficiencies are equal
- The cheapest unit is fully loaded first, always
explain: Equal incremental cost minimises total cost (subject to generator limits).
```
