---
title: Transmission Lines and the Smith Chart
chapter: Transmission Lines
description: Line parameters and characteristic impedance, reflection coefficient and VSWR, input impedance, quarter-wave and half-wave lines, short and open stubs, impedance matching and the Smith chart.
---
At high frequencies, wires become **transmission lines**: voltages and currents travel as waves, and a mismatched load reflects part of the power.

## Line parameters

Per unit length: R, L, G, C.

- **Characteristic impedance Z₀ = √((R + jωL)/(G + jωC))**; lossless: **Z₀ = √(L/C)**.
- Propagation constant γ = √((R + jωL)(G + jωC)); lossless: β = ω√(LC), v = 1/√(LC).
- Distortionless line: **R/L = G/C** (Heaviside condition).

## Reflection

- **Load reflection coefficient Γ_L = (Z_L − Z₀)/(Z_L + Z₀)**.
- **VSWR** S = (1 + |Γ|)/(1 − |Γ|); |Γ| = (S − 1)/(S + 1).
- Matched load: Γ = 0, S = 1. Short: Γ = −1. Open: Γ = +1. Both give S = ∞.
- For a resistive load: S = Z_L/Z₀ if Z_L > Z₀, else Z₀/Z_L.
- **Return loss** = −20 log|Γ| dB; reflected power fraction |Γ|².
- Voltage maxima and minima are λ/4 apart; adjacent maxima are λ/2 apart.

## Input impedance (lossless)

**Z_in = Z₀ (Z_L + jZ₀ tan βl)/(Z₀ + jZ_L tan βl)**

| Line | Z_in |
| --- | --- |
| **Quarter-wave** (l = λ/4) | **Z₀²/Z_L** (impedance inverter) |
| Half-wave (l = λ/2) | Z_L (repeats) |
| **Short-circuited stub** | jZ₀ tan βl (inductive for l < λ/4) |
| **Open-circuited stub** | −jZ₀ cot βl (capacitive for l < λ/4) |

## Matching

- **Quarter-wave transformer** matches resistive loads: **Z₀′ = √(Z₀ Z_L)**.
- **Single-stub matching:** a short-circuited stub placed where the line admittance is 1 ± jb cancels the susceptance.

## Smith chart

A plot of normalised impedance z = Z/Z₀ on the Γ-plane.

- The centre is the matched point (z = 1); the left end is a short, the right end an open.
- Moving along the line traces a circle (constant |Γ| = constant VSWR); one full turn is **λ/2**.
- Impedance and admittance are diametrically opposite.

## Worked example

A 50 Ω line feeds a 200 Ω resistive load.

- Γ = 150/250 = **0.6**; VSWR = **4**; reflected power = 36%.
- A quarter-wave transformer of **100 Ω** matches it.

## Practice

```quiz
q: A 75 Ω line is terminated in 25 Ω. What is the VSWR?
answer: 3
verify: 75 / 25
explain: For a resistive load below Z₀, S = Z₀/Z_L = 3.
```

```quiz
q: A quarter-wave section of 50 Ω line is terminated in 100 Ω. What is its input impedance in Ω?
answer: 25
verify: 50 ** 2 / 100
explain: Z_in = Z₀²/Z_L = 2500/100 = 25 Ω.
```

```quiz
q: A line has VSWR 2. What fraction of the incident power is reflected? (Give 4 decimal places.)
answer: 0.1111
verify: round(((2 - 1) / (2 + 1)) ** 2, 4)
explain: The magnitude of Γ is (2 − 1)/(2 + 1) = 1/3, so the reflected fraction is 1/9 = 0.1111.
```

```quiz
q: A short-circuited lossless stub shorter than λ/4 behaves as:
* An inductor
- A capacitor
- An open circuit
- A resistor
explain: Z_in = jZ₀ tan βl is positive imaginary for βl < π/2: inductive.
```

```quiz
q: A 50 Ω line is terminated in 25 Ω. What is the reflection coefficient?
answer: -0.3333
verify: round((25 - 50) / (25 + 50), 4)
explain: Γ = (25 − 50)/75 = −1/3.
```

```quiz
q: A quarter-wave transformer must match a 100 Ω load to a 25 Ω line. What characteristic impedance (Ω) is needed?
answer: 50
verify: (100 * 25) ** 0.5
explain: Z₀′ = √(100 × 25) = 50 Ω.
```
