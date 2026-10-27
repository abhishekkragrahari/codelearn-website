---
title: GATE EE Formula Sheet for Quick Revision
chapter: Exam Prep
description: GATE Electrical Engineering important formulas on one page: circuits, fields, signals, machines, power systems, control, measurements and power electronics.
---
The formulas that GATE Electrical Engineering numerical questions use most, subject by subject. Use this page for revision after studying each lesson.

## Electric circuits

| Formula | Meaning |
| --- | --- |
| τ = RC or L/R | Time constant of first-order circuits |
| ω₀ = 1/√(LC), Q = ω₀L/R (series) | Resonance and quality factor |
| P = VI cos φ, Q = VI sin φ, S = VI | Real, reactive and apparent power (RMS values) |
| Maximum power transfer: R_L = R_th (Z_L = Z_th* for AC) | Load matching |
| Star–delta: R_Y = R_Δ/3 (balanced) | Conversion |

See [Electric circuits](electric-circuits.html).

## Electromagnetic fields

| Formula | Meaning |
| --- | --- |
| F = q₁q₂/(4πε₀r²) | Coulomb's law |
| C = εA/d | Parallel-plate capacitor |
| L = μN²A/l | Inductance of a long solenoid |
| ∮ H·dl = I_enclosed | Ampere's law |

See [Electromagnetic fields](electromagnetic-fields.html).

## Signals and systems

| Formula | Meaning |
| --- | --- |
| f_s ≥ 2 f_max | Nyquist sampling rate |
| y(t) = x(t) * h(t) | Output of an LTI system is the convolution with the impulse response |
| Stable (causal LTI) | All poles in the left half s-plane, or inside the unit circle in z |

See [Signals and systems](signals-systems.html).

## Electrical machines

| Formula | Meaning |
| --- | --- |
| V₁/V₂ = N₁/N₂ = I₂/I₁ | Ideal transformer |
| Max efficiency when copper loss = core loss | Transformer |
| N_s = 120f/P | Synchronous speed (rpm) |
| s = (N_s − N)/N_s | Slip of an induction motor |
| E = PφNZ/(60A) | EMF of a DC machine |
| Rotor copper loss = s × air-gap power | Induction motor power flow |

See [Electrical machines](electrical-machines.html).

## Power systems

| Formula | Meaning |
| --- | --- |
| P = (V₁V₂/X) sin δ | Power transfer over a lossless line |
| Per-unit: Z_pu = Z × S_base/V_base² | Per-unit impedance |
| Z_new = Z_old × (V_old/V_new)² × (S_new/S_old) | Change of base |
| Fault current (3-phase, pu) = 1/Z_th | Symmetrical fault |

See [Power systems](power-systems.html).

## Control systems

| Formula | Meaning |
| --- | --- |
| T(s) = G/(1 + GH) | Closed-loop transfer function |
| Second order: ω_n² / (s² + 2ζω_n s + ω_n²) | Standard form |
| Peak overshoot M_p = e^(−πζ/√(1 − ζ²)) | Step response |
| Settling time (2%) ≈ 4/(ζω_n) | Step response |
| e_ss (step) = 1/(1 + K_p), (ramp) = 1/K_v | Steady-state error |

See [Control systems](control-systems.html).

## Measurements and power electronics

| Formula | Meaning |
| --- | --- |
| Shunt R_sh = I_m R_m/(I − I_m) | Ammeter range extension |
| Two-wattmeter: tan φ = √3 (W₁ − W₂)/(W₁ + W₂) | Balanced three-phase power factor |
| Buck: V_o = D V_in; boost: V_o = V_in/(1 − D) | DC–DC converters |
| Single-phase full converter: V_o = (2V_m/π) cos α | Controlled rectifier |

See [Measurements](measurements.html) and [Power electronics](power-electronics.html).

## Check yourself

```quiz
q: A 4-pole, 50 Hz induction motor runs at 1440 rpm. What is its slip?
answer: 0.04
verify: round((120 * 50 / 4 - 1440) / (120 * 50 / 4), 6)
explain: N_s = 120 × 50/4 = 1500 rpm; s = (1500 − 1440)/1500 = 0.04.
```

```quiz
q: A buck converter has input 48 V and duty ratio 0.25. What is the output voltage in V?
answer: 12
verify: 0.25 * 48
explain: V_o = D V_in = 0.25 × 48 = 12 V.
```

```quiz
q: A second-order system has ζ = 0.5 and ω_n = 4 rad/s. What is the 2% settling time in seconds?
answer: 2
verify: 4 / (0.5 * 4)
explain: t_s ≈ 4/(ζω_n) = 4/2 = 2 s.
```

```quiz
q: A series RLC circuit has L = 10 mH and C = 100 µF. What is the resonant angular frequency in rad/s?
answer: 1000
verify: round(1 / (10e-3 * 100e-6) ** 0.5, 6)
explain: ω₀ = 1/√(LC) = 1/√(10⁻⁶) = 1000 rad/s.
```

```quiz
q: A signal has highest frequency 4 kHz. What is the minimum sampling rate in kHz?
answer: 8
verify: 2 * 4
explain: Nyquist rate = 2 × 4 = 8 kHz.
```
