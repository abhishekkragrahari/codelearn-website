---
title: Friction, Inclined Planes and Belt Friction
chapter: Statics
description: Static and kinetic friction, angle of friction and angle of repose, blocks on inclined planes, ladder problems, wedges and the belt friction equation T1/T2 = e^(μθ).
---
Friction is the force that resists sliding between two surfaces. GATE asks friction questions on blocks, inclines, ladders and belts; all follow from a few rules.

## Laws of dry (Coulomb) friction

- Friction acts **along the surface, opposite to the motion** (or the tendency of motion).
- Before sliding, friction takes whatever value equilibrium needs, up to a limit: **F ≤ μ_s N**.
- At the point of sliding, **F = μ_s N** (limiting friction). While sliding, **F = μ_k N**, with μ_k slightly less than μ_s.
- Friction does not depend on the contact area.

**Angle of friction** φ: the angle between the normal reaction and the total reaction at limiting friction. **tan φ = μ.**

**Angle of repose**: the steepest incline on which a block stays at rest. It equals the angle of friction.

## Block on an inclined plane

For a block of weight W on an incline at angle θ:

- Normal reaction N = W cos θ.
- Component pulling it down the slope = W sin θ.
- It stays at rest if W sin θ ≤ μ W cos θ, that is **tan θ ≤ μ**.

The force P parallel to the incline needed to **push it up** at constant speed: **P = W(sin θ + μ cos θ)**. To just stop it sliding down: P = W(sin θ − μ cos θ).

## Ladder against a wall

A ladder of length L and weight W leans on a rough floor (μ₁) and a wall (μ₂). Draw the FBD with N and F at both ends, take moments about the foot, and use F ≤ μN at each surface. For a uniform ladder with a **smooth wall**, the smallest angle θ with the floor at which it can stand is given by **tan θ_min = 1/(2μ₁)**.

## Belt friction

For a flat belt wrapped through angle θ (radians) on a pulley, at the point of slipping:

**T₁/T₂ = e^(μθ)**, where T₁ is the tight-side tension.

Power transmitted = (T₁ − T₂) v. For a V-belt with groove angle 2β, replace μ by μ/sin β.

## Worked example

A 100 N block rests on a 30° incline with μ = 0.25. Will it slide, and what force parallel to the slope pushes it up at constant speed?

- tan 30° = 0.577 > 0.25, so it **slides** if released.
- P = 100 (sin 30° + 0.25 cos 30°) = 100 (0.5 + 0.2165) = **71.65 N**.

## Practice

```quiz
q: A block rests on an incline. The angle of repose is 20°. What is the coefficient of static friction? (Give 3 decimal places.)
answer: 0.364
verify: round(__import__("math").tan(__import__("math").radians(20)), 3)
explain: μ = tan(angle of repose) = tan 20° ≈ 0.364.
```

```quiz
q: A belt has slack-side tension 100 N, μ = 0.3 and wrap angle π radians. What is the maximum tight-side tension in N? (Give 1 decimal place.)
answer: 256.6
verify: round(100 * __import__("math").exp(0.3 * __import__("math").pi), 1)
explain: T₁ = T₂ e^(μθ) = 100 × e^(0.942) ≈ 256.6 N.
```

```quiz
q: A 200 N block on a horizontal floor has μ = 0.4. A horizontal force of 50 N is applied. What is the friction force in N?
answer: 50
verify: min(50, 0.4 * 200)
explain: Limiting friction is 0.4 × 200 = 80 N, more than 50 N, so the block stays at rest and friction is only 50 N.
```

```quiz
q: Which statements about dry friction are true? (Select all that apply.)
* Limiting friction is proportional to the normal reaction
* The angle of repose equals the angle of friction
- Friction increases with the area of contact
- Kinetic friction is always greater than static friction
explain: Friction is independent of contact area, and kinetic friction is usually a little less than static.
```
