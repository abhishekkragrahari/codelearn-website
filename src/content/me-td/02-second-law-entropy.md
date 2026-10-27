---
title: Second Law, Entropy and Availability
chapter: Laws of Thermodynamics
description: Kelvin-Planck and Clausius statements, heat engines, refrigerators and heat pumps, Carnot efficiency, Clausius inequality, entropy change, and availability (exergy) and irreversibility.
---
The first law says energy is conserved; the **second law** says which way processes go and how much work can be obtained. It introduces **entropy** and sets the maximum efficiency of any engine.

## Statements of the second law

- **Kelvin–Planck:** no cyclic device can take heat from one reservoir and convert it all into work.
- **Clausius:** heat cannot flow from a colder body to a hotter one without external work.
- The two statements are equivalent.

## Heat engines, refrigerators and heat pumps

- Heat engine efficiency η = W/Q_H = 1 − Q_L/Q_H.
- Refrigerator COP_R = Q_L/W. Heat pump COP_HP = Q_H/W = COP_R + 1.

**Carnot (reversible) limits** between reservoirs at T_H and T_L (in kelvin):

- η_max = 1 − T_L/T_H
- COP_R,max = T_L/(T_H − T_L); COP_HP,max = T_H/(T_H − T_L)

No engine between the same reservoirs can beat Carnot, and all reversible engines between them have the same efficiency.

## Entropy

- **Clausius inequality:** ∮δQ/T ≤ 0 (= 0 for reversible cycles).
- **dS = δQ_rev/T.** For any process, ΔS ≥ ∫δQ/T.
- **Principle of increase of entropy:** for an isolated system (or system + surroundings), ΔS_total ≥ 0.

Entropy change of an ideal gas:

**Δs = c_p ln(T₂/T₁) − R ln(p₂/p₁) = c_v ln(T₂/T₁) + R ln(v₂/v₁)**

For a solid or liquid with specific heat c: Δs = c ln(T₂/T₁). For heat Q added to a reservoir at T: ΔS = Q/T.

A **reversible adiabatic** process is **isentropic**: for an ideal gas, pv^γ = constant and T₂/T₁ = (p₂/p₁)^((γ−1)/γ).

## Availability (exergy)

The **available energy** of heat Q at temperature T, with surroundings at T₀: AE = Q(1 − T₀/T). The rest, Q T₀/T, is unavailable.

**Irreversibility** (lost work) I = T₀ ΔS_gen (Gouy–Stodola theorem). **Second-law efficiency** = actual useful work / maximum possible work.

## Worked example

1 kg of water at 90 °C is mixed with 1 kg at 10 °C (c = 4.18 kJ/kg·K). Find the entropy generated.

- Final temperature 50 °C = 323.15 K.
- ΔS = 4.18 [ln(323.15/363.15) + ln(323.15/283.15)] = 4.18 × (−0.1167 + 0.1321) = **0.0645 kJ/K** (positive, as it must be).

## Practice

```quiz
q: An engine works between 800 K and 300 K. What is the maximum possible efficiency? (Give 3 decimal places.)
answer: 0.625
verify: 1 - 300 / 800
explain: η = 1 − 300/800 = 0.625.
```

```quiz
q: A heat pump keeps a house at 300 K when it is 270 K outside. What is its maximum COP?
answer: 10
verify: 300 / (300 - 270)
explain: COP_HP = T_H/(T_H − T_L) = 300/30 = 10.
```

```quiz
q: 1000 kJ of heat is transferred to a reservoir at 400 K. What is the reservoir's entropy change in kJ/K?
answer: 2.5
verify: 1000 / 400
explain: ΔS = Q/T = 1000/400 = 2.5 kJ/K.
```

```quiz
q: Heat of 1000 kJ is available at 500 K with surroundings at 300 K. How much of it (kJ) is available energy?
answer: 400
verify: round(1000 * (1 - 300 / 500), 6)
explain: AE = Q(1 − T₀/T) = 1000 × 0.4 = 400 kJ.
```

```quiz
q: An engine claims 1200 kJ of work from 2000 kJ of heat taken at 600 K, rejecting heat at 300 K. The claim is:
- Possible and reversible
- Possible and irreversible
* Impossible
- Cannot be judged
explain: The claimed efficiency 0.6 exceeds the Carnot limit 1 − 300/600 = 0.5, so it violates the second law.
```
