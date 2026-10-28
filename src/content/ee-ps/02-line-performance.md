---
title: Performance of Transmission Lines
chapter: Transmission
description: Short, medium and long line models, ABCD constants, voltage regulation and efficiency, Ferranti effect, surge impedance loading, power transfer and reactive power compensation.
---
A line's model depends on its length. From the model we get the sending-end voltage, regulation, efficiency and the power the line can carry.

## Line models

| Line | Length (50 Hz) | Model |
| --- | --- | --- |
| Short | Up to about 80 km | Series impedance only |
| Medium | 80–250 km | Nominal π (or T) |
| Long | Above 250 km | Distributed parameters (hyperbolic) |

**ABCD constants:** V_S = A V_R + B I_R, I_S = C V_R + D I_R, with **AD − BC = 1** (and A = D for symmetric lines).

- Short line: A = D = 1, B = Z, C = 0.
- Nominal π: A = D = 1 + YZ/2, B = Z, C = Y(1 + YZ/4).
- Long line: A = cosh γl, B = Z_c sinh γl, C = sinh(γl)/Z_c.

## Regulation and efficiency

- **Voltage regulation** = (|V_R,no load| − |V_R,full load|)/|V_R,full load|, with V_R,NL = V_S/|A|.
- Short line approximation: regulation ≈ I(R cos φ + X sin φ)/V_R (+ for lagging pf).
- Efficiency = P_R/(P_R + losses).

## Ferranti effect

On a lightly loaded or open long line, the charging current through the series inductance makes the **receiving-end voltage higher than the sending-end** voltage. Corrected with shunt reactors.

## Surge impedance and SIL

- **Surge (characteristic) impedance** Z_c = √(L/C) ≈ 400 Ω for overhead lines (about 40 Ω for cables).
- **Surge impedance loading** SIL = V_L²/Z_c. At SIL, the line's reactive power generation and absorption balance, and the voltage profile is flat.
- Velocity of propagation 1/√(LC) ≈ speed of light for overhead lines.

## Power transfer

For a lossless line of reactance X:

**P = (V_S V_R/X) sin δ**

Maximum at δ = 90°. Reactive power flows from the higher voltage end to the lower; **real power flows from the leading-angle end**.

**Compensation:** series capacitors reduce X (raise power transfer); shunt capacitors support voltage under heavy load; shunt reactors limit voltage at light load. FACTS devices (SVC, STATCOM, TCSC) do this with electronics.

## Worked example

A 400 kV line has Z_c = 400 Ω.

- SIL = (400 × 10³)²/400 = **400 MW**.

## Practice

```quiz
q: A 220 kV line has a surge impedance of 400 Ω. What is its SIL in MW?
answer: 121
verify: 220e3 ** 2 / 400 / 1e6
explain: SIL = V²/Z_c = (220 × 10³)²/400 = 121 MW.
```

```quiz
q: A short line has R = 5 Ω and X = 10 Ω and carries 100 A at 0.8 pf lagging, with V_R = 11 kV per phase. What is its approximate regulation in percent? (Give 3 decimal places.)
answer: 9.091
verify: round(100 * (5 * 0.8 + 10 * 0.6) / 11000 * 100, 3)
explain: Reg ≈ I(R cos φ + X sin φ)/V_R = 100 × (4 + 6)/11,000 = 0.0909 = 9.091%.
```

```quiz
q: A lossless line has V_S = V_R = 1 pu and X = 0.4 pu. What is the maximum power it can transfer in pu?
answer: 2.5
verify: 1 * 1 / 0.4
explain: P_max = V_SV_R/X = 2.5 pu.
```

```quiz
q: The Ferranti effect occurs on a long line when it is:
* Lightly loaded or open at the receiving end
- Heavily loaded at lagging pf
- Short-circuited at the receiving end
- Operated at DC
explain: The capacitive charging current flowing through the line inductance raises the receiving-end voltage.
```

```quiz
q: A 132 kV line has a surge impedance of 400 Ω. What is its SIL in MW? (Give 2 decimal places.)
answer: 43.56
verify: round(132e3 ** 2 / 400 / 1e6, 2)
explain: SIL = V²/Z_c = (132 × 10³)²/400 = 43.56 MW.
```

```quiz
q: A line has receiving-end voltages of 110 kV at no load and 100 kV at full load. What is its regulation in percent?
answer: 10
verify: (110 - 100) / 100 * 100
explain: Regulation = (110 − 100)/100 × 100 = 10%.
```
