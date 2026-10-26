---
title: Geotechnical Engineering
chapter: Geotechnical Engineering
description: GATE CE syllabus for soil mechanics and foundation engineering, with phase relationships, permeability and flow nets, effective stress, consolidation, shear strength, earth pressure, bearing capacity and stress distribution, with solved examples.
---
## Syllabus

- **Soil mechanics**: origin of soils, three-phase system, index properties, classification, permeability, seepage and flow nets, effective stress, compaction, consolidation, shear strength.
- **Foundation engineering**: sub-surface investigation, earth pressure theories, slope stability, stress distribution, bearing capacity, settlement, pile foundations.

## Key concepts and formulas

**Phase relationships** (e void ratio, n porosity, w water content, G specific gravity, S degree of saturation):

- n = e/(1 + e), and **wG = Se**
- Dry unit weight γ<sub>d</sub> = Gγ<sub>w</sub>/(1 + e); bulk unit weight γ = (G + Se)γ<sub>w</sub>/(1 + e); γ<sub>d</sub> = γ/(1 + w)
- Relative density D<sub>r</sub> = (e<sub>max</sub> − e)/(e<sub>max</sub> − e<sub>min</sub>)
- Plasticity index PI = LL − PL

**Permeability and seepage.** Darcy's law v = ki. Flow through a flow net: **q = kHN<sub>f</sub>/N<sub>d</sub>** per unit width. Critical hydraulic gradient **i<sub>c</sub> = (G − 1)/(1 + e)**, at which quick sand occurs.

**Effective stress:** σ′ = σ − u. Below the water table, σ′ = γ′z with submerged unit weight γ′ = γ<sub>sat</sub> − γ<sub>w</sub>.

**Consolidation.**

- Settlement of a normally consolidated clay: **S = C<sub>c</sub>H/(1 + e<sub>0</sub>) · log₁₀(σ′<sub>f</sub>/σ′<sub>0</sub>)**
- Time factor T<sub>v</sub> = c<sub>v</sub>t/d², where d is the drainage path (half the layer thickness for double drainage). For U < 60%, T<sub>v</sub> = (π/4)U².

**Shear strength:** τ = c + σ′ tan φ (Mohr-Coulomb). In a triaxial test, σ₁ = σ₃ tan²(45° + φ/2) + 2c tan(45° + φ/2).

**Earth pressure (Rankine).** K<sub>a</sub> = (1 − sin φ)/(1 + sin φ), K<sub>p</sub> = 1/K<sub>a</sub>. Active thrust on a smooth vertical wall of height H in dry cohesionless soil: P<sub>a</sub> = ½K<sub>a</sub>γH², acting at H/3 from the base.

**Bearing capacity (Terzaghi).** Strip footing: q<sub>u</sub> = cN<sub>c</sub> + qN<sub>q</sub> + 0.5γBN<sub>γ</sub>. Square: 1.3cN<sub>c</sub> + qN<sub>q</sub> + 0.4γBN<sub>γ</sub>. Circular: 1.3cN<sub>c</sub> + qN<sub>q</sub> + 0.3γBN<sub>γ</sub>. For a purely cohesive soil (φ = 0), N<sub>c</sub> = 5.7, N<sub>q</sub> = 1, N<sub>γ</sub> = 0.

**Stress distribution (Boussinesq).** Under a point load Q, directly below it at depth z: **σ<sub>z</sub> = 3Q/(2πz²) ≈ 0.4775Q/z²**.

**Slopes.** Infinite slope in dry cohesionless soil: FS = tan φ/tan β.

## Worked example

A soil sample has G = 2.7, w = 18% and S = 90%. Find e, n, the dry and bulk unit weights, and the critical hydraulic gradient. Then find the consolidation settlement of a 4 m clay layer with C<sub>c</sub> = 0.3, e<sub>0</sub> = 0.9, when the effective stress rises from 100 to 160 kPa.

```python
import math

G, w, S, gw = 2.7, 0.18, 0.90, 9.81
e = w * G / S
print(f"e = {e:.3f}, n = {e / (1 + e):.3f}")
print(f"gamma_d = {G * gw / (1 + e):.3f} kN/m3, gamma = {(G + S * e) * gw / (1 + e):.3f} kN/m3")
print(f"i_c = {(G - 1) / (1 + e):.3f}")

Cc, H, e0 = 0.3, 4.0, 0.9
s = Cc * H / (1 + e0) * math.log10(160 / 100)
print(f"settlement = {s * 1000:.1f} mm")
ka = (1 - math.sin(math.radians(30))) / (1 + math.sin(math.radians(30)))
print(f"Ka(30 deg) = {ka:.4f}, Pa for H = 5 m, gamma = 18: {0.5 * ka * 18 * 25:.1f} kN/m")
```
```output
e = 0.540, n = 0.351
gamma_d = 17.199 kN/m3, gamma = 20.295 kN/m3
i_c = 1.104
settlement = 128.9 mm
Ka(30 deg) = 0.3333, Pa for H = 5 m, gamma = 18: 75.0 kN/m
```

## Practice questions

```quiz
q: A saturated soil has water content 30% and G = 2.65. What is its void ratio?
answer: 0.795
verify: round(0.30 * 2.65 / 1.0, 4)
explain: For a saturated soil S = 1, so e = wG = 0.30 × 2.65 = 0.795.
```

```quiz
q: A flow net has 4 flow channels and 12 equipotential drops. The head loss is 6 m and k = 10⁻⁵ m/s. What is the seepage per metre width, in m³/s per m? Give the answer in units of 10⁻⁵ (so a value of 2 × 10⁻⁵ is entered as 2).
answer: 2
verify: 6 * 4 / 12
explain: q = kHN<sub>f</sub>/N<sub>d</sub> = 10⁻⁵ × 6 × 4/12 = 2 × 10⁻⁵ m³/s per m.
```

```quiz
q: What is Rankine's coefficient of passive earth pressure for φ = 30°?
answer: 3
verify: round((1 + __import__("math").sin(__import__("math").radians(30))) / (1 - __import__("math").sin(__import__("math").radians(30))), 4)
explain: K<sub>p</sub> = (1 + sin 30°)/(1 − sin 30°) = 1.5/0.5 = 3.
```

```quiz
q: A point load of 100 kN acts on the ground surface. What is the vertical stress (kPa) at a depth of 2 m directly below it, by Boussinesq's equation? Give the answer to two decimal places.
answer: 11.94
verify: round(3 * 100 / (2 * __import__("math").pi * 2 ** 2), 2)
explain: σ<sub>z</sub> = 3Q/(2πz²) = 300/(2π × 4) ≈ 11.94 kPa.
```

```quiz
q: For U < 60%, T<sub>v</sub> = (π/4)U². A clay layer reaches 50% consolidation in 2 years. How long (years) does it take to reach 30%?
answer: 0.72
verify: round(2 * (0.3 / 0.5) ** 2, 4)
explain: t ∝ T<sub>v</sub> ∝ U², so t₃₀ = 2 × (0.3/0.5)² = 0.72 years.
```
