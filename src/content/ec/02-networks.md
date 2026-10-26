---
title: Network Analysis
chapter: Networks, Signals and Systems
description: GATE EC syllabus for network analysis, with node and mesh analysis, network theorems, phasors and complex power, transients in RL, RC and RLC circuits, Laplace-domain analysis and two-port parameters, with solved examples.
---
## Syllabus

Node and mesh analysis, superposition, Thevenin's and Norton's theorems, reciprocity; sinusoidal steady state, phasors, complex power, maximum power transfer; time and frequency domain analysis of RL, RC and RLC circuits; solution of network equations using the Laplace transform; two-port network parameters; wye-delta transformation.

## Key concepts and formulas

**Theorems.** Thevenin/Norton equivalents (R<sub>th</sub> found with independent sources off; with dependent sources, use a test source: R<sub>th</sub> = V<sub>test</sub>/I<sub>test</sub>). Maximum power transfer: R<sub>L</sub> = R<sub>th</sub> (P<sub>max</sub> = V<sub>th</sub>²/(4R<sub>th</sub>)), or Z<sub>L</sub> = Z<sub>th</sub>* for AC. Reciprocity holds for networks of R, L, C and transformers without dependent sources.

**First-order transients.** x(t) = x(∞) + (x(0⁺) − x(∞))e<sup>−t/τ</sup>, τ = RC or L/R. At t = 0⁺ a capacitor keeps its voltage and an inductor keeps its current; at DC steady state a capacitor is an open circuit and an inductor a short circuit.

**Second-order (series RLC).** Characteristic equation s² + (R/L)s + 1/(LC) = 0, with ω₀ = 1/√(LC) and damping ratio ζ = (R/2)√(C/L). Overdamped for ζ > 1, critically damped at ζ = 1 (R = 2√(L/C)), underdamped for ζ < 1.

**Laplace domain.** Impedances R, sL and 1/(sC); initial conditions appear as sources: an inductor with i(0) is sL in series with a source L i(0); a capacitor with v(0) is 1/(sC) in series with a source v(0)/s.

**Phasors and power.** S = V<sub>rms</sub>I<sub>rms</sub>* = P + jQ. Power factor correction: the capacitor needs Q<sub>C</sub> = P(tan φ₁ − tan φ₂).

**Two-port parameters.**

| Parameters | Equations | Reciprocal | Symmetric |
| --- | --- | --- | --- |
| Z | V₁ = z₁₁I₁ + z₁₂I₂, V₂ = z₂₁I₁ + z₂₂I₂ | z₁₂ = z₂₁ | z₁₁ = z₂₂ |
| Y | I₁ = y₁₁V₁ + y₁₂V₂, I₂ = y₂₁V₁ + y₂₂V₂ | y₁₂ = y₂₁ | y₁₁ = y₂₂ |
| h | V₁ = h₁₁I₁ + h₁₂V₂, I₂ = h₂₁I₁ + h₂₂V₂ | h₁₂ = −h₂₁ | Δh = 1 |
| ABCD | V₁ = AV₂ − BI₂, I₁ = CV₂ − DI₂ | AD − BC = 1 | A = D |

Cascaded two-ports multiply their ABCD matrices; series connections add Z matrices; parallel connections add Y matrices.

## Worked example

Find the Z parameters of a T network with series arms 2 Ω and 4 Ω and a shunt arm of 6 Ω, and check reciprocity. For a series RLC with L = 1 H and C = 0.25 F, find the resistance for critical damping. Then find the capacitor current 1 s after a 10 V step is applied to an RC circuit with R = 2 Ω and C = 0.5 F.

```python
import math

Za, Zb, Zc = 2, 4, 6       # series left, series right, shunt
z11, z12, z21, z22 = Za + Zc, Zc, Zc, Zb + Zc
print(f"Z = [[{z11}, {z12}], [{z21}, {z22}]], reciprocal: {z12 == z21}, symmetric: {z11 == z22}")
L, C = 1, 0.25
print(f"critical damping R = 2 sqrt(L/C) = {2 * math.sqrt(L / C):.1f} ohm")
V, R, Cap, t = 10, 2, 0.5, 1
tau = R * Cap
print(f"tau = {tau} s, i(1 s) = {V / R * math.exp(-t / tau):.4f} A, vC(1 s) = {V * (1 - math.exp(-t / tau)):.4f} V")
```
```output
Z = [[8, 6], [6, 10]], reciprocal: True, symmetric: False
critical damping R = 2 sqrt(L/C) = 4.0 ohm
tau = 1.0 s, i(1 s) = 1.8394 A, vC(1 s) = 6.3212 V
```

## Practice questions

```quiz
q: A T network has series arms of 3 Ω and 5 Ω and a shunt arm of 10 Ω. What is z₁₁ in Ω?
answer: 13
verify: 3 + 10
explain: With port 2 open, the input impedance is the left series arm plus the shunt arm: z₁₁ = 3 + 10 = 13 Ω.
```

```quiz
q: A series RLC circuit has L = 4 mH and C = 10 μF. What resistance (Ω) makes it critically damped?
answer: 40
verify: round(2 * (4e-3 / 10e-6) ** 0.5, 6)
explain: R = 2√(L/C) = 2√400 = 40 Ω.
```

```quiz
q: A capacitor charged to 12 V discharges through a 1 kΩ resistor with τ = 2 ms. What is its voltage after 2 ms? Give the answer to three decimal places.
answer: 4.415
verify: round(12 * __import__("math").exp(-1), 3)
explain: v(t) = 12e<sup>−t/τ</sup> = 12e<sup>−1</sup> ≈ 4.415 V.
```

```quiz
q: For a reciprocal two-port described by ABCD parameters, what is AD − BC?
answer: 1
verify: 1
explain: Reciprocity requires AD − BC = 1.
```

```quiz
q: A load draws 10 kW at a power factor of 0.6 lagging. What capacitor reactive power (kVAR) raises the power factor to 0.8 lagging? Give the answer to four decimal places.
answer: 5.8333
verify: round(10 * (0.8 / 0.6 - 0.6 / 0.8), 4)
explain: tan φ₁ = 0.8/0.6 = 1.3333 and tan φ₂ = 0.6/0.8 = 0.75. Q<sub>C</sub> = 10(1.3333 − 0.75) ≈ 5.8333 kVAR.
```
