---
title: Casting Processes and Gating Design
chapter: Primary Processes
description: Sand casting, patterns and allowances, gating system design with Bernoulli's equation, filling time, riser design with Chvorinov's rule, and special casting processes and defects.
---
**Casting** shapes metal by pouring it molten into a mould. GATE asks most often about **filling time** of the mould and **solidification time** (riser design).

## Sand casting basics

- **Pattern:** a replica of the part, made larger to allow for shrinkage. **Allowances:** shrinkage, machining, draft (taper for removal), distortion and shake.
- **Core:** a sand shape that forms internal holes; supported by **core prints** and chaplets.
- **Moulding sand:** silica + clay binder + water. Key properties: permeability, strength, refractoriness, collapsibility.

## Gating system

Sprue, runner and ingates carry the metal into the cavity.

**Velocity at the sprue bottom** (Bernoulli): V = √(2gh).

**Filling time** (cross-section A_g at the gate, mould volume V):

- **Top gating:** t = V/(A_g √(2gH)) with H = height of the sprue.
- **Bottom gating:** the head falls as the mould fills: **t = (A_m/A_g)(2/√(2g))(√H − √(H − h_m))**, where A_m is the mould area and h_m the mould height.

**Aspiration:** a straight sprue would make the stream pull away from the walls and suck in air. The sprue is tapered so that A₁/A₂ = √(h₂/h₁).

## Solidification and risers

**Chvorinov's rule:** solidification time

**t_s = B (V/A)ⁿ**, n ≈ 2

(V/A is the casting's **modulus**.) A riser must freeze **after** the casting, so its modulus must be larger. For a given volume, a sphere has the smallest surface area and freezes slowest; a cylindrical riser with H = D is commonly used.

## Special casting processes

| Process | Key feature |
| --- | --- |
| Investment (lost wax) | Very fine detail and finish; complex shapes |
| Die casting (pressure) | Non-ferrous metals, high production rate |
| Centrifugal casting | Pipes; dense outer layer, no cores |
| Shell moulding | Thin resin-bonded sand shell; good accuracy |
| Continuous casting | Billets and slabs |

## Defects

Blowholes and gas porosity (gas), shrinkage cavities (poor feeding), cold shuts and misruns (metal too cold), hot tears (restrained contraction), and sand inclusions.

## Worked example

A cube of side 10 cm and a cylinder riser with D = H must freeze together. The cube's modulus is 10/6 = 1.667 cm. A cylinder with D = H has V/A = D/6, so for the same modulus, D = 10 cm; a riser is made larger, for example 20% more modulus.

## Practice

```quiz
q: A mould is filled by top gating with a sprue height of 20 cm and gate area 2 cm². The mould volume is 1000 cm³. What is the filling time in seconds? (g = 981 cm/s², give 2 decimal places.)
answer: 2.52
verify: round(1000 / (2 * (2 * 981 * 20) ** 0.5), 2)
explain: V = √(2 × 981 × 20) = 198.1 cm/s; t = 1000/(2 × 198.1) = 2.52 s.
```

```quiz
q: A casting freezes in 4 minutes. A second casting of the same metal and mould has twice the modulus V/A. Using n = 2, how many minutes does it take?
answer: 16
verify: 4 * 2 ** 2
explain: t ∝ (V/A)², so doubling the modulus multiplies the time by 4.
```

```quiz
q: What is the modulus V/A (in cm) of a cube with side 6 cm?
answer: 1
verify: 6 ** 3 / (6 * 6 ** 2)
explain: V/A = a³/(6a²) = a/6 = 1 cm.
```

```quiz
q: Which process is best for making long hollow pipes without cores?
* Centrifugal casting
- Investment casting
- Die casting
- Shell moulding
explain: Spinning the mould throws the metal against the wall, forming a hollow tube without a core.
```
