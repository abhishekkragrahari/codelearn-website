---
title: Shear, Bond, Slabs, Columns and Footings
chapter: Concrete
description: Nominal shear stress and shear reinforcement, development length, one-way and two-way slabs, short and slender columns, minimum eccentricity, and design checks for isolated footings.
---
After flexure, an RCC member must be checked for **shear** and **bond**, and the other members of a building (slabs, columns and footings) have their own rules in IS 456.

## Shear

- **Nominal shear stress:** τ_v = V_u/(b d).
- **Design shear strength of concrete** τ_c depends on the percentage of tension steel and the grade (IS 456 Table 19). τ_v must not exceed **τ_c,max** (Table 20), otherwise the section must be enlarged.
- If τ_v > τ_c, provide stirrups for the extra shear V_us = V_u − τ_c b d:
  **Vertical stirrups: V_us = 0.87 f_y A_sv d/s_v**.
- **Minimum shear reinforcement:** A_sv/(b s_v) ≥ 0.4/(0.87 f_y). Maximum spacing: 0.75d or 300 mm, whichever is less.

## Bond and development length

Bars must extend far enough to develop their stress:

**L_d = φ σ_s/(4 τ_bd)**, with σ_s = 0.87 f_y.

τ_bd for plain bars in tension: 1.2 MPa (M20), 1.4 (M25), 1.5 (M30); increased by **60% for deformed bars** and 25% for bars in compression. For Fe 415 deformed bars in M20, L_d ≈ 47φ.

## Slabs

- **One-way slab:** L_y/L_x > 2; bends mainly along the short span. Design as a 1 m wide beam.
- **Two-way slab:** L_y/L_x ≤ 2; moments from IS 456 coefficient tables (Annex D).
- Minimum steel: 0.12% (HYSD bars) or 0.15% (mild steel) of the gross area. Maximum bar diameter: D/8.

## Columns

- **Short column** if l_eff/D < 12; otherwise slender (additional moments).
- **Minimum eccentricity:** e_min = l/500 + D/30, at least 20 mm.
- **Axially loaded short column** (with e_min ≤ 0.05D): **P_u = 0.4 f_ck A_c + 0.67 f_y A_sc**.
- Longitudinal steel 0.8% to 6% (practically up to 4%); at least 4 bars in a rectangular column, 6 in a circular one. Ties: diameter ≥ φ/4 and 6 mm; pitch ≤ least lateral dimension, 16φ and 300 mm.
- **Helical** ties increase the capacity by 5%.

## Footings

Check an isolated footing for: bearing pressure (area = load/SBC), one-way shear at d from the column face, two-way (punching) shear at d/2 from the face, and bending at the column face.

## Worked example

A short column 400 × 400 mm, M25, Fe 415, with 8 bars of 20 mm (A_sc = 2513 mm²).

- A_c = 160,000 − 2513 = 157,487 mm².
- P_u = 0.4 × 25 × 157,487 + 0.67 × 415 × 2513 = 1574.9 + 698.7 = **2273.6 kN**.

## Practice

```quiz
q: A beam 250 × 500 mm (d) carries a factored shear of 150 kN. What is the nominal shear stress in MPa?
answer: 1.2
verify: 150e3 / (250 * 500)
explain: τ_v = V_u/(bd) = 150,000/125,000 = 1.2 MPa.
```

```quiz
q: What is the development length (mm) of a 16 mm Fe 415 deformed bar in tension in M20 concrete? (τ_bd = 1.2 × 1.6 MPa; give 1 decimal place.)
answer: 752.2
verify: round(16 * 0.87 * 415 / (4 * 1.2 * 1.6), 1)
explain: L_d = φ × 0.87f_y/(4τ_bd) = 16 × 361.05/7.68 = 752.2 mm (about 47φ).
```

```quiz
q: A column has unsupported length 3.6 m and lateral dimension 450 mm. What is its minimum eccentricity in mm?
answer: 22.2
verify: round(max(3600 / 500 + 450 / 30, 20), 1)
explain: e_min = 3600/500 + 450/30 = 7.2 + 15 = 22.2 mm (more than 20 mm).
```

```quiz
q: A slab panel is 3 m × 7 m. It should be designed as:
* A one-way slab
- A two-way slab
- A flat slab
- A cantilever slab
explain: L_y/L_x = 7/3 = 2.33 > 2, so it acts as a one-way slab spanning 3 m.
```

```quiz
q: A short column 300 × 300 mm uses M20 concrete and 4 bars of 16 mm (A_sc = 804 mm²) of Fe 415. What is its axial capacity P_u in kN? (Give 1 decimal place.)
answer: 937.1
verify: round((0.4 * 20 * (90000 - 804) + 0.67 * 415 * 804) / 1000, 1)
explain: P_u = 0.4 × 20 × 89,196 + 0.67 × 415 × 804 = 713,568 + 223,554 = 937,122 N ≈ 937.1 kN.
```

```quiz
q: A slab panel is 4 m × 6 m. Should it be designed as one-way or two-way?
- One-way
* Two-way
- Flat slab
- Cantilever
explain: L_y/L_x = 1.5 ≤ 2, so it is a two-way slab.
```
