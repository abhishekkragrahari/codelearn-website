---
title: Electromagnetics
chapter: Electromagnetics
description: GATE EC syllabus for electromagnetics, with Maxwell's equations and boundary conditions, plane waves, intrinsic impedance, skin depth, Poynting vector, polarization, transmission lines (reflection, VSWR, impedance transformation), waveguides, optical fibres and antennas, with solved examples.
---
## Syllabus

Maxwell's equations (differential and integral forms, boundary conditions, wave equation, Poynting vector); plane waves (reflection and refraction, polarization, phase and group velocity, propagation through media, skin depth); transmission lines (equations, characteristic impedance, impedance matching and transformation, S-parameters, Smith chart); rectangular and circular waveguides; light propagation in optical fibres; dipole and monopole antennas; linear antenna arrays.

## Key concepts and formulas

**Maxwell's equations and boundary conditions.** ∇·**D** = ρ, ∇·**B** = 0, ∇ × **E** = −∂**B**/∂t, ∇ × **H** = **J** + ∂**D**/∂t. At an interface: tangential **E** is continuous; normal **D** jumps by the surface charge; tangential **H** jumps by the surface current; normal **B** is continuous.

**Plane waves.**

- Phase velocity v = 1/√(με) = c/√(μ<sub>r</sub>ε<sub>r</sub>); intrinsic impedance η = √(μ/ε), **η₀ ≈ 377 Ω (120π)** in free space.
- Poynting vector **S** = **E** × **H**; average power density |E|²/(2η) for a peak field |E|.
- In a good conductor, the **skin depth δ = √(2/(ωμσ)) = 1/√(πfμσ)**; fields fall by e<sup>−1</sup> over δ.
- Normal incidence on a boundary: reflection coefficient Γ = (η₂ − η₁)/(η₂ + η₁), transmission τ = 2η₂/(η₂ + η₁) = 1 + Γ.
- Polarization: linear, circular (equal amplitudes, 90° phase difference), elliptical. Brewster angle tan θ<sub>B</sub> = √(ε₂/ε₁) (no reflection of parallel polarization).

**Transmission lines.**

- Characteristic impedance Z₀ = √((R + jωL)/(G + jωC)) ≈ √(L/C) for a lossless line.
- Reflection coefficient at the load **Γ<sub>L</sub> = (Z<sub>L</sub> − Z₀)/(Z<sub>L</sub> + Z₀)**; **VSWR = (1 + |Γ|)/(1 − |Γ|)**.
- Input impedance of a lossless line of length l: Z<sub>in</sub> = Z₀(Z<sub>L</sub> + jZ₀ tan βl)/(Z₀ + jZ<sub>L</sub> tan βl).
- A **quarter-wave transformer** gives Z<sub>in</sub> = Z₀²/Z<sub>L</sub>, so a section with Z₀ = √(Z<sub>in</sub>Z<sub>L</sub>) matches two resistances. A half-wave line repeats the load impedance. A short-circuited stub of length λ/4 looks like an open circuit.
- Return loss = −20 log₁₀|Γ| dB.

**Waveguides.** Rectangular guide (a > b): cut-off frequency f<sub>c,mn</sub> = (c/2)√((m/a)² + (n/b)²); the dominant mode is **TE₁₀ with f<sub>c</sub> = c/(2a)**. Guide wavelength λ<sub>g</sub> = λ/√(1 − (f<sub>c</sub>/f)²). Below cut-off, the mode does not propagate.

**Optical fibre.** Numerical aperture NA = √(n₁² − n₂²) = sin of the acceptance angle (in air). Number of modes V = (2πa/λ)NA; single mode if V < 2.405.

**Antennas.** Half-wave dipole: radiation resistance about 73 Ω, directivity 1.64 (2.15 dBi). Quarter-wave monopole over a ground plane: about 36.5 Ω. Hertzian dipole: R<sub>rad</sub> = 80π²(dl/λ)². **Friis equation**: P<sub>r</sub> = P<sub>t</sub>G<sub>t</sub>G<sub>r</sub>(λ/(4πd))². A uniform linear array of N elements has its main beam where the progressive phase cancels the path difference.

## Worked example

A 50 Ω line feeds a 100 Ω load: find Γ, the VSWR and the quarter-wave transformer impedance for matching. Find the skin depth of copper (σ = 5.8 × 10⁷ S/m) at 1 MHz, the TE₁₀ cut-off of a guide with a = 2.286 cm, and the numerical aperture of a fibre with n₁ = 1.48 and n₂ = 1.46.

```python
import math

Z0, ZL = 50, 100
G = (ZL - Z0) / (ZL + Z0)
print(f"Gamma = {G:.4f}, VSWR = {(1 + abs(G)) / (1 - abs(G)):.2f}, quarter-wave Z = {math.sqrt(Z0 * ZL):.2f} ohm")
mu0, sigma, f = 4 * math.pi * 1e-7, 5.8e7, 1e6
print(f"skin depth of copper at 1 MHz = {1 / math.sqrt(math.pi * f * mu0 * sigma) * 1e6:.2f} um")
c, a = 3e8, 2.286e-2
print(f"TE10 cut-off = {c / (2 * a) / 1e9:.3f} GHz")
print(f"NA = {math.sqrt(1.48 ** 2 - 1.46 ** 2):.4f}")
```
```output
Gamma = 0.3333, VSWR = 2.00, quarter-wave Z = 70.71 ohm
skin depth of copper at 1 MHz = 66.09 um
TE10 cut-off = 6.562 GHz
NA = 0.2425
```

## Practice questions

```quiz
q: A 75 Ω line is terminated in a 25 Ω load. What is the VSWR?
answer: 3
verify: round((1 + abs((25 - 75) / (25 + 75))) / (1 - abs((25 - 75) / (25 + 75))), 6)
explain: Γ = (25 − 75)/(25 + 75) = −0.5, so VSWR = (1 + 0.5)/(1 − 0.5) = 3.
```

```quiz
q: What characteristic impedance (Ω) must a quarter-wave section have to match a 100 Ω load to a 25 Ω line?
answer: 50
verify: (100 * 25) ** 0.5
explain: Z = √(Z<sub>in</sub>Z<sub>L</sub>) = √(25 × 100) = 50 Ω.
```

```quiz
q: A rectangular waveguide has a = 3 cm. What is the cut-off frequency of its TE₁₀ mode, in GHz?
answer: 5
verify: round(3e8 / (2 * 0.03) / 1e9, 6)
explain: f<sub>c</sub> = c/(2a) = 3 × 10⁸/0.06 = 5 GHz.
```

```quiz
q: A plane wave travels in a lossless medium with μ<sub>r</sub> = 1 and ε<sub>r</sub> = 4. What is its intrinsic impedance in Ω? (Use η₀ = 120π.) Give the answer to two decimal places.
answer: 188.5
verify: round(120 * __import__("math").pi / 2, 2)
explain: η = η₀√(μ<sub>r</sub>/ε<sub>r</sub>) = 120π/2 = 60π ≈ 188.50 Ω.
```

```quiz
q: The frequency of a wave incident on a good conductor is quadrupled. By what factor does the skin depth change?
answer: 0.5
verify: 1 / 4 ** 0.5
explain: δ ∝ 1/√f, so quadrupling f halves the skin depth: factor 0.5.
```
