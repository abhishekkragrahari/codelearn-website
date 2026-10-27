---
title: Rankine Cycle and Steam Power Plants
chapter: Power Cycles
description: The Rankine cycle on the T-s diagram, pump and turbine work, thermal efficiency, effects of pressure and superheat, reheat and regeneration, and steam rate.
---
Steam power plants run on the **Rankine cycle**. It is the practical version of the Carnot cycle for a working fluid that changes phase.

## The ideal Rankine cycle

| Process | Device | Energy |
| --- | --- | --- |
| 1 → 2: isentropic compression | Pump | w_p = h₂ − h₁ ≈ v₁(p₂ − p₁) |
| 2 → 3: constant-pressure heating | Boiler | q_in = h₃ − h₂ |
| 3 → 4: isentropic expansion | Turbine | w_t = h₃ − h₄ |
| 4 → 1: constant-pressure cooling | Condenser | q_out = h₄ − h₁ |

**Thermal efficiency** η = (w_t − w_p)/q_in.

**Back work ratio** = w_p/w_t is tiny (about 1%), because pumping a liquid needs little work. This is the big advantage over gas cycles.

**Specific steam consumption (steam rate)** = 3600/(w_t − w_p) kg/kWh (with w in kJ/kg).

## Raising efficiency

- **Lower condenser pressure:** lowers the mean temperature of heat rejection; but the turbine exhaust gets wetter.
- **Higher boiler pressure:** raises the mean temperature of heat addition; also makes the exhaust wetter.
- **Superheating:** raises efficiency and dries the exhaust.
- **Reheat:** expand partly, reheat at lower pressure, expand again. Mainly keeps the exhaust dry (x ≥ 0.88 or so) at high boiler pressure.
- **Regeneration:** bleed steam to heat the feedwater (open or closed feedwater heaters), raising the mean temperature of heat addition.

**Mean temperature of heat addition:** T_m = (h₃ − h₂)/(s₃ − s₂). Efficiency ≈ 1 − T_condenser/T_m: anything that raises T_m helps.

## Actual cycle

Turbine and pump losses are given by isentropic efficiencies:

- η_t = (h₃ − h₄)/(h₃ − h₄s)
- η_p = (h₂s − h₁)/(h₂ − h₁)

## Worked example

Given h₁ = 192 kJ/kg, pump work 10 kJ/kg, h₃ = 3400 kJ/kg and h₄ = 2300 kJ/kg:

- h₂ = 202 kJ/kg; q_in = 3400 − 202 = 3198 kJ/kg.
- w_net = 1100 − 10 = 1090 kJ/kg.
- η = 1090/3198 = **34.1%**; steam rate = 3600/1090 = 3.30 kg/kWh.

## Practice

```quiz
q: Water (v = 0.001 m³/kg) is pumped from 10 kPa to 10 MPa. What is the ideal pump work in kJ/kg? (Give 2 decimal places.)
answer: 9.99
verify: round(0.001 * (10000 - 10), 2)
explain: w_p = vΔp = 0.001 × 9990 = 9.99 kJ/kg.
```

```quiz
q: A Rankine cycle has net work 1000 kJ/kg. What is its specific steam consumption in kg/kWh?
answer: 3.6
verify: 3600 / 1000
explain: SSC = 3600/w_net = 3.6 kg/kWh.
```

```quiz
q: The ideal turbine enthalpy drop is 1000 kJ/kg and the actual drop is 850 kJ/kg. What is the isentropic efficiency?
answer: 0.85
verify: 850 / 1000
explain: η_t = actual/ideal = 850/1000 = 0.85.
```

```quiz
q: The main purpose of reheating in a Rankine cycle is to:
- Reduce pump work
* Reduce moisture at the turbine exhaust
- Increase condenser pressure
- Reduce boiler pressure
explain: Reheat keeps the steam dry enough at the last turbine stages; it can also raise efficiency slightly.
```

```quiz
q: Which of these raise the efficiency of a Rankine cycle? (Select all that apply.)
* Lowering the condenser pressure
* Regenerative feedwater heating
* Superheating the steam
- Raising the condenser pressure
explain: Each of the first three raises the mean temperature of heat addition or lowers that of rejection.
```
