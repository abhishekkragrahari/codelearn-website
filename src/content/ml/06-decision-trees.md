---
title: Decision Trees
chapter: Supervised Learning
description: How decision trees classify, entropy and information gain, the Gini index, building a tree with ID3, regression trees, overfitting and pruning, with worked GATE DA examples.
---
A **decision tree** classifies a sample by asking a sequence of questions about its features. Each internal node tests one feature, each branch is an outcome of the test, and each leaf gives a prediction.

```tree
caption: A small decision tree for "Play outside?"
Outlook?
  Sunny
    Humidity?
      High | No
      Normal | Yes
  Overcast | Yes
  Rainy
    Windy?
      Yes | No
      No | Yes
```

Trees are easy to read and explain, need no feature scaling, and handle both categorical and numerical features. The whole question is how to choose the test at each node.

## Impurity: entropy and the Gini index

A good split produces children that are as **pure** as possible (mostly one class). Two measures of impurity are used, for a node whose samples have class proportions p₁, …, p<sub>K</sub>:

- **Entropy**: H = −Σ pₖ log₂ pₖ (with 0 log 0 = 0). It is 0 for a pure node and largest, log₂ K, when all classes are equally common (1 bit for two classes at 50/50).
- **Gini index**: G = 1 − Σ pₖ². It is 0 for a pure node and largest, 1 − 1/K, for equal classes (0.5 for two classes).

| Class proportions | Entropy | Gini |
| --- | --- | --- |
| (1, 0) | 0 | 0 |
| (0.75, 0.25) | 0.811 | 0.375 |
| (0.5, 0.5) | 1 | 0.5 |

## Information gain

The **information gain** of splitting a node S on feature A is the drop in entropy, where each child's entropy is weighted by its share of the samples:

**Gain(S, A) = H(S) − Σᵥ (|Sᵥ| / |S|) · H(Sᵥ)**

The **ID3** algorithm builds a tree top-down: at each node, split on the feature with the **largest information gain**, and recurse on each child until the node is pure or no features are left. CART uses the same idea with the Gini index and binary splits.

**Worked example.** 14 days, 9 Yes and 5 No. The root entropy is

H(S) = −(9/14) log₂(9/14) − (5/14) log₂(5/14) ≈ 0.940.

Splitting on **Windy**: 8 calm days (6 Yes, 2 No) and 6 windy days (3 Yes, 3 No).

- H(calm) = −(6/8) log₂(6/8) − (2/8) log₂(2/8) ≈ 0.811
- H(windy) = 1 (3 and 3)
- Gain = 0.940 − (8/14)(0.811) − (6/14)(1) ≈ 0.940 − 0.463 − 0.429 = **0.048**

Splitting on **Outlook**: Sunny (2 Yes, 3 No), Overcast (4 Yes, 0 No), Rainy (3 Yes, 2 No).

- H(Sunny) = H(Rainy) ≈ 0.971 and H(Overcast) = 0
- Gain = 0.940 − (5/14)(0.971) − 0 − (5/14)(0.971) ≈ **0.247**

Outlook has a much larger gain, so it becomes the root. The Overcast branch is already pure and becomes a leaf.

```python
import math
from collections import Counter

# (Outlook, Humidity, Windy, Play)
data = [
    ("Sunny", "High", "No", "No"), ("Sunny", "High", "Yes", "No"), ("Overcast", "High", "No", "Yes"),
    ("Rainy", "High", "No", "Yes"), ("Rainy", "Normal", "No", "Yes"), ("Rainy", "Normal", "Yes", "No"),
    ("Overcast", "Normal", "Yes", "Yes"), ("Sunny", "High", "No", "No"), ("Sunny", "Normal", "No", "Yes"),
    ("Rainy", "Normal", "No", "Yes"), ("Sunny", "Normal", "Yes", "Yes"), ("Overcast", "High", "Yes", "Yes"),
    ("Overcast", "Normal", "No", "Yes"), ("Rainy", "High", "Yes", "No"),
]
names = ["Outlook", "Humidity", "Windy"]

def entropy(rows):
    counts = Counter(r[-1] for r in rows)
    return -sum(c / len(rows) * math.log2(c / len(rows)) for c in counts.values())

def gini(rows):
    counts = Counter(r[-1] for r in rows)
    return 1 - sum((c / len(rows)) ** 2 for c in counts.values())

def gain(rows, j, impurity=entropy):
    total = impurity(rows)
    for v in set(r[j] for r in rows):
        part = [r for r in rows if r[j] == v]
        total -= len(part) / len(rows) * impurity(part)
    return total

print(f"root entropy = {entropy(data):.3f}, root Gini = {gini(data):.3f}")
for j, name in enumerate(names):
    print(f"{name:8}: information gain = {gain(data, j):.3f}, Gini decrease = {gain(data, j, gini):.3f}")

def build(rows, features, depth=0):
    labels = Counter(r[-1] for r in rows)
    if len(labels) == 1 or not features:
        print("    " * depth + "-> " + labels.most_common(1)[0][0])
        return
    j = max(features, key=lambda f: gain(rows, f))
    for v in sorted(set(r[j] for r in rows)):
        print("    " * depth + f"{names[j]} = {v}:")
        build([r for r in rows if r[j] == v], [f for f in features if f != j], depth + 1)

build(data, [0, 1, 2])
```
```output
root entropy = 0.940, root Gini = 0.459
Outlook : information gain = 0.247, Gini decrease = 0.116
Humidity: information gain = 0.152, Gini decrease = 0.092
Windy   : information gain = 0.048, Gini decrease = 0.031
Outlook = Overcast:
    -> Yes
Outlook = Rainy:
    Windy = No:
        -> Yes
    Windy = Yes:
        -> No
Outlook = Sunny:
    Humidity = High:
        -> No
    Humidity = Normal:
        -> Yes
```

The learned tree is the one drawn at the top of the lesson: Outlook at the root, Humidity under Sunny and Windy under Rainy, and it classifies all 14 days correctly.

## A bias of information gain

Information gain favours features with **many distinct values**. A "Day number" feature with 14 values would split the data into 14 pure leaves and get the maximum possible gain, yet it is useless for new days. C4.5 corrects this with the **gain ratio**: the gain divided by the split's own entropy (the **split information**).

## Numerical features

For a numerical feature, the tree tests thresholds "x ≤ t". The candidate thresholds are the midpoints between consecutive distinct sorted values; the one with the best gain is chosen. The same feature can be tested again further down with a different threshold.

## Regression trees

For a real-valued label, each leaf predicts the **mean** of its training labels, and a split is chosen to minimise the total **squared error** (variance) of the children instead of entropy.

## Overfitting and pruning

A tree grown until every leaf is pure fits the training data perfectly, including its noise: deep trees have **low bias and high variance**. Remedies:

- **Pre-pruning** (early stopping): limit the maximum depth, require a minimum number of samples per leaf, or stop when the gain is below a threshold.
- **Post-pruning**: grow the full tree, then replace subtrees by leaves when that does not hurt accuracy on validation data.
- **Ensembles**: a **random forest** averages many trees trained on bootstrap samples with random feature subsets, which reduces variance.

## Practice questions

```quiz
q: A node contains 6 positive and 2 negative samples. What is its entropy (base 2)? Give the answer to three decimal places.
answer: 0.811
verify: round(-(0.75 * __import__("math").log2(0.75) + 0.25 * __import__("math").log2(0.25)), 3)
explain: p = 6/8 = 0.75 and 0.25. H = −0.75 log₂ 0.75 − 0.25 log₂ 0.25 ≈ 0.311 + 0.5 = 0.811.
```

```quiz
q: What is the Gini index of a node with class counts 4, 4 and 2?
answer: 0.64
verify: round(1 - (0.4 ** 2 + 0.4 ** 2 + 0.2 ** 2), 4)
explain: Proportions 0.4, 0.4, 0.2. G = 1 − (0.16 + 0.16 + 0.04) = 1 − 0.36 = 0.64.
```

```quiz
q: A node has 10 samples: 5 positive and 5 negative. A split sends 4 positive and 0 negative samples left, and 1 positive and 5 negative samples right. What is the information gain? Give the answer to three decimal places.
answer: 0.610
verify:
  import math
  H = lambda *c: -sum(x / sum(c) * math.log2(x / sum(c)) for x in c if x)
  print(f"{H(5, 5) - 0.4 * H(4, 0) - 0.6 * H(1, 5):.3f}")
explain: H(root) = 1. The left child is pure (H = 0). The right child has proportions 1/6 and 5/6, so H ≈ 0.650. Gain = 1 − 0.4 × 0 − 0.6 × 0.650 ≈ 1 − 0.390 = 0.610.
```

```quiz
q: What is the maximum possible entropy (base 2) of a node with **4** classes?
answer: 2
verify: __import__("math").log2(4)
explain: Entropy is largest when all classes are equally likely: −4 × (1/4) log₂(1/4) = log₂ 4 = 2 bits.
```

```quiz
q: Which statements about decision trees are **true**? (Select all that apply.)
* Information gain is biased towards features with many distinct values
* A tree grown until every leaf is pure tends to overfit
- Decision trees require all features to be standardised to zero mean and unit variance
* A regression tree predicts the mean label of the training samples in a leaf
explain: Many-valued features split the data into small pure groups, inflating the gain (C4.5's gain ratio corrects this). Pure leaves fit the noise. Splits compare a feature with a threshold, so scaling does not change the tree. Regression leaves predict the mean, which minimises squared error.
```

```quiz
q: For a numerical feature with sorted distinct values 2, 5, 9 and 12, which thresholds does a decision tree consider for the test "x ≤ t"?
- 2, 5, 9 and 12
* 3.5, 7 and 10.5
- Only the median, 7
- Every integer from 2 to 12
explain: The candidate thresholds are the midpoints between consecutive distinct values: (2 + 5)/2 = 3.5, (5 + 9)/2 = 7 and (9 + 12)/2 = 10.5. Any other threshold gives the same split as one of these.
```
