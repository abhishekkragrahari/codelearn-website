---
title: Three-Phase Transformers, Autotransformers and Parallel Operation
chapter: Transformers
description: Three-phase transformer connections and phase shifts, vector groups, autotransformer copper saving and power transfer, parallel operation and load sharing, and per-unit impedance.
---
Power systems use three-phase transformers, autotransformers for small voltage changes, and transformers in parallel to share load.

## Three-phase connections

| Connection | Line voltage ratio | Notes |
| --- | --- | --- |
| Y–Y | N₁/N₂ | Third-harmonic problems without a neutral or tertiary |
| Δ–Δ | N₁/N₂ | Can run as open delta (V–V) at 57.7% of the rating |
| Y–Δ | N₁/(√3 N₂) | Step-down at the receiving end; 30° shift |
| Δ–Y | √3 N₁/N₂ | Step-up at the generating end; 30° shift |

**Vector groups** (for example Dyn11) show the phase shift between HV and LV in clock positions of 30° each. Only transformers of the same group can be paralleled.

**Open delta (V–V):** capacity = √3 × VA of one transformer = 57.7% of the original three-unit delta bank.

## Autotransformer

One winding with a tap; part of the power is transferred **conductively**.

- With ratio a = V_LV/V_HV (< 1): **copper saved = a** times that of a two-winding transformer (copper used = 1 − a).
- Power transferred inductively = (1 − a) × total; conductively = a × total.
- **Rating as an autotransformer** = two-winding rating/(1 − a).
- Disadvantages: no isolation between HV and LV; higher short-circuit current.

## Parallel operation

Conditions: same voltage ratio, same polarity, same phase sequence and vector group, and (for good load sharing) similar per-unit impedances and X/R ratios.

**Load sharing:** each transformer takes a share **inversely proportional to its impedance**: S₁ = S Z₂/(Z₁ + Z₂) (with impedances in ohms on a common base). Transformers with equal per-unit impedance share load in proportion to their ratings.

## Per-unit values

Z_pu = Z_actual/Z_base, with Z_base = V_base²/S_base. A transformer has the **same per-unit impedance on both sides**. Change of base: Z_new = Z_old (S_new/S_old)(V_old/V_new)².

## Worked example

A 230/115 V two-winding transformer rated 10 kVA is connected as a 345/230 V autotransformer.

- a = 230/345 = 2/3; autotransformer rating = 10/(1 − 2/3) = **30 kVA**.

## Practice

```quiz
q: An autotransformer steps 400 V down to 300 V. What fraction of the copper of an equivalent two-winding transformer does it save?
answer: 0.75
verify: 300 / 400
explain: Copper saved = a = V_LV/V_HV = 0.75.
```

```quiz
q: Three 100 kVA transformers in delta lose one unit and run in open delta. What load (kVA) can the bank supply? (Give 1 decimal place.)
answer: 173.2
verify: round(3 ** 0.5 * 100, 1)
explain: V–V capacity = √3 × 100 = 173.2 kVA (57.7% of 300 kVA).
```

```quiz
q: Two transformers in parallel have impedances 2 Ω and 3 Ω (same angle). They share a 500 kVA load. How much (kVA) does the 2 Ω unit carry?
answer: 300
verify: 500 * 3 / (2 + 3)
explain: S₁ = S Z₂/(Z₁ + Z₂) = 500 × 3/5 = 300 kVA.
```

```quiz
q: A star-delta transformer introduces a phase shift between primary and secondary line voltages of:
- 0°
* 30°
- 60°
- 120°
explain: Y–Δ and Δ–Y connections shift the line voltages by 30°.
```
