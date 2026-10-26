---
title: Digital Circuits and Computer Organization
chapter: Devices and Circuits
description: GATE EC syllabus for digital circuits, with number representations, Boolean minimisation, CMOS gates, arithmetic circuits, multiplexers and decoders, flip-flops, counters, FSMs, timing (setup, hold, critical path), data converters, memories and basic computer organization, with solved examples.
---
## Syllabus

Number representations (binary, integer and floating-point); Boolean algebra, Karnaugh maps, logic gates and static CMOS implementations, arithmetic circuits, code converters, multiplexers, decoders; latches and flip-flops, counters, shift registers, finite state machines, propagation delay, setup and hold time, critical path delay; sample and hold, ADCs and DACs; ROM, SRAM, DRAM; machine instructions and addressing modes, ALU, data path and control unit, instruction pipelining.

## Key concepts and formulas

**Numbers.** n-bit 2's complement range: −2ⁿ⁻¹ to 2ⁿ⁻¹ − 1. IEEE 754 single precision: 1 sign bit, 8 exponent bits (bias 127), 23 fraction bits. (The [Digital Logic](../dl/index.html) track covers number systems in depth.)

**Logic and CMOS.** NAND and NOR are universal. A static CMOS gate has a pull-down network of nMOS and a complementary pull-up of pMOS: a k-input NAND has k nMOS in series and k pMOS in parallel (2k transistors). Dynamic power P = αCV<sub>DD</sub>²f.

**Combinational circuits.** A half adder gives S = A ⊕ B, C = AB; a full adder S = A ⊕ B ⊕ C<sub>in</sub>, C<sub>out</sub> = AB + C<sub>in</sub>(A ⊕ B). A ripple-carry adder's delay grows linearly with n; carry look-ahead reduces it. A 2ⁿ:1 MUX can implement any function of n + 1 variables. An n-to-2ⁿ decoder produces all minterms.

**Sequential circuits.**

| Flip-flop | Characteristic equation |
| --- | --- |
| D | Q⁺ = D |
| T | Q⁺ = T ⊕ Q |
| JK | Q⁺ = JQ̄ + K̄Q |
| SR | Q⁺ = S + R̄Q (SR = 0) |

A mod-N counter needs ⌈log₂N⌉ flip-flops; a ring counter of n flip-flops has n states and a Johnson (twisted ring) counter 2n states. Moore FSM outputs depend only on the state; Mealy outputs also on the inputs.

**Timing.** For a register-to-register path: **T<sub>clk</sub> ≥ t<sub>clk-to-q</sub> + t<sub>logic,max</sub> + t<sub>setup</sub>**, so f<sub>max</sub> = 1/T<sub>clk,min</sub>. Hold constraint: t<sub>clk-to-q</sub> + t<sub>logic,min</sub> ≥ t<sub>hold</sub>. The longest such path is the **critical path**.

**Data converters.** n-bit resolution V<sub>ref</sub>/2ⁿ; a flash ADC needs 2ⁿ − 1 comparators; a successive approximation ADC needs n clock cycles. Quantisation SNR ≈ 6.02n + 1.76 dB for a full-scale sine.

**Memories.** SRAM (6 transistors per cell, fast, no refresh), DRAM (1 transistor + 1 capacitor, dense, needs refresh), ROM (non-volatile). A memory with A address lines and D data lines stores 2ᴬ × D bits.

**Computer organization.** Addressing modes (immediate, direct, indirect, register, indexed); pipelining speed-up for k stages and n instructions: nk/(k + n − 1) ideally; hazards (structural, data, control). (The [Computer Organization](../coa/index.html) track covers this in depth.)

## Worked example

A path has t<sub>clk-to-q</sub> = 0.3 ns, logic delay 2.2 ns and setup time 0.5 ns: find the maximum clock frequency. Simulate a 3-bit Johnson counter, and count the transistors in a static CMOS 4-input NAND.

```python
tcq, tlogic, tsu = 0.3, 2.2, 0.5
T = tcq + tlogic + tsu
print(f"Tmin = {T:.1f} ns, fmax = {1000 / T:.2f} MHz")
state = [0, 0, 0]
seen = []
while tuple(state) not in seen:
    seen.append(tuple(state))
    state = [1 - state[-1]] + state[:-1]    # inverted last bit shifts into the first
print("Johnson counter states:", ["".join(map(str, s)) for s in seen], "->", len(seen), "states")
print("static CMOS 4-input NAND transistors:", 2 * 4)
print(f"SQNR of an 8-bit ADC = {6.02 * 8 + 1.76:.2f} dB")
```
```output
Tmin = 3.0 ns, fmax = 333.33 MHz
Johnson counter states: ['000', '100', '110', '111', '011', '001'] -> 6 states
static CMOS 4-input NAND transistors: 8
SQNR of an 8-bit ADC = 49.92 dB
```

## Practice questions

```quiz
q: What is the range of an 8-bit 2's complement number? Enter the smallest value.
answer: -128
verify: -2 ** 7
explain: An n-bit 2's complement number ranges from −2ⁿ⁻¹ to 2ⁿ⁻¹ − 1, i.e. −128 to 127.
```

```quiz
q: A synchronous circuit has t<sub>clk-to-q</sub> = 1 ns, a worst-case logic delay of 6 ns and a setup time of 1 ns. What is the maximum clock frequency in MHz?
answer: 125
verify: 1000 / (1 + 6 + 1)
explain: T<sub>min</sub> = 1 + 6 + 1 = 8 ns, so f<sub>max</sub> = 1/8 ns = 125 MHz.
```

```quiz
q: How many states does a Johnson counter built from 5 flip-flops have?
answer: 10
verify: 2 * 5
explain: A Johnson (twisted ring) counter of n flip-flops cycles through 2n = 10 states.
```

```quiz
q: How many comparators does a 4-bit flash ADC need?
answer: 15
verify: 2 ** 4 - 1
explain: A flash ADC needs 2ⁿ − 1 = 15 comparators.
```

```quiz
q: A JK flip-flop has J = 1 and K = 1, and Q = 0 before the clock edge. What is Q after the edge?
answer: 1
verify: (1 * (1 - 0)) | ((1 - 1) * 0)
explain: Q⁺ = JQ̄ + K̄Q = 1 · 1 + 0 · 0 = 1. With J = K = 1, the flip-flop toggles.
```
