---
title: Shallow and Deep Foundations
chapter: Foundations
description: Terzaghi's bearing capacity equation and factors, effect of water table, settlement limits, plate load test, pile capacity by static formulas, pile groups and efficiency, and subsurface exploration.
---
A foundation must not fail in shear (bearing capacity) and must not settle too much. Shallow footings spread the load near the surface; piles carry it deeper.

## Bearing capacity (Terzaghi)

For a strip footing of width B at depth D_f:

**q_u = c N_c + γ D_f N_q + 0.5 γ B N_γ**

- Square footing: q_u = 1.3cN_c + γD_fN_q + 0.4γBN_γ. Circular: 1.3cN_c + γD_fN_q + 0.3γBN_γ.
- Bearing capacity factors grow quickly with φ. For **φ = 0** (saturated clay, undrained): N_c = 5.7 (Terzaghi), N_q = 1, N_γ = 0; so q_u = 5.7 c_u + γD_f for a strip. (Skempton uses N_c = 5.14 for a strip and 6.2 for a square at the surface.)
- **Net ultimate** q_nu = q_u − γD_f; **net safe** q_ns = q_nu/FS (FS usually 3); **safe** = q_ns + γD_f.
- **Water table:** at or above the base, use γ' in the N_γ term (that term roughly halves). At the surface, use γ' in both terms.
- **General shear** failure in dense soils; **local shear** in loose soils (use reduced c and φ: c' = 2c/3, tan φ' = (2/3) tan φ).

## Settlement

Total settlement = immediate (elastic) + consolidation + secondary. Allowable values (IS 1904) are about 25 mm (isolated footings on sand) to 65–100 mm (rafts, clay).

**Plate load test:** settlement of the footing on sand from the plate settlement: S_f = S_p [B_f(B_p + 0.3)/(B_p(B_f + 0.3))]².

## Piles

- **Static formula:** Q_u = Q_b + Q_s = q_b A_b + Σ f_s A_s.
  - Clay: Q_b = 9 c_u A_b; skin friction f_s = α c_u (adhesion factor α).
  - Sand: Q_b = σ'_v N_q A_b; f_s = K σ'_v tan δ.
- **Dynamic formulas** (Engineering News): Q_a = W h/(6(s + C)) with s = set per blow.
- **Negative skin friction:** soft soil settling around a pile drags it down.
- **Pile groups:** efficiency η = group capacity/(n × single pile capacity). **Converse–Labarre:** η = 1 − (θ/90)[(n−1)m + (m−1)n]/(mn), θ = tan⁻¹(d/s). In clay, the group capacity is the smaller of n × single and block failure.

## Site investigation

- **SPT** (standard penetration test): N-value = blows for 300 mm penetration; corrected for overburden and dilatancy (for N > 15 in fine sands below water: N' = 15 + (N − 15)/2).
- Cone penetration test, boring, sampling. **Area ratio** of a sampler A_r = (D_o² − D_i²)/D_i² should be under 10–20% for undisturbed samples.

## Worked example

A strip footing on saturated clay (c_u = 50 kPa, φ = 0) at D_f = 1 m, γ = 18 kN/m³.

- q_u = 5.7 × 50 + 18 × 1 × 1 = 285 + 18 = **303 kPa**; q_nu = 285 kPa; with FS 3, q_ns = 95 kPa.

## Practice

```quiz
q: A sampler has outer diameter 75 mm and inner diameter 70 mm. What is its area ratio in percent? (Give 2 decimal places.)
answer: 14.8
verify: round((75 ** 2 - 70 ** 2) / 70 ** 2 * 100, 2)
explain: A_r = (75² − 70²)/70² × 100 = 725/4900 × 100 = 14.80%.
```

```quiz
q: A pile in clay (c_u = 40 kPa) has a base area of 0.1 m². What is its end bearing capacity in kN?
answer: 36
verify: round(9 * 40 * 0.1, 6)
explain: Q_b = 9c_u A_b = 9 × 40 × 0.1 = 36 kN.
```

```quiz
q: An SPT in fine sand below the water table gives N = 25. What is the dilatancy-corrected value?
answer: 20
verify: 15 + (25 - 15) / 2
explain: N' = 15 + (N − 15)/2 = 15 + 5 = 20.
```

```quiz
q: If the water table rises from great depth to the base of a strip footing on sand, the N_γ term of bearing capacity becomes roughly:
* Half
- Double
- Unchanged
- Zero
explain: γ is replaced by γ' ≈ γ/2 in the N_γ term.
```

```quiz
q: A square footing on clay (c_u = 40 kPa, φ = 0) is at the surface. Using q_u = 1.3cN_c with N_c = 5.7, what is q_u in kPa?
answer: 296.4
verify: round(1.3 * 40 * 5.7, 6)
explain: q_u = 1.3 × 40 × 5.7 = 296.4 kPa.
```

```quiz
q: A group of 9 piles has an efficiency of 0.8 and each pile carries 300 kN. What is the group capacity in kN?
answer: 2160
verify: round(0.8 * 9 * 300, 6)
explain: Q_g = η n Q = 0.8 × 9 × 300 = 2160 kN.
```
