---
title: Bending and Shear Stresses in Beams
chapter: Beams
description: The flexure formula M/I = σ/y = E/R, section modulus, beams of uniform strength, shear stress distribution in rectangular and circular sections, and the shear centre.
---
A bending moment stretches one side of a beam and compresses the other. The **flexure formula** gives these stresses; a separate formula gives the shear stress caused by the shear force.

## The flexure formula

For a beam in pure bending (plane sections remain plane, linear elastic material):

**M/I = σ/y = E/R**

- σ varies linearly with distance y from the **neutral axis**, which passes through the centroid.
- The largest stress is at the outer fibre: **σmax = M/Z**, where **Z = I/ymax** is the section modulus.

| Section | I (about centroidal axis) | Z |
| --- | --- | --- |
| Rectangle b × d | bd³/12 | bd²/6 |
| Solid circle, diameter d | πd⁴/64 | πd³/32 |
| Hollow circle D, d | π(D⁴ − d⁴)/64 | π(D⁴ − d⁴)/(32D) |

For a given area, an I-section has a far larger Z than a rectangle, which is why it is used for beams.

## Shear stress in beams

**τ = VAȳ/(Ib)**, where Aȳ is the first moment of the area above the level considered and b is the width at that level.

- **Rectangle:** parabolic distribution, zero at top and bottom, **τmax = 1.5 τavg** at the neutral axis.
- **Solid circle:** τmax = (4/3) τavg.
- **I-section:** most of the shear is carried by the web.

## Shear centre

For sections that are not symmetric about the load axis (a channel, an angle), the load must pass through the **shear centre** to bend the beam without twisting it. For sections with two axes of symmetry, the shear centre is the centroid.

## Worked example

A rectangular beam 100 mm wide and 200 mm deep carries a bending moment of 10 kN·m and a shear force of 20 kN.

- Z = 100 × 200²/6 = 666,667 mm³; **σmax = 10 × 10⁶ / 666,667 = 15 MPa**.
- τavg = 20000/(100 × 200) = 1 MPa; **τmax = 1.5 MPa** at the neutral axis.

## Practice

```quiz
q: A solid circular beam of diameter 100 mm carries a bending moment of 2 kN·m. What is the maximum bending stress in MPa? (Give 2 decimal places.)
answer: 20.37
verify: round(2e6 / (__import__("math").pi * 100 ** 3 / 32), 2)
explain: Z = πd³/32 = 98,175 mm³, so σ = 2 × 10⁶/98,175 = 20.37 MPa.
```

```quiz
q: For a rectangular section, the maximum shear stress is how many times the average shear stress?
answer: 1.5
verify: 3 / 2
explain: The parabolic distribution gives τmax = 1.5 V/A at the neutral axis.
```

```quiz
q: If the depth of a rectangular beam is doubled (width unchanged), its section modulus becomes:
- Twice
- Three times
* Four times
- Eight times
explain: Z = bd²/6 grows with d², so doubling d multiplies Z by 4 (I grows by 8).
```

```quiz
q: Which statements about pure bending are true? (Select all that apply.)
* The neutral axis passes through the centroid of the section
* Bending stress is zero at the neutral axis
- Bending stress is constant across the depth
- Shear stress is largest at the outer fibres
explain: Bending stress grows linearly from zero at the neutral axis; shear stress (from V) is largest at the neutral axis.
```
