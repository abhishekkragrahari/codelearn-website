---
title: Circuit Laws and Network Theorems
chapter: DC Circuits
description: KCL and KVL, nodal and mesh analysis, source transformation, superposition, Thevenin and Norton theorems, maximum power transfer, star-delta conversion, and reciprocity.
---
Every circuit question starts from two laws and a handful of theorems that simplify a network before you solve it.

## Basic laws

- **Ohm's law:** V = IR.
- **KCL:** the sum of currents leaving a node is zero (charge conservation).
- **KVL:** the sum of voltages around any closed loop is zero (energy conservation).
- **Series** resistors add; **parallel**: 1/R = Σ 1/Rᵢ. Two in parallel: R₁R₂/(R₁ + R₂).
- **Voltage divider:** V₁ = V R₁/(R₁ + R₂). **Current divider:** I₁ = I R₂/(R₁ + R₂).

## Systematic analysis

- **Nodal analysis:** pick a reference node, write KCL at the other (n − 1) nodes in terms of node voltages. A voltage source between two non-reference nodes forms a **supernode**.
- **Mesh analysis:** write KVL around each mesh in terms of mesh currents (planar circuits). A current source shared by two meshes forms a **supermesh**.
- Number of independent equations: nodal n − 1; mesh b − n + 1 (b = branches).

## Theorems

- **Source transformation:** voltage source V with series R ⇄ current source V/R with parallel R.
- **Superposition** (linear circuits): find the response to each independent source alone (voltage sources shorted, current sources opened) and add. Not valid for power.
- **Thevenin:** any linear two-terminal network = V_th in series with R_th. V_th = open-circuit voltage; R_th = resistance seen with independent sources killed, or V_oc/I_sc (needed when there are dependent sources).
- **Norton:** I_N = short-circuit current in parallel with R_N = R_th.
- **Maximum power transfer:** R_L = R_th, giving **P_max = V_th²/(4R_th)** at 50% efficiency.
- **Star–delta:** R_Y = (product of the two adjacent Δ resistors)/(sum of all three); for equal resistors R_Y = R_Δ/3.
- **Reciprocity, Millman, Tellegen** (Σ v i = 0 over all branches) and **substitution** theorems.

## Worked example

A 12 V source with internal resistance 2 Ω feeds a 4 Ω resistor in parallel with a 4 Ω load. Find the Thevenin equivalent seen by the load.

- V_th = 12 × 4/(2 + 4) = **8 V**. R_th = 2 ∥ 4 = **1.333 Ω**.
- Load current = 8/(1.333 + 4) = 1.5 A; maximum power would be 8²/(4 × 1.333) = 12 W at R_L = 1.333 Ω.

## Practice

```quiz
q: Three resistors of 30 Ω each are connected in delta. What is each resistance of the equivalent star in Ω?
answer: 10
verify: 30 * 30 / 90
explain: R_Y = (30 × 30)/(30 + 30 + 30) = 10 Ω.
```

```quiz
q: A network has V_th = 20 V and R_th = 5 Ω. What is the maximum power (W) it can deliver to a load?
answer: 20
verify: 20 ** 2 / (4 * 5)
explain: P_max = V_th²/(4R_th) = 400/20 = 20 W.
```

```quiz
q: A circuit has 6 branches and 4 nodes. How many independent mesh equations are needed?
answer: 3
verify: 6 - 4 + 1
explain: Meshes = b − n + 1 = 6 − 4 + 1 = 3.
```

```quiz
q: Superposition cannot be used directly to find:
- Currents in a linear circuit
- Voltages in a linear circuit
* Power in a resistor
- The response to two independent sources
explain: Power is proportional to I², which is not linear, so powers from each source cannot be added.
```
