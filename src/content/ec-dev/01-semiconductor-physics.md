---
title: Semiconductor Physics: Carriers, Drift and Diffusion
chapter: Semiconductor Basics
description: Energy bands, intrinsic and extrinsic semiconductors, Fermi level, carrier concentrations and mass-action law, mobility, drift and diffusion currents, Einstein relation, generation and recombination.
---
Every electronic device is built on how electrons and holes behave in a semiconductor. This lesson covers the carrier physics that GATE EC tests directly.

## Energy bands

- **Band gap** E_g: about 1.12 eV for Si, 0.66 eV for Ge, 1.42 eV for GaAs (at 300 K).
- **Intrinsic** semiconductor: n = p = n_i (about 1.5 × 10¹⁰ cm⁻³ for Si at 300 K; 10¹⁰ is often used in problems). n_i rises steeply with temperature: n_i² ∝ T³ e^(−E_g/kT).
- **Extrinsic:** donors (P, As) give an **n-type** material; acceptors (B) give **p-type**.
- **Direct band gap** (GaAs) materials emit light efficiently (LEDs, lasers); **indirect** (Si) do not.

## Carrier concentrations

- **Mass-action law: n p = n_i²** (in equilibrium).
- n-type with N_D ≫ n_i: n ≈ N_D, p = n_i²/N_D.
- **Fermi level** position: n = n_i e^((E_F − E_i)/kT), so E_F − E_i = kT ln(n/n_i). In n-type material E_F moves towards the conduction band.
- **Thermal voltage** V_T = kT/q ≈ 25.9 mV at 300 K.

## Current flow

- **Drift:** carriers pushed by a field: J = q(nμ_n + pμ_p)E.
- **Conductivity** σ = q(nμ_n + pμ_p); resistivity ρ = 1/σ.
- Mobility μ falls with doping (impurity scattering) and with temperature (lattice scattering). For Si, μ_n ≈ 1350 and μ_p ≈ 480 cm²/V·s (lightly doped), so electrons move faster.
- **Diffusion:** carriers move from high to low concentration: J_n = qD_n dn/dx, J_p = −qD_p dp/dx.
- **Einstein relation:** **D/μ = kT/q = V_T**.

## Generation, recombination and the Hall effect

- Excess carriers decay with **lifetime** τ; **diffusion length** L = √(Dτ).
- **Continuity equation** combines drift, diffusion, generation and recombination.
- **Hall effect:** a current across a magnetic field creates a transverse voltage V_H = BI/(qnt). Its sign shows the carrier type; it measures concentration and mobility.

## Worked example

Si doped with N_D = 10¹⁶ cm⁻³, μ_n = 1350 cm²/V·s, n_i = 10¹⁰ cm⁻³.

- n = 10¹⁶, p = 10²⁰/10¹⁶ = **10⁴ cm⁻³**.
- σ = 1.6 × 10⁻¹⁹ × 10¹⁶ × 1350 = 2.16 S/cm; **ρ = 0.463 Ω·cm**.

## Practice

```quiz
q: A semiconductor has μ_n = 1300 cm²/V·s at 300 K (V_T = 0.026 V). What is the electron diffusion coefficient in cm²/s?
answer: 33.8
verify: round(1300 * 0.026, 6)
explain: D = μV_T = 1300 × 0.026 = 33.8 cm²/s.
```

```quiz
q: For n = 10¹⁶ cm⁻³ and n_i = 10¹⁰ cm⁻³ (kT = 0.0259 eV), how far (eV) is E_F above E_i? (Give 3 decimal places.)
answer: 0.358
verify: round(0.0259 * __import__("math").log(1e6), 3)
explain: E_F − E_i = kT ln(n/n_i) = 0.0259 × ln 10⁶ = 0.0259 × 13.82 = 0.358 eV.
```

```quiz
q: In the worked example, what is the resistivity in Ω·cm? (Give 3 decimal places.)
answer: 0.463
verify: round(1 / (1.6e-19 * 1e16 * 1350), 3)
explain: ρ = 1/(qnμ_n) = 1/2.16 = 0.463 Ω·cm.
```

```quiz
q: Which material is best suited for an LED?
* GaAs (direct band gap)
- Silicon (indirect band gap)
- Germanium (indirect band gap)
- Any metal
explain: In a direct-gap material, electrons and holes recombine by emitting photons efficiently.
```
