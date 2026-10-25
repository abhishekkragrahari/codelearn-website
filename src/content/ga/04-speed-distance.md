---
title: Speed, Distance and Time
chapter: Quantitative Aptitude
description: Distance = speed × time, unit conversion, relative speed, trains passing poles, platforms and each other, boats in streams, and meeting problems.
---
Everything follows from **distance = speed × time**, applied with consistent units.

## Units

To convert km/h to m/s, multiply by **5/18**; to convert m/s to km/h, multiply by **18/5**. So 72 km/h = 20 m/s and 54 km/h = 15 m/s.

## Relative speed

When two objects move:

- in **opposite** directions (towards or away from each other), the relative speed is the **sum** of their speeds;
- in the **same** direction, it is the **difference**.

Two people 100 km apart walk towards each other at 20 and 30 km/h: they meet after 100 / (20 + 30) = **2 hours**.

## Trains

A train of length L must travel:

| To pass | Distance covered |
| --- | --- |
| A pole or a standing person | L |
| A platform or bridge of length P | L + P |
| Another train of length L₂ | L + L₂ (at the relative speed) |

- A 200 m train at 72 km/h (20 m/s) passes a pole in 200/20 = **10 s**, and a 300 m platform in 500/20 = **25 s**.
- Trains of 150 m and 100 m at 60 and 30 km/h: in opposite directions, the relative speed is 90 km/h = 25 m/s, so they pass in 250/25 = **10 s**; in the same direction, 30 km/h = 25/3 m/s, so **30 s**.

## Boats and streams

With boat speed b in still water and stream speed s: downstream speed = b + s, upstream speed = b − s. So **b = (down + up)/2** and **s = (down − up)/2**. If a boat goes 15 km/h downstream and 9 km/h upstream, b = 12 km/h and s = 3 km/h.

```python
kmh = lambda v: v * 5 / 18                    # km/h -> m/s

print("pole:", 200 / kmh(72), "s | platform:", (200 + 300) / kmh(72), "s")
print("trains, opposite:", round(250 / kmh(60 + 30), 2), "s | same direction:", round(250 / kmh(60 - 30), 2), "s")
down, up = 15, 9
print("boat speed:", (down + up) / 2, "km/h | stream:", (down - up) / 2, "km/h")
print("meeting time:", 100 / (20 + 30), "hours")
```
```output
pole: 10.0 s | platform: 25.0 s
trains, opposite: 10.0 s | same direction: 30.0 s
boat speed: 12.0 km/h | stream: 3.0 km/h
meeting time: 2.0 hours
```

## Practice questions

```quiz
q: A 180 m train passes a man walking at 6 km/h in the same direction in 12 seconds. What is the speed of the train in km/h?
answer: 60
verify: round(180 / 12 * 18 / 5 + 6, 6)
explain: The relative speed is 180/12 = 15 m/s = 54 km/h. Since they move in the same direction, the train's speed is 54 + 6 = 60 km/h.
```

```quiz
q: A boat goes 24 km downstream in 2 hours and returns upstream in 3 hours. What is the speed of the stream in km/h?
answer: 2
verify: (24 / 2 - 24 / 3) / 2
explain: Downstream speed 12 km/h, upstream 8 km/h. Stream speed = (12 − 8)/2 = 2 km/h (and the boat's speed is 10 km/h).
```

```quiz
q: How many seconds does a 240 m train at 54 km/h take to cross a 360 m bridge?
answer: 40
verify: (240 + 360) / (54 * 5 / 18)
explain: It must cover 240 + 360 = 600 m at 54 km/h = 15 m/s: 600 / 15 = 40 s.
```

```quiz
q: Two cyclists start at the same time from towns 90 km apart and ride towards each other at 12 km/h and 18 km/h. How far from the first cyclist's town do they meet, in km?
answer: 36
verify: 12 * 90 / (12 + 18)
explain: They close the gap at 30 km/h and meet after 3 hours, when the first cyclist has ridden 12 × 3 = 36 km.
```
