---
title: Transfer Functions, Block Diagrams and Signal Flow Graphs
chapter: Modelling
description: Open and closed-loop systems, transfer functions, block diagram reduction rules, signal flow graphs and Mason's gain formula, effect of feedback, and modelling of mechanical and electrical systems.
---
A control system makes an output follow a desired input. The first step is a model: a **transfer function** for each part, joined in a **block diagram**.

## Open and closed loop

- **Open loop:** no measurement of the output; simple but cannot correct disturbances.
- **Closed loop (feedback):** the output is measured and compared with the input.
- With forward path G(s) and feedback H(s) (negative feedback):

**T(s) = C(s)/R(s) = G(s)/(1 + G(s)H(s))**

**Effects of negative feedback:** reduces sensitivity to parameter changes (S = 1/(1 + GH)), reduces the effect of disturbances, increases bandwidth, reduces overall gain, and can cause instability.

## Block diagram reduction

| Rule | Result |
| --- | --- |
| Blocks in series | G₁G₂ |
| Blocks in parallel | G₁ ± G₂ |
| Feedback loop | G/(1 ± GH) |
| Moving a take-off point after a block | Add 1/G in the branch |
| Moving a summing point before a block | Add 1/G in the branch |

## Signal flow graphs and Mason's rule

**T = Σ P_k Δ_k / Δ**

- P_k: gain of the kth forward path.
- **Δ = 1 − (sum of loop gains) + (sum of products of pairs of non-touching loops) − (triples) + …**
- Δ_k: Δ with the loops touching the kth forward path removed.

## Modelling physical systems

- **Mechanical (translational):** M d²x/dt² + B dx/dt + Kx = F → X/F = 1/(Ms² + Bs + K).
- **Force–voltage analogy:** M ↔ L, B ↔ R, K ↔ 1/C, F ↔ V, velocity ↔ current.
- **Armature-controlled DC motor:** ω(s)/V(s) = K_t/[(R_a + sL_a)(Js + B) + K_tK_b], second order (first order if L_a is ignored).

## Worked example

Two loops in series: G₁ = 10/(s + 1) with unity feedback.

- T = 10/(s + 1 + 10) = 10/(s + 11): DC gain 10/11, pole moved from −1 to −11 (faster).

## Practice

```quiz
q: A unity-feedback system has G(s) = 9/(s + 1). What is the closed-loop DC gain?
answer: 0.9
verify: 9 / (1 + 9)
explain: T(0) = G(0)/(1 + G(0)) = 9/10 = 0.9.
```

```quiz
q: A signal flow graph has one forward path of gain 10 and two non-touching loops of gains −2 and −3, both touching the forward path. What is the overall gain?
answer: 0.8333
verify: round(10 / (1 - (-2 - 3) + (-2) * (-3)), 4)
explain: Δ = 1 − (−5) + 6 = 12; Δ₁ = 1. T = 10/12 = 0.8333.
```

```quiz
q: A system has open-loop gain GH = 99 at low frequency. By what factor does negative feedback reduce its sensitivity to changes in G?
answer: 100
verify: 1 + 99
explain: Sensitivity S = 1/(1 + GH) = 1/100, a reduction by a factor of 100.
```

```quiz
q: In the force–voltage analogy, mass corresponds to:
* Inductance
- Capacitance
- Resistance
- Conductance
explain: F = M dv/dt matches V = L di/dt, so mass ↔ inductance.
```
