---
title: Linear Regression and Ridge Regression
chapter: Supervised Learning
description: Simple and multiple linear regression, least squares and the normal equations, R², gradient descent, and ridge regression (L2 regularization) with worked examples for GATE DA.
---
**Linear regression** predicts a real-valued label as a weighted sum of the features:

ŷ = w₀ + w₁x₁ + w₂x₂ + … + w<sub>d</sub>x<sub>d</sub>

w₀ is the **intercept** (bias) and w₁ … w<sub>d</sub> are the **weights** (slopes). Training chooses the weights that minimise the **sum of squared errors** (SSE), also called the residual sum of squares:

SSE = Σᵢ (yᵢ − ŷᵢ)²

This is the method of **least squares**.

## Simple linear regression (one feature)

With one feature, ŷ = w₀ + w₁x. Setting the partial derivatives of SSE to zero gives:

- **w₁ = S<sub>xy</sub> / S<sub>xx</sub>**, where S<sub>xy</sub> = Σ (xᵢ − x̄)(yᵢ − ȳ) and S<sub>xx</sub> = Σ (xᵢ − x̄)².
- **w₀ = ȳ − w₁ x̄**, so the fitted line always passes through the point (x̄, ȳ).

**Worked example.** Fit a line to the points (1, 2), (2, 4), (3, 5), (4, 4), (5, 5).

| x | y | x − x̄ | y − ȳ | (x − x̄)(y − ȳ) | (x − x̄)² |
| --- | --- | --- | --- | --- | --- |
| 1 | 2 | −2 | −2 | 4 | 4 |
| 2 | 4 | −1 | 0 | 0 | 1 |
| 3 | 5 | 0 | 1 | 0 | 0 |
| 4 | 4 | 1 | 0 | 0 | 1 |
| 5 | 5 | 2 | 1 | 2 | 4 |
| | | | **Sum** | **6** | **10** |

x̄ = 3 and ȳ = 4, so w₁ = 6 / 10 = 0.6 and w₀ = 4 − 0.6 × 3 = 2.2. The fitted line is **ŷ = 2.2 + 0.6x**.

## How good is the fit? R²

- SST = Σ (yᵢ − ȳ)² is the total variation of y around its mean.
- SSE = Σ (yᵢ − ŷᵢ)² is the variation the line does **not** explain.
- **R² = 1 − SSE / SST** is the fraction of the variation explained by the model. R² = 1 is a perfect fit; R² = 0 means the line is no better than predicting ȳ.

For the example, the predictions are 2.8, 3.4, 4.0, 4.6, 5.2, so SSE = 0.64 + 0.36 + 1 + 0.36 + 0.04 = 2.4, SST = 4 + 0 + 1 + 0 + 1 = 6 and R² = 1 − 2.4/6 = **0.6**. For simple linear regression, R² equals the square of the correlation coefficient r between x and y.

```python
xs = [1, 2, 3, 4, 5]
ys = [2, 4, 5, 4, 5]
n = len(xs)
mx, my = sum(xs) / n, sum(ys) / n
sxy = sum((x - mx) * (y - my) for x, y in zip(xs, ys))
sxx = sum((x - mx) ** 2 for x in xs)
syy = sum((y - my) ** 2 for y in ys)
w1 = sxy / sxx
w0 = my - w1 * mx
pred = [w0 + w1 * x for x in xs]
sse = sum((y - p) ** 2 for y, p in zip(ys, pred))
print(f"w1 = {w1:.2f}, w0 = {w0:.2f}")
print("predictions:", [round(p, 2) for p in pred])
print(f"SSE = {sse:.2f}, SST = {syy:.2f}, R^2 = {1 - sse / syy:.2f}")
print(f"r = {sxy / (sxx * syy) ** 0.5:.4f}, r^2 = {sxy ** 2 / (sxx * syy):.2f}")
print(f"prediction at x = 6: {w0 + w1 * 6:.2f}")
```
```output
w1 = 0.60, w0 = 2.20
predictions: [2.8, 3.4, 4.0, 4.6, 5.2]
SSE = 2.40, SST = 6.00, R^2 = 0.60
r = 0.7746, r^2 = 0.60
prediction at x = 6: 5.80
```

## Multiple linear regression and the normal equations

With d features, put each sample as a row of a matrix X with a leading column of 1s (for the intercept), and the labels in a vector **y**. The model is **ŷ** = X**w** and

SSE(**w**) = ‖**y** − X**w**‖².

Setting the gradient −2Xᵀ(**y** − X**w**) to zero gives the **normal equations**:

**XᵀX w = Xᵀy**, so **w = (XᵀX)⁻¹ Xᵀy** when XᵀX is invertible.

XᵀX is invertible exactly when the columns of X are linearly independent. If one feature is a copy (or a linear combination) of others, called **multicollinearity**, XᵀX is singular and the least-squares weights are not unique.

Geometrically, X**w** is the **projection** of **y** onto the column space of X, and the residual **y** − X**w** is orthogonal to every column of X. That is why the residuals of a model with an intercept always sum to zero.

```python
from fractions import Fraction as F

# Two features; the labels follow y = 1 + 2*x1 + 3*x2 exactly.
X = [[1, 0, 1], [1, 1, 0], [1, 1, 1], [1, 2, 1], [1, 0, 2]]
y = [1 + 2 * r[1] + 3 * r[2] for r in X]

def matmul(A, B):
    return [[sum(A[i][k] * B[k][j] for k in range(len(B))) for j in range(len(B[0]))] for i in range(len(A))]

def solve(A, b):
    # Gauss-Jordan elimination with exact fractions.
    n = len(A)
    M = [[F(v) for v in row] + [F(bv)] for row, bv in zip(A, b)]
    for c in range(n):
        p = next(r for r in range(c, n) if M[r][c] != 0)
        M[c], M[p] = M[p], M[c]
        M[c] = [v / M[c][c] for v in M[c]]
        for r in range(n):
            if r != c:
                M[r] = [a - M[r][c] * b for a, b in zip(M[r], M[c])]
    return [row[-1] for row in M]

Xt = [list(col) for col in zip(*X)]
XtX = matmul(Xt, X)
Xty = [sum(Xt[i][k] * y[k] for k in range(len(y))) for i in range(3)]
print("X^T X =", XtX)
print("X^T y =", Xty)
print("w =", [str(v) for v in solve(XtX, Xty)])
```
```output
X^T X = [[5, 4, 5], [4, 6, 3], [5, 3, 7]]
X^T y = [28, 25, 32]
w = ['1', '2', '3']
```

The normal equations recover the true weights (1, 2, 3) exactly because the labels have no noise.

## Gradient descent

For large data sets, inverting XᵀX (cost about d³) is replaced by **gradient descent**: start with any **w** and repeat

**w ← w − η ∇SSE(w)**, where ∇ of the mean squared error is −(2/n) Xᵀ(**y** − X**w**).

η is the **learning rate**. Too small and convergence is slow; too large and the updates overshoot and diverge. The squared-error loss of linear regression is **convex**, so gradient descent with a suitable η reaches the global minimum.

```python
xs = [1, 2, 3, 4, 5]
ys = [2, 4, 5, 4, 5]
n = len(xs)
w0, w1, eta = 0.0, 0.0, 0.05
for step in range(1, 2001):
    g0 = -2 / n * sum(y - (w0 + w1 * x) for x, y in zip(xs, ys))
    g1 = -2 / n * sum((y - (w0 + w1 * x)) * x for x, y in zip(xs, ys))
    w0, w1 = w0 - eta * g0, w1 - eta * g1
    if step in (1, 10, 100, 2000):
        print(f"step {step:4}: w0 = {w0:.4f}, w1 = {w1:.4f}")
```
```output
step    1: w0 = 0.4000, w1 = 1.3200
step   10: w0 = 0.6072, w1 = 1.0412
step  100: w0 = 1.8566, w1 = 0.6951
step 2000: w0 = 2.2000, w1 = 0.6000
```

## Ridge regression (L2 regularization)

When there are many features, or features are nearly collinear, least squares can give huge weights that fit noise. **Ridge regression** adds a penalty on the size of the weights:

minimise **Σ (yᵢ − ŷᵢ)² + λ Σⱼ wⱼ²**   (the intercept w₀ is usually not penalised)

- λ ≥ 0 is the **regularization strength**, a hyperparameter chosen by validation.
- λ = 0 gives ordinary least squares; as λ → ∞ the weights shrink towards 0 (but never become exactly 0).
- The solution is **w = (XᵀX + λI)⁻¹ Xᵀy**. Adding λI makes the matrix invertible for any λ > 0, so ridge regression always has a unique solution, even with collinear features.
- Larger λ means **higher bias, lower variance**.

For one feature with centred data, the ridge slope is **w₁ = S<sub>xy</sub> / (S<sub>xx</sub> + λ)**. In the worked example, λ = 2 gives w₁ = 6 / (10 + 2) = 0.5 instead of 0.6: the slope shrinks towards zero.

(**Lasso** uses the penalty λ Σ |wⱼ| instead, which can set weights exactly to zero. It is not in the GATE DA syllabus by name, but the contrast with ridge is a common question.)

```python
xs = [1, 2, 3, 4, 5]
ys = [2, 4, 5, 4, 5]
mx, my = sum(xs) / 5, sum(ys) / 5
sxy = sum((x - mx) * (y - my) for x, y in zip(xs, ys))
sxx = sum((x - mx) ** 2 for x in xs)
for lam in [0, 2, 10, 100]:
    w1 = sxy / (sxx + lam)
    print(f"lambda = {lam:3}: w1 = {w1:.4f}, w0 = {my - w1 * mx:.4f}")
```
```output
lambda =   0: w1 = 0.6000, w0 = 2.2000
lambda =   2: w1 = 0.5000, w0 = 2.5000
lambda =  10: w1 = 0.3000, w0 = 3.1000
lambda = 100: w1 = 0.0545, w0 = 3.8364
```

## Practice questions

```quiz
q: A simple linear regression is fitted to the points (1, 3), (2, 5), (3, 6), (4, 10). What is the slope w₁? Give the answer to one decimal place.
answer: 2.2
verify:
  xs, ys = [1, 2, 3, 4], [3, 5, 6, 10]
  mx, my = sum(xs) / 4, sum(ys) / 4
  print(round(sum((x - mx) * (y - my) for x, y in zip(xs, ys)) / sum((x - mx) ** 2 for x in xs), 1))
explain: x̄ = 2.5 and ȳ = 6. S<sub>xy</sub> = (−1.5)(−3) + (−0.5)(−1) + (0.5)(0) + (1.5)(4) = 4.5 + 0.5 + 0 + 6 = 11 and S<sub>xx</sub> = 2.25 + 0.25 + 0.25 + 2.25 = 5, so w₁ = 11 / 5 = 2.2.
```

```quiz
q: For the same points (1, 3), (2, 5), (3, 6), (4, 10), what is the intercept w₀?
answer: 0.5
verify: 6 - 2.2 * 2.5
explain: The line passes through (x̄, ȳ) = (2.5, 6), so w₀ = 6 − 2.2 × 2.5 = 6 − 5.5 = 0.5.
```

```quiz
q: A regression model has SSE = 12 and SST = 48 on its training data. What is R²?
answer: 0.75
verify: 1 - 12 / 48
explain: R² = 1 − SSE/SST = 1 − 12/48 = 0.75: the model explains 75% of the variation in y.
```

```quiz
q: With centred data, S<sub>xy</sub> = 20 and S<sub>xx</sub> = 8. What is the ridge regression slope for λ = 2?
answer: 2
verify: 20 / (8 + 2)
explain: The ridge slope is S<sub>xy</sub> / (S<sub>xx</sub> + λ) = 20 / 10 = 2. Ordinary least squares would give 20 / 8 = 2.5.
```

```quiz
q: Which statements about ridge regression are **true**? (Select all that apply.)
* Increasing λ shrinks the weights towards zero
* XᵀX + λI is invertible for every λ > 0
- Ridge regression sets some weights exactly to zero, performing feature selection
* Increasing λ increases bias and decreases variance
explain: The L2 penalty shrinks weights but does not make them exactly zero (the L1 penalty of lasso does). XᵀX is positive semidefinite, so adding λI with λ > 0 makes all eigenvalues positive and the matrix invertible. A stronger penalty means a simpler model: more bias, less variance.
```

```quiz
q: In a least-squares fit **with an intercept**, what is the sum of the residuals yᵢ − ŷᵢ?
answer: 0
verify:
  xs, ys = [1, 2, 3, 4, 5], [2, 4, 5, 4, 5]
  print(round(sum(y - (2.2 + 0.6 * x) for x, y in zip(xs, ys)), 9))
explain: The normal equation for the intercept is Σ (yᵢ − ŷᵢ) = 0, because the residual vector is orthogonal to the column of 1s. For the worked example: −0.8 + 0.6 + 1 − 0.6 − 0.2 = 0.
```

```quiz
q: Two features in a data set are exactly equal (x₂ = x₁ for every sample). What happens to ordinary least squares?
- It gives a unique solution with w₂ = 0
* XᵀX is singular, so the least-squares weights are not unique
- The SSE becomes zero
- Gradient descent diverges for every learning rate
explain: Equal columns make X rank-deficient, so XᵀX is singular. Any split of the weight between w₁ and w₂ with the same sum gives the same predictions. Ridge regression fixes this by adding λI.
```
