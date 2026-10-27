---
title: Velocity, Acceleration and Cams
chapter: Mechanisms
description: Relative velocity method, instantaneous centres and Kennedy's theorem, Coriolis acceleration, slider-crank kinematics, and cam follower motions and terminology.
---
Once a mechanism's input speed is known, the speeds and accelerations of all its links follow from geometry. GATE tests three tools: relative velocity, **instantaneous centres** and the slider-crank formulas, plus the basics of cams.

## Relative velocity

For two points A and B on the same rigid link rotating at ω: **v_BA = ω × AB**, perpendicular to AB. Velocity polygons are drawn from this rule, link by link.

## Instantaneous centres (I-centres)

- A mechanism with n links has **n(n − 1)/2** instantaneous centres.
- **Kennedy's theorem:** the three I-centres of any three links lie on a **straight line**.
- The velocity of a point = ω × (its distance from the link's I-centre relative to the frame).

## Acceleration

- A point on a link rotating about a fixed point has centripetal acceleration ω²r and tangential acceleration αr.
- **Coriolis acceleration** appears when a slider moves along a rotating link: **2vω**, perpendicular to the link. It is needed in quick-return and slotted-lever mechanisms.

## Slider-crank mechanism

For crank radius r, connecting rod length l, n = l/r and crank angle θ from inner dead centre, at crank speed ω:

- Piston velocity v ≈ ωr (sin θ + sin 2θ/(2n))
- Piston acceleration a ≈ ω²r (cos θ + cos 2θ/n)
- Angular velocity of the rod ≈ ω cos θ / n

## Cams

A cam turns rotary motion into a set follower motion.

- **Terms:** base circle, pitch curve, pressure angle (angle between the follower's path and the normal to the cam at contact), lift (stroke), dwell.
- **Follower motions:**
  - Uniform velocity: infinite acceleration at the ends (jerk), so it is used only with modifications.
  - **Simple harmonic motion:** max velocity = (πh/2)(ω/β); max acceleration = (π²h/2)(ω/β)², where β is the cam angle for the rise.
  - Uniform acceleration and retardation (parabolic).
  - **Cycloidal:** zero acceleration at the start and end, best for high speeds.

## Worked example

A crank 100 mm long turns at 300 rpm; the rod is 400 mm (n = 4). Find the piston velocity at θ = 90°.

- ω = 2π × 300/60 = 31.42 rad/s.
- v = 31.42 × 0.1 × (sin 90° + sin 180°/8) = **3.14 m/s**.

## Practice

```quiz
q: How many instantaneous centres does a six-link mechanism have?
answer: 15
verify: 6 * 5 // 2
explain: n(n − 1)/2 = 6 × 5/2 = 15.
```

```quiz
q: A slider moves at 2 m/s along a link rotating at 5 rad/s. What is the Coriolis acceleration in m/s²?
answer: 20
verify: 2 * 2 * 5
explain: 2vω = 2 × 2 × 5 = 20 m/s².
```

```quiz
q: A follower rises 20 mm with SHM during 90° of cam rotation; the cam turns at 10 rad/s. What is the maximum follower velocity in mm/s? (Give 1 decimal place.)
answer: 200
verify: round(__import__("math").pi * 20 / 2 * 10 / (__import__("math").pi / 2), 1)
explain: v_max = (πh/2)(ω/β) = (π × 20/2)(10/(π/2)) = 200 mm/s.
```

```quiz
q: Which follower motion has no sudden change in acceleration at the start and end of the rise?
- Uniform velocity
- Simple harmonic
- Uniform acceleration and retardation
* Cycloidal
explain: Cycloidal motion has zero acceleration at both ends, so there is no jerk; it suits high-speed cams.
```
