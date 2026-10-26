---
title: Power Systems
chapter: Machines and Power
description: GATE EE syllabus for power systems, with per-unit quantities, transmission line models and performance, power transfer, surge impedance loading, economic dispatch, load flow, symmetrical components and fault analysis, protection and stability, with solved examples.
---
## Syllabus

Power generation concepts; AC and DC transmission; models and performance of transmission lines and cables; economic load dispatch (with and without losses); series and shunt compensation; electric field distribution and insulators; distribution systems; per-unit quantities; bus admittance matrix; Gauss-Seidel and Newton-Raphson load flow; voltage and frequency control; power factor correction; symmetrical components; symmetrical and unsymmetrical faults; over-current, differential, directional and distance protection; circuit breakers; stability and the equal area criterion.

## Key concepts and formulas

**Per-unit system.** Z<sub>base</sub> = V<sub>base</sub>²/S<sub>base</sub>, and Z<sub>pu</sub> = Z/Z<sub>base</sub>. Changing base: **Z<sub>pu,new</sub> = Z<sub>pu,old</sub> (S<sub>new</sub>/S<sub>old</sub>)(V<sub>old</sub>/V<sub>new</sub>)²**. A transformer has the same per-unit impedance on both sides.

**Transmission lines.**

- Short line (< 80 km): series impedance only; A = D = 1, B = Z, C = 0.
- Medium line: nominal π or T models. Long line: distributed parameters, characteristic impedance **Z<sub>c</sub> = √(z/y) ≈ √(L/C)**.
- **Surge impedance loading** SIL = V<sub>L</sub>²/Z<sub>c</sub>. Above SIL a line absorbs reactive power; below it, a lightly loaded long line shows a voltage rise at the receiving end (**Ferranti effect**).
- Voltage regulation = (V<sub>R,no load</sub> − V<sub>R,full load</sub>)/V<sub>R,full load</sub>.

**Power transfer.** Between two buses connected by a reactance X: **P = (V₁V₂/X) sin δ**, maximum V₁V₂/X at δ = 90°. Reactive power flows from the higher voltage to the lower voltage bus.

**Economic dispatch.** Without losses, generators run at **equal incremental cost**: dC₁/dP₁ = dC₂/dP₂ = λ, subject to ΣP = load.

**Load flow.** Bus types: slack (V, δ given), PV or generator (P, |V| given), PQ or load (P, Q given). Y<sub>bus</sub>: diagonal Y<sub>ii</sub> = sum of admittances connected to bus i; off-diagonal Y<sub>ij</sub> = −(admittance between i and j). Newton-Raphson converges quadratically and needs few iterations; Gauss-Seidel is simpler but slower.

**Faults.** Symmetrical components: a = 1∠120°. For a fault at a point with Thevenin pre-fault voltage E = 1 pu:

| Fault | Fault current |
| --- | --- |
| Three-phase | E/Z₁ |
| Line to ground (LG) | 3E/(Z₁ + Z₂ + Z₀) |
| Line to line (LL) | √3E/(Z₁ + Z₂) |
| Double line to ground (LLG) | Sequence networks: positive in series with (negative ∥ zero) |

Three-phase fault MVA = base MVA/Z<sub>pu</sub>.

**Stability.** Swing equation (2H/ω<sub>s</sub>) d²δ/dt² = P<sub>m</sub> − P<sub>e</sub>. **Equal area criterion**: the system stays stable if the accelerating area can be matched by an equal decelerating area. Inertia constant H = stored kinetic energy/machine rating (MJ/MVA).

**Protection.** Differential relays protect transformers and generators; distance (impedance) relays protect lines; over-current relays with time grading protect feeders. Plug setting multiplier = fault current/(relay setting × CT ratio).

## Worked example

A generator rated 50 MVA, 11 kV has X = 0.2 pu. Express it on a 100 MVA, 11 kV base, and find the three-phase fault MVA and current at its terminals. Then find the SIL of a 400 kV line with Z<sub>c</sub> = 400 Ω, and dispatch 300 MW between two units with incremental costs 20 + 0.1P₁ and 16 + 0.08P₂ (₹/MWh, losses ignored).

```python
import math

Xpu = 0.2 * 100 / 50
print(f"X on 100 MVA base = {Xpu:.2f} pu, fault MVA = {100 / Xpu:.0f} MVA")
Ibase = 100e6 / (math.sqrt(3) * 11e3)
print(f"fault current = {Ibase / Xpu / 1000:.3f} kA")
print(f"SIL = {400e3 ** 2 / 400 / 1e6:.0f} MW")
# 20 + 0.1 P1 = 16 + 0.08 P2 = lambda, P1 + P2 = 300
P1 = (16 - 20 + 0.08 * 300) / (0.1 + 0.08)
P2 = 300 - P1
print(f"P1 = {P1:.2f} MW, P2 = {P2:.2f} MW, lambda = {20 + 0.1 * P1:.3f} per MWh")
```
```output
X on 100 MVA base = 0.40 pu, fault MVA = 250 MVA
fault current = 13.122 kA
SIL = 400 MW
P1 = 111.11 MW, P2 = 188.89 MW, lambda = 31.111 per MWh
```

## Practice questions

```quiz
q: A machine has X = 0.25 pu on its own base of 20 MVA. What is its reactance on a 100 MVA base (same voltage)?
answer: 1.25
verify: 0.25 * 100 / 20
explain: Z<sub>new</sub> = 0.25 × (100/20) = 1.25 pu.
```

```quiz
q: A line has a characteristic impedance of 250 Ω and operates at 220 kV. What is its surge impedance loading in MW?
answer: 193.6
verify: round(220e3 ** 2 / 250 / 1e6, 4)
explain: SIL = V²/Z<sub>c</sub> = (220 × 10³)²/250 = 193.6 MW.
```

```quiz
q: At a fault point, Z₁ = Z₂ = 0.2 pu and Z₀ = 0.1 pu, and the pre-fault voltage is 1 pu. What is the line-to-ground fault current in pu?
answer: 6
verify: round(3 * 1 / (0.2 + 0.2 + 0.1), 6)
explain: I<sub>f</sub> = 3E/(Z₁ + Z₂ + Z₀) = 3/0.5 = 6 pu.
```

```quiz
q: Two buses at 1.0 pu are connected by a reactance of 0.5 pu. What is the maximum power (pu) that can be transferred?
answer: 2
verify: 1 * 1 / 0.5
explain: P<sub>max</sub> = V₁V₂/X = 1/0.5 = 2 pu, at δ = 90°.
```

```quiz
q: Which bus type has its real power and voltage magnitude specified in a load flow study?
- Slack bus
* PV (generator) bus
- PQ (load) bus
- None of these
explain: At a PV bus, P and |V| are specified, and Q and δ are found. The slack bus has V and δ specified; a PQ bus has P and Q specified.
```
