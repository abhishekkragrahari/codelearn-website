---
title: Sewage Treatment: Activated Sludge and Trickling Filters
chapter: Wastewater
description: Primary and secondary treatment, activated sludge process parameters (F/M ratio, MLSS, SRT, SVI, sludge recirculation), trickling filters (NRC equation), oxidation ponds and sludge digestion.
---
Sewage treatment removes solids and organic matter so the effluent can be discharged safely: preliminary (screens, grit chambers) → primary (settling) → secondary (biological) → sludge handling.

## Primary treatment

- **Grit chamber:** removes sand (designed for a horizontal velocity of about 0.3 m/s).
- **Primary clarifier:** removes about 60% of suspended solids and 30% of BOD.

## Activated sludge process (ASP)

Microorganisms in an aerated tank (mixed liquor) consume organic matter; they are settled in a secondary clarifier and partly **returned** to the tank.

| Parameter | Formula | Typical (conventional) |
| --- | --- | --- |
| Hydraulic retention time θ | V/Q | 4–8 h |
| **F/M ratio** | Q S₀/(V X) | 0.2–0.4 per day |
| MLSS (X) | Mixed liquor suspended solids | 1500–3000 mg/L |
| **Mean cell residence time** (SRT) θ_c | V X/(Q_w X_r + (Q − Q_w) X_e) | 5–15 days |
| Volumetric loading | Q S₀/V | 0.3–0.7 kg BOD/m³·day |

- **Sludge volume index (SVI)** = settled sludge volume in 30 min (mL/L) × 1000/MLSS (mg/L). Good settling: 50–150 mL/g; above 200 suggests **sludge bulking**.
- **Recirculation ratio** R = Q_r/Q: from a solids balance, **R = X/(X_r − X)**; X_r ≈ 10⁶/SVI.
- BOD removal about 85–95%.

## Trickling filters

Sewage trickles over a bed of stones or plastic media covered with a biological film.

- **NRC equation** (single-stage): **E = 100/(1 + 0.4432 √(W/(V F)))**, with W = BOD load (kg/day), V = volume (m³), F = recirculation factor = (1 + R)/(1 + 0.1R)².
- Low-rate filters: high efficiency, large area. High-rate filters use recirculation.

## Other processes

- **Oxidation ponds** (stabilisation ponds): algae supply oxygen to bacteria; cheap where land is available.
- **UASB** (upflow anaerobic sludge blanket) reactors: anaerobic, produce biogas.
- **Septic tanks** for small communities.

## Sludge

Thickening, **anaerobic digestion** (produces methane; about 30 days at 30–35 °C), drying beds, disposal. Sludge volume relation: V₁(100 − p₁) = V₂(100 − p₂) for moisture contents p.

## Worked example

An aeration tank of 1000 m³ treats 5000 m³/day with BOD 200 mg/L at MLSS 2500 mg/L.

- F/M = 5000 × 200/(1000 × 2500) = **0.4 per day**.
- HRT = 1000/5000 × 24 = **4.8 h**.

## Practice

```quiz
q: In an SVI test, 1 L of mixed liquor with MLSS 2500 mg/L settles to 250 mL in 30 minutes. What is the SVI in mL/g?
answer: 100
verify: 250 * 1000 / 2500
explain: SVI = 250 × 1000/2500 = 100 mL/g (good settling).
```

```quiz
q: MLSS is 3000 mg/L and return sludge solids are 10,000 mg/L. What recirculation ratio is needed?
answer: 0.4286
verify: round(3000 / (10000 - 3000), 4)
explain: R = X/(X_r − X) = 3000/7000 = 0.4286.
```

```quiz
q: Sludge with 98% moisture is thickened to 95% moisture. If the original volume is 100 m³, what is the new volume in m³?
answer: 40
verify: 100 * (100 - 98) / (100 - 95)
explain: V₂ = V₁(100 − p₁)/(100 − p₂) = 100 × 2/5 = 40 m³.
```

```quiz
q: An SVI of 300 mL/g in an activated sludge plant indicates:
* Sludge bulking (poor settling)
- Excellent settling
- Very low MLSS
- Complete nitrification
explain: SVI above about 200 means the sludge settles poorly, often due to filamentous organisms (bulking).
```
