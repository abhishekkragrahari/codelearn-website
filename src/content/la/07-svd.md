---
title: Singular Value Decomposition (SVD)
chapter: Eigenvalues and Decompositions
description: The singular value decomposition A = UΣVᵀ, how it relates to the eigenvalues of AᵀA and AAᵀ, computing it by hand, rank and norms from singular values, low-rank approximation (Eckart-Young), the pseudo-inverse, and its use in PCA and least squares, for GATE DA.
---
Eigen-decomposition works only for square matrices, and only some of them. The **singular value decomposition** works for **every** matrix, of any shape:

**A = U Σ Vᵀ**

For an m × n matrix A of rank r:

- **U** is an m × m **orthogonal** matrix; its columns are the **left singular vectors**.
- **V** is an n × n **orthogonal** matrix; its columns are the **right singular vectors**.
- **Σ** is an m × n "diagonal" matrix whose diagonal entries σ₁ ≥ σ₂ ≥ … ≥ σᵣ > 0 are the **singular values**; all other entries are 0.

Geometrically, every linear map is a **rotation** (Vᵀ), followed by a **stretch** along the axes (Σ), followed by another **rotation** (U).

## Connection with eigenvalues

From A = UΣVᵀ:

- **AᵀA = V (ΣᵀΣ) Vᵀ**: the columns of V are eigenvectors of AᵀA, with eigenvalues σᵢ².
- **AAᵀ = U (ΣΣᵀ) Uᵀ**: the columns of U are eigenvectors of AAᵀ, with the same non-zero eigenvalues σᵢ².

So **the singular values are the square roots of the eigenvalues of AᵀA** (which are never negative, because AᵀA is positive semidefinite). And A**v**ᵢ = σᵢ**u**ᵢ: each right singular vector is mapped to a stretched left singular vector.

For a **symmetric positive semidefinite** matrix, the SVD and the eigen-decomposition coincide. For a general symmetric matrix, the singular values are the **absolute values** of the eigenvalues.

## Computing an SVD by hand

**Example.** A = [[3, 0], [4, 5]].

1. AᵀA = [[3, 4], [0, 5]] · [[3, 0], [4, 5]] = [[25, 20], [20, 25]].
2. Its eigenvalues: trace 50, determinant 625 − 400 = 225, so λ² − 50λ + 225 = 0 gives **λ = 45 and λ = 5**.
3. The singular values are **σ₁ = √45 = 3√5 ≈ 6.708** and **σ₂ = √5 ≈ 2.236**.
4. The eigenvectors of AᵀA give V: **v**₁ = (1, 1)/√2 for 45 and **v**₂ = (1, −1)/√2 for 5.
5. Then **u**ᵢ = A**v**ᵢ / σᵢ: **u**₁ = (3, 9)/(√2 · 3√5) = (1, 3)/√10 and **u**₂ = (3, −1)/(√2 · √5) = (3, −1)/√10.

Checks: σ₁σ₂ = √225 = 15 = |det A|, and σ₁² + σ₂² = 50 = the sum of the squares of all entries of A (9 + 0 + 16 + 25).

## What the singular values tell you

- **rank(A)** = the number of non-zero singular values.
- The **Frobenius norm** ‖A‖<sub>F</sub> = √(Σ aᵢⱼ²) = √(σ₁² + … + σᵣ²).
- The **spectral norm** ‖A‖₂ = max ‖A**x**‖ over unit vectors **x** = **σ₁**.
- For a square matrix, |det(A)| = σ₁σ₂⋯σₙ.
- The **condition number** σ₁/σₙ measures how sensitive A**x** = **b** is to errors; a huge value means A is nearly singular.

## Low-rank approximation

Writing the SVD as a sum of rank-1 pieces:

**A = σ₁u₁v₁ᵀ + σ₂u₂v₂ᵀ + … + σᵣuᵣvᵣᵀ**

Keeping only the first k terms gives Aₖ. The **Eckart-Young theorem**: Aₖ is the **best rank-k approximation** of A, in both the Frobenius and spectral norms, and the errors are

‖A − Aₖ‖₂ = σₖ₊₁ and ‖A − Aₖ‖<sub>F</sub> = √(σₖ₊₁² + … + σᵣ²).

This is the basis of image compression, recommender systems (latent factors), noise reduction, and **PCA**: the principal components of a centred data matrix X are its right singular vectors, and the variance along the i-th component is σᵢ²/(n − 1).

## The pseudo-inverse

The **Moore-Penrose pseudo-inverse** is A⁺ = V Σ⁺ Uᵀ, where Σ⁺ inverts each non-zero singular value and transposes the shape. For any **b**, **x** = A⁺**b** is the **least-squares solution of minimum norm** of A**x** ≈ **b**. When A has independent columns, A⁺ = (AᵀA)⁻¹Aᵀ, exactly the matrix in the normal equations of linear regression.

```python
import math

A = [[3, 0], [4, 5]]
AtA = [[sum(A[k][i] * A[k][j] for k in range(2)) for j in range(2)] for i in range(2)]
print("A^T A =", AtA)
tr, det = AtA[0][0] + AtA[1][1], AtA[0][0] * AtA[1][1] - AtA[0][1] * AtA[1][0]
l1 = (tr + math.sqrt(tr * tr - 4 * det)) / 2
l2 = (tr - math.sqrt(tr * tr - 4 * det)) / 2
s1, s2 = math.sqrt(l1), math.sqrt(l2)
print(f"eigenvalues of A^T A: {l1:g}, {l2:g}; singular values: {s1:.4f}, {s2:.4f}")

r = 1 / math.sqrt(2)
V = [[r, r], [r, -r]]                    # columns v1, v2
mul = lambda M, v: [sum(M[i][k] * v[k] for k in range(2)) for i in range(2)]
u1 = [x / s1 for x in mul(A, [V[0][0], V[1][0]])]
u2 = [x / s2 for x in mul(A, [V[0][1], V[1][1]])]
print(f"u1 = ({u1[0]:.4f}, {u1[1]:.4f}), u2 = ({u2[0]:.4f}, {u2[1]:.4f}), orthogonal: {abs(u1[0] * u2[0] + u1[1] * u2[1]) < 1e-12}")

# Rebuild A from the two rank-1 pieces, and the best rank-1 approximation
A1 = [[s1 * u1[i] * V[j][0] for j in range(2)] for i in range(2)]
A2 = [[A1[i][j] + s2 * u2[i] * V[j][1] for j in range(2)] for i in range(2)]
print("sigma1 u1 v1^T =", [[round(x, 4) + 0.0 for x in row] for row in A1])
print("sum of both pieces =", [[round(x, 4) + 0.0 for x in row] for row in A2])
err = math.sqrt(sum((A[i][j] - A1[i][j]) ** 2 for i in range(2) for j in range(2)))
print(f"Frobenius error of the rank-1 approximation = {err:.4f} = sigma2")
```
```output
A^T A = [[25, 20], [20, 25]]
eigenvalues of A^T A: 45, 5; singular values: 6.7082, 2.2361
u1 = (0.3162, 0.9487), u2 = (0.9487, -0.3162), orthogonal: True
sigma1 u1 v1^T = [[1.5, 1.5], [4.5, 4.5]]
sum of both pieces = [[3.0, 0.0], [4.0, 5.0]]
Frobenius error of the rank-1 approximation = 2.2361 = sigma2
```

## Practice questions

```quiz
q: The eigenvalues of AᵀA for a 3 × 2 matrix A are 16 and 9. What is the largest singular value of A?
answer: 4
verify: 16 ** 0.5
explain: Singular values are square roots of the eigenvalues of AᵀA: √16 = 4 and √9 = 3. The largest is 4.
```

```quiz
q: A matrix has singular values 10, 5, 2 and 0. What is its Frobenius norm? Give the answer to three decimal places.
answer: 11.358
verify: round((10 ** 2 + 5 ** 2 + 2 ** 2) ** 0.5, 3)
explain: ‖A‖<sub>F</sub> = √(100 + 25 + 4) = √129 ≈ 11.358.
```

```quiz
q: For the same matrix (singular values 10, 5, 2, 0), what is the Frobenius-norm error of the best rank-1 approximation? Give the answer to three decimal places.
answer: 5.385
verify: round((5 ** 2 + 2 ** 2) ** 0.5, 3)
explain: By Eckart-Young, the error is √(σ₂² + σ₃² + σ₄²) = √(25 + 4 + 0) = √29 ≈ 5.385.
```

```quiz
q: What are the singular values of the symmetric matrix [[1, 2], [2, 1]]?
- 3 and −1
* 3 and 1
- 9 and 1
- 1 and 1
explain: Its eigenvalues are 3 and −1. For a symmetric matrix, the singular values are the absolute values of the eigenvalues: 3 and 1. (AᵀA = A² has eigenvalues 9 and 1, whose square roots are 3 and 1.)
```

```quiz
q: What is the rank of a 5 × 4 matrix whose singular values are 7.2, 3.1, 0 and 0?
answer: 2
verify: sum(1 for s in [7.2, 3.1, 0, 0] if s > 0)
explain: The rank equals the number of non-zero singular values: 2.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* Every real matrix has a singular value decomposition
* Singular values are never negative
- The singular values of a square matrix are always its eigenvalues
* The largest singular value equals the spectral norm ‖A‖₂
explain: The SVD exists for every matrix. Singular values are square roots of eigenvalues of the positive semidefinite AᵀA. They equal the eigenvalues only for symmetric positive semidefinite matrices. σ₁ is the largest stretch of a unit vector.
```
