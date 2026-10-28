---
title: Two-Port Networks and Network Graphs
chapter: Network Analysis
description: Z, Y, h and ABCD parameters, conditions for reciprocity and symmetry, interconnection of two-ports, network graph theory, trees, cut-sets and incidence matrices.
---
A **two-port network** is a box with an input pair and an output pair of terminals. Four parameters describe it completely, whatever is inside.

## Parameter sets

| Parameters | Equations | Found by |
| --- | --- | --- |
| **Z** (impedance) | V₁ = z₁₁I₁ + z₁₂I₂; V₂ = z₂₁I₁ + z₂₂I₂ | Opening a port (I = 0) |
| **Y** (admittance) | I₁ = y₁₁V₁ + y₁₂V₂; I₂ = y₂₁V₁ + y₂₂V₂ | Shorting a port (V = 0) |
| **h** (hybrid) | V₁ = h₁₁I₁ + h₁₂V₂; I₂ = h₂₁I₁ + h₂₂V₂ | Transistor models |
| **ABCD** (transmission) | V₁ = AV₂ − BI₂; I₁ = CV₂ − DI₂ | Cascaded networks, power lines |

[Y] = [Z]⁻¹.

## Reciprocity and symmetry

| Parameters | Reciprocal | Symmetric |
| --- | --- | --- |
| Z | z₁₂ = z₂₁ | z₁₁ = z₂₂ |
| Y | y₁₂ = y₂₁ | y₁₁ = y₂₂ |
| h | h₁₂ = −h₂₁ | Δh = 1 |
| ABCD | **AD − BC = 1** | A = D |

Networks of R, L, C (and transformers) are reciprocal.

## Interconnections

- **Series:** Z matrices add.
- **Parallel:** Y matrices add.
- **Cascade:** ABCD matrices **multiply** (in order).

## Network graph theory

- A **graph** has nodes (n) and branches (b). A **tree** connects all nodes without loops: it has **n − 1 branches** (twigs); the rest, **b − n + 1**, are **links**.
- **Fundamental loops** (tie-sets): one per link → b − n + 1 loop equations. **Fundamental cut-sets:** one per twig → n − 1 node equations.
- **Incidence matrix** A (reduced: (n − 1) × b): KCL is A I = 0.
- Number of trees of a complete graph with n nodes: nⁿ⁻² (Cayley).

## Worked example

A T-network has series arms Z₁ = 2 Ω and Z₂ = 3 Ω and shunt arm Z₃ = 4 Ω.

- z₁₁ = Z₁ + Z₃ = **6 Ω**; z₂₂ = Z₂ + Z₃ = **7 Ω**; z₁₂ = z₂₁ = Z₃ = **4 Ω** (reciprocal, not symmetric).

## Practice

```quiz
q: A two-port has A = 2, B = 3 Ω and D = 2. If it is reciprocal, what is C (in S)?
answer: 1
verify: (2 * 2 - 1) / 3
explain: AD − BC = 1 gives 4 − 3C = 1, so C = 1 S.
```

```quiz
q: A connected graph has 6 nodes and 10 branches. How many links does any tree leave?
answer: 5
verify: 10 - 6 + 1
explain: Twigs = n − 1 = 5, links = b − n + 1 = 5.
```

```quiz
q: Two two-port networks are connected in cascade. The overall parameters are obtained by:
- Adding Z matrices
- Adding Y matrices
* Multiplying ABCD matrices
- Adding h matrices
explain: In a cascade, the output of one is the input of the next, so transmission matrices multiply.
```

```quiz
q: How many spanning trees does a complete graph on 4 nodes have?
answer: 16
verify: 4 ** (4 - 2)
explain: Cayley's formula nⁿ⁻² = 4² = 16.
```

```quiz
q: A T-network has series arms 5 Ω and 5 Ω and a shunt arm of 10 Ω. What is z₁₁ in Ω?
answer: 15
verify: 5 + 10
explain: z₁₁ = Z₁ + Z₃ = 5 + 10 = 15 Ω.
```

```quiz
q: A graph has 8 nodes and 12 branches. How many twigs does a spanning tree have?
answer: 7
verify: 8 - 1
explain: A tree on n nodes has n − 1 = 7 branches (twigs).
```
