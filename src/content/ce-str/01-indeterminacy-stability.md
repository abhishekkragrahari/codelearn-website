---
title: Static and Kinematic Indeterminacy
chapter: Fundamentals
description: Degree of static indeterminacy of beams, trusses and frames, internal and external indeterminacy, kinematic indeterminacy (degrees of freedom), and stability of structures.
---
Before analysing a structure, find out whether equilibrium alone can solve it. The **degree of static indeterminacy** (Ds) counts the extra unknowns; the **degree of kinematic indeterminacy** (Dk) counts the unknown joint displacements.

## Static indeterminacy

Ds = (number of unknown forces) − (number of independent equilibrium equations).

**Plane frames (rigid joints):**

**Ds = 3m + r − 3j − (releases)**

m = members, r = support reactions, j = joints. Each internal hinge where n members meet gives (n − 1) releases.

**Plane trusses (pin joints):** Ds = m + r − 2j.

**Space frames:** Ds = 6m + r − 6j; space trusses: m + r − 3j.

- Ds = 0: statically determinate. Ds > 0: indeterminate. Ds < 0: a mechanism (unstable).
- **External** indeterminacy = r − 3 (for a plane structure); **internal** = Ds − external.
- A closed ring (one cell of a rigid frame) is internally indeterminate to degree 3.

## Supports

| Support | Reactions (plane) | Freedoms allowed |
| --- | --- | --- |
| Roller | 1 | 2 (slide, rotate) |
| Hinge (pin) | 2 | 1 (rotate) |
| Fixed | 3 | 0 |

## Kinematic indeterminacy

Dk is the number of unknown independent joint displacements:

- Each free rigid joint of a plane frame has 3 (two translations, one rotation). A roller support has 2, a hinge 1, a fixed support 0.
- **Dk = 3j − r** for plane frames (minus 1 per member if members are treated as **axially rigid**, a common assumption).
- For plane trusses: Dk = 2j − r.

Force methods are efficient when Ds is small; displacement methods when Dk is small.

## Stability

A structure can satisfy the counting rule but still be **geometrically unstable**: all reactions parallel, or all reactions passing through one point. Always check the arrangement, not just the numbers.

## Worked example

A propped cantilever (fixed at A, roller at B) has r = 4 and is a single member: Ds = 4 − 3 = **1**. A fixed–fixed beam has r = 6: Ds = **3** (or 2 if axial forces are ignored).

## Practice

```quiz
q: A single-bay, single-storey portal frame has both column bases fixed. What is its degree of static indeterminacy?
answer: 3
verify: 3 * 3 + 6 - 3 * 4
explain: m = 3, r = 6, j = 4: Ds = 9 + 6 − 12 = 3.
```

```quiz
q: The same portal frame has both bases hinged instead. What is Ds?
answer: 1
verify: 3 * 3 + 4 - 3 * 4
explain: r = 4: Ds = 9 + 4 − 12 = 1.
```

```quiz
q: A plane truss has 13 members, 8 joints and 3 reactions. What is its degree of static indeterminacy?
answer: 0
verify: 13 + 3 - 2 * 8
explain: Ds = m + r − 2j = 16 − 16 = 0: determinate.
```

```quiz
q: A beam rests on three rollers only (all reactions vertical). It is:
- Determinate and stable
- Indeterminate and stable
* Geometrically unstable
- A truss
explain: With all reactions parallel, nothing resists horizontal loads, so the beam is unstable whatever the count.
```
