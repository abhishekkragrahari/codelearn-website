---
title: Viscous Flow and Flow Through Pipes
chapter: Fluid Dynamics
description: Reynolds number, laminar flow in pipes and between plates (Hagen-Poiseuille), Darcy-Weisbach friction, Moody chart, minor losses, and pipes in series and parallel.
---
Real fluids lose energy to friction. In pipes, this loss decides pump sizes and flow rates. The first question is always: is the flow **laminar** or **turbulent**?

## Reynolds number

**Re = ρVD/μ = VD/ν** (inertia forces / viscous forces)

- In a pipe: laminar below about **2000**, turbulent above about 4000, transitional in between.

## Laminar flow in a pipe (Hagen–Poiseuille)

- Velocity profile is a **parabola**: u = u_max (1 − r²/R²).
- **u_max = 2 V_avg**.
- Pressure drop: **Δp = 32μVL/D²**.
- Friction factor **f = 64/Re**.
- Shear stress varies linearly from zero at the centre to its maximum at the wall.

**Between fixed parallel plates:** u_max = 1.5 V_avg and Δp = 12μVL/h².

## Head loss (Darcy–Weisbach)

**h_f = f L V²/(2 g D)**

- Laminar: f = 64/Re.
- Turbulent: f depends on Re and relative roughness ε/D (Moody chart / Colebrook equation). For smooth pipes, Blasius: f = 0.316/Re^0.25 (Re < 10⁵).
- In terms of flow: h_f = f L Q²/(12.1 D⁵), so h_f ∝ 1/D⁵ at fixed Q.

## Minor losses

h = K V²/(2g):

- Sudden expansion: h = (V₁ − V₂)²/(2g).
- Pipe entrance: K ≈ 0.5. Exit into a tank: K = 1.
- Bends, valves and fittings each have their own K.

## Pipes in series and parallel

- **Series:** same Q; head losses add.
- **Parallel:** same head loss across each branch; flows add.
- **Equivalent pipe:** a single pipe with the same loss as a series combination: L/D⁵ = Σ Lᵢ/Dᵢ⁵.

## Worked example

Oil (μ = 0.1 Pa·s, ρ = 900 kg/m³) flows at 1 m/s in a 50 mm pipe 100 m long. Find Re and the head loss.

- Re = 900 × 1 × 0.05/0.1 = 450 → laminar.
- f = 64/450 = 0.1422; h_f = 0.1422 × 100 × 1/(2 × 9.81 × 0.05) = **14.5 m** of oil.

## Practice

```quiz
q: Water (ν = 10⁻⁶ m²/s) flows at 0.5 m/s in a 20 mm pipe. What is the Reynolds number?
answer: 10000
verify: round(0.5 * 0.02 / 1e-6)
explain: Re = VD/ν = 0.5 × 0.02/10⁻⁶ = 10,000 (turbulent).
```

```quiz
q: In laminar pipe flow, the maximum velocity is how many times the average velocity?
answer: 2
verify: 2
explain: The parabolic profile gives u_max = 2V_avg.
```

```quiz
q: At constant flow rate and friction factor, if the pipe diameter is halved, the head loss becomes how many times larger?
answer: 32
verify: 2 ** 5
explain: h_f ∝ Q²/D⁵, so halving D multiplies h_f by 2⁵ = 32.
```

```quiz
q: A pipe of 0.1 m diameter has f = 0.02, length 200 m and V = 2 m/s. What is the head loss in m? (g = 9.81 m/s², give 2 decimal places.)
answer: 8.15
verify: round(0.02 * 200 * 2 ** 2 / (2 * 9.81 * 0.1), 2)
explain: h_f = fLV²/(2gD) = 0.02 × 200 × 4/1.962 = 8.15 m.
```
