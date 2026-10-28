---
title: Hydrostatic Forces, Buoyancy and Stability
chapter: Fluid Statics
description: Total pressure and centre of pressure on plane and curved surfaces, buoyancy and Archimedes' principle, metacentric height and stability of floating bodies.
---
Dams, gates and tank walls must resist the force of the fluid behind them. Floating bodies must be stable. Both problems use the hydrostatic pressure law p = ρgh.

## Force on a plane surface

For a plane surface of area A submerged in a liquid, with its centroid at depth h̄:

- **Total pressure force** F = ρ g A h̄ (pressure at the centroid × area).
- It acts at the **centre of pressure**, below the centroid:
  **h_cp = h̄ + I_G sin²θ/(A h̄)**, where I_G is the second moment of area about the centroidal axis and θ the angle with the free surface (θ = 90° for a vertical surface).

For a vertical rectangle of height d with its top at the free surface: h̄ = d/2 and h_cp = 2d/3.

## Force on a curved surface

- **Horizontal component** = force on the vertical projection of the surface.
- **Vertical component** = weight of the liquid directly above the surface (real or imaginary).
- Resultant = √(F_H² + F_V²).

## Buoyancy

**Archimedes' principle:** a body in a fluid is pushed up by a force equal to the **weight of the fluid it displaces**, acting at the centroid of the displaced volume (the **centre of buoyancy** B).

A floating body displaces its own weight: fraction submerged = ρ_body/ρ_fluid.

## Stability of floating bodies

- **Metacentre M:** the point about which the body seems to rock for small tilts.
- **Metacentric height GM = BM − BG**, with **BM = I/V** (I = second moment of the waterplane area about the tilt axis, V = displaced volume).
- **GM > 0: stable**; GM = 0: neutral; GM < 0: unstable.
- A submerged body (no free waterplane) is stable only if G is below B.
- Period of rolling: T = 2π k/√(g GM). Large GM rolls quickly and uncomfortably.

## Worked example

A vertical gate 2 m wide and 3 m high has its top at the water surface. Find the force and its depth.

- F = 1000 × 9.81 × (2 × 3) × 1.5 = **88.29 kN**.
- h_cp = 2 × 3/3 = **2 m** below the surface.

## Practice

```quiz
q: A vertical rectangular gate 1 m wide and 4 m deep has its top at the water surface. What is the total force on it in kN? (g = 9.81 m/s², give 2 decimal places.)
answer: 78.48
verify: round(1000 * 9.81 * 4 * 2 / 1000, 2)
explain: F = ρgAh̄ = 1000 × 9.81 × 4 × 2 = 78,480 N = 78.48 kN.
```

```quiz
q: A wooden block of density 600 kg/m³ floats in water. What fraction of its volume is submerged?
answer: 0.6
verify: 600 / 1000
explain: Fraction submerged = ρ_body/ρ_water = 0.6.
```

```quiz
q: A rectangular barge 10 m long and 4 m wide floats with a draft of 1 m. What is BM in metres about its long axis? (Give 3 decimal places.)
answer: 1.333
verify: round((10 * 4 ** 3 / 12) / (10 * 4 * 1), 3)
explain: I = Lb³/12 = 10 × 64/12 = 53.33 m⁴; V = 40 m³; BM = I/V = 1.333 m.
```

```quiz
q: A floating body is stable for small tilts when:
* The metacentre is above the centre of gravity
- The centre of buoyancy is above the centre of gravity
- The metacentre is below the centre of gravity
- The centre of gravity is above the waterline
explain: GM > 0 (M above G) gives a restoring couple. G may be above B and the body still be stable.
```

```quiz
q: A block of volume 0.5 m³ is fully submerged in water (ρ = 1000 kg/m³, g = 10 m/s²). What is the buoyant force in kN?
answer: 5
verify: 1000 * 0.5 * 10 / 1000
explain: F_B = ρgV = 1000 × 10 × 0.5 = 5000 N = 5 kN.
```

```quiz
q: A vertical rectangular gate 3 m deep has its top 1 m below the water surface. At what depth (m) is its centroid?
answer: 2.5
verify: 1 + 3 / 2
explain: h̄ = 1 + 1.5 = 2.5 m.
```
