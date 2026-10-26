---
title: Thermodynamics and Its Applications
chapter: Fluid Mechanics and Thermal Sciences
description: GATE ME syllabus for thermodynamics and applications, with the laws of thermodynamics, ideal gas processes, entropy and availability, Carnot, Otto, Diesel, Brayton and Rankine cycles, refrigeration, psychrometry and turbomachines, with solved examples.
---
## Syllabus

- **Thermodynamics**: systems and processes, properties of pure substances, ideal and real gases, zeroth, first and second laws, work and heat, property tables and charts, availability and irreversibility, thermodynamic relations.
- **Applications**: air and gas compressors, vapour and gas power cycles (regeneration, reheat), IC engines (Otto, Diesel, dual cycles), refrigeration and air-conditioning (vapour and gas cycles, heat pumps, psychrometry), turbomachinery (impulse and reaction, velocity diagrams, Pelton, Francis and Kaplan turbines, steam and gas turbines).

## Key concepts and formulas

**First law.** Closed system: Q − W = ΔU. Steady flow: q − w = Δh + ΔV²/2 + gΔz. For an ideal gas, Δu = c<sub>v</sub>ΔT, Δh = c<sub>p</sub>ΔT, c<sub>p</sub> − c<sub>v</sub> = R, γ = c<sub>p</sub>/c<sub>v</sub>.

| Process | Work (closed system) | Relation |
| --- | --- | --- |
| Isobaric | p(V₂ − V₁) | V/T constant |
| Isothermal | p₁V₁ ln(V₂/V₁) | pV constant |
| Adiabatic, reversible | (p₁V₁ − p₂V₂)/(γ − 1) | pVᵞ constant, TV<sup>γ−1</sup> constant |
| Polytropic | (p₁V₁ − p₂V₂)/(n − 1) | pVⁿ constant |

**Second law and entropy.** Carnot efficiency **η = 1 − T<sub>L</sub>/T<sub>H</sub>**. COP of a Carnot refrigerator T<sub>L</sub>/(T<sub>H</sub> − T<sub>L</sub>) and heat pump T<sub>H</sub>/(T<sub>H</sub> − T<sub>L</sub>), so COP<sub>HP</sub> = COP<sub>R</sub> + 1. Clausius inequality ∮ δQ/T ≤ 0. Entropy change of an ideal gas: Δs = c<sub>p</sub> ln(T₂/T₁) − R ln(p₂/p₁). Availability (exergy) of heat Q at T: Q(1 − T₀/T).

**Air-standard cycles.**

- **Otto**: η = 1 − 1/r<sup>γ−1</sup> (r = compression ratio).
- **Diesel**: η = 1 − (1/r<sup>γ−1</sup>) · (ρᵞ − 1)/(γ(ρ − 1)) (ρ = cut-off ratio). For the same compression ratio, η<sub>Otto</sub> > η<sub>Dual</sub> > η<sub>Diesel</sub>.
- **Brayton**: η = 1 − 1/r<sub>p</sub><sup>(γ−1)/γ</sup> (r<sub>p</sub> = pressure ratio). Maximum net work at r<sub>p</sub> = (T<sub>max</sub>/T<sub>min</sub>)<sup>γ/(2(γ−1))</sup>.
- **Rankine**: η = (turbine work − pump work)/heat added, found from steam tables. Reheat raises dryness at exit; regeneration raises efficiency.

**Refrigeration.** 1 TR = 3.5167 kW (often 3.5 kW). COP = refrigerating effect/work.

**Psychrometry.** Specific humidity ω = 0.622 p<sub>v</sub>/(p − p<sub>v</sub>); relative humidity φ = p<sub>v</sub>/p<sub>sat</sub>.

**Turbomachines.** Specific speed of a turbine N<sub>s</sub> = N√P/H<sup>5/4</sup>; of a pump N<sub>s</sub> = N√Q/H<sup>3/4</sup>. Pelton (impulse) wheels suit high heads and low N<sub>s</sub>; Francis medium; Kaplan low heads and high N<sub>s</sub>. The maximum efficiency of a Pelton wheel occurs at blade speed u = V/2.

## Worked example

Find the efficiency of an Otto cycle with r = 8 and of a Brayton cycle with r<sub>p</sub> = 10 (γ = 1.4), and the COP of a Carnot refrigerator between −10 °C and 30 °C. Then find the work done in compressing 1 kg of air isothermally at 300 K from 1 bar to 5 bar.

```python
import math

g = 1.4
print(f"Otto, r = 8: eta = {1 - 1 / 8 ** (g - 1):.4f}")
print(f"Brayton, rp = 10: eta = {1 - 1 / 10 ** ((g - 1) / g):.4f}")
TL, TH = 263.15, 303.15
cop = TL / (TH - TL)
print(f"Carnot COP_R = {cop:.4f}, COP_HP = {cop + 1:.4f}")
R, T = 0.287, 300
print(f"isothermal work = {R * T * math.log(5):.3f} kJ/kg (done on the gas)")
```
```output
Otto, r = 8: eta = 0.5647
Brayton, rp = 10: eta = 0.4821
Carnot COP_R = 6.5787, COP_HP = 7.5787
isothermal work = 138.573 kJ/kg (done on the gas)
```

## Practice questions

```quiz
q: A Carnot engine works between 800 K and 300 K. What is its efficiency?
answer: 0.625
verify: 1 - 300 / 800
explain: η = 1 − T<sub>L</sub>/T<sub>H</sub> = 1 − 300/800 = 0.625.
```

```quiz
q: What is the air-standard efficiency of an Otto cycle with compression ratio 10 (γ = 1.4)? Give the answer to four decimal places.
answer: 0.6019
verify: round(1 - 1 / 10 ** 0.4, 4)
explain: η = 1 − 1/10<sup>0.4</sup> = 1 − 0.3981 ≈ 0.6019.
```

```quiz
q: A Carnot refrigerator has a COP of 4. What is the COP of a Carnot heat pump working between the same two temperatures?
answer: 5
verify: 4 + 1
explain: COP<sub>HP</sub> = COP<sub>R</sub> + 1 = 5.
```

```quiz
q: A refrigerator removes 7 kW of heat with a COP of 3.5. What is the power input in kW?
answer: 2
verify: 7 / 3.5
explain: Work = refrigerating effect/COP = 7/3.5 = 2 kW.
```

```quiz
q: For the same compression ratio and heat input, which air-standard cycle has the highest efficiency?
* Otto
- Diesel
- Dual
- All are equal
explain: For the same compression ratio, η<sub>Otto</sub> > η<sub>Dual</sub> > η<sub>Diesel</sub>, because the Otto cycle adds all the heat at the highest temperature for that compression.
```
