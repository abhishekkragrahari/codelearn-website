---
title: Counters and Shift Registers
chapter: Combinational and Sequential Circuits
description: Ripple (asynchronous) and synchronous counters, mod-N counters, designing a counter from its state sequence, ring and Johnson counters, shift registers, and analysing a sequential circuit by tracing its states.
---
Counters and registers are the most common sequential circuits: a CPU's program counter, timers, frequency dividers and serial links are all built from them.

## Ripple (asynchronous) counters

In a **ripple counter**, only the first flip-flop gets the clock; each following flip-flop is clocked by the output of the previous one. With T flip-flops (T = 1, so each toggles) every stage divides the frequency by 2, and n flip-flops count from 0 to 2ⁿ − 1.

- Simple: no extra logic.
- **Slow**: the last flip-flop changes only after the change has rippled through all n stages, n × t<sub>pd</sub>. The counter must settle before the next clock, so f<sub>max</sub> = 1 / (n × t<sub>pd</sub>).
- While it ripples, the outputs pass through wrong intermediate values (**glitches**).

## Synchronous counters

All flip-flops share the **same clock**, and logic decides which ones toggle. In a binary up counter, bit i toggles when all lower bits are 1: T₀ = 1, T₁ = Q₀, T₂ = Q₁Q₀, T₃ = Q₂Q₁Q₀, ... All bits change together, so f<sub>max</sub> = 1 / (t<sub>pd</sub> + t<sub>gate</sub> + t<sub>su</sub>), independent of the number of bits.

## Mod-N counters

A **mod-N** counter goes through N states and repeats. It needs **⌈log₂ N⌉** flip-flops. A decade (mod-10) counter needs 4 flip-flops and uses 10 of the 16 states. In a ripple counter, mod-N is often made by resetting all flip-flops as soon as the count reaches N (for mod-10, detect 1010 with a NAND of Q₃ and Q₁).

## Designing a synchronous counter

1. Draw the state sequence and the state table (present state → next state).
2. For each flip-flop and each transition, read the required inputs from the **excitation table**.
3. Simplify each input with a K-map (unused states are don't cares).

Example: a 3-bit counter with the sequence 0 → 2 → 3 → 5 → 6 → 0 using T flip-flops. For each bit, T = 1 exactly when that bit changes: from 000 to 010 only Q₁ changes, so T₁ = 1 and T₂ = T₀ = 0 in state 000, and so on.

## Ring and Johnson counters

Both are shift registers whose output feeds back to the input:

| Counter | Feedback | States with n flip-flops | Unused states |
| --- | --- | --- | --- |
| **Ring** | Last output → first input | **n** (a single 1 circulates: 1000, 0100, 0010, 0001) | 2ⁿ − n |
| **Johnson** (twisted ring) | **Complement** of the last output → first input | **2n** (000, 100, 110, 111, 011, 001) | 2ⁿ − 2n |

```automaton
caption: The 6-state cycle of a 3-bit Johnson counter (Q2 Q1 Q0); every arrow is one clock edge
states: 000 100 110 111 011 001
start: 000
000 -> 100 : clk
100 -> 110 : clk
110 -> 111 : clk
111 -> 011 : clk
011 -> 001 : clk
001 -> 000 : clk
```

Both decode their states with simple gates and have no glitches, but they use flip-flops less efficiently than a binary counter.

## Shift registers

A **shift register** is a chain of D flip-flops: at each clock edge every bit moves one place. Depending on where data enters and leaves:

| Type | Use |
| --- | --- |
| Serial-in, serial-out (SISO) | Delay line: a bit appears at the output n clocks after entering |
| Serial-in, parallel-out (SIPO) | Receiving serial data (n clocks to load n bits) |
| Parallel-in, serial-out (PISO) | Sending data serially |
| Parallel-in, parallel-out (PIPO) | A plain register |

A **universal** shift register can shift left, shift right, load in parallel or hold, chosen by control inputs.

## Analysing a sequential circuit

Given the flip-flop input equations, find the state sequence by computing the next state from each present state. A small simulator does this mechanically. Here are a 3-bit Johnson counter and a circuit with D flip-flops whose inputs are D₂ = Q₁ ⊕ Q₀, D₁ = Q₀′ and D₀ = Q₂:

```python
def trace(next_state, start, limit=16):
    states = [start]
    while len(states) <= limit:
        s = next_state(states[-1])
        if s in states:
            return states, s
        states.append(s)
    return states, None

fmt = lambda s: "".join(map(str, s))

johnson = lambda s: (1 - s[2], s[0], s[1])             # (Q2, Q1, Q0): Q2+ = Q0', shift right
circuit = lambda s: (s[1] ^ s[2], 1 - s[2], s[0])     # D2 = Q1 xor Q0, D1 = Q0', D0 = Q2

for name, f in [("Johnson", johnson), ("circuit", circuit)]:
    states, back = trace(f, (0, 0, 0))
    print(f"{name}: {' -> '.join(fmt(s) for s in states)} -> {fmt(back)} ({len(states)} states)")
```
```output
Johnson: 000 -> 100 -> 110 -> 111 -> 011 -> 001 -> 000 (6 states)
circuit: 000 -> 010 -> 110 -> 111 -> 001 -> 100 -> 011 -> 000 (7 states)
```

The second circuit cycles through 7 of the 8 states; state 101 is never reached from 000. Checking what happens from such unused states (does the circuit fall back into the main cycle, or get stuck?) is part of a complete design. A counter that always returns to its main sequence is called **self-starting**.

## Practice questions

```quiz
q: How many flip-flops does a mod-25 counter need?
answer: 5
verify: (25 - 1).bit_length()
explain: 2⁴ = 16 < 25 ≤ 32 = 2⁵, so ⌈log₂ 25⌉ = 5 flip-flops.
```

```quiz
q: A 4-bit Johnson counter is built from 4 flip-flops. How many of the 16 possible states are **unused**?
answer: 8
verify: 2 ** 4 - 2 * 4
explain: A Johnson counter with n flip-flops goes through 2n = 8 states, leaving 16 − 8 = 8 unused.
```

```quiz
q: A ripple counter has 8 flip-flops, each with a propagation delay of 10 ns. What is its maximum clock frequency in MHz?
answer: 12.5
verify: round(1 / (8 * 10e-9) / 1e6, 2)
explain: The count has settled only after the change ripples through all 8 stages: 80 ns. So f<sub>max</sub> = 1 / 80 ns = 12.5 MHz.
```

```quiz
q: A circuit has D flip-flops with D₂ = Q₁ ⊕ Q₀, D₁ = Q₀′, D₀ = Q₂ and starts in state Q₂Q₁Q₀ = 000. Which state does it reach after 3 clock edges?
code: python
  s = (0, 0, 0)
  for _ in range(3):
      s = (s[1] ^ s[2], 1 - s[2], s[0])
  print("".join(map(str, s)))
- `110`
* `111`
- `001`
- `011`
explain: 000 → (0⊕0, 0′, 0) = 010 → (1⊕0, 0′, 0) = 110 → (1⊕0, 0′, 1) = 111. (Read each next state as (Q₁ ⊕ Q₀, Q₀′, Q₂) of the present state.)
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* In a synchronous counter, all flip-flops are clocked by the same clock
* A ring counter with n flip-flops has n states
- A ripple counter is faster than a synchronous counter with the same number of bits
* A serial-in, serial-out shift register of n flip-flops delays its input by n clock cycles
explain: Synchronous means one common clock. A ring counter circulates a single 1 through n positions. Ripple counters are slower, because the delay adds up over the stages. Each flip-flop of a SISO register adds one clock of delay.
```
