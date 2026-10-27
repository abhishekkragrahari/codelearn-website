---
title: Shear Force and Bending Moment Diagrams
chapter: Beams
description: Sign conventions, shear force and bending moment diagrams for cantilevers and simply supported beams under point loads, UDL and moments, the load-shear-moment relations and points of contraflexure.
---
A beam carries loads across its length. At each section it resists them with a **shear force** V and a **bending moment** M. Their diagrams (SFD and BMD) show where the beam is most stressed.

## Sign convention

- **Shear force** at a section: the sum of vertical forces to the left of it (upward positive).
- **Bending moment**: the sum of moments of the forces to the left about the section; **sagging** (concave up) is positive, hogging negative.

## Relations between load, shear and moment

- **dV/dx = −w** (w = downward load per length)
- **dM/dx = V**

So:

- No load between two points → V constant, M linear.
- UDL → V linear, M parabolic.
- **M is maximum where V = 0** (or changes sign).
- A point load causes a jump in V; a concentrated moment causes a jump in M.

## Standard cases

| Beam and load | Max shear | Max moment |
| --- | --- | --- |
| Cantilever, end load P | P | PL (at the fixed end) |
| Cantilever, UDL w | wL | wL²/2 (at the fixed end) |
| Simply supported, central load P | P/2 | PL/4 (at the centre) |
| Simply supported, UDL w | wL/2 | wL²/8 (at the centre) |
| Simply supported, load P at a from A (b from B) | Pb/L or Pa/L | Pab/L (under the load) |

## Point of contraflexure

A point where the bending moment **changes sign** (passes through zero) is a point of contraflexure. It occurs in overhanging beams and in fixed or continuous beams, never in a simply supported beam with only downward loads.

## Worked example

A simply supported beam of span 8 m carries a UDL of 5 kN/m over its whole length and a point load of 20 kN at mid-span.

- Reactions: each = (5 × 8 + 20)/2 = 30 kN.
- Max moment at mid-span = wL²/8 + PL/4 = 5 × 64/8 + 20 × 8/4 = 40 + 40 = **80 kN·m**.

## Practice

```quiz
q: A cantilever 3 m long carries a UDL of 4 kN/m. What is the maximum bending moment in kN·m?
answer: 18
verify: 4 * 3 ** 2 / 2
explain: M = wL²/2 = 4 × 9/2 = 18 kN·m at the fixed end.
```

```quiz
q: A simply supported beam of span 10 m carries 40 kN at 4 m from the left support. What is the maximum bending moment in kN·m?
answer: 96
verify: 40 * 4 * 6 / 10
explain: M = Pab/L = 40 × 4 × 6/10 = 96 kN·m, under the load.
```

```quiz
q: Over a length of beam with a uniformly distributed load, the bending moment diagram is:
- Constant
- Linear
* Parabolic
- Cubic
explain: dV/dx = −w makes V linear, and dM/dx = V makes M a second-degree curve.
```

```quiz
q: Where does the maximum bending moment occur in a beam?
* Where the shear force is zero or changes sign
- Always at a support
- Always at mid-span
- Where the load is largest
explain: dM/dx = V, so M has its extreme value where V = 0 (or jumps through zero).
```
