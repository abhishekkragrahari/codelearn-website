---
title: Stress, Strain and Elastic Constants
chapter: Stress and Strain
description: Normal and shear stress, strain, Hooke's law, the stress-strain curve, elastic constants E, G, K and Poisson's ratio, bars of varying section, composite bars and thermal stress.
---
Strength of materials starts with two ideas: **stress** (internal force per unit area) and **strain** (deformation per unit length). Hooke's law links them while the material stays elastic.

## Stress and strain

- Normal stress σ = P/A (tensile positive). Shear stress τ = V/A.
- Normal strain ε = δL/L (no units). Shear strain γ = change in a right angle, in radians.
- **Hooke's law:** σ = Eε and τ = Gγ, where E is Young's modulus and G the shear (rigidity) modulus.
- Elongation of a bar: **δ = PL/(AE)**.

## The stress–strain curve (mild steel)

In a tension test, the curve shows the proportional limit, the elastic limit, the upper and lower **yield points**, strain hardening up to the **ultimate tensile strength**, then necking and fracture. Ductile materials show large plastic strain before breaking; brittle ones (cast iron, glass) break with little strain.

## Elastic constants

- **Poisson's ratio** ν = −(lateral strain)/(longitudinal strain); for metals about 0.25–0.33, and at most 0.5.
- Bulk modulus K = (hydrostatic stress)/(volumetric strain).
- **E = 2G(1 + ν) = 3K(1 − 2ν)**, and E = 9KG/(3K + G).
- Volumetric strain of a bar under axial stress: ε_v = ε(1 − 2ν). Of a body under equal stress σ on all sides: ε_v = 3σ(1 − 2ν)/E.

## Bars in series and parallel

- **Stepped bar (series):** same load in each part; δ = Σ PLᵢ/(AᵢEᵢ).
- **Tapered bar** (circular, diameters d₁ to d₂): δ = 4PL/(πEd₁d₂).
- **Bar under its own weight:** δ = ρgL²/(2E) = WL/(2AE), half that of the same load at the end.
- **Composite bar (parallel):** both parts stretch equally; P = P₁ + P₂ and P₁L/(A₁E₁) = P₂L/(A₂E₂).

## Thermal stress

A bar free to expand grows by δ = αLΔT with no stress. If it is **fully restrained**, the stress is

**σ = EαΔT** (compressive on heating).

If the support yields by a gap Δ, then σ = E(αLΔT − Δ)/L.

## Worked example

A steel bar (E = 200 GPa) has two parts: 1 m with area 400 mm² and 0.5 m with area 200 mm². It carries 40 kN. Find the total elongation.

- Part 1: 40000 × 1000 / (400 × 200000) = 0.5 mm.
- Part 2: 40000 × 500 / (200 × 200000) = 0.5 mm.
- Total **δ = 1.0 mm**.

## Practice

```quiz
q: A material has E = 210 GPa and G = 80 GPa. What is its Poisson's ratio? (Give 4 decimal places.)
answer: 0.3125
verify: round(210 / (2 * 80) - 1, 4)
explain: ν = E/(2G) − 1 = 210/160 − 1 = 0.3125.
```

```quiz
q: A steel rail (E = 200 GPa, α = 11 × 10⁻⁶ /°C) is fully restrained and heated by 30 °C. What is the thermal stress in MPa?
answer: 66
verify: round(200e3 * 11e-6 * 30, 6)
explain: σ = EαΔT = 200000 × 11 × 10⁻⁶ × 30 = 66 MPa (compression).
```

```quiz
q: A bar 2 m long, area 100 mm², E = 100 GPa, carries 10 kN. What is its elongation in mm?
answer: 2
verify: 10e3 * 2000 / (100 * 100e3)
explain: δ = PL/(AE) = 10⁴ × 2000/(100 × 10⁵) = 2 mm.
```

```quiz
q: What is the maximum possible value of Poisson's ratio for an isotropic elastic material?
answer: 0.5
verify: 0.5
explain: K = E/(3(1 − 2ν)) must stay positive, so ν < 0.5. At ν = 0.5 the material is incompressible.
```

```quiz
q: A bar hanging under its own weight W stretches by how much compared with the same bar carrying a load W at its free end?
- The same
* Half
- Twice
- One quarter
explain: Self-weight gives δ = WL/(2AE), half of WL/(AE).
```
