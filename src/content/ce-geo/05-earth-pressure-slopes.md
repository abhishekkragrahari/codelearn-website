---
title: Earth Pressure and Slope Stability
chapter: Strength
description: At-rest, active and passive earth pressure, Rankine and Coulomb theories, effect of surcharge and water table, tension cracks, and stability of infinite and finite slopes.
---
Retaining walls hold back soil; slopes must not slide. Both are designed using the soil's shear strength.

## Earth pressure coefficients

- **At rest** (wall does not move): K₀ ≈ 1 − sin φ' (Jaky).
- **Active** (wall moves away; soil expands): **K_a = (1 − sin φ)/(1 + sin φ) = tan²(45° − φ/2)**.
- **Passive** (wall pushed into soil): **K_p = (1 + sin φ)/(1 − sin φ) = 1/K_a**.
- K_a < K₀ < K_p.

## Rankine's theory (smooth vertical wall, horizontal backfill)

For a cohesionless backfill of height H:

- Active pressure at depth z: p_a = K_a γ z.
- **Total active thrust P_a = ½ K_a γ H²**, acting at **H/3** from the base.
- **Uniform surcharge q:** adds K_a q at every depth (a rectangle, thrust at H/2).
- **Water table in the backfill:** use γ' below the water table and add the full water pressure γ_w z_w.

**Cohesive soils:** p_a = K_a γ z − 2c√K_a. Tension near the top creates a **tension crack** of depth **z_c = 2c/(γ√K_a)**. An unsupported vertical cut can stand to about 2z_c = 4c/(γ√K_a).

**Coulomb's theory** includes wall friction δ and sloping walls and backfills, using a trial wedge.

## Stability of slopes

**Infinite slope** (slope angle β):

- Dry cohesionless soil: **FS = tan φ/tan β**.
- Seepage parallel to the slope (water at the surface): FS = (γ'/γ_sat)(tan φ/tan β), roughly half the dry value.

**Finite slopes:**

- **Swedish (slip circle)** method for φ = 0 clays: FS = c_u L_arc R/(W x̄).
- **Method of slices** (Fellenius, Bishop) for c–φ soils.
- **Taylor's stability number** S_n = c/(F γ H); critical height H_c = c/(γ S_n).

## Worked example

A 6 m smooth wall retains dry sand with γ = 18 kN/m³ and φ = 30°.

- K_a = 1/3. P_a = ½ × (1/3) × 18 × 36 = **108 kN/m**, at 2 m above the base.

## Practice

```quiz
q: A 5 m wall retains dry sand (γ = 20 kN/m³, φ = 30°). What is the total active thrust per metre in kN?
answer: 83.33
verify: round(0.5 * (1 / 3) * 20 * 5 ** 2, 2)
explain: P_a = ½ K_a γH² = ½ × (1/3) × 20 × 25 = 83.33 kN/m.
```

```quiz
q: A clay has c = 20 kPa, φ = 0 and γ = 18 kN/m³. What is the depth of the tension crack in m? (Give 2 decimal places.)
answer: 2.22
verify: round(2 * 20 / 18, 2)
explain: With φ = 0, K_a = 1, so z_c = 2c/γ = 40/18 = 2.22 m.
```

```quiz
q: A dry infinite sand slope at 20° has φ = 35°. What is its factor of safety? (Give 2 decimal places.)
answer: 1.92
verify: round(__import__("math").tan(__import__("math").radians(35)) / __import__("math").tan(__import__("math").radians(20)), 2)
explain: FS = tan 35°/tan 20° = 0.7002/0.3640 = 1.92.
```

```quiz
q: For a soil with φ = 30°, which order of earth pressure coefficients is correct?
* K_a < K₀ < K_p
- K₀ < K_a < K_p
- K_p < K₀ < K_a
- K_a = K₀ = K_p
explain: K_a = 0.33, K₀ ≈ 0.5, K_p = 3.
```

```quiz
q: A 4 m wall retains dry sand (γ = 18 kN/m³, φ = 30°) with a uniform surcharge of 10 kPa. What is the total active thrust per metre in kN? (Give 2 decimal places.)
answer: 61.33
verify: round(0.5 * 18 * 4 ** 2 / 3 + 10 * 4 / 3, 2)
explain: Soil: ½K_aγH² = 48 kN; surcharge: K_a q H = 13.33 kN; total 61.33 kN/m.
```

```quiz
q: For φ = 20°, what is the at-rest coefficient K₀ by Jaky's formula? (Give 3 decimal places.)
answer: 0.658
verify: round(1 - __import__("math").sin(__import__("math").radians(20)), 3)
explain: K₀ = 1 − sin 20° = 1 − 0.342 = 0.658.
```
