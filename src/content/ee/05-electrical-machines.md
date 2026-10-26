---
title: Electrical Machines
chapter: Machines and Power
description: GATE EE syllabus for electrical machines, with transformers (EMF equation, tests, regulation, efficiency), DC machines, three-phase induction motors (slip, power flow, torque), synchronous machines and losses, with solved examples.
---
## Syllabus

Single-phase transformer (equivalent circuit, phasor diagram, open and short circuit tests, regulation, efficiency); three-phase transformers (connections, vector groups, parallel operation); auto-transformer; electromechanical energy conversion; DC machines (types, characteristics, speed control); three-phase induction machines (principle, types, torque-speed characteristics, tests, equivalent circuit, starting and speed control); single-phase induction motors; synchronous machines (cylindrical and salient pole, regulation, parallel operation, starting); losses and efficiency.

## Key concepts and formulas

**Transformer.**

- EMF equation **E = 4.44fNΦ<sub>m</sub>**; turns ratio a = N₁/N₂ = V₁/V₂ = I₂/I₁.
- The open circuit test gives the core (iron) loss and the shunt branch; the short circuit test gives the full-load copper loss and the series impedance.
- Copper loss scales with the square of the load fraction x: P<sub>cu</sub> = x²P<sub>cu,FL</sub>. **Maximum efficiency** occurs when copper loss = core loss, at x = √(P<sub>core</sub>/P<sub>cu,FL</sub>).
- Efficiency η = output/(output + core loss + copper loss).
- Approximate regulation ≈ (R cos φ ± X sin φ) in per unit (+ for lagging).
- Auto-transformer: with K = V<sub>low</sub>/V<sub>high</sub>, it needs (1 − K) times the copper of a two-winding transformer of the same rating, so the fraction of copper saved is K.

**DC machines.** Generated EMF **E = PΦZN/(60A)** (A = 2 for wave, A = P for lap winding). Motor: V = E<sub>b</sub> + I<sub>a</sub>R<sub>a</sub>; torque T = PΦZI<sub>a</sub>/(2πA); speed N ∝ E<sub>b</sub>/Φ. A series motor must never be started without load.

**Three-phase induction motor.**

- Synchronous speed **N<sub>s</sub> = 120f/P**; slip **s = (N<sub>s</sub> − N)/N<sub>s</sub>**; rotor frequency = sf.
- Power flow: air-gap power P<sub>ag</sub>; **rotor copper loss = sP<sub>ag</sub>**; mechanical power = (1 − s)P<sub>ag</sub>. So P<sub>ag</sub> : P<sub>cu,r</sub> : P<sub>m</sub> = 1 : s : (1 − s).
- Maximum torque occurs at slip s<sub>m</sub> = R₂/X₂ and its value is independent of rotor resistance. Starting torque is maximum when R₂ = X₂.
- Torque ∝ V² (at a given slip). Star-delta starting reduces the starting current and torque to 1/3 of direct-on-line values.

**Synchronous machines.** Speed N<sub>s</sub> = 120f/P. Power of a cylindrical rotor machine **P = (EV/X<sub>s</sub>) sin δ**, maximum at δ = 90°. An over-excited synchronous motor draws leading current (used as a synchronous condenser). Regulation by EMF, MMF and ZPF methods. Conditions for paralleling alternators: same voltage, frequency, phase sequence and phase.

## Worked example

A 4-pole, 50 Hz induction motor runs at 1440 rpm with an air-gap power of 20 kW. Find the slip, the rotor copper loss and the mechanical power. A 100 kVA transformer has core loss 1 kW and full-load copper loss 1.5 kW: find the load at maximum efficiency and the maximum efficiency at unity power factor.

```python
import math

P, f, N, Pag = 4, 50, 1440, 20.0
Ns = 120 * f / P
s = (Ns - N) / Ns
print(f"Ns = {Ns:.0f} rpm, slip = {s:.3f}, rotor Cu loss = {s * Pag:.2f} kW, Pm = {(1 - s) * Pag:.2f} kW")
S, core, cu = 100, 1.0, 1.5
x = math.sqrt(core / cu)
out = x * S
eta = out / (out + core + x * x * cu)
print(f"max efficiency at {x * 100:.2f}% load ({out:.2f} kVA), eta = {eta * 100:.3f}%")
print(f"EMF: 4.44 * 50 * 200 * 0.01 = {4.44 * 50 * 200 * 0.01:.1f} V")
```
```output
Ns = 1500 rpm, slip = 0.040, rotor Cu loss = 0.80 kW, Pm = 19.20 kW
max efficiency at 81.65% load (81.65 kVA), eta = 97.609%
EMF: 4.44 * 50 * 200 * 0.01 = 444.0 V
```

## Practice questions

```quiz
q: What is the synchronous speed (rpm) of a 6-pole, 50 Hz induction motor?
answer: 1000
verify: 120 * 50 / 6
explain: N<sub>s</sub> = 120f/P = 6000/6 = 1000 rpm.
```

```quiz
q: An induction motor has an air-gap power of 10 kW and runs at a slip of 4%. What is the rotor copper loss in kW?
answer: 0.4
verify: round(0.04 * 10, 9)
explain: Rotor copper loss = sP<sub>ag</sub> = 0.04 × 10 = 0.4 kW.
```

```quiz
q: A transformer has a core loss of 400 W and a full-load copper loss of 1600 W. At what fraction of full load is the efficiency maximum?
answer: 0.5
verify: (400 / 1600) ** 0.5
explain: x = √(P<sub>core</sub>/P<sub>cu,FL</sub>) = √0.25 = 0.5, i.e. half load.
```

```quiz
q: A 4-pole, lap-wound DC generator has 600 conductors, a flux of 0.02 Wb per pole and runs at 1500 rpm. What EMF (V) does it generate?
answer: 300
verify: 4 * 0.02 * 600 * 1500 / (60 * 4)
explain: E = PΦZN/(60A) with A = P = 4 for lap winding: 4 × 0.02 × 600 × 1500/(60 × 4) = 300 V.
```

```quiz
q: With star-delta starting, the starting torque of an induction motor is what fraction of its direct-on-line starting torque? Give the answer to four decimal places.
answer: 0.3333
verify: round(1 / 3, 4)
explain: The phase voltage is reduced by √3, and torque ∝ V², so the starting torque falls to 1/3 ≈ 0.3333 of its DOL value.
```
