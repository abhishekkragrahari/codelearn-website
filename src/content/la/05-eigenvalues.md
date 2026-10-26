---
title: Eigenvalues, Eigenvectors and Diagonalization
chapter: Eigenvalues and Decompositions
description: Eigenvalues and eigenvectors, the characteristic polynomial, trace and determinant, eigenvalues of special and transformed matrices, algebraic and geometric multiplicity, diagonalization, the Cayley-Hamilton theorem and the power method, for GATE DA.
---
Most vectors change direction when a matrix multiplies them. An **eigenvector** is a special non-zero vector whose direction does not change: A only stretches it.

**A v = λ v**, with **v** ≠ **0**

The scalar λ is the corresponding **eigenvalue**. Eigenvectors are the natural axes of a matrix: PCA's principal components, the stationary distribution of a Markov chain and Google's PageRank are all eigenvectors.

## Finding eigenvalues

A**v** = λ**v** means (A − λI)**v** = **0** has a non-zero solution, which happens exactly when

**det(A − λI) = 0**, the **characteristic equation**.

det(A − λI) is a polynomial of degree n in λ (the **characteristic polynomial**), so an n × n matrix has n eigenvalues counted with multiplicity, possibly complex. For each λ, the eigenvectors are the non-zero solutions of (A − λI)**v** = **0**: the **eigenspace** of λ minus the zero vector.

**Example.** A = [[4, 1], [2, 3]].

det(A − λI) = (4 − λ)(3 − λ) − 2 = λ² − 7λ + 10 = (λ − 2)(λ − 5), so **λ = 2 and λ = 5**.

- λ = 5: (A − 5I)**v** = [[−1, 1], [2, −2]]**v** = **0** gives **v** = (1, 1).
- λ = 2: (A − 2I)**v** = [[2, 1], [2, 1]]**v** = **0** gives **v** = (1, −2).

For a 2 × 2 matrix the characteristic polynomial is always **λ² − tr(A) λ + det(A)**.

## Trace and determinant

- **Sum of the eigenvalues = trace(A)**
- **Product of the eigenvalues = det(A)**

So A is singular ⟺ 0 is an eigenvalue. In the example: 2 + 5 = 7 = 4 + 3, and 2 × 5 = 10 = 12 − 2.

## Eigenvalues of related matrices

If A has eigenvalue λ with eigenvector **v**:

| Matrix | Eigenvalue | Same eigenvector? |
| --- | --- | --- |
| kA | kλ | yes |
| A + cI | λ + c | yes |
| Aᵐ | λᵐ | yes |
| A⁻¹ (if it exists) | 1/λ | yes |
| p(A) for a polynomial p | p(λ) | yes |
| Aᵀ | λ | not in general |

More facts:

- The eigenvalues of a **triangular** (or diagonal) matrix are its **diagonal entries**.
- Real **symmetric** matrices have real eigenvalues and orthogonal eigenvectors. **Skew-symmetric** matrices have purely imaginary (or zero) eigenvalues. **Orthogonal** matrices have |λ| = 1. **Idempotent** matrices have λ ∈ {0, 1}.
- **Similar** matrices (B = P⁻¹AP) have the same eigenvalues, trace and determinant.
- AB and BA have the same non-zero eigenvalues.
- A rank-1 matrix **uv**ᵀ has one eigenvalue **v**ᵀ**u** (with eigenvector **u**) and n − 1 eigenvalues equal to 0.

## Multiplicity and diagonalization

- The **algebraic multiplicity** of λ is its multiplicity as a root of the characteristic polynomial.
- The **geometric multiplicity** is the dimension of its eigenspace, the number of independent eigenvectors: n − rank(A − λI).
- Always: **1 ≤ geometric ≤ algebraic**.

A is **diagonalizable** if A = PDP⁻¹, with D diagonal (the eigenvalues) and P invertible (the eigenvectors as columns). This happens exactly when A has **n independent eigenvectors**, i.e. geometric = algebraic multiplicity for every eigenvalue. In particular:

- n **distinct** eigenvalues ⇒ diagonalizable;
- every real **symmetric** matrix is diagonalizable, even with an orthogonal P: A = QΛQᵀ;
- [[1, 1], [0, 1]] is **not** diagonalizable: λ = 1 has algebraic multiplicity 2 but only one eigenvector, (1, 0).

Diagonalization makes powers easy: **Aᵏ = PDᵏP⁻¹**, and Dᵏ just raises each diagonal entry to the k-th power.

## The Cayley-Hamilton theorem

**Every square matrix satisfies its own characteristic equation.** For the example, A² − 7A + 10I = 0. This gives A² = 7A − 10I, and, multiplying by A⁻¹, **A⁻¹ = (7I − A)/10**, without any row reduction.

## The power method

For large matrices, eigenvalues are found numerically. The **power method** repeatedly multiplies a vector by A and normalises it. If A has a single eigenvalue of largest absolute value, the vector converges to its eigenvector, and the ratio of successive lengths converges to that eigenvalue. The speed depends on the ratio |λ₂/λ₁|.

```python
from fractions import Fraction as F
import math

A = [[4, 1], [2, 3]]
tr, det = A[0][0] + A[1][1], A[0][0] * A[1][1] - A[0][1] * A[1][0]
disc = math.sqrt(tr * tr - 4 * det)
print(f"characteristic polynomial: l^2 - {tr} l + {det}; eigenvalues {(tr - disc) / 2:g}, {(tr + disc) / 2:g}")

def mul(M, v):
    return [sum(M[i][k] * v[k] for k in range(len(v))) for i in range(len(M))]

for lam, v in [(5, [1, 1]), (2, [1, -2])]:
    print(f"A {v} = {mul(A, v)} = {lam} x {v}")

# Cayley-Hamilton: A^2 - 7A + 10I = 0, so A^-1 = (7I - A)/10
A2 = [[sum(A[i][k] * A[k][j] for k in range(2)) for j in range(2)] for i in range(2)]
print("A^2 - 7A + 10I =", [[A2[i][j] - 7 * A[i][j] + (10 if i == j else 0) for j in range(2)] for i in range(2)])
inv = [[F((7 if i == j else 0) - A[i][j], 10) for j in range(2)] for i in range(2)]
print("A^-1 =", [[str(x) for x in row] for row in inv])

# Power method
v = [1.0, 0.0]
for k in range(1, 26):
    w = mul(A, v)
    lam = math.hypot(*w) / math.hypot(*v)
    v = [x / math.hypot(*w) for x in w]
    if k in (1, 5, 25):
        print(f"power method step {k}: eigenvalue estimate {lam:.6f}, vector ({v[0]:.4f}, {v[1]:.4f})")
```
```output
characteristic polynomial: l^2 - 7 l + 10; eigenvalues 2, 5
A [1, 1] = [5, 5] = 5 x [1, 1]
A [1, -2] = [2, -4] = 2 x [1, -2]
A^2 - 7A + 10I = [[0, 0], [0, 0]]
A^-1 = [['3/10', '-1/10'], ['-1/5', '2/5']]
power method step 1: eigenvalue estimate 4.472136, vector (0.8944, 0.4472)
power method step 5: eigenvalue estimate 5.018536, vector (0.7125, 0.7016)
power method step 25: eigenvalue estimate 5.000000, vector (0.7071, 0.7071)
```

The power method converges to λ = 5 and to the unit vector (0.7071, 0.7071), which is the direction of (1, 1).

## Practice questions

```quiz
q: A 3 × 3 matrix has eigenvalues 1, 2 and 4. What is det(A²)?
answer: 64
verify: (1 * 2 * 4) ** 2
explain: det(A) = 1 × 2 × 4 = 8, and det(A²) = det(A)² = 64. Equivalently, A² has eigenvalues 1, 4 and 16, whose product is 64.
```

```quiz
q: A = [[2, 1], [1, 2]]. What is the largest eigenvalue of A² + 3A + I?
answer: 19
verify: max(l * l + 3 * l + 1 for l in (1, 3))
explain: A has trace 4 and determinant 3, so its eigenvalues are 1 and 3. p(A) = A² + 3A + I has eigenvalues p(1) = 5 and p(3) = 9 + 9 + 1 = 19. The largest is 19.
```

```quiz
q: The matrix [[3, 0, 0], [5, 3, 0], [1, 2, 3]] has the eigenvalue 3 with algebraic multiplicity 3. What is its geometric multiplicity?
answer: 1
verify:
  from fractions import Fraction as F
  M = [[F(x) for x in r] for r in [[0, 0, 0], [5, 0, 0], [1, 2, 0]]]
  r = 0
  for c in range(3):
      p = next((i for i in range(r, 3) if M[i][c] != 0), None)
      if p is None:
          continue
      M[r], M[p] = M[p], M[r]
      for i in range(3):
          if i != r and M[i][c] != 0:
              f = M[i][c] / M[r][c]
              M[i] = [a - f * b for a, b in zip(M[i], M[r])]
      r += 1
  print(3 - r)
explain: A − 3I = [[0, 0, 0], [5, 0, 0], [1, 2, 0]] has rank 2 (rows 2 and 3 are independent). The geometric multiplicity is 3 − 2 = 1, so the matrix is not diagonalizable.
```

```quiz
q: The matrix [[a, 1], [0, b]] has trace 7 and determinant 12, with a > b. What is a?
answer: 4
verify: next(a for a in range(0, 13) if a + (7 - a) == 7 and a * (7 - a) == 12 and a > 7 - a)
explain: The matrix is triangular, so its eigenvalues are a and b, with a + b = 7 and ab = 12. These are 4 and 3; since a > b, a = 4.
```

```quiz
q: Which statements are **true** for every n × n real matrix A? (Select all that apply.)
* A and Aᵀ have the same eigenvalues
* A is invertible if and only if 0 is not an eigenvalue
- A is diagonalizable
- The eigenvectors of A are orthogonal
explain: det(Aᵀ − λI) = det(A − λI). det(A) is the product of the eigenvalues. Not every matrix is diagonalizable ([[1, 1], [0, 1]]), and eigenvectors are guaranteed orthogonal only for symmetric matrices.
```

```quiz
q: Using the Cayley-Hamilton theorem for A = [[1, 2], [3, 4]], A² = pA + qI. What is p + q?
answer: 7
verify: (1 + 4) + -(1 * 4 - 2 * 3)
explain: The characteristic polynomial is λ² − tr(A)λ + det(A) = λ² − 5λ − 2. So A² − 5A − 2I = 0, i.e. A² = 5A + 2I: p = 5, q = 2, p + q = 7.
```
