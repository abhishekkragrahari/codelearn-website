---
title: Work, Energy, Impulse and Momentum
chapter: Dynamics
description: Work-energy theorem, conservation of energy, power, impulse and momentum, collisions and the coefficient of restitution, and angular momentum, with solved examples.
---
Many dynamics problems are faster with **energy** or **momentum** methods than with F = ma, because they skip the accelerations and go straight from one state to another.

## Work and energy

- Work by a constant force: W = F s cos θ. Work by a spring stretched from x₁ to x₂: ½k(x₁² − x₂²).
- Kinetic energy: translation ½mv²; rotation ½Iω²; rolling ½mv² + ½I_Gω².
- **Work–energy theorem:** total work done on a body = change in its kinetic energy.
- **Conservation of energy** (no friction): KE + PE = constant, with PE = mgh (gravity) + ½kx² (spring).
- **Power** = rate of doing work = F·v = Tω.

## Impulse and momentum

- Linear impulse = ∫F dt = **change in momentum** m(v₂ − v₁).
- If no external force acts on a system in some direction, its total momentum in that direction is **conserved**.
- Angular impulse = change of angular momentum Iω. With no external moment, **Iω is conserved** (a skater who pulls in their arms spins faster).

## Collisions

For a direct central impact between masses m₁ and m₂:

- Momentum is conserved: m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂.
- **Coefficient of restitution** e = (v₂ − v₁)/(u₁ − u₂) = relative speed of separation / relative speed of approach.
- e = 1: perfectly elastic (kinetic energy conserved). e = 0: perfectly plastic (bodies move together).
- Loss of kinetic energy = [m₁m₂ / (2(m₁ + m₂))] (1 − e²)(u₁ − u₂)².

A ball dropped from height h onto a floor rebounds to **e²h**.

## Worked example

A 2 kg ball at 6 m/s hits a stationary 4 kg ball head-on with e = 0.5. Find the speeds after impact.

- Momentum: 2 × 6 = 2v₁ + 4v₂, so v₁ + 2v₂ = 6.
- Restitution: v₂ − v₁ = 0.5 × 6 = 3.
- Adding: 3v₂ = 9, **v₂ = 3 m/s**, **v₁ = 0 m/s**.
- KE loss = ½·2·36 − ½·4·9 = 36 − 18 = 18 J.

## Practice

```quiz
q: A 1500 kg car moving at 20 m/s brakes to rest. How much work (kJ) does friction do on it?
answer: 300
verify: 0.5 * 1500 * 20 ** 2 / 1000
explain: Work = change in KE = ½ × 1500 × 400 = 300 kJ (done against the motion).
```

```quiz
q: A ball is dropped from 4 m onto a floor with e = 0.5. To what height (m) does it rebound?
answer: 1
verify: 0.5 ** 2 * 4
explain: Rebound height = e²h = 0.25 × 4 = 1 m.
```

```quiz
q: A 3 kg body moving at 4 m/s sticks to a 1 kg body at rest. What is their common speed in m/s?
answer: 3
verify: 3 * 4 / (3 + 1)
explain: Perfectly plastic impact: v = 12/4 = 3 m/s.
```

```quiz
q: A force of 10 N acts on a 2 kg body at rest for 3 s. What is its final speed in m/s?
answer: 15
verify: 10 * 3 / 2
explain: Impulse 30 N·s = change in momentum 2v, so v = 15 m/s.
```

```quiz
q: In which collisions is kinetic energy conserved?
* Perfectly elastic (e = 1)
- Perfectly plastic (e = 0)
- All collisions
- Collisions with 0 < e < 1
explain: Only e = 1 conserves kinetic energy; momentum is conserved in all of them.
```

```quiz
q: A 2 kg ball moving at 3 m/s hits a wall and rebounds at 2 m/s. What is the magnitude of the impulse in N·s?
answer: 10
verify: 2 * (3 + 2)
explain: Impulse = change in momentum = 2 × (2 − (−3)) = 10 N·s.
```

```quiz
q: A spring of stiffness 2000 N/m is compressed by 0.1 m. How much energy (J) does it store?
answer: 10
verify: round(0.5 * 2000 * 0.1 ** 2, 6)
explain: U = ½kx² = ½ × 2000 × 0.01 = 10 J.
```
