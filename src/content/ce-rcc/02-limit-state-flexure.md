---
title: Limit State Design of Beams in Flexure
chapter: Concrete
description: Limit state method, partial safety factors, stress block, neutral axis depth, balanced, under- and over-reinforced sections, moment of resistance, doubly reinforced and flanged beams.
---
IS 456 designs RCC members by the **limit state method**: strength at collapse (limit state of collapse) and behaviour in service (deflection and cracking).

## Partial safety factors

- **Loads:** 1.5 (DL + LL); 1.2 (DL + LL + WL/EL); 1.5 or 0.9 for DL with WL/EL.
- **Materials:** γ_m = **1.5 for concrete**, **1.15 for steel**. Design strengths: concrete 0.67 f_ck/1.5 = **0.446 f_ck**; steel f_y/1.15 = **0.87 f_y**.

## The stress block

Assumptions: plane sections stay plane; tensile strength of concrete is ignored; maximum compressive strain in concrete **0.0035** in bending; parabolic–rectangular stress block.

- Total compression **C = 0.36 f_ck b x_u**, acting at **0.42 x_u** from the top.
- Tension **T = 0.87 f_y A_st**.
- From C = T: **x_u = 0.87 f_y A_st/(0.36 f_ck b)**.

## Limiting neutral axis and balanced sections

| Steel | x_u,max/d | M_u,lim |
| --- | --- | --- |
| Fe 250 | 0.53 | 0.148 f_ck b d² |
| Fe 415 | 0.48 | 0.138 f_ck b d² |
| Fe 500 | 0.46 | 0.133 f_ck b d² |

- x_u < x_u,max: **under-reinforced** (steel yields first: ductile, preferred).
- x_u = x_u,max: balanced. x_u > x_u,max: **over-reinforced** (concrete crushes suddenly; not allowed). If it happens, take x_u = x_u,max.

**Moment of resistance** (under-reinforced): **M_u = 0.87 f_y A_st (d − 0.42 x_u)**.

## Doubly reinforced and flanged beams

- If the design moment exceeds M_u,lim, add **compression steel**: M_u − M_u,lim = f_sc A_sc (d − d').
- **T-beams:** effective flange width b_f = l₀/6 + b_w + 6D_f (for T-beams). If the neutral axis lies within the flange, design it as a rectangular beam of width b_f.

## Serviceability

- **Span/effective depth limits:** 7 (cantilever), 20 (simply supported), 26 (continuous), for spans up to 10 m, modified for steel stress and percentage.
- Minimum tension steel: A_s/(bd) = 0.85/f_y. Maximum: 4% of bD.

## Worked example

b = 230 mm, d = 450 mm, M20, Fe 415, A_st = 3 bars of 16 mm (603 mm²).

- x_u = 0.87 × 415 × 603/(0.36 × 20 × 230) = 131.5 mm; x_u,max = 0.48 × 450 = 216 mm → under-reinforced.
- M_u = 0.87 × 415 × 603 × (450 − 0.42 × 131.5) = **85.9 kN·m**.

## Practice

```quiz
q: For M20 and Fe 415, b = 300 mm and d = 500 mm, what is the limiting moment of resistance in kN·m?
answer: 207
verify: round(0.138 * 20 * 300 * 500 ** 2 / 1e6, 6)
explain: M_u,lim = 0.138 f_ck b d² = 0.138 × 20 × 300 × 250,000 = 207 kN·m.
```

```quiz
q: In the worked example, what is the depth of the neutral axis x_u in mm? (Give 1 decimal place.)
answer: 131.5
verify: round(0.87 * 415 * 603 / (0.36 * 20 * 230), 1)
explain: 0.87 × 415 × 603 = 217,713 and 0.36 × 20 × 230 = 1656, so x_u = 217,713/1656 = 131.5 mm.
```

```quiz
q: The design strength of steel in the limit state of collapse is:
- 0.67 f_y
* 0.87 f_y
- 0.446 f_y
- f_y
explain: f_y/γ_m with γ_m = 1.15 gives 0.87 f_y.
```

```quiz
q: An over-reinforced RCC beam fails by:
* Sudden crushing of concrete before the steel yields
- Yielding of steel with large deflection
- Shear only
- Bond failure only
explain: In an over-reinforced section concrete reaches 0.0035 strain first, giving a brittle failure; IS 456 does not allow it.
```

```quiz
q: For Fe 500 steel and d = 400 mm, what is the limiting depth of the neutral axis in mm?
answer: 184
verify: 0.46 * 400
explain: x_u,max = 0.46d = 184 mm.
```

```quiz
q: For M25 and Fe 415, b = 250 mm and d = 450 mm, what is M_u,lim in kN·m? (Give 2 decimal places.)
answer: 174.66
verify: round(0.138 * 25 * 250 * 450 ** 2 / 1e6, 2)
explain: M_u,lim = 0.138 × 25 × 250 × 202,500 = 174.66 kN·m.
```
