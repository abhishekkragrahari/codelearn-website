---
title: Magnetic Circuits and Single-Phase Transformers
chapter: Transformers
description: Magnetic circuits and reluctance, EMF equation of a transformer, equivalent circuit, open and short-circuit tests, voltage regulation, losses, efficiency and condition for maximum efficiency.
---
The transformer is the simplest AC machine: two coils linked by a common magnetic core. Its analysis uses magnetic circuits and an equivalent electrical circuit.

## Magnetic circuits

- **MMF** F = N I (ampere-turns) drives flux through **reluctance** R = l/(μA): **Φ = F/R** (like Ohm's law).
- An air gap has a far higher reluctance than iron, so most of the MMF is used in the gap.
- **Core losses:** hysteresis P_h = k_h f B_m^1.6 V (Steinmetz) and eddy current P_e = k_e f² B_m² t². Laminations reduce eddy loss.

## EMF equation and ideal transformer

**E = 4.44 f N Φ_m** (RMS)

Ideal: V₁/V₂ = N₁/N₂ = a and I₁/I₂ = 1/a. An impedance Z₂ on the secondary appears as **a² Z₂** on the primary.

## Equivalent circuit and tests

- Series: winding resistances and leakage reactances (R_eq, X_eq referred to one side).
- Shunt: core-loss resistance R_c and magnetising reactance X_m.
- **Open-circuit test** (on the LV side, rated voltage): gives the **core (iron) loss** and R_c, X_m.
- **Short-circuit test** (on the HV side, rated current, reduced voltage): gives the **full-load copper loss** and R_eq, X_eq, Z_eq.

## Voltage regulation

Change in secondary voltage from no load to full load, as a fraction of the full-load voltage. Approximately, in per unit:

**Regulation ≈ ε_r cos φ ± ε_x sin φ** (+ for lagging, − for leading pf)

It can be zero or negative for a leading pf. Maximum regulation occurs when the load angle equals the impedance angle.

## Efficiency

η = output/(output + core loss + copper loss).

- Core loss is constant; copper loss varies as the **square of the load**.
- **Maximum efficiency** when **copper loss = core loss**, at a load fraction **x = √(P_i/P_cu,fl)**.
- **All-day efficiency** = energy output/energy input over 24 hours; distribution transformers are designed for maximum efficiency at light load.

## Worked example

A 20 kVA transformer has core loss 200 W and full-load copper loss 400 W, at pf 0.8.

- Full-load efficiency = 16,000/(16,000 + 600) = **96.39%**.
- Maximum efficiency at x = √(200/400) = **0.707** of full load, with η = 11,314/(11,314 + 400) = 96.59%.

## Practice

```quiz
q: A transformer has 2% resistance and 4% reactance (per unit). What is its approximate regulation at 0.8 pf lagging, in percent?
answer: 4
verify: round(2 * 0.8 + 4 * 0.6, 6)
explain: Reg ≈ 2 × 0.8 + 4 × 0.6 = 1.6 + 2.4 = 4%.
```

```quiz
q: For the worked example, what is the full-load efficiency in percent? (Give 2 decimal places.)
answer: 96.39
verify: round(16000 / (16000 + 200 + 400) * 100, 2)
explain: η = 16,000/16,600 = 96.39%.
```

```quiz
q: A 4 Ω load on the 200 V side of a 2000/200 V transformer appears as what resistance (Ω) on the 2000 V side?
answer: 400
verify: (2000 / 200) ** 2 * 4
explain: a = 10, so the referred resistance is a² × 4 = 400 Ω.
```

```quiz
q: The open-circuit test on a transformer mainly measures:
* Core (iron) loss
- Full-load copper loss
- Leakage reactance
- Efficiency at full load
explain: With no load current, copper loss is negligible, so the wattmeter reads the core loss.
```
