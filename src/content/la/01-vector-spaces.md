---
title: Vector Spaces, Subspaces and Linear Independence
chapter: Vector Spaces
description: Vectors and vector spaces, subspaces and how to test them, linear combinations and span, linear independence, basis and dimension, and the dot product, norms and orthogonality, for GATE DA.
---
Linear algebra is the mathematics of machine learning: a data set is a matrix, a sample is a vector, and methods such as regression and PCA are statements about vector spaces. This lesson sets up the vocabulary.

## Vectors and vector spaces

A vector in ℝⁿ is an ordered list of n real numbers, **v** = (v₁, …, vₙ). Vectors are added component by component and multiplied by scalars (real numbers):

(1, 2, 3) + (4, 0, −1) = (5, 2, 2), and 3 · (1, 2, 3) = (3, 6, 9).

A **vector space** is any set V with an addition and a scalar multiplication that obey the familiar rules: addition is commutative and associative, there is a zero vector **0**, every vector has a negative, and scalar multiplication distributes over addition. Besides ℝⁿ, examples include all m × n matrices, all polynomials of degree at most k, and all continuous functions on [0, 1].

## Subspaces

A **subspace** of V is a subset W that is itself a vector space under the same operations. To check, it is enough that:

1. **0 ∈ W**;
2. W is **closed under addition**: **u**, **v** ∈ W ⇒ **u** + **v** ∈ W;
3. W is **closed under scalar multiplication**: **v** ∈ W ⇒ c**v** ∈ W for every scalar c.

Examples in ℝ³:

- The plane x + y + z = 0 is a subspace (it contains **0**, and sums and multiples of solutions are solutions).
- The plane x + y + z = 1 is **not**: it does not contain **0**.
- The set {(x, y, z) : x ≥ 0} is not: multiplying by −1 leaves it.
- The set {(x, y, z) : xy = 0} (the union of two planes) is not: (1, 0, 0) + (0, 1, 0) = (1, 1, 0) has xy = 1.

The subspaces of ℝ³ are exactly: {**0**}, lines through the origin, planes through the origin, and ℝ³ itself. The intersection of two subspaces is always a subspace; their union usually is not.

The solution set of a **homogeneous** system A**x** = **0** is always a subspace, the **null space** of A. The solution set of A**x** = **b** with **b** ≠ **0** never is.

## Linear combinations and span

A **linear combination** of **v**₁, …, **v**ₖ is any vector c₁**v**₁ + … + cₖ**v**ₖ. The **span** of the vectors is the set of all their linear combinations; it is always a subspace, the smallest one containing them.

- span{(1, 0), (0, 1)} = ℝ².
- span{(1, 2), (2, 4)} is just the line through (1, 2), because (2, 4) = 2(1, 2).

## Linear independence

Vectors **v**₁, …, **v**ₖ are **linearly independent** if the only solution of

c₁**v**₁ + c₂**v**₂ + … + cₖ**v**ₖ = **0**

is c₁ = c₂ = … = cₖ = 0. Otherwise they are **linearly dependent**: at least one of them is a linear combination of the others, and adds nothing to the span.

Practical tests:

- Put the vectors as the columns of a matrix A. They are independent exactly when **rank(A) = k**.
- For n vectors in ℝⁿ (a square matrix): independent ⟺ **det(A) ≠ 0**.
- Any set containing **0** is dependent. Any set of **more than n** vectors in ℝⁿ is dependent.

**Example.** **v**₁ = (1, 2, 3), **v**₂ = (2, 4, 7), **v**₃ = (3, 6, 10). Here **v**₃ = **v**₁ + **v**₂, so the vectors are dependent, and det[**v**₁ **v**₂ **v**₃] = 0. The span is a plane.

## Basis and dimension

A **basis** of a vector space V is a set of vectors that is **linearly independent** and **spans V**. Every vector of V can then be written as a linear combination of the basis vectors in **exactly one** way; the coefficients are its **coordinates**.

All bases of V have the same number of vectors, the **dimension** dim V.

- dim ℝⁿ = n, with the **standard basis** **e**₁ = (1, 0, …, 0), …, **e**ₙ = (0, …, 0, 1).
- The space of polynomials of degree ≤ k has dimension k + 1 (basis 1, x, …, xᵏ).
- The space of m × n matrices has dimension mn.
- The plane x + y + z = 0 in ℝ³ has dimension 2: one basis is (1, −1, 0), (1, 0, −1).

In an n-dimensional space, any n independent vectors form a basis, and so do any n vectors that span it.

**Dimension of a sum.** For subspaces U and W: dim(U + W) = dim U + dim W − dim(U ∩ W).

## Dot product, norm and orthogonality

- **Dot product**: **u** · **v** = **u**ᵀ**v** = Σ uᵢvᵢ.
- **Norm** (length): ‖**v**‖ = √(**v** · **v**). A **unit vector** has norm 1; **v**/‖**v**‖ is the unit vector in the direction of **v**.
- The angle θ between **u** and **v** satisfies cos θ = (**u** · **v**) / (‖**u**‖ ‖**v**‖).
- **u** and **v** are **orthogonal** if **u** · **v** = 0. Non-zero mutually orthogonal vectors are always linearly independent.
- **Cauchy-Schwarz**: |**u** · **v**| ≤ ‖**u**‖ ‖**v**‖. **Triangle inequality**: ‖**u** + **v**‖ ≤ ‖**u**‖ + ‖**v**‖.
- The **projection** of **v** onto the direction of **u** is ((**u** · **v**)/(**u** · **u**)) **u**.

```python
from fractions import Fraction as F

def rank(rows):
    M = [[F(x) for x in r] for r in rows]
    r = 0
    for c in range(len(M[0])):
        p = next((i for i in range(r, len(M)) if M[i][c] != 0), None)
        if p is None:
            continue
        M[r], M[p] = M[p], M[r]
        for i in range(len(M)):
            if i != r and M[i][c] != 0:
                f = M[i][c] / M[r][c]
                M[i] = [a - f * b for a, b in zip(M[i], M[r])]
        r += 1
    return r

def det3(m):
    return (m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1])
            - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0])
            + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]))

v1, v2, v3 = (1, 2, 3), (2, 4, 7), (3, 6, 10)
cols = [list(r) for r in zip(v1, v2, v3)]
print("rank of [v1 v2 v3] =", rank(cols), " det =", det3(cols))
print("v1 + v2 == v3:", tuple(a + b for a, b in zip(v1, v2)) == v3)

w1, w2, w3 = (1, 0, 1), (0, 1, 1), (1, 1, 0)
cols = [list(r) for r in zip(w1, w2, w3)]
print("rank of [w1 w2 w3] =", rank(cols), " det =", det3(cols), "-> a basis of R^3")

u, v = (3, 4), (4, -3)
dot = sum(a * b for a, b in zip(u, v))
print("u . v =", dot, "-> orthogonal" if dot == 0 else "")
a, b = (1, 1, 0), (2, 3, 4)
coef = F(sum(x * y for x, y in zip(a, b)), sum(x * x for x in a))
print("projection of (2, 3, 4) onto (1, 1, 0):", [str(coef * x) for x in a])
```
```output
rank of [v1 v2 v3] = 2  det = 0
v1 + v2 == v3: True
rank of [w1 w2 w3] = 3  det = -2 -> a basis of R^3
u . v = 0 -> orthogonal
projection of (2, 3, 4) onto (1, 1, 0): ['5/2', '5/2', '0']
```

## Practice questions

```quiz
q: Which of the following subsets of ℝ³ is a **subspace**?
- {(x, y, z) : x + y + z = 1}
* {(x, y, z) : x = 2y and z = 0}
- {(x, y, z) : x ≥ 0, y ≥ 0, z ≥ 0}
- {(x, y, z) : x² = y²}
explain: {x = 2y, z = 0} is a line through the origin: it contains 0 and is closed under addition and scaling. The first does not contain 0. The positive octant is not closed under multiplication by −1. x² = y² is the union of the planes x = y and x = −y, which is not closed under addition: (1, 1, 0) + (1, −1, 0) = (2, 0, 0).
```

```quiz
q: For which value of k are the vectors (1, 2, 1), (2, k, 0) and (0, 1, 1) linearly **dependent**?
answer: 2
verify: next(k for k in range(-20, 21) if 1 * (k * 1 - 0 * 1) - 2 * (2 * 1 - 0 * 0) + 1 * (2 * 1 - k * 0) == 0)
explain: Put the vectors as rows. The determinant, expanding along the first row, is 1(k · 1 − 0 · 1) − 2(2 · 1 − 0 · 0) + 1(2 · 1 − k · 0) = k − 4 + 2 = k − 2, which is 0 when k = 2. Check: with k = 2, (2, 2, 0) = 2(1, 2, 1) − 2(0, 1, 1).
```

```quiz
q: What is the dimension of the subspace of ℝ⁴ consisting of all vectors (x₁, x₂, x₃, x₄) with x₁ + x₂ + x₃ + x₄ = 0?
answer: 3
verify: 4 - 1
explain: One linear equation on 4 variables leaves 3 free variables, so the dimension is 4 − 1 = 3. A basis is (1, −1, 0, 0), (1, 0, −1, 0), (1, 0, 0, −1).
```

```quiz
q: What is the dimension of the vector space of all 3 × 3 **symmetric** matrices?
answer: 6
verify: 3 * (3 + 1) // 2
explain: A symmetric matrix is determined by its diagonal (3 entries) and the entries above it (3 entries): 3 + 3 = 6 free entries. In general n(n + 1)/2.
```

```quiz
q: What is the cosine of the angle between (1, 2, 2) and (2, 0, 1)? Give the answer to four decimal places.
answer: 0.5963
verify: round((1 * 2 + 2 * 0 + 2 * 1) / (3 * 5 ** 0.5), 4)
explain: The dot product is 2 + 0 + 2 = 4. The norms are √9 = 3 and √5. cos θ = 4/(3√5) ≈ 0.5963.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* Any 4 vectors in ℝ³ are linearly dependent
* The null space of any matrix is a subspace
- The union of two subspaces is always a subspace
* Non-zero mutually orthogonal vectors are linearly independent
explain: ℝ³ has dimension 3, so at most 3 vectors can be independent. Ax = 0 is closed under addition and scaling. The union of two different lines through the origin is not closed under addition. If Σ cᵢvᵢ = 0, dotting with vⱼ gives cⱼ‖vⱼ‖² = 0, so cⱼ = 0.
```
