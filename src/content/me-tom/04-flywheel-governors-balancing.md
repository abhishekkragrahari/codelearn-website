---
title: Flywheels, Governors, Balancing and Gyroscope
chapter: Power Transmission
description: Turning moment diagrams and flywheel size, coefficient of fluctuation, governors (Watt, Porter, Hartnell) and their sensitivity, balancing of rotating and reciprocating masses, and gyroscopic couple.
---
These topics deal with controlling speed and forces in running machines: a **flywheel** smooths speed within each cycle, a **governor** controls mean speed as load changes, **balancing** removes shaking forces, and the **gyroscopic couple** acts on turning rotors.

## Flywheels

The engine torque varies over a cycle (the **turning moment diagram**), while the load torque is roughly constant. The flywheel stores the extra energy and gives it back.

- **Maximum fluctuation of energy** ΔE = E_max − E_min (from the areas of the turning moment diagram).
- **Coefficient of fluctuation of speed** Cs = (ω_max − ω_min)/ω_mean.
- **ΔE = I ω² Cs** (ω = mean speed). So the required I = ΔE/(ω²Cs).
- For a rim-type flywheel, I ≈ mR².

## Governors

A governor changes the fuel supply as speed changes.

- **Watt governor:** height h = g/ω² (h in m, ω in rad/s), about 895/N² m with N in rpm.
- **Porter governor:** a Watt governor with a central load; more sensitive at higher speeds.
- **Hartnell governor:** a spring-controlled centrifugal governor.
- **Sensitiveness** = (N₂ − N₁)/N_mean. **Isochronous:** equilibrium speed is the same at all radii (infinitely sensitive, but it hunts). **Stable:** radius increases with speed. **Hunting:** the governor keeps overshooting.

## Balancing

- **Rotating masses in one plane:** the vector sum Σmr must be zero. A single balancing mass m_b r_b = −Σmr.
- **In several planes:** both Σmr = 0 (forces) and Σmrl = 0 (couples). Two balancing masses in two chosen planes are always enough.
- **Reciprocating masses** (single cylinder): primary force mω²r cos θ, secondary force mω²r cos 2θ/n. Usually only a fraction (2/3 to 3/4) of the primary force is balanced by a rotating mass, because a rotating mass adds an unbalanced vertical force.

## Gyroscopic couple

A rotor with moment of inertia I spinning at ω, whose axis turns (precesses) at ω_p, needs a couple

**C = I ω ω_p**.

This acts on ships turning or pitching, aircraft turning, and vehicles going round curves.

## Worked example

A flywheel must keep speed within ±1% of 300 rpm when ΔE = 6 kJ. Find I.

- ω = 2π × 300/60 = 31.42 rad/s. Cs = 0.02.
- I = 6000/(31.42² × 0.02) = **304 kg·m²**.

## Practice

```quiz
q: What is the height (in mm) of a Watt governor running at 60 rpm? Use h = g/ω² with g = 9.81 m/s². (Round to the nearest mm.)
answer: 248
verify: round(9.81 / (2 * __import__("math").pi * 60 / 60) ** 2 * 1000)
explain: ω = 2π rad/s, h = 9.81/(4π²) = 0.2485 m ≈ 248 mm.
```

```quiz
q: A flywheel has I = 100 kg·m² and mean speed 20 rad/s with Cs = 0.05. What is the maximum fluctuation of energy in J?
answer: 2000
verify: round(100 * 20 ** 2 * 0.05, 6)
explain: ΔE = Iω²Cs = 100 × 400 × 0.05 = 2000 J.
```

```quiz
q: A rotor with I = 0.5 kg·m² spins at 200 rad/s while its axis precesses at 0.2 rad/s. What is the gyroscopic couple in N·m?
answer: 20
verify: round(0.5 * 200 * 0.2, 6)
explain: C = Iωω_p = 0.5 × 200 × 0.2 = 20 N·m.
```

```quiz
q: A governor whose equilibrium speed is the same at every radius of rotation is called:
- Stable
* Isochronous
- Insensitive
- Hunting
explain: An isochronous governor has one equilibrium speed for all radii; in practice it tends to hunt.
```

```quiz
q: A flywheel of I = 50 kg·m² slows from 105 rad/s to 95 rad/s. How much energy (kJ) does it give out?
answer: 50
verify: 0.5 * 50 * (105 ** 2 - 95 ** 2) / 1000
explain: ΔE = ½I(ω₁² − ω₂²) = 25 × (11025 − 9025) = 50,000 J = 50 kJ.
```

```quiz
q: A rotating mass of 4 kg at radius 0.2 m is balanced by a mass at radius 0.1 m in the same plane. What balancing mass (kg) is needed?
answer: 8
verify: 4 * 0.2 / 0.1
explain: m_b r_b = m r gives m_b = 0.8/0.1 = 8 kg, placed opposite.
```
