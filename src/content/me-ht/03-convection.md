---
title: Forced and Natural Convection
chapter: Convection
description: Newton's law of cooling, Nusselt, Prandtl, Reynolds and Grashof numbers, thermal boundary layers, standard correlations for plates and pipes, and natural convection.
---
**Convection** is heat transfer between a surface and a moving fluid. Its strength is the heat transfer coefficient h, found from dimensionless **correlations**.

## Newton's law of cooling

**Q = h A (T_s − T_∞)**

Typical h (W/m²·K): free convection of air 5–25; forced air 25–250; forced water 100–20,000; boiling and condensation 2,500–100,000.

## Dimensionless numbers

| Number | Definition | Meaning |
| --- | --- | --- |
| **Nusselt** Nu | hL/k (k of the fluid) | Convection / conduction across the layer |
| **Prandtl** Pr | ν/α = μc_p/k | Momentum / thermal diffusivity |
| **Reynolds** Re | VL/ν | Inertia / viscous (forced convection) |
| **Grashof** Gr | gβΔT L³/ν² | Buoyancy / viscous (natural convection) |
| **Rayleigh** Ra | Gr · Pr | Natural convection strength |
| **Stanton** St | Nu/(Re Pr) = h/(ρVc_p) | Used in analogies |

**Pr** is about 0.7 for air, 7 for water and much less than 1 for liquid metals. The ratio of the velocity to thermal boundary layer thickness is about **Pr^(1/3)**.

## Forced convection correlations

- **Flat plate, laminar** (Re < 5 × 10⁵): local Nu_x = 0.332 Re_x^(1/2) Pr^(1/3); average Nu = 0.664 Re_L^(1/2) Pr^(1/3).
- **Pipe, laminar, fully developed:** **Nu = 3.66** (constant wall temperature) or **4.36** (constant heat flux), independent of Re.
- **Pipe, turbulent** (Dittus–Boelter): **Nu = 0.023 Re^0.8 Pr^n**, n = 0.4 for heating the fluid, 0.3 for cooling.

**Reynolds analogy** (Pr = 1): St = C_f/2. The Chilton–Colburn analogy extends it: St Pr^(2/3) = C_f/2.

## Natural convection

Fluid moves because heated fluid is lighter. Correlations take the form **Nu = C Ra^n**: n ≈ 1/4 for laminar and 1/3 for turbulent flow (Ra above about 10⁹ on a vertical plate).

## Worked example

Water flows in a tube of 20 mm diameter with Re = 20,000 and Pr = 5, being heated; k = 0.6 W/m·K.

- Nu = 0.023 × 20,000^0.8 × 5^0.4 = 0.023 × 2759 × 1.904 = 120.8.
- h = Nu k/D = 120.8 × 0.6/0.02 = **3624 W/m²·K**.

## Practice

```quiz
q: A surface at 80 °C loses heat to air at 20 °C with h = 15 W/m²·K over 2 m². What is the heat loss in W?
answer: 1800
verify: 15 * 2 * (80 - 20)
explain: Q = hAΔT = 15 × 2 × 60 = 1800 W.
```

```quiz
q: Fully developed laminar flow in a tube of 10 mm diameter has a constant wall temperature; k = 0.6 W/m·K. What is h in W/m²·K?
answer: 219.6
verify: round(3.66 * 0.6 / 0.01, 6)
explain: Nu = 3.66, so h = 3.66 × 0.6/0.01 = 219.6 W/m²·K.
```

```quiz
q: Which dimensionless number decides heat transfer in natural (free) convection, together with Pr?
- Reynolds number
* Grashof number
- Mach number
- Weber number
explain: In natural convection the flow is driven by buoyancy, measured by Gr (or Ra = Gr Pr).
```

```quiz
q: For air (Pr ≈ 0.7) flowing over a plate, compared with the velocity boundary layer, the thermal boundary layer is:
* Slightly thicker
- Much thinner
- Exactly the same
- Zero
explain: δ/δ_t ≈ Pr^(1/3); for Pr < 1 the thermal layer is thicker. For water (Pr ≈ 7) it is thinner.
```

```quiz
q: For laminar flow in a pipe with constant heat flux, Nu = 4.36. With k = 0.03 W/m·K and D = 0.02 m, what is h in W/m²·K? (Give 2 decimal places.)
answer: 6.54
verify: round(4.36 * 0.03 / 0.02, 2)
explain: h = Nu k/D = 4.36 × 0.03/0.02 = 6.54 W/m²·K.
```

```quiz
q: For water (Pr ≈ 7), compared with the velocity boundary layer, the thermal boundary layer is:
- Thicker
* Thinner
- The same
- Zero
explain: δ/δ_t ≈ Pr^(1/3) ≈ 1.9, so the thermal layer is thinner for Pr > 1.
```
