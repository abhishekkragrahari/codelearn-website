---
title: Kinematics and Dynamics of Rigid Bodies
chapter: Dynamics
description: Equations of motion, projectiles, circular motion, relative velocity, instantaneous centre, Newton's second law for rigid bodies, moment of inertia and rolling motion.
---
Dynamics deals with bodies in motion. GATE ME tests both particles and **rigid bodies in plane motion**: translation, rotation about a fixed axis, and general plane motion such as rolling.

## Particle kinematics

For constant acceleration a:

- v = u + at
- s = ut + ½at²
- v² = u² + 2as

**Projectile** launched at speed u and angle θ (g downwards, no air resistance):

- Time of flight T = 2u sin θ / g
- Maximum height H = u² sin² θ / (2g)
- Range R = u² sin 2θ / g (maximum at θ = 45°)

**Circular motion** at speed v on radius r: centripetal acceleration v²/r = ω²r towards the centre.

## Rigid-body kinematics

- Rotation about a fixed axis: v = ωr, tangential acceleration = αr, normal acceleration = ω²r.
- **Instantaneous centre (IC) of rotation:** at any instant, a body in plane motion rotates about a point of zero velocity. Every point's velocity is perpendicular to the line joining it to the IC, with magnitude ω × distance.
- A wheel **rolling without slipping**: the contact point is the IC, so v_centre = ωr and the top point moves at 2v.

## Newton's laws for a rigid body

- Translation: **ΣF = m a_G** (a_G = acceleration of the centre of mass).
- Rotation: **ΣM_G = I_G α**, or about a fixed axis O: ΣM_O = I_O α.

**Moments of inertia** about the centroidal axis:

| Body | I_G |
| --- | --- |
| Slender rod (about its centre, perpendicular) | mL²/12 |
| Rod about one end | mL²/3 |
| Solid disc or cylinder | mr²/2 |
| Thin ring | mr² |
| Solid sphere | (2/5) mr² |

**Parallel axis theorem:** I = I_G + md². **Radius of gyration** k: I = mk².

## Rolling down an incline

A body of radius r and I_G = mk² rolling without slipping down an incline at angle θ has

**a = g sin θ / (1 + k²/r²)**.

A solid cylinder (k²/r² = 1/2) gets a = (2/3) g sin θ; a ring (k²/r² = 1) gets (1/2) g sin θ; a sliding block with no friction gets g sin θ.

## Worked example

A uniform rod of length 1.2 m and mass 3 kg is pinned at one end and released from horizontal. Find its angular acceleration at release (g = 9.81 m/s²).

- Moment of weight about the pin: 3 × 9.81 × 0.6 = 17.66 N·m.
- I about the end = mL²/3 = 3 × 1.44/3 = 1.44 kg·m².
- α = 17.66 / 1.44 = **12.26 rad/s²** (that is 3g/(2L)).

## Practice

```quiz
q: A projectile is launched at 20 m/s at 30° to the horizontal (g = 10 m/s²). What is its range in m? (Give 2 decimal places.)
answer: 34.64
verify: round(20 ** 2 * __import__("math").sin(__import__("math").radians(60)) / 10, 2)
explain: R = u² sin 2θ / g = 400 × sin 60° / 10 = 34.64 m.
```

```quiz
q: A solid cylinder rolls without slipping down a 30° incline (g = 9.81 m/s²). What is its acceleration in m/s²? (Give 2 decimal places.)
answer: 3.27
verify: round(9.81 * 0.5 / 1.5, 2)
explain: a = g sin θ/(1 + 1/2) = 9.81 × 0.5 × 2/3 = 3.27 m/s².
```

```quiz
q: A wheel of radius 0.5 m rolls without slipping with its centre moving at 4 m/s. What is the speed of the top point in m/s?
answer: 8
verify: 2 * 4
explain: The contact point is the instantaneous centre; the top is twice as far from it as the centre, so it moves at 2v = 8 m/s.
```

```quiz
q: What is the moment of inertia (kg·m²) of a 2 kg disc of radius 0.3 m about an axis through its rim, parallel to its central axis?
answer: 0.27
verify: round(2 * 0.3 ** 2 / 2 + 2 * 0.3 ** 2, 6)
explain: I = mr²/2 + mr² = 0.09 + 0.18 = 0.27 kg·m².
```

```quiz
q: A body starts from rest with acceleration 2 m/s². What distance (m) does it cover in 5 s?
answer: 25
verify: 0.5 * 2 * 5 ** 2
explain: s = ½at² = ½ × 2 × 25 = 25 m.
```

```quiz
q: A ring rolls without slipping down a 30° incline (g = 10 m/s²). What is its acceleration in m/s²?
answer: 2.5
verify: round(10 * 0.5 / (1 + 1), 6)
explain: For a ring k²/r² = 1, so a = g sin θ/2 = 10 × 0.5/2 = 2.5 m/s².
```
