---
title: Computer Basics and Performance
chapter: Basics
description: The stored-program (von Neumann) computer, the CPU's registers and the instruction cycle, measuring performance with CPI, MIPS and execution time, and Amdahl's law.
---
**Computer organization** is about how the parts of a computer are built and connected (data paths, control, memory); **computer architecture** is what the programmer sees (the instruction set, registers, addressing). GATE combines both.

## The stored-program computer

In the **von Neumann** design, instructions and data are stored in the **same memory**, and the CPU fetches instructions from it one after another. Its main parts:

```tree
caption: The main parts of a stored-program computer
Computer
  CPU | processor
    Control unit | decodes and sequences
    ALU | arithmetic and logic
    Registers | fastest storage
  Memory | instructions and data
  I/O | devices and controllers
```

The CPU talks to memory and I/O over a **bus**: address lines (which location), data lines (the value) and control lines (read, write, timing). With n address lines, 2ⁿ locations can be addressed.

A **Harvard** design uses separate memories (or caches) for instructions and data, so an instruction fetch and a data access can happen in the same cycle. Modern CPUs have a von Neumann main memory but split L1 instruction and data caches.

## Important registers

| Register | Holds |
| --- | --- |
| **PC** (program counter) | Address of the next instruction |
| **IR** (instruction register) | The instruction being executed |
| **MAR** (memory address register) | The address sent to memory |
| **MDR / MBR** (memory data/buffer register) | The data read from or written to memory |
| Accumulator, general-purpose registers | Operands and results |
| Status register / flags | Zero, sign, carry, overflow bits from the last ALU operation |
| SP (stack pointer) | Top of the stack in memory |

## The instruction cycle

```pipeline
caption: The instruction cycle, repeated for every instruction
Fetch | MAR ← PC, IR ← memory, PC ← PC + 1
Decode | find opcode and operands
Fetch operands | compute addresses, read
Execute | ALU operation
Write back | store the result
Interrupt check | service it if pending
```

## Measuring performance

The time a program takes on a processor is

**CPU time = Instruction count × CPI × Clock cycle time = (IC × CPI) / Clock rate**

- **IC**: the number of instructions executed (depends on the program, compiler and ISA).
- **CPI**: average clock cycles per instruction (depends on the hardware design and the instruction mix).
- **Clock rate** f = 1 / cycle time.

With an instruction mix, CPI is a weighted average: CPI = Σ (fraction of class i × cycles of class i).

**MIPS** (millions of instructions per second) = Clock rate / (CPI × 10⁶). MIPS is easy to quote but misleading across different instruction sets, because one instruction set may need more instructions for the same work. **Execution time** for the same program is the only fair comparison.

Speedup of A over B = Time(B) / Time(A), and "A is n times faster than B" means Time(B) = n × Time(A).

```python
ic, cpi, clock = 2e9, 1.5, 2.5e9
print(f"CPU time = {ic * cpi / clock:.2f} s")

mix = [("ALU", 0.5, 1), ("load/store", 0.2, 3), ("branch", 0.3, 2)]
avg_cpi = sum(frac * cycles for _, frac, cycles in mix)
print(f"average CPI = {avg_cpi:.2f}, MIPS at 2 GHz = {2e9 / avg_cpi / 1e6:.1f}")
```
```output
CPU time = 1.20 s
average CPI = 1.70, MIPS at 2 GHz = 1176.5
```

## Amdahl's law

If an enhancement speeds up a fraction **f** of the execution time by a factor **s**, the overall speedup is

**Speedup = 1 / ((1 − f) + f / s)**

Even with an infinite s, the speedup can never exceed **1 / (1 − f)**: the part that is not improved dominates. Speeding up 80% of a program 4 times gives 1 / (0.2 + 0.2) = 2.5, and no amount of speeding up that 80% gives more than 5.

```python
def amdahl(f, s):
    return 1 / ((1 - f) + f / s)

for f, s in [(0.8, 4), (0.8, 100), (0.6, 10), (0.4, 8)]:
    print(f"f = {f}, s = {s:3}: speedup {amdahl(f, s):.3f} (limit {1 / (1 - f):.2f})")
```
```output
f = 0.8, s =   4: speedup 2.500 (limit 5.00)
f = 0.8, s = 100: speedup 4.808 (limit 5.00)
f = 0.6, s =  10: speedup 2.174 (limit 2.50)
f = 0.4, s =   8: speedup 1.538 (limit 1.67)
```

## Practice questions

```quiz
q: A program executes 5 × 10⁹ instructions with an average CPI of 1.2 on a 3 GHz processor. How many seconds does it take?
answer: 2
verify: round(5e9 * 1.2 / 3e9, 6)
explain: CPU time = IC × CPI / f = 5 × 10⁹ × 1.2 / (3 × 10⁹) = 2 s.
```

```quiz
q: A processor runs a mix of 40% ALU instructions (1 cycle), 35% loads and stores (4 cycles) and 25% branches (2 cycles). What is the average CPI?
answer: 2.3
verify: round(0.4 * 1 + 0.35 * 4 + 0.25 * 2, 6)
explain: CPI = 0.4 × 1 + 0.35 × 4 + 0.25 × 2 = 0.4 + 1.4 + 0.5 = 2.3.
```

```quiz
q: 60% of a program's running time can be parallelised perfectly on 10 processors; the rest stays serial. What is the overall speedup? Give the answer to two decimal places.
answer: 2.17
verify: round(1 / (0.4 + 0.6 / 10), 2)
explain: Speedup = 1 / (0.4 + 0.06) = 1 / 0.46 ≈ 2.17. Even with infinitely many processors it could not exceed 1 / 0.4 = 2.5.
```

```quiz
q: Which register holds the address of the **next** instruction to be fetched?
* PC
- IR
- MAR
- MDR
explain: The program counter holds the next instruction's address. The IR holds the current instruction, and the MAR and MDR hold the address and data of the memory access in progress.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* In a von Neumann machine, instructions and data share one memory
* A higher MIPS rating does not guarantee a shorter execution time on a different instruction set
- Doubling the clock rate always halves the execution time, whatever the CPI
* Amdahl's law limits the speedup to 1 / (1 − f) however much the fraction f is improved
explain: The stored-program idea puts both in one memory. MIPS ignores how many instructions each ISA needs. A faster clock may raise the CPI (for example, more cycles waiting for memory), so the time need not halve. Amdahl's limit comes from the unimproved part.
```
