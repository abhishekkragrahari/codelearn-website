---
title: Gas Power Cycles and IC Engines
chapter: Power Cycles
description: Air-standard Otto, Diesel, dual and Brayton cycles, their efficiencies and comparisons, mean effective pressure, IC engine performance, and gas turbine improvements.
---
Petrol engines, diesel engines and gas turbines use air (with fuel) as the working fluid. Their **air-standard cycles** give simple formulas for efficiency.

## Otto cycle (petrol / SI engine)

Two isentropic and two constant-volume processes. With compression ratio r = V₁/V₂:

**η_Otto = 1 − 1/r^(γ−1)**

Efficiency depends only on r (and γ). It is limited by **knock** in SI engines.

## Diesel cycle (CI engine)

Heat is added at constant pressure. With cut-off ratio ρ = V₃/V₂:

**η_Diesel = 1 − (1/r^(γ−1)) × (ρ^γ − 1)/(γ(ρ − 1))**

For the **same compression ratio**, η_Otto > η_dual > η_Diesel. For the **same maximum pressure and temperature**, Diesel > dual > Otto. Diesel engines reach higher efficiencies in practice because they run at much higher r.

## Brayton cycle (gas turbine)

Two isentropic and two constant-pressure processes. With pressure ratio r_p:

**η_Brayton = 1 − 1/r_p^((γ−1)/γ)**

- **Optimum pressure ratio** for maximum net work: r_p = (T_max/T_min)^(γ/(2(γ−1))), where T₂ = √(T₁T₃).
- **Back work ratio** is large (40–80%), so compressor efficiency matters a lot.
- **Regeneration** (heat exchanger using exhaust), intercooling and reheating improve it.

## Mean effective pressure

**MEP = net work per cycle / swept volume.** It compares engines of different sizes.

## IC engine performance

- **Indicated power** IP = p_mi L A n k, where p_mi is the indicated mean effective pressure, L the stroke, A the piston area, k the number of cylinders and n the power strokes per second per cylinder: N/60 for a two-stroke and N/120 for a four-stroke engine (N in rpm).
- **Brake power** BP = 2πNT/60. Mechanical efficiency η_m = BP/IP. Friction power = IP − BP.
- **Brake thermal efficiency** = BP/(ṁ_f × CV).
- **Volumetric efficiency** = actual air inducted / swept volume at intake conditions.
- **Specific fuel consumption** = fuel used per kWh.

## Worked example

An Otto cycle has r = 9 and γ = 1.4.

- η = 1 − 1/9^0.4 = 1 − 1/2.408 = **58.5%**.

## Practice

```quiz
q: A Brayton cycle has a pressure ratio of 10 (γ = 1.4). What is its efficiency? (Give 3 decimal places.)
answer: 0.482
verify: round(1 - 1 / 10 ** (0.4 / 1.4), 3)
explain: η = 1 − 1/10^0.2857 = 1 − 1/1.931 = 0.482.
```

```quiz
q: A Diesel cycle has r = 16, cut-off ratio 2 and γ = 1.4. What is its efficiency? (Give 3 decimal places.)
answer: 0.614
verify: round(1 - (1 / 16 ** 0.4) * (2 ** 1.4 - 1) / (1.4 * (2 - 1)), 3)
explain: η = 1 − (1/16^0.4)(2^1.4 − 1)/(1.4 × 1) = 1 − 0.3299 × 1.6390/1.4 = 1 − 0.3862 = 0.614.
```

```quiz
q: An engine delivers a torque of 200 N·m at 3000 rpm. What is its brake power in kW? (Give 2 decimal places.)
answer: 62.83
verify: round(2 * __import__("math").pi * 3000 * 200 / 60 / 1000, 2)
explain: BP = 2πNT/60 = 2π × 3000 × 200/60 = 62,832 W = 62.83 kW.
```

```quiz
q: For the same compression ratio and heat input, which cycle is the most efficient?
* Otto
- Diesel
- Dual
- All are equal
explain: At equal r, Otto > dual > Diesel, since heat added at constant volume is added at higher mean temperature.
```

```quiz
q: A gas turbine works between 300 K and 1200 K. For maximum net work, what is the compressor exit temperature in K?
answer: 600
verify: (300 * 1200) ** 0.5
explain: T₂ = √(T₁T₃) = √(360,000) = 600 K.
```
