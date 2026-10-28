---
title: Free-Body Diagrams and Equilibrium
chapter: Statics
description: How to draw a free-body diagram, the equations of equilibrium in 2D, support reactions, two- and three-force members and Lami's theorem, with solved GATE-style problems.
---
Statics is the study of bodies at rest. Almost every mechanics question in GATE ME starts the same way: isolate the body, draw its free-body diagram (FBD), and write the equilibrium equations.

## The free-body diagram

An FBD shows **one body, cut free from everything it touches**, with every force acting on it:

1. Its weight, at the centre of gravity.
2. Applied loads.
3. A reaction at every support or contact that was removed.

| Support | Reactions it gives |
| --- | --- |
| Roller or smooth surface | One force, normal to the surface |
| Pin (hinge) | Two force components (Rx, Ry) |
| Fixed support | Two force components and a moment |
| Cable or string | One tension force, along the cable, pulling away |

## Equations of equilibrium

A body in a plane is in equilibrium when

**ΣFx = 0, ΣFy = 0, ΣM = 0** (about any point).

That gives at most **three independent equations** per body, so three unknowns can be found. Take moments about a point where two unknown forces meet: each moment equation then has only one unknown.

## Special members

- **Two-force member:** forces act at only two points (for example a pin-ended link with no load in between). The two forces are equal, opposite and **along the line joining the points**.
- **Three-force member:** three non-parallel forces in equilibrium must be **concurrent** (pass through one point).
- **Lami's theorem:** for three concurrent forces in equilibrium, each force is proportional to the sine of the angle between the other two:
  P/sin α = Q/sin β = R/sin γ.

## Worked example

A 100 N lamp hangs from two strings making 30° and 60° with the ceiling. Find the tensions.

Resolve forces at the knot, with T₁ the string at 30° and T₂ the string at 60°:

- Horizontal: T₁ cos 30° = T₂ cos 60°. Vertical: T₁ sin 30° + T₂ sin 60° = 100.
- From the first, T₂ = √3 T₁. Then T₁/2 + (√3 T₁)(√3/2) = 100, so 2T₁ = 100: **T₁ = 50 N**, **T₂ = 86.6 N**.

The string closer to vertical carries more load, which is a quick sanity check.

## Simply supported beam reactions

A beam of span L with a point load P at distance a from the left support:

- Moments about the left support: R_B × L = P × a, so **R_B = Pa/L**.
- Vertical forces: **R_A = P − R_B = P(L − a)/L**.

## Practice

```quiz
q: A 6 m simply supported beam carries a 30 kN load 2 m from the left support. What is the left reaction in kN?
answer: 20
verify: 30 * (6 - 2) / 6
explain: R_A = P(L − a)/L = 30 × 4/6 = 20 kN (and R_B = 10 kN).
```

```quiz
q: How many independent equilibrium equations are available for a single rigid body in a plane?
- 2
* 3
- 4
- 6
explain: ΣFx = 0, ΣFy = 0 and ΣM = 0: three. In 3D there are six.
```

```quiz
q: A weight hangs from two strings at 30° and 60° to the horizontal. If the weight is 200 N, what is the tension in the string at 60°, in N? (Give 1 decimal place.)
answer: 173.2
verify: round(200 * __import__("math").sqrt(3) / 2, 1)
explain: As in the example, T₁ = W/2 = 100 N and T₂ = √3 T₁ = 173.2 N.
```

```quiz
q: Which statements are true? (Select all that apply.)
* A two-force member carries forces along the line joining its two load points
* Three non-parallel forces in equilibrium must be concurrent
- A pin support gives a reaction moment
- A roller support gives two force components
explain: A pin gives two forces and no moment; a roller gives one force normal to the surface.
```

```quiz
q: A 5 m simply supported beam carries 10 kN at 1 m and 20 kN at 3 m from the left support. What is the right support reaction in kN?
answer: 14
verify: (10 * 1 + 20 * 3) / 5
explain: Moments about the left support: R_B × 5 = 10 × 1 + 20 × 3 = 70, so R_B = 14 kN (and R_A = 16 kN).
```

```quiz
q: Three concurrent forces keep a point in equilibrium. Two of them are 30 N and 40 N at right angles. What is the magnitude of the third force in N?
answer: 50
verify: (30 ** 2 + 40 ** 2) ** 0.5
explain: The third force must cancel the resultant of the other two: √(30² + 40²) = 50 N.
```
