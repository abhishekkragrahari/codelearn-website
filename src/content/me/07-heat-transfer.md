---
title: Heat Transfer
chapter: Fluid Mechanics and Thermal Sciences
description: GATE ME syllabus for heat transfer, with conduction and thermal resistance, critical insulation radius, fins, lumped capacitance and Biot number, convection correlations, radiation and shape factors, and heat exchangers by LMTD and NTU, with solved examples.
---
## Syllabus

Modes of heat transfer; one-dimensional heat conduction, resistance concept and electrical analogy, heat transfer through fins; unsteady conduction, lumped parameter system, Heisler's charts; thermal boundary layer, dimensionless parameters in free and forced convection, correlations; radiative heat transfer, black and grey surfaces, shape factors, network analysis; heat exchanger performance, LMTD and NTU methods.

## Key concepts and formulas

**Conduction.** Fourier's law q = −kA dT/dx. Thermal resistances (heat flow = ΔT/ΣR):

| Geometry | Resistance |
| --- | --- |
| Plane wall | L/(kA) |
| Cylinder (length L) | ln(r₂/r₁)/(2πkL) |
| Sphere | (r₂ − r₁)/(4πk r₁r₂) |
| Convection | 1/(hA) |

**Critical radius of insulation:** r<sub>c</sub> = k/h for a cylinder and 2k/h for a sphere. Adding insulation to a pipe of radius below r<sub>c</sub> **increases** heat loss until the outer radius reaches r<sub>c</sub>.

**Fins.** m = √(hP/(kA<sub>c</sub>)). A long fin loses q = √(hPkA<sub>c</sub>) θ<sub>b</sub>; a fin with an insulated tip loses √(hPkA<sub>c</sub>) θ<sub>b</sub> tanh(mL). Fin efficiency for the insulated tip is tanh(mL)/(mL).

**Unsteady conduction.** If the Biot number **Bi = hL<sub>c</sub>/k < 0.1** (L<sub>c</sub> = V/A), the lumped model applies: (T − T<sub>∞</sub>)/(T<sub>i</sub> − T<sub>∞</sub>) = e<sup>−t/τ</sup>, with time constant τ = ρVc/(hA). For a sphere, L<sub>c</sub> = r/3; for a long cylinder, r/2.

**Convection.** Newton's law q = hA(T<sub>s</sub> − T<sub>∞</sub>). Nusselt number Nu = hL/k; Prandtl number Pr = ν/α; Grashof number for free convection. Laminar flat plate: Nu<sub>x</sub> = 0.332 Re<sub>x</sub><sup>1/2</sup>Pr<sup>1/3</sup>. Turbulent pipe flow (Dittus-Boelter): Nu = 0.023 Re<sup>0.8</sup>Prⁿ (n = 0.4 heating, 0.3 cooling). Fully developed laminar pipe flow: Nu = 3.66 (constant wall temperature) and 4.36 (constant heat flux).

**Radiation.** Stefan-Boltzmann: E<sub>b</sub> = σT⁴ with **σ = 5.67 × 10⁻⁸ W/m²K⁴**. Wien's law λ<sub>max</sub>T = 2898 μm K. Shape factor reciprocity A₁F₁₂ = A₂F₂₁ and summation ΣF = 1. Two large parallel grey plates: q/A = σ(T₁⁴ − T₂⁴)/(1/ε₁ + 1/ε₂ − 1). A radiation shield with the same emissivity halves the exchange between two plates.

**Heat exchangers.** Q = UA ΔT<sub>lm</sub>, with **LMTD = (ΔT₁ − ΔT₂)/ln(ΔT₁/ΔT₂)**. Counterflow gives a larger LMTD than parallel flow for the same end temperatures. NTU = UA/C<sub>min</sub>; effectiveness ε = Q/Q<sub>max</sub> with Q<sub>max</sub> = C<sub>min</sub>(T<sub>h,in</sub> − T<sub>c,in</sub>).

## Worked example

A furnace wall has 200 mm of firebrick (k = 1.2 W/mK) and 100 mm of insulating brick (k = 0.15 W/mK), with inside and outside surface temperatures of 900 °C and 50 °C. Find the heat flux. Then find the LMTD of a counterflow exchanger where hot fluid cools from 150 to 90 °C and cold fluid heats from 30 to 70 °C, and the critical radius for k = 0.1 W/mK and h = 10 W/m²K.

```python
import math

R = 0.2 / 1.2 + 0.1 / 0.15
q = (900 - 50) / R
print(f"total resistance = {R:.4f} m2K/W, heat flux = {q:.2f} W/m2")
dT1, dT2 = 150 - 70, 90 - 30
print(f"counterflow LMTD = {(dT1 - dT2) / math.log(dT1 / dT2):.3f} K")
print(f"critical radius = {0.1 / 10 * 1000:.0f} mm")
sigma = 5.67e-8
print(f"black body at 1000 K emits {sigma * 1000 ** 4 / 1000:.2f} kW/m2")
```
```output
total resistance = 0.8333 m2K/W, heat flux = 1020.00 W/m2
counterflow LMTD = 69.521 K
critical radius = 10 mm
black body at 1000 K emits 56.70 kW/m2
```

## Practice questions

```quiz
q: A plane wall 0.2 m thick with k = 0.8 W/mK has faces at 100 °C and 20 °C. What is the heat flux in W/m²?
answer: 320
verify: 0.8 * (100 - 20) / 0.2
explain: q = kΔT/L = 0.8 × 80/0.2 = 320 W/m².
```

```quiz
q: What is the critical radius of insulation (in mm) for a pipe covered with insulation of k = 0.05 W/mK, if the outside heat transfer coefficient is 5 W/m²K?
answer: 10
verify: 0.05 / 5 * 1000
explain: r<sub>c</sub> = k/h = 0.05/5 = 0.01 m = 10 mm.
```

```quiz
q: A steel ball of radius 5 mm (k = 40 W/mK) is cooled in air with h = 20 W/m²K. What is its Biot number, based on L<sub>c</sub> = V/A? Give the answer to five decimal places.
answer: 0.00083
verify: round(20 * (0.005 / 3) / 40, 5)
explain: L<sub>c</sub> = r/3 = 0.001667 m, so Bi = 20 × 0.001667/40 ≈ 0.00083, far below 0.1: the lumped model applies.
```

```quiz
q: In a heat exchanger, the temperature differences at the two ends are 60 K and 20 K. What is the LMTD in K? Give the answer to two decimal places.
answer: 36.41
verify: round((60 - 20) / __import__("math").log(60 / 20), 2)
explain: LMTD = (60 − 20)/ln(3) = 40/1.0986 ≈ 36.41 K.
```

```quiz
q: The absolute temperature of a black body is doubled. By what factor does its emissive power increase?
answer: 16
verify: 2 ** 4
explain: E<sub>b</sub> = σT⁴, so doubling T multiplies the emissive power by 2⁴ = 16.
```
