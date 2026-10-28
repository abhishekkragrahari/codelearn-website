---
title: Magnetostatics: Biot-Savart and Ampere's Law
chapter: Static Fields
description: Biot-Savart law, magnetic field of a wire, loop and solenoid, Ampere's circuital law, magnetic flux and force on conductors, magnetic materials, boundary conditions and inductance.
---
Steady currents produce **magnetic fields**. The field H (A/m) and flux density B = μH (tesla) describe them.

## Biot–Savart law

**dH = I dl × â_R/(4π R²)**

Results:

| Source | Field |
| --- | --- |
| Infinite straight wire | H = I/(2πr), circles around the wire |
| Finite wire | H = (I/(4πr))(sin α₂ − sin α₁) |
| Centre of a circular loop (radius a) | H = I/(2a) |
| On the axis of a loop at distance z | H = I a²/(2(a² + z²)^(3/2)) |
| Long solenoid (n turns/m) | H = nI inside, ~0 outside |
| Toroid | H = NI/(2πr) inside |

## Ampere's circuital law

**∮ H·dl = I_enclosed**; point form **∇ × H = J**.

**∇·B = 0:** there are no magnetic monopoles; flux lines always close.

## Forces

- On a charge: **F = q(E + v × B)** (Lorentz force).
- On a conductor: **F = I L × B**.
- Between two parallel wires: force per metre = **μ₀I₁I₂/(2πd)**; attractive for currents in the same direction.
- μ₀ = 4π × 10⁻⁷ H/m.

## Magnetic materials and boundaries

- Diamagnetic (μ_r slightly < 1), paramagnetic (slightly > 1), ferromagnetic (μ_r ≫ 1, with hysteresis).
- At a boundary (no surface current): **normal B is continuous**; **tangential H is continuous**.

## Inductance

- **L = NΦ/I** (flux linkage per ampere). Energy W = ½LI²; energy density ½μH².
- Solenoid: L = μN²A/l. Toroid: L = μN²A/(2πr).
- Coaxial cable (per metre, external): L = (μ/(2π)) ln(b/a).
- Two-wire line (per metre): L ≈ (μ/π) ln(d/a).

## Worked example

Two parallel wires 0.1 m apart carry 50 A each in the same direction.

- F = 4π × 10⁻⁷ × 50 × 50/(2π × 0.1) = **5 mN per metre**, attractive.

## Practice

```quiz
q: What is the magnetic field intensity (A/m) 0.5 m from a long wire carrying 10 A? (Give 3 decimal places.)
answer: 3.183
verify: round(10 / (2 * __import__("math").pi * 0.5), 3)
explain: H = I/(2πr) = 10/π = 3.183 A/m.
```

```quiz
q: A circular loop of radius 0.1 m carries 2 A. What is H (A/m) at its centre?
answer: 10
verify: 2 / (2 * 0.1)
explain: H = I/(2a) = 2/0.2 = 10 A/m.
```

```quiz
q: A solenoid has 1000 turns over 0.5 m and carries 2 A. What is H inside (A/m)?
answer: 4000
verify: 1000 / 0.5 * 2
explain: H = nI = 2000 × 2 = 4000 A/m.
```

```quiz
q: Which Maxwell equation states that magnetic monopoles do not exist?
- ∇·D = ρ
* ∇·B = 0
- ∇ × E = −∂B/∂t
- ∇ × H = J
explain: Zero divergence of B means every flux line closes on itself.
```

```quiz
q: Two parallel wires 0.2 m apart carry 100 A each. What is the force per metre in N? (μ₀ = 4π × 10⁻⁷)
answer: 0.01
verify: round(4e-7 * __import__("math").pi * 100 * 100 / (2 * __import__("math").pi * 0.2), 6)
explain: F/L = μ₀I₁I₂/(2πd) = 2 × 10⁻⁷ × 10⁴/0.2 = 0.01 N/m.
```

```quiz
q: A toroid has 500 turns on a mean radius of 0.1 m and carries 2 A. What is H inside it in A/m? (Give 2 decimal places.)
answer: 1591.55
verify: round(500 * 2 / (2 * __import__("math").pi * 0.1), 2)
explain: H = NI/(2πr) = 1000/0.6283 = 1591.55 A/m.
```
