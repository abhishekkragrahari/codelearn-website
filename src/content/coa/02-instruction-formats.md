---
title: Instruction Sets and Formats
chapter: Instructions
description: What an instruction contains, 3-, 2-, 1- and 0-address machines, fixed and variable instruction formats, field-width calculations, expanding opcodes, and RISC versus CISC.
---
An **instruction set architecture (ISA)** is the contract between hardware and software: the instructions, registers, data types and addressing modes a programmer (or compiler) can use.

## What an instruction contains

Every instruction has an **opcode** (which operation) and usually **operand** fields (where the data is: a register number, a memory address, or a constant). The number of bits for each field follows from how many choices it must express:

- k distinct opcodes need ⌈log₂ k⌉ bits;
- r registers need ⌈log₂ r⌉ bits per register field;
- a memory of 2ⁿ addressable units needs n bits for a full address.

Example: a 32-bit instruction holds an opcode, two register fields and an immediate constant. With 70 instructions and 50 registers, the opcode needs ⌈log₂ 70⌉ = 7 bits and each register field ⌈log₂ 50⌉ = 6 bits, leaving 32 − 7 − 2 × 6 = **13 bits** for the immediate.

## Number of addresses per instruction

The same computation, X = (A + B) × (C − D), looks different depending on how many operands an instruction names:

| Machine | Typical instruction | Program for X = (A + B) × (C − D) | Instructions |
| --- | --- | --- | --- |
| 3-address | ADD R1, A, B | ADD R1, A, B; SUB R2, C, D; MUL X, R1, R2 | 3 |
| 2-address | ADD R1, B (R1 ← R1 + B) | MOV R1, A; ADD R1, B; MOV R2, C; SUB R2, D; MUL R1, R2; MOV X, R1 | 6 |
| 1-address (accumulator) | ADD B (AC ← AC + B) | LOAD C; SUB D; STORE T; LOAD A; ADD B; MUL T; STORE X | 7 |
| 0-address (stack) | ADD (pop two, push the sum) | PUSH A; PUSH B; ADD; PUSH C; PUSH D; SUB; MUL; POP X | 8 |

Fewer addresses mean shorter instructions but more of them. A **stack machine** evaluates an expression in **postfix** order (A B + C D − ×), which is how Java bytecode and many calculators work:

```python
def stack_program(postfix, target):
    code, stack = [], []
    for token in postfix.split():
        if token in "+-*/":
            code.append({"+": "ADD", "-": "SUB", "*": "MUL", "/": "DIV"}[token])
            b, a = stack.pop(), stack.pop()
            stack.append(f"({a}{token}{b})")
        else:
            code.append(f"PUSH {token}")
            stack.append(token)
    code.append(f"POP {target}")
    return code, stack[0]

code, expr = stack_program("A B + C D - *", "X")
print("; ".join(code))
print(len(code), "instructions compute", expr)
```
```output
PUSH A; PUSH B; ADD; PUSH C; PUSH D; SUB; MUL; POP X
8 instructions compute ((A+B)*(C-D))
```

## Fixed and variable formats

- **Fixed-length** instructions (all 32 bits, as in RISC-V and ARM) are simple to fetch and decode, and suit pipelining.
- **Variable-length** instructions (1 to 15 bytes in x86) save memory and allow rich operands, but decoding is harder.

## Expanding opcodes

When instructions with fewer operands have spare bits, those bits can extend the opcode. Suppose instructions are 12 bits long and an address field is 4 bits:

- A 2-address instruction is opcode (4 bits) + 2 addresses: up to 16 opcodes.
- If only 13 two-address instructions are defined, the remaining 3 opcode patterns can each be followed by another 4 bits of opcode, giving 3 × 16 = 48 one-address instructions.
- If only 40 one-address instructions are used, the remaining 8 patterns can each be extended once more, giving 8 × 16 = **128 zero-address** instructions.

The rule: each unused pattern at one level becomes 2<sup>(field width)</sup> patterns at the next level.

## RISC and CISC

| | RISC (reduced) | CISC (complex) |
| --- | --- | --- |
| Instructions | Few, simple, one operation each | Many, some doing several operations |
| Length | Fixed (usually 32 bits) | Variable |
| Memory access | Only LOAD and STORE (**load–store architecture**) | Most instructions can use memory operands |
| Addressing modes | Few | Many |
| Registers | Many general-purpose registers | Fewer |
| CPI | Close to 1, pipelines well | Varies widely per instruction |
| Control unit | Usually hardwired | Often microprogrammed |
| Examples | RISC-V, ARM, MIPS | x86, VAX |

Modern x86 processors translate CISC instructions internally into RISC-like micro-operations.

## Practice questions

```quiz
q: A processor has 100 instructions and 30 general-purpose registers. A 32-bit instruction contains an opcode, three register fields and an immediate constant. How many bits are left for the immediate?
answer: 10
verify: 32 - (100 - 1).bit_length() - 3 * (30 - 1).bit_length()
explain: The opcode needs ⌈log₂ 100⌉ = 7 bits and each register field ⌈log₂ 30⌉ = 5 bits. 32 − 7 − 15 = 10 bits remain.
```

```quiz
q: Instructions are 16 bits long and an address field is 6 bits. There are 2-address instructions (4-bit opcode) and 1-address instructions. If 14 two-address instructions are defined, what is the maximum number of 1-address instructions?
answer: 128
verify: (2 ** 4 - 14) * 2 ** 6
explain: 2 of the 16 two-address opcode patterns are unused. In a 1-address instruction, the first address field becomes extra opcode bits: each unused pattern gives 2⁶ = 64 codes, so 2 × 64 = 128.
```

```quiz
q: How many instructions does a 0-address (stack) machine need to compute X = A × B + C, using PUSH, POP and arithmetic instructions?
code: python
  code, stack = [], []
  for t in "A B * C +".split():
      code.append({"*": "MUL", "+": "ADD"}.get(t, f"PUSH {t}"))
  code.append("POP X")
  print(len(code))
answer: 6
explain: The postfix form is A B × C +, giving PUSH A; PUSH B; MUL; PUSH C; ADD; POP X: 6 instructions.
```

```quiz
q: Which features are typical of a **RISC** design? (Select all that apply.)
* Only load and store instructions access memory
* Fixed-length instructions
- Many complex addressing modes
* A large set of general-purpose registers
explain: RISC keeps instructions simple and uniform so they pipeline well: load–store architecture, fixed length and many registers. Rich addressing modes are a CISC trait.
```
