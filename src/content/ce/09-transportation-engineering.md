---
title: Transportation Engineering
chapter: Transportation Engineering
description: GATE CE syllabus for transportation engineering, with sight distances, superelevation, pavement materials and design, traffic flow relationships, capacity and signal design by Webster's method, with solved examples.
---
## Syllabus

- **Transportation infrastructure**: highway alignment, geometric design (cross-section, sight distances, horizontal and vertical curves, superelevation), pavement materials and their tests (aggregate, bitumen, soil).
- **Highway pavements**: design of flexible pavements (CBR method, IRC:37) and rigid pavements (Westergaard, IRC:58), traffic loading (standard axle, vehicle damage factor).
- **Traffic engineering**: traffic studies (volume, speed, origin-destination), speed-flow-density relationships, capacity and level of service, intersection and signal design.

## Key concepts and formulas

**Stopping sight distance** (v in m/s, reaction time t, coefficient of longitudinal friction f): **SSD = vt + v²/(2gf)**. With speed V in km/h: SSD = 0.278Vt + V²/(254f). IRC uses t = 2.5 s.

**Superelevation.** e + f = V²/(127R) (V in km/h, R in m). IRC limits e to 0.07 (plain and rolling terrain) and takes f = 0.15.

**Overtaking sight distance.** OSD = d₁ + d₂ + d₃, the distances travelled during reaction, overtaking and by the opposing vehicle.

**Curves.** Extra widening, transition curve length L = v³/(CR), and the length of a summit curve for sight distance S (when L > S): L = NS²/(2(√H + √h)²), with N the algebraic difference of grades.

**Traffic flow.**

- Fundamental relation: **q = kv** (flow = density × speed).
- **Greenshields' model**: v = v<sub>f</sub>(1 − k/k<sub>j</sub>). Maximum flow **q<sub>max</sub> = v<sub>f</sub>k<sub>j</sub>/4**, at k = k<sub>j</sub>/2 and v = v<sub>f</sub>/2.
- Space mean speed is the harmonic mean of spot speeds; time mean speed is their arithmetic mean, and is never smaller.

**Signal design (Webster).** Optimum cycle length **C₀ = (1.5L + 5)/(1 − Y)**, with total lost time L (s) and Y = Σ y<sub>i</sub>, the sum of the critical flow ratios (flow/saturation flow). The effective green time is shared in proportion to y<sub>i</sub>.

**Pavements.** Flexible pavement thickness comes from the CBR of the subgrade and the cumulative standard axles. The **fourth power law**: the damage of an axle load relative to the standard axle (80 kN) is (W/80)⁴. Rigid pavements are checked for wheel load stresses at the interior, edge and corner (Westergaard), plus temperature stresses.

## Worked example

Find the SSD for a design speed of 80 km/h (t = 2.5 s, f = 0.35). Then, for Greenshields' model with v<sub>f</sub> = 80 km/h and k<sub>j</sub> = 120 veh/km, find the capacity. Finally, design the cycle length for L = 12 s and critical flow ratios 0.30 and 0.25.

```python
V, t, f = 80, 2.5, 0.35
ssd = 0.278 * V * t + V ** 2 / (254 * f)
print(f"SSD = {ssd:.2f} m")
vf, kj = 80, 120
print(f"q_max = {vf * kj / 4:.0f} veh/h at k = {kj / 2:.0f} veh/km and v = {vf / 2:.0f} km/h")
L, Y = 12, 0.30 + 0.25
C0 = (1.5 * L + 5) / (1 - Y)
print(f"Webster cycle = {C0:.2f} s")
print(f"damage of a 100 kN axle relative to 80 kN: {(100 / 80) ** 4:.3f}")
```
```output
SSD = 127.59 m
q_max = 2400 veh/h at k = 60 veh/km and v = 40 km/h
Webster cycle = 51.11 s
damage of a 100 kN axle relative to 80 kN: 2.441
```

## Practice questions

```quiz
q: Using the fourth power law, how many standard axles (80 kN) is one 160 kN axle equivalent to?
answer: 16
verify: (160 / 80) ** 4
explain: (160/80)⁴ = 2⁴ = 16 standard axles. Doubling the axle load multiplies the damage by 16.
```

```quiz
q: In Greenshields' model, the free speed is 60 km/h and the jam density is 160 veh/km. What is the capacity in veh/h?
answer: 2400
verify: 60 * 160 / 4
explain: q<sub>max</sub> = v<sub>f</sub>k<sub>j</sub>/4 = 60 × 160/4 = 2400 veh/h.
```

```quiz
q: A curve of radius 300 m is designed for 90 km/h with f = 0.15. What superelevation is needed? Give the answer to four decimal places.
answer: 0.0626
verify: round(90 ** 2 / (127 * 300) - 0.15, 4)
explain: e = V²/(127R) − f = 8100/38100 − 0.15 ≈ 0.2126 − 0.15 = 0.0626.
```

```quiz
q: An intersection has a total lost time of 10 s per cycle and Y = 0.5. What is the optimum cycle length by Webster's method, in seconds?
answer: 40
verify: (1.5 * 10 + 5) / (1 - 0.5)
explain: C₀ = (1.5 × 10 + 5)/(1 − 0.5) = 20/0.5 = 40 s.
```

```quiz
q: Spot speeds of three vehicles are 40, 60 and 120 km/h. What is the space mean speed in km/h?
answer: 60
verify: round(3 / (1 / 40 + 1 / 60 + 1 / 120), 4)
explain: Space mean speed is the harmonic mean: 3/(1/40 + 1/60 + 1/120) = 3/(6/120) = 60 km/h. The time mean speed is the arithmetic mean, about 73.3 km/h.
```
