---
title: Wastewater Characteristics, BOD and Sewer Design
chapter: Wastewater
description: Sewage quantity, BOD and its kinetics, COD, solids, population equivalent, self-cleansing velocity, sewer design, and stream self-purification with the oxygen sag curve.
---
Before treating sewage, you need to know how much there is and how strong it is. The key measure of strength is **BOD**.

## Quantity of sewage

- Dry weather flow ≈ 80% of the water supplied.
- Peak factor for sewers about 2–3 (higher for small populations).
- **Storm water** by the rational method (combined or separate systems).

## BOD (biochemical oxygen demand)

The oxygen consumed by microbes oxidising organic matter.

**BOD_t = L₀ (1 − e^(−k t))** (base e)

or BOD_t = L₀(1 − 10^(−k_D t)) with k = 2.303 k_D.

- L₀ = ultimate (first-stage) BOD. **BOD₅ at 20 °C** is the standard test.
- Rate constant varies with temperature: k_T = k₂₀ θ^(T−20), θ ≈ 1.047.
- **Lab test:** BOD = (DO_initial − DO_final)/(dilution fraction), with the dilution fraction = sample volume/bottle volume.
- **COD** (chemical oxygen demand, dichromate) ≥ BOD; BOD/COD ≈ 0.5 for biodegradable sewage. **ThOD** from stoichiometry.
- **Population equivalent** = industrial BOD load (kg/day) / per capita BOD (about 0.08 kg/day).

## Solids

Total solids = suspended + dissolved. Volatile solids (lost at 550 °C) indicate organic content.

## Sewer design

- **Self-cleansing velocity:** about 0.6–0.75 m/s at design flow, to stop solids settling. Maximum about 3 m/s to prevent erosion.
- Sewers are designed to flow **partly full** (about half to 0.8 full); a circular sewer runs at the same velocity at half full as at full.
- Manning's equation is used for slopes.

## Stream self-purification

When sewage enters a river, BOD uses up oxygen while the surface re-aerates it. The **dissolved oxygen sag curve (Streeter–Phelps)**:

**D_t = (k_d L₀/(k_r − k_d))(e^(−k_d t) − e^(−k_r t)) + D₀ e^(−k_r t)**

- D = DO deficit (saturation DO − actual DO); k_d = deoxygenation and k_r = reaeration rate constants.
- **Self-purification factor** f = k_r/k_d.
- The minimum DO occurs at the **critical time** t_c.

## Worked example

A sample has BOD₅ = 200 mg/L and k = 0.23 per day (base e).

- L₀ = 200/(1 − e^(−1.15)) = 200/0.683 = **292.7 mg/L**.

## Practice

```quiz
q: In a BOD test, 5 mL of sewage is diluted to 300 mL. Initial DO is 8 mg/L and DO after 5 days is 4 mg/L. What is the BOD₅ in mg/L?
answer: 240
verify: (8 - 4) / (5 / 300)
explain: BOD = 4/(5/300) = 4 × 60 = 240 mg/L.
```

```quiz
q: The ultimate BOD of a waste is 300 mg/L and k = 0.1 per day (base 10). What is its 5-day BOD in mg/L? (Give 1 decimal place.)
answer: 205.1
verify: round(300 * (1 - 10 ** (-0.1 * 5)), 1)
explain: BOD₅ = 300(1 − 10^(−0.5)) = 300 × 0.6838 = 205.1 mg/L.
```

```quiz
q: An industry discharges 400 kg BOD/day. With 0.08 kg BOD per person per day, what is its population equivalent?
answer: 5000
verify: round(400 / 0.08)
explain: PE = 400/0.08 = 5000 persons.
```

```quiz
q: For a river, k_r = 0.4 and k_d = 0.2 per day. What is the self-purification factor?
answer: 2
verify: 0.4 / 0.2
explain: f = k_r/k_d = 2.
```
