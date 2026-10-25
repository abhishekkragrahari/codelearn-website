---
title: Profit, Loss and Interest
chapter: Quantitative Aptitude
description: Cost price, selling price and marked price, profit and loss percentages, successive discounts, simple interest, compound interest (yearly and more often), and the difference between them.
---
## Profit and loss

| Term | Meaning |
| --- | --- |
| Cost price (CP) | What the seller paid |
| Selling price (SP) | What the buyer pays |
| Marked price (MP) | The list price, before discount |
| Profit % | (SP − CP)/CP × 100 (always on the **cost** price) |
| Discount % | (MP − SP)/MP × 100 (always on the **marked** price) |

- Bought for ₹400 and sold for ₹500: profit 100/400 = **25%**.
- **Successive discounts** combine like successive percentage changes: 20% and then 10% off ₹1000 gives 1000 × 0.8 × 0.9 = ₹720, a single discount of **28%** (not 30%).
- If selling at a 10% profit instead of a 10% loss earns ₹50 more, the 20-point difference is ₹50, so CP = **₹250**.
- A dishonest seller who sells at cost price but gives 900 g for every kilogram gains 100/900 = **11.11%**.

## Simple interest

**SI = P × r × t / 100** for principal P, rate r% per year and t years. The amount is A = P + SI. ₹5000 at 8% for 3 years earns 5000 × 8 × 3 / 100 = **₹1200**.

## Compound interest

Interest is added to the principal each period, so it earns interest itself:

**A = P (1 + r/100)ᵗ**, CI = A − P.

- ₹10,000 at 10% for 2 years: A = 10000 × 1.1² = 12,100, so CI = **₹2100**, while SI would be ₹2000.
- Compounded **k times a year**, use rate r/k per period and kt periods: ₹8000 at 10% per year compounded half-yearly for one year gives 8000 × 1.05² = 8820, interest **₹820**.
- **CI − SI for 2 years = P (r/100)²**: on ₹10,000 at 10% that is ₹100. For 3 years it is P (r/100)² (3 + r/100).
- **Doubling time** at r% compound interest is about 72/r years (the "rule of 72"): at 8%, log 2 / log 1.08 ≈ 9.01 years.

```python
import math

def compound(P, rate, years, times_per_year=1):
    return P * (1 + rate / 100 / times_per_year) ** (years * times_per_year)

print("profit %:", (500 - 400) / 400 * 100)
print("successive discounts 20% + 10% =", round(100 - 100 * 0.8 * 0.9, 2), "% in one go")
print("SI on 5000 at 8% for 3 years:", 5000 * 8 * 3 / 100)
print("CI on 10000 at 10% for 2 years:", round(compound(10000, 10, 2) - 10000, 2))
print("half-yearly CI on 8000 at 10% for 1 year:", round(compound(8000, 10, 1, 2) - 8000, 2))
print("doubling time at 8%:", round(math.log(2) / math.log(1.08), 2), "years (rule of 72 gives 9)")
```
```output
profit %: 25.0
successive discounts 20% + 10% = 28.0 % in one go
SI on 5000 at 8% for 3 years: 1200.0
CI on 10000 at 10% for 2 years: 2100.0
half-yearly CI on 8000 at 10% for 1 year: 820.0
doubling time at 8%: 9.01 years (rule of 72 gives 9)
```

## Practice questions

```quiz
q: What is the compound interest, in rupees, on ₹15,000 at 12% per year for 2 years, compounded yearly?
answer: 3816
verify: round(15000 * 1.12 ** 2 - 15000, 2)
explain: A = 15000 × 1.12² = 15000 × 1.2544 = 18,816, so CI = 3816.
```

```quiz
q: A shopkeeper marks an article 25% above its cost price and then gives a 10% discount. What is the profit percentage?
answer: 12.5
verify: round((1.25 * 0.9 - 1) * 100, 6)
explain: SP = CP × 1.25 × 0.9 = 1.125 × CP, a profit of 12.5%.
```

```quiz
q: What is the difference between compound interest and simple interest on ₹1000 at 10% per year for 3 years?
answer: 31
verify: round(1000 * 1.1 ** 3 - 1000 - 1000 * 10 * 3 / 100, 2)
explain: CI = 1000 × 1.331 − 1000 = 331 and SI = 300, so the difference is 31 (which matches P(r/100)²(3 + r/100) = 1000 × 0.01 × 3.1 = 31).
```

```quiz
q: A trader gets two successive discounts of 15% and 10% on the marked price. What single discount is equivalent?
- 25%
* 23.5%
- 24%
- 22.5%
explain: The price becomes 0.85 × 0.90 = 0.765 of the marked price, a single discount of 23.5% (= 15 + 10 − 15 × 10/100).
```
