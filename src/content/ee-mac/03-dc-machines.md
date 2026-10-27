---
title: DC Machines: Generators and Motors
chapter: DC Machines
description: EMF and torque equations, lap and wave windings, types of excitation, armature reaction and commutation, generator characteristics, motor speed and torque, speed control, starting and losses.
---
A DC machine converts between mechanical power and DC electrical power through a commutator. The same machine works as a generator or a motor.

## EMF and torque

**E = P Φ N Z/(60 A)** (V)

- P = poles, Φ = flux per pole (Wb), N = speed (rpm), Z = armature conductors, A = parallel paths: **A = P for lap** winding, **A = 2 for wave** winding.
- **Torque** T = P Φ Z I_a/(2π A) = **E I_a/ω**. So T ∝ Φ I_a and E ∝ Φ N.

## Types

Separately excited, and self-excited: **shunt**, **series** and **compound** (cumulative or differential).

- Generator: V = E − I_a R_a. Motor: **V = E_b + I_a R_a** (E_b = back EMF).
- **Armature reaction** distorts and weakens the main flux; interpoles and compensating windings counter it and help **commutation**.

## Generator characteristics

- Shunt generator builds up only if there is residual flux, the field resistance is below the **critical resistance**, and the field is connected the right way.
- Series generators have a rising characteristic; over-compounded generators make up line drop.

## Motor characteristics

| Motor | Speed–load | Torque | Use |
| --- | --- | --- | --- |
| Shunt | Nearly constant speed | T ∝ I_a | Lathes, fans |
| **Series** | Speed falls sharply with load; **dangerous at no load** | T ∝ I_a² (unsaturated) | Traction, cranes |
| Cumulative compound | Between the two | — | Presses, shears |

**Speed:** N ∝ E_b/Φ = (V − I_a R_a)/Φ.

## Speed control

- **Field control** (shunt motor): weakening Φ **raises** speed above base speed (constant power).
- **Armature voltage / resistance control:** reduces speed below base speed (constant torque). Ward–Leonard gives smooth control.

## Starting and losses

At standstill E_b = 0, so the starting current V/R_a would be huge: a **starter** adds series resistance (3-point and 4-point starters).

Losses: copper (I²R), iron, mechanical, brush contact. Maximum efficiency when **variable (copper) loss = constant loss**.

## Worked example

A 4-pole lap-wound generator has 500 conductors and 0.02 Wb per pole at 1200 rpm.

- E = 4 × 0.02 × 1200 × 500/(60 × 4) = **200 V**.

## Practice

```quiz
q: A 220 V shunt motor has R_a = 0.5 Ω and draws an armature current of 40 A. What is the back EMF in V?
answer: 200
verify: 220 - 40 * 0.5
explain: E_b = V − I_aR_a = 220 − 20 = 200 V.
```

```quiz
q: The same motor runs at 1000 rpm. If the flux is reduced by 20% with the same back EMF, what is the new speed in rpm?
answer: 1250
verify: 1000 / 0.8
explain: N ∝ E_b/Φ, so N = 1000/0.8 = 1250 rpm.
```

```quiz
q: A 6-pole wave-wound armature has 300 conductors, 0.03 Wb per pole and runs at 1000 rpm. What EMF (V) is generated?
answer: 450
verify: 6 * 0.03 * 1000 * 300 / (60 * 2)
explain: E = PΦNZ/(60A) = 6 × 0.03 × 1000 × 300/120 = 450 V.
```

```quiz
q: Why should a DC series motor never be started without load?
* Its speed would rise to dangerous values
- It would not develop any torque
- Its field would be destroyed
- It would run backwards
explain: At no load the current and flux are tiny, and N ∝ 1/Φ, so the speed runs away.
```
