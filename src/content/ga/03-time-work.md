---
title: Time and Work, Pipes and Cisterns
chapter: Quantitative Aptitude
description: Work rates, people working together and in shifts, the man-days rule, and pipes that fill and empty a tank.
---
The key idea: convert "does the job in n days" into a **rate** of 1/n of the job per day. Rates of people working at the same time **add**; the time taken is 1 / (total rate).

## Working together

- A finishes a job in 10 days and B in 15 days. Together: 1/10 + 1/15 = 1/6 of the job per day, so **6 days**.
- A, B and C take 12, 15 and 20 days: 1/12 + 1/15 + 1/20 = 12/60 = 1/5, so **5 days**.
- A and B together take 8 days and A alone takes 12. Then B's rate is 1/8 − 1/12 = 1/24: **24 days** alone.

## Working in shifts

A alone takes 20 days, B alone 30. A works alone for 5 days, then B joins. After 5 days, 5/20 = 1/4 of the job is done; the remaining 3/4 at the joint rate 1/20 + 1/30 = 1/12 takes 9 days. The job takes **14 days** in all.

## Man-days

If the work is fixed, (number of workers) × (days) × (hours per day) is constant:

**M₁D₁H₁ = M₂D₂H₂** (and if the amount of work changes, divide each side by its work W).

10 workers take 12 days, so 15 workers take 10 × 12 / 15 = **8 days**.

## Pipes and cisterns

A filling pipe has a positive rate and a leak or emptying pipe a negative one. A pipe fills a tank in 6 hours and a leak empties it in 9 hours: 1/6 − 1/9 = 1/18, so with both open the tank fills in **18 hours**.

```python
from fractions import Fraction as F

def together(*days):
    """Days needed when workers with the given single-handed times work together (negative = emptying)."""
    return 1 / sum(F(1, d) for d in days)

print("A 10, B 15:", together(10, 15), "days")
print("A 12, B 15, C 20:", together(12, 15, 20), "days")
print("B alone:", 1 / (F(1, 8) - F(1, 12)), "days")
print("fill 6 h, leak 9 h:", together(6, -9), "hours")
remaining = 1 - F(5, 20)
print("shift problem:", 5 + remaining / (F(1, 20) + F(1, 30)), "days in total")
```
```output
A 10, B 15: 6 days
A 12, B 15, C 20: 5 days
B alone: 24 days
fill 6 h, leak 9 h: 18 hours
shift problem: 14 days in total
```

## Practice questions

```quiz
q: A can do a job in 18 days and B in 24 days. They work together for 4 days, and then A leaves. How many more days does B need to finish the job? Give the answer to two decimal places.
answer: 14.67
verify:
  from fractions import Fraction as F
  done = 4 * (F(1, 18) + F(1, 24))
  print(round(float((1 - done) / F(1, 24)), 2))
explain: In 4 days they do 4 × (1/18 + 1/24) = 4 × 7/72 = 7/18 of the job. The remaining 11/18 at B's rate 1/24 takes 11/18 × 24 = 44/3 ≈ 14.67 days.
```

```quiz
q: Pipes A and B fill a tank in 12 and 15 hours; pipe C empties it in 20 hours. With all three open, how many hours does it take to fill the empty tank?
answer: 10
verify:
  from fractions import Fraction as F
  print(1 / (F(1, 12) + F(1, 15) - F(1, 20)))
explain: Net rate 1/12 + 1/15 − 1/20 = (5 + 4 − 3)/60 = 1/10 of the tank per hour: 10 hours.
```

```quiz
q: 12 workers working 8 hours a day finish a job in 10 days. How many days do 16 workers working 6 hours a day take for the same job?
answer: 10
verify: 12 * 8 * 10 / (16 * 6)
explain: The total work is 12 × 8 × 10 = 960 worker-hours. 16 workers × 6 hours = 96 worker-hours per day, so 960 / 96 = 10 days.
```

```quiz
q: A is twice as efficient as B, and together they finish a job in 12 days. How many days would A take alone?
answer: 18
verify:
  from fractions import Fraction as F
  b = F(1, 12) / 3
  print(1 / (2 * b))
explain: If B's rate is r, A's is 2r and 3r = 1/12, so r = 1/36. A's rate is 2/36 = 1/18: 18 days.
```
