---
title: Construction Materials, Concrete and Steel Structures
chapter: Structural Engineering
description: GATE CE syllabus for construction materials and management, reinforced and prestressed concrete (IS 456) and steel structures (IS 800), with limit state design formulas, PERT/CPM and solved examples.
---
## Syllabus

- **Construction materials and management**: cement, aggregates, concrete, bricks, steel, timber; concrete mix design; project planning and network analysis (PERT, CPM); cost estimation.
- **Concrete structures**: working stress and limit state design; beams, slabs, columns and footings; bond and development length; prestressed concrete.
- **Steel structures**: working stress and limit state design; tension and compression members, beams, beam-columns, column bases; bolted and welded connections; plastic analysis.

## Construction materials and management

- **Abrams' law**: concrete strength falls as the water-cement ratio rises.
- Characteristic strength f<sub>ck</sub> is the strength below which not more than 5% of results fall: f<sub>target</sub> = f<sub>ck</sub> + 1.65s.
- **PERT**: expected time t<sub>e</sub> = (t<sub>o</sub> + 4t<sub>m</sub> + t<sub>p</sub>)/6 and standard deviation σ = (t<sub>p</sub> − t<sub>o</sub>)/6. The project time is approximately normal, with mean and variance summed along the critical path.
- **CPM**: total float = LS − ES = LF − EF. Activities with zero total float form the **critical path**, the longest path through the network.

## Reinforced concrete (IS 456, limit state method)

- Design strength of concrete in flexure: 0.67f<sub>ck</sub>/1.5 = **0.446f<sub>ck</sub>**; the stress block gives a compressive force of **0.36f<sub>ck</sub> b x<sub>u</sub>** acting at 0.42x<sub>u</sub> from the top.
- Design strength of steel: f<sub>y</sub>/1.15 = **0.87f<sub>y</sub>**.
- Limiting neutral axis depth x<sub>u,max</sub>/d: **0.53** (Fe 250), **0.48** (Fe 415), **0.46** (Fe 500).
- Limiting moment M<sub>u,lim</sub> = 0.36f<sub>ck</sub> b x<sub>u,max</sub> (d − 0.42x<sub>u,max</sub>), which gives **0.148, 0.138 and 0.133 f<sub>ck</sub>bd²** for Fe 250, Fe 415 and Fe 500.
- Neutral axis of a singly reinforced section: x<sub>u</sub> = 0.87f<sub>y</sub>A<sub>st</sub>/(0.36f<sub>ck</sub>b).
- Minimum tension steel: A<sub>s</sub>/(bd) = 0.85/f<sub>y</sub>; maximum 4% of bD.
- Short axially loaded column: P<sub>u</sub> = 0.4f<sub>ck</sub>A<sub>c</sub> + 0.67f<sub>y</sub>A<sub>sc</sub>.
- Development length L<sub>d</sub> = φσ<sub>s</sub>/(4τ<sub>bd</sub>).
- Working stress method: modular ratio m = 280/(3σ<sub>cbc</sub>).
- **Prestressed concrete**: losses come from elastic shortening, shrinkage, creep, relaxation of steel, friction and anchorage slip. For a concentric prestress P on area A, the uniform stress is P/A; an eccentricity e adds ± Pe/Z.

## Steel structures (IS 800, limit state method)

- Partial safety factors: γ<sub>m0</sub> = 1.10 (yielding) and γ<sub>m1</sub> = 1.25 (rupture).
- Tension member: design strength in gross-section yielding T<sub>dg</sub> = A<sub>g</sub>f<sub>y</sub>/γ<sub>m0</sub>; in net-section rupture T<sub>dn</sub> = 0.9A<sub>n</sub>f<sub>u</sub>/γ<sub>m1</sub>; the smaller value (with block shear) governs.
- Fillet weld: effective throat = 0.7 × size.
- **Plastic analysis**: plastic moment M<sub>p</sub> = f<sub>y</sub>Z<sub>p</sub>; **shape factor** = Z<sub>p</sub>/Z<sub>e</sub> = 1.5 for a rectangle, 16/(3π) ≈ 1.70 for a solid circle, about 1.12 to 1.14 for I-sections.
- Collapse loads: simply supported beam with a central load W<sub>c</sub> = 4M<sub>p</sub>/L; fixed beam with a central load 8M<sub>p</sub>/L; fixed beam with a UDL w<sub>c</sub> = 16M<sub>p</sub>/L².

## Worked example

A singly reinforced beam 300 mm wide with effective depth 500 mm uses M25 concrete and Fe 415 steel with A<sub>st</sub> = 1200 mm². Is it under-reinforced, and what is its moment of resistance?

```python
b, d, fck, fy, Ast = 300, 500, 25, 415, 1200
xu = 0.87 * fy * Ast / (0.36 * fck * b)
xu_max = 0.48 * d
print(f"xu = {xu:.2f} mm, xu,max = {xu_max:.0f} mm -> {'under' if xu < xu_max else 'over'}-reinforced")
Mu = 0.87 * fy * Ast * (d - 0.42 * xu)
print(f"Mu = {Mu / 1e6:.2f} kN m")
Mlim = 0.36 * fck * b * xu_max * (d - 0.42 * xu_max)
print(f"Mu,lim = {Mlim / 1e6:.2f} kN m = {Mlim / (fck * b * d * d):.4f} fck b d^2")

# PERT for one activity: optimistic 4, most likely 6, pessimistic 14 days
to, tm, tp = 4, 6, 14
print(f"te = {(to + 4 * tm + tp) / 6:.2f} days, sigma = {(tp - to) / 6:.3f} days")
```
```output
xu = 160.47 mm, xu,max = 240 mm -> under-reinforced
Mu = 187.43 kN m
Mu,lim = 258.68 kN m = 0.1380 fck b d^2
te = 7.00 days, sigma = 1.667 days
```

## Practice questions

```quiz
q: In IS 456 limit state design, what is the limiting value of x<sub>u,max</sub>/d for Fe 500 steel?
answer: 0.46
verify: 0.46
explain: x<sub>u,max</sub>/d = 0.53, 0.48 and 0.46 for Fe 250, Fe 415 and Fe 500.
```

```quiz
q: An activity has optimistic, most likely and pessimistic times of 3, 5 and 13 days. What is its expected time in days?
answer: 6
verify: (3 + 4 * 5 + 13) / 6
explain: t<sub>e</sub> = (3 + 20 + 13)/6 = 36/6 = 6 days.
```

```quiz
q: A fixed-ended steel beam of span 6 m has a plastic moment capacity of 150 kN m. What central point load (in kN) causes collapse?
answer: 200
verify: 8 * 150 / 6
explain: For a fixed beam with a central load, W<sub>c</sub> = 8M<sub>p</sub>/L = 8 × 150/6 = 200 kN.
```

```quiz
q: What is the shape factor of a rectangular cross-section?
answer: 1.5
verify: (1 / 4) / (1 / 6)
explain: Z<sub>p</sub> = bd²/4 and Z<sub>e</sub> = bd²/6, so the shape factor is (1/4)/(1/6) = 1.5.
```

```quiz
q: A short column of 400 mm × 400 mm has 2000 mm² of Fe 415 steel and M20 concrete. What is its design axial capacity P<sub>u</sub> in kN, using P<sub>u</sub> = 0.4f<sub>ck</sub>A<sub>c</sub> + 0.67f<sub>y</sub>A<sub>sc</sub>? Give the answer to one decimal place.
answer: 1820.1
verify: round((0.4 * 20 * (400 * 400 - 2000) + 0.67 * 415 * 2000) / 1000, 1)
explain: A<sub>c</sub> = 160000 − 2000 = 158000 mm². P<sub>u</sub> = 0.4 × 20 × 158000 + 0.67 × 415 × 2000 = 1264000 + 556100 = 1820100 N ≈ 1820.1 kN.
```
