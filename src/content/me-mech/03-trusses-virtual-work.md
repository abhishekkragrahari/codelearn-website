---
title: Trusses, Frames and Virtual Work
chapter: Statics
description: Analysis of plane trusses by the method of joints and method of sections, zero-force members, determinacy m = 2j − 3, and the principle of virtual work.
---
A **truss** is a structure of straight members joined at their ends by pins, loaded only at the joints. Every member is then a two-force member: it is either in **tension** or **compression**.

## Determinacy

For a plane truss with m members, j joints and r support reactions:

- **m + r = 2j**: statically determinate (with r = 3, **m = 2j − 3**).
- m + r > 2j: indeterminate (redundant members).
- m + r < 2j: a mechanism (unstable).

## Method of joints

Take one joint at a time, starting where there are **at most two unknown member forces**, and apply ΣFx = 0 and ΣFy = 0. Assume every unknown force is tensile (pulling away from the joint); a negative answer means compression.

## Method of sections

To find the force in one member in the middle of a truss, cut through **at most three members** including it, and apply the three equilibrium equations to one side. Take moments about the point where the other two cut members meet: the equation then has only the wanted force.

## Zero-force members

Spotting them saves time:

1. At a joint with **two non-collinear members and no load**, both members carry zero force.
2. At a joint with **three members, two of them collinear, and no load**, the third member carries zero force.

## Principle of virtual work

If a body in equilibrium is given a small virtual displacement compatible with its constraints, the **total virtual work done by the external forces is zero**: Σ F·δs = 0.

It is useful for mechanisms such as levers, linkages and screw jacks: write each displacement in terms of one coordinate and solve one equation, without finding reactions.

**Example (lever):** effort P at 2 m from the fulcrum lifts a load W at 0.5 m. A small rotation δθ gives P(2 δθ) − W(0.5 δθ) = 0, so P = W/4.

## Worked example

A triangular truss ABC has A pinned, B on a roller, AB = 4 m horizontal, and C at the apex 2 m above the midpoint of AB. A vertical load of 20 kN acts at C.

- By symmetry, R_A = R_B = 10 kN.
- At joint A: member AC is at angle α with tan α = 2/2 = 1, so α = 45°. Vertical: F_AC sin 45° + 10 = 0, so **F_AC = −14.14 kN** (compression).
- Horizontal: F_AB + F_AC cos 45° = 0, so **F_AB = +10 kN** (tension).

## Practice

```quiz
q: A plane truss has 7 joints and is supported by a pin and a roller (r = 3). How many members does it need to be just determinate?
answer: 11
verify: 2 * 7 - 3
explain: m = 2j − 3 = 14 − 3 = 11.
```

```quiz
q: In the worked example, if the apex were 4 m above the midpoint of AB instead, what would be the compressive force in AC in kN? (Give 2 decimal places.)
answer: 11.18
verify: round(10 / (4 / (4 ** 2 + 2 ** 2) ** 0.5), 2)
explain: Now sin α = 4/√20 = 0.894, so F_AC = 10/0.894 = 11.18 kN in compression.
```

```quiz
q: At an unloaded joint, three members meet; two of them are collinear. The force in the third member is:
* Zero
- Equal to the force in either collinear member
- Half the force in the collinear members
- Cannot be found
explain: Resolving perpendicular to the collinear pair, only the third member has a component, so its force must be zero.
```

```quiz
q: A lever has effort arm 1.5 m and load arm 0.3 m. Using virtual work, what effort lifts a load of 500 N?
answer: 100
verify: 500 * 0.3 / 1.5
explain: P × 1.5 δθ = 500 × 0.3 δθ, so P = 100 N.
```

```quiz
q: A plane truss has 10 joints and is supported by a pin and a roller. How many members does it need to be just rigid and determinate?
answer: 17
verify: 2 * 10 - 3
explain: m = 2j − 3 = 20 − 3 = 17.
```

```quiz
q: A screw jack has a lever arm of 0.5 m and a pitch of 10 mm. Ignoring friction, what effort (N) lifts a load of 3141.6 N? (Give 2 decimal places.)
answer: 10
verify: round(3141.6 * 0.010 / (2 * __import__("math").pi * 0.5), 2)
explain: Virtual work: P × 2π(0.5) = W × 0.010, so P = 31.416/3.1416 = 10.00 N.
```
