---
title: LU Decomposition
chapter: Eigenvalues and Decompositions
description: Writing a matrix as a lower triangular times an upper triangular matrix, Doolittle's method from Gaussian elimination, solving Ax = b with forward and back substitution, when LU exists, pivoting (PA = LU), the determinant from LU, and Cholesky decomposition, for GATE DA.
---
Gaussian elimination solves one system A**x** = **b**. If the same A must be solved with many different right-hand sides, it is wasteful to repeat the elimination each time. **LU decomposition** records the elimination once:

**A = LU**

where L is **lower triangular** and U is **upper triangular**. Then A**x** = **b** becomes two easy triangular solves.

## Where L and U come from

Gaussian elimination turns A into an upper triangular U by subtracting multiples of rows. If each step subtracts lᵢⱼ times row j from row i (with i > j), those **multipliers** lᵢⱼ, placed below a diagonal of 1s, form L. This is **Doolittle's** form (L has unit diagonal).

**Example.** A = [[2, 1, 1], [4, 3, 3], [8, 7, 9]].

1. Column 1: l₂₁ = 4/2 = 2 and l₃₁ = 8/2 = 4. R₂ − 2R₁ = (0, 1, 1) and R₃ − 4R₁ = (0, 3, 5).
2. Column 2: l₃₂ = 3/1 = 3. R₃ − 3R₂ = (0, 0, 2).

So

L = [[1, 0, 0], [2, 1, 0], [4, 3, 1]], U = [[2, 1, 1], [0, 1, 1], [0, 0, 2]].

Multiplying back: row 3 of LU = 4 × (2, 1, 1) + 3 × (0, 1, 1) + 1 × (0, 0, 2) = (8, 7, 9). ✓

## Solving A**x** = **b** with LU

A**x** = LU**x** = **b**. Let **y** = U**x**:

1. **Forward substitution**: solve L**y** = **b** from the top down.
2. **Back substitution**: solve U**x** = **y** from the bottom up.

For **b** = (4, 10, 24):

- L**y** = **b**: y₁ = 4; 2y₁ + y₂ = 10 ⇒ y₂ = 2; 4y₁ + 3y₂ + y₃ = 24 ⇒ y₃ = 2.
- U**x** = **y**: 2x₃ = 2 ⇒ x₃ = 1; x₂ + x₃ = 2 ⇒ x₂ = 1; 2x₁ + x₂ + x₃ = 4 ⇒ x₁ = 1.

So **x** = (1, 1, 1). Check: A(1, 1, 1) = (4, 10, 24). ✓

**Cost.** The factorisation takes about (2/3)n³ operations, but each triangular solve only about n². With k right-hand sides, LU costs about (2/3)n³ + 2kn², compared with k(2/3)n³ for repeating elimination.

## The determinant from LU

det(A) = det(L) det(U), and the determinant of a triangular matrix is the product of its diagonal. With unit diagonal in L:

**det(A) = product of the diagonal of U** = 2 × 1 × 2 = 4 for the example.

## When does LU exist? Pivoting

Elimination fails if a **zero pivot** appears. A = [[0, 1], [1, 1]] has no LU decomposition, even though it is invertible. A square matrix has an LU decomposition (without row swaps) when all its **leading principal minors are non-zero**, and then the Doolittle form is unique.

In practice, rows are swapped (**partial pivoting**: bring the entry with the largest absolute value into the pivot position), which also reduces rounding errors. The result is **PA = LU**, where P is a **permutation matrix**. Every square matrix has such a factorisation.

## Cholesky decomposition

If A is **symmetric positive definite**, it can be factorised as **A = LLᵀ**, with L lower triangular and positive diagonal. This **Cholesky decomposition** takes half the work of LU and is used for covariance matrices and least-squares problems. For example, [[4, 2], [2, 5]] = LLᵀ with L = [[2, 0], [1, 2]].

```python
from fractions import Fraction as F

def lu(A):
    n = len(A)
    U = [[F(x) for x in row] for row in A]
    L = [[F(int(i == j)) for j in range(n)] for i in range(n)]
    for j in range(n):
        for i in range(j + 1, n):
            L[i][j] = U[i][j] / U[j][j]
            U[i] = [a - L[i][j] * b for a, b in zip(U[i], U[j])]
    return L, U

def show(M):
    return [[str(x) for x in row] for row in M]

A = [[2, 1, 1], [4, 3, 3], [8, 7, 9]]
L, U = lu(A)
print("L =", show(L))
print("U =", show(U))
LU = [[sum(L[i][k] * U[k][j] for k in range(3)) for j in range(3)] for i in range(3)]
print("L U == A:", LU == [[F(x) for x in r] for r in A])

b = [4, 10, 24]
y = []
for i in range(3):
    y.append(b[i] - sum(L[i][k] * y[k] for k in range(i)))
x = [F(0)] * 3
for i in reversed(range(3)):
    x[i] = (y[i] - sum(U[i][k] * x[k] for k in range(i + 1, 3))) / U[i][i]
print("y =", [str(v) for v in y], " x =", [str(v) for v in x])
det = 1
for i in range(3):
    det *= U[i][i]
print("det(A) =", det)
```
```output
L = [['1', '0', '0'], ['2', '1', '0'], ['4', '3', '1']]
U = [['2', '1', '1'], ['0', '1', '1'], ['0', '0', '2']]
L U == A: True
y = ['4', '2', '2']  x = ['1', '1', '1']
det(A) = 4
```

## Practice questions

```quiz
q: In the Doolittle LU decomposition of A = [[3, 1], [6, 5]], what is the (2, 2) entry of U?
answer: 3
verify: 5 - (6 / 3) * 1
explain: The multiplier is l₂₁ = 6/3 = 2. Row 2 − 2 × row 1 = (6 − 6, 5 − 2) = (0, 3), so u₂₂ = 3.
```

```quiz
q: A = LU with L = [[1, 0, 0], [2, 1, 0], [−1, 3, 1]] and U = [[2, 4, 1], [0, −1, 2], [0, 0, 5]]. What is det(A)?
answer: -10
verify: 1 * 1 * 1 * 2 * -1 * 5
explain: det(A) = det(L) det(U) = 1 × (2 × (−1) × 5) = −10.
```

```quiz
q: Using L = [[1, 0], [3, 1]] and U = [[2, 1], [0, 4]], solve Ax = b for b = (5, 23). What is x₂?
answer: 2
verify:
  y1 = 5
  y2 = 23 - 3 * y1
  print(y2 / 4)
explain: Forward substitution: y₁ = 5 and 3y₁ + y₂ = 23, so y₂ = 8. Back substitution: 4x₂ = 8, so x₂ = 2 (and then 2x₁ + x₂ = 5 gives x₁ = 1.5).
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* Every square matrix has a factorisation PA = LU for some permutation matrix P
- Every invertible matrix has an LU decomposition without row swaps
* Once A = LU is known, each new right-hand side costs only two triangular solves
* A symmetric positive definite matrix has a Cholesky decomposition A = LLᵀ
explain: Partial pivoting always works. [[0, 1], [1, 1]] is invertible but has a zero first pivot, so it needs a row swap. Forward and back substitution each take about n² operations. Cholesky exists exactly for symmetric positive definite matrices.
```
