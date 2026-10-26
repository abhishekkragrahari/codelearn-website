---
title: Dimensionality Reduction and PCA
chapter: Unsupervised Learning
description: Why reduce dimensions, principal component analysis step by step, the covariance matrix, eigenvalues and explained variance, PCA through the SVD, and PCA versus LDA, with worked GATE DA examples.
---
Data sets often have many features, and many of them are correlated: height in centimetres and height in inches carry the same information. **Dimensionality reduction** replaces the d original features with k < d new ones that keep most of the information. It speeds up learning, reduces overfitting, removes noise, and makes it possible to plot high-dimensional data in two or three dimensions.

## Principal component analysis (PCA)

PCA finds new axes, the **principal components**, that are:

1. **directions of maximum variance**: the first principal component (PC1) is the direction along which the projected data has the largest variance; PC2 has the largest variance among directions orthogonal to PC1, and so on;
2. **orthogonal** to each other, so the new features are **uncorrelated**.

Equivalently, projecting onto the first k components gives the k-dimensional subspace with the **smallest reconstruction error** (the sum of squared distances from the points to the subspace).

## The algorithm

Given n samples with d features:

1. **Centre** the data: subtract the mean of each feature. (If the features have different units, also divide by their standard deviations, i.e. **standardise**, because PCA is not scale-invariant.)
2. Compute the d × d **covariance matrix** C = (1/(n − 1)) XᵀX, where X is the centred data matrix.
3. Find the **eigenvalues** λ₁ ≥ λ₂ ≥ … ≥ λ<sub>d</sub> ≥ 0 and unit **eigenvectors** v₁, …, v<sub>d</sub> of C. The eigenvectors are the principal components; λᵢ is the **variance of the data along vᵢ**.
4. Keep the top k eigenvectors as the columns of a matrix V<sub>k</sub> and project: Z = X V<sub>k</sub> (each sample becomes k numbers).

The **proportion of variance explained** by the first k components is

**(λ₁ + … + λₖ) / (λ₁ + … + λ<sub>d</sub>)**

and the denominator equals the **trace** of C, the total variance of the original features. A common rule keeps enough components to explain, say, 95% of the variance.

C is symmetric and positive semidefinite, so its eigenvalues are real and non-negative and its eigenvectors can be chosen orthonormal: that is why the components are orthogonal.

## Worked example

Five samples with two features: (2, 1), (3, 5), (4, 3), (5, 6), (6, 5).

- Means: x̄ = 4, ȳ = 4. Centred data: (−2, −3), (−1, 1), (0, −1), (1, 2), (2, 1).
- Σx² = 10, Σy² = 16, Σxy = 6 + (−1) + 0 + 2 + 2 = 9. With n − 1 = 4: **C = [[2.5, 2.25], [2.25, 4]]**.
- For a 2 × 2 symmetric matrix, the eigenvalues solve λ² − (trace)λ + det = 0: trace = 6.5, det = 10 − 5.0625 = 4.9375, so λ = (6.5 ± √(42.25 − 19.75))/2 = (6.5 ± √22.5)/2, giving **λ₁ ≈ 5.622** and **λ₂ ≈ 0.878**.
- PC1 explains 5.622 / 6.5 ≈ **86.5%** of the variance.

```python
import math

pts = [(2, 1), (3, 5), (4, 3), (5, 6), (6, 5)]
n = len(pts)
mx = sum(p[0] for p in pts) / n
my = sum(p[1] for p in pts) / n
X = [(x - mx, y - my) for x, y in pts]
cxx = sum(a * a for a, _ in X) / (n - 1)
cyy = sum(b * b for _, b in X) / (n - 1)
cxy = sum(a * b for a, b in X) / (n - 1)
print(f"covariance matrix = [[{cxx}, {cxy}], [{cxy}, {cyy}]]")

tr, det = cxx + cyy, cxx * cyy - cxy * cxy
l1 = (tr + math.sqrt(tr * tr - 4 * det)) / 2
l2 = (tr - math.sqrt(tr * tr - 4 * det)) / 2
print(f"eigenvalues: {l1:.4f}, {l2:.4f}; explained by PC1: {l1 / tr:.1%}")

# Eigenvector of [[a, b], [b, c]] for eigenvalue l: (b, l - a), normalised.
v = (cxy, l1 - cxx)
norm = math.hypot(*v)
v = (v[0] / norm, v[1] / norm)
print(f"PC1 direction = ({v[0]:.4f}, {v[1]:.4f})")
z = [a * v[0] + b * v[1] for a, b in X]
print("PC1 scores:", [round(s, 4) for s in z])
var_z = sum(s * s for s in z) / (n - 1)
print(f"variance of the PC1 scores = {var_z:.4f}")
```
```output
covariance matrix = [[2.5, 2.25], [2.25, 4.0]]
eigenvalues: 5.6217, 0.8783; explained by PC1: 86.5%
PC1 direction = (0.5847, 0.8112)
PC1 scores: [-3.6031, 0.2265, -0.8112, 2.2072, 1.9807]
variance of the PC1 scores = 5.6217
```

The variance of the projected scores equals λ₁, exactly as the theory says.

## PCA through the singular value decomposition

In practice PCA is computed with the **SVD** of the centred data matrix, X = U Σ Vᵀ, which avoids forming XᵀX (and its rounding errors):

- the columns of V are the principal components;
- the eigenvalues of the covariance matrix are λᵢ = σᵢ² / (n − 1), where σᵢ are the singular values;
- the projected data is X V = U Σ.

## PCA and LDA

| | PCA | LDA |
| --- | --- | --- |
| Uses labels? | No (unsupervised) | Yes (supervised) |
| Finds directions that | maximise total variance | best separate the classes |
| Maximum number of components | d | K − 1 for K classes |

PCA can throw away a low-variance direction that happens to be the one that separates the classes; LDA would keep it.

## Limitations

- PCA finds only **linear** structure. Kernel PCA and other methods handle curved structure.
- The components are combinations of all original features, so they can be hard to interpret.
- It is sensitive to the **scale** of the features and to outliers.

## Practice questions

```quiz
q: The covariance matrix of a two-feature data set is [[3, 1], [1, 3]]. What fraction of the total variance does the first principal component explain? Give the answer to three decimal places.
answer: 0.667
verify: round(4 / 6, 3)
explain: The eigenvalues of [[3, 1], [1, 3]] are 3 + 1 = 4 and 3 − 1 = 2. PC1 explains 4 / (4 + 2) ≈ 0.667 of the variance.
```

```quiz
q: The eigenvalues of the covariance matrix of a data set are 6, 3, 0.6, 0.3 and 0.1. What is the smallest number of principal components that explains at least 90% of the variance?
answer: 2
verify:
  ev = [6, 3, 0.6, 0.3, 0.1]
  total, s = sum(ev), 0
  for k, e in enumerate(ev, 1):
      s += e
      if s / total >= 0.9:
          print(k)
          break
explain: The total is 10. One component explains 6/10 = 60%; two explain 9/10 = 90%. So 2 components are enough.
```

```quiz
q: The covariance matrix of a data set is [[4, 2], [2, 1]]. What percentage of the variance does the first principal component explain?
answer: 100
verify: round(5 / 5 * 100)
explain: trace = 5 and det = 4 − 4 = 0, so the eigenvalues are 5 and 0. All the variance lies along PC1: the data lies on a line (the two features are perfectly correlated).
```

```quiz
q: The singular values of a centred data matrix with n = 11 samples are 10 and 4. What is the largest eigenvalue of the sample covariance matrix?
answer: 10
verify: 10 ** 2 / (11 - 1)
explain: λᵢ = σᵢ² / (n − 1) = 100 / 10 = 10.
```

```quiz
q: Which statements about PCA are **true**? (Select all that apply.)
* The principal components are orthogonal
* The projections onto different principal components are uncorrelated
- PCA uses the class labels to choose directions
- The results of PCA do not depend on the units of the features
explain: The components are orthonormal eigenvectors of a symmetric matrix, and the projected features have a diagonal covariance matrix. PCA is unsupervised. Changing units (for example, metres to millimetres) changes the variances and therefore the components, which is why features are often standardised first.
```
