---
title: Thermodynamic Systems and the First Law
chapter: Laws of Thermodynamics
description: Systems, properties, state and processes, work and heat, the first law for closed systems and steady-flow devices (nozzles, turbines, compressors, throttles) with solved examples.
---
Thermodynamics is about energy and its conversion between heat and work. Its first law is energy conservation; most numerical questions are first-law balances on a system or a flow device.

## Basic terms

- **System:** closed (fixed mass), open (control volume with mass flow) or isolated (no mass or energy crosses).
- **Property:** a quantity that depends only on the state (p, T, v, u, h, s). **Intensive** properties do not depend on size (p, T); **extensive** ones do (V, U).
- **Process:** change of state. A **quasi-static** process passes through equilibrium states; a **cycle** returns to the start.
- **Zeroth law:** two bodies each in thermal equilibrium with a third are in equilibrium with each other (the basis of thermometers).

## Work and heat

Both are energy **in transit**, and both are **path functions** (their values depend on the process, not just the end states).

Boundary work W = ∫p dV:

| Process | Work |
| --- | --- |
| Constant volume | 0 |
| Constant pressure | p(V₂ − V₁) |
| Isothermal (ideal gas) | p₁V₁ ln(V₂/V₁) |
| Polytropic pVⁿ = C | (p₁V₁ − p₂V₂)/(n − 1) |

Sign convention used here: heat **into** the system and work **by** the system are positive.

## First law for a closed system

**Q − W = ΔU** (for a cycle: ∮δQ = ∮δW).

For an ideal gas: ΔU = m c_v ΔT, ΔH = m c_p ΔT, c_p − c_v = R, γ = c_p/c_v.

## First law for steady flow (SFEE)

**q − w = (h₂ − h₁) + (V₂² − V₁²)/2 + g(z₂ − z₁)** (per unit mass)

| Device | Simplification |
| --- | --- |
| Turbine (adiabatic) | w = h₁ − h₂ |
| Compressor / pump (adiabatic) | w_in = h₂ − h₁ |
| Nozzle (adiabatic, no work) | V₂ = √(2(h₁ − h₂) + V₁²) |
| **Throttle valve** | **h₂ = h₁** (isenthalpic) |
| Heat exchanger | Σ ṁh in = Σ ṁh out |

## Worked example

Air (c_p = 1.005 kJ/kg·K) enters a nozzle at 400 K with negligible velocity and leaves at 350 K. Find the exit velocity.

- Δh = 1.005 × 50 = 50.25 kJ/kg.
- V₂ = √(2 × 50,250) = **317 m/s**.

## Practice

```quiz
q: 2 kg of an ideal gas (c_v = 0.718 kJ/kg·K) is heated at constant volume from 300 K to 400 K. How much heat (kJ) is added?
answer: 143.6
verify: round(2 * 0.718 * 100, 6)
explain: W = 0 at constant volume, so Q = ΔU = mc_vΔT = 2 × 0.718 × 100 = 143.6 kJ.
```

```quiz
q: Steam enters an adiabatic turbine with h = 3200 kJ/kg and leaves with h = 2500 kJ/kg at 10 kg/s. What is the power output in MW? (Neglect KE and PE.)
answer: 7
verify: 10 * (3200 - 2500) / 1000
explain: P = ṁ(h₁ − h₂) = 10 × 700 = 7000 kW = 7 MW.
```

```quiz
q: In a throttling process, which property stays constant?
- Temperature
- Pressure
* Enthalpy
- Entropy
explain: A throttle has no work, negligible heat transfer and negligible change in KE, so h₂ = h₁. Entropy increases.
```

```quiz
q: A gas expands at a constant pressure of 200 kPa from 0.1 m³ to 0.4 m³. What is the work done in kJ?
answer: 60
verify: round(200 * (0.4 - 0.1), 6)
explain: W = pΔV = 200 × 0.3 = 60 kJ.
```

```quiz
q: Which of these are path functions? (Select all that apply.)
* Heat
* Work
- Internal energy
- Enthalpy
explain: Heat and work depend on the process; U and H are properties (point functions).
```

```quiz
q: A gas does 50 kJ of work while losing 20 kJ of heat. What is its change in internal energy in kJ?
answer: -70
verify: -20 - 50
explain: ΔU = Q − W = −20 − 50 = −70 kJ.
```

```quiz
q: Air (c_p = 1.005 kJ/kg·K) is compressed adiabatically in steady flow from 300 K to 500 K. What is the work input per kg in kJ?
answer: 201
verify: round(1.005 * 200, 6)
explain: w = c_p ΔT = 1.005 × 200 = 201 kJ/kg.
```
