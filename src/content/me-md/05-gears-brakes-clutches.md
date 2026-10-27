---
title: Gear Design, Brakes and Clutches
chapter: Power Transmission Elements
description: Lewis bending equation and wear strength of spur gears, gear forces, friction clutches under uniform pressure and uniform wear, and block, band and disc brakes.
---
This lesson covers the design side of gears and the friction devices that start and stop machines: **clutches** and **brakes**.

## Forces on spur gears

For transmitted power P at pitch-line speed v (or torque T on a gear of pitch diameter d):

- Tangential force F_t = P/v = 2T/d.
- Radial force F_r = F_t tan φ (φ = pressure angle).
- Resultant force F = F_t / cos φ.

## Gear tooth strength

- **Lewis equation** (bending): F_t = σ_b b m Y, with face width b, module m and Lewis form factor Y (depends on the number of teeth).
- Dynamic effects are added through a velocity factor; **Buckingham's** equation gives the dynamic load.
- **Wear (surface) strength:** F_w = d_p b Q K, with ratio factor Q = 2T_g/(T_g + T_p) and load-stress factor K.

## Friction clutches

A single-plate clutch with inner radius r₁, outer radius r₂, axial force W and friction μ has two design assumptions:

| Assumption | Torque per friction surface | When used |
| --- | --- | --- |
| **Uniform pressure** | T = μW × (2/3)(r₂³ − r₁³)/(r₂² − r₁²) | New clutches |
| **Uniform wear** (pw = constant) | T = μW (r₁ + r₂)/2 | Worn clutches; safer design |

Multiply by the number of friction surfaces (2 for a single plate gripped on both sides). Uniform wear gives a slightly lower torque, so it is used for design.

**Cone clutch:** T = μW R_m / sin α (α = semi-cone angle).

## Brakes

- **Block (shoe) brake:** braking torque T = μN r. Take moments about the lever pivot to relate the applied force to N. A brake where friction helps apply the shoe is **self-energising**; if it needs no applied force at all, it is **self-locking**.
- **Band brake:** T₁/T₂ = e^(μθ), braking torque = (T₁ − T₂) r.
- **Energy absorbed** while stopping = change in kinetic energy (½mv² + ½Iω²); it becomes heat.

## Worked example

A single-plate clutch (both sides effective) has r₁ = 80 mm, r₂ = 120 mm, μ = 0.3 and W = 4 kN. Find the torque by uniform wear.

- Mean radius = 100 mm. Torque per surface = 0.3 × 4000 × 0.1 = 120 N·m.
- Two surfaces: **T = 240 N·m**.

## Practice

```quiz
q: A spur gear with pitch diameter 200 mm transmits 400 N·m; the pressure angle is 20°. What is the radial force in N? (Round to the nearest integer.)
answer: 1456
verify: round(2 * 400e3 / 200 * __import__("math").tan(__import__("math").radians(20)))
explain: F_t = 2T/d = 4000 N; F_r = 4000 × tan 20° ≈ 1456 N.
```

```quiz
q: A single-plate clutch, both sides effective, has r₁ = 50 mm and r₂ = 150 mm, μ = 0.25 and W = 2 kN. What is the torque by uniform wear in N·m?
answer: 100
verify: round(2 * 0.25 * 2000 * (0.05 + 0.15) / 2, 6)
explain: Mean radius = 0.1 m; T = 2 × 0.25 × 2000 × 0.1 = 100 N·m.
```

```quiz
q: For a new clutch, which assumption is normally used?
* Uniform pressure
- Uniform wear
- Uniform temperature
- Uniform velocity
explain: A new clutch has flat, unworn surfaces, so the pressure is nearly uniform. After wearing in, uniform wear applies.
```

```quiz
q: A band brake has tight-side tension 1000 N, slack-side tension 400 N and drum radius 0.25 m. What is the braking torque in N·m?
answer: 150
verify: (1000 - 400) * 0.25
explain: T = (T₁ − T₂) r = 600 × 0.25 = 150 N·m.
```
