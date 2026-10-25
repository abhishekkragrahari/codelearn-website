---
title: Descriptive Statistics
chapter: Probability and Statistics
description: Mean, median and mode, range, variance and standard deviation (population and sample), how shifting and scaling data changes them, and correlation and the regression line.
---
Descriptive statistics summarise a data set with a few numbers: where its centre is, and how spread out it is.

## Measures of central tendency

For the data 4, 8, 6, 5, 3, 8, 9, 5, 8, 4:

| Measure | Definition | Value |
| --- | --- | --- |
| **Mean** x̄ | Sum / count | 60 / 10 = 6 |
| **Median** | Middle value of the sorted data (average of the two middle values when the count is even) | Sorted: 3 4 4 5 **5 6** 8 8 8 9 → (5 + 6)/2 = 5.5 |
| **Mode** | Most frequent value | 8 (appears 3 times) |

The mean is pulled by extreme values (outliers); the median is not. For a moderately skewed distribution, the empirical relation **mode ≈ 3 median − 2 mean** holds.

## Measures of spread

- **Range** = maximum − minimum = 9 − 3 = 6.
- **Population variance** σ² = Σ(xᵢ − x̄)² / n = 40 / 10 = **4**, standard deviation σ = 2.
- **Sample variance** s² = Σ(xᵢ − x̄)² / (n − 1) = 40 / 9 ≈ 4.44. Dividing by n − 1 corrects the bias that comes from measuring deviations from the sample's own mean. Read questions carefully to see which is meant.
- A convenient formula: σ² = (Σxᵢ²)/n − x̄² (the mean of the squares minus the square of the mean).

## Shifting and scaling

If every value is transformed to yᵢ = a·xᵢ + b:

| Statistic | New value |
| --- | --- |
| Mean, median, mode | a·(old) + b |
| Range, standard deviation | \|a\| · (old) |
| Variance | a² · (old) |

Adding a constant shifts the centre but not the spread; multiplying scales both.

## Correlation and regression

For paired data (xᵢ, yᵢ), the **Pearson correlation coefficient**

r = Σ(xᵢ − x̄)(yᵢ − ȳ) / √(Σ(xᵢ − x̄)² · Σ(yᵢ − ȳ)²)

measures linear association, from −1 (perfect decreasing line) through 0 (no linear relation) to +1 (perfect increasing line). It is unchanged by shifting either variable and by scaling with positive factors. Correlation does not imply causation.

The **least-squares regression line** of y on x is ŷ = a + bx with slope b = Σ(xᵢ − x̄)(yᵢ − ȳ) / Σ(xᵢ − x̄)² and intercept a = ȳ − b x̄; it always passes through (x̄, ȳ).

Python's `statistics` module computes all of these:

```python
import statistics as st

data = [4, 8, 6, 5, 3, 8, 9, 5, 8, 4]
print("mean", st.mean(data), "| median", st.median(data), "| mode", st.mode(data))
print("population variance", st.pvariance(data), "| sample variance", round(st.variance(data), 4))
print("population std dev", st.pstdev(data))
scaled = [3 * v + 2 for v in data]
print("after y = 3x + 2: mean", st.mean(scaled), "| population variance", st.pvariance(scaled))

x, y = [1, 2, 3, 4, 5], [2, 4, 5, 4, 5]
fit = st.linear_regression(x, y)
print(f"correlation r = {st.correlation(x, y):.4f}, regression line y = {fit.intercept:.1f} + {fit.slope:.1f}x")
```
```output
mean 6 | median 5.5 | mode 8
population variance 4 | sample variance 4.4444
population std dev 2.0
after y = 3x + 2: mean 20 | population variance 36
correlation r = 0.7746, regression line y = 2.2 + 0.6x
```

## Practice questions

```quiz
q: What is the median of 3, 7, 1, 9, 4, 6?
answer: 5
verify: __import__("statistics").median([3, 7, 1, 9, 4, 6])
explain: Sorted: 1, 3, 4, 6, 7, 9. With 6 values the median is the average of the 3rd and 4th: (4 + 6)/2 = 5.
```

```quiz
q: What is the population standard deviation of 2, 4, 4, 4, 5, 5, 7, 9?
answer: 2
verify: __import__("statistics").pstdev([2, 4, 4, 4, 5, 5, 7, 9])
explain: The mean is 40/8 = 5. The squared deviations are 9, 1, 1, 1, 0, 0, 4, 16, summing to 32. Population variance 32/8 = 4, so σ = 2.
```

```quiz
q: A data set has mean 20 and variance 9. Every value is multiplied by 2 and then 5 is subtracted. What is the new variance?
answer: 36
verify: 2 ** 2 * 9
explain: Subtracting a constant does not change the spread; multiplying by 2 multiplies the variance by 2² = 4: 4 × 9 = 36. (The new mean is 2 × 20 − 5 = 35.)
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* The median is less affected by outliers than the mean
* The correlation coefficient always lies between −1 and 1
- A correlation of 0 means that x and y are independent
* The least-squares regression line passes through the point (x̄, ȳ)
explain: One huge value moves the mean but barely moves the median. |r| ≤ 1 by the Cauchy–Schwarz inequality. r = 0 only rules out a linear relation; y = x² over symmetric x values has r = 0 but complete dependence. The intercept a = ȳ − b x̄ makes the line pass through the means.
```
