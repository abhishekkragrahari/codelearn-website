---
title: Distance Measurement, Levelling and Errors
chapter: Surveying Basics
description: Principles of surveying, chain and tape corrections, levelling with height of instrument and rise-and-fall methods, curvature and refraction, reciprocal levelling, and theory of errors.
---
Surveying fixes the relative positions of points. The two basic measurements are **distances** and **heights**.

## Principles

1. Work from the whole to the part (control first, details later).
2. Fix each new point by at least two independent measurements.

## Tape corrections

| Correction | Formula | Sign |
| --- | --- | --- |
| Temperature | α L (T − T₀) | + if hotter |
| Pull (tension) | (P − P₀) L/(A E) | + if more pull |
| Sag | w² L³/(24 P²) | Always − |
| Slope | h²/(2L) (approximately) | Always − |
| Standardisation | L(l′ − l)/l | Depends on tape |

**Normal tension** is the pull at which the pull and sag corrections cancel.

**Wrong tape length:** true length = measured length × (actual tape length/nominal tape length). Areas use the square of that ratio.

## Levelling

- **Back sight (BS):** first reading after setting up, on a point of known level. **Fore sight (FS):** last reading before moving. Intermediate sights in between.
- **Height of instrument (HI) method:** HI = RL + BS; RL of a point = HI − its staff reading. Check: ΣBS − ΣFS = last RL − first RL.
- **Rise and fall method:** compares consecutive readings; it checks intermediate sights too (ΣBS − ΣFS = ΣRise − ΣFall = last RL − first RL).

## Curvature and refraction

- Curvature correction c_c = **0.0785 d²** m (d in km), negative.
- Refraction correction = 0.0112 d² (one-seventh of curvature), positive.
- **Combined correction = −0.0673 d²** m.
- **Distance to the visible horizon:** d = 3.855 √h km (h in m), with refraction.
- **Reciprocal levelling** eliminates curvature, refraction and collimation errors: true difference = average of the two apparent differences.

## Theory of errors

- **Systematic errors** follow a rule and can be corrected; **random errors** follow the normal distribution.
- **Most probable value** of equally weighted observations = their mean.
- Probable error of a single observation: 0.6745 √(Σv²/(n − 1)); of the mean: that divided by √n.
- **Weights** are inversely proportional to variance; for levelling lines, inversely proportional to length.

## Worked example

A 30 m tape is found to be 30.02 m long. A line measured with it is 600 m.

- True length = 600 × 30.02/30 = **600.4 m**.

## Practice

```quiz
q: What is the combined curvature and refraction correction (m) for a sight of 2 km? (Give 4 decimal places.)
answer: -0.2692
verify: round(-0.0673 * 2 ** 2, 4)
explain: −0.0673 × 4 = −0.2692 m.
```

```quiz
q: A 20 m tape is actually 19.95 m long. A distance measured with it is 500 m. What is the true distance in m?
answer: 498.75
verify: round(500 * 19.95 / 20, 6)
explain: True = 500 × 19.95/20 = 498.75 m (a short tape over-measures).
```

```quiz
q: The RL of a benchmark is 100.000 m. The back sight on it is 1.250 m and the fore sight on point A is 2.150 m. What is the RL of A?
answer: 99.1
verify: round(100.000 + 1.250 - 2.150, 3)
explain: HI = 101.250 m; RL of A = 101.250 − 2.150 = 99.100 m.
```

```quiz
q: A 30 m tape weighing 0.6 kg is held at a pull of 6 kg (w = 0.02 kg/m). What is the sag correction in mm? (Give 1 decimal place.)
answer: 12.5
verify: round(0.02 ** 2 * 30 ** 3 / (24 * 6 ** 2) * 1000, 1)
explain: c = w²L³/(24P²) = 0.0004 × 27,000/864 = 0.0125 m = 12.5 mm (negative).
```

```quiz
q: A staff reads 1.525 m on a benchmark of RL 200.000 m (back sight) and 2.025 m on point P (fore sight). What is the RL of P in m?
answer: 199.5
verify: round(200 + 1.525 - 2.025, 3)
explain: HI = 201.525; RL = 201.525 − 2.025 = 199.500 m.
```

```quiz
q: What is the curvature correction (m) for a sight of 1 km? (Give 4 decimal places.)
answer: -0.0785
verify: round(-0.0785 * 1 ** 2, 4)
explain: c_c = −0.0785 d² = −0.0785 m.
```
