---
title: Electric Circuits
chapter: Circuits and Fields
description: GATE EE syllabus for electric circuits, with KCL and KVL, network theorems, maximum power transfer, transients, sinusoidal steady state, resonance, two-port networks, three-phase circuits and complex power, with solved examples.
---
## Syllabus

Network elements and sources (independent, dependent); KCL, KVL, node and mesh analysis; Thevenin's, Norton's, superposition and maximum power transfer theorems; transient response of DC and AC networks; sinusoidal steady state; resonance; two-port networks; balanced three-phase circuits; star-delta transformation; complex power and power factor.

## Key concepts and formulas

**Network theorems.** Thevenin: any linear network seen from two terminals is a source V<sub>th</sub> in series with R<sub>th</sub>; Norton: I<sub>N</sub> = V<sub>th</sub>/R<sub>th</sub> in parallel with R<sub>th</sub>. **Maximum power transfer**: R<sub>L</sub> = R<sub>th</sub> gives **P<sub>max</sub> = V<sub>th</sub>²/(4R<sub>th</sub>)** (for AC, Z<sub>L</sub> = Z<sub>th</sub>*). Star-delta: R<sub>Y</sub> = R<sub>Δ</sub>/3 for equal resistors.

**Transients.** First-order circuits: x(t) = x(∞) + (x(0⁺) − x(∞))e<sup>−t/τ</sup>, with **τ = RC** or **L/R**. A capacitor voltage and an inductor current cannot change instantly.

**AC steady state.** Impedances Z<sub>R</sub> = R, Z<sub>L</sub> = jωL, Z<sub>C</sub> = 1/(jωC). Complex power **S = VI\* = P + jQ**, with P = VI cos φ and Q = VI sin φ; power factor = cos φ.

**Resonance.** f₀ = 1/(2π√(LC)). Series RLC: Q = (1/R)√(L/C), bandwidth = f₀/Q, and the impedance is minimum (= R) at resonance. Parallel RLC: Q = R√(C/L).

**Three-phase (balanced).** Star: V<sub>L</sub> = √3V<sub>ph</sub>, I<sub>L</sub> = I<sub>ph</sub>. Delta: I<sub>L</sub> = √3I<sub>ph</sub>, V<sub>L</sub> = V<sub>ph</sub>. Power **P = √3V<sub>L</sub>I<sub>L</sub> cos φ**. Two-wattmeter method: P = W₁ + W₂ and **tan φ = √3(W₁ − W₂)/(W₁ + W₂)**.

**Two-port networks.** Z, Y, h and ABCD parameters. Reciprocal: z₁₂ = z₂₁ (and AD − BC = 1); symmetrical: z₁₁ = z₂₂ (and A = D).

## Worked example

A 12 V source with internal resistance 4 Ω feeds a network that reduces to R<sub>th</sub> = 6 Ω, V<sub>th</sub> = 9 V at the load terminals. Find the maximum power. Find f₀, Q and the bandwidth of a series RLC with R = 10 Ω, L = 10 mH and C = 1 μF. Then find the power factor from wattmeter readings of 6 kW and 2 kW.

```python
import math

Vth, Rth = 9, 6
print(f"Pmax = {Vth ** 2 / (4 * Rth):.4f} W at RL = {Rth} ohm")
R, L, C = 10, 10e-3, 1e-6
f0 = 1 / (2 * math.pi * math.sqrt(L * C))
Q = math.sqrt(L / C) / R
print(f"f0 = {f0:.2f} Hz, Q = {Q:.2f}, bandwidth = {f0 / Q:.2f} Hz")
W1, W2 = 6, 2
phi = math.atan(math.sqrt(3) * (W1 - W2) / (W1 + W2))
print(f"P = {W1 + W2} kW, power factor = {math.cos(phi):.4f}")
```
```output
Pmax = 3.3750 W at RL = 6 ohm
f0 = 1591.55 Hz, Q = 10.00, bandwidth = 159.15 Hz
P = 8 kW, power factor = 0.7559
```

## Practice questions

```quiz
q: A network has V<sub>th</sub> = 20 V and R<sub>th</sub> = 5 Ω. What is the maximum power (W) it can deliver to a resistive load?
answer: 20
verify: 20 ** 2 / (4 * 5)
explain: P<sub>max</sub> = V<sub>th</sub>²/(4R<sub>th</sub>) = 400/20 = 20 W, when R<sub>L</sub> = 5 Ω.
```

```quiz
q: An RC circuit has R = 10 kΩ and C = 100 μF. What is its time constant in seconds?
answer: 1
verify: round(10e3 * 100e-6, 9)
explain: τ = RC = 10⁴ × 10⁻⁴ = 1 s.
```

```quiz
q: A balanced star-connected load draws 10 A at a line voltage of 400 V and power factor 0.8. What is the total power in kW? Give the answer to three decimal places.
answer: 5.543
verify: round(3 ** 0.5 * 400 * 10 * 0.8 / 1000, 3)
explain: P = √3 V<sub>L</sub>I<sub>L</sub> cos φ = 1.732 × 400 × 10 × 0.8 ≈ 5542.6 W ≈ 5.543 kW.
```

```quiz
q: In the two-wattmeter method, both wattmeters read the same value. What is the power factor of the load?
answer: 1
verify: round(__import__("math").cos(__import__("math").atan(0)), 9)
explain: tan φ = √3(W₁ − W₂)/(W₁ + W₂) = 0, so φ = 0 and the power factor is 1 (resistive load).
```

```quiz
q: Three equal resistors of 30 Ω are connected in delta. What is the equivalent resistance per arm of the star?
answer: 10
verify: 30 / 3
explain: For equal resistors, R<sub>Y</sub> = R<sub>Δ</sub>/3 = 10 Ω.
```
