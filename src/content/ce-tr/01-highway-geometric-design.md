---
title: Highway Geometric Design: Sight Distance and Curves
chapter: Highway Design
description: Stopping and overtaking sight distance, superelevation and friction, extra widening, transition curve length, set-back distance, and summit and valley vertical curves as per IRC.
---
Geometric design fixes the visible shape of a road: how far drivers can see, how curves are banked, and how grades change. Indian practice follows **IRC** guidelines.

## Stopping sight distance (SSD)

The distance to perceive, react and stop:

**SSD = v t + v²/(2 g f)** (v in m/s)

- Reaction time t = **2.5 s** (IRC); longitudinal friction f = 0.35–0.40.
- On a gradient n (as a fraction): v²/(2g(f ± n)), + going uphill.
- **Intermediate sight distance** = 2 × SSD.
- On two-way single-lane roads, SSD is doubled.

## Overtaking sight distance (OSD)

OSD = d₁ + d₂ + d₃ = v_b t + (v_b T + 2s) + v T, with s = 0.7v_b + 6 m and T = √(4s/a). It applies on two-lane roads; overtaking zones are marked where OSD is available.

## Horizontal curves

**Superelevation:** e + f = v²/(g R).

- IRC design: e = **(0.75v)²/(gR)** (superelevation for 75% of the design speed, no friction), limited to **e_max = 0.07** (plain and rolling terrain), and f = 0.15.
- **Ruling minimum radius:** R = v²/(g(e + f)).
- **Extra widening** = mechanical (n l²/(2R)) + psychological (V/(9.5√R)), with l = wheelbase, n = number of lanes, V in km/h.
- **Set-back distance** to keep sight distance on a curve: m = R − (R − d) cos(α/2), with α/2 = S/(2(R − d)) for S < curve length.

## Transition curves

Spiral (clothoid) curves introduce curvature and superelevation gradually. Length from the **rate of change of centrifugal acceleration**:

**L = v³/(C R)**, with C = 80/(75 + V) (V in km/h), limited to 0.5–0.8 m/s³.

Also checked against the rate of introducing superelevation and IRC empirical minimums.

## Vertical curves

- **Deviation angle** N = |n₁ − n₂| (difference of gradients).
- **Valley (sag) curves:** designed for **headlight sight distance** and comfort; cubic parabola. For L > S: L = N S²/(1.5 + 0.035 S).
- **Summit curves:** designed for sight distance, square parabola. For L > SSD: **L = N S²/4.4** (driver eye height 1.2 m, object height 0.15 m). For OSD (both heights 1.2 m): L = N S²/9.6.

## Worked example

Design speed 80 km/h (22.22 m/s), f = 0.35, t = 2.5 s, level road.

- SSD = 22.22 × 2.5 + 22.22²/(2 × 9.81 × 0.35) = 55.6 + 71.9 = **127.5 m**.

## Practice

```quiz
q: For a design speed of 65 km/h on a curve of radius 200 m, what superelevation does the IRC formula e = (0.75v)²/(gR) give? (v in m/s, g = 9.81; give 3 decimal places.)
answer: 0.093
verify: round((0.75 * 65 / 3.6) ** 2 / (9.81 * 200), 3)
explain: v = 18.06 m/s; e = (13.54)²/1962 = 0.093. This exceeds 0.07, so e is limited to 0.07 and friction is checked.
```

```quiz
q: A vehicle travels at 20 m/s with reaction time 2.5 s and f = 0.4 (g = 9.81) on level ground. What is the SSD in m? (Give 1 decimal place.)
answer: 101
verify: round(20 * 2.5 + 20 ** 2 / (2 * 9.81 * 0.4), 1)
explain: SSD = 50 + 400/7.848 = 50 + 50.97 = 101.0 m.
```

```quiz
q: Two gradients of +3% and −2% meet at a summit. What is the deviation angle N?
answer: 0.05
verify: round(abs(0.03 - (-0.02)), 6)
explain: N = |n₁ − n₂| = 0.03 + 0.02 = 0.05.
```

```quiz
q: A summit curve must give an SSD of 120 m with N = 0.05 and L > SSD. What length (m) is needed? (Give 1 decimal place.)
answer: 163.6
verify: round(0.05 * 120 ** 2 / 4.4, 1)
explain: L = NS²/4.4 = 0.05 × 14,400/4.4 = 163.6 m (which is more than 120 m, as assumed).
```

```quiz
q: On a curve of radius 250 m, e = 0.07 and f = 0.15 (g = 9.81). What is the maximum safe speed in m/s? (Give 2 decimal places.)
answer: 23.23
verify: round((9.81 * 250 * (0.07 + 0.15)) ** 0.5, 2)
explain: v = √(gR(e + f)) = √(9.81 × 250 × 0.22) = √539.55 = 23.23 m/s.
```

```quiz
q: What is the intermediate sight distance (m) if the SSD is 90 m?
answer: 180
verify: 2 * 90
explain: ISD = 2 × SSD = 180 m.
```
