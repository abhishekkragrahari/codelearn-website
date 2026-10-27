---
title: State Machine Design and Programmable Logic
chapter: Combinational and Sequential Circuits
description: Designing synchronous sequential circuits from a word problem: state diagrams, state tables, state assignment and minimisation, Mealy and Moore circuits, and memories and programmable logic (ROM, PLA, PAL, FPGA).
---
Counters are one kind of sequential circuit. In general, a **finite state machine (FSM)** circuit remembers its history in flip-flops and changes state on each clock edge. This lesson shows the complete design method, then the programmable chips used to build logic.

## Design steps

```flowchart
caption: Designing a synchronous sequential circuit
start: Word description
step: Draw the state diagram (Mealy or Moore)
step: Write the state table
step: Minimise states (merge equivalent states)
step: Assign binary codes to states
step: Use flip-flop excitation tables to get input equations
step: Minimise the equations (K-maps)
end: Draw the circuit
```

- n states need at least **⌈log₂ n⌉ flip-flops**.
- **State minimisation:** two states are equivalent if, for every input, they give the same output and go to equivalent states (the same partition method as DFA minimisation).
- **State assignment:** binary, Gray code (adjacent states differ in one bit) or one-hot (one flip-flop per state, simpler logic, more flip-flops).

## Example: detect two 1s in a row (Moore)

States: A (no 1 yet), B (last input 1), C (last two inputs 1, output 1).

| Present state | Next state (x = 0) | Next state (x = 1) | Output |
| --- | --- | --- | --- |
| A | A | B | 0 |
| B | A | C | 0 |
| C | A | C | 1 |

Three states need 2 flip-flops. With D flip-flops, the next-state table gives the D inputs directly.

```automaton
caption: Moore machine that outputs 1 after two consecutive 1s
states: A B C
start: A
accept: C
A -> A : 0
A -> B : 1
B -> A : 0
B -> C : 1
C -> C : 1
C -> A : 0
```

The same behaviour as a Mealy machine needs only 2 states, because the output can be produced on the transition. See [Mealy and Moore Machines](../toc/mealy-moore-machines.html).

## Memories

- **ROM** (read-only memory) with n address lines and m data lines stores a **2ⁿ × m** truth table: it can implement **any** m functions of n variables, by storing the truth table.
- Types: mask ROM, PROM (one-time programmable), EPROM (UV erasable), EEPROM and Flash (electrically erasable).
- **RAM:** SRAM (flip-flop cells, fast, used in caches) and DRAM (capacitor cells, dense, needs refresh, used in main memory).
- Capacity: a memory with A address lines and D data lines holds 2ᴬ × D bits.

## Programmable logic devices

| Device | AND array | OR array | Notes |
| --- | --- | --- | --- |
| **ROM** | Fixed (full decoder: all 2ⁿ minterms) | Programmable | Any function, but large |
| **PLA** | Programmable | Programmable | Shares product terms between outputs |
| **PAL** | Programmable | Fixed | Cheaper and faster than PLA |
| **FPGA** | Look-up tables (LUTs) + programmable routing | — | Implements large designs; reconfigurable |

## A full adder stored in a ROM, and the detector simulated

```python
rom = []
for address in range(8):                       # address bits: a b c
    a, b, c = address >> 2 & 1, address >> 1 & 1, address & 1
    total = a ^ b ^ c                          # sum
    carry = (a & b) | (b & c) | (a & c)
    rom.append((total, carry))
print("ROM contents (address: sum carry):")
for address, (s, cy) in enumerate(rom):
    print(f"{address:03b}: {s} {cy}")

next_state = {"A": {"0": "A", "1": "B"},       # the Moore 11-detector
              "B": {"0": "A", "1": "C"},
              "C": {"0": "A", "1": "C"}}
state, out = "A", ""
for x in "0110111010":
    state = next_state[state][x]
    out += "1" if state == "C" else "0"
print("11-detector output:", out)
```
```output
ROM contents (address: sum carry):
000: 0 0
001: 1 0
010: 1 0
011: 0 1
100: 1 0
101: 0 1
110: 0 1
111: 1 1
11-detector output: 0010011000
```

## GATE-style practice questions

```quiz
q: A sequential circuit has 11 states. What is the minimum number of flip-flops needed?
answer: 4
verify: (11 - 1).bit_length()
explain: 2³ = 8 < 11 ≤ 16 = 2⁴, so 4 flip-flops.
```

```quiz
q: A ROM must implement 4 functions of 6 variables. What is its size in bits?
answer: 256
verify: 2 ** 6 * 4
explain: 2⁶ addresses × 4 bits each = 256 bits.
```

```quiz
q: How many address lines does a 4K × 8 memory chip need?
answer: 12
verify: (4096 - 1).bit_length()
explain: 4K = 4096 = 2¹² words, so 12 address lines.
```

```quiz
q: In which device are both the AND array and the OR array programmable?
- ROM
* PLA
- PAL
- Decoder
explain: A ROM has a fixed AND array (all minterms), a PAL a fixed OR array; a PLA programs both.
```

```quiz
q: With one-hot state assignment, a machine with 6 states uses how many flip-flops?
answer: 6
verify: 6
explain: One-hot uses one flip-flop per state (binary encoding would need only 3).
```
