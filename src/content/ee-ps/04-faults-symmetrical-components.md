---
title: Faults and Symmetrical Components
chapter: Analysis
description: Symmetrical three-phase faults and fault MVA, sub-transient and transient reactances, symmetrical components, sequence networks, and line-to-ground, line-to-line and double line-to-ground faults.
---
A fault (short circuit) draws very large currents. Fault studies size circuit breakers and set protection.

## Symmetrical (three-phase) faults

- With pre-fault voltage 1 pu and Thevenin impedance Z_th at the fault: **I_f = 1/Z_th pu**.
- **Fault MVA = S_base/Z_th(pu)** = √3 V_L I_f.
- A generator's reactance rises after the fault: **sub-transient** X″_d (first cycles) < **transient** X′_d < **synchronous** X_d (steady state). Breakers are rated using X″_d.
- **Current-limiting reactors** reduce fault levels.

## Symmetrical components

Any unbalanced set of three phasors = sum of three balanced sets:

- **Positive sequence** (abc rotation), **negative sequence** (acb), **zero sequence** (all in phase).
- With operator **a = 1∠120°**: I_a0 = (I_a + I_b + I_c)/3, I_a1 = (I_a + a I_b + a² I_c)/3, I_a2 = (I_a + a² I_b + a I_c)/3.
- 1 + a + a² = 0.
- Zero-sequence current flows only if there is a return path (grounded neutral); the neutral carries 3I₀. Delta windings block zero sequence from the lines.

## Unsymmetrical faults (unloaded generator, E = 1 pu)

| Fault | Connection of sequence networks | Fault current |
| --- | --- | --- |
| **Single line-to-ground (LG)** | Series: Z₁ + Z₂ + Z₀ (+ 3Z_f) | **I_f = 3E/(Z₁ + Z₂ + Z₀ + 3Z_f)** |
| **Line-to-line (LL)** | Positive and negative in parallel | I_f = √3 E/(Z₁ + Z₂) |
| **Double line-to-ground (LLG)** | Negative ∥ zero, in series with positive | I_a1 = E/(Z₁ + Z₂Z₀/(Z₂ + Z₀)) |

For a solidly grounded generator with Z₀ small, the LG fault can be larger than the three-phase fault. Grounding the neutral through a reactance limits it.

## Worked example

A generator has Z₁ = Z₂ = j0.2 pu and Z₀ = j0.1 pu, solidly grounded.

- Three-phase fault: 1/0.2 = **5 pu**.
- LG fault: 3/(0.2 + 0.2 + 0.1) = **6 pu**.
- LL fault: √3/0.4 = **4.33 pu**.

## Practice

```quiz
q: A bus has a Thevenin reactance of 0.1 pu on a 100 MVA base. What is its fault level in MVA?
answer: 1000
verify: 100 / 0.1
explain: Fault MVA = S_base/X_th = 100/0.1 = 1000 MVA.
```

```quiz
q: For the bus above at 11 kV, what is the three-phase fault current in kA? (Give 2 decimal places.)
answer: 52.49
verify: round(1000e6 / (3 ** 0.5 * 11e3) / 1e3, 2)
explain: I = 1000 MVA/(√3 × 11 kV) = 52.49 kA.
```

```quiz
q: The phase currents are I_a = 10, I_b = 0 and I_c = 0 A. What is the zero-sequence current in A? (Give 3 decimal places.)
answer: 3.333
verify: round(10 / 3, 3)
explain: I₀ = (I_a + I_b + I_c)/3 = 10/3 = 3.333 A (and I₁ = I₂ = 3.333 A too).
```

```quiz
q: Which fault involves all three sequence networks connected in series?
* Single line-to-ground fault
- Line-to-line fault
- Three-phase fault
- Double line-to-ground fault
explain: In an LG fault, I_a1 = I_a2 = I_a0, so the three networks carry the same current in series.
```

```quiz
q: A generator has Z₁ = Z₂ = 0.25 pu and Z₀ = 0.1 pu. What is the line-to-ground fault current in pu?
answer: 5
verify: 3 / (0.25 + 0.25 + 0.1)
explain: I_f = 3/(Z₁ + Z₂ + Z₀) = 3/0.6 = 5 pu.
```

```quiz
q: A bus has a fault level of 500 MVA on a 100 MVA base. What is its Thevenin reactance in pu?
answer: 0.2
verify: 100 / 500
explain: X_th = S_base/fault MVA = 0.2 pu.
```
