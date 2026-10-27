---
title: Linear Programming, Transportation and Assignment
chapter: Operations Research
description: Formulating LP problems, graphical method, simplex method, duality, transportation problems (NWC, VAM, MODI) and assignment problems by the Hungarian method.
---
**Linear programming (LP)** finds the best value of a linear objective subject to linear constraints. Transportation and assignment problems are special LPs with fast methods of their own.

## Formulation

1. **Decision variables** (for example x₁, x₂ = units of products 1 and 2).
2. **Objective:** maximise profit or minimise cost, a linear function of the variables.
3. **Constraints:** resource limits as linear inequalities; plus non-negativity x ≥ 0.

## Graphical method (two variables)

Draw each constraint, find the **feasible region** (a convex polygon), and evaluate the objective at its **corner points**: the optimum is at a corner. Special cases:

- **Unbounded:** the objective can grow forever.
- **Infeasible:** no point satisfies all constraints.
- **Multiple optima:** the objective line is parallel to a binding constraint.
- **Degenerate:** more constraints than needed meet at a corner.

## Simplex method

Converts inequalities to equations with **slack** (≤) or **surplus + artificial** (≥) variables, and moves from corner to corner improving the objective. Big-M and two-phase methods handle artificial variables.

**Duality:** every LP has a dual. A primal with m constraints and n variables has a dual with n constraints and m variables, and at optimum their objective values are equal. The dual variables are the **shadow prices** of the resources.

## Transportation problem

Ship goods from m sources to n destinations at least cost.

- Balanced if total supply = total demand (otherwise add a dummy row or column with zero cost).
- A basic feasible solution has **m + n − 1** allocations (fewer means degenerate).
- **Initial solutions:** north-west corner (simple), least-cost, and **Vogel's approximation (VAM)**, usually closest to optimal.
- **Optimality:** MODI (u–v) method: uᵢ + vⱼ = cᵢⱼ for occupied cells; if every empty cell has cᵢⱼ − uᵢ − vⱼ ≥ 0, the solution is optimal.

## Assignment problem

Assign n jobs to n workers at least total cost (one each). **Hungarian method:**

1. Subtract each row's minimum, then each column's minimum.
2. Cover all zeros with the fewest lines. If n lines are needed, an optimal assignment exists among the zeros.
3. Otherwise subtract the smallest uncovered value from uncovered cells, add it at line intersections, and repeat.

## Worked example

Maximise Z = 3x + 5y subject to x ≤ 4, 2y ≤ 12, 3x + 2y ≤ 18, x, y ≥ 0.

Corner points: (0, 0), (4, 0), (4, 3), (2, 6), (0, 6). Z values: 0, 12, 27, **36**, 30. The optimum is **Z = 36 at (2, 6)**.

## Practice

```quiz
q: For the worked example above, what is the maximum value of Z?
answer: 36
verify: max(3 * x + 5 * y for x, y in [(0, 0), (4, 0), (4, 3), (2, 6), (0, 6)])
explain: Evaluating Z at each corner, the largest is 3 × 2 + 5 × 6 = 36.
```

```quiz
q: A transportation problem has 4 sources and 5 destinations. How many allocations does a non-degenerate basic feasible solution have?
answer: 8
verify: 4 + 5 - 1
explain: m + n − 1 = 4 + 5 − 1 = 8.
```

```quiz
q: Find the minimum total cost of assigning jobs A and B to workers 1 and 2, with costs A1 = 8, A2 = 4, B1 = 5, B2 = 7.
answer: 9
verify: min(8 + 7, 4 + 5)
explain: Two possible assignments: A1 + B2 = 15 or A2 + B1 = 9. The minimum is 9.
```

```quiz
q: In the graphical method, the optimal solution of an LP (if it exists) always lies:
* At a corner point of the feasible region
- At the centre of the feasible region
- Outside the feasible region
- On the x-axis
explain: A linear objective over a convex polygon reaches its best value at a vertex (possibly along an edge in the case of multiple optima).
```
