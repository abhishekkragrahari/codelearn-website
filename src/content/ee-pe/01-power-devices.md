---
title: Power Semiconductor Devices
chapter: Devices
description: Power diodes, SCR characteristics, turn-on and turn-off methods, latching and holding current, di/dt and dv/dt protection, snubbers, GTO, power BJT, MOSFET and IGBT comparison.
---
Power electronics switches large currents and voltages with semiconductor devices. Choosing a device means trading voltage and current rating against switching speed and ease of control.

## Power diodes

General-purpose (slow), fast-recovery and Schottky (very fast, low drop, low voltage) diodes. **Reverse recovery time** t_rr and stored charge Q_rr matter at high frequency.

## Thyristor (SCR)

A four-layer PNPN device with anode, cathode and gate.

- **Forward blocking** until triggered; then it **latches** on and the gate loses control.
- **Turn-on methods:** gate triggering (normal), forward breakover voltage, **dv/dt** triggering (unwanted), temperature, light (LASCR).
- **Latching current** I_L: minimum anode current just after triggering for the SCR to stay on. **Holding current** I_H: minimum current to stay on once conducting. **I_L > I_H** (typically 2–3 times).
- **Turn-off (commutation):** reduce the anode current below I_H and apply reverse voltage for longer than the turn-off time t_q. Natural (line) commutation in AC circuits; forced commutation in DC circuits.
- **Protection:** a series inductor limits **di/dt**; an RC **snubber** across the device limits **dv/dt**; fuses for overcurrent.
- Two-transistor model: α₁ + α₂ → 1 at turn-on.

## Other devices

| Device | Control | Turn-off by gate | Speed | Notes |
| --- | --- | --- | --- | --- |
| SCR | Current pulse | No | Slow | Highest ratings, rectifiers |
| TRIAC | Current pulse | No | Slow | Bidirectional, AC regulators |
| **GTO** | Current pulse | Yes (large negative gate current) | Medium | High power |
| Power BJT | Base current | Yes | Medium | Needs continuous base drive |
| **Power MOSFET** | Gate voltage | Yes | **Fastest** | Low-voltage, high-frequency; positive temperature coefficient (easy paralleling) |
| **IGBT** | Gate voltage | Yes | Fast | MOSFET input + BJT conduction; medium to high power |

## Firing circuits

R, RC and **UJT relaxation oscillator** triggering; pulse transformers or opto-isolators give isolation. For a UJT oscillator, f ≈ 1/(RC ln(1/(1 − η))).

## Worked example

An SCR has latching current 40 mA and is fed from a 100 V DC source through a 0.5 H inductor. What minimum gate pulse width keeps it on?

- i = (V/L) t, so t = 0.04 × 0.5/100 = **200 µs**.

## Practice

```quiz
q: An SCR in series with L = 0.2 H across a 200 V DC source has a latching current of 50 mA. What is the minimum gate pulse width in µs?
answer: 50
verify: round(0.05 * 0.2 / 200 * 1e6, 6)
explain: i = (V/L)t, so t = I_L L/V = 0.05 × 0.2/200 = 50 µs.
```

```quiz
q: Which is generally true for an SCR?
* Latching current is greater than holding current
- Holding current is greater than latching current
- They are always equal
- Latching current is zero
explain: More current is needed to establish conduction (latching) than to maintain it (holding).
```

```quiz
q: A snubber circuit across an SCR protects it mainly against:
- High di/dt
* High dv/dt
- Over-temperature
- Gate overvoltage
explain: The RC snubber slows the rate of rise of voltage across the SCR; a series inductor limits di/dt.
```

```quiz
q: Which devices can be turned off by their gate or base signal? (Select all that apply.)
* IGBT
* MOSFET
* GTO
- SCR
explain: A conventional SCR cannot be turned off from its gate; it needs the current to fall below the holding value.
```

```quiz
q: An SCR with latching current 30 mA is in series with 0.1 H across 150 V DC. What minimum gate pulse width (µs) is needed?
answer: 20
verify: round(0.03 * 0.1 / 150 * 1e6, 6)
explain: t = I_L L/V = 0.003/150 = 20 µs.
```

```quiz
q: Which device is fastest for low-voltage, high-frequency switching?
* Power MOSFET
- SCR
- GTO
- TRIAC
explain: Majority-carrier MOSFETs have no stored charge, so they switch fastest.
```
