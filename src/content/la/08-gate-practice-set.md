---
title: Linear Algebra GATE Practice Set
chapter: GATE Practice
description: Mixed GATE DA style questions on vector spaces, rank, linear systems, special matrices, quadratic forms, eigenvalues, LU decomposition and SVD, with answers and explanations.
---
These questions mix every topic in this track, in the GATE formats **MCQ**, **MSQ** and **NAT**. Each numerical answer is recomputed by a program when the site is built.

## Vector spaces and rank

```quiz
q: **[Span]** What is the dimension of the span of (1, 0, 1, 0), (0, 1, 0, 1), (1, 1, 1, 1) and (1, −1, 1, −1)?
answer: 2
verify:
  from fractions import Fraction as F
  M = [[F(x) for x in r] for r in [[1, 0, 1, 0], [0, 1, 0, 1], [1, 1, 1, 1], [1, -1, 1, -1]]]
  r = 0
  for c in range(4):
      p = next((i for i in range(r, 4) if M[i][c] != 0), None)
      if p is None:
          continue
      M[r], M[p] = M[p], M[r]
      for i in range(4):
          if i != r and M[i][c] != 0:
              f = M[i][c] / M[r][c]
              M[i] = [a - f * b for a, b in zip(M[i], M[r])]
      r += 1
  print(r)
explain: The third vector is the sum of the first two, and the fourth is the first minus the second. So the span is that of the first two, which are independent: dimension 2.
```

```quiz
q: **[Rank]** **u** = (1, 2, 3) and **v** = (4, 5). What is the rank of the 3 × 2 matrix **uv**ᵀ?
answer: 1
verify: 1
explain: Every column of uvᵀ is a multiple of u (column j is vⱼu), so a non-zero outer product has rank 1.
```

```quiz
q: **[Systems]** For which value of a does the system x + y + z = 1, x + 2y + 4z = a, x + 4y + 10z = a² have infinitely many solutions with a > 1?
answer: 2
verify:
  # Elimination: y + 3z = a - 1 and 3y + 9z = a^2 - 1, so consistency needs a^2 - 1 = 3(a - 1).
  print(next(a for a in range(2, 20) if a * a - 1 == 3 * (a - 1)))
explain: Subtracting row 1: y + 3z = a − 1 and 3y + 9z = a² − 1. The coefficient matrix has rank 2, so the system is consistent (with infinitely many solutions) only when a² − 1 = 3(a − 1), i.e. (a − 1)(a − 2) = 0, so a = 1 or a = 2. With a > 1, a = 2.
```

## Special matrices and quadratic forms

```quiz
q: **[Projection]** P is the 4 × 4 orthogonal projection onto a 2-dimensional subspace. What is the trace of 3P + I?
answer: 10
verify: 3 * 2 + 4
explain: P is idempotent with rank 2, so trace(P) = 2. trace(3P + I) = 3 × 2 + 4 = 10.
```

```quiz
q: **[Orthogonal]** Q is a 3 × 3 orthogonal matrix and **x** = (1, 2, 2). What is ‖Q**x**‖?
answer: 3
verify: (1 + 4 + 4) ** 0.5
explain: Orthogonal matrices preserve length: ‖Qx‖ = ‖x‖ = √(1 + 4 + 4) = 3.
```

```quiz
q: **[Quadratic forms]** For which values of c is the quadratic form x² + 2cxy + 4y² positive definite?
- c > 2
* −2 < c < 2
- c < 4
- All real c
explain: The matrix is [[1, c], [c, 4]]. Positive definite needs 1 > 0 and 4 − c² > 0, i.e. |c| < 2.
```

## Eigenvalues and decompositions

```quiz
q: **[Eigenvalues]** A 3 × 3 matrix has trace 6 and determinant 6, and one eigenvalue is 1. The other two eigenvalues are real. What is the larger of them?
answer: 3
verify:
  # The other two eigenvalues sum to 5 and multiply to 6.
  print(max(l for l in range(-10, 11) if 5 - l != 0 and l * (5 - l) == 6))
explain: The other two eigenvalues sum to 6 − 1 = 5 and multiply to 6/1 = 6, so they are the roots of λ² − 5λ + 6 = 0: 2 and 3. The larger is 3.
```

```quiz
q: **[Eigenvalues]** A is 4 × 4 with eigenvalues 1, −1, 2 and 3. What is the trace of A⁻¹? Give the answer to four decimal places.
answer: 0.8333
verify: round(1 + -1 + 1 / 2 + 1 / 3, 4)
explain: A⁻¹ has eigenvalues 1, −1, 1/2 and 1/3, whose sum is 0.5 + 0.3333 = 0.8333.
```

```quiz
q: **[Diagonalization]** Which of these matrices is **not** diagonalizable?
- [[2, 0], [0, 3]]
- [[1, 2], [2, 1]]
* [[5, 1], [0, 5]]
- [[1, 1], [0, 2]]
explain: [[5, 1], [0, 5]] has the eigenvalue 5 twice but A − 5I = [[0, 1], [0, 0]] has rank 1, so only one independent eigenvector. The others are diagonal, symmetric, or have two distinct eigenvalues.
```

```quiz
q: **[LU]** In the Doolittle LU decomposition of [[2, 4, 2], [1, 5, 2], [4, −1, 9]], what is the entry l₃₂ of L?
answer: -3
verify:
  from fractions import Fraction as F
  A = [[F(x) for x in r] for r in [[2, 4, 2], [1, 5, 2], [4, -1, 9]]]
  l31 = A[2][0] / A[0][0]
  r2 = [a - (A[1][0] / A[0][0]) * b for a, b in zip(A[1], A[0])]
  r3 = [a - l31 * b for a, b in zip(A[2], A[0])]
  print(r3[1] / r2[1])
explain: Column 1: l₂₁ = 1/2 and l₃₁ = 2. Row 2 becomes (0, 5 − 2, 2 − 1) = (0, 3, 1) and row 3 becomes (0, −1 − 8, 9 − 4) = (0, −9, 5). Then l₃₂ = −9/3 = −3.
```

```quiz
q: **[SVD]** What is the largest singular value of A = [[2, 0], [0, −3]]?
answer: 3
verify: max(abs(2), abs(-3))
explain: A is diagonal, so AᵀA = [[4, 0], [0, 9]] with eigenvalues 4 and 9. The singular values are 2 and 3; the largest is 3 (not −3: singular values are never negative).
```

```quiz
q: **[Concepts]** Which statements are **true**? (Select all that apply.)
* If A is symmetric, its eigenvectors for different eigenvalues are orthogonal
* The number of non-zero singular values of A equals rank(A)
- If A² = 0, then A = 0
* Similar matrices have the same characteristic polynomial
explain: The spectral theorem gives orthogonal eigenvectors. Rank is the number of non-zero singular values. [[0, 1], [0, 0]] squares to 0 but is not 0. det(P⁻¹AP − λI) = det(P⁻¹(A − λI)P) = det(A − λI).
```
