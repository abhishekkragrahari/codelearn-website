---
title: Mechanisms, Kinematic Pairs and Degrees of Freedom
chapter: Mechanisms
description: Links, kinematic pairs and chains, Grübler's criterion for degrees of freedom, Grashof's law, inversions of the four-bar and slider-crank chains, and quick-return mechanisms.
---
A **mechanism** is a set of rigid links joined so that they move in a controlled way. Before finding velocities or forces, GATE often asks how many inputs a mechanism needs: its **degrees of freedom**.

## Links, pairs and chains

- A **link** is a rigid body that connects to others. The fixed link is the **frame**.
- A **kinematic pair** is a joint between two links.
  - **Lower pairs** have surface contact: revolute (turning), prismatic (sliding), screw, cylindrical, spherical, planar.
  - **Higher pairs** have point or line contact: cam and follower, gear teeth, a wheel rolling on a rail.
- A **kinematic chain** is a set of links joined so that relative motion is possible. Fixing one link makes it a mechanism.

## Degrees of freedom (Grübler / Kutzbach)

For a planar mechanism with n links (including the frame), j₁ lower pairs (each removes 2 freedoms) and j₂ higher pairs (each removes 1):

**F = 3(n − 1) − 2j₁ − j₂**

- F = 1: a constrained mechanism (one input drives it).
- F = 0: a structure. F < 0: a statically indeterminate structure.
- Watch for **redundant** freedoms, like a roller follower spinning about its own pin, which add 1 without affecting the output.

## Grashof's law (four-bar chain)

With link lengths s (shortest), l (longest), p and q:

- If **s + l ≤ p + q**, at least one link can rotate fully (a Grashof chain).
  - Shortest link fixed → **double crank** (drag link).
  - Link next to the shortest fixed → **crank–rocker**.
  - Link opposite the shortest fixed → **double rocker**.
- If s + l > p + q, no link can rotate fully: all inversions are triple rockers.

## Inversions

Fixing different links of a chain gives its **inversions**:

- **Four-bar chain:** beam engine (crank–rocker), coupled locomotive wheels (double crank), Watt's indicator (double rocker).
- **Single slider-crank chain:** reciprocating engine, Whitworth quick return, crank-and-slotted-lever quick return, rotary engine, hand pump.
- **Double slider-crank chain:** elliptical trammel, Scotch yoke, Oldham coupling.

**Quick-return ratio** = time of cutting stroke / time of return stroke, which is greater than 1 for shapers.

## Worked example

A planar mechanism has 6 links and 7 revolute joints. F = 3(6 − 1) − 2 × 7 = 15 − 14 = **1**: it needs one input. (Stephenson and Watt six-bar chains are of this type.)

## Practice

```quiz
q: A planar mechanism has 5 links, 5 revolute joints and 1 higher pair. How many degrees of freedom does it have?
answer: 1
verify: 3 * (5 - 1) - 2 * 5 - 1
explain: F = 3 × 4 − 2 × 5 − 1 = 12 − 10 − 1 = 1.
```

```quiz
q: A four-bar chain has links 30, 70, 80 and 90 mm. Is it a Grashof chain?
* Yes, since 30 + 90 ≤ 70 + 80
- No, since 30 + 90 > 70 + 80
- Only if the 90 mm link is fixed
- Cannot be determined
explain: s + l = 120 and p + q = 150; 120 ≤ 150, so at least one link can rotate fully.
```

```quiz
q: Which of these are inversions of the double slider-crank chain? (Select all that apply.)
* Elliptical trammel
* Scotch yoke
* Oldham coupling
- Whitworth quick return
explain: Whitworth quick return comes from the single slider-crank chain.
```

```quiz
q: A quick-return mechanism has a cutting stroke through 220° of crank rotation. What is the ratio of cutting time to return time? (Give 3 decimal places.)
answer: 1.571
verify: round(220 / (360 - 220), 3)
explain: At constant crank speed, ratio = 220/140 = 1.571.
```
