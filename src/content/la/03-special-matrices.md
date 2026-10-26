---
title: Special Matrices - Symmetric, Orthogonal, Idempotent, Projection and Partitioned
chapter: Matrices
description: Determinants and their properties, symmetric and skew-symmetric matrices, orthogonal matrices, idempotent and projection matrices including the hat matrix of regression, and partitioned (block) matrices, for GATE DA.
---
Several kinds of matrices come up again and again in data science. Knowing their properties turns many GATE questions into one-line answers.

## Determinants: a quick reminder

For a square matrix A, det(A) is a number that is non-zero exactly when A is invertible.

- 2 × 2: det [[a, b], [c, d]] = ad − bc. Larger matrices: expand along a row or column (cofactor expansion), or reduce to triangular form.
- The determinant of a **triangular** matrix is the product of its diagonal entries.
- **det(AB) = det(A) det(B)**, det(Aᵀ) = det(A), det(A⁻¹) = 1/det(A), and **det(cA) = cⁿ det(A)** for an n × n matrix.
- Swapping two rows flips the sign; adding a multiple of one row to another changes nothing; a row of zeros or two equal rows give det = 0.
- det(A) = the product of the eigenvalues of A.

## Symmetric and skew-symmetric matrices

- A is **symmetric** if **Aᵀ = A**. Covariance matrices, AᵀA and the Hessians of smooth functions are symmetric.
- A is **skew-symmetric** if Aᵀ = −A; its diagonal is zero, and for odd n its determinant is 0.
- Every square matrix is uniquely the sum of a symmetric and a skew-symmetric matrix: A = (A + Aᵀ)/2 + (A − Aᵀ)/2.

The **spectral theorem**: a real symmetric matrix has **real eigenvalues**, and it has an **orthonormal basis of eigenvectors**. So it can be written A = QΛQᵀ with Q orthogonal and Λ diagonal. Eigenvectors for different eigenvalues are automatically orthogonal.

## Orthogonal matrices

A square matrix Q is **orthogonal** if **QᵀQ = QQᵀ = I**, i.e. **Q⁻¹ = Qᵀ**. Its columns (and rows) form an orthonormal set.

- Q preserves lengths and angles: ‖Q**x**‖ = ‖**x**‖ and (Q**x**) · (Q**y**) = **x** · **y**. Rotations and reflections are orthogonal.
- **det(Q) = ±1** (+1 for rotations, −1 for reflections).
- Every eigenvalue has |λ| = 1.
- Products and inverses of orthogonal matrices are orthogonal.

**Example.** The rotation by θ, R = [[cos θ, −sin θ], [sin θ, cos θ]], is orthogonal with det = cos²θ + sin²θ = 1.

## Idempotent matrices

A square matrix P is **idempotent** if **P² = P**: applying it twice is the same as applying it once.

- Its eigenvalues are only **0 and 1** (if P**v** = λ**v**, then λ**v** = P²**v** = λ²**v**, so λ² = λ).
- **rank(P) = trace(P)** (the number of eigenvalues equal to 1).
- I − P is also idempotent, and P(I − P) = 0.
- The only invertible idempotent matrix is I.

## Projection matrices

An **orthogonal projection** onto a subspace W maps each vector to its closest point in W. Its matrix P is **idempotent and symmetric** (P² = P = Pᵀ), and conversely every such matrix is an orthogonal projection.

- Onto the line through a vector **a**: **P = aaᵀ / (aᵀa)**, a rank-1 matrix.
- Onto the column space of a matrix A with independent columns: **P = A(AᵀA)⁻¹Aᵀ**.
- The residual **x** − P**x** = (I − P)**x** is orthogonal to W, and I − P projects onto the orthogonal complement of W.

In linear regression, P = X(XᵀX)⁻¹Xᵀ is called the **hat matrix**, because it puts the hat on y: **ŷ** = P**y**. Its trace equals the number of parameters fitted.

**Example.** Projection onto the line through **a** = (1, 1, 0):

P = (1/2) [[1, 1, 0], [1, 1, 0], [0, 0, 0]].

P(2, 4, 5) = (3, 3, 0): the closest point on the line. The residual (−1, 1, 5) is orthogonal to (1, 1, 0). P has trace 1, rank 1, and eigenvalues 1, 0, 0.

## Partitioned (block) matrices

A matrix can be split into blocks, and block matrices multiply like ordinary matrices as long as the block sizes match:

[[A, B], [C, D]] · [[E, F], [G, H]] = [[AE + BG, AF + BH], [CE + DG, CF + DH]]

Useful results:

- **Block diagonal**: det [[A, 0], [0, D]] = det(A) det(D), and the inverse is [[A⁻¹, 0], [0, D⁻¹]]. The eigenvalues are those of A together with those of D.
- **Block triangular**: det [[A, B], [0, D]] = det(A) det(D) as well.
- **Schur complement**: if A is invertible, det [[A, B], [C, D]] = det(A) · det(D − CA⁻¹B).

```python
from fractions import Fraction as F

def matmul(A, B):
    return [[sum(A[i][k] * B[k][j] for k in range(len(B))) for j in range(len(B[0]))] for i in range(len(A))]

def show(M):
    return [[str(x) for x in row] for row in M]

a = [1, 1, 0]
aa = sum(x * x for x in a)
P = [[F(a[i] * a[j], aa) for j in range(3)] for i in range(3)]
print("P =", show(P))
print("P^2 == P:", matmul(P, P) == P, " symmetric:", P == [list(r) for r in zip(*P)])
print("trace(P) =", sum(P[i][i] for i in range(3)))
x = [[2], [4], [5]]
Px = matmul(P, x)
res = [x[i][0] - Px[i][0] for i in range(3)]
print("P x =", [str(r[0]) for r in Px], " residual =", [str(v) for v in res],
      " residual . a =", sum(r * ai for r, ai in zip(res, a)))

# Hat matrix of a regression with an intercept and one feature
X = [[1, 1], [1, 2], [1, 3], [1, 4]]
Xt = [list(r) for r in zip(*X)]
XtX = matmul(Xt, X)
d = XtX[0][0] * XtX[1][1] - XtX[0][1] * XtX[1][0]
inv = [[F(XtX[1][1], d), F(-XtX[0][1], d)], [F(-XtX[1][0], d), F(XtX[0][0], d)]]
H = matmul(matmul(X, inv), Xt)
print("hat matrix trace =", sum(H[i][i] for i in range(4)), " H^2 == H:", matmul(H, H) == H)
```
```output
P = [['1/2', '1/2', '0'], ['1/2', '1/2', '0'], ['0', '0', '0']]
P^2 == P: True  symmetric: True
trace(P) = 1
P x = ['3', '3', '0']  residual = ['-1', '1', '5']  residual . a = 0
hat matrix trace = 2  H^2 == H: True
```

## Practice questions

```quiz
q: A is a 3 × 3 matrix with det(A) = 4. What is det(2A⁻¹)?
answer: 2
verify: 2 ** 3 / 4
explain: det(cB) = cⁿ det(B) and det(A⁻¹) = 1/det(A). So det(2A⁻¹) = 2³ × 1/4 = 8/4 = 2.
```

```quiz
q: P is a 5 × 5 idempotent matrix with trace 3. What is the rank of I − P?
answer: 2
verify: 5 - 3
explain: For an idempotent matrix, rank = trace, so rank(P) = 3. I − P is also idempotent with trace 5 − 3 = 2, so its rank is 2.
```

```quiz
q: What is the (1, 2) entry of the matrix that projects orthogonally onto the line through (1, 2, 2)? Give the answer to four decimal places.
answer: 0.2222
verify: round(1 * 2 / 9, 4)
explain: P = aaᵀ/(aᵀa) with aᵀa = 1 + 4 + 4 = 9. The (1, 2) entry is a₁a₂/9 = 2/9 ≈ 0.2222.
```

```quiz
q: Which of the following are possible values of the determinant of a real **orthogonal** matrix? (Select all that apply.)
* 1
* −1
- 0
- 2
explain: det(QᵀQ) = det(Q)² = det(I) = 1, so det(Q) = ±1. Rotations have +1 and reflections −1.
```

```quiz
q: A is 2 × 2 with det(A) = 3 and D is 3 × 3 with det(D) = −2. What is the determinant of the 5 × 5 block matrix [[A, B], [0, D]], where B is any 2 × 3 matrix?
answer: -6
verify: 3 * -2
explain: A block upper-triangular matrix has determinant det(A) det(D) = 3 × (−2) = −6, whatever B is.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* The eigenvalues of an idempotent matrix are 0 or 1
* An orthogonal projection matrix is symmetric and idempotent
- Every idempotent matrix is invertible
* A real symmetric matrix has real eigenvalues
explain: P² = P forces λ² = λ. Orthogonal projections are exactly the symmetric idempotent matrices. An idempotent matrix other than I has eigenvalue 0, so it is singular. The spectral theorem gives real eigenvalues for real symmetric matrices.
```
