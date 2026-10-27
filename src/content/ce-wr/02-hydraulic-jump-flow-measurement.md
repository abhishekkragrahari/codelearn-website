---
title: Hydraulic Jump and Flow Measurement
chapter: Hydraulics
description: Hydraulic jump in rectangular channels, sequent depths, energy loss, types of jump, and flow measurement with weirs, notches, venturi flumes and orifices.
---
When fast, shallow (supercritical) flow meets slower, deeper flow, it changes abruptly in a **hydraulic jump**, losing energy. Jumps are used below spillways to protect the river bed.

## Hydraulic jump

Using momentum conservation in a rectangular channel, the **sequent (conjugate) depths** y₁ (before) and y₂ (after) satisfy:

**y₂/y₁ = ½ (−1 + √(1 + 8Fr₁²))**

- **Energy loss:** **ΔE = (y₂ − y₁)³/(4 y₁ y₂)**.
- **Length of jump** ≈ 6(y₂ − y₁) on a horizontal floor.
- **Height of jump** = y₂ − y₁.

| Fr₁ | Type of jump |
| --- | --- |
| 1 – 1.7 | Undular |
| 1.7 – 2.5 | Weak |
| 2.5 – 4.5 | Oscillating (avoid: waves downstream) |
| 4.5 – 9 | Steady (best for stilling basins) |
| > 9 | Strong |

## Weirs and notches

- **Rectangular weir** (crest length L, head H): **Q = (2/3) C_d √(2g) L H^(3/2)**. With end contractions (Francis): L_eff = L − 0.1nH.
- **Triangular (V) notch** with angle θ: **Q = (8/15) C_d √(2g) tan(θ/2) H^(5/2)**. Good for small flows, since Q changes fast with H.
- **Cipolletti** (trapezoidal, side slopes 1 horizontal : 4 vertical): compensates for end contractions.
- **Broad-crested weir:** critical depth forms on the crest; Q = 1.705 C_d L H^(3/2) (SI units).
- **Error:** a small error dH in head gives dQ/Q = (3/2)(dH/H) for a rectangular weir and (5/2)(dH/H) for a V-notch.

## Other devices

- **Venturi flume / Parshall flume:** a constriction forcing critical flow; good for canals with sediment.
- **Orifice:** Q = C_d a √(2gH), with C_d = C_c C_v (about 0.62).
- **Sluice gate:** free flow below a gate creates supercritical flow, often followed by a jump.

## Worked example

Flow at y₁ = 0.5 m and V₁ = 6 m/s enters a jump (g = 9.81).

- Fr₁ = 6/√(9.81 × 0.5) = 2.71.
- y₂ = 0.25 × (−1 + √(1 + 8 × 7.34)) = 0.25 × (−1 + 7.73) = **1.68 m**.
- ΔE = (1.18)³/(4 × 0.5 × 1.68) = **0.49 m**.

## Practice

```quiz
q: A hydraulic jump has y₁ = 0.4 m and y₂ = 2.0 m. What is the energy loss in m?
answer: 1.28
verify: round((2.0 - 0.4) ** 3 / (4 * 0.4 * 2.0), 6)
explain: ΔE = (1.6)³/(4 × 0.4 × 2) = 4.096/3.2 = 1.28 m.
```

```quiz
q: A jump has Fr₁ = 3 at y₁ = 0.3 m. What is the sequent depth y₂ in m? (Give 3 decimal places.)
answer: 1.132
verify: round(0.3 * 0.5 * (-1 + (1 + 8 * 9) ** 0.5), 3)
explain: y₂ = 0.3 × ½(−1 + √73) = 0.15 × 7.544 = 1.132 m.
```

```quiz
q: A 1% error in measuring the head over a V-notch causes about what percentage error in discharge?
answer: 2.5
verify: 2.5 * 1
explain: Q ∝ H^(5/2), so dQ/Q = 2.5 dH/H = 2.5%.
```

```quiz
q: Which hydraulic jump is preferred in stilling basins?
- Undular
- Oscillating
* Steady
- Weak
explain: The steady jump (Fr₁ 4.5–9) is well formed and dissipates energy well without downstream waves.
```
