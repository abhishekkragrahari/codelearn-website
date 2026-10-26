---
title: Theory of Machines and Vibrations
chapter: Applied Mechanics and Design
description: GATE ME syllabus for theory of machines and vibrations, with mobility and Grashof's law, gears and gear trains, flywheels, governors, balancing, gyroscopes, free and forced vibration, damping, transmissibility and critical speed, with solved examples.
---
## Syllabus

- **Theory of machines**: velocity and acceleration analysis of plane mechanisms, dynamic analysis of linkages, cams, gears and gear trains, flywheels and governors, balancing of reciprocating and rotating masses, gyroscope.
- **Vibrations**: free and forced vibration of single degree of freedom systems, damping, vibration isolation, resonance, critical speeds of shafts.

## Key concepts and formulas

**Mobility (Gruebler).** For a planar mechanism with n links, j₁ lower pairs and j₂ higher pairs: **F = 3(n − 1) − 2j₁ − j₂**.

**Grashof's law.** For a four-bar chain with shortest link s, longest l and others p, q: if **s + l ≤ p + q**, at least one link can rotate fully. With the shortest link as the frame, it is a double-crank; adjacent to the shortest, a crank-rocker; opposite, a double-rocker.

**Instantaneous centres.** A mechanism with n links has n(n − 1)/2 instantaneous centres (Kennedy's theorem: any three links' centres lie on a line).

**Gears.** Module m = D/T; circular pitch πm. Velocity ratio of a simple train = product of driver teeth / product of driven teeth (with sign for direction). Minimum teeth to avoid interference (20° full depth) is about 18. In an epicyclic train, use the tabular method: fix the arm, rotate the sun, add the arm motion.

**Flywheel.** Fluctuation of energy ΔE = **Iω²C<sub>s</sub>**, where C<sub>s</sub> = (ω<sub>max</sub> − ω<sub>min</sub>)/ω is the coefficient of fluctuation of speed.

**Governors.** Watt governor height h = g/ω² (h in m, ω in rad/s). A governor is isochronous if its equilibrium speed is the same for all radii; sensitiveness = (N₂ − N₁)/N.

**Gyroscope.** Gyroscopic couple **C = Iωω<sub>p</sub>** (spin ω, precession ω<sub>p</sub>).

**Balancing.** Rotating masses are balanced if Σ m r = 0 (force) and Σ m r l = 0 (couple), on a single plane or two planes.

**Free vibration.** ω<sub>n</sub> = √(k/m); f<sub>n</sub> = ω<sub>n</sub>/(2π). With static deflection δ: ω<sub>n</sub> = √(g/δ). Damping ratio **ζ = c/(2√(km))**; damped frequency ω<sub>d</sub> = ω<sub>n</sub>√(1 − ζ²). Logarithmic decrement **δ = 2πζ/√(1 − ζ²)** = ln(x<sub>n</sub>/x<sub>n+1</sub>).

**Forced vibration.** With frequency ratio r = ω/ω<sub>n</sub>, the magnification factor is 1/√((1 − r²)² + (2ζr)²). Transmissibility exceeds 1 for r < √2 and falls below 1 (isolation) for **r > √2**, whatever the damping. The critical speed of a shaft equals its natural frequency of transverse vibration.

## Worked example

A spring-mass system has m = 10 kg, k = 4000 N/m and c = 40 N s/m. Find ω<sub>n</sub>, f<sub>n</sub>, ζ, ω<sub>d</sub> and the logarithmic decrement. Then check the mobility of a four-bar chain and a slider-crank.

```python
import math

m, k, c = 10, 4000, 40
wn = math.sqrt(k / m)
zeta = c / (2 * math.sqrt(k * m))
print(f"wn = {wn:.3f} rad/s, fn = {wn / (2 * math.pi):.4f} Hz")
print(f"zeta = {zeta:.4f}, wd = {wn * math.sqrt(1 - zeta ** 2):.4f} rad/s")
print(f"log decrement = {2 * math.pi * zeta / math.sqrt(1 - zeta ** 2):.4f}")
mobility = lambda n, j1, j2=0: 3 * (n - 1) - 2 * j1 - j2
print("four-bar chain F =", mobility(4, 4), " slider-crank F =", mobility(4, 4), " five-bar F =", mobility(5, 5))
```
```output
wn = 20.000 rad/s, fn = 3.1831 Hz
zeta = 0.1000, wd = 19.8997 rad/s
log decrement = 0.6315
four-bar chain F = 1  slider-crank F = 1  five-bar F = 2
```

## Practice questions

```quiz
q: A machine of mass 50 kg is supported on springs of total stiffness 200 kN/m. What is its natural frequency in Hz? Give the answer to three decimal places.
answer: 10.066
verify: round((200e3 / 50) ** 0.5 / (2 * __import__("math").pi), 3)
explain: ω<sub>n</sub> = √(200000/50) = 63.25 rad/s, so f<sub>n</sub> = 63.25/(2π) ≈ 10.066 Hz.
```

```quiz
q: A planar mechanism has 6 links, 7 lower pairs and no higher pairs. What is its degree of freedom?
answer: 1
verify: 3 * (6 - 1) - 2 * 7
explain: F = 3(n − 1) − 2j₁ − j₂ = 15 − 14 = 1.
```

```quiz
q: A four-bar chain has links of 20, 45, 50 and 60 mm. Does it satisfy Grashof's condition?
* Yes, because 20 + 60 ≤ 45 + 50
- No, because 20 + 60 > 45 + 50
- Yes, because all links are longer than 10 mm
- No, because the longest link is more than twice the shortest
explain: s + l = 20 + 60 = 80 and p + q = 45 + 50 = 95. Since 80 ≤ 95, the chain is a Grashof chain: at least one link can make a full rotation.
```

```quiz
q: For vibration isolation, the frequency ratio ω/ω<sub>n</sub> must be greater than what value? Give the answer to four decimal places.
answer: 1.4142
verify: round(2 ** 0.5, 4)
explain: The transmissibility is below 1 only when r > √2 ≈ 1.4142, for any amount of damping.
```

```quiz
q: A flywheel has I = 20 kg m², a mean speed of 30 rad/s and a coefficient of fluctuation of speed of 0.02. What is the fluctuation of energy in J?
answer: 360
verify: round(20 * 30 ** 2 * 0.02, 6)
explain: ΔE = Iω²C<sub>s</sub> = 20 × 900 × 0.02 = 360 J.
```
