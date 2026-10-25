---
title: Ratios, Averages and Mixtures
chapter: Quantitative Aptitude
description: Ratios and proportions, combining ratios, sharing in a ratio, averages and weighted averages, average speed, alligation for mixtures, and age problems.
---
## Ratios and proportion

A ratio a : b compares two quantities; multiplying both terms by the same number gives the same ratio. Four quantities are in **proportion** if a : b = c : d, that is ad = bc.

- **Sharing**: to divide N in the ratio a : b, the parts are N·a/(a + b) and N·b/(a + b). Dividing 1200 in the ratio 3 : 5 gives 450 and 750.
- **Combining ratios**: if A : B = 2 : 3 and B : C = 4 : 5, make B equal in both: A : B = 8 : 12 and B : C = 12 : 15, so **A : B : C = 8 : 12 : 15**.
- **Partnership**: profit is shared in the ratio of (investment × time). Investments of 2000, 3000 and 5000 for the same period share a profit of 1500 as 300, 450 and 750.

## Averages

- Average = sum / count, so **sum = average × count**: most average problems are solved by working with sums.
- The average of 5 numbers is 20 (sum 100). After one is removed, the average of the rest is 18 (sum 72), so the removed number is 100 − 72 = **28**.
- A **weighted average** combines groups of different sizes: (n₁a₁ + n₂a₂)/(n₁ + n₂).

## Average speed

Average speed = **total distance / total time**, never the plain average of the speeds (unless equal **times** are spent at each speed).

For equal **distances** at speeds u and v, the average is the harmonic mean **2uv/(u + v)**: going at 40 km/h and returning at 60 km/h averages 2 × 40 × 60 / 100 = **48 km/h**, not 50.

## Mixtures and alligation

When two ingredients with values c₁ (cheaper) and c₂ (dearer) are mixed to get a mean value m, the quantities must be in the ratio

**(c₂ − m) : (m − c₁)**

Example: rice at ₹40/kg and ₹60/kg mixed to cost ₹46/kg needs (60 − 46) : (46 − 40) = 14 : 6 = **7 : 3**.

Another common type: 60 litres of milk and water are in the ratio 3 : 1 (45 L milk, 15 L water). To make the ratio 1 : 1, add water until it equals the milk: **30 litres**.

## Age problems

Translate each sentence into an equation in the unknown multiplier. "Five years ago, A and B's ages were in the ratio 3 : 4; five years from now they will be in the ratio 5 : 6." Let their ages five years ago be 3x and 4x. Then (3x + 10)/(4x + 10) = 5/6, so 18x + 60 = 20x + 50 and x = 5: they are now **20 and 25**.

```python
from fractions import Fraction

print("A:B:C =", (2 * 4, 3 * 4, 3 * 5))
print("removed number =", 5 * 20 - 4 * 18)
print("average speed =", 2 * 40 * 60 / (40 + 60), "km/h")
print("alligation ratio =", Fraction(60 - 46, 46 - 40))
x = next(x for x in range(1, 50) if Fraction(3 * x + 10, 4 * x + 10) == Fraction(5, 6))
print("present ages:", 3 * x + 5, "and", 4 * x + 5)
```
```output
A:B:C = (8, 12, 15)
removed number = 28
average speed = 48.0 km/h
alligation ratio = 7/3
present ages: 20 and 25
```

## Practice questions

```quiz
q: The average of 10 numbers is 25. Two of them, 30 and 40, are removed. What is the average of the remaining numbers?
answer: 22.5
verify: (10 * 25 - 30 - 40) / 8
explain: The sum is 250; removing 70 leaves 180 for 8 numbers: 180 / 8 = 22.5.
```

```quiz
q: A car covers three equal distances at 30, 60 and 90 km/h. What is its average speed in km/h? Give the answer to two decimal places.
answer: 49.09
verify: round(3 / (1 / 30 + 1 / 60 + 1 / 90), 2)
explain: For equal distances d, the total time is d/30 + d/60 + d/90 = 11d/180, so the average speed is 3d ÷ 11d/180 = 540/11 ≈ 49.09 km/h.
```

```quiz
q: Tea at ₹120/kg is mixed with tea at ₹180/kg so that the mixture costs ₹140/kg. In what ratio are the two kinds mixed (cheaper : dearer)?
- 1 : 2
* 2 : 1
- 3 : 2
- 1 : 3
explain: Alligation: (180 − 140) : (140 − 120) = 40 : 20 = 2 : 1.
```

```quiz
q: A, B and C invest ₹2000, ₹3000 and ₹5000 for the same period. Out of a profit of ₹1500, what is B's share in rupees?
answer: 450
verify: 1500 * 3000 // (2000 + 3000 + 5000)
explain: Shares are in the ratio 2 : 3 : 5, so B gets 3/10 of 1500 = 450.
```
