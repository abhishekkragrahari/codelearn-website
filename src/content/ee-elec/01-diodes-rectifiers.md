---
title: Diodes, Rectifiers and Regulators
chapter: Analog Electronics
description: PN junction diode characteristics and models, half-wave and full-wave rectifiers, average and RMS values, ripple factor, capacitor filters, clippers and clampers, and Zener regulators.
---
Diodes conduct in one direction. They turn AC into DC (rectifiers), shape waveforms (clippers and clampers), and hold voltages steady (Zener regulators).

## Diode basics

- Diode equation: **I = I_s(e^(V/(ηV_T)) − 1)**, V_T ≈ 26 mV at room temperature.
- Cut-in voltage about 0.7 V (Si), 0.3 V (Ge).
- Models: ideal switch; constant drop (0.7 V); drop + resistance.
- Reverse saturation current roughly doubles for every 10 °C rise.
- **Dynamic resistance** r_d = ηV_T/I_D (about 26 mV/I_D).

## Rectifiers

For a sinusoidal input with peak V_m (ideal diodes):

| Rectifier | V_dc | V_rms | Ripple factor | PIV |
| --- | --- | --- | --- | --- |
| Half-wave | **V_m/π** | V_m/2 | 1.21 | V_m |
| Full-wave centre-tap | **2V_m/π** | V_m/√2 | 0.482 | 2V_m |
| Full-wave bridge | **2V_m/π** | V_m/√2 | 0.482 | V_m |

- Rectification efficiency: 40.6% (half-wave), 81.2% (full-wave).
- Ripple frequency: f (half-wave), 2f (full-wave).

**Capacitor filter:** ripple (peak-to-peak) ≈ I_dc/(f C) for half-wave and I_dc/(2 f C) for full-wave.

## Clippers and clampers

- **Clipper:** removes the part of the signal above or below a level (diode + bias).
- **Clamper:** shifts the whole waveform up or down by adding a DC level (diode + capacitor); the peak-to-peak value is unchanged.
- **Voltage multipliers** (doublers, triplers) stack clamped capacitors.

## Zener regulator

A Zener diode in reverse breakdown holds a nearly constant voltage V_Z.

- Series resistor: I_s = (V_in − V_Z)/R_s = I_Z + I_L.
- The Zener must keep I_Z ≥ I_Z,min under the worst case (lowest V_in, highest I_L), and not exceed its power rating P_Z = V_Z I_Z,max (highest V_in, lowest I_L).

## Worked example

A 230 V, 50 Hz supply goes through a 10:1 transformer into a bridge rectifier.

- V_m = 230√2/10 = 32.5 V; V_dc = 2 × 32.5/π = **20.7 V**; ripple frequency **100 Hz**.

## Practice

```quiz
q: A half-wave rectifier has an input peak of 100 V. What is the DC output in V? (Give 2 decimal places.)
answer: 31.83
verify: round(100 / __import__("math").pi, 2)
explain: V_dc = V_m/π = 31.83 V.
```

```quiz
q: A Zener regulator has V_in = 20 V, V_Z = 10 V and R_s = 100 Ω. The load draws 60 mA. What is the Zener current in mA?
answer: 40
verify: round(((20 - 10) / 100 - 0.06) * 1000, 6)
explain: I_s = 10/100 = 100 mA; I_Z = 100 − 60 = 40 mA.
```

```quiz
q: What is the PIV of each diode in a centre-tapped full-wave rectifier with a peak secondary voltage of V_m per half?
- V_m
* 2V_m
- V_m/2
- √2 V_m
explain: The non-conducting diode sees its own half-winding voltage plus the load voltage: 2V_m.
```

```quiz
q: A diode carries 2.6 mA at room temperature (η = 1, V_T = 26 mV). What is its dynamic resistance in Ω?
answer: 10
verify: round(0.026 / 0.0026, 6)
explain: r_d = V_T/I = 26 mV/2.6 mA = 10 Ω.
```
