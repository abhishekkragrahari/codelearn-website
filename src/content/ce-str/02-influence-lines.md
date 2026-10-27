---
title: Influence Lines and Moving Loads
chapter: Fundamentals
description: Influence lines for reactions, shear and bending moment in simply supported beams, Müller-Breslau principle, maximum effects of point loads and UDLs, and absolute maximum bending moment.
---
Bridges carry **moving loads**. An **influence line (IL)** shows how a reaction, shear or moment at one fixed point changes as a unit load moves across the structure. It tells you where to place loads for the worst effect.

## Influence lines for a simply supported beam (span L)

For a section C at distance a from A (b from B, a + b = L):

| Quantity | Influence line |
| --- | --- |
| Reaction R_A | Straight line from 1 at A to 0 at B |
| Reaction R_B | From 0 at A to 1 at B |
| Shear at C | −x/L for the load left of C; (L − x)/L to the right: a jump of 1 at C, ordinates −a/L and +b/L |
| Moment at C | Triangle with peak **ab/L** at C |

## Using an influence line

- **Point load W:** effect = W × ordinate under the load.
- **UDL w:** effect = w × **area** of the IL under the loaded length.
- For maximum moment at C from a UDL longer than the span, cover the whole span: M = w × (½ × L × ab/L) = wab/2.

## Müller–Breslau principle

The influence line for a force quantity is the **deflected shape** obtained by removing the restraint for that quantity and applying a unit displacement in its direction. It gives quick sketches for indeterminate beams too (their ILs are curved).

## Series of moving point loads

- **Maximum moment at a section:** a load must be at the section; the average load on the left segment should equal the average load on the whole span (as the loads move, check when the condition changes sign).
- **Absolute maximum bending moment:** occurs under one of the heavy loads when the **centre of the span** lies midway between that load and the **resultant** of all loads on the span.
- A single load W anywhere gives the largest moment at mid-span: WL/4.

## Worked example

A simply supported beam of span 10 m. Find the maximum moment at 4 m from A due to a 20 kN point load and a 5 kN/m UDL covering the span.

- IL ordinate at C = ab/L = 4 × 6/10 = 2.4 m.
- Point load at C: 20 × 2.4 = 48 kN·m. UDL: 5 × (½ × 10 × 2.4) = 60 kN·m.
- Total **108 kN·m**.

## Practice

```quiz
q: For a 12 m simply supported beam, what is the influence line ordinate for bending moment at 3 m from A, under the section (in m)?
answer: 2.25
verify: 3 * 9 / 12
explain: Peak ordinate = ab/L = 3 × 9/12 = 2.25 m.
```

```quiz
q: A UDL of 10 kN/m longer than the span crosses a simply supported beam of span 8 m. What is the maximum shear at mid-span (kN)?
answer: 10
verify: 10 * 0.5 * 4 * 0.5
explain: The IL for shear at mid-span has ordinate +0.5 at the section; the positive part is a triangle of area ½ × 4 × 0.5 = 1. Load only that part: 10 × 1 = 10 kN.
```

```quiz
q: A single 50 kN load moves across a 6 m simply supported beam. What is the absolute maximum bending moment in kN·m?
answer: 75
verify: 50 * 6 / 4
explain: For a single load, the worst moment is at mid-span: WL/4 = 75 kN·m.
```

```quiz
q: The influence line for bending moment at a section of a statically determinate beam consists of:
* Straight lines
- Parabolas
- Cubic curves
- Circular arcs
explain: Determinate structures have straight-line influence lines; indeterminate ones have curved lines.
```
