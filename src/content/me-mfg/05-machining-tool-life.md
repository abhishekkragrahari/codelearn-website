---
title: Machining, Cutting Forces and Tool Life
chapter: Machining
description: Orthogonal cutting, chip thickness ratio and shear angle, Merchant's circle and cutting forces, specific energy, Taylor's tool life equation, machining time and surface finish.
---
Machining removes material as chips with a hard cutting tool. GATE tests the mechanics of **orthogonal cutting**, **tool life**, and **machining time** for turning, drilling and milling.

## Orthogonal cutting

With uncut chip thickness t, chip thickness t_c and rake angle α:

- **Chip thickness ratio** r = t/t_c (less than 1).
- **Shear angle** φ: **tan φ = r cos α/(1 − r sin α)**.
- **Shear strain** γ = cot φ + tan(φ − α).
- Chip velocity V_c = r V; shear velocity V_s = V cos α/cos(φ − α).

## Forces (Merchant's circle)

The measured cutting force F_c and thrust force F_t give:

- Friction force on the rake face F = F_c sin α + F_t cos α; normal N = F_c cos α − F_t sin α; **μ = F/N = tan β**.
- Shear force on the shear plane F_s = F_c cos φ − F_t sin φ; shear stress τ = F_s/A_s, with A_s = (b t)/sin φ.
- **Merchant's relation:** **2φ + β − α = 90°**.
- **Cutting power** = F_c V. **Specific cutting energy** = F_c/(b t) (energy per unit volume removed).

## Tool life

**Taylor's equation: V Tⁿ = C**

- n is about 0.1–0.15 for HSS, 0.2–0.5 for carbides, and higher for ceramics.
- Extended: V Tⁿ f^a d^b = C (feed and depth also matter, but less than speed).
- Tool wear: **flank wear** (gradual, used as the life criterion) and **crater wear** on the rake face.

## Machining time

| Operation | Time |
| --- | --- |
| Turning (one pass) | t = L/(f N) |
| Drilling | t = (L + approach)/(f N) |
| Milling | t = (L + approach)/(f_m), with table feed f_m = f_z z N |

N = 1000V/(πD) rpm (V in m/min, D in mm). **Material removal rate** in turning = π D f d N ≈ V f d.

**Surface finish:** with a nose radius r, the peak-to-valley height h = f²/(8r). Smaller feed and larger nose radius give a better finish.

## Worked example

Orthogonal cutting with α = 10°, t = 0.2 mm and t_c = 0.5 mm.

- r = 0.4. tan φ = 0.4 cos 10°/(1 − 0.4 sin 10°) = 0.3939/0.9305 = 0.4233 → **φ = 22.9°**.

## Practice

```quiz
q: In orthogonal cutting, α = 0° and the chip thickness ratio is 0.5. What is the shear angle in degrees? (Give 2 decimal places.)
answer: 26.57
verify: round(__import__("math").degrees(__import__("math").atan(0.5)), 2)
explain: With α = 0, tan φ = r = 0.5, so φ = 26.57°.
```

```quiz
q: Taylor's equation is VT^0.25 = 200 (V in m/min, T in min). What speed gives a tool life of 16 min?
answer: 100
verify: 200 / 16 ** 0.25
explain: V = 200/16^0.25 = 200/2 = 100 m/min.
```

```quiz
q: A bar of 100 mm diameter is turned at 300 rpm with a feed of 0.2 mm/rev over a length of 120 mm. What is the machining time in minutes?
answer: 2
verify: 120 / (0.2 * 300)
explain: t = L/(fN) = 120/(0.2 × 300) = 2 min.
```

```quiz
q: A tool with nose radius 0.8 mm turns at a feed of 0.2 mm/rev. What is the ideal peak-to-valley roughness in µm?
answer: 6.25
verify: round(0.2 ** 2 / (8 * 0.8) * 1000, 6)
explain: h = f²/(8r) = 0.04/6.4 = 0.00625 mm = 6.25 µm.
```

```quiz
q: If the cutting speed is increased, tool life:
* Decreases sharply
- Increases
- Stays the same
- First increases then decreases
explain: From VTⁿ = C with small n, a small rise in V gives a large fall in T.
```

```quiz
q: A 200 mm diameter bar is turned at 60 m/min. What is the spindle speed in rpm? (Give 2 decimal places.)
answer: 95.49
verify: round(1000 * 60 / (__import__("math").pi * 200), 2)
explain: N = 1000V/(πD) = 60,000/628.3 = 95.49 rpm.
```

```quiz
q: With VT^0.2 = 300, the cutting speed is raised from 100 to 120 m/min. By what factor does tool life change? (Give 3 decimal places.)
answer: 0.402
verify: round((100 / 120) ** (1 / 0.2), 3)
explain: T₂/T₁ = (V₁/V₂)^(1/n) = (0.8333)⁵ = 0.402.
```
