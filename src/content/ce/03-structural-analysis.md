---
title: Structural Analysis
chapter: Structural Engineering
description: GATE CE syllabus for structural analysis, with determinacy, the force and displacement methods, energy theorems, moment distribution, influence lines, and the analysis of trusses, arches and frames, with solved examples.
---
## Syllabus

Statically determinate and indeterminate structures by the force and displacement methods; energy methods; influence lines; matrix methods (stiffness and flexibility); analysis of trusses, arches, beams and frames.

## Key concepts and formulas

**Static indeterminacy.**

- Plane truss: D<sub>s</sub> = m + r − 2j (m members, r reactions, j joints).
- Plane rigid frame: D<sub>s</sub> = 3m + r − 3j, reduced by the releases at internal hinges.
- D<sub>s</sub> = 0 means determinate (if stable); D<sub>s</sub> > 0 means indeterminate; D<sub>s</sub> < 0 means a mechanism.

**Kinematic indeterminacy** (degrees of freedom): for a plane rigid frame, D<sub>k</sub> = 3j − r (members treated as axially rigid reduce this further).

**Energy theorems.**

- Strain energy in bending: U = ∫ M²/(2EI) dx; in axial loading: U = P²L/(2AE).
- **Castigliano's theorem**: the deflection under a load P is ∂U/∂P.
- **Maxwell's reciprocal theorem**: the deflection at A due to a unit load at B equals the deflection at B due to a unit load at A.
- **Unit load method**: δ = Σ (P·p·L)/(AE) for trusses, where p is the member force due to a unit load at the point and in the direction of the required deflection.

**Slope-deflection and moment distribution.**

- Fixed-end moments: central point load P gives PL/8 at each end; UDL w gives wL²/12.
- Member stiffness 4EI/L for a far end fixed, 3EI/L for a far end pinned. The **carry-over factor** is 1/2 to a fixed far end and 0 to a pinned one.
- **Distribution factor** at a joint = member stiffness / sum of stiffnesses at the joint.

**Influence lines.** An influence line shows how a response (reaction, shear or moment at a section) varies as a unit load moves across the structure. For a simply supported beam of span L, the influence line for the moment at a section at distance a from the left support is a triangle with peak ab/L at the section (b = L − a). By the **Müller-Breslau principle**, the influence line has the shape of the deflected structure when the corresponding restraint is released and given a unit displacement.

**Three-hinged arch.** It is determinate. For a parabolic three-hinged arch carrying a UDL over the whole span, the bending moment is zero everywhere. The horizontal thrust is H = wL²/(8h) for rise h.

## Worked example

A propped cantilever (fixed at A, roller at B) of span L carries a UDL w. Find the prop reaction by compatibility (the deflection at the prop must be zero).

The deflection at B due to the UDL alone (as a cantilever) is wL⁴/(8EI) downwards; the prop reaction R gives RL³/(3EI) upwards. Setting the net deflection to zero gives **R = 3wL/8**, and the fixed-end moment is wL²/8.

```python
L, w, EI = 5.0, 12.0, 1.0
R = 3 * w * L / 8
print(f"prop reaction R = 3wL/8 = {R:.3f}")

# Check compatibility: the UDL deflects the free end down by wL^4/(8EI), the prop pushes it up by RL^3/(3EI).
down, up = w * L ** 4 / (8 * EI), R * L ** 3 / (3 * EI)
print(f"deflection from the UDL = {down:.3f}, from the prop = {up:.3f}, net = {down - up:.3f}")
print(f"fixed-end moment = {w * L ** 2 / 2 - R * L:.3f} = wL^2/8 = {w * L ** 2 / 8:.3f}")

# Static indeterminacy of a plane truss: m + r - 2j
for m, r, j in [(9, 3, 6), (10, 3, 6), (11, 4, 7)]:
    print(f"truss m={m}, r={r}, j={j}: Ds = {m + r - 2 * j}")
```
```output
prop reaction R = 3wL/8 = 22.500
deflection from the UDL = 937.500, from the prop = 937.500, net = 0.000
fixed-end moment = 37.500 = wL^2/8 = 37.500
truss m=9, r=3, j=6: Ds = 0
truss m=10, r=3, j=6: Ds = 1
truss m=11, r=4, j=7: Ds = 1
```

## Practice questions

```quiz
q: A plane truss has 12 members, 4 reaction components and 7 joints. What is its degree of static indeterminacy?
answer: 2
verify: 12 + 4 - 2 * 7
explain: D<sub>s</sub> = m + r − 2j = 12 + 4 − 14 = 2.
```

```quiz
q: A fixed-fixed beam of span 6 m carries a UDL of 10 kN/m. What is the fixed-end moment in kN m?
answer: 30
verify: 10 * 6 ** 2 / 12
explain: The fixed-end moment for a UDL is wL²/12 = 10 × 36/12 = 30 kN m.
```

```quiz
q: Two members meet at a rigid joint. Member 1 has I, length 4 m and a fixed far end; member 2 has I, length 6 m and a pinned far end (same E). What is the distribution factor of member 1? Give the answer to three decimal places.
answer: 0.667
verify:
  k1 = 4 / 4
  k2 = 3 / 6
  print(round(k1 / (k1 + k2), 3))
explain: Stiffnesses (in units of EI): k₁ = 4/4 = 1 and k₂ = 3/6 = 0.5. DF₁ = 1/1.5 ≈ 0.667.
```

```quiz
q: For a simply supported beam of span 10 m, what is the ordinate of the influence line for bending moment at a section 4 m from the left support, at that section?
answer: 2.4
verify: 4 * 6 / 10
explain: The peak ordinate is ab/L = 4 × 6/10 = 2.4 (units of length per unit load).
```

```quiz
q: A parabolic three-hinged arch of span 40 m and rise 8 m carries a UDL of 15 kN/m over the whole span. What is the horizontal thrust in kN?
answer: 375
verify: 15 * 40 ** 2 / (8 * 8)
explain: H = wL²/(8h) = 15 × 1600/(8 × 8) = 375 kN.
```
