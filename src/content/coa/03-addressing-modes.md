---
title: Addressing Modes
chapter: Instructions
description: How an instruction finds its operand: immediate, register, direct, indirect, register indirect, indexed, base, PC-relative and auto-increment modes, effective-address calculations and memory reference counts.
---
An **addressing mode** says how to find the operand from the bits in the instruction. The address of the operand in memory is the **effective address (EA)**.

## The modes

| Mode | Operand (EA in brackets) | Memory accesses | Typical use |
| --- | --- | --- | --- |
| **Immediate** | The constant in the instruction | 0 | Constants: `ADD R1, #5` |
| **Register** | The register's contents | 0 | Fast temporaries |
| **Direct (absolute)** | M[A] | 1 | Global variables |
| **Indirect** | M[M[A]] | 2 | Pointers stored in memory |
| **Register indirect** | M[R] | 1 | Pointers in registers |
| **Indexed** | M[A + R<sub>index</sub>] | 1 | Arrays: A is the start, the register is the index |
| **Base (displacement)** | M[R<sub>base</sub> + d] | 1 | Fields of a record, locals on the stack |
| **PC-relative** | M[PC + d] | 1 | Branches; position-independent code |
| **Auto-increment** | M[R], then R ← R + size | 1 | Walking through an array; stack pop |
| **Auto-decrement** | R ← R − size, then M[R] | 1 | Stack push |

Two details that GATE likes:

- In **PC-relative** mode, the PC usually already points to the **next** instruction when the address is computed, so the displacement is measured from the address of the instruction **after** the branch.
- **Indirect** mode costs an extra memory access, which is why RISC machines leave it out and use register indirect instead.

## Working through an example

Registers: R1 = 300, R2 = 4. Memory: M[200] = 500, M[300] = 700, M[304] = 750, M[500] = 900, M[204] = 650. The instruction's address field is A = 200.

```python
memory = {200: 500, 204: 650, 300: 700, 304: 750, 500: 900}
R = {"R1": 300, "R2": 4}
A = 200

modes = {
    "immediate":         (None,             lambda: A),
    "direct":            (A,                lambda: memory[A]),
    "indirect":          (memory[A],        lambda: memory[memory[A]]),
    "register indirect": (R["R1"],          lambda: memory[R["R1"]]),
    "indexed (A + R2)":  (A + R["R2"],      lambda: memory[A + R["R2"]]),
    "base (R1 + 4)":     (R["R1"] + 4,      lambda: memory[R["R1"] + 4]),
}
for name, (ea, operand) in modes.items():
    print(f"{name:18} EA = {'-' if ea is None else ea:<4}  operand = {operand()}")
```
```output
immediate          EA = -     operand = 200
direct             EA = 200   operand = 500
indirect           EA = 500   operand = 900
register indirect  EA = 300   operand = 700
indexed (A + R2)   EA = 204   operand = 650
base (R1 + 4)      EA = 304   operand = 750
```

## Counting memory references

Questions often ask how many memory accesses an instruction makes in total. Count:

1. the instruction **fetch** (1 per word of instruction),
2. any accesses to **compute** the address (1 for indirect),
3. the operand **read** and/or result **write**.

For example, `ADD M[X], @Y` (destination direct, source indirect, result stored in memory): fetch 1, read the pointer at Y 1, read the source 1, read M[X] 1, write M[X] 1 = 5 accesses (for a one-word instruction).

## Practice questions

```quiz
q: Using the registers and memory in this lesson (R1 = 300, R2 = 4, M[200] = 500, M[500] = 900, ...), what operand does indirect addressing with A = 200 fetch?
answer: 900
verify:
  memory = {200: 500, 204: 650, 300: 700, 304: 750, 500: 900}
  print(memory[memory[200]])
explain: Indirect: EA = M[200] = 500, and the operand is M[500] = 900.
```

```quiz
q: A 2-word branch instruction is stored at address 1000 (each word is one address). It uses PC-relative addressing with displacement −24, computed after the PC has moved past the instruction. What is the branch target?
answer: 978
verify: 1000 + 2 - 24
explain: After fetching both words, PC = 1002. Target = 1002 + (−24) = 978.
```

```quiz
q: How many memory accesses does a one-word instruction `MOV @A, @B` make, where both operands use memory-indirect addressing (copy the word whose address is in B to the location whose address is in A)?
answer: 5
verify: 1 + 2 + 2
explain: Fetch the instruction (1). Source: read the pointer at B (1), then read the data (1). Destination: read the pointer at A (1), then write the data (1). Total 5.
```

```quiz
q: Which addressing mode is most natural for accessing element i of an array whose start address is in the instruction and whose index i is in a register?
- Immediate
- Register indirect
* Indexed
- PC-relative
explain: Indexed mode computes EA = A + R<sub>index</sub>, with the array's base address A in the instruction and the index in a register.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* Immediate addressing needs no memory access to get the operand
* Indirect addressing needs one more memory access than direct addressing
- In register addressing, the operand is in memory at the address held in the register
* PC-relative addressing makes code position-independent
explain: The immediate operand is part of the instruction. Indirect first reads the address, then the operand. "Operand at the address held in a register" is register indirect; in register mode the register holds the operand itself. PC-relative targets move with the code.
```
