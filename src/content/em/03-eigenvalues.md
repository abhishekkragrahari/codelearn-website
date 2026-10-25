---
title: Eigenvalues and Eigenvectors
chapter: Linear Algebra
description: The eigenvalue equation, the characteristic polynomial, finding eigenvectors, properties (trace, determinant, powers, inverses, triangular and symmetric matrices), the Cayley–Hamilton theorem and diagonalization.
---
For a square matrix A, a non-zero vector x is an **eigenvector** with **eigenvalue** λ if

**Ax = λx**

A only stretches x by the factor λ, without changing its direction. Eigenvalues appear in GATE every year, usually through their properties rather than long computations.

## Finding eigenvalues and eigenvectors

Ax = λx means (A − λI)x = 0, which has a non-zero solution only when A − λI is singular:

**det(A − λI) = 0**, the **characteristic equation**.

Example: A = [[4, 1], [2, 3]].

- det(A − λI) = (4 − λ)(3 − λ) − 2 = λ² − 7λ + 10 = (λ − 5)(λ − 2), so λ = 5 and λ = 2.
- For λ = 5: (A − 5I)x = 0 gives −x₁ + x₂ = 0, so x = (1, 1).
- For λ = 2: 2x₁ + x₂ = 0, so x = (1, −2).

Any non-zero multiple of an eigenvector is also an eigenvector. A program can compute the characteristic polynomial exactly (here with the Faddeev–LeVerrier recurrence) and find its integer roots:

```python
from fractions import Fraction

def characteristic_polynomial(A):
    """Coefficients of det(xI - A) = x^n + c1 x^(n-1) + ... + cn."""
    n = len(A)
    A = [[Fraction(v) for v in row] for row in A]
    mul = lambda X, Y: [[sum(X[i][k] * Y[k][j] for k in range(n)) for j in range(n)] for i in range(n)]
    M, coeffs = [[Fraction(0)] * n for _ in range(n)], [Fraction(1)]
    for k in range(1, n + 1):
        AM = mul(A, M)
        M = [[AM[i][j] + (coeffs[-1] if i == j else 0) for j in range(n)] for i in range(n)]
        coeffs.append(-sum(mul(A, M)[i][i] for i in range(n)) / k)
    return coeffs

def integer_roots(coeffs):
    n = len(coeffs) - 1
    return [r for r in range(-50, 51) if sum(c * r ** (n - i) for i, c in enumerate(coeffs)) == 0]

for A in ([[4, 1], [2, 3]], [[2, 0, 0], [1, 3, 0], [4, 5, 6]], [[2, 1, 1], [1, 2, 1], [1, 1, 2]]):
    c = characteristic_polynomial(A)
    print(A, "coefficients", [int(x) for x in c], "integer eigenvalues", integer_roots(c))
```
```output
[[4, 1], [2, 3]] coefficients [1, -7, 10] integer eigenvalues [2, 5]
[[2, 0, 0], [1, 3, 0], [4, 5, 6]] coefficients [1, -11, 36, -36] integer eigenvalues [2, 3, 6]
[[2, 1, 1], [1, 2, 1], [1, 1, 2]] coefficients [1, -6, 9, -4] integer eigenvalues [1, 4]
```

For [[2, 1, 1], [1, 2, 1], [1, 1, 2]] the polynomial is λ³ − 6λ² + 9λ − 4 = (λ − 1)²(λ − 4): the eigenvalue 1 is **repeated** (algebraic multiplicity 2).

## Properties

For an n × n matrix A with eigenvalues λ₁, …, λₙ (counted with multiplicity):

| Property | Statement |
| --- | --- |
| **Sum** | λ₁ + … + λₙ = **trace(A)** (sum of the diagonal) |
| **Product** | λ₁ · … · λₙ = **det(A)** |
| Singular matrix | A is singular ⇔ 0 is an eigenvalue |
| Powers | Aᵏ has eigenvalues λᵢᵏ (same eigenvectors) |
| Inverse | A⁻¹ has eigenvalues 1/λᵢ |
| Shift | A + cI has eigenvalues λᵢ + c; cA has cλᵢ |
| Transpose | Aᵀ has the same eigenvalues as A |
| **Triangular / diagonal** | The eigenvalues are the **diagonal entries** |
| **Real symmetric** | All eigenvalues are **real**; eigenvectors for different eigenvalues are orthogonal |
| Skew-symmetric (real) | Eigenvalues are 0 or purely imaginary |
| Orthogonal | Eigenvalues have absolute value 1 |

Check with the 3 × 3 example: trace = 2 + 2 + 2 = 6 = 1 + 1 + 4, and det = 4 = 1 × 1 × 4.

Eigenvectors belonging to **distinct** eigenvalues are linearly independent.

## Cayley–Hamilton theorem

> Every square matrix satisfies its own characteristic equation.

For A = [[4, 1], [2, 3]]: A² − 7A + 10I = 0. This gives A⁻¹ without row reduction: multiply by A⁻¹ to get A − 7I + 10A⁻¹ = 0, so A⁻¹ = (7I − A)/10. It also reduces high powers: A² = 7A − 10I, so A³ = 7A² − 10A = 39A − 70I.

## Diagonalization

A is **diagonalizable** if A = PDP⁻¹, with D diagonal (the eigenvalues) and P's columns the eigenvectors. This happens exactly when A has n linearly independent eigenvectors, which is guaranteed if all eigenvalues are distinct, or if A is real symmetric. Then Aᵏ = PDᵏP⁻¹, which makes powers easy to compute.

## Practice questions

```quiz
q: The eigenvalues of a 3 × 3 matrix are 2, −1 and 4. What is the determinant of A²?
answer: 64
verify: (2 * -1 * 4) ** 2
explain: det(A) is the product of the eigenvalues: 2 × (−1) × 4 = −8. A² has eigenvalues 4, 1 and 16, so det(A²) = det(A)² = 64.
```

```quiz
q: What is the largest eigenvalue of [[5, 4], [1, 2]]?
answer: 6
verify:
  import math
  a, b, c, d = 5, 4, 1, 2
  tr, det = a + d, a * d - b * c
  print(int((tr + math.isqrt(tr * tr - 4 * det)) // 2))
explain: λ² − 7λ + 6 = 0 (trace 7, determinant 10 − 4 = 6), so λ = 6 or 1.
```

```quiz
q: A 3 × 3 matrix has eigenvalues 1, 2 and 3. What is the trace of A⁻¹? Give the answer to two decimal places.
answer: 1.83
verify: round(1 / 1 + 1 / 2 + 1 / 3, 2)
explain: A⁻¹ has eigenvalues 1, 1/2 and 1/3, and the trace is their sum: 1 + 0.5 + 0.333… ≈ 1.83.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* The eigenvalues of a real symmetric matrix are real
* The eigenvalues of a triangular matrix are its diagonal entries
- A matrix with a repeated eigenvalue can never be diagonalized
* A matrix is singular if and only if 0 is one of its eigenvalues
explain: Symmetric real matrices have real eigenvalues; for triangular matrices det(A − λI) is the product of the diagonal terms (aᵢᵢ − λ). The identity matrix has the repeated eigenvalue 1 and is already diagonal. det(A) = product of eigenvalues, which is 0 exactly when some eigenvalue is 0.
```
