---
title: Data Path and Control Unit
chapter: Processor Design
description: Register transfers and micro-operations, a single-bus data path and the control steps of an instruction, hardwired versus microprogrammed control, horizontal and vertical microinstructions, and control-memory size calculations.
---
The **data path** is the part of the CPU that holds and moves data: registers, the ALU, and the buses connecting them. The **control unit** generates the signals that tell the data path what to do in each clock cycle.

## Register transfers and micro-operations

Hardware actions are written in **register transfer notation (RTN)**: `R1 ← R2 + R3` means "add R2 and R3 and load the result into R1 at the next clock edge". One such elementary step is a **micro-operation**. Each instruction is carried out as a sequence of micro-operations, one or a few per clock cycle.

## A single-bus data path

In the simplest organisation, all registers, the ALU input register Y, the ALU output register Z, and the memory interface (MAR, MDR) are connected by **one internal bus**. Only one value can be on the bus per cycle, so instructions take several steps.

```tree
caption: A single-bus data path: only one transfer on the bus per clock cycle
Internal bus
  PC
  MAR | to memory address lines
  MDR | to and from memory data lines
  IR | to the control unit
  R0 … Rn-1 | general-purpose registers
  Y | holds one ALU input
  ALU | other input from the bus
    Z | ALU result
```

Control steps for `ADD R1, R2` (R1 ← R1 + R2) on a single bus:

| Step | Micro-operations | Purpose |
| --- | --- | --- |
| T1 | PC<sub>out</sub>, MAR<sub>in</sub>, Read, PC ← PC + 1 | Send the instruction address to memory |
| T2 | wait for memory (MDR filled) | |
| T3 | MDR<sub>out</sub>, IR<sub>in</sub> | Instruction into IR |
| T4 | R1<sub>out</sub>, Y<sub>in</sub> | First operand into Y |
| T5 | R2<sub>out</sub>, ALU = add, Z<sub>in</sub> | Second operand from the bus, sum into Z |
| T6 | Z<sub>out</sub>, R1<sub>in</sub>, End | Result into R1 |

With **two or three buses**, an ALU operation can read two registers and write one in the same cycle, which shortens the sequence. Fetch steps T1 to T3 are the same for every instruction.

## Hardwired control

A **hardwired** control unit is a fixed logic circuit. A step counter (T1, T2, …) and the decoded opcode feed combinational logic that produces each control signal, for example Z<sub>in</sub> = T1 + T5 · ADD + T5 · SUB + ….

- **Fast** (just gate delays).
- **Inflexible**: changing or adding an instruction means redesigning the circuit. Complex for large instruction sets.
- Used in RISC processors.

## Microprogrammed control

A **microprogrammed** control unit stores the control signals for each step as a **microinstruction** in a **control memory** (ROM). The microinstructions for one machine instruction form a **microroutine**; a **micro program counter** (μPC) steps through them, and branching microinstructions jump between routines (for example, to the routine for the decoded opcode).

- **Flexible**: change the ISA by rewriting the microprogram. Easy to support complex instructions.
- **Slower**: each step needs a control-memory read.
- Used in many CISC processors.

| | Hardwired | Microprogrammed |
| --- | --- | --- |
| Speed | Faster | Slower |
| Changing instructions | Redesign hardware | Rewrite microcode |
| Complex instruction sets | Hard | Easy |
| Typical use | RISC | CISC |

## Horizontal and vertical microinstructions

A microinstruction has a **control field** (which signals to activate), and usually a **condition (branch) select field** and a **next-address field**.

- **Horizontal**: one bit per control signal. Wide words, but any combination of signals can be active at once (high parallelism) and no decoding is needed.
- **Vertical**: signals that are never active together (**mutually exclusive**) are grouped, and each group is **encoded**: a group of k signals needs ⌈log₂(k + 1)⌉ bits (the extra code means "none of them"). Narrower words, but decoders are needed and fewer signals can be active together.

Example: 40 control signals form mutually exclusive groups of 10, 7, 5, 3 and 15 signals that can each be active independently.

- Horizontal: 40 bits.
- Vertical: ⌈log₂ 11⌉ + ⌈log₂ 8⌉ + ⌈log₂ 6⌉ + ⌈log₂ 4⌉ + ⌈log₂ 16⌉ = 4 + 3 + 3 + 2 + 4 = **16 bits**.

```python
from math import ceil, log2

def vertical_bits(groups):
    return sum(ceil(log2(k + 1)) for k in groups)        # +1 for "no signal in this group"

def word_size(control_bits, conditions, control_memory_words):
    return control_bits + ceil(log2(conditions)) + ceil(log2(control_memory_words))

groups = [10, 7, 5, 3, 15]
print("horizontal:", sum(groups), "bits;  vertical:", vertical_bits(groups), "bits")
w = word_size(48, 16, 1024)
print(f"48 signals, 16 conditions, 1024 words: {w}-bit words, control memory = {1024 * w} bits")
```
```output
horizontal: 40 bits;  vertical: 16 bits
48 signals, 16 conditions, 1024 words: 62-bit words, control memory = 63488 bits
```

**Control memory size** = (number of microinstructions) × (bits per microinstruction). The next-address field needs ⌈log₂(control memory words)⌉ bits, and the condition select field ⌈log₂(number of conditions)⌉ bits.

## Practice questions

```quiz
q: A microprogrammed control unit has 48 control signals (horizontal format), selects among 16 branch conditions, and has a control memory of 1024 words. How many bits wide is each microinstruction?
answer: 62
verify: 48 + 4 + 10
explain: 48 bits for the signals, ⌈log₂ 16⌉ = 4 bits to select a condition, and ⌈log₂ 1024⌉ = 10 bits for the next address: 62 bits.
```

```quiz
q: Control signals are divided into mutually exclusive groups of 12, 6, 6, 4, 3 and 1 signals. How many bits does the control field need in vertical (encoded) format, if each group also needs a "no signal" code?
answer: 16
verify: sum(__import__("math").ceil(__import__("math").log2(k + 1)) for k in [12, 6, 6, 4, 3, 1])
explain: ⌈log₂ 13⌉ + ⌈log₂ 7⌉ + ⌈log₂ 7⌉ + ⌈log₂ 5⌉ + ⌈log₂ 4⌉ + ⌈log₂ 2⌉ = 4 + 3 + 3 + 3 + 2 + 1 = 16 bits, against 32 bits in horizontal format.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* Hardwired control is generally faster than microprogrammed control
* Horizontal microinstructions allow more control signals to be active at the same time than vertical ones
- Vertical microinstructions are wider than horizontal ones
* In a single-bus data path, an ALU operation on two registers needs a temporary register for one operand
explain: Hardwired control avoids control-memory reads. Horizontal words have one bit per signal, so any combination can be active; vertical encoding narrows the word but restricts combinations. With one bus, only one operand can travel per cycle, so the first waits in Y.
```

```quiz
q: In the single-bus control sequence for ADD R1, R2 shown in this lesson, which step loads the sum into the destination register?
- T3
- T4
- T5
* T6
explain: T5 computes the sum into Z; T6 puts Z on the bus and loads R1 (Z<sub>out</sub>, R1<sub>in</sub>).
```
