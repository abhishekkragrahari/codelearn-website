---
title: Linear Discriminant Analysis and Support Vector Machines
chapter: Supervised Learning
description: Linear discriminant analysis (LDA) and Fisher's discriminant, the effect of class priors, support vector machines, margins and support vectors, hard and soft margins, hinge loss and the kernel trick, for GATE DA.
---
Both methods in this lesson draw a **linear decision boundary**, but they choose it in very different ways: **LDA** fits a probability model to each class, while an **SVM** looks only at the points closest to the boundary.

## Linear discriminant analysis (LDA)

LDA is a **generative** classifier. It assumes that the features of each class c follow a **multivariate normal distribution** with its own mean **μ**<sub>c</sub> but a **covariance matrix Σ shared by all classes**. It then classifies with Bayes' rule, picking the class with the largest P(c) · p(**x** | c).

Because the covariance is shared, the quadratic terms in x cancel when two classes are compared, and the boundary between them is **linear**. (If each class has its own covariance, the boundary is quadratic: that is **QDA**.)

### One feature, two classes

With one feature, class means μ₀ < μ₁ and common variance σ²:

- With **equal priors**, the boundary is the midpoint: **x = (μ₀ + μ₁) / 2**.
- With priors π₀ and π₁, the boundary moves away from the more likely class:

**x = (μ₀ + μ₁)/2 + σ² ln(π₀/π₁) / (μ₁ − μ₀)**

**Example.** Class 0 has mean 2, class 1 has mean 8, and σ² = 3.

- Equal priors: boundary at 5.
- π₀ = 0.75, π₁ = 0.25: boundary at 5 + 3 ln 3 / 6 ≈ 5 + 0.549 = 5.549. Class 0 is three times as common, so a point needs to be further towards class 1 before we call it class 1.

### Fisher's linear discriminant

Fisher looked at LDA from another angle: find the direction **w** such that, when the data is projected onto it, the class means are far apart **and** each class is tightly packed. He maximised

J(**w**) = (difference of projected means)² / (sum of projected within-class variances)

The answer is **w ∝ S<sub>W</sub>⁻¹ (μ₁ − μ₀)**, where S<sub>W</sub> is the **within-class scatter matrix** (the sum of each class's scatter around its own mean). This is the same direction as the LDA boundary normal. Projecting onto **w** also reduces the data to one dimension, so LDA is also used for **supervised dimensionality reduction** (at most K − 1 dimensions for K classes), in contrast to PCA, which ignores the labels.

```python
from fractions import Fraction as F

class0 = [(1, 2), (2, 3), (3, 3), (2, 1)]
class1 = [(6, 5), (7, 7), (8, 6), (7, 5)]

def mean(pts):
    return [F(sum(p[j] for p in pts), len(pts)) for j in range(2)]

def scatter(pts, m):
    S = [[F(0)] * 2 for _ in range(2)]
    for p in pts:
        d = [p[j] - m[j] for j in range(2)]
        for i in range(2):
            for j in range(2):
                S[i][j] += d[i] * d[j]
    return S

m0, m1 = mean(class0), mean(class1)
S0, S1 = scatter(class0, m0), scatter(class1, m1)
Sw = [[S0[i][j] + S1[i][j] for j in range(2)] for i in range(2)]
det = Sw[0][0] * Sw[1][1] - Sw[0][1] * Sw[1][0]
inv = [[Sw[1][1] / det, -Sw[0][1] / det], [-Sw[1][0] / det, Sw[0][0] / det]]
diff = [m1[j] - m0[j] for j in range(2)]
w = [inv[i][0] * diff[0] + inv[i][1] * diff[1] for i in range(2)]
print("means:", [str(v) for v in m0], [str(v) for v in m1])
print("S_W =", [[str(v) for v in row] for row in Sw])
print("w (Fisher direction) =", [str(v) for v in w])
proj = lambda p: float(w[0] * p[0] + w[1] * p[1])
print("projections, class 0:", [round(proj(p), 3) for p in class0])
print("projections, class 1:", [round(proj(p), 3) for p in class1])
```
```output
means: ['2', '9/4'] ['7', '23/4']
S_W = [['4', '2'], ['2', '11/2']]
w (Fisher direction) = ['41/36', '2/9']
projections, class 0: [1.583, 2.944, 4.083, 2.5]
projections, class 1: [7.944, 9.528, 10.444, 9.083]
```

On the Fisher direction, every class-0 point projects below every class-1 point, so a single threshold separates them.

## Support vector machines (SVM)

A linear classifier predicts sign(**w**ᵀ**x** + b). If the training data is **linearly separable**, many hyperplanes separate it. The SVM picks the one with the **largest margin**: the largest distance to the nearest training point.

- The distance from a point **x** to the hyperplane **w**ᵀ**x** + b = 0 is **|wᵀx + b| / ‖w‖**.
- Scale **w** and b so that the closest points satisfy yᵢ(**w**ᵀ**x**ᵢ + b) = 1. The margin (the width of the empty band between the classes) is then **2 / ‖w‖**.
- So maximising the margin is the same as **minimising ‖w‖²/2 subject to yᵢ(wᵀxᵢ + b) ≥ 1** for every i (labels yᵢ = ±1). This is a convex quadratic program: its solution is unique.

The training points that lie exactly on the margin, with yᵢ(**w**ᵀ**x**ᵢ + b) = 1, are the **support vectors**. The solution depends **only** on them: moving or deleting any other point (without crossing the margin) does not change the boundary.

```python
import math

pos = [(3, 3), (4, 3), (3, 4), (5, 5)]
neg = [(1, 1), (1, 2), (2, 1), (0, 0)]

def margin(w, b):
    # Smallest signed distance of any training point; negative means a point is misclassified.
    n = math.hypot(*w)
    return min([(w[0] * x + w[1] * y + b) / n for x, y in pos] +
               [-(w[0] * x + w[1] * y + b) / n for x, y in neg])

for w, b in [((1, 1), -4), ((1, 1), -4.5), ((1, 0), -2.5), ((0, 1), -2.5), ((1, 2), -6.5)]:
    print(f"w = {w}, b = {b}: smallest distance = {margin(w, b):.4f}")

# x1 + x2 = 4.5, scaled so that the closest points give +1 and -1.
w, b = (2 / 3, 2 / 3), -3
print("support vectors:", [p for p in pos + neg if abs(abs(w[0] * p[0] + w[1] * p[1] + b) - 1) < 1e-9])
print(f"margin width 2/||w|| = {2 / math.hypot(*w):.4f}")
```
```output
w = (1, 1), b = -4: smallest distance = 0.7071
w = (1, 1), b = -4.5: smallest distance = 1.0607
w = (1, 0), b = -2.5: smallest distance = 0.5000
w = (0, 1), b = -2.5: smallest distance = 0.5000
w = (1, 2), b = -6.5: smallest distance = 0.6708
support vectors: [(3, 3), (1, 2), (2, 1)]
margin width 2/||w|| = 2.1213
```

Of these candidates, x₁ + x₂ = 4.5 leaves the largest gap: it sits halfway between the closest positive point (3, 3), where x₁ + x₂ = 6, and the closest negative points (1, 2) and (2, 1), where x₁ + x₂ = 3. Scaled so that these points give exactly ±1, it is (2/3)x₁ + (2/3)x₂ − 3 = 0. Then ‖**w**‖ = 2√2/3 and the margin is 2/‖**w**‖ = 3/√2 ≈ 2.121. The support vectors are (3, 3), (1, 2) and (2, 1).

### Soft margin and hinge loss

Real data is rarely separable. The **soft-margin SVM** allows violations with **slack variables** ξᵢ ≥ 0:

minimise ‖**w**‖²/2 + **C** Σ ξᵢ subject to yᵢ(**w**ᵀ**x**ᵢ + b) ≥ 1 − ξᵢ

- **Large C**: violations are expensive, so the margin is narrow and the model fits the training data closely (low bias, high variance).
- **Small C**: a wider margin that tolerates some mistakes (higher bias, lower variance).

Equivalently, the SVM minimises the **hinge loss** max(0, 1 − yᵢ(**w**ᵀ**x**ᵢ + b)) plus an L2 penalty. A point correctly classified and outside the margin has zero hinge loss, which is why only the support vectors matter.

### The kernel trick

The SVM solution can be written using only **dot products** **x**ᵢᵀ**x**ⱼ between samples. Replacing each dot product with a **kernel** K(**x**ᵢ, **x**ⱼ) = φ(**x**ᵢ)ᵀφ(**x**ⱼ) trains a linear SVM in a higher-dimensional feature space φ(**x**) without ever computing φ. The boundary is linear in φ-space but non-linear in the original space. Common kernels:

- **Polynomial**: K(**a**, **b**) = (**a**ᵀ**b** + c)ᵖ
- **RBF (Gaussian)**: K(**a**, **b**) = exp(−γ‖**a** − **b**‖²), which corresponds to an infinite-dimensional φ.

For example, with **a** = (a₁, a₂), K(**a**, **b**) = (**a**ᵀ**b**)² equals φ(**a**)ᵀφ(**b**) for φ(**a**) = (a₁², √2·a₁a₂, a₂²).

## LDA versus SVM versus logistic regression

| | LDA | Logistic regression | SVM |
| --- | --- | --- | --- |
| Type | Generative | Discriminative | Discriminative (no probabilities) |
| Boundary | Linear | Linear | Linear (non-linear with kernels) |
| Uses | All points, via means and covariance | All points, weighted by error | Only the support vectors |
| Loss | Gaussian likelihood | Log loss | Hinge loss |

## Practice questions

```quiz
q: A one-feature LDA classifier has class means μ₀ = 10 and μ₁ = 16, a common variance σ² = 4, and equal priors. What is the decision boundary?
answer: 13
verify: (10 + 16) / 2
explain: With equal priors and a shared variance, the LDA boundary is the midpoint of the means: (10 + 16) / 2 = 13.
```

```quiz
q: For the same classifier (μ₀ = 10, μ₁ = 16, σ² = 4), the priors are now π₀ = 0.8 and π₁ = 0.2. Where is the decision boundary? Give the answer to two decimal places.
answer: 13.92
verify: round(13 + 4 * __import__("math").log(0.8 / 0.2) / 6, 2)
explain: x = 13 + σ² ln(π₀/π₁) / (μ₁ − μ₀) = 13 + 4 ln 4 / 6 ≈ 13 + 0.924 = 13.92. The boundary moves towards class 1 because class 0 is more likely.
```

```quiz
q: A trained linear SVM has **w** = (3, 4) and the support vectors satisfy yᵢ(**w**ᵀ**x**ᵢ + b) = 1. What is the width of the margin 2/‖**w**‖?
answer: 0.4
verify: 2 / (3 ** 2 + 4 ** 2) ** 0.5
explain: ‖**w**‖ = √(9 + 16) = 5, so the margin is 2 / 5 = 0.4.
```

```quiz
q: What is the distance from the point (4, 1) to the line 3x₁ − 4x₂ + 2 = 0?
answer: 2
verify: abs(3 * 4 - 4 * 1 + 2) / (3 ** 2 + 4 ** 2) ** 0.5
explain: |3 · 4 − 4 · 1 + 2| / √(3² + 4²) = |10| / 5 = 2.
```

```quiz
q: For the RBF kernel K(**a**, **b**) = exp(−γ‖**a** − **b**‖²) with γ = 0.5, what is K((1, 2), (2, 4))? Give the answer to four decimal places.
answer: 0.0821
verify: round(__import__("math").exp(-0.5 * ((1 - 2) ** 2 + (2 - 4) ** 2)), 4)
explain: ‖**a** − **b**‖² = 1² + 2² = 5, so K = e^(−0.5 × 5) = e^(−2.5) ≈ 0.0821.
```

```quiz
q: Which statements about SVMs are **true**? (Select all that apply.)
* Deleting a training point that is not a support vector does not change the maximum-margin hyperplane
* Increasing C in a soft-margin SVM tends to narrow the margin
- The hinge loss is positive for every training point
- An SVM with a kernel computes the feature map φ(x) explicitly for every sample
explain: Only the support vectors determine the solution. Larger C penalises violations more, so the optimiser accepts a narrower margin to fit the training points. A point classified correctly beyond the margin has hinge loss 0. The kernel trick computes K(a, b) directly and never builds φ(x).
```

```quiz
q: Which assumption makes the LDA decision boundary linear?
- Each feature is independent of the others within a class
* All classes share the same covariance matrix
- The classes have equal prior probabilities
- The features are scaled to unit variance
explain: With a shared covariance matrix, the quadratic terms xᵀΣ⁻¹x are identical for every class and cancel, leaving a linear boundary. Different covariances give QDA's quadratic boundary. Priors only shift the boundary.
```
