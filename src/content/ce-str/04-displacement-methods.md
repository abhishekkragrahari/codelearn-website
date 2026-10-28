---
title: Slope Deflection and Moment Distribution
chapter: Indeterminate Structures
description: Slope-deflection equations, stiffness and carry-over factors, distribution factors, the moment distribution method for continuous beams and frames, and sway analysis.
---
**Displacement methods** take joint rotations and translations as the unknowns. The **slope-deflection** method writes them as equations; **moment distribution** (Hardy Cross) solves the same problem by iteration, without solving equations.

## Slope-deflection equations

For member AB with length L, stiffness EI, end rotations θ_A, θ_B and relative sway Δ between its ends:

**M_AB = M_FAB + (2EI/L)(2θ_A + θ_B − 3Δ/L)**

**M_BA = M_FBA + (2EI/L)(2θ_B + θ_A − 3Δ/L)**

M_F are the fixed-end moments (clockwise positive). Write joint equilibrium (sum of member-end moments at each joint = applied moment) and, for sway frames, a shear equation, then solve for θ and Δ.

## Stiffness and carry-over

| Far end | Stiffness of the near end | Carry-over factor |
| --- | --- | --- |
| Fixed | **4EI/L** | **½** |
| Pinned (hinged) | **3EI/L** | 0 |

A moment applied at the near end produces, at a fixed far end, half that moment with the same sign (carry-over).

## Moment distribution

1. **Lock** all joints and compute fixed-end moments.
2. **Distribution factor** of each member at a joint: DF = k/Σk (relative stiffness). DFs at a joint add to 1; DF = 0 at a fixed support and 1 at a pinned end.
3. **Release** each joint: distribute the unbalanced moment, with opposite sign, in proportion to DFs.
4. **Carry over** half of each distributed moment to the far (fixed) ends.
5. Repeat until the moments are small; sum each column.

**Sway frames** (unsymmetric loads or geometry): do a non-sway analysis, then an analysis with an arbitrary sway, and combine them so that the horizontal shear equation is satisfied.

## Worked example

A two-span beam ABC: A fixed, B continuous, C fixed; AB = 6 m, BC = 4 m, same EI. Find the distribution factors at B.

- k_BA = 4EI/6 = 0.667EI, k_BC = 4EI/4 = EI.
- DF_BA = 0.667/1.667 = **0.4**; DF_BC = **0.6**.

## Practice

```quiz
q: At a joint, member 1 has far end fixed with L = 4 m, and member 2 has far end hinged with L = 3 m (same EI). What is the distribution factor of member 1?
answer: 0.5
verify: (4 / 4) / (4 / 4 + 3 / 3)
explain: k₁ = 4EI/4 = EI and k₂ = 3EI/3 = EI, so DF₁ = 1/2.
```

```quiz
q: A moment of 40 kN·m is applied at the near end of a member whose far end is fixed. What moment is carried over to the far end in kN·m?
answer: 20
verify: 40 / 2
explain: Carry-over factor ½: 20 kN·m.
```

```quiz
q: What is the stiffness of a member with its far end hinged, L = 5 m and EI = 10,000 kN·m², in kN·m/rad?
answer: 6000
verify: 3 * 10000 / 5
explain: k = 3EI/L = 30,000/5 = 6000 kN·m/rad.
```

```quiz
q: The distribution factor of a member at a fixed support is:
* 0
- 0.5
- 1
- Depends on the stiffness
explain: A fixed support can take any unbalanced moment, so nothing is distributed there: DF = 0.
```

```quiz
q: A member with the far end fixed has L = 6 m and EI = 12,000 kN·m². What is its rotational stiffness at the near end in kN·m/rad?
answer: 8000
verify: 4 * 12000 / 6
explain: k = 4EI/L = 48,000/6 = 8000 kN·m/rad.
```

```quiz
q: Two members meet at a joint with stiffnesses 3EI/4 (far end hinged) and 4EI/4 (far end fixed). What is the distribution factor of the hinged member? (Give 4 decimal places.)
answer: 0.4286
verify: round(0.75 / (0.75 + 1), 4)
explain: DF = 0.75/(0.75 + 1) = 0.4286.
```
