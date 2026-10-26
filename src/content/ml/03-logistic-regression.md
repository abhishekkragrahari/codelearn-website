---
title: Logistic Regression
chapter: Supervised Learning
description: Logistic regression for binary classification, the sigmoid function, the decision boundary, log loss (cross-entropy), gradient descent, odds and log-odds, and softmax, with GATE DA practice questions.
---
Despite its name, **logistic regression** is a **classification** method. For a binary label y ∈ {0, 1} it models the **probability** that y = 1:

P(y = 1 | **x**) = σ(z), where z = w₀ + w₁x₁ + … + w<sub>d</sub>x<sub>d</sub> = **w**ᵀ**x**

and σ is the **sigmoid** (logistic) function

**σ(z) = 1 / (1 + e^(−z))**

## The sigmoid function

σ squashes any real number into the interval (0, 1):

| z | −4 | −2 | 0 | 2 | 4 |
| --- | --- | --- | --- | --- | --- |
| σ(z) | 0.018 | 0.119 | 0.5 | 0.881 | 0.982 |

Useful facts:

- σ(0) = 0.5, σ(−z) = 1 − σ(z).
- Its derivative has a neat form: **σ′(z) = σ(z)(1 − σ(z))**, largest (0.25) at z = 0.
- Inverting it gives the **log-odds** (logit): z = ln( p / (1 − p) ). So logistic regression is a **linear model for the log-odds**: increasing xⱼ by 1 adds wⱼ to the log-odds, which multiplies the **odds** p/(1 − p) by e^(wⱼ).

## Decision boundary

Predict class 1 when P(y = 1 | **x**) ≥ 0.5, that is, when σ(z) ≥ 0.5, which happens exactly when **z = wᵀx ≥ 0**. The decision boundary wᵀx = 0 is a **hyperplane** (a straight line in two dimensions), so logistic regression is a **linear classifier**. Using a threshold other than 0.5 moves the boundary parallel to itself.

**Example.** With w₀ = −6, w₁ = 2 for a single feature x (hours studied), P(pass) = σ(2x − 6). The boundary is 2x − 6 = 0, i.e. x = 3 hours. A student who studied 4 hours has z = 2 and P(pass) = σ(2) ≈ 0.881.

## Training: log loss (cross-entropy)

Squared error would make the loss non-convex for logistic regression. Instead, the weights **maximise the likelihood** of the training labels, which is the same as minimising the **log loss** (binary cross-entropy):

**L(w) = −Σᵢ [ yᵢ ln pᵢ + (1 − yᵢ) ln(1 − pᵢ) ]**, where pᵢ = σ(**w**ᵀ**x**ᵢ)

- If yᵢ = 1 the term is −ln pᵢ: small when pᵢ is close to 1, huge when pᵢ is close to 0.
- If yᵢ = 0 the term is −ln(1 − pᵢ).
- L is **convex** in **w**, so gradient descent finds the global minimum.

The gradient has the same shape as in linear regression:

**∇L = Σᵢ (pᵢ − yᵢ) xᵢ**, so the update is **w ← w − η Σᵢ (pᵢ − yᵢ) xᵢ**.

There is no closed-form solution like the normal equations, so an iterative method is always used. If the training data is **linearly separable**, the likelihood keeps increasing as ‖**w**‖ grows, so the weights go to infinity unless the model is regularised.

```python
import math

def sigmoid(z):
    return 1 / (1 + math.exp(-z))

# Hours studied -> passed (1) or failed (0)
hours = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0]
passed = [0, 0, 0, 0, 1, 0, 1, 1, 1, 1]

w0, w1, eta = 0.0, 0.0, 0.1
for step in range(20000):
    g0 = sum(sigmoid(w0 + w1 * x) - y for x, y in zip(hours, passed))
    g1 = sum((sigmoid(w0 + w1 * x) - y) * x for x, y in zip(hours, passed))
    w0, w1 = w0 - eta * g0, w1 - eta * g1

loss = -sum(y * math.log(sigmoid(w0 + w1 * x)) + (1 - y) * math.log(1 - sigmoid(w0 + w1 * x))
            for x, y in zip(hours, passed))
print(f"w0 = {w0:.3f}, w1 = {w1:.3f}, log loss = {loss:.3f}")
print(f"decision boundary at x = {-w0 / w1:.3f} hours")
for x in [1, 2.75, 4]:
    print(f"P(pass | {x} hours) = {sigmoid(w0 + w1 * x):.3f}")
print(f"each extra hour multiplies the odds of passing by {math.exp(w1):.2f}")
```
```output
w0 = -7.159, w1 = 2.603, log loss = 2.509
decision boundary at x = 2.750 hours
P(pass | 1 hours) = 0.010
P(pass | 2.75 hours) = 0.500
P(pass | 4 hours) = 0.963
each extra hour multiplies the odds of passing by 13.51
```

## More than two classes: softmax

For K classes, **multinomial logistic regression** (softmax regression) keeps one weight vector **w**ₖ per class and sets

P(y = k | **x**) = e^(zₖ) / Σⱼ e^(zⱼ), where zₖ = **w**ₖᵀ**x**.

The outputs are positive and sum to 1. With K = 2 it reduces to the sigmoid. Another approach is **one-vs-rest**: train K binary classifiers and pick the class whose classifier is most confident.

## Practice questions

```quiz
q: A logistic regression model has w₀ = −4 and w₁ = 0.5 for a single feature x. For which value of x is P(y = 1 | x) exactly 0.5?
answer: 8
verify: 4 / 0.5
explain: σ(z) = 0.5 exactly when z = 0: −4 + 0.5x = 0 gives x = 8. This is the decision boundary.
```

```quiz
q: For the same model (w₀ = −4, w₁ = 0.5), what is P(y = 1 | x = 10)? Give the answer to three decimal places.
answer: 0.731
verify: round(1 / (1 + __import__("math").exp(-(-4 + 0.5 * 10))), 3)
explain: z = −4 + 5 = 1, and σ(1) = 1 / (1 + e⁻¹) ≈ 1 / 1.3679 ≈ 0.731.
```

```quiz
q: A sample has true label y = 1 and the model predicts p = 0.8. What is its log loss −ln p? Give the answer to four decimal places.
answer: 0.2231
verify: round(-__import__("math").log(0.8), 4)
explain: For y = 1 the loss is −ln p = −ln 0.8 ≈ 0.2231. Had the model predicted p = 0.2 for this sample, the loss would be −ln 0.2 ≈ 1.609, much larger.
```

```quiz
q: In a logistic regression model, the weight of feature xⱼ is wⱼ = ln 3. If xⱼ increases by 1 (all other features fixed), the odds P(y = 1) / P(y = 0) are multiplied by:
answer: 3
verify: round(__import__("math").exp(__import__("math").log(3)), 9)
explain: The log-odds are linear in the features, so the log-odds increase by wⱼ = ln 3 and the odds are multiplied by e^(ln 3) = 3.
```

```quiz
q: What is the maximum value of the derivative σ′(z) of the sigmoid function?
answer: 0.25
verify: max(s * (1 - s) for s in [1 / (1 + __import__("math").exp(-z / 100)) for z in range(-500, 501)])
explain: σ′(z) = σ(z)(1 − σ(z)). A product p(1 − p) with p ∈ (0, 1) is largest at p = 0.5, giving 0.25. This happens at z = 0.
```

```quiz
q: Which statements about logistic regression are **true**? (Select all that apply.)
* Its decision boundary is a hyperplane in feature space
* The log loss it minimises is a convex function of the weights
- Its weights can be found in closed form, like the normal equations of linear regression
- It is a regression method, because it predicts a real number
explain: Class 1 is predicted when wᵀx ≥ 0, a linear boundary. The cross-entropy loss is convex, so there is one global minimum, but it has no closed-form solution and is found iteratively. Although it outputs a probability, it is used for classification.
```

```quiz
q: A softmax classifier has scores z = (2, 1, 0) for three classes. What is the probability of the first class? Give the answer to three decimal places.
answer: 0.665
verify:
  import math
  e = [math.exp(z) for z in (2, 1, 0)]
  print(round(e[0] / sum(e), 3))
explain: P = e² / (e² + e¹ + e⁰) = 7.389 / (7.389 + 2.718 + 1) = 7.389 / 11.107 ≈ 0.665.
```
