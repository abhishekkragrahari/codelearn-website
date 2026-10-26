---
title: Data Types and Data Preprocessing
chapter: Data Preparation
description: Types of attributes (nominal, ordinal, interval, ratio; discrete and continuous), data cleaning (missing values, noise and outliers), and data transformation - min-max, z-score and decimal-scaling normalization, discretization by binning, sampling and data reduction and compression - for GATE DA.
---
Real data is messy: values are missing, units differ, and some entries are simply wrong. Before data is loaded into a warehouse or fed to a model, it is **preprocessed**: cleaned, transformed and often reduced. GATE DA asks about the standard techniques, and about the types of data they apply to.

## Types of attributes

An **attribute** (feature, field) is one property recorded for each object. Its type decides which operations make sense:

| Type | Meaning | Examples | Meaningful operations |
| --- | --- | --- | --- |
| **Nominal** | Names or labels, no order | Colour, city, roll number | = and ≠, mode |
| **Ordinal** | Categories with an order, but gaps not measurable | Grade (A, B, C), rating (low, medium, high) | Also <, >, median |
| **Interval** | Ordered numbers with meaningful differences, but no true zero | Temperature in °C, calendar year | Also + and −, mean |
| **Ratio** | Numbers with a true zero, so ratios make sense | Height, salary, count, temperature in kelvin | Also × and ÷ |

Nominal and ordinal attributes are **qualitative** (categorical); interval and ratio attributes are **quantitative** (numeric). A **binary** attribute is a nominal attribute with two values; it is **symmetric** if both values are equally important (gender) and **asymmetric** if one matters more (test positive).

"20 °C is twice as hot as 10 °C" is wrong, because 0 °C is not "no temperature": Celsius is an interval scale. "20 kg is twice 10 kg" is right: mass is a ratio scale.

Attributes are also **discrete** (finitely or countably many values: counts, zip codes) or **continuous** (real numbers: weight, time).

## Data cleaning

**Missing values** can be handled by:

- ignoring the record (wasteful if many are missing);
- filling in a constant ("unknown"), the attribute **mean** or **median**, or the mean of the same class;
- predicting the value from the other attributes (regression, decision tree).

**Noise** (random errors) is smoothed by:

- **binning**: sort the values, split them into bins, and replace each value by its bin's **mean**, **median** or nearest **boundary**;
- regression, or clustering to detect **outliers**. A common rule flags values more than **1.5 × IQR** beyond the quartiles, or more than 3 standard deviations from the mean.

**Inconsistent** data (different codes for the same thing, different units) is fixed during **integration** of sources, which also removes **redundant** attributes (detected, for example, with correlation for numeric attributes and the χ² test for categorical ones).

## Normalization

Attributes with large ranges (salary in rupees) can dominate those with small ranges (age in years) in distance-based methods such as k-NN and k-means. **Normalization** puts them on a common scale.

**Min-max normalization** maps [min, max] linearly onto a new range [new_min, new_max], usually [0, 1]:

**v′ = (v − min)/(max − min) × (new_max − new_min) + new_min**

**z-score normalization** (standardization) centres on the mean and divides by the standard deviation:

**v′ = (v − μ)/σ**

The result has mean 0 and standard deviation 1. It is preferred when the minimum and maximum are unknown or there are outliers.

**Decimal scaling** moves the decimal point:

**v′ = v / 10ʲ**, with j the smallest integer such that max |v′| < 1.

**Example.** Incomes range from 12,000 to 98,000, with mean 54,000 and standard deviation 16,000. The value 73,600 becomes:

- min-max to [0, 1]: (73,600 − 12,000)/(98,000 − 12,000) = 61,600/86,000 ≈ **0.716**;
- z-score: (73,600 − 54,000)/16,000 = **1.225**;
- decimal scaling: the largest |v| is 98,000, so j = 5 and 73,600 becomes **0.736**.

## Discretization

**Discretization** turns a continuous attribute into intervals (bins) with labels, for example for concept hierarchies (age → young, middle-aged, senior) or for algorithms that need categorical data.

- **Equal-width binning**: split the range into k intervals of the same width (max − min)/k. Simple, but skewed data leaves some bins nearly empty.
- **Equal-frequency (equal-depth) binning**: each bin gets about the same number of values.
- **Entropy-based** (supervised) discretization chooses split points that maximise information gain with respect to a class label, as decision trees do.

## Sampling

A **sample** of the data is often enough, and far cheaper to process.

- **Simple random sampling without replacement** (SRSWOR): each subset of size s is equally likely; an item appears at most once.
- **Simple random sampling with replacement** (SRSWR): an item can be drawn again.
- **Stratified sampling**: split the data into groups (strata), such as age groups, and sample from each in proportion to its size. It guarantees that small groups are represented, which matters for skewed data.
- **Cluster sampling**: split the data into clusters (such as disk pages or villages) and sample whole clusters.

## Data reduction and compression

- **Dimensionality reduction** removes or combines attributes: feature selection, **PCA**, and the discrete **wavelet transform** (which keeps the largest coefficients).
- **Numerosity reduction** replaces the data with a smaller representation: a regression model, a histogram, clusters, or a sample.
- **Data compression** encodes the data in fewer bits. It is **lossless** if the original can be rebuilt exactly (run-length encoding, Huffman coding) and **lossy** otherwise (keeping only the top principal components or wavelet coefficients).
- **Aggregation**, such as daily sales summed to monthly sales, is the main reduction in a data warehouse.

```python
from statistics import mean

incomes = [12000, 35000, 48000, 54000, 60000, 73600, 98000]
lo, hi = min(incomes), max(incomes)
mu, sd = 54000, 16000
print("min-max [0, 1]:", [round((v - lo) / (hi - lo), 3) for v in incomes])
print("z-score (mu = 54000, sd = 16000):", [round((v - mu) / sd, 3) for v in incomes])
j = len(str(max(abs(v) for v in incomes)))
print(f"decimal scaling (j = {j}):", [v / 10 ** j for v in incomes])

ages = [13, 15, 16, 16, 19, 20, 20, 21, 22, 22, 25, 25, 25, 25, 30, 33, 33, 35, 35, 35, 35, 36, 40, 45, 46, 52, 70]
k = 3
width = (max(ages) - min(ages)) / k
edges = [min(ages) + i * width for i in range(k + 1)]
eq_width = [[a for a in ages if edges[i] <= a < edges[i + 1] or (i == k - 1 and a == max(ages))] for i in range(k)]
print("equal-width edges:", [round(e, 2) for e in edges], "sizes:", [len(b) for b in eq_width])
n = len(ages) // k
eq_freq = [ages[i * n:(i + 1) * n] for i in range(k)]
print("equal-frequency bins:", eq_freq)
first = eq_freq[0]
print("bin 1 smoothed by its mean:", [round(mean(first), 2)] * len(first))
# Smoothing by boundaries: replace each value by the nearer of the bin's smallest and largest value.
print("bin 1 smoothed by boundaries:", [first[0] if v - first[0] <= first[-1] - v else first[-1] for v in first])
```
```output
min-max [0, 1]: [0.0, 0.267, 0.419, 0.488, 0.558, 0.716, 1.0]
z-score (mu = 54000, sd = 16000): [-2.625, -1.188, -0.375, 0.0, 0.375, 1.225, 2.75]
decimal scaling (j = 5): [0.12, 0.35, 0.48, 0.54, 0.6, 0.736, 0.98]
equal-width edges: [13.0, 32.0, 51.0, 70.0] sizes: [15, 10, 2]
equal-frequency bins: [[13, 15, 16, 16, 19, 20, 20, 21, 22], [22, 25, 25, 25, 25, 30, 33, 33, 35], [35, 35, 35, 36, 40, 45, 46, 52, 70]]
bin 1 smoothed by its mean: [18, 18, 18, 18, 18, 18, 18, 18, 18]
bin 1 smoothed by boundaries: [13, 13, 13, 13, 22, 22, 22, 22, 22]
```

With equal-width bins, the outlier 70 stretches the range, so almost everyone lands in the first two bins; equal-frequency bins put 9 values in each.

## Practice questions

```quiz
q: Exam marks range from 20 to 100. Using min-max normalization to [0, 1], what is the normalized value of 68?
answer: 0.6
verify: (68 - 20) / (100 - 20)
explain: (68 − 20)/(100 − 20) = 48/80 = 0.6.
```

```quiz
q: An attribute has mean 50 and standard deviation 8. What is the z-score of the value 38?
answer: -1.5
verify: (38 - 50) / 8
explain: z = (38 − 50)/8 = −12/8 = −1.5: the value is one and a half standard deviations below the mean.
```

```quiz
q: Values range from −986 to 917. With decimal scaling, what does −986 become?
answer: -0.986
verify: -986 / 10 ** 3
explain: The largest absolute value is 986, so j = 3 (dividing by 1000 makes every |v′| < 1). −986 becomes −0.986.
```

```quiz
q: Which of these attributes are measured on a **ratio** scale? (Select all that apply.)
* Annual income in rupees
* Number of children
- Temperature in degrees Celsius
- Customer satisfaction rated low / medium / high
explain: Income and counts have a true zero, so ratios make sense. Celsius has an arbitrary zero (interval scale). A low/medium/high rating is ordinal.
```

```quiz
q: Data is split into 4 equal-width bins over the range 10 to 90. What is the upper boundary of the second bin?
answer: 50
verify: 10 + 2 * (90 - 10) / 4
explain: The width is (90 − 10)/4 = 20, so the bins are [10, 30), [30, 50), [50, 70) and [70, 90]. The second bin ends at 50.
```

```quiz
q: A population has 900 men and 100 women. A stratified sample of 50 people is taken, proportional to group size. How many women are in the sample?
answer: 5
verify: 50 * 100 // 1000
explain: Women are 100/1000 = 10% of the population, so the sample has 10% of 50 = 5 women.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* z-score normalization is less affected by a single extreme value than min-max normalization
* Equal-frequency binning puts about the same number of values in each bin
- Lossy compression lets the original data be rebuilt exactly
* Stratified sampling ensures that small groups appear in the sample
explain: A single outlier sets the min or max and squashes all other min-max values; the mean and standard deviation move less. Equal-frequency bins are defined by counts. Only lossless compression is exactly reversible. Sampling within each stratum guarantees every group is represented.
```
