---
title: Per-Unit System and Load Flow
chapter: Analysis
description: Per-unit quantities and change of base, single-line diagrams, bus admittance matrix formation, bus types, Gauss-Seidel and Newton-Raphson load flow, and voltage control.
---
Large networks are analysed in **per unit** on common bases, and their steady-state operation is found by **load flow** (power flow) studies.

## Per-unit system

- Choose S_base (three-phase MVA) and V_base (line kV) in one zone; V_base in other zones follows the transformer ratios.
- **Z_base = V_base²/S_base**; **I_base = S_base/(√3 V_base)**.
- **Change of base:** **Z_new = Z_old (S_new/S_old)(V_old/V_new)²**.
- Advantages: transformer impedances are the same on both sides, values fall in a narrow range, and √3 factors disappear.

## Bus admittance matrix (Y_bus)

For a network with line admittances y_ij:

- Diagonal **Y_ii = sum of all admittances connected to bus i** (including shunt charging).
- Off-diagonal **Y_ij = −y_ij** (zero if not connected).
- Y_bus is **sparse** and symmetric (without phase shifters). Z_bus = Y_bus⁻¹ is full.

## Bus types

| Bus | Specified | Unknown |
| --- | --- | --- |
| **Slack (swing)** | V, δ (= 0) | P, Q |
| **PV (generator)** | P, V | Q, δ |
| **PQ (load)** | P, Q | V, δ |

## Power flow equations

P_i − jQ_i = V_i* Σ Y_ij V_j

These are non-linear, so they are solved iteratively:

- **Gauss–Seidel:** simple, little memory per iteration, but many iterations (convergence slows with system size); acceleration factor about 1.6.
- **Newton–Raphson:** uses the Jacobian; **quadratic convergence**, few iterations (3–5) independent of size; standard for large systems.
- **Fast decoupled:** uses P–δ and Q–V decoupling with constant matrices; very fast.
- **DC load flow:** lossless, flat voltages, P = B′δ; linear and approximate.

## Voltage and frequency control

- **Real power ↔ frequency** (governors, load frequency control).
- **Reactive power ↔ voltage** (generator excitation, tap-changing transformers, shunt capacitors and reactors, SVCs).

## Worked example

A 50 MVA, 11 kV generator has X = 0.2 pu. On a 100 MVA, 11 kV base:

- X_new = 0.2 × (100/50) × (11/11)² = **0.4 pu**.

## Practice

```quiz
q: What is the base impedance (Ω) for 100 MVA and 132 kV? (Give 2 decimal places.)
answer: 174.24
verify: round(132 ** 2 / 100, 2)
explain: Z_base = kV²/MVA = 17,424/100 = 174.24 Ω.
```

```quiz
q: A bus connects to two lines with admittances −j5 and −j10 pu. What is the diagonal element Y_ii (imaginary part, in pu)?
answer: -15
verify: -5 - 10
explain: Y_ii = −j5 − j10 = −j15 pu.
```

```quiz
q: A 20 MVA, 33 kV transformer has X = 0.1 pu. What is its reactance on a 100 MVA, 33 kV base (pu)?
answer: 0.5
verify: 0.1 * 100 / 20
explain: X_new = 0.1 × 100/20 = 0.5 pu.
```

```quiz
q: At a PV bus, the quantities specified are:
- P and Q
* P and |V|
- |V| and δ
- Q and δ
explain: A generator bus holds its real power output and voltage magnitude; Q and δ are found by the load flow.
```

```quiz
q: What is the base current (A) for 100 MVA and 11 kV? (Give 2 decimal places.)
answer: 5248.64
verify: round(100e6 / (3 ** 0.5 * 11e3), 2)
explain: I_base = S/(√3 V) = 10⁸/(1.732 × 11,000) = 5248.64 A.
```

```quiz
q: A 10 MVA generator has X = 0.15 pu. What is its reactance on a 50 MVA base (same voltage)?
answer: 0.75
verify: round(0.15 * 50 / 10, 6)
explain: X_new = 0.15 × 50/10 = 0.75 pu.
```
