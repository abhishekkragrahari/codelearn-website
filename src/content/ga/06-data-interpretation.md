---
title: Data Interpretation
chapter: Quantitative Aptitude
description: Reading tables and charts, totals, shares and averages, percentage growth year on year, ratios between series, and approximation strategies for data questions.
---
Data interpretation questions give a table or chart and ask several quick calculations from it. The skills are reading the data accurately, choosing the right base for each percentage, and approximating when the answer options are far apart.

## A worked data set

Annual sales of a company's three products (₹ crore):

| Product | 2021 | 2022 | 2023 | 2024 |
| --- | --- | --- | --- | --- |
| A | 120 | 150 | 165 | 198 |
| B | 80 | 96 | 120 | 132 |
| C | 60 | 72 | 60 | 90 |
| **Total** | **260** | **318** | **345** | **420** |

Typical questions:

- **Growth of A from 2023 to 2024**: (198 − 165)/165 = 33/165 = **20%**. The base is always the **earlier** year.
- **Average sales of B** over the four years: (80 + 96 + 120 + 132)/4 = **107**.
- **Share of C in 2024**: 90/420 ≈ **21.43%**.
- **Change in C from 2022 to 2023**: (60 − 72)/72 ≈ **−16.67%** (a fall).
- **Ratio of A to B in 2023**: 165 : 120 = **11 : 8**.
- **Year with the largest percentage growth in total sales**: 2022 (+22.31%), compared with +8.49% in 2023 and +21.74% in 2024. Note that 2024 had the largest **absolute** increase (+75) but not the largest **percentage** increase.

```python
years = [2021, 2022, 2023, 2024]
sales = {"A": [120, 150, 165, 198], "B": [80, 96, 120, 132], "C": [60, 72, 60, 90]}
total = [sum(col) for col in zip(*sales.values())]
print("totals:", dict(zip(years, total)))
for i in range(1, 4):
    growth = (total[i] - total[i - 1]) / total[i - 1] * 100
    print(f"{years[i]}: total up {total[i] - total[i - 1]:3} = {growth:.2f}%")
print("A's share over four years:", round(sum(sales["A"]) / sum(total) * 100, 2), "%")
cagr = ((total[-1] / total[0]) ** (1 / 3) - 1) * 100
print("average yearly (compound) growth of the total:", round(cagr, 2), "%")
```
```output
totals: {2021: 260, 2022: 318, 2023: 345, 2024: 420}
2022: total up  58 = 22.31%
2023: total up  27 = 8.49%
2024: total up  75 = 21.74%
A's share over four years: 47.13 %
average yearly (compound) growth of the total: 17.33 %
```

## Strategies

- **Read the units and the question twice**: "percentage of", "percentage change", "percentage points" and "ratio" are different things. A share rising from 20% to 25% is a rise of 5 **percentage points**, but of 25 **percent**.
- **Approximate** when the options are well separated: 33/165 is clearly about 1/5.
- **Use fractions you know**: 1/8 = 12.5%, 1/6 ≈ 16.67%, 1/7 ≈ 14.29%, 1/9 ≈ 11.11%, 1/11 ≈ 9.09%.
- **Compound growth** over several years is not the average of the yearly rates: total sales grew 61.54% over three years, which is about 17.33% per year compounded, not 61.54/3 ≈ 20.5%.

## Practice questions

Use the sales table above.

```quiz
q: By what percentage did the total sales grow from 2021 to 2024? Give the answer to two decimal places.
answer: 61.54
verify: round((420 / 260 - 1) * 100, 2)
explain: (420 − 260)/260 = 160/260 ≈ 61.54%.
```

```quiz
q: What percentage of the four-year total sales came from product A? Give the answer to two decimal places.
answer: 47.13
verify: round((120 + 150 + 165 + 198) / (260 + 318 + 345 + 420) * 100, 2)
explain: A sold 633 out of 1343 in total: 633/1343 ≈ 47.13%.
```

```quiz
q: In which year did product B have its largest increase in sales (in ₹ crore) over the previous year?
- 2022
* 2023
- 2024
- 2021
explain: B's increases were 16 (2022), 24 (2023) and 12 (2024), so the largest absolute increase was in 2023.
```

```quiz
q: Product C's sales fell in 2023. By how many **percentage points** did C's share of total sales change from 2022 to 2023? Give the answer to two decimal places (negative for a fall).
answer: -5.25
verify: round(60 / 345 * 100 - 72 / 318 * 100, 2)
explain: C's share was 72/318 ≈ 22.64% in 2022 and 60/345 ≈ 17.39% in 2023: a change of about −5.25 percentage points.
```
