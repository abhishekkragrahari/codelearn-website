---
title: Turbines and Pumps
chapter: Turbomachinery
description: Impulse and reaction turbines (Pelton, Francis, Kaplan), Euler's turbomachine equation, velocity triangles, efficiencies, specific speed, centrifugal pump head, NPSH and cavitation.
---
**Turbines** take energy from a fluid; **pumps** give energy to it. Both are analysed with velocity triangles and Euler's equation, and classified by **specific speed**.

## Euler's turbomachine equation

The work done per unit weight of fluid:

**H = (V_w1 u₁ − V_w2 u₂)/g** (turbines)

where u is the blade speed and V_w the whirl (tangential) component of absolute velocity at inlet (1) and outlet (2). For pumps, the sign reverses: H = (V_w2 u₂ − V_w1 u₁)/g, with V_w1 = 0 for radial inflow.

## Hydraulic turbines

| Turbine | Type | Head | Specific speed |
| --- | --- | --- | --- |
| **Pelton wheel** | Impulse | High | Low (about 10–35) |
| **Francis** | Reaction, mixed/radial | Medium | Medium (about 60–300) |
| **Kaplan** | Reaction, axial | Low | High (about 300–1000) |

(Ranges are in the metric units N√P/H^(5/4) with P in kW and approximate.)

- **Pelton:** jet velocity V = C_v √(2gH). Maximum efficiency when the bucket speed u = **V/2** (for 180° deflection, maximum hydraulic efficiency 100% in theory).
- **Draft tube** on reaction turbines recovers kinetic energy and lets the turbine sit above tailwater.
- Efficiencies: hydraulic, mechanical and overall η₀ = P/(ρgQH).

## Specific speed

- Turbine: **N_s = N√P / H^(5/4)**
- Pump: **N_s = N√Q / H^(3/4)**

Machines with the same specific speed are geometrically similar. Unit quantities: N_u = N/√H, Q_u = Q/√H, P_u = P/H^(3/2).

## Centrifugal pumps

- Manometric head H_m, manometric efficiency = gH_m/(V_w2 u₂).
- Backward-curved vanes give a stable, falling head–flow curve and are most common.
- **Pumps in series** add head; **in parallel** add flow.
- **Cavitation:** if local pressure falls below vapour pressure, bubbles form and collapse, eroding the impeller. Avoid it by keeping the **NPSH available** above the **NPSH required** (lower suction lift, larger suction pipe).

## Worked example

A Pelton wheel works under 400 m head with C_v = 0.98. Find the jet velocity and the best bucket speed.

- V = 0.98 √(2 × 9.81 × 400) = 0.98 × 88.59 = **86.8 m/s**.
- u = V/2 = **43.4 m/s**.

## Practice

```quiz
q: A turbine produces 4000 kW at 250 rpm under a head of 16 m. What is its specific speed (N√P/H^(5/4))? (Give 1 decimal place.)
answer: 494.1
verify: round(250 * 4000 ** 0.5 / 16 ** 1.25, 1)
explain: √4000 = 63.246 and 16^1.25 = 32, so N_s = 250 × 63.246/32 = 494.1. That is in the Kaplan range.
```

```quiz
q: For a low head (10 m) and large flow, the most suitable turbine is:
- Pelton wheel
- Francis turbine
* Kaplan turbine
- Turgo impulse turbine
explain: Low head and high flow give a high specific speed, which suits an axial-flow Kaplan turbine.
```

```quiz
q: Two identical pumps, each giving 30 m head at a certain flow, are connected in series. What head do they give at that flow (in m)?
answer: 60
verify: 2 * 30
explain: In series the same flow passes both pumps and their heads add: 60 m.
```

```quiz
q: A pump delivers 0.05 m³/s against 20 m with overall efficiency 0.8. What is the input power in kW? (g = 9.81 m/s², give 2 decimal places.)
answer: 12.26
verify: round(1000 * 9.81 * 0.05 * 20 / 0.8 / 1000, 2)
explain: P = ρgQH/η = 9810 × 0.05 × 20/0.8 = 12,262.5 W ≈ 12.26 kW.
```

```quiz
q: A Pelton wheel jet moves at 60 m/s. For maximum efficiency, what should the bucket speed be in m/s?
answer: 30
verify: 60 / 2
explain: Maximum efficiency occurs at u = V/2 = 30 m/s.
```

```quiz
q: A turbine delivers 900 kW from water at 1 m³/s under 100 m head (g = 10 m/s²). What is its overall efficiency?
answer: 0.9
verify: 900e3 / (1000 * 10 * 1 * 100)
explain: η = P/(ρgQH) = 900,000/1,000,000 = 0.9.
```
