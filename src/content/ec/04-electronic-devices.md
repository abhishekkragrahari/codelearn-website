---
title: Electronic Devices
chapter: Devices and Circuits
description: GATE EC syllabus for electronic devices, with energy bands, carrier concentration, drift and diffusion, mobility and conductivity, the Einstein relation, P-N junctions, Zener diodes, BJTs, MOS capacitors, MOSFETs, LEDs, photodiodes and solar cells, with solved examples.
---
## Syllabus

Energy bands in intrinsic and extrinsic semiconductors; equilibrium carrier concentration; direct and indirect band-gap semiconductors; carrier transport (diffusion and drift current, mobility and resistivity, generation and recombination, Poisson and continuity equations); P-N junction, Zener diode, BJT, MOS capacitor, MOSFET, LED, photodiode and solar cell.

## Key concepts and formulas

(q = 1.6 × 10⁻¹⁹ C; thermal voltage **V<sub>T</sub> = kT/q ≈ 25.9 mV at 300 K**, often taken as 25 or 26 mV.)

**Carrier concentration.** Mass action law **np = nᵢ²** in equilibrium. In an n-type material with donor density N<sub>D</sub> ≫ nᵢ: n ≈ N<sub>D</sub> and p ≈ nᵢ²/N<sub>D</sub>. For silicon at 300 K, nᵢ ≈ 1.5 × 10¹⁰ cm⁻³ (some books use 10¹⁰), and E<sub>g</sub> ≈ 1.12 eV. Silicon and germanium are **indirect** band-gap; GaAs is **direct**, which is why it emits light efficiently.

**Transport.**

- Drift current density J = q(nμ<sub>n</sub> + pμ<sub>p</sub>)E; **conductivity σ = q(nμ<sub>n</sub> + pμ<sub>p</sub>)**; resistivity ρ = 1/σ.
- Diffusion current J<sub>n</sub> = qD<sub>n</sub> dn/dx.
- **Einstein relation**: D/μ = V<sub>T</sub>.
- Diffusion length L = √(Dτ).

**P-N junction.**

- Built-in potential **V₀ = V<sub>T</sub> ln(N<sub>A</sub>N<sub>D</sub>/nᵢ²)**.
- Depletion width W = √(2ε(V₀ + V<sub>R</sub>)(1/N<sub>A</sub> + 1/N<sub>D</sub>)/q); the depletion region extends mostly into the lightly doped side. Junction capacitance C<sub>j</sub> = εA/W ∝ (V₀ + V<sub>R</sub>)<sup>−1/2</sup> for an abrupt junction.
- Diode equation **I = I<sub>S</sub>(e<sup>V/ηV<sub>T</sub></sup> − 1)**. A 60 mV (at η = 1) increase in forward voltage multiplies the current by about 10. Dynamic resistance r<sub>d</sub> = ηV<sub>T</sub>/I.
- Zener breakdown (heavy doping, below about 5 V) has a negative temperature coefficient; avalanche breakdown (above about 6 V) a positive one.

**BJT.** Active region: emitter-base forward biased, collector-base reverse biased. I<sub>C</sub> = βI<sub>B</sub>, α = β/(1 + β). Early effect: output resistance r<sub>o</sub> = V<sub>A</sub>/I<sub>C</sub>.

**MOS capacitor and MOSFET.**

- Threshold voltage V<sub>T</sub> marks strong inversion. C<sub>ox</sub> = ε<sub>ox</sub>/t<sub>ox</sub>.
- n-MOSFET in **saturation** (V<sub>DS</sub> ≥ V<sub>GS</sub> − V<sub>T</sub>): **I<sub>D</sub> = ½μ<sub>n</sub>C<sub>ox</sub>(W/L)(V<sub>GS</sub> − V<sub>T</sub>)²**; in the **linear** region: I<sub>D</sub> = μ<sub>n</sub>C<sub>ox</sub>(W/L)[(V<sub>GS</sub> − V<sub>T</sub>)V<sub>DS</sub> − V<sub>DS</sub>²/2].
- Transconductance g<sub>m</sub> = 2I<sub>D</sub>/(V<sub>GS</sub> − V<sub>T</sub>) = √(2μ<sub>n</sub>C<sub>ox</sub>(W/L)I<sub>D</sub>).

**Optoelectronics.** An LED emits at wavelength λ = hc/E<sub>g</sub>, i.e. λ (μm) ≈ 1.24/E<sub>g</sub> (eV). A photodiode works in reverse bias; a solar cell in the fourth quadrant (forward voltage, reverse current), with fill factor = P<sub>max</sub>/(V<sub>oc</sub>I<sub>sc</sub>).

## Worked example

Silicon is doped with N<sub>D</sub> = 10¹⁶ cm⁻³ (nᵢ = 1.5 × 10¹⁰ cm⁻³, μ<sub>n</sub> = 1350 cm²/Vs). Find n, p and the resistivity. Find the built-in potential of a junction with N<sub>A</sub> = 10¹⁷ cm⁻³ and N<sub>D</sub> = 10¹⁶ cm⁻³ at V<sub>T</sub> = 25.9 mV, and the saturation current of a MOSFET with μ<sub>n</sub>C<sub>ox</sub> = 200 μA/V², W/L = 10, V<sub>GS</sub> = 1.5 V and V<sub>T</sub> = 0.5 V.

```python
import math

q, ni, ND, mun = 1.6e-19, 1.5e10, 1e16, 1350
n, p = ND, ni ** 2 / ND
rho = 1 / (q * n * mun)
print(f"n = {n:.1e} cm^-3, p = {p:.3e} cm^-3, resistivity = {rho:.4f} ohm cm")
VT, NA = 0.0259, 1e17
print(f"built-in potential = {VT * math.log(NA * ND / ni ** 2):.4f} V")
k, WL, VGS, Vth = 200e-6, 10, 1.5, 0.5
ID = 0.5 * k * WL * (VGS - Vth) ** 2
print(f"ID(sat) = {ID * 1000:.3f} mA, gm = {2 * ID / (VGS - Vth) * 1000:.3f} mA/V")
print(f"LED with Eg = 1.42 eV emits at {1.24 / 1.42:.4f} um")
```
```output
n = 1.0e+16 cm^-3, p = 2.250e+04 cm^-3, resistivity = 0.4630 ohm cm
built-in potential = 0.7543 V
ID(sat) = 1.000 mA, gm = 2.000 mA/V
LED with Eg = 1.42 eV emits at 0.8732 um
```

## Practice questions

```quiz
q: In a silicon sample at equilibrium, nᵢ = 10¹⁰ cm⁻³ and the electron concentration is 10¹⁵ cm⁻³. What is the hole concentration, in cm⁻³? Enter the power of ten (for example, 10⁵ is entered as 5).
answer: 5
verify: round(__import__("math").log10(1e20 / 1e15))
explain: p = nᵢ²/n = 10²⁰/10¹⁵ = 10⁵ cm⁻³, so the answer is 5.
```

```quiz
q: Electron mobility in a semiconductor is 1000 cm²/Vs at a temperature where V<sub>T</sub> = 25 mV. What is the electron diffusion coefficient in cm²/s?
answer: 25
verify: 1000 * 0.025
explain: By the Einstein relation, D = μV<sub>T</sub> = 1000 × 0.025 = 25 cm²/s.
```

```quiz
q: An n-MOSFET has μ<sub>n</sub>C<sub>ox</sub>(W/L) = 2 mA/V² and V<sub>T</sub> = 1 V. What is its drain current (mA) in saturation at V<sub>GS</sub> = 3 V?
answer: 4
verify: 0.5 * 2 * (3 - 1) ** 2
explain: I<sub>D</sub> = ½ × 2 × (3 − 1)² = 4 mA.
```

```quiz
q: A diode carries 1 mA. What is its small-signal resistance in Ω, with η = 1 and V<sub>T</sub> = 25 mV?
answer: 25
verify: 0.025 / 1e-3
explain: r<sub>d</sub> = ηV<sub>T</sub>/I = 25 mV/1 mA = 25 Ω.
```

```quiz
q: Which semiconductor is best suited for making an efficient LED?
- Silicon
- Germanium
* Gallium arsenide
- All are equally suited
explain: GaAs has a direct band gap, so electron-hole recombination emits photons efficiently. Silicon and germanium are indirect band-gap materials.
```
