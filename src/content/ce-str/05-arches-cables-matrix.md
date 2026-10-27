---
title: Arches, Cables and Matrix Methods
chapter: Special Structures
description: Three-hinged and two-hinged arches, horizontal thrust and Eddy's theorem, cables under point loads and UDL, cable tension and sag, and stiffness and flexibility matrix methods.
---
Arches and cables carry load mainly by axial force: arches in compression, cables in tension. Matrix methods are the general way computers analyse any structure.

## Three-hinged arch

Hinges at both supports and at the crown make it **statically determinate** (4 reactions, 3 equilibrium equations + 1 hinge condition: M = 0 at the crown).

**Parabolic arch with UDL w over the full span L and rise h:**

- Horizontal thrust **H = wL²/(8h)**.
- Bending moment is **zero everywhere**: the parabola is the funicular shape for a UDL.

**Eddy's theorem:** the bending moment at any section = H × (vertical distance between the arch axis and the linear arch, the line of thrust).

Moment at a section x: M = M_beam(x) − H y(x), where M_beam is the simply supported beam moment and y the arch height.

## Two-hinged arch

Indeterminate to degree 1 (H is the redundant), found by energy methods: H = ∫ M_beam y ds/(EI) ÷ ∫ y² ds/(EI). For a parabolic two-hinged arch with UDL over the full span, also **H = wL²/(8h)**. A rise in temperature increases H.

## Cables

A cable carries only tension and takes the funicular shape of its loads.

- At any point: **H × (sag at that point) = M_beam** at that point (same equation as the arch).
- **UDL over the span** (parabolic cable, supports level, central sag d): **H = wL²/(8d)**; vertical reaction V = wL/2; **maximum tension T_max = √(H² + V²)** at the supports.
- Length of a parabolic cable ≈ L + 8d²/(3L).

## Matrix methods

- **Flexibility (force) method:** {Δ} = [F]{P}; unknowns are redundant forces. Matrix size = Ds.
- **Stiffness (displacement) method:** {P} = [K]{Δ}; unknowns are joint displacements. Matrix size = Dk. Used in most software.
- Properties: [K] and [F] are **symmetric** (Maxwell), with positive diagonal terms; [K] = [F]⁻¹ for the same coordinates.
- Stiffness matrix of a beam element (rotations only, both ends): (EI/L)[[4, 2], [2, 4]].

## Worked example

A cable spans 100 m with a central sag of 10 m and carries 2 kN/m.

- H = 2 × 100²/(8 × 10) = **250 kN**; V = 100 kN.
- T_max = √(250² + 100²) = **269.3 kN**.

## Practice

```quiz
q: A three-hinged parabolic arch of span 20 m and rise 4 m carries a UDL of 16 kN/m over the whole span. What is the horizontal thrust in kN?
answer: 200
verify: 16 * 20 ** 2 / (8 * 4)
explain: H = wL²/(8h) = 16 × 400/32 = 200 kN.
```

```quiz
q: For the arch above, what is the bending moment at the quarter-span section (kN·m)?
answer: 0
verify: 0
explain: A parabolic arch under a full-span UDL is funicular: the moment is zero everywhere.
```

```quiz
q: A cable of span 60 m with central sag 6 m carries 3 kN/m. What is the maximum tension in kN? (Give 1 decimal place.)
answer: 242.3
verify: round(((3 * 60 ** 2 / (8 * 6)) ** 2 + (3 * 60 / 2) ** 2) ** 0.5, 1)
explain: H = 3 × 3600/48 = 225 kN and V = 90 kN, so T_max = √(225² + 90²) = √58,725 = 242.3 kN.
```

```quiz
q: The size of the stiffness matrix of a structure equals its:
- Degree of static indeterminacy
* Degree of kinematic indeterminacy
- Number of members
- Number of supports
explain: The stiffness method's unknowns are joint displacements, so the matrix is Dk × Dk.
```
