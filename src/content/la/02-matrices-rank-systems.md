---
title: Matrices, Rank and Systems of Linear Equations
chapter: Matrices
description: Matrix operations, row echelon form and Gaussian elimination, the rank of a matrix, column space and null space, the rank-nullity theorem, and when a system Ax = b has no solution, one solution or infinitely many, for GATE DA.
---
A system of linear equations is one matrix equation A**x** = **b**. Whether it has a solution, and how many, is decided by a single number: the **rank** of A.

## Matrix operations

For an m × n matrix A (m rows, n columns):

- **Product**: if A is m × n and B is n × p, then AB is m × p with (AB)ᵢⱼ = Σₖ aᵢₖbₖⱼ. Matrix multiplication is associative and distributive but **not commutative**: AB ≠ BA in general.
- **Transpose**: (Aᵀ)ᵢⱼ = aⱼᵢ, with (AB)ᵀ = BᵀAᵀ.
- **Inverse**: a square A is invertible if there is A⁻¹ with AA⁻¹ = A⁻¹A = I. Then (AB)⁻¹ = B⁻¹A⁻¹ and (Aᵀ)⁻¹ = (A⁻¹)ᵀ. For a 2 × 2 matrix, [[a, b], [c, d]]⁻¹ = (1/(ad − bc)) [[d, −b], [−c, a]].
- **Trace**: tr(A) = sum of the diagonal entries; tr(AB) = tr(BA).

The product A**x** is a **linear combination of the columns of A**, with the entries of **x** as coefficients. This view explains most of what follows.

## Row echelon form and Gaussian elimination

**Elementary row operations** do not change the solutions of a system:

1. swap two rows;
2. multiply a row by a non-zero number;
3. add a multiple of one row to another.

**Gaussian elimination** uses them to reach **row echelon form**: all zero rows at the bottom, and each row's first non-zero entry (its **pivot**) to the right of the pivot above it. Continuing until every pivot is 1 and is the only non-zero entry in its column gives the **reduced row echelon form** (RREF), which is unique.

## Rank

The **rank** of A is the number of pivots in its row echelon form. Equivalently, it is:

- the maximum number of linearly independent **rows**, which always equals
- the maximum number of linearly independent **columns** ("row rank = column rank");
- the size of the largest square submatrix with non-zero determinant.

Properties:

- rank(A) ≤ min(m, n); A is **full rank** if equality holds.
- rank(A) = rank(Aᵀ) = rank(AᵀA).
- rank(AB) ≤ min(rank A, rank B).
- An n × n matrix is invertible ⟺ rank = n ⟺ det ≠ 0.
- A non-zero matrix **uvᵀ** (an outer product) has rank 1.

**Example.** A = [[1, 2, 1], [2, 4, 3], [3, 6, 4]]. Row 3 = row 1 + row 2, and rows 1 and 2 are not multiples, so rank(A) = **2**. Elimination: R₂ − 2R₁ = (0, 0, 1) and R₃ − 3R₁ = (0, 0, 1), then R₃ − R₂ = (0, 0, 0). Two pivots.

## The four subspaces and rank-nullity

- **Column space** C(A) ⊆ ℝᵐ: all vectors A**x**, the span of the columns. dim = rank(A).
- **Null space** N(A) ⊆ ℝⁿ: all **x** with A**x** = **0**. Its dimension is the **nullity**.
- The row space C(Aᵀ) and the left null space N(Aᵀ) complete the picture. The null space is **orthogonal** to the row space.

**Rank-nullity theorem**: for an m × n matrix A,

**rank(A) + nullity(A) = n** (the number of columns)

In the example, rank 2 + nullity 1 = 3 columns. The null space is spanned by (−2, 1, 0), because −2 × column 1 + column 2 = **0**.

## Solving A**x** = **b**

Form the **augmented matrix** [A | **b**] and compare ranks (the Rouché-Capelli theorem). With n unknowns:

| Condition | Solutions |
| --- | --- |
| rank(A) < rank([A \| b]) | **None** (inconsistent) |
| rank(A) = rank([A \| b]) = n | **Exactly one** |
| rank(A) = rank([A \| b]) < n | **Infinitely many**, with n − rank free variables |

- A **homogeneous** system A**x** = **0** always has the solution **x** = **0**. It has non-zero solutions exactly when rank(A) < n; for a square matrix, when det(A) = 0.
- Every solution of A**x** = **b** is **x**ₚ + **x**ₙ: one particular solution plus anything from the null space.
- A system with more unknowns than equations (n > m) can never have exactly one solution.

**Example.** For which k and m does this system have no solution, one, or infinitely many?

x + y + z = 6, x + 2y + 3z = 14, x + 3y + kz = m.

Elimination gives y + 2z = 8 and then (k − 5)z = m − 22.

- k ≠ 5: exactly one solution.
- k = 5 and m = 22: infinitely many (the last row is 0 = 0).
- k = 5 and m ≠ 22: no solution (the last row is 0 = non-zero).

```python
from fractions import Fraction as F

def rref(rows):
    M = [[F(x) for x in r] for r in rows]
    pivots, r = [], 0
    for c in range(len(M[0])):
        p = next((i for i in range(r, len(M)) if M[i][c] != 0), None)
        if p is None:
            continue
        M[r], M[p] = M[p], M[r]
        M[r] = [x / M[r][c] for x in M[r]]
        for i in range(len(M)):
            if i != r:
                M[i] = [a - M[i][c] * b for a, b in zip(M[i], M[r])]
        pivots.append(c)
        r += 1
    return M, pivots

A = [[1, 2, 1], [2, 4, 3], [3, 6, 4]]
R, piv = rref(A)
print("RREF:", [[str(x) for x in row] for row in R])
print("rank =", len(piv), " nullity =", len(A[0]) - len(piv))

def classify(k, m):
    aug = [[1, 1, 1, 6], [1, 2, 3, 14], [1, 3, k, m]]
    r_aug = len(rref(aug)[1])
    r_a = len(rref([row[:3] for row in aug])[1])
    if r_a < r_aug:
        return "no solution"
    return "unique solution" if r_a == 3 else "infinitely many"

for k, m in [(4, 20), (5, 22), (5, 20)]:
    print(f"k = {k}, m = {m}: rank(A) and rank([A|b]) -> {classify(k, m)}")
print("solution for k = 4, m = 20:", [str(row[3]) for row in rref([[1, 1, 1, 6], [1, 2, 3, 14], [1, 3, 4, 20]])[0]])
```
```output
RREF: [['1', '2', '0'], ['0', '0', '1'], ['0', '0', '0']]
rank = 2  nullity = 1
k = 4, m = 20: rank(A) and rank([A|b]) -> unique solution
k = 5, m = 22: rank(A) and rank([A|b]) -> infinitely many
k = 5, m = 20: rank(A) and rank([A|b]) -> no solution
solution for k = 4, m = 20: ['0', '4', '2']
```

## Practice questions

```quiz
q: What is the rank of the matrix [[1, 2, 3, 4], [2, 4, 6, 8], [1, 0, 1, 0]]?
answer: 2
verify:
  from fractions import Fraction as F
  M = [[F(x) for x in r] for r in [[1, 2, 3, 4], [2, 4, 6, 8], [1, 0, 1, 0]]]
  r = 0
  for c in range(4):
      p = next((i for i in range(r, 3) if M[i][c] != 0), None)
      if p is None:
          continue
      M[r], M[p] = M[p], M[r]
      for i in range(3):
          if i != r and M[i][c] != 0:
              f = M[i][c] / M[r][c]
              M[i] = [a - f * b for a, b in zip(M[i], M[r])]
      r += 1
  print(r)
explain: Row 2 is twice row 1, so it adds nothing. Rows 1 and 3 are not multiples of each other. So the rank is 2.
```

```quiz
q: A 5 × 7 matrix has rank 4. What is the dimension of its null space?
answer: 3
verify: 7 - 4
explain: By rank-nullity, nullity = number of columns − rank = 7 − 4 = 3.
```

```quiz
q: A system of 4 equations in 6 unknowns is consistent, and its coefficient matrix has rank 4. How many free variables does its general solution have?
answer: 2
verify: 6 - 4
explain: The number of free variables is n − rank = 6 − 4 = 2, so there are infinitely many solutions.
```

```quiz
q: For which value of λ does the homogeneous system x + 2y = 0, 3x + λy = 0 have a non-zero solution?
answer: 6
verify: next(l for l in range(-20, 21) if 1 * l - 2 * 3 == 0)
explain: A square homogeneous system has non-zero solutions exactly when the determinant is 0: 1 · λ − 2 · 3 = 0, so λ = 6.
```

```quiz
q: For an m × n matrix A, which statements are **true**? (Select all that apply.)
* rank(A) = rank(Aᵀ)
* rank(AᵀA) = rank(A)
- rank(A) can be larger than min(m, n)
* If m < n, the system Ax = 0 has a non-zero solution
explain: Row rank equals column rank. AᵀA has the same null space as A (Aᵀ A x = 0 implies ‖Ax‖² = 0), so it has the same rank. The rank is at most min(m, n). If m < n, rank ≤ m < n, so the null space is non-trivial.
```

```quiz
q: The system x + y = 2, 2x + 2y = k has infinitely many solutions. What is k?
answer: 4
verify: 2 * 2
explain: The second equation's left side is twice the first, so the system is consistent only if k = 2 × 2 = 4; then the two equations are the same line and there are infinitely many solutions. For any other k there is none.
```
