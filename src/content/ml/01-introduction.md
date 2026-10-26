---
title: Introduction to Machine Learning
chapter: Foundations
description: What machine learning is, supervised and unsupervised learning, regression and classification, features and labels, training and test data, and loss functions, as covered in the GATE DA syllabus.
---
**Machine learning** is the study of programs that improve at a task by learning from data instead of following rules written by hand. A spam filter is not given a list of spam words; it is shown thousands of emails marked "spam" or "not spam" and learns what separates them.

## The vocabulary

Every ML problem in GATE uses the same words:

- A **sample** (or example, instance) is one row of data, such as one email or one house.
- **Features** (inputs, attributes) are the measured values of a sample, written as a vector **x** = (x₁, x₂, …, x<sub>d</sub>). For a house: area, number of rooms, age.
- The **label** (target, output) y is what we want to predict: the price of the house, or "spam / not spam".
- A **model** is a function f that maps features to a prediction ŷ = f(**x**). Learning means choosing f from a family of functions, usually by choosing its **parameters** (weights).
- A **loss function** measures how wrong one prediction is. Training picks the parameters that make the average loss on the training data small.

## Supervised and unsupervised learning

| | Supervised learning | Unsupervised learning |
| --- | --- | --- |
| Data | Features **and** labels (x, y) | Features only (x) |
| Goal | Predict y for new x | Find structure in the data |
| Examples | Regression, classification | Clustering, dimensionality reduction |
| GATE DA methods | Linear and ridge regression, logistic regression, k-NN, naive Bayes, LDA, SVM, decision trees, neural networks | k-means, k-medoids, hierarchical clustering, PCA |

Supervised learning splits further by the type of label:

- **Regression**: y is a real number (house price, temperature). Typical loss: **squared error** (y − ŷ)².
- **Classification**: y is one of a fixed set of classes (spam / not spam, digit 0 to 9). Typical losses: **0-1 loss** (1 if wrong, 0 if right) for evaluation, and **cross-entropy (log loss)** for training.

```tree
caption: The families of learning problems in the GATE DA syllabus
Machine learning
  Supervised (labels given)
    Regression | real-valued y
    Classification | y is a class
  Unsupervised (no labels)
    Clustering | group similar samples
    Dimensionality reduction | fewer features
```

## Training, validation and test data

A model that only memorises the training data is useless; what matters is how well it does on **new** data. So the data is split:

- **Training set**: used to fit the parameters.
- **Validation set**: used to choose **hyperparameters**, the settings that are not learned directly (k in k-NN, λ in ridge regression, the depth of a tree).
- **Test set**: used **once**, at the end, to estimate performance on unseen data. Using it to make choices leaks information and makes the estimate too optimistic.

The error on the training data is the **training error**; the expected error on new data is the **generalisation (test) error**. A model whose training error is much lower than its test error is **overfitting**: it has learned noise in the training data. A model that does badly even on the training data is **underfitting**. The lesson on bias and variance explains this trade-off in detail.

## Parametric and non-parametric models

- A **parametric** model has a fixed number of parameters, whatever the amount of data: linear regression with d features always has d + 1 weights.
- A **non-parametric** model grows with the data: k-NN keeps every training sample, and a decision tree can keep adding nodes.

## A first example: predicting with the mean

The simplest regression "model" ignores x and always predicts one number c. Which c gives the smallest squared error? Setting the derivative of Σ (yᵢ − c)² to zero gives c = mean of y. For absolute error Σ |yᵢ − c| the best constant is the **median**. This small fact appears in GATE questions and also explains why regression trees predict the mean of the samples in each leaf.

```python
ys = [3, 5, 6, 10, 21]

def squared(c):
    return sum((y - c) ** 2 for y in ys)

def absolute(c):
    return sum(abs(y - c) for y in ys)

candidates = [c / 10 for c in range(0, 251)]
best_sq = min(candidates, key=squared)
best_abs = min(candidates, key=absolute)
print("mean =", sum(ys) / len(ys), " best constant for squared error =", best_sq)
print("median =", sorted(ys)[len(ys) // 2], " best constant for absolute error =", best_abs)
```
```output
mean = 9.0  best constant for squared error = 9.0
median = 6  best constant for absolute error = 6.0
```

The outlier 21 pulls the mean up to 9, but the median stays at 6: absolute error is more **robust** to outliers than squared error.

## Practice questions

```quiz
q: A bank wants to predict the **amount** (in rupees) a customer will spend next month from their past transactions. What kind of problem is this?
* Supervised regression
- Supervised classification
- Clustering
- Dimensionality reduction
explain: Past data includes the amount actually spent (labels), and the label is a real number, so this is supervised regression.
```

```quiz
q: Which of the following are **unsupervised** learning tasks? (Select all that apply.)
* Grouping news articles into topics without any topic labels
- Predicting whether a tumour is malignant from labelled scans
* Reducing 100 correlated features to 5 with PCA
- Predicting tomorrow's temperature from past temperatures
explain: Clustering without labels and PCA use only the features. Tumour classification and temperature prediction learn from known answers, so they are supervised.
```

```quiz
q: The labels of five training samples are 2, 4, 4, 5 and 10. A model predicts the same constant c for every sample. What value of c minimises the **total squared error**?
answer: 5
verify: sum([2, 4, 4, 5, 10]) / 5
explain: The constant that minimises Σ (yᵢ − c)² is the mean: (2 + 4 + 4 + 5 + 10) / 5 = 25 / 5 = 5.
```

```quiz
q: For the same labels 2, 4, 4, 5 and 10, what constant c minimises the **total absolute error** Σ |yᵢ − c|?
answer: 4
verify: min(range(0, 11), key=lambda c: sum(abs(y - c) for y in [2, 4, 4, 5, 10]))
explain: The total absolute error is minimised by the median. Sorted, the labels are 2, 4, 4, 5, 10, so the median is 4.
```

```quiz
q: A model has 99% accuracy on the training set and 62% accuracy on the test set. What is the most likely problem?
- Underfitting
* Overfitting
- The test set is too large
- The learning rate is too small
explain: A large gap between training and test performance means the model has memorised the training data (including its noise) and does not generalise: overfitting.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* Hyperparameters should be chosen using a validation set, not the test set
* k-nearest neighbours is a non-parametric method
- A model with lower training error always has lower test error
- Classification problems always use squared error as the training loss
explain: Choosing settings on the test set makes the final estimate optimistic, so a separate validation set (or cross-validation) is used. k-NN stores all training data, so its size grows with the data. Lower training error can come with higher test error (overfitting). Classifiers are usually trained with cross-entropy loss.
```
