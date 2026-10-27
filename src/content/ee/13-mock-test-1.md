---
title: GATE EE Mock Test 1 (20 Questions, Free)
chapter: Exam Prep
description: A free GATE Electrical Engineering mock test with 20 original questions on circuits, fields, signals, machines, power systems, control and power electronics.
---
This mock test has **20 original GATE-style questions** across the electrical engineering syllabus. Give yourself **60 minutes**, write your answers on paper, then open each question to check. Score +1 per correct answer and −1/3 per wrong MCQ.

> **Note:** All questions are written for GateShala in the GATE style; none is copied from a GATE paper. Every numerical answer is recomputed by a program when the site is built.

## Circuits and fields

```quiz
q: Three resistors of 6 Ω, 3 Ω and 2 Ω are connected in parallel. What is the equivalent resistance in Ω?
answer: 1
verify: round(1 / (1 / 6 + 1 / 3 + 1 / 2), 6)
explain: 1/R = 1/6 + 2/6 + 3/6 = 1, so R = 1 Ω.
```

```quiz
q: A source with Thevenin voltage 20 V and resistance 4 Ω feeds a load chosen for maximum power transfer. What is the maximum power in W?
answer: 25
verify: 20 ** 2 / (4 * 4)
explain: P_max = V_th²/(4R_th) = 400/16 = 25 W.
```

```quiz
q: An RC circuit has R = 10 kΩ and C = 100 µF. What is its time constant in seconds?
answer: 1
verify: round(10e3 * 100e-6, 6)
explain: τ = RC = 10⁴ × 10⁻⁴ = 1 s.
```

```quiz
q: A load draws 10 A at 230 V with power factor 0.8 lagging. What is the real power in W?
answer: 1840
verify: round(230 * 10 * 0.8, 6)
explain: P = VI cos φ = 230 × 10 × 0.8 = 1840 W.
```

```quiz
q: A parallel-plate capacitor in air has its plate gap doubled and a dielectric with ε_r = 4 inserted to fill it. The capacitance becomes:
- Half
- The same
* Twice
- Four times
explain: C = ε₀ε_r A/d: ε_r × 4 and d × 2 give a net factor of 2.
```

## Signals and control

```quiz
q: A causal LTI system has transfer function H(s) = 1/((s + 1)(s − 2)). It is:
- Stable
* Unstable
- Marginally stable
- Stable only for step inputs
explain: The pole at s = +2 is in the right half-plane, so the causal system is unstable.
```

```quiz
q: A unity-feedback system has open-loop G(s) = 10/(s(s + 2)). What is the steady-state error for a unit ramp input?
answer: 0.2
verify: 1 / (10 / 2)
explain: K_v = lim s·G(s) = 10/2 = 5, so e_ss = 1/K_v = 0.2.
```

```quiz
q: For the closed loop of G(s) = 16/(s(s + 4)) with unity feedback, what is the damping ratio?
answer: 0.5
verify: 4 / (2 * 16 ** 0.5)
explain: Closed loop: 16/(s² + 4s + 16), so ω_n = 4 and 2ζω_n = 4, giving ζ = 0.5.
```

```quiz
q: What is the peak overshoot (as a fraction) of a second-order system with ζ = 0.5? (Give 3 decimal places.)
answer: 0.163
verify: round(__import__("math").exp(-__import__("math").pi * 0.5 / (1 - 0.25) ** 0.5), 3)
explain: M_p = e^(−πζ/√(1 − ζ²)) = e^(−1.814) ≈ 0.163.
```

## Machines

```quiz
q: A 2200/220 V transformer has a secondary current of 50 A. What is the primary current in A (ideal transformer)?
answer: 5
verify: 50 * 220 / 2200
explain: I₁ = I₂ × V₂/V₁ = 50 × 220/2200 = 5 A.
```

```quiz
q: What is the synchronous speed in rpm of a 6-pole, 50 Hz machine?
answer: 1000
verify: 120 * 50 // 6
explain: N_s = 120f/P = 6000/6 = 1000 rpm.
```

```quiz
q: An induction motor has air-gap power 10 kW and slip 0.05. What is the rotor copper loss in W?
answer: 500
verify: round(0.05 * 10000, 6)
explain: Rotor copper loss = s × P_ag = 0.05 × 10000 = 500 W.
```

```quiz
q: A transformer has full-load copper loss 400 W and core loss 100 W. At what fraction of full load is efficiency maximum?
answer: 0.5
verify: (100 / 400) ** 0.5
explain: Maximum efficiency when x² × 400 = 100, so x = √0.25 = 0.5.
```

## Power systems

```quiz
q: A lossless line has V₁ = V₂ = 1 pu and X = 0.5 pu. What is the maximum power it can transfer in pu?
answer: 2
verify: 1 * 1 / 0.5
explain: P_max = V₁V₂/X = 1/0.5 = 2 pu.
```

```quiz
q: The Thevenin impedance at a bus is 0.2 pu. What is the three-phase fault current in pu (prefault voltage 1 pu)?
answer: 5
verify: 1 / 0.2
explain: I_f = 1/Z_th = 5 pu.
```

```quiz
q: An impedance of 0.1 pu on a 50 MVA base is converted to a 100 MVA base at the same voltage. What is the new per-unit value?
answer: 0.2
verify: 0.1 * 100 / 50
explain: Z_new = Z_old × S_new/S_old = 0.1 × 2 = 0.2 pu.
```

## Electronics, power electronics and measurements

```quiz
q: A boost converter has input 12 V and duty ratio 0.6. What is the output voltage in V?
answer: 30
verify: round(12 / (1 - 0.6), 6)
explain: V_o = V_in/(1 − D) = 12/0.4 = 30 V.
```

```quiz
q: An ideal inverting op-amp amplifier has R_f = 100 kΩ and R_in = 10 kΩ. What is its voltage gain?
answer: -10
verify: -100 / 10
explain: Gain = −R_f/R_in = −10.
```

```quiz
q: A meter with resistance 9 Ω and full-scale current 10 mA is to read 100 mA. What shunt resistance in Ω is needed?
answer: 1
verify: round(0.01 * 9 / (0.1 - 0.01), 6)
explain: R_sh = I_m R_m/(I − I_m) = 0.01 × 9/0.09 = 1 Ω.
```

```quiz
q: Which of these are fully controlled power switches (can be turned on and off by the gate)? (Select all that apply.)
* IGBT
* MOSFET
- Diode
- SCR
explain: IGBTs and MOSFETs turn on and off by gate control. A diode is uncontrolled and an SCR cannot be turned off by its gate.
```

## Your score

| Score (out of 20) | What it means |
| --- | --- |
| 16 and above | Strong: move to full-length papers |
| 10 – 15 | Revise the subjects where you lost marks |
| Below 10 | Go back to the lessons, then retake after two weeks |

Revise with the [formula sheet](formula-sheet.html) and follow the [study plan](study-plan.html).
