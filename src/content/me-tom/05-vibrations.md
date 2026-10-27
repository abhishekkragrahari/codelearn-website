---
title: Free, Damped and Forced Vibrations
chapter: Vibrations
description: Natural frequency of single-degree-of-freedom systems, damping ratio and logarithmic decrement, forced vibration and resonance, transmissibility, vibration isolation and critical speed of shafts.
---
Every elastic system with mass can vibrate. GATE ME focuses on the **single degree of freedom** (SDOF) spring–mass–damper system, which explains natural frequency, damping, resonance and isolation.

## Free undamped vibration

Equation of motion: m ẍ + kx = 0.

- **Natural frequency** ω_n = √(k/m) rad/s; f_n = ω_n/(2π) Hz.
- Using static deflection δ = mg/k: **ω_n = √(g/δ)**.
- Torsional system: ω_n = √(k_t/I). Simple pendulum: ω_n = √(g/L).
- **Energy method:** write T + U = constant and differentiate; the coefficient form m_eq ẍ + k_eq x = 0 gives ω_n = √(k_eq/m_eq).

**Effective stiffness:** springs in parallel add; in series their reciprocals add. A cantilever with an end mass has k = 3EI/L³; a simply supported beam with a central mass has k = 48EI/L³.

## Free damped vibration

m ẍ + c ẋ + kx = 0.

- Critical damping c_c = 2√(km) = 2mω_n. **Damping ratio ζ = c/c_c.**
- ζ < 1: underdamped (oscillates); ζ = 1: critically damped (fastest return without oscillation); ζ > 1: overdamped.
- Damped frequency ω_d = ω_n √(1 − ζ²).
- **Logarithmic decrement** δ = ln(x₁/x₂) = 2πζ/√(1 − ζ²) ≈ 2πζ for small ζ.

## Forced vibration

With a harmonic force F₀ sin ωt and frequency ratio r = ω/ω_n:

- **Magnification factor** X/(F₀/k) = 1/√[(1 − r²)² + (2ζr)²].
- At **resonance** (r = 1), the amplitude is F₀/(2ζk), limited only by damping.
- **Transmissibility** T = √[1 + (2ζr)²]/√[(1 − r²)² + (2ζr)²].
- **Isolation** (T < 1) needs **r > √2**. Above that, more damping makes isolation worse.

## Whirling of shafts

The **critical speed** of a shaft carrying a rotor equals its natural frequency of transverse vibration: ω_c = √(g/δ) with δ the static deflection under the rotor's weight.

## Worked example

A 10 kg mass on a spring of 4000 N/m with c = 80 N·s/m.

- ω_n = √(4000/10) = 20 rad/s. c_c = 2 × 10 × 20 = 400 N·s/m, so **ζ = 0.2**.
- ω_d = 20 √(1 − 0.04) = **19.6 rad/s**.

## Practice

```quiz
q: A machine's static deflection on its mounts is 2.5 mm (g = 9.81 m/s²). What is its natural frequency in rad/s? (Give 1 decimal place.)
answer: 62.6
verify: round((9.81 / 0.0025) ** 0.5, 1)
explain: ω_n = √(g/δ) = √(3924) = 62.6 rad/s.
```

```quiz
q: Two successive amplitudes of a damped vibration are 10 mm and 5 mm. What is the logarithmic decrement? (Give 3 decimal places.)
answer: 0.693
verify: round(__import__("math").log(10 / 5), 3)
explain: δ = ln(x₁/x₂) = ln 2 = 0.693.
```

```quiz
q: For vibration isolation, the frequency ratio ω/ω_n must be greater than:
- 1
* √2
- 2
- 0.5
explain: Transmissibility drops below 1 only when r > √2.
```

```quiz
q: An undamped system with k = 900 N/m and m = 4 kg is forced at 30 rad/s. What is the frequency ratio r?
answer: 2
verify: 30 / (900 / 4) ** 0.5
explain: ω_n = √(225) = 15 rad/s, so r = 30/15 = 2.
```

```quiz
q: Which statements are true for r > √2? (Select all that apply.)
* Transmissibility is less than 1
* Adding damping increases transmissibility
- The system is at resonance
- Transmissibility is greater than 1
explain: Above r = √2 the force transmitted is less than the applied force, and damping makes isolation worse.
```
