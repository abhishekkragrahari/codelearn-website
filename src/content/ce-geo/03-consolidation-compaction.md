---
title: Compaction, Stress Distribution and Consolidation
chapter: Compressibility
description: Proctor compaction and OMC, Boussinesq and Westergaard stress distribution, 2:1 method, one-dimensional consolidation settlement, Terzaghi's theory, time factor and coefficient of consolidation.
---
When a soil is loaded it compresses. **Compaction** removes air quickly by mechanical effort; **consolidation** squeezes water out slowly under sustained load. Between them sits the question of how much stress actually reaches each depth.

## Compaction

- **Standard Proctor** test: 2.6 kg rammer, 310 mm drop, 3 layers × 25 blows. Modified Proctor uses more energy (4.9 kg, 450 mm, 5 layers).
- Dry density rises with water content up to the **optimum moisture content (OMC)**, giving the **maximum dry density**, then falls.
- More compactive effort → higher maximum dry density and **lower OMC**.
- **Zero air voids line:** γ_d = Gγ_w/(1 + wG), the upper limit for any compaction curve.
- Field control: sand replacement or core cutter tests; relative compaction = field γ_d/lab max γ_d.

## Stress distribution

- **Boussinesq** (point load Q, depth z, radial distance r): σ_z = (3Q/(2πz²)) × [1/(1 + (r/z)²)]^(5/2). Directly below the load: **σ_z = 0.4775 Q/z²**.
- **Westergaard** (layered soils): directly below, σ_z = 0.3183 Q/z².
- **2:1 method:** the load spreads at 2 vertical to 1 horizontal: σ_z = Q/((B + z)(L + z)).
- **Pressure bulb:** the 0.1q contour reaches about 2B below a square footing.

## Consolidation settlement

**Normally consolidated** clay (present stress is the highest it has ever had):

**S = (C_c H/(1 + e₀)) log₁₀((σ'₀ + Δσ)/σ'₀)**

Alternatively, S = m_v Δσ H, with m_v = a_v/(1 + e₀). The **over-consolidation ratio** OCR = σ'_c/σ'₀; over-consolidated clays compress far less (use the recompression index C_r).

Empirical: **C_c = 0.009(LL − 10)** (Skempton, undisturbed clays).

## Rate of consolidation (Terzaghi)

- **Time factor T_v = c_v t/d²**, with d = drainage path: H/2 for **double drainage**, H for single drainage.
- For U < 60%: **T_v = (π/4)U²**. For U = 50%, T_v = 0.197; for U = 90%, T_v = 0.848.
- Time for the same degree of consolidation scales with d²: double drainage is 4 times faster than single drainage.
- **Secondary compression** (creep) continues after primary consolidation ends.

## Worked example

A 4 m clay layer (C_c = 0.3, e₀ = 1.0) has σ'₀ = 100 kPa at mid-depth and gets Δσ = 100 kPa.

- S = 0.3 × 4/2 × log₁₀(2) = 0.6 × 0.301 = **0.181 m**.

## Practice

```quiz
q: A clay has LL = 50%. What is its compression index by Skempton's relation?
answer: 0.36
verify: round(0.009 * (50 - 10), 6)
explain: C_c = 0.009(LL − 10) = 0.009 × 40 = 0.36.
```

```quiz
q: A point load of 100 kN acts on the surface. What is the vertical stress 2 m directly below it by Boussinesq, in kPa? (Give 2 decimal places.)
answer: 11.94
verify: round(3 * 100 / (2 * __import__("math").pi * 2 ** 2), 2)
explain: σ_z = 0.4775Q/z² = 47.75/4 = 11.94 kPa.
```

```quiz
q: A clay layer takes 4 years to reach 50% consolidation with single drainage. How many years would it take with double drainage?
answer: 1
verify: 4 / 2 ** 2
explain: t ∝ d²; double drainage halves d, so t falls by 4: 1 year.
```

```quiz
q: What is the time factor for 40% average consolidation? (Give 3 decimal places.)
answer: 0.126
verify: round(__import__("math").pi / 4 * 0.4 ** 2, 3)
explain: T_v = (π/4)U² = 0.7854 × 0.16 = 0.126.
```

```quiz
q: Increasing the compactive effort on a soil:
* Increases the maximum dry density and lowers the OMC
- Lowers both the maximum dry density and the OMC
- Raises both the maximum dry density and the OMC
- Has no effect
explain: More energy packs particles closer with less water: the curve moves up and to the left.
```

```quiz
q: A 6 m clay layer is drained at top and bottom. c_v = 3 m²/year. How many years for 50% consolidation (T_v = 0.197)? (Give 3 decimal places.)
answer: 0.591
verify: round(0.197 * 3 ** 2 / 3, 3)
explain: d = H/2 = 3 m; t = T_v d²/c_v = 0.197 × 9/3 = 0.591 years.
```

```quiz
q: A soil compacted at OMC has γ_d = 18 kN/m³ in the field; the lab maximum is 19 kN/m³. What is the relative compaction in percent? (Give 2 decimal places.)
answer: 94.74
verify: round(18 / 19 * 100, 2)
explain: RC = 18/19 × 100 = 94.74%.
```
