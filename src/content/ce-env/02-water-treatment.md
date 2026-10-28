---
title: Water Treatment: Settling, Filtration, Disinfection
chapter: Water Supply
description: Plain sedimentation and Stokes' law, overflow rate and detention time, coagulation and flocculation with velocity gradient, slow and rapid sand filters, softening and chlorination.
---
A conventional water treatment plant removes particles, then germs: screening → aeration → coagulation and flocculation → sedimentation → filtration → disinfection.

## Sedimentation

Discrete particles settle at the **Stokes' velocity**:

**v_s = g (G_s − 1) d²/(18 ν)**

(valid for small particles, Re < 1).

An ideal settling tank removes all particles whose v_s is at least the **surface overflow rate**:

**v₀ = Q/A** (plan area A) — removal does not depend on depth.

- Particles with v_s < v₀ are removed in the fraction v_s/v₀.
- **Detention time** t = V/Q.
- Weir loading = Q/(weir length).

## Coagulation and flocculation

- **Coagulants** (alum, ferric salts) neutralise the charge on colloids so they stick together. The dose is found by the **jar test**.
- Alum consumes alkalinity: Al₂(SO₄)₃·14H₂O + 3Ca(HCO₃)₂ → 2Al(OH)₃ + 3CaSO₄ + 6CO₂ + 14H₂O.
- **Velocity gradient** G = √(P/(μV)) (P = power input). Flash mixing: high G for seconds; flocculation: G ≈ 20–80 s⁻¹ for 20–40 minutes. **Gt** (dimensionless) is about 10⁴–10⁵.

## Filtration

| Feature | Slow sand filter | Rapid sand filter |
| --- | --- | --- |
| Rate | 2.4–4.8 m³/m²/day | ~ 100–150 m³/m²/day (about 30 times faster) |
| Main action | Biological layer (schmutzdecke) | Straining and adsorption |
| Cleaning | Scraping the top layer | **Backwashing** |
| Pre-treatment | Not needed for clear water | Coagulation needed |

**Effective size** D₁₀ and **uniformity coefficient** D₆₀/D₁₀ describe the filter sand. Backwash expands the bed by about 20–50%.

## Softening and other processes

- **Lime–soda process:** lime removes carbonate hardness; soda ash removes non-carbonate hardness.
- **Ion exchange (zeolite):** removes all hardness, gives zero-hardness water.
- Defluoridation (Nalgonda technique), iron and manganese removal by aeration.

## Disinfection

- **Chlorine** forms HOCl (strong disinfectant), which dissociates to OCl⁻ at high pH. Disinfection works best below pH about 7.5.
- **Chlorine demand** = applied − residual. **Breakpoint chlorination:** add chlorine until free residual appears after destroying ammonia compounds.
- Residual of 0.2 mg/L free chlorine at the consumer end is the usual target.
- Alternatives: ozone, UV.

## Worked example

A tank treats 6 MLD with plan area 250 m² and depth 3 m.

- Overflow rate = 6000/250 = **24 m³/m²/day**; detention time = 750/6000 × 24 = **3 hours**.

## Practice

```quiz
q: A settling tank has an overflow rate of 30 m³/m²/day. A particle settles at 15 m/day. What percentage of such particles is removed?
answer: 50
verify: 15 / 30 * 100
explain: Fraction removed = v_s/v₀ = 15/30 = 50%.
```

```quiz
q: A flocculator of volume 500 m³ receives 2.5 kW of power; μ = 10⁻³ Pa·s. What is the velocity gradient in s⁻¹?
answer: 70.71
verify: round((2500 / (1e-3 * 500)) ** 0.5, 2)
explain: G = √(P/(μV)) = √(2500/0.5) = √5000 = 70.71 s⁻¹.
```

```quiz
q: Chlorine is applied at 2.0 mg/L and the residual after contact is 0.3 mg/L. What is the chlorine demand in mg/L?
answer: 1.7
verify: round(2.0 - 0.3, 6)
explain: Demand = applied − residual = 1.7 mg/L.
```

```quiz
q: The main purification in a slow sand filter is due to:
* The biological layer on the sand surface
- Backwashing
- Coagulants added before it
- High filtration rate
explain: The schmutzdecke, a biological film on top of the sand, removes most impurities and bacteria.
```

```quiz
q: A settling tank treats 2400 m³/day with a surface area of 100 m². What is its overflow rate in m³/m²/day?
answer: 24
verify: 2400 / 100
explain: v₀ = Q/A = 24 m³/m²/day.
```

```quiz
q: A filter has D₁₀ = 0.5 mm and D₆₀ = 0.75 mm. What is the uniformity coefficient?
answer: 1.5
verify: 0.75 / 0.5
explain: C_u = D₆₀/D₁₀ = 1.5.
```
