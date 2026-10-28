---
title: Permeability, Seepage and Effective Stress
chapter: Water in Soil
description: Darcy's law, coefficient of permeability and its tests, layered soils, flow nets and seepage, effective stress principle, quick sand condition and critical hydraulic gradient.
---
Water flowing through soil controls seepage under dams, the stability of excavations and the strength of the soil itself through **effective stress**.

## Darcy's law

**v = k i**, **Q = k i A**

- i = hydraulic gradient = head loss/length; k = coefficient of permeability (m/s).
- Typical k: gravel 10⁻² m/s, sand 10⁻⁴, silt 10⁻⁶, clay < 10⁻⁹.
- **Seepage velocity** v_s = v/n (water moves only through the voids).
- **Hazen's formula** for clean sands: k (cm/s) ≈ C D₁₀² (D₁₀ in cm, C ≈ 100).

**Laboratory tests:** constant-head test (coarse soils), **falling-head** test (fine soils): k = (aL/(At)) ln(h₁/h₂). **Field:** pumping-out tests.

## Layered soils

For layers of thickness Hᵢ and permeability kᵢ:

- Flow **parallel** to the layers: **k_h = Σkᵢ Hᵢ/ΣHᵢ** (weighted average; dominated by the most permeable layer).
- Flow **perpendicular**: **k_v = ΣHᵢ/Σ(Hᵢ/kᵢ)** (dominated by the least permeable layer). Always k_h ≥ k_v.

## Flow nets

Under a dam or sheet pile, seepage follows the **Laplace equation**. A flow net of flow lines and equipotential lines (forming curvilinear squares) gives:

**q = k H (N_f/N_d)** per unit length

N_f = number of flow channels, N_d = number of equipotential drops, H = total head loss. For anisotropic soils use k = √(k_h k_v) and transform the scale.

## Effective stress (Terzaghi)

**σ' = σ − u**

Total stress σ is carried by the grains (effective stress σ') and the pore water (u). Strength and compression of soil depend only on σ'.

- **Upward seepage** reduces σ'; downward seepage increases it.
- **Quick sand (boiling):** σ' becomes zero when the upward gradient reaches the **critical hydraulic gradient**:
  **i_c = (G − 1)/(1 + e) = γ'/γ_w** (about 1 for most sands).
- Factor of safety against piping = i_c/i_exit.
- **Capillary rise** above the water table gives negative pore pressure (increases σ').

## Worked example

A sand layer (γ_sat = 20 kN/m³) is 4 m thick with the water table at the surface (γ_w = 10).

- σ = 80 kPa, u = 40 kPa, **σ' = 40 kPa** at the base.

## Practice

```quiz
q: Two layers are 2 m (k = 10⁻⁴ m/s) and 2 m (k = 10⁻⁶ m/s) thick. What is the equivalent vertical permeability in m/s? (Answer in units of 10⁻⁶ m/s, 3 decimal places.)
answer: 1.98
verify: round(4 / (2 / 1e-4 + 2 / 1e-6) / 1e-6, 3)
explain: k_v = 4/(2/10⁻⁴ + 2/10⁻⁶) = 4/(20,000 + 2,000,000) = 1.98 × 10⁻⁶ m/s.
```

```quiz
q: A soil has G = 2.65 and e = 0.65. What is the critical hydraulic gradient?
answer: 1
verify: round((2.65 - 1) / (1 + 0.65), 6)
explain: i_c = (G − 1)/(1 + e) = 1.65/1.65 = 1.
```

```quiz
q: A flow net has 4 flow channels and 12 equipotential drops; the head loss is 6 m and k = 10⁻⁵ m/s. What is the seepage per metre length in m³/s, in units of 10⁻⁵?
answer: 2
verify: round(1e-5 * 6 * 4 / 12 / 1e-5, 6)
explain: q = kH N_f/N_d = 10⁻⁵ × 6 × 4/12 = 2 × 10⁻⁵ m³/s per m.
```

```quiz
q: At the base of a 5 m saturated clay (γ_sat = 18 kN/m³) with the water table at the surface, what is the effective stress in kPa (γ_w = 10)?
answer: 40
verify: 5 * 18 - 5 * 10
explain: σ' = 5 × 18 − 5 × 10 = 90 − 50 = 40 kPa.
```

```quiz
q: Two horizontal layers each 1 m thick have k = 10⁻⁴ and 10⁻⁶ m/s. What is the equivalent horizontal permeability in units of 10⁻⁶ m/s?
answer: 50.5
verify: round((1e-4 * 1 + 1e-6 * 1) / 2 / 1e-6, 6)
explain: k_h = (k₁H₁ + k₂H₂)/(H₁ + H₂) = (101 × 10⁻⁶)/2 = 50.5 × 10⁻⁶ m/s.
```

```quiz
q: Water flows through a sand sample (k = 2 × 10⁻⁴ m/s) under a gradient of 0.5 over an area of 0.1 m². What is the flow rate in units of 10⁻⁵ m³/s?
answer: 1
verify: round(2e-4 * 0.5 * 0.1 / 1e-5, 6)
explain: Q = kiA = 2 × 10⁻⁴ × 0.5 × 0.1 = 10⁻⁵ m³/s.
```
