---
title: Quadratic Forms and Definiteness
chapter: Matrices
description: Quadratic forms xᵀAx and their symmetric matrices, positive and negative definite, semidefinite and indefinite matrices, the eigenvalue test and Sylvester's criterion, and why definiteness matters for optimization and covariance matrices, for GATE DA.
---
A **quadratic form** in n variables is a polynomial in which every term has degree exactly 2:

q(**x**) = **x**ᵀA**x** = Σᵢ Σⱼ aᵢⱼ xᵢ xⱼ

For example, q(x, y) = 3x² + 4xy + 5y². Quadratic forms describe the shape of a function near a minimum, the variance of a linear combination of random variables, and the energy of a system.

## The symmetric matrix of a quadratic form

Any quadratic form can be written with a **symmetric** matrix A: the coefficient of xᵢ² goes on the diagonal, and the coefficient of xᵢxⱼ (i ≠ j) is **split in half** between positions (i, j) and (j, i).

- 3x² + 4xy + 5y² = [x y] [[3, 2], [2, 5]] [x y]ᵀ
- x² + 2y² − z² + 6xy − 4yz has matrix [[1, 3, 0], [3, 2, −2], [0, −2, −1]].

(A non-symmetric matrix B gives the same form as its symmetric part (B + Bᵀ)/2, so we always use the symmetric one.)

## Definiteness

A symmetric matrix A, and its quadratic form, is:

| Type | Condition for all **x** ≠ **0** | Eigenvalues |
| --- | --- | --- |
| **Positive definite** | **x**ᵀA**x** > 0 | all > 0 |
| **Positive semidefinite** | **x**ᵀA**x** ≥ 0 | all ≥ 0 |
| **Negative definite** | **x**ᵀA**x** < 0 | all < 0 |
| **Negative semidefinite** | **x**ᵀA**x** ≤ 0 | all ≤ 0 |
| **Indefinite** | takes both signs | some > 0 and some < 0 |

The eigenvalue test works because, with A = QΛQᵀ and **y** = Qᵀ**x**, the form becomes **x**ᵀA**x** = λ₁y₁² + … + λₙyₙ²: a weighted sum of squares, whose sign is decided by the λs. This is the **principal axes theorem**; the eigenvectors are the axes of the ellipse (or hyperbola) q(**x**) = 1.

Consequences:

- A positive definite matrix has det > 0 (the product of positive eigenvalues), trace > 0, and all **diagonal entries > 0** (take **x** = **e**ᵢ). A diagonal entry ≤ 0 immediately rules it out.
- A positive definite matrix is invertible, and its inverse is also positive definite.
- For **any** matrix B, BᵀB is positive semidefinite (**x**ᵀBᵀB**x** = ‖B**x**‖² ≥ 0), and positive definite when B has independent columns.
- Every **covariance matrix** is positive semidefinite, because Var(**w**ᵀ**X**) = **w**ᵀΣ**w** ≥ 0 for every **w**.

## Sylvester's criterion

The **leading principal minors** of A are the determinants D₁, D₂, …, Dₙ of its top-left 1 × 1, 2 × 2, …, n × n submatrices.

- A is **positive definite** ⟺ **D₁ > 0, D₂ > 0, …, Dₙ > 0**.
- A is **negative definite** ⟺ the minors **alternate in sign**, starting negative: D₁ < 0, D₂ > 0, D₃ < 0, …

For **semi**definiteness the leading minors are not enough (all principal minors must be checked), so the eigenvalue test is safer.

**Example.** A = [[2, −1, 0], [−1, 2, −1], [0, −1, 2]]. D₁ = 2, D₂ = 4 − 1 = 3, D₃ = det(A) = 2(4 − 1) + 1(−2 − 0) = 4. All are positive, so A is positive definite. (Its eigenvalues are 2 − √2, 2 and 2 + √2, all positive.)

**2 × 2 shortcut.** [[a, b], [b, c]] is positive definite ⟺ a > 0 and ac − b² > 0. So 3x² + 4xy + 5y² (a = 3, b = 2, c = 5, ac − b² = 11) is positive definite, but x² + 4xy + y² (ac − b² = 1 − 4 = −3) is indefinite: it is negative at (1, −1).

## Why definiteness matters

- **Optimization**: at a critical point of a smooth function, the **Hessian** matrix of second derivatives decides the type: positive definite ⇒ local minimum, negative definite ⇒ local maximum, indefinite ⇒ saddle point. A function whose Hessian is positive semidefinite everywhere is **convex**.
- **Least squares**: the loss ‖**y** − X**w**‖² has Hessian 2XᵀX, which is positive semidefinite, so linear regression is a convex problem. Ridge regression adds 2λI, making it positive definite and the minimum unique.
- **Machine learning**: a valid kernel matrix (the Gram matrix of an SVM kernel) must be positive semidefinite.

```python
import math

def det(M):
    if len(M) == 1:
        return M[0][0]
    return sum((-1) ** j * M[0][j] * det([row[:j] + row[j + 1:] for row in M[1:]]) for j in range(len(M)))

def classify(A):
    minors = [det([row[:k] for row in A[:k]]) for k in range(1, len(A) + 1)]
    if all(m > 0 for m in minors):
        kind = "positive definite"
    elif all((m < 0) if k % 2 == 0 else (m > 0) for k, m in enumerate(minors)):
        kind = "negative definite"
    else:
        kind = "not definite (check eigenvalues)"
    return minors, kind

for A in ([[2, -1, 0], [-1, 2, -1], [0, -1, 2]],
          [[-3, 1], [1, -2]],
          [[1, 2], [2, 1]]):
    minors, kind = classify(A)
    print(A, "leading minors", minors, "->", kind)

# Eigenvalues of the tridiagonal example: 2 - sqrt(2), 2, 2 + sqrt(2)
print("eigenvalues:", [round(2 - 2 * math.cos(k * math.pi / 4), 4) for k in (1, 2, 3)])
q = lambda x, y: x * x + 4 * x * y + y * y
print("x^2 + 4xy + y^2 at (1, 1) and (1, -1):", q(1, 1), q(1, -1))
```
```output
[[2, -1, 0], [-1, 2, -1], [0, -1, 2]] leading minors [2, 3, 4] -> positive definite
[[-3, 1], [1, -2]] leading minors [-3, 5] -> negative definite
[[1, 2], [2, 1]] leading minors [1, -3] -> not definite (check eigenvalues)
eigenvalues: [0.5858, 2.0, 3.4142]
x^2 + 4xy + y^2 at (1, 1) and (1, -1): 6 -2
```

## Practice questions

```quiz
q: The quadratic form 2x² + 6xy + 5y² is written as [x y] A [x y]ᵀ with A symmetric. What is the off-diagonal entry of A?
answer: 3
verify: 6 / 2
explain: The xy coefficient 6 is split equally between positions (1, 2) and (2, 1): each is 3. So A = [[2, 3], [3, 5]].
```

```quiz
q: For which values of k is [[4, k], [k, 1]] positive definite?
- k < 4
* −2 < k < 2
- k > 2
- All real k
explain: a = 4 > 0, and the determinant 4 − k² must be positive: k² < 4, i.e. −2 < k < 2.
```

```quiz
q: The symmetric matrix [[1, 2, 0], [2, 1, 0], [0, 0, 3]] is:
- Positive definite
- Negative definite
* Indefinite
- Positive semidefinite but not definite
explain: The block [[1, 2], [2, 1]] has eigenvalues 3 and −1, and the third eigenvalue is 3. With eigenvalues 3, 3 and −1 of both signs, the matrix is indefinite. Sylvester's test agrees: D₂ = 1 − 4 = −3 < 0.
```

```quiz
q: What is the third leading principal minor (the determinant) of [[2, 1, 0], [1, 2, 1], [0, 1, 2]]?
answer: 4
verify: 2 * (2 * 2 - 1 * 1) - 1 * (1 * 2 - 1 * 0) + 0
explain: Expanding along the first row: 2(4 − 1) − 1(2 − 0) + 0 = 6 − 2 = 4. Together with D₁ = 2 and D₂ = 3, all leading minors are positive, so the matrix is positive definite.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* BᵀB is positive semidefinite for every real matrix B
* A positive definite matrix has only positive diagonal entries
- A matrix with all entries positive is positive definite
* A covariance matrix is positive semidefinite
explain: xᵀBᵀBx = ‖Bx‖² ≥ 0. Taking x = eᵢ gives aᵢᵢ > 0. [[1, 2], [2, 1]] has positive entries but eigenvalue −1. wᵀΣw is the variance of wᵀX, which is never negative.
```
