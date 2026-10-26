---
title: Machine Learning GATE Practice Set
chapter: GATE Practice
description: Mixed GATE DA style questions on regression, classification, k-NN, naive Bayes, SVM, decision trees, evaluation, neural networks, clustering and PCA, with answers and explanations.
---
These questions mix every topic in this track, in the three GATE formats: **MCQ** (one correct option), **MSQ** (one or more correct options) and **NAT** (type a number). Each answer is recomputed by a program when the site is built. Try each question before opening the explanation.

## Regression

```quiz
q: **[Linear regression]** A least-squares line ŷ = w₀ + w₁x is fitted to data with x̄ = 5, ȳ = 20, S<sub>xy</sub> = 60 and S<sub>xx</sub> = 15. What is the predicted value at x = 8?
answer: 32
verify:
  w1 = 60 / 15
  w0 = 20 - w1 * 5
  print(w0 + w1 * 8)
explain: w₁ = 60/15 = 4 and w₀ = 20 − 4 × 5 = 0, so ŷ(8) = 0 + 4 × 8 = 32.
```

```quiz
q: **[Ridge regression]** For one centred feature with S<sub>xy</sub> = 30 and S<sub>xx</sub> = 10, which value of λ makes the ridge slope exactly half of the least-squares slope?
answer: 10
verify: next(l for l in range(0, 101) if 30 / (10 + l) == 0.5 * 30 / 10)
explain: The least-squares slope is 30/10 = 3. Ridge gives 30/(10 + λ) = 1.5 when 10 + λ = 20, so λ = 10.
```

```quiz
q: **[R²]** For a simple linear regression, the correlation between x and y is r = −0.8. What is R²?
answer: 0.64
verify: round((-0.8) ** 2, 4)
explain: For simple linear regression, R² = r² = 0.64. The sign of r only gives the direction of the slope.
```

## Classification

```quiz
q: **[Logistic regression]** A logistic regression model gives log-odds z = −2 + 0.5x₁ + x₂. What is P(y = 1) for x₁ = 2, x₂ = 1? Give the answer to three decimal places.
answer: 0.5
verify: round(1 / (1 + __import__("math").exp(-(-2 + 0.5 * 2 + 1))), 3)
explain: z = −2 + 1 + 1 = 0, and σ(0) = 0.5. The point lies on the decision boundary.
```

```quiz
q: **[k-NN]** Training points: (0, 0) class P, (1, 0) class P, (0, 1) class Q, (2, 1) class Q, (3, 1) class Q. Using 3-NN with Manhattan distance, what is the predicted class for (1, 1)?
- P
* Q
- A tie between P and Q
- It cannot be decided without Euclidean distance
verify:
  from collections import Counter
  t = [((0, 0), "P"), ((1, 0), "P"), ((0, 1), "Q"), ((2, 1), "Q"), ((3, 1), "Q")]
  d = lambda p: abs(p[0] - 1) + abs(p[1] - 1)
  n = sorted(t, key=lambda s: d(s[0]))[:3]
  print(Counter(c for _, c in n).most_common(1)[0][0])
explain: Manhattan distances from (1, 1): (0, 0) → 2, (1, 0) → 1, (0, 1) → 1, (2, 1) → 1, (3, 1) → 2. The three nearest are (1, 0) P, (0, 1) Q and (2, 1) Q, all at distance 1, so the vote is 2 Q to 1 P and the prediction is Q.
```

```quiz
q: **[Naive Bayes]** In a spam filter, P(spam) = 0.4. The word "offer" appears in 50% of spam and 5% of non-spam emails, and the word "meeting" appears in 10% of spam and 40% of non-spam emails. Assuming the words are conditionally independent given the class, what is P(spam | both words appear)? Give the answer to three decimal places.
answer: 0.625
verify:
  s = 0.4 * 0.5 * 0.1
  h = 0.6 * 0.05 * 0.4
  print(f"{s / (s + h):.3f}")
explain: Spam score = 0.4 × 0.5 × 0.1 = 0.02. Non-spam score = 0.6 × 0.05 × 0.4 = 0.012. P(spam | words) = 0.02 / (0.02 + 0.012) = 0.02 / 0.032 = 0.625.
```

```quiz
q: **[SVM]** The maximum-margin hyperplane of a linear SVM is 2x₁ + x₂ − 4 = 0, scaled so that support vectors satisfy |2x₁ + x₂ − 4| = 1. Which of these training points can be a support vector?
- (2, 2)
* (1, 1)
- (0, 0)
- (3, 0)
verify:
  pts = [(2, 2), (1, 1), (0, 0), (3, 0)]
  print(next(f"({a}, {b})" for a, b in pts if abs(2 * a + b - 4) == 1))
explain: The values of 2x₁ + x₂ − 4 are 2, −1, −4 and 2. Only (1, 1) gives ±1, so only it lies on the margin.
```

## Trees and evaluation

```quiz
q: **[Decision trees]** A node with 8 positive and 8 negative samples is split into a left child with 6 positive and 2 negative and a right child with 2 positive and 6 negative. What is the decrease in Gini impurity?
answer: 0.125
verify:
  g = lambda p, n: 1 - (p / (p + n)) ** 2 - (n / (p + n)) ** 2
  print(round(g(8, 8) - 0.5 * g(6, 2) - 0.5 * g(2, 6), 4))
explain: Gini(root) = 0.5. Each child has proportions 0.75 and 0.25, so Gini = 1 − 0.5625 − 0.0625 = 0.375. Weighted child Gini = 0.375, so the decrease is 0.5 − 0.375 = 0.125.
```

```quiz
q: **[Evaluation]** A test for a condition has recall 0.9 and the classifier made 45 true positives and 15 false positives. How many false negatives did it make?
answer: 5
verify: round(45 / 0.9 - 45)
explain: Recall = TP / (TP + FN) = 0.9, so TP + FN = 45 / 0.9 = 50, and FN = 5. The false positives do not affect recall.
```

```quiz
q: **[Bias and variance]** Which of the following typically **increase bias**? (Select all that apply.)
* Reducing the maximum depth of a decision tree
* Increasing k in k-NN
- Adding polynomial features of higher degree to a linear model
* Decreasing C in a soft-margin SVM
explain: A shallower tree, more neighbours and a smaller C all make the model simpler or smoother, which raises bias. Adding higher-degree features makes the model more flexible, lowering bias and raising variance.
```

## Neural networks and unsupervised learning

```quiz
q: **[Neural networks]** A network has 784 inputs, one hidden layer of 128 neurons and 10 outputs, fully connected with biases. How many parameters does it have?
answer: 101770
verify: (784 * 128 + 128) + (128 * 10 + 10)
explain: (784 × 128 + 128) + (128 × 10 + 10) = 100480 + 1290 = 101770.
```

```quiz
q: **[k-means]** k-means with k = 2 on the points 0, 2, 4, 10, 12 starts with centroids 0 and 12. What is the WCSS after convergence?
answer: 10
verify:
  pts, c = [0, 2, 4, 10, 12], [0.0, 12.0]
  while True:
      cl = [[p for p in pts if abs(p - c[0]) <= abs(p - c[1])], [p for p in pts if abs(p - c[0]) > abs(p - c[1])]]
      new = [sum(x) / len(x) for x in cl]
      if new == c:
          break
      c = new
  print(sum((p - c[i]) ** 2 for i in range(2) for p in cl[i]))
explain: The first assignment gives {0, 2, 4} and {10, 12} (4 is closer to 0 than to 12), with centroids 2 and 11. Nothing changes after that. WCSS = (4 + 0 + 4) + (1 + 1) = 10.
```

```quiz
q: **[PCA]** A covariance matrix has eigenvalues 8, 4, 2, 1 and 1. What fraction of the variance is **lost** when the data is projected onto the first two principal components? Give the answer to three decimal places.
answer: 0.25
verify: round((2 + 1 + 1) / 16, 3)
explain: The total variance is 16, and the first two components keep 12 of it. The lost fraction is (2 + 1 + 1) / 16 = 0.25.
```
