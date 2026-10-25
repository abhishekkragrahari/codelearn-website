---
title: Numbers and Percentages
chapter: Quantitative Aptitude
description: Divisibility rules, HCF and LCM, remainders and last digits, counting multiples, percentages, percentage change and successive changes.
---
General Aptitude carries 15 of GATE's 100 marks, the same in every paper. Its quantitative questions need no advanced mathematics, only careful, quick arithmetic. This lesson covers the number facts that appear most often.

## Divisibility rules

| Divisible by | Rule |
| --- | --- |
| 2, 5, 10 | Last digit is even / 0 or 5 / 0 |
| 3, 9 | Sum of digits divisible by 3 / 9 |
| 4 | Last two digits divisible by 4 |
| 8 | Last three digits divisible by 8 |
| 6 | Divisible by 2 and by 3 |
| 11 | (Sum of digits in odd positions) − (sum in even positions) is a multiple of 11 |

## HCF and LCM

- **HCF** (GCD): the largest number dividing all of them. **LCM**: the smallest number all of them divide.
- For two numbers: **HCF × LCM = product of the numbers**. HCF(84, 126) = 42, so LCM = 84 × 126 / 42 = 252.
- Word problems: "largest tile that fits exactly" → HCF; "when will the bells ring together again" → LCM.
- The smallest number that leaves remainder 3 when divided by 4, 6 or 10 is LCM(4, 6, 10) + 3 = 63.

## Remainders and last digits

Work with remainders instead of huge numbers:

- (a × b) mod n = ((a mod n) × (b mod n)) mod n, and similarly for sums.
- Powers repeat in **cycles**: 2¹, 2², 2³ mod 7 are 2, 4, 1, then the cycle repeats with length 3. Since 100 = 3 × 33 + 1, 2¹⁰⁰ mod 7 = 2¹ mod 7 = **2**.
- Last digits repeat with cycle length at most 4: 7¹, 7², 7³, 7⁴ end in 7, 9, 3, 1. Since 2026 = 4 × 506 + 2, 7²⁰²⁶ ends in **9**.

## Counting multiples

- Multiples of k from 1 to N: ⌊N / k⌋.
- Multiples of k between a and b: ⌊b / k⌋ − ⌊(a − 1) / k⌋. Three-digit multiples of 7: ⌊999/7⌋ − ⌊99/7⌋ = 142 − 14 = 128.
- "Divisible by 2 or 3" from 1 to 100, by inclusion–exclusion: 50 + 33 − 16 = 67.

```python
from math import gcd, lcm

print("HCF(84, 126) =", gcd(84, 126), "| LCM(84, 126) =", lcm(84, 126))
print("2^100 mod 7 =", pow(2, 100, 7), "| last digit of 7^2026 =", pow(7, 2026, 10))
print("three-digit multiples of 7:", sum(1 for n in range(100, 1000) if n % 7 == 0))
print("1..100 divisible by 2 or 3:", sum(1 for n in range(1, 101) if n % 2 == 0 or n % 3 == 0))
```
```output
HCF(84, 126) = 42 | LCM(84, 126) = 252
2^100 mod 7 = 2 | last digit of 7^2026 = 9
three-digit multiples of 7: 128
1..100 divisible by 2 or 3: 67
```

## Percentages

- x% of y = x·y / 100.
- **Percentage change** = (new − old) / old × 100.
- **Successive changes** of a% and b% combine to **a + b + ab/100** percent (not a + b). A 20% rise followed by a 20% fall gives 20 − 20 − 400/100 = **−4%**.
- If A is r% more than B, then B is r/(100 + r) × 100 % less than A. A price that rises 25% must fall 20% to return to the start (25/125 = 20%).

A worked example: a shop raises a price by 15% and then gives a 10% discount. The net change is 15 − 10 − 150/100 = **+3.5%**: the customer still pays more than the original price.

## Practice questions

```quiz
q: What is the remainder when 3¹⁰⁰ is divided by 5?
answer: 1
verify: pow(3, 100, 5)
explain: Powers of 3 mod 5 cycle with length 4: 3, 4, 2, 1. Since 100 is a multiple of 4, 3¹⁰⁰ ≡ 1 (mod 5).
```

```quiz
q: The population of a town rises by 10% in one year and by 10% again the next. By what percentage has it risen over the two years?
answer: 21
verify: round((1.1 * 1.1 - 1) * 100, 6)
explain: Successive changes: 10 + 10 + (10 × 10)/100 = 21%. (1.1 × 1.1 = 1.21.)
```

```quiz
q: How many integers from 1 to 500 are divisible by neither 4 nor 6?
answer: 333
verify: sum(1 for n in range(1, 501) if n % 4 and n % 6)
explain: Divisible by 4: 125; by 6: 83; by both, that is by LCM(4, 6) = 12: 41. Divisible by 4 or 6: 125 + 83 − 41 = 167. Divisible by neither: 500 − 167 = 333.
```

```quiz
q: Three bells ring at intervals of 12, 18 and 30 minutes. They ring together at 9:00. After how many minutes will they next ring together?
answer: 180
verify: __import__("math").lcm(12, 18, 30)
explain: They ring together after the LCM of the intervals: LCM(12, 18, 30) = 180 minutes, at 12:00.
```

```quiz
q: A's salary is 25% more than B's. By what percentage is B's salary less than A's?
- 25%
* 20%
- 15%
- 30%
explain: If B earns 100, A earns 125. B is 25 less than A, and 25/125 = 20%.
```
