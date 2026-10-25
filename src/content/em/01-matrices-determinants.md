---
title: Matrices, Determinants and Rank
chapter: Linear Algebra
description: Matrix operations and special matrices, determinants and their properties, the inverse, rank by row reduction, and exact computations with fractions.
---
Linear algebra is one of the three parts of GATE's Engineering Mathematics. This lesson covers the tools: matrix operations, determinants and rank.

## Matrices

An m × n matrix has m rows and n columns. **AB** is defined when A is m × n and B is n × p; the result is m × p, with entry (i, j) = Σₖ aᵢₖbₖⱼ. Matrix multiplication is **associative** but **not commutative** (AB ≠ BA in general).

| Special matrix | Definition |
| --- | --- |
| Identity I | 1 on the diagonal, 0 elsewhere: AI = IA = A |
| Diagonal | Non-zero entries only on the diagonal |
| Upper / lower triangular | Zeros below / above the diagonal |
| **Symmetric** | Aᵀ = A |
| **Skew-symmetric** | Aᵀ = −A (so the diagonal is 0) |
| **Orthogonal** | AᵀA = I (so A⁻¹ = Aᵀ) |
| Idempotent | A² = A |
| Nilpotent | Aᵏ = 0 for some k |

Every square matrix is the sum of a symmetric and a skew-symmetric matrix: A = (A + Aᵀ)/2 + (A − Aᵀ)/2. Transpose rules: (AB)ᵀ = BᵀAᵀ and (AB)⁻¹ = B⁻¹A⁻¹.

## Determinants

The **determinant** of a square matrix is a number that tells, among other things, whether the matrix is invertible. For 2 × 2: det [[a, b], [c, d]] = ad − bc. For larger matrices, expand along a row (cofactor expansion) or, more efficiently, reduce to triangular form:

det [[2, 1, 3], [0, 4, 5], [1, 0, 6]] = 2(4·6 − 5·0) − 1(0·6 − 5·1) + 3(0·0 − 4·1) = 48 + 5 − 12 = 41.

| Property | Effect |
| --- | --- |
| Swap two rows | Determinant changes **sign** |
| Multiply one row by k | Determinant multiplied by k |
| Add a multiple of one row to another | **No change** |
| Two equal (or proportional) rows, or a zero row | Determinant is 0 |
| Triangular matrix | Determinant = product of the diagonal |
| det(Aᵀ) | = det(A) |
| det(AB) | = det(A) · det(B) |
| det(kA) for n × n A | = **kⁿ** det(A) |
| det(A⁻¹) | = 1 / det(A) |

A matrix is **invertible (non-singular)** exactly when det(A) ≠ 0. The inverse is A⁻¹ = adj(A) / det(A), where adj(A) is the transpose of the matrix of cofactors. For 2 × 2: [[a, b], [c, d]]⁻¹ = (1/(ad − bc)) [[d, −b], [−c, a]].

## Rank

The **rank** of a matrix is the maximum number of linearly independent rows (equivalently, columns). Find it by row-reducing to echelon form and counting the non-zero rows. An n × n matrix has rank n exactly when it is invertible.

- rank(A) ≤ min(m, n), and rank(AB) ≤ min(rank A, rank B).
- If every row is a multiple of one row, the rank is 1.

Exact arithmetic with Python's `fractions` avoids rounding errors in row reduction:

```python
from fractions import Fraction

def determinant(M):
    M = [[Fraction(x) for x in row] for row in M]
    n, det = len(M), Fraction(1)
    for c in range(n):
        pivot = next((r for r in range(c, n) if M[r][c] != 0), None)
        if pivot is None:
            return Fraction(0)
        if pivot != c:
            M[c], M[pivot] = M[pivot], M[c]
            det = -det                                  # a swap flips the sign
        det *= M[c][c]
        for r in range(c + 1, n):
            factor = M[r][c] / M[c][c]
            M[r] = [a - factor * b for a, b in zip(M[r], M[c])]
    return det

def rank(M):
    M = [[Fraction(x) for x in row] for row in M]
    r = 0
    for c in range(len(M[0])):
        pivot = next((i for i in range(r, len(M)) if M[i][c] != 0), None)
        if pivot is None:
            continue
        M[r], M[pivot] = M[pivot], M[r]
        for i in range(len(M)):
            if i != r and M[i][c] != 0:
                f = M[i][c] / M[r][c]
                M[i] = [a - f * b for a, b in zip(M[i], M[r])]
        r += 1
    return r

print("det =", determinant([[2, 1, 3], [0, 4, 5], [1, 0, 6]]))
print("det of [[1,2,3],[4,5,6],[7,8,9]] =", determinant([[1, 2, 3], [4, 5, 6], [7, 8, 9]]))
print("rank of [[1,2,3],[2,4,6],[1,1,1]] =", rank([[1, 2, 3], [2, 4, 6], [1, 1, 1]]))
print("rank of [[1,2,3,4],[2,4,6,8],[3,6,9,12]] =", rank([[1, 2, 3, 4], [2, 4, 6, 8], [3, 6, 9, 12]]))
```
```output
det = 41
det of [[1,2,3],[4,5,6],[7,8,9]] = 0
rank of [[1,2,3],[2,4,6],[1,1,1]] = 2
rank of [[1,2,3,4],[2,4,6,8],[3,6,9,12]] = 1
```

The rows of [[1, 2, 3], [4, 5, 6], [7, 8, 9]] are dependent (row 1 + row 3 = 2 × row 2), so its determinant is 0.

## Practice questions

```quiz
q: What is the determinant of [[3, 1, 2], [0, 2, 1], [1, 0, 1]]?
answer: 3
verify: 3 * (2 * 1 - 1 * 0) - 1 * (0 * 1 - 1 * 1) + 2 * (0 * 0 - 2 * 1)
explain: Expanding along the first row: 3(2·1 − 1·0) − 1(0·1 − 1·1) + 2(0·0 − 2·1) = 6 + 1 − 4 = 3.
```

```quiz
q: A is a 3 × 3 matrix with det(A) = 5. What is det(2A)?
answer: 40
verify: 2 ** 3 * 5
explain: Multiplying an n × n matrix by k multiplies every one of its n rows by k, so det(kA) = kⁿ det(A) = 2³ × 5 = 40.
```

```quiz
q: What is the rank of [[1, 2, 1], [2, 4, 2], [3, 1, 4]]?
answer: 2
verify:
  from fractions import Fraction as F
  M = [[F(x) for x in r] for r in [[1, 2, 1], [2, 4, 2], [3, 1, 4]]]
  r = 0
  for c in range(3):
      p = next((i for i in range(r, 3) if M[i][c] != 0), None)
      if p is None: continue
      M[r], M[p] = M[p], M[r]
      for i in range(3):
          if i != r and M[i][c] != 0:
              f = M[i][c] / M[r][c]
              M[i] = [a - f * b for a, b in zip(M[i], M[r])]
      r += 1
  print(r)
explain: Row 2 is twice row 1, so at most 2 rows are independent; row 1 and row 3 are not multiples of each other, so the rank is 2.
```

```quiz
q: Which statements are **true** for n × n matrices? (Select all that apply.)
* det(AB) = det(A) det(B)
* A is invertible if and only if det(A) ≠ 0
- AB = BA for all A and B
* The diagonal entries of a skew-symmetric matrix are all 0
explain: The determinant is multiplicative, and a zero determinant means dependent rows. Matrix multiplication is not commutative in general. Aᵀ = −A forces aᵢᵢ = −aᵢᵢ, so aᵢᵢ = 0.
```
