---
title: Spatial Reasoning, Clocks and Calendars
chapter: Analytical Reasoning
description: Painted cubes, counting squares and rectangles in a grid, mirror images, rotations and paper folding, the angle between clock hands, and finding the day of the week.
---
## Painted cubes

A large cube painted on all faces is cut into n × n × n small cubes. Count by position:

| Small cubes with | Where they are | Count |
| --- | --- | --- |
| 3 painted faces | Corners | 8 |
| 2 painted faces | Edges, without the corners | 12(n − 2) |
| 1 painted face | Faces, without the edges | 6(n − 2)² |
| 0 painted faces | The hidden inner cube | (n − 2)³ |

For n = 4: 8 + 24 + 24 + 8 = 64 cubes. For n = 5: 8, 36, 54 and 27.

## Counting figures in a grid

In an n × n grid of unit squares:

- **Squares** of all sizes: 1² + 2² + … + n² = n(n + 1)(2n + 1)/6. A 4 × 4 grid has 30; a chessboard (8 × 8) has 204.
- **Rectangles** (including squares): choose 2 of the n + 1 vertical lines and 2 of the n + 1 horizontal lines: C(n + 1, 2)². A 4 × 4 grid has 100; a chessboard has 1296.

## Mirror images, rotations and paper folding

- A **mirror** reflects left and right (for a vertical mirror) but not top and bottom. In a mirror, a clock showing 3:00 looks like 9:00; the mirror time is 12:00 − actual time (11:60 − actual time for minutes).
- A **rotation** keeps the figure's handedness; check where one distinctive mark goes and whether the order of the others (clockwise or anticlockwise) is preserved.
- **Paper folding and punching**: each fold doubles the number of holes; unfold step by step, reflecting the holes across each fold line.

## Clocks

The minute hand moves 6° per minute and the hour hand 0.5° per minute (30° per hour). At h hours and m minutes, the angle between them is

**|30h − 5.5m|** (subtract from 360° if it exceeds 180°).

- At 3:40: |90 − 220| = **130°**.
- At 9:15: |270 − 82.5| = 187.5°, so the smaller angle is **172.5°**.
- The hands overlap every 720/11 ≈ 65.45 minutes, which is **11 times** in 12 hours (not 12).

## Calendars

- An ordinary year is 52 weeks + 1 day, a leap year 52 weeks + 2 days: the same date moves 1 weekday forward each year, 2 after a 29 February.
- **Leap years**: divisible by 4, except century years, which must be divisible by 400 (2000 was a leap year, 1900 was not).
- The **odd days** method counts the remainder of the number of days modulo 7.

Python's `datetime` gives quick checks:

```python
import datetime
from math import comb

def painted_cubes(n):
    return {"3 faces": 8, "2 faces": 12 * (n - 2), "1 face": 6 * (n - 2) ** 2, "0 faces": (n - 2) ** 3}

def clock_angle(h, m):
    a = abs(30 * h - 5.5 * m) % 360
    return min(a, 360 - a)

print("4x4x4 painted cube:", painted_cubes(4))
print("squares in 8x8:", sum(k * k for k in range(1, 9)), "| rectangles:", comb(9, 2) ** 2)
print("angle at 3:40 =", clock_angle(3, 40), "| at 9:15 =", clock_angle(9, 15))
print("15 August 2047 is a", datetime.date(2047, 8, 15).strftime("%A"))
```
```output
4x4x4 painted cube: {'3 faces': 8, '2 faces': 24, '1 face': 24, '0 faces': 8}
squares in 8x8: 204 | rectangles: 1296
angle at 3:40 = 130.0 | at 9:15 = 172.5
15 August 2047 is a Thursday
```

## Practice questions

```quiz
q: A cube painted on all faces is cut into 125 equal small cubes. How many small cubes have exactly two painted faces?
answer: 36
verify: 12 * (5 - 2)
explain: 125 = 5³, so n = 5. Cubes with two painted faces lie along the 12 edges, excluding the corners: 12 × (5 − 2) = 36.
```

```quiz
q: How many rectangles (including squares) are there in a 5 × 5 grid of unit squares?
answer: 225
verify: __import__("math").comb(6, 2) ** 2
explain: A rectangle is fixed by choosing 2 of the 6 vertical lines and 2 of the 6 horizontal lines: C(6, 2)² = 15² = 225.
```

```quiz
q: What is the smaller angle, in degrees, between the hands of a clock at 2:30?
answer: 105
verify: min(abs(30 * 2 - 5.5 * 30), 360 - abs(30 * 2 - 5.5 * 30))
explain: The angle is |30 × 2 − 5.5 × 30| = |60 − 165| = 105°. (The hour hand has moved half-way from 2 to 3.)
```

```quiz
q: 1 January 2030 falls on a Tuesday. On which day does 1 January 2031 fall?
code: python
  import datetime
  print(datetime.date(2031, 1, 1).strftime("%A"))
- `Tuesday`
* `Wednesday`
- `Thursday`
- `Monday`
explain: 2030 is not a leap year, so it has 365 = 52 × 7 + 1 days: the date moves one weekday forward, from Tuesday to Wednesday.
```

```quiz
q: How many times do the hour and minute hands of a clock overlap in 24 hours?
answer: 22
verify: 2 * 11
explain: The minute hand gains 360° on the hour hand every 720/11 minutes, so the hands overlap 11 times in 12 hours and 22 times in 24 hours.
```
