---
title: Refrigeration, Air Conditioning and Psychrometry
chapter: Applications
description: Vapour compression refrigeration cycle and COP, refrigerants, air refrigeration, psychrometric properties (humidity ratio, relative humidity, dew point, wet bulb) and air-conditioning processes.
---
Refrigerators and air conditioners move heat from cold to hot using work. Air conditioning also controls **humidity**, which needs psychrometry: the study of moist air.

## Vapour compression refrigeration

| Process | Device |
| --- | --- |
| 1 → 2: isentropic compression of vapour | Compressor |
| 2 → 3: condensation at constant pressure | Condenser |
| 3 → 4: throttling (h₄ = h₃) | Expansion valve |
| 4 → 1: evaporation at constant pressure | Evaporator |

- **Refrigerating effect** = h₁ − h₄. **Compressor work** = h₂ − h₁.
- **COP = (h₁ − h₄)/(h₂ − h₁).**
- **1 tonne of refrigeration (TR) = 3.5167 kW** (about 211 kJ/min).
- Subcooling the liquid and lowering the condenser temperature raise COP; a lower evaporator temperature reduces it.

**Refrigerants:** older CFCs (R-12) damage ozone; HFCs (R-134a) do not but have high global warming potential; ammonia (R-717) and CO₂ (R-744) are natural refrigerants.

**Air refrigeration (Bell–Coleman / reversed Brayton)** is used in aircraft: COP = 1/(r_p^((γ−1)/γ) − 1).

## Psychrometry

Moist air = dry air + water vapour. With total pressure p and vapour partial pressure p_v:

- **Humidity ratio (specific humidity)** ω = 0.622 p_v/(p − p_v) kg vapour per kg dry air.
- **Relative humidity** φ = p_v/p_sat (at the dry-bulb temperature).
- **Dew point:** the temperature at which the vapour starts to condense when cooled at constant ω.
- **Wet-bulb temperature:** read by a thermometer with a wet wick; it lies between dew point and dry bulb (all three are equal at φ = 100%).
- **Enthalpy** of moist air ≈ 1.005 t + ω(2500 + 1.88 t) kJ/kg dry air (t in °C).

## Air-conditioning processes

| Process | ω | Dry bulb |
| --- | --- | --- |
| Sensible heating / cooling | Constant | Rises / falls |
| Cooling and dehumidification | Falls | Falls |
| Heating and humidification | Rises | Rises |
| Evaporative cooling | Rises | Falls (wet bulb constant) |
| Adiabatic mixing of two streams | Mass-weighted average | Approximately mass-weighted |

**Bypass factor** of a cooling coil = (t_out − t_coil)/(t_in − t_coil).

## Worked example

A refrigerator has h₁ = 400, h₂ = 430 and h₃ = h₄ = 250 kJ/kg.

- Refrigerating effect = 150 kJ/kg; work = 30 kJ/kg; **COP = 5**.
- For 1 TR: ṁ = 3.5167/150 = 0.0234 kg/s.

## Practice

```quiz
q: A refrigerator has refrigerating effect 120 kJ/kg and compressor work 40 kJ/kg. What is its COP?
answer: 3
verify: 120 / 40
explain: COP = 120/40 = 3.
```

```quiz
q: Air at 101.325 kPa has a vapour pressure of 2 kPa. What is its humidity ratio in g/kg dry air? (Give 2 decimal places.)
answer: 12.52
verify: round(0.622 * 2 / (101.325 - 2) * 1000, 2)
explain: ω = 0.622 × 2/99.325 = 0.01252 kg/kg = 12.52 g/kg.
```

```quiz
q: A plant needs 10 TR of cooling. What is that in kW? (Give 2 decimal places.)
answer: 35.17
verify: round(10 * 3.5167, 2)
explain: 1 TR = 3.5167 kW, so 10 TR = 35.17 kW.
```

```quiz
q: During evaporative cooling of air, which stays approximately constant?
- Dry-bulb temperature
- Humidity ratio
* Wet-bulb temperature
- Relative humidity
explain: Evaporative (adiabatic) saturation follows a line of constant wet-bulb temperature: dry bulb falls and humidity rises.
```

```quiz
q: A cooling coil at 10 °C cools air from 30 °C to 15 °C. What is the bypass factor?
answer: 0.25
verify: (15 - 10) / (30 - 10)
explain: BF = (t_out − t_coil)/(t_in − t_coil) = 5/20 = 0.25.
```

```quiz
q: A refrigerator has h₁ = 390, h₂ = 425 and h₄ = 250 kJ/kg. What is its COP?
answer: 4
verify: (390 - 250) / (425 - 390)
explain: COP = (h₁ − h₄)/(h₂ − h₁) = 140/35 = 4.
```

```quiz
q: Air at 30 °C has a vapour pressure of 2.1 kPa and saturation pressure 4.2 kPa. What is its relative humidity?
answer: 0.5
verify: 2.1 / 4.2
explain: φ = p_v/p_sat = 0.5 (50%).
```
