---
title: k-Nearest Neighbours and Naive Bayes
chapter: Supervised Learning
description: The k-NN classifier with Euclidean and Manhattan distance, choosing k, feature scaling, and the naive Bayes classifier with Laplace smoothing and Gaussian naive Bayes, with worked GATE DA examples.
---
This lesson covers two classifiers that need no gradient descent at all: **k-nearest neighbours**, which simply remembers the training data, and **naive Bayes**, which counts.

## k-nearest neighbours (k-NN)

To classify a new point **x**:

1. Compute the distance from **x** to every training sample.
2. Take the **k** closest samples (the neighbours).
3. Predict the **majority class** among them. For regression, predict the **mean** of their labels.

Common distances between **a** and **b**:

- **Euclidean (L2)**: √Σ (aⱼ − bⱼ)²
- **Manhattan (L1)**: Σ |aⱼ − bⱼ|
- **Minkowski (Lp)**: (Σ |aⱼ − bⱼ|ᵖ)^(1/p), which gives L1 for p = 1 and L2 for p = 2.

**Worked example.** Training points, class A: (1, 1), (2, 1), (1, 2); class B: (5, 4), (6, 5), (4, 5), (3, 3). Classify the query (3, 2).

| Point | Class | Euclidean distance to (3, 2) |
| --- | --- | --- |
| (2, 1) | A | √2 ≈ 1.414 |
| (3, 3) | B | 1 |
| (1, 2) | A | 2 |
| (1, 1) | A | √5 ≈ 2.236 |
| (4, 5) | B | √10 ≈ 3.162 |
| (5, 4) | B | √8 ≈ 2.828 |
| (6, 5) | B | √18 ≈ 4.243 |

- k = 1: the nearest point is (3, 3), class **B**.
- k = 3: the nearest three are (3, 3) B, (2, 1) A, (1, 2) A, so the vote is 2 A to 1 B: class **A**.

The answer depends on k, which is a hyperparameter chosen by validation.

```python
import math
from collections import Counter

train = [((1, 1), "A"), ((2, 1), "A"), ((1, 2), "A"),
         ((5, 4), "B"), ((6, 5), "B"), ((4, 5), "B"), ((3, 3), "B")]

def knn(query, k, dist):
    nearest = sorted(train, key=lambda s: dist(s[0], query))[:k]
    return Counter(label for _, label in nearest).most_common(1)[0][0], [p for p, _ in nearest]

euclid = lambda a, b: math.dist(a, b)
manhattan = lambda a, b: sum(abs(x - y) for x, y in zip(a, b))
for k in [1, 3, 5]:
    label, nbrs = knn((3, 2), k, euclid)
    print(f"k = {k}: neighbours {nbrs} -> {label}")
print("Manhattan distances:", [manhattan(p, (3, 2)) for p, _ in train])
```
```output
k = 1: neighbours [(3, 3)] -> B
k = 3: neighbours [(3, 3), (2, 1), (1, 2)] -> A
k = 5: neighbours [(3, 3), (2, 1), (1, 2), (1, 1), (5, 4)] -> A
Manhattan distances: [3, 2, 2, 4, 6, 4, 1]
```

### Properties of k-NN

- **No training** (a "lazy learner"): all the work happens at prediction time, which costs O(n·d) per query for n samples with d features.
- **Small k** gives a flexible, jagged boundary: low bias, **high variance** (k = 1 has zero training error). **Large k** gives a smooth boundary: high bias, low variance. With k = n it always predicts the overall majority class.
- Use an **odd k** for two classes to avoid ties.
- **Scale the features.** Distances are dominated by features with large ranges (salary in rupees versus age in years), so features are usually standardised first.
- It suffers from the **curse of dimensionality**: in high dimensions, all points are nearly equally far apart, and "nearest" loses meaning.

## Naive Bayes

Naive Bayes applies Bayes' theorem to pick the most probable class:

P(c | x₁, …, x<sub>d</sub>) ∝ P(c) · P(x₁, …, x<sub>d</sub> | c)

Estimating the joint probability of all features is hopeless with limited data, so naive Bayes makes the **naive assumption**: the features are **conditionally independent given the class**. Then

P(c | **x**) ∝ **P(c) · Πⱼ P(xⱼ | c)**

and the prediction is the class with the largest value. The denominator P(**x**) is the same for every class, so it can be ignored when choosing the class.

**Worked example.** Should we play outside?

| Day | Outlook | Windy | Play |
| --- | --- | --- | --- |
| 1 | Sunny | No | No |
| 2 | Sunny | Yes | No |
| 3 | Rainy | No | Yes |
| 4 | Overcast | No | Yes |
| 5 | Overcast | Yes | Yes |
| 6 | Rainy | Yes | No |
| 7 | Sunny | No | Yes |
| 8 | Rainy | No | Yes |

Classify a day that is **Sunny** and **Windy**.

- Play = Yes (5 days): P(Yes) = 5/8, P(Sunny | Yes) = 1/5, P(Windy | Yes) = 1/5. Score = 5/8 × 1/5 × 1/5 = 1/40 = 0.025.
- Play = No (3 days): P(No) = 3/8, P(Sunny | No) = 2/3, P(Windy | No) = 2/3. Score = 3/8 × 2/3 × 2/3 = 1/6 ≈ 0.167.

The prediction is **No**. Normalising, P(No | Sunny, Windy) = 0.167 / (0.167 + 0.025) = 20/23 ≈ 0.87.

### Laplace (add-one) smoothing

If a feature value never occurs with a class in training, its estimated probability is 0, and the whole product becomes 0 no matter what the other features say. Here, **Overcast** never occurs with Play = No, so any Overcast day would get P(No | …) = 0.

**Laplace smoothing** adds 1 to every count:

P(xⱼ = v | c) = (count(v, c) + 1) / (count(c) + V), where V is the number of possible values of feature j.

Outlook has V = 3 values, so P(Overcast | No) becomes (0 + 1)/(3 + 3) = 1/6 instead of 0.

```python
from fractions import Fraction as F

data = [("Sunny", "No", "No"), ("Sunny", "Yes", "No"), ("Rainy", "No", "Yes"),
        ("Overcast", "No", "Yes"), ("Overcast", "Yes", "Yes"), ("Rainy", "Yes", "No"),
        ("Sunny", "No", "Yes"), ("Rainy", "No", "Yes")]
values = [["Sunny", "Overcast", "Rainy"], ["Yes", "No"]]

def scores(x, alpha=0):
    out = {}
    for c in ["Yes", "No"]:
        rows = [r for r in data if r[2] == c]
        s = F(len(rows), len(data))
        for j, v in enumerate(x):
            s *= F(sum(1 for r in rows if r[j] == v) + alpha, len(rows) + alpha * len(values[j]))
        out[c] = s
    return out

for x in [("Sunny", "Yes"), ("Overcast", "Yes")]:
    for alpha in [0, 1]:
        s = scores(x, alpha)
        total = sum(s.values())
        print(x, f"alpha={alpha}:", {c: str(v) for c, v in s.items()},
              "P(No|x) =", round(float(s["No"] / total), 4))
```
```output
('Sunny', 'Yes') alpha=0: {'Yes': '1/40', 'No': '1/6'} P(No|x) = 0.8696
('Sunny', 'Yes') alpha=1: {'Yes': '5/112', 'No': '9/80'} P(No|x) = 0.7159
('Overcast', 'Yes') alpha=0: {'Yes': '1/20', 'No': '0'} P(No|x) = 0.0
('Overcast', 'Yes') alpha=1: {'Yes': '15/224', 'No': '3/80'} P(No|x) = 0.359
```

### Gaussian naive Bayes

For a continuous feature, P(xⱼ | c) is modelled as a **normal density** whose mean and variance are estimated from the training samples of class c. Everything else stays the same.

### Properties of naive Bayes

- Training is a single pass of counting: very fast, and it works well with many features (text classification with word counts is the classic use).
- It is a **generative** model: it models P(**x** | c) and P(c). Logistic regression is **discriminative**: it models P(c | **x**) directly.
- The independence assumption is rarely true, but the **class ranking** is often still right even when the probabilities themselves are poorly calibrated.

## Practice questions

```quiz
q: Using the training points in the worked example (class A: (1, 1), (2, 1), (1, 2); class B: (5, 4), (6, 5), (4, 5), (3, 3)), what class does **5-NN** with Euclidean distance predict for the query (3, 2)?
* A
- B
- It is a tie
- It cannot be decided
verify:
  import math
  from collections import Counter
  t = [((1, 1), "A"), ((2, 1), "A"), ((1, 2), "A"), ((5, 4), "B"), ((6, 5), "B"), ((4, 5), "B"), ((3, 3), "B")]
  n = sorted(t, key=lambda s: math.dist(s[0], (3, 2)))[:5]
  print(Counter(c for _, c in n).most_common(1)[0][0])
explain: Sorted by distance: (3, 3) B 1, (2, 1) A 1.414, (1, 2) A 2, (1, 1) A 2.236, (5, 4) B 2.828. That is 3 votes for A and 2 for B, so 5-NN predicts A, while 1-NN predicts B: the answer depends on k.
```

```quiz
q: What is the Manhattan distance between the points (1, 5, −2) and (4, 1, 0)?
answer: 9
verify: abs(1 - 4) + abs(5 - 1) + abs(-2 - 0)
explain: |1 − 4| + |5 − 1| + |−2 − 0| = 3 + 4 + 2 = 9.
```

```quiz
q: In the naive Bayes worked example, what is the unnormalised score P(Yes) · P(Rainy | Yes) · P(Windy = No | Yes) for a day that is **Rainy** and **not windy**? Give the answer to three decimal places.
answer: 0.2
verify: round(5 / 8 * 2 / 5 * 4 / 5, 3)
explain: Of the 5 Yes days, 2 are Rainy (days 3 and 8) and 4 are not windy (days 3, 4, 7, 8). Score = 5/8 × 2/5 × 4/5 = 40/200 = 0.2.
```

```quiz
q: A feature has 4 possible values. In the training data, class c has 20 samples and the value v never appears with class c. With Laplace (add-one) smoothing, what is P(v | c)? Give the answer to four decimal places.
answer: 0.0417
verify: round((0 + 1) / (20 + 4), 4)
explain: (count + 1) / (class count + number of values) = (0 + 1) / (20 + 4) = 1/24 ≈ 0.0417.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* 1-NN always has zero training error when no two training points are identical
* Naive Bayes assumes the features are conditionally independent given the class
- Increasing k in k-NN increases the variance of the classifier
- k-NN does not need the features to be scaled because it uses distances
explain: Each training point is its own nearest neighbour, so 1-NN classifies every training point correctly. Naive Bayes assumes conditional independence given the class. Larger k averages over more neighbours, which lowers variance and raises bias. Because k-NN uses distances, unscaled features with large ranges dominate, so scaling matters.
```
