---
title: Digital Electronics for GATE EE
chapter: Digital Electronics
description: Number systems, Boolean algebra and K-maps, logic gates and families, combinational circuits (adders, multiplexers, decoders), flip-flops, counters, shift registers, and DAC and ADC.
---
GATE EE includes a compact digital electronics section. This lesson collects what it needs; the [Digital Logic](../dl/index.html) track on this site covers the same topics in more depth.

## Number systems and Boolean algebra

- Binary, octal, hex conversions; **2's complement** for signed numbers (range −2ⁿ⁻¹ to 2ⁿ⁻¹ − 1).
- **De Morgan:** (AB)′ = A′ + B′, (A + B)′ = A′B′.
- **K-maps** group 1s in powers of two to minimise sum-of-products expressions; don't-cares can be used as 0 or 1.
- **NAND and NOR are universal gates.**

## Logic families

| Family | Notes |
| --- | --- |
| TTL | Bipolar; totem-pole output; fan-out about 10 |
| ECL | Fastest (non-saturating), high power |
| **CMOS** | Very low static power; power ∝ C V² f |

Noise margins: NM_H = V_OH − V_IH, NM_L = V_IL − V_OL.

## Combinational circuits

- **Half adder:** S = A ⊕ B, C = AB. **Full adder:** S = A ⊕ B ⊕ C_in, C_out = AB + C_in(A ⊕ B).
- **Multiplexer:** 2ⁿ inputs, n select lines; any n-variable function can be built with a 2ⁿ:1 MUX (or a 2ⁿ⁻¹:1 MUX with one variable on the inputs).
- **Decoder:** n inputs → 2ⁿ outputs. Encoder, priority encoder, comparator.

## Sequential circuits

| Flip-flop | Next state |
| --- | --- |
| SR | Q⁺ = S + R′Q (S = R = 1 not allowed) |
| **JK** | Q⁺ = JQ′ + K′Q (J = K = 1 toggles) |
| D | Q⁺ = D |
| T | Q⁺ = T ⊕ Q |

- **Ripple (asynchronous) counter:** n flip-flops count mod 2ⁿ; delays add up.
- **Synchronous counter:** all flip-flops on one clock.
- **Ring counter** with n flip-flops: n states. **Johnson (twisted ring)** counter: 2n states.
- Maximum clock of a ripple counter ≈ 1/(n × t_pd).

## Data converters

- **n-bit DAC:** resolution = V_ref/(2ⁿ − 1) (or V_ref/2ⁿ depending on convention). R-2R ladder DACs need only two resistor values.
- **ADCs:** flash (fastest, 2ⁿ − 1 comparators), successive approximation (n clock cycles), dual slope (noise immune), counter type.

## Worked example

An 8-bit DAC has a 5 V reference.

- Resolution = 5/255 = **19.6 mV**; input 1000 0000 gives 128 × 19.6 mV = 2.51 V.

## Practice

```quiz
q: How many states does a Johnson counter with 4 flip-flops have?
answer: 8
verify: 2 * 4
explain: A Johnson counter with n flip-flops has 2n = 8 states.
```

```quiz
q: A ripple counter uses 4 flip-flops, each with 25 ns delay. What is the maximum clock frequency in MHz?
answer: 10
verify: 1 / (4 * 25e-9) / 1e6
explain: f_max = 1/(4 × 25 ns) = 10 MHz.
```

```quiz
q: A JK flip-flop has J = K = 1 and Q = 0. What is Q after the clock edge?
answer: 1
verify: 1 ^ 0
explain: With J = K = 1 the flip-flop toggles: Q⁺ = Q′ = 1.
```

```quiz
q: What is the 8-bit 2's complement representation of −5?
* 11111011
- 10000101
- 11111010
- 00000101
explain: 5 = 00000101; inverting gives 11111010; adding 1 gives 11111011.
```
