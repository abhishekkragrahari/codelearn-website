---
title: Design of Steel Structures (IS 800)
chapter: Steel
description: Limit state design of steel tension members, compression members and slenderness, laterally supported beams, plastic analysis with shape factor and collapse loads, and bolted and welded connections.
---
Steel design in India follows **IS 800:2007** (limit state method). GATE asks about member capacities, plastic analysis and connections.

## Partial safety factors

γ_m0 = **1.10** (yielding), γ_m1 = **1.25** (ultimate fracture), γ_mb = 1.25 (bolts), γ_mw = 1.25 (shop welds).

## Tension members

The design strength is the least of:

- **Gross section yielding:** T_dg = A_g f_y/γ_m0.
- **Net section rupture:** T_dn = 0.9 A_n f_u/γ_m1 (for plates).
- **Block shear** at the end connection.

## Compression members

- **Slenderness ratio** λ = KL/r. Limits: 180 for members carrying dead and live load, 250 for members carrying only wind/earthquake reversal, 350 for tension members that may reverse.
- **Euler stress** f_cc = π²E/λ².
- IS 800 uses column buckling curves (a, b, c, d by section type) to give the design compressive stress f_cd, and P_d = A_e f_cd.
- Effective length factor K: 0.65 (both ends fixed), 0.8 (fixed–pinned), 1.0 (pinned–pinned), 2.0 (fixed–free).

## Beams

- **Laterally supported beam:** M_d = β_b Z_p f_y/γ_m0 (plastic or compact sections, β_b = 1); limited to 1.2 Z_e f_y/γ_m0 for simply supported beams.
- **Shear:** V_d = A_v f_y/(√3 γ_m0), with A_v = web area (h t_w).
- Unsupported beams are checked for **lateral torsional buckling**.

## Plastic analysis

- **Plastic moment** M_p = Z_p f_y. **Shape factor** S = Z_p/Z_e:

| Section | Shape factor |
| --- | --- |
| Rectangle | 1.5 |
| Solid circle | 1.7 (16/(3π)) |
| I-section (about major axis) | about 1.12–1.15 |
| Diamond | 2.0 |

- **Collapse loads** (from mechanism method):
  - Simply supported beam, central load: W_c = 4M_p/L.
  - Fixed beam, central load: W_c = 8M_p/L.
  - Fixed beam, UDL: w_c = 16M_p/L².
  - Propped cantilever, UDL: w_c = 11.66 M_p/L².
- **Load factor** = collapse load/working load.

## Connections

- **Bolts in shear:** V_dsb = f_u A_nb/(√3 γ_mb) per shear plane; **bearing** V_dpb = 2.5 k_b d t f_u/γ_mb.
- **Fillet welds:** throat t = 0.7 s; design strength f_wd = f_u/(√3 γ_mw).

## Worked example

A rectangular section 100 × 200 mm (bending about the strong axis), f_y = 250 MPa.

- Z_e = 100 × 200²/6 = 666,667 mm³; Z_p = 100 × 200²/4 = 1,000,000 mm³.
- Shape factor = **1.5**; M_p = **250 kN·m**.

## Practice

```quiz
q: A fixed beam of span 6 m has M_p = 120 kN·m. What central point load causes collapse in kN?
answer: 160
verify: 8 * 120 / 6
explain: W_c = 8M_p/L = 960/6 = 160 kN.
```

```quiz
q: A flat 200 mm × 10 mm (f_y = 250 MPa) is a tension member. What is its design strength for gross section yielding in kN? (Give 2 decimal places.)
answer: 454.55
verify: round(200 * 10 * 250 / 1.10 / 1000, 2)
explain: T_dg = A_g f_y/γ_m0 = 2000 × 250/1.10 = 454,545 N = 454.55 kN.
```

```quiz
q: What is the shape factor of a solid circular section? (Give 3 decimal places.)
answer: 1.698
verify: round(16 / (3 * __import__("math").pi), 3)
explain: Z_p = d³/6 and Z_e = πd³/32, so S = 32/(6π) = 16/(3π) = 1.698.
```

```quiz
q: A pinned–pinned steel strut 3 m long has a minimum radius of gyration of 30 mm. What is its slenderness ratio?
answer: 100
verify: 1.0 * 3000 / 30
explain: λ = KL/r = 1.0 × 3000/30 = 100.
```

```quiz
q: A simply supported steel beam of span 8 m has M_p = 200 kN·m. What central load (kN) causes collapse?
answer: 100
verify: 4 * 200 / 8
explain: W_c = 4M_p/L = 100 kN.
```

```quiz
q: A strut of length 2.5 m, fixed at both ends (K = 0.65), has r_min = 25 mm. What is its slenderness ratio?
answer: 65
verify: round(0.65 * 2500 / 25, 6)
explain: λ = KL/r = 0.65 × 2500/25 = 65.
```
