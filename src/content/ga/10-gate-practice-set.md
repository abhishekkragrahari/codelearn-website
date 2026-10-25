---
title: General Aptitude GATE Practice Set
chapter: GATE Practice
description: Mixed GATE-style General Aptitude questions on numbers, percentages, ratios, work, speed, interest, series, clocks, spatial counting, grammar, vocabulary and reasoning.
---
General Aptitude questions are short, so speed comes from knowing the shortcut for each type and checking the options quickly. These questions mix every lesson of the track; every numerical answer is recomputed by a program when the site is built.

## Quantitative

```quiz
q: **[Percentages]** A price is raised by 30% and then reduced by 30%. What is the overall percentage change? (Negative for a decrease.)
answer: -9
verify: round((1.3 * 0.7 - 1) * 100, 6)
explain: Successive changes: 30 − 30 + (30 × −30)/100 = −9%. (1.3 × 0.7 = 0.91.)
```

```quiz
q: **[Ratios]** A : B = 3 : 4 and B : C = 6 : 7. What is A : C?
- 3 : 7
* 9 : 14
- 18 : 21
- 1 : 2
explain: Make B equal: A : B = 9 : 12 and B : C = 12 : 14, so A : C = 9 : 14.
```

```quiz
q: **[Averages]** The average age of 30 students is 14 years. When the teacher's age is included, the average becomes 15 years. How old is the teacher?
answer: 45
verify: 31 * 15 - 30 * 14
explain: The students' ages total 30 × 14 = 420; with the teacher, 31 × 15 = 465. The teacher is 465 − 420 = 45.
```

```quiz
q: **[Time and work]** A can finish a job in 6 days and B in 12 days. How many days do they take working together?
answer: 4
verify:
  from fractions import Fraction as F
  print(1 / (F(1, 6) + F(1, 12)))
explain: 1/6 + 1/12 = 3/12 = 1/4 of the job per day: 4 days.
```

```quiz
q: **[Speed]** A 300 m train crosses a 200 m platform in 25 seconds. What is its speed in km/h?
answer: 72
verify: round((300 + 200) / 25 * 18 / 5, 6)
explain: It covers 300 + 200 = 500 m in 25 s, which is 20 m/s = 20 × 18/5 = 72 km/h.
```

```quiz
q: **[Interest]** What is the compound interest, in rupees, on ₹4000 at 5% per year for 2 years?
answer: 410
verify: round(4000 * 1.05 ** 2 - 4000, 2)
explain: A = 4000 × 1.05² = 4000 × 1.1025 = 4410, so CI = 410.
```

```quiz
q: **[Numbers]** What is the last digit of 3²⁰²⁷?
answer: 7
verify: pow(3, 2027, 10)
explain: Last digits of powers of 3 cycle as 3, 9, 7, 1. 2027 = 4 × 506 + 3, so 3²⁰²⁷ ends like 3³ = 27: 7.
```

## Analytical

```quiz
q: **[Series]** What comes next: 1, 2, 6, 24, 120, …?
answer: 720
verify: __import__("math").factorial(6)
explain: Each term is the previous one multiplied by 2, 3, 4, 5, …: 120 × 6 = 720 (the factorials).
```

```quiz
q: **[Clocks]** What is the smaller angle, in degrees, between the hands of a clock at 4:20?
answer: 10
verify: min(abs(30 * 4 - 5.5 * 20), 360 - abs(30 * 4 - 5.5 * 20))
explain: The angle is |30 × 4 − 5.5 × 20| = |120 − 110| = 10°.
```

```quiz
q: **[Cubes]** A painted cube is cut into 216 equal small cubes. How many small cubes have no painted face?
answer: 64
verify: (6 - 2) ** 3
explain: 216 = 6³. The unpainted cubes form the inner 4 × 4 × 4 cube: 64.
```

## Verbal

```quiz
q: **[Grammar]** Choose the correct option: "The number of applicants ______ increased this year."
* has
- have
- are
- were
explain: "The number of" is singular (it is one number), so it takes "has". ("A number of applicants have applied" would be plural.)
```

```quiz
q: **[Vocabulary]** Choose the word closest in meaning to **corroborate**.
- Contradict
* Confirm
- Collaborate
- Correct
explain: To corroborate a statement is to confirm or support it with evidence. "Collaborate" sounds similar but means to work together.
```

```quiz
q: **[Analogy]** Author : novel :: composer : ______
- Orchestra
* Symphony
- Piano
- Concert
explain: An author creates a novel; a composer creates a symphony. An orchestra performs it, a piano is an instrument, and a concert is an event.
```
