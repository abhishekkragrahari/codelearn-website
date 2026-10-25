---
title: Systems of Linear Equations
chapter: Linear Algebra
description: Writing a system as Ax = b, Gaussian elimination, when a system has a unique solution, infinitely many or none (rank test), homogeneous systems, and LU decomposition.
---
A system of m linear equations in n unknowns is written **Ax = b**, where A is the m × n coefficient matrix. The **augmented matrix** [A | b] carries the right-hand sides along.

## Gaussian elimination

Use row operations (swap rows, multiply a row by a non-zero number, add a multiple of one row to another) to bring [A | b] to **row echelon form**, then solve from the bottom up (**back substitution**). Row operations never change the solution set.

Example:

x + y + z = 6
2x − y + 3z = 9
x + 2y − z = 2

```python
from fractions import Fraction

def solve(A, b):
    n = len(A)
    M = [[Fraction(x) for x in row] + [Fraction(v)] for row, v in zip(A, b)]
    for c in range(n):
        pivot = next(r for r in range(c, n) if M[r][c] != 0)
        M[c], M[pivot] = M[pivot], M[c]
        for r in range(c + 1, n):
            f = M[r][c] / M[c][c]
            M[r] = [a - f * p for a, p in zip(M[r], M[c])]
    print("echelon form:")
    for row in M:
        print("  ", [str(x) for x in row])
    x = [Fraction(0)] * n
    for r in reversed(range(n)):                       # back substitution
        x[r] = (M[r][n] - sum(M[r][k] * x[k] for k in range(r + 1, n))) / M[r][r]
    return [str(v) for v in x]

print("solution:", solve([[1, 1, 1], [2, -1, 3], [1, 2, -1]], [6, 9, 2]))
```
```output
echelon form:
   ['1', '1', '1', '6']
   ['0', '-3', '1', '-3']
   ['0', '0', '-5/3', '-5']
solution: ['1', '2', '3']
```

## How many solutions? The rank test

Let r = rank(A), r′ = rank([A | b]), and n = number of unknowns:

| Condition | Solutions |
| --- | --- |
| r ≠ r′ | **None** (inconsistent: a row reduces to 0 = non-zero) |
| r = r′ = n | **Exactly one** |
| r = r′ < n | **Infinitely many**, with n − r free variables |

For a square system, a unique solution exists exactly when det(A) ≠ 0 (and then x = A⁻¹b; Cramer's rule gives xᵢ = det(Aᵢ)/det(A), where Aᵢ has column i replaced by b).

**Example with a parameter.** For x + y + z = 1, x + 2y + 3z = 2, x + 4y + kz = 4, the determinant of the coefficients is k − 7.

- If k ≠ 7, there is exactly one solution.
- If k = 7, subtracting row 1 from rows 2 and 3 gives (0, 1, 2 | 1) and (0, 3, 6 | 3): the third is 3 times the second, so the system is consistent with rank 2 < 3, and it has **infinitely many** solutions.

Had the last right-hand side been anything other than 4, k = 7 would have made the system inconsistent.

## Homogeneous systems

**Ax = 0** always has the trivial solution x = 0. It has **non-trivial** solutions exactly when rank(A) < n, which for a square matrix means det(A) = 0. The solutions form a subspace (the **null space**) of dimension n − rank(A) (rank–nullity theorem).

## LU decomposition

**LU decomposition** writes A = LU, with L lower triangular (1s on the diagonal in Doolittle's method) and U upper triangular. U is the echelon form from Gaussian elimination, and L holds the multipliers used. Solving Ax = b then takes two triangular solves, Ly = b (forward) and Ux = y (back), which is cheap to repeat for many right-hand sides b. (If a zero pivot appears, rows must be swapped: PA = LU.)

```python
from fractions import Fraction

def lu(A):
    n = len(A)
    U = [[Fraction(x) for x in row] for row in A]
    L = [[Fraction(int(i == j)) for j in range(n)] for i in range(n)]
    for c in range(n):
        for r in range(c + 1, n):
            L[r][c] = U[r][c] / U[c][c]                  # store the multiplier
            U[r] = [a - L[r][c] * p for a, p in zip(U[r], U[c])]
    return L, U

L, U = lu([[2, 1, 1], [4, 3, 3], [8, 7, 9]])
print("L =", [[str(x) for x in row] for row in L])
print("U =", [[str(x) for x in row] for row in U])
print("det = product of U's diagonal =", U[0][0] * U[1][1] * U[2][2])
```
```output
L = [['1', '0', '0'], ['2', '1', '0'], ['4', '3', '1']]
U = [['2', '1', '1'], ['0', '1', '1'], ['0', '0', '2']]
det = product of U's diagonal = 4
```

## Practice questions

```quiz
q: For which value of k does the system x + y + z = 1, x + 2y + 3z = 2, x + 4y + kz = 4 have infinitely many solutions?
answer: 7
verify:
  from fractions import Fraction as F
  def rank(M):
      M = [[F(x) for x in r] for r in M]; r = 0
      for c in range(len(M[0])):
          p = next((i for i in range(r, len(M)) if M[i][c] != 0), None)
          if p is None: continue
          M[r], M[p] = M[p], M[r]
          for i in range(len(M)):
              if i != r and M[i][c] != 0:
                  f = M[i][c] / M[r][c]; M[i] = [a - f * b for a, b in zip(M[i], M[r])]
          r += 1
      return r
  print(next(k for k in range(-20, 21) if rank([[1, 1, 1], [1, 2, 3], [1, 4, k]]) == rank([[1, 1, 1, 1], [1, 2, 3, 2], [1, 4, k, 4]]) < 3))
explain: The coefficient determinant is k − 7, so only k = 7 can fail to give a unique solution. With k = 7 the augmented matrix also has rank 2 (the third equation is consistent with the first two), so there are infinitely many solutions.
```

```quiz
q: A system Ax = b has 5 unknowns, rank(A) = 3 and rank([A | b]) = 3. How many free variables does its solution have?
answer: 2
verify: 5 - 3
explain: The ranks agree, so the system is consistent; the solution has n − r = 5 − 3 = 2 free parameters (infinitely many solutions).
```

```quiz
q: The homogeneous system Ax = 0, with A a 4 × 4 matrix, has a non-trivial solution. Which statement must be true?
- det(A) ≠ 0
* rank(A) < 4
- A is invertible
- The system has exactly one solution
explain: Non-trivial solutions exist exactly when the columns are dependent: rank(A) < n, equivalently det(A) = 0. Then there are infinitely many solutions, and A is singular.
```

```quiz
q: In the LU decomposition example of this lesson (A = [[2, 1, 1], [4, 3, 3], [8, 7, 9]]), what is the multiplier L[2][0] (row 3, column 1)?
answer: 4
verify: 8 // 2
explain: To eliminate the 8 below the first pivot 2, row 3 is reduced by 8 / 2 = 4 times row 1; that multiplier is stored in L.
```
