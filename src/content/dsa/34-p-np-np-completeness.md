---
title: P, NP, NP-Complete and NP-Hard
chapter: Complexity Classes
description: Decision problems, the classes P and NP, polynomial-time reductions, NP-complete and NP-hard problems, Cook-Levin theorem, classic NP-complete problems and what reductions prove.
---
Some problems have fast algorithms; for others, nobody has found one despite decades of effort. **Complexity classes** sort problems by how hard they are, and **reductions** let us prove that a new problem is at least as hard as a known one.

## Decision problems

Complexity classes are defined for **decision problems** (answer yes or no). An optimisation problem has a decision version: "is there a tour of length ≤ k?" instead of "find the shortest tour".

## P and NP

- **P:** problems solvable in **polynomial time** O(nᵏ) by a deterministic algorithm. Examples: sorting, shortest paths, MST, 2-SAT, checking whether a graph is bipartite, linear programming.
- **NP:** problems whose **yes-answers can be verified in polynomial time** given a certificate (a proposed solution). Equivalently, solvable in polynomial time by a non-deterministic machine.
  - Example: for SAT, the certificate is a truth assignment; checking it is easy, finding it may not be.
- **P ⊆ NP:** if you can solve a problem quickly, you can verify it quickly.
- Whether **P = NP** is the most famous open question in computer science. Most researchers believe P ≠ NP.

## Reductions

A **polynomial-time reduction A ≤ₚ B** converts every instance of A into an instance of B with the same answer, in polynomial time. Then:

- If B is in P, so is A (solve A by converting it to B).
- If A is hard, B is at least as hard.

The direction matters: to show a **new** problem X is hard, reduce a **known hard** problem **to X**.

## NP-complete and NP-hard

- **NP-hard:** every problem in NP reduces to it. It need not be in NP itself (it may not even be a decision problem, or may be undecidable, like the halting problem).
- **NP-complete:** NP-hard **and** in NP.
- **Cook–Levin theorem:** SAT is NP-complete (the first one known).
- To prove X is NP-complete: (1) show X ∈ NP; (2) reduce a known NP-complete problem to X.
- If **any** NP-complete problem is solved in polynomial time, then **P = NP**.

```pipeline
caption: A classic chain of reductions (each arrow is A ≤ₚ B)
SAT | Cook-Levin
3-SAT | clauses of 3 literals
Independent Set
Vertex Cover
Hamiltonian Cycle
Travelling Salesman | decision version
```

## Classic problems

| In P | NP-complete |
| --- | --- |
| 2-SAT | SAT, 3-SAT |
| Shortest path | Longest simple path |
| Minimum spanning tree | Travelling salesman (decision) |
| Euler circuit | Hamiltonian cycle |
| 2-colouring (bipartite) | 3-colouring |
| Maximum matching | Vertex cover, independent set, clique |
| Fractional knapsack | 0/1 knapsack, subset sum, partition |

Notice how a small change (2 → 3, edges → vertices, fractional → 0/1) moves a problem from P to NP-complete.

## Coping with NP-hard problems

Exact exponential algorithms for small inputs ([backtracking](backtracking.html), branch and bound, bitmask DP), **pseudo-polynomial** DP when numbers are small ([subset sum](dynamic-programming-advanced.html)), **approximation algorithms** (a 2-approximation for vertex cover), and heuristics.

## GATE-style practice questions

```quiz
q: Problem A reduces in polynomial time to problem B (A ≤ₚ B). Which conclusions are valid? (Select all that apply.)
* If B is in P, then A is in P
* If A is NP-hard, then B is NP-hard
- If A is in P, then B is in P
- If B is NP-hard, then A is NP-hard
explain: A reduction transfers easiness from B down to A and hardness from A up to B, never the other way.
```

```quiz
q: Which of these problems are known to be solvable in polynomial time? (Select all that apply.)
* 2-SAT
* Finding an Euler circuit
- 3-colouring of a graph
- Hamiltonian cycle
explain: 2-SAT and Euler circuits have linear-time algorithms; 3-colouring and Hamiltonian cycle are NP-complete.
```

```quiz
q: A problem is NP-complete if it is:
- In NP only
- NP-hard only
* In NP and NP-hard
- In P and NP
explain: NP-complete = NP ∩ NP-hard.
```

```quiz
q: If someone finds a polynomial-time algorithm for 3-SAT, which follows?
* P = NP
- P ≠ NP
- 3-SAT is not in NP
- Only 3-SAT becomes easy; other problems are unaffected
explain: Every NP problem reduces to 3-SAT, so all of NP would be solvable in polynomial time.
```

```quiz
q: The halting problem is:
* NP-hard but not in NP
- NP-complete
- In P
- In NP but not NP-hard
explain: SAT reduces to it (so it is NP-hard), but it is undecidable, so it is not in NP.
```
