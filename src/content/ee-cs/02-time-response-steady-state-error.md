---
title: Time Response and Steady-State Error
chapter: Time Domain
description: First and second-order step responses, damping ratio and natural frequency, rise time, peak time, overshoot and settling time, system type, error constants and steady-state error.
---
How fast and how accurately does a system follow its input? The **transient response** answers the first; the **steady-state error** the second.

## First-order systems

T(s) = 1/(τs + 1): step response c(t) = 1 − e^(−t/τ).

- Time constant τ; 2% settling time 4τ; rise time (10–90%) 2.2τ.

## Second-order systems

**T(s) = ω_n²/(s² + 2ζω_n s + ω_n²)**

For an underdamped step response (0 < ζ < 1), with ω_d = ω_n√(1 − ζ²):

| Specification | Formula |
| --- | --- |
| Peak time | t_p = π/ω_d |
| **Peak overshoot** | **M_p = e^(−πζ/√(1−ζ²))** |
| Settling time (2%) | t_s = 4/(ζω_n) (5%: 3/(ζω_n)) |
| Rise time (0–100%) | t_r = (π − θ)/ω_d, with cos θ = ζ |

- ζ = 0: undamped oscillation. ζ = 1: critically damped. ζ > 1: overdamped.
- Overshoot depends only on ζ: 0.5 → 16.3%, 0.6 → 9.5%, 0.7 → 4.6%.
- Adding a zero increases overshoot; adding a pole slows the response.

## Steady-state error

For unity feedback with open-loop G(s), the **type** is the number of poles of G(s) at s = 0.

| Input | Error constant | e_ss |
| --- | --- | --- |
| Step A | K_p = lim G(s) | A/(1 + K_p) |
| Ramp A t | K_v = lim s G(s) | A/K_v |
| Parabola A t²/2 | K_a = lim s² G(s) | A/K_a |

| Type | Step | Ramp | Parabola |
| --- | --- | --- | --- |
| 0 | A/(1 + K) | ∞ | ∞ |
| 1 | 0 | A/K_v | ∞ |
| 2 | 0 | 0 | A/K_a |

Higher type and higher gain reduce the error, but may make the system less stable.

## Worked example

Unity feedback with G(s) = 25/(s(s + 6)).

- Closed loop: 25/(s² + 6s + 25): ω_n = 5, ζ = 0.6.
- M_p = e^(−0.6π/0.8) = **9.5%**; t_s = 4/3 = **1.33 s**; t_p = π/4 = 0.785 s.
- Type 1: K_v = 25/6, so e_ss (unit ramp) = **0.24**.

## Practice

```quiz
q: A second-order system has ω_n = 10 rad/s and ζ = 0.5. What is its peak time in seconds? (Give 4 decimal places.)
answer: 0.3628
verify: round(__import__("math").pi / (10 * (1 - 0.25) ** 0.5), 4)
explain: ω_d = 10√0.75 = 8.660; t_p = π/8.660 = 0.3628 s.
```

```quiz
q: What is the peak overshoot (percent) of a second-order system with ζ = 0.6? (Give 2 decimal places.)
answer: 9.48
verify: round(100 * __import__("math").exp(-__import__("math").pi * 0.6 / 0.8), 2)
explain: M_p = e^(−0.6π/0.8) = e^(−2.356) = 0.0948 = 9.48%.
```

```quiz
q: A type-0 unity-feedback system has K_p = 19. What is its steady-state error for a unit step?
answer: 0.05
verify: 1 / (1 + 19)
explain: e_ss = 1/(1 + K_p) = 1/20 = 0.05.
```

```quiz
q: A type-2 system with a ramp input has a steady-state error of:
* Zero
- A finite non-zero value
- Infinity
- 1/K_a
explain: Type 2 has K_v = ∞, so the ramp error is zero; it has a finite error only for a parabolic input.
```
