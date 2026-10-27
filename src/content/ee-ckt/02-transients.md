---
title: Transient Analysis of RC, RL and RLC Circuits
chapter: Transients
description: Initial and final conditions, first-order RC and RL responses, time constant, second-order RLC circuits, damping, and Laplace transform analysis of circuits.
---
When a switch opens or closes, currents and voltages move from one steady state to another. This **transient** follows simple exponential or oscillating forms.

## Initial and final conditions

- A **capacitor voltage** cannot change instantly: v_C(0⁺) = v_C(0⁻). In DC steady state a capacitor is an **open circuit**.
- An **inductor current** cannot change instantly: i_L(0⁺) = i_L(0⁻). In DC steady state an inductor is a **short circuit**.
- At t = 0⁺, an uncharged capacitor acts like a short; an unenergised inductor acts like an open.

## First-order circuits

Any variable x in an RC or RL circuit with a DC source follows:

**x(t) = x(∞) + [x(0⁺) − x(∞)] e^(−t/τ)**

- **τ = RC** or **τ = L/R**, with R the Thevenin resistance seen by C or L.
- After 1τ the change is 63.2% complete; after 5τ it is over 99%.
- Energy stored: ½CV² and ½LI².

## Second-order RLC circuits

Series RLC: s² + (R/L)s + 1/(LC) = 0.

- **Natural frequency** ω₀ = 1/√(LC).
- **Damping ratio** ζ = (R/2)√(C/L) for series RLC.
- ζ > 1 **overdamped** (two real roots), ζ = 1 **critically damped**, ζ < 1 **underdamped** (oscillates at ω_d = ω₀√(1 − ζ²)).
- Critical resistance for series RLC: R = 2√(L/C).

## Laplace method

Transform elements with their initial conditions:

- R → R; L → sL with a source L i(0⁻); C → 1/(sC) with a source v(0⁻)/s.
- Solve algebraically in s, then take the inverse transform. **Initial value theorem:** f(0⁺) = lim s F(s) as s → ∞; **final value:** f(∞) = lim s F(s) as s → 0 (if stable).

## Worked example

A 10 V source charges a 100 µF capacitor through 10 kΩ, starting from 0 V.

- τ = 10⁴ × 10⁻⁴ = 1 s. v_C(t) = 10(1 − e^(−t)).
- At t = 2 s: v_C = 10(1 − e⁻²) = **8.65 V**.

## Practice

```quiz
q: An RL circuit has R = 50 Ω and L = 0.1 H. What is its time constant in ms?
answer: 2
verify: 0.1 / 50 * 1000
explain: τ = L/R = 0.1/50 = 0.002 s = 2 ms.
```

```quiz
q: A capacitor charged to 20 V discharges through a resistor with τ = 0.5 s. What is its voltage after 1 s? (Give 2 decimal places.)
answer: 2.71
verify: round(20 * __import__("math").exp(-1 / 0.5), 2)
explain: v = 20e^(−2) = 20 × 0.1353 = 2.71 V.
```

```quiz
q: A series RLC circuit has L = 1 H and C = 1 µF. What resistance (Ω) gives critical damping?
answer: 2000
verify: 2 * (1 / 1e-6) ** 0.5
explain: R = 2√(L/C) = 2√(10⁶) = 2000 Ω.
```

```quiz
q: In DC steady state, an inductor behaves as:
* A short circuit
- An open circuit
- A current source of zero value
- A resistor equal to L
explain: With constant current, v = L di/dt = 0, so the inductor is a short circuit.
```
