---
title: Bias-Variance Trade-off, Cross-Validation and Evaluation
chapter: Model Selection
description: The bias-variance decomposition, overfitting and underfitting, k-fold and leave-one-out cross-validation, the confusion matrix, accuracy, precision, recall, F1 score and ROC curves, for GATE DA.
---
A model is only useful if it does well on data it has **not** seen. This lesson explains why models fail to generalise, how to estimate generalisation error honestly, and how to measure a classifier's performance.

## The bias-variance decomposition

Suppose the true relationship is y = f(x) + ε, where the noise ε has mean 0 and variance σ². Train a model f̂ on a random training set; f̂ depends on which training set we happened to get. At a fixed point x, the expected squared error over training sets and noise splits into three parts:

**E[(y − f̂(x))²] = Bias[f̂(x)]² + Var[f̂(x)] + σ²**

- **Bias** = E[f̂(x)] − f(x): how far the **average** model is from the truth. High bias means the model family is too simple to capture f (for example, a straight line for a curved relationship). This is **underfitting**.
- **Variance** = E[(f̂(x) − E[f̂(x)])²]: how much the model changes from one training set to another. High variance means the model is so flexible that it follows the noise in each training set. This is **overfitting**.
- **σ²** is the **irreducible error**: noise that no model can remove.

As a model becomes more complex, bias falls and variance rises. The test error is U-shaped in model complexity, and the best model sits at the bottom of the U.

| Model setting | Lower bias, higher variance | Higher bias, lower variance |
| --- | --- | --- |
| Polynomial regression | Higher degree | Lower degree |
| k-NN | Small k | Large k |
| Ridge regression | Small λ | Large λ |
| Decision tree | Deeper tree | Shallower tree |
| SVM | Large C | Small C |

More training data reduces variance (the model is pinned down by more points) but does not reduce bias.

**Example.** Here, the model ignores x and predicts a shrunken mean c · ȳ of n = 5 noisy labels whose true mean is 10, with noise variance σ² = 4. Shrinking (c < 1) adds bias but removes variance, and the program checks the formula by simulation.

```python
import random

random.seed(1)
true_mean, sigma2, n, trials = 10.0, 4.0, 5, 100_000
for c in [1.0, 0.95, 0.9, 0.8]:
    bias = c * true_mean - true_mean
    var = c * c * sigma2 / n
    # Simulate: draw a training set, fit, and measure the error on a fresh noisy label.
    total = 0.0
    for _ in range(trials):
        ybar = sum(random.gauss(true_mean, sigma2 ** 0.5) for _ in range(n)) / n
        y_new = random.gauss(true_mean, sigma2 ** 0.5)
        total += (y_new - c * ybar) ** 2
    print(f"c = {c}: bias^2 = {bias * bias:.3f}, variance = {var:.3f}, "
          f"bias^2 + var + noise = {bias * bias + var + sigma2:.3f}, simulated = {total / trials:.3f}")
```
```output
c = 1.0: bias^2 = 0.000, variance = 0.800, bias^2 + var + noise = 4.800, simulated = 4.805
c = 0.95: bias^2 = 0.250, variance = 0.722, bias^2 + var + noise = 4.972, simulated = 4.963
c = 0.9: bias^2 = 1.000, variance = 0.648, bias^2 + var + noise = 5.648, simulated = 5.630
c = 0.8: bias^2 = 4.000, variance = 0.512, bias^2 + var + noise = 8.512, simulated = 8.491
```

The formula and the simulation agree. In this example, shrinking always loses: at c = 0.95 the variance drops by only 0.078, while the squared bias rises by 0.25. Shrinkage pays off only when the variance is large compared with the bias it adds, which is exactly the situation where ridge regression helps (many noisy features, little data).

## Cross-validation

The validation set approach wastes data: the samples set aside for validation are never used for training. **Cross-validation** uses every sample for both.

**k-fold cross-validation:**

1. Split the data into k equal folds.
2. For each fold i: train on the other k − 1 folds, and compute the error on fold i.
3. The CV estimate is the average of the k errors.

Every sample is used for validation exactly once and for training k − 1 times. The model is trained k times. Common choices are k = 5 or k = 10.

**Leave-one-out cross-validation (LOOCV)** is k-fold with k = n: each fold is a single sample, so the model is trained n times on n − 1 samples. It is nearly unbiased but expensive, and its estimate can have high variance because the n training sets are almost identical.

For **hyperparameter selection**, run cross-validation for each candidate value (each k in k-NN, each λ in ridge) and choose the value with the lowest CV error; then retrain on all the training data with that value. The test set is still kept aside for the final estimate.

```python
# LOOCV for the "predict the mean of the training labels" model.
ys = [4, 7, 5, 9, 10]
errors = []
for i in range(len(ys)):
    train = ys[:i] + ys[i + 1:]
    pred = sum(train) / len(train)
    errors.append((ys[i] - pred) ** 2)
    print(f"leave out {ys[i]:2}: train mean = {pred:.2f}, squared error = {errors[-1]:.4f}")
print(f"LOOCV mean squared error = {sum(errors) / len(errors):.4f}")

# Which samples land in which fold for 5-fold CV of 10 samples (no shuffling)?
n, k = 10, 5
folds = [list(range(i * n // k, (i + 1) * n // k)) for i in range(k)]
print("folds:", folds)
```
```output
leave out  4: train mean = 7.75, squared error = 14.0625
leave out  7: train mean = 7.00, squared error = 0.0000
leave out  5: train mean = 7.50, squared error = 6.2500
leave out  9: train mean = 6.50, squared error = 6.2500
leave out 10: train mean = 6.25, squared error = 14.0625
LOOCV mean squared error = 8.1250
folds: [[0, 1], [2, 3], [4, 5], [6, 7], [8, 9]]
```

## Evaluating a classifier: the confusion matrix

For a binary classifier, every prediction falls into one of four cells:

| | Predicted positive | Predicted negative |
| --- | --- | --- |
| **Actually positive** | True positive (TP) | False negative (FN) |
| **Actually negative** | False positive (FP) | True negative (TN) |

From these counts:

- **Accuracy** = (TP + TN) / (TP + TN + FP + FN)
- **Precision** = TP / (TP + FP): of the samples predicted positive, the fraction that really are.
- **Recall** (sensitivity, true positive rate) = TP / (TP + FN): of the real positives, the fraction found.
- **Specificity** (true negative rate) = TN / (TN + FP); the **false positive rate** is 1 − specificity.
- **F1 score** = 2 · Precision · Recall / (Precision + Recall), the harmonic mean of precision and recall.

**Example.** TP = 40, FP = 10, FN = 20, TN = 30. Accuracy = 70/100 = 0.7. Precision = 40/50 = 0.8. Recall = 40/60 ≈ 0.667. F1 = 2 × 0.8 × 0.667 / 1.467 ≈ 0.727.

Accuracy misleads on **imbalanced** data. If 1% of transactions are fraud, a model that always says "not fraud" is 99% accurate but has recall 0. Precision and recall show the problem immediately.

### Thresholds and the ROC curve

A probabilistic classifier predicts positive when its score exceeds a threshold. Lowering the threshold catches more positives (recall rises) but also more false positives (precision usually falls). The **ROC curve** plots the true positive rate against the false positive rate for every threshold. A random classifier gives the diagonal, with area under the curve **AUC = 0.5**; a perfect classifier has AUC = 1. AUC equals the probability that a randomly chosen positive is scored higher than a randomly chosen negative.

```python
from itertools import product

scores = [0.95, 0.85, 0.8, 0.7, 0.6, 0.55, 0.4, 0.3, 0.2, 0.1]
labels = [1, 1, 0, 1, 1, 0, 0, 1, 0, 0]

for t in [0.75, 0.5, 0.25]:
    pred = [1 if s >= t else 0 for s in scores]
    tp = sum(p and y for p, y in zip(pred, labels))
    fp = sum(p and not y for p, y in zip(pred, labels))
    fn = sum((not p) and y for p, y in zip(pred, labels))
    print(f"threshold {t}: TP={tp} FP={fp} FN={fn} precision={tp / (tp + fp):.3f} recall={tp / (tp + fn):.3f}")

pos = [s for s, y in zip(scores, labels) if y]
neg = [s for s, y in zip(scores, labels) if not y]
auc = sum(1 if p > q else 0.5 if p == q else 0 for p, q in product(pos, neg)) / (len(pos) * len(neg))
print(f"AUC = {auc:.2f}")
```
```output
threshold 0.75: TP=2 FP=1 FN=3 precision=0.667 recall=0.400
threshold 0.5: TP=4 FP=2 FN=1 precision=0.667 recall=0.800
threshold 0.25: TP=5 FP=3 FN=0 precision=0.625 recall=1.000
AUC = 0.80
```

## Practice questions

```quiz
q: A classifier gives TP = 30, FP = 20, FN = 10 and TN = 140. What is its precision?
answer: 0.6
verify: 30 / (30 + 20)
explain: Precision = TP / (TP + FP) = 30 / 50 = 0.6.
```

```quiz
q: For the same classifier (TP = 30, FP = 20, FN = 10, TN = 140), what is the F1 score? Give the answer to three decimal places.
answer: 0.667
verify:
  p, r = 30 / 50, 30 / 40
  print(round(2 * p * r / (p + r), 3))
explain: Precision = 0.6 and recall = 30/40 = 0.75. F1 = 2 × 0.6 × 0.75 / (0.6 + 0.75) = 0.9 / 1.35 ≈ 0.667.
```

```quiz
q: A data set has 1000 samples. How many times is the model trained in leave-one-out cross-validation?
answer: 1000
verify: 1000
explain: LOOCV holds out each sample once, so the model is trained n = 1000 times, each time on 999 samples.
```

```quiz
q: In 10-fold cross-validation on 500 samples, how many samples is each model trained on?
answer: 450
verify: 500 - 500 // 10
explain: Each fold has 500/10 = 50 samples. Each model is trained on the other 9 folds: 9 × 50 = 450 samples.
```

```quiz
q: At some point x, a model has bias 2 and variance 3, and the noise variance is 1. What is the expected squared prediction error at x?
answer: 8
verify: 2 ** 2 + 3 + 1
explain: Expected error = bias² + variance + noise = 4 + 3 + 1 = 8. Note that the bias is squared but the variance is not.
```

```quiz
q: Which changes are likely to **reduce variance**? (Select all that apply.)
* Increasing k in k-NN
* Increasing λ in ridge regression
- Increasing the maximum depth of a decision tree
* Training on more data
explain: Larger k and larger λ make the model smoother and simpler. A deeper tree is more flexible, which increases variance. More data pins the model down, reducing variance (it does not reduce bias).
```

```quiz
q: In a data set, 2% of the samples are positive. A classifier labels **every** sample negative. Which statement is correct?
- Its accuracy is 2% and its recall is 100%
* Its accuracy is 98% and its recall is 0
- Its precision is 98%
- Its F1 score is 0.98
explain: It is right on all negatives (98% of the data) and finds no positives, so recall = 0/positives = 0. It makes no positive predictions, so precision is undefined (0/0) and F1 is 0 by convention.
```
