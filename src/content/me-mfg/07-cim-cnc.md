---
title: CNC, CAD/CAM and Computer Integrated Manufacturing
chapter: Computer Integrated Manufacturing
description: NC and CNC machines, part programming with G and M codes, CAD/CAM basics, group technology, flexible manufacturing systems, additive manufacturing and jigs and fixtures.
---
Modern factories link design and production by computer. This lesson covers **CNC**, part programming, and the main ideas of **computer integrated manufacturing (CIM)**.

## NC and CNC

- **NC:** machine motions controlled by coded instructions. **CNC:** a computer inside the controller stores and edits programs. **DNC:** several machines fed from one computer.
- **Point-to-point** control (drilling) versus **contouring** (milling curves), which needs interpolation.
- **Open-loop** systems use stepper motors with no feedback; **closed-loop** systems use servo motors with encoders.
- **Resolution** of a stepper drive: with a lead screw of pitch p and s steps per revolution, BLU (basic length unit) = p/s.

## Part programming

| Code | Meaning |
| --- | --- |
| G00 | Rapid positioning |
| G01 | Linear interpolation (feed) |
| G02 / G03 | Circular interpolation, clockwise / counter-clockwise |
| G90 / G91 | Absolute / incremental coordinates |
| G20 / G21 | Inch / metric units |
| M03 / M04 / M05 | Spindle on clockwise / counter-clockwise / stop |
| M06 | Tool change |
| M08 / M09 | Coolant on / off |
| M30 | End of program and rewind |

**APT** (Automatically Programmed Tools) is a high-level part programming language.

## CAD/CAM and CIM

- **CAD:** geometric modelling (wireframe, surface, solid: CSG and B-rep). Transformations use homogeneous matrices.
- **CAM:** generating tool paths from the CAD model.
- **Group technology:** grouping parts into families by similar shape or process (Opitz coding), so that **cellular manufacturing** can be used.
- **FMS:** a group of CNC machines linked by automated material handling under computer control; mid-volume, mid-variety production.
- **CAPP:** computer-aided process planning (variant and generative).

## Additive manufacturing

Parts are built layer by layer from a CAD model: stereolithography (SLA), fused deposition modelling (FDM), selective laser sintering (SLS). Useful for prototypes and complex internal shapes.

## Jigs and fixtures

- A **jig** holds the work and **guides the tool** (drill bushes). A **fixture** holds the work only.
- **3-2-1 principle:** 6 locating points (3 on a base plane, 2 on a side face, 1 on an end face) stop the part moving towards the locators. The clamps then press the part against them, so the part cannot move in the opposite directions either.

## Practice

```quiz
q: A stepper motor has 200 steps per revolution and drives a lead screw of 5 mm pitch directly. What is the BLU in mm?
answer: 0.025
verify: 5 / 200
explain: BLU = p/s = 5/200 = 0.025 mm per step.
```

```quiz
q: Which G-code gives clockwise circular interpolation?
- G01
* G02
- G03
- G00
explain: G02 is clockwise, G03 counter-clockwise; G01 is linear and G00 rapid.
```

```quiz
q: How many locating points does the 3-2-1 principle use?
answer: 6
verify: 3 + 2 + 1
explain: 3 on the base, 2 on the side and 1 on the end: 6 points.
```

```quiz
q: The difference between a jig and a fixture is that a jig:
* Also guides the cutting tool
- Is used only for welding
- Does not locate the work
- Is used only on CNC machines
explain: Both locate and hold the work; only a jig guides the tool, for example with drill bushes.
```
