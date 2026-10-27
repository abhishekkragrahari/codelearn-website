---
title: Mohr's Circle, Principal Stress, Thin Cylinders
chapter: Stress and Strain
description: Stress transformation, principal stresses and planes, maximum shear stress, Mohr's circle, strain gauges, and hoop and longitudinal stresses in thin cylinders and spheres.
---
At a point in a loaded body, the normal and shear stresses depend on the plane you look at. The planes with **zero shear** carry the **principal stresses**, the largest and smallest normal stresses at that point.

## Stress transformation (2D)

With stresses σx, σy and τxy on the x and y faces:

- **Principal stresses:** σ₁,₂ = (σx + σy)/2 ± √[((σx − σy)/2)² + τxy²]
- **Principal planes:** tan 2θp = 2τxy/(σx − σy)
- **Maximum in-plane shear stress:** τmax = √[((σx − σy)/2)² + τxy²] = (σ₁ − σ₂)/2, on planes at 45° to the principal planes.
- σx + σy = σ₁ + σ₂ (the sum is invariant).

**Absolute maximum shear stress** in 3D is (σmax − σmin)/2 using all three principal stresses (the third being 0 for plane stress). If σ₁ and σ₂ have the same sign, it is σ₁/2.

## Mohr's circle

Plot each face as a point (σ, τ). The circle has:

- **Centre** at ((σx + σy)/2, 0)
- **Radius** R = √[((σx − σy)/2)² + τxy²]

The principal stresses are where the circle cuts the σ-axis: centre ± R. An angle of θ on the element is **2θ** on the circle. Pure shear τ gives a circle centred at the origin, so σ₁ = τ and σ₂ = −τ.

## Thin cylinders and spheres

For a thin vessel (t < d/20) with internal pressure p, diameter d and wall thickness t:

| Vessel | Stress |
| --- | --- |
| Cylinder, hoop (circumferential) | σh = pd/(2t) |
| Cylinder, longitudinal | σl = pd/(4t) |
| Sphere (all directions) | σ = pd/(4t) |

The hoop stress is twice the longitudinal stress, so cylinders split **along their length**. Volumetric strain of a cylinder: ε_v = (pd/(4tE))(5 − 4ν).

## Worked example

At a point σx = 120 MPa, σy = 40 MPa and τxy = 30 MPa. Find the principal stresses and the maximum shear stress.

- Centre = 80 MPa, R = √(40² + 30²) = 50 MPa.
- **σ₁ = 130 MPa, σ₂ = 30 MPa**, in-plane τmax = 50 MPa.
- Both principal stresses are tensile, so the absolute maximum shear = 130/2 = **65 MPa**.

## Practice

```quiz
q: σx = 60 MPa, σy = −20 MPa, τxy = 30 MPa. What is the minor principal stress in MPa?
answer: -30
verify: round((60 - 20) / 2 - ((40) ** 2 + 30 ** 2) ** 0.5, 6)
explain: Centre 20, R = √(40² + 30²) = 50, so σ₂ = 20 − 50 = −30 MPa.
```

```quiz
q: A shaft is in pure shear with τ = 50 MPa. What are the principal stresses?
* +50 MPa and −50 MPa
- +50 MPa and 0
- +25 MPa and −25 MPa
- +100 MPa and 0
explain: Mohr's circle is centred at the origin with radius τ, so σ₁ = +τ and σ₂ = −τ.
```

```quiz
q: A thin cylinder of diameter 500 mm and thickness 5 mm holds 2 MPa. What is the longitudinal stress in MPa?
answer: 50
verify: 2 * 500 / (4 * 5)
explain: σl = pd/(4t) = 2 × 500/20 = 50 MPa (the hoop stress is 100 MPa).
```

```quiz
q: A thin sphere and a thin cylinder have the same d, t and p. The sphere's wall stress compared with the cylinder's hoop stress is:
- Equal
* Half
- Twice
- Four times
explain: Sphere pd/(4t) versus hoop pd/(2t).
```
